/**
 * A/B Testing Context and Provider
 * Manages experiment configuration, variant assignment, and tracking
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for A/B Testing Framework
export interface ABVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, any>;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  variants: ABVariant[];
  status: 'draft' | 'running' | 'paused' | 'completed';
  trafficSplit: number[];
  conversionGoals: string[];
  targetAudience?: AudienceFilter;
  startDate: Date;
  endDate?: Date;
  metrics: ABTestMetrics;
}

export interface AudienceFilter {
  geography?: string[];
  deviceType?: ('desktop' | 'mobile' | 'tablet')[];
  userType?: ('new' | 'returning')[];
  leadScore?: { min: number; max: number };
  revenue?: string[];
}

export interface ABTestMetrics {
  participants: number;
  conversions: Record<string, number>; // variant_id -> conversions
  conversionRate: Record<string, number>; // variant_id -> rate
  statisticalSignificance: Record<string, number>; // variant_id -> p-value
  confidence: Record<string, number>; // variant_id -> confidence level
  winner?: string; // variant_id
}

export interface ConversionEvent {
  testId: string;
  variantId: string;
  userId: string;
  eventType: string;
  timestamp: Date;
  value?: number;
  metadata?: Record<string, any>;
}

export interface UserAssignment {
  userId: string;
  assignments: Record<string, string>; // test_id -> variant_id
  createdAt: Date;
}

interface ABTestContextType {
  // Test Management
  activeTests: ABTest[];
  userAssignments: UserAssignment;
  
  // Core Methods
  getVariant: (testId: string) => string | null;
  trackConversion: (testId: string, eventType: string, value?: number) => void;
  
  // Test Configuration
  createTest: (test: Omit<ABTest, 'id' | 'metrics'>) => void;
  updateTest: (testId: string, updates: Partial<ABTest>) => void;
  startTest: (testId: string) => void;
  pauseTest: (testId: string) => void;
  stopTest: (testId: string) => void;
  
  // Analytics
  getTestResults: (testId: string) => ABTestMetrics | null;
  getConversionRate: (testId: string, variantId: string) => number;
  isStatisticallySignificant: (testId: string, variantId: string) => boolean;
  
  // Utility
  isUserInTest: (testId: string) => boolean;
  getUserId: () => string;
}

const ABTestContext = createContext<ABTestContextType | null>(null);

// Default test configurations for the marketing site
const DEFAULT_TESTS: ABTest[] = [
  {
    id: 'hero_cta_test',
    name: 'Hero CTA Button Text',
    description: 'Testing different hero CTA button text for conversion optimization',
    variants: [
      { id: 'control', name: 'Get Free Analysis', weight: 50, config: { text: 'Get Free Analysis' } },
      { id: 'variant_a', name: 'Unlock Growth Strategy', weight: 25, config: { text: 'Unlock Growth Strategy' } },
      { id: 'variant_b', name: 'Get My Custom Plan', weight: 25, config: { text: 'Get My Custom Plan' } }
    ],
    status: 'running',
    trafficSplit: [50, 25, 25],
    conversionGoals: ['form_submission', 'email_signup'],
    startDate: new Date(),
    metrics: {
      participants: 0,
      conversions: {},
      conversionRate: {},
      statisticalSignificance: {},
      confidence: {}
    }
  },
  {
    id: 'pricing_display_test',
    name: 'Pricing Display Strategy',
    description: 'Testing different pricing presentation approaches',
    variants: [
      { id: 'control', name: 'Standard Pricing', weight: 50, config: { style: 'standard' } },
      { id: 'variant_a', name: 'Value-First Pricing', weight: 50, config: { style: 'value_first' } }
    ],
    status: 'running',
    trafficSplit: [50, 50],
    conversionGoals: ['pricing_engagement', 'form_submission'],
    startDate: new Date(),
    metrics: {
      participants: 0,
      conversions: {},
      conversionRate: {},
      statisticalSignificance: {},
      confidence: {}
    }
  },
  {
    id: 'form_optimization_test',
    name: 'Lead Form Optimization',
    description: 'Testing progressive form disclosure vs standard form',
    variants: [
      { id: 'control', name: 'Standard Form', weight: 50, config: { style: 'standard' } },
      { id: 'variant_a', name: 'Progressive Form', weight: 50, config: { style: 'progressive' } }
    ],
    status: 'running',
    trafficSplit: [50, 50],
    conversionGoals: ['form_completion', 'form_submission'],
    targetAudience: {
      userType: ['new'],
      deviceType: ['desktop', 'mobile']
    },
    startDate: new Date(),
    metrics: {
      participants: 0,
      conversions: {},
      conversionRate: {},
      statisticalSignificance: {},
      confidence: {}
    }
  }
];

export const ABTestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTests, setActiveTests] = useState<ABTest[]>(DEFAULT_TESTS);
  const [userAssignments, setUserAssignments] = useState<UserAssignment>({
    userId: '',
    assignments: {},
    createdAt: new Date()
  });
  const [userId, setUserId] = useState<string>('');

  // Initialize user ID and load assignments on mount
  useEffect(() => {
    const initializeUser = () => {
      let storedUserId = localStorage.getItem('ab_test_user_id');
      if (!storedUserId) {
        storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('ab_test_user_id', storedUserId);
      }
      
      setUserId(storedUserId);
      
      // Load existing assignments
      const storedAssignments = localStorage.getItem(`ab_assignments_${storedUserId}`);
      if (storedAssignments) {
        try {
          const assignments = JSON.parse(storedAssignments);
          setUserAssignments(assignments);
        } catch (error) {
          console.error('Failed to parse stored A/B test assignments:', error);
        }
      } else {
        // Create initial assignment structure
        setUserAssignments({
          userId: storedUserId,
          assignments: {},
          createdAt: new Date()
        });
      }
    };

    initializeUser();
  }, []);

  // Save assignments when they change
  useEffect(() => {
    if (userId && userAssignments.assignments) {
      localStorage.setItem(`ab_assignments_${userId}`, JSON.stringify(userAssignments));
    }
  }, [userId, userAssignments]);

  // Hash function for consistent variant assignment
  const hashUserId = (userId: string, testId: string): number => {
    const str = `${userId}_${testId}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Assign user to variant based on traffic split
  const assignVariant = (test: ABTest): string => {
    if (userAssignments.assignments[test.id]) {
      return userAssignments.assignments[test.id];
    }

    // Check if user matches target audience
    if (test.targetAudience) {
      // For now, skip audience filtering - in production would check user attributes
    }

    const hash = hashUserId(userId, test.id);
    const bucket = hash % 100;
    
    let cumulativeWeight = 0;
    for (let i = 0; i < test.variants.length; i++) {
      cumulativeWeight += test.trafficSplit[i];
      if (bucket < cumulativeWeight) {
        const variantId = test.variants[i].id;
        
        // Store assignment
        setUserAssignments(prev => ({
          ...prev,
          assignments: {
            ...prev.assignments,
            [test.id]: variantId
          }
        }));

        // Track participation
        trackParticipation(test.id, variantId);
        
        return variantId;
      }
    }
    
    // Default to first variant if something goes wrong
    return test.variants[0].id;
  };

  // Track test participation
  const trackParticipation = (testId: string, variantId: string) => {
    setActiveTests(prev => prev.map(test => {
      if (test.id === testId) {
        return {
          ...test,
          metrics: {
            ...test.metrics,
            participants: test.metrics.participants + 1
          }
        };
      }
      return test;
    }));

    // Send to analytics (would be real analytics service in production)
    if (typeof window !== 'undefined') {
      console.log(`A/B Test Participation: ${testId} -> ${variantId}`);
    }
  };

  // Get variant for a specific test
  const getVariant = (testId: string): string | null => {
    const test = activeTests.find(t => t.id === testId);
    if (!test || test.status !== 'running') {
      return null;
    }

    return assignVariant(test);
  };

  // Track conversion event
  const trackConversion = (testId: string, eventType: string, value?: number) => {
    const variantId = userAssignments.assignments[testId];
    if (!variantId) {
      return; // User not in this test
    }

    const conversionEvent: ConversionEvent = {
      testId,
      variantId,
      userId,
      eventType,
      timestamp: new Date(),
      value,
      metadata: { userAgent: navigator.userAgent, url: window.location.href }
    };

    // Update test metrics
    setActiveTests(prev => prev.map(test => {
      if (test.id === testId) {
        const updatedConversions = {
          ...test.metrics.conversions,
          [variantId]: (test.metrics.conversions[variantId] || 0) + 1
        };

        // Calculate conversion rate
        const variantParticipants = Object.values(userAssignments.assignments).filter(v => v === variantId).length;
        const conversionRate = variantParticipants > 0 ? (updatedConversions[variantId] / variantParticipants) * 100 : 0;

        return {
          ...test,
          metrics: {
            ...test.metrics,
            conversions: updatedConversions,
            conversionRate: {
              ...test.metrics.conversionRate,
              [variantId]: conversionRate
            }
          }
        };
      }
      return test;
    }));

    // Send to analytics
    console.log('A/B Test Conversion:', conversionEvent);

    // In production, would send to real analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        test_id: testId,
        variant_id: variantId,
        event_type: eventType,
        value: value || 0
      });
    }
  };

  // Calculate statistical significance (simplified z-test)
  const calculateSignificance = (testId: string, variantId: string): number => {
    const test = activeTests.find(t => t.id === testId);
    if (!test) return 0;

    const controlVariant = test.variants[0];
    if (variantId === controlVariant.id) return 0; // Don't compare control to itself

    const controlConversions = test.metrics.conversions[controlVariant.id] || 0;
    const variantConversions = test.metrics.conversions[variantId] || 0;
    
    const controlParticipants = 100; // Simplified - in production would track actual participants per variant
    const variantParticipants = 100;

    if (controlParticipants < 30 || variantParticipants < 30) {
      return 0; // Not enough data for significance
    }

    const p1 = controlConversions / controlParticipants;
    const p2 = variantConversions / variantParticipants;
    const pooledP = (controlConversions + variantConversions) / (controlParticipants + variantParticipants);
    const se = Math.sqrt(pooledP * (1 - pooledP) * ((1 / controlParticipants) + (1 / variantParticipants)));
    
    if (se === 0) return 0;
    
    const zScore = Math.abs(p2 - p1) / se;
    
    // Convert z-score to p-value (simplified)
    const pValue = 2 * (1 - normalCdf(Math.abs(zScore)));
    
    return pValue;
  };

  // Simplified normal CDF for p-value calculation
  const normalCdf = (x: number): number => {
    return 0.5 * (1 + erf(x / Math.sqrt(2)));
  };

  // Error function approximation
  const erf = (x: number): number => {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    
    return sign * y;
  };

  // Test management functions
  const createTest = (testConfig: Omit<ABTest, 'id' | 'metrics'>) => {
    const newTest: ABTest = {
      ...testConfig,
      id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metrics: {
        participants: 0,
        conversions: {},
        conversionRate: {},
        statisticalSignificance: {},
        confidence: {}
      }
    };
    
    setActiveTests(prev => [...prev, newTest]);
  };

  const updateTest = (testId: string, updates: Partial<ABTest>) => {
    setActiveTests(prev => prev.map(test => 
      test.id === testId ? { ...test, ...updates } : test
    ));
  };

  const startTest = (testId: string) => {
    updateTest(testId, { status: 'running', startDate: new Date() });
  };

  const pauseTest = (testId: string) => {
    updateTest(testId, { status: 'paused' });
  };

  const stopTest = (testId: string) => {
    updateTest(testId, { status: 'completed', endDate: new Date() });
  };

  const getTestResults = (testId: string): ABTestMetrics | null => {
    const test = activeTests.find(t => t.id === testId);
    return test ? test.metrics : null;
  };

  const getConversionRate = (testId: string, variantId: string): number => {
    const test = activeTests.find(t => t.id === testId);
    return test?.metrics.conversionRate[variantId] || 0;
  };

  const isStatisticallySignificant = (testId: string, variantId: string): boolean => {
    const pValue = calculateSignificance(testId, variantId);
    return pValue < 0.05; // 95% confidence level
  };

  const isUserInTest = (testId: string): boolean => {
    return !!userAssignments.assignments[testId];
  };

  const getUserId = (): string => {
    return userId;
  };

  const contextValue: ABTestContextType = {
    activeTests,
    userAssignments,
    getVariant,
    trackConversion,
    createTest,
    updateTest,
    startTest,
    pauseTest,
    stopTest,
    getTestResults,
    getConversionRate,
    isStatisticallySignificant,
    isUserInTest,
    getUserId
  };

  return (
    <ABTestContext.Provider value={contextValue}>
      {children}
    </ABTestContext.Provider>
  );
};

export const useABTest = (): ABTestContextType => {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTest must be used within an ABTestProvider');
  }
  return context;
};

// Hook for easy variant access
export const useVariant = (testId: string) => {
  const { getVariant, trackConversion, isUserInTest } = useABTest();
  
  const variant = getVariant(testId);
  
  const track = (eventType: string, value?: number) => {
    trackConversion(testId, eventType, value);
  };
  
  return {
    variant,
    isInTest: isUserInTest(testId),
    track
  };
};

// Declare global gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters: any) => void;
  }
}