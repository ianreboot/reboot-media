import { useState, useEffect } from 'react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [typedWord, setTypedWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Multi-step form state
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    challenge: '',
    revenue: '',
    name: '',
    company: '',
    timeline: ''
  });
  
  // Words to cycle through - ordered by importance to target demographics
  const lostItems = [
    'Revenue',          // Primary concern for $500K-$1.5M companies
    'Growth',           // Hitting growth plateaus is key pain point
    'Customers',        // Customer acquisition/retention
    'Market Share',     // Competitive positioning
    'Conversions',      // Psychology-driven approach focus
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
      {/* Transparent Fixed Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className={`${scrollY > 50 ? 'bg-blue-900/85 backdrop-blur-lg shadow-lg' : 'bg-transparent'} transition-all duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${scrollY > 50 ? 'text-white' : 'text-slate-900'}`}>REBOOT <span className="text-orange-500">MEDIA</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#psychology" className={`${scrollY > 50 ? 'text-gray-300' : 'text-stone-700'} hover:text-orange-500 transition-all duration-300 font-medium relative group`}>
                Psychology
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#results" className={`${scrollY > 50 ? 'text-gray-300' : 'text-stone-700'} hover:text-orange-500 transition-all duration-300 font-medium relative group`}>
                Results
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#services" className={`${scrollY > 50 ? 'text-gray-300' : 'text-stone-700'} hover:text-orange-500 transition-all duration-300 font-medium relative group`}>
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className={`${scrollY > 50 ? 'text-gray-300' : 'text-stone-700'} hover:text-orange-500 transition-all duration-300 font-medium relative group`}>
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            {/* Traditional CTA Button */}
            <a href="#contact" className="bg-orange-500 text-sm sm:text-base hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block">
              Get Results
            </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax Effect */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              <span className="block mt-2">
                <span className="text-orange-500 relative inline-block min-h-[1.2em]">
                  {typedWord}
                  <span className="animate-blink ml-0.5">|</span>
                  <div className="absolute -inset-2 bg-orange-100 -skew-y-1 -z-10 rounded-lg"></div>
                </span>
              </span>
              <span className="block mt-1">to <span className="text-gray-600 line-through decoration-red-500 decoration-4">Broken</span></span>
              <span className="block mt-1">Marketing</span>
            </h1>
          </div>
          
          {/* Authority Subheadline */}
          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg md:text-xl text-slate-700 font-medium max-w-4xl mx-auto leading-relaxed">
              Growing companies hire <span className="font-bold text-slate-900">proven marketing psychology expertise</span> to break through growth plateaus
            </p>
            <div className="mt-3 text-lg text-slate-600">
              <span className="font-semibold">Proven:</span> $500K/month ad spend • 7 industries • $100K→$3M growth
            </div>
          </div>

          {/* Micro-Commitment CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 sm:px-8 py-3 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto">
              📊 Free Psychology Audit
            </button>
            <button className="border-2 border-stone-900 hover:bg-stone-900 hover:text-white text-slate-900 px-6 sm:px-8 py-3 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 w-full sm:w-auto">
              💡 Learn My Process
            </button>
          </div>

          {/* Social Proof Cards */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-orange-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-slate-900">$3M+</div>
                <div className="text-sm text-slate-600 font-medium mt-1">Monthly Revenue Generated</div>
              </div>
            </div>
            
            <div className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-orange-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-slate-900">7</div>
                <div className="text-sm text-slate-600 font-medium mt-1">Industries Proven</div>
              </div>
            </div>
            
            <div className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-orange-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-slate-900">20+</div>
                <div className="text-sm text-slate-600 font-medium mt-1">Years Experience</div>
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
                  <p className="italic">"Our advanced AI-powered customer lifecycle optimization platform leverages machine learning algorithms to deliver personalized experiences..."</p>
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

      {/* Solution Section - Norton Case Study */}
      <section id="results" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 sm:mb-8">
              <span className="text-blue-600">Marketing Psychology</span>
              <br />That Actually Works
            </h2>
          </div>

          {/* Success Story Section */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-4 py-2 mb-4">
                  <svg className="w-4 h-4 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="text-orange-400 text-sm font-semibold">Success Story</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">From Struggling to Scaling</h3>
                <p className="text-gray-300 text-lg">How marketing psychology transformed a global software company's revenue</p>
              </div>
              
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Before */}
                <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                  <div className="text-sm text-red-400 font-semibold mb-1">BEFORE</div>
                  <div className="text-4xl font-black text-white mb-2">$100K</div>
                  <div className="text-gray-400 text-sm">Monthly Revenue</div>
                  <div className="mt-3 text-gray-300 text-xs">Flat growth, low conversions</div>
                </div>
                
                {/* Process */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-400 font-semibold mb-1">TRANSFORMATION</div>
                  <div className="text-4xl font-black text-white mb-2">30X</div>
                  <div className="text-gray-400 text-sm">Revenue Growth</div>
                  <div className="mt-3 text-gray-300 text-xs">Psychology-driven approach</div>
                </div>
                
                {/* After */}
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="text-sm text-green-400 font-semibold mb-1">AFTER</div>
                  <div className="text-4xl font-black text-white mb-2">$3M+</div>
                  <div className="text-gray-400 text-sm">Monthly Revenue</div>
                  <div className="mt-3 text-gray-300 text-xs">Sustained growth momentum</div>
                </div>
              </div>
              
              {/* Key Strategies */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                <h4 className="text-xl font-bold mb-6 text-white flex items-center">
                  <svg className="w-6 h-6 text-orange-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Psychology Strategies That Drove Results
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-orange-400 font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Loss Aversion Messaging</h5>
                      <p className="text-gray-400 text-sm">Shifted from "Get protected" to "Don't lose your files" - triggering immediate action</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-orange-400 font-bold">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Social Proof Hierarchy</h5>
                      <p className="text-gray-400 text-sm">Layered testimonials from peers first, then experts, maximizing trust building</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-orange-400 font-bold">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Authority Positioning</h5>
                      <p className="text-gray-400 text-sm">Leveraged industry certifications and security badges for instant credibility</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-orange-400 font-bold">4</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Smart Scarcity Triggers</h5>
                      <p className="text-gray-400 text-sm">Time-sensitive offers based on real threat data, not artificial deadlines</p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom CTA */}
                <div className="mt-8 text-center">
                  <p className="text-gray-300 mb-4">Ready to transform your marketing with proven psychology?</p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                    Get Your Free Psychology Audit
                  </button>
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
              <span className="text-orange-500">Psychology</span> Services
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
                subtitle: "Psychology Audit",
                duration: "3-month minimum",
                originalPrice: "$12K",
                price: "$5K-8K",
                priceNote: "/month",
                savings: "Save $4K+/mo",
                features: [
                  "🔍 Customer awareness analysis",
                  "🧠 Conversion funnel psychology",
                  "💬 Value proposition reconstruction",
                  "🛡️ Trust signal optimization",
                  "👥 Team psychology training",
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
                  "📈 A/B testing psychology",
                  "💰 Customer lifetime value optimization",
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
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  hoveredCard === service.index ? 'scale-105 -rotate-1' : 'hover:scale-102'
                }`}
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

                <div className={`p-6 sm:p-8 rounded-3xl shadow-xl border-2 transition-all duration-500 h-full ${
                  service.color === 'orange' 
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-400 transform scale-105'
                    : service.color === 'blue'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-400'
                    : 'bg-white border-gray-200 hover:border-orange-300'
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <p className="text-gray-300 text-sm">Battle-tested across 7 industries, $500K+ ad spend</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Ian's Background */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-slate-800 to-blue-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-orange-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-6 sm:mb-8">
              Meet Your <span className="text-orange-400">Marketing Psychology</span>
              <br />Marketing Expert
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              20+ years turning marketing psychology into measurable revenue growth
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Ian's Story */}
            <div className="space-y-8">
              <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">The \"Super Affiliate\" Background</h3>
                <p className="text-gray-300 leading-normal mb-4">
                  I've spent <span className="font-bold text-white">$500K/month of my own money</span> testing what actually converts customers. Not theory - real results with real consequences.
                </p>
                <p className="text-gray-300 leading-normal">
                  Now I bring those battle-tested psychology principles to help business owners communicate their value in ways that actually drive revenue.
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">The Bangkok Advantage</h3>
                <p className="text-gray-300 leading-normal mb-4">
                  Based in Bangkok, I serve companies globally who want <span className="font-bold text-white">proven marketing excellence</span> at competitive rates.
                </p>
                <p className="text-gray-300 leading-normal">
                  Perfect for companies expanding to US markets or those seeking proven Western marketing psychology expertise.
                </p>
              </div>

              <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-2xl font-bold text-orange-400 mb-4">Industries Proven In</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div>• Software/SaaS</div>
                  <div>• Healthcare</div>
                  <div>• Fashion/E-commerce</div>
                  <div>• Financial Services</div>
                  <div>• Fitness/Wellness</div>
                  <div>• Legal Services</div>
                  <div>• Food & Beverage</div>
                  <div>• Professional Services</div>
                </div>
              </div>
            </div>

            {/* Right: Stats & Credibility */}
            <div className="space-y-8">
              <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl">
                <div className="text-6xl font-black text-white mb-4">$3M+</div>
                <div className="text-xl font-bold text-orange-100 mb-2">Monthly Revenue Generated</div>
                <div className="text-orange-200">Norton Antivirus Case Study</div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="text-3xl font-black text-orange-400 mb-2">20+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="text-3xl font-black text-orange-400 mb-2">7</div>
                  <div className="text-gray-300">Industries</div>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="text-3xl font-black text-orange-400 mb-2">$500K</div>
                  <div className="text-gray-300">Monthly Ad Spend</div>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="text-3xl font-black text-orange-400 mb-2">8</div>
                  <div className="text-gray-300">Client Limit</div>
                </div>
              </div>

              {/* LinkedIn Connection */}
              <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700/50 text-center">
                <h4 className="text-xl font-bold text-white mb-4">Connect & Verify</h4>
                <p className="text-gray-300 mb-6">
                  See my full background and recommendations on LinkedIn
                </p>
                <a 
                  href="https://www.linkedin.com/in/ian-ho/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                  View LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Multi-Step Micro-Commitment Flow */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-blue-900">
        <div className="max-w-4xl mx-auto">
          
          {/* Step 1: Low Commitment - Email Capture */}
          {formStep === 1 && (
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Don't Lose Another <span className="text-orange-400">$10K+</span>
                <br />to Broken Marketing
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get your free marketing psychology audit and discover exactly where your messaging is costing you customers
              </p>
              
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-2xl">
                <div className="mb-4">
                  <div className="flex justify-center items-center mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div className="w-12 h-0.5 bg-gray-200 mx-2"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">2</div>
                    <div className="w-12 h-0.5 bg-gray-200 mx-2"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">3</div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Step 1: Get Free Resource</p>
                </div>
                
                <div className="text-left mb-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Business Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300" 
                    placeholder="your@company.com"
                  />
                </div>
                
                <button 
                  onClick={() => formData.email && setFormStep(2)}
                  disabled={!formData.email}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:transform-none"
                >
                  📊 Get Free Marketing Psychology Checklist
                </button>
                
                <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  We don't sell your information
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Medium Commitment - Challenge Assessment */}
          {formStep === 2 && (
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Perfect! Now Let's <span className="text-orange-400">Diagnose</span>
                <br />Your Marketing Challenge
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                This helps us personalize your free audit to your specific situation
              </p>
              
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-2xl">
                <div className="mb-6">
                  <div className="flex justify-center items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div className="w-12 h-0.5 bg-orange-300 mx-2"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div className="w-12 h-0.5 bg-gray-200 mx-2"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">3</div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Step 2: Quick Assessment</p>
                </div>
                
                <div className="text-left mb-4">
                  <label className="block text-sm font-bold text-slate-700 mb-3">What's your biggest marketing challenge right now?</label>
                  <div className="space-y-2">
                    {[
                      "Customers don't understand our value",
                      "Low conversion rates from ads/website", 
                      "Marketing feels scattered, no strategy",
                      "Can't break through growth plateau",
                      "Not sure how to message to our audience"
                    ].map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFormData({...formData, challenge: option})}
                        className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                          formData.challenge === option 
                            ? 'border-orange-500 bg-orange-50 text-orange-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            formData.challenge === option ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                          }`}>
                            {formData.challenge === option && (
                              <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                            )}
                          </div>
                          <span className="text-sm font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => formData.challenge && setFormStep(3)}
                  disabled={!formData.challenge}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:transform-none"
                >
                  Continue Assessment →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Higher Commitment - Qualification & Schedule */}
          {formStep === 3 && (
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Great! Let's <span className="text-orange-400">Schedule</span>
                <br />Your Free Strategy Call
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Based on your challenge, you're a perfect fit for our psychology-driven approach
              </p>
              
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-2xl">
                <div className="mb-6">
                  <div className="flex justify-center items-center mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div className="w-12 h-0.5 bg-green-300 mx-2"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div className="w-12 h-0.5 bg-orange-300 mx-2"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Step 3: Schedule Strategy Call</p>
                </div>
                
                <div className="space-y-4">
                  <div className="text-left">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300" 
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Company & Revenue</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm" 
                        placeholder="Company name"
                      />
                      <select 
                        value={formData.revenue}
                        onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                        className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-sm"
                      >
                        <option value="">Revenue</option>
                        <option value="500k-1m">$500K-$1M</option>
                        <option value="1m-5m">$1M-$5M</option>
                        <option value="5m+">$5M+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-sm font-bold text-slate-700 mb-2">When do you want to see results?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Within 30 days", "Within 3 months", "Within 6 months", "Just exploring"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setFormData({...formData, timeline: option})}
                          className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all duration-300 ${
                            formData.timeline === option 
                              ? 'border-orange-500 bg-orange-50 text-orange-700' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    if (formData.name && formData.company && formData.revenue && formData.timeline) {
                      alert('Perfect! We\'ll send you calendar link and psychology audit within 2 hours.')
                    }
                  }}
                  disabled={!formData.name || !formData.company || !formData.revenue || !formData.timeline}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:transform-none mt-6"
                >
                  🚀 Schedule My Free Strategy Call
                </button>
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-green-700 font-medium">
                    ✅ Free marketing psychology audit delivered within 2 hours<br/>
                    ✅ 30-minute strategy call (no sales pitch)<br/>
                    ✅ Limited to 8 clients per month
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Back Button for Steps 2 & 3 */}
          {formStep > 1 && (
            <div className="text-center mt-6">
              <button 
                onClick={() => setFormStep(formStep - 1)}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-3xl font-bold text-white">REBOOT <span className="text-orange-500">MEDIA</span></h2>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Marketing psychology expertise for companies ready to break through growth plateaus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="text-center">
              <h4 className="font-bold mb-4 text-orange-400">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Marketing Psychology Audit</li>
                <li>Growth Strategy</li>
                <li>Fractional CMO</li>
              </ul>
            </div>
            
            <div className="text-center">
              <h4 className="font-bold mb-4 text-orange-400">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Reboot Media, Inc.</li>
                <li>Bangkok, Thailand</li>
                <li>Global Expertise</li>
              </ul>
            </div>
            
            <div className="text-center">
              <h4 className="font-bold mb-4 text-orange-400">Proven Results</h4>
              <ul className="space-y-2 text-gray-400">
                <li>$100K → $3M Growth</li>
                <li>7 Industries</li>
                <li>20+ Years Experience</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-stone-500">&copy; 2025 Reboot Media, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App