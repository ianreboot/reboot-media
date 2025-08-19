import express from 'express';
import { calculateLeadScore, getLeadRouting, calculateLeadTrend, predictCustomerLifetimeValue } from '../services/leadScoring.js';
import { journeyTracker, calculateFunnelMetrics, generateOptimizationRecommendations } from '../services/leadAnalytics.js';
import { crmManager } from '../services/crmIntegration.js';
import { generatePersonalizationStrategy, optimizeForm, generateDynamicPricing, generateExitIntentStrategy, createABTest, calculateTestResults, generateConversionRecommendations } from '../services/conversionOptimization.js';
import { authenticateToken } from '../middleware/auth.js';
import { cacheResponse } from '../middleware/caching.js';
import { optimizeQueryPerformance } from '../middleware/performance.js';
const router = express.Router();
router.post('/score', authenticateToken, async (req, res, next) => {
    try {
        const startTime = Date.now();
        const { formData, behavioral, sessionId } = req.body;
        if (!formData || !formData.email) {
            res.status(400).json({
                success: false,
                error: 'Form data with email is required'
            });
            return;
        }
        const enrichedLead = {
            ...formData,
            behavioral
        };
        const score = await optimizeQueryPerformance(() => Promise.resolve(calculateLeadScore(enrichedLead, behavioral)), 'lead_scoring');
        const routing = getLeadRouting(score);
        let journey;
        if (sessionId) {
            const touchpoint = {
                timestamp: new Date(),
                type: 'form_complete',
                channel: 'organic',
                details: {
                    formFields: Object.keys(formData)
                },
                value: 100
            };
            journey = journeyTracker.trackTouchpoint(sessionId, touchpoint, `lead_${Date.now()}`);
            journey.leadScore = score;
        }
        let crmSyncResult = null;
        if (crmManager.getStatus().hasActiveIntegration) {
            crmSyncResult = await crmManager.syncLead(formData, score, journey);
        }
        const clvPrediction = predictCustomerLifetimeValue(score);
        const processingTime = Date.now() - startTime;
        res.json({
            success: true,
            data: {
                score,
                routing,
                clvPrediction,
                crmSync: crmSyncResult,
                journey: journey ? {
                    touchpoints: journey.touchpoints.length,
                    status: journey.status,
                    attribution: journey.attributionData
                } : null,
                processingTime: `${processingTime}ms`
            }
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/journey/track', async (req, res, next) => {
    try {
        const { sessionId, touchpoint, leadId } = req.body;
        if (!sessionId || !touchpoint) {
            res.status(400).json({
                success: false,
                error: 'Session ID and touchpoint data required'
            });
            return;
        }
        const tp = {
            timestamp: new Date(touchpoint.timestamp || Date.now()),
            type: touchpoint.type,
            channel: touchpoint.channel || 'direct',
            details: touchpoint.details || {},
            value: touchpoint.value || 10
        };
        const journey = journeyTracker.trackTouchpoint(sessionId, tp, leadId);
        const metrics = journeyTracker.calculateLeadMetrics(leadId || sessionId);
        res.json({
            success: true,
            data: {
                journey: {
                    sessionId: journey.sessionId,
                    leadId: journey.leadId,
                    touchpoints: journey.touchpoints.length,
                    status: journey.status,
                    attribution: journey.attributionData
                },
                metrics
            }
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/journey/:id', authenticateToken, cacheResponse(60, 'journey'), async (req, res, next) => {
    try {
        const journey = journeyTracker.getJourney(req.params.id);
        if (!journey) {
            res.status(404).json({
                success: false,
                error: 'Journey not found'
            });
            return;
        }
        const metrics = journeyTracker.calculateLeadMetrics(journey.leadId);
        res.json({
            success: true,
            data: {
                journey,
                metrics
            }
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/personalize', async (req, res, next) => {
    try {
        const { score, sessionId } = req.body;
        if (!score) {
            res.status(400).json({
                success: false,
                error: 'Lead score data required'
            });
            return;
        }
        const journey = sessionId ? journeyTracker.getJourney(sessionId) : undefined;
        const strategies = generatePersonalizationStrategy(score, journey);
        const formOptimization = optimizeForm(score);
        const pricing = generateDynamicPricing(score);
        const conversionRecs = generateConversionRecommendations(score, journey);
        res.json({
            success: true,
            data: {
                strategies,
                formOptimization,
                pricing,
                recommendations: conversionRecs
            }
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/exit-intent', async (req, res, next) => {
    try {
        const { score, timeOnPage, scrollDepth, sessionId } = req.body;
        if (!score) {
            res.status(400).json({
                success: false,
                error: 'Lead score required'
            });
            return;
        }
        const strategy = generateExitIntentStrategy(score, timeOnPage || 0, scrollDepth || 0);
        if (sessionId && strategy.show) {
            const touchpoint = {
                timestamp: new Date(),
                type: 'page_view',
                channel: 'organic',
                details: {
                    url: 'exit_intent_triggered'
                },
                value: 5
            };
            journeyTracker.trackTouchpoint(sessionId, touchpoint);
        }
        res.json({
            success: true,
            data: strategy
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/analytics/funnel', authenticateToken, cacheResponse(300, 'analytics'), async (req, res, next) => {
    try {
        const allJourneys = Array.from({ length: 100 }, (_, i) => {
            const journey = journeyTracker.getJourney(`session_${i}`);
            return journey;
        }).filter(Boolean);
        const funnelMetrics = calculateFunnelMetrics(allJourneys);
        const leadMetrics = {
            conversionRate: funnelMetrics.overallConversion,
            averageTimeToConversion: 24,
            touchpointsToConversion: 5,
            leadQualityScore: 65,
            engagementScore: 70,
            sourceROI: { organic: 150, paid: 80, social: 60 },
            predictedConversionProbability: 0.35
        };
        const recommendations = generateOptimizationRecommendations(leadMetrics, funnelMetrics);
        res.json({
            success: true,
            data: {
                funnel: funnelMetrics,
                recommendations,
                summary: {
                    totalJourneys: allJourneys.length,
                    activeJourneys: allJourneys.filter(j => j.status === 'active').length,
                    convertedJourneys: allJourneys.filter(j => j.status === 'converted').length
                }
            }
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/analytics/cohort', authenticateToken, cacheResponse(600, 'cohort'), async (req, res, next) => {
    try {
        const { startDate, endDate, period = 'weekly' } = req.query;
        const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const end = endDate ? new Date(endDate) : new Date();
        const cohortAnalysis = journeyTracker.analyzeCohort(start, end, period);
        res.json({
            success: true,
            data: cohortAnalysis
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/ab-test/create', authenticateToken, async (req, res, next) => {
    try {
        const { name, hypothesis, variants } = req.body;
        if (!name || !hypothesis || !variants || variants.length < 2) {
            res.status(400).json({
                success: false,
                error: 'Test name, hypothesis, and at least 2 variants required'
            });
            return;
        }
        const testConfig = createABTest(name, hypothesis, variants);
        res.json({
            success: true,
            data: testConfig
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/ab-test/results', authenticateToken, async (req, res, next) => {
    try {
        const { testConfig } = req.body;
        if (!testConfig) {
            res.status(400).json({
                success: false,
                error: 'Test configuration required'
            });
            return;
        }
        const results = calculateTestResults(testConfig);
        res.json({
            success: true,
            data: results
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/trends', authenticateToken, cacheResponse(3600, 'trends'), async (req, res, next) => {
    try {
        const historicalScores = [
            45, 52, 48, 55, 61, 58, 63, 67, 65, 70, 72, 68, 75, 78
        ];
        const trend = calculateLeadTrend(historicalScores, 'weekly');
        res.json({
            success: true,
            data: {
                trend,
                historicalScores,
                currentAverage: historicalScores[historicalScores.length - 1]
            }
        });
    }
    catch (error) {
        next(error);
    }
});
router.get('/crm/status', authenticateToken, async (req, res, next) => {
    try {
        const status = crmManager.getStatus();
        res.json({
            success: true,
            data: status
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/crm/configure', authenticateToken, async (req, res, next) => {
    try {
        const { provider } = req.body;
        if (!provider) {
            res.status(400).json({
                success: false,
                error: 'CRM provider required'
            });
            return;
        }
        const success = crmManager.setActiveIntegration(provider);
        if (!success) {
            res.status(400).json({
                success: false,
                error: `CRM provider ${provider} not available`
            });
            return;
        }
        res.json({
            success: true,
            data: {
                message: `CRM integration set to ${provider}`,
                status: crmManager.getStatus()
            }
        });
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=leadManagement.js.map