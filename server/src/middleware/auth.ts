/**
 * Authentication Middleware
 * 
 * Express middleware for JWT token validation, user authentication,
 * and role-based authorization with comprehensive security features.
 */

import { Request, Response, NextFunction } from 'express';
import { 
  AuthenticatedRequest, 
  UserRole, 
  AuthErrorCode,
  TokenType 
} from '../types/auth.js';
import { 
  verifyAccessToken, 
  extractTokenFromHeader, 
  TokenBlacklist 
} from '../utils/jwtUtils.js';
import { userManager } from '../utils/userManager.js';

/**
 * Extract and verify JWT token from request
 */
export function authenticateToken(
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): void {
  const authHeader = req.headers.get('authorization') ?? undefined;
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    res.status(401).json({
      success: false,
      error: {
        code: AuthErrorCode.UNAUTHORIZED,
        message: 'Access token is required'
      }
    });
    return;
  }

  const verificationResult = verifyAccessToken(token);

  if (!verificationResult.success) {
    const statusCode = verificationResult.error === 'Token expired' ? 401 : 403;
    res.status(statusCode).json({
      success: false,
      error: {
        code: verificationResult.error === 'Token expired' ? AuthErrorCode.TOKEN_EXPIRED : AuthErrorCode.INVALID_TOKEN,
        message: verificationResult.error || 'Token verification failed'
      }
    });
    return;
  }

  // Check if token is blacklisted
  checkTokenBlacklist(verificationResult.payload!.jti!, req, res, next);
}

/**
 * Check if token is blacklisted (for logout/revocation)
 */
async function checkTokenBlacklist(
  jti: string, 
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  try {
    const isBlacklisted = await TokenBlacklist.isBlacklisted(jti);
    
    if (isBlacklisted) {
      res.status(401).json({
        success: false,
        error: {
          code: AuthErrorCode.TOKEN_REVOKED,
          message: 'Token has been revoked'
        }
      });
      return;
    }

    // Token is valid, proceed to user validation
    const verificationResult = verifyAccessToken(extractTokenFromHeader(req.headers.get('authorization') ?? undefined)!);
    await validateUser(verificationResult.payload!, req, res, next);
  } catch (error) {
    console.error('Token blacklist check error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: AuthErrorCode.INTERNAL_ERROR,
        message: 'Authentication service error'
      }
    });
  }
}

/**
 * Validate user exists and is active
 */
async function validateUser(
  payload: any, 
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  try {
    const user = await userManager.getUserById(payload.userId);

    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          code: AuthErrorCode.USER_NOT_FOUND,
          message: 'User not found'
        }
      });
      return;
    }

    if (!user.isActive) {
      res.status(401).json({
        success: false,
        error: {
          code: AuthErrorCode.UNAUTHORIZED,
          message: 'Account is deactivated'
        }
      });
      return;
    }

    // Attach user and token info to request
    req.user = user;
    req.token = extractTokenFromHeader(req.headers.get('authorization') ?? undefined)!;
    req.tokenType = TokenType.ACCESS;

    next();
  } catch (error) {
    console.error('User validation error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: AuthErrorCode.INTERNAL_ERROR,
        message: 'User validation error'
      }
    });
  }
}

/**
 * Authorization middleware - check user roles
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: AuthErrorCode.UNAUTHORIZED,
          message: 'Authentication required'
        }
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: {
          code: AuthErrorCode.FORBIDDEN,
          message: 'Insufficient permissions'
        }
      });
      return;
    }

    next();
  };
}

/**
 * Admin-only middleware
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  requireRole(UserRole.ADMIN)(req, res, next);
}

/**
 * Moderator or Admin middleware
 */
export function requireModerator(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  requireRole(UserRole.ADMIN, UserRole.MODERATOR)(req, res, next);
}

/**
 * Email verification middleware
 */
export function requireEmailVerification(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: {
        code: AuthErrorCode.UNAUTHORIZED,
        message: 'Authentication required'
      }
    });
    return;
  }

  if (!req.user.isEmailVerified) {
    res.status(403).json({
      success: false,
      error: {
        code: AuthErrorCode.EMAIL_NOT_VERIFIED,
        message: 'Email verification required'
      }
    });
    return;
  }

  next();
}

/**
 * Optional authentication - validates token if present but doesn't require it
 */
export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.get('authorization') ?? undefined;
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    // No token provided, continue without authentication
    next();
    return;
  }

  const verificationResult = verifyAccessToken(token);

  if (verificationResult.success && verificationResult.payload) {
    // Token is valid, attempt to load user
    userManager.getUserById(verificationResult.payload.userId)
      .then(user => {
        if (user && user.isActive) {
          req.user = user;
          req.token = token;
          req.tokenType = TokenType.ACCESS;
        }
        next();
      })
      .catch(error => {
        console.error('Optional auth error:', error);
        // Continue without authentication on error
        next();
      });
  } else {
    // Invalid token, continue without authentication
    next();
  }
}

/**
 * Rate limiting for authentication endpoints
 */
export function authRateLimit(windowMs: number, maxAttempts: number) {
  const attempts = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction): void => {
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    
    // Clean up expired entries
    for (const [ip, data] of attempts.entries()) {
      if (now > data.resetTime) {
        attempts.delete(ip);
      }
    }

    const clientData = attempts.get(clientIp);
    
    if (!clientData) {
      // First attempt from this IP
      attempts.set(clientIp, {
        count: 1,
        resetTime: now + windowMs
      });
      next();
      return;
    }

    if (now > clientData.resetTime) {
      // Window has expired, reset
      attempts.set(clientIp, {
        count: 1,
        resetTime: now + windowMs
      });
      next();
      return;
    }

    if (clientData.count >= maxAttempts) {
      // Rate limit exceeded
      const timeUntilReset = Math.ceil((clientData.resetTime - now) / 1000);
      
      res.status(429).json({
        success: false,
        error: {
          code: AuthErrorCode.RATE_LIMIT_EXCEEDED,
          message: `Too many authentication attempts. Try again in ${timeUntilReset} seconds.`
        }
      });
      return;
    }

    // Increment attempt count
    clientData.count++;
    next();
  };
}

/**
 * Security headers middleware for auth endpoints
 */
export function authSecurityHeaders(req: Request, res: Response, next: NextFunction): void {
  // Prevent caching of authentication responses
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  next();
}

/**
 * Audit logging middleware for authentication events
 */
export function auditAuthAction(action: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    // Store audit info for logging after response
    res.locals.auditAction = action;
    res.locals.auditIp = (req as any).ip || (req as any).connection?.remoteAddress || 'unknown';
    res.locals.auditUserAgent = req.headers.get('user-agent') || 'unknown';
    res.locals.auditUserId = req.user?.id;
    
    // Log after response is sent
    res.on('finish', () => {
      const success = res.statusCode < 400;
      console.log(`AUTH_AUDIT: ${action}`, {
        userId: res.locals.auditUserId,
        ip: res.locals.auditIp,
        userAgent: res.locals.auditUserAgent,
        success,
        statusCode: res.statusCode,
        timestamp: new Date().toISOString()
      });
    });

    next();
  };
}

/**
 * Validate request origin for additional security
 */
export function validateOrigin(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin || req.headers.referer;
  
  // In production, you should validate against allowed origins
  // For now, we'll just log suspicious requests
  if (origin) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (!allowedOrigins.some(allowed => origin?.startsWith(allowed || ''))) {
      console.warn('Suspicious origin in auth request:', {
        origin,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        path: req.path
      });
    }
  }

  next();
}