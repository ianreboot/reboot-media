import { useEffect } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import analytics from '../utils/simpleAnalytics';

/**
 * Simple Core Web Vitals tracking
 * Replaces the over-engineered useEnhancedWebVitals hook
 * Just logs vitals - no complex dashboards or analytics endpoints
 */
export function useCoreWebVitals() {
  useEffect(() => {
    // Simple Core Web Vitals tracking - log and send to GA4
    onLCP((metric) => {
      analytics.coreWebVital('lcp', metric.value, metric.rating);
    });
    
    onFID((metric) => {
      analytics.coreWebVital('fid', metric.value, metric.rating);
    });
    
    onCLS((metric) => {
      analytics.coreWebVital('cls', metric.value, metric.rating);
    });
    
    onTTFB((metric) => {
      analytics.coreWebVital('ttfb', metric.value, metric.rating);
    });
    
    onINP((metric) => {
      analytics.coreWebVital('inp', metric.value, metric.rating);
    });

    onFCP((metric) => {
      analytics.coreWebVital('fcp', metric.value, metric.rating);
    });

    // Simple scroll depth tracking
    let maxScroll = 0;
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        [25, 50, 75, 100].forEach(depth => {
          if (scrollPercent >= depth && !trackedDepths.has(depth)) {
            trackedDepths.add(depth);
            analytics.scrollDepth(depth);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}

export default useCoreWebVitals;