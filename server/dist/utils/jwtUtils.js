import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { TokenType } from '../types/auth.js';
const DEFAULT_JWT_CONFIG = {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'your-super-secret-access-key',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key',
    emailVerificationSecret: process.env.JWT_EMAIL_SECRET || 'your-super-secret-email-key',
    passwordResetSecret: process.env.JWT_PASSWORD_RESET_SECRET || 'your-super-secret-reset-key',
    accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
    emailVerificationExpiry: process.env.JWT_EMAIL_EXPIRY || '24h',
    passwordResetExpiry: process.env.JWT_PASSWORD_RESET_EXPIRY || '1h',
    issuer: process.env.JWT_ISSUER || 'reboot-media',
    audience: process.env.JWT_AUDIENCE || 'reboot-media-app'
};
function getJWTConfig() {
    return DEFAULT_JWT_CONFIG;
}
export function generateTokenPair(user, rememberMe = false) {
    const config = getJWTConfig();
    const jti = uuidv4();
    const accessPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        type: TokenType.ACCESS,
        jti: `access_${jti}`
    };
    const refreshPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        type: TokenType.REFRESH,
        jti: `refresh_${jti}`
    };
    const accessToken = jwt.sign(accessPayload, config.accessTokenSecret, {
        expiresIn: config.accessTokenExpiry,
        issuer: config.issuer,
        audience: config.audience,
        algorithm: 'HS256'
    });
    const refreshTokenExpiry = rememberMe ? '30d' : config.refreshTokenExpiry;
    const refreshToken = jwt.sign(refreshPayload, config.refreshTokenSecret, {
        expiresIn: refreshTokenExpiry,
        issuer: config.issuer,
        audience: config.audience,
        algorithm: 'HS256'
    });
    const accessTokenDecoded = jwt.decode(accessToken);
    const refreshTokenDecoded = jwt.decode(refreshToken);
    return {
        accessToken,
        refreshToken,
        expiresIn: accessTokenDecoded.exp - accessTokenDecoded.iat,
        refreshExpiresIn: refreshTokenDecoded.exp - refreshTokenDecoded.iat
    };
}
export function verifyAccessToken(token) {
    try {
        const config = getJWTConfig();
        const payload = jwt.verify(token, config.accessTokenSecret, {
            issuer: config.issuer,
            audience: config.audience,
            algorithms: ['HS256']
        });
        if (payload.type !== TokenType.ACCESS) {
            return { success: false, error: 'Invalid token type' };
        }
        return { success: true, payload };
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return { success: false, error: 'Token expired' };
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return { success: false, error: 'Invalid token' };
        }
        else {
            return { success: false, error: 'Token verification failed' };
        }
    }
}
export function verifyRefreshToken(token) {
    try {
        const config = getJWTConfig();
        const payload = jwt.verify(token, config.refreshTokenSecret, {
            issuer: config.issuer,
            audience: config.audience,
            algorithms: ['HS256']
        });
        if (payload.type !== TokenType.REFRESH) {
            return { success: false, error: 'Invalid token type' };
        }
        return { success: true, payload };
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return { success: false, error: 'Refresh token expired' };
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return { success: false, error: 'Invalid refresh token' };
        }
        else {
            return { success: false, error: 'Refresh token verification failed' };
        }
    }
}
export function generateEmailVerificationToken(userId, email) {
    const config = getJWTConfig();
    const payload = {
        userId,
        email,
        role: 'user',
        type: TokenType.EMAIL_VERIFICATION,
        jti: `email_${uuidv4()}`
    };
    return jwt.sign(payload, config.emailVerificationSecret, {
        expiresIn: config.emailVerificationExpiry,
        issuer: config.issuer,
        audience: config.audience,
        algorithm: 'HS256'
    });
}
export function verifyEmailVerificationToken(token) {
    try {
        const config = getJWTConfig();
        const payload = jwt.verify(token, config.emailVerificationSecret, {
            issuer: config.issuer,
            audience: config.audience,
            algorithms: ['HS256']
        });
        if (payload.type !== TokenType.EMAIL_VERIFICATION) {
            return { success: false, error: 'Invalid token type' };
        }
        return { success: true, payload };
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return { success: false, error: 'Email verification token expired' };
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return { success: false, error: 'Invalid email verification token' };
        }
        else {
            return { success: false, error: 'Email verification token verification failed' };
        }
    }
}
export function generatePasswordResetToken(userId, email) {
    const config = getJWTConfig();
    const payload = {
        userId,
        email,
        role: 'user',
        type: TokenType.PASSWORD_RESET,
        jti: `reset_${uuidv4()}`
    };
    return jwt.sign(payload, config.passwordResetSecret, {
        expiresIn: config.passwordResetExpiry,
        issuer: config.issuer,
        audience: config.audience,
        algorithm: 'HS256'
    });
}
export function verifyPasswordResetToken(token) {
    try {
        const config = getJWTConfig();
        const payload = jwt.verify(token, config.passwordResetSecret, {
            issuer: config.issuer,
            audience: config.audience,
            algorithms: ['HS256']
        });
        if (payload.type !== TokenType.PASSWORD_RESET) {
            return { success: false, error: 'Invalid token type' };
        }
        return { success: true, payload };
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return { success: false, error: 'Password reset token expired' };
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return { success: false, error: 'Invalid password reset token' };
        }
        else {
            return { success: false, error: 'Password reset token verification failed' };
        }
    }
}
export function extractTokenFromHeader(authHeader) {
    if (!authHeader) {
        return null;
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }
    return parts[1] || null;
}
export function decodeTokenUnsafe(token) {
    try {
        return jwt.decode(token);
    }
    catch (error) {
        return null;
    }
}
export function isTokenExpired(token) {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return true;
        }
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTimestamp;
    }
    catch (error) {
        return true;
    }
}
export function getTokenExpiry(token) {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return null;
        }
        return new Date(decoded.exp * 1000);
    }
    catch (error) {
        return null;
    }
}
export function getTimeUntilExpiry(token) {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return null;
        }
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return Math.max(0, decoded.exp - currentTimestamp);
    }
    catch (error) {
        return null;
    }
}
export function refreshAccessToken(refreshToken, user) {
    const verificationResult = verifyRefreshToken(refreshToken);
    if (!verificationResult.success) {
        return { success: false, error: verificationResult.error };
    }
    const payload = verificationResult.payload;
    if (payload.userId !== user.id) {
        return { success: false, error: 'Token user mismatch' };
    }
    const config = getJWTConfig();
    const jti = uuidv4();
    const accessPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        type: TokenType.ACCESS,
        jti: `access_${jti}`
    };
    const accessToken = jwt.sign(accessPayload, config.accessTokenSecret, {
        expiresIn: config.accessTokenExpiry,
        issuer: config.issuer,
        audience: config.audience,
        algorithm: 'HS256'
    });
    return { success: true, accessToken };
}
export class TokenBlacklist {
    static blacklistedTokens = new Set();
    static async addToBlacklist(jti, expiresAt) {
        this.blacklistedTokens.add(jti);
        const timeoutMs = expiresAt.getTime() - Date.now();
        if (timeoutMs > 0) {
            setTimeout(() => {
                this.blacklistedTokens.delete(jti);
            }, timeoutMs);
        }
    }
    static async isBlacklisted(jti) {
        return this.blacklistedTokens.has(jti);
    }
    static async clearExpiredTokens() {
    }
}
export function validateJWTConfig() {
    const config = getJWTConfig();
    const errors = [];
    if (config.accessTokenSecret === 'your-super-secret-access-key') {
        errors.push('JWT_ACCESS_SECRET must be set to a secure value');
    }
    if (config.refreshTokenSecret === 'your-super-secret-refresh-key') {
        errors.push('JWT_REFRESH_SECRET must be set to a secure value');
    }
    if (config.accessTokenSecret.length < 32) {
        errors.push('JWT_ACCESS_SECRET should be at least 32 characters long');
    }
    if (config.refreshTokenSecret.length < 32) {
        errors.push('JWT_REFRESH_SECRET should be at least 32 characters long');
    }
    if (config.accessTokenSecret === config.refreshTokenSecret) {
        errors.push('Access and refresh token secrets must be different');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
export { getJWTConfig };
//# sourceMappingURL=jwtUtils.js.map