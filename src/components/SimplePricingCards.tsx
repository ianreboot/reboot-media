/**
 * Simplified Pricing Cards Component
 * Clean, straightforward pricing display without A/B testing complexity
 */

import React, { useState, useRef } from 'react';
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

// Service plans
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
  onCTAClick: (plan: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ service, onCTAClick }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="flex flex-col w-full"
      style={{ 
        height: service.popular ? '100%' : 'auto', 
        alignSelf: service.popular ? 'stretch' : 'center',
        marginTop: service.popular ? '0' : '3rem',
        marginBottom: service.popular ? '1rem' : '2rem'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Popular Badge */}
      {service.popular && (
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
            service.color === 'gray' ? 'text-slate-900' : 'text-white'
          }`}>{service.title}</h3>
          <p className={`text-sm ${
            service.color === 'gray' ? 'text-gray-600' : 'text-white/90'
          }`}>{service.subtitle}</p>
        </div>

        {/* Value Proposition */}
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
            service.color === 'gray' ? 'text-blue-600' : 'text-white/80'
          }`}>
            {service.roi}
          </p>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className={`text-sm line-through mb-1 ${
            service.color === 'gray' ? 'text-gray-500' : 'text-white/60'
          }`}>{service.originalPrice}/mo</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className={`text-3xl font-black ${
              service.color === 'gray' ? 'text-orange-600' : 'text-white'
            }`}>{service.price}</span>
            <span className={`text-sm ${
              service.color === 'gray' ? 'text-gray-600' : 'text-white/90'
            }`}>{service.priceNote}</span>
          </div>
          
          {/* Savings Badge */}
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
            service.color === 'orange' || service.color === 'blue'
              ? 'bg-green-400/20 text-green-100'
              : 'bg-green-100 text-green-800'
          }`}>
            {service.savings}
          </div>
        </div>

        <div className={`text-xs mb-4 ${
          service.color === 'gray' ? 'text-gray-600' : 'text-white/80'
        }`}>{service.duration}</div>

        {/* Features */}
        <ul className={`${service.popular ? 'space-y-2 mb-6' : 'space-y-1.5 mb-4'} text-left ${service.popular ? 'flex-1' : ''}`}>
          {service.features.map((feature, idx) => (
            <li key={idx} className={`${service.popular ? 'text-sm' : 'text-xs'} flex items-start ${
              service.color === 'orange' || service.color === 'blue' ? 'text-white/90' : 'text-slate-700'
            }`}>
              <span className="mr-2 flex-shrink-0">{feature.split(' ')[0]}</span>
              <span>{feature.split(' ').slice(1).join(' ')}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <button 
          onClick={() => onCTAClick(service.title)}
          className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
            service.color === 'orange'
              ? 'bg-white text-orange-600 hover:bg-orange-50 focus-visible:bg-orange-50'
              : service.color === 'blue'
              ? 'bg-white text-blue-700 hover:bg-blue-50 focus-visible:bg-blue-50'
              : 'bg-blue-900 text-white hover:bg-blue-800 focus-visible:bg-blue-800'
          }`}
        >
          Get Started
        </button>

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

const SimplePricingCards = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { setShowDropdownForm } = useLeadForm();

  const handleCTAClick = (plan: string) => {
    // Show lead form
    setShowDropdownForm(true);
  };
  
  return (
    <section className="py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          Fractional CMO Services
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Choose the right level of strategic marketing support
        </p>
        
        {/* Value Messaging */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            ROI-Focused Investment
          </h3>
          <p className="text-blue-700">
            Our clients typically see 3-10x ROI on their fractional CMO investment. 
            Compare that to a full-time CMO at $200K+ with no guarantee of results.
          </p>
        </div>
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
      >
        {services.map((service, index) => (
          <SwiperSlide 
            key={index} 
            className="!flex !items-stretch !h-auto !pb-4"
          >
            <PricingCard 
              service={service}
              onCTAClick={handleCTAClick}
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
};

export default SimplePricingCards;