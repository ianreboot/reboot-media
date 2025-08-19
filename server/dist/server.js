import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { validateRequestId } from './middleware/requestId.js';
import { securityHeaders } from './middleware/security.js';
import { securityValidationStack } from './middleware/validation.js';
import { securityLogger } from './utils/securityLogger.js';
import { requestMetrics, healthCheck, readinessCheck, livenessCheck, performanceDashboard } from './middleware/monitoring.js';
import { performanceMonitoring, optimizedCompression, requestOptimization, memoryOptimization, streamLargeResponses, conditionalGET, resourceCleanup } from './middleware/performance.js';
import { cacheResponse } from './middleware/caching.js';
import formRoutes from './routes/forms.js';
import performanceRoutes from './routes/performance.js';
import leadManagementRoutes from './routes/leadManagement.js';
import attributionRoutes from './routes/attribution.js';
import businessMetricsRoutes from './routes/business-metrics.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3002;
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(optimizedCompression());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https:"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "https:"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));
app.use(validateRequestId);
app.use(performanceMonitoring());
app.use(requestMetrics);
app.use(requestOptimization());
app.use(memoryOptimization());
app.use(streamLargeResponses());
app.use(conditionalGET());
app.use(resourceCleanup());
app.use(securityHeaders);
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests from this IP, please try again later.',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        error: {
            code: 'FORM_RATE_LIMIT_EXCEEDED',
            message: 'Too many form submissions. Please wait 15 minutes before submitting again.',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.ip;
    },
    handler: (req, res, next, options) => {
        console.warn(`Rate limit exceeded for IP: ${req.ip}`, {
            timestamp: new Date().toISOString(),
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            url: req.url,
            requestId: req.requestId,
        });
        res.status(options.statusCode).json(options.message);
        return;
    },
});
const strictFormLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        error: {
            code: 'HOURLY_RATE_LIMIT_EXCEEDED',
            message: 'Too many requests from this IP. Please try again later.',
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
});
app.use(generalLimiter);
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5173',
            process.env.FRONTEND_URL,
        ].filter(Boolean);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({
    limit: '1mb',
    verify: (req, res, buf) => {
        req.rawBody = buf.toString('utf8');
    }
}));
app.use(express.urlencoded({
    extended: true,
    limit: '1mb',
    parameterLimit: 50
}));
app.use(securityValidationStack);
app.get('/api/health', cacheResponse(30, 'health'), healthCheck);
app.get('/api/health/readiness', readinessCheck);
app.get('/api/health/liveness', livenessCheck);
app.get('/api/performance', cacheResponse(10, 'performance'), performanceDashboard);
app.get('/api/security/report', cacheResponse(300, 'security-report'), (req, res) => {
    const report = securityLogger.generateSecurityReport ? securityLogger.generateSecurityReport() : 'Report generation not available';
    res.json({
        success: true,
        data: {
            report,
            timestamp: new Date().toISOString(),
            requestId: req.requestId,
        },
    });
});
app.get('/api/cache/stats', cacheResponse(30, 'cache-stats'), async (req, res) => {
    const { getCacheStats } = await import('./middleware/caching.js');
    res.json({
        success: true,
        data: {
            cacheStats: getCacheStats(),
            timestamp: new Date().toISOString(),
            requestId: req.requestId,
        },
    });
});
app.post('/api/cache/clear', async (req, res) => {
    try {
        const { clearAllCache } = await import('./middleware/caching.js');
        await clearAllCache();
        res.json({
            success: true,
            data: {
                message: 'Cache cleared successfully',
                timestamp: new Date().toISOString(),
                requestId: req.requestId,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: {
                code: 'CACHE_CLEAR_ERROR',
                message: 'Failed to clear cache',
                details: error.message,
                requestId: req.requestId,
            },
        });
    }
});
app.use('/api/forms', strictFormLimiter, formLimiter, formRoutes);
app.use('/api/v1/performance', performanceRoutes);
app.use('/api/leads', leadManagementRoutes);
app.use('/api/attribution', attributionRoutes);
app.use('/api', businessMetricsRoutes);
if (process.env.NODE_ENV === 'production') {
    const staticPath = path.join(__dirname, '../../dist');
    app.use(express.static(staticPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(staticPath, 'index.html'));
    });
}
app.use(errorHandler);
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    console.log(`🔒 Security: JWT + Rate Limiting + CSRF + Input Validation`);
    console.log(`⚡ Performance: Compression + Caching + Monitoring`);
    console.log(`📈 Health checks available at:`);
    console.log(`   - /api/health (comprehensive)`);
    console.log(`   - /api/health/liveness (basic)`);
    console.log(`   - /api/health/readiness (load balancer)`);
    console.log(`   - /api/performance (metrics dashboard)`);
    const memUsage = process.memoryUsage();
    console.log(`💾 Initial memory usage: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`);
});
const gracefulShutdown = async (signal) => {
    console.log(`${signal} signal received: initiating graceful shutdown`);
    server.close(async () => {
        console.log('HTTP server closed');
        try {
            const { clearAllCache } = await import('./middleware/caching.js');
            await clearAllCache();
            console.log('Cache cleared');
            if (global.gc) {
                global.gc();
                console.log('Garbage collection completed');
            }
            console.log('Graceful shutdown completed');
            process.exit(0);
        }
        catch (error) {
            console.error('Error during shutdown:', error);
            process.exit(1);
        }
    });
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (error) => {
    console.error('🚨 Uncaught Exception:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        pid: process.pid,
        memoryUsage: process.memoryUsage(),
    });
    if (securityLogger && securityLogger.logSecurityEvent) {
        try {
            securityLogger.logSecurityEvent('MALFORMED_REQUEST', 'CRITICAL', {}, { error: error.message, stack: error.stack }, undefined, 'BLOCKED');
        }
        catch (logError) {
            console.error('Failed to log uncaught exception:', logError);
        }
    }
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Rejection:', {
        reason: reason,
        promise: promise,
        timestamp: new Date().toISOString(),
        pid: process.pid,
        memoryUsage: process.memoryUsage(),
    });
    if (securityLogger && securityLogger.logSecurityEvent) {
        try {
            securityLogger.logSecurityEvent('MALFORMED_REQUEST', 'HIGH', {}, { reason: String(reason) }, undefined, 'BLOCKED');
        }
        catch (logError) {
            console.error('Failed to log unhandled rejection:', logError);
        }
    }
    process.exit(1);
});
setInterval(() => {
    const memUsage = process.memoryUsage();
    const heapUsedPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    if (heapUsedPercent > 90) {
        console.warn('⚠️  High memory usage detected:', {
            heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
            usage: `${heapUsedPercent.toFixed(2)}%`,
            timestamp: new Date().toISOString(),
        });
        if (global.gc && heapUsedPercent > 95) {
            global.gc();
            console.log('🧹 Garbage collection triggered due to high memory usage');
        }
    }
}, 30000);
export default app;
