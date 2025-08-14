import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { AppError } from './errorHandler.js';

/**
 * Security validation middleware for comprehensive input protection
 */

// Request body size validation
export const validateRequestSize = (req: Request, res: Response, next: NextFunction): void => {
  const contentLength = req.get('content-length');
  const maxSize = 10 * 1024 * 1024; // 10MB max

  if (contentLength && parseInt(contentLength) > maxSize) {
    throw new AppError('Request payload too large', 413, 'PAYLOAD_TOO_LARGE');
  }

  next();
};

// Content type validation
export const validateContentType = (req: Request, res: Response, next: NextFunction): void => {
  const contentType = req.get('content-type');
  
  if (req.method === 'POST' && contentType && !contentType.includes('application/json')) {
    throw new AppError('Invalid content type. Expected application/json', 415, 'INVALID_CONTENT_TYPE');
  }

  next();
};

// Enhanced parameter validation
export const validateParameters = (req: Request, res: Response, next: NextFunction): void => {
  // Check for suspicious query parameters
  const suspiciousParams = ['script', 'eval', 'javascript', 'vbscript', 'onload', 'onerror'];
  const queryKeys = Object.keys(req.query);
  
  for (const key of queryKeys) {
    if (suspiciousParams.some(param => key.toLowerCase().includes(param))) {
      throw new AppError('Suspicious parameter detected', 400, 'SUSPICIOUS_PARAMETER');
    }
  }

  next();
};

// SQL injection detection middleware
export const detectSqlInjection = (req: Request, res: Response, next: NextFunction): void => {
  const sqlPatterns = [
    /('|(--)|(;)|(\|)|(\*)|(%))/gi,
    /(union|select|insert|delete|update|drop|create|alter|exec|script)/gi,
    /(or\s+1\s*=\s*1|and\s+1\s*=\s*1)/gi,
    /(\bor\b|\band\b)\s*[\d\w]*\s*=\s*[\d\w]*/gi
  ];

  const checkForSqlInjection = (obj: any): boolean => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        for (const pattern of sqlPatterns) {
          if (pattern.test(obj[key])) {
            console.warn(`Potential SQL injection detected in ${key}:`, obj[key]);
            return true;
          }
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (checkForSqlInjection(obj[key])) return true;
      }
    }
    return false;
  };

  if (checkForSqlInjection(req.body) || checkForSqlInjection(req.query)) {
    throw new AppError('Potentially malicious input detected', 400, 'SQL_INJECTION_DETECTED');
  }

  next();
};

// XSS detection middleware
export const detectXss = (req: Request, res: Response, next: NextFunction): void => {
  const xssPatterns = [
    /<[^>]*>/gi,
    /javascript:/gi,
    /data:/gi,
    /vbscript:/gi,
    /onload\s*=/gi,
    /onerror\s*=/gi,
    /onclick\s*=/gi,
    /onmouseover\s*=/gi,
    /alert\s*\(/gi,
    /document\./gi,
    /window\./gi
  ];

  const checkForXss = (obj: any): boolean => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        for (const pattern of xssPatterns) {
          if (pattern.test(obj[key])) {
            console.warn(`Potential XSS detected in ${key}:`, obj[key]);
            return true;
          }
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (checkForXss(obj[key])) return true;
      }
    }
    return false;
  };

  if (checkForXss(req.body) || checkForXss(req.query)) {
    throw new AppError('Potentially malicious script detected', 400, 'XSS_DETECTED');
  }

  next();
};

// Rate limiting for validation failures
export const validationFailureLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit validation failures per IP
  keyGenerator: (req: Request) => req.ip || 'unknown',
  skip: (req: Request) => {
    // Only apply to requests that might fail validation
    return !req.body || Object.keys(req.body).length === 0;
  },
  message: {
    success: false,
    error: {
      code: 'VALIDATION_RATE_LIMIT_EXCEEDED',
      message: 'Too many validation failures. Please check your input and try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Field-level validation chains for express-validator
export const leadFormValidationChains: ValidationChain[] = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .isAlpha('en-US', { ignore: ' -\'.' })
    .withMessage('Name contains invalid characters'),
  
  body('company')
    .trim()
    .isLength({ min: 2, max: 80 })
    .isAlphanumeric('en-US', { ignore: ' -\'.,&()' })
    .withMessage('Company name contains invalid characters'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Invalid email address'),
  
  body('specificIssue')
    .trim()
    .isLength({ min: 10, max: 1500 })
    .withMessage('Marketing challenge description must be 10-1500 characters'),
  
  body('website')
    .optional({ checkFalsy: true })
    .trim()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .isLength({ max: 200 })
    .withMessage('Invalid website URL'),
  
  body('revenue')
    .optional({ checkFalsy: true })
    .isIn(['500k-1m', '1m-3m', '3m-10m', '10m+']),
  
  body('industry')
    .optional({ checkFalsy: true })
    .isIn(['software', 'healthcare', 'ecommerce', 'financial', 'professional', 'manufacturing', 'other']),
  
  body('teamSize')
    .optional({ checkFalsy: true })
    .isIn(['1-10', '11-50', '51-200', '200+']),
  
  body('timeline')
    .optional({ checkFalsy: true })
    .isIn(['asap', '1-3months', '3-6months', '6months+']),
  
  body('currentMarketing')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 800 })
    .withMessage('Current marketing description too long'),
  
  body('honeypot')
    .optional()
    .isEmpty()
    .withMessage('Bot detected')
];

export const contactFormValidationChains: ValidationChain[] = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .isAlpha('en-US', { ignore: ' -\'.' })
    .withMessage('Name contains invalid characters'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Invalid email address'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 120 })
    .withMessage('Subject must be 5-120 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1500 })
    .withMessage('Message must be 10-1500 characters'),
  
  body('honeypot')
    .optional()
    .isEmpty()
    .withMessage('Bot detected')
];

// Process validation results
export const processValidationResults = (req: Request, res: Response, next: NextFunction): void | Response => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const validationErrors = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg,
    }));

    // Log validation failures for security monitoring
    console.warn('Validation failure:', {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      errors: validationErrors,
      requestId: (req as any).requestId,
    });

    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data provided',
        details: validationErrors,
        requestId: (req as any).requestId,
      },
    });
  }

  next();
};

// Combined security middleware stack
export const securityValidationStack = [
  validateRequestSize,
  validateContentType,
  validateParameters,
  validationFailureLimiter,
  detectSqlInjection,
  detectXss,
];

// Form-specific middleware stacks
export const leadFormSecurityStack = [
  ...securityValidationStack,
  ...leadFormValidationChains,
  processValidationResults,
];

export const contactFormSecurityStack = [
  ...securityValidationStack,
  ...contactFormValidationChains,
  processValidationResults,
];