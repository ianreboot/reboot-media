// Simple Service Worker - Basic caching without over-engineered analytics
// Version: 3.0.0 - Simplified for business website needs

const CACHE_NAME = 'reboot-media-v3';
const STATIC_CACHE_NAME = 'reboot-static-v3';
const RUNTIME_CACHE_NAME = 'reboot-runtime-v3';

// Resources to cache immediately
const CORE_CACHE_RESOURCES = [
  '/',
  '/reboot/',
  '/reboot/index.html',
  // Note: favicon files are served from HTML meta tags, not needed in cache
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core resources');
        return cache.addAll(CORE_CACHE_RESOURCES);
      })
      .then(() => {
        console.log('[SW] Core resources cached, skipping waiting');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache core resources:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  const cacheAllowlist = [STATIC_CACHE_NAME, RUNTIME_CACHE_NAME];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheAllowlist.includes(cacheName)) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'document' || request.url.includes('/reboot')) {
    // HTML pages - stale while revalidate
    event.respondWith(handlePageRequest(request));
  } else if (request.url.includes('/assets/') || request.url.includes('.js') || request.url.includes('.css')) {
    // Static assets - cache first
    event.respondWith(handleAssetRequest(request));
  } else {
    // Other requests - network first
    event.respondWith(handleNetworkFirst(request));
  }
});

// Handle page requests (HTML)
async function handlePageRequest(request) {
  try {
    const cache = await caches.open(RUNTIME_CACHE_NAME);
    
    // Try network first for fresh content
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        // Update cache with fresh content
        cache.put(request, networkResponse.clone());
        return networkResponse;
      }
    } catch (networkError) {
      console.warn('[SW] Network failed for page request:', request.url);
    }
    
    // Fallback to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Last resort - offline page (if available)
    return new Response('<!DOCTYPE html><html><body><h1>Offline</h1><p>Please check your connection.</p></body></html>', {
      headers: { 'Content-Type': 'text/html' }
    });
    
  } catch (error) {
    console.error('[SW] Error handling page request:', error);
    throw error;
  }
}

// Handle static asset requests (JS, CSS, images)
async function handleAssetRequest(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    
    // Try cache first for assets
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache the asset for future use
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
    
  } catch (error) {
    console.error('[SW] Error handling asset request:', error);
    throw error;
  }
}

// Handle other requests - network first
async function handleNetworkFirst(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses (except API calls)
    if (networkResponse.ok && !request.url.includes('/api/')) {
      const cache = await caches.open(RUNTIME_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    // Fallback to cache
    const cache = await caches.open(RUNTIME_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    console.error('[SW] Network and cache both failed:', error);
    throw error;
  }
}

// Message handling - simplified
self.addEventListener('message', (event) => {
  if (!event.data || !event.data.type) return;
  
  switch (event.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches();
      break;
      
    default:
      console.log('[SW] Unknown message type:', event.data.type);
  }
});

// Clear all caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
    console.log('[SW] All caches cleared');
  } catch (error) {
    console.error('[SW] Error clearing caches:', error);
  }
}

// Background sync for form submissions (basic)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log('[SW] Background sync triggered');
  // Basic form submission sync can be added here if needed
  // For now, just log that sync occurred
}