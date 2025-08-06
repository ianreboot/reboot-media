import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import 'swiper/css';
import '../styles/swiper-custom.css';

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
}

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
    popular: false
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
    popular: true
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
    popular: false
  }
];

const PricingCard = ({ service }: { service: ServicePlan }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className="flex flex-col"
      style={{ height: service.popular ? '100%' : 'auto', alignSelf: service.popular ? 'stretch' : 'center' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Popular Badge - Above the card */}
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
        <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
          service.color === 'orange'
            ? 'bg-white text-orange-600 hover:bg-orange-50'
            : service.color === 'blue'
            ? 'bg-white text-blue-700 hover:bg-blue-50'
            : 'bg-blue-900 text-white hover:bg-blue-800'
        }`}>
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

const PricingCards = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // On large screens (desktop), render as a grid
  if (isLargeScreen) {
    return (
      <div className="grid grid-cols-3 gap-6 items-center">
        {services.map((service, index) => (
          <PricingCard key={index} service={service} />
        ))}
      </div>
    );
  }

  // Mobile and tablet: simple responsive slider with fixed spacing
  return (
    <Swiper
      spaceBetween={24}
      slidesPerView="auto"
      centeredSlides={true}
      initialSlide={1}
      breakpoints={{
        320: {
          slidesPerView: 1.2,
          spaceBetween: 16
        },
        480: {
          slidesPerView: 1.3,
          spaceBetween: 20
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 24
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        900: {
          slidesPerView: 2.5,
          spaceBetween: 24
        }
      }}
      className="!py-8"
    >
      {services.map((service, index) => (
        <SwiperSlide key={index} className="!flex !items-center !h-auto">
          <PricingCard service={service} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PricingCards;