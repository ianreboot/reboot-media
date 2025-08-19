import express from 'express';
import { leadFormSchema, contactFormSchema } from '../validators/formValidators.js';
import { sanitizeLeadFormData, sanitizeContactFormData, detectBot, detectSuspiciousContent, detectRealTimeThreats, calculateSecurityScore, createSecurityLog } from '../utils/sanitization.js';
import { processLeadSubmission, processContactSubmission } from '../utils/emailService.js';
import { AppError } from '../middleware/errorHandler.js';
import { securityLogger } from '../utils/securityLogger.js';
import { leadFormSecurityStack, contactFormSecurityStack } from '../middleware/validation.js';
import { validateCSRFToken, generateCSRFToken } from '../middleware/csrf.js';
import { cacheResponse } from '../middleware/caching.js';
import { optimizeQueryPerformance, generateETag } from '../middleware/performance.js';
const router = express.Router();
router.post('/lead', ...leadFormSecurityStack, validateCSRFToken, async (req, res, next) => {
    try {
        const startTime = Date.now();
        const securityScore = calculateSecurityScore(req.body, req);
        const realTimeThreats = detectRealTimeThreats(req);
        console.log('Lead form submission attempt:', createSecurityLog(req.body, req, 'form_submission'));
        securityLogger.logFormSubmission(req, 'lead', securityScore, realTimeThreats);
        const { error, value } = leadFormSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            const validationErrors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));
            securityLogger.logValidationFailure(req, validationErrors);
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
        const formData = value;
        const botDetected = detectBot(formData, req);
        const suspiciousContent = detectSuspiciousContent(formData);
        if (botDetected) {
            const botIndicators = realTimeThreats.filter(t => t.includes('BOT') || t.includes('AUTOMATED'));
            securityLogger.logBotDetection(req, botIndicators);
            return res.status(200).json({
                success: true,
                data: {
                    message: 'Thank you for your submission. We will be in touch soon.',
                    requestId: req.requestId,
                },
            });
        }
        if (suspiciousContent || securityScore < 30) {
            securityLogger.logSecurityEvent('SUSPICIOUS_CONTENT', 'HIGH', req, { securityScore, suspiciousContent, formData: Object.keys(formData) }, {
                type: 'SUSPICIOUS_CONTENT',
                confidence: 100 - securityScore,
                patterns: ['spam_detection'],
                riskScore: 100 - securityScore,
            }, 'FLAGGED');
            console.warn('Suspicious content detected in form submission:', {
                requestId: req.requestId,
                securityScore,
                ip: req.ip
            });
        }
        let sanitizedData;
        try {
            sanitizedData = sanitizeLeadFormData(formData);
        }
        catch (sanitizationError) {
            securityLogger.logSecurityEvent('MALFORMED_REQUEST', 'HIGH', req, { error: sanitizationError?.message || 'Unknown sanitization error', originalData: Object.keys(formData) }, undefined, 'BLOCKED');
            throw new AppError('Invalid form data provided', 400, 'SANITIZATION_FAILED');
        }
        const emailSent = await optimizeQueryPerformance(() => processLeadSubmission(sanitizedData), 'lead_submission_processing');
        if (!emailSent) {
            throw new AppError('Failed to process form submission', 500, 'EMAIL_SEND_ERROR');
        }
        const processingTime = Date.now() - startTime;
        console.log(`Lead form processed successfully in ${processingTime}ms:`, {
            requestId: req.requestId,
            company: sanitizedData.company,
            revenue: sanitizedData.revenue,
            industry: sanitizedData.industry,
            securityScore,
            threatCount: realTimeThreats.length,
        });
        securityLogger.logSecurityEvent('FORM_SUBMISSION', 'LOW', req, {
            formType: 'lead',
            processingTime,
            securityScore,
            company: sanitizedData.company,
            industry: sanitizedData.industry
        }, undefined, 'ALLOWED');
        const responseData = {
            success: true,
            data: {
                message: 'Thank you for your submission. We will review your information and get back to you within 24 hours.',
                requestId: req.requestId,
                processingTime: `${processingTime}ms`,
            },
        };
        const etag = generateETag(responseData);
        res.set('ETag', etag);
        res.set('Cache-Control', 'no-cache');
        res.status(200).json(responseData);
    }
    catch (error) {
        next(error);
    }
});
router.post('/contact', ...contactFormSecurityStack, validateCSRFToken, async (req, res, next) => {
    try {
        const startTime = Date.now();
        const securityScore = calculateSecurityScore(req.body, req);
        const realTimeThreats = detectRealTimeThreats(req);
        console.log('Contact form submission attempt:', createSecurityLog(req.body, req, 'form_submission'));
        securityLogger.logFormSubmission(req, 'contact', securityScore, realTimeThreats);
        const { error, value } = contactFormSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            const validationErrors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
            }));
            securityLogger.logValidationFailure(req, validationErrors);
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
        const formData = value;
        const botDetected = detectBot(formData, req);
        const suspiciousContent = detectSuspiciousContent(formData);
        if (botDetected) {
            const botIndicators = realTimeThreats.filter(t => t.includes('BOT') || t.includes('AUTOMATED'));
            securityLogger.logBotDetection(req, botIndicators);
            return res.status(200).json({
                success: true,
                data: {
                    message: 'Thank you for your message. We will respond shortly.',
                    requestId: req.requestId,
                },
            });
        }
        if (suspiciousContent || securityScore < 30) {
            securityLogger.logSecurityEvent('SUSPICIOUS_CONTENT', 'HIGH', req, { securityScore, suspiciousContent, formData: Object.keys(formData) }, {
                type: 'SUSPICIOUS_CONTENT',
                confidence: 100 - securityScore,
                patterns: ['spam_detection'],
                riskScore: 100 - securityScore,
            }, 'FLAGGED');
            console.warn('Suspicious content detected in contact form:', {
                requestId: req.requestId,
                securityScore,
                ip: req.ip
            });
        }
        let sanitizedData;
        try {
            sanitizedData = sanitizeContactFormData(formData);
        }
        catch (sanitizationError) {
            securityLogger.logSecurityEvent('MALFORMED_REQUEST', 'HIGH', req, { error: sanitizationError?.message || 'Unknown sanitization error', originalData: Object.keys(formData) }, undefined, 'BLOCKED');
            throw new AppError('Invalid form data provided', 400, 'SANITIZATION_FAILED');
        }
        const emailSent = await optimizeQueryPerformance(() => processContactSubmission(sanitizedData), 'contact_submission_processing');
        if (!emailSent) {
            throw new AppError('Failed to process contact form', 500, 'EMAIL_SEND_ERROR');
        }
        const processingTime = Date.now() - startTime;
        console.log(`Contact form processed successfully in ${processingTime}ms:`, {
            requestId: req.requestId,
            subject: sanitizedData.subject,
            securityScore,
            threatCount: realTimeThreats.length,
        });
        securityLogger.logSecurityEvent('FORM_SUBMISSION', 'LOW', req, {
            formType: 'contact',
            processingTime,
            securityScore,
            subject: sanitizedData.subject
        }, undefined, 'ALLOWED');
        const responseData = {
            success: true,
            data: {
                message: 'Thank you for your message. We will respond within 24 hours.',
                requestId: req.requestId,
                processingTime: `${processingTime}ms`,
            },
        };
        const etag = generateETag(responseData);
        res.set('ETag', etag);
        res.set('Cache-Control', 'no-cache');
        res.status(200).json(responseData);
    }
    catch (error) {
        next(error);
    }
});
router.get('/csrf-token', cacheResponse(300, 'csrf'), generateCSRFToken, (req, res) => {
    res.json({
        success: true,
        data: {
            csrfToken: req.csrfToken,
            expiresIn: 30 * 60 * 1000,
            instructions: 'Include this token in X-CSRF-Token header or csrfToken field',
        },
    });
});
router.get('/security-status', cacheResponse(60, 'security'), (req, res) => {
    res.json({
        success: true,
        data: {
            status: 'Security systems operational',
            features: {
                inputValidation: 'ACTIVE',
                xssProtection: 'ACTIVE',
                sqlInjectionProtection: 'ACTIVE',
                rateLimiting: 'ACTIVE',
                csrfProtection: 'ACTIVE',
                botDetection: 'ACTIVE',
                securityLogging: 'ACTIVE',
                sanitization: 'ACTIVE',
            },
            endpoints: [
                'GET /api/forms/csrf-token',
                'POST /api/forms/lead',
                'POST /api/forms/contact',
                'GET /api/forms/security-status',
            ],
            timestamp: new Date().toISOString(),
            requestId: req.requestId,
        },
    });
});
router.get('/status', cacheResponse(30, 'status'), (req, res) => {
    const securityStats = securityLogger.getSecurityStats ? securityLogger.getSecurityStats() : { message: 'Stats not available' };
    res.json({
        success: true,
        data: {
            status: 'Form processing service is operational',
            security: {
                status: 'PROTECTED',
                validationLayers: 3,
                sanitizationActive: true,
                loggingActive: true,
            },
            endpoints: [
                'GET /api/forms/csrf-token',
                'POST /api/forms/lead',
                'POST /api/forms/contact',
                'GET /api/forms/security-status',
                'GET /api/forms/status',
            ],
            timestamp: new Date().toISOString(),
            requestId: req.requestId,
        },
    });
});
export default router;
