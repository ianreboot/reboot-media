/**
 * Mobile-First Conversion Optimization
 * Specialized components and behaviors for mobile conversion optimization
 */

import React, { useState, useEffect, useRef } from 'react';
import { useConversionOptimization } from '../contexts/ConversionOptimizationContext';
import { useCTAOptimization } from '../hooks/useABTestHooks';

// Mobile-optimized sticky CTA
export const MobileStickyBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const { 
    personalization, 
    shouldShowUrgency, 
    trackInteraction,
    leadScore 
  } = useConversionOptimization();
  const { ctaText, trackClick } = useCTAOptimization();

  // Detect mobile device
  const isMobile = window.innerWidth <= 768;
  
  if (!isMobile) return null;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 200; // Show after scrolling 200px
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
      
      // Show/hide based on scroll position and direction
      const shouldShow = currentScrollY > scrollThreshold && scrollDirection === 'up';
      setIsVisible(shouldShow);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [scrollDirection]);

  const handleCTAClick = () => {
    trackClick('mobile_sticky_bar');
    trackInteraction({
      type: 'click',
      element: 'mobile_sticky_cta',
      value: 'clicked',
      metadata: { 
        scrollY: window.scrollY,
        leadTier: leadScore?.tier || 'Unqualified'
      }
    });
  };

  const getCtaColor = () => {
    switch (leadScore?.tier) {
      case 'Hot':
        return 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse';
      case 'Warm':
        return 'bg-gradient-to-r from-orange-500 to-orange-600';
      case 'Cold':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      default:
        return 'bg-gradient-to-r from-gray-600 to-gray-700';
    }
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white border-t-2 border-gray-200 shadow-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <div className="text-sm font-bold replace-text-gray-900">
              {shouldShowUrgency() ? '🔥 Limited Time' : personalization.messaging.heroTitle.split(' ').slice(0, 3).join(' ')}
            </div>
            <div className="text-xs replace-text-gray-600">
              {shouldShowUrgency() ? 'Priority response guaranteed' : 'Free marketing analysis'}
            </div>
          </div>
          <button
            onClick={handleCTAClick}
            className={`px-6 py-3 rounded-lg font-bold text-white shadow-lg transform active:scale-95 transition-all ${getCtaColor()}`}
          >
            {ctaText}
          </button>
        </div>
        
        {shouldShowUrgency() && (
          <div className="mt-2 text-center text-xs text-orange-accessible font-medium">
            ⚡ Response within 1 hour for qualified leads
          </div>
        )}
      </div>
    </div>
  );
};

// Mobile-optimized pricing cards
export const MobilePricingOptimizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { trackInteraction, leadScore } = useConversionOptimization();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Enhanced touch interactions for mobile
  const handleCardTouch = (cardIndex: number) => {
    setActiveCard(cardIndex);
    trackInteraction({
      type: 'click',
      element: 'mobile_pricing_card',
      value: cardIndex,
      metadata: { 
        interaction: 'touch',
        leadTier: leadScore?.tier || 'Unqualified'
      }
    });

    // Auto-dismiss after 3 seconds
    setTimeout(() => setActiveCard(null), 3000);
  };

  return (
    <div className="mobile-pricing-optimizer">
      {React.Children.map(children, (child, index) => 
        React.cloneElement(child as React.ReactElement<any>, {
          onTouchStart: () => handleCardTouch(index),
          className: `${(child as React.ReactElement<any>).props.className} ${
            activeCard === index ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
          }`
        })
      )}
    </div>
  );
};

// Mobile form optimization wrapper
export const MobileFormOptimizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { trackInteraction } = useConversionOptimization();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        setKeyboardOpen(true);
        setFocusedField(e.target.name || e.target.id);
        
        trackInteraction({
          type: 'form_focus',
          element: 'mobile_form_field',
          value: e.target.name || e.target.id,
          metadata: { fieldType: e.target.type, mobile: true }
        });

        // Scroll focused field into view with offset for keyboard
        setTimeout(() => {
          if (e.target && 'scrollIntoView' in e.target) {
            (e.target as Element).scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 300);
      }
    };

    const handleFocusOut = () => {
      setKeyboardOpen(false);
      setFocusedField(null);
    };

    // Detect keyboard open/close on mobile
    const handleResize = () => {
      if (window.innerHeight < window.outerHeight * 0.75) {
        setKeyboardOpen(true);
      } else {
        setKeyboardOpen(false);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('resize', handleResize);
    };
  }, [trackInteraction]);

  return (
    <div 
      className={`mobile-form-optimizer ${keyboardOpen ? 'keyboard-open' : ''}`}
      style={{
        paddingBottom: keyboardOpen ? '50px' : '0',
        transition: 'padding-bottom 0.3s ease'
      }}
    >
      {children}
      
      {/* Mobile keyboard helper */}
      {keyboardOpen && focusedField && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white p-2 text-center text-sm z-40">
          <span>📝 Filling: {focusedField.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
          <button 
            onClick={() => {
              const activeElement = document.activeElement as HTMLElement;
              activeElement?.blur();
            }}
            className="ml-4 text-blue-200 hover:text-white"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

// Mobile-specific exit intent (using touch patterns)
export const MobileExitIntentDetector: React.FC = () => {
  const { showExitIntent, trackInteraction } = useConversionOptimization();
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    let rapidBackPresses = 0;
    let backPressTimer: NodeJS.Timeout;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        time: Date.now()
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;
      const deltaTime = touchEnd.time - touchStartRef.current.time;

      // Detect fast swipe up from bottom (mobile exit intent)
      if (
        deltaY < -100 && // Swipe up
        Math.abs(deltaX) < 50 && // Mostly vertical
        deltaTime < 300 && // Fast swipe
        touchStartRef.current.y > window.innerHeight * 0.8 // Started near bottom
      ) {
        trackInteraction({
          type: 'scroll',
          element: 'mobile_exit_swipe',
          value: 'up_swipe',
          metadata: { deltaY, deltaTime, startY: touchStartRef.current.y }
        });
        
        showExitIntent();
      }

      touchStartRef.current = null;
    };

    // Detect rapid back button usage (Android)
    const handlePopState = () => {
      rapidBackPresses++;
      
      if (rapidBackPresses === 1) {
        // First back press - set timer
        backPressTimer = setTimeout(() => {
          rapidBackPresses = 0;
        }, 2000);
      } else if (rapidBackPresses === 2) {
        // Second back press within 2 seconds - exit intent
        clearTimeout(backPressTimer);
        rapidBackPresses = 0;
        
        trackInteraction({
          type: 'click',
          element: 'mobile_back_button',
          value: 'rapid_back',
          metadata: { pattern: 'double_back' }
        });
        
        showExitIntent();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('popstate', handlePopState);
      if (backPressTimer) clearTimeout(backPressTimer);
    };
  }, [showExitIntent, trackInteraction]);

  return null; // This component only handles detection
};

// Mobile-optimized scroll progress indicator
export const MobileScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { trackScrollDepth } = useConversionOptimization();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      trackScrollDepth(progress);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [trackScrollDepth]);

  // Only show on mobile
  if (window.innerWidth > 768) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-gray-200">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// Mobile-specific call-to-action animations
export const MobileCTAAnimator: React.FC<{ children: React.ReactNode; trigger?: boolean }> = ({ 
  children, 
  trigger = false 
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (trigger) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div 
      className={`mobile-cta-animator ${animate ? 'animate-bounce' : ''}`}
      style={{
        transform: animate ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease'
      }}
    >
      {children}
    </div>
  );
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

// Mobile conversion optimizer styles
const mobileStyles = `
  .mobile-pricing-optimizer .pricing-card {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .mobile-form-optimizer input,
  .mobile-form-optimizer textarea {
    font-size: 16px; /* Prevent zoom on iOS */
    -webkit-appearance: none;
    border-radius: 8px;
  }

  .mobile-form-optimizer.keyboard-open {
    transform: translateY(-25px);
  }

  .mobile-cta-animator {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  @media (max-width: 768px) {
    .mobile-sticky-bar-enter {
      animation: slideUpMobile 0.3s ease-out;
    }
    
    .mobile-sticky-bar-exit {
      animation: slideDownMobile 0.3s ease-in;
    }
  }

  @keyframes slideUpMobile {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideDownMobile {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
`;

// Inject mobile styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mobileStyles;
  document.head.appendChild(styleSheet);
}