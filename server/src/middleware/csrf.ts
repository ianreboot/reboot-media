import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { AppError } from './errorHandler.js';

/**
 * CSRF Protection Middleware
 * Implements token-based CSRF protection for form submissions
 */

interface CSRFRequest extends Request {
  csrfToken?: string;
}

class CSRFProtection {
  private tokenStore: Map<string, { token: string; timestamp: number; ip: string }> = new Map();
  private tokenExpiry: number = 30 * 60 * 1000; // 30 minutes
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.CSRF_SECRET || this.generateSecret();
    this.startCleanupInterval();
  }

  private generateSecret(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Generate CSRF token for a session
   */
  generateToken(req: Request): string {
    const sessionId = this.getSessionId(req);
    const token = crypto
      .createHash('sha256')
      .update(`${sessionId}-${Date.now()}-${this.secretKey}`)
      .digest('hex');

    // Store token with metadata
    this.tokenStore.set(sessionId, {
      token,
      timestamp: Date.now(),
      ip: req.ip || 'unknown',
    });

    return token;
  }

  /**
   * Validate CSRF token
   */
  validateToken(req: CSRFRequest): boolean {
    const sessionId = this.getSessionId(req);
    const providedToken = this.extractToken(req);
    const storedData = this.tokenStore.get(sessionId);

    if (!providedToken || !storedData) {
      return false;
    }

    // Check token match
    if (storedData.token !== providedToken) {
      return false;
    }

    // Check token expiry
    if (Date.now() - storedData.timestamp > this.tokenExpiry) {
      this.tokenStore.delete(sessionId);
      return false;
    }

    // Check IP consistency (basic check)
    if (storedData.ip !== req.ip) {
      console.warn('CSRF token IP mismatch:', {
        sessionId,
        storedIp: storedData.ip,
        requestIp: req.ip,
      });
      // Don't fail immediately as IPs can change in some scenarios
      // but log for monitoring
    }

    return true;
  }

  /**
   * Middleware to generate and provide CSRF token
   */
  generateMiddleware() {
    return (req: CSRFRequest, res: Response, next: NextFunction): void => {
      const token = this.generateToken(req);
      req.csrfToken = token;
      
      // Add token to response headers for client access
      res.setHeader('X-CSRF-Token', token);
      
      next();
    };
  }

  /**
   * Middleware to validate CSRF token
   */
  validateMiddleware() {
    return (req: CSRFRequest, res: Response, next: NextFunction): void => {
      // Skip validation for GET requests and health checks
      if (req.method === 'GET' || req.path === '/api/health') {
        return next();
      }

      if (!this.validateToken(req)) {
        console.warn('CSRF validation failed:', {
          requestId: (req as any).requestId,
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          method: req.method,
          path: req.path,
        });

        throw new AppError(
          'CSRF token validation failed',
          403,
          'CSRF_TOKEN_INVALID'
        );
      }

      next();
    };
  }

  /**
   * Get CSRF token endpoint
   */
  getTokenEndpoint() {
    return (req: CSRFRequest, res: Response): void => {
      const token = this.generateToken(req);
      
      res.json({
        success: true,
        data: {
          csrfToken: token,
          expiresIn: this.tokenExpiry,
        },
      });
    };
  }

  private getSessionId(req: Request): string {
    // Use request ID + IP as session identifier
    // In production, use proper session management
    return crypto
      .createHash('sha256')
      .update(`${(req as any).requestId}-${req.ip}`)
      .digest('hex');
  }

  private extractToken(req: CSRFRequest): string | undefined {
    // Check multiple possible locations for token
    return (
      (req.headers['x-csrf-token'] as string) ||
      (req.headers['csrf-token'] as string) ||
      req.body?.csrfToken ||
      (req.query?.csrf_token as string)
    );
  }

  private startCleanupInterval(): void {
    // Clean expired tokens every 15 minutes
    setInterval(() => {
      const now = Date.now();
      for (const [sessionId, data] of this.tokenStore.entries()) {
        if (now - data.timestamp > this.tokenExpiry) {
          this.tokenStore.delete(sessionId);
        }
      }
    }, 15 * 60 * 1000);
  }

  /**
   * Get token store statistics
   */
  getStats(): any {
    return {
      activeTokens: this.tokenStore.size,
      expiryTime: this.tokenExpiry,
      cleanupInterval: '15 minutes',
    };
  }
}

// Export singleton instance
export const csrfProtection = new CSRFProtection();

// Export middleware functions for easy use
export const generateCSRFToken = csrfProtection.generateMiddleware();
export const validateCSRFToken = csrfProtection.validateMiddleware();
export const getCSRFToken = csrfProtection.getTokenEndpoint();