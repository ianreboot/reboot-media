import Joi from 'joi';
import validator from 'validator';
const SAFE_NAME_PATTERN = /^[a-zA-Z\s\-'\.À-ÿ]+$/;
const SAFE_COMPANY_PATTERN = /^[a-zA-Z0-9\s\-'\.,&()]+$/;
const XSS_DETECTION_PATTERN = /<[^>]*>|javascript:|data:|vbscript:|onload=|onerror=|onclick=/gi;
const SQL_INJECTION_PATTERN = /('|(\-\-)|(;)|(\|)|(\*)|(%)|(union)|(select)|(insert)|(delete)|(update)|(drop)|(create)|(alter)|(exec)|(script))/gi;
const xssValidator = (value, helpers) => {
    if (XSS_DETECTION_PATTERN.test(value)) {
        return helpers.error('custom.xss');
    }
    return value;
};
const sqlInjectionValidator = (value, helpers) => {
    if (SQL_INJECTION_PATTERN.test(value)) {
        return helpers.error('custom.sql');
    }
    return value;
};
const domainValidator = (value, helpers) => {
    if (!validator.isEmail(value)) {
        return helpers.error('string.email');
    }
    const domain = value.split('@')[1]?.toLowerCase() || '';
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '10minutemail', 'guerrillamail', 'tempmail'];
    if (suspiciousTlds.some(tld => domain.includes(tld))) {
        return helpers.error('custom.disposable');
    }
    return value;
};
const lengthAndRateValidator = (min, max) => {
    return (value, helpers) => {
        if (value.length < min || value.length > max) {
            return helpers.error('string.length');
        }
        const repeatedChar = value.match(/(.)\1{10,}/);
        if (repeatedChar) {
            return helpers.error('custom.spam');
        }
        return value;
    };
};
export const leadFormSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(SAFE_NAME_PATTERN)
        .custom(xssValidator)
        .custom(sqlInjectionValidator)
        .custom(lengthAndRateValidator(2, 50))
        .required()
        .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 50 characters',
        'string.pattern.base': 'Name contains invalid characters',
        'custom.xss': 'Invalid characters detected in name',
        'custom.sql': 'Invalid characters detected in name',
        'custom.spam': 'Name appears to be spam',
        'string.length': 'Name length is invalid',
    }),
    company: Joi.string()
        .trim()
        .min(2)
        .max(80)
        .pattern(SAFE_COMPANY_PATTERN)
        .custom(xssValidator)
        .custom(sqlInjectionValidator)
        .custom(lengthAndRateValidator(2, 80))
        .required()
        .messages({
        'string.empty': 'Company name is required',
        'string.min': 'Company name must be at least 2 characters',
        'string.max': 'Company name cannot exceed 80 characters',
        'string.pattern.base': 'Company name contains invalid characters',
        'custom.xss': 'Invalid characters detected in company name',
        'custom.sql': 'Invalid characters detected in company name',
        'custom.spam': 'Company name appears to be spam',
    }),
    email: Joi.string()
        .trim()
        .lowercase()
        .max(254)
        .custom(domainValidator)
        .custom(xssValidator)
        .custom(sqlInjectionValidator)
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid business email address',
        'string.max': 'Email cannot exceed 254 characters',
        'custom.disposable': 'Please use a business email address',
        'custom.xss': 'Invalid characters detected in email',
        'custom.sql': 'Invalid characters detected in email',
    }),
    specificIssue: Joi.string()
        .trim()
        .min(10)
        .max(1500)
        .custom(xssValidator)
        .custom(sqlInjectionValidator)
        .custom(lengthAndRateValidator(10, 1500))
        .required()
        .messages({
        'string.empty': 'Please describe your marketing challenge',
        'string.min': 'Please provide at least 10 characters',
        'string.max': 'Description cannot exceed 1500 characters',
        'custom.xss': 'Description contains invalid characters',
        'custom.sql': 'Description contains invalid characters',
        'custom.spam': 'Description appears to be spam',
    }),
    website: Joi.string()
        .uri({ scheme: ['http', 'https'], allowRelative: false })
        .trim()
        .max(200)
        .custom(xssValidator)
        .allow('')
        .optional()
        .messages({
        'string.uri': 'Please enter a valid website URL (http:// or https://)',
        'string.max': 'Website URL cannot exceed 200 characters',
        'custom.xss': 'Website URL contains invalid characters',
    }),
    revenue: Joi.string()
        .valid('500k-1m', '1m-3m', '3m-10m', '10m+')
        .allow('')
        .optional(),
    industry: Joi.string()
        .valid('software', 'healthcare', 'ecommerce', 'financial', 'professional', 'manufacturing', 'other')
        .allow('')
        .optional(),
    teamSize: Joi.string()
        .valid('1-10', '11-50', '51-200', '200+')
        .allow('')
        .optional(),
    timeline: Joi.string()
        .valid('asap', '1-3months', '3-6months', '6months+')
        .allow('')
        .optional(),
    currentMarketing: Joi.string()
        .trim()
        .max(800)
        .custom(xssValidator)
        .custom(sqlInjectionValidator)
        .allow('')
        .optional()
        .messages({
        'string.max': 'Current marketing description cannot exceed 800 characters',
        'custom.xss': 'Current marketing contains invalid characters',
        'custom.sql': 'Current marketing contains invalid characters',
    }),
    honeypot: Joi.string()
        .allow('')
        .optional(),
});
export const contactFormSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(SAFE_NAME_PATTERN)
        .custom(xssValidator)
        .custom(sqlInjectionValidator)
        .custom(lengthAndRateValidator(2, 50))
        .required()
        .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 50 characters',
        'string.pattern.base': 'Name contains invalid characters',
        'custom.xss': 'Invalid characters detected in name',
        'custom.sql': 'Invalid characters detected in name',
        'custom.spam': 'Name appears to be spam',
    }),
    email: Joi.string()
        .trim()
        .lowercase()
        .max(254)
        .custom(domainValidator)
        .custom(xssValidator)
        .custom(sqlInjectionValidator)
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid business email address',
        'string.max': 'Email cannot exceed 254 characters',
        'custom.disposable': 'Please use a business email address',
        'custom.xss': 'Invalid characters detected in email',
        'custom.sql': 'Invalid characters detected in email',
    }),
    subject: Joi.string()
        .trim()
        .min(5)
        .max(120)
        .custom(xssValidator)
        .custom(sqlInjectionValidator)
        .required()
        .messages({
        'string.empty': 'Subject is required',
        'string.min': 'Subject must be at least 5 characters',
        'string.max': 'Subject cannot exceed 120 characters',
        'custom.xss': 'Subject contains invalid characters',
        'custom.sql': 'Subject contains invalid characters',
    }),
    message: Joi.string()
        .trim()
        .min(10)
        .max(1500)
        .custom(xssValidator)
        .custom(sqlInjectionValidator)
        .custom(lengthAndRateValidator(10, 1500))
        .required()
        .messages({
        'string.empty': 'Message is required',
        'string.min': 'Message must be at least 10 characters',
        'string.max': 'Message cannot exceed 1500 characters',
        'custom.xss': 'Message contains invalid characters',
        'custom.sql': 'Message contains invalid characters',
        'custom.spam': 'Message appears to be spam',
    }),
    honeypot: Joi.string()
        .allow('')
        .max(0)
        .optional(),
});
