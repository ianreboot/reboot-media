/**
 * Advanced A/B Testing Hooks
 * Provides specialized hooks for different testing scenarios
 */

import { useEffect, useCallback, useRef } from 'react';
import { useABTest, useVariant } from '../contexts/ABTestContext';
import { useConversionOptimization } from '../contexts/ConversionOptimizationContext';

// Hook for CTA optimization
export const useCTAOptimization = (testId = 'hero_cta_test') => {
  const { variant, track, isInTest } = useVariant(testId);
  const { getOptimalCTAText, trackInteraction } = useConversionOptimization();
  
  const getCTAText = useCallback(() => {
    if (!isInTest || !variant) return getOptimalCTAText();
    
    const testVariants = {
      control: 'Get Free Analysis',
      variant_a: 'Unlock Growth Strategy',
      variant_b: 'Get My Custom Plan'
    };
    
    return testVariants[variant as keyof typeof testVariants] || getOptimalCTAText();
  }, [variant, isInTest, getOptimalCTAText]);
  
  const trackCTAClick = useCallback((location: string) => {
    trackInteraction({
      type: 'click',
      element: `cta_button_${location}`,
      value: variant,
      metadata: { testId, location }
    });
    
    track('cta_click', 1);
  }, [track, trackInteraction, variant, testId]);
  
  const trackCTAView = useCallback((location: string) => {
    trackInteraction({
      type: 'cta_view',
      element: `cta_button_${location}`,
      value: variant,
      metadata: { testId, location }
    });
  }, [trackInteraction, variant, testId]);
  
  return {
    ctaText: getCTAText(),
    variant,
    isInTest,
    trackClick: trackCTAClick,
    trackView: trackCTAView
  };
};

// Hook for pricing optimization
export const usePricingOptimization = (testId = 'pricing_display_test') => {
  const { variant, track, isInTest } = useVariant(testId);
  const { personalization, trackInteraction } = useConversionOptimization();
  
  const getPricingStyle = useCallback(() => {
    if (!isInTest || !variant) return 'standard';
    return variant === 'variant_a' ? 'value_first' : 'standard';
  }, [variant, isInTest]);
  
  const shouldShowSavings = useCallback(() => {
    const style = getPricingStyle();
    return style === 'value_first' || personalization.pricing.highlightSavings;
  }, [getPricingStyle, personalization]);
  
  const shouldEmphasizeValue = useCallback(() => {
    return getPricingStyle() === 'value_first' || personalization.pricing.emphasizeValue;
  }, [getPricingStyle, personalization]);
  
  const trackPricingEngagement = useCallback((action: string, plan?: string) => {
    trackInteraction({
      type: 'click',
      element: `pricing_${action}`,
      value: plan,
      metadata: { testId, variant, action }
    });
    
    track('pricing_engagement', 1);
  }, [track, trackInteraction, variant, testId]);
  
  return {
    pricingStyle: getPricingStyle(),
    variant,
    isInTest,
    shouldShowSavings: shouldShowSavings(),
    shouldEmphasizeValue: shouldEmphasizeValue(),
    trackEngagement: trackPricingEngagement
  };
};

// Hook for form optimization
export const useFormOptimization = (testId = 'form_optimization_test') => {
  const { variant, track, isInTest } = useVariant(testId);
  const { trackInteraction, updateFunnelStep, trackFormAbandonment } = useConversionOptimization();
  const formStartTime = useRef<Date | null>(null);
  
  const getFormStyle = useCallback(() => {
    if (!isInTest || !variant) return 'standard';
    return variant === 'variant_a' ? 'progressive' : 'standard';
  }, [variant, isInTest]);
  
  const trackFormStart = useCallback(() => {
    formStartTime.current = new Date();
    updateFunnelStep('form_start', true);
    trackInteraction({
      type: 'form_focus',
      element: 'lead_form',
      metadata: { testId, variant }
    });
    track('form_start', 1);
  }, [track, trackInteraction, updateFunnelStep, variant, testId]);
  
  const trackFormStep = useCallback((stepNumber: number, fieldsCompleted: number) => {
    trackInteraction({
      type: 'form_focus',
      element: `form_step_${stepNumber}`,
      value: fieldsCompleted,
      metadata: { testId, variant, stepNumber }
    });
  }, [trackInteraction, variant, testId]);
  
  const trackFormAbandonmentEvent = useCallback((stepNumber: number, fieldName: string) => {
    const timeSpent = formStartTime.current ? Date.now() - formStartTime.current.getTime() : 0;
    
    trackFormAbandonment(`form_step_${stepNumber}`, fieldName);
    track('form_abandon', timeSpent / 1000);
  }, [trackFormAbandonment, track]);
  
  const trackFormCompletion = useCallback((completionTime: number) => {
    updateFunnelStep('form_complete', true, completionTime);
    trackInteraction({
      type: 'form_focus',
      element: 'form_complete',
      value: completionTime,
      metadata: { testId, variant, completionTime }
    });
    track('form_completion', completionTime);
  }, [track, trackInteraction, updateFunnelStep, variant, testId]);
  
  return {
    formStyle: getFormStyle(),
    variant,
    isInTest,
    trackFormStart,
    trackFormStep,
    trackAbandonment: trackFormAbandonmentEvent,
    trackCompletion: trackFormCompletion
  };
};

// Hook for exit-intent optimization
export const useExitIntentOptimization = () => {
  const { leadScore, isExitIntentEligible } = useConversionOptimization();
  const { trackConversion } = useABTest();
  
  useEffect(() => {
    const handleExitIntent = (event: CustomEvent) => {
      const { config, leadTier } = event.detail;
      
      // Track exit intent trigger
      trackConversion('exit_intent_test', 'exit_intent_shown', 1);
      
      // Show exit intent modal based on lead tier
      console.log('Exit intent triggered for tier:', leadTier, config);
    };
    
    const handleExitDismiss = () => {
      trackConversion('exit_intent_test', 'exit_intent_dismissed', 1);
    };
    
    window.addEventListener('showExitIntent' as any, handleExitIntent);
    window.addEventListener('dismissExitIntent' as any, handleExitDismiss);
    
    return () => {
      window.removeEventListener('showExitIntent' as any, handleExitIntent);
      window.removeEventListener('dismissExitIntent' as any, handleExitDismiss);
    };
  }, [trackConversion]);
  
  return {
    isEligible: isExitIntentEligible(),
    leadTier: leadScore?.tier || 'Unqualified'
  };
};

// Hook for scroll-based optimization
export const useScrollOptimization = () => {
  const { trackScrollDepth, trackInteraction } = useConversionOptimization();
  const scrollMilestones = useRef(new Set<number>());
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      // Track major scroll milestones
      const milestones = [25, 50, 75, 90];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackScrollDepth(scrollPercent);
          trackInteraction({
            type: 'scroll',
            element: 'page',
            value: milestone,
            metadata: { scrollPercent, milestone }
          });
        }
      });
    };
    
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [trackScrollDepth, trackInteraction]);
  
  return {
    milestones: Array.from(scrollMilestones.current)
  };
};

// Hook for time-based optimization
export const useTimeBasedOptimization = () => {
  const { trackInteraction } = useConversionOptimization();
  const timeMilestones = useRef(new Set<number>());
  
  useEffect(() => {
    const intervals = [30, 60, 120, 300]; // seconds
    
    intervals.forEach(seconds => {
      const timeoutId = setTimeout(() => {
        if (!timeMilestones.current.has(seconds)) {
          timeMilestones.current.add(seconds);
          trackInteraction({
            type: 'scroll', // Using scroll type for time engagement
            element: 'time_milestone',
            value: seconds,
            metadata: { type: 'time_engagement', seconds }
          });
        }
      }, seconds * 1000);
      
      return () => clearTimeout(timeoutId);
    });
  }, [trackInteraction]);
  
  return {
    engagementMilestones: Array.from(timeMilestones.current)
  };
};

// Hook for click heatmap tracking
export const useClickHeatmap = () => {
  const { trackInteraction } = useConversionOptimization();
  
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      
      trackInteraction({
        type: 'click',
        element: target.tagName.toLowerCase(),
        metadata: {
          x: event.clientX,
          y: event.clientY,
          elementX: rect.left,
          elementY: rect.top,
          elementWidth: rect.width,
          elementHeight: rect.height,
          className: target.className,
          id: target.id,
          textContent: target.textContent?.substring(0, 100)
        }
      });
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [trackInteraction]);
};

// Hook for A/B test results
export const useTestResults = (testId: string) => {
  const { getTestResults, getConversionRate, isStatisticallySignificant, activeTests } = useABTest();
  
  const test = activeTests.find(t => t.id === testId);
  const results = getTestResults(testId);
  
  const getVariantPerformance = useCallback(() => {
    if (!test || !results) return [];
    
    return test.variants.map(variant => ({
      id: variant.id,
      name: variant.name,
      conversionRate: getConversionRate(testId, variant.id),
      conversions: results.conversions[variant.id] || 0,
      isSignificant: isStatisticallySignificant(testId, variant.id),
      isWinner: results.winner === variant.id
    }));
  }, [test, results, testId, getConversionRate, isStatisticallySignificant]);
  
  return {
    test,
    results,
    variants: getVariantPerformance(),
    isRunning: test?.status === 'running',
    hasWinner: !!results?.winner
  };
};

// Utility function for throttling
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  
  return function (...args: any[]) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};