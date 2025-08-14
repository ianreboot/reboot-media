import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/subtle-scroll-improvements.css'
import Router from './Router.tsx'
import { registerServiceWorker, setupPerformanceIntegration } from './utils/serviceWorkerRegistration'
import { initializePerformanceMonitoring } from './utils/performanceMonitor'
import './utils/attributionTracking' // Initialize attribution tracking

// Initialize performance monitoring
initializePerformanceMonitoring();

// Register service worker for caching and offline support
registerServiceWorker({
  onSuccess: () => {
    console.log('[App] Service Worker registered successfully');
  },
  onUpdate: () => {
    console.log('[App] New content available, will update on next visit');
  },
  onOfflineReady: () => {
    console.log('[App] App is ready to work offline');
  },
});

// Setup performance integration with service worker
setupPerformanceIntegration();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
