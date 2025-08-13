/**
 * JWT Utilities
 * 
 * Comprehensive JWT token creation, validation, and management utilities
 * with security best practices including token rotation and revocation.
 */

import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { 
  JWTPayload, 
  TokenType, 
  TokenPair, 
  JWTConfig, 
  UserProfile,
  AuthErrorCode 
} from '../types/auth.js';

// Default JWT configuration (will be overridden by environment variables)
const DEFAULT_JWT_CONFIG: JWTConfig = {
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

/**
 * Get JWT configuration with environment variable overrides
 */
function getJWTConfig(): JWTConfig {
  return DEFAULT_JWT_CONFIG;
}

/**
 * Generate a pair of access and refresh tokens
 */
export function generateTokenPair(user: UserProfile, rememberMe: boolean = false): TokenPair {
  const config = getJWTConfig();
  const jti = uuidv4(); // Unique token ID for tracking
  
  // Create access token payload
  const accessPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId: user.id,
    email: user.email,
    role: user.role,
    type: TokenType.ACCESS,
    jti: `access_${jti}`
  };
  
  // Create refresh token payload
  const refreshPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId: user.id,
    email: user.email,
    role: user.role,
    type: TokenType.REFRESH,
    jti: `refresh_${jti}`
  };
  
  // Generate tokens with appropriate expiry
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
  
  // Calculate expiry times in seconds
  const accessTokenDecoded = jwt.decode(accessToken) as JWTPayload;
  const refreshTokenDecoded = jwt.decode(refreshToken) as JWTPayload;
  
  return {
    accessToken,
    refreshToken,
    expiresIn: accessTokenDecoded.exp - accessTokenDecoded.iat,
    refreshExpiresIn: refreshTokenDecoded.exp - refreshTokenDecoded.iat
  };
}

/**
 * Verify and decode an access token
 */
export function verifyAccessToken(token: string): { success: boolean; payload?: JWTPayload; error?: string } {
  try {
    const config = getJWTConfig();
    const payload = jwt.verify(token, config.accessTokenSecret, {
      issuer: config.issuer,
      audience: config.audience,
      algorithms: ['HS256']
    }) as JWTPayload;
    
    // Verify token type
    if (payload.type !== TokenType.ACCESS) {
      return { success: false, error: 'Invalid token type' };
    }
    
    return { success: true, payload };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { success: false, error: 'Token expired' };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { success: false, error: 'Invalid token' };
    } else {
      return { success: false, error: 'Token verification failed' };
    }
  }
}

/**
 * Verify and decode a refresh token
 */
export function verifyRefreshToken(token: string): { success: boolean; payload?: JWTPayload; error?: string } {
  try {
    const config = getJWTConfig();
    const payload = jwt.verify(token, config.refreshTokenSecret, {
      issuer: config.issuer,
      audience: config.audience,
      algorithms: ['HS256']
    }) as JWTPayload;
    
    // Verify token type
    if (payload.type !== TokenType.REFRESH) {
      return { success: false, error: 'Invalid token type' };
    }
    
    return { success: true, payload };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { success: false, error: 'Refresh token expired' };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { success: false, error: 'Invalid refresh token' };
    } else {
      return { success: false, error: 'Refresh token verification failed' };
    }
  }
}

/**
 * Generate email verification token
 */
export function generateEmailVerificationToken(userId: string, email: string): string {
  const config = getJWTConfig();
  
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId,
    email,
    role: 'user' as any, // Role not relevant for email verification
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

/**
 * Verify email verification token
 */
export function verifyEmailVerificationToken(token: string): { success: boolean; payload?: JWTPayload; error?: string } {
  try {
    const config = getJWTConfig();
    const payload = jwt.verify(token, config.emailVerificationSecret, {
      issuer: config.issuer,
      audience: config.audience,
      algorithms: ['HS256']
    }) as JWTPayload;
    
    if (payload.type !== TokenType.EMAIL_VERIFICATION) {
      return { success: false, error: 'Invalid token type' };
    }
    
    return { success: true, payload };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { success: false, error: 'Email verification token expired' };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { success: false, error: 'Invalid email verification token' };
    } else {
      return { success: false, error: 'Email verification token verification failed' };
    }
  }
}

/**
 * Generate password reset token
 */
export function generatePasswordResetToken(userId: string, email: string): string {
  const config = getJWTConfig();
  
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId,
    email,
    role: 'user' as any, // Role not relevant for password reset
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

/**
 * Verify password reset token
 */
export function verifyPasswordResetToken(token: string): { success: boolean; payload?: JWTPayload; error?: string } {
  try {
    const config = getJWTConfig();
    const payload = jwt.verify(token, config.passwordResetSecret, {
      issuer: config.issuer,
      audience: config.audience,
      algorithms: ['HS256']
    }) as JWTPayload;
    
    if (payload.type !== TokenType.PASSWORD_RESET) {
      return { success: false, error: 'Invalid token type' };
    }
    
    return { success: true, payload };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { success: false, error: 'Password reset token expired' };
    } else if (error instanceof jwt.JsonWebTokenError) {
      return { success: false, error: 'Invalid password reset token' };
    } else {
      return { success: false, error: 'Password reset token verification failed' };
    }
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | undefined): string | null {
  if (!authHeader) {
    return null;
  }
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Decode token without verification (for debugging/inspection)
 */
export function decodeTokenUnsafe(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Check if token is expired without verification
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTimestamp;
  } catch (error) {
    return true;
  }
}

/**
 * Get token expiry time
 */
export function getTokenExpiry(token: string): Date | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return null;
    }
    
    return new Date(decoded.exp * 1000);
  } catch (error) {
    return null;
  }
}

/**
 * Get time until token expires (in seconds)
 */
export function getTimeUntilExpiry(token: string): number | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return null;
    }
    
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return Math.max(0, decoded.exp - currentTimestamp);
  } catch (error) {
    return null;
  }
}

/**
 * Generate a new access token from a refresh token
 */
export function refreshAccessToken(refreshToken: string, user: UserProfile): { success: boolean; accessToken?: string; error?: string } {
  const verificationResult = verifyRefreshToken(refreshToken);
  
  if (!verificationResult.success) {
    return { success: false, error: verificationResult.error };
  }
  
  const payload = verificationResult.payload!;
  
  // Verify the token belongs to the provided user
  if (payload.userId !== user.id) {
    return { success: false, error: 'Token user mismatch' };
  }
  
  // Generate new access token
  const config = getJWTConfig();
  const jti = uuidv4();
  
  const accessPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
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

/**
 * Blacklist/revoke token utilities (for future implementation with Redis/database)
 */
export class TokenBlacklist {
  private static blacklistedTokens: Set<string> = new Set();
  
  static async addToBlacklist(jti: string, expiresAt: Date): Promise<void> {
    // In production, this should be stored in Redis or database
    this.blacklistedTokens.add(jti);
    
    // Set timeout to remove expired tokens
    const timeoutMs = expiresAt.getTime() - Date.now();
    if (timeoutMs > 0) {
      setTimeout(() => {
        this.blacklistedTokens.delete(jti);
      }, timeoutMs);
    }
  }
  
  static async isBlacklisted(jti: string): Promise<boolean> {
    return this.blacklistedTokens.has(jti);
  }
  
  static async clearExpiredTokens(): Promise<void> {
    // In production, this would be handled by Redis expiry or database cleanup
    // For in-memory implementation, expiry is handled by setTimeout above
  }
}

/**
 * Validate JWT configuration
 */
export function validateJWTConfig(): { isValid: boolean; errors: string[] } {
  const config = getJWTConfig();
  const errors: string[] = [];
  
  // Check for default/weak secrets
  if (config.accessTokenSecret === 'your-super-secret-access-key') {
    errors.push('JWT_ACCESS_SECRET must be set to a secure value');
  }
  
  if (config.refreshTokenSecret === 'your-super-secret-refresh-key') {
    errors.push('JWT_REFRESH_SECRET must be set to a secure value');
  }
  
  // Check secret strength
  if (config.accessTokenSecret.length < 32) {
    errors.push('JWT_ACCESS_SECRET should be at least 32 characters long');
  }
  
  if (config.refreshTokenSecret.length < 32) {
    errors.push('JWT_REFRESH_SECRET should be at least 32 characters long');
  }
  
  // Ensure different secrets
  if (config.accessTokenSecret === config.refreshTokenSecret) {
    errors.push('Access and refresh token secrets must be different');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export { getJWTConfig };