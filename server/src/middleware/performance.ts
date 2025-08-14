import { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import { createHash } from 'crypto';

// Performance monitoring interface
interface PerformanceMetrics {
  requestId: string;
  method: string;
  url: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  memoryUsage?: NodeJS.MemoryUsage;
  cpuUsage?: NodeJS.CpuUsage;
  statusCode?: number;
}

// Performance metrics collector
class PerformanceTracker {
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private recentMetrics: PerformanceMetrics[] = [];
  private maxRecentMetrics = 1000;

  startTracking(req: Request & { requestId?: string }): void {
    const requestId = req.requestId || 'unknown';
    
    this.metrics.set(requestId, {
      requestId,
      method: req.method,
      url: req.originalUrl || req.url,
      startTime: Date.now(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
    });
  }

  endTracking(req: Request & { requestId?: string }, res: Response): void {
    const requestId = req.requestId || 'unknown';
    const metric = this.metrics.get(requestId);
    
    if (metric) {
      const endTime = Date.now();
      const completedMetric: PerformanceMetrics = {
        ...metric,
        endTime,
        duration: endTime - metric.startTime,
        statusCode: res.statusCode,
      };

      // Store in recent metrics for analysis
      this.recentMetrics.push(completedMetric);
      
      // Keep only recent metrics to prevent memory leaks
      if (this.recentMetrics.length > this.maxRecentMetrics) {
        this.recentMetrics = this.recentMetrics.slice(-this.maxRecentMetrics);
      }

      // Clean up active metric
      this.metrics.delete(requestId);

      // Log slow requests
      if (completedMetric.duration && completedMetric.duration > 1000) {
        console.warn('Slow request detected:', {
          requestId,
          method: completedMetric.method,
          url: completedMetric.url,
          duration: `${completedMetric.duration}ms`,
          statusCode: completedMetric.statusCode,
        });
      }
    }
  }

  getStats(): any {
    const recent = this.recentMetrics.slice(-100); // Last 100 requests
    
    if (recent.length === 0) {
      return {
        requestCount: 0,
        averageResponseTime: 0,
        slowRequestCount: 0,
      };
    }

    const durations = recent.map(m => m.duration || 0);
    const slowRequests = recent.filter(m => (m.duration || 0) > 1000);

    return {
      requestCount: this.recentMetrics.length,
      averageResponseTime: durations.reduce((a, b) => a + b, 0) / durations.length,
      minResponseTime: Math.min(...durations),
      maxResponseTime: Math.max(...durations),
      slowRequestCount: slowRequests.length,
      slowRequestPercentage: ((slowRequests.length / recent.length) * 100).toFixed(2) + '%',
      statusCodes: this.getStatusCodeStats(recent),
    };
  }

  private getStatusCodeStats(metrics: PerformanceMetrics[]): any {
    const statusCodes: { [key: string]: number } = {};
    
    metrics.forEach(m => {
      if (m.statusCode) {
        const code = m.statusCode.toString();
        statusCodes[code] = (statusCodes[code] || 0) + 1;
      }
    });

    return statusCodes;
  }
}

const performanceTracker = new PerformanceTracker();

// Performance monitoring middleware
export function performanceMonitoring() {
  return (req: Request & { requestId?: string }, res: Response, next: NextFunction) => {
    // Start tracking
    performanceTracker.startTracking(req);

    // Track when response finishes
    res.on('finish', () => {
      performanceTracker.endTracking(req, res);
    });

    next();
  };
}

// Compression middleware with performance optimization
export function optimizedCompression() {
  return compression({
    // Only compress responses larger than 1KB
    threshold: 1024,
    // Compression level (1-9, 6 is good balance of speed/compression)
    level: 6,
    // Compression strategy (zlib default)
    strategy: 0, // Z_DEFAULT_STRATEGY constant value
    // Filter function to determine what to compress
    filter: (req: Request, res: Response) => {
      // Don't compress if explicitly disabled
      if (req.headers['x-no-compression']) {
        return false;
      }

      // Use compression filter
      return compression.filter(req, res);
    },
    // Memory level (1-9, 8 is default)
    memLevel: 8,
    // Window bits (9-15, 15 is default)
    windowBits: 15,
  });
}

// Request optimization middleware
export function requestOptimization() {
  return (req: Request, res: Response, next: NextFunction) => {
    // Set response headers for optimal performance
    try {
      // Remove server header for security
      res.removeHeader('X-Powered-By');
      
      // Optimize keep-alive connections
      res.set('Connection', 'keep-alive');
      res.set('Keep-Alive', 'timeout=5, max=1000');
    } catch (error) {
      // Headers already sent, skip
    }

    // Add performance timing headers
    const startTime = Date.now();
    
    res.on('finish', () => {
      try {
        const duration = Date.now() - startTime;
        if (!res.headersSent) {
          res.set('X-Response-Time', `${duration}ms`);
        }
      } catch (error) {
        // Headers already sent, skip
      }
    });

    next();
  };
}

// Memory optimization middleware
export function memoryOptimization() {
  return (req: Request, res: Response, next: NextFunction) => {
    // Monitor memory usage
    const memBefore = process.memoryUsage();
    
    res.on('finish', () => {
      const memAfter = process.memoryUsage();
      const heapDiff = memAfter.heapUsed - memBefore.heapUsed;
      
      // Log significant memory increases
      if (heapDiff > 10 * 1024 * 1024) { // 10MB
        console.warn('High memory usage detected:', {
          requestId: (req as any).requestId,
          url: req.url,
          memoryIncrease: `${Math.round(heapDiff / 1024 / 1024)}MB`,
          totalHeapUsed: `${Math.round(memAfter.heapUsed / 1024 / 1024)}MB`,
        });
      }
    });

    next();
  };
}

// Response streaming for large payloads
export function streamLargeResponses() {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    
    res.json = function(body: any) {
      const jsonString = JSON.stringify(body);
      
      // Stream large responses (>100KB)
      if (jsonString.length > 100 * 1024) {
        res.set('Content-Type', 'application/json');
        res.set('Transfer-Encoding', 'chunked');
        
        // Write in chunks
        const chunkSize = 8192; // 8KB chunks
        for (let i = 0; i < jsonString.length; i += chunkSize) {
          const chunk = jsonString.slice(i, i + chunkSize);
          res.write(chunk);
        }
        
        return res.end();
      }
      
      return originalJson.call(this, body);
    };

    next();
  };
}

// Database connection pool optimization (for when database is added)
export function optimizeQueryPerformance<T>(
  queryFn: () => Promise<T>,
  queryName: string
): Promise<T> {
  const startTime = Date.now();
  
  return queryFn()
    .then(result => {
      const duration = Date.now() - startTime;
      
      // Log slow queries
      if (duration > 500) { // 500ms threshold
        console.warn('Slow query detected:', {
          queryName,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        });
      }
      
      return result;
    })
    .catch(error => {
      const duration = Date.now() - startTime;
      console.error('Query error:', {
        queryName,
        duration: `${duration}ms`,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      throw error;
    });
}

// ETag generation for static content caching
export function generateETag(data: any): string {
  return createHash('md5')
    .update(typeof data === 'string' ? data : JSON.stringify(data))
    .digest('hex');
}

// Conditional GET support
export function conditionalGET() {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    
    res.json = function(body: any) {
      try {
        // Generate ETag for response
        const etag = generateETag(body);
        
        if (!res.headersSent) {
          res.set('ETag', etag);
        }
        
        // Check if client has cached version
        const clientETag = req.headers['if-none-match'];
        if (clientETag === etag) {
          return res.status(304).end();
        }
      } catch (error) {
        // Headers already sent, skip ETag logic
      }
      
      return originalJson.call(this, body);
    };

    next();
  };
}

// Export performance tracker for metrics access
export function getPerformanceStats(): any {
  return performanceTracker.getStats();
}

// Resource cleanup middleware
export function resourceCleanup() {
  return (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      // Force garbage collection if memory usage is high
      const memUsage = process.memoryUsage();
      const heapUsedPercentage = (memUsage.heapUsed / memUsage.heapTotal) * 100;
      
      if (heapUsedPercentage > 85 && global.gc) {
        global.gc();
        console.log('Garbage collection triggered due to high memory usage');
      }
    });

    next();
  };
}