/**
 * Marketing Attribution Algorithm Unit Tests
 * Tests the core business logic for multi-touch attribution modeling
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Marketing Attribution Types
interface TouchPoint {
  id: string;
  timestamp: number;
  channel: string;
  campaign: string;
  source: string;
  medium: string;
  content?: string;
  value?: number;
  sessionDuration: number;
  pagesViewed: number;
  conversionAssist: boolean;
}

interface AttributionResult {
  touchPoints: TouchPoint[];
  attributionWeights: Record<string, number>;
  model: 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based' | 'data-driven';
  totalValue: number;
  primaryChannel: string;
  assistingChannels: string[];
}

interface ConversionEvent {
  id: string;
  timestamp: number;
  value: number;
  type: 'lead' | 'opportunity' | 'customer';
  touchPoints: TouchPoint[];
}

// Attribution Model Implementations
class MarketingAttributionEngine {
  
  // First-touch attribution: 100% credit to first interaction
  calculateFirstTouchAttribution(touchPoints: TouchPoint[], conversionValue: number): AttributionResult {
    if (touchPoints.length === 0) {
      return this.createEmptyResult('first-touch', conversionValue);
    }

    const sortedTouchPoints = [...touchPoints].sort((a, b) => a.timestamp - b.timestamp);
    const firstTouch = sortedTouchPoints[0];
    
    const attributionWeights: Record<string, number> = {};
    attributionWeights[firstTouch.channel] = conversionValue;
    
    return {
      touchPoints: sortedTouchPoints,
      attributionWeights,
      model: 'first-touch',
      totalValue: conversionValue,
      primaryChannel: firstTouch.channel,
      assistingChannels: sortedTouchPoints.slice(1).map(tp => tp.channel).filter((channel, index, arr) => arr.indexOf(channel) === index)
    };
  }

  // Last-touch attribution: 100% credit to final interaction
  calculateLastTouchAttribution(touchPoints: TouchPoint[], conversionValue: number): AttributionResult {
    if (touchPoints.length === 0) {
      return this.createEmptyResult('last-touch', conversionValue);
    }

    const sortedTouchPoints = [...touchPoints].sort((a, b) => a.timestamp - b.timestamp);
    const lastTouch = sortedTouchPoints[sortedTouchPoints.length - 1];
    
    const attributionWeights: Record<string, number> = {};
    attributionWeights[lastTouch.channel] = conversionValue;
    
    return {
      touchPoints: sortedTouchPoints,
      attributionWeights,
      model: 'last-touch',
      totalValue: conversionValue,
      primaryChannel: lastTouch.channel,
      assistingChannels: sortedTouchPoints.slice(0, -1).map(tp => tp.channel).filter((channel, index, arr) => arr.indexOf(channel) === index)
    };
  }

  // Linear attribution: Equal credit across all touchpoints
  calculateLinearAttribution(touchPoints: TouchPoint[], conversionValue: number): AttributionResult {
    if (touchPoints.length === 0) {
      return this.createEmptyResult('linear', conversionValue);
    }

    const sortedTouchPoints = [...touchPoints].sort((a, b) => a.timestamp - b.timestamp);
    const creditPerTouch = conversionValue / sortedTouchPoints.length;
    
    const attributionWeights: Record<string, number> = {};
    
    sortedTouchPoints.forEach(touchPoint => {
      if (!attributionWeights[touchPoint.channel]) {
        attributionWeights[touchPoint.channel] = 0;
      }
      attributionWeights[touchPoint.channel] += creditPerTouch;
    });
    
    const channels = Object.keys(attributionWeights);
    return {
      touchPoints: sortedTouchPoints,
      attributionWeights,
      model: 'linear',
      totalValue: conversionValue,
      primaryChannel: channels.reduce((a, b) => attributionWeights[a] > attributionWeights[b] ? a : b),
      assistingChannels: channels.filter(channel => channel !== channels.reduce((a, b) => attributionWeights[a] > attributionWeights[b] ? a : b))
    };
  }

  // Time-decay attribution: More recent touchpoints get higher credit
  calculateTimeDecayAttribution(touchPoints: TouchPoint[], conversionValue: number, halfLifeHours: number = 168): AttributionResult {
    if (touchPoints.length === 0) {
      return this.createEmptyResult('time-decay', conversionValue);
    }

    const sortedTouchPoints = [...touchPoints].sort((a, b) => a.timestamp - b.timestamp);
    const conversionTime = Math.max(...sortedTouchPoints.map(tp => tp.timestamp));
    
    // Calculate decay weights
    const decayWeights = sortedTouchPoints.map(touchPoint => {
      const hoursFromConversion = (conversionTime - touchPoint.timestamp) / (1000 * 60 * 60);
      return Math.pow(0.5, hoursFromConversion / halfLifeHours);
    });
    
    const totalWeight = decayWeights.reduce((sum, weight) => sum + weight, 0);
    const attributionWeights: Record<string, number> = {};
    
    sortedTouchPoints.forEach((touchPoint, index) => {
      const credit = (decayWeights[index] / totalWeight) * conversionValue;
      if (!attributionWeights[touchPoint.channel]) {
        attributionWeights[touchPoint.channel] = 0;
      }
      attributionWeights[touchPoint.channel] += credit;
    });
    
    const channels = Object.keys(attributionWeights);
    return {
      touchPoints: sortedTouchPoints,
      attributionWeights,
      model: 'time-decay',
      totalValue: conversionValue,
      primaryChannel: channels.reduce((a, b) => attributionWeights[a] > attributionWeights[b] ? a : b),
      assistingChannels: channels.filter(channel => channel !== channels.reduce((a, b) => attributionWeights[a] > attributionWeights[b] ? a : b))
    };
  }

  // Position-based (U-shaped) attribution: 40% first, 40% last, 20% middle
  calculatePositionBasedAttribution(touchPoints: TouchPoint[], conversionValue: number): AttributionResult {
    if (touchPoints.length === 0) {
      return this.createEmptyResult('position-based', conversionValue);
    }

    if (touchPoints.length === 1) {
      return this.calculateFirstTouchAttribution(touchPoints, conversionValue);
    }

    const sortedTouchPoints = [...touchPoints].sort((a, b) => a.timestamp - b.timestamp);
    const attributionWeights: Record<string, number> = {};
    
    // First touch: 40%
    const firstTouch = sortedTouchPoints[0];
    attributionWeights[firstTouch.channel] = conversionValue * 0.4;
    
    // Last touch: 40%
    const lastTouch = sortedTouchPoints[sortedTouchPoints.length - 1];
    if (!attributionWeights[lastTouch.channel]) {
      attributionWeights[lastTouch.channel] = 0;
    }
    attributionWeights[lastTouch.channel] += conversionValue * 0.4;
    
    // Middle touches: 20% divided equally
    if (sortedTouchPoints.length > 2) {
      const middleTouches = sortedTouchPoints.slice(1, -1);
      const creditPerMiddleTouch = (conversionValue * 0.2) / middleTouches.length;
      
      middleTouches.forEach(touchPoint => {
        if (!attributionWeights[touchPoint.channel]) {
          attributionWeights[touchPoint.channel] = 0;
        }
        attributionWeights[touchPoint.channel] += creditPerMiddleTouch;
      });
    }
    
    const channels = Object.keys(attributionWeights);
    return {
      touchPoints: sortedTouchPoints,
      attributionWeights,
      model: 'position-based',
      totalValue: conversionValue,
      primaryChannel: channels.reduce((a, b) => attributionWeights[a] > attributionWeights[b] ? a : b),
      assistingChannels: channels.filter(channel => channel !== channels.reduce((a, b) => attributionWeights[a] > attributionWeights[b] ? a : b))
    };
  }

  // Data-driven attribution based on historical performance
  calculateDataDrivenAttribution(touchPoints: TouchPoint[], conversionValue: number, historicalData?: any): AttributionResult {
    if (touchPoints.length === 0) {
      return this.createEmptyResult('data-driven', conversionValue);
    }

    // Simplified data-driven model based on channel performance
    const channelPerformanceWeights: Record<string, number> = {
      'organic_search': 1.2,
      'paid_search': 1.1,
      'social_media': 0.9,
      'email': 1.0,
      'direct': 1.3,
      'referral': 1.15,
      'content_marketing': 1.05,
      'paid_social': 0.95,
      'display': 0.8,
      'affiliate': 0.85
    };

    const sortedTouchPoints = [...touchPoints].sort((a, b) => a.timestamp - b.timestamp);
    
    // Calculate weighted importance for each touchpoint
    let totalWeightedImportance = 0;
    const touchPointImportance = sortedTouchPoints.map((touchPoint, index) => {
      const channelWeight = channelPerformanceWeights[touchPoint.channel] || 1.0;
      const positionWeight = this.calculatePositionWeight(index, sortedTouchPoints.length);
      const engagementWeight = this.calculateEngagementWeight(touchPoint);
      
      const importance = channelWeight * positionWeight * engagementWeight;
      totalWeightedImportance += importance;
      return importance;
    });

    const attributionWeights: Record<string, number> = {};
    
    sortedTouchPoints.forEach((touchPoint, index) => {
      const credit = (touchPointImportance[index] / totalWeightedImportance) * conversionValue;
      if (!attributionWeights[touchPoint.channel]) {
        attributionWeights[touchPoint.channel] = 0;
      }
      attributionWeights[touchPoint.channel] += credit;
    });
    
    const channels = Object.keys(attributionWeights);
    return {
      touchPoints: sortedTouchPoints,
      attributionWeights,
      model: 'data-driven',
      totalValue: conversionValue,
      primaryChannel: channels.reduce((a, b) => attributionWeights[a] > attributionWeights[b] ? a : b),
      assistingChannels: channels.filter(channel => channel !== channels.reduce((a, b) => attributionWeights[a] > attributionWeights[b] ? a : b))
    };
  }

  private calculatePositionWeight(index: number, totalTouchPoints: number): number {
    if (totalTouchPoints === 1) return 1.0;
    if (index === 0) return 1.2; // First touch bonus
    if (index === totalTouchPoints - 1) return 1.3; // Last touch bonus
    return 0.8; // Middle touches
  }

  private calculateEngagementWeight(touchPoint: TouchPoint): number {
    let weight = 1.0;
    
    // Session duration weight
    if (touchPoint.sessionDuration > 300) weight += 0.3; // 5+ minutes
    else if (touchPoint.sessionDuration > 120) weight += 0.2; // 2+ minutes
    else if (touchPoint.sessionDuration > 60) weight += 0.1; // 1+ minute
    
    // Pages viewed weight
    if (touchPoint.pagesViewed > 5) weight += 0.2;
    else if (touchPoint.pagesViewed > 2) weight += 0.1;
    
    // Conversion assist weight
    if (touchPoint.conversionAssist) weight += 0.15;
    
    return weight;
  }

  private createEmptyResult(model: any, totalValue: number): AttributionResult {
    return {
      touchPoints: [],
      attributionWeights: {},
      model,
      totalValue,
      primaryChannel: '',
      assistingChannels: []
    };
  }

  // Multi-model comparison
  compareAttributionModels(touchPoints: TouchPoint[], conversionValue: number): Record<string, AttributionResult> {
    return {
      'first-touch': this.calculateFirstTouchAttribution(touchPoints, conversionValue),
      'last-touch': this.calculateLastTouchAttribution(touchPoints, conversionValue),
      'linear': this.calculateLinearAttribution(touchPoints, conversionValue),
      'time-decay': this.calculateTimeDecayAttribution(touchPoints, conversionValue),
      'position-based': this.calculatePositionBasedAttribution(touchPoints, conversionValue),
      'data-driven': this.calculateDataDrivenAttribution(touchPoints, conversionValue)
    };
  }
}

// Helper function for variance calculation
const calculateAttributionVariance = (weights: Record<string, number>): number => {
  const values = Object.values(weights);
  if (values.length === 0) return 0;
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  return variance;
};

describe('Marketing Attribution Engine', () => {
  let attributionEngine: MarketingAttributionEngine;
  let sampleTouchPoints: TouchPoint[];
  let sampleConversionValue: number;

  beforeEach(() => {
    attributionEngine = new MarketingAttributionEngine();
    sampleConversionValue = 1000;
    
    // Create realistic customer journey
    sampleTouchPoints = [
      {
        id: 'touch-1',
        timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000), // 7 days ago
        channel: 'organic_search',
        campaign: 'seo-content',
        source: 'google',
        medium: 'organic',
        sessionDuration: 180,
        pagesViewed: 3,
        conversionAssist: false
      },
      {
        id: 'touch-2',
        timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000), // 5 days ago
        channel: 'email',
        campaign: 'nurture-sequence',
        source: 'newsletter',
        medium: 'email',
        sessionDuration: 240,
        pagesViewed: 4,
        conversionAssist: true
      },
      {
        id: 'touch-3',
        timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
        channel: 'paid_search',
        campaign: 'google-ads',
        source: 'google',
        medium: 'cpc',
        sessionDuration: 320,
        pagesViewed: 5,
        conversionAssist: true
      },
      {
        id: 'touch-4',
        timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000), // 1 day ago
        channel: 'direct',
        campaign: 'direct-visit',
        source: 'direct',
        medium: 'none',
        sessionDuration: 450,
        pagesViewed: 7,
        conversionAssist: false
      }
    ];
  });

  describe('First-Touch Attribution', () => {
    it('should assign 100% credit to the first touchpoint', () => {
      const result = attributionEngine.calculateFirstTouchAttribution(sampleTouchPoints, sampleConversionValue);
      
      expect(result.model).toBe('first-touch');
      expect(result.totalValue).toBe(sampleConversionValue);
      expect(result.attributionWeights['organic_search']).toBe(sampleConversionValue);
      expect(result.primaryChannel).toBe('organic_search');
      expect(result.assistingChannels).toContain('email');
      expect(result.assistingChannels).toContain('paid_search');
      expect(result.assistingChannels).toContain('direct');
    });

    it('should handle single touchpoint', () => {
      const singleTouch = [sampleTouchPoints[0]];
      const result = attributionEngine.calculateFirstTouchAttribution(singleTouch, sampleConversionValue);
      
      expect(result.attributionWeights['organic_search']).toBe(sampleConversionValue);
      expect(result.assistingChannels).toHaveLength(0);
    });

    it('should handle empty touchpoints', () => {
      const result = attributionEngine.calculateFirstTouchAttribution([], sampleConversionValue);
      
      expect(result.totalValue).toBe(sampleConversionValue);
      expect(Object.keys(result.attributionWeights)).toHaveLength(0);
      expect(result.primaryChannel).toBe('');
    });
  });

  describe('Last-Touch Attribution', () => {
    it('should assign 100% credit to the final touchpoint', () => {
      const result = attributionEngine.calculateLastTouchAttribution(sampleTouchPoints, sampleConversionValue);
      
      expect(result.model).toBe('last-touch');
      expect(result.totalValue).toBe(sampleConversionValue);
      expect(result.attributionWeights['direct']).toBe(sampleConversionValue);
      expect(result.primaryChannel).toBe('direct');
      expect(result.assistingChannels).toContain('organic_search');
      expect(result.assistingChannels).toContain('email');
      expect(result.assistingChannels).toContain('paid_search');
    });

    it('should handle reverse chronological order correctly', () => {
      const shuffledTouchPoints = [...sampleTouchPoints].reverse();
      const result = attributionEngine.calculateLastTouchAttribution(shuffledTouchPoints, sampleConversionValue);
      
      expect(result.attributionWeights['direct']).toBe(sampleConversionValue);
      expect(result.primaryChannel).toBe('direct');
    });
  });

  describe('Linear Attribution', () => {
    it('should distribute credit equally across all touchpoints', () => {
      const result = attributionEngine.calculateLinearAttribution(sampleTouchPoints, sampleConversionValue);
      
      expect(result.model).toBe('linear');
      expect(result.totalValue).toBe(sampleConversionValue);
      
      const expectedCreditPerTouch = sampleConversionValue / sampleTouchPoints.length;
      expect(result.attributionWeights['organic_search']).toBe(expectedCreditPerTouch);
      expect(result.attributionWeights['email']).toBe(expectedCreditPerTouch);
      expect(result.attributionWeights['paid_search']).toBe(expectedCreditPerTouch);
      expect(result.attributionWeights['direct']).toBe(expectedCreditPerTouch);
    });

    it('should combine credit for multiple touchpoints from same channel', () => {
      const touchPointsWithDuplicateChannels = [
        ...sampleTouchPoints,
        {
          ...sampleTouchPoints[0],
          id: 'touch-5',
          timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000)
        }
      ];
      
      const result = attributionEngine.calculateLinearAttribution(touchPointsWithDuplicateChannels, sampleConversionValue);
      
      const expectedCreditPerTouch = sampleConversionValue / touchPointsWithDuplicateChannels.length;
      expect(result.attributionWeights['organic_search']).toBe(expectedCreditPerTouch * 2);
    });
  });

  describe('Time-Decay Attribution', () => {
    it('should give more credit to recent touchpoints', () => {
      const result = attributionEngine.calculateTimeDecayAttribution(sampleTouchPoints, sampleConversionValue);
      
      expect(result.model).toBe('time-decay');
      expect(result.totalValue).toBe(sampleConversionValue);
      
      // More recent touchpoints should have higher credit
      expect(result.attributionWeights['direct']).toBeGreaterThan(result.attributionWeights['organic_search']);
      expect(result.attributionWeights['paid_search']).toBeGreaterThan(result.attributionWeights['email']);
    });

    it('should handle custom half-life parameters', () => {
      const result1 = attributionEngine.calculateTimeDecayAttribution(sampleTouchPoints, sampleConversionValue, 24); // 1 day half-life
      const result2 = attributionEngine.calculateTimeDecayAttribution(sampleTouchPoints, sampleConversionValue, 168); // 1 week half-life
      
      // Shorter half-life should give even more credit to recent touchpoints
      const directCreditRatio1 = result1.attributionWeights['direct'] / result1.attributionWeights['organic_search'];
      const directCreditRatio2 = result2.attributionWeights['direct'] / result2.attributionWeights['organic_search'];
      
      expect(directCreditRatio1).toBeGreaterThan(directCreditRatio2);
    });
  });

  describe('Position-Based Attribution', () => {
    it('should assign 40% to first touch, 40% to last touch, 20% to middle', () => {
      const result = attributionEngine.calculatePositionBasedAttribution(sampleTouchPoints, sampleConversionValue);
      
      expect(result.model).toBe('position-based');
      expect(result.totalValue).toBe(sampleConversionValue);
      
      // First touch: 40%
      expect(result.attributionWeights['organic_search']).toBe(sampleConversionValue * 0.4);
      
      // Last touch: 40%
      expect(result.attributionWeights['direct']).toBe(sampleConversionValue * 0.4);
      
      // Middle touches: 20% split between email and paid_search
      const middleCredit = (sampleConversionValue * 0.2) / 2;
      expect(result.attributionWeights['email']).toBe(middleCredit);
      expect(result.attributionWeights['paid_search']).toBe(middleCredit);
    });

    it('should handle two touchpoints correctly', () => {
      const twoTouchPoints = [sampleTouchPoints[0], sampleTouchPoints[3]];
      const result = attributionEngine.calculatePositionBasedAttribution(twoTouchPoints, sampleConversionValue);
      
      expect(result.attributionWeights['organic_search']).toBe(sampleConversionValue * 0.4);
      expect(result.attributionWeights['direct']).toBe(sampleConversionValue * 0.4);
    });

    it('should handle single touchpoint by giving 100% credit', () => {
      const singleTouch = [sampleTouchPoints[0]];
      const result = attributionEngine.calculatePositionBasedAttribution(singleTouch, sampleConversionValue);
      
      expect(result.attributionWeights['organic_search']).toBe(sampleConversionValue);
    });
  });

  describe('Data-Driven Attribution', () => {
    it('should weight touchpoints based on channel performance and engagement', () => {
      const result = attributionEngine.calculateDataDrivenAttribution(sampleTouchPoints, sampleConversionValue);
      
      expect(result.model).toBe('data-driven');
      expect(result.totalValue).toBe(sampleConversionValue);
      
      // Direct traffic should get high attribution due to high performance weight
      expect(result.attributionWeights['direct']).toBeGreaterThan(0);
      
      // All touchpoints should receive some credit
      Object.values(result.attributionWeights).forEach(credit => {
        expect(credit).toBeGreaterThan(0);
      });
    });

    it('should consider engagement metrics in attribution', () => {
      const highEngagementTouchPoints = sampleTouchPoints.map(tp => ({
        ...tp,
        sessionDuration: 600,
        pagesViewed: 10,
        conversionAssist: true
      }));
      
      const lowEngagementTouchPoints = sampleTouchPoints.map(tp => ({
        ...tp,
        sessionDuration: 30,
        pagesViewed: 1,
        conversionAssist: false
      }));
      
      const highResult = attributionEngine.calculateDataDrivenAttribution(highEngagementTouchPoints, sampleConversionValue);
      const lowResult = attributionEngine.calculateDataDrivenAttribution(lowEngagementTouchPoints, sampleConversionValue);
      
      // High engagement should result in more even distribution (less position bias)
      const highEngagementVariance = calculateAttributionVariance(highResult.attributionWeights);
      const lowEngagementVariance = calculateAttributionVariance(lowResult.attributionWeights);
      
      expect(highEngagementVariance).toBeLessThan(lowEngagementVariance);
    });
  });

  describe('Multi-Model Comparison', () => {
    it('should return results for all attribution models', () => {
      const comparison = attributionEngine.compareAttributionModels(sampleTouchPoints, sampleConversionValue);
      
      expect(comparison).toHaveProperty('first-touch');
      expect(comparison).toHaveProperty('last-touch');
      expect(comparison).toHaveProperty('linear');
      expect(comparison).toHaveProperty('time-decay');
      expect(comparison).toHaveProperty('position-based');
      expect(comparison).toHaveProperty('data-driven');
      
      // All models should have same total value
      Object.values(comparison).forEach(result => {
        expect(result.totalValue).toBe(sampleConversionValue);
      });
    });

    it('should show different channel attributions across models', () => {
      const comparison = attributionEngine.compareAttributionModels(sampleTouchPoints, sampleConversionValue);
      
      // First-touch should favor first channel
      expect(comparison['first-touch'].primaryChannel).toBe('organic_search');
      
      // Last-touch should favor last channel  
      expect(comparison['last-touch'].primaryChannel).toBe('direct');
      
      // Different models should have different primary channels or similar attribution spread
      const primaryChannels = Object.values(comparison).map(result => result.primaryChannel);
      const uniquePrimaryChannels = [...new Set(primaryChannels)];
      expect(uniquePrimaryChannels.length).toBeGreaterThan(1);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle touchpoints with same timestamp', () => {
      const sameTimeTouchPoints = sampleTouchPoints.map(tp => ({
        ...tp,
        timestamp: Date.now()
      }));
      
      const result = attributionEngine.calculateLinearAttribution(sameTimeTouchPoints, sampleConversionValue);
      expect(result.totalValue).toBe(sampleConversionValue);
    });

    it('should handle zero conversion value', () => {
      const result = attributionEngine.calculateLinearAttribution(sampleTouchPoints, 0);
      expect(result.totalValue).toBe(0);
      Object.values(result.attributionWeights).forEach(credit => {
        expect(credit).toBe(0);
      });
    });

    it('should handle negative conversion value', () => {
      const negativeValue = -500;
      const result = attributionEngine.calculateLinearAttribution(sampleTouchPoints, negativeValue);
      expect(result.totalValue).toBe(negativeValue);
      
      // Credits should sum to negative value
      const totalCredit = Object.values(result.attributionWeights).reduce((sum, credit) => sum + credit, 0);
      expect(totalCredit).toBeCloseTo(negativeValue);
    });

    it('should handle touchpoints with missing or invalid data', () => {
      const invalidTouchPoints = [
        { ...sampleTouchPoints[0], sessionDuration: -1, pagesViewed: -1 },
        { ...sampleTouchPoints[1], channel: '', source: '' }
      ];
      
      const result = attributionEngine.calculateDataDrivenAttribution(invalidTouchPoints, sampleConversionValue);
      expect(result.totalValue).toBe(sampleConversionValue);
      expect(Object.keys(result.attributionWeights)).toHaveLength(2); // Should still process both touchpoints
    });
  });

  describe('Business Logic Validation', () => {
    it('should correctly identify primary vs assisting channels', () => {
      const result = attributionEngine.calculatePositionBasedAttribution(sampleTouchPoints, sampleConversionValue);
      
      expect(result.primaryChannel).toBeDefined();
      expect(result.assistingChannels).toBeInstanceOf(Array);
      expect(result.assistingChannels).not.toContain(result.primaryChannel);
      
      // Total unique channels should equal primary + assisting
      const uniqueChannels = [...new Set(sampleTouchPoints.map(tp => tp.channel))];
      expect(result.assistingChannels.length + 1).toBe(uniqueChannels.length);
    });

    it('should maintain attribution total across all models', () => {
      const comparison = attributionEngine.compareAttributionModels(sampleTouchPoints, sampleConversionValue);
      
      Object.values(comparison).forEach(result => {
        const attributionTotal = Object.values(result.attributionWeights).reduce((sum, credit) => sum + credit, 0);
        expect(attributionTotal).toBeCloseTo(sampleConversionValue, 2);
      });
    });

    it('should handle complex customer journeys with multiple visits per channel', () => {
      const complexJourney: TouchPoint[] = [
        // Multiple organic search visits
        { id: '1', timestamp: Date.now() - 10000, channel: 'organic_search', campaign: 'seo', source: 'google', medium: 'organic', sessionDuration: 120, pagesViewed: 2, conversionAssist: false },
        { id: '2', timestamp: Date.now() - 8000, channel: 'organic_search', campaign: 'seo', source: 'google', medium: 'organic', sessionDuration: 180, pagesViewed: 3, conversionAssist: true },
        
        // Email sequence
        { id: '3', timestamp: Date.now() - 6000, channel: 'email', campaign: 'welcome', source: 'email', medium: 'email', sessionDuration: 90, pagesViewed: 2, conversionAssist: true },
        { id: '4', timestamp: Date.now() - 4000, channel: 'email', campaign: 'nurture', source: 'email', medium: 'email', sessionDuration: 150, pagesViewed: 4, conversionAssist: true },
        
        // Paid conversion
        { id: '5', timestamp: Date.now() - 1000, channel: 'paid_search', campaign: 'conversion', source: 'google', medium: 'cpc', sessionDuration: 300, pagesViewed: 5, conversionAssist: false }
      ];
      
      const result = attributionEngine.calculateDataDrivenAttribution(complexJourney, sampleConversionValue);
      
      expect(result.touchPoints).toHaveLength(5);
      expect(Object.keys(result.attributionWeights)).toHaveLength(3); // 3 unique channels
      
      // Each channel should receive appropriate credit
      expect(result.attributionWeights['organic_search']).toBeGreaterThan(0);
      expect(result.attributionWeights['email']).toBeGreaterThan(0);
      expect(result.attributionWeights['paid_search']).toBeGreaterThan(0);
    });
  });
});