// Business Intelligence Metrics Middleware
// Tracks business KPIs, lead scoring, and conversion analytics

import { Request, Response, NextFunction } from 'express';
import { performance } from 'perf_hooks';

interface BusinessMetrics {
  leadSubmissions: Map<string, number>;
  conversionRates: Map<string, number>;
  revenueAttribution: Map<string, number>;
  leadQualityScores: number[];
  pageViews: Map<string, number>;
  sessionDurations: number[];
  bounceRates: Map<string, number>;
}

interface LeadData {
  id: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  page: string;
  timestamp: number;
  qualityScore: number;
  value: number;
}

interface ConversionEvent {
  type: string;
  value: number;
  source: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

class BusinessIntelligenceCollector {
  private metrics: BusinessMetrics;
  private conversionGoals: Map<string, number>;
  private revenuePerLead: number;
  
  constructor() {
    this.metrics = {
      leadSubmissions: new Map(),
      conversionRates: new Map(),
      revenueAttribution: new Map(),
      leadQualityScores: [],
      pageViews: new Map(),
      sessionDurations: [],
      bounceRates: new Map()
    };
    
    this.conversionGoals = new Map([
      ['contact_form', 0.03], // 3% target conversion rate
      ['newsletter', 0.05],   // 5% target conversion rate
      ['consultation', 0.02]  // 2% target conversion rate
    ]);
    
    this.revenuePerLead = 2500; // Average revenue per converted lead
  }

  // Track lead submission with attribution data
  trackLeadSubmission(leadData: LeadData): void {
    const sourceKey = `${leadData.source}_${leadData.medium}`;
    const currentCount = this.metrics.leadSubmissions.get(sourceKey) || 0;
    this.metrics.leadSubmissions.set(sourceKey, currentCount + 1);

    // Track quality score
    this.metrics.leadQualityScores.push(leadData.qualityScore);

    // Calculate revenue attribution
    const revenueValue = leadData.qualityScore * this.revenuePerLead / 100;
    const currentRevenue = this.metrics.revenueAttribution.get(sourceKey) || 0;
    this.metrics.revenueAttribution.set(sourceKey, currentRevenue + revenueValue);

    // Log business event
    console.log(`Lead submitted: ID=${leadData.id}, Source=${leadData.source}, Score=${leadData.qualityScore}`);
  }

  // Track page views for conversion funnel analysis
  trackPageView(page: string, source: string, sessionId: string): void {
    const pageKey = `${page}_${source}`;
    const currentViews = this.metrics.pageViews.get(pageKey) || 0;
    this.metrics.pageViews.set(pageKey, currentViews + 1);
  }

  // Calculate conversion rates in real-time
  calculateConversionRate(source: string, page: string): number {
    const leadKey = `${source}_${page}`;
    const viewKey = `${page}_${source}`;
    
    const leads = this.metrics.leadSubmissions.get(leadKey) || 0;
    const views = this.metrics.pageViews.get(viewKey) || 1;
    
    return (leads / views) * 100;
  }

  // Track conversion events
  trackConversion(event: ConversionEvent): void {
    const conversionRate = this.calculateConversionRate(event.source, 'contact');
    this.metrics.conversionRates.set(event.source, conversionRate);

    // Log conversion event
    console.log(`Conversion event: Type=${event.type}, Value=${event.value}, Source=${event.source}`);
  }

  // Calculate lead quality score based on various factors
  calculateLeadQualityScore(leadData: any): number {
    let score = 0;

    // Source quality weighting
    const sourceWeights: Record<string, number> = {
      'organic': 85,
      'referral': 80,
      'direct': 75,
      'social': 65,
      'paid': 60,
      'email': 70
    };
    score += sourceWeights[leadData.source] || 50;

    // Engagement signals
    if (leadData.timeOnPage > 120) score += 10; // > 2 minutes
    if (leadData.pagesViewed > 2) score += 5;
    if (leadData.downloadedResource) score += 10;
    if (leadData.watchedVideo) score += 8;

    // Form completion quality
    if (leadData.phoneProvided) score += 15;
    if (leadData.companyProvided) score += 10;
    if (leadData.budgetProvided) score += 20;
    if (leadData.timelineProvided) score += 15;

    // Demographic scoring (if available)
    if (leadData.companySize === 'enterprise') score += 20;
    else if (leadData.companySize === 'mid-market') score += 15;
    else if (leadData.companySize === 'smb') score += 10;

    // Industry scoring
    const highValueIndustries = ['technology', 'finance', 'healthcare', 'manufacturing'];
    if (highValueIndustries.includes(leadData.industry?.toLowerCase())) score += 10;

    return Math.min(100, Math.max(0, score));
  }

  // Get current business metrics
  getCurrentMetrics(): any {
    const avgLeadScore = this.metrics.leadQualityScores.length > 0 
      ? this.metrics.leadQualityScores.reduce((a, b) => a + b, 0) / this.metrics.leadQualityScores.length
      : 0;

    const totalLeads = Array.from(this.metrics.leadSubmissions.values())
      .reduce((sum, count) => sum + count, 0);

    const totalRevenue = Array.from(this.metrics.revenueAttribution.values())
      .reduce((sum, value) => sum + value, 0);

    const avgConversionRate = Array.from(this.metrics.conversionRates.values())
      .reduce((sum, rate) => sum + rate, 0) / Math.max(1, this.metrics.conversionRates.size);

    return {
      totalLeads,
      avgLeadScore,
      totalRevenue,
      avgConversionRate,
      leadsBySource: Object.fromEntries(this.metrics.leadSubmissions),
      revenueBySource: Object.fromEntries(this.metrics.revenueAttribution),
      conversionRatesBySource: Object.fromEntries(this.metrics.conversionRates),
      timestamp: Date.now()
    };
  }

  // Generate Prometheus metrics
  generatePrometheusMetrics(): string {
    const metrics = this.getCurrentMetrics();
    let prometheusOutput = '';

    // Lead submission metrics
    prometheusOutput += '# HELP leads_submitted_total Total number of leads submitted\n';
    prometheusOutput += '# TYPE leads_submitted_total counter\n';
    for (const [source, count] of this.metrics.leadSubmissions) {
      const [sourceType, medium] = source.split('_');
      prometheusOutput += `leads_submitted_total{source="${sourceType}",medium="${medium}"} ${count}\n`;
    }

    // Revenue attribution metrics
    prometheusOutput += '# HELP revenue_attributed_total Total revenue attributed by source\n';
    prometheusOutput += '# TYPE revenue_attributed_total counter\n';
    for (const [source, revenue] of this.metrics.revenueAttribution) {
      const [sourceType, medium] = source.split('_');
      prometheusOutput += `revenue_attributed_total{source="${sourceType}",medium="${medium}"} ${revenue}\n`;
    }

    // Lead quality score histogram
    prometheusOutput += '# HELP lead_quality_score Lead quality score distribution\n';
    prometheusOutput += '# TYPE lead_quality_score histogram\n';
    
    // Create histogram buckets
    const buckets = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    let cumulativeCount = 0;
    
    for (const bucket of buckets) {
      const countInBucket = this.metrics.leadQualityScores.filter(score => score <= bucket).length;
      cumulativeCount = countInBucket;
      prometheusOutput += `lead_quality_score_bucket{le="${bucket}"} ${cumulativeCount}\n`;
    }
    prometheusOutput += `lead_quality_score_bucket{le="+Inf"} ${this.metrics.leadQualityScores.length}\n`;
    prometheusOutput += `lead_quality_score_sum ${this.metrics.leadQualityScores.reduce((a, b) => a + b, 0)}\n`;
    prometheusOutput += `lead_quality_score_count ${this.metrics.leadQualityScores.length}\n`;

    // Conversion rate metrics
    prometheusOutput += '# HELP conversion_rate_percent Current conversion rate by source\n';
    prometheusOutput += '# TYPE conversion_rate_percent gauge\n';
    for (const [source, rate] of this.metrics.conversionRates) {
      prometheusOutput += `conversion_rate_percent{source="${source}"} ${rate}\n`;
    }

    // Page view metrics
    prometheusOutput += '# HELP page_views_total Total page views by source\n';
    prometheusOutput += '# TYPE page_views_total counter\n';
    for (const [pageSource, views] of this.metrics.pageViews) {
      const [page, source] = pageSource.split('_');
      prometheusOutput += `page_views_total{page="${page}",source="${source}"} ${views}\n`;
    }

    return prometheusOutput;
  }
}

const biCollector = new BusinessIntelligenceCollector();

// Middleware for business metrics collection
export const businessMetricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = performance.now();

  // Extract attribution data from query parameters or headers
  const utmSource = req.query.utm_source as string || req.headers['x-utm-source'] as string || 'direct';
  const utmMedium = req.query.utm_medium as string || req.headers['x-utm-medium'] as string || 'organic';
  const utmCampaign = req.query.utm_campaign as string || req.headers['x-utm-campaign'] as string || '';
  const sessionId = req.headers['x-session-id'] as string || 'unknown';

  // Track page view
  biCollector.trackPageView(req.path, utmSource, sessionId);

  // Attach business metrics to response object
  res.locals.businessMetrics = {
    source: utmSource,
    medium: utmMedium,
    campaign: utmCampaign,
    sessionId,
    startTime
  };

  // Override res.json to capture response data
  const originalJson = res.json;
  res.json = function(data: any) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    // Track business events based on response data
    if (req.path === '/api/v1/leads' && req.method === 'POST' && res.statusCode === 201) {
      const leadData: LeadData = {
        id: data.id || 'unknown',
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        content: req.query.utm_content as string || '',
        term: req.query.utm_term as string || '',
        page: req.path,
        timestamp: Date.now(),
        qualityScore: biCollector.calculateLeadQualityScore({
          ...req.body,
          source: utmSource,
          timeOnPage: parseInt(req.headers['x-time-on-page'] as string) || 0,
          pagesViewed: parseInt(req.headers['x-pages-viewed'] as string) || 1
        }),
        value: 0
      };

      biCollector.trackLeadSubmission(leadData);
      
      // Track conversion event
      biCollector.trackConversion({
        type: 'lead_form',
        value: leadData.qualityScore,
        source: utmSource,
        timestamp: Date.now(),
        sessionId
      });
    }

    // Log performance data
    console.log(`Response time: ${responseTime.toFixed(2)}ms, Method: ${req.method}, Path: ${req.path}`);

    return originalJson.call(this, data);
  };

  next();
};

// API endpoint for business metrics
export const getBusinessMetrics = (req: Request, res: Response) => {
  try {
    const metrics = biCollector.getCurrentMetrics();
    res.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting business metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve business metrics'
    });
  }
};

// Prometheus metrics endpoint
export const getPrometheusBusinessMetrics = (req: Request, res: Response) => {
  try {
    const prometheusMetrics = biCollector.generatePrometheusMetrics();
    res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
    res.send(prometheusMetrics);
  } catch (error) {
    console.error('Error generating Prometheus metrics:', error);
    res.status(500).send('# Error generating metrics\n');
  }
};

export { BusinessIntelligenceCollector, biCollector };
export type { LeadData, ConversionEvent, BusinessMetrics };