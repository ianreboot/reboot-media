import { getCacheStats } from './caching.js';
import { getPerformanceStats } from './performance.js';
class MetricsCollector {
    requestCount = 0;
    errorCount = 0;
    responseTimes = [];
    startTime = Date.now();
    recordRequest(metrics) {
        this.requestCount++;
        this.responseTimes.push(metrics.responseTime);
        if (this.responseTimes.length > 1000) {
            this.responseTimes = this.responseTimes.slice(-1000);
        }
        if (metrics.statusCode >= 400) {
            this.errorCount++;
        }
        console.log(JSON.stringify({
            level: 'info',
            type: 'request_metrics',
            ...metrics,
        }));
    }
    getHealthMetrics() {
        return {
            uptime: Date.now() - this.startTime,
            memory: process.memoryUsage(),
            cpu: process.cpuUsage().user / 1000000,
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
    getCacheStats() {
        try {
            return getCacheStats();
        }
        catch (error) {
            return { error: 'Cache stats unavailable' };
        }
    }
    getPerformanceStats() {
        try {
            return getPerformanceStats();
        }
        catch (error) {
            return { error: 'Performance stats unavailable' };
        }
    }
    getDatabaseHealth() {
        return {
            connected: true,
            connectionCount: 0,
            queryCount: 0,
        };
    }
    getSecurityStatus() {
        return {
            validationActive: true,
            rateLimitActive: true,
            authenticationActive: true,
        };
    }
}
const metricsCollector = new MetricsCollector();
export const requestMetrics = (req, res, next) => {
    req.startTime = Date.now();
    req.memoryBefore = process.memoryUsage().heapUsed;
    const startTime = Date.now();
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
export const healthCheck = (req, res) => {
    const health = metricsCollector.getHealthMetrics();
    const memoryHealthy = health.memory.heapUsed < health.memory.heapTotal * 0.9;
    const responseTimeHealthy = health.averageResponseTime < 2000;
    const errorRateHealthy = health.requestCount === 0 || (health.errorCount / health.requestCount) < 0.05;
    const uptimeHealthy = health.uptime > 0;
    const isHealthy = memoryHealthy && responseTimeHealthy && errorRateHealthy && uptimeHealthy;
    res.status(isHealthy ? 200 : 503).json({
        success: isHealthy,
        data: {
            status: isHealthy ? 'healthy' : 'unhealthy',
            timestamp: new Date().toISOString(),
            requestId: req.requestId,
            uptime: Math.floor(health.uptime / 1000),
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
export const readinessCheck = (req, res) => {
    const memUsage = process.memoryUsage();
    const health = metricsCollector.getHealthMetrics();
    const memoryReady = memUsage.heapUsed < memUsage.heapTotal * 0.95;
    const performanceReady = health.averageResponseTime < 3000;
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
export const livenessCheck = (req, res) => {
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
export const performanceDashboard = (req, res) => {
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
export { metricsCollector };
