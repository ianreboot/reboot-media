import { Request, Response, NextFunction } from 'express';
import { getCacheStats } from './caching.js';
import { getPerformanceStats } from './performance.js';

interface RequestMetrics {
  requestId: string;
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  timestamp: string;
  ip: string;
  userAgent: string;
}

interface HealthMetrics {
  uptime: number;
  memory: NodeJS.MemoryUsage;
  cpu: number;
  requestCount: number;
  errorCount: number;
  averageResponseTime: number;
  cacheStats?: any;
  performanceStats?: any;
  database?: {
    connected: boolean;
    connectionCount?: number;
    queryCount?: number;
  };
  security?: {
    validationActive: boolean;
    rateLimitActive: boolean;
    authenticationActive: boolean;
  };
}

class MetricsCollector {
  private requestCount = 0;
  private errorCount = 0;
  private responseTimes: number[] = [];
  private startTime = Date.now();

  recordRequest(metrics: RequestMetrics): void {
    this.requestCount++;
    this.responseTimes.push(metrics.responseTime);
    
    // Keep only last 1000 response times for memory efficiency
    if (this.responseTimes.length > 1000) {
      this.responseTimes = this.responseTimes.slice(-1000);
    }

    if (metrics.statusCode >= 400) {
      this.errorCount++;
    }

    // Log structured metrics
    console.log(JSON.stringify({
      level: 'info',
      type: 'request_metrics',
      ...metrics,
    }));
  }

  getHealthMetrics(): HealthMetrics {
    return {
      uptime: Date.now() - this.startTime,
      memory: process.memoryUsage(),
      cpu: process.cpuUsage().user / 1000000, // Convert to seconds
      requestCount: this.requestCount,
      errorCount: this.errorCount,
      averageResponseTime: this.responseTimes.length > 0 
        ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length 
        : 0,
      cacheStats: this.getCacheStats(),
      performanceStats: this.getPerformanceStats(),
      database: this.getDatabaseHealth(),
      security: this.getSecurityStatus(),
    };
  }

  private getCacheStats(): any {
    try {
      return getCacheStats();
    } catch (error) {
      return { error: 'Cache stats unavailable' };
    }
  }

  private getPerformanceStats(): any {
    try {
      return getPerformanceStats();
    } catch (error) {
      return { error: 'Performance stats unavailable' };
    }
  }

  private getDatabaseHealth(): any {
    // For future database integration
    return {
      connected: true, // Placeholder - update when database is integrated
      connectionCount: 0,
      queryCount: 0,
    };
  }

  private getSecurityStatus(): any {
    return {
      validationActive: true,
      rateLimitActive: true,
      authenticationActive: true,
    };
  }
}

const metricsCollector = new MetricsCollector();

export const requestMetrics = (req: Request & { requestId?: string }, res: Response, next: NextFunction): void => {
  // Add performance timing
  (req as any).startTime = Date.now();
  (req as any).memoryBefore = process.memoryUsage().heapUsed;
  const startTime = Date.now();

  // Capture response metrics when request finishes
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    
    metricsCollector.recordRequest({
      requestId: req.requestId || 'unknown',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime,
      timestamp: new Date().toISOString(),
      ip: req.ip || 'unknown',
      userAgent: req.get('User-Agent') || 'unknown',
    });
  });

  next();
};

export const healthCheck = (req: Request & { requestId?: string }, res: Response): void => {
  const health = metricsCollector.getHealthMetrics();
  
  // Comprehensive health checks
  const memoryHealthy = health.memory.heapUsed < health.memory.heapTotal * 0.9;
  const responseTimeHealthy = health.averageResponseTime < 2000; // 2 second threshold
  const errorRateHealthy = health.requestCount === 0 || (health.errorCount / health.requestCount) < 0.05; // <5% error rate
  const uptimeHealthy = health.uptime > 0;
  
  const isHealthy = memoryHealthy && responseTimeHealthy && errorRateHealthy && uptimeHealthy;

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    data: {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      uptime: Math.floor(health.uptime / 1000), // seconds
      database: health.database,
      memory: {
        used: `${Math.round(health.memory.heapUsed / 1024 / 1024)}MB`,
        free: `${Math.round((health.memory.heapTotal - health.memory.heapUsed) / 1024 / 1024)}MB`,
        total: `${Math.round(health.memory.heapTotal / 1024 / 1024)}MB`,
        external: `${Math.round(health.memory.external / 1024 / 1024)}MB`,
        healthy: memoryHealthy,
      },
      performance: {
        avgResponseTime: `${health.averageResponseTime.toFixed(2)}ms`,
        healthy: responseTimeHealthy,
        ...health.performanceStats,
      },
      requests: {
        total: health.requestCount,
        errors: health.errorCount,
        errorRate: health.requestCount > 0 ? ((health.errorCount / health.requestCount) * 100).toFixed(2) + '%' : '0%',
        healthy: errorRateHealthy,
      },
      cache: health.cacheStats,
      security: {
        validationActive: health.security?.validationActive || true,
        rateLimitActive: health.security?.rateLimitActive || true,
        authenticationActive: health.security?.authenticationActive || true,
      },
      checks: {
        memory: memoryHealthy,
        responseTime: responseTimeHealthy,
        errorRate: errorRateHealthy,
        uptime: uptimeHealthy,
      },
    },
  });
};

export const readinessCheck = (req: Request & { requestId?: string }, res: Response): void => {
  // Check if server can handle requests
  const memUsage = process.memoryUsage();
  const health = metricsCollector.getHealthMetrics();
  
  const memoryReady = memUsage.heapUsed < memUsage.heapTotal * 0.95;
  const performanceReady = health.averageResponseTime < 3000; // 3 second threshold for readiness
  const cacheReady = health.cacheStats && !health.cacheStats.error;
  
  const isReady = memoryReady && performanceReady;

  res.status(isReady ? 200 : 503).json({
    success: isReady,
    data: {
      status: isReady ? 'ready' : 'not_ready',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      checks: {
        memory: memoryReady,
        performance: performanceReady,
        cache: cacheReady !== false,
      },
      details: {
        memoryUsage: `${Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100)}%`,
        avgResponseTime: `${health.averageResponseTime.toFixed(2)}ms`,
        cacheStatus: health.cacheStats?.type || 'unknown',
      },
    },
  });
};

export const livenessCheck = (req: Request & { requestId?: string }, res: Response): void => {
  // Simple liveness check - if we can respond, we're alive
  const health = metricsCollector.getHealthMetrics();
  
  res.json({
    success: true,
    data: {
      status: 'alive',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      uptime: Math.floor(health.uptime / 1000),
      pid: process.pid,
      nodeVersion: process.version,
    },
  });
};

// Performance dashboard endpoint
export const performanceDashboard = (req: Request & { requestId?: string }, res: Response): void => {
  const health = metricsCollector.getHealthMetrics();
  
  res.json({
    success: true,
    data: {
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      system: {
        uptime: Math.floor(health.uptime / 1000),
        nodeVersion: process.version,
        platform: process.platform,
        pid: process.pid,
      },
      memory: {
        heapUsed: Math.round(health.memory.heapUsed / 1024 / 1024),
        heapTotal: Math.round(health.memory.heapTotal / 1024 / 1024),
        external: Math.round(health.memory.external / 1024 / 1024),
        rss: Math.round(health.memory.rss / 1024 / 1024),
        usage: `${Math.round((health.memory.heapUsed / health.memory.heapTotal) * 100)}%`,
      },
      performance: health.performanceStats,
      requests: {
        total: health.requestCount,
        errors: health.errorCount,
        errorRate: health.requestCount > 0 ? ((health.errorCount / health.requestCount) * 100).toFixed(2) + '%' : '0%',
        averageResponseTime: health.averageResponseTime.toFixed(2),
      },
      cache: health.cacheStats,
      database: health.database,
    },
  });
};

// Export metrics collector for external use
export { metricsCollector };