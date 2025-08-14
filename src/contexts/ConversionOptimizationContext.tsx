/**
 * Conversion Optimization Context
 * Manages personalization, exit-intent, and conversion tracking
 */

import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';

// Lead scoring types (imported from backend integration)
export interface LeadScore {
  demographic: number;
  behavioral: number;
  firmographic: number;
  intent: number;
  engagement: number;
  total: number;
  tier: 'Hot' | 'Warm' | 'Cold' | 'Unqualified';
  priority: 1 | 2 | 3 | 4 | 5;
  recommendedAction: string;
  estimatedValue: number;
  conversionProbability: number;
  qualificationReasons: string[];
  disqualificationReasons: string[];
}

export interface BehavioralData {
  pageViews: number;
  timeOnSite: number;
  contentEngagement: string[];
  formAbandonment: boolean;
  returnVisit: boolean;
  referralSource: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  scrollDepth: number;
  interactions: InteractionEvent[];
  location?: {
    country: string;
    region: string;
    city: string;
  };
}

export interface InteractionEvent {
  type: 'click' | 'hover' | 'scroll' | 'form_focus' | 'form_abandon' | 'cta_view';
  element: string;
  timestamp: Date;
  value?: string | number;
  metadata?: Record<string, any>;
}

export interface PersonalizationConfig {
  leadTier: LeadScore['tier'];
  messaging: {
    heroTitle: string;
    heroSubtitle: string;
    ctaText: string;
    urgencyMessage?: string;
    socialProof: string;
  };
  pricing: {
    showDiscount: boolean;
    emphasizeValue: boolean;
    highlightSavings: boolean;
    customMessage?: string;
  };
  content: {
    testimonials: string[];
    caseStudies: string[];
    features: string[];
  };
}

export interface ExitIntentConfig {
  enabled: boolean;
  delay: number; // ms before showing after exit intent
  maxShows: number; // max times to show per session
  leadTierSpecific: {
    [K in LeadScore['tier']]: {
      title: string;
      message: string;
      offer: string;
      ctaText: string;
    };
  };
}

export interface ConversionFunnelStep {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  timestamp?: Date;
  value?: number;
  metadata?: Record<string, any>;
}

export interface UserSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  pageViews: string[];
  interactions: InteractionEvent[];
  behavioralData: BehavioralData;
  leadScore?: LeadScore;
  conversionFunnel: ConversionFunnelStep[];
  personalization: PersonalizationConfig;
  exitIntentShown: number;
  conversions: ConversionEvent[];
}

export interface ConversionEvent {
  id: string;
  type: 'form_submission' | 'email_signup' | 'pricing_engagement' | 'call_booking' | 'download';
  timestamp: Date;
  value: number;
  metadata?: Record<string, any>;
}

interface ConversionOptimizationContextType {
  // Session Management
  session: UserSession;
  leadScore: LeadScore | null;
  personalization: PersonalizationConfig;
  
  // Behavioral Tracking
  trackInteraction: (interaction: Omit<InteractionEvent, 'timestamp'>) => void;
  trackPageView: (page: string) => void;
  trackScrollDepth: (depth: number) => void;
  trackFormAbandonment: (formId: string, fieldName: string) => void;
  
  // Conversion Tracking
  trackConversion: (type: ConversionEvent['type'], value?: number, metadata?: Record<string, any>) => void;
  updateFunnelStep: (stepId: string, completed: boolean, value?: number, metadata?: Record<string, any>) => void;
  
  // Personalization
  updateLeadScore: (score: LeadScore) => void;
  getPersonalizedContent: (contentType: string) => any;
  getTierSpecificMessage: (messageType: string) => string;
  
  // Exit Intent
  showExitIntent: () => void;
  dismissExitIntent: () => void;
  isExitIntentEligible: () => boolean;
  
  // Analytics
  getConversionFunnelData: () => ConversionFunnelStep[];
  getBehavioralInsights: () => BehavioralData;
  getSessionDuration: () => number;
  
  // Optimization Helpers
  shouldShowUrgency: () => boolean;
  getOptimalCTAText: () => string;
  getRecommendedNextAction: () => string;
}

const ConversionOptimizationContext = createContext<ConversionOptimizationContextType | null>(null);

// Default personalization configurations for each lead tier
const TIER_PERSONALIZATION: Record<LeadScore['tier'], PersonalizationConfig> = {
  Hot: {
    leadTier: 'Hot',
    messaging: {
      heroTitle: 'Ready to Transform Your Marketing? Let\'s Talk Today.',
      heroSubtitle: 'High-growth companies need strategic marketing leadership. Get your custom growth plan in 24 hours.',
      ctaText: 'Schedule Strategy Call Now',
      urgencyMessage: '⚡ Priority Response: We\'ll contact you within 1 hour',
      socialProof: 'Join 200+ companies already accelerating growth'
    },
    pricing: {
      showDiscount: true,
      emphasizeValue: true,
      highlightSavings: true,
      customMessage: 'Enterprise pricing available - significant savings for qualified companies'
    },
    content: {
      testimonials: ['enterprise_success', 'fast_results', 'roi_focused'],
      caseStudies: ['enterprise_transformation', 'rapid_scale'],
      features: ['strategic_leadership', 'executive_support', 'rapid_implementation']
    }
  },
  Warm: {
    leadTier: 'Warm',
    messaging: {
      heroTitle: 'Scale Your Marketing with Expert CMO Guidance',
      heroSubtitle: 'Growth-stage companies trust us to build marketing systems that deliver consistent results.',
      ctaText: 'Get My Growth Strategy',
      socialProof: 'Trusted by 200+ growing companies'
    },
    pricing: {
      showDiscount: false,
      emphasizeValue: true,
      highlightSavings: false
    },
    content: {
      testimonials: ['growth_success', 'system_building', 'team_development'],
      caseStudies: ['growth_acceleration', 'system_optimization'],
      features: ['strategic_planning', 'team_coaching', 'system_building']
    }
  },
  Cold: {
    leadTier: 'Cold',
    messaging: {
      heroTitle: 'Build Marketing That Actually Drives Growth',
      heroSubtitle: 'Stop wasting money on marketing that doesn\'t work. Get a proven system that delivers results.',
      ctaText: 'Learn More',
      socialProof: 'Used by companies at every growth stage'
    },
    pricing: {
      showDiscount: false,
      emphasizeValue: true,
      highlightSavings: false
    },
    content: {
      testimonials: ['foundational_success', 'problem_solving', 'education'],
      caseStudies: ['foundation_building', 'problem_diagnosis'],
      features: ['strategic_foundation', 'problem_diagnosis', 'education']
    }
  },
  Unqualified: {
    leadTier: 'Unqualified',
    messaging: {
      heroTitle: 'Marketing Insights for Growing Businesses',
      heroSubtitle: 'Learn proven strategies used by successful companies to build sustainable growth.',
      ctaText: 'Get Free Resources',
      socialProof: 'Join thousands learning marketing strategy'
    },
    pricing: {
      showDiscount: false,
      emphasizeValue: false,
      highlightSavings: false
    },
    content: {
      testimonials: ['educational', 'inspiration', 'accessibility'],
      caseStudies: ['educational_content', 'inspiration'],
      features: ['educational_resources', 'foundational_guidance', 'community_access']
    }
  }
};

// Default exit intent configurations
const EXIT_INTENT_CONFIG: ExitIntentConfig = {
  enabled: true,
  delay: 500,
  maxShows: 2,
  leadTierSpecific: {
    Hot: {
      title: 'Wait! Let\'s Schedule Your Strategy Call',
      message: 'You\'re clearly ready for growth. Don\'t leave without booking your priority consultation.',
      offer: 'Free 30-minute strategy session + custom growth plan',
      ctaText: 'Book My Priority Call'
    },
    Warm: {
      title: 'Before You Go - Get Your Free Growth Audit',
      message: 'We can show you exactly what\'s holding back your marketing.',
      offer: 'Free marketing audit + recommendations (normally $2,500)',
      ctaText: 'Get My Free Audit'
    },
    Cold: {
      title: 'Get Our Marketing Success Framework',
      message: 'Download our proven framework used by 200+ companies.',
      offer: 'Free Marketing Growth Framework + Templates',
      ctaText: 'Download Free Framework'
    },
    Unqualified: {
      title: 'Stay Updated with Marketing Insights',
      message: 'Get weekly insights on marketing strategy and growth.',
      offer: 'Join our marketing insights newsletter',
      ctaText: 'Get Weekly Insights'
    }
  }
};

// Default funnel steps
const DEFAULT_FUNNEL_STEPS: ConversionFunnelStep[] = [
  { id: 'page_view', name: 'Page View', description: 'Visitor viewed the page', completed: false },
  { id: 'engagement', name: 'Content Engagement', description: 'Engaged with content for 30+ seconds', completed: false },
  { id: 'pricing_view', name: 'Pricing View', description: 'Viewed pricing information', completed: false },
  { id: 'form_start', name: 'Form Started', description: 'Started lead form', completed: false },
  { id: 'form_complete', name: 'Form Completed', description: 'Completed lead form', completed: false },
  { id: 'conversion', name: 'Conversion', description: 'Completed primary conversion action', completed: false }
];

export const ConversionOptimizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [leadScore, setLeadScore] = useState<LeadScore | null>(null);
  const [personalization, setPersonalization] = useState<PersonalizationConfig>(TIER_PERSONALIZATION.Unqualified);

  // Initialize session on mount
  useEffect(() => {
    const initializeSession = () => {
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const userId = localStorage.getItem('ab_test_user_id') || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const newSession: UserSession = {
        id: sessionId,
        userId,
        startTime: new Date(),
        pageViews: [window.location.pathname],
        interactions: [],
        behavioralData: {
          pageViews: 1,
          timeOnSite: 0,
          contentEngagement: [],
          formAbandonment: false,
          returnVisit: localStorage.getItem(`visited_${userId}`) !== null,
          referralSource: document.referrer || 'direct',
          deviceType: getDeviceType(),
          scrollDepth: 0,
          interactions: []
        },
        conversionFunnel: DEFAULT_FUNNEL_STEPS.map(step => 
          step.id === 'page_view' 
            ? { ...step, completed: true, timestamp: new Date() }
            : { ...step }
        ),
        personalization: TIER_PERSONALIZATION.Unqualified,
        exitIntentShown: 0,
        conversions: []
      };

      // Mark as return visitor
      localStorage.setItem(`visited_${userId}`, 'true');
      
      setSession(newSession);
    };

    initializeSession();
  }, []);

  // Track time on site
  useEffect(() => {
    const interval = setInterval(() => {
      if (session) {
        setSession(prev => prev ? {
          ...prev,
          behavioralData: {
            ...prev.behavioralData,
            timeOnSite: (Date.now() - prev.startTime.getTime()) / 1000
          }
        } : null);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [session]);

  // Set up exit intent detection
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && isExitIntentEligible()) {
        timeoutId = setTimeout(() => {
          showExitIntent();
        }, EXIT_INTENT_CONFIG.delay);
      }
    };

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [session]);

  // Device detection
  const getDeviceType = (): 'desktop' | 'mobile' | 'tablet' => {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  };

  // Track interaction
  const trackInteraction = useCallback((interaction: Omit<InteractionEvent, 'timestamp'>) => {
    const fullInteraction: InteractionEvent = {
      ...interaction,
      timestamp: new Date()
    };

    setSession(prev => {
      if (!prev) return null;
      
      const updatedSession = {
        ...prev,
        interactions: [...prev.interactions, fullInteraction],
        behavioralData: {
          ...prev.behavioralData,
          interactions: [...prev.behavioralData.interactions, fullInteraction]
        }
      };

      // Check for engagement milestone within the same state update
      if (updatedSession.behavioralData.timeOnSite >= 30 && !updatedSession.conversionFunnel.find(s => s.id === 'engagement')?.completed) {
        updatedSession.conversionFunnel = updatedSession.conversionFunnel.map(step => 
          step.id === 'engagement' 
            ? { ...step, completed: true, timestamp: new Date() }
            : step
        );
      }

      return updatedSession;
    });
  }, []);

  // Track page view
  const trackPageView = useCallback((page: string) => {
    setSession(prev => prev ? {
      ...prev,
      pageViews: [...prev.pageViews, page],
      behavioralData: {
        ...prev.behavioralData,
        pageViews: prev.behavioralData.pageViews + 1,
        contentEngagement: [...prev.behavioralData.contentEngagement, page]
      }
    } : null);
  }, []);

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    setSession(prev => prev ? {
      ...prev,
      behavioralData: {
        ...prev.behavioralData,
        scrollDepth: Math.max(prev.behavioralData.scrollDepth, depth)
      }
    } : null);
  }, []);

  // Track form abandonment
  const trackFormAbandonment = useCallback((formId: string, fieldName: string) => {
    const abandonInteraction: InteractionEvent = {
      type: 'form_abandon',
      element: formId,
      value: fieldName,
      metadata: { abandonedAt: fieldName },
      timestamp: new Date()
    };

    setSession(prev => prev ? {
      ...prev,
      interactions: [...prev.interactions, abandonInteraction],
      behavioralData: {
        ...prev.behavioralData,
        formAbandonment: true,
        interactions: [...prev.behavioralData.interactions, abandonInteraction]
      }
    } : null);
  }, []);

  // Track conversion
  const trackConversion = useCallback((type: ConversionEvent['type'], value = 0, metadata?: Record<string, any>) => {
    const conversion: ConversionEvent = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: new Date(),
      value,
      metadata
    };

    setSession(prev => {
      if (!prev) return null;
      
      let updatedFunnel = prev.conversionFunnel;
      
      // Update relevant funnel steps within the same state update
      if (type === 'form_submission') {
        updatedFunnel = updatedFunnel.map(step => {
          if (step.id === 'form_complete' || step.id === 'conversion') {
            return { ...step, completed: true, timestamp: new Date(), value };
          }
          return step;
        });
      }
      
      return {
        ...prev,
        conversions: [...prev.conversions, conversion],
        conversionFunnel: updatedFunnel
      };
    });
  }, []);

  // Update funnel step
  const updateFunnelStep = useCallback((stepId: string, completed: boolean, value?: number, metadata?: Record<string, any>) => {
    setSession(prev => prev ? {
      ...prev,
      conversionFunnel: prev.conversionFunnel.map(step => 
        step.id === stepId 
          ? { ...step, completed, timestamp: completed ? new Date() : step.timestamp, value, metadata }
          : step
      )
    } : null);
  }, []);

  // Update lead score and personalization
  const updateLeadScore = useCallback((score: LeadScore) => {
    setLeadScore(score);
    setPersonalization(TIER_PERSONALIZATION[score.tier]);
    
    setSession(prev => prev ? {
      ...prev,
      leadScore: score,
      personalization: TIER_PERSONALIZATION[score.tier]
    } : null);
  }, []);

  // Get personalized content
  const getPersonalizedContent = useCallback((contentType: string) => {
    return personalization.content[contentType as keyof typeof personalization.content] || null;
  }, [personalization]);

  // Get tier-specific message
  const getTierSpecificMessage = useCallback((messageType: string) => {
    return personalization.messaging[messageType as keyof typeof personalization.messaging] || '';
  }, [personalization]);

  // Exit intent handlers
  const showExitIntent = useCallback(() => {
    if (!isExitIntentEligible()) return;

    setSession(prev => prev ? {
      ...prev,
      exitIntentShown: prev.exitIntentShown + 1
    } : null);

    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent('showExitIntent', {
      detail: { 
        config: EXIT_INTENT_CONFIG.leadTierSpecific[leadScore?.tier || 'Unqualified'],
        leadTier: leadScore?.tier || 'Unqualified'
      }
    }));
  }, [leadScore, session]);

  const dismissExitIntent = useCallback(() => {
    window.dispatchEvent(new CustomEvent('dismissExitIntent'));
  }, []);

  const isExitIntentEligible = useCallback(() => {
    if (!EXIT_INTENT_CONFIG.enabled || !session) return false;
    return session.exitIntentShown < EXIT_INTENT_CONFIG.maxShows;
  }, [session]);

  // Analytics getters
  const getConversionFunnelData = useCallback(() => {
    return session?.conversionFunnel || [];
  }, [session]);

  const getBehavioralInsights = useCallback(() => {
    return session?.behavioralData || {
      pageViews: 0,
      timeOnSite: 0,
      contentEngagement: [],
      formAbandonment: false,
      returnVisit: false,
      referralSource: 'unknown',
      deviceType: 'desktop' as const,
      scrollDepth: 0,
      interactions: []
    };
  }, [session]);

  const getSessionDuration = useCallback(() => {
    return session ? (Date.now() - session.startTime.getTime()) / 1000 : 0;
  }, [session]);

  // Optimization helpers
  const shouldShowUrgency = useCallback(() => {
    return Boolean(leadScore?.tier === 'Hot' || (leadScore?.intent && leadScore.intent >= 75));
  }, [leadScore]);

  const getOptimalCTAText = useCallback(() => {
    return personalization.messaging.ctaText;
  }, [personalization]);

  const getRecommendedNextAction = useCallback(() => {
    return leadScore?.recommendedAction || 'Learn more about our services';
  }, [leadScore]);

  if (!session) {
    return null; // Loading state
  }

  const contextValue: ConversionOptimizationContextType = {
    session,
    leadScore,
    personalization,
    trackInteraction,
    trackPageView,
    trackScrollDepth,
    trackFormAbandonment,
    trackConversion,
    updateFunnelStep,
    updateLeadScore,
    getPersonalizedContent,
    getTierSpecificMessage,
    showExitIntent,
    dismissExitIntent,
    isExitIntentEligible,
    getConversionFunnelData,
    getBehavioralInsights,
    getSessionDuration,
    shouldShowUrgency,
    getOptimalCTAText,
    getRecommendedNextAction
  };

  return (
    <ConversionOptimizationContext.Provider value={contextValue}>
      {children}
    </ConversionOptimizationContext.Provider>
  );
};

export const useConversionOptimization = (): ConversionOptimizationContextType => {
  const context = useContext(ConversionOptimizationContext);
  if (!context) {
    throw new Error('useConversionOptimization must be used within a ConversionOptimizationProvider');
  }
  return context;
};