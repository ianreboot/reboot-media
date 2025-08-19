const TOUCHPOINT_VALUES = {
    'page_view': 10,
    'form_start': 30,
    'form_complete': 100,
    'content_download': 50,
    'email_open': 15,
    'email_click': 25,
    'chat_interaction': 60,
    'phone_call': 80
};
const CHANNEL_MULTIPLIERS = {
    'organic': 1.5,
    'direct': 1.3,
    'referral': 1.2,
    'email': 1.1,
    'paid': 1.0,
    'social': 0.9
};
export class CustomerJourneyTracker {
    journeys = new Map();
    sessionTimeout = 30 * 60 * 1000;
    trackTouchpoint(sessionId, touchpoint, leadId) {
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
        journey.touchpoints.push(touchpoint);
        journey.lastActivity = new Date();
        this.updateAttribution(journey, touchpoint);
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
    initializeAttribution(touchpoint) {
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
    updateAttribution(journey, touchpoint) {
        journey.attributionData.lastTouch = {
            channel: touchpoint.channel,
            campaign: touchpoint.details.emailCampaign,
            timestamp: touchpoint.timestamp
        };
        const touchpoints = journey.touchpoints;
        const totalTouchpoints = touchpoints.length;
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
        journey.attributionData.multiTouch.channels = {};
        journey.attributionData.multiTouch.campaigns = {};
        touchpoints.forEach((tp, index) => {
            const weight = this.calculateTimeDecayWeight(index, totalTouchpoints);
            const channels = journey.attributionData.multiTouch.channels;
            if (!channels[tp.channel]) {
                channels[tp.channel] = 0;
            }
            channels[tp.channel] = (channels[tp.channel] || 0) + weight;
            if (tp.details?.emailCampaign) {
                const campaigns = journey.attributionData.multiTouch.campaigns;
                const campaign = tp.details.emailCampaign;
                if (!campaigns[campaign]) {
                    campaigns[campaign] = 0;
                }
                campaigns[campaign] += weight;
            }
        });
        this.normalizeAttribution(journey.attributionData?.multiTouch?.channels);
        this.normalizeAttribution(journey.attributionData?.multiTouch?.campaigns);
    }
    calculateTimeDecayWeight(index, total) {
        const position = index / (total - 1 || 1);
        return Math.pow(2, position);
    }
    normalizeAttribution(attribution) {
        if (!attribution)
            return;
        const total = Object.values(attribution).reduce((sum, val) => sum + val, 0);
        if (total > 0) {
            Object.keys(attribution).forEach(key => {
                const value = attribution[key] || 0;
                attribution[key] = Math.round((value / total) * 100);
            });
        }
    }
    calculateTouchpointAttribution(journey) {
        return journey.touchpoints
            .filter(tp => tp.value > 30)
            .map(tp => `${tp.type}_${tp.channel}`)
            .slice(-5);
    }
    calculateLeadMetrics(leadId) {
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
        const conversionRate = journey.conversionEvents.length > 0 ? 100 : 0;
        const conversionEvent = journey.conversionEvents[0];
        const timeToConversion = conversionEvent
            ? (conversionEvent.timestamp.getTime() - journey.startTime.getTime()) / (1000 * 60 * 60)
            : 0;
        const engagementScore = journey.touchpoints.reduce((total, tp) => {
            const baseValue = TOUCHPOINT_VALUES[tp.type] || 10;
            const channelMultiplier = CHANNEL_MULTIPLIERS[tp.channel] || 1;
            return total + (baseValue * channelMultiplier);
        }, 0) / journey.touchpoints.length;
        const sourceROI = {};
        Object.entries(journey.attributionData.multiTouch.channels).forEach(([channel, attribution]) => {
            sourceROI[channel] = attribution * (conversionRate / 100) * 100;
        });
        const predictedConversionProbability = Math.min(95, (engagementScore / 100) * 50 +
            (journey.touchpoints.length / 10) * 30 +
            20) / 100;
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
    analyzeCohort(startDate, endDate, period = 'weekly') {
        const cohortJourneys = Array.from(this.journeys.values()).filter(j => j.startTime >= startDate && j.startTime <= endDate);
        const converted = cohortJourneys.filter(j => j.status === 'converted').length;
        const totalScores = cohortJourneys.reduce((sum, j) => sum + (j.leadScore?.total || 0), 0);
        const retention = {
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
                averageCLV: 60000,
                retention
            }
        };
    }
    getJourney(id) {
        return this.journeys.get(id) ||
            Array.from(this.journeys.values()).find(j => j.leadId === id);
    }
    cleanupInactiveSessions() {
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
export function calculateFunnelMetrics(journeys) {
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
        const journeysAtStage = journeys.filter(j => j.touchpoints.some(tp => tp.type === stage.identifier));
        const count = journeysAtStage.length;
        const conversionRate = previousStageCount > 0
            ? (count / previousStageCount) * 100
            : 0;
        const currentStageCount = count;
        const dropoffRate = 100 - conversionRate;
        const times = journeysAtStage.map(j => {
            const touchpoint = j.touchpoints.find(tp => tp.type === stage.identifier);
            return touchpoint
                ? (touchpoint.timestamp.getTime() - j.startTime.getTime()) / (1000 * 60 * 60)
                : 0;
        });
        const averageTime = times.length > 0
            ? times.reduce((a, b) => a + b, 0) / times.length
            : 0;
        previousStageCount = currentStageCount;
        return {
            name: stage.name,
            count,
            conversionRate: Math.round(conversionRate * 10) / 10,
            dropoffRate: Math.round(dropoffRate * 10) / 10,
            averageTime: Math.round(averageTime * 10) / 10
        };
    });
    const bottlenecks = stageMetrics
        .filter(stage => stage.dropoffRate > 50)
        .map(stage => stage.name);
    const completedJourneys = journeys.filter(j => j.conversionEvents.some(e => e.type === 'macro'));
    const overallConversion = journeys.length > 0
        ? (completedJourneys.length / journeys.length) * 100
        : 0;
    return {
        stages: stageMetrics,
        overallConversion: Math.round(overallConversion * 10) / 10,
        bottlenecks
    };
}
export function generateOptimizationRecommendations(metrics, funnelMetrics) {
    const recommendations = [];
    if (metrics.conversionRate < 2) {
        recommendations.push({
            priority: 'high',
            area: 'Conversion Rate',
            issue: `Current conversion rate (${metrics.conversionRate}%) below industry average`,
            recommendation: 'Implement exit-intent popups and reduce form fields',
            expectedImpact: '30-50% increase in conversions'
        });
    }
    if (metrics.averageTimeToConversion > 48) {
        recommendations.push({
            priority: 'high',
            area: 'Response Time',
            issue: `Long time to conversion (${metrics.averageTimeToConversion} hours)`,
            recommendation: 'Implement automated lead nurturing and faster follow-up',
            expectedImpact: '25% reduction in conversion time'
        });
    }
    if (metrics.engagementScore < 50) {
        recommendations.push({
            priority: 'medium',
            area: 'Engagement',
            issue: 'Low visitor engagement score',
            recommendation: 'Add interactive content and personalization',
            expectedImpact: '40% increase in engagement'
        });
    }
    funnelMetrics.bottlenecks.forEach(bottleneck => {
        recommendations.push({
            priority: 'high',
            area: 'Funnel Optimization',
            issue: `High dropoff at ${bottleneck}`,
            recommendation: `Optimize ${bottleneck} with A/B testing and UX improvements`,
            expectedImpact: '20-30% reduction in dropoff'
        });
    });
    const poorPerformingSources = Object.entries(metrics.sourceROI)
        .filter(([_, roi]) => roi < 50)
        .map(([source]) => source);
    if (poorPerformingSources.length > 0) {
        recommendations.push({
            priority: 'medium',
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
export const journeyTracker = new CustomerJourneyTracker();
