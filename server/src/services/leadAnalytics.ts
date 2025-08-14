/**
 * Lead Analytics Service
 * Customer journey tracking and conversion analytics
 */

import { LeadScore } from './leadScoring.js';

export interface CustomerJourney {
  leadId: string;
  sessionId: string;
  userId?: string;
  startTime: Date;
  lastActivity: Date;
  touchpoints: TouchPoint[];
  conversionEvents: ConversionEvent[];
  attributionData: AttributionData;
  leadScore?: LeadScore;
  status: 'active' | 'converted' | 'lost' | 'nurturing';
}

export interface TouchPoint {
  timestamp: Date;
  type: 'page_view' | 'form_start' | 'form_complete' | 'content_download' | 
        'email_open' | 'email_click' | 'chat_interaction' | 'phone_call';
  channel: 'organic' | 'paid' | 'social' | 'email' | 'direct' | 'referral';
  details: {
    url?: string;
    contentId?: string;
    duration?: number;
    formFields?: string[];
    emailCampaign?: string;
    referrer?: string;
  };
  value: number; // Engagement value 0-100
}

export interface ConversionEvent {
  timestamp: Date;
  type: 'micro' | 'macro'; // Micro = form fill, Macro = sale
  name: string;
  value: number;
  attribution: string[]; // Contributing touchpoints
}

export interface AttributionData {
  firstTouch: {
    channel: string;
    campaign?: string;
    timestamp: Date;
  };
  lastTouch: {
    channel: string;
    campaign?: string;
    timestamp: Date;
  };
  multiTouch: {
    channels: { [key: string]: number }; // Channel contribution percentages
    campaigns: { [key: string]: number };
  };
  modelType: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'data_driven';
}

export interface LeadMetrics {
  conversionRate: number;
  averageTimeToConversion: number; // in hours
  touchpointsToConversion: number;
  leadQualityScore: number;
  engagementScore: number;
  sourceROI: { [source: string]: number };
  predictedConversionProbability: number;
}

export interface CohortAnalysis {
  cohortId: string;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  metrics: {
    size: number;
    converted: number;
    conversionRate: number;
    averageScore: number;
    averageCLV: number;
    retention: { [period: string]: number };
  };
}

// Touchpoint scoring weights
const TOUCHPOINT_VALUES: Record<string, number> = {
  'page_view': 10,
  'form_start': 30,
  'form_complete': 100,
  'content_download': 50,
  'email_open': 15,
  'email_click': 25,
  'chat_interaction': 60,
  'phone_call': 80
};

// Channel quality multipliers
const CHANNEL_MULTIPLIERS: Record<string, number> = {
  'organic': 1.5,   // High intent
  'direct': 1.3,    // Brand aware
  'referral': 1.2,  // Trusted source
  'email': 1.1,     // Engaged subscriber
  'paid': 1.0,      // Standard
  'social': 0.9     // Lower intent
};

/**
 * Track customer journey from first touch to conversion
 */
export class CustomerJourneyTracker {
  private journeys: Map<string, CustomerJourney> = new Map();
  private sessionTimeout: number = 30 * 60 * 1000; // 30 minutes

  /**
   * Start or update a customer journey
   */
  trackTouchpoint(
    sessionId: string,
    touchpoint: TouchPoint,
    leadId?: string
  ): CustomerJourney {
    let journey = this.journeys.get(sessionId);

    if (!journey) {
      journey = {
        leadId: leadId || `lead_${Date.now()}`,
        sessionId,
        startTime: new Date(),
        lastActivity: new Date(),
        touchpoints: [],
        conversionEvents: [],
        attributionData: this.initializeAttribution(touchpoint),
        status: 'active'
      };
      this.journeys.set(sessionId, journey);
    }

    // Update journey
    journey.touchpoints.push(touchpoint);
    journey.lastActivity = new Date();
    
    // Update attribution
    this.updateAttribution(journey, touchpoint);

    // Check for conversion events
    if (touchpoint.type === 'form_complete') {
      journey.conversionEvents.push({
        timestamp: new Date(),
        type: 'micro',
        name: 'Lead Form Submission',
        value: 100,
        attribution: this.calculateTouchpointAttribution(journey)
      });
      journey.status = 'converted';
    }

    return journey;
  }

  /**
   * Initialize attribution data
   */
  private initializeAttribution(touchpoint: TouchPoint): AttributionData {
    return {
      firstTouch: {
        channel: touchpoint.channel,
        campaign: touchpoint.details.emailCampaign,
        timestamp: touchpoint.timestamp
      },
      lastTouch: {
        channel: touchpoint.channel,
        campaign: touchpoint.details.emailCampaign,
        timestamp: touchpoint.timestamp
      },
      multiTouch: {
        channels: { [touchpoint.channel]: 100 },
        campaigns: touchpoint.details.emailCampaign 
          ? { [touchpoint.details.emailCampaign]: 100 }
          : {}
      },
      modelType: 'time_decay'
    };
  }

  /**
   * Update attribution data with new touchpoint
   */
  private updateAttribution(journey: CustomerJourney, touchpoint: TouchPoint): void {
    // Update last touch
    journey.attributionData.lastTouch = {
      channel: touchpoint.channel,
      campaign: touchpoint.details.emailCampaign,
      timestamp: touchpoint.timestamp
    };

    // Update multi-touch attribution using time decay model
    const touchpoints = journey.touchpoints;
    const totalTouchpoints = touchpoints.length;
    
    // Ensure attribution data exists
    if (!journey.attributionData) {
      journey.attributionData = {
        firstTouch: { channel: '', timestamp: new Date() },
        lastTouch: { channel: '', timestamp: new Date() },
        multiTouch: { channels: {}, campaigns: {} },
        modelType: 'time_decay'
      };
    }
    if (!journey.attributionData.multiTouch) {
      journey.attributionData.multiTouch = { channels: {}, campaigns: {} };
    }
    if (!journey.attributionData.multiTouch.channels) {
      journey.attributionData.multiTouch.channels = {};
    }
    if (!journey.attributionData.multiTouch.campaigns) {
      journey.attributionData.multiTouch.campaigns = {};
    }

    // Reset multi-touch data
    journey.attributionData.multiTouch.channels = {};
    journey.attributionData.multiTouch.campaigns = {};

    // Calculate time decay weights
    touchpoints.forEach((tp, index) => {
      const weight = this.calculateTimeDecayWeight(index, totalTouchpoints);
      
      // Update channel attribution (objects guaranteed to exist after initialization above)
      const channels = journey.attributionData!.multiTouch!.channels!;
      if (!channels[tp.channel]) {
        channels[tp.channel] = 0;
      }
      channels[tp.channel] = (channels[tp.channel] || 0) + weight;

      // Update campaign attribution if applicable
      if (tp.details?.emailCampaign) {
        const campaigns = journey.attributionData!.multiTouch!.campaigns!;
        const campaign = tp.details.emailCampaign;
        if (!campaigns[campaign]) {
          campaigns[campaign] = 0;
        }
        campaigns[campaign] += weight;
      }
    });

    // Normalize to percentages
    this.normalizeAttribution(journey.attributionData?.multiTouch?.channels);
    this.normalizeAttribution(journey.attributionData?.multiTouch?.campaigns);
  }

  /**
   * Calculate time decay weight for attribution
   */
  private calculateTimeDecayWeight(index: number, total: number): number {
    // More recent touchpoints get higher weight
    const position = index / (total - 1 || 1);
    return Math.pow(2, position);
  }

  /**
   * Normalize attribution values to percentages
   */
  private normalizeAttribution(attribution: { [key: string]: number } | undefined): void {
    if (!attribution) return;
    
    const total = Object.values(attribution).reduce((sum, val) => sum + val, 0);
    if (total > 0) {
      Object.keys(attribution).forEach(key => {
        const value = attribution![key] || 0;
        attribution![key] = Math.round((value / total) * 100);
      });
    }
  }

  /**
   * Calculate touchpoint attribution for conversion
   */
  private calculateTouchpointAttribution(journey: CustomerJourney): string[] {
    return journey.touchpoints
      .filter(tp => tp.value > 30) // Significant touchpoints only
      .map(tp => `${tp.type}_${tp.channel}`)
      .slice(-5); // Last 5 significant touchpoints
  }

  /**
   * Calculate lead metrics from journey data
   */
  calculateLeadMetrics(leadId: string): LeadMetrics {
    const journey = Array.from(this.journeys.values()).find(j => j.leadId === leadId);
    
    if (!journey) {
      return {
        conversionRate: 0,
        averageTimeToConversion: 0,
        touchpointsToConversion: 0,
        leadQualityScore: 0,
        engagementScore: 0,
        sourceROI: {},
        predictedConversionProbability: 0
      };
    }

    // Calculate conversion rate (simplified - would need more data in production)
    const conversionRate = journey.conversionEvents.length > 0 ? 100 : 0;

    // Calculate time to conversion
    const conversionEvent = journey.conversionEvents[0];
    const timeToConversion = conversionEvent 
      ? (conversionEvent.timestamp.getTime() - journey.startTime.getTime()) / (1000 * 60 * 60)
      : 0;

    // Calculate engagement score
    const engagementScore = journey.touchpoints.reduce((total, tp) => {
      const baseValue = TOUCHPOINT_VALUES[tp.type] || 10;
      const channelMultiplier = CHANNEL_MULTIPLIERS[tp.channel] || 1;
      return total + (baseValue * channelMultiplier);
    }, 0) / journey.touchpoints.length;

    // Calculate source ROI (simplified)
    const sourceROI: { [source: string]: number } = {};
    Object.entries(journey.attributionData.multiTouch.channels).forEach(([channel, attribution]) => {
      sourceROI[channel] = attribution * (conversionRate / 100) * 100; // Simplified ROI
    });

    // Predict conversion probability based on engagement
    const predictedConversionProbability = Math.min(95, 
      (engagementScore / 100) * 50 + // Engagement weight
      (journey.touchpoints.length / 10) * 30 + // Touchpoint count weight
      20 // Base probability
    ) / 100;

    return {
      conversionRate,
      averageTimeToConversion: timeToConversion,
      touchpointsToConversion: journey.touchpoints.length,
      leadQualityScore: journey.leadScore?.total || 0,
      engagementScore: Math.round(engagementScore),
      sourceROI,
      predictedConversionProbability
    };
  }

  /**
   * Perform cohort analysis on leads
   */
  analyzeCohort(
    startDate: Date,
    endDate: Date,
    period: 'daily' | 'weekly' | 'monthly' = 'weekly'
  ): CohortAnalysis {
    const cohortJourneys = Array.from(this.journeys.values()).filter(j => 
      j.startTime >= startDate && j.startTime <= endDate
    );

    const converted = cohortJourneys.filter(j => j.status === 'converted').length;
    const totalScores = cohortJourneys.reduce((sum, j) => sum + (j.leadScore?.total || 0), 0);
    
    // Calculate retention (simplified - would need time series data in production)
    const retention: { [period: string]: number } = {
      'week1': 100,
      'week2': 85,
      'week3': 70,
      'week4': 60,
      'month2': 45,
      'month3': 35
    };

    return {
      cohortId: `cohort_${startDate.toISOString().split('T')[0]}`,
      period,
      startDate,
      metrics: {
        size: cohortJourneys.length,
        converted,
        conversionRate: cohortJourneys.length > 0 ? (converted / cohortJourneys.length) * 100 : 0,
        averageScore: cohortJourneys.length > 0 ? totalScores / cohortJourneys.length : 0,
        averageCLV: 60000, // Placeholder - would calculate from actual data
        retention
      }
    };
  }

  /**
   * Get journey by session or lead ID
   */
  getJourney(id: string): CustomerJourney | undefined {
    return this.journeys.get(id) || 
           Array.from(this.journeys.values()).find(j => j.leadId === id);
  }

  /**
   * Clean up inactive journeys
   */
  cleanupInactiveSessions(): void {
    const now = Date.now();
    this.journeys.forEach((journey, sessionId) => {
      if (now - journey.lastActivity.getTime() > this.sessionTimeout) {
        if (journey.status === 'active') {
          journey.status = 'nurturing';
        }
      }
    });
  }
}

/**
 * Calculate funnel conversion rates
 */
export function calculateFunnelMetrics(
  journeys: CustomerJourney[]
): {
  stages: Array<{
    name: string;
    count: number;
    conversionRate: number;
    dropoffRate: number;
    averageTime: number;
  }>;
  overallConversion: number;
  bottlenecks: string[];
} {
  // Define funnel stages
  const stages = [
    { name: 'Landing Page Visit', identifier: 'page_view' },
    { name: 'Content Engagement', identifier: 'content_download' },
    { name: 'Form Started', identifier: 'form_start' },
    { name: 'Form Completed', identifier: 'form_complete' },
    { name: 'Qualified Lead', identifier: 'qualified' },
    { name: 'Opportunity Created', identifier: 'opportunity' }
  ];

  let previousStageCount = journeys.length;
  const stageMetrics = stages.map((stage, index) => {
    const journeysAtStage = journeys.filter(j => 
      j.touchpoints.some(tp => tp.type === stage.identifier as any)
    );

    const count = journeysAtStage.length;
    const conversionRate = previousStageCount > 0 
      ? (count / previousStageCount) * 100 
      : 0;
      
    // Update previous count for next iteration
    const currentStageCount = count;

    const dropoffRate = 100 - conversionRate;

    // Calculate average time to reach this stage
    const times = journeysAtStage.map(j => {
      const touchpoint = j.touchpoints.find(tp => tp.type === stage.identifier as any);
      return touchpoint 
        ? (touchpoint.timestamp.getTime() - j.startTime.getTime()) / (1000 * 60 * 60)
        : 0;
    });

    const averageTime = times.length > 0
      ? times.reduce((a, b) => a + b, 0) / times.length
      : 0;

    // Update for next iteration
    previousStageCount = currentStageCount;

    return {
      name: stage.name,
      count,
      conversionRate: Math.round(conversionRate * 10) / 10,
      dropoffRate: Math.round(dropoffRate * 10) / 10,
      averageTime: Math.round(averageTime * 10) / 10
    };
  });

  // Identify bottlenecks (stages with >50% dropoff)
  const bottlenecks = stageMetrics
    .filter(stage => stage.dropoffRate > 50)
    .map(stage => stage.name);

  // Calculate overall conversion
  const completedJourneys = journeys.filter(j => 
    j.conversionEvents.some(e => e.type === 'macro')
  );
  const overallConversion = journeys.length > 0
    ? (completedJourneys.length / journeys.length) * 100
    : 0;

  return {
    stages: stageMetrics,
    overallConversion: Math.round(overallConversion * 10) / 10,
    bottlenecks
  };
}

/**
 * Generate conversion optimization recommendations
 */
export function generateOptimizationRecommendations(
  metrics: LeadMetrics,
  funnelMetrics: ReturnType<typeof calculateFunnelMetrics>
): Array<{
  priority: 'high' | 'medium' | 'low';
  area: string;
  issue: string;
  recommendation: string;
  expectedImpact: string;
}> {
  const recommendations = [];

  // Check conversion rate
  if (metrics.conversionRate < 2) {
    recommendations.push({
      priority: 'high' as const,
      area: 'Conversion Rate',
      issue: `Current conversion rate (${metrics.conversionRate}%) below industry average`,
      recommendation: 'Implement exit-intent popups and reduce form fields',
      expectedImpact: '30-50% increase in conversions'
    });
  }

  // Check time to conversion
  if (metrics.averageTimeToConversion > 48) {
    recommendations.push({
      priority: 'high' as const,
      area: 'Response Time',
      issue: `Long time to conversion (${metrics.averageTimeToConversion} hours)`,
      recommendation: 'Implement automated lead nurturing and faster follow-up',
      expectedImpact: '25% reduction in conversion time'
    });
  }

  // Check engagement score
  if (metrics.engagementScore < 50) {
    recommendations.push({
      priority: 'medium' as const,
      area: 'Engagement',
      issue: 'Low visitor engagement score',
      recommendation: 'Add interactive content and personalization',
      expectedImpact: '40% increase in engagement'
    });
  }

  // Check funnel bottlenecks
  funnelMetrics.bottlenecks.forEach(bottleneck => {
    recommendations.push({
      priority: 'high' as const,
      area: 'Funnel Optimization',
      issue: `High dropoff at ${bottleneck}`,
      recommendation: `Optimize ${bottleneck} with A/B testing and UX improvements`,
      expectedImpact: '20-30% reduction in dropoff'
    });
  });

  // Check source performance
  const poorPerformingSources = Object.entries(metrics.sourceROI)
    .filter(([_, roi]) => roi < 50)
    .map(([source]) => source);

  if (poorPerformingSources.length > 0) {
    recommendations.push({
      priority: 'medium' as const,
      area: 'Traffic Sources',
      issue: `Low ROI from ${poorPerformingSources.join(', ')}`,
      recommendation: 'Reallocate budget to higher-performing channels',
      expectedImpact: '35% improvement in overall ROI'
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

// Export singleton instance
export const journeyTracker = new CustomerJourneyTracker();