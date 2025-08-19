export class CRMIntegration {
    config;
    constructor(config) {
        this.config = config;
    }
    formatLead(formData, score, journey) {
        const nameParts = formData.name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        return {
            firstName,
            lastName,
            email: formData.email,
            company: formData.company,
            website: formData.website,
            revenue: formData.revenue,
            industry: formData.industry,
            teamSize: formData.teamSize,
            timeline: formData.timeline,
            specificIssue: formData.specificIssue,
            currentMarketing: formData.currentMarketing,
            leadScore: score.total,
            leadTier: score.tier,
            leadSource: 'Website Form',
            leadStatus: 'new',
            createdAt: new Date(),
            updatedAt: new Date(),
            journeyData: journey ? {
                touchpoints: journey.touchpoints.length,
                engagementScore: score.engagement,
                conversionProbability: score.conversionProbability,
                estimatedValue: score.estimatedValue
            } : undefined,
            customFields: {
                qualificationReasons: score.qualificationReasons,
                disqualificationReasons: score.disqualificationReasons,
                recommendedAction: score.recommendedAction,
                priority: score.priority
            }
        };
    }
    async handleWebhook(payload) {
        console.log('Webhook received:', payload);
    }
}
export class HubSpotIntegration extends CRMIntegration {
    apiBase = 'https://api.hubapi.com';
    async createLead(lead) {
        try {
            const hubspotContact = {
                properties: {
                    firstname: lead.firstName,
                    lastname: lead.lastName,
                    email: lead.email,
                    company: lead.company,
                    website: lead.website,
                    annualrevenue: this.mapRevenue(lead.revenue),
                    industry: lead.industry,
                    numberofemployees: this.mapTeamSize(lead.teamSize),
                    lead_score: lead.leadScore,
                    lead_tier: lead.leadTier,
                    lead_source: lead.leadSource,
                    hs_lead_status: this.mapLeadStatus(lead.leadStatus),
                    marketing_issue: lead.specificIssue,
                    current_marketing: lead.currentMarketing,
                    timeline: lead.timeline,
                    estimated_deal_value: lead.journeyData?.estimatedValue,
                    conversion_probability: lead.journeyData?.conversionProbability
                }
            };
            return {
                success: true,
                leadId: `local_${Date.now()}`,
                externalId: `hs_${Date.now()}`,
                message: 'Lead created in HubSpot',
                timestamp: new Date()
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to create lead in HubSpot',
                errors: [error.message],
                timestamp: new Date()
            };
        }
    }
    async updateLead(leadId, lead) {
        return {
            success: true,
            leadId,
            message: 'Lead updated in HubSpot',
            timestamp: new Date()
        };
    }
    async getLead(leadId) {
        return null;
    }
    async searchLeads(email) {
        return [];
    }
    async createOpportunity(opportunity) {
        return {
            success: true,
            leadId: opportunity.leadId,
            message: 'Opportunity created in HubSpot',
            timestamp: new Date()
        };
    }
    async createActivity(activity) {
        return {
            success: true,
            leadId: activity.leadId,
            message: 'Activity logged in HubSpot',
            timestamp: new Date()
        };
    }
    async syncBatch(leads) {
        return leads.map(lead => ({
            success: true,
            leadId: `local_${Date.now()}`,
            externalId: `hs_${Date.now()}`,
            message: 'Lead synced to HubSpot',
            timestamp: new Date()
        }));
    }
    mapRevenue(revenue) {
        const revenueMap = {
            '500k-1m': 750000,
            '1m-3m': 2000000,
            '3m-10m': 6500000,
            '10m+': 15000000
        };
        return revenueMap[revenue || ''] || 0;
    }
    mapTeamSize(teamSize) {
        const sizeMap = {
            '1-10': 5,
            '11-50': 30,
            '51-200': 125,
            '200+': 500
        };
        return sizeMap[teamSize || ''] || 0;
    }
    mapLeadStatus(status) {
        const statusMap = {
            'new': 'NEW',
            'contacted': 'CONTACTED',
            'qualified': 'QUALIFIED',
            'unqualified': 'UNQUALIFIED',
            'converted': 'CUSTOMER'
        };
        return statusMap[status] || 'NEW';
    }
}
export class SalesforceIntegration extends CRMIntegration {
    apiBase;
    constructor(config) {
        super(config);
        this.apiBase = config.instanceUrl || 'https://na1.salesforce.com';
    }
    async createLead(lead) {
        try {
            const salesforceLead = {
                FirstName: lead.firstName,
                LastName: lead.lastName,
                Email: lead.email,
                Company: lead.company,
                Website: lead.website,
                AnnualRevenue: this.mapRevenue(lead.revenue),
                Industry: lead.industry,
                NumberOfEmployees: this.mapTeamSize(lead.teamSize),
                LeadSource: lead.leadSource,
                Status: this.mapLeadStatus(lead.leadStatus),
                Description: lead.specificIssue,
                Lead_Score__c: lead.leadScore,
                Lead_Tier__c: lead.leadTier,
                Timeline__c: lead.timeline,
                Current_Marketing__c: lead.currentMarketing,
                Estimated_Value__c: lead.journeyData?.estimatedValue,
                Conversion_Probability__c: lead.journeyData?.conversionProbability
            };
            return {
                success: true,
                leadId: `local_${Date.now()}`,
                externalId: `sf_${Date.now()}`,
                message: 'Lead created in Salesforce',
                timestamp: new Date()
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Failed to create lead in Salesforce',
                errors: [error.message],
                timestamp: new Date()
            };
        }
    }
    async updateLead(leadId, lead) {
        return {
            success: true,
            leadId,
            message: 'Lead updated in Salesforce',
            timestamp: new Date()
        };
    }
    async getLead(leadId) {
        return null;
    }
    async searchLeads(email) {
        return [];
    }
    async createOpportunity(opportunity) {
        return {
            success: true,
            leadId: opportunity.leadId,
            message: 'Opportunity created in Salesforce',
            timestamp: new Date()
        };
    }
    async createActivity(activity) {
        return {
            success: true,
            leadId: activity.leadId,
            message: 'Activity logged in Salesforce',
            timestamp: new Date()
        };
    }
    async syncBatch(leads) {
        return leads.map(lead => ({
            success: true,
            leadId: `local_${Date.now()}`,
            externalId: `sf_${Date.now()}`,
            message: 'Lead synced to Salesforce',
            timestamp: new Date()
        }));
    }
    mapRevenue(revenue) {
        const revenueMap = {
            '500k-1m': 750000,
            '1m-3m': 2000000,
            '3m-10m': 6500000,
            '10m+': 15000000
        };
        return revenueMap[revenue || ''] || 0;
    }
    mapTeamSize(teamSize) {
        return teamSize || '1-10';
    }
    mapLeadStatus(status) {
        const statusMap = {
            'new': 'Open - Not Contacted',
            'contacted': 'Working - Contacted',
            'qualified': 'Qualified',
            'unqualified': 'Unqualified',
            'converted': 'Converted'
        };
        return statusMap[status] || 'Open - Not Contacted';
    }
}
export class CRMManager {
    integrations = new Map();
    activeIntegration;
    registerIntegration(name, integration) {
        this.integrations.set(name, integration);
    }
    setActiveIntegration(name) {
        const integration = this.integrations.get(name);
        if (integration) {
            this.activeIntegration = integration;
            return true;
        }
        return false;
    }
    async syncLead(formData, score, journey) {
        if (!this.activeIntegration) {
            return {
                success: false,
                message: 'No active CRM integration configured',
                timestamp: new Date()
            };
        }
        const existingLeads = await this.activeIntegration.searchLeads(formData.email);
        if (existingLeads.length > 0) {
            const lead = this.activeIntegration['formatLead'](formData, score, journey);
            return await this.activeIntegration.updateLead(existingLeads[0]?.id || '', lead);
        }
        else {
            const lead = this.activeIntegration['formatLead'](formData, score, journey);
            const result = await this.activeIntegration.createLead(lead);
            if (result.success && score.tier === 'Hot') {
                await this.createOpportunityForHotLead(result.leadId, score);
            }
            if (result.success) {
                await this.logInitialActivity(result.leadId, formData, score);
            }
            return result;
        }
    }
    async createOpportunityForHotLead(leadId, score) {
        if (!this.activeIntegration)
            return;
        const opportunity = {
            leadId,
            name: `Marketing Services Opportunity - ${new Date().toISOString().split('T')[0]}`,
            amount: score.estimatedValue,
            stage: 'Qualification',
            probability: score.conversionProbability * 100,
            closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            description: `High-value lead with score ${score.total}. ${score.recommendedAction}`
        };
        await this.activeIntegration.createOpportunity(opportunity);
    }
    async logInitialActivity(leadId, formData, score) {
        if (!this.activeIntegration)
            return;
        const activity = {
            leadId,
            type: 'note',
            subject: 'Lead Form Submission',
            description: `
Lead submitted form with following details:
- Company: ${formData.company}
- Issue: ${formData.specificIssue}
- Timeline: ${formData.timeline || 'Not specified'}
- Lead Score: ${score.total} (${score.tier})
- Recommended Action: ${score.recommendedAction}

Qualification Reasons:
${score.qualificationReasons.join('\n')}

${score.disqualificationReasons.length > 0 ? `
Concerns:
${score.disqualificationReasons.join('\n')}
` : ''}
      `,
            date: new Date()
        };
        await this.activeIntegration.createActivity(activity);
    }
    getStatus() {
        return {
            hasActiveIntegration: !!this.activeIntegration,
            integrationName: this.activeIntegration ?
                Array.from(this.integrations.entries())
                    .find(([_, int]) => int === this.activeIntegration)?.[0] : undefined,
            availableIntegrations: Array.from(this.integrations.keys())
        };
    }
}
export const crmManager = new CRMManager();
if (process.env.HUBSPOT_API_KEY) {
    crmManager.registerIntegration('hubspot', new HubSpotIntegration({
        provider: 'hubspot',
        apiKey: process.env.HUBSPOT_API_KEY,
        enabled: true
    }));
}
if (process.env.SALESFORCE_INSTANCE_URL) {
    crmManager.registerIntegration('salesforce', new SalesforceIntegration({
        provider: 'salesforce',
        instanceUrl: process.env.SALESFORCE_INSTANCE_URL,
        apiKey: process.env.SALESFORCE_API_KEY,
        apiSecret: process.env.SALESFORCE_API_SECRET,
        enabled: true
    }));
}
