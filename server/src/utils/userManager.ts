/**
 * User Management Utilities
 * 
 * In-memory user storage and management for JWT authentication system.
 * In production, this should be replaced with a proper database implementation.
 */

import { v4 as uuidv4 } from 'uuid';
import { 
  User, 
  UserProfile, 
  UserRole, 
  UserStorage, 
  AuthErrorCode,
  SecurityConfig 
} from '../types/auth.js';
import { hashPassword, verifyPassword, DEFAULT_SECURITY_CONFIG } from './passwordUtils.js';

/**
 * In-memory user storage implementation
 * Note: This is for development/demo purposes only. Use a proper database in production.
 */
class InMemoryUserStorage implements UserStorage {
  private users: Map<string, User> = new Map();
  private emailIndex: Map<string, string> = new Map(); // email -> userId mapping
  private config: SecurityConfig;

  constructor(config: SecurityConfig = DEFAULT_SECURITY_CONFIG) {
    this.config = config;
    this.initializeDefaultUsers();
  }

  /**
   * Initialize with some default users for testing
   */
  private async initializeDefaultUsers(): Promise<void> {
    try {
      // Create admin user
      const adminPassword = await hashPassword('Admin123!');
      const adminUser: User = {
        id: uuidv4(),
        email: 'admin@rebootmedia.com',
        password: adminPassword,
        role: UserRole.ADMIN,
        isActive: true,
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        failedLoginAttempts: 0,
        refreshTokens: []
      };
      
      this.users.set(adminUser.id, adminUser);
      this.emailIndex.set(adminUser.email.toLowerCase(), adminUser.id);
      
      // Create test user
      const userPassword = await hashPassword('User123!');
      const testUser: User = {
        id: uuidv4(),
        email: 'user@example.com',
        password: userPassword,
        role: UserRole.USER,
        isActive: true,
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        failedLoginAttempts: 0,
        refreshTokens: []
      };
      
      this.users.set(testUser.id, testUser);
      this.emailIndex.set(testUser.email.toLowerCase(), testUser.id);
      
      console.log('Default users initialized:');
      console.log('- Admin: admin@rebootmedia.com / Admin123!');
      console.log('- User: user@example.com / User123!');
      
    } catch (error) {
      console.error('Failed to initialize default users:', error);
    }
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = uuidv4();
    const now = new Date();
    
    const user: User = {
      ...userData,
      id,
      createdAt: now,
      updatedAt: now
    };
    
    this.users.set(id, user);
    this.emailIndex.set(userData.email.toLowerCase(), id);
    
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userId = this.emailIndex.get(email.toLowerCase());
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  async update(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: new Date()
    };
    
    // Update email index if email changed
    if (updates.email && updates.email !== user.email) {
      this.emailIndex.delete(user.email.toLowerCase());
      this.emailIndex.set(updates.email.toLowerCase(), id);
    }
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;
    
    this.users.delete(id);
    this.emailIndex.delete(user.email.toLowerCase());
    return true;
  }

  async addRefreshToken(userId: string, token: string): Promise<void> {
    const user = this.users.get(userId);
    if (!user) return;
    
    // Limit number of refresh tokens
    if (user.refreshTokens.length >= this.config.maxRefreshTokens) {
      user.refreshTokens.shift(); // Remove oldest token
    }
    
    user.refreshTokens.push(token);
    user.updatedAt = new Date();
    this.users.set(userId, user);
  }

  async removeRefreshToken(userId: string, token: string): Promise<void> {
    const user = this.users.get(userId);
    if (!user) return;
    
    user.refreshTokens = user.refreshTokens.filter(t => t !== token);
    user.updatedAt = new Date();
    this.users.set(userId, user);
  }

  async clearRefreshTokens(userId: string): Promise<void> {
    const user = this.users.get(userId);
    if (!user) return;
    
    user.refreshTokens = [];
    user.updatedAt = new Date();
    this.users.set(userId, user);
  }

  async incrementFailedLoginAttempts(userId: string): Promise<void> {
    const user = this.users.get(userId);
    if (!user) return;
    
    user.failedLoginAttempts++;
    user.updatedAt = new Date();
    
    // Lock account if too many failed attempts
    if (user.failedLoginAttempts >= this.config.maxFailedLoginAttempts) {
      const lockoutDuration = this.config.lockoutDurationMinutes * 60 * 1000;
      user.lockoutUntil = new Date(Date.now() + lockoutDuration);
    }
    
    this.users.set(userId, user);
  }

  async resetFailedLoginAttempts(userId: string): Promise<void> {
    const user = this.users.get(userId);
    if (!user) return;
    
    user.failedLoginAttempts = 0;
    user.lockoutUntil = undefined;
    user.lastLogin = new Date();
    user.updatedAt = new Date();
    this.users.set(userId, user);
  }

  async lockAccount(userId: string, lockoutUntil: Date): Promise<void> {
    const user = this.users.get(userId);
    if (!user) return;
    
    user.lockoutUntil = lockoutUntil;
    user.updatedAt = new Date();
    this.users.set(userId, user);
  }

  // Utility methods for listing and management
  async getAllUsers(): Promise<UserProfile[]> {
    return Array.from(this.users.values()).map(user => this.toUserProfile(user));
  }

  async getUserCount(): Promise<number> {
    return this.users.size;
  }

  async isRefreshTokenValid(userId: string, token: string): Promise<boolean> {
    const user = this.users.get(userId);
    if (!user) return false;
    return user.refreshTokens.includes(token);
  }

  private toUserProfile(user: User): UserProfile {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    };
  }
}

/**
 * User Manager - High-level user operations
 */
export class UserManager {
  private storage: UserStorage;

  constructor(storage?: UserStorage) {
    this.storage = storage || new InMemoryUserStorage();
  }

  /**
   * Register a new user
   */
  async registerUser(email: string, password: string, role: UserRole = UserRole.USER): Promise<{ success: boolean; user?: UserProfile; error?: AuthErrorCode }> {
    try {
      // Check if user already exists
      const existingUser = await this.storage.findByEmail(email);
      if (existingUser) {
        return { success: false, error: AuthErrorCode.USER_ALREADY_EXISTS };
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        isActive: true,
        isEmailVerified: false, // Require email verification
        failedLoginAttempts: 0,
        refreshTokens: []
      };

      const user = await this.storage.create(userData);
      
      return { 
        success: true, 
        user: this.toUserProfile(user) 
      };
    } catch (error) {
      console.error('User registration error:', error);
      return { success: false, error: AuthErrorCode.INTERNAL_ERROR };
    }
  }

  /**
   * Authenticate user login
   */
  async authenticateUser(email: string, password: string): Promise<{ success: boolean; user?: UserProfile; error?: AuthErrorCode }> {
    try {
      const user = await this.storage.findByEmail(email);
      if (!user) {
        return { success: false, error: AuthErrorCode.INVALID_CREDENTIALS };
      }

      // Check if account is locked
      if (user.lockoutUntil && user.lockoutUntil > new Date()) {
        return { success: false, error: AuthErrorCode.ACCOUNT_LOCKED };
      }

      // Check if account is active
      if (!user.isActive) {
        return { success: false, error: AuthErrorCode.UNAUTHORIZED };
      }

      // Verify password
      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) {
        await this.storage.incrementFailedLoginAttempts(user.id);
        return { success: false, error: AuthErrorCode.INVALID_CREDENTIALS };
      }

      // Reset failed login attempts on successful login
      await this.storage.resetFailedLoginAttempts(user.id);

      return { 
        success: true, 
        user: this.toUserProfile(user) 
      };
    } catch (error) {
      console.error('User authentication error:', error);
      return { success: false, error: AuthErrorCode.INTERNAL_ERROR };
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<UserProfile | null> {
    const user = await this.storage.findById(id);
    return user ? this.toUserProfile(user) : null;
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<UserProfile | null> {
    const user = await this.storage.findByEmail(email);
    return user ? this.toUserProfile(user) : null;
  }

  /**
   * Update user profile
   */
  async updateUser(id: string, updates: Partial<Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>>): Promise<UserProfile | null> {
    const updatedUser = await this.storage.update(id, updates);
    return updatedUser ? this.toUserProfile(updatedUser) : null;
  }

  /**
   * Change user password
   */
  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: AuthErrorCode }> {
    try {
      const user = await this.storage.findById(id);
      if (!user) {
        return { success: false, error: AuthErrorCode.USER_NOT_FOUND };
      }

      // Verify current password
      const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return { success: false, error: AuthErrorCode.INVALID_CREDENTIALS };
      }

      // Hash new password
      const hashedNewPassword = await hashPassword(newPassword);
      
      // Update password and clear refresh tokens for security
      await this.storage.update(id, { password: hashedNewPassword });
      await this.storage.clearRefreshTokens(id);

      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: AuthErrorCode.INTERNAL_ERROR };
    }
  }

  /**
   * Verify email address
   */
  async verifyEmail(id: string): Promise<boolean> {
    const user = await this.storage.update(id, { isEmailVerified: true });
    return user !== null;
  }

  /**
   * Deactivate user account
   */
  async deactivateUser(id: string): Promise<boolean> {
    const user = await this.storage.update(id, { isActive: false });
    if (user) {
      await this.storage.clearRefreshTokens(id);
      return true;
    }
    return false;
  }

  /**
   * Add refresh token to user
   */
  async addRefreshToken(userId: string, token: string): Promise<void> {
    await this.storage.addRefreshToken(userId, token);
  }

  /**
   * Remove refresh token from user
   */
  async removeRefreshToken(userId: string, token: string): Promise<void> {
    await this.storage.removeRefreshToken(userId, token);
  }

  /**
   * Validate refresh token
   */
  async isRefreshTokenValid(userId: string, token: string): Promise<boolean> {
    return await this.storage.isRefreshTokenValid(userId, token);
  }

  /**
   * Clear all refresh tokens for user (logout from all devices)
   */
  async clearAllRefreshTokens(userId: string): Promise<void> {
    await this.storage.clearRefreshTokens(userId);
  }

  /**
   * Convert User to UserProfile (remove sensitive data)
   */
  private toUserProfile(user: User): UserProfile {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    };
  }
}

// Export default instance
export const userManager = new UserManager();
export default userManager;