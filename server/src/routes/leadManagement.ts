/**
 * Lead Management Routes
 * Advanced lead scoring, analytics, and CRM integration endpoints
 */

import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { 
  calculateLeadScore, 
  getLeadRouting,
  calculateLeadTrend,
  predictCustomerLifetimeValue,
  BehavioralData,
  EnrichedLeadData
} from '../services/leadScoring.js';
import {
  journeyTracker,
  calculateFunnelMetrics,
  generateOptimizationRecommendations,
  TouchPoint,
  CustomerJourney
} from '../services/leadAnalytics.js';
import { crmManager } from '../services/crmIntegration.js';
import {
  generatePersonalizationStrategy,
  optimizeForm,
  generateDynamicPricing,
  generateExitIntentStrategy,
  createABTest,
  calculateTestResults,
  generateConversionRecommendations
} from '../services/conversionOptimization.js';
import { LeadFormData } from '../validators/formValidators.js';
import { authenticateToken } from '../middleware/auth.js';
import { cacheResponse, cacheQuery } from '../middleware/caching.js';
import { optimizeQueryPerformance } from '../middleware/performance.js';

const router = express.Router();

/**
 * Score a lead based on form data and behavioral metrics
 * POST /api/leads/score
 */
router.post('/score', authenticateToken, async (req: any, res: any, next: any) => {
  try {
    const startTime = Date.now();
    const { formData, behavioral, sessionId } = req.body;

    // Validate input
    if (!formData || !formData.email) {
      return res.status(400).json({
        success: false,
        error: 'Form data with email is required'
      });
    }

    // Create enriched lead data
    const enrichedLead: EnrichedLeadData = {
      ...formData,
      behavioral
    };

    // Calculate lead score
    const score = await optimizeQueryPerformance(
      () => calculateLeadScore(enrichedLead, behavioral),
      'lead_scoring'
    );

    // Get routing recommendation
    const routing = getLeadRouting(score);

    // Track in customer journey if session provided
    let journey: CustomerJourney | undefined;
    if (sessionId) {
      const touchpoint: TouchPoint = {
        timestamp: new Date(),
        type: 'form_complete',
        channel: 'organic', // Would be determined from referrer
        details: {
          formFields: Object.keys(formData)
        },
        value: 100
      };
      
      journey = journeyTracker.trackTouchpoint(sessionId, touchpoint, `lead_${Date.now()}`);
      journey.leadScore = score;
    }

    // Sync to CRM if configured
    let crmSyncResult = null;
    if (crmManager.getStatus().hasActiveIntegration) {
      crmSyncResult = await crmManager.syncLead(formData, score, journey);
    }

    // Predict customer lifetime value
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
  } catch (error) {
    next(error);
  }
});

/**
 * Track customer journey touchpoint
 * POST /api/leads/journey/track
 */
router.post('/journey/track', async (req: any, res: any, next: any) => {
  try {
    const { sessionId, touchpoint, leadId } = req.body;

    if (!sessionId || !touchpoint) {
      return res.status(400).json({
        success: false,
        error: 'Session ID and touchpoint data required'
      });
    }

    // Create touchpoint with proper typing
    const tp: TouchPoint = {
      timestamp: new Date(touchpoint.timestamp || Date.now()),
      type: touchpoint.type,
      channel: touchpoint.channel || 'direct',
      details: touchpoint.details || {},
      value: touchpoint.value || 10
    };

    // Track touchpoint
    const journey = journeyTracker.trackTouchpoint(sessionId, tp, leadId);

    // Calculate metrics
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
  } catch (error) {
    next(error);
  }
});

/**
 * Get customer journey details
 * GET /api/leads/journey/:id
 */
router.get('/journey/:id', 
  authenticateToken,
  cacheResponse(60, 'journey'),
  async (req: any, res: any, next: any) => {
  try {
    const journey = journeyTracker.getJourney(req.params.id);

    if (!journey) {
      return res.status(404).json({
        success: false,
        error: 'Journey not found'
      });
    }

    const metrics = journeyTracker.calculateLeadMetrics(journey.leadId);

    res.json({
      success: true,
      data: {
        journey,
        metrics
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Get personalization strategy for a lead
 * POST /api/leads/personalize
 */
router.post('/personalize', async (req: any, res: any, next: any) => {
  try {
    const { score, sessionId } = req.body;

    if (!score) {
      return res.status(400).json({
        success: false,
        error: 'Lead score data required'
      });
    }

    // Get journey if available
    const journey = sessionId ? journeyTracker.getJourney(sessionId) : undefined;

    // Generate personalization strategies
    const strategies = generatePersonalizationStrategy(score, journey);

    // Generate form optimization
    const formOptimization = optimizeForm(score);

    // Generate dynamic pricing
    const pricing = generateDynamicPricing(score);

    // Generate conversion recommendations
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
  } catch (error) {
    next(error);
  }
});

/**
 * Handle exit intent
 * POST /api/leads/exit-intent
 */
router.post('/exit-intent', async (req: any, res: any, next: any) => {
  try {
    const { score, timeOnPage, scrollDepth, sessionId } = req.body;

    if (!score) {
      return res.status(400).json({
        success: false,
        error: 'Lead score required'
      });
    }

    // Generate exit intent strategy
    const strategy = generateExitIntentStrategy(
      score,
      timeOnPage || 0,
      scrollDepth || 0
    );

    // Track exit intent as touchpoint if session exists
    if (sessionId && strategy.show) {
      const touchpoint: TouchPoint = {
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
  } catch (error) {
    next(error);
  }
});

/**
 * Get funnel analytics
 * GET /api/leads/analytics/funnel
 */
router.get('/analytics/funnel',
  authenticateToken,
  cacheResponse(300, 'analytics'),
  async (req: any, res: any, next: any) => {
  try {
    // Get all journeys (in production, would filter by date range)
    const allJourneys = Array.from({ length: 100 }, (_, i) => {
      const journey = journeyTracker.getJourney(`session_${i}`);
      return journey;
    }).filter(Boolean) as CustomerJourney[];

    // Calculate funnel metrics
    const funnelMetrics = calculateFunnelMetrics(allJourneys);

    // Generate optimization recommendations
    const leadMetrics = {
      conversionRate: funnelMetrics.overallConversion,
      averageTimeToConversion: 24,
      touchpointsToConversion: 5,
      leadQualityScore: 65,
      engagementScore: 70,
      sourceROI: { organic: 150, paid: 80, social: 60 },
      predictedConversionProbability: 0.35
    };

    const recommendations = generateOptimizationRecommendations(
      leadMetrics,
      funnelMetrics
    );

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
  } catch (error) {
    next(error);
  }
});

/**
 * Get cohort analysis
 * GET /api/leads/analytics/cohort
 */
router.get('/analytics/cohort',
  authenticateToken,
  cacheResponse(600, 'cohort'),
  async (req: any, res: any, next: any) => {
  try {
    const { startDate, endDate, period = 'weekly' } = req.query;

    const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate as string) : new Date();

    const cohortAnalysis = journeyTracker.analyzeCohort(
      start,
      end,
      period as 'daily' | 'weekly' | 'monthly'
    );

    res.json({
      success: true,
      data: cohortAnalysis
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Create A/B test
 * POST /api/leads/ab-test/create
 */
router.post('/ab-test/create', 
  authenticateToken,
  async (req: any, res: any, next: any) => {
  try {
    const { name, hypothesis, variants } = req.body;

    if (!name || !hypothesis || !variants || variants.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Test name, hypothesis, and at least 2 variants required'
      });
    }

    const testConfig = createABTest(name, hypothesis, variants);

    res.json({
      success: true,
      data: testConfig
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Get A/B test results
 * POST /api/leads/ab-test/results
 */
router.post('/ab-test/results',
  authenticateToken,
  async (req: any, res: any, next: any) => {
  try {
    const { testConfig } = req.body;

    if (!testConfig) {
      return res.status(400).json({
        success: false,
        error: 'Test configuration required'
      });
    }

    const results = calculateTestResults(testConfig);

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Get lead quality trends
 * GET /api/leads/trends
 */
router.get('/trends',
  authenticateToken,
  cacheResponse(3600, 'trends'),
  async (req: any, res: any, next: any) => {
  try {
    // Simulated historical scores (in production, would fetch from database)
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
  } catch (error) {
    next(error);
  }
});

/**
 * Get CRM integration status
 * GET /api/leads/crm/status
 */
router.get('/crm/status',
  authenticateToken,
  async (req: any, res: any, next: any) => {
  try {
    const status = crmManager.getStatus();

    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Configure CRM integration
 * POST /api/leads/crm/configure
 */
router.post('/crm/configure',
  authenticateToken,
  async (req: any, res: any, next: any) => {
  try {
    const { provider } = req.body;

    if (!provider) {
      return res.status(400).json({
        success: false,
        error: 'CRM provider required'
      });
    }

    const success = crmManager.setActiveIntegration(provider);

    if (!success) {
      return res.status(400).json({
        success: false,
        error: `CRM provider ${provider} not available`
      });
    }

    res.json({
      success: true,
      data: {
        message: `CRM integration set to ${provider}`,
        status: crmManager.getStatus()
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;