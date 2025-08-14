import { useEffect, useState, useCallback } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

// Performance budget definitions
export const PERFORMANCE_BUDGETS = {
  lcp: { good: 1500, needsImprovement: 2500 }, // ms
  cls: { good: 0.1, needsImprovement: 0.25 },  // score
  fid: { good: 100, needsImprovement: 300 },   // ms
  ttfb: { good: 800, needsImprovement: 1800 }, // ms
  inp: { good: 200, needsImprovement: 500 },   // ms
  bundleSize: { good: 200, needsImprovement: 300 }, // KB
  apiResponseTime: { good: 200, needsImprovement: 500 } // ms
} as const;

export interface EnhancedMetric extends Metric {
  rating: 'good' | 'needs-improvement' | 'poor';
  trend?: 'improving' | 'degrading' | 'stable';
  budget: {
    current: number;
    target: number;
    status: 'within-budget' | 'at-risk' | 'over-budget';
  };
  deviceInfo: {
    memory?: number;
    connection?: string;
    cores?: number;
  };
  sessionId: string;
  userId?: string;
}

export interface CoreWebVitalsData {
  lcp: EnhancedMetric | null;
  fid: EnhancedMetric | null;
  cls: EnhancedMetric | null;
  ttfb: EnhancedMetric | null;
  inp: EnhancedMetric | null;
  fcp: EnhancedMetric | null;
  isLoading: boolean;
  allGood: boolean;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  budgetStatus: 'all-good' | 'some-warnings' | 'critical-issues';
  recommendations: string[];
  trendAnalysis: {
    improving: number;
    degrading: number;
    stable: number;
  };
  lastUpdated: number;
  budgetAlerts: PerformanceBudgetAlert[];
}

export interface PerformanceBudgetAlert {
  metric: string;
  current: number;
  budget: number;
  severity: 'warning' | 'critical';
  message: string;
  recommendation: string;
}

interface MetricHistory {
  timestamp: number;
  value: number;
  rating: string;
}

interface AnalyticsData {
  sessionId: string;
  userId?: string;
  url: string;
  timestamp: number;
  metrics: Record<string, number>;
  deviceInfo: {
    userAgent: string;
    screen: { width: number; height: number };
    memory?: number;
    connection?: string;
    cores?: number;
  };
  performanceScore: number;
  budgetViolations: PerformanceBudgetAlert[];
}

// Session management
const generateSessionId = () => crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15);
const SESSION_ID = generateSessionId();

// Metric history for trend analysis
const metricHistory = new Map<string, MetricHistory[]>();

// Enhanced Web Vitals Hook
export function useEnhancedWebVitals(): CoreWebVitalsData {
  const [metrics, setMetrics] = useState<CoreWebVitalsData>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    inp: null,
    fcp: null,
    isLoading: true,
    allGood: false,
    score: 0,
    grade: 'F',
    budgetStatus: 'all-good',
    recommendations: [],
    trendAnalysis: { improving: 0, degrading: 0, stable: 0 },
    lastUpdated: Date.now(),
    budgetAlerts: [],
  });

  const [budgetAlerts, setBudgetAlerts] = useState<PerformanceBudgetAlert[]>([]);

  // Get device information
  const getDeviceInfo = useCallback(() => {
    const nav = navigator as any;
    return {
      memory: nav.deviceMemory,
      connection: nav.connection?.effectiveType,
      cores: nav.hardwareConcurrency,
    };
  }, []);

  // Enhance metric with budget and trend analysis
  const enhanceMetric = useCallback((metric: Metric): EnhancedMetric => {
    const metricName = metric.name.toLowerCase();
    const budget = PERFORMANCE_BUDGETS[metricName as keyof typeof PERFORMANCE_BUDGETS];
    
    let rating: 'good' | 'needs-improvement' | 'poor';
    let budgetStatus: 'within-budget' | 'at-risk' | 'over-budget';
    
    if (!budget) {
      rating = 'good';
      budgetStatus = 'within-budget';
    } else {
      if (metric.value <= budget.good) {
        rating = 'good';
        budgetStatus = 'within-budget';
      } else if (metric.value <= budget.needsImprovement) {
        rating = 'needs-improvement';
        budgetStatus = 'at-risk';
      } else {
        rating = 'poor';
        budgetStatus = 'over-budget';
      }
    }

    // Trend analysis
    const history = metricHistory.get(metricName) || [];
    history.push({
      timestamp: Date.now(),
      value: metric.value,
      rating
    });
    
    // Keep only last 10 measurements for trend
    if (history.length > 10) {
      history.splice(0, history.length - 10);
    }
    metricHistory.set(metricName, history);

    let trend: 'improving' | 'degrading' | 'stable' = 'stable';
    if (history.length >= 3) {
      const recent = history.slice(-3);
      const avgRecent = recent.reduce((sum, h) => sum + h.value, 0) / recent.length;
      const older = history.slice(-6, -3);
      if (older.length >= 3) {
        const avgOlder = older.reduce((sum, h) => sum + h.value, 0) / older.length;
        const improvement = (avgOlder - avgRecent) / avgOlder;
        if (improvement > 0.1) trend = 'improving';
        else if (improvement < -0.1) trend = 'degrading';
      }
    }

    return {
      ...metric,
      rating,
      trend,
      budget: {
        current: metric.value,
        target: budget?.good || metric.value,
        status: budgetStatus,
      },
      deviceInfo: getDeviceInfo(),
      sessionId: SESSION_ID,
    };
  }, [getDeviceInfo]);

  // Calculate performance score
  const calculatePerformanceScore = useCallback((currentMetrics: Record<string, EnhancedMetric | null>) => {
    const validMetrics = Object.values(currentMetrics).filter(m => m !== null) as EnhancedMetric[];
    if (validMetrics.length === 0) return 0;

    const weights = { lcp: 25, fid: 20, cls: 20, ttfb: 15, inp: 15, fcp: 5 };
    let totalWeight = 0;
    let weightedScore = 0;

    validMetrics.forEach(metric => {
      const weight = weights[metric.name.toLowerCase() as keyof typeof weights] || 10;
      totalWeight += weight;
      
      let score = 0;
      if (metric.rating === 'good') score = 100;
      else if (metric.rating === 'needs-improvement') score = 70;
      else score = 30;
      
      weightedScore += score * weight;
    });

    return totalWeight > 0 ? Math.round(weightedScore / totalWeight) : 0;
  }, []);

  // Generate performance recommendations
  const generateRecommendations = useCallback((currentMetrics: Record<string, EnhancedMetric | null>) => {
    const recommendations: string[] = [];
    
    Object.values(currentMetrics).forEach(metric => {
      if (!metric || metric.rating === 'good') return;
      
      switch (metric.name.toLowerCase()) {
        case 'lcp':
          if (metric.value > 2500) {
            recommendations.push('Optimize Largest Contentful Paint: preload critical resources');
          }
          break;
        case 'cls':
          if (metric.value > 0.1) {
            recommendations.push('Reduce Cumulative Layout Shift: add size attributes to images');
          }
          break;
        case 'fid':
          if (metric.value > 100) {
            recommendations.push('Improve First Input Delay: split JavaScript bundles');
          }
          break;
        case 'ttfb':
          if (metric.value > 800) {
            recommendations.push('Optimize Time to First Byte: improve server response time');
          }
          break;
        case 'inp':
          if (metric.value > 200) {
            recommendations.push('Optimize Interaction to Next Paint: optimize event handlers');
          }
          break;
      }
    });

    return recommendations;
  }, []);

  // Check budget violations
  const checkBudgetViolations = useCallback((currentMetrics: Record<string, EnhancedMetric | null>) => {
    const alerts: PerformanceBudgetAlert[] = [];
    
    Object.values(currentMetrics).forEach(metric => {
      if (!metric) return;
      
      if (metric.budget.status === 'over-budget') {
        alerts.push({
          metric: metric.name,
          current: metric.value,
          budget: metric.budget.target,
          severity: 'critical',
          message: `${metric.name.toUpperCase()} exceeds performance budget`,
          recommendation: `Current: ${metric.value}, Target: ${metric.budget.target}`
        });
      } else if (metric.budget.status === 'at-risk') {
        alerts.push({
          metric: metric.name,
          current: metric.value,
          budget: metric.budget.target,
          severity: 'warning',
          message: `${metric.name.toUpperCase()} approaching performance budget`,
          recommendation: `Current: ${metric.value}, Target: ${metric.budget.target}`
        });
      }
    });

    setBudgetAlerts(alerts);
    return alerts;
  }, []);

  // Send analytics data
  const sendAnalytics = useCallback((analyticsData: AnalyticsData) => {
    // Send to backend analytics endpoint
    fetch('/api/v1/performance/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData),
    }).catch(error => {
      console.warn('Failed to send performance analytics:', error);
    });

    // Send to service worker for offline storage
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PERFORMANCE_ANALYTICS',
        data: analyticsData,
      });
    }
  }, []);

  // Update metrics state
  const updateMetrics = useCallback(() => {
    const currentMetrics = {
      lcp: metrics.lcp,
      fid: metrics.fid,
      cls: metrics.cls,
      ttfb: metrics.ttfb,
      inp: metrics.inp,
      fcp: metrics.fcp,
    };

    const score = calculatePerformanceScore(currentMetrics);
    const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
    const allGood = Object.values(currentMetrics).filter(m => m).every(m => m!.rating === 'good');
    const recommendations = generateRecommendations(currentMetrics);
    const budgetViolations = checkBudgetViolations(currentMetrics);
    
    const budgetStatus = budgetViolations.some(a => a.severity === 'critical') 
      ? 'critical-issues' 
      : budgetViolations.some(a => a.severity === 'warning')
      ? 'some-warnings'
      : 'all-good';

    // Trend analysis
    const trends = Array.from(metricHistory.values()).map(history => {
      if (history.length < 2) return 'stable';
      const recent = history[history.length - 1];
      const previous = history[history.length - 2];
      return recent.value < previous.value ? 'improving' : 
             recent.value > previous.value ? 'degrading' : 'stable';
    });

    const trendAnalysis = {
      improving: trends.filter(t => t === 'improving').length,
      degrading: trends.filter(t => t === 'degrading').length,
      stable: trends.filter(t => t === 'stable').length,
    };

    setMetrics(prev => ({
      ...prev,
      score,
      grade,
      allGood,
      recommendations,
      budgetStatus,
      trendAnalysis,
      isLoading: Object.values(currentMetrics).filter(m => m).length === 0,
      lastUpdated: Date.now(),
    }));

    // Send analytics data
    if (score > 0) {
      const analyticsData: AnalyticsData = {
        sessionId: SESSION_ID,
        url: window.location.href,
        timestamp: Date.now(),
        metrics: Object.fromEntries(
          Object.entries(currentMetrics)
            .filter(([, metric]) => metric)
            .map(([name, metric]) => [name, metric!.value])
        ),
        deviceInfo: {
          userAgent: navigator.userAgent,
          screen: { width: screen.width, height: screen.height },
          ...getDeviceInfo(),
        },
        performanceScore: score,
        budgetViolations,
      };
      
      sendAnalytics(analyticsData);
    }
  }, [calculatePerformanceScore, generateRecommendations, checkBudgetViolations, getDeviceInfo, sendAnalytics, metrics]);

  // Set up Web Vitals observers
  useEffect(() => {
    // Set up observers for each metric
    onLCP((metric) => {
      const enhanced = enhanceMetric(metric);
      setMetrics(prev => ({ ...prev, lcp: enhanced }));
    });
    
    onFID((metric) => {
      const enhanced = enhanceMetric(metric);
      setMetrics(prev => ({ ...prev, fid: enhanced }));
    });
    
    onCLS((metric) => {
      const enhanced = enhanceMetric(metric);
      setMetrics(prev => ({ ...prev, cls: enhanced }));
    });
    
    onTTFB((metric) => {
      const enhanced = enhanceMetric(metric);
      setMetrics(prev => ({ ...prev, ttfb: enhanced }));
    });
    
    onINP((metric) => {
      const enhanced = enhanceMetric(metric);
      setMetrics(prev => ({ ...prev, inp: enhanced }));
    });

    onFCP((metric) => {
      const enhanced = enhanceMetric(metric);
      setMetrics(prev => ({ ...prev, fcp: enhanced }));
    });

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);

    return () => {
      clearInterval(interval);
      // Note: web-vitals observers cleanup automatically
    };
  }, [enhanceMetric, updateMetrics]);

  return { ...metrics, budgetAlerts };
}

// Performance Budget Monitoring Hook
export function usePerformanceBudgets() {
  const metrics = useEnhancedWebVitals();
  
  const budgetStatus = {
    overall: metrics.budgetStatus,
    violations: metrics.budgetAlerts,
    metricsWithinBudget: Object.values({
      lcp: metrics.lcp,
      cls: metrics.cls,
      fid: metrics.fid,
      ttfb: metrics.ttfb,
      inp: metrics.inp,
    }).filter(m => m?.budget.status === 'within-budget').length,
    totalMetrics: Object.values({
      lcp: metrics.lcp,
      cls: metrics.cls,
      fid: metrics.fid,
      ttfb: metrics.ttfb,
      inp: metrics.inp,
    }).filter(m => m !== null).length,
  };

  return {
    ...budgetStatus,
    budgetCompliance: budgetStatus.totalMetrics > 0 
      ? Math.round((budgetStatus.metricsWithinBudget / budgetStatus.totalMetrics) * 100)
      : 0,
  };
}

// Real-time Performance Monitoring Hook
export function useRealTimePerformance() {
  const [performanceData, setPerformanceData] = useState({
    bandwidth: 0,
    latency: 0,
    throughput: 0,
    connectionType: 'unknown',
    isOnline: navigator.onLine,
    networkQuality: 'unknown' as 'slow-2g' | '2g' | '3g' | '4g' | 'unknown',
  });

  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        setPerformanceData(prev => ({
          ...prev,
          bandwidth: connection.downlink || 0,
          latency: connection.rtt || 0,
          connectionType: connection.effectiveType || 'unknown',
          networkQuality: connection.effectiveType || 'unknown',
        }));
      }
    };

    const handleOnlineStatus = () => {
      setPerformanceData(prev => ({ ...prev, isOnline: navigator.onLine }));
    };

    // Initial update
    updateNetworkInfo();

    // Set up listeners
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', updateNetworkInfo);
    }

    // Performance measurement interval
    const interval = setInterval(() => {
      // Measure actual performance
      const start = performance.now();
      fetch('/api/health', { method: 'HEAD' })
        .then(() => {
          const latency = performance.now() - start;
          setPerformanceData(prev => ({ ...prev, latency }));
        })
        .catch(() => {
          // Handle offline or error states
        });
    }, 30000); // Every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      if ('connection' in navigator) {
        (navigator as any).connection.removeEventListener('change', updateNetworkInfo);
      }
      clearInterval(interval);
    };
  }, []);

  return performanceData;
}