import { useEffect, useState, useCallback } from 'react';
import { type PerformanceMetric, getPerformanceMonitor } from '../utils/performanceMonitor';

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