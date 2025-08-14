import { useEffect, useState, useCallback } from 'react';
import { type PerformanceMetric, getPerformanceMonitor } from '../utils/performanceMonitor';

// Bundle size thresholds (gzipped sizes)
const BUNDLE_THRESHOLDS = {
  MAIN_CHUNK: { good: 150000, poor: 250000 }, // 150KB / 250KB
  VENDOR_CHUNK: { good: 150000, poor: 300000 }, // 150KB / 300KB
  TOTAL_JS: { good: 400000, poor: 700000 }, // 400KB / 700KB
  TOTAL_CSS: { good: 50000, poor: 100000 }, // 50KB / 100KB
};

interface BundleMetric {
  name: string;
  size: number;
  gzipSize?: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  loadTime?: number;
  type: 'js' | 'css' | 'other';
}

interface BundleAnalysisData {
  chunks: BundleMetric[];
  totalJS: number;
  totalCSS: number;
  chunkLoadTimes: Record<string, number>;
  cacheHitRate: number;
  initialLoadTime: number;
}

export interface CoreWebVitalsData {
  lcp: PerformanceMetric | null;
  fid: PerformanceMetric | null;
  cls: PerformanceMetric | null;
  ttfb: PerformanceMetric | null;
  inp: PerformanceMetric | null;
  isLoading: boolean;
  allGood: boolean;
  score: number;
}

export function useCoreWebVitals(): CoreWebVitalsData {
  const [metrics, setMetrics] = useState<CoreWebVitalsData>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    inp: null,
    isLoading: true,
    allGood: false,
    score: 0,
  });

  const updateMetrics = useCallback(() => {
    const monitor = getPerformanceMonitor();
    if (!monitor) return;

    const currentMetrics = monitor.getMetrics();
    const allGood = Object.values(currentMetrics).every(
      metric => metric?.rating === 'good'
    );

    // Calculate overall score (0-100)
    const ratings = monitor.getAllRatings();
    const goodCount = Object.values(ratings).filter(rating => rating === 'good').length;
    const totalCount = Object.values(ratings).length;
    const score = totalCount > 0 ? (goodCount / totalCount) * 100 : 0;

    setMetrics({
      lcp: currentMetrics.LCP || null,
      fid: currentMetrics.FID || null,
      cls: currentMetrics.CLS || null,
      ttfb: currentMetrics.TTFB || null,
      inp: currentMetrics.INP || null,
      isLoading: Object.keys(currentMetrics).length === 0,
      allGood,
      score: Math.round(score),
    });
  }, []);

  useEffect(() => {
    // Update metrics immediately
    updateMetrics();

    // Set up interval to update metrics
    const interval = setInterval(updateMetrics, 1000);

    // Listen for performance entries
    const handlePerformanceUpdate = () => {
      requestAnimationFrame(updateMetrics);
    };

    // Add event listeners if available
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(handlePerformanceUpdate);
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        
        return () => {
          observer.disconnect();
          clearInterval(interval);
        };
      } catch (error) {
        console.warn('PerformanceObserver not supported:', error);
      }
    }

    return () => clearInterval(interval);
  }, [updateMetrics]);

  return metrics;
}

// Hook for specific metric optimization
export function useMetricOptimization(metricName: keyof CoreWebVitalsData) {
  const metrics = useCoreWebVitals();
  const metric = metrics[metricName] as PerformanceMetric | null;

  const optimizations = {
    lcp: {
      recommendations: [
        'Optimize images with modern formats (WebP/AVIF)',
        'Use preload for critical resources',
        'Minimize render-blocking resources',
        'Improve server response times',
        'Use CDN for static assets',
      ],
      thresholds: { good: 2500, poor: 4000 },
      unit: 'ms',
    },
    fid: {
      recommendations: [
        'Minimize JavaScript execution time',
        'Use code splitting and lazy loading',
        'Remove unused JavaScript',
        'Use web workers for heavy computations',
        'Optimize event handlers',
      ],
      thresholds: { good: 100, poor: 300 },
      unit: 'ms',
    },
    cls: {
      recommendations: [
        'Include size attributes on images and videos',
        'Reserve space for ads and embeds',
        'Avoid inserting content above existing content',
        'Use transform animations instead of layout-triggering properties',
        'Preload fonts to avoid FOIT/FOUT',
      ],
      thresholds: { good: 0.1, poor: 0.25 },
      unit: '',
    },
    ttfb: {
      recommendations: [
        'Optimize server response time',
        'Use CDN for better geographical distribution',
        'Implement efficient caching strategies',
        'Optimize database queries',
        'Use server-side rendering appropriately',
      ],
      thresholds: { good: 800, poor: 1800 },
      unit: 'ms',
    },
    inp: {
      recommendations: [
        'Optimize event handler performance',
        'Use passive event listeners',
        'Debounce frequent interactions',
        'Optimize rendering performance',
        'Use RequestIdleCallback for non-critical work',
      ],
      thresholds: { good: 200, poor: 500 },
      unit: 'ms',
    },
  };

  return {
    metric,
    optimizations: optimizations[metricName as keyof typeof optimizations],
    isGood: metric?.rating === 'good',
    needsImprovement: metric?.rating === 'needs-improvement',
    isPoor: metric?.rating === 'poor',
  };
}

// Hook for overall performance score
export function usePerformanceScore() {
  const metrics = useCoreWebVitals();
  
  const getGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const getColor = (score: number): string => {
    if (score >= 90) return '#22c55e'; // green
    if (score >= 80) return '#84cc16'; // lime
    if (score >= 70) return '#eab308'; // yellow
    if (score >= 60) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  return {
    score: metrics.score,
    grade: getGrade(metrics.score),
    color: getColor(metrics.score),
    isLoading: metrics.isLoading,
    allGood: metrics.allGood,
    metrics,
  };
}

const getBundleRating = (size: number, thresholds: {good: number, poor: number}): 'good' | 'needs-improvement' | 'poor' => {
  if (size <= thresholds.good) return 'good';
  if (size <= thresholds.poor) return 'needs-improvement';
  return 'poor';
};

// Enhanced bundle analysis hook
export function useBundleAnalysis(): BundleAnalysisData {
  const [bundleData, setBundleData] = useState<BundleAnalysisData>({
    chunks: [],
    totalJS: 0,
    totalCSS: 0,
    chunkLoadTimes: {},
    cacheHitRate: 0,
    initialLoadTime: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const analyzeBundlePerformance = () => {
      const performanceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const chunks: BundleMetric[] = [];
      let totalJS = 0;
      let totalCSS = 0;
      const chunkLoadTimes: Record<string, number> = {};
      let cacheHits = 0;
      let maxLoadTime = 0;

      performanceEntries.forEach(entry => {
        const url = new URL(entry.name, window.location.origin);
        const isOwnAsset = url.pathname.includes('/assets/') || url.pathname.includes('/reboot/assets/');
        
        if (!isOwnAsset) return;

        const fileName = url.pathname.split('/').pop() || '';
        const isJS = fileName.endsWith('.js');
        const isCSS = fileName.endsWith('.css');
        
        if (!isJS && !isCSS) return;

        const size = entry.transferSize || entry.encodedBodySize || 0;
        const loadTime = entry.responseEnd - entry.requestStart;
        maxLoadTime = Math.max(maxLoadTime, loadTime);
        
        // Detect cache hits
        if (entry.transferSize === 0 && entry.decodedBodySize > 0) {
          cacheHits++;
        }

        // Determine chunk type and rating
        let rating: 'good' | 'needs-improvement' | 'poor';
        if (isJS) {
          if (fileName.includes('vendor') || fileName.includes('react')) {
            rating = getBundleRating(size, BUNDLE_THRESHOLDS.VENDOR_CHUNK);
          } else {
            rating = getBundleRating(size, BUNDLE_THRESHOLDS.MAIN_CHUNK);
          }
        } else {
          rating = getBundleRating(size, { good: 20000, poor: 50000 });
        }

        const metric: BundleMetric = {
          name: fileName,
          size,
          loadTime,
          rating,
          type: isJS ? 'js' : 'css'
        };

        chunks.push(metric);
        chunkLoadTimes[fileName] = loadTime;

        if (isJS) totalJS += size;
        if (isCSS) totalCSS += size;
      });

      const cacheHitRate = performanceEntries.length > 0 ? (cacheHits / performanceEntries.length) * 100 : 0;

      setBundleData({
        chunks,
        totalJS,
        totalCSS,
        chunkLoadTimes,
        cacheHitRate,
        initialLoadTime: maxLoadTime,
      });
    };

    // Initial analysis after a delay to ensure resources are loaded
    const timeoutId = setTimeout(analyzeBundlePerformance, 2000);

    // Re-analyze on route changes
    let observer: PerformanceObserver | null = null;
    if ('PerformanceObserver' in window) {
      try {
        observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.some(entry => entry.name.includes('.js') || entry.name.includes('.css'))) {
            setTimeout(analyzeBundlePerformance, 500);
          }
        });
        observer.observe({ entryTypes: ['resource'] });
      } catch (error) {
        console.warn('PerformanceObserver not supported:', error);
      }
    }

    return () => {
      clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, []);

  return bundleData;
}

// Performance optimization utilities
export const performanceOptimizations = {
  // Optimize for LCP
  optimizeLCP: () => {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-priority="high"]');
    criticalImages.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'eager';
        img.decoding = 'sync';
        if ('fetchPriority' in img) {
          (img as any).fetchPriority = 'high';
        }
      }
    });

    // Preload critical CSS
    const criticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-critical="true"]');
    criticalCSS.forEach((link) => {
      if (link instanceof HTMLLinkElement) {
        link.rel = 'preload';
        link.as = 'style';
      }
    });
  },

  // Optimize for CLS
  optimizeCLS: () => {
    // Set dimensions on images without them
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach((img) => {
      if (img instanceof HTMLImageElement && img.naturalWidth && img.naturalHeight) {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
      }
    });

    // Reserve space for dynamic content
    const dynamicElements = document.querySelectorAll('[data-dynamic="true"]');
    dynamicElements.forEach((element) => {
      if (element instanceof HTMLElement && !element.style.minHeight) {
        element.style.minHeight = '100px'; // Reserve minimum space
      }
    });
  },

  // Optimize for FID/INP
  optimizeFID: () => {
    // Use passive event listeners where possible
    const scrollElements = document.querySelectorAll('[data-scroll-listener="true"]');
    scrollElements.forEach((element) => {
      element.addEventListener('scroll', () => {}, { passive: true });
    });

    // Defer non-critical JavaScript
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Execute non-critical code here
        console.log('Non-critical code executed during idle time');
      });
    }
  },

  // Run all optimizations
  optimizeAll: () => {
    performanceOptimizations.optimizeLCP();
    performanceOptimizations.optimizeCLS();
    performanceOptimizations.optimizeFID();
  },
};