/**
 * Authentication Types and Interfaces
 * 
 * Defines types for JWT authentication system including user models,
 * token payloads, and authentication request/response structures.
 */

export interface User {
  id: string;
  email: string;
  password: string; // Hashed password
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  failedLoginAttempts: number;
  lockoutUntil?: Date;
  refreshTokens: string[]; // Array of valid refresh tokens
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  type: TokenType;
  iat: number;
  exp: number;
  jti?: string; // JWT ID for token tracking
}

export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset'
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: UserProfile;
    tokens: TokenPair;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
  error?: {
    code: string;
    message: string;
  };
}

// Extended Express Request interface
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: UserProfile;
  token?: string;
  tokenType?: TokenType;
}

// JWT Configuration
export interface JWTConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  emailVerificationSecret: string;
  passwordResetSecret: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  emailVerificationExpiry: string;
  passwordResetExpiry: string;
  issuer: string;
  audience: string;
}

// Security Configuration
export interface SecurityConfig {
  maxFailedLoginAttempts: number;
  lockoutDurationMinutes: number;
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSpecialChars: boolean;
  maxRefreshTokens: number;
  tokenRotationEnabled: boolean;
}

// Rate limiting configuration for auth endpoints
export interface AuthRateLimitConfig {
  loginWindowMs: number;
  loginMaxAttempts: number;
  registerWindowMs: number;
  registerMaxAttempts: number;
  forgotPasswordWindowMs: number;
  forgotPasswordMaxAttempts: number;
}

// Database storage interface (for future database integration)
export interface UserStorage {
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, updates: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  addRefreshToken(userId: string, token: string): Promise<void>;
  removeRefreshToken(userId: string, token: string): Promise<void>;
  clearRefreshTokens(userId: string): Promise<void>;
  isRefreshTokenValid(userId: string, token: string): Promise<boolean>;
  incrementFailedLoginAttempts(userId: string): Promise<void>;
  resetFailedLoginAttempts(userId: string): Promise<void>;
  lockAccount(userId: string, lockoutUntil: Date): Promise<void>;
}

// Error codes for consistent error handling
export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_REVOKED = 'TOKEN_REVOKED',
  WEAK_PASSWORD = 'WEAK_PASSWORD',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

// Audit log interface for security monitoring
export interface AuthAuditLog {
  id: string;
  userId?: string;
  action: AuthAuditAction;
  ip: string;
  userAgent: string;
  success: boolean;
  errorCode?: AuthErrorCode;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export enum AuthAuditAction {
  LOGIN_ATTEMPT = 'login_attempt',
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILED = 'login_failed',
  LOGOUT = 'logout',
  REGISTER_ATTEMPT = 'register_attempt',
  REGISTER_SUCCESS = 'register_success',
  REGISTER_FAILED = 'register_failed',
  TOKEN_REFRESH = 'token_refresh',
  PASSWORD_CHANGE = 'password_change',
  PASSWORD_RESET_REQUEST = 'password_reset_request',
  PASSWORD_RESET_SUCCESS = 'password_reset_success',
  EMAIL_VERIFICATION = 'email_verification',
  ACCOUNT_LOCKED = 'account_locked',
  ACCOUNT_UNLOCKED = 'account_unlocked'
}