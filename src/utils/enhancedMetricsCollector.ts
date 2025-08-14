// Enhanced Metrics Collector for Real-time Business Intelligence
// Integrates Core Web Vitals with business metrics for comprehensive monitoring

import { getCLS, getFID, getFCP, getLCP, getTTFB, onINP } from 'web-vitals';

interface EnhancedMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
  businessContext: BusinessContext;
}

interface BusinessContext {
  source: string;
  medium: string;
  campaign: string;
  page: string;
  userAgent: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  connectionType: string;
  leadScore?: number;
  conversionValue?: number;
  customerSegment?: string;
}

interface BusinessKPI {
  name: string;
  value: number;
  target: number;
  timestamp: number;
  trend: 'up' | 'down' | 'stable';
  impactScore: number; // 1-100 scale of business impact
}

class EnhancedMetricsCollector {
  private sessionId: string;
  private userId?: string;
  private businessContext: BusinessContext;
  private metrics: EnhancedMetric[] = [];
  private businessKPIs: BusinessKPI[] = [];
  private performanceBudgets: Map<string, number>;
  private conversionGoals: Map<string, number>;
  
  constructor() {
    this.sessionId = this.generateSessionId();
    this.businessContext = this.extractBusinessContext();
    
    // Performance budget thresholds (in ms or score)
    this.performanceBudgets = new Map([
      ['lcp', 2500],
      ['cls', 0.1],
      ['fid', 100],
      ['ttfb', 800],
      ['inp', 200]
    ]);

    // Business conversion goals
    this.conversionGoals = new Map([
      ['contact_form_conversion', 3.0], // 3% target
      ['newsletter_signup', 5.0],       // 5% target
      ['consultation_booking', 2.0],    // 2% target
      ['resource_download', 8.0]        // 8% target
    ]);

    this.initializeMetricsCollection();
    this.initializeBusinessTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private extractBusinessContext(): BusinessContext {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Extract UTM parameters
    const source = urlParams.get('utm_source') || 
                  sessionStorage.getItem('utm_source') || 
                  document.referrer ? new URL(document.referrer).hostname : 'direct';
    
    const medium = urlParams.get('utm_medium') || 
                  sessionStorage.getItem('utm_medium') || 
                  'organic';
    
    const campaign = urlParams.get('utm_campaign') || 
                    sessionStorage.getItem('utm_campaign') || 
                    '';

    // Store UTM parameters in session storage
    if (urlParams.get('utm_source')) {
      sessionStorage.setItem('utm_source', source);
      sessionStorage.setItem('utm_medium', medium);
      sessionStorage.setItem('utm_campaign', campaign);
    }

    // Detect device type
    const deviceType = this.getDeviceType();
    
    // Get connection type
    const connectionType = this.getConnectionType();

    return {
      source,
      medium,
      campaign,
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      deviceType,
      connectionType
    };
  }

  private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  private getConnectionType(): string {
    // @ts-ignore - navigator.connection is experimental
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection ? connection.effectiveType || 'unknown' : 'unknown';
  }

  private initializeMetricsCollection(): void {
    // Collect Core Web Vitals with business context
    getCLS(this.createMetricHandler('cls'));
    getFID(this.createMetricHandler('fid'));
    getFCP(this.createMetricHandler('fcp'));
    getLCP(this.createMetricHandler('lcp'));
    getTTFB(this.createMetricHandler('ttfb'));
    onINP(this.createMetricHandler('inp'));

    // Collect additional performance metrics
    this.collectResourceTimingMetrics();
    this.collectNavigationTimingMetrics();
  }

  private createMetricHandler(metricName: string) {
    return (metric: any) => {
      const enhancedMetric: EnhancedMetric = {
        name: metricName,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userId: this.userId,
        businessContext: { ...this.businessContext }
      };

      this.metrics.push(enhancedMetric);
      this.evaluatePerformanceBudget(enhancedMetric);
      this.correlateWithBusinessMetrics(enhancedMetric);
      this.sendToAnalytics(enhancedMetric);

      // Log Core Web Vitals for monitoring
      console.log(`Core Web Vitals: LCP=${metricName === 'lcp' ? metric.value : 'N/A'}, CLS=${metricName === 'cls' ? metric.value : 'N/A'}, FID=${metricName === 'fid' ? metric.value : 'N/A'}`);
    };
  }

  private evaluatePerformanceBudget(metric: EnhancedMetric): void {
    const budget = this.performanceBudgets.get(metric.name);
    if (!budget) return;

    const isBudgetExceeded = metric.value > budget;
    
    if (isBudgetExceeded) {
      this.trackBusinessKPI({
        name: `performance_budget_violation_${metric.name}`,
        value: metric.value,
        target: budget,
        timestamp: Date.now(),
        trend: 'down',
        impactScore: this.calculatePerformanceImpactScore(metric)
      });

      // Send alert for budget violation
      this.sendBudgetViolationAlert(metric, budget);
    }
  }

  private calculatePerformanceImpactScore(metric: EnhancedMetric): number {
    // Calculate business impact based on metric type and severity
    const baseImpact = {
      'lcp': 85, // High impact on user experience and SEO
      'cls': 70, // Medium-high impact on user experience
      'fid': 75, // High impact on interactivity
      'inp': 75, // High impact on interactivity
      'ttfb': 60, // Medium impact on perceived performance
      'fcp': 50  // Medium impact on perceived performance
    };

    const base = baseImpact[metric.name as keyof typeof baseImpact] || 50;
    
    // Adjust based on page importance
    const pageMultiplier = this.getPageImportanceMultiplier(metric.businessContext.page);
    
    // Adjust based on traffic source quality
    const sourceMultiplier = this.getSourceQualityMultiplier(metric.businessContext.source);
    
    return Math.min(100, base * pageMultiplier * sourceMultiplier);
  }

  private getPageImportanceMultiplier(page: string): number {
    const highValuePages = ['/contact', '/', '/fractional-cmo-guide'];
    const mediumValuePages = ['/about', '/cost-roi-analysis'];
    
    if (highValuePages.includes(page)) return 1.3;
    if (mediumValuePages.includes(page)) return 1.1;
    return 1.0;
  }

  private getSourceQualityMultiplier(source: string): number {
    const highQualitySources = ['organic', 'referral', 'direct'];
    const mediumQualitySources = ['social', 'email'];
    
    if (highQualitySources.includes(source)) return 1.2;
    if (mediumQualitySources.includes(source)) return 1.0;
    return 0.9; // Paid traffic
  }

  private correlateWithBusinessMetrics(metric: EnhancedMetric): void {
    // Correlate performance with conversion likelihood
    const conversionProbability = this.calculateConversionProbability(metric);
    
    if (conversionProbability > 0) {
      this.trackBusinessKPI({
        name: 'performance_conversion_correlation',
        value: conversionProbability,
        target: 70, // Target 70% correlation
        timestamp: Date.now(),
        trend: conversionProbability > 70 ? 'up' : 'down',
        impactScore: Math.floor(conversionProbability)
      });
    }
  }

  private calculateConversionProbability(metric: EnhancedMetric): number {
    // Research-based conversion probability based on Core Web Vitals
    let probability = 100;

    // LCP impact on conversion (studies show 1s delay = 7% conversion drop)
    if (metric.name === 'lcp') {
      const lcpDelaySeconds = (metric.value - 1500) / 1000; // Above 1.5s threshold
      if (lcpDelaySeconds > 0) {
        probability -= Math.min(50, lcpDelaySeconds * 7);
      }
    }

    // CLS impact on conversion (layout shifts reduce trust)
    if (metric.name === 'cls') {
      if (metric.value > 0.1) {
        probability -= Math.min(30, (metric.value - 0.1) * 200);
      }
    }

    // FID impact on conversion (poor interactivity = frustration)
    if (metric.name === 'fid') {
      const fidDelayMs = metric.value - 100; // Above 100ms threshold
      if (fidDelayMs > 0) {
        probability -= Math.min(40, (fidDelayMs / 100) * 10);
      }
    }

    return Math.max(0, Math.min(100, probability));
  }

  private initializeBusinessTracking(): void {
    // Track form interactions
    this.trackFormInteractions();
    
    // Track scroll depth
    this.trackScrollDepth();
    
    // Track time on page
    this.trackTimeOnPage();
    
    // Track click events on key elements
    this.trackKeyElementClicks();
  }

  private trackFormInteractions(): void {
    document.querySelectorAll('form').forEach((form, index) => {
      const formName = form.getAttribute('name') || `form_${index}`;
      
      form.addEventListener('submit', (event) => {
        const formData = new FormData(form as HTMLFormElement);
        const leadScore = this.calculateLeadScore(formData);
        
        this.trackBusinessKPI({
          name: 'form_submission',
          value: 1,
          target: this.conversionGoals.get('contact_form_conversion') || 3,
          timestamp: Date.now(),
          trend: 'up',
          impactScore: leadScore
        });

        // Update business context with lead information
        this.businessContext.leadScore = leadScore;
        this.businessContext.conversionValue = leadScore * 25; // Estimated value per point
      });

      // Track form field interactions
      form.addEventListener('focusin', () => {
        this.trackBusinessKPI({
          name: 'form_engagement',
          value: 1,
          target: 50, // 50% of visitors should engage with forms
          timestamp: Date.now(),
          trend: 'up',
          impactScore: 30
        });
      });
    });
  }

  private calculateLeadScore(formData: FormData): number {
    let score = 50; // Base score

    // Email provided
    if (formData.get('email')) score += 20;
    
    // Phone provided
    if (formData.get('phone')) score += 15;
    
    // Company provided
    if (formData.get('company')) score += 10;
    
    // Message length (engagement indicator)
    const message = formData.get('message') as string;
    if (message && message.length > 50) score += 10;
    if (message && message.length > 150) score += 5;

    // Source quality bonus
    const sourceBonus = this.getSourceQualityMultiplier(this.businessContext.source);
    score *= sourceBonus;

    return Math.min(100, Math.max(0, score));
  }

  private trackScrollDepth(): void {
    let maxScroll = 0;
    const trackingPoints = [25, 50, 75, 90, 100];
    const trackedPoints = new Set<number>();

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        trackingPoints.forEach(point => {
          if (scrollPercent >= point && !trackedPoints.has(point)) {
            trackedPoints.add(point);
            
            this.trackBusinessKPI({
              name: 'scroll_depth',
              value: point,
              target: 75, // Target 75% scroll depth
              timestamp: Date.now(),
              trend: point > 75 ? 'up' : 'stable',
              impactScore: Math.floor(point * 0.8) // Higher scroll = higher engagement
            });
          }
        });
      }
    });
  }

  private trackTimeOnPage(): void {
    const startTime = Date.now();
    
    // Track time on page at intervals
    const timeIntervals = [30, 60, 120, 300, 600]; // seconds
    const trackedIntervals = new Set<number>();

    setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      
      timeIntervals.forEach(interval => {
        if (timeOnPage >= interval && !trackedIntervals.has(interval)) {
          trackedIntervals.add(interval);
          
          this.trackBusinessKPI({
            name: 'time_on_page',
            value: interval,
            target: 120, // Target 2 minutes time on page
            timestamp: Date.now(),
            trend: interval > 120 ? 'up' : 'stable',
            impactScore: Math.min(90, interval / 2) // Longer time = higher engagement
          });
        }
      });
    }, 5000); // Check every 5 seconds
  }

  private trackKeyElementClicks(): void {
    // Track clicks on important elements
    const keyElements = [
      { selector: 'a[href="/contact"]', name: 'contact_link_click', impact: 80 },
      { selector: 'button[type="submit"]', name: 'form_submit_click', impact: 90 },
      { selector: '.cta-button', name: 'cta_click', impact: 85 },
      { selector: 'a[href^="tel:"]', name: 'phone_click', impact: 95 },
      { selector: 'a[href^="mailto:"]', name: 'email_click', impact: 70 }
    ];

    keyElements.forEach(({ selector, name, impact }) => {
      document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('click', () => {
          this.trackBusinessKPI({
            name,
            value: 1,
            target: 10, // Target 10% click-through rate
            timestamp: Date.now(),
            trend: 'up',
            impactScore: impact
          });
        });
      });
    });
  }

  private trackBusinessKPI(kpi: BusinessKPI): void {
    this.businessKPIs.push(kpi);
    this.sendBusinessKPIToAnalytics(kpi);
  }

  private sendToAnalytics(metric: EnhancedMetric): void {
    // Send to backend analytics endpoint
    fetch('/api/v1/performance/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'performance_metric',
        data: metric
      })
    }).catch(error => {
      console.error('Failed to send performance metric:', error);
    });
  }

  private sendBusinessKPIToAnalytics(kpi: BusinessKPI): void {
    // Send business KPI to analytics
    fetch('/api/v1/analytics/business-kpi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'business_kpi',
        data: kpi,
        context: this.businessContext
      })
    }).catch(error => {
      console.error('Failed to send business KPI:', error);
    });
  }

  private sendBudgetViolationAlert(metric: EnhancedMetric, budget: number): void {
    // Send real-time alert for performance budget violations
    fetch('/api/v1/alerts/performance-budget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        budget,
        severity: metric.rating === 'poor' ? 'critical' : 'warning',
        context: this.businessContext,
        timestamp: Date.now()
      })
    }).catch(error => {
      console.error('Failed to send budget violation alert:', error);
    });
  }

  // Public methods for external access
  public getMetrics(): EnhancedMetric[] {
    return [...this.metrics];
  }

  public getBusinessKPIs(): BusinessKPI[] {
    return [...this.businessKPIs];
  }

  public getCurrentPerformanceScore(): number {
    const recentMetrics = this.metrics.filter(m => Date.now() - m.timestamp < 60000); // Last minute
    if (recentMetrics.length === 0) return 0;

    const scores = recentMetrics.map(m => {
      switch (m.rating) {
        case 'good': return 100;
        case 'needs-improvement': return 60;
        case 'poor': return 20;
        default: return 50;
      }
    });

    return Math.floor(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }
}

// Initialize enhanced metrics collector
const enhancedMetricsCollector = new EnhancedMetricsCollector();

// Export for external use
export { EnhancedMetricsCollector, enhancedMetricsCollector };
export type { EnhancedMetric, BusinessContext, BusinessKPI };