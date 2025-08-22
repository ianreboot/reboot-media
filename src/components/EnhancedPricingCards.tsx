/**
 * Enhanced Pricing Cards with A/B Testing and Conversion Optimization
 * Features dynamic pricing, personalization, and advanced tracking
 */

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
// @ts-expect-error - CSS import does not have TypeScript definitions
import 'swiper/css';
import '../styles/swiper-custom.css';
import { useLeadForm } from '../contexts/LeadFormContext';

interface ServicePlan {
  title: string;
  size: string;
  subtitle: string;
  duration: string;
  originalPrice: string;
  price: string;
  priceNote: string;
  savings: string;
  features: string[];
  color: 'gray' | 'orange' | 'blue';
  popular: boolean;
  valueProposition: string;
  roi: string;
}

// Enhanced service plans with value-first messaging
const services: ServicePlan[] = [
  {
    title: "STARTER",
    size: "Small",
    subtitle: "Quick-Win Strategy",
    duration: "3-month minimum",
    originalPrice: "$12K",
    price: "$5K-8K",
    priceNote: "/month",
    savings: "Save $4K+/mo",
    features: [
      "🔍 Strategic market positioning",
      "🧠 Executive-level growth strategy",
      "💬 Value proposition reconstruction",
      "🛡️ Building customer trust and credibility",
      "👥 Executive team development",
      "📊 Comprehensive audit report"
    ],
    color: "gray",
    popular: false,
    valueProposition: "Get unstuck and start growing again",
    roi: "2-3x revenue increase typical"
  },
  {
    title: "GROWTH",
    size: "Medium",
    subtitle: "Complete Strategy",
    duration: "6-month engagement",
    originalPrice: "$18K",
    price: "$8K-12K",
    priceNote: "/month",
    savings: "Save $6K+/mo",
    features: [
      "✅ Everything in Starter",
      "🎯 Monthly strategy sessions",
      "📈 Data-driven optimization strategies",
      "💰 Increasing customer lifetime value",
      "🏆 Team coaching program",
      "📋 Quarterly business reviews"
    ],
    color: "orange",
    popular: true,
    valueProposition: "Scale systematically with proven systems",
    roi: "4-6x revenue growth common"
  },
  {
    title: "ENTERPRISE",
    size: "Large",
    subtitle: "Full CMO Leadership",
    duration: "12-month partnership",
    originalPrice: "$25K",
    price: "$12K-18K",
    priceNote: "/month",
    savings: "Save $7K+/mo",
    features: [
      "✅ Everything in Growth",
      "👔 Weekly leadership participation",
      "🎯 Team hiring & management guidance",
      "📊 Board presentation preparation",
      "🏢 Complete marketing transformation",
      "🤝 Strategic partnership development"
    ],
    color: "blue",
    popular: false,
    valueProposition: "Complete marketing leadership & transformation",
    roi: "10x+ revenue scaling achieved"
  }
];

interface PricingCardProps {
  service: ServicePlan;
  leadTier: string;
  pricingStyle: string;
  shouldShowSavings: boolean;
  shouldEmphasizeValue: boolean;
  onEngagement: (action: string, plan: string) => void;
  onCTAClick: (plan: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  service, 
  leadTier, 
  pricingStyle, 
  shouldShowSavings, 
  shouldEmphasizeValue,
  onEngagement,
  onCTAClick
}) => {
  const [hovered, setHovered] = useState(false);
  const [viewed, setViewed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Track card visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewed) {
          setViewed(true);
          onEngagement('card_view', service.title);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [viewed, onEngagement, service.title]);

  // Get personalized CTA text based on lead tier
  const getCTAText = () => {
    switch (leadTier) {
      case 'Hot':
        return 'Schedule Strategy Call';
      case 'Warm':
        return 'Get Started';
      case 'Cold':
        return 'Learn More';
      case 'Unqualified':
        return 'View Details';
      default:
        return 'Get Started';
    }
  };

  // Get tier-specific messaging
  const getTierMessage = () => {
    if (leadTier === 'Hot' && service.popular) {
      return {
        badge: "🔥 RECOMMENDED FOR YOU",
        message: "Based on your profile, this plan delivers maximum ROI",
        urgency: "Priority setup - implementation starts this week"
      };
    }
    if (leadTier === 'Warm' && service.popular) {
      return {
        badge: "⭐ BEST VALUE",
        message: "Most companies at your stage choose this plan",
        urgency: ""
      };
    }
    return null;
  };

  const tierMessage = getTierMessage();
  
  return (
    <div 
      ref={cardRef}
      className="flex flex-col w-full"
      style={{ 
        height: service.popular ? '100%' : 'auto', 
        alignSelf: service.popular ? 'stretch' : 'center',
        marginTop: service.popular ? '0' : '3rem',
        marginBottom: service.popular ? '1rem' : '2rem'
      }}
      onMouseEnter={() => {
        setHovered(true);
        onEngagement('card_hover', service.title);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Personalized Badge */}
      {tierMessage && (
        <div className="flex justify-center mb-3">
          <div className={`text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg ${
            leadTier === 'Hot' ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse' : 
            'bg-orange-500'
          }`}>
            {tierMessage.badge}
          </div>
        </div>
      )}
      
      {/* Popular Badge - Fallback */}
      {service.popular && !tierMessage && (
        <div className="flex justify-center mb-3">
          <div className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
            MOST POPULAR
          </div>
        </div>
      )}
      
      {/* Card */}
      <div className={`rounded-3xl border-2 ${service.popular ? 'p-6' : 'p-5'} text-center flex flex-col transition-all duration-500 ${
        service.popular ? 'flex-1' : ''
      } ${
        service.color === 'orange' 
          ? `bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-400 shadow-2xl ${hovered ? 'scale-105' : 'lg:scale-[1.02]'}`
          : service.color === 'blue'
          ? `bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-400 shadow-xl ${hovered ? 'scale-105' : ''}`
          : `bg-white border-gray-200 shadow-lg ${hovered ? 'scale-105 shadow-2xl' : ''}`
      }`}>
        
        {/* Header */}
        <div className="mb-4">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
            service.color === 'orange' || service.color === 'blue' 
              ? 'bg-white/20 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {service.size} Business
          </div>
          
          <h3 className={`text-2xl font-black mb-1 ${
            service.color === 'gray' ? 'replace-text-slate-900' : 'text-white'
          }`}>{service.title}</h3>
          <p className={`text-sm ${
            service.color === 'gray' ? 'replace-' : 'text-white/90'
          }`}>{service.subtitle}</p>
        </div>

        {/* Value Proposition (Value-First Style) */}
        {pricingStyle === 'value_first' && shouldEmphasizeValue && (
          <div className={`mb-4 p-3 rounded-lg ${
            service.color === 'orange' || service.color === 'blue'
              ? 'bg-white/10 border border-white/20'
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm font-bold ${
              service.color === 'gray' ? 'text-blue-800' : 'text-white'
            }`}>
              {service.valueProposition}
            </p>
            <p className={`text-xs mt-1 ${
              service.color === 'gray' ? 'text-blue-accessible' : 'text-white/80'
            }`}>
              {service.roi}
            </p>
          </div>
        )}

        {/* Pricing */}
        <div className="mb-4">
          <div className={`text-sm line-through mb-1 ${
            service.color === 'gray' ? 'text-gray-500' : 'text-white/60'
          }`}>{service.originalPrice}/mo</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className={`text-3xl font-black ${
              service.color === 'gray' ? 'text-orange-accessible' : 'text-white'
            }`}>{service.price}</span>
            <span className={`text-sm ${
              service.color === 'gray' ? 'text-gray-600' : 'text-white/90'
            }`}>{service.priceNote}</span>
          </div>
          
          {/* Savings Badge */}
          {shouldShowSavings && (
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
              service.color === 'orange' || service.color === 'blue'
                ? 'bg-green-400/20 text-green-100'
                : 'bg-green-100 text-green-800'
            }`}>
              {service.savings}
            </div>
          )}

          {/* Tier-specific pricing message */}
          {leadTier === 'Hot' && service.popular && (
            <div className={`text-xs mt-2 p-2 rounded ${
              service.color === 'orange' || service.color === 'blue'
                ? 'bg-white/10 text-white/90'
                : 'bg-orange-50 text-orange-700'
            }`}>
              🎯 Enterprise pricing negotiable for qualified companies
            </div>
          )}
        </div>

        <div className={`text-xs mb-4 ${
          service.color === 'gray' ? 'replace-' : 'text-white/80'
        }`}>{service.duration}</div>

        {/* Tier Message */}
        {tierMessage?.message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            service.color === 'orange' || service.color === 'blue'
              ? 'bg-white/10 text-white/90'
              : 'bg-blue-50 text-blue-700'
          }`}>
            {tierMessage.message}
          </div>
        )}

        {/* Features */}
        <ul className={`${service.popular ? 'space-y-2 mb-6' : 'space-y-1.5 mb-4'} text-left ${service.popular ? 'flex-1' : ''}`}>
          {service.features.map((feature, idx) => (
            <li key={idx} className={`${service.popular ? 'text-sm' : 'text-xs'} flex items-start ${
              service.color === 'orange' || service.color === 'blue' ? 'text-white/90' : 'replace-text-slate-700'
            }`}>
              <span className="mr-2 flex-shrink-0">{feature.split(' ')[0]}</span>
              <span>{feature.split(' ').slice(1).join(' ')}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <button 
          onClick={() => {
            onCTAClick(service.title);
            onEngagement('cta_click', service.title);
          }}
          onMouseEnter={() => onEngagement('cta_hover', service.title)}
          className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
            service.color === 'orange'
              ? 'bg-white text-orange-accessible hover:bg-orange-50 focus-visible:bg-orange-50'
              : service.color === 'blue'
              ? 'bg-white text-blue-700 hover:bg-blue-50 focus-visible:bg-blue-50'
              : leadTier === 'Hot'
              ? 'bg-red-600 text-white hover:bg-red-700 focus-visible:bg-red-700 animate-pulse'
              : 'bg-blue-900 text-white hover:bg-blue-800 focus-visible:bg-blue-800'
          }`}
        >
          {getCTAText()}
        </button>

        {/* Urgency Message for Hot Leads */}
        {tierMessage?.urgency && (
          <div className="mt-3 text-center text-xs">
            <span className={`font-bold ${
              service.color === 'orange' || service.color === 'blue' ? 'text-yellow-200' : 'text-orange-accessible'
            }`}>
              ⚡ {tierMessage.urgency}
            </span>
          </div>
        )}

        {/* Guarantee */}
        <div className={`mt-4 text-center text-xs ${
          service.color === 'orange' || service.color === 'blue' ? 'text-white/70' : 'text-gray-500'
        }`}>
          90-day improvement guarantee
        </div>
      </div>
    </div>
  );
};

const EnhancedPricingCards = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { 
    pricingStyle, 
    shouldShowSavings, 
    shouldEmphasizeValue, 
    trackEngagement 
  } = { pricingTestVariant: 'A', selectedTier: null, handleTierClick: () => {}, lastClickedTier: null, pricingConfidence: 0 }; // Simplified without A/B testing
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      
      // Re-center on the middle card (index 1) when viewport changes
      // Only for smaller screens where centering is enabled
      if (swiperRef.current && newWidth < 1024) {
        setTimeout(() => {
          swiperRef.current?.slideTo(1, 300); // Smooth transition to middle card
        }, 100); // Small delay to let breakpoint take effect
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track pricing section view
  useEffect(() => {
    // trackInteraction({
      type: 'scroll',
      element: 'pricing_section',
      metadata: { 
        pricingStyle, 
        leadTier: { tier: "Unqualified" }?.tier || 'Unqualified',
        shouldShowSavings,
        shouldEmphasizeValue
      }
    });
  }, [trackInteraction, pricingStyle, { tier: "Unqualified" }, shouldShowSavings, shouldEmphasizeValue]);

  const handleEngagement = (action: string, plan: string) => {
    trackEngagement(action, plan);
    // trackInteraction({
      type: 'click',
      element: `pricing_${action}`,
      value: plan,
      metadata: { 
        pricingStyle, 
        leadTier: { tier: "Unqualified" }?.tier || 'Unqualified',
        action,
        plan
      }
    });
  };

  const handleCTAClick = (plan: string) => {
    handleEngagement('get_started', plan);
    // trackClick('pricing_cards');
    
    // Show lead form
    setShowDropdownForm(true);
    
    // Track high-intent behavior
    // trackInteraction({
      type: 'click',
      element: 'pricing_cta',
      value: plan,
      metadata: { 
        source: 'pricing_cards',
        plan,
        leadTier: { tier: "Unqualified" }?.tier || 'Unqualified'
      }
    });
  };

  // Get personalized section title based on lead tier
  const getSectionTitle = () => {
    switch ({ tier: "Unqualified" }?.tier) {
      case 'Hot':
        return {
          title: "Choose Your Growth Acceleration Plan",
          subtitle: "Priority onboarding available for qualified companies"
        };
      case 'Warm':
        return {
          title: "Investment Options for Strategic Growth",
          subtitle: "Choose the engagement level that matches your growth goals"
        };
      case 'Cold':
        return {
          title: "Flexible Marketing Leadership Options",
          subtitle: "Start with what works best for your current situation"
        };
      default:
        return {
          title: "Fractional CMO Services",
          subtitle: "Choose the right level of strategic marketing support"
        };
    }
  };

  const sectionContent = getSectionTitle();
  
  return (
    <section className="py-16">
      {/* Section Header with Personalization */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black replace-text-slate-900 mb-4">
          {sectionContent.title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {sectionContent.subtitle}
        </p>
        
        {/* Lead Score Indicator for Hot Leads */}
        {{ tier: "Unqualified" }?.tier === 'Hot' && (
          <div className="inline-flex items-center bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full px-6 py-2 mb-6">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-red-800 font-bold text-sm">
              High-Priority Lead - Priority Response Guaranteed
            </span>
          </div>
        )}

        {/* Value-First Messaging */}
        {pricingStyle === 'value_first' && shouldEmphasizeValue && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              ROI-Focused Investment
            </h3>
            <p className="text-blue-700">
              Our clients typically see 3-10x ROI on their fractional CMO investment. 
              Compare that to a full-time CMO at $200K+ with no guarantee of results.
            </p>
          </div>
        )}
      </div>

      {/* Pricing Cards Carousel */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={24}
        slidesPerView="auto"
        centeredSlides={true}
        initialSlide={1}
        breakpoints={{
          // Fully fluid breakpoints
          320: {
            slidesPerView: 1.1,
            spaceBetween: 16,
            centeredSlides: true
          },
          480: {
            slidesPerView: 1.3,
            spaceBetween: 20,
            centeredSlides: true
          },
          640: {
            slidesPerView: 1.6,
            spaceBetween: 24,
            centeredSlides: true
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 24,
            centeredSlides: true
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: false
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 32,
            centeredSlides: false
          }
        }}
        className="!py-12"
        onSlideChange={(swiper) => {
          // trackInteraction({
            type: 'click',
            element: 'pricing_carousel',
            value: swiper.activeIndex,
            metadata: { direction: 'slide_change' }
          });
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide 
            key={index} 
            className="!flex !items-stretch !h-auto !pb-4"
          >
            <PricingCard 
              service={service}
              leadTier={{ tier: "Unqualified" }?.tier || 'Unqualified'}
              pricingStyle={pricingStyle}
              shouldShowSavings={shouldShowSavings}
              shouldEmphasizeValue={shouldEmphasizeValue}
              onEngagement={handleEngagement}
              onCTAClick={handleCTAClick}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom CTA for Hot Leads */}
      {{ tier: "Unqualified" }?.tier === 'Hot' && (
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 max-w-lg mx-auto">
            <h3 className="text-xl font-black text-red-900 mb-3">
              🔥 High-Priority Lead Detected
            </h3>
            <p className="text-red-700 mb-4">
              Based on your profile, you qualify for our priority onboarding program. 
              We'll have a custom strategy ready within 24 hours.
            </p>
            <button
              onClick={() => handleCTAClick('Priority')}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 focus-visible:from-red-600 hover:to-orange-600 focus-visible:to-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl animate-pulse"
            >
              Claim Priority Onboarding →
            </button>
          </div>
        </div>
      )}

      {/* Social Proof for Warm/Cold Leads */}
      {({ tier: "Unqualified" }?.tier === 'Warm' || { tier: "Unqualified" }?.tier === 'Cold') && (
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-gray-700 font-medium mb-2">
              "We saw a 340% increase in qualified leads within 90 days"
            </p>
            <p className="text-sm text-gray-600">
              - Sarah Chen, CEO of TechScale (Similar company size and industry)
            </p>
            <div className="flex justify-center mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EnhancedPricingCards;