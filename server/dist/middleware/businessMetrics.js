import { performance } from 'perf_hooks';
class BusinessIntelligenceCollector {
    metrics;
    conversionGoals;
    revenuePerLead;
    constructor() {
        this.metrics = {
            leadSubmissions: new Map(),
            conversionRates: new Map(),
            revenueAttribution: new Map(),
            leadQualityScores: [],
            pageViews: new Map(),
            sessionDurations: [],
            bounceRates: new Map()
        };
        this.conversionGoals = new Map([
            ['contact_form', 0.03],
            ['newsletter', 0.05],
            ['consultation', 0.02]
        ]);
        this.revenuePerLead = 2500;
    }
    trackLeadSubmission(leadData) {
        const sourceKey = `${leadData.source}_${leadData.medium}`;
        const currentCount = this.metrics.leadSubmissions.get(sourceKey) || 0;
        this.metrics.leadSubmissions.set(sourceKey, currentCount + 1);
        this.metrics.leadQualityScores.push(leadData.qualityScore);
        const revenueValue = leadData.qualityScore * this.revenuePerLead / 100;
        const currentRevenue = this.metrics.revenueAttribution.get(sourceKey) || 0;
        this.metrics.revenueAttribution.set(sourceKey, currentRevenue + revenueValue);
        console.log(`Lead submitted: ID=${leadData.id}, Source=${leadData.source}, Score=${leadData.qualityScore}`);
    }
    trackPageView(page, source, sessionId) {
        const pageKey = `${page}_${source}`;
        const currentViews = this.metrics.pageViews.get(pageKey) || 0;
        this.metrics.pageViews.set(pageKey, currentViews + 1);
    }
    calculateConversionRate(source, page) {
        const leadKey = `${source}_${page}`;
        const viewKey = `${page}_${source}`;
        const leads = this.metrics.leadSubmissions.get(leadKey) || 0;
        const views = this.metrics.pageViews.get(viewKey) || 1;
        return (leads / views) * 100;
    }
    trackConversion(event) {
        const conversionRate = this.calculateConversionRate(event.source, 'contact');
        this.metrics.conversionRates.set(event.source, conversionRate);
        console.log(`Conversion event: Type=${event.type}, Value=${event.value}, Source=${event.source}`);
    }
    calculateLeadQualityScore(leadData) {
        let score = 0;
        const sourceWeights = {
            'organic': 85,
            'referral': 80,
            'direct': 75,
            'social': 65,
            'paid': 60,
            'email': 70
        };
        score += sourceWeights[leadData.source] || 50;
        if (leadData.timeOnPage > 120)
            score += 10;
        if (leadData.pagesViewed > 2)
            score += 5;
        if (leadData.downloadedResource)
            score += 10;
        if (leadData.watchedVideo)
            score += 8;
        if (leadData.phoneProvided)
            score += 15;
        if (leadData.companyProvided)
            score += 10;
        if (leadData.budgetProvided)
            score += 20;
        if (leadData.timelineProvided)
            score += 15;
        if (leadData.companySize === 'enterprise')
            score += 20;
        else if (leadData.companySize === 'mid-market')
            score += 15;
        else if (leadData.companySize === 'smb')
            score += 10;
        const highValueIndustries = ['technology', 'finance', 'healthcare', 'manufacturing'];
        if (highValueIndustries.includes(leadData.industry?.toLowerCase()))
            score += 10;
        return Math.min(100, Math.max(0, score));
    }
    getCurrentMetrics() {
        const avgLeadScore = this.metrics.leadQualityScores.length > 0
            ? this.metrics.leadQualityScores.reduce((a, b) => a + b, 0) / this.metrics.leadQualityScores.length
            : 0;
        const totalLeads = Array.from(this.metrics.leadSubmissions.values())
            .reduce((sum, count) => sum + count, 0);
        const totalRevenue = Array.from(this.metrics.revenueAttribution.values())
            .reduce((sum, value) => sum + value, 0);
        const avgConversionRate = Array.from(this.metrics.conversionRates.values())
            .reduce((sum, rate) => sum + rate, 0) / Math.max(1, this.metrics.conversionRates.size);
        return {
            totalLeads,
            avgLeadScore,
            totalRevenue,
            avgConversionRate,
            leadsBySource: Object.fromEntries(this.metrics.leadSubmissions),
            revenueBySource: Object.fromEntries(this.metrics.revenueAttribution),
            conversionRatesBySource: Object.fromEntries(this.metrics.conversionRates),
            timestamp: Date.now()
        };
    }
    generatePrometheusMetrics() {
        const metrics = this.getCurrentMetrics();
        let prometheusOutput = '';
        prometheusOutput += '# HELP leads_submitted_total Total number of leads submitted\n';
        prometheusOutput += '# TYPE leads_submitted_total counter\n';
        for (const [source, count] of this.metrics.leadSubmissions) {
            const [sourceType, medium] = source.split('_');
            prometheusOutput += `leads_submitted_total{source="${sourceType}",medium="${medium}"} ${count}\n`;
        }
        prometheusOutput += '# HELP revenue_attributed_total Total revenue attributed by source\n';
        prometheusOutput += '# TYPE revenue_attributed_total counter\n';
        for (const [source, revenue] of this.metrics.revenueAttribution) {
            const [sourceType, medium] = source.split('_');
            prometheusOutput += `revenue_attributed_total{source="${sourceType}",medium="${medium}"} ${revenue}\n`;
        }
        prometheusOutput += '# HELP lead_quality_score Lead quality score distribution\n';
        prometheusOutput += '# TYPE lead_quality_score histogram\n';
        const buckets = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        let cumulativeCount = 0;
        for (const bucket of buckets) {
            const countInBucket = this.metrics.leadQualityScores.filter(score => score <= bucket).length;
            cumulativeCount = countInBucket;
            prometheusOutput += `lead_quality_score_bucket{le="${bucket}"} ${cumulativeCount}\n`;
        }
        prometheusOutput += `lead_quality_score_bucket{le="+Inf"} ${this.metrics.leadQualityScores.length}\n`;
        prometheusOutput += `lead_quality_score_sum ${this.metrics.leadQualityScores.reduce((a, b) => a + b, 0)}\n`;
        prometheusOutput += `lead_quality_score_count ${this.metrics.leadQualityScores.length}\n`;
        prometheusOutput += '# HELP conversion_rate_percent Current conversion rate by source\n';
        prometheusOutput += '# TYPE conversion_rate_percent gauge\n';
        for (const [source, rate] of this.metrics.conversionRates) {
            prometheusOutput += `conversion_rate_percent{source="${source}"} ${rate}\n`;
        }
        prometheusOutput += '# HELP page_views_total Total page views by source\n';
        prometheusOutput += '# TYPE page_views_total counter\n';
        for (const [pageSource, views] of this.metrics.pageViews) {
            const [page, source] = pageSource.split('_');
            prometheusOutput += `page_views_total{page="${page}",source="${source}"} ${views}\n`;
        }
        return prometheusOutput;
    }
}
const biCollector = new BusinessIntelligenceCollector();
export const businessMetricsMiddleware = (req, res, next) => {
    const startTime = performance.now();
    const utmSource = req.query.utm_source || req.headers['x-utm-source'] || 'direct';
    const utmMedium = req.query.utm_medium || req.headers['x-utm-medium'] || 'organic';
    const utmCampaign = req.query.utm_campaign || req.headers['x-utm-campaign'] || '';
    const sessionId = req.headers['x-session-id'] || 'unknown';
    biCollector.trackPageView(req.path, utmSource, sessionId);
    res.locals.businessMetrics = {
        source: utmSource,
        medium: utmMedium,
        campaign: utmCampaign,
        sessionId,
        startTime
    };
    const originalJson = res.json;
    res.json = function (data) {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        if (req.path === '/api/v1/leads' && req.method === 'POST' && res.statusCode === 201) {
            const leadData = {
                id: data.id || 'unknown',
                source: utmSource,
                medium: utmMedium,
                campaign: utmCampaign,
                content: req.query.utm_content || '',
                term: req.query.utm_term || '',
                page: req.path,
                timestamp: Date.now(),
                qualityScore: biCollector.calculateLeadQualityScore({
                    ...req.body,
                    source: utmSource,
                    timeOnPage: parseInt(req.headers['x-time-on-page']) || 0,
                    pagesViewed: parseInt(req.headers['x-pages-viewed']) || 1
                }),
                value: 0
            };
            biCollector.trackLeadSubmission(leadData);
            biCollector.trackConversion({
                type: 'lead_form',
                value: leadData.qualityScore,
                source: utmSource,
                timestamp: Date.now(),
                sessionId
            });
        }
        console.log(`Response time: ${responseTime.toFixed(2)}ms, Method: ${req.method}, Path: ${req.path}`);
        return originalJson.call(this, data);
    };
    next();
};
export const getBusinessMetrics = (req, res) => {
    try {
        const metrics = biCollector.getCurrentMetrics();
        res.json({
            success: true,
            data: metrics,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Error getting business metrics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve business metrics'
        });
    }
};
export const getPrometheusBusinessMetrics = (req, res) => {
    try {
        const prometheusMetrics = biCollector.generatePrometheusMetrics();
        res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
        res.send(prometheusMetrics);
    }
    catch (error) {
        console.error('Error generating Prometheus metrics:', error);
        res.status(500).send('# Error generating metrics\n');
    }
};
export { BusinessIntelligenceCollector, biCollector };
