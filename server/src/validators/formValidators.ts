import Joi from 'joi';

// Lead form validation schema
export const leadFormSchema = Joi.object({
  // Required fields
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z\s\-'\.]+$/)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 100 characters',
      'string.pattern.base': 'Name contains invalid characters',
    }),

  company: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Company name is required',
      'string.min': 'Company name must be at least 2 characters',
      'string.max': 'Company name cannot exceed 100 characters',
    }),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .lowercase()
    .max(255)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
      'string.max': 'Email cannot exceed 255 characters',
    }),

  specificIssue: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.empty': 'Please describe your marketing challenge',
      'string.min': 'Please provide at least 10 characters',
      'string.max': 'Description cannot exceed 2000 characters',
    }),

  // Optional fields
  website: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .trim()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.uri': 'Please enter a valid website URL',
      'string.max': 'Website URL cannot exceed 500 characters',
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
    .max(1000)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Current marketing description cannot exceed 1000 characters',
    }),

  // Honeypot field for bot detection
  honeypot: Joi.string()
    .allow('')
    .optional(),
});

// Contact form validation schema (if you have other forms)
export const contactFormSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z\s\-'\.]+$/)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .lowercase()
    .max(255)
    .required(),

  subject: Joi.string()
    .trim()
    .min(5)
    .max(200)
    .required(),

  message: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required(),

  honeypot: Joi.string()
    .allow('')
    .optional(),
});

export type LeadFormData = {
  name: string;
  company: string;
  email: string;
  specificIssue: string;
  website?: string;
  revenue?: string;
  industry?: string;
  teamSize?: string;
  timeline?: string;
  currentMarketing?: string;
  honeypot?: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
};