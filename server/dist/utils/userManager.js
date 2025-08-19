import { v4 as uuidv4 } from 'uuid';
import { UserRole, AuthErrorCode } from '../types/auth.js';
import { hashPassword, verifyPassword, DEFAULT_SECURITY_CONFIG } from './passwordUtils.js';
class InMemoryUserStorage {
    users = new Map();
    emailIndex = new Map();
    config;
    constructor(config = DEFAULT_SECURITY_CONFIG) {
        this.config = config;
        this.initializeDefaultUsers();
    }
    async initializeDefaultUsers() {
        try {
            const adminPassword = await hashPassword('Admin123!');
            const adminUser = {
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
            const userPassword = await hashPassword('User123!');
            const testUser = {
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
        }
        catch (error) {
            console.error('Failed to initialize default users:', error);
        }
    }
    async create(userData) {
        const id = uuidv4();
        const now = new Date();
        const user = {
            ...userData,
            id,
            createdAt: now,
            updatedAt: now
        };
        this.users.set(id, user);
        this.emailIndex.set(userData.email.toLowerCase(), id);
        return user;
    }
    async findById(id) {
        return this.users.get(id) || null;
    }
    async findByEmail(email) {
        const userId = this.emailIndex.get(email.toLowerCase());
        if (!userId)
            return null;
        return this.users.get(userId) || null;
    }
    async update(id, updates) {
        const user = this.users.get(id);
        if (!user)
            return null;
        const updatedUser = {
            ...user,
            ...updates,
            updatedAt: new Date()
        };
        if (updates.email && updates.email !== user.email) {
            this.emailIndex.delete(user.email.toLowerCase());
            this.emailIndex.set(updates.email.toLowerCase(), id);
        }
        this.users.set(id, updatedUser);
        return updatedUser;
    }
    async delete(id) {
        const user = this.users.get(id);
        if (!user)
            return false;
        this.users.delete(id);
        this.emailIndex.delete(user.email.toLowerCase());
        return true;
    }
    async addRefreshToken(userId, token) {
        const user = this.users.get(userId);
        if (!user)
            return;
        if (user.refreshTokens.length >= this.config.maxRefreshTokens) {
            user.refreshTokens.shift();
        }
        user.refreshTokens.push(token);
        user.updatedAt = new Date();
        this.users.set(userId, user);
    }
    async removeRefreshToken(userId, token) {
        const user = this.users.get(userId);
        if (!user)
            return;
        user.refreshTokens = user.refreshTokens.filter(t => t !== token);
        user.updatedAt = new Date();
        this.users.set(userId, user);
    }
    async clearRefreshTokens(userId) {
        const user = this.users.get(userId);
        if (!user)
            return;
        user.refreshTokens = [];
        user.updatedAt = new Date();
        this.users.set(userId, user);
    }
    async incrementFailedLoginAttempts(userId) {
        const user = this.users.get(userId);
        if (!user)
            return;
        user.failedLoginAttempts++;
        user.updatedAt = new Date();
        if (user.failedLoginAttempts >= this.config.maxFailedLoginAttempts) {
            const lockoutDuration = this.config.lockoutDurationMinutes * 60 * 1000;
            user.lockoutUntil = new Date(Date.now() + lockoutDuration);
        }
        this.users.set(userId, user);
    }
    async resetFailedLoginAttempts(userId) {
        const user = this.users.get(userId);
        if (!user)
            return;
        user.failedLoginAttempts = 0;
        user.lockoutUntil = undefined;
        user.lastLogin = new Date();
        user.updatedAt = new Date();
        this.users.set(userId, user);
    }
    async lockAccount(userId, lockoutUntil) {
        const user = this.users.get(userId);
        if (!user)
            return;
        user.lockoutUntil = lockoutUntil;
        user.updatedAt = new Date();
        this.users.set(userId, user);
    }
    async getAllUsers() {
        return Array.from(this.users.values()).map(user => this.toUserProfile(user));
    }
    async getUserCount() {
        return this.users.size;
    }
    async isRefreshTokenValid(userId, token) {
        const user = this.users.get(userId);
        if (!user)
            return false;
        return user.refreshTokens.includes(token);
    }
    toUserProfile(user) {
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
export class UserManager {
    storage;
    constructor(storage) {
        this.storage = storage || new InMemoryUserStorage();
    }
    async registerUser(email, password, role = UserRole.USER) {
        try {
            const existingUser = await this.storage.findByEmail(email);
            if (existingUser) {
                return { success: false, error: AuthErrorCode.USER_ALREADY_EXISTS };
            }
            const hashedPassword = await hashPassword(password);
            const userData = {
                email: email.toLowerCase(),
                password: hashedPassword,
                role,
                isActive: true,
                isEmailVerified: false,
                failedLoginAttempts: 0,
                refreshTokens: []
            };
            const user = await this.storage.create(userData);
            return {
                success: true,
                user: this.toUserProfile(user)
            };
        }
        catch (error) {
            console.error('User registration error:', error);
            return { success: false, error: AuthErrorCode.INTERNAL_ERROR };
        }
    }
    async authenticateUser(email, password) {
        try {
            const user = await this.storage.findByEmail(email);
            if (!user) {
                return { success: false, error: AuthErrorCode.INVALID_CREDENTIALS };
            }
            if (user.lockoutUntil && user.lockoutUntil > new Date()) {
                return { success: false, error: AuthErrorCode.ACCOUNT_LOCKED };
            }
            if (!user.isActive) {
                return { success: false, error: AuthErrorCode.UNAUTHORIZED };
            }
            const isPasswordValid = await verifyPassword(password, user.password);
            if (!isPasswordValid) {
                await this.storage.incrementFailedLoginAttempts(user.id);
                return { success: false, error: AuthErrorCode.INVALID_CREDENTIALS };
            }
            await this.storage.resetFailedLoginAttempts(user.id);
            return {
                success: true,
                user: this.toUserProfile(user)
            };
        }
        catch (error) {
            console.error('User authentication error:', error);
            return { success: false, error: AuthErrorCode.INTERNAL_ERROR };
        }
    }
    async getUserById(id) {
        const user = await this.storage.findById(id);
        return user ? this.toUserProfile(user) : null;
    }
    async getUserByEmail(email) {
        const user = await this.storage.findByEmail(email);
        return user ? this.toUserProfile(user) : null;
    }
    async updateUser(id, updates) {
        const updatedUser = await this.storage.update(id, updates);
        return updatedUser ? this.toUserProfile(updatedUser) : null;
    }
    async changePassword(id, currentPassword, newPassword) {
        try {
            const user = await this.storage.findById(id);
            if (!user) {
                return { success: false, error: AuthErrorCode.USER_NOT_FOUND };
            }
            const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                return { success: false, error: AuthErrorCode.INVALID_CREDENTIALS };
            }
            const hashedNewPassword = await hashPassword(newPassword);
            await this.storage.update(id, { password: hashedNewPassword });
            await this.storage.clearRefreshTokens(id);
            return { success: true };
        }
        catch (error) {
            console.error('Password change error:', error);
            return { success: false, error: AuthErrorCode.INTERNAL_ERROR };
        }
    }
    async verifyEmail(id) {
        const user = await this.storage.update(id, { isEmailVerified: true });
        return user !== null;
    }
    async deactivateUser(id) {
        const user = await this.storage.update(id, { isActive: false });
        if (user) {
            await this.storage.clearRefreshTokens(id);
            return true;
        }
        return false;
    }
    async addRefreshToken(userId, token) {
        await this.storage.addRefreshToken(userId, token);
    }
    async removeRefreshToken(userId, token) {
        await this.storage.removeRefreshToken(userId, token);
    }
    async isRefreshTokenValid(userId, token) {
        return await this.storage.isRefreshTokenValid(userId, token);
    }
    async clearAllRefreshTokens(userId) {
        await this.storage.clearRefreshTokens(userId);
    }
    toUserProfile(user) {
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
export const userManager = new UserManager();
export default userManager;
//# sourceMappingURL=userManager.js.map