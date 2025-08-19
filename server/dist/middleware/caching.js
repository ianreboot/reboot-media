import NodeCache from 'node-cache';
import { createHash } from 'crypto';
class CacheManager {
    nodeCache;
    redis = null;
    useRedis;
    constructor() {
        this.nodeCache = new NodeCache({
            stdTTL: 600,
            checkperiod: 120,
            useClones: false,
            deleteOnExpire: true,
        });
        this.useRedis = process.env.NODE_ENV === 'production' && Boolean(process.env.REDIS_URL);
        if (this.useRedis) {
            this.initializeRedis();
        }
    }
    async initializeRedis() {
        try {
            const { Redis } = await import('ioredis');
            this.redis = new Redis(process.env.REDIS_URL, {
                maxRetriesPerRequest: 1,
                lazyConnect: true,
                enableReadyCheck: false,
            });
            this.redis.on('error', (error) => {
                console.error('Redis connection error:', error);
                this.useRedis = false;
            });
            await this.redis.ping();
            console.log('Redis cache connected successfully');
        }
        catch (error) {
            console.warn('Redis not available, using in-memory cache:', error);
            this.useRedis = false;
        }
    }
    async set(key, value, ttl) {
        const serializedValue = JSON.stringify(value);
        if (this.useRedis && this.redis) {
            try {
                if (ttl) {
                    await this.redis.setex(key, ttl, serializedValue);
                }
                else {
                    await this.redis.set(key, serializedValue);
                }
            }
            catch (error) {
                console.warn('Redis set error, using NodeCache:', error);
                this.nodeCache.set(key, value, ttl || 600);
            }
        }
        else {
            this.nodeCache.set(key, value, ttl || 600);
        }
    }
    async get(key) {
        if (this.useRedis && this.redis) {
            try {
                const value = await this.redis.get(key);
                return value ? JSON.parse(value) : undefined;
            }
            catch (error) {
                console.warn('Redis get error, using NodeCache:', error);
                return this.nodeCache.get(key);
            }
        }
        else {
            return this.nodeCache.get(key);
        }
    }
    async del(key) {
        if (this.useRedis && this.redis) {
            try {
                await this.redis.del(key);
            }
            catch (error) {
                console.warn('Redis delete error, using NodeCache:', error);
                this.nodeCache.del(key);
            }
        }
        else {
            this.nodeCache.del(key);
        }
    }
    async clear() {
        if (this.useRedis && this.redis) {
            try {
                await this.redis.flushdb();
            }
            catch (error) {
                console.warn('Redis clear error, using NodeCache:', error);
                this.nodeCache.flushAll();
            }
        }
        else {
            this.nodeCache.flushAll();
        }
    }
    getStats() {
        if (this.useRedis && this.redis) {
            return { type: 'redis', connected: true };
        }
        else {
            return {
                type: 'memory',
                keys: this.nodeCache.keys().length,
                stats: this.nodeCache.getStats(),
            };
        }
    }
}
const cacheManager = new CacheManager();
function generateCacheKey(req, prefix = 'api') {
    const url = req.originalUrl || req.url;
    const method = req.method;
    const query = JSON.stringify(req.query);
    const body = method === 'POST' ? JSON.stringify(req.body) : '';
    const content = `${method}:${url}:${query}:${body}`;
    const hash = createHash('sha256').update(content).digest('hex').substring(0, 16);
    return `${prefix}:${hash}`;
}
export function cacheResponse(ttlSeconds = 600, prefix = 'response') {
    return async (req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }
        const cacheKey = generateCacheKey(req, prefix);
        try {
            const cachedResponse = await cacheManager.get(cacheKey);
            if (cachedResponse) {
                res.set({
                    'X-Cache': 'HIT',
                    'X-Cache-Key': cacheKey,
                    'Cache-Control': `public, max-age=${ttlSeconds}`,
                });
                return res.status(cachedResponse.statusCode).json(cachedResponse.data);
            }
            const originalSend = res.json;
            res.json = function (body) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    const responseData = {
                        statusCode: res.statusCode,
                        data: body,
                        timestamp: new Date().toISOString(),
                    };
                    cacheManager.set(cacheKey, responseData, ttlSeconds).catch(error => {
                        console.warn('Cache set error:', error);
                    });
                }
                res.set({
                    'X-Cache': 'MISS',
                    'X-Cache-Key': cacheKey,
                    'Cache-Control': res.statusCode < 300 ? `public, max-age=${ttlSeconds}` : 'no-cache',
                });
                return originalSend.call(this, body);
            };
            next();
        }
        catch (error) {
            console.warn('Cache middleware error:', error);
            next();
        }
    };
}
export async function cacheQuery(key, queryFn, ttlSeconds = 300) {
    try {
        const cachedResult = await cacheManager.get(`query:${key}`);
        if (cachedResult !== undefined) {
            return cachedResult;
        }
        const result = await queryFn();
        await cacheManager.set(`query:${key}`, result, ttlSeconds);
        return result;
    }
    catch (error) {
        console.warn('Query cache error:', error);
        return await queryFn();
    }
}
export function cacheSession(ttlSeconds = 3600) {
    return async (req, res, next) => {
        if (!req.sessionId) {
            return next();
        }
        const sessionKey = `session:${req.sessionId}`;
        try {
            const cachedSession = await cacheManager.get(sessionKey);
            if (cachedSession) {
                req.sessionData = cachedSession;
                res.set('X-Session-Cache', 'HIT');
            }
            else {
                res.set('X-Session-Cache', 'MISS');
            }
            next();
        }
        catch (error) {
            console.warn('Session cache error:', error);
            next();
        }
    };
}
export async function invalidateCache(pattern) {
    try {
        await cacheManager.del(pattern);
    }
    catch (error) {
        console.warn('Cache invalidation error:', error);
    }
}
export async function clearAllCache() {
    try {
        await cacheManager.clear();
    }
    catch (error) {
        console.warn('Cache clear error:', error);
    }
}
export function getCacheStats() {
    return cacheManager.getStats();
}
export { cacheManager };
