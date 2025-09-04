import fs from 'fs';
import path from 'path';
class SecurityLogger {
    logDir;
    securityLogFile;
    alertThreshold = 75;
    constructor() {
        this.logDir = path.join(process.cwd(), 'logs');
        this.securityLogFile = path.join(this.logDir, 'security.log');
        this.ensureLogDirectory();
    }
    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }
    logSecurityEvent(eventType, severity, req, details, threat, action = 'LOGGED') {
        const event = {
            timestamp: new Date().toISOString(),
            eventType,
            severity,
            requestId: req.requestId,
            ip: req.ip || 'unknown',
            userAgent: req.get('User-Agent'),
            details,
            threat,
            action,
        };
        this.logToConsole(event);
        this.writeToFile(event);
        if (severity === 'CRITICAL' || severity === 'HIGH') {
            this.sendSecurityAlert(event);
        }
    }
    logFormSubmission(req, formType, securityScore, threats) {
        const severity = this.determineSeverity(securityScore, threats);
        const action = securityScore < this.alertThreshold ? 'FLAGGED' : 'ALLOWED';
        this.logSecurityEvent('FORM_SUBMISSION', severity, req, {
            formType,
            securityScore,
            threats,
            fieldsCount: Object.keys(req.body || {}).length,
        }, threats.length > 0 ? {
            type: 'MULTIPLE_THREATS',
            confidence: Math.min(100 - securityScore, 100),
            patterns: threats,
            riskScore: 100 - securityScore,
        } : undefined, action);
    }
    logValidationFailure(req, errors) {
        this.logSecurityEvent('VALIDATION_FAILURE', 'MEDIUM', req, {
            errorCount: errors.length,
            errors: errors.map(e => ({ field: e.field, message: e.message })),
        });
    }
    logBotDetection(req, botIndicators) {
        this.logSecurityEvent('BOT_DETECTED', 'HIGH', req, { indicators: botIndicators }, {
            type: 'BOT_ACTIVITY',
            confidence: 90,
            patterns: botIndicators,
            riskScore: 80,
        }, 'BLOCKED');
    }
    logXssAttempt(req, payload, field) {
        this.logSecurityEvent('XSS_ATTEMPT', 'CRITICAL', req, {
            field,
            payloadLength: payload.length,
            payloadPreview: payload.substring(0, 100),
        }, {
            type: 'XSS_INJECTION',
            confidence: 95,
            patterns: ['script_tags', 'javascript_protocol'],
            riskScore: 95,
        }, 'BLOCKED');
    }
    logSqlInjectionAttempt(req, payload, field) {
        this.logSecurityEvent('SQL_INJECTION_ATTEMPT', 'CRITICAL', req, {
            field,
            payloadLength: payload.length,
            payloadPreview: payload.substring(0, 100),
        }, {
            type: 'SQL_INJECTION',
            confidence: 90,
            patterns: ['sql_keywords', 'injection_patterns'],
            riskScore: 90,
        }, 'BLOCKED');
    }
    logRateLimit(req, limitType) {
        this.logSecurityEvent('RATE_LIMIT_EXCEEDED', 'MEDIUM', req, { limitType }, undefined, 'BLOCKED');
    }
    determineSeverity(securityScore, threats) {
        if (securityScore < 30 || threats.includes('XSS_DETECTED') || threats.includes('SQL_INJECTION_DETECTED')) {
            return 'CRITICAL';
        }
        else if (securityScore < 50 || threats.length > 2) {
            return 'HIGH';
        }
        else if (securityScore < 80 || threats.length > 0) {
            return 'MEDIUM';
        }
        return 'LOW';
    }
    logToConsole(event) {
        const colors = {
            LOW: '\x1b[32m',
            MEDIUM: '\x1b[33m',
            HIGH: '\x1b[31m',
            CRITICAL: '\x1b[41m',
            reset: '\x1b[0m',
        };
        const color = colors[event.severity];
        const message = `${color}[SECURITY-${event.severity}] ${event.eventType} - ${event.ip} - ${event.requestId}${colors.reset}`;
        console.log(message, {
            timestamp: event.timestamp,
            details: event.details,
            threat: event.threat,
            action: event.action,
        });
    }
    writeToFile(event) {
        try {
            const logEntry = JSON.stringify(event) + '\n';
            fs.appendFileSync(this.securityLogFile, logEntry);
        }
        catch (error) {
            console.error('Failed to write security log:', error);
        }
    }
    sendSecurityAlert(event) {
        console.warn('🚨 SECURITY ALERT 🚨', {
            severity: event.severity,
            eventType: event.eventType,
            ip: event.ip,
            threat: event.threat,
            timestamp: event.timestamp,
        });
    }
    getSecurityStats(hours = 24) {
        return {
            timeRange: `${hours}h`,
            totalEvents: 0,
            eventsBySeverity: {
                LOW: 0,
                MEDIUM: 0,
                HIGH: 0,
                CRITICAL: 0,
            },
            eventsByType: {},
            topThreats: [],
            suspiciousIPs: [],
        };
    }
    generateSecurityReport() {
        const stats = this.getSecurityStats();
        return `
Security Report - ${new Date().toISOString()}
============================================

Events in last 24 hours: ${stats.totalEvents}

By Severity:
- CRITICAL: ${stats.eventsBySeverity.CRITICAL}
- HIGH: ${stats.eventsBySeverity.HIGH}  
- MEDIUM: ${stats.eventsBySeverity.MEDIUM}
- LOW: ${stats.eventsBySeverity.LOW}

Top Threats:
${stats.topThreats.map((t) => `- ${t.type}: ${t.count}`).join('\n')}

Suspicious IPs:
${stats.suspiciousIPs.map((ip) => `- ${ip.address}: ${ip.events} events`).join('\n')}
    `.trim();
    }
}
export const securityLogger = new SecurityLogger();
