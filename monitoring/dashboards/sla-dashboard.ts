/**
 * SLA Compliance Dashboard and Alerting System
 * Provides comprehensive SLA monitoring, alerting, and reporting dashboards
 */

import { SLAMonitor } from '../sla/sla-monitor';
import { CostAllocationFramework } from '../cost-optimization/cost-allocation';
import { MetricsCollector } from '../metrics/collector';

interface DashboardWidget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'alert' | 'status';
  title: string;
  description: string;
  data: any;
  config: Record<string, any>;
}

interface Dashboard {
  id: string;
  name: string;
  category: 'executive' | 'operational' | 'technical';
  widgets: DashboardWidget[];
  refreshInterval: number; // seconds
  permissions: string[];
}

interface AlertRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  threshold: number;
  severity: 'info' | 'warning' | 'critical';
  channels: Array<'email' | 'slack' | 'pagerduty' | 'webhook'>;
  enabled: boolean;
}

class SLADashboardSystem {
  private slaMonitor: SLAMonitor;
  private costFramework: CostAllocationFramework;
  private metrics: MetricsCollector;
  private dashboards: Map<string, Dashboard> = new Map();
  private alertRules: Map<string, AlertRule> = new Map();

  constructor(
    slaMonitor: SLAMonitor,
    costFramework: CostAllocationFramework,
    metricsCollector: MetricsCollector
  ) {
    this.slaMonitor = slaMonitor;
    this.costFramework = costFramework;
    this.metrics = metricsCollector;
    this.initializeDashboards();
    this.initializeAlertRules();
  }

  /**
   * Initialize pre-built dashboards
   */
  private initializeDashboards(): void {
    const dashboards: Dashboard[] = [
      {
        id: 'executive-sla-overview',
        name: 'Executive SLA Overview',
        category: 'executive',
        refreshInterval: 300, // 5 minutes
        permissions: ['executive', 'director', 'manager'],
        widgets: [
          {
            id: 'sla-compliance-summary',
            type: 'metric',
            title: 'Overall SLA Compliance',
            description: 'Average compliance across all SLAs',
            data: {
              value: 99.2,
              unit: '%',
              trend: 'stable',
              target: 99.0
            },
            config: {
              format: 'percentage',
              thresholds: {
                critical: 95,
                warning: 98,
                good: 99
              }
            }
          },
          {
            id: 'active-violations',
            type: 'alert',
            title: 'Active SLA Violations',
            description: 'Current violations requiring attention',
            data: {
              count: 2,
              critical: 0,
              major: 1,
              minor: 1
            },
            config: {
              showDetails: true,
              maxItems: 5
            }
          },
          {
            id: 'business-impact-summary',
            type: 'table',
            title: 'Business Impact Summary',
            description: 'Revenue and customer impact of SLA performance',
            data: [
              {
                sla: 'Lead Processing SLA',
                status: 'Healthy',
                businessImpact: 'No impact',
                revenueAtRisk: '$0'
              },
              {
                sla: 'Website Availability SLA',
                status: 'Warning',
                businessImpact: 'Minor customer acquisition impact',
                revenueAtRisk: '$2,500/day'
              }
            ],
            config: {
              sortBy: 'revenueAtRisk',
              sortOrder: 'desc'
            }
          },
          {
            id: 'cost-sla-correlation',
            type: 'chart',
            title: 'Cost vs SLA Performance',
            description: 'Relationship between infrastructure cost and SLA compliance',
            data: {
              type: 'scatter',
              datasets: [
                {
                  label: 'Cost vs Compliance',
                  data: [
                    { x: 400, y: 99.95, label: 'Web Application' },
                    { x: 300, y: 99.8, label: 'API Server' },
                    { x: 150, y: 99.9, label: 'Database' }
                  ]
                }
              ]
            },
            config: {
              xAxis: { title: 'Monthly Cost ($)' },
              yAxis: { title: 'SLA Compliance (%)' }
            }
          }
        ]
      },
      {
        id: 'operational-sla-monitoring',
        name: 'Operational SLA Monitoring',
        category: 'operational',
        refreshInterval: 60, // 1 minute
        permissions: ['operator', 'sre', 'devops', 'manager'],
        widgets: [
          {
            id: 'sla-status-grid',
            type: 'status',
            title: 'SLA Status Grid',
            description: 'Current status of all SLAs',
            data: {
              slas: [
                {
                  name: 'Website Availability',
                  status: 'healthy',
                  compliance: 99.95,
                  errorBudget: 78,
                  lastViolation: null
                },
                {
                  name: 'API Performance',
                  status: 'warning',
                  compliance: 98.5,
                  errorBudget: 45,
                  lastViolation: '2 hours ago'
                },
                {
                  name: 'Lead Processing',
                  status: 'healthy',
                  compliance: 99.9,
                  errorBudget: 85,
                  lastViolation: null
                }
              ]
            },
            config: {
              layout: 'grid',
              showTrends: true
            }
          },
          {
            id: 'error-budget-burn-rate',
            type: 'chart',
            title: 'Error Budget Burn Rate',
            description: 'Rate of error budget consumption over time',
            data: {
              type: 'line',
              datasets: [
                {
                  label: 'Website Availability',
                  data: [
                    { x: '2024-01-01', y: 100 },
                    { x: '2024-01-07', y: 85 },
                    { x: '2024-01-14', y: 78 }
                  ]
                },
                {
                  label: 'API Performance',
                  data: [
                    { x: '2024-01-01', y: 100 },
                    { x: '2024-01-07', y: 60 },
                    { x: '2024-01-14', y: 45 }
                  ]
                }
              ]
            },
            config: {
              yAxis: { title: 'Error Budget Remaining (%)' },
              thresholds: [20, 50] // Warning and critical levels
            }
          },
          {
            id: 'violation-timeline',
            type: 'table',
            title: 'Recent SLA Violations',
            description: 'Timeline of recent violations and resolutions',
            data: [
              {
                timestamp: '2024-01-14T10:30:00Z',
                sla: 'API Performance SLA',
                slo: 'response_time_p95',
                severity: 'minor',
                duration: '15 min',
                status: 'resolved',
                impact: 'Some users experienced slower response times'
              }
            ],
            config: {
              maxItems: 10,
              showResolutionTime: true
            }
          },
          {
            id: 'performance-trends',
            type: 'chart',
            title: 'SLA Performance Trends (7 days)',
            description: '7-day trend for key SLA metrics',
            data: {
              type: 'line',
              datasets: [
                {
                  label: 'Website Availability (%)',
                  data: [
                    { x: '2024-01-08', y: 99.95 },
                    { x: '2024-01-09', y: 99.92 },
                    { x: '2024-01-10', y: 99.98 },
                    { x: '2024-01-11', y: 99.85 },
                    { x: '2024-01-12', y: 99.90 },
                    { x: '2024-01-13', y: 99.95 },
                    { x: '2024-01-14', y: 99.93 }
                  ]
                }
              ]
            },
            config: {
              yAxis: { min: 99.5, max: 100 },
              showTargetLine: true,
              targetValue: 99.95
            }
          }
        ]
      },
      {
        id: 'technical-sla-details',
        name: 'Technical SLA Details',
        category: 'technical',
        refreshInterval: 30, // 30 seconds
        permissions: ['engineer', 'sre', 'devops'],
        widgets: [
          {
            id: 'slo-breakdown',
            type: 'table',
            title: 'SLO Performance Breakdown',
            description: 'Detailed performance metrics for each SLO',
            data: [
              {
                service: 'web-application',
                metric: 'availability',
                current: 99.95,
                target: 99.95,
                status: 'Meeting',
                lastMeasurement: '30s ago'
              },
              {
                service: 'api-server',
                metric: 'response_time_p95',
                current: 185,
                target: 200,
                status: 'Meeting',
                lastMeasurement: '30s ago'
              },
              {
                service: 'api-server',
                metric: 'response_time_p99',
                current: 520,
                target: 500,
                status: 'Violation',
                lastMeasurement: '30s ago'
              }
            ],
            config: {
              sortBy: 'status',
              highlightViolations: true
            }
          },
          {
            id: 'infrastructure-health',
            type: 'status',
            title: 'Infrastructure Health Map',
            description: 'Health status of all infrastructure components',
            data: {
              components: [
                { name: 'Load Balancer', status: 'healthy', metrics: { cpu: 15, memory: 45 } },
                { name: 'Web Servers', status: 'healthy', metrics: { cpu: 35, memory: 62 } },
                { name: 'API Servers', status: 'warning', metrics: { cpu: 78, memory: 85 } },
                { name: 'Database', status: 'healthy', metrics: { cpu: 25, memory: 68 } },
                { name: 'Cache', status: 'healthy', metrics: { cpu: 12, memory: 34 } }
              ]
            },
            config: {
              layout: 'tree',
              showMetrics: true
            }
          },
          {
            id: 'real-time-metrics',
            type: 'chart',
            title: 'Real-time SLA Metrics',
            description: 'Live view of key SLA metrics',
            data: {
              type: 'realtime',
              metrics: [
                { name: 'API Response Time (P95)', unit: 'ms', current: 185 },
                { name: 'Error Rate', unit: '%', current: 0.05 },
                { name: 'Throughput', unit: 'req/s', current: 1250 }
              ]
            },
            config: {
              updateInterval: 5,
              timeWindow: '1h'
            }
          }
        ]
      }
    ];

    dashboards.forEach(dashboard => {
      this.dashboards.set(dashboard.id, dashboard);
    });
  }

  /**
   * Initialize alert rules for SLA monitoring
   */
  private initializeAlertRules(): void {
    const alertRules: AlertRule[] = [
      {
        id: 'sla-compliance-critical',
        name: 'SLA Compliance Critical',
        description: 'Alert when any SLA compliance drops below critical threshold',
        condition: 'sla_compliance_percentage < 95',
        threshold: 95,
        severity: 'critical',
        channels: ['email', 'slack', 'pagerduty'],
        enabled: true
      },
      {
        id: 'error-budget-exhausted',
        name: 'Error Budget Exhausted',
        description: 'Alert when error budget is nearly exhausted',
        condition: 'sla_error_budget_remaining < 10',
        threshold: 10,
        severity: 'critical',
        channels: ['email', 'slack', 'pagerduty'],
        enabled: true
      },
      {
        id: 'error-budget-warning',
        name: 'Error Budget Warning',
        description: 'Warning when error budget is running low',
        condition: 'sla_error_budget_remaining < 25',
        threshold: 25,
        severity: 'warning',
        channels: ['email', 'slack'],
        enabled: true
      },
      {
        id: 'sla-violation-detected',
        name: 'SLA Violation Detected',
        description: 'Alert on any new SLA violation',
        condition: 'sla_violations_total > 0',
        threshold: 0,
        severity: 'warning',
        channels: ['email', 'slack'],
        enabled: true
      },
      {
        id: 'multiple-violations',
        name: 'Multiple SLA Violations',
        description: 'Critical alert for multiple simultaneous violations',
        condition: 'count(sla_violations_active) > 2',
        threshold: 2,
        severity: 'critical',
        channels: ['email', 'slack', 'pagerduty'],
        enabled: true
      },
      {
        id: 'response-time-degradation',
        name: 'Response Time Degradation',
        description: 'Alert on sustained response time increases',
        condition: 'response_time_p95 > sla_target * 1.2',
        threshold: 1.2, // 20% above target
        severity: 'warning',
        channels: ['email', 'slack'],
        enabled: true
      },
      {
        id: 'availability-incident',
        name: 'Availability Incident',
        description: 'Critical alert for availability drops',
        condition: 'availability < 99.5',
        threshold: 99.5,
        severity: 'critical',
        channels: ['email', 'slack', 'pagerduty'],
        enabled: true
      },
      {
        id: 'business-sla-impact',
        name: 'Business SLA Impact',
        description: 'Alert when business-critical SLAs are affected',
        condition: 'lead_conversion_rate < sla_target * 0.9',
        threshold: 0.9, // 10% below target
        severity: 'critical',
        channels: ['email', 'slack', 'pagerduty'],
        enabled: true
      }
    ];

    alertRules.forEach(rule => {
      this.alertRules.set(rule.id, rule);
    });
  }

  /**
   * Get dashboard by ID
   */
  getDashboard(dashboardId: string): Dashboard | null {
    return this.dashboards.get(dashboardId) || null;
  }

  /**
   * Get dashboards by category
   */
  getDashboardsByCategory(category: Dashboard['category']): Dashboard[] {
    return Array.from(this.dashboards.values()).filter(
      dashboard => dashboard.category === category
    );
  }

  /**
   * Update dashboard with real-time data
   */
  updateDashboardData(dashboardId: string): Dashboard | null {
    const dashboard = this.dashboards.get(dashboardId);
    if (!dashboard) return null;

    // Update widgets with current data
    dashboard.widgets.forEach(widget => {
      switch (widget.id) {
        case 'sla-compliance-summary':
          const slaStatuses = this.slaMonitor.getSLAStatus();
          const avgCompliance = Array.from(slaStatuses.values())
            .reduce((sum, status) => sum + status.compliance, 0) / slaStatuses.size;
          
          widget.data.value = Math.round(avgCompliance * 100) / 100;
          break;

        case 'active-violations':
          const violations = this.slaMonitor.getSLAViolations(undefined, 24);
          widget.data.count = violations.length;
          widget.data.critical = violations.filter(v => v.severity === 'critical').length;
          widget.data.major = violations.filter(v => v.severity === 'major').length;
          widget.data.minor = violations.filter(v => v.severity === 'minor').length;
          break;

        case 'cost-sla-correlation':
          const costReport = this.costFramework.generateCostReport();
          // Update with real cost and SLA data
          break;

        default:
          // Widget-specific updates would go here
          break;
      }
    });

    this.dashboards.set(dashboardId, dashboard);
    return dashboard;
  }

  /**
   * Evaluate alert rules and trigger notifications
   */
  evaluateAlerts(): Array<{
    rule: AlertRule;
    triggered: boolean;
    currentValue: number;
    message: string;
  }> {
    const results: Array<{
      rule: AlertRule;
      triggered: boolean;
      currentValue: number;
      message: string;
    }> = [];

    for (const rule of this.alertRules.values()) {
      if (!rule.enabled) continue;

      const evaluation = this.evaluateAlertRule(rule);
      results.push(evaluation);

      if (evaluation.triggered) {
        this.triggerAlert(rule, evaluation);
      }
    }

    return results;
  }

  /**
   * Evaluate individual alert rule
   */
  private evaluateAlertRule(rule: AlertRule): {
    rule: AlertRule;
    triggered: boolean;
    currentValue: number;
    message: string;
  } {
    let triggered = false;
    let currentValue = 0;
    let message = '';

    // Simple rule evaluation - in production this would use a proper rule engine
    switch (rule.id) {
      case 'sla-compliance-critical':
        const slaStatuses = this.slaMonitor.getSLAStatus();
        const minCompliance = Math.min(...Array.from(slaStatuses.values()).map(s => s.compliance));
        currentValue = minCompliance;
        triggered = minCompliance < rule.threshold;
        message = triggered 
          ? `SLA compliance dropped to ${minCompliance.toFixed(2)}%, below critical threshold of ${rule.threshold}%`
          : `SLA compliance healthy at ${minCompliance.toFixed(2)}%`;
        break;

      case 'error-budget-exhausted':
        const statuses = this.slaMonitor.getSLAStatus();
        const minErrorBudget = Math.min(...Array.from(statuses.values()).map(s => s.errorBudgetRemaining));
        currentValue = minErrorBudget;
        triggered = minErrorBudget < rule.threshold;
        message = triggered 
          ? `Error budget critically low at ${minErrorBudget.toFixed(2)}%`
          : `Error budget healthy at ${minErrorBudget.toFixed(2)}%`;
        break;

      case 'sla-violation-detected':
        const recentViolations = this.slaMonitor.getSLAViolations(undefined, 1); // Last hour
        currentValue = recentViolations.length;
        triggered = recentViolations.length > 0;
        message = triggered 
          ? `${recentViolations.length} new SLA violations detected in the last hour`
          : 'No recent SLA violations';
        break;

      default:
        // Default evaluation
        triggered = false;
        message = `Rule ${rule.name} evaluation not implemented`;
        break;
    }

    return {
      rule,
      triggered,
      currentValue,
      message
    };
  }

  /**
   * Trigger alert notification
   */
  private triggerAlert(rule: AlertRule, evaluation: any): void {
    console.log(`[ALERT TRIGGERED] ${rule.severity.toUpperCase()}: ${rule.name}`);
    console.log(`  Condition: ${rule.condition}`);
    console.log(`  Current Value: ${evaluation.currentValue}`);
    console.log(`  Threshold: ${rule.threshold}`);
    console.log(`  Message: ${evaluation.message}`);
    console.log(`  Channels: ${rule.channels.join(', ')}`);

    // Record alert metric
    this.metrics.recordCounter('sla_alerts_total', 1, {
      rule: rule.id,
      severity: rule.severity
    });

    // In production, this would integrate with actual notification systems
    rule.channels.forEach(channel => {
      switch (channel) {
        case 'email':
          this.sendEmailAlert(rule, evaluation);
          break;
        case 'slack':
          this.sendSlackAlert(rule, evaluation);
          break;
        case 'pagerduty':
          this.sendPagerDutyAlert(rule, evaluation);
          break;
        case 'webhook':
          this.sendWebhookAlert(rule, evaluation);
          break;
      }
    });
  }

  /**
   * Send email alert (placeholder)
   */
  private sendEmailAlert(rule: AlertRule, evaluation: any): void {
    console.log(`[EMAIL ALERT] Sent alert for rule: ${rule.name}`);
    // Integrate with email service
  }

  /**
   * Send Slack alert (placeholder)
   */
  private sendSlackAlert(rule: AlertRule, evaluation: any): void {
    console.log(`[SLACK ALERT] Sent alert for rule: ${rule.name}`);
    // Integrate with Slack API
  }

  /**
   * Send PagerDuty alert (placeholder)
   */
  private sendPagerDutyAlert(rule: AlertRule, evaluation: any): void {
    console.log(`[PAGERDUTY ALERT] Sent alert for rule: ${rule.name}`);
    // Integrate with PagerDuty API
  }

  /**
   * Send webhook alert (placeholder)
   */
  private sendWebhookAlert(rule: AlertRule, evaluation: any): void {
    console.log(`[WEBHOOK ALERT] Sent alert for rule: ${rule.name}`);
    // Send HTTP webhook
  }

  /**
   * Generate comprehensive SLA dashboard report
   */
  generateDashboardReport(): string {
    const slaStatuses = this.slaMonitor.getSLAStatus();
    const recentViolations = this.slaMonitor.getSLAViolations(undefined, 24);
    const costReport = this.costFramework.generateCostReport();
    
    const overallCompliance = Array.from(slaStatuses.values())
      .reduce((sum, status) => sum + status.compliance, 0) / slaStatuses.size;

    return `
# SLA Dashboard & Monitoring Report

## Executive Summary
- **Overall SLA Compliance**: ${overallCompliance.toFixed(2)}%
- **Active Dashboards**: ${this.dashboards.size}
- **Alert Rules**: ${this.alertRules.size} (${Array.from(this.alertRules.values()).filter(r => r.enabled).length} enabled)
- **Recent Violations**: ${recentViolations.length} (last 24h)

## Dashboard Overview

### Executive Dashboards
${this.getDashboardsByCategory('executive').map(d => `
- **${d.name}**: ${d.widgets.length} widgets, refreshes every ${d.refreshInterval}s
  - Audience: ${d.permissions.join(', ')}
`).join('')}

### Operational Dashboards
${this.getDashboardsByCategory('operational').map(d => `
- **${d.name}**: ${d.widgets.length} widgets, refreshes every ${d.refreshInterval}s
  - Audience: ${d.permissions.join(', ')}
`).join('')}

### Technical Dashboards
${this.getDashboardsByCategory('technical').map(d => `
- **${d.name}**: ${d.widgets.length} widgets, refreshes every ${d.refreshInterval}s
  - Audience: ${d.permissions.join(', ')}
`).join('')}

## Alert Configuration

### Critical Alerts
${Array.from(this.alertRules.values()).filter(r => r.severity === 'critical').map(rule => `
- **${rule.name}**: ${rule.description}
  - Condition: ${rule.condition}
  - Threshold: ${rule.threshold}
  - Channels: ${rule.channels.join(', ')}
  - Status: ${rule.enabled ? 'Enabled ✅' : 'Disabled ❌'}
`).join('')}

### Warning Alerts
${Array.from(this.alertRules.values()).filter(r => r.severity === 'warning').map(rule => `
- **${rule.name}**: ${rule.description}
  - Condition: ${rule.condition}
  - Threshold: ${rule.threshold}
  - Channels: ${rule.channels.join(', ')}
  - Status: ${rule.enabled ? 'Enabled ✅' : 'Disabled ❌'}
`).join('')}

## SLA Performance Summary

${Array.from(slaStatuses.entries()).map(([name, status]) => `
### ${name}
- **Status**: ${status.status.toUpperCase()} ${status.status === 'healthy' ? '✅' : status.status === 'warning' ? '⚠️' : '❌'}
- **Compliance**: ${status.compliance.toFixed(2)}%
- **Error Budget**: ${status.errorBudgetRemaining.toFixed(2)}% remaining
- **Violations (30d)**: ${status.violationsCount}
`).join('')}

## Cost-SLA Correlation

Total Infrastructure Cost: $${costReport.totalCost.toFixed(2)}/month
Average SLA Compliance: ${overallCompliance.toFixed(2)}%
Cost per Compliance Point: $${(costReport.totalCost / overallCompliance).toFixed(2)}/month

## Recommendations

### Dashboard Optimization
1. Add real-time alerting integration to operational dashboards
2. Implement mobile-responsive views for on-call teams
3. Create custom dashboards for specific business units

### Alert Tuning
1. Review alert thresholds based on historical data
2. Implement alert correlation to reduce noise
3. Add automated remediation for common violations

### SLA Management
1. Schedule quarterly SLA review with business stakeholders
2. Implement predictive alerting based on trend analysis
3. Develop SLA violation playbooks and runbooks

## Access and Permissions

### Dashboard Access
- **Executive**: ${this.getDashboardsByCategory('executive').length} dashboards
- **Operational**: ${this.getDashboardsByCategory('operational').length} dashboards  
- **Technical**: ${this.getDashboardsByCategory('technical').length} dashboards

### Alert Recipients
- **Critical Alerts**: PagerDuty + Email + Slack
- **Warning Alerts**: Email + Slack
- **Info Alerts**: Slack only

## Next Steps
1. Deploy dashboards to production monitoring infrastructure
2. Configure notification channels and test alert delivery
3. Train teams on dashboard usage and alert response procedures
4. Implement automated SLA reporting for monthly business reviews
    `;
  }

  /**
   * Get all available dashboards
   */
  getAllDashboards(): Dashboard[] {
    return Array.from(this.dashboards.values());
  }

  /**
   * Get all alert rules
   */
  getAllAlertRules(): AlertRule[] {
    return Array.from(this.alertRules.values());
  }
}

export { SLADashboardSystem, Dashboard, DashboardWidget, AlertRule };