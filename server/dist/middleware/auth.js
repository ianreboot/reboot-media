import { UserRole, AuthErrorCode, TokenType } from '../types/auth.js';
import { verifyAccessToken, extractTokenFromHeader, TokenBlacklist } from '../utils/jwtUtils.js';
import { userManager } from '../utils/userManager.js';
export function authenticateToken(req, res, next) {
    const authHeader = req.get('authorization') ?? undefined;
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
    checkTokenBlacklist(verificationResult.payload.jti, req, res, next);
}
async function checkTokenBlacklist(jti, req, res, next) {
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
        const verificationResult = verifyAccessToken(extractTokenFromHeader(req.get('authorization') ?? undefined));
        await validateUser(verificationResult.payload, req, res, next);
    }
    catch (error) {
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
async function validateUser(payload, req, res, next) {
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
        req.user = user;
        req.token = extractTokenFromHeader(req.get('authorization') ?? undefined);
        req.tokenType = TokenType.ACCESS;
        next();
    }
    catch (error) {
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
export function requireRole(...allowedRoles) {
    return (req, res, next) => {
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
export function requireAdmin(req, res, next) {
    requireRole(UserRole.ADMIN)(req, res, next);
}
export function requireModerator(req, res, next) {
    requireRole(UserRole.ADMIN, UserRole.MODERATOR)(req, res, next);
}
export function requireEmailVerification(req, res, next) {
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
export function optionalAuth(req, res, next) {
    const authHeader = req.get('authorization') ?? undefined;
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
        next();
        return;
    }
    const verificationResult = verifyAccessToken(token);
    if (verificationResult.success && verificationResult.payload) {
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
            next();
        });
    }
    else {
        next();
    }
}
export function authRateLimit(windowMs, maxAttempts) {
    const attempts = new Map();
    return (req, res, next) => {
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
        const now = Date.now();
        for (const [ip, data] of attempts.entries()) {
            if (now > data.resetTime) {
                attempts.delete(ip);
            }
        }
        const clientData = attempts.get(clientIp);
        if (!clientData) {
            attempts.set(clientIp, {
                count: 1,
                resetTime: now + windowMs
            });
            next();
            return;
        }
        if (now > clientData.resetTime) {
            attempts.set(clientIp, {
                count: 1,
                resetTime: now + windowMs
            });
            next();
            return;
        }
        if (clientData.count >= maxAttempts) {
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
        clientData.count++;
        next();
    };
}
export function authSecurityHeaders(req, res, next) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
}
export function auditAuthAction(action) {
    return (req, res, next) => {
        res.locals.auditAction = action;
        res.locals.auditIp = req.ip || req.connection?.remoteAddress || 'unknown';
        res.locals.auditUserAgent = req.get('user-agent') || 'unknown';
        res.locals.auditUserId = req.user?.id;
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
export function validateOrigin(req, res, next) {
    const origin = req.headers.origin || req.headers.referer;
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
//# sourceMappingURL=auth.js.map