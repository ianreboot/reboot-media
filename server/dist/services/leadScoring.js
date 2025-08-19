const INDUSTRY_MULTIPLIERS = {
    'software': 1.5,
    'financial': 1.4,
    'healthcare': 1.3,
    'ecommerce': 1.2,
    'professional': 1.1,
    'manufacturing': 1.0,
    'other': 0.9
};
const REVENUE_SCORES = {
    '10m+': 100,
    '3m-10m': 80,
    '1m-3m': 60,
    '500k-1m': 40,
    'unknown': 30
};
const TIMELINE_SCORES = {
    'asap': 100,
    '1-3months': 75,
    '3-6months': 50,
    '6months+': 25,
    'unknown': 15
};
const TEAM_SIZE_SCORES = {
    '200+': 100,
    '51-200': 80,
    '11-50': 60,
    '1-10': 40,
    'unknown': 30
};
export function calculateLeadScore(leadData, behavioral) {
    const qualificationReasons = [];
    const disqualificationReasons = [];
    let demographicScore = 0;
    const revenueScore = REVENUE_SCORES[leadData.revenue || 'unknown'] || 30;
    demographicScore += revenueScore * 0.4;
    if (revenueScore >= 80) {
        qualificationReasons.push('High-revenue company');
    }
    else if (revenueScore <= 40) {
        disqualificationReasons.push('Low revenue range');
    }
    const teamScore = TEAM_SIZE_SCORES[leadData.teamSize || 'unknown'] || 30;
    demographicScore += teamScore * 0.3;
    if (teamScore >= 80) {
        qualificationReasons.push('Large team size');
    }
    const industryMultiplier = INDUSTRY_MULTIPLIERS[leadData.industry || 'other'] || 0.9;
    demographicScore += (industryMultiplier * 50) * 0.3;
    if (industryMultiplier >= 1.3) {
        qualificationReasons.push(`High-value industry: ${leadData.industry}`);
    }
    let intentScore = 0;
    const timelineScore = TIMELINE_SCORES[leadData.timeline || 'unknown'] || 15;
    intentScore += timelineScore * 0.5;
    if (timelineScore >= 75) {
        qualificationReasons.push('Urgent timeline');
    }
    else if (timelineScore <= 25) {
        disqualificationReasons.push('Long timeline or undefined');
    }
    const issueLength = leadData.specificIssue?.length || 0;
    const issueScore = Math.min(100, (issueLength / 500) * 100);
    intentScore += issueScore * 0.3;
    if (issueScore >= 70) {
        qualificationReasons.push('Detailed problem description');
    }
    const hasCurrentMarketing = leadData.currentMarketing && leadData.currentMarketing.length > 50;
    intentScore += hasCurrentMarketing ? 20 : 0;
    if (hasCurrentMarketing) {
        qualificationReasons.push('Active marketing investment');
    }
    let behavioralScore = 50;
    if (behavioral) {
        behavioralScore = 0;
        const pageViewScore = Math.min(100, (behavioral.pageViews / 10) * 100);
        behavioralScore += pageViewScore * 0.3;
        if (pageViewScore >= 70) {
            qualificationReasons.push('High page engagement');
        }
        const timeScore = Math.min(100, (behavioral.timeOnSite / 300) * 100);
        behavioralScore += timeScore * 0.3;
        if (timeScore >= 70) {
            qualificationReasons.push('Extended site engagement');
        }
        const contentScore = Math.min(100, (behavioral.contentEngagement.length / 5) * 100);
        behavioralScore += contentScore * 0.2;
        if (behavioral.returnVisit) {
            behavioralScore += 10;
            qualificationReasons.push('Return visitor');
        }
        if (behavioral.formAbandonment) {
            behavioralScore -= 10;
            disqualificationReasons.push('Previous form abandonment');
        }
        if (behavioral.deviceType === 'desktop') {
            behavioralScore += 10;
        }
    }
    let firmographicScore = 50;
    if (leadData.website) {
        firmographicScore += 20;
        const emailDomain = leadData.email.split('@')[1];
        const websiteDomain = new URL(leadData.website).hostname.replace('www.', '');
        if (emailDomain === websiteDomain) {
            firmographicScore += 30;
            qualificationReasons.push('Verified company domain');
        }
    }
    if (behavioral?.location) {
        const tier1Countries = ['US', 'CA', 'GB', 'AU', 'DE', 'FR'];
        if (tier1Countries.includes(behavioral.location.country)) {
            firmographicScore = Math.min(100, firmographicScore + 20);
            qualificationReasons.push('Tier 1 geographic market');
        }
    }
    let engagementScore = 60;
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
    }
    else if (optionalFieldsCompleted <= 2) {
        disqualificationReasons.push('Minimal information provided');
    }
    const weights = {
        demographic: 0.25,
        intent: 0.30,
        behavioral: 0.20,
        firmographic: 0.15,
        engagement: 0.10
    };
    const totalScore = (demographicScore * weights.demographic) +
        (intentScore * weights.intent) +
        (behavioralScore * weights.behavioral) +
        (firmographicScore * weights.firmographic) +
        (engagementScore * weights.engagement);
    let tier;
    let priority;
    let recommendedAction;
    if (totalScore >= 80) {
        tier = 'Hot';
        priority = 1;
        recommendedAction = 'Immediate sales outreach - schedule discovery call within 1 hour';
    }
    else if (totalScore >= 60) {
        tier = 'Warm';
        priority = 2;
        recommendedAction = 'Personalized follow-up within 4 hours - qualify needs';
    }
    else if (totalScore >= 40) {
        tier = 'Cold';
        priority = 3;
        recommendedAction = 'Add to nurture campaign - educational content sequence';
    }
    else {
        tier = 'Unqualified';
        priority = 5;
        recommendedAction = 'Automated email sequence - monitor for engagement';
    }
    if (timelineScore >= 100 && revenueScore >= 60) {
        tier = 'Hot';
        priority = 1;
        recommendedAction = 'URGENT: Immediate callback required - high intent lead';
        qualificationReasons.push('Urgent need with budget');
    }
    let estimatedValue = 0;
    const baseValue = 5000;
    const revenueMultiplier = revenueScore / 100;
    const industryValue = industryMultiplier;
    const timelineMultiplier = 1 + (timelineScore / 200);
    estimatedValue = Math.round(baseValue * revenueMultiplier * industryValue * timelineMultiplier * 12);
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
export function getLeadRouting(score) {
    const routing = {
        assignTo: '',
        notificationChannels: [],
        followUpTime: '',
        automationTriggers: []
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
export function calculateLeadTrend(historicalScores, timeframe = 'weekly') {
    if (historicalScores.length < 2) {
        return {
            trend: 'stable',
            changePercent: 0,
            averageScore: historicalScores[0] || 0,
            recommendation: 'Insufficient data for trend analysis'
        };
    }
    const recentScores = historicalScores.slice(-7);
    const previousScores = historicalScores.slice(-14, -7);
    const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const previousAvg = previousScores.length > 0
        ? previousScores.reduce((a, b) => a + b, 0) / previousScores.length
        : recentAvg;
    const changePercent = ((recentAvg - previousAvg) / previousAvg) * 100;
    let trend;
    let recommendation;
    if (changePercent > 10) {
        trend = 'improving';
        recommendation = 'Lead quality improving - maintain current marketing strategy';
    }
    else if (changePercent < -10) {
        trend = 'declining';
        recommendation = 'Lead quality declining - review targeting and messaging';
    }
    else {
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
export function predictCustomerLifetimeValue(score, averageContractLength = 12, averageMonthlyValue = 5000) {
    const factors = [];
    let baseCLV = averageMonthlyValue * averageContractLength;
    if (score.demographic >= 80) {
        baseCLV *= 2.5;
        factors.push('Enterprise revenue tier (+150%)');
    }
    else if (score.demographic >= 60) {
        baseCLV *= 1.5;
        factors.push('Mid-market revenue tier (+50%)');
    }
    if (score.intent >= 80) {
        baseCLV *= 1.3;
        factors.push('High buying intent (+30%)');
    }
    if (score.engagement >= 80) {
        baseCLV *= 1.2;
        factors.push('High engagement level (+20%)');
    }
    if (score.qualificationReasons.some(r => r.includes('High-value industry'))) {
        baseCLV *= 1.25;
        factors.push('Premium industry vertical (+25%)');
    }
    const confidence = Math.min(95, (score.engagement / 100) * 50 +
        (score.behavioral / 100) * 30 +
        20);
    return {
        predictedCLV: Math.round(baseCLV),
        confidence: Math.round(confidence),
        factors
    };
}
export class LeadScoringService {
    calculateLeadScore = calculateLeadScore;
    getLeadRouting = getLeadRouting;
    calculateLeadTrend = calculateLeadTrend;
    predictCustomerLifetimeValue = predictCustomerLifetimeValue;
}
export const leadScoringService = new LeadScoringService();
//# sourceMappingURL=leadScoring.js.map