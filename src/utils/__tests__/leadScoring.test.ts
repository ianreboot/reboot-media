/**
 * Lead Scoring Algorithm Unit Tests
 * Tests the core business logic for lead qualification and prioritization
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Lead scoring utility functions
const calculateCompanyScoreFromRevenue = (revenue: number): number => {
  if (revenue < 100000) return 10; // Too small
  if (revenue < 500000) return 30; // Below target range
  if (revenue <= 1500000) return 100; // Sweet spot
  if (revenue <= 5000000) return 70; // Above target but workable
  return 40; // Enterprise - different service needed
};

const calculateUrgencyScore = (urgency: string): number => {
  const urgencyMap: Record<string, number> = {
    'immediate': 100,
    'next_quarter': 80,
    'this_quarter': 70,
    'next_6_months': 50,
    'exploring': 30,
    'no_timeline': 10
  };
  return urgencyMap[urgency] || 20;
};

const calculateBudgetScore = (budget: number, revenue: number): number => {
  if (revenue === 0 || budget < 0) return 20; // Handle edge cases
  
  const budgetToRevenueRatio = budget / revenue;
  
  if (budgetToRevenueRatio >= 0.05) return 100; // 5%+ is excellent
  if (budgetToRevenueRatio >= 0.03) return 80;  // 3-5% is good
  if (budgetToRevenueRatio >= 0.02) return 60;  // 2-3% is acceptable
  if (budgetToRevenueRatio >= 0.01) return 40;  // 1-2% is low
  return 20; // <1% is very low
};

const calculatePainPointScore = (painPoints: string[]): number => {
  const highValuePainPoints = [
    'revenue_plateau',
    'customer_acquisition_stall',
    'competitive_pressure',
    'market_expansion_barriers',
    'scaling_operations',
    'product_market_fit_erosion'
  ];
  
  const moderateValuePainPoints = [
    'marketing_attribution',
    'lead_quality',
    'sales_conversion',
    'brand_positioning',
    'content_strategy',
    'digital_transformation'
  ];
  
  let score = 0;
  painPoints.forEach(pain => {
    if (highValuePainPoints.includes(pain)) {
      score += 20; // High-value pain points
    } else if (moderateValuePainPoints.includes(pain)) {
      score += 10; // Moderate-value pain points
    } else {
      score += 5; // Generic pain points
    }
  });
  
  return Math.min(score, 100); // Cap at 100
};

const calculateAuthorityScore = (title: string, decisionRole: string): number => {
  const executiveTitles = ['ceo', 'founder', 'president', 'owner'];
  const marketingTitles = ['cmo', 'vp marketing', 'marketing director'];
  const influencerTitles = ['head of growth', 'growth director', 'revenue ops'];
  
  const titleLower = title.toLowerCase();
  
  let titleScore = 30; // Default
  if (executiveTitles.some(t => titleLower.includes(t))) titleScore = 100;
  else if (marketingTitles.some(t => titleLower.includes(t))) titleScore = 90;
  else if (influencerTitles.some(t => titleLower.includes(t))) titleScore = 80;
  
  let roleScore = 30; // Default
  if (decisionRole === 'final_decision_maker') roleScore = 100;
  else if (decisionRole === 'primary_influencer') roleScore = 80;
  else if (decisionRole === 'team_member') roleScore = 60;
  
  return Math.round((titleScore + roleScore) / 2);
};

interface LeadData {
  company: {
    revenue: number;
    industry: string;
    size: number;
  };
  contact: {
    title: string;
    decisionRole: string;
  };
  qualification: {
    urgency: string;
    budget: number;
    painPoints: string[];
    previousExperience: string;
  };
  engagement: {
    formSource: string;
    sessionDuration: number;
    pagesViewed: number;
    contentDownloads: number;
  };
}

const calculateLeadScore = (leadData: LeadData): {
  totalScore: number;
  tier: 'hot' | 'warm' | 'cold';
  components: {
    company: number;
    urgency: number;
    budget: number;
    authority: number;
    painPoints: number;
    engagement: number;
  };
} => {
  const companyScore = calculateCompanyScoreFromRevenue(leadData.company.revenue);
  const urgencyScore = calculateUrgencyScore(leadData.qualification.urgency);
  const budgetScore = calculateBudgetScore(leadData.qualification.budget, leadData.company.revenue);
  const authorityScore = calculateAuthorityScore(leadData.contact.title, leadData.contact.decisionRole);
  const painPointScore = calculatePainPointScore(leadData.qualification.painPoints);
  
  // Calculate engagement score
  let engagementScore = 0;
  engagementScore += Math.min(leadData.engagement.sessionDuration / 60, 10) * 5; // Max 50 points
  engagementScore += Math.min(leadData.engagement.pagesViewed, 10) * 3; // Max 30 points
  engagementScore += leadData.engagement.contentDownloads * 10; // 10 points per download
  engagementScore = Math.min(engagementScore, 100);
  
  // Weighted total score
  const totalScore = Math.round(
    (companyScore * 0.25) + 
    (urgencyScore * 0.20) + 
    (budgetScore * 0.20) + 
    (authorityScore * 0.15) + 
    (painPointScore * 0.15) + 
    (engagementScore * 0.05)
  );
  
  // Determine tier
  let tier: 'hot' | 'warm' | 'cold' = 'cold';
  if (totalScore >= 75) tier = 'hot';
  else if (totalScore >= 50) tier = 'warm';
  
  return {
    totalScore,
    tier,
    components: {
      company: companyScore,
      urgency: urgencyScore,
      budget: budgetScore,
      authority: authorityScore,
      painPoints: painPointScore,
      engagement: Math.round(engagementScore)
    }
  };
};

describe('Lead Scoring Algorithm', () => {
  describe('Company Revenue Scoring', () => {
    it('should score companies in target revenue range (500K-1.5M) as highest value', () => {
      expect(calculateCompanyScoreFromRevenue(750000)).toBe(100);
      expect(calculateCompanyScoreFromRevenue(500000)).toBe(100);
      expect(calculateCompanyScoreFromRevenue(1500000)).toBe(100);
    });

    it('should score small companies as low value', () => {
      expect(calculateCompanyScoreFromRevenue(50000)).toBe(10);
      expect(calculateCompanyScoreFromRevenue(99999)).toBe(10);
    });

    it('should score growing companies below target as moderate value', () => {
      expect(calculateCompanyScoreFromRevenue(300000)).toBe(30);
      expect(calculateCompanyScoreFromRevenue(450000)).toBe(30);
    });

    it('should score large companies above target as workable but lower', () => {
      expect(calculateCompanyScoreFromRevenue(2000000)).toBe(70);
      expect(calculateCompanyScoreFromRevenue(5000000)).toBe(70);
    });

    it('should score enterprise companies as different service needed', () => {
      expect(calculateCompanyScoreFromRevenue(10000000)).toBe(40);
    });
  });

  describe('Urgency Scoring', () => {
    it('should score immediate needs as highest priority', () => {
      expect(calculateUrgencyScore('immediate')).toBe(100);
    });

    it('should score quarterly timelines appropriately', () => {
      expect(calculateUrgencyScore('next_quarter')).toBe(80);
      expect(calculateUrgencyScore('this_quarter')).toBe(70);
    });

    it('should score longer timelines as lower priority', () => {
      expect(calculateUrgencyScore('next_6_months')).toBe(50);
      expect(calculateUrgencyScore('exploring')).toBe(30);
      expect(calculateUrgencyScore('no_timeline')).toBe(10);
    });

    it('should handle unknown urgency levels', () => {
      expect(calculateUrgencyScore('unknown')).toBe(20);
      expect(calculateUrgencyScore('')).toBe(20);
    });
  });

  describe('Budget Scoring', () => {
    it('should score high budget-to-revenue ratios as excellent', () => {
      expect(calculateBudgetScore(50000, 1000000)).toBe(100); // 5%
      expect(calculateBudgetScore(75000, 1000000)).toBe(100); // 7.5%
    });

    it('should score moderate budget ratios appropriately', () => {
      expect(calculateBudgetScore(40000, 1000000)).toBe(80); // 4%
      expect(calculateBudgetScore(25000, 1000000)).toBe(60); // 2.5%
      expect(calculateBudgetScore(15000, 1000000)).toBe(40); // 1.5%
    });

    it('should score low budget ratios as concerning', () => {
      expect(calculateBudgetScore(5000, 1000000)).toBe(20); // 0.5%
    });

    it('should handle edge cases properly', () => {
      expect(calculateBudgetScore(0, 1000000)).toBe(20);
      expect(calculateBudgetScore(10000, 0)).toBe(20); // Avoid division by zero
    });
  });

  describe('Pain Points Scoring', () => {
    it('should score high-value pain points highly', () => {
      const highValuePains = ['revenue_plateau', 'customer_acquisition_stall'];
      expect(calculatePainPointScore(highValuePains)).toBe(40); // 2 * 20
    });

    it('should score moderate pain points moderately', () => {
      const moderatePains = ['marketing_attribution', 'lead_quality'];
      expect(calculatePainPointScore(moderatePains)).toBe(20); // 2 * 10
    });

    it('should score mixed pain points appropriately', () => {
      const mixedPains = ['revenue_plateau', 'marketing_attribution', 'other'];
      expect(calculatePainPointScore(mixedPains)).toBe(35); // 20 + 10 + 5
    });

    it('should cap total pain point scores at 100', () => {
      const manyPains = Array(10).fill('revenue_plateau');
      expect(calculatePainPointScore(manyPains)).toBe(100);
    });

    it('should handle empty pain points', () => {
      expect(calculatePainPointScore([])).toBe(0);
    });
  });

  describe('Authority Scoring', () => {
    it('should score C-level executives highest', () => {
      expect(calculateAuthorityScore('CEO', 'final_decision_maker')).toBe(100);
      expect(calculateAuthorityScore('Founder', 'final_decision_maker')).toBe(100);
    });

    it('should score marketing leaders highly', () => {
      expect(calculateAuthorityScore('CMO', 'final_decision_maker')).toBe(95);
      expect(calculateAuthorityScore('VP Marketing', 'primary_influencer')).toBe(85);
    });

    it('should score growth leaders appropriately', () => {
      expect(calculateAuthorityScore('Head of Growth', 'primary_influencer')).toBe(80);
    });

    it('should score team members with appropriate discount', () => {
      expect(calculateAuthorityScore('Marketing Manager', 'team_member')).toBe(45);
    });

    it('should handle unknown titles and roles', () => {
      expect(calculateAuthorityScore('Unknown Title', 'unknown_role')).toBe(30);
    });
  });

  describe('Complete Lead Scoring', () => {
    let idealLead: LeadData;
    let poorLead: LeadData;
    let moderateLead: LeadData;

    beforeEach(() => {
      idealLead = {
        company: {
          revenue: 1000000,
          industry: 'saas',
          size: 50
        },
        contact: {
          title: 'CEO',
          decisionRole: 'final_decision_maker'
        },
        qualification: {
          urgency: 'immediate',
          budget: 50000,
          painPoints: ['revenue_plateau', 'customer_acquisition_stall'],
          previousExperience: 'worked_with_consultants'
        },
        engagement: {
          formSource: 'content_download',
          sessionDuration: 300,
          pagesViewed: 8,
          contentDownloads: 2
        }
      };

      poorLead = {
        company: {
          revenue: 50000,
          industry: 'retail',
          size: 3
        },
        contact: {
          title: 'Marketing Intern',
          decisionRole: 'team_member'
        },
        qualification: {
          urgency: 'no_timeline',
          budget: 1000,
          painPoints: ['other'],
          previousExperience: 'no_experience'
        },
        engagement: {
          formSource: 'organic_search',
          sessionDuration: 30,
          pagesViewed: 1,
          contentDownloads: 0
        }
      };

      moderateLead = {
        company: {
          revenue: 750000,
          industry: 'manufacturing',
          size: 25
        },
        contact: {
          title: 'Marketing Director',
          decisionRole: 'primary_influencer'
        },
        qualification: {
          urgency: 'this_quarter',
          budget: 20000,
          painPoints: ['marketing_attribution', 'lead_quality'],
          previousExperience: 'some_experience'
        },
        engagement: {
          formSource: 'referral',
          sessionDuration: 180,
          pagesViewed: 5,
          contentDownloads: 1
        }
      };
    });

    it('should classify ideal leads as hot', () => {
      const result = calculateLeadScore(idealLead);
      expect(result.tier).toBe('hot');
      expect(result.totalScore).toBeGreaterThanOrEqual(75);
      
      // Verify component scores are high
      expect(result.components.company).toBe(100);
      expect(result.components.urgency).toBe(100);
      expect(result.components.authority).toBe(100);
    });

    it('should classify poor leads as cold', () => {
      const result = calculateLeadScore(poorLead);
      expect(result.tier).toBe('cold');
      expect(result.totalScore).toBeLessThan(50);
      
      // Verify component scores are low
      expect(result.components.company).toBe(10);
      expect(result.components.urgency).toBe(10);
    });

    it('should classify moderate leads appropriately', () => {
      const result = calculateLeadScore(moderateLead);
      expect(result.tier).toBe('warm');
      expect(result.totalScore).toBeGreaterThanOrEqual(50);
      expect(result.totalScore).toBeLessThan(75);
    });

    it('should provide detailed scoring breakdown', () => {
      const result = calculateLeadScore(idealLead);
      
      expect(result.components).toHaveProperty('company');
      expect(result.components).toHaveProperty('urgency');
      expect(result.components).toHaveProperty('budget');
      expect(result.components).toHaveProperty('authority');
      expect(result.components).toHaveProperty('painPoints');
      expect(result.components).toHaveProperty('engagement');
      
      // All scores should be between 0-100
      Object.values(result.components).forEach(score => {
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(100);
      });
    });

    it('should weight components correctly in total score', () => {
      // Create a minimal baseline lead with all low scores
      const minimalLead: LeadData = {
        company: { revenue: 50000, industry: 'other', size: 2 }, // Low company score
        contact: { title: 'intern', decisionRole: 'team_member' }, // Low authority
        qualification: { urgency: 'no_timeline', budget: 500, painPoints: [], previousExperience: 'none' }, // Low scores
        engagement: { formSource: 'organic', sessionDuration: 10, pagesViewed: 1, contentDownloads: 0 } // Low engagement
      };
      
      // Lead with high company score
      const highCompanyLead: LeadData = {
        ...minimalLead,
        company: { ...minimalLead.company, revenue: 1000000 } // Perfect target revenue
      };
      
      // Lead with high urgency score  
      const highUrgencyLead: LeadData = {
        ...minimalLead,
        qualification: { ...minimalLead.qualification, urgency: 'immediate' }
      };
      
      const minScore = calculateLeadScore(minimalLead);
      const companyScore = calculateLeadScore(highCompanyLead);
      const urgencyScore = calculateLeadScore(highUrgencyLead);
      
      // Verify component scores are as expected
      expect(companyScore.components.company).toBeGreaterThan(minScore.components.company);
      expect(urgencyScore.components.urgency).toBeGreaterThan(minScore.components.urgency);
      
      // Both improved leads should score higher than minimal
      expect(companyScore.totalScore).toBeGreaterThan(minScore.totalScore);
      expect(urgencyScore.totalScore).toBeGreaterThan(minScore.totalScore);
      
      // Company improvement (25% weight) should create boost at least equal to urgency (20% weight)
      const companyBoost = companyScore.totalScore - minScore.totalScore;
      const urgencyBoost = urgencyScore.totalScore - minScore.totalScore;
      
      // Both should provide positive improvements
      expect(companyBoost).toBeGreaterThan(0);
      expect(urgencyBoost).toBeGreaterThan(0);
      
      // Company boost should be at least as good as urgency boost due to higher weight
      expect(companyBoost).toBeGreaterThanOrEqual(urgencyBoost);
    });

    it('should handle edge cases and invalid data', () => {
      const edgeCaseLead: LeadData = {
        company: { revenue: 0, industry: '', size: 0 },
        contact: { title: '', decisionRole: '' },
        qualification: { urgency: '', budget: 0, painPoints: [], previousExperience: '' },
        engagement: { formSource: '', sessionDuration: 0, pagesViewed: 0, contentDownloads: 0 }
      };
      
      const result = calculateLeadScore(edgeCaseLead);
      expect(result.totalScore).toBeGreaterThanOrEqual(0);
      expect(result.totalScore).toBeLessThanOrEqual(100);
      expect(result.tier).toBe('cold');
    });
  });

  describe('Business Logic Validation', () => {
    it('should prioritize company fit over individual engagement', () => {
      const perfectCompanyLowEngagement: LeadData = {
        company: { revenue: 1000000, industry: 'saas', size: 50 },
        contact: { title: 'CEO', decisionRole: 'final_decision_maker' },
        qualification: { urgency: 'immediate', budget: 50000, painPoints: ['revenue_plateau'], previousExperience: 'yes' },
        engagement: { formSource: 'organic', sessionDuration: 30, pagesViewed: 1, contentDownloads: 0 }
      };
      
      const poorCompanyHighEngagement: LeadData = {
        company: { revenue: 50000, industry: 'other', size: 2 },
        contact: { title: 'Marketing Intern', decisionRole: 'team_member' },
        qualification: { urgency: 'no_timeline', budget: 500, painPoints: ['other'], previousExperience: 'no' },
        engagement: { formSource: 'content', sessionDuration: 600, pagesViewed: 20, contentDownloads: 5 }
      };
      
      const scoreA = calculateLeadScore(perfectCompanyLowEngagement);
      const scoreB = calculateLeadScore(poorCompanyHighEngagement);
      
      expect(scoreA.totalScore).toBeGreaterThan(scoreB.totalScore);
    });

    it('should boost scores for high-value pain points combination', () => {
      const leadWithHighValuePains: LeadData = {
        company: { revenue: 800000, industry: 'saas', size: 30 },
        contact: { title: 'VP Marketing', decisionRole: 'primary_influencer' },
        qualification: { 
          urgency: 'this_quarter', 
          budget: 25000, 
          painPoints: ['revenue_plateau', 'customer_acquisition_stall', 'competitive_pressure'], 
          previousExperience: 'some' 
        },
        engagement: { formSource: 'content', sessionDuration: 240, pagesViewed: 6, contentDownloads: 1 }
      };
      
      const leadWithLowValuePains: LeadData = {
        ...leadWithHighValuePains,
        qualification: {
          ...leadWithHighValuePains.qualification,
          painPoints: ['other', 'generic_issue', 'minor_concern']
        }
      };
      
      const scoreHigh = calculateLeadScore(leadWithHighValuePains);
      const scoreLow = calculateLeadScore(leadWithLowValuePains);
      
      expect(scoreHigh.totalScore).toBeGreaterThan(scoreLow.totalScore);
      expect(scoreHigh.components.painPoints).toBeGreaterThan(scoreLow.components.painPoints);
    });
  });
});