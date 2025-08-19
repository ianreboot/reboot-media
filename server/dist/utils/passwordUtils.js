import bcrypt from 'bcryptjs';
const DEFAULT_SECURITY_CONFIG = {
    maxFailedLoginAttempts: 5,
    lockoutDurationMinutes: 30,
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    maxRefreshTokens: 5,
    tokenRotationEnabled: true
};
export async function hashPassword(password) {
    try {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        console.error('Password hashing error:', error);
        throw new Error('Failed to hash password');
    }
}
export async function verifyPassword(password, hash) {
    try {
        const isValid = await bcrypt.compare(password, hash);
        return isValid;
    }
    catch (error) {
        console.error('Password verification error:', error);
        return false;
    }
}
export function validatePasswordStrength(password, config = DEFAULT_SECURITY_CONFIG) {
    const errors = [];
    if (password.length < config.passwordMinLength) {
        errors.push(`Password must be at least ${config.passwordMinLength} characters long`);
    }
    if (config.passwordRequireUppercase && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (config.passwordRequireLowercase && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (config.passwordRequireNumbers && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (config.passwordRequireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    if (isCommonWeakPassword(password)) {
        errors.push('Password is too common or weak');
    }
    if (hasSequentialCharacters(password)) {
        errors.push('Password should not contain sequential characters (e.g., "123", "abc")');
    }
    if (hasRepeatedCharacters(password)) {
        errors.push('Password should not contain excessive repeated characters');
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
export function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}
export function generateSecurePassword(length = 16) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
    let password = '';
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += numberChars[Math.floor(Math.random() * numberChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    return shuffleString(password);
}
function isCommonWeakPassword(password) {
    const commonWeakPasswords = [
        'password', '123456', '123456789', 'qwerty', 'abc123',
        'password123', 'admin', 'root', 'user', 'test',
        '12345678', '1234567890', 'letmein', 'welcome',
        'monkey', 'dragon', 'princess', 'football'
    ];
    return commonWeakPasswords.includes(password.toLowerCase());
}
function hasSequentialCharacters(password) {
    const sequences = [
        'abcdefghijklmnopqrstuvwxyz',
        '0123456789',
        'qwertyuiopasdfghjklzxcvbnm'
    ];
    for (const sequence of sequences) {
        for (let i = 0; i <= sequence.length - 3; i++) {
            const substr = sequence.substring(i, i + 3);
            if (password.toLowerCase().includes(substr)) {
                return true;
            }
            if (password.toLowerCase().includes(substr.split('').reverse().join(''))) {
                return true;
            }
        }
    }
    return false;
}
function hasRepeatedCharacters(password) {
    for (let i = 0; i < password.length - 2; i++) {
        if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
            return true;
        }
    }
    return false;
}
function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}
export function calculatePasswordEntropy(password) {
    let charsetSize = 0;
    if (/[a-z]/.test(password))
        charsetSize += 26;
    if (/[A-Z]/.test(password))
        charsetSize += 26;
    if (/\d/.test(password))
        charsetSize += 10;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
        charsetSize += 32;
    const entropy = password.length * Math.log2(charsetSize);
    return Math.round(entropy * 100) / 100;
}
export function getPasswordStrengthLevel(password) {
    const entropy = calculatePasswordEntropy(password);
    if (entropy < 28)
        return 'weak';
    if (entropy < 36)
        return 'fair';
    if (entropy < 60)
        return 'good';
    if (entropy < 128)
        return 'strong';
    return 'very-strong';
}
export async function needsRehash(hash) {
    try {
        const saltRounds = parseInt(hash.split('$')[2]);
        return saltRounds < 12;
    }
    catch (error) {
        return true;
    }
}
export function secureCompare(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
}
export { DEFAULT_SECURITY_CONFIG };
//# sourceMappingURL=passwordUtils.js.map