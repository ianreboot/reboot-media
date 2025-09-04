import DOMPurify from 'isomorphic-dompurify';
import xss from 'xss';
import validator from 'validator';
const xssOptions = {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
};
export const sanitizeLeadFormData = (data) => {
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
export const sanitizeContactFormData = (data) => {
    return {
        name: sanitizeString(data.name),
        email: data.email.toLowerCase().trim(),
        subject: sanitizeString(data.subject),
        message: sanitizeString(data.message),
        honeypot: data.honeypot || undefined,
    };
};
const sanitizeString = (str, allowBasicFormatting = false) => {
    if (!str || typeof str !== 'string')
        return '';
    let sanitized = str.trim().replace(/\s+/g, ' ');
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
    if (allowBasicFormatting) {
        sanitized = DOMPurify.sanitize(sanitized, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
            KEEP_CONTENT: true,
        });
    }
    else {
        sanitized = DOMPurify.sanitize(sanitized, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
            KEEP_CONTENT: true,
        });
    }
    sanitized = xss(sanitized, xssOptions);
    const scriptPatterns = [
        /javascript:/gi,
        /data:text\/html/gi,
        /vbscript:/gi,
        /on\w+\s*=/gi,
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
    const sqlPatterns = [
        /('|(\-\-)|;|(\|)|(\*)|(%))/gi,
        /(union|select|insert|delete|update|drop|create|alter|exec)/gi,
    ];
    sqlPatterns.forEach(pattern => {
        sanitized = sanitized.replace(pattern, (match) => match.replace(/[^a-zA-Z0-9\s]/g, ''));
    });
    sanitized = sanitized.slice(0, 2000);
    return sanitized;
};
const sanitizeEmail = (email) => {
    if (!email || typeof email !== 'string')
        return '';
    const normalized = validator.normalizeEmail(email.trim().toLowerCase()) || email.trim().toLowerCase();
    if (!validator.isEmail(normalized)) {
        throw new Error('Invalid email format');
    }
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
const sanitizeUrl = (url) => {
    if (!url || typeof url !== 'string')
        return '';
    const trimmed = url.trim();
    if (!trimmed)
        return '';
    let sanitized = trimmed;
    if (!validator.isURL(sanitized, { protocols: ['http', 'https'], require_protocol: true })) {
        sanitized = `https://${trimmed}`;
        if (!validator.isURL(sanitized, { protocols: ['http', 'https'], require_protocol: true })) {
            throw new Error('Invalid URL format');
        }
    }
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
export const detectBot = (data, req) => {
    if (data.honeypot && data.honeypot.trim() !== '') {
        return true;
    }
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
    return false;
};
export const detectSuspiciousContent = (data) => {
    const suspiciousPatterns = [
        /\b(viagra|cialis|casino|poker|lottery|winner)\b/gi,
        /\$\d+|£\d+|€\d+/g,
        /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/g,
        /\b[A-Z]{2,}\b.*\b[A-Z]{2,}\b.*\b[A-Z]{2,}\b/g,
        /(click here|act now|urgent|limited time)/gi,
        /\.(tk|ml|ga|cf)\b/gi,
    ];
    const textFields = [];
    if ('name' in data)
        textFields.push(data.name);
    if ('company' in data)
        textFields.push(data.company);
    if ('specificIssue' in data)
        textFields.push(data.specificIssue);
    if ('currentMarketing' in data && data.currentMarketing)
        textFields.push(data.currentMarketing);
    if ('subject' in data)
        textFields.push(data.subject);
    if ('message' in data)
        textFields.push(data.message);
    const allText = textFields.join(' ');
    return suspiciousPatterns.some(pattern => pattern.test(allText));
};
export const createSecurityLog = (data, req, eventType) => {
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
        hasData: !!data,
        dataFields: data ? Object.keys(data) : [],
        fieldCount: data ? Object.keys(data).length : 0,
        suspiciousIndicators: {
            hasScriptTags: data && JSON.stringify(data).includes('<script'),
            hasSqlKeywords: data && /\b(select|insert|update|delete|drop|union)\b/i.test(JSON.stringify(data)),
            hasJavascript: data && /javascript:/i.test(JSON.stringify(data)),
            longFields: data ? Object.values(data).filter((v) => typeof v === 'string' && v.length > 500).length : 0,
        },
    };
};
export const createLogMessage = (data, req) => {
    return createSecurityLog(data, req, 'form_submission');
};
export const detectRealTimeThreats = (req) => {
    const threats = [];
    const userAgent = req.get('User-Agent') || '';
    if (/curl|wget|python|node|go-http|postman/i.test(userAgent)) {
        threats.push('AUTOMATED_TOOL');
    }
    if (!req.get('Accept'))
        threats.push('MISSING_ACCEPT_HEADER');
    if (!req.get('Accept-Language'))
        threats.push('MISSING_LANGUAGE_HEADER');
    const ip = req.ip;
    if (ip && (ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('172.'))) {
    }
    const timestamp = Date.now();
    return threats;
};
export const calculateSecurityScore = (data, req) => {
    let score = 100;
    if (detectBot(data, req))
        score -= 50;
    if (detectSuspiciousContent && detectSuspiciousContent(data))
        score -= 30;
    const threats = detectRealTimeThreats(req);
    score -= threats.length * 10;
    if (!req.get('Referer'))
        score -= 5;
    if (!req.get('Accept-Language'))
        score -= 5;
    return Math.max(0, score);
};
