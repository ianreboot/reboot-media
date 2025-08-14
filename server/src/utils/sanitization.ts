import { LeadFormData, ContactFormData } from '../validators/formValidators.js';
import DOMPurify from 'isomorphic-dompurify';
import xss from 'xss';
import validator from 'validator';

// Configure XSS filter
const xssOptions = {
  whiteList: {}, // No HTML tags allowed
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script'],
};

/**
 * Sanitize and normalize form data
 */
export const sanitizeLeadFormData = (data: LeadFormData): LeadFormData => {
  return {
    name: sanitizeString(data.name),
    company: sanitizeString(data.company),
    email: data.email.toLowerCase().trim(),
    specificIssue: sanitizeString(data.specificIssue),
    website: data.website ? sanitizeUrl(data.website) : undefined,
    revenue: data.revenue || undefined,
    industry: data.industry || undefined,
    teamSize: data.teamSize || undefined,
    timeline: data.timeline || undefined,
    currentMarketing: data.currentMarketing ? sanitizeString(data.currentMarketing) : undefined,
    honeypot: data.honeypot || undefined,
  };
};

export const sanitizeContactFormData = (data: ContactFormData): ContactFormData => {
  return {
    name: sanitizeString(data.name),
    email: data.email.toLowerCase().trim(),
    subject: sanitizeString(data.subject),
    message: sanitizeString(data.message),
    honeypot: data.honeypot || undefined,
  };
};

/**
 * Advanced string sanitization with XSS and injection protection
 */
const sanitizeString = (str: string, allowBasicFormatting: boolean = false): string => {
  if (!str || typeof str !== 'string') return '';

  // Step 1: Trim and normalize whitespace
  let sanitized = str.trim().replace(/\s+/g, ' ');

  // Step 2: Remove control characters and non-printable characters
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

  // Step 3: HTML sanitization with DOMPurify
  if (allowBasicFormatting) {
    // Allow only safe basic formatting
    sanitized = DOMPurify.sanitize(sanitized, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    });
  } else {
    // Strip all HTML
    sanitized = DOMPurify.sanitize(sanitized, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    });
  }

  // Step 4: Additional XSS protection
  sanitized = xss(sanitized, xssOptions);

  // Step 5: Remove potential script injections
  const scriptPatterns = [
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi, // Event handlers
    /<\s*script/gi,
    /<\s*iframe/gi,
    /<\s*object/gi,
    /<\s*embed/gi,
    /<\s*link/gi,
    /<\s*meta/gi,
  ];

  scriptPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  // Step 6: SQL injection protection
  const sqlPatterns = [
    /('|(\-\-)|;|(\|)|(\*)|(%))/gi,
    /(union|select|insert|delete|update|drop|create|alter|exec)/gi,
  ];

  sqlPatterns.forEach(pattern => {
    // Replace SQL keywords with safe alternatives
    sanitized = sanitized.replace(pattern, (match) => 
      match.replace(/[^a-zA-Z0-9\s]/g, '')
    );
  });

  // Step 7: Normalize and validate length
  sanitized = sanitized.slice(0, 2000); // Hard limit

  return sanitized;
};

/**
 * Email-specific sanitization
 */
const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return '';

  // Normalize email
  const normalized = validator.normalizeEmail(email.trim().toLowerCase()) || email.trim().toLowerCase();
  
  // Validate email format
  if (!validator.isEmail(normalized)) {
    throw new Error('Invalid email format');
  }

  // Check domain restrictions  
  const domain = normalized.split('@')[1] || '';
  const suspiciousDomains = [
    '10minutemail.com',
    'guerrillamail.com',
    'tempmail.org',
    'mailinator.com',
  ];

  if (suspiciousDomains.includes(domain)) {
    throw new Error('Disposable email addresses are not allowed');
  }

  return normalized;
};

/**
 * URL sanitization and validation
 */
const sanitizeUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  // Ensure proper protocol
  let sanitized = trimmed;
  if (!validator.isURL(sanitized, { protocols: ['http', 'https'], require_protocol: true })) {
    // Try adding https
    sanitized = `https://${trimmed}`;
    if (!validator.isURL(sanitized, { protocols: ['http', 'https'], require_protocol: true })) {
      throw new Error('Invalid URL format');
    }
  }

  // Additional security checks
  const suspiciousPatterns = [
    /javascript:/gi,
    /data:/gi,
    /vbscript:/gi,
    /file:/gi,
    /ftp:/gi,
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(sanitized))) {
    throw new Error('Potentially unsafe URL protocol');
  }

  return sanitized;
};


/**
 * Check for bot indicators
 */
export const detectBot = (data: LeadFormData | ContactFormData, req: any): boolean => {
  // Honeypot field check
  if (data.honeypot && data.honeypot.trim() !== '') {
    return true;
  }

  // Check for suspicious user agents
  const userAgent = req.get('User-Agent') || '';
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /automated/i,
  ];

  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    return true;
  }

  // Skip timing check for API testing - in production you might want to 
  // implement proper session tracking or use a different bot detection method

  return false;
};

/**
 * Detect suspicious patterns in form submissions
 */
export const detectSuspiciousContent = (data: LeadFormData | ContactFormData): boolean => {
  const suspiciousPatterns = [
    /\b(viagra|cialis|casino|poker|lottery|winner)\b/gi,
    /\$\d+|£\d+|€\d+/g, // Currency amounts
    /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/g, // Credit card patterns
    /\b[A-Z]{2,}\b.*\b[A-Z]{2,}\b.*\b[A-Z]{2,}\b/g, // All caps spam
    /(click here|act now|urgent|limited time)/gi,
    /\.(tk|ml|ga|cf)\b/gi, // Suspicious TLDs
  ];

  const textFields = [];
  if ('name' in data) textFields.push(data.name);
  if ('company' in data) textFields.push(data.company);
  if ('specificIssue' in data) textFields.push(data.specificIssue);
  if ('currentMarketing' in data && data.currentMarketing) textFields.push(data.currentMarketing);
  if ('subject' in data) textFields.push(data.subject);
  if ('message' in data) textFields.push(data.message);

  const allText = textFields.join(' ');
  
  return suspiciousPatterns.some(pattern => pattern.test(allText));
};

/**
 * Generate comprehensive security audit log
 */
export const createSecurityLog = (data: any, req: any, eventType: string): object => {
  return {
    timestamp: new Date().toISOString(),
    eventType,
    requestId: req.requestId,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    method: req.method,
    url: req.url,
    referer: req.get('Referer'),
    origin: req.get('Origin'),
    contentType: req.get('Content-Type'),
    contentLength: req.get('Content-Length'),
    // Security indicators
    hasData: !!data,
    dataFields: data ? Object.keys(data) : [],
    fieldCount: data ? Object.keys(data).length : 0,
    suspiciousIndicators: {
      hasScriptTags: data && JSON.stringify(data).includes('<script'),
      hasSqlKeywords: data && /\b(select|insert|update|delete|drop|union)\b/i.test(JSON.stringify(data)),
      hasJavascript: data && /javascript:/i.test(JSON.stringify(data)),
      longFields: data ? Object.values(data).filter((v: any) => 
        typeof v === 'string' && v.length > 500).length : 0,
    },
  };
};

/**
 * Generate a safe error message for logs (backward compatibility)
 */
export const createLogMessage = (data: any, req: any): object => {
  return createSecurityLog(data, req, 'form_submission');
};

/**
 * Real-time threat detection
 */
export const detectRealTimeThreats = (req: any): string[] => {
  const threats: string[] = [];

  // Check for automated tools
  const userAgent = req.get('User-Agent') || '';
  if (/curl|wget|python|node|go-http|postman/i.test(userAgent)) {
    threats.push('AUTOMATED_TOOL');
  }

  // Check for missing common headers
  if (!req.get('Accept')) threats.push('MISSING_ACCEPT_HEADER');
  if (!req.get('Accept-Language')) threats.push('MISSING_LANGUAGE_HEADER');

  // Check for suspicious IP patterns (basic)
  const ip = req.ip;
  if (ip && (ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('172.'))) {
    // Private IPs might indicate proxy/VPN use
    // In production, you might want to check against known VPN/proxy lists
  }

  // Check request timing
  const timestamp = Date.now();
  // In production, implement proper request timing analysis

  return threats;
};

/**
 * Generate security score for submission
 */
export const calculateSecurityScore = (data: any, req: any): number => {
  let score = 100; // Start with perfect score

  // Deduct for bot indicators
  if (detectBot(data, req)) score -= 50;
  
  // Deduct for suspicious content
  if (detectSuspiciousContent && detectSuspiciousContent(data)) score -= 30;
  
  // Deduct for real-time threats
  const threats = detectRealTimeThreats(req);
  score -= threats.length * 10;
  
  // Deduct for missing common fields
  if (!req.get('Referer')) score -= 5;
  if (!req.get('Accept-Language')) score -= 5;
  
  return Math.max(0, score);
};