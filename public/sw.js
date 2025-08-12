// Service Worker for Performance Optimization and Offline Capability
// Version: 1.0.0

const CACHE_NAME = 'reboot-media-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/offline.html',
  '/reboot-logo-white.svg',
  '/reboot-logo-original.svg',
  '/robots.txt',
];

// Core Web Vitals optimization strategies
const PERFORMANCE_CONFIG = {
  // Cache strategies by resource type
  strategies: {
    documents: { strategy: 'networkFirst', maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
    scripts: { strategy: 'cacheFirst', maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    styles: { strategy: 'cacheFirst', maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    images: { strategy: 'cacheFirst', maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    fonts: { strategy: 'cacheFirst', maxAge: 365 * 24 * 60 * 60 * 1000 }, // 1 year
    api: { strategy: 'networkFirst', maxAge: 5 * 60 * 1000 }, // 5 minutes
  },
  
  // Preload critical resources for LCP optimization
  criticalResources: [
    '/',
    '/assets/index-*.css',
    '/assets/react-vendor-*.js',
    '/assets/ui-components-*.js',
  ],
};

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // Cache static assets
      try {
        await cache.addAll(STATIC_CACHE_URLS);
        console.log('[SW] Static assets cached');
      } catch (error) {
        console.warn('[SW] Failed to cache some static assets:', error);
      }
      
      // Skip waiting to activate immediately
      self.skipWaiting();
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    (async () => {
      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
      
      // Take control of all pages
      await self.clients.claim();
      console.log('[SW] Service worker activated');
    })()
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  // Only handle HTTP/HTTPS requests
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleRequest(event.request));
});

// Main request handler with performance optimizations
async function handleRequest(request) {
  const url = new URL(request.url);
  const cache = await caches.open(CACHE_NAME);
  
  // Determine resource type and strategy
  const resourceType = getResourceType(request);
  const strategy = PERFORMANCE_CONFIG.strategies[resourceType];
  
  try {
    if (strategy.strategy === 'cacheFirst') {
      return await cacheFirst(request, cache, strategy.maxAge);
    } else if (strategy.strategy === 'networkFirst') {
      return await networkFirst(request, cache, strategy.maxAge);
    } else {
      return await fetch(request);
    }
  } catch (error) {
    console.warn('[SW] Request failed:', request.url, error);
    return await handleOffline(request, cache);
  }
}

// Cache-first strategy (good for static assets)
async function cacheFirst(request, cache, maxAge) {
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse, maxAge)) {
    // Return cached version if available and not expired
    return cachedResponse;
  }
  
  try {
    // Fetch from network and cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      await cache.put(request, responseToCache);
    }
    return networkResponse;
  } catch (error) {
    // Return stale cache if network fails
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network-first strategy (good for dynamic content)
async function networkFirst(request, cache, maxAge) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      await cache.put(request, responseToCache);
    }
    return networkResponse;
  } catch (error) {
    // Fall back to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse && !isExpired(cachedResponse, maxAge)) {
      return cachedResponse;
    }
    throw error;
  }
}

// Handle offline scenarios
async function handleOffline(request, cache) {
  // For navigation requests, show offline page
  if (request.mode === 'navigate') {
    const offlineResponse = await cache.match(OFFLINE_URL);
    if (offlineResponse) {
      return offlineResponse;
    }
  }
  
  // For other requests, try cache
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Return offline response
  return new Response('Offline', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'text/plain' },
  });
}

// Determine resource type for caching strategy
function getResourceType(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  if (request.mode === 'navigate' || pathname.endsWith('.html')) {
    return 'documents';
  }
  
  if (pathname.endsWith('.js') || pathname.endsWith('.mjs')) {
    return 'scripts';
  }
  
  if (pathname.endsWith('.css')) {
    return 'styles';
  }
  
  if (pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|avif)$/i)) {
    return 'images';
  }
  
  if (pathname.match(/\.(woff|woff2|ttf|otf)$/i)) {
    return 'fonts';
  }
  
  if (pathname.startsWith('/api/')) {
    return 'api';
  }
  
  return 'documents';
}

// Check if cached response is expired
function isExpired(response, maxAge) {
  const dateHeader = response.headers.get('date');
  if (!dateHeader) return false;
  
  const responseTime = new Date(dateHeader).getTime();
  const now = Date.now();
  
  return (now - responseTime) > maxAge;
}

// Performance monitoring - Core Web Vitals
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_METRIC') {
    console.log('[SW] Performance metric:', event.data.metric);
    
    // Store performance metrics for analysis
    if (event.data.metric.name === 'LCP') {
      console.log('[SW] LCP:', event.data.metric.value);
    } else if (event.data.metric.name === 'FID') {
      console.log('[SW] FID:', event.data.metric.value);
    } else if (event.data.metric.name === 'CLS') {
      console.log('[SW] CLS:', event.data.metric.value);
    }
  }
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle any queued form submissions or data sync
  console.log('[SW] Background sync triggered');
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/reboot-logo-original.svg',
        badge: '/reboot-logo-original.svg',
      })
    );
  }
});

console.log('[SW] Service worker script loaded');