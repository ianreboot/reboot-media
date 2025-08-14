import { Request } from 'express';
import fs from 'fs';
import path from 'path';

/**
 * Security event logging system for audit trails and threat detection
 */

interface SecurityEvent {
  timestamp: string;
  eventType: SecurityEventType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  requestId: string;
  ip: string;
  userAgent?: string;
  details: any;
  threat?: ThreatIndicator;
  action: 'ALLOWED' | 'BLOCKED' | 'FLAGGED' | 'LOGGED';
}

type SecurityEventType = 
  | 'FORM_SUBMISSION'
  | 'VALIDATION_FAILURE'
  | 'BOT_DETECTED'
  | 'XSS_ATTEMPT'
  | 'SQL_INJECTION_ATTEMPT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'SUSPICIOUS_CONTENT'
  | 'MALFORMED_REQUEST'
  | 'UNAUTHORIZED_ACCESS'
  | 'CSRF_VIOLATION';

interface ThreatIndicator {
  type: string;
  confidence: number; // 0-100
  patterns: string[];
  riskScore: number; // 0-100
}

class SecurityLogger {
  private logDir: string;
  private securityLogFile: string;
  private alertThreshold: number = 75; // Security score threshold for alerts

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.securityLogFile = path.join(this.logDir, 'security.log');
    this.ensureLogDirectory();
  }

  private ensureLogDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Log security event with appropriate severity
   */
  logSecurityEvent(
    eventType: SecurityEventType,
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
    req: Request,
    details: any,
    threat?: ThreatIndicator,
    action: 'ALLOWED' | 'BLOCKED' | 'FLAGGED' | 'LOGGED' = 'LOGGED'
  ): void {
    const event: SecurityEvent = {
      timestamp: new Date().toISOString(),
      eventType,
      severity,
      requestId: (req as any).requestId,
      ip: req.ip || 'unknown',
      userAgent: req.get('User-Agent'),
      details,
      threat,
      action,
    };

    // Log to console based on severity
    this.logToConsole(event);

    // Write to security log file
    this.writeToFile(event);

    // Send alerts for high severity events
    if (severity === 'CRITICAL' || severity === 'HIGH') {
      this.sendSecurityAlert(event);
    }
  }

  /**
   * Log form submission with security analysis
   */
  logFormSubmission(req: Request, formType: string, securityScore: number, threats: string[]): void {
    const severity = this.determineSeverity(securityScore, threats);
    const action = securityScore < this.alertThreshold ? 'FLAGGED' : 'ALLOWED';

    this.logSecurityEvent(
      'FORM_SUBMISSION',
      severity,
      req,
      {
        formType,
        securityScore,
        threats,
        fieldsCount: Object.keys(req.body || {}).length,
      },
      threats.length > 0 ? {
        type: 'MULTIPLE_THREATS',
        confidence: Math.min(100 - securityScore, 100),
        patterns: threats,
        riskScore: 100 - securityScore,
      } : undefined,
      action
    );
  }

  /**
   * Log validation failures
   */
  logValidationFailure(req: Request, errors: any[]): void {
    this.logSecurityEvent(
      'VALIDATION_FAILURE',
      'MEDIUM',
      req,
      {
        errorCount: errors.length,
        errors: errors.map(e => ({ field: e.field, message: e.message })),
      }
    );
  }

  /**
   * Log bot detection
   */
  logBotDetection(req: Request, botIndicators: string[]): void {
    this.logSecurityEvent(
      'BOT_DETECTED',
      'HIGH',
      req,
      { indicators: botIndicators },
      {
        type: 'BOT_ACTIVITY',
        confidence: 90,
        patterns: botIndicators,
        riskScore: 80,
      },
      'BLOCKED'
    );
  }

  /**
   * Log XSS attempt
   */
  logXssAttempt(req: Request, payload: string, field: string): void {
    this.logSecurityEvent(
      'XSS_ATTEMPT',
      'CRITICAL',
      req,
      {
        field,
        payloadLength: payload.length,
        payloadPreview: payload.substring(0, 100),
      },
      {
        type: 'XSS_INJECTION',
        confidence: 95,
        patterns: ['script_tags', 'javascript_protocol'],
        riskScore: 95,
      },
      'BLOCKED'
    );
  }

  /**
   * Log SQL injection attempt
   */
  logSqlInjectionAttempt(req: Request, payload: string, field: string): void {
    this.logSecurityEvent(
      'SQL_INJECTION_ATTEMPT',
      'CRITICAL',
      req,
      {
        field,
        payloadLength: payload.length,
        payloadPreview: payload.substring(0, 100),
      },
      {
        type: 'SQL_INJECTION',
        confidence: 90,
        patterns: ['sql_keywords', 'injection_patterns'],
        riskScore: 90,
      },
      'BLOCKED'
    );
  }

  /**
   * Log rate limit exceeded
   */
  logRateLimit(req: Request, limitType: string): void {
    this.logSecurityEvent(
      'RATE_LIMIT_EXCEEDED',
      'MEDIUM',
      req,
      { limitType },
      undefined,
      'BLOCKED'
    );
  }

  private determineSeverity(securityScore: number, threats: string[]): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (securityScore < 30 || threats.includes('XSS_DETECTED') || threats.includes('SQL_INJECTION_DETECTED')) {
      return 'CRITICAL';
    } else if (securityScore < 50 || threats.length > 2) {
      return 'HIGH';
    } else if (securityScore < 80 || threats.length > 0) {
      return 'MEDIUM';
    }
    return 'LOW';
  }

  private logToConsole(event: SecurityEvent): void {
    const colors = {
      LOW: '\x1b[32m',     // Green
      MEDIUM: '\x1b[33m',   // Yellow
      HIGH: '\x1b[31m',     // Red
      CRITICAL: '\x1b[41m', // Red background
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

  private writeToFile(event: SecurityEvent): void {
    try {
      const logEntry = JSON.stringify(event) + '\n';
      fs.appendFileSync(this.securityLogFile, logEntry);
    } catch (error) {
      console.error('Failed to write security log:', error);
    }
  }

  private sendSecurityAlert(event: SecurityEvent): void {
    // In production, implement actual alerting (email, Slack, PagerDuty, etc.)
    console.warn('🚨 SECURITY ALERT 🚨', {
      severity: event.severity,
      eventType: event.eventType,
      ip: event.ip,
      threat: event.threat,
      timestamp: event.timestamp,
    });

    // Example: Send to monitoring service
    // await this.sendToMonitoringService(event);
  }

  /**
   * Get security statistics for monitoring
   */
  getSecurityStats(hours: number = 24): any {
    // In production, implement proper log parsing and statistics
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

  /**
   * Generate security report
   */
  generateSecurityReport(): string {
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
${stats.topThreats.map((t: any) => `- ${t.type}: ${t.count}`).join('\n')}

Suspicious IPs:
${stats.suspiciousIPs.map((ip: any) => `- ${ip.address}: ${ip.events} events`).join('\n')}
    `.trim();
  }
}

// Export singleton instance
export const securityLogger = new SecurityLogger();
export type { SecurityEventType, ThreatIndicator, SecurityEvent };