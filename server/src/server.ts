import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Import middleware and routes
import { errorHandler } from './middleware/errorHandler.js';
import { validateRequestId } from './middleware/requestId.js';
import { securityHeaders } from './middleware/security.js';
import { securityValidationStack } from './middleware/validation.js';
import { generateCSRFToken } from './middleware/csrf.js';
import { securityLogger } from './utils/securityLogger.js';
import { 
  requestMetrics, 
  healthCheck, 
  readinessCheck, 
  livenessCheck,
  performanceDashboard 
} from './middleware/monitoring.js';
import {
  performanceMonitoring,
  optimizedCompression,
  requestOptimization,
  memoryOptimization,
  streamLargeResponses,
  conditionalGET,
  resourceCleanup
} from './middleware/performance.js';
import { cacheResponse } from './middleware/caching.js';
import formRoutes from './routes/forms.js';
import performanceRoutes from './routes/performance.js';

// Load environment variables
dotenv.config();

// ES modules directory setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Trust proxy if behind reverse proxy
app.set('trust proxy', 1);

// Disable x-powered-by header for security
app.disable('x-powered-by');

// Apply compression middleware early for better performance
app.use(optimizedCompression());

// Security middleware
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

// Request ID middleware
app.use(validateRequestId as any);

// Performance monitoring middleware
app.use(performanceMonitoring());
app.use(requestMetrics);
app.use(requestOptimization());
app.use(memoryOptimization());
app.use(streamLargeResponses());
app.use(conditionalGET());
app.use(resourceCleanup());

// Additional security headers
app.use(securityHeaders);

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
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

// Form-specific rate limiting (more restrictive)
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 form submissions per 15 minutes
  message: {
    success: false,
    error: {
      code: 'FORM_RATE_LIMIT_EXCEEDED',
      message: 'Too many form submissions. Please wait 15 minutes before submitting again.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: any) => {
    // Rate limit by IP for form submissions
    return req.ip;
  },
  // Enhanced rate limit with custom handler (v7 compatible)
  handler: (req: any, res: any, next: any, options: any) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`, {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.url,
      requestId: req.requestId,
    });
    
    // Send the rate limit response
    res.status(options.statusCode).json(options.message);
    return;
  },
});

// Aggressive rate limiting for potential abuse
const strictFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 form submissions per hour
  message: {
    success: false,
    error: {
      code: 'HOURLY_RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP. Please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: any) => req.ip,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
});

app.use(generalLimiter);

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    // Allow localhost and development origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      // Add your production domain here
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

// Body parsing with enhanced security
app.use(express.json({ 
  limit: '1mb', // Reduced for security
  verify: (req: any, res, buf) => {
    // Store raw body for signature verification if needed
    req.rawBody = buf.toString('utf8');
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '1mb', // Reduced for security
  parameterLimit: 50 // Limit number of parameters
}));

// Apply global security validation
app.use(securityValidationStack);

// Enhanced health check endpoints
app.get('/api/health', cacheResponse(30, 'health'), healthCheck);
app.get('/api/health/readiness', readinessCheck);
app.get('/api/health/liveness', livenessCheck);
app.get('/api/performance', cacheResponse(10, 'performance'), performanceDashboard);

// Security report endpoint (restricted access) with caching
app.get('/api/security/report', 
  cacheResponse(300, 'security-report'), // Cache for 5 minutes
  (req: any, res: express.Response) => {
    // In production, add authentication check here
    const report = securityLogger.generateSecurityReport ? securityLogger.generateSecurityReport() : 'Report generation not available';
    
    res.json({
      success: true,
      data: {
        report,
        timestamp: new Date().toISOString(),
        requestId: req.requestId,
      },
    });
  }
);

// Cache management endpoints
app.get('/api/cache/stats', 
  cacheResponse(30, 'cache-stats'),
  async (req: any, res: express.Response) => {
    const { getCacheStats } = await import('./middleware/caching.js');
    res.json({
      success: true,
      data: {
        cacheStats: getCacheStats(),
        timestamp: new Date().toISOString(),
        requestId: req.requestId,
      },
    });
  }
);

app.post('/api/cache/clear',
  // In production, add authentication check here
  async (req: any, res: express.Response) => {
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
    } catch (error: any) {
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
  }
);

// API routes with layered rate limiting
app.use('/api/forms', strictFormLimiter, formLimiter, formRoutes);
app.use('/api/v1/performance', performanceRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../../dist');
  app.use(express.static(staticPath));
  
  // Handle React Router - send all non-API requests to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// Error handling middleware (must be last)
app.use(errorHandler);

// Graceful shutdown handling
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
  
  // Log initial memory usage
  const memUsage = process.memoryUsage();
  console.log(`💾 Initial memory usage: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`);
});

// Handle graceful shutdown with cleanup
const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} signal received: initiating graceful shutdown`);
  
  // Stop accepting new connections
  server.close(async () => {
    console.log('HTTP server closed');
    
    try {
      // Clear cache and cleanup resources
      const { clearAllCache } = await import('./middleware/caching.js');
      await clearAllCache();
      console.log('Cache cleared');
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
        console.log('Garbage collection completed');
      }
      
      console.log('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Global error handlers with enhanced logging
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    pid: process.pid,
    memoryUsage: process.memoryUsage(),
  });
  
  // Try to log to security logger
  if (securityLogger && securityLogger.logSecurityEvent) {
    try {
      securityLogger.logSecurityEvent(
        'MALFORMED_REQUEST',
        'CRITICAL',
        {} as any,
        { error: error.message, stack: error.stack },
        undefined,
        'BLOCKED'
      );
    } catch (logError) {
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
  
  // Try to log to security logger
  if (securityLogger && securityLogger.logSecurityEvent) {
    try {
      securityLogger.logSecurityEvent(
        'MALFORMED_REQUEST',
        'HIGH',
        {} as any,
        { reason: String(reason) },
        undefined,
        'BLOCKED'
      );
    } catch (logError) {
      console.error('Failed to log unhandled rejection:', logError);
    }
  }
  
  process.exit(1);
});

// Memory usage monitoring
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
    
    // Force garbage collection if available and usage is critical
    if (global.gc && heapUsedPercent > 95) {
      global.gc();
      console.log('🧹 Garbage collection triggered due to high memory usage');
    }
  }
}, 30000); // Check every 30 seconds

export default app;