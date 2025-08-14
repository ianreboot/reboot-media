/**
 * CRM Integration Service
 * Unified interface for multiple CRM systems
 */

import { LeadScore } from './leadScoring.js';
import { CustomerJourney } from './leadAnalytics.js';
import { LeadFormData } from '../validators/formValidators.js';

export interface CRMConfig {
  provider: 'hubspot' | 'salesforce' | 'pipedrive' | 'custom';
  apiKey?: string;
  apiSecret?: string;
  instanceUrl?: string;
  webhookUrl?: string;
  customFieldMappings?: Record<string, string>;
  syncInterval?: number; // in minutes
  enabled: boolean;
}

export interface CRMLead {
  // Standard fields
  id?: string;
  externalId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  title?: string;
  website?: string;
  
  // Business fields
  revenue?: string;
  industry?: string;
  teamSize?: string;
  timeline?: string;
  
  // Lead qualification
  leadScore: number;
  leadTier: 'Hot' | 'Warm' | 'Cold' | 'Unqualified';
  leadSource: string;
  leadStatus: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted';
  
  // Marketing fields
  specificIssue?: string;
  currentMarketing?: string;
  campaignSource?: string;
  
  // Tracking
  createdAt: Date;
  updatedAt: Date;
  lastActivityDate?: Date;
  
  // Custom fields
  customFields?: Record<string, any>;
  
  // Journey data
  journeyData?: {
    touchpoints: number;
    engagementScore: number;
    conversionProbability: number;
    estimatedValue: number;
  };
}

export interface CRMOpportunity {
  id?: string;
  leadId: string;
  name: string;
  amount: number;
  stage: string;
  probability: number;
  closeDate: Date;
  owner?: string;
  description?: string;
  customFields?: Record<string, any>;
}

export interface CRMActivity {
  id?: string;
  leadId: string;
  type: 'email' | 'call' | 'meeting' | 'task' | 'note';
  subject: string;
  description?: string;
  date: Date;
  duration?: number; // in minutes
  outcome?: string;
  nextSteps?: string;
}

export interface CRMSyncResult {
  success: boolean;
  leadId?: string;
  externalId?: string;
  message: string;
  errors?: string[];
  timestamp: Date;
}

/**
 * Base CRM integration class
 */
export abstract class CRMIntegration {
  protected config: CRMConfig;

  constructor(config: CRMConfig) {
    this.config = config;
  }

  // Abstract methods that each CRM provider must implement
  abstract createLead(lead: CRMLead): Promise<CRMSyncResult>;
  abstract updateLead(leadId: string, lead: Partial<CRMLead>): Promise<CRMSyncResult>;
  abstract getLead(leadId: string): Promise<CRMLead | null>;
  abstract searchLeads(email: string): Promise<CRMLead[]>;
  abstract createOpportunity(opportunity: CRMOpportunity): Promise<CRMSyncResult>;
  abstract createActivity(activity: CRMActivity): Promise<CRMSyncResult>;
  abstract syncBatch(leads: CRMLead[]): Promise<CRMSyncResult[]>;

  /**
   * Convert form data to CRM lead format
   */
  protected formatLead(
    formData: LeadFormData,
    score: LeadScore,
    journey?: CustomerJourney
  ): CRMLead {
    // Parse name into first and last
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

  /**
   * Handle webhook from CRM
   */
  async handleWebhook(payload: any): Promise<void> {
    // Override in specific implementations
    console.log('Webhook received:', payload);
  }
}

/**
 * HubSpot CRM Integration
 */
export class HubSpotIntegration extends CRMIntegration {
  private apiBase = 'https://api.hubapi.com';

  async createLead(lead: CRMLead): Promise<CRMSyncResult> {
    try {
      // Format for HubSpot API
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

      // In production, make actual API call
      // const response = await fetch(`${this.apiBase}/crm/v3/objects/contacts`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${this.config.apiKey}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(hubspotContact)
      // });

      // Simulated response
      return {
        success: true,
        leadId: `local_${Date.now()}`,
        externalId: `hs_${Date.now()}`,
        message: 'Lead created in HubSpot',
        timestamp: new Date()
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to create lead in HubSpot',
        errors: [error.message],
        timestamp: new Date()
      };
    }
  }

  async updateLead(leadId: string, lead: Partial<CRMLead>): Promise<CRMSyncResult> {
    // Implementation for updating HubSpot contact
    return {
      success: true,
      leadId,
      message: 'Lead updated in HubSpot',
      timestamp: new Date()
    };
  }

  async getLead(leadId: string): Promise<CRMLead | null> {
    // Implementation for fetching HubSpot contact
    return null;
  }

  async searchLeads(email: string): Promise<CRMLead[]> {
    // Implementation for searching HubSpot contacts
    return [];
  }

  async createOpportunity(opportunity: CRMOpportunity): Promise<CRMSyncResult> {
    // Implementation for creating HubSpot deal
    return {
      success: true,
      leadId: opportunity.leadId,
      message: 'Opportunity created in HubSpot',
      timestamp: new Date()
    };
  }

  async createActivity(activity: CRMActivity): Promise<CRMSyncResult> {
    // Implementation for creating HubSpot activity
    return {
      success: true,
      leadId: activity.leadId,
      message: 'Activity logged in HubSpot',
      timestamp: new Date()
    };
  }

  async syncBatch(leads: CRMLead[]): Promise<CRMSyncResult[]> {
    // Implementation for batch sync to HubSpot
    return leads.map(lead => ({
      success: true,
      leadId: `local_${Date.now()}`,
      externalId: `hs_${Date.now()}`,
      message: 'Lead synced to HubSpot',
      timestamp: new Date()
    }));
  }

  private mapRevenue(revenue?: string): number {
    const revenueMap: Record<string, number> = {
      '500k-1m': 750000,
      '1m-3m': 2000000,
      '3m-10m': 6500000,
      '10m+': 15000000
    };
    return revenueMap[revenue || ''] || 0;
  }

  private mapTeamSize(teamSize?: string): number {
    const sizeMap: Record<string, number> = {
      '1-10': 5,
      '11-50': 30,
      '51-200': 125,
      '200+': 500
    };
    return sizeMap[teamSize || ''] || 0;
  }

  private mapLeadStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'new': 'NEW',
      'contacted': 'CONTACTED',
      'qualified': 'QUALIFIED',
      'unqualified': 'UNQUALIFIED',
      'converted': 'CUSTOMER'
    };
    return statusMap[status] || 'NEW';
  }
}

/**
 * Salesforce CRM Integration
 */
export class SalesforceIntegration extends CRMIntegration {
  private apiBase: string;

  constructor(config: CRMConfig) {
    super(config);
    this.apiBase = config.instanceUrl || 'https://na1.salesforce.com';
  }

  async createLead(lead: CRMLead): Promise<CRMSyncResult> {
    try {
      // Format for Salesforce API
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

      // In production, make actual API call using JSForce or REST API
      // const response = await connection.sobject('Lead').create(salesforceLead);

      return {
        success: true,
        leadId: `local_${Date.now()}`,
        externalId: `sf_${Date.now()}`,
        message: 'Lead created in Salesforce',
        timestamp: new Date()
      };
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to create lead in Salesforce',
        errors: [error.message],
        timestamp: new Date()
      };
    }
  }

  async updateLead(leadId: string, lead: Partial<CRMLead>): Promise<CRMSyncResult> {
    return {
      success: true,
      leadId,
      message: 'Lead updated in Salesforce',
      timestamp: new Date()
    };
  }

  async getLead(leadId: string): Promise<CRMLead | null> {
    return null;
  }

  async searchLeads(email: string): Promise<CRMLead[]> {
    return [];
  }

  async createOpportunity(opportunity: CRMOpportunity): Promise<CRMSyncResult> {
    return {
      success: true,
      leadId: opportunity.leadId,
      message: 'Opportunity created in Salesforce',
      timestamp: new Date()
    };
  }

  async createActivity(activity: CRMActivity): Promise<CRMSyncResult> {
    return {
      success: true,
      leadId: activity.leadId,
      message: 'Activity logged in Salesforce',
      timestamp: new Date()
    };
  }

  async syncBatch(leads: CRMLead[]): Promise<CRMSyncResult[]> {
    return leads.map(lead => ({
      success: true,
      leadId: `local_${Date.now()}`,
      externalId: `sf_${Date.now()}`,
      message: 'Lead synced to Salesforce',
      timestamp: new Date()
    }));
  }

  private mapRevenue(revenue?: string): number {
    const revenueMap: Record<string, number> = {
      '500k-1m': 750000,
      '1m-3m': 2000000,
      '3m-10m': 6500000,
      '10m+': 15000000
    };
    return revenueMap[revenue || ''] || 0;
  }

  private mapTeamSize(teamSize?: string): string {
    return teamSize || '1-10';
  }

  private mapLeadStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'new': 'Open - Not Contacted',
      'contacted': 'Working - Contacted',
      'qualified': 'Qualified',
      'unqualified': 'Unqualified',
      'converted': 'Converted'
    };
    return statusMap[status] || 'Open - Not Contacted';
  }
}

/**
 * CRM Manager - handles CRM selection and operations
 */
export class CRMManager {
  private integrations: Map<string, CRMIntegration> = new Map();
  private activeIntegration?: CRMIntegration;

  /**
   * Register a CRM integration
   */
  registerIntegration(name: string, integration: CRMIntegration): void {
    this.integrations.set(name, integration);
  }

  /**
   * Set active CRM integration
   */
  setActiveIntegration(name: string): boolean {
    const integration = this.integrations.get(name);
    if (integration) {
      this.activeIntegration = integration;
      return true;
    }
    return false;
  }

  /**
   * Sync lead to active CRM
   */
  async syncLead(
    formData: LeadFormData,
    score: LeadScore,
    journey?: CustomerJourney
  ): Promise<CRMSyncResult> {
    if (!this.activeIntegration) {
      return {
        success: false,
        message: 'No active CRM integration configured',
        timestamp: new Date()
      };
    }

    // Check for existing lead
    const existingLeads = await this.activeIntegration.searchLeads(formData.email);
    
    if (existingLeads.length > 0) {
      // Update existing lead
      const lead = this.activeIntegration['formatLead'](formData, score, journey);
      return await this.activeIntegration.updateLead(existingLeads[0]?.id || '', lead);
    } else {
      // Create new lead
      const lead = this.activeIntegration['formatLead'](formData, score, journey);
      const result = await this.activeIntegration.createLead(lead);

      // Create opportunity if hot lead
      if (result.success && score.tier === 'Hot') {
        await this.createOpportunityForHotLead(result.leadId!, score);
      }

      // Log initial activity
      if (result.success) {
        await this.logInitialActivity(result.leadId!, formData, score);
      }

      return result;
    }
  }

  /**
   * Create opportunity for hot leads
   */
  private async createOpportunityForHotLead(
    leadId: string,
    score: LeadScore
  ): Promise<void> {
    if (!this.activeIntegration) return;

    const opportunity: CRMOpportunity = {
      leadId,
      name: `Marketing Services Opportunity - ${new Date().toISOString().split('T')[0]}`,
      amount: score.estimatedValue,
      stage: 'Qualification',
      probability: score.conversionProbability * 100,
      closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      description: `High-value lead with score ${score.total}. ${score.recommendedAction}`
    };

    await this.activeIntegration.createOpportunity(opportunity);
  }

  /**
   * Log initial activity for new lead
   */
  private async logInitialActivity(
    leadId: string,
    formData: LeadFormData,
    score: LeadScore
  ): Promise<void> {
    if (!this.activeIntegration) return;

    const activity: CRMActivity = {
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

  /**
   * Get active integration status
   */
  getStatus(): {
    hasActiveIntegration: boolean;
    integrationName?: string;
    availableIntegrations: string[];
  } {
    return {
      hasActiveIntegration: !!this.activeIntegration,
      integrationName: this.activeIntegration ? 
        Array.from(this.integrations.entries())
          .find(([_, int]) => int === this.activeIntegration)?.[0] : undefined,
      availableIntegrations: Array.from(this.integrations.keys())
    };
  }
}

// Export singleton instance
export const crmManager = new CRMManager();

// Register default integrations (would be configured from environment in production)
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