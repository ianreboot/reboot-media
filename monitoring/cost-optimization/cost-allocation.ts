/**
 * Cost Allocation and Budgeting Framework
 * Allocates costs by feature, department, and business unit
 */

import { CostMonitor } from './cost-monitor';
import { MetricsCollector } from '../metrics/collector';

interface CostCenter {
  id: string;
  name: string;
  type: 'department' | 'feature' | 'project' | 'environment';
  budget: number; // Monthly budget
  actualCost: number;
  forecastCost: number;
  owner: string;
  tags: Record<string, string>;
}

interface ResourceAllocation {
  resourceId: string;
  resourceType: 'compute' | 'storage' | 'network' | 'service';
  costCenters: Array<{
    costCenterId: string;
    allocationPercent: number;
    justification: string;
  }>;
  totalCost: number;
  timestamp: Date;
}

interface CostReport {
  period: string;
  totalCost: number;
  totalBudget: number;
  variance: number;
  costCenters: Array<CostCenter & {
    utilization: number;
    efficiency: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }>;
  recommendations: string[];
}

class CostAllocationFramework {
  private costMonitor: CostMonitor;
  private metrics: MetricsCollector;
  private costCenters: Map<string, CostCenter> = new Map();
  private allocations: Map<string, ResourceAllocation> = new Map();
  private allocationHistory: ResourceAllocation[] = [];

  constructor(costMonitor: CostMonitor, metricsCollector: MetricsCollector) {
    this.costMonitor = costMonitor;
    this.metrics = metricsCollector;
    this.initializeCostCenters();
    this.initializeAllocations();
  }

  /**
   * Initialize cost centers for the reboot project
   */
  private initializeCostCenters(): void {
    const centers: CostCenter[] = [
      // Department-based cost centers
      {
        id: 'marketing-dept',
        name: 'Marketing Department',
        type: 'department',
        budget: 400,
        actualCost: 0,
        forecastCost: 0,
        owner: 'Marketing Director',
        tags: {
          department: 'marketing',
          priority: 'high'
        }
      },
      {
        id: 'engineering-dept',
        name: 'Engineering Department',
        type: 'department',
        budget: 350,
        actualCost: 0,
        forecastCost: 0,
        owner: 'Engineering Manager',
        tags: {
          department: 'engineering',
          priority: 'high'
        }
      },
      {
        id: 'operations-dept',
        name: 'Operations Department',
        type: 'department',
        budget: 200,
        actualCost: 0,
        forecastCost: 0,
        owner: 'DevOps Lead',
        tags: {
          department: 'operations',
          priority: 'medium'
        }
      },

      // Feature-based cost centers
      {
        id: 'lead-generation',
        name: 'Lead Generation System',
        type: 'feature',
        budget: 250,
        actualCost: 0,
        forecastCost: 0,
        owner: 'Product Manager',
        tags: {
          feature: 'lead-generation',
          business_impact: 'high',
          revenue_generating: 'true'
        }
      },
      {
        id: 'website-core',
        name: 'Core Website Infrastructure',
        type: 'feature',
        budget: 300,
        actualCost: 0,
        forecastCost: 0,
        owner: 'Frontend Lead',
        tags: {
          feature: 'website',
          business_impact: 'high',
          customer_facing: 'true'
        }
      },
      {
        id: 'monitoring-observability',
        name: 'Monitoring & Observability',
        type: 'feature',
        budget: 150,
        actualCost: 0,
        forecastCost: 0,
        owner: 'SRE Lead',
        tags: {
          feature: 'monitoring',
          business_impact: 'medium',
          internal_tool: 'true'
        }
      },
      {
        id: 'business-intelligence',
        name: 'Business Intelligence & Analytics',
        type: 'feature',
        budget: 100,
        actualCost: 0,
        forecastCost: 0,
        owner: 'Data Lead',
        tags: {
          feature: 'analytics',
          business_impact: 'medium',
          decision_support: 'true'
        }
      },

      // Environment-based cost centers
      {
        id: 'production-env',
        name: 'Production Environment',
        type: 'environment',
        budget: 600,
        actualCost: 0,
        forecastCost: 0,
        owner: 'DevOps Lead',
        tags: {
          environment: 'production',
          criticality: 'high'
        }
      },
      {
        id: 'development-env',
        name: 'Development Environment',
        type: 'environment',
        budget: 150,
        actualCost: 0,
        forecastCost: 0,
        owner: 'Engineering Manager',
        tags: {
          environment: 'development',
          criticality: 'low'
        }
      },

      // Project-based cost center
      {
        id: 'reboot-project',
        name: 'Reboot Project Infrastructure',
        type: 'project',
        budget: 1000,
        actualCost: 0,
        forecastCost: 0,
        owner: 'Project Manager',
        tags: {
          project: 'reboot',
          phase: 'deployment',
          timeline: '6-months'
        }
      }
    ];

    centers.forEach(center => {
      this.costCenters.set(center.id, center);
    });
  }

  /**
   * Initialize resource cost allocations
   */
  private initializeAllocations(): void {
    const allocations: ResourceAllocation[] = [
      {
        resourceId: 'web-application-compute',
        resourceType: 'compute',
        totalCost: 200,
        timestamp: new Date(),
        costCenters: [
          {
            costCenterId: 'website-core',
            allocationPercent: 70,
            justification: 'Primary web application hosting'
          },
          {
            costCenterId: 'lead-generation',
            allocationPercent: 20,
            justification: 'Lead form processing components'
          },
          {
            costCenterId: 'marketing-dept',
            allocationPercent: 10,
            justification: 'Marketing campaign landing pages'
          }
        ]
      },
      {
        resourceId: 'api-server-compute',
        resourceType: 'compute',
        totalCost: 300,
        timestamp: new Date(),
        costCenters: [
          {
            costCenterId: 'lead-generation',
            allocationPercent: 60,
            justification: 'Lead processing and validation APIs'
          },
          {
            costCenterId: 'website-core',
            allocationPercent: 25,
            justification: 'Core website API endpoints'
          },
          {
            costCenterId: 'business-intelligence',
            allocationPercent: 15,
            justification: 'Analytics and reporting APIs'
          }
        ]
      },
      {
        resourceId: 'database-storage',
        resourceType: 'storage',
        totalCost: 150,
        timestamp: new Date(),
        costCenters: [
          {
            costCenterId: 'lead-generation',
            allocationPercent: 50,
            justification: 'Lead data storage and management'
          },
          {
            costCenterId: 'business-intelligence',
            allocationPercent: 30,
            justification: 'Analytics data warehouse'
          },
          {
            costCenterId: 'website-core',
            allocationPercent: 20,
            justification: 'User sessions and configuration data'
          }
        ]
      },
      {
        resourceId: 'monitoring-stack',
        resourceType: 'service',
        totalCost: 100,
        timestamp: new Date(),
        costCenters: [
          {
            costCenterId: 'monitoring-observability',
            allocationPercent: 100,
            justification: 'Complete monitoring and observability stack'
          }
        ]
      },
      {
        resourceId: 'cdn-network',
        resourceType: 'network',
        totalCost: 75,
        timestamp: new Date(),
        costCenters: [
          {
            costCenterId: 'website-core',
            allocationPercent: 80,
            justification: 'Static asset delivery and caching'
          },
          {
            costCenterId: 'marketing-dept',
            allocationPercent: 20,
            justification: 'Marketing asset delivery'
          }
        ]
      }
    ];

    allocations.forEach(allocation => {
      this.allocations.set(allocation.resourceId, allocation);
      this.allocationHistory.push(allocation);
    });

    this.updateCostCenterAllocations();
  }

  /**
   * Update cost center allocations based on resource costs
   */
  private updateCostCenterAllocations(): void {
    // Reset all cost center costs
    for (const center of this.costCenters.values()) {
      center.actualCost = 0;
      center.forecastCost = 0;
    }

    // Allocate costs from resources to cost centers
    for (const allocation of this.allocations.values()) {
      allocation.costCenters.forEach(centerAllocation => {
        const center = this.costCenters.get(centerAllocation.costCenterId);
        if (center) {
          const allocatedCost = (allocation.totalCost * centerAllocation.allocationPercent) / 100;
          center.actualCost += allocatedCost;
          center.forecastCost += allocatedCost * 1.05; // 5% growth assumption
        }
      });
    }

    // Record cost center metrics
    for (const [centerId, center] of this.costCenters.entries()) {
      this.metrics.recordGauge('cost_center_actual', center.actualCost, {
        cost_center: centerId,
        type: center.type,
        owner: center.owner
      });

      this.metrics.recordGauge('cost_center_budget_utilization', 
        (center.actualCost / center.budget) * 100, {
        cost_center: centerId,
        type: center.type
      });
    }
  }

  /**
   * Add or update resource allocation
   */
  updateResourceAllocation(allocation: ResourceAllocation): void {
    // Validate allocation percentages sum to 100%
    const totalPercent = allocation.costCenters.reduce(
      (sum, center) => sum + center.allocationPercent, 0
    );

    if (Math.abs(totalPercent - 100) > 0.01) {
      throw new Error(`Resource allocation percentages must sum to 100%, got ${totalPercent}%`);
    }

    // Validate all cost centers exist
    for (const centerAllocation of allocation.costCenters) {
      if (!this.costCenters.has(centerAllocation.costCenterId)) {
        throw new Error(`Cost center ${centerAllocation.costCenterId} does not exist`);
      }
    }

    this.allocations.set(allocation.resourceId, allocation);
    this.allocationHistory.push(allocation);

    // Keep only last 1000 allocation records
    if (this.allocationHistory.length > 1000) {
      this.allocationHistory = this.allocationHistory.slice(-1000);
    }

    this.updateCostCenterAllocations();
  }

  /**
   * Generate cost allocation report
   */
  generateCostReport(period: string = 'current-month'): CostReport {
    const totalCost = Array.from(this.costCenters.values())
      .reduce((sum, center) => sum + center.actualCost, 0);
    
    const totalBudget = Array.from(this.costCenters.values())
      .reduce((sum, center) => sum + center.budget, 0);
    
    const variance = ((totalCost - totalBudget) / totalBudget) * 100;

    const costCentersWithMetrics = Array.from(this.costCenters.values()).map(center => {
      const utilization = (center.actualCost / center.budget) * 100;
      const efficiency = center.actualCost > 0 ? (center.budget / center.actualCost) * 100 : 100;
      
      // Simple trend calculation (would be more sophisticated with historical data)
      const trend: 'increasing' | 'decreasing' | 'stable' = 
        center.forecastCost > center.actualCost * 1.1 ? 'increasing' :
        center.forecastCost < center.actualCost * 0.9 ? 'decreasing' : 'stable';

      return {
        ...center,
        utilization,
        efficiency,
        trend
      };
    });

    const recommendations = this.generateRecommendations(costCentersWithMetrics);

    return {
      period,
      totalCost,
      totalBudget,
      variance,
      costCenters: costCentersWithMetrics,
      recommendations
    };
  }

  /**
   * Generate cost optimization recommendations
   */
  private generateRecommendations(costCenters: Array<CostCenter & { 
    utilization: number; 
    efficiency: number; 
    trend: string 
  }>): string[] {
    const recommendations: string[] = [];

    // Over-budget recommendations
    const overBudget = costCenters.filter(center => center.utilization > 100);
    if (overBudget.length > 0) {
      recommendations.push(
        `${overBudget.length} cost centers over budget: ${overBudget.map(c => c.name).join(', ')}`
      );
    }

    // Underutilized recommendations
    const underUtilized = costCenters.filter(center => center.utilization < 60);
    if (underUtilized.length > 0) {
      recommendations.push(
        `Consider reducing budget for underutilized centers: ${underUtilized.map(c => c.name).join(', ')}`
      );
    }

    // Trend-based recommendations
    const rapidlyIncreasing = costCenters.filter(center => 
      center.trend === 'increasing' && center.utilization > 80
    );
    if (rapidlyIncreasing.length > 0) {
      recommendations.push(
        `Monitor rapidly increasing costs: ${rapidlyIncreasing.map(c => c.name).join(', ')}`
      );
    }

    // Department-specific recommendations
    const deptCenters = costCenters.filter(center => center.type === 'department');
    const totalDeptCost = deptCenters.reduce((sum, center) => sum + center.actualCost, 0);
    const totalDeptBudget = deptCenters.reduce((sum, center) => sum + center.budget, 0);
    
    if (totalDeptCost > totalDeptBudget * 1.1) {
      recommendations.push(
        'Department budgets collectively exceed allocation by >10% - review cross-department resource sharing'
      );
    }

    // Feature-based recommendations
    const featureCenters = costCenters.filter(center => center.type === 'feature');
    const revenueGenerating = featureCenters.filter(center => 
      center.tags.revenue_generating === 'true'
    );
    
    const nonRevenueGenerating = featureCenters.filter(center => 
      center.tags.revenue_generating !== 'true'
    );
    
    const revenueGeneratingCost = revenueGenerating.reduce((sum, c) => sum + c.actualCost, 0);
    const nonRevenueCost = nonRevenueGenerating.reduce((sum, c) => sum + c.actualCost, 0);
    
    if (nonRevenueCost > revenueGeneratingCost) {
      recommendations.push(
        'Non-revenue generating features cost more than revenue generating - review feature priorities'
      );
    }

    return recommendations;
  }

  /**
   * Get cost center performance metrics
   */
  getCostCenterMetrics(): Array<{
    costCenter: string;
    type: string;
    budgetUtilization: number;
    costEfficiency: number;
    monthlyBurn: number;
    projectedAnnual: number;
  }> {
    return Array.from(this.costCenters.values()).map(center => ({
      costCenter: center.name,
      type: center.type,
      budgetUtilization: (center.actualCost / center.budget) * 100,
      costEfficiency: center.actualCost > 0 ? (center.budget / center.actualCost) * 100 : 100,
      monthlyBurn: center.actualCost,
      projectedAnnual: center.forecastCost * 12
    }));
  }

  /**
   * Generate budget variance report
   */
  generateBudgetVarianceReport(): string {
    const report = this.generateCostReport();
    
    return `
# Cost Allocation & Budget Variance Report

## Executive Summary
- **Total Monthly Cost**: $${report.totalCost.toFixed(2)}
- **Total Monthly Budget**: $${report.totalBudget.toFixed(2)}
- **Budget Variance**: ${report.variance > 0 ? '+' : ''}${report.variance.toFixed(2)}%
- **Cost Centers**: ${report.costCenters.length}

## Cost Center Performance

### By Department
${report.costCenters.filter(c => c.type === 'department').map(center => `
**${center.name}**
- Budget: $${center.budget}/month
- Actual: $${center.actualCost.toFixed(2)}/month
- Utilization: ${center.utilization.toFixed(1)}%
- Trend: ${center.trend} ${center.trend === 'increasing' ? '📈' : center.trend === 'decreasing' ? '📉' : '➡️'}
- Owner: ${center.owner}
`).join('')}

### By Feature
${report.costCenters.filter(c => c.type === 'feature').map(center => `
**${center.name}**
- Budget: $${center.budget}/month
- Actual: $${center.actualCost.toFixed(2)}/month
- Utilization: ${center.utilization.toFixed(1)}%
- Business Impact: ${center.tags.business_impact || 'Not specified'}
- Revenue Generating: ${center.tags.revenue_generating === 'true' ? 'Yes ✅' : 'No'}
`).join('')}

### By Environment
${report.costCenters.filter(c => c.type === 'environment').map(center => `
**${center.name}**
- Budget: $${center.budget}/month
- Actual: $${center.actualCost.toFixed(2)}/month
- Utilization: ${center.utilization.toFixed(1)}%
- Criticality: ${center.tags.criticality || 'Not specified'}
`).join('')}

## Resource Allocation Breakdown

${Array.from(this.allocations.values()).map(allocation => `
### ${allocation.resourceId} ($${allocation.totalCost}/month)
${allocation.costCenters.map(center => `
- **${this.costCenters.get(center.costCenterId)?.name}**: ${center.allocationPercent}%
  - Cost: $${((allocation.totalCost * center.allocationPercent) / 100).toFixed(2)}
  - Justification: ${center.justification}
`).join('')}
`).join('')}

## Recommendations

${report.recommendations.map(rec => `- ${rec}`).join('\n')}

## Budget Optimization Opportunities

${report.costCenters.filter(c => c.utilization < 70).map(center => `
- **${center.name}**: ${center.utilization.toFixed(1)}% utilization - Consider reducing budget by $${((center.budget - center.actualCost) * 0.5).toFixed(2)}/month
`).join('')}

## Action Items
1. Review over-budget cost centers for immediate cost reduction
2. Reallocate unused budget from underutilized centers
3. Implement automated budget alerts for centers approaching limits
4. Schedule monthly budget review meetings with cost center owners
    `;
  }

  /**
   * Get cost center by ID
   */
  getCostCenter(id: string): CostCenter | undefined {
    return this.costCenters.get(id);
  }

  /**
   * Get all cost centers of a specific type
   */
  getCostCentersByType(type: CostCenter['type']): CostCenter[] {
    return Array.from(this.costCenters.values()).filter(center => center.type === type);
  }
}

export { CostAllocationFramework, CostCenter, ResourceAllocation, CostReport };