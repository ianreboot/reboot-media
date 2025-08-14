import express from 'express';
import { cacheResponse } from '../middleware/caching.js';
import { securityValidationStack } from '../middleware/validation.js';
import { securityLogger } from '../utils/securityLogger.js';
import { getPerformanceStats } from '../middleware/performance.js';

const router = express.Router();

// Performance analytics data structure
interface PerformanceAnalytics {
  sessionId: string;
  userId?: string;
  url: string;
  timestamp: number;
  metrics: {
    lcp?: number;
    cls?: number;
    fid?: number;
    ttfb?: number;
    inp?: number;
    fcp?: number;
  };
  deviceInfo: {
    userAgent: string;
    screen: { width: number; height: number };
    memory?: number;
    connection?: string;
    cores?: number;
  };
  performanceScore: number;
  budgetViolations: Array<{
    metric: string;
    current: number;
    budget: number;
    severity: 'warning' | 'critical';
    message: string;
  }>;
}

interface PerformanceTrend {
  metric: string;
  timestamp: number;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  sessionId: string;
  url: string;
}

// In-memory storage for demo purposes
// In production, use a proper database like PostgreSQL, InfluxDB, or TimescaleDB
const performanceData: PerformanceAnalytics[] = [];
const performanceTrends: PerformanceTrend[] = [];
const MAX_STORED_RECORDS = 10000; // Prevent memory overflow

// Performance budgets configuration
const PERFORMANCE_BUDGETS = {
  lcp: { good: 1500, needsImprovement: 2500 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  fid: { good: 100, needsImprovement: 300 },
  ttfb: { good: 800, needsImprovement: 1800 },
  inp: { good: 200, needsImprovement: 500 },
};

/**
 * POST /api/v1/performance/analytics
 * Collect real user monitoring (RUM) data
 */
router.post('/analytics', securityValidationStack, async (req: any, res: any) => {
  try {
    const analyticsData: PerformanceAnalytics = req.body;
    
    // Validate required fields
    if (!analyticsData.sessionId || !analyticsData.url || !analyticsData.timestamp) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ANALYTICS_DATA',
          message: 'Missing required fields: sessionId, url, timestamp',
        },
      });
    }

    // Add server-side timestamp
    analyticsData.timestamp = Date.now();

    // Store analytics data
    performanceData.push(analyticsData);
    
    // Convert to trend data
    Object.entries(analyticsData.metrics).forEach(([metric, value]) => {
      if (typeof value === 'number') {
        const budget = PERFORMANCE_BUDGETS[metric as keyof typeof PERFORMANCE_BUDGETS];
        let rating: 'good' | 'needs-improvement' | 'poor' = 'good';
        
        if (budget) {
          if (value > budget.needsImprovement) rating = 'poor';
          else if (value > budget.good) rating = 'needs-improvement';
        }

        performanceTrends.push({
          metric,
          timestamp: analyticsData.timestamp,
          value,
          rating,
          sessionId: analyticsData.sessionId,
          url: analyticsData.url,
        });
      }
    });

    // Cleanup old data to prevent memory issues
    if (performanceData.length > MAX_STORED_RECORDS) {
      performanceData.splice(0, performanceData.length - MAX_STORED_RECORDS);
    }
    if (performanceTrends.length > MAX_STORED_RECORDS * 5) {
      performanceTrends.splice(0, performanceTrends.length - (MAX_STORED_RECORDS * 5));
    }

    // Log significant performance issues
    if (analyticsData.budgetViolations.length > 0) {
      console.log('Performance budget violations detected:', {
        sessionId: analyticsData.sessionId,
        url: analyticsData.url,
        violations: analyticsData.budgetViolations,
        performanceScore: analyticsData.performanceScore,
      });
    }

    res.json({
      success: true,
      message: 'Performance analytics recorded',
      recordId: analyticsData.sessionId,
    });

  } catch (error) {
    console.error('Performance analytics collection failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      body: req.body,
    });

    res.status(500).json({
      success: false,
      error: {
        code: 'ANALYTICS_COLLECTION_FAILED',
        message: 'Failed to collect performance analytics',
      },
    });
  }
});

/**
 * GET /api/v1/performance/dashboard
 * Performance monitoring dashboard data
 */
router.get('/dashboard', cacheResponse(30), async (req, res) => {
  try {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDayAgo = now - (24 * oneHour);
    const oneHourAgo = now - oneHour;

    // Filter recent data
    const recentData = performanceData.filter(d => d.timestamp > oneDayAgo);
    const veryRecentData = performanceData.filter(d => d.timestamp > oneHourAgo);
    const recentTrends = performanceTrends.filter(t => t && t.timestamp > oneDayAgo);

    // Calculate statistics
    const totalSessions = new Set(recentData.map(d => d.sessionId)).size;
    const totalPageViews = recentData.length;
    
    // Performance score distribution
    const scoreDistribution = recentData.reduce((acc, data) => {
      const scoreRange = Math.floor(data.performanceScore / 10) * 10;
      const key = `${scoreRange}-${scoreRange + 9}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Core Web Vitals statistics
    const coreWebVitalsStats = ['lcp', 'cls', 'fid', 'ttfb', 'inp'].reduce((acc, metric) => {
      const values = recentTrends
        .filter(t => t.metric === metric)
        .map(t => t.value);
      
      if (values.length > 0) {
        const sorted = values.sort((a, b) => a - b);
        acc[metric] = {
          count: values.length,
          avg: values.reduce((sum, v) => sum + v, 0) / values.length,
          p50: sorted[Math.floor(sorted.length * 0.5)],
          p75: sorted[Math.floor(sorted.length * 0.75)],
          p90: sorted[Math.floor(sorted.length * 0.9)],
          p95: sorted[Math.floor(sorted.length * 0.95)],
          min: sorted[0],
          max: sorted[sorted.length - 1],
        };
      }
      return acc;
    }, {} as Record<string, any>);

    // Budget compliance
    const budgetViolations = recentData.reduce((acc, data) => {
      data.budgetViolations.forEach(violation => {
        if (!acc[violation.metric]) {
          acc[violation.metric] = { warning: 0, critical: 0 };
        }
        const metricAcc = acc[violation.metric];
        if (metricAcc) {
          metricAcc[violation.severity]++;
        }
      });
      return acc;
    }, {} as Record<string, { warning: number; critical: number }>);

    // Device and connection statistics
    const deviceStats = recentData.reduce((acc, data) => {
      // Connection type
      const connection = data.deviceInfo.connection || 'unknown';
      acc.connections[connection] = (acc.connections[connection] || 0) + 1;
      
      // Memory
      if (data.deviceInfo.memory) {
        const memoryRange = data.deviceInfo.memory >= 8 ? '8GB+' : 
                          data.deviceInfo.memory >= 4 ? '4-8GB' : 
                          data.deviceInfo.memory >= 2 ? '2-4GB' : '<2GB';
        acc.memory[memoryRange] = (acc.memory[memoryRange] || 0) + 1;
      }
      
      return acc;
    }, { connections: {} as Record<string, number>, memory: {} as Record<string, number> });

    // Performance trends over time (hourly buckets for last 24h)
    const hourlyTrends = Array.from({ length: 24 }, (_, i) => {
      const bucketStart = now - (i + 1) * oneHour;
      const bucketEnd = now - i * oneHour;
      const bucketData = recentData.filter(d => 
        d.timestamp >= bucketStart && d.timestamp < bucketEnd
      );
      
      return {
        hour: bucketStart,
        sessions: new Set(bucketData.map(d => d.sessionId)).size,
        avgScore: bucketData.length > 0 
          ? bucketData.reduce((sum, d) => sum + d.performanceScore, 0) / bucketData.length 
          : 0,
        violations: bucketData.reduce((sum, d) => sum + d.budgetViolations.length, 0),
      };
    }).reverse();

    // Top performing and worst performing pages
    const pagePerformance = recentData.reduce((acc, data) => {
      const url = new URL(data.url).pathname;
      if (!acc[url]) {
        acc[url] = { scores: [], violations: 0, sessions: new Set() };
      }
      acc[url].scores.push(data.performanceScore);
      acc[url].violations += data.budgetViolations.length;
      acc[url].sessions.add(data.sessionId);
      return acc;
    }, {} as Record<string, { scores: number[]; violations: number; sessions: Set<string> }>);

    const topPages = Object.entries(pagePerformance)
      .map(([url, data]) => ({
        url,
        avgScore: data.scores.reduce((sum, s) => sum + s, 0) / data.scores.length,
        violations: data.violations,
        sessions: data.sessions.size,
        views: data.scores.length,
      }))
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10);

    const worstPages = Object.entries(pagePerformance)
      .map(([url, data]) => ({
        url,
        avgScore: data.scores.reduce((sum, s) => sum + s, 0) / data.scores.length,
        violations: data.violations,
        sessions: data.sessions.size,
        views: data.scores.length,
      }))
      .sort((a, b) => a.avgScore - b.avgScore)
      .slice(0, 10);

    // Server performance integration
    const serverStats = getPerformanceStats();

    const dashboardData = {
      overview: {
        totalSessions,
        totalPageViews,
        avgPerformanceScore: recentData.length > 0 
          ? Math.round(recentData.reduce((sum, d) => sum + d.performanceScore, 0) / recentData.length)
          : 0,
        totalBudgetViolations: recentData.reduce((sum, d) => sum + d.budgetViolations.length, 0),
        dataRange: { from: oneDayAgo, to: now },
      },
      coreWebVitals: coreWebVitalsStats,
      budgetCompliance: {
        violations: budgetViolations,
        complianceRate: totalPageViews > 0 
          ? Math.round(((totalPageViews - Object.values(budgetViolations).reduce((sum, v) => sum + v.critical + v.warning, 0)) / totalPageViews) * 100)
          : 100,
      },
      trends: {
        hourly: hourlyTrends,
        scoreDistribution,
      },
      pages: {
        topPerforming: topPages,
        needsAttention: worstPages,
      },
      environment: {
        devices: deviceStats,
        server: {
          ...serverStats,
          uptime: process.uptime(),
          memory: process.memoryUsage(),
        },
      },
      alerts: {
        critical: recentData
          .filter(d => d.budgetViolations.some(v => v.severity === 'critical'))
          .slice(-10)
          .map(d => ({
            sessionId: d.sessionId,
            url: d.url,
            timestamp: d.timestamp,
            violations: d.budgetViolations.filter(v => v.severity === 'critical'),
          })),
        recentIssues: veryRecentData
          .filter(d => d.performanceScore < 70)
          .slice(-5)
          .map(d => ({
            sessionId: d.sessionId,
            url: d.url,
            score: d.performanceScore,
            timestamp: d.timestamp,
          })),
      },
    };

    res.json({
      success: true,
      data: dashboardData,
      generatedAt: now,
    });

  } catch (error) {
    console.error('Performance dashboard generation failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    res.status(500).json({
      success: false,
      error: {
        code: 'DASHBOARD_GENERATION_FAILED',
        message: 'Failed to generate performance dashboard',
      },
    });
  }
});

/**
 * GET /api/v1/performance/metrics/:metric
 * Get detailed metrics for a specific Core Web Vital
 */
router.get('/metrics/:metric', cacheResponse(60), async (req: any, res: any) => {
  try {
    const metric = req.params.metric as string;
    const validMetrics = ['lcp', 'cls', 'fid', 'ttfb', 'inp', 'fcp'];
    
    if (!metric || !validMetrics.includes(metric)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_METRIC',
          message: `Invalid metric. Valid metrics: ${validMetrics.join(', ')}`,
        },
      });
    }

    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    
    // Get metric data from the last 24 hours
    const metricData = performanceTrends
      .filter(t => t.metric === metric && t.timestamp > oneDayAgo)
      .sort((a, b) => a.timestamp - b.timestamp);

    const budget = PERFORMANCE_BUDGETS[metric as keyof typeof PERFORMANCE_BUDGETS];
    
    const values = metricData.map(d => d.value);
    const sorted = [...values].sort((a, b) => a - b);

    const statistics = values.length > 0 ? {
      count: values.length,
      avg: values.reduce((sum, v) => sum + v, 0) / values.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p75: sorted[Math.floor(sorted.length * 0.75)],
      p90: sorted[Math.floor(sorted.length * 0.9)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      min: sorted[0],
      max: sorted[sorted.length - 1],
    } : null;

    const ratingDistribution = metricData.reduce((acc, d) => {
      acc[d.rating] = (acc[d.rating] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      success: true,
      data: {
        metric,
        budget,
        statistics,
        ratingDistribution,
        timeline: metricData.map(d => ({
          timestamp: d.timestamp,
          value: d.value,
          rating: d.rating,
          url: d.url,
        })),
        dataRange: { from: oneDayAgo, to: now },
      },
    });

  } catch (error) {
    console.error('Metric data retrieval failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      metric: req.params.metric,
    });

    res.status(500).json({
      success: false,
      error: {
        code: 'METRIC_RETRIEVAL_FAILED',
        message: 'Failed to retrieve metric data',
      },
    });
  }
});

/**
 * POST /api/v1/performance/alerts
 * Configure performance alerts and thresholds
 */
router.post('/alerts', securityValidationStack, async (req: any, res: any) => {
  try {
    const { metric, threshold, email, webhook } = req.body;
    
    // This would typically save to database
    // For now, just acknowledge the configuration
    
    console.log('Performance alert configured:', {
      metric,
      threshold,
      email,
      webhook: !!webhook,
    });

    res.json({
      success: true,
      message: 'Performance alert configured',
      alertId: `alert_${Date.now()}`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'ALERT_CONFIGURATION_FAILED',
        message: 'Failed to configure performance alert',
      },
    });
  }
});

export default router;