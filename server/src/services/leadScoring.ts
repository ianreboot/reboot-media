/**
 * Lead Scoring Service
 * Intelligent lead qualification and scoring system
 */

import { LeadFormData } from '../validators/formValidators.js';

export interface LeadScore {
  demographic: number;     // Company size, revenue, industry (0-100)
  behavioral: number;      // Page engagement, content consumption (0-100)
  firmographic: number;    // Geographic, company type (0-100)
  intent: number;          // Urgency, timeline, budget (0-100)
  engagement: number;      // Form completion, interaction quality (0-100)
  total: number;          // Weighted total score (0-100)
  tier: 'Hot' | 'Warm' | 'Cold' | 'Unqualified';
  priority: 1 | 2 | 3 | 4 | 5; // 1 = highest priority
  recommendedAction: string;
  estimatedValue: number; // Estimated deal value in USD
  conversionProbability: number; // 0-1 probability of conversion
  qualificationReasons: string[];
  disqualificationReasons: string[];
}

export interface BehavioralData {
  pageViews: number;
  timeOnSite: number; // in seconds
  contentEngagement: string[]; // content IDs/URLs viewed
  formAbandonment: boolean;
  returnVisit: boolean;
  referralSource: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  location?: {
    country: string;
    region: string;
    city: string;
  };
}

export interface EnrichedLeadData extends LeadFormData {
  behavioral?: BehavioralData;
  enriched?: {
    companySize?: number;
    annualRevenue?: number;
    industry?: string;
    technologies?: string[];
    socialProfiles?: {
      linkedin?: string;
      twitter?: string;
    };
  };
}

/**
 * Industry value multipliers for lead scoring
 */
const INDUSTRY_MULTIPLIERS: Record<string, number> = {
  'software': 1.5,      // High-value, fast sales cycle
  'financial': 1.4,     // High budget, compliance needs
  'healthcare': 1.3,    // High budget, longer cycle
  'ecommerce': 1.2,     // Fast-moving, growth-focused
  'professional': 1.1,  // Service-based, steady
  'manufacturing': 1.0, // Traditional, longer cycle
  'other': 0.9         // Unknown, needs qualification
};

/**
 * Revenue range value scores
 */
const REVENUE_SCORES: Record<string, number> = {
  '10m+': 100,      // Enterprise
  '3m-10m': 80,     // Mid-market
  '1m-3m': 60,      // Small-medium business
  '500k-1m': 40,    // Small business
  'unknown': 30     // Needs qualification
};

/**
 * Timeline urgency scores
 */
const TIMELINE_SCORES: Record<string, number> = {
  'asap': 100,          // Immediate need
  '1-3months': 75,      // Active project
  '3-6months': 50,      // Planning phase
  '6months+': 25,       // Future consideration
  'unknown': 15         // No timeline
};

/**
 * Team size scoring
 */
const TEAM_SIZE_SCORES: Record<string, number> = {
  '200+': 100,      // Enterprise
  '51-200': 80,     // Mid-size
  '11-50': 60,      // Growth stage
  '1-10': 40,       // Startup
  'unknown': 30     // Needs qualification
};

/**
 * Calculate lead score based on form data and behavioral metrics
 */
export function calculateLeadScore(
  leadData: EnrichedLeadData,
  behavioral?: BehavioralData
): LeadScore {
  const qualificationReasons: string[] = [];
  const disqualificationReasons: string[] = [];

  // 1. Demographic Score (Company characteristics)
  let demographicScore = 0;
  
  // Revenue scoring
  const revenueScore = REVENUE_SCORES[leadData.revenue || 'unknown'] || 30;
  demographicScore += revenueScore * 0.4;
  if (revenueScore >= 80) {
    qualificationReasons.push('High-revenue company');
  } else if (revenueScore <= 40) {
    disqualificationReasons.push('Low revenue range');
  }

  // Team size scoring
  const teamScore = TEAM_SIZE_SCORES[leadData.teamSize || 'unknown'] || 30;
  demographicScore += teamScore * 0.3;
  if (teamScore >= 80) {
    qualificationReasons.push('Large team size');
  }

  // Industry scoring
  const industryMultiplier = INDUSTRY_MULTIPLIERS[leadData.industry || 'other'] || 0.9;
  demographicScore += (industryMultiplier * 50) * 0.3;
  if (industryMultiplier >= 1.3) {
    qualificationReasons.push(`High-value industry: ${leadData.industry}`);
  }

  // 2. Intent Score (Buying signals)
  let intentScore = 0;

  // Timeline urgency
  const timelineScore = TIMELINE_SCORES[leadData.timeline || 'unknown'] || 15;
  intentScore += timelineScore * 0.5;
  if (timelineScore >= 75) {
    qualificationReasons.push('Urgent timeline');
  } else if (timelineScore <= 25) {
    disqualificationReasons.push('Long timeline or undefined');
  }

  // Issue specificity (longer, detailed descriptions = higher intent)
  const issueLength = leadData.specificIssue?.length || 0;
  const issueScore = Math.min(100, (issueLength / 500) * 100);
  intentScore += issueScore * 0.3;
  if (issueScore >= 70) {
    qualificationReasons.push('Detailed problem description');
  }

  // Current marketing activities (indicates active investment)
  const hasCurrentMarketing = leadData.currentMarketing && leadData.currentMarketing.length > 50;
  intentScore += hasCurrentMarketing ? 20 : 0;
  if (hasCurrentMarketing) {
    qualificationReasons.push('Active marketing investment');
  }

  // 3. Behavioral Score (Engagement metrics)
  let behavioralScore = 50; // Default if no behavioral data
  
  if (behavioral) {
    behavioralScore = 0;
    
    // Page views (more engagement = higher score)
    const pageViewScore = Math.min(100, (behavioral.pageViews / 10) * 100);
    behavioralScore += pageViewScore * 0.3;
    if (pageViewScore >= 70) {
      qualificationReasons.push('High page engagement');
    }

    // Time on site (quality of engagement)
    const timeScore = Math.min(100, (behavioral.timeOnSite / 300) * 100); // 5 min = 100
    behavioralScore += timeScore * 0.3;
    if (timeScore >= 70) {
      qualificationReasons.push('Extended site engagement');
    }

    // Content engagement depth
    const contentScore = Math.min(100, (behavioral.contentEngagement.length / 5) * 100);
    behavioralScore += contentScore * 0.2;

    // Return visit bonus
    if (behavioral.returnVisit) {
      behavioralScore += 10;
      qualificationReasons.push('Return visitor');
    }

    // Form abandonment penalty
    if (behavioral.formAbandonment) {
      behavioralScore -= 10;
      disqualificationReasons.push('Previous form abandonment');
    }

    // Device type scoring (desktop = more serious)
    if (behavioral.deviceType === 'desktop') {
      behavioralScore += 10;
    }
  }

  // 4. Firmographic Score (Company characteristics)
  let firmographicScore = 50; // Default

  // Website presence
  if (leadData.website) {
    firmographicScore += 20;
    
    // Check for professional domain (not free email providers)
    const emailDomain = leadData.email.split('@')[1];
    const websiteDomain = new URL(leadData.website).hostname.replace('www.', '');
    
    if (emailDomain === websiteDomain) {
      firmographicScore += 30;
      qualificationReasons.push('Verified company domain');
    }
  }

  // Geographic scoring (if behavioral data available)
  if (behavioral?.location) {
    // Tier 1 countries get higher scores
    const tier1Countries = ['US', 'CA', 'GB', 'AU', 'DE', 'FR'];
    if (tier1Countries.includes(behavioral.location.country)) {
      firmographicScore = Math.min(100, firmographicScore + 20);
      qualificationReasons.push('Tier 1 geographic market');
    }
  }

  // 5. Engagement Score (Form quality)
  let engagementScore = 60; // Base score for completing form

  // Completeness bonus
  const optionalFieldsCompleted = [
    leadData.website,
    leadData.revenue,
    leadData.industry,
    leadData.teamSize,
    leadData.timeline,
    leadData.currentMarketing
  ].filter(Boolean).length;

  engagementScore += (optionalFieldsCompleted / 6) * 40;
  if (optionalFieldsCompleted >= 5) {
    qualificationReasons.push('Complete information provided');
  } else if (optionalFieldsCompleted <= 2) {
    disqualificationReasons.push('Minimal information provided');
  }

  // Calculate weighted total score
  const weights = {
    demographic: 0.25,
    intent: 0.30,
    behavioral: 0.20,
    firmographic: 0.15,
    engagement: 0.10
  };

  const totalScore = 
    (demographicScore * weights.demographic) +
    (intentScore * weights.intent) +
    (behavioralScore * weights.behavioral) +
    (firmographicScore * weights.firmographic) +
    (engagementScore * weights.engagement);

  // Determine lead tier
  let tier: LeadScore['tier'];
  let priority: LeadScore['priority'];
  let recommendedAction: string;

  if (totalScore >= 80) {
    tier = 'Hot';
    priority = 1;
    recommendedAction = 'Immediate sales outreach - schedule discovery call within 1 hour';
  } else if (totalScore >= 60) {
    tier = 'Warm';
    priority = 2;
    recommendedAction = 'Personalized follow-up within 4 hours - qualify needs';
  } else if (totalScore >= 40) {
    tier = 'Cold';
    priority = 3;
    recommendedAction = 'Add to nurture campaign - educational content sequence';
  } else {
    tier = 'Unqualified';
    priority = 5;
    recommendedAction = 'Automated email sequence - monitor for engagement';
  }

  // Special case overrides
  if (timelineScore >= 100 && revenueScore >= 60) {
    // Urgent + decent budget = always hot
    tier = 'Hot';
    priority = 1;
    recommendedAction = 'URGENT: Immediate callback required - high intent lead';
    qualificationReasons.push('Urgent need with budget');
  }

  // Calculate estimated deal value
  let estimatedValue = 0;
  const baseValue = 5000; // Base monthly retainer

  // Revenue-based multiplier
  const revenueMultiplier = revenueScore / 100;
  
  // Industry multiplier
  const industryValue = industryMultiplier;
  
  // Timeline multiplier (urgent = willing to pay more)
  const timelineMultiplier = 1 + (timelineScore / 200);
  
  estimatedValue = Math.round(
    baseValue * revenueMultiplier * industryValue * timelineMultiplier * 12 // Annual value
  );

  // Calculate conversion probability
  const conversionProbability = Math.min(0.95, totalScore / 100);

  return {
    demographic: Math.round(demographicScore),
    behavioral: Math.round(behavioralScore),
    firmographic: Math.round(firmographicScore),
    intent: Math.round(intentScore),
    engagement: Math.round(engagementScore),
    total: Math.round(totalScore),
    tier,
    priority,
    recommendedAction,
    estimatedValue,
    conversionProbability,
    qualificationReasons,
    disqualificationReasons
  };
}

/**
 * Get lead routing recommendation based on score
 */
export function getLeadRouting(score: LeadScore): {
  assignTo: string;
  notificationChannels: string[];
  followUpTime: string;
  automationTriggers: string[];
} {
  const routing = {
    assignTo: '',
    notificationChannels: [] as string[],
    followUpTime: '',
    automationTriggers: [] as string[]
  };

  switch (score.tier) {
    case 'Hot':
      routing.assignTo = 'senior-sales';
      routing.notificationChannels = ['email', 'sms', 'slack'];
      routing.followUpTime = '1 hour';
      routing.automationTriggers = [
        'send-hot-lead-alert',
        'create-crm-opportunity',
        'schedule-discovery-call',
        'send-personalized-email'
      ];
      break;

    case 'Warm':
      routing.assignTo = 'sales-team';
      routing.notificationChannels = ['email', 'slack'];
      routing.followUpTime = '4 hours';
      routing.automationTriggers = [
        'send-warm-lead-notification',
        'create-crm-lead',
        'send-qualification-email',
        'add-to-warm-nurture'
      ];
      break;

    case 'Cold':
      routing.assignTo = 'marketing-automation';
      routing.notificationChannels = ['email-digest'];
      routing.followUpTime = '24 hours';
      routing.automationTriggers = [
        'add-to-nurture-campaign',
        'send-educational-content',
        'track-engagement',
        'score-monitoring'
      ];
      break;

    case 'Unqualified':
      routing.assignTo = 'automation-only';
      routing.notificationChannels = [];
      routing.followUpTime = '72 hours';
      routing.automationTriggers = [
        'add-to-newsletter',
        'basic-follow-up',
        'monitor-for-requalification'
      ];
      break;
  }

  return routing;
}

/**
 * Calculate lead quality trend over time
 */
export function calculateLeadTrend(
  historicalScores: number[],
  timeframe: 'daily' | 'weekly' | 'monthly' = 'weekly'
): {
  trend: 'improving' | 'stable' | 'declining';
  changePercent: number;
  averageScore: number;
  recommendation: string;
} {
  if (historicalScores.length < 2) {
    return {
      trend: 'stable',
      changePercent: 0,
      averageScore: historicalScores[0] || 0,
      recommendation: 'Insufficient data for trend analysis'
    };
  }

  const recentScores = historicalScores.slice(-7); // Last 7 data points
  const previousScores = historicalScores.slice(-14, -7); // Previous 7 data points

  const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
  const previousAvg = previousScores.length > 0 
    ? previousScores.reduce((a, b) => a + b, 0) / previousScores.length
    : recentAvg;

  const changePercent = ((recentAvg - previousAvg) / previousAvg) * 100;

  let trend: 'improving' | 'stable' | 'declining';
  let recommendation: string;

  if (changePercent > 10) {
    trend = 'improving';
    recommendation = 'Lead quality improving - maintain current marketing strategy';
  } else if (changePercent < -10) {
    trend = 'declining';
    recommendation = 'Lead quality declining - review targeting and messaging';
  } else {
    trend = 'stable';
    recommendation = 'Lead quality stable - consider A/B testing for improvement';
  }

  return {
    trend,
    changePercent: Math.round(changePercent * 10) / 10,
    averageScore: Math.round(recentAvg),
    recommendation
  };
}

/**
 * Predict customer lifetime value based on lead score
 */
export function predictCustomerLifetimeValue(
  score: LeadScore,
  averageContractLength: number = 12, // months
  averageMonthlyValue: number = 5000
): {
  predictedCLV: number;
  confidence: number;
  factors: string[];
} {
  const factors: string[] = [];
  
  // Base CLV calculation
  let baseCLV = averageMonthlyValue * averageContractLength;
  
  // Adjust based on revenue tier
  if (score.demographic >= 80) {
    baseCLV *= 2.5;
    factors.push('Enterprise revenue tier (+150%)');
  } else if (score.demographic >= 60) {
    baseCLV *= 1.5;
    factors.push('Mid-market revenue tier (+50%)');
  }
  
  // Adjust based on intent
  if (score.intent >= 80) {
    baseCLV *= 1.3;
    factors.push('High buying intent (+30%)');
  }
  
  // Adjust based on engagement
  if (score.engagement >= 80) {
    baseCLV *= 1.2;
    factors.push('High engagement level (+20%)');
  }
  
  // Industry adjustment
  if (score.qualificationReasons.some(r => r.includes('High-value industry'))) {
    baseCLV *= 1.25;
    factors.push('Premium industry vertical (+25%)');
  }
  
  // Calculate confidence based on data completeness
  const confidence = Math.min(95, 
    (score.engagement / 100) * 50 + // Form completeness
    (score.behavioral / 100) * 30 + // Behavioral data
    20 // Base confidence
  );
  
  return {
    predictedCLV: Math.round(baseCLV),
    confidence: Math.round(confidence),
    factors
  };
}

/**
 * Lead Scoring Service Class
 * Wrapper for lead scoring functions
 */
export class LeadScoringService {
  calculateLeadScore = calculateLeadScore;
  getLeadRouting = getLeadRouting;
  calculateLeadTrend = calculateLeadTrend;
  predictCustomerLifetimeValue = predictCustomerLifetimeValue;
}

// Export singleton instance
export const leadScoringService = new LeadScoringService();