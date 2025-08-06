import { useState, useEffect } from 'react';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import { generateEmailContent, getObfuscatedEmailDisplay } from './utils/emailUtils';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [typedWord, setTypedWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Multi-step form state
  const [formStep, setFormStep] = useState(1);
  const [showDropdownForm, setShowDropdownForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    challenge: '',
    revenue: '',
    name: '',
    company: '',
    timeline: '',
    website: '',
    specificIssue: '',
    industry: '',
    teamSize: '',
    currentMarketing: ''
  });
  const [fieldValidation, setFieldValidation] = useState<{[key: string]: 'valid' | 'invalid' | ''}>({});
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: boolean}>({});
  
  // Validation functions
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validateUrl = (url: string) => {
    if (!url) return true; // Optional field
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };
  
  const handleFieldBlur = (fieldName: string, value: string) => {
    let isValid = true;
    
    if (fieldName === 'email') {
      isValid = validateEmail(value);
    } else if (fieldName === 'website') {
      isValid = validateUrl(value);
    } else if (fieldName === 'name' || fieldName === 'company' || fieldName === 'specificIssue') {
      isValid = value.trim().length > 0;
    }
    
    setFieldValidation(prev => ({
      ...prev,
      [fieldName]: value ? (isValid ? 'valid' : 'invalid') : ''
    }));
  };
  
  // Words to cycle through - ordered by importance to target demographics
  const lostItems = [
    'Revenue',          // Primary concern for $500K-$1.5M companies
    'Growth',           // Hitting growth plateaus is key pain point
    'Customers',        // Customer acquisition/retention
    'Market Share',     // Competitive positioning
    'Sales',           // Psychology-driven approach focus
    'Opportunities',    // Missing market opportunities
    'Momentum',         // Business velocity
    'Competitive Edge', // Marketing excellence
    'Brand Value',      // Premium positioning
    'Profit Margins',   // Cost efficiency
    'Time',            // Strategic vs tactical focus
    'Direction',       // Scattered marketing efforts
    'Clarity',         // Curse of knowledge problem
    'Trust',           // Customer trust signals
    'Authority',       // Market leadership
    'Scalability',     // Sustainable growth systems
    'Innovation'       // Modern vs traditional approaches
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Typewriter effect with progressive slowdown
  useEffect(() => {
    const currentWord = lostItems[wordIndex];
    // Progressive slowdown: faster at start, slower as we cycle through
    const cycleCount = Math.floor(wordIndex / lostItems.length);
    const baseTypeSpeed = isDeleting ? 50 : 100;
    const basePauseTime = 1500;
    
    // Add delay based on cycle count (0ms, 500ms, 1000ms, etc.)
    const cycleDelay = Math.min(cycleCount * 500, 2000);
    const typeSpeed = baseTypeSpeed + (cycleCount * 20);
    const pauseTime = basePauseTime + cycleDelay;
    
    const timer = setTimeout(() => {
      if (!isDeleting && typedWord.length < currentWord.length) {
        // Typing
        setTypedWord(currentWord.slice(0, typedWord.length + 1));
      } else if (isDeleting && typedWord.length > 0) {
        // Deleting
        setTypedWord(typedWord.slice(0, -1));
      } else if (!isDeleting && typedWord.length === currentWord.length) {
        // Pause before deleting (longer pause over time)
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedWord.length === 0) {
        // Move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % lostItems.length);
      }
    }, typeSpeed);
    
    return () => clearTimeout(timer);
  }, [typedWord, wordIndex, isDeleting, lostItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-gray-50">
      {/* Global Header */}
      <GlobalHeader />

      {/* Hero Section with Parallax Effect */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0 pb-20 md:pb-0">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-20 h-20 bg-orange-400/20 rounded-full blur-xl"
            style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)` }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-32 h-32 bg-stone-400/10 rounded-full blur-2xl"
            style={{ transform: `translateY(${scrollY * 0.5}px) rotate(${-scrollY * 0.1}deg)` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Loss Aversion Headline */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[0.9]">
              <span className="block">Stop Losing</span>
              <span className="block mt-1">
                <span className="text-orange-500 relative inline-block" style={{ minHeight: '1.0em' }}>
                  {typedWord}
                  <span className="animate-blink ml-0.5">|</span>
                  <div className="absolute -inset-2 bg-orange-100 -skew-y-1 -z-10 rounded-lg"></div>
                </span>
              </span>
              <span className="block">to <span className="text-gray-600 line-through decoration-red-500 decoration-4">Broken</span></span>
              <span className="block mt-1">Marketing</span>
            </h1>
          </div>
          
          {/* Authority Subheadline */}
          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium max-w-4xl mx-auto leading-relaxed">
              Stop fumbling with amateur advice. Get <span className="font-bold text-slate-900">battle-tested strategies from executives who've guided Fortune 500 brands</span> to explosive growth
            </p>
          </div>

          {/* Single Primary CTA */}
          <div className="flex justify-center">
            <button 
              onClick={() => setShowDropdownForm(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 sm:px-12 py-4 rounded-xl font-black text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center gap-3"
            >
              <span className="text-2xl">🔍</span>
              <span>Show Me What's Broken in My Marketing</span>
            </button>
          </div>

          {/* Benefits-Focused Proof Points */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group relative bg-white/90 backdrop-blur-sm border-l-4 border-orange-500 rounded-r-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-2xl font-black text-slate-900 mb-1">30X Growth</div>
                  <div className="text-sm text-slate-700 font-medium leading-tight">
                    Companies see explosive revenue growth when psychology replaces guesswork
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative bg-white/90 backdrop-blur-sm border-l-4 border-blue-500 rounded-r-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-2xl font-black text-slate-900 mb-1">Stop Bleeding</div>
                  <div className="text-sm text-slate-700 font-medium leading-tight">
                    Finally understand why customers don't buy, instead of wondering why
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative bg-white/90 backdrop-blur-sm border-l-4 border-green-500 rounded-r-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                <div>
                  <div className="text-2xl font-black text-slate-900 mb-1">Sleep Better</div>
                  <div className="text-sm text-slate-700 font-medium leading-tight">
                    No more throwing money at marketing that doesn't bring customers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Customer Awareness Stage 1 */}
      <section id="psychology" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 sm:mb-8">
              The <span className="text-red-500">$200K</span> Marketing Mistake
            </h2>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto leading-normal">
              <span className="font-bold">73% of growing companies</span> can't explain their value clearly to customers. They suffer from the "Curse of Knowledge" - knowing too much about their product to communicate it simply.
            </p>
          </div>

          {/* Asymmetrical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200 transform -rotate-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">What Business Owners Say:</h3>
                <div className="space-y-4 text-stone-700">
                  <p className="italic">"Our advanced AI-powered customer management platform leverages machine learning algorithms to deliver personalized experiences..."</p>
                  <p className="text-red-600 font-semibold">❌ Customers don't understand this</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="bg-orange-50 p-6 sm:p-8 rounded-2xl shadow-xl border border-orange-200 transform rotate-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">What Customers Hear:</h3>
                <div className="space-y-4 text-stone-700">
                  <p className="italic">"We help you stop losing customers and make more money from the ones you have."</p>
                  <p className="text-green-600 font-semibold">✅ Clear, benefits-focused</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Experience Section */}
      <section id="psychology" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-4 py-2 mb-4">
              <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-blue-600 text-sm font-semibold">Common Question</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6">
              "Do You Have Experience in <span className="text-blue-600">My Industry</span>?"
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              This is exactly the right question to ask. But the answer might surprise you...
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Linear Reading Flow - Top to Bottom */}
            
            {/* Step 1: The Problem - Industry Experts */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-red-100 rounded-full px-4 py-2 mb-4">
                  <svg className="w-4 h-4 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-red-700 text-sm font-semibold">The Problem</span>
                </div>
                <h3 className="text-2xl font-bold text-red-700 mb-4">Why Industry Experts Often Fail</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200/50">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-xs text-red-800 mr-3">1</span>
                    The Curse of Knowledge
                  </h4>
                  <p className="text-red-700 text-sm leading-relaxed">
                    They're so deep in industry jargon they can't see what confuses customers
                  </p>
                </div>
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200/50">
                  <h4 className="font-bold text-red-800 mb-3 flex items-center">
                    <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center text-xs text-red-800 mr-3">2</span>
                    Replicate Not Customize
                  </h4>
                  <p className="text-red-700 text-sm leading-relaxed">
                    They copy what worked elsewhere instead of customizing for your unique market
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: The Solution - Fresh Eyes */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-4">
                  <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  <span className="text-green-700 text-sm font-semibold">The Solution</span>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">The Fresh Eyes Advantage</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200/50 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mb-4">
                    <span className="text-green-800 font-bold">1</span>
                  </div>
                  <h4 className="font-bold text-green-800 mb-3">Customer Perspective</h4>
                  <p className="text-green-700 text-sm leading-relaxed">
                    I ask the same questions your prospects do, spotting exactly where they get confused
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200/50 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mb-4">
                    <span className="text-green-800 font-bold">2</span>
                  </div>
                  <h4 className="font-bold text-green-800 mb-3">Question Everything</h4>
                  <p className="text-green-700 text-sm leading-relaxed">
                    While experts accept "how we've always done it," I ask "why?" and find new opportunities
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200/50 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mb-4">
                    <span className="text-green-800 font-bold">3</span>
                  </div>
                  <h4 className="font-bold text-green-800 mb-3">Executive Experience</h4>
                  <p className="text-green-700 text-sm leading-relaxed">
                    C-level strategies that work across industries - proven at 20+ US companies
                  </p>
                </div>
              </div>
            </div>

            {/* Combined Proof & Real Question Section */}
            <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-3xl p-8 md:p-12">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  
                  {/* Left Side - Statistics */}
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Track Record
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="text-7xl font-black text-blue-600 mb-2">85%</div>
                        <p className="text-blue-800 text-lg font-semibold leading-tight">
                          of breakthrough results come from questioning "industry standards"
                        </p>
                      </div>
                      
                      <div className="bg-white/70 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-black text-slate-700">20+</div>
                            <div className="text-xs text-slate-600 font-medium">US Companies</div>
                          </div>
                          <div>
                            <div className="text-2xl font-black text-slate-700">$2B+</div>
                            <div className="text-xs text-slate-600 font-medium">Revenue Managed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - The Real Question */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                        The Real Question Isn't<br />
                        <span className="text-red-500 line-through decoration-4">"Industry Experience"</span>
                      </h3>
                      
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white transform -rotate-1">
                        <p className="text-xl font-bold mb-3">
                          It's: "Can you see the opportunities I'm blind to?"
                        </p>
                        <div className="flex items-center space-x-2 text-orange-100">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <span className="text-sm">Fresh perspective + proven psychology</span>
                        </div>
                      </div>
                      
                      <div className="bg-white/50 rounded-xl p-4 border-l-4 border-orange-500">
                        <p className="text-slate-700 text-sm italic">
                          "The best consultants don't know your industry inside-out. 
                          They know <strong>customers</strong> inside-out."
                        </p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section with Price Anchoring Psychology */}
      <section id="services" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 sm:mb-8">
              Fractional CMO
              <br />
              <span className="text-orange-500">Executive</span> Services
            </h2>
            <p className="text-xl text-stone-700 max-w-3xl mx-auto mb-4">
              Strategic marketing leadership without the $300K+ salary commitment
            </p>
            
            {/* Price Anchoring Header */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Full-Time CMO Cost</h3>
                  <div className="text-3xl font-black text-red-600 line-through">$300K+</div>
                  <div className="text-sm text-red-700">+ benefits, recruiting, risk</div>
                </div>
                <div className="text-orange-500 text-4xl font-bold mx-8">VS</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Fractional CMO</h3>
                  <div className="text-3xl font-black text-orange-500">$5K-18K</div>
                  <div className="text-sm text-orange-700">immediate start, proven results</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
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
                index: 0,
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
                index: 1,
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
                index: 2,
                popular: false
              }
            ].map((service) => (
              <div 
                key={service.index}
                className="relative group cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredCard(service.index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className={`p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 h-full ${
                  service.color === 'orange' 
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-400 transform scale-105 shadow-2xl'
                    : service.color === 'blue'
                    ? hoveredCard === service.index
                      ? 'bg-gradient-to-br from-blue-700 to-blue-800 text-white border-blue-300 shadow-[0_20px_50px_rgba(59,130,246,0.5)]'
                      : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-400 shadow-xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)]'
                    : hoveredCard === service.index
                    ? 'bg-white border-orange-500 border-4 shadow-[0_25px_60px_rgba(251,146,60,0.4)]'
                    : 'bg-white border-gray-200 shadow-lg hover:border-orange-400 hover:border-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]'
                }`}>
                  <div className="mb-6">
                    {/* Size Indicator */}
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                      service.color === 'orange' || service.color === 'blue' 
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {service.size} Business
                    </div>
                    
                    <h3 className={`text-2xl font-black mb-2 ${
                      service.color === 'orange' || service.color === 'blue' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-lg font-bold mb-1 ${
                      service.color === 'orange' || service.color === 'blue' ? 'text-white/90' : 'text-slate-700'
                    }`}>
                      {service.subtitle}
                    </p>
                    <p className={`text-sm font-medium mb-4 ${
                      service.color === 'orange' || service.color === 'blue' ? 'text-white/70' : 'text-slate-600'
                    }`}>
                      {service.duration}
                    </p>
                    
                    {/* Pricing with Anchoring */}
                    <div className="mb-2">
                      <div className={`text-lg line-through mb-1 ${
                        service.color === 'orange' || service.color === 'blue' ? 'text-white/60' : 'text-gray-500'
                      }`}>
                        {service.originalPrice}{service.priceNote}
                      </div>
                      <div className={`text-3xl font-black ${
                        service.color === 'orange' || service.color === 'blue' ? 'text-white' : 'text-orange-500'
                      }`}>
                        {service.price}
                        <span className="text-lg font-medium">{service.priceNote}</span>
                      </div>
                      <div className={`text-sm font-bold mt-1 ${
                        service.color === 'orange' || service.color === 'blue' ? 'text-white/90' : 'text-green-600'
                      }`}>
                        {service.savings}
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6 sm:mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-start text-sm ${
                        service.color === 'orange' || service.color === 'blue' ? 'text-white/90' : 'text-slate-700'
                      }`}>
                        <span className="mr-3 mt-0.5 flex-shrink-0">
                          {feature.split(' ')[0]}
                        </span>
                        <span>{feature.split(' ').slice(1).join(' ')}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                    service.color === 'orange'
                      ? 'bg-white text-orange-600 hover:bg-orange-50'
                      : service.color === 'blue'
                      ? 'bg-white text-blue-700 hover:bg-blue-50'
                      : 'bg-blue-900 text-white hover:bg-blue-800'
                  }`}>
                    Get Started
                  </button>

                  {/* Value Guarantee */}
                  <div className={`mt-4 text-center text-xs ${
                    service.color === 'orange' || service.color === 'blue' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    90-day improvement guarantee
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Value Proposition */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-8 rounded-3xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Why Fractional CMO Makes Sense</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-black text-orange-400 mb-2">⚡</div>
                  <h4 className="font-bold mb-1">Immediate Impact</h4>
                  <p className="text-gray-300 text-sm">Start seeing results in weeks, not months</p>
                </div>
                <div>
                  <div className="text-3xl font-black text-orange-400 mb-2">💰</div>
                  <h4 className="font-bold mb-1">Better ROI</h4>
                  <p className="text-gray-300 text-sm">Pay for expertise, not overhead and recruiting</p>
                </div>
                <div>
                  <div className="text-3xl font-black text-orange-400 mb-2">🎯</div>
                  <h4 className="font-bold mb-1">Proven Systems</h4>
                  <p className="text-gray-300 text-sm">Battle-tested systems from 20+ years C-level experience</p>
                </div>
                <div>
                  <div className="text-3xl font-black text-orange-400 mb-2">💎</div>
                  <h4 className="font-bold mb-1">Equity Upside</h4>
                  <p className="text-gray-300 text-sm">Potential equity participation for long-term partnerships</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Ian's Background - Light Theme */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Meet Your <span className="text-blue-600">C-Level Executive</span> Partner
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              20+ years C-level experience driving measurable revenue growth at US companies
            </p>
          </div>

          {/* Main Credibility Section */}
          <div className="mb-16">
            <div className="bg-white border-2 border-blue-200 rounded-3xl p-8 sm:p-12 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Primary Stat */}
                <div className="text-center lg:col-span-1">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
                    <div className="text-5xl font-black mb-2">$3M+</div>
                    <div className="text-lg font-bold text-orange-100 mb-1">Monthly Revenue Generated</div>
                    <div className="text-orange-200 text-sm">From Leading US Companies</div>
                  </div>
                </div>
                
                {/* Supporting Stats */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-3xl font-black text-blue-600 mb-1">20+</div>
                      <div className="text-blue-700 font-medium text-sm">Years Experience</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-3xl font-black text-blue-600 mb-1">$500K</div>
                      <div className="text-blue-700 font-medium text-sm">Monthly Ad Testing</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-3xl font-black text-blue-600 mb-1">7+</div>
                      <div className="text-blue-700 font-medium text-sm">Industries Proven</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-3xl font-black text-blue-600 mb-1">8</div>
                      <div className="text-blue-700 font-medium text-sm">Client Limit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Section - Scannable Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-500 hover:scale-105 hover:-rotate-1 cursor-pointer">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Battle-Tested Results</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                I've spent <strong>$500K/month of my own money</strong> testing what actually brings customers. 
                Not theory - real results with real consequences.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Global Reach</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Based in Bangkok, I serve companies worldwide who want <strong>proven marketing excellence</strong> 
                at competitive rates. Perfect for US market expansion.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-500 hover:scale-105 hover:-rotate-1 cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Proven Across Industries</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Software, Healthcare, E-commerce, Financial Services, Professional Services, 
                and more. <strong>Psychology works universally.</strong>
              </p>
            </div>
          </div>

          {/* LinkedIn Verification */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-8 border border-blue-200/50 max-w-2xl mx-auto">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Verify My Background</h4>
              <p className="text-slate-600 mb-6">
                See my full professional background and client recommendations
              </p>
              <a 
                href="https://www.linkedin.com/in/ian-ho/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                View LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown Form */}
      {showDropdownForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Get Your Marketing Analysis</h2>
              <button 
                onClick={() => setShowDropdownForm(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="p-6">
              {/* Step 1: Marketing Anxiety Acknowledgment */}
              {formStep === 1 && (
                <div className="text-center">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">
                    Is Your Marketing <span className="text-orange-500">Keeping You</span> Up at Night?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You know something's wrong when customers don't "get it" but you can't figure out what
                  </p>
                  
                  <div className="max-w-lg mx-auto">
                    <div className="mb-6">
                      <div className="flex justify-center items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">2</div>
                    <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">3</div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Step 1: What's Your Biggest Fear?</p>
                </div>
                
                <div className="text-left mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-4">How do you feel about your current marketing?</label>
                  <div className="space-y-3">
                    {[
                      "It's bleeding money and I don't know why",
                      "Customers see it but don't take action", 
                      "I'm throwing darts in the dark",
                      "I know it could work better but I'm lost"
                    ].map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setFormData({...formData, challenge: option});
                          setSelectedOptions({...selectedOptions, [`challenge-${idx}`]: true});
                          setTimeout(() => setFormStep(2), 600);
                        }}
                        className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-300 group ${
                          formData.challenge === option
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-500 hover:bg-orange-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                            formData.challenge === option
                              ? 'border-orange-500 bg-orange-500'
                              : 'border-gray-300 group-hover:border-orange-500'
                          }`}>
                            {formData.challenge === option && (
                              <svg className="w-3 h-3 text-white animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium group-hover:text-orange-700">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="text-center text-xs text-gray-500">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Free • No spam • Takes 2 minutes
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Revenue/Company Size Qualification */}
          {formStep === 2 && (
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                I Feel You. Let's <span className="text-orange-400">Identify</span>
                <br />Your Growth Stage
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Different revenue levels need different psychology approaches
              </p>
              
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-2xl">
                <div className="mb-6">
                  <div className="flex justify-center items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div className="w-16 h-0.5 bg-orange-300 mx-2"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">3</div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Step 2: Your Revenue Stage</p>
                </div>
                
                <div className="text-left mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-4">What's your current annual revenue?</label>
                  <div className="space-y-3">
                    {[
                      { value: "500k-1m", label: "$500K - $1M", desc: "Growing but hitting walls" },
                      { value: "1m-3m", label: "$1M - $3M", desc: "Scaling but inconsistent" }, 
                      { value: "3m-10m", label: "$3M - $10M", desc: "Need systematic growth" },
                      { value: "10m+", label: "$10M+", desc: "Optimizing for efficiency" }
                    ].map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setFormData({...formData, revenue: option.value});
                          setSelectedOptions({...selectedOptions, [`revenue-${option.value}`]: true});
                          setTimeout(() => setFormStep(3), 600);
                        }}
                        className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-300 group ${
                          formData.revenue === option.value
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-500 hover:bg-orange-50'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                            formData.revenue === option.value
                              ? 'border-orange-500 bg-orange-500'
                              : 'border-gray-300 group-hover:border-orange-500'
                          }`}>
                            {formData.revenue === option.value && (
                              <svg className="w-3 h-3 text-white animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-bold group-hover:text-orange-700">{option.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{option.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <button 
                    onClick={() => setFormStep(1)}
                    className="w-full text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm font-medium py-2"
                  >
                    ← Back to Previous Step
                  </button>
                </div>
                
                <div className="text-center text-xs text-gray-500 mt-4">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    All information kept confidential
                  </div>
                </div>
              </div>
            </div>
          )}

              
              {/* Step 3: Complete Information */}
              {formStep === 3 && (
                <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">Step 3 of 3</span>
                      <span className="text-xs font-medium text-orange-500">Almost Done!</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500" style={{width: '90%'}}></div>
                    </div>
                  </div>

                  {/* Form header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Let's Get Your Analysis Started!</h3>
                    <p className="text-gray-600">Just a few details so I can create your personalized strategy</p>
                  </div>

                  {/* Form sections */}
                  <div className="space-y-4">
                    {/* Contact Information */}
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                        <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">1</span>
                        Your Information
                      </h4>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">First Name *</label>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm" 
                            placeholder="Your first name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">Company *</label>
                          <input 
                            type="text" 
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm" 
                            placeholder="Company name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Business Email *</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm" 
                          placeholder="your@company.com"
                        />
                      </div>
                    </div>

                    {/* Business Details */}
                    <div className="bg-green-50 rounded-xl p-4">
                      <h4 className="font-bold text-green-900 mb-3 flex items-center">
                        <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">2</span>
                        Business Details
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">Website URL</label>
                          <input 
                            type="url" 
                            value={formData.website}
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                            onBlur={(e) => handleFieldBlur('website', e.target.value)}
                            className={`w-full px-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm ${
                              fieldValidation.website === 'valid' ? 'border-green-500' : 
                              fieldValidation.website === 'invalid' ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="https://yourcompany.com"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">Industry</label>
                            <select 
                              value={formData.industry}
                              onChange={(e) => setFormData({...formData, industry: e.target.value})}
                              className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                            >
                              <option value="">Select industry</option>
                              <option value="software">Software/SaaS</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="ecommerce">E-commerce</option>
                              <option value="financial">Financial Services</option>
                              <option value="professional">Professional Services</option>
                              <option value="manufacturing">Manufacturing</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">Team Size</label>
                            <select 
                              value={formData.teamSize}
                              onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                              className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                            >
                              <option value="">Select size</option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="200+">200+ employees</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Marketing Challenge */}
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <h4 className="font-bold text-yellow-900 mb-3 flex items-center">
                        <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs mr-2">3</span>
                        Your Marketing Challenge
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">What's your biggest marketing pain right now? *</label>
                          <textarea 
                            value={formData.specificIssue}
                            onChange={(e) => setFormData({...formData, specificIssue: e.target.value})}
                            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm" 
                            placeholder="e.g., Not getting enough leads, poor conversion rates, unclear messaging, competitors beating us, website visitors not buying..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">What marketing are you currently doing?</label>
                          <textarea 
                            value={formData.currentMarketing}
                            onChange={(e) => setFormData({...formData, currentMarketing: e.target.value})}
                            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm" 
                            placeholder="e.g., Google Ads, social media, content marketing, email campaigns, SEO..."
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                        <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2">4</span>
                        Timeline
                      </h4>
                      <p className="text-xs text-gray-600 mb-3">When do you need to see marketing results?</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: 'asap', label: 'ASAP' },
                          { value: '1-3months', label: '1-3 months' },
                          { value: '3-6months', label: '3-6 months' },
                          { value: '6months+', label: '6+ months' }
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => setFormData({...formData, timeline: option.value})}
                            className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 ${
                              formData.timeline === option.value 
                                ? 'border-orange-500 bg-orange-50 text-orange-700' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button 
                    onClick={async () => {
                      // Validate required fields
                      if (!formData.name || !formData.company || !formData.email || !formData.specificIssue) {
                        alert('Please fill in all required fields');
                        return;
                      }

                      // Validate email format
                      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                        alert('Please enter a valid email address');
                        return;
                      }

                      try {
                        // Create email content using utility
                        const emailContent = generateEmailContent(formData, 'Lead Generation');

                        // Log submission (for development/debugging)
                        console.log('Lead generation form submitted:', {
                          formData,
                          emailContent,
                          timestamp: new Date().toISOString()
                        });

                        // Here you would integrate with your email service
                        // For example: send to info@rebootmedia.net
                        // await sendEmailToRebootMedia(emailContent, formData);

                        // Show success message
                        alert(`Thank you ${formData.name}! Your personalized marketing analysis request has been received. We'll send your analysis to ${formData.email} within 24 hours and may follow up to discuss how our fractional CMO services can help drive your business growth.`);
                        
                        // Reset form and close modal
                        setShowDropdownForm(false);
                        setFormStep(1);
                        setFormData({
                          email: '',
                          challenge: '',
                          revenue: '',
                          name: '',
                          company: '',
                          timeline: '',
                          website: '',
                          specificIssue: '',
                          industry: '',
                          teamSize: '',
                          currentMarketing: ''
                        });

                      } catch (error) {
                        console.error('Form submission error:', error);
                        alert(`There was an error submitting your request. Please try again or contact us directly at ${getObfuscatedEmailDisplay()}`);
                      }
                    }}
                    className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get My Free Marketing Analysis →
                  </button>

                  {/* Back button */}
                  <button 
                    onClick={() => setFormStep(2)}
                    className="w-full mt-3 text-orange-500 hover:text-orange-600 font-medium text-sm"
                  >
                    ← Back
                  </button>

                  {/* Trust badges */}
                  <div className="mt-4 text-center text-xs text-gray-500">
                    🔒 Confidential • No spam • Unsubscribe anytime
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <GlobalFooter onShowForm={() => setShowDropdownForm(true)} />
    </div>
  )
}

export default App