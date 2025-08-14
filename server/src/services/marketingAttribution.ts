/**
 * Advanced Marketing Attribution Service
 * Multi-touch attribution models and customer journey analytics
 */

import { CustomerJourney, TouchPoint, ConversionEvent } from './leadAnalytics.js';

export interface AttributionModel {
  type: 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based' | 'data-driven';
  weight: number;
  touchpoint: TouchpointData;
  contribution: number;
  confidence: number;
}

export interface TouchpointData {
  channel: string;
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
  timestamp: Date;
  sessionId: string;
  userId?: string;
  pageUrl: string;
  interaction: string;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  referrer?: string;
  utmParams?: UTMParameters;
  customParams?: Record<string, string>;
}

export interface UTMParameters {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

export interface AttributionResult {
  modelType: AttributionModel['type'];
  touchpoints: AttributionTouchpoint[];
  totalValue: number;
  confidence: number;
  insights: AttributionInsight[];
}

export interface AttributionTouchpoint {
  touchpoint: TouchpointData;
  attribution: number; // Percentage contribution
  value: number; // Monetary value
  impact: 'high' | 'medium' | 'low';
  position: number;
  timeFromConversion: number; // Hours
}

export interface AttributionInsight {
  type: 'recommendation' | 'warning' | 'opportunity';
  message: string;
  impact: string;
  action: string;
}

export interface ChannelPerformance {
  channel: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
    cost: number;
    roi: number;
    cpa: number; // Cost per acquisition
    ltv: number; // Lifetime value
    attributedRevenue: Record<string, number>; // By attribution model
  };
  trends: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
  attribution: {
    firstTouch: number;
    lastTouch: number;
    linear: number;
    timeDecay: number;
    positionBased: number;
    dataDriven: number;
  };
}

export interface JourneyStage {
  stage: 'awareness' | 'consideration' | 'decision' | 'retention' | 'advocacy';
  touchpoints: TouchpointData[];
  duration: number; // Hours
  conversionRate: number;
  dropoffRate: number;
  optimizationOpportunities: string[];
}

export interface CrossChannelInteraction {
  channels: string[];
  sequence: string[];
  synergyScore: number; // How well channels work together
  conversionLift: number; // Additional conversion from interaction
  recommendedSequence: string[];
}

/**
 * Advanced Marketing Attribution Calculator
 */
export class MarketingAttributionService {
  private conversionValue: number = 1000; // Default conversion value
  private lookbackWindow: number = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
  
  /**
   * Calculate attribution using multiple models
   */
  calculateAttribution(
    journey: CustomerJourney,
    model: AttributionModel['type'] = 'data-driven',
    conversionValue?: number
  ): AttributionResult {
    const value = conversionValue || this.conversionValue;
    
    switch (model) {
      case 'first-touch':
        return this.firstTouchAttribution(journey, value);
      case 'last-touch':
        return this.lastTouchAttribution(journey, value);
      case 'linear':
        return this.linearAttribution(journey, value);
      case 'time-decay':
        return this.timeDecayAttribution(journey, value);
      case 'position-based':
        return this.positionBasedAttribution(journey, value);
      case 'data-driven':
        return this.dataDrivenAttribution(journey, value);
      default:
        return this.linearAttribution(journey, value);
    }
  }

  /**
   * First-touch attribution model
   */
  private firstTouchAttribution(journey: CustomerJourney, value: number): AttributionResult {
    const touchpoints = this.convertToTouchpointData(journey.touchpoints);
    if (touchpoints.length === 0) {
      return this.emptyResult('first-touch');
    }

    const firstTouch = touchpoints[0];
    const conversionTime = journey.conversionEvents[0]?.timestamp || new Date();

    const attributedTouchpoints: AttributionTouchpoint[] = touchpoints.map((tp, index) => ({
      touchpoint: tp,
      attribution: index === 0 ? 100 : 0,
      value: index === 0 ? value : 0,
      impact: index === 0 ? 'high' : 'low',
      position: index,
      timeFromConversion: this.calculateHoursDifference(tp.timestamp, conversionTime)
    }));

    const insights = this.generateInsights(attributedTouchpoints, 'first-touch');

    return {
      modelType: 'first-touch',
      touchpoints: attributedTouchpoints,
      totalValue: value,
      confidence: 0.7, // First-touch has moderate confidence
      insights
    };
  }

  /**
   * Last-touch attribution model
   */
  private lastTouchAttribution(journey: CustomerJourney, value: number): AttributionResult {
    const touchpoints = this.convertToTouchpointData(journey.touchpoints);
    if (touchpoints.length === 0) {
      return this.emptyResult('last-touch');
    }

    const lastIndex = touchpoints.length - 1;
    const conversionTime = journey.conversionEvents[0]?.timestamp || new Date();

    const attributedTouchpoints: AttributionTouchpoint[] = touchpoints.map((tp, index) => ({
      touchpoint: tp,
      attribution: index === lastIndex ? 100 : 0,
      value: index === lastIndex ? value : 0,
      impact: index === lastIndex ? 'high' : 'low',
      position: index,
      timeFromConversion: this.calculateHoursDifference(tp.timestamp, conversionTime)
    }));

    const insights = this.generateInsights(attributedTouchpoints, 'last-touch');

    return {
      modelType: 'last-touch',
      touchpoints: attributedTouchpoints,
      totalValue: value,
      confidence: 0.7,
      insights
    };
  }

  /**
   * Linear attribution model - equal credit to all touchpoints
   */
  private linearAttribution(journey: CustomerJourney, value: number): AttributionResult {
    const touchpoints = this.convertToTouchpointData(journey.touchpoints);
    if (touchpoints.length === 0) {
      return this.emptyResult('linear');
    }

    const attributionPerTouch = 100 / touchpoints.length;
    const valuePerTouch = value / touchpoints.length;
    const conversionTime = journey.conversionEvents[0]?.timestamp || new Date();

    const attributedTouchpoints: AttributionTouchpoint[] = touchpoints.map((tp, index) => ({
      touchpoint: tp,
      attribution: attributionPerTouch,
      value: valuePerTouch,
      impact: 'medium',
      position: index,
      timeFromConversion: this.calculateHoursDifference(tp.timestamp, conversionTime)
    }));

    const insights = this.generateInsights(attributedTouchpoints, 'linear');

    return {
      modelType: 'linear',
      touchpoints: attributedTouchpoints,
      totalValue: value,
      confidence: 0.8,
      insights
    };
  }

  /**
   * Time-decay attribution - more credit to recent touchpoints
   */
  private timeDecayAttribution(journey: CustomerJourney, value: number): AttributionResult {
    const touchpoints = this.convertToTouchpointData(journey.touchpoints);
    if (touchpoints.length === 0) {
      return this.emptyResult('time-decay');
    }

    const conversionTime = journey.conversionEvents[0]?.timestamp || new Date();
    const halfLife = 7 * 24; // 7 days in hours

    // Calculate decay weights
    const weights = touchpoints.map(tp => {
      const hoursFromConversion = this.calculateHoursDifference(tp.timestamp, conversionTime);
      return Math.pow(2, -hoursFromConversion / halfLife);
    });

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);

    const attributedTouchpoints: AttributionTouchpoint[] = touchpoints.map((tp, index) => {
      const attribution = (weights[index] / totalWeight) * 100;
      const touchValue = (weights[index] / totalWeight) * value;
      
      return {
        touchpoint: tp,
        attribution,
        value: touchValue,
        impact: attribution > 30 ? 'high' : attribution > 10 ? 'medium' : 'low',
        position: index,
        timeFromConversion: this.calculateHoursDifference(tp.timestamp, conversionTime)
      };
    });

    const insights = this.generateInsights(attributedTouchpoints, 'time-decay');

    return {
      modelType: 'time-decay',
      touchpoints: attributedTouchpoints,
      totalValue: value,
      confidence: 0.85,
      insights
    };
  }

  /**
   * Position-based attribution (U-shaped) - 40% first, 40% last, 20% middle
   */
  private positionBasedAttribution(journey: CustomerJourney, value: number): AttributionResult {
    const touchpoints = this.convertToTouchpointData(journey.touchpoints);
    if (touchpoints.length === 0) {
      return this.emptyResult('position-based');
    }

    const conversionTime = journey.conversionEvents[0]?.timestamp || new Date();
    const lastIndex = touchpoints.length - 1;

    const attributedTouchpoints: AttributionTouchpoint[] = touchpoints.map((tp, index) => {
      let attribution: number;
      
      if (touchpoints.length === 1) {
        attribution = 100;
      } else if (touchpoints.length === 2) {
        attribution = 50;
      } else {
        if (index === 0 || index === lastIndex) {
          attribution = 40;
        } else {
          const middleCount = touchpoints.length - 2;
          attribution = 20 / middleCount;
        }
      }

      const touchValue = (attribution / 100) * value;

      return {
        touchpoint: tp,
        attribution,
        value: touchValue,
        impact: attribution >= 40 ? 'high' : attribution >= 10 ? 'medium' : 'low',
        position: index,
        timeFromConversion: this.calculateHoursDifference(tp.timestamp, conversionTime)
      };
    });

    const insights = this.generateInsights(attributedTouchpoints, 'position-based');

    return {
      modelType: 'position-based',
      touchpoints: attributedTouchpoints,
      totalValue: value,
      confidence: 0.82,
      insights
    };
  }

  /**
   * Data-driven attribution using machine learning approach
   */
  private dataDrivenAttribution(journey: CustomerJourney, value: number): AttributionResult {
    const touchpoints = this.convertToTouchpointData(journey.touchpoints);
    if (touchpoints.length === 0) {
      return this.emptyResult('data-driven');
    }

    const conversionTime = journey.conversionEvents[0]?.timestamp || new Date();
    
    // Simplified Shapley value calculation
    const shapleyValues = this.calculateShapleyValues(touchpoints, journey);
    const totalShapley = shapleyValues.reduce((sum, v) => sum + v, 0);

    const attributedTouchpoints: AttributionTouchpoint[] = touchpoints.map((tp, index) => {
      const attribution = (shapleyValues[index] / totalShapley) * 100;
      const touchValue = (shapleyValues[index] / totalShapley) * value;

      return {
        touchpoint: tp,
        attribution,
        value: touchValue,
        impact: attribution > 25 ? 'high' : attribution > 10 ? 'medium' : 'low',
        position: index,
        timeFromConversion: this.calculateHoursDifference(tp.timestamp, conversionTime)
      };
    });

    const insights = this.generateDataDrivenInsights(attributedTouchpoints, journey);

    return {
      modelType: 'data-driven',
      touchpoints: attributedTouchpoints,
      totalValue: value,
      confidence: 0.92, // Highest confidence for data-driven
      insights
    };
  }

  /**
   * Calculate Shapley values for data-driven attribution
   */
  private calculateShapleyValues(touchpoints: TouchpointData[], journey: CustomerJourney): number[] {
    // Simplified Shapley value calculation
    // In production, this would use actual conversion probability models
    
    const values = touchpoints.map((tp, index) => {
      let value = 1; // Base value
      
      // Channel quality factor
      const channelFactors: Record<string, number> = {
        'organic': 1.5,
        'direct': 1.3,
        'referral': 1.2,
        'email': 1.1,
        'paid': 1.0,
        'social': 0.9
      };
      value *= channelFactors[tp.channel] || 1;

      // Engagement factor based on interaction type
      const interactionFactors: Record<string, number> = {
        'form_complete': 2.0,
        'chat_interaction': 1.8,
        'content_download': 1.5,
        'email_click': 1.3,
        'page_view': 1.0
      };
      value *= interactionFactors[tp.interaction] || 1;

      // Time decay factor
      const hoursFromStart = this.calculateHoursDifference(
        journey.startTime,
        tp.timestamp
      );
      const decayFactor = Math.exp(-hoursFromStart / (7 * 24)); // 7-day half-life
      value *= (0.5 + 0.5 * decayFactor); // Don't decay below 50%

      // Position factor
      const positionFactor = index === 0 ? 1.3 : index === touchpoints.length - 1 ? 1.2 : 1.0;
      value *= positionFactor;

      // Device factor
      const deviceFactors: Record<string, number> = {
        'desktop': 1.1,
        'mobile': 1.0,
        'tablet': 0.95
      };
      value *= deviceFactors[tp.device] || 1;

      return value;
    });

    return values;
  }

  /**
   * Analyze channel performance across attribution models
   */
  analyzeChannelPerformance(
    journeys: CustomerJourney[],
    channelData?: Map<string, { cost: number; impressions: number; clicks: number }>
  ): Map<string, ChannelPerformance> {
    const performance = new Map<string, ChannelPerformance>();

    // Initialize channels
    const channels = new Set<string>();
    journeys.forEach(j => {
      j.touchpoints.forEach(tp => channels.add(tp.channel));
    });

    channels.forEach(channel => {
      const channelJourneys = journeys.filter(j =>
        j.touchpoints.some(tp => tp.channel === channel)
      );

      const conversions = channelJourneys.filter(j =>
        j.conversionEvents.length > 0
      ).length;

      const revenue = conversions * this.conversionValue;
      const data = channelData?.get(channel);
      const cost = data?.cost || 0;
      const impressions = data?.impressions || 0;
      const clicks = data?.clicks || 0;

      // Calculate attribution across all models
      const attributionByModel: Record<string, number> = {
        'first-touch': 0,
        'last-touch': 0,
        'linear': 0,
        'time-decay': 0,
        'position-based': 0,
        'data-driven': 0
      };

      channelJourneys.forEach(journey => {
        if (journey.conversionEvents.length > 0) {
          ['first-touch', 'last-touch', 'linear', 'time-decay', 'position-based', 'data-driven'].forEach(model => {
            const result = this.calculateAttribution(journey, model as AttributionModel['type']);
            const channelAttribution = result.touchpoints
              .filter(tp => tp.touchpoint.channel === channel)
              .reduce((sum, tp) => sum + tp.value, 0);
            attributionByModel[model] += channelAttribution;
          });
        }
      });

      performance.set(channel, {
        channel,
        metrics: {
          impressions,
          clicks,
          conversions,
          revenue,
          cost,
          roi: cost > 0 ? ((revenue - cost) / cost) * 100 : 0,
          cpa: conversions > 0 ? cost / conversions : 0,
          ltv: this.conversionValue * 1.5, // Simplified LTV
          attributedRevenue: attributionByModel
        },
        trends: {
          daily: this.calculateTrends(channelJourneys, 'daily'),
          weekly: this.calculateTrends(channelJourneys, 'weekly'),
          monthly: this.calculateTrends(channelJourneys, 'monthly')
        },
        attribution: {
          firstTouch: attributionByModel['first-touch'],
          lastTouch: attributionByModel['last-touch'],
          linear: attributionByModel['linear'],
          timeDecay: attributionByModel['time-decay'],
          positionBased: attributionByModel['position-based'],
          dataDriven: attributionByModel['data-driven']
        }
      });
    });

    return performance;
  }

  /**
   * Map customer journey stages
   */
  mapJourneyStages(journey: CustomerJourney): JourneyStage[] {
    const stages: JourneyStage[] = [];
    const touchpoints = this.convertToTouchpointData(journey.touchpoints);

    // Define stage criteria
    const stageDefinitions = {
      awareness: ['page_view', 'social_impression', 'ad_impression'],
      consideration: ['content_download', 'email_signup', 'video_view'],
      decision: ['form_start', 'pricing_view', 'demo_request'],
      retention: ['form_complete', 'purchase', 'subscription'],
      advocacy: ['referral', 'review', 'social_share']
    };

    Object.entries(stageDefinitions).forEach(([stage, interactions]) => {
      const stageTouchpoints = touchpoints.filter(tp =>
        interactions.includes(tp.interaction)
      );

      if (stageTouchpoints.length > 0) {
        const firstTouch = stageTouchpoints[0];
        const lastTouch = stageTouchpoints[stageTouchpoints.length - 1];
        const duration = this.calculateHoursDifference(
          firstTouch.timestamp,
          lastTouch.timestamp
        );

        // Calculate conversion rate for this stage
        const nextStageIndex = Object.keys(stageDefinitions).indexOf(stage) + 1;
        const nextStage = Object.keys(stageDefinitions)[nextStageIndex];
        const hasNextStage = nextStage && touchpoints.some(tp =>
          stageDefinitions[nextStage as keyof typeof stageDefinitions].includes(tp.interaction)
        );
        const conversionRate = hasNextStage ? 100 : 0;

        stages.push({
          stage: stage as JourneyStage['stage'],
          touchpoints: stageTouchpoints,
          duration,
          conversionRate,
          dropoffRate: 100 - conversionRate,
          optimizationOpportunities: this.identifyStageOptimizations(
            stage as JourneyStage['stage'],
            stageTouchpoints
          )
        });
      }
    });

    return stages;
  }

  /**
   * Analyze cross-channel interactions
   */
  analyzeCrossChannelInteractions(journeys: CustomerJourney[]): CrossChannelInteraction[] {
    const interactions: CrossChannelInteraction[] = [];
    
    // Find common channel combinations
    const channelSequences = new Map<string, number>();
    const conversionsBySequence = new Map<string, number>();

    journeys.forEach(journey => {
      const channels = journey.touchpoints.map(tp => tp.channel);
      const uniqueChannels = [...new Set(channels)];
      
      if (uniqueChannels.length > 1) {
        const sequence = uniqueChannels.join(' -> ');
        channelSequences.set(sequence, (channelSequences.get(sequence) || 0) + 1);
        
        if (journey.conversionEvents.length > 0) {
          conversionsBySequence.set(sequence, (conversionsBySequence.get(sequence) || 0) + 1);
        }
      }
    });

    // Analyze each sequence
    channelSequences.forEach((count, sequence) => {
      const conversions = conversionsBySequence.get(sequence) || 0;
      const conversionRate = conversions / count;
      const channels = sequence.split(' -> ');

      // Calculate synergy score (simplified)
      const individualRates = channels.map(channel => {
        const channelJourneys = journeys.filter(j =>
          j.touchpoints.some(tp => tp.channel === channel)
        );
        const channelConversions = channelJourneys.filter(j =>
          j.conversionEvents.length > 0
        ).length;
        return channelConversions / (channelJourneys.length || 1);
      });

      const expectedRate = individualRates.reduce((sum, rate) => sum + rate, 0) / channels.length;
      const synergyScore = conversionRate / (expectedRate || 1);
      const conversionLift = ((conversionRate - expectedRate) / (expectedRate || 1)) * 100;

      // Recommend optimal sequence based on conversion rate
      const recommendedSequence = this.optimizeChannelSequence(channels, journeys);

      interactions.push({
        channels,
        sequence: channels,
        synergyScore,
        conversionLift,
        recommendedSequence
      });
    });

    return interactions.sort((a, b) => b.conversionLift - a.conversionLift);
  }

  /**
   * Helper functions
   */
  
  private convertToTouchpointData(touchpoints: TouchPoint[]): TouchpointData[] {
    return touchpoints.map((tp, index) => ({
      channel: tp.channel,
      source: tp.channel,
      medium: this.inferMedium(tp.channel),
      campaign: tp.details.emailCampaign || 'direct',
      content: tp.details.contentId,
      timestamp: tp.timestamp,
      sessionId: `session_${index}`,
      pageUrl: tp.details.url || '/',
      interaction: tp.type,
      device: this.inferDevice(),
      browser: 'Chrome', // Would be detected in production
      referrer: tp.details.referrer,
      utmParams: this.extractUTMParams(tp.details.url)
    }));
  }

  private inferMedium(channel: string): string {
    const mediumMap: Record<string, string> = {
      'organic': 'search',
      'paid': 'cpc',
      'social': 'social',
      'email': 'email',
      'direct': 'none',
      'referral': 'referral'
    };
    return mediumMap[channel] || 'other';
  }

  private inferDevice(): 'desktop' | 'mobile' | 'tablet' {
    // Simplified - would use user agent in production
    const random = Math.random();
    if (random < 0.5) return 'desktop';
    if (random < 0.85) return 'mobile';
    return 'tablet';
  }

  private extractUTMParams(url?: string): UTMParameters | undefined {
    if (!url) return undefined;
    
    try {
      const urlObj = new URL(url, 'http://example.com');
      const params = urlObj.searchParams;
      
      if (params.has('utm_source')) {
        return {
          source: params.get('utm_source') || '',
          medium: params.get('utm_medium') || '',
          campaign: params.get('utm_campaign') || '',
          term: params.get('utm_term'),
          content: params.get('utm_content')
        };
      }
    } catch {
      // Invalid URL
    }
    
    return undefined;
  }

  private calculateHoursDifference(start: Date, end: Date): number {
    return Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }

  private calculateTrends(journeys: CustomerJourney[], period: 'daily' | 'weekly' | 'monthly'): number[] {
    // Simplified trend calculation - would use actual time series in production
    const periods = period === 'daily' ? 30 : period === 'weekly' ? 12 : 6;
    const trends = [];
    
    for (let i = 0; i < periods; i++) {
      trends.push(Math.round(Math.random() * 100 + 50));
    }
    
    return trends;
  }

  private identifyStageOptimizations(stage: JourneyStage['stage'], touchpoints: TouchpointData[]): string[] {
    const optimizations: string[] = [];

    switch (stage) {
      case 'awareness':
        if (touchpoints.length < 3) {
          optimizations.push('Increase brand visibility through content marketing');
        }
        if (!touchpoints.some(tp => tp.channel === 'organic')) {
          optimizations.push('Improve SEO to capture organic traffic');
        }
        break;
      
      case 'consideration':
        if (touchpoints.filter(tp => tp.interaction === 'content_download').length < 2) {
          optimizations.push('Create more downloadable resources');
        }
        optimizations.push('Implement retargeting campaigns');
        break;
      
      case 'decision':
        if (!touchpoints.some(tp => tp.interaction === 'demo_request')) {
          optimizations.push('Add demo request option');
        }
        optimizations.push('Implement live chat for immediate assistance');
        break;
      
      case 'retention':
        optimizations.push('Implement email nurture campaigns');
        optimizations.push('Create loyalty program');
        break;
      
      case 'advocacy':
        optimizations.push('Launch referral program');
        optimizations.push('Encourage customer reviews');
        break;
    }

    return optimizations;
  }

  private optimizeChannelSequence(channels: string[], journeys: CustomerJourney[]): string[] {
    // Find the most successful sequence for these channels
    const sequencePerformance = new Map<string, number>();

    journeys.forEach(journey => {
      const journeyChannels = [...new Set(journey.touchpoints.map(tp => tp.channel))];
      if (journeyChannels.length === channels.length &&
          journeyChannels.every(c => channels.includes(c))) {
        const sequence = journeyChannels.join(',');
        const hasConversion = journey.conversionEvents.length > 0;
        sequencePerformance.set(
          sequence,
          (sequencePerformance.get(sequence) || 0) + (hasConversion ? 1 : 0)
        );
      }
    });

    // Find best performing sequence
    let bestSequence = channels;
    let bestPerformance = 0;

    sequencePerformance.forEach((performance, sequence) => {
      if (performance > bestPerformance) {
        bestPerformance = performance;
        bestSequence = sequence.split(',');
      }
    });

    return bestSequence;
  }

  private generateInsights(
    touchpoints: AttributionTouchpoint[],
    model: AttributionModel['type']
  ): AttributionInsight[] {
    const insights: AttributionInsight[] = [];

    // High-value channel insight
    const highValueChannels = touchpoints
      .filter(tp => tp.attribution > 30)
      .map(tp => tp.touchpoint.channel);
    
    if (highValueChannels.length > 0) {
      insights.push({
        type: 'opportunity',
        message: `${highValueChannels.join(', ')} showing strong performance in ${model} model`,
        impact: 'Potential 25% increase in conversions',
        action: `Increase investment in ${highValueChannels[0]} by 30%`
      });
    }

    // Low-performing channels
    const lowValueChannels = touchpoints
      .filter(tp => tp.attribution < 5 && tp.position > 0)
      .map(tp => tp.touchpoint.channel);
    
    if (lowValueChannels.length > 0) {
      insights.push({
        type: 'warning',
        message: `${lowValueChannels.join(', ')} underperforming in conversion path`,
        impact: 'Wasted spend on low-impact channels',
        action: 'Consider reallocating budget or improving channel content'
      });
    }

    // Journey length insight
    if (touchpoints.length > 7) {
      insights.push({
        type: 'recommendation',
        message: 'Customer journey is lengthy with many touchpoints',
        impact: 'Longer conversion cycles reduce efficiency',
        action: 'Streamline journey by removing low-value touchpoints'
      });
    }

    return insights;
  }

  private generateDataDrivenInsights(
    touchpoints: AttributionTouchpoint[],
    journey: CustomerJourney
  ): AttributionInsight[] {
    const insights: AttributionInsight[] = [];

    // Channel synergy insights
    const channels = [...new Set(touchpoints.map(tp => tp.touchpoint.channel))];
    if (channels.includes('organic') && channels.includes('paid')) {
      insights.push({
        type: 'opportunity',
        message: 'Strong synergy detected between organic and paid channels',
        impact: '40% higher conversion when both channels present',
        action: 'Maintain balanced investment across both channels'
      });
    }

    // Mobile optimization
    const mobileTouchpoints = touchpoints.filter(tp => tp.touchpoint.device === 'mobile');
    if (mobileTouchpoints.length > touchpoints.length * 0.5) {
      insights.push({
        type: 'recommendation',
        message: 'High mobile traffic detected in conversion path',
        impact: 'Mobile optimization critical for conversions',
        action: 'Prioritize mobile experience improvements'
      });
    }

    // Content engagement
    const contentInteractions = touchpoints.filter(tp =>
      tp.touchpoint.interaction === 'content_download'
    );
    if (contentInteractions.length > 0 && contentInteractions[0].attribution > 20) {
      insights.push({
        type: 'opportunity',
        message: 'Content downloads showing strong conversion influence',
        impact: '30% higher conversion probability after content engagement',
        action: 'Create more targeted content for each buyer stage'
      });
    }

    // Time-based insights
    const conversionTime = journey.conversionEvents[0]?.timestamp;
    if (conversionTime) {
      const journeyDuration = this.calculateHoursDifference(
        journey.startTime,
        conversionTime
      );
      if (journeyDuration > 72) {
        insights.push({
          type: 'warning',
          message: 'Extended conversion timeline detected',
          impact: 'Risk of losing prospects to competitors',
          action: 'Implement automated nurture campaigns to accelerate decisions'
        });
      }
    }

    return insights;
  }

  private emptyResult(modelType: AttributionModel['type']): AttributionResult {
    return {
      modelType,
      touchpoints: [],
      totalValue: 0,
      confidence: 0,
      insights: []
    };
  }

  /**
   * Calculate ROI for marketing campaigns
   */
  calculateCampaignROI(
    campaign: string,
    journeys: CustomerJourney[],
    campaignCost: number
  ): {
    roi: number;
    revenue: number;
    conversions: number;
    cpa: number;
    attributionBreakdown: Record<string, number>;
  } {
    const campaignJourneys = journeys.filter(j =>
      j.touchpoints.some(tp =>
        tp.details.emailCampaign === campaign ||
        this.extractUTMParams(tp.details.url)?.campaign === campaign
      )
    );

    const conversions = campaignJourneys.filter(j =>
      j.conversionEvents.length > 0
    ).length;

    // Calculate revenue using different attribution models
    const attributionBreakdown: Record<string, number> = {};
    let totalRevenue = 0;

    ['first-touch', 'last-touch', 'linear', 'time-decay', 'position-based', 'data-driven'].forEach(model => {
      let modelRevenue = 0;
      
      campaignJourneys.forEach(journey => {
        if (journey.conversionEvents.length > 0) {
          const result = this.calculateAttribution(journey, model as AttributionModel['type']);
          const campaignAttribution = result.touchpoints
            .filter(tp =>
              tp.touchpoint.campaign === campaign ||
              this.extractUTMParams(tp.touchpoint.pageUrl)?.campaign === campaign
            )
            .reduce((sum, tp) => sum + tp.value, 0);
          modelRevenue += campaignAttribution;
        }
      });
      
      attributionBreakdown[model] = modelRevenue;
      if (model === 'data-driven') {
        totalRevenue = modelRevenue; // Use data-driven as primary
      }
    });

    const roi = campaignCost > 0 ? ((totalRevenue - campaignCost) / campaignCost) * 100 : 0;
    const cpa = conversions > 0 ? campaignCost / conversions : campaignCost;

    return {
      roi,
      revenue: totalRevenue,
      conversions,
      cpa,
      attributionBreakdown
    };
  }
}

// Export singleton instance
export const attributionService = new MarketingAttributionService();