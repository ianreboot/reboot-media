import crypto from 'crypto';
import { AppError } from './errorHandler.js';
class CSRFProtection {
    tokenStore = new Map();
    tokenExpiry = 30 * 60 * 1000;
    secretKey;
    constructor() {
        this.secretKey = process.env.CSRF_SECRET || this.generateSecret();
        this.startCleanupInterval();
    }
    generateSecret() {
        return crypto.randomBytes(32).toString('hex');
    }
    generateToken(req) {
        const sessionId = this.getSessionId(req);
        const token = crypto
            .createHash('sha256')
            .update(`${sessionId}-${Date.now()}-${this.secretKey}`)
            .digest('hex');
        this.tokenStore.set(sessionId, {
            token,
            timestamp: Date.now(),
            ip: req.ip || 'unknown',
        });
        return token;
    }
    validateToken(req) {
        const sessionId = this.getSessionId(req);
        const providedToken = this.extractToken(req);
        const storedData = this.tokenStore.get(sessionId);
        if (!providedToken || !storedData) {
            return false;
        }
        if (storedData.token !== providedToken) {
            return false;
        }
        if (Date.now() - storedData.timestamp > this.tokenExpiry) {
            this.tokenStore.delete(sessionId);
            return false;
        }
        if (storedData.ip !== req.ip) {
            console.warn('CSRF token IP mismatch:', {
                sessionId,
                storedIp: storedData.ip,
                requestIp: req.ip,
            });
        }
        return true;
    }
    generateMiddleware() {
        return (req, res, next) => {
            const token = this.generateToken(req);
            req.csrfToken = token;
            res.setHeader('X-CSRF-Token', token);
            next();
        };
    }
    validateMiddleware() {
        return (req, res, next) => {
            if (req.method === 'GET' || req.path === '/api/health') {
                return next();
            }
            if (!this.validateToken(req)) {
                console.warn('CSRF validation failed:', {
                    requestId: req.requestId,
                    ip: req.ip,
                    userAgent: req.get('User-Agent'),
                    method: req.method,
                    path: req.path,
                });
                throw new AppError('CSRF token validation failed', 403, 'CSRF_TOKEN_INVALID');
            }
            next();
        };
    }
    getTokenEndpoint() {
        return (req, res) => {
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
    getSessionId(req) {
        return crypto
            .createHash('sha256')
            .update(`${req.requestId}-${req.ip}`)
            .digest('hex');
    }
    extractToken(req) {
        return (req.headers['x-csrf-token'] ||
            req.headers['csrf-token'] ||
            req.body?.csrfToken ||
            req.query?.csrf_token);
    }
    startCleanupInterval() {
        setInterval(() => {
            const now = Date.now();
            for (const [sessionId, data] of this.tokenStore.entries()) {
                if (now - data.timestamp > this.tokenExpiry) {
                    this.tokenStore.delete(sessionId);
                }
            }
        }, 15 * 60 * 1000);
    }
    getStats() {
        return {
            activeTokens: this.tokenStore.size,
            expiryTime: this.tokenExpiry,
            cleanupInterval: '15 minutes',
        };
    }
}
export const csrfProtection = new CSRFProtection();
export const generateCSRFToken = csrfProtection.generateMiddleware();
export const validateCSRFToken = csrfProtection.validateMiddleware();
export const getCSRFToken = csrfProtection.getTokenEndpoint();
//# sourceMappingURL=csrf.js.map