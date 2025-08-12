import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { 
  leadFormSchema, 
  contactFormSchema, 
  LeadFormData, 
  ContactFormData 
} from '../validators/formValidators.js';
import { 
  sanitizeLeadFormData, 
  sanitizeContactFormData, 
  detectBot, 
  createLogMessage 
} from '../utils/sanitization.js';
import { 
  processLeadSubmission, 
  processContactSubmission 
} from '../utils/emailService.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

// Using any types for simplified Express integration

/**
 * Lead form submission endpoint
 * POST /api/forms/lead
 */
router.post('/lead', async (req: any, res: any, next: any) => {
  try {
    const startTime = Date.now();
    
    // Log submission attempt (without sensitive data)
    console.log('Lead form submission attempt:', createLogMessage(req.body, req));

    // Validate input data
    const { error, value } = leadFormSchema.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true 
    });

    if (error) {
      const validationErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Please check your input and try again',
          details: validationErrors,
          requestId: req.requestId,
        },
      });
    }

    const formData: LeadFormData = value;

    // Bot detection
    if (detectBot(formData, req)) {
      console.log('Bot detected in lead form submission:', req.requestId);
      
      // Return success to avoid revealing bot detection
      return res.status(200).json({
        success: true,
        data: {
          message: 'Thank you for your submission. We will be in touch soon.',
          requestId: req.requestId,
        },
      });
    }

    // Sanitize data
    const sanitizedData = sanitizeLeadFormData(formData);

    // Process the form submission
    const emailSent = await processLeadSubmission(sanitizedData);

    if (!emailSent) {
      throw new AppError('Failed to process form submission', 500, 'EMAIL_SEND_ERROR');
    }

    const processingTime = Date.now() - startTime;
    
    // Log successful submission (without sensitive data)
    console.log(`Lead form processed successfully in ${processingTime}ms:`, {
      requestId: req.requestId,
      company: sanitizedData.company,
      revenue: sanitizedData.revenue,
      industry: sanitizedData.industry,
    });

    res.status(200).json({
      success: true,
      data: {
        message: 'Thank you for your submission. We will review your information and get back to you within 24 hours.',
        requestId: req.requestId,
      },
    });

  } catch (error) {
    next(error);
  }
});

/**
 * Contact form submission endpoint
 * POST /api/forms/contact
 */
router.post('/contact', async (req: any, res: any, next: any) => {
  try {
    const startTime = Date.now();
    
    // Log submission attempt (without sensitive data)
    console.log('Contact form submission attempt:', createLogMessage(req.body, req));

    // Validate input data
    const { error, value } = contactFormSchema.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true 
    });

    if (error) {
      const validationErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Please check your input and try again',
          details: validationErrors,
          requestId: req.requestId,
        },
      });
    }

    const formData: ContactFormData = value;

    // Bot detection
    if (detectBot(formData, req)) {
      console.log('Bot detected in contact form submission:', req.requestId);
      
      // Return success to avoid revealing bot detection
      return res.status(200).json({
        success: true,
        data: {
          message: 'Thank you for your message. We will respond shortly.',
          requestId: req.requestId,
        },
      });
    }

    // Sanitize data
    const sanitizedData = sanitizeContactFormData(formData);

    // Process the form submission
    const emailSent = await processContactSubmission(sanitizedData);

    if (!emailSent) {
      throw new AppError('Failed to process contact form', 500, 'EMAIL_SEND_ERROR');
    }

    const processingTime = Date.now() - startTime;
    
    // Log successful submission (without sensitive data)
    console.log(`Contact form processed successfully in ${processingTime}ms:`, {
      requestId: req.requestId,
      subject: sanitizedData.subject,
    });

    res.status(200).json({
      success: true,
      data: {
        message: 'Thank you for your message. We will respond within 24 hours.',
        requestId: req.requestId,
      },
    });

  } catch (error) {
    next(error);
  }
});

/**
 * Form status endpoint for debugging
 * GET /api/forms/status
 */
router.get('/status', (req: any, res: any) => {
  res.json({
    success: true,
    data: {
      status: 'Form processing service is operational',
      endpoints: [
        'POST /api/forms/lead',
        'POST /api/forms/contact',
      ],
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
    },
  });
});

export default router;