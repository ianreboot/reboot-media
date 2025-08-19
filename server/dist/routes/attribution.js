import { Router } from 'express';
import { attributionService } from '../services/marketingAttribution.js';
import { journeyTracker } from '../services/leadAnalytics.js';
import { authenticateToken } from '../middleware/auth.js';
import { body, query, param, validationResult } from 'express-validator';
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
const router = Router();
router.post('/touchpoint', authenticateToken, [
    body('sessionId').isString().notEmpty(),
    body('channel').isIn(['organic', 'paid', 'social', 'email', 'direct', 'referral']),
    body('interaction').isString().notEmpty(),
    body('url').optional().isURL(),
    body('utmSource').optional().isString(),
    body('utmMedium').optional().isString(),
    body('utmCampaign').optional().isString(),
    body('utmTerm').optional().isString(),
    body('utmContent').optional().isString(),
    body('device').optional().isIn(['desktop', 'mobile', 'tablet']),
    body('referrer').optional().isURL()
], validateRequest, async (req, res) => {
    try {
        const { sessionId, channel, interaction, url, utmSource, utmMedium, utmCampaign, utmTerm, utmContent, device, referrer, leadId } = req.body;
        const touchpoint = {
            timestamp: new Date(),
            type: interaction,
            channel: channel,
            details: {
                url,
                referrer,
                emailCampaign: utmCampaign
            },
            value: calculateTouchpointValue(interaction, channel)
        };
        const journey = journeyTracker.trackTouchpoint(sessionId, touchpoint, leadId);
        const attribution = attributionService.calculateAttribution(journey, 'data-driven');
        res.json({
            success: true,
            data: {
                journeyId: journey.leadId,
                sessionId: journey.sessionId,
                touchpointCount: journey.touchpoints.length,
                status: journey.status,
                attribution: {
                    model: attribution.modelType,
                    confidence: attribution.confidence,
                    topChannels: attribution.touchpoints
                        .sort((a, b) => b.attribution - a.attribution)
                        .slice(0, 3)
                        .map(tp => ({
                        channel: tp.touchpoint.channel,
                        attribution: tp.attribution,
                        value: tp.value
                    }))
                }
            }
        });
    }
    catch (error) {
        console.error('Touchpoint tracking error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to track touchpoint'
        });
    }
});
router.get('/journey/:journeyId/attribution', authenticateToken, [
    param('journeyId').isString().notEmpty(),
    query('model').optional().isIn(['first-touch', 'last-touch', 'linear', 'time-decay', 'position-based', 'data-driven']),
    query('conversionValue').optional().isFloat({ min: 0 })
], validateRequest, async (req, res) => {
    try {
        const { journeyId } = req.params;
        const { model = 'data-driven', conversionValue } = req.query;
        const journey = journeyTracker.getJourney(journeyId);
        if (!journey) {
            return res.status(404).json({
                success: false,
                error: 'Journey not found'
            });
        }
        const attribution = attributionService.calculateAttribution(journey, model, conversionValue ? parseFloat(conversionValue) : undefined);
        const stages = attributionService.mapJourneyStages(journey);
        const leadScore = null;
        res.json({
            success: true,
            data: {
                journey: {
                    id: journey.leadId,
                    sessionId: journey.sessionId,
                    status: journey.status,
                    startTime: journey.startTime,
                    lastActivity: journey.lastActivity,
                    touchpointCount: journey.touchpoints.length,
                    conversionEvents: journey.conversionEvents
                },
                attribution,
                stages,
                leadScore,
                recommendations: attribution.insights
            }
        });
    }
    catch (error) {
        console.error('Attribution analysis error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to analyze attribution'
        });
    }
});
router.get('/journey/:journeyId/compare-models', authenticateToken, [
    param('journeyId').isString().notEmpty(),
    query('conversionValue').optional().isFloat({ min: 0 })
], validateRequest, async (req, res) => {
    try {
        const { journeyId } = req.params;
        const { conversionValue } = req.query;
        const journey = journeyTracker.getJourney(journeyId);
        if (!journey) {
            return res.status(404).json({
                success: false,
                error: 'Journey not found'
            });
        }
        const value = conversionValue ? parseFloat(conversionValue) : undefined;
        const models = ['first-touch', 'last-touch', 'linear', 'time-decay', 'position-based', 'data-driven'];
        const comparison = models.map(model => {
            const result = attributionService.calculateAttribution(journey, model, value);
            const channelAttribution = {};
            result.touchpoints.forEach(tp => {
                if (!channelAttribution[tp.touchpoint.channel]) {
                    channelAttribution[tp.touchpoint.channel] = 0;
                }
                channelAttribution[tp.touchpoint.channel] += tp.attribution;
            });
            return {
                model,
                confidence: result.confidence,
                totalValue: result.totalValue,
                channelAttribution,
                topChannel: Object.entries(channelAttribution)
                    .sort(([, a], [, b]) => b - a)[0]
            };
        });
        res.json({
            success: true,
            data: {
                journeyId,
                comparison,
                recommendation: comparison.find(m => m.model === 'data-driven'),
                insights: generateModelComparisonInsights(comparison)
            }
        });
    }
    catch (error) {
        console.error('Model comparison error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to compare attribution models'
        });
    }
});
router.get('/channels/performance', authenticateToken, [
    query('startDate').optional().isISO8601(),
    query('endDate').optional().isISO8601(),
    query('channel').optional().isString()
], validateRequest, async (req, res) => {
    try {
        const { startDate, endDate, channel } = req.query;
        const allJourneys = Array.from(journeyTracker['journeys'].values());
        const filteredJourneys = allJourneys.filter(j => {
            if (startDate && j.startTime < new Date(startDate))
                return false;
            if (endDate && j.startTime > new Date(endDate))
                return false;
            if (channel && !j.touchpoints.some(tp => tp.channel === channel))
                return false;
            return true;
        });
        const performance = attributionService.analyzeChannelPerformance(filteredJourneys);
        const performanceData = Array.from(performance.values());
        const summary = {
            totalConversions: performanceData.reduce((sum, p) => sum + p.metrics.conversions, 0),
            totalRevenue: performanceData.reduce((sum, p) => sum + p.metrics.revenue, 0),
            totalCost: performanceData.reduce((sum, p) => sum + p.metrics.cost, 0),
            overallROI: 0,
            topPerformingChannel: '',
            worstPerformingChannel: ''
        };
        if (summary.totalCost > 0) {
            summary.overallROI = ((summary.totalRevenue - summary.totalCost) / summary.totalCost) * 100;
        }
        const sortedByROI = performanceData.sort((a, b) => b.metrics.roi - a.metrics.roi);
        summary.topPerformingChannel = sortedByROI[0]?.channel || '';
        summary.worstPerformingChannel = sortedByROI[sortedByROI.length - 1]?.channel || '';
        res.json({
            success: true,
            data: {
                summary,
                channels: performanceData,
                recommendations: generateChannelRecommendations(performanceData)
            }
        });
    }
    catch (error) {
        console.error('Channel performance error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to analyze channel performance'
        });
    }
});
router.get('/channels/interactions', authenticateToken, [
    query('minJourneys').optional().isInt({ min: 1 })
], validateRequest, async (req, res) => {
    try {
        const { minJourneys = 10 } = req.query;
        const allJourneys = Array.from(journeyTracker['journeys'].values());
        const interactions = attributionService.analyzeCrossChannelInteractions(allJourneys);
        const significantInteractions = interactions.filter(i => i.channels.length >= 2);
        res.json({
            success: true,
            data: {
                interactions: significantInteractions,
                insights: generateInteractionInsights(significantInteractions),
                recommendations: generateSequenceRecommendations(significantInteractions)
            }
        });
    }
    catch (error) {
        console.error('Cross-channel interaction error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to analyze cross-channel interactions'
        });
    }
});
router.post('/campaign/roi', authenticateToken, [
    body('campaign').isString().notEmpty(),
    body('cost').isFloat({ min: 0 }),
    body('startDate').optional().isISO8601(),
    body('endDate').optional().isISO8601()
], validateRequest, async (req, res) => {
    try {
        const { campaign, cost, startDate, endDate } = req.body;
        const allJourneys = Array.from(journeyTracker['journeys'].values());
        const campaignJourneys = allJourneys.filter(j => {
            if (startDate && j.startTime < new Date(startDate))
                return false;
            if (endDate && j.startTime > new Date(endDate))
                return false;
            return j.touchpoints.some(tp => tp.details.emailCampaign === campaign);
        });
        const roi = attributionService.calculateCampaignROI(campaign, campaignJourneys, cost);
        const recommendations = generateCampaignRecommendations(roi, campaign);
        res.json({
            success: true,
            data: {
                campaign,
                journeys: campaignJourneys.length,
                ...roi,
                recommendations
            }
        });
    }
    catch (error) {
        console.error('Campaign ROI error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to calculate campaign ROI'
        });
    }
});
router.get('/dashboard', authenticateToken, [
    query('timeRange').optional().isIn(['today', 'week', 'month', 'quarter', 'year']),
    query('refresh').optional().isBoolean()
], validateRequest, async (req, res) => {
    try {
        const { timeRange = 'month' } = req.query;
        const endDate = new Date();
        const startDate = new Date();
        switch (timeRange) {
            case 'today':
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'week':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case 'quarter':
                startDate.setMonth(startDate.getMonth() - 3);
                break;
            case 'year':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
        }
        const allJourneys = Array.from(journeyTracker['journeys'].values());
        const rangeJourneys = allJourneys.filter(j => j.startTime >= startDate && j.startTime <= endDate);
        const totalJourneys = rangeJourneys.length;
        const convertedJourneys = rangeJourneys.filter(j => j.conversionEvents.length > 0);
        const conversionRate = totalJourneys > 0 ? (convertedJourneys.length / totalJourneys) * 100 : 0;
        const channelPerformance = attributionService.analyzeChannelPerformance(rangeJourneys);
        const channelData = Array.from(channelPerformance.values());
        const sampleJourney = convertedJourneys[0];
        let modelComparison = null;
        if (sampleJourney) {
            const models = ['first-touch', 'last-touch', 'linear', 'time-decay', 'position-based', 'data-driven'];
            modelComparison = models.map(model => {
                const result = attributionService.calculateAttribution(sampleJourney, model);
                return {
                    model,
                    confidence: result.confidence,
                    topChannel: result.touchpoints
                        .sort((a, b) => b.attribution - a.attribution)[0]?.touchpoint.channel
                };
            });
        }
        const interactions = attributionService.analyzeCrossChannelInteractions(convertedJourneys);
        const topInteractions = interactions.slice(0, 5);
        const journeyStages = convertedJourneys.map(j => attributionService.mapJourneyStages(j));
        const averageStages = calculateAverageStages(journeyStages);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recentJourneys = rangeJourneys.filter(j => j.lastActivity >= oneHourAgo);
        const recentConversions = recentJourneys.filter(j => j.conversionEvents.some(e => e.timestamp >= oneHourAgo));
        res.json({
            success: true,
            data: {
                summary: {
                    timeRange,
                    totalJourneys,
                    conversions: convertedJourneys.length,
                    conversionRate: Math.round(conversionRate * 100) / 100,
                    averageTouchpoints: Math.round(rangeJourneys.reduce((sum, j) => sum + j.touchpoints.length, 0) / (totalJourneys || 1)),
                    topChannel: channelData.sort((a, b) => b.metrics.conversions - a.metrics.conversions)[0]?.channel
                },
                realTime: {
                    activeJourneys: recentJourneys.length,
                    recentConversions: recentConversions.length,
                    currentVisitors: recentJourneys.filter(j => j.status === 'active').length,
                    conversionTrend: calculateTrend(convertedJourneys, 'hourly')
                },
                channels: channelData.map(c => ({
                    channel: c.channel,
                    conversions: c.metrics.conversions,
                    revenue: c.metrics.revenue,
                    roi: c.metrics.roi,
                    attribution: c.attribution.dataDriven
                })),
                modelComparison,
                topInteractions: topInteractions.map(i => ({
                    channels: i.channels,
                    synergyScore: i.synergyScore,
                    conversionLift: i.conversionLift
                })),
                journeyStages: averageStages,
                insights: generateDashboardInsights(conversionRate, channelData, interactions, averageStages)
            }
        });
    }
    catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate dashboard data'
        });
    }
});
function calculateTouchpointValue(interaction, channel) {
    const interactionValues = {
        'page_view': 10,
        'form_start': 30,
        'form_complete': 100,
        'content_download': 50,
        'email_open': 15,
        'email_click': 25,
        'chat_interaction': 60,
        'phone_call': 80,
        'demo_request': 90,
        'pricing_view': 40,
        'video_view': 35
    };
    const channelMultipliers = {
        'organic': 1.5,
        'direct': 1.3,
        'referral': 1.2,
        'email': 1.1,
        'paid': 1.0,
        'social': 0.9
    };
    const baseValue = interactionValues[interaction] || 10;
    const multiplier = channelMultipliers[channel] || 1.0;
    return Math.round(baseValue * multiplier);
}
function generateModelComparisonInsights(comparison) {
    const insights = [];
    const highestConfidence = comparison.sort((a, b) => b.confidence - a.confidence)[0];
    insights.push(`${highestConfidence.model} model shows highest confidence (${Math.round(highestConfidence.confidence * 100)}%)`);
    const topChannels = comparison.map(c => c.topChannel?.[0]);
    const uniqueChannels = [...new Set(topChannels)];
    if (uniqueChannels.length === 1) {
        insights.push(`All models agree on ${uniqueChannels[0]} as top performing channel`);
    }
    else {
        insights.push('Models show different channel priorities - consider using data-driven model');
    }
    return insights;
}
function generateChannelRecommendations(channels) {
    const recommendations = [];
    channels.forEach(channel => {
        if (channel.metrics.roi > 200) {
            recommendations.push({
                channel: channel.channel,
                action: 'increase_budget',
                reason: `High ROI of ${Math.round(channel.metrics.roi)}%`,
                expectedImpact: '25% increase in conversions'
            });
        }
        else if (channel.metrics.roi < 50) {
            recommendations.push({
                channel: channel.channel,
                action: 'optimize_or_reduce',
                reason: `Low ROI of ${Math.round(channel.metrics.roi)}%`,
                expectedImpact: 'Improved overall campaign efficiency'
            });
        }
        if (channel.metrics.cpa > 500) {
            recommendations.push({
                channel: channel.channel,
                action: 'reduce_cpa',
                reason: `High acquisition cost of $${Math.round(channel.metrics.cpa)}`,
                expectedImpact: '30% reduction in acquisition costs'
            });
        }
    });
    return recommendations;
}
function generateInteractionInsights(interactions) {
    const insights = [];
    const highSynergy = interactions.filter(i => i.synergyScore > 1.5);
    if (highSynergy.length > 0) {
        insights.push(`${highSynergy[0].channels.join(' + ')} showing strong synergy with ${Math.round(highSynergy[0].conversionLift)}% lift`);
    }
    const bestSequence = interactions[0];
    if (bestSequence) {
        insights.push(`Optimal channel sequence: ${bestSequence.recommendedSequence.join(' → ')}`);
    }
    return insights;
}
function generateSequenceRecommendations(interactions) {
    return interactions.slice(0, 3).map(interaction => ({
        currentSequence: interaction.sequence,
        recommendedSequence: interaction.recommendedSequence,
        expectedLift: `${Math.round(interaction.conversionLift)}%`,
        implementation: `Prioritize ${interaction.recommendedSequence[0]} for initial contact`
    }));
}
function generateCampaignRecommendations(roi, campaign) {
    const recommendations = [];
    if (roi.roi > 150) {
        recommendations.push({
            type: 'scale',
            message: `${campaign} showing strong ROI of ${Math.round(roi.roi)}%`,
            action: 'Increase budget by 50%'
        });
    }
    else if (roi.roi < 50) {
        recommendations.push({
            type: 'optimize',
            message: `${campaign} underperforming with ${Math.round(roi.roi)}% ROI`,
            action: 'Review targeting and creative'
        });
    }
    if (roi.cpa > 200) {
        recommendations.push({
            type: 'efficiency',
            message: `High CPA of $${Math.round(roi.cpa)}`,
            action: 'Improve conversion rate optimization'
        });
    }
    const models = Object.entries(roi.attributionBreakdown);
    const maxDifference = Math.max(...models.map(([, v]) => Number(v))) - Math.min(...models.map(([, v]) => Number(v)));
    if (maxDifference > roi.revenue * 0.3) {
        recommendations.push({
            type: 'attribution',
            message: 'Large variance between attribution models',
            action: 'Use data-driven model for accurate measurement'
        });
    }
    return recommendations;
}
function calculateAverageStages(journeyStages) {
    if (journeyStages.length === 0)
        return [];
    const stageMap = new Map();
    journeyStages.forEach(stages => {
        stages.forEach(stage => {
            if (!stageMap.has(stage.stage)) {
                stageMap.set(stage.stage, {
                    stage: stage.stage,
                    totalDuration: 0,
                    totalConversionRate: 0,
                    count: 0,
                    optimizations: new Set()
                });
            }
            const data = stageMap.get(stage.stage);
            data.totalDuration += stage.duration;
            data.totalConversionRate += stage.conversionRate;
            data.count += 1;
            stage.optimizationOpportunities.forEach((opt) => data.optimizations.add(opt));
        });
    });
    return Array.from(stageMap.values()).map(data => ({
        stage: data.stage,
        averageDuration: data.totalDuration / data.count,
        averageConversionRate: data.totalConversionRate / data.count,
        optimizationOpportunities: Array.from(data.optimizations)
    }));
}
function calculateTrend(journeys, period) {
    const now = Date.now();
    const periods = period === 'hourly' ? 24 : period === 'daily' ? 7 : 4;
    const periodMs = period === 'hourly' ? 60 * 60 * 1000 : period === 'daily' ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
    const trend = [];
    for (let i = periods - 1; i >= 0; i--) {
        const startTime = now - (i + 1) * periodMs;
        const endTime = now - i * periodMs;
        const periodJourneys = journeys.filter(j => {
            const time = j.startTime.getTime();
            return time >= startTime && time < endTime;
        });
        trend.push(periodJourneys.length);
    }
    return trend;
}
function generateDashboardInsights(conversionRate, channels, interactions, stages) {
    const insights = [];
    if (conversionRate < 2) {
        insights.push({
            type: 'warning',
            message: `Conversion rate (${conversionRate.toFixed(2)}%) below target of 3%`,
            action: 'Implement conversion optimization strategies',
            priority: 'high'
        });
    }
    else if (conversionRate > 3) {
        insights.push({
            type: 'success',
            message: `Conversion rate (${conversionRate.toFixed(2)}%) exceeding target`,
            action: 'Scale successful strategies',
            priority: 'medium'
        });
    }
    const underperformingChannels = channels.filter(c => c.metrics.roi < 50);
    if (underperformingChannels.length > 0) {
        insights.push({
            type: 'optimization',
            message: `${underperformingChannels.length} channels underperforming`,
            action: 'Review channel strategy and budget allocation',
            priority: 'high'
        });
    }
    const highSynergyPairs = interactions.filter(i => i.synergyScore > 1.5);
    if (highSynergyPairs.length > 0) {
        insights.push({
            type: 'opportunity',
            message: 'Strong channel synergies detected',
            action: `Prioritize ${highSynergyPairs[0].channels.join(' + ')} combination`,
            priority: 'medium'
        });
    }
    const bottlenecks = stages.filter(s => s.averageConversionRate < 50);
    if (bottlenecks.length > 0) {
        insights.push({
            type: 'bottleneck',
            message: `Conversion bottleneck at ${bottlenecks[0].stage} stage`,
            action: bottlenecks[0].optimizationOpportunities[0] || 'Optimize user experience',
            priority: 'high'
        });
    }
    return insights;
}
export default router;
//# sourceMappingURL=attribution.js.map