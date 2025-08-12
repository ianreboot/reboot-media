import { LeadFormData, ContactFormData } from '../validators/formValidators.js';

/**
 * Sanitize and normalize form data
 */
export const sanitizeLeadFormData = (data: LeadFormData): LeadFormData => {
  return {
    name: sanitizeString(data.name),
    company: sanitizeString(data.company),
    email: data.email.toLowerCase().trim(),
    specificIssue: sanitizeString(data.specificIssue),
    website: data.website ? normalizeUrl(data.website) : undefined,
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
 * Basic string sanitization
 */
const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .replace(/\s+/g, ' '); // Normalize whitespace
};

/**
 * Normalize URL format
 */
const normalizeUrl = (url: string): string => {
  const trimmed = url.trim();
  if (!trimmed) return '';
  
  // Add protocol if missing
  if (!trimmed.match(/^https?:\/\//)) {
    return `https://${trimmed}`;
  }
  
  return trimmed;
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
 * Generate a safe error message for logs
 */
export const createLogMessage = (data: any, req: any): object => {
  return {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    method: req.method,
    url: req.url,
    requestId: req.requestId,
    // Don't log sensitive data like email or personal information
    hasData: !!data,
    dataFields: data ? Object.keys(data) : [],
  };
};