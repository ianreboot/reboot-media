/**
 * Conversion Optimization Service
 * Dynamic personalization and conversion rate optimization
 */

import { LeadScore } from './leadScoring.js';
import { CustomerJourney, TouchPoint } from './leadAnalytics.js';
import { LeadFormData } from '../validators/formValidators.js';

export interface PersonalizationStrategy {
  type: 'content' | 'pricing' | 'urgency' | 'social_proof' | 'scarcity';
  priority: number;
  elements: PersonalizationElement[];
  triggers: ConversionTrigger[];
  expectedLift: number; // Percentage improvement expected
}

export interface PersonalizationElement {
  id: string;
  type: 'headline' | 'cta' | 'form_field' | 'testimonial' | 'pricing' | 'banner';
  original: string;
  personalized: string;
  confidence: number;
  testVariant?: 'A' | 'B' | 'C';
}

export interface ConversionTrigger {
  type: 'exit_intent' | 'time_on_page' | 'scroll_depth' | 'idle_time' | 'return_visit';
  threshold: number;
  action: string;
  priority: number;
}

export interface FormOptimization {
  fieldOrder: string[];
  conditionalFields: ConditionalField[];
  progressiveDisclosure: boolean;
  smartDefaults: Record<string, any>;
  validationTiming: 'realtime' | 'onblur' | 'onsubmit';
  abandonmentRecovery: AbandonmentStrategy;
}

export interface ConditionalField {
  fieldName: string;
  showIf: {
    field: string;
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
  };
  required: boolean;
}

export interface AbandonmentStrategy {
  enabled: boolean;
  triggerDelay: number; // milliseconds
  recoveryMethod: 'email' | 'retargeting' | 'notification' | 'discount';
  message: string;
  incentive?: string;
}

export interface DynamicPricing {
  basePrice: number;
  adjustments: PriceAdjustment[];
  displayStrategy: 'value' | 'discount' | 'urgency' | 'comparison';
  psychologicalPricing: boolean;
}

export interface PriceAdjustment {
  condition: string;
  type: 'percentage' | 'fixed';
  value: number;
  reason: string;
}

export interface ABTestConfig {
  testId: string;
  name: string;
  hypothesis: string;
  variants: TestVariant[];
  metrics: string[];
  sampleSize: number;
  confidence: number;
  status: 'planning' | 'running' | 'completed';
}

export interface TestVariant {
  id: string;
  name: string;
  changes: Record<string, any>;
  traffic: number; // Percentage of traffic
  conversions: number;
  views: number;
}

/**
 * Generate personalization strategy based on lead score and journey
 */
export function generatePersonalizationStrategy(
  score: LeadScore,
  journey?: CustomerJourney
): PersonalizationStrategy[] {
  const strategies: PersonalizationStrategy[] = [];

  // Content personalization based on lead tier
  if (score.tier === 'Hot') {
    strategies.push({
      type: 'content',
      priority: 1,
      elements: [
        {
          id: 'headline_hot',
          type: 'headline',
          original: 'Transform Your Marketing Strategy',
          personalized: 'Ready to Scale? Let\'s Accelerate Your Growth Today',
          confidence: 0.85,
          testVariant: 'A'
        },
        {
          id: 'cta_hot',
          type: 'cta',
          original: 'Get Started',
          personalized: 'Schedule Your Strategy Call Now',
          confidence: 0.90,
          testVariant: 'A'
        }
      ],
      triggers: [
        {
          type: 'time_on_page',
          threshold: 5000, // 5 seconds
          action: 'show_personalized_content',
          priority: 1
        }
      ],
      expectedLift: 35
    });

    // Urgency for hot leads
    strategies.push({
      type: 'urgency',
      priority: 2,
      elements: [
        {
          id: 'urgency_banner',
          type: 'banner',
          original: '',
          personalized: 'Limited availability this quarter - Only 2 spots remaining',
          confidence: 0.75,
          testVariant: 'B'
        }
      ],
      triggers: [
        {
          type: 'scroll_depth',
          threshold: 50,
          action: 'show_urgency_banner',
          priority: 2
        }
      ],
      expectedLift: 25
    });
  } else if (score.tier === 'Warm') {
    strategies.push({
      type: 'social_proof',
      priority: 1,
      elements: [
        {
          id: 'testimonial_warm',
          type: 'testimonial',
          original: 'Generic testimonial',
          personalized: `"Similar ${score.demographic >= 60 ? 'enterprise' : 'growing'} companies saw 3x ROI"`,
          confidence: 0.70,
          testVariant: 'B'
        }
      ],
      triggers: [
        {
          type: 'time_on_page',
          threshold: 15000, // 15 seconds
          action: 'show_social_proof',
          priority: 1
        }
      ],
      expectedLift: 20
    });
  } else {
    // Educational content for cold leads
    strategies.push({
      type: 'content',
      priority: 1,
      elements: [
        {
          id: 'headline_cold',
          type: 'headline',
          original: 'Transform Your Marketing Strategy',
          personalized: 'Learn How Top Companies 10x Their Marketing ROI',
          confidence: 0.60,
          testVariant: 'C'
        }
      ],
      triggers: [
        {
          type: 'exit_intent',
          threshold: 0,
          action: 'show_educational_content',
          priority: 1
        }
      ],
      expectedLift: 15
    });
  }

  // Pricing strategy based on company size
  if (score.demographic >= 70) {
    strategies.push({
      type: 'pricing',
      priority: 3,
      elements: [
        {
          id: 'pricing_enterprise',
          type: 'pricing',
          original: 'Contact for pricing',
          personalized: 'Enterprise solutions starting at $15,000/month',
          confidence: 0.65,
          testVariant: 'A'
        }
      ],
      triggers: [
        {
          type: 'scroll_depth',
          threshold: 70,
          action: 'show_enterprise_pricing',
          priority: 3
        }
      ],
      expectedLift: 18
    });
  }

  return strategies.sort((a, b) => a.priority - b.priority);
}

/**
 * Optimize form based on lead scoring and behavior
 */
export function optimizeForm(
  score: LeadScore,
  previousAttempts: number = 0
): FormOptimization {
  const optimization: FormOptimization = {
    fieldOrder: [],
    conditionalFields: [],
    progressiveDisclosure: false,
    smartDefaults: {},
    validationTiming: 'onblur',
    abandonmentRecovery: {
      enabled: true,
      triggerDelay: 10000,
      recoveryMethod: 'notification',
      message: 'Need help? Chat with our team',
      incentive: undefined
    }
  };

  // Hot leads - minimize friction
  if (score.tier === 'Hot') {
    optimization.fieldOrder = [
      'name',
      'email',
      'company',
      'specificIssue' // Only essential fields first
    ];
    
    optimization.progressiveDisclosure = true;
    optimization.validationTiming = 'onsubmit'; // Less intrusive
    
    optimization.conditionalFields = [
      {
        fieldName: 'timeline',
        showIf: { field: 'specificIssue', operator: 'contains', value: 'urgent' },
        required: false
      }
    ];

    optimization.abandonmentRecovery = {
      enabled: true,
      triggerDelay: 5000, // Faster intervention
      recoveryMethod: 'notification',
      message: 'Quick question? Call us directly at 1-800-MARKETING',
      incentive: 'Free 30-min consultation'
    };
  } 
  // Warm leads - balanced approach
  else if (score.tier === 'Warm') {
    optimization.fieldOrder = [
      'name',
      'email',
      'company',
      'revenue',
      'specificIssue',
      'timeline'
    ];
    
    optimization.progressiveDisclosure = true;
    optimization.validationTiming = 'onblur';
    
    optimization.smartDefaults = {
      timeline: '1-3months' // Most common for warm leads
    };

    optimization.abandonmentRecovery = {
      enabled: true,
      triggerDelay: 8000,
      recoveryMethod: 'email',
      message: 'Save your progress and continue later',
      incentive: 'Get our free marketing audit'
    };
  } 
  // Cold leads - maximum information gathering
  else {
    optimization.fieldOrder = [
      'name',
      'email',
      'company',
      'website',
      'revenue',
      'teamSize',
      'industry',
      'specificIssue',
      'currentMarketing',
      'timeline'
    ];
    
    optimization.progressiveDisclosure = false; // Show all fields
    optimization.validationTiming = 'realtime'; // Help them complete correctly
    
    optimization.abandonmentRecovery = {
      enabled: true,
      triggerDelay: 15000,
      recoveryMethod: 'retargeting',
      message: 'Not ready? Download our free guide first',
      incentive: 'Free Marketing Strategy Template'
    };
  }

  // Adjust based on previous attempts
  if (previousAttempts > 0) {
    // Simplify form for returning visitors
    optimization.fieldOrder = optimization.fieldOrder.slice(0, 4);
    optimization.abandonmentRecovery.message = 'Welcome back! Need assistance?';
    optimization.abandonmentRecovery.triggerDelay = 3000; // Faster help
  }

  return optimization;
}

/**
 * Generate dynamic pricing based on lead characteristics
 */
export function generateDynamicPricing(
  score: LeadScore,
  basePrice: number = 5000
): DynamicPricing {
  const pricing: DynamicPricing = {
    basePrice,
    adjustments: [],
    displayStrategy: 'value',
    psychologicalPricing: true
  };

  // Revenue-based pricing
  if (score.demographic >= 80) {
    pricing.adjustments.push({
      condition: 'enterprise_revenue',
      type: 'percentage',
      value: 150, // 150% increase
      reason: 'Enterprise-level service and support'
    });
    pricing.displayStrategy = 'value';
  } else if (score.demographic >= 60) {
    pricing.adjustments.push({
      condition: 'midmarket_revenue',
      type: 'percentage',
      value: 50, // 50% increase
      reason: 'Advanced features and priority support'
    });
    pricing.displayStrategy = 'comparison';
  }

  // Urgency-based pricing
  if (score.intent >= 80) {
    pricing.adjustments.push({
      condition: 'urgent_timeline',
      type: 'percentage',
      value: 20, // 20% premium for rush
      reason: 'Priority implementation'
    });
    pricing.displayStrategy = 'urgency';
  }

  // Industry premiums
  if (score.qualificationReasons.some(r => r.includes('High-value industry'))) {
    pricing.adjustments.push({
      condition: 'premium_industry',
      type: 'percentage',
      value: 25,
      reason: 'Industry-specific expertise'
    });
  }

  // Calculate final price
  let finalPrice = basePrice;
  pricing.adjustments.forEach(adjustment => {
    if (adjustment.type === 'percentage') {
      finalPrice *= (1 + adjustment.value / 100);
    } else {
      finalPrice += adjustment.value;
    }
  });

  // Apply psychological pricing
  if (pricing.psychologicalPricing) {
    if (finalPrice > 10000) {
      finalPrice = Math.floor(finalPrice / 1000) * 1000 - 1; // e.g., $14,999
    } else if (finalPrice > 1000) {
      finalPrice = Math.floor(finalPrice / 100) * 100 - 1; // e.g., $4,999
    } else {
      finalPrice = Math.floor(finalPrice / 10) * 10 - 1; // e.g., $499
    }
  }

  pricing.basePrice = Math.round(finalPrice);

  return pricing;
}

/**
 * Generate exit intent strategy
 */
export function generateExitIntentStrategy(
  score: LeadScore,
  timeOnPage: number,
  scrollDepth: number
): {
  show: boolean;
  type: 'popup' | 'banner' | 'chat' | 'none';
  message: string;
  offer?: string;
  delay: number;
} {
  // Don't show for hot leads who are likely to convert anyway
  if (score.tier === 'Hot' && scrollDepth > 70) {
    return {
      show: false,
      type: 'none',
      message: '',
      delay: 0
    };
  }

  // Warm leads - soft touch
  if (score.tier === 'Warm') {
    return {
      show: true,
      type: 'chat',
      message: 'Questions about our services? Chat with an expert',
      delay: 500
    };
  }

  // Cold leads - stronger intervention
  if (timeOnPage < 30000) {
    // Quick exit - educational offer
    return {
      show: true,
      type: 'popup',
      message: 'Wait! Get our free Marketing Strategy Guide',
      offer: 'Download our 2024 Marketing Playbook (No email required)',
      delay: 0
    };
  } else {
    // Engaged but leaving - consultation offer
    return {
      show: true,
      type: 'banner',
      message: 'Before you go - claim your free marketing audit',
      offer: '30-minute consultation ($500 value)',
      delay: 300
    };
  }
}

/**
 * Create A/B test configuration
 */
export function createABTest(
  testName: string,
  hypothesis: string,
  variants: Array<{ name: string; changes: Record<string, any> }>
): ABTestConfig {
  const testConfig: ABTestConfig = {
    testId: `test_${Date.now()}`,
    name: testName,
    hypothesis,
    variants: variants.map((v, index) => ({
      id: `variant_${index}`,
      name: v.name,
      changes: v.changes,
      traffic: Math.floor(100 / variants.length), // Equal distribution
      conversions: 0,
      views: 0
    })),
    metrics: ['conversion_rate', 'form_completion', 'engagement_time'],
    sampleSize: 1000, // Per variant
    confidence: 0.95,
    status: 'planning'
  };

  return testConfig;
}

/**
 * Calculate test results and statistical significance
 */
export function calculateTestResults(test: ABTestConfig): {
  winner?: string;
  confidence: number;
  lift: number;
  significant: boolean;
  recommendation: string;
} {
  // Find control and best performing variant
  if (!test.variants || test.variants.length === 0) {
    throw new Error('No variants found in test configuration');
  }
  
  const control = test.variants[0];
  const bestVariant = test.variants.reduce((best, current) => {
    const currentRate = current.views > 0 ? current.conversions / current.views : 0;
    const bestRate = best.views > 0 ? best.conversions / best.views : 0;
    return currentRate > bestRate ? current : best;
  });

  const controlRate = control && control.views > 0 ? control.conversions / control.views : 0;
  const bestRate = bestVariant.views > 0 ? bestVariant.conversions / bestVariant.views : 0;

  // Calculate lift
  const lift = controlRate > 0 ? ((bestRate - controlRate) / controlRate) * 100 : 0;

  // Simple significance check (would use proper statistical test in production)
  const minSampleSize = test.sampleSize * 0.8; // 80% of target
  const hasEnoughData = test.variants.every(v => v.views >= minSampleSize);
  
  // Z-score approximation for significance
  const standardError = Math.sqrt(
    (controlRate * (1 - controlRate) / (control?.views || 1)) +
    (bestRate * (1 - bestRate) / (bestVariant?.views || 1))
  );
  const zScore = Math.abs((bestRate - controlRate) / standardError);
  const significant = zScore > 1.96 && hasEnoughData; // 95% confidence

  let recommendation = '';
  if (!hasEnoughData) {
    recommendation = `Continue test - need ${Math.ceil(minSampleSize - Math.min(...test.variants.map(v => v.views)))} more views`;
  } else if (significant && lift > 10) {
    recommendation = `Implement ${bestVariant.name} - significant improvement detected`;
  } else if (significant && lift < -10) {
    recommendation = 'Keep control - variants underperforming';
  } else {
    recommendation = 'No significant difference - consider new test variations';
  }

  return {
    winner: significant && lift > 0 ? bestVariant.name : undefined,
    confidence: Math.min(99, zScore * 30), // Approximate confidence percentage
    lift: Math.round(lift * 10) / 10,
    significant,
    recommendation
  };
}

/**
 * Generate conversion optimization recommendations
 */
export function generateConversionRecommendations(
  score: LeadScore,
  journey?: CustomerJourney,
  currentConversionRate: number = 2
): Array<{
  priority: 'high' | 'medium' | 'low';
  tactic: string;
  implementation: string;
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
}> {
  const recommendations = [];

  // High-priority quick wins
  if (currentConversionRate < 3) {
    recommendations.push({
      priority: 'high' as const,
      tactic: 'Reduce form fields',
      implementation: 'Remove optional fields, use progressive profiling',
      expectedImpact: '25-40% increase in form completions',
      effort: 'low' as const,
      timeframe: '1 day'
    });
  }

  if (!journey || journey.touchpoints.length < 3) {
    recommendations.push({
      priority: 'high' as const,
      tactic: 'Add trust signals',
      implementation: 'Display security badges, testimonials, client logos',
      expectedImpact: '15-25% increase in conversions',
      effort: 'low' as const,
      timeframe: '2 days'
    });
  }

  // Medium priority based on lead tier
  if (score.tier === 'Warm' || score.tier === 'Cold') {
    recommendations.push({
      priority: 'medium' as const,
      tactic: 'Implement chat widget',
      implementation: 'Add live chat for real-time qualification',
      expectedImpact: '20-30% increase in qualified leads',
      effort: 'medium' as const,
      timeframe: '1 week'
    });

    recommendations.push({
      priority: 'medium' as const,
      tactic: 'Create lead magnets',
      implementation: 'Offer valuable content in exchange for contact info',
      expectedImpact: '40-60% increase in email captures',
      effort: 'medium' as const,
      timeframe: '2 weeks'
    });
  }

  // Personalization opportunities
  if (score.behavioral < 60) {
    recommendations.push({
      priority: 'medium' as const,
      tactic: 'Personalize CTAs',
      implementation: 'Dynamic CTAs based on visitor behavior',
      expectedImpact: '30-40% increase in CTA clicks',
      effort: 'medium' as const,
      timeframe: '1 week'
    });
  }

  // Advanced tactics
  recommendations.push({
    priority: 'low' as const,
    tactic: 'Implement predictive lead scoring',
    implementation: 'Use ML to predict conversion probability',
    expectedImpact: '25-35% improvement in sales efficiency',
    effort: 'high' as const,
    timeframe: '1 month'
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}