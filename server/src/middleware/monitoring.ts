import { Request, Response, NextFunction } from 'express';

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
    };
  }
}

const metricsCollector = new MetricsCollector();

export const requestMetrics = (req: Request & { requestId?: string }, res: Response, next: NextFunction): void => {
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
  
  // Determine health status
  const isHealthy = health.memory.heapUsed < health.memory.heapTotal * 0.9 &&
                   health.averageResponseTime < 5000; // 5 second threshold

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    data: {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
      metrics: {
        uptime: `${Math.floor(health.uptime / 1000)}s`,
        memory: {
          used: `${Math.round(health.memory.heapUsed / 1024 / 1024)}MB`,
          total: `${Math.round(health.memory.heapTotal / 1024 / 1024)}MB`,
          external: `${Math.round(health.memory.external / 1024 / 1024)}MB`,
        },
        requests: {
          total: health.requestCount,
          errors: health.errorCount,
          errorRate: health.requestCount > 0 ? ((health.errorCount / health.requestCount) * 100).toFixed(2) + '%' : '0%',
        },
        performance: {
          averageResponseTime: `${health.averageResponseTime.toFixed(2)}ms`,
        },
      },
    },
  });
};

export const readinessCheck = (req: Request & { requestId?: string }, res: Response): void => {
  // Check if server can handle requests
  const memUsage = process.memoryUsage();
  const isReady = memUsage.heapUsed < memUsage.heapTotal * 0.95;

  res.status(isReady ? 200 : 503).json({
    success: isReady,
    data: {
      status: isReady ? 'ready' : 'not_ready',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
    },
  });
};

export const livenessCheck = (req: Request & { requestId?: string }, res: Response): void => {
  // Simple liveness check - if we can respond, we're alive
  res.json({
    success: true,
    data: {
      status: 'alive',
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
    },
  });
};