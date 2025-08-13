/**
 * Password Utilities
 * 
 * Secure password hashing, validation, and strength checking utilities
 * using bcryptjs with security best practices.
 */

import bcrypt from 'bcryptjs';
import { SecurityConfig, AuthErrorCode } from '../types/auth.js';

// Default security configuration
const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
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

/**
 * Hash a password using bcrypt with secure salt rounds
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    // Use 12 salt rounds for good security/performance balance
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Password hashing error:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

/**
 * Validate password strength according to security policy
 */
export function validatePasswordStrength(
  password: string, 
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check minimum length
  if (password.length < config.passwordMinLength) {
    errors.push(`Password must be at least ${config.passwordMinLength} characters long`);
  }

  // Check for uppercase letters
  if (config.passwordRequireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Check for lowercase letters
  if (config.passwordRequireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // Check for numbers
  if (config.passwordRequireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // Check for special characters
  if (config.passwordRequireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Check for common weak patterns
  if (isCommonWeakPassword(password)) {
    errors.push('Password is too common or weak');
  }

  // Check for sequential characters
  if (hasSequentialCharacters(password)) {
    errors.push('Password should not contain sequential characters (e.g., "123", "abc")');
  }

  // Check for repeated characters
  if (hasRepeatedCharacters(password)) {
    errors.push('Password should not contain excessive repeated characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Check if password matches confirm password
 */
export function validatePasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

/**
 * Generate a secure random password
 */
export function generateSecurePassword(length: number = 16): string {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
  
  let password = '';
  
  // Ensure at least one character from each required set
  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  password += numberChars[Math.floor(Math.random() * numberChars.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password to avoid predictable patterns
  return shuffleString(password);
}

/**
 * Check if password is in common weak password list
 */
function isCommonWeakPassword(password: string): boolean {
  const commonWeakPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123',
    'password123', 'admin', 'root', 'user', 'test',
    '12345678', '1234567890', 'letmein', 'welcome',
    'monkey', 'dragon', 'princess', 'football'
  ];
  
  return commonWeakPasswords.includes(password.toLowerCase());
}

/**
 * Check for sequential characters (e.g., "123", "abc", "qwe")
 */
function hasSequentialCharacters(password: string): boolean {
  const sequences = [
    'abcdefghijklmnopqrstuvwxyz',
    '0123456789',
    'qwertyuiopasdfghjklzxcvbnm' // QWERTY keyboard layout
  ];
  
  for (const sequence of sequences) {
    for (let i = 0; i <= sequence.length - 3; i++) {
      const substr = sequence.substring(i, i + 3);
      if (password.toLowerCase().includes(substr)) {
        return true;
      }
      // Check reverse sequence
      if (password.toLowerCase().includes(substr.split('').reverse().join(''))) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Check for excessive repeated characters
 */
function hasRepeatedCharacters(password: string): boolean {
  // Check for 3 or more consecutive identical characters
  for (let i = 0; i < password.length - 2; i++) {
    if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
      return true;
    }
  }
  
  return false;
}

/**
 * Shuffle string characters randomly
 */
function shuffleString(str: string): string {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

/**
 * Calculate password entropy (bits of randomness)
 */
export function calculatePasswordEntropy(password: string): number {
  let charsetSize = 0;
  
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/\d/.test(password)) charsetSize += 10;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) charsetSize += 32;
  
  const entropy = password.length * Math.log2(charsetSize);
  return Math.round(entropy * 100) / 100;
}

/**
 * Get password strength level based on entropy
 */
export function getPasswordStrengthLevel(password: string): 'weak' | 'fair' | 'good' | 'strong' | 'very-strong' {
  const entropy = calculatePasswordEntropy(password);
  
  if (entropy < 28) return 'weak';
  if (entropy < 36) return 'fair';
  if (entropy < 60) return 'good';
  if (entropy < 128) return 'strong';
  return 'very-strong';
}

/**
 * Check if password needs to be rehashed (for salt round updates)
 */
export async function needsRehash(hash: string): Promise<boolean> {
  try {
    // Extract the current salt rounds from the hash
    const saltRounds = parseInt(hash.split('$')[2]);
    // Rehash if current salt rounds are less than our target (12)
    return saltRounds < 12;
  } catch (error) {
    // If we can't parse the hash, assume it needs rehashing
    return true;
  }
}

/**
 * Securely compare two hashes to prevent timing attacks
 */
export function secureCompare(a: string, b: string): boolean {
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