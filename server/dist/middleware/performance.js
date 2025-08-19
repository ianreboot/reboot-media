import compression from 'compression';
import { createHash } from 'crypto';
class PerformanceTracker {
    metrics = new Map();
    recentMetrics = [];
    maxRecentMetrics = 1000;
    startTracking(req) {
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
    endTracking(req, res) {
        const requestId = req.requestId || 'unknown';
        const metric = this.metrics.get(requestId);
        if (metric) {
            const endTime = Date.now();
            const completedMetric = {
                ...metric,
                endTime,
                duration: endTime - metric.startTime,
                statusCode: res.statusCode,
            };
            this.recentMetrics.push(completedMetric);
            if (this.recentMetrics.length > this.maxRecentMetrics) {
                this.recentMetrics = this.recentMetrics.slice(-this.maxRecentMetrics);
            }
            this.metrics.delete(requestId);
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
    getStats() {
        const recent = this.recentMetrics.slice(-100);
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
    getStatusCodeStats(metrics) {
        const statusCodes = {};
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
export function performanceMonitoring() {
    return (req, res, next) => {
        performanceTracker.startTracking(req);
        res.on('finish', () => {
            performanceTracker.endTracking(req, res);
        });
        next();
    };
}
export function optimizedCompression() {
    return compression({
        threshold: 1024,
        level: 6,
        strategy: 0,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression.filter(req, res);
        },
        memLevel: 8,
        windowBits: 15,
    });
}
export function requestOptimization() {
    return (req, res, next) => {
        try {
            res.removeHeader('X-Powered-By');
            res.set('Connection', 'keep-alive');
            res.set('Keep-Alive', 'timeout=5, max=1000');
        }
        catch (error) {
        }
        const startTime = Date.now();
        res.on('finish', () => {
            try {
                const duration = Date.now() - startTime;
                if (!res.headersSent) {
                    res.set('X-Response-Time', `${duration}ms`);
                }
            }
            catch (error) {
            }
        });
        next();
    };
}
export function memoryOptimization() {
    return (req, res, next) => {
        const memBefore = process.memoryUsage();
        res.on('finish', () => {
            const memAfter = process.memoryUsage();
            const heapDiff = memAfter.heapUsed - memBefore.heapUsed;
            if (heapDiff > 10 * 1024 * 1024) {
                console.warn('High memory usage detected:', {
                    requestId: req.requestId,
                    url: req.url,
                    memoryIncrease: `${Math.round(heapDiff / 1024 / 1024)}MB`,
                    totalHeapUsed: `${Math.round(memAfter.heapUsed / 1024 / 1024)}MB`,
                });
            }
        });
        next();
    };
}
export function streamLargeResponses() {
    return (req, res, next) => {
        const originalJson = res.json;
        res.json = function (body) {
            const jsonString = JSON.stringify(body);
            if (jsonString.length > 100 * 1024) {
                res.set('Content-Type', 'application/json');
                res.set('Transfer-Encoding', 'chunked');
                const chunkSize = 8192;
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
export function optimizeQueryPerformance(queryFn, queryName) {
    const startTime = Date.now();
    return queryFn()
        .then(result => {
        const duration = Date.now() - startTime;
        if (duration > 500) {
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
export function generateETag(data) {
    return createHash('md5')
        .update(typeof data === 'string' ? data : JSON.stringify(data))
        .digest('hex');
}
export function conditionalGET() {
    return (req, res, next) => {
        const originalJson = res.json;
        res.json = function (body) {
            try {
                const etag = generateETag(body);
                if (!res.headersSent) {
                    res.set('ETag', etag);
                }
                const clientETag = req.headers['if-none-match'];
                if (clientETag === etag) {
                    return res.status(304).end();
                }
            }
            catch (error) {
            }
            return originalJson.call(this, body);
        };
        next();
    };
}
export function getPerformanceStats() {
    return performanceTracker.getStats();
}
export function resourceCleanup() {
    return (req, res, next) => {
        res.on('finish', () => {
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
//# sourceMappingURL=performance.js.map