/**
 * Real-time Cost Monitoring and Alerting System
 * Tracks resource costs and provides automated alerting
 */

import { MetricsCollector } from '../metrics/collector';

interface CostMetric {
  service: string;
  resourceType: string;
  cost: number;
  timestamp: Date;
  budget: number;
  utilizationRate: number;
}

interface CostAlert {
  id: string;
  type: 'budget_exceeded' | 'unusual_spike' | 'underutilization';
  service: string;
  threshold: number;
  currentValue: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  message: string;
}

interface CostBudget {
  service: string;
  monthlyBudget: number;
  currentSpend: number;
  forecastedSpend: number;
  alertThreshold: number; // percentage
}

class CostMonitor {
  private metrics: MetricsCollector;
  private costHistory: Map<string, CostMetric[]> = new Map();
  private budgets: Map<string, CostBudget> = new Map();
  private alerts: CostAlert[] = [];

  constructor(metricsCollector: MetricsCollector) {
    this.metrics = metricsCollector;
    this.initializeBudgets();
  }

  /**
   * Initialize service budgets
   */
  private initializeBudgets(): void {
    const budgets: CostBudget[] = [
      {
        service: 'web-application',
        monthlyBudget: 200,
        currentSpend: 0,
        forecastedSpend: 0,
        alertThreshold: 80 // Alert at 80% of budget
      },
      {
        service: 'api-server',
        monthlyBudget: 300,
        currentSpend: 0,
        forecastedSpend: 0,
        alertThreshold: 80
      },
      {
        service: 'database',
        monthlyBudget: 150,
        currentSpend: 0,
        forecastedSpend: 0,
        alertThreshold: 85
      },
      {
        service: 'monitoring',
        monthlyBudget: 100,
        currentSpend: 0,
        forecastedSpend: 0,
        alertThreshold: 75
      },
      {
        service: 'cdn',
        monthlyBudget: 75,
        currentSpend: 0,
        forecastedSpend: 0,
        alertThreshold: 80
      }
    ];

    budgets.forEach(budget => {
      this.budgets.set(budget.service, budget);
    });
  }

  /**
   * Record cost metric
   */
  recordCostMetric(metric: CostMetric): void {
    const serviceHistory = this.costHistory.get(metric.service) || [];
    serviceHistory.push(metric);
    
    // Keep only last 30 days of data
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const filteredHistory = serviceHistory.filter(m => m.timestamp > thirtyDaysAgo);
    
    this.costHistory.set(metric.service, filteredHistory);

    // Update budget tracking
    this.updateBudgetTracking(metric);

    // Check for alerts
    this.checkCostAlerts(metric);

    // Record Prometheus metric
    this.metrics.recordGauge('cost_current', metric.cost, {
      service: metric.service,
      resource_type: metric.resourceType
    });

    this.metrics.recordGauge('cost_utilization_rate', metric.utilizationRate, {
      service: metric.service,
      resource_type: metric.resourceType
    });
  }

  /**
   * Update budget tracking
   */
  private updateBudgetTracking(metric: CostMetric): void {
    const budget = this.budgets.get(metric.service);
    if (!budget) return;

    // Calculate current month spend
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyMetrics = this.costHistory.get(metric.service)?.filter(
      m => m.timestamp >= monthStart
    ) || [];

    budget.currentSpend = monthlyMetrics.reduce((sum, m) => sum + m.cost, 0);
    
    // Forecast spend based on daily average
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysSoFar = now.getDate();
    const dailyAverage = budget.currentSpend / daysSoFar;
    budget.forecastedSpend = dailyAverage * daysInMonth;

    this.budgets.set(metric.service, budget);
  }

  /**
   * Check for cost alerts
   */
  private checkCostAlerts(metric: CostMetric): void {
    const budget = this.budgets.get(metric.service);
    if (!budget) return;

    // Budget threshold alert
    const budgetUsagePercent = (budget.currentSpend / budget.monthlyBudget) * 100;
    if (budgetUsagePercent >= budget.alertThreshold) {
      this.createAlert({
        type: 'budget_exceeded',
        service: metric.service,
        threshold: budget.alertThreshold,
        currentValue: budgetUsagePercent,
        severity: budgetUsagePercent >= 95 ? 'critical' : 'high',
        message: `Service ${metric.service} has used ${budgetUsagePercent.toFixed(1)}% of monthly budget`
      });
    }

    // Underutilization alert
    if (metric.utilizationRate < 0.3) {
      this.createAlert({
        type: 'underutilization',
        service: metric.service,
        threshold: 30,
        currentValue: metric.utilizationRate * 100,
        severity: 'medium',
        message: `Service ${metric.service} has low utilization: ${(metric.utilizationRate * 100).toFixed(1)}%`
      });
    }

    // Unusual cost spike detection
    const history = this.costHistory.get(metric.service) || [];
    if (history.length >= 7) {
      const lastWeekAverage = history.slice(-7, -1).reduce((sum, m) => sum + m.cost, 0) / 6;
      const spikeThreshold = lastWeekAverage * 1.5;
      
      if (metric.cost > spikeThreshold) {
        this.createAlert({
          type: 'unusual_spike',
          service: metric.service,
          threshold: spikeThreshold,
          currentValue: metric.cost,
          severity: 'high',
          message: `Service ${metric.service} cost spike detected: $${metric.cost} vs avg $${lastWeekAverage.toFixed(2)}`
        });
      }
    }
  }

  /**
   * Create cost alert
   */
  private createAlert(alertData: Omit<CostAlert, 'id' | 'timestamp'>): void {
    const alert: CostAlert = {
      id: `cost_alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ...alertData
    };

    this.alerts.push(alert);

    // Keep only last 100 alerts
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100);
    }

    // Record alert metric
    this.metrics.recordCounter('cost_alerts_total', 1, {
      service: alert.service,
      type: alert.type,
      severity: alert.severity
    });

    console.log(`[COST ALERT] ${alert.severity.toUpperCase()}: ${alert.message}`);
  }

  /**
   * Get cost summary for all services
   */
  getCostSummary(): {
    totalBudget: number;
    totalSpend: number;
    totalForecast: number;
    services: Array<CostBudget & { utilizationRate: number }>;
  } {
    let totalBudget = 0;
    let totalSpend = 0;
    let totalForecast = 0;

    const services = Array.from(this.budgets.values()).map(budget => {
      totalBudget += budget.monthlyBudget;
      totalSpend += budget.currentSpend;
      totalForecast += budget.forecastedSpend;

      // Get latest utilization rate
      const history = this.costHistory.get(budget.service) || [];
      const latestMetric = history[history.length - 1];
      const utilizationRate = latestMetric?.utilizationRate || 0;

      return {
        ...budget,
        utilizationRate
      };
    });

    return {
      totalBudget,
      totalSpend,
      totalForecast,
      services
    };
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): CostAlert[] {
    // Return alerts from last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.alerts.filter(alert => alert.timestamp > oneDayAgo);
  }

  /**
   * Generate cost optimization recommendations
   */
  getOptimizationRecommendations(): Array<{
    service: string;
    recommendation: string;
    estimatedSavings: number;
    priority: 'low' | 'medium' | 'high';
  }> {
    const recommendations: Array<{
      service: string;
      recommendation: string;
      estimatedSavings: number;
      priority: 'low' | 'medium' | 'high';
    }> = [];

    for (const [service, budget] of this.budgets.entries()) {
      const history = this.costHistory.get(service) || [];
      const latestMetric = history[history.length - 1];

      if (!latestMetric) continue;

      // Low utilization recommendation
      if (latestMetric.utilizationRate < 0.4) {
        recommendations.push({
          service,
          recommendation: `Reduce resource allocation - current utilization: ${(latestMetric.utilizationRate * 100).toFixed(1)}%`,
          estimatedSavings: budget.currentSpend * 0.3,
          priority: 'high'
        });
      }

      // Over-budget recommendation
      if (budget.forecastedSpend > budget.monthlyBudget * 1.1) {
        recommendations.push({
          service,
          recommendation: 'Implement cost controls or increase budget - forecasted to exceed budget',
          estimatedSavings: 0,
          priority: 'high'
        });
      }

      // Consistent high cost recommendation
      const avgCost = history.slice(-7).reduce((sum, m) => sum + m.cost, 0) / 7;
      if (avgCost > budget.monthlyBudget * 0.1) {
        recommendations.push({
          service,
          recommendation: 'Consider reserved instances or committed use discounts',
          estimatedSavings: avgCost * 30 * 0.15, // 15% savings estimate
          priority: 'medium'
        });
      }
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}

export { CostMonitor, CostMetric, CostAlert, CostBudget };