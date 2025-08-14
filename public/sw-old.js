// Service Worker for Performance Optimization and Offline Capability
// Version: 2.0.0 - Enhanced with Core Web Vitals monitoring

const CACHE_NAME = 'reboot-media-v2';
const PERFORMANCE_CACHE = 'reboot-performance-v1';
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

// Enhanced Performance monitoring and analytics storage
self.addEventListener('message', async (event) => {
  if (!event.data) return;

  const { type, data } = event.data;

  switch (type) {
    case 'PERFORMANCE_METRIC':
      await handlePerformanceMetric(data);
      break;
    
    case 'PERFORMANCE_ANALYTICS':
      await handlePerformanceAnalytics(data);
      break;
    
    case 'GET_OFFLINE_ANALYTICS':
      await sendOfflineAnalytics();
      break;
      
    case 'CLEAR_PERFORMANCE_DATA':
      await clearPerformanceData();
      break;
  }
});

// Handle individual performance metrics
async function handlePerformanceMetric(metric) {
  try {
    console.log('[SW] Performance metric received:', metric.name, metric.value);
    
    // Store in IndexedDB for offline analytics
    await storePerformanceData('metrics', {
      ...metric,
      storedAt: Date.now(),
      synced: false,
    });
    
    // Attempt immediate sync if online
    if (navigator.onLine) {
      await syncPerformanceMetric(metric);
    }
  } catch (error) {
    console.error('[SW] Error handling performance metric:', error);
  }
}

// Handle complete analytics payload
async function handlePerformanceAnalytics(analyticsData) {
  try {
    console.log('[SW] Analytics data received:', analyticsData.sessionId);
    
    // Store in IndexedDB for offline capabilities
    await storePerformanceData('analytics', {
      ...analyticsData,
      storedAt: Date.now(),
      synced: false,
    });
    
    // Attempt immediate sync if online
    if (navigator.onLine) {
      await syncAnalyticsData(analyticsData);
    } else {
      // Schedule background sync
      await scheduleBackgroundSync();
    }
  } catch (error) {
    console.error('[SW] Error handling analytics data:', error);
  }
}

// Store performance data in IndexedDB
async function storePerformanceData(storeName, data) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PerformanceDB', 1);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      const addRequest = store.add({
        ...data,
        id: `${data.sessionId || Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      });
      
      addRequest.onsuccess = () => resolve(addRequest.result);
      addRequest.onerror = () => reject(addRequest.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create metrics store
      if (!db.objectStoreNames.contains('metrics')) {
        const metricsStore = db.createObjectStore('metrics', { keyPath: 'id' });
        metricsStore.createIndex('sessionId', 'sessionId', { unique: false });
        metricsStore.createIndex('synced', 'synced', { unique: false });
      }
      
      // Create analytics store
      if (!db.objectStoreNames.contains('analytics')) {
        const analyticsStore = db.createObjectStore('analytics', { keyPath: 'id' });
        analyticsStore.createIndex('sessionId', 'sessionId', { unique: false });
        analyticsStore.createIndex('synced', 'synced', { unique: false });
      }
    };
  });
}

// Performance monitoring removed - was making 404 API calls to over-engineered endpoints
    });
    
    if (response.ok) {
      console.log('[SW] Analytics data synced:', data.sessionId);
      // Mark as synced in IndexedDB
      await markDataAsSynced('analytics', data.sessionId);
      return true;
    }
  } catch (error) {
    console.warn('[SW] Failed to sync analytics data:', error);
  }
  return false;
}

// Mark data as synced in IndexedDB
async function markDataAsSynced(storeName, sessionId) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PerformanceDB', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const index = store.index('sessionId');
      
      index.openCursor(sessionId).onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const record = cursor.value;
          record.synced = true;
          record.syncedAt = Date.now();
          cursor.update(record);
          cursor.continue();
        } else {
          resolve();
        }
      };
    };
    
    request.onerror = () => reject(request.error);
  });
}

// Send offline analytics to main thread
async function sendOfflineAnalytics() {
  try {
    const unsyncedData = await getUnsyncedData();
    
    // Send to all clients
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'OFFLINE_ANALYTICS',
        data: unsyncedData,
      });
    });
  } catch (error) {
    console.error('[SW] Error sending offline analytics:', error);
  }
}

// Get unsynced performance data
async function getUnsyncedData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PerformanceDB', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const results = { metrics: [], analytics: [] };
      
      // Get unsynced metrics
      const metricsTransaction = db.transaction(['metrics'], 'readonly');
      const metricsStore = metricsTransaction.objectStore('metrics');
      const metricsIndex = metricsStore.index('synced');
      
      metricsIndex.openCursor(false).onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          results.metrics.push(cursor.value);
          cursor.continue();
        }
      };
      
      // Get unsynced analytics
      const analyticsTransaction = db.transaction(['analytics'], 'readonly');
      const analyticsStore = analyticsTransaction.objectStore('analytics');
      const analyticsIndex = analyticsStore.index('synced');
      
      analyticsIndex.openCursor(false).onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          results.analytics.push(cursor.value);
          cursor.continue();
        }
      };
      
      // Wait for both to complete
      Promise.all([
        new Promise(res => metricsTransaction.oncomplete = () => res()),
        new Promise(res => analyticsTransaction.oncomplete = () => res()),
      ]).then(() => resolve(results));
    };
    
    request.onerror = () => reject(request.error);
  });
}

// Schedule background sync
async function scheduleBackgroundSync() {
  try {
    await self.registration.sync.register('performance-sync');
    console.log('[SW] Background sync scheduled for performance data');
  } catch (error) {
    console.warn('[SW] Background sync not available:', error);
  }
}

// Clear old performance data
async function clearPerformanceData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('PerformanceDB', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['metrics', 'analytics'], 'readwrite');
      
      transaction.objectStore('metrics').clear();
      transaction.objectStore('analytics').clear();
      
      transaction.oncomplete = () => {
        console.log('[SW] Performance data cleared');
        resolve();
      };
      
      transaction.onerror = () => reject(transaction.error);
    };
    
    request.onerror = () => reject(request.error);
  });
}

// Enhanced background sync for forms and performance data
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync' || event.tag === 'performance-sync') {
    event.waitUntil(handleBackgroundSync(event.tag));
  }
});

async function handleBackgroundSync(tag) {
  console.log(`[SW] Background sync triggered: ${tag}`);
  
  if (tag === 'performance-sync') {
    await syncOfflinePerformanceData();
  } else {
    // Handle any queued form submissions or other data sync
    console.log('[SW] Background sync for forms triggered');
  }
}

// Sync offline performance data when connectivity is restored
async function syncOfflinePerformanceData() {
  try {
    const unsyncedData = await getUnsyncedData();
    
    console.log(`[SW] Syncing ${unsyncedData.analytics.length} analytics records and ${unsyncedData.metrics.length} metrics`);
    
    // Sync analytics data
    for (const analyticsRecord of unsyncedData.analytics) {
      const success = await syncAnalyticsData(analyticsRecord);
      if (!success) {
        console.warn('[SW] Failed to sync analytics record:', analyticsRecord.id);
      }
    }
    
    // Sync individual metrics
    for (const metricRecord of unsyncedData.metrics) {
      await syncPerformanceMetric(metricRecord);
      await markDataAsSynced('metrics', metricRecord.sessionId);
    }
    
    console.log('[SW] Offline performance data sync completed');
    
    // Notify clients about successful sync
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'PERFORMANCE_SYNC_COMPLETE',
        syncedRecords: {
          analytics: unsyncedData.analytics.length,
          metrics: unsyncedData.metrics.length,
        },
      });
    });
    
  } catch (error) {
    console.error('[SW] Error syncing offline performance data:', error);
  }
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