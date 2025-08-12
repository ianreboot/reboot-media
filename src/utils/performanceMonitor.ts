// Performance Monitoring and Core Web Vitals Tracking
// Implements real user monitoring with minimal performance impact

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  url: string;
  connection?: string;
  deviceMemory?: number;
}

export interface CoreWebVitals {
  LCP?: PerformanceMetric;
  FID?: PerformanceMetric;
  CLS?: PerformanceMetric;
  TTFB?: PerformanceMetric;
  INP?: PerformanceMetric;
}

class PerformanceMonitor {
  private metrics: CoreWebVitals = {};
  private observers: PerformanceObserver[] = [];
  private isSupported: boolean;

  constructor() {
    this.isSupported = this.checkSupport();
    if (this.isSupported) {
      this.initializeMonitoring();
    }
  }

  private checkSupport(): boolean {
    return (
      typeof window !== 'undefined' &&
      'PerformanceObserver' in window &&
      'requestIdleCallback' in window
    );
  }

  private initializeMonitoring(): void {
    // Monitor LCP (Largest Contentful Paint)
    this.observeLCP();
    
    // Monitor FID (First Input Delay) 
    this.observeFID();
    
    // Monitor CLS (Cumulative Layout Shift)
    this.observeCLS();
    
    // Monitor TTFB (Time to First Byte)
    this.observeTTFB();
    
    // Monitor INP (Interaction to Next Paint) - modern replacement for FID
    this.observeINP();
    
    // Send metrics to service worker for analysis
    this.setupServiceWorkerReporting();
  }

  private observeLCP(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        if (lastEntry) {
          this.recordMetric('LCP', lastEntry.startTime);
        }
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('LCP monitoring not supported:', error);
    }
  }

  private observeFID(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            const fid = entry.processingStart - entry.startTime;
            this.recordMetric('FID', fid);
          }
        });
      });
      
      observer.observe({ type: 'first-input', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FID monitoring not supported:', error);
    }
  }

  private observeCLS(): void {
    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries: any[] = [];

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            if (sessionValue &&
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.recordMetric('CLS', clsValue);
            }
          }
        });
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('CLS monitoring not supported:', error);
    }
  }

  private observeTTFB(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === window.location.href) {
            const ttfb = entry.responseStart - entry.requestStart;
            this.recordMetric('TTFB', ttfb);
          }
        });
      });
      
      observer.observe({ type: 'navigation', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('TTFB monitoring not supported:', error);
    }
  }

  private observeINP(): void {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let maxDuration = 0;
        
        entries.forEach((entry: any) => {
          if (entry.duration > maxDuration) {
            maxDuration = entry.duration;
            this.recordMetric('INP', maxDuration);
          }
        });
      });
      
      observer.observe({ type: 'event', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('INP monitoring not supported:', error);
    }
  }

  private recordMetric(name: string, value: number): void {
    const metric: PerformanceMetric = {
      name,
      value: Math.round(value),
      rating: this.getRating(name, value),
      timestamp: Date.now(),
      url: window.location.href,
      connection: this.getConnectionInfo(),
      deviceMemory: this.getDeviceMemory(),
    };

    this.metrics[name as keyof CoreWebVitals] = metric;

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}:`, metric);
    }

    // Send to analytics (implement your analytics here)
    this.sendToAnalytics(metric);
  }

  private getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, [number, number]> = {
      LCP: [2500, 4000],
      FID: [100, 300],
      CLS: [0.1, 0.25],
      TTFB: [800, 1800],
      INP: [200, 500],
    };

    const [good, poor] = thresholds[metricName] || [0, 0];
    
    if (value <= good) return 'good';
    if (value <= poor) return 'needs-improvement';
    return 'poor';
  }

  private getConnectionInfo(): string | undefined {
    const connection = (navigator as any).connection;
    return connection ? connection.effectiveType : undefined;
  }

  private getDeviceMemory(): number | undefined {
    return (navigator as any).deviceMemory;
  }

  private setupServiceWorkerReporting(): void {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // Send metrics to service worker for logging/analysis
      Object.values(this.metrics).forEach(metric => {
        if (metric) {
          navigator.serviceWorker.controller?.postMessage({
            type: 'PERFORMANCE_METRIC',
            metric,
          });
        }
      });
    }
  }

  private sendToAnalytics(metric: PerformanceMetric): void {
    // Implement your analytics service here
    // Example: Google Analytics 4, Adobe Analytics, etc.
    
    // For now, we'll use a simple endpoint (implement server-side)
    requestIdleCallback(() => {
      fetch('/api/v1/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      }).catch(error => {
        console.warn('Failed to send metric to analytics:', error);
      });
    });
  }

  // Public API
  public getMetrics(): CoreWebVitals {
    return { ...this.metrics };
  }

  public getMetric(name: keyof CoreWebVitals): PerformanceMetric | undefined {
    return this.metrics[name];
  }

  public isMetricGood(name: keyof CoreWebVitals): boolean {
    const metric = this.metrics[name];
    return metric ? metric.rating === 'good' : false;
  }

  public getAllRatings(): Record<string, 'good' | 'needs-improvement' | 'poor'> {
    const ratings: Record<string, 'good' | 'needs-improvement' | 'poor'> = {};
    Object.entries(this.metrics).forEach(([name, metric]) => {
      if (metric) {
        ratings[name] = metric.rating;
      }
    });
    return ratings;
  }

  public destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = {};
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export function initializePerformanceMonitoring(): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
}

export function getPerformanceMonitor(): PerformanceMonitor | null {
  return performanceMonitor;
}

// React Hook for performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = React.useState<CoreWebVitals>({});
  
  React.useEffect(() => {
    const monitor = initializePerformanceMonitoring();
    
    // Update metrics periodically
    const interval = setInterval(() => {
      setMetrics(monitor.getMetrics());
    }, 1000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return metrics;
}

// Utility functions for performance optimization
export function optimizeForLCP(imageElement: HTMLImageElement): void {
  // Optimize LCP by preloading critical images
  imageElement.loading = 'eager';
  imageElement.decoding = 'sync';
  
  // Add fetchpriority if supported
  if ('fetchPriority' in imageElement) {
    (imageElement as any).fetchPriority = 'high';
  }
}

export function optimizeForCLS(element: HTMLElement, dimensions: { width: number; height: number }): void {
  // Prevent layout shift by setting dimensions
  element.style.width = `${dimensions.width}px`;
  element.style.height = `${dimensions.height}px`;
}

export function optimizeForFID(): void {
  // Use requestIdleCallback for non-critical work
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Defer non-critical JavaScript execution
    });
  }
}

// Import React for the hook
import React from 'react';