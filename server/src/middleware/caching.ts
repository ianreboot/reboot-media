import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import { createHash } from 'crypto';

// In-memory cache for development, Redis-ready for production
class CacheManager {
  private nodeCache: NodeCache;
  private redis: any = null;
  private useRedis: boolean;

  constructor() {
    // Initialize in-memory cache
    this.nodeCache = new NodeCache({
      stdTTL: 600, // Default 10 minutes
      checkperiod: 120, // Check for expired keys every 2 minutes
      useClones: false, // Performance optimization
      deleteOnExpire: true,
    });

    this.useRedis = process.env.NODE_ENV === 'production' && Boolean(process.env.REDIS_URL);

    if (this.useRedis) {
      this.initializeRedis();
    }
  }

  private async initializeRedis() {
    try {
      const { Redis } = await import('ioredis');
      this.redis = new Redis(process.env.REDIS_URL!, {
        maxRetriesPerRequest: 1,
        lazyConnect: true,
        // Performance optimizations
        enableReadyCheck: false,
      });

      this.redis.on('error', (error: Error) => {
        console.error('Redis connection error:', error);
        this.useRedis = false; // Fallback to in-memory cache
      });

      await this.redis.ping();
      console.log('Redis cache connected successfully');
    } catch (error) {
      console.warn('Redis not available, using in-memory cache:', error);
      this.useRedis = false;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const serializedValue = JSON.stringify(value);
    
    if (this.useRedis && this.redis) {
      try {
        if (ttl) {
          await this.redis.setex(key, ttl, serializedValue);
        } else {
          await this.redis.set(key, serializedValue);
        }
      } catch (error) {
        console.warn('Redis set error, using NodeCache:', error);
        this.nodeCache.set(key, value, ttl || 600);
      }
    } else {
      this.nodeCache.set(key, value, ttl || 600);
    }
  }

  async get(key: string): Promise<any> {
    if (this.useRedis && this.redis) {
      try {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : undefined;
      } catch (error) {
        console.warn('Redis get error, using NodeCache:', error);
        return this.nodeCache.get(key);
      }
    } else {
      return this.nodeCache.get(key);
    }
  }

  async del(key: string): Promise<void> {
    if (this.useRedis && this.redis) {
      try {
        await this.redis.del(key);
      } catch (error) {
        console.warn('Redis delete error, using NodeCache:', error);
        this.nodeCache.del(key);
      }
    } else {
      this.nodeCache.del(key);
    }
  }

  async clear(): Promise<void> {
    if (this.useRedis && this.redis) {
      try {
        await this.redis.flushdb();
      } catch (error) {
        console.warn('Redis clear error, using NodeCache:', error);
        this.nodeCache.flushAll();
      }
    } else {
      this.nodeCache.flushAll();
    }
  }

  getStats(): any {
    if (this.useRedis && this.redis) {
      return { type: 'redis', connected: true };
    } else {
      return {
        type: 'memory',
        keys: this.nodeCache.keys().length,
        stats: this.nodeCache.getStats(),
      };
    }
  }
}

const cacheManager = new CacheManager();

// Cache key generator
function generateCacheKey(req: Request, prefix: string = 'api'): string {
  const url = req.originalUrl || req.url;
  const method = req.method;
  const query = JSON.stringify(req.query);
  const body = method === 'POST' ? JSON.stringify(req.body) : '';
  
  const content = `${method}:${url}:${query}:${body}`;
  const hash = createHash('sha256').update(content).digest('hex').substring(0, 16);
  
  return `${prefix}:${hash}`;
}

// Response caching middleware
export function cacheResponse(ttlSeconds: number = 600, prefix: string = 'response') {
  return async (req: Request & { requestId?: string }, res: Response, next: NextFunction) => {
    // Skip caching for non-GET requests by default
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = generateCacheKey(req, prefix);
    
    try {
      const cachedResponse = await cacheManager.get(cacheKey);
      
      if (cachedResponse) {
        // Set cache headers
        res.set({
          'X-Cache': 'HIT',
          'X-Cache-Key': cacheKey,
          'Cache-Control': `public, max-age=${ttlSeconds}`,
        });
        
        return res.status(cachedResponse.statusCode).json(cachedResponse.data);
      }

      // Intercept response to cache it
      const originalSend = res.json;
      res.json = function(body: any) {
        // Only cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const responseData = {
            statusCode: res.statusCode,
            data: body,
            timestamp: new Date().toISOString(),
          };
          
          // Cache asynchronously to avoid blocking response
          cacheManager.set(cacheKey, responseData, ttlSeconds).catch(error => {
            console.warn('Cache set error:', error);
          });
        }

        // Set cache headers
        res.set({
          'X-Cache': 'MISS',
          'X-Cache-Key': cacheKey,
          'Cache-Control': res.statusCode < 300 ? `public, max-age=${ttlSeconds}` : 'no-cache',
        });

        return originalSend.call(this, body);
      };

      next();
    } catch (error) {
      console.warn('Cache middleware error:', error);
      next();
    }
  };
}

// Query result caching for database operations
export async function cacheQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  try {
    const cachedResult = await cacheManager.get(`query:${key}`);
    
    if (cachedResult !== undefined) {
      return cachedResult;
    }

    const result = await queryFn();
    
    // Cache the result
    await cacheManager.set(`query:${key}`, result, ttlSeconds);
    
    return result;
  } catch (error) {
    console.warn('Query cache error:', error);
    // Fallback to direct query execution
    return await queryFn();
  }
}

// Session caching
export function cacheSession(ttlSeconds: number = 3600) {
  return async (req: Request & { sessionId?: string }, res: Response, next: NextFunction) => {
    if (!req.sessionId) {
      return next();
    }

    const sessionKey = `session:${req.sessionId}`;
    
    try {
      const cachedSession = await cacheManager.get(sessionKey);
      
      if (cachedSession) {
        (req as any).sessionData = cachedSession;
        res.set('X-Session-Cache', 'HIT');
      } else {
        res.set('X-Session-Cache', 'MISS');
      }

      next();
    } catch (error) {
      console.warn('Session cache error:', error);
      next();
    }
  };
}

// Cache invalidation helpers
export async function invalidateCache(pattern: string): Promise<void> {
  try {
    await cacheManager.del(pattern);
  } catch (error) {
    console.warn('Cache invalidation error:', error);
  }
}

export async function clearAllCache(): Promise<void> {
  try {
    await cacheManager.clear();
  } catch (error) {
    console.warn('Cache clear error:', error);
  }
}

// Cache statistics
export function getCacheStats(): any {
  return cacheManager.getStats();
}

// Export cache manager for direct use
export { cacheManager };