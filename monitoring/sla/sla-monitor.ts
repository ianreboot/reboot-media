/**
 * SLA (Service Level Agreement) Monitoring System
 * Tracks and reports on service level objectives and agreements
 */

import { MetricsCollector } from '../metrics/collector';

interface SLO {
  service: string;
  metric: string;
  target: number;
  unit: string;
  window: string; // e.g., '30d', '7d', '1h'
  description: string;
}

interface SLA {
  name: string;
  description: string;
  slos: SLO[];
  errorBudget: number; // percentage (e.g., 0.05 for 99.95% availability)
  consequences: string[];
}

interface SLAViolation {
  id: string;
  sla: string;
  slo: string;
  timestamp: Date;
  actualValue: number;
  targetValue: number;
  severity: 'warning' | 'minor' | 'major' | 'critical';
  duration: number; // minutes
  impactDescription: string;
}

interface SLAStatus {
  sla: string;
  status: 'healthy' | 'warning' | 'violated';
  compliance: number; // percentage
  errorBudgetRemaining: number; // percentage
  violationsCount: number;
  lastViolation?: Date;
}

class SLAMonitor {
  private metrics: MetricsCollector;
  private slas: Map<string, SLA> = new Map();
  private slaHistory: Map<string, SLAViolation[]> = new Map();
  private currentMetrics: Map<string, { value: number; timestamp: Date }> = new Map();

  constructor(metricsCollector: MetricsCollector) {
    this.metrics = metricsCollector;
    this.initializeSLAs();
  }

  /**
   * Initialize production SLAs based on business requirements
   */
  private initializeSLAs(): void {
    const slas: SLA[] = [
      {
        name: 'Website Availability SLA',
        description: 'Marketing website availability and responsiveness',
        errorBudget: 0.05, // 99.95% availability target
        consequences: [
          'Customer acquisition impact',
          'Brand reputation damage',
          'Lead generation interruption'
        ],
        slos: [
          {
            service: 'web-application',
            metric: 'availability',
            target: 99.95,
            unit: 'percentage',
            window: '30d',
            description: 'Website must be available 99.95% of the time'
          },
          {
            service: 'web-application',
            metric: 'response_time_p95',
            target: 1000,
            unit: 'milliseconds',
            window: '24h',
            description: '95% of requests must complete within 1 second'
          }
        ]
      },
      {
        name: 'Core Web Vitals SLA',
        description: 'User experience performance metrics',
        errorBudget: 0.10, // 90% of pages in "Good" range
        consequences: [
          'SEO ranking impact',
          'User engagement reduction',
          'Conversion rate decrease'
        ],
        slos: [
          {
            service: 'web-application',
            metric: 'lcp_good_rate',
            target: 90,
            unit: 'percentage',
            window: '7d',
            description: '90% of pages have LCP < 2.5s'
          },
          {
            service: 'web-application',
            metric: 'fid_good_rate',
            target: 90,
            unit: 'percentage',
            window: '7d',
            description: '90% of interactions have FID < 100ms'
          },
          {
            service: 'web-application',
            metric: 'cls_good_rate',
            target: 90,
            unit: 'percentage',
            window: '7d',
            description: '90% of pages have CLS < 0.1'
          }
        ]
      },
      {
        name: 'Lead Processing SLA',
        description: 'Lead form submission and processing reliability',
        errorBudget: 0.1, // 99.9% success rate
        consequences: [
          'Revenue loss from missed leads',
          'Customer frustration',
          'Business process disruption'
        ],
        slos: [
          {
            service: 'api-server',
            metric: 'lead_form_success_rate',
            target: 99.9,
            unit: 'percentage',
            window: '24h',
            description: 'Lead form submissions must succeed 99.9% of the time'
          },
          {
            service: 'api-server',
            metric: 'lead_processing_time_p99',
            target: 5000,
            unit: 'milliseconds',
            window: '1h',
            description: '99% of lead processing must complete within 5 seconds'
          }
        ]
      },
      {
        name: 'API Performance SLA',
        description: 'Backend API response time and reliability',
        errorBudget: 0.05, // 99.95% availability
        consequences: [
          'Frontend functionality degradation',
          'User experience impact',
          'System integration failures'
        ],
        slos: [
          {
            service: 'api-server',
            metric: 'availability',
            target: 99.95,
            unit: 'percentage',
            window: '30d',
            description: 'API must be available 99.95% of the time'
          },
          {
            service: 'api-server',
            metric: 'response_time_p95',
            target: 200,
            unit: 'milliseconds',
            window: '1h',
            description: '95% of API requests must complete within 200ms'
          },
          {
            service: 'api-server',
            metric: 'response_time_p99',
            target: 500,
            unit: 'milliseconds',
            window: '1h',
            description: '99% of API requests must complete within 500ms'
          }
        ]
      },
      {
        name: 'Business Conversion SLA',
        description: 'Lead conversion rate and business metrics',
        errorBudget: 0.15, // Allow 15% variance in conversion rate
        consequences: [
          'Revenue targets not met',
          'Marketing ROI reduction',
          'Business growth impact'
        ],
        slos: [
          {
            service: 'web-application',
            metric: 'lead_conversion_rate',
            target: 3.0,
            unit: 'percentage',
            window: '30d',
            description: 'Lead conversion rate must maintain >= 3%'
          },
          {
            service: 'web-application',
            metric: 'session_quality_score',
            target: 75,
            unit: 'score',
            window: '7d',
            description: 'Average session quality score >= 75/100'
          }
        ]
      }
    ];

    slas.forEach(sla => {
      this.slas.set(sla.name, sla);
      this.slaHistory.set(sla.name, []);
    });
  }

  /**
   * Record metric value for SLA monitoring
   */
  recordMetric(service: string, metric: string, value: number): void {
    const key = `${service}.${metric}`;
    this.currentMetrics.set(key, { value, timestamp: new Date() });

    // Record Prometheus metric
    this.metrics.recordGauge('sla_metric_value', value, {
      service,
      metric
    });

    // Check for SLA violations
    this.checkSLAViolations(service, metric, value);
  }

  /**
   * Check for SLA violations
   */
  private checkSLAViolations(service: string, metric: string, value: number): void {
    for (const [slaName, sla] of this.slas.entries()) {
      const relevantSLOs = sla.slos.filter(slo => 
        slo.service === service && slo.metric === metric
      );

      relevantSLOs.forEach(slo => {
        const violation = this.evaluateSLOViolation(sla, slo, value);
        if (violation) {
          this.recordSLAViolation(violation);
        }
      });
    }
  }

  /**
   * Evaluate if a metric value violates an SLO
   */
  private evaluateSLOViolation(sla: SLA, slo: SLO, actualValue: number): SLAViolation | null {
    let isViolation = false;
    let severity: SLAViolation['severity'] = 'warning';

    // Determine if value violates SLO target
    if (slo.metric.includes('availability') || slo.metric.includes('success_rate') || slo.metric.includes('good_rate')) {
      // Higher is better metrics
      isViolation = actualValue < slo.target;
      const deviationPercent = ((slo.target - actualValue) / slo.target) * 100;
      
      if (deviationPercent >= 50) severity = 'critical';
      else if (deviationPercent >= 20) severity = 'major';
      else if (deviationPercent >= 5) severity = 'minor';
      else severity = 'warning';
    } else if (slo.metric.includes('response_time') || slo.metric.includes('processing_time')) {
      // Lower is better metrics
      isViolation = actualValue > slo.target;
      const deviationPercent = ((actualValue - slo.target) / slo.target) * 100;
      
      if (deviationPercent >= 100) severity = 'critical';
      else if (deviationPercent >= 50) severity = 'major';
      else if (deviationPercent >= 25) severity = 'minor';
      else severity = 'warning';
    } else if (slo.metric.includes('conversion_rate')) {
      // Conversion rate - lower is bad
      isViolation = actualValue < slo.target;
      const deviationPercent = ((slo.target - actualValue) / slo.target) * 100;
      
      if (deviationPercent >= 30) severity = 'critical';
      else if (deviationPercent >= 15) severity = 'major';
      else if (deviationPercent >= 5) severity = 'minor';
      else severity = 'warning';
    }

    if (!isViolation) return null;

    const impactDescriptions = {
      'critical': 'Service severely degraded, immediate business impact',
      'major': 'Significant service degradation affecting users',
      'minor': 'Service degradation noticeable to some users',
      'warning': 'Service performance below target but functional'
    };

    return {
      id: `sla_violation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sla: sla.name,
      slo: `${slo.service}.${slo.metric}`,
      timestamp: new Date(),
      actualValue,
      targetValue: slo.target,
      severity,
      duration: 0, // Will be calculated over time
      impactDescription: impactDescriptions[severity]
    };
  }

  /**
   * Record SLA violation
   */
  private recordSLAViolation(violation: SLAViolation): void {
    const slaHistory = this.slaHistory.get(violation.sla) || [];
    slaHistory.push(violation);
    
    // Keep only last 1000 violations
    if (slaHistory.length > 1000) {
      slaHistory.splice(0, slaHistory.length - 1000);
    }
    
    this.slaHistory.set(violation.sla, slaHistory);

    // Record violation metrics
    this.metrics.recordCounter('sla_violations_total', 1, {
      sla: violation.sla,
      slo: violation.slo,
      severity: violation.severity
    });

    console.log(`[SLA VIOLATION] ${violation.severity.toUpperCase()}: ${violation.sla} - ${violation.slo}`);
    console.log(`  Target: ${violation.targetValue}, Actual: ${violation.actualValue}`);
    console.log(`  Impact: ${violation.impactDescription}`);
  }

  /**
   * Get current SLA status for all SLAs
   */
  getSLAStatus(): Map<string, SLAStatus> {
    const status = new Map<string, SLAStatus>();

    for (const [slaName, sla] of this.slas.entries()) {
      const violations = this.slaHistory.get(slaName) || [];
      
      // Get violations from last 30 days
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const recentViolations = violations.filter(v => v.timestamp > thirtyDaysAgo);
      
      // Calculate compliance percentage
      const totalSLOs = sla.slos.length;
      const violatedSLOs = new Set(recentViolations.map(v => v.slo)).size;
      const compliance = ((totalSLOs - violatedSLOs) / totalSLOs) * 100;
      
      // Calculate error budget remaining
      const errorBudgetUsed = (recentViolations.length / (totalSLOs * 30)) * 100; // Approximate
      const errorBudgetRemaining = Math.max(0, sla.errorBudget * 100 - errorBudgetUsed);
      
      // Determine overall status
      let overallStatus: SLAStatus['status'] = 'healthy';
      if (compliance < 95) overallStatus = 'violated';
      else if (compliance < 98 || errorBudgetRemaining < 20) overallStatus = 'warning';
      
      const lastViolation = recentViolations.length > 0 
        ? recentViolations[recentViolations.length - 1].timestamp 
        : undefined;

      status.set(slaName, {
        sla: slaName,
        status: overallStatus,
        compliance,
        errorBudgetRemaining,
        violationsCount: recentViolations.length,
        lastViolation
      });

      // Record SLA status metrics
      this.metrics.recordGauge('sla_compliance_percentage', compliance, {
        sla: slaName
      });

      this.metrics.recordGauge('sla_error_budget_remaining', errorBudgetRemaining, {
        sla: slaName
      });
    }

    return status;
  }

  /**
   * Get SLA violations within time range
   */
  getSLAViolations(slaName?: string, hours: number = 24): SLAViolation[] {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    if (slaName) {
      const violations = this.slaHistory.get(slaName) || [];
      return violations.filter(v => v.timestamp > cutoffTime);
    }

    // Get violations from all SLAs
    const allViolations: SLAViolation[] = [];
    for (const violations of this.slaHistory.values()) {
      allViolations.push(...violations.filter(v => v.timestamp > cutoffTime));
    }

    return allViolations.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Generate SLA compliance report
   */
  generateSLAReport(): string {
    const slaStatuses = this.getSLAStatus();
    const recentViolations = this.getSLAViolations(undefined, 24);
    
    const overallCompliance = Array.from(slaStatuses.values())
      .reduce((sum, status) => sum + status.compliance, 0) / slaStatuses.size;

    return `
# SLA Compliance Report

## Executive Summary
- **Overall SLA Compliance**: ${overallCompliance.toFixed(2)}%
- **Active SLAs**: ${slaStatuses.size}
- **Violations (24h)**: ${recentViolations.length}
- **SLAs in Violation**: ${Array.from(slaStatuses.values()).filter(s => s.status === 'violated').length}

## Individual SLA Status

${Array.from(slaStatuses.entries()).map(([name, status]) => `
### ${name}
- **Status**: ${status.status.toUpperCase()} ${status.status === 'healthy' ? '✅' : status.status === 'warning' ? '⚠️' : '❌'}
- **Compliance**: ${status.compliance.toFixed(2)}%
- **Error Budget Remaining**: ${status.errorBudgetRemaining.toFixed(2)}%
- **Violations (30d)**: ${status.violationsCount}
- **Last Violation**: ${status.lastViolation ? status.lastViolation.toISOString() : 'None'}
`).join('')}

## Recent Violations (Last 24 Hours)

${recentViolations.length === 0 ? 'No violations in the last 24 hours ✅' : 
recentViolations.slice(0, 10).map(violation => `
- **${violation.sla}** - ${violation.slo} (${violation.severity})
  - Target: ${violation.targetValue}${violation.targetValue < 100 ? '%' : 'ms'}
  - Actual: ${violation.actualValue}${violation.actualValue < 100 ? '%' : 'ms'}
  - Time: ${violation.timestamp.toISOString()}
  - Impact: ${violation.impactDescription}
`).join('')}

## Business Impact Analysis

${Array.from(this.slas.entries()).map(([name, sla]) => {
  const slaStatus = slaStatuses.get(name);
  if (!slaStatus || slaStatus.status === 'healthy') return '';
  
  return `
### ${name} Impact
**Status**: ${slaStatus.status === 'violated' ? 'VIOLATED' : 'AT RISK'}
**Consequences**:
${sla.consequences.map(c => `- ${c}`).join('\n')}
`;
}).filter(report => report).join('')}

## Recommendations

${Array.from(slaStatuses.values()).map(status => {
  if (status.status === 'healthy') return '';
  
  const recommendations = [];
  if (status.errorBudgetRemaining < 20) {
    recommendations.push('- Increase monitoring and alerting sensitivity');
  }
  if (status.compliance < 95) {
    recommendations.push('- Immediate incident response required');
    recommendations.push('- Review and strengthen underlying systems');
  }
  if (status.violationsCount > 10) {
    recommendations.push('- Investigate root causes of frequent violations');
    recommendations.push('- Consider SLO target adjustments if unrealistic');
  }
  
  return recommendations.length > 0 ? `
### ${status.sla}
${recommendations.join('\n')}
` : '';
}).filter(rec => rec).join('')}

## Next Steps
1. Address any critical or major SLA violations immediately
2. Review SLO targets for reasonableness and business alignment
3. Implement additional monitoring for at-risk SLAs
4. Schedule regular SLA review meetings with stakeholders
    `;
  }

  /**
   * Get SLA definitions for reference
   */
  getSLADefinitions(): Map<string, SLA> {
    return new Map(this.slas);
  }
}

export { SLAMonitor, SLA, SLO, SLAViolation, SLAStatus };