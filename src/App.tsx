import { useState, useEffect } from 'react';
import { getCanonicalUrl } from './utils/urls';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import EnhancedPricingCards from './components/EnhancedPricingCards';
import EnhancedLeadForm from './components/EnhancedLeadForm';
import ExitIntentManager from './components/ExitIntentModal';
import { ABTestingDashboardTrigger } from './components/ABTestingDashboard';
import { 
  MobileStickyBar, 
  MobileScrollProgress,
  MobileExitIntentDetector 
} from './components/MobileConversionOptimizer';
import SchemaMarkup from './components/SchemaMarkup';
import SEOHead from './components/SEOHead';
import BackgroundGradient from './components/BackgroundGradient';
import { useCoreWebVitals } from './hooks/useCoreWebVitals';
import analytics from './utils/simpleAnalytics';
import ErrorBoundary from './components/ErrorBoundary';
import { useLeadForm } from './contexts/LeadFormContext';
import { useErrorReporter } from './contexts/ErrorContext';
import { ABTestProvider } from './contexts/ABTestContext';
import { ConversionOptimizationProvider } from './contexts/ConversionOptimizationContext';
import { usePricingOptimization } from './hooks/useABTestHooks';
import { useScrollOptimization, useTimeBasedOptimization, useClickHeatmap } from './hooks/useABTestHooks';

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

// Main App Component with A/B Testing
const MainApp = () => {
  const [typedWord, setTypedWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Use the lead form context and error reporting
  const { setShowDropdownForm } = useLeadForm();
  const reportError = useErrorReporter();
  
  // A/B Testing and Optimization Hooks
  usePricingOptimization(); // Initialize pricing optimization
  
  // Initialize optimization hooks
  useScrollOptimization();
  useTimeBasedOptimization();
  useClickHeatmap();
  
  // Simple Core Web Vitals tracking
  useCoreWebVitals();

  // Global error handler for unhandled promise rejections
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      reportError(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
        type: 'promise_rejection',
        reason: event.reason,
      });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  }, [reportError]);
  
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
  }, [typedWord, wordIndex, isDeleting]);

  return (
    <>
      {/* SEO and Schema Markup - Critical for initial page load */}
      <ErrorBoundary level="component" name="SEOComponents">
        <SEOHead 
          title="Fractional CMO Services | Marketing Psychology That Converts | Reboot Media"
          description="Break through revenue plateaus with psychology-driven fractional CMO services. Transform $500K-$1.5M companies into scalable enterprises. Proven $100K→$3M growth."
          keywords="fractional CMO, marketing psychology, revenue growth, growth plateau solutions, marketing strategy consultant"
          canonicalUrl={getCanonicalUrl('')}
        />
        <SchemaMarkup type="organization" />
      </ErrorBoundary>
      
      <div className="homepage min-h-screen relative overflow-hidden">
        {/* Sophisticated Background Gradient - Non-critical visual element */}
        <ErrorBoundary level="component" name="BackgroundGradient">
          <BackgroundGradient />
        </ErrorBoundary>
        
        {/* Global Header - Critical navigation component */}
        <div className="relative z-10">
          <ErrorBoundary level="component" name="GlobalHeader">
            <GlobalHeader onShowForm={() => setShowDropdownForm(true)} />
          </ErrorBoundary>

      {/* Hero Section - Vertically Centered in Viewport */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        {/* Simple Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-stone-400/10 rounded-full blur-2xl"></div>
        </div>

        <div className="w-full py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Main Headline - Natural Spacing */}
          <h1 className="heading-hero text-critical mb-6">
            <span className="block">Stop Losing</span>
            <span className="block text-orange-500">
              {typedWord}<span className="animate-blink">|</span>
            </span>
            <span className="block">to <span className="text-white line-through decoration-red-500 decoration-4">Broken</span> Marketing</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-standard max-w-4xl mx-auto mb-8">
            <span className="text-white/90">Stop fumbling with amateur advice. Get</span> <span className="font-bold text-important">battle-tested strategies proven at Fortune 500 companies</span> <span className="text-white/90">that drive explosive growth</span>
          </p>

          {/* Single Primary CTA */}
          <div className="flex justify-center">
            <button 
              onClick={() => {
                analytics.ctaClick('Show Me What\'s Broken in My Marketing', 'hero');
                setShowDropdownForm(true);
              }}
              className="cta-primary px-8 sm:px-12 py-4 rounded-xl font-black text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center gap-3"
            >
              <span className="text-2xl">🔍</span>
              <span>Show Me What's Broken in My Marketing</span>
            </button>
          </div>

          {/* Benefits-Focused Proof Points */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group relative bg-white/90 backdrop-blur-sm border-l-4 border-orange-500 rounded-r-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-center">
                <div className="text-2xl font-black text-important mb-1">30X Growth</div>
                <div className="text-sm text-standard font-medium leading-tight">
                  Companies see explosive revenue growth when psychology replaces guesswork
                </div>
              </div>
            </div>
            
            <div className="group relative bg-white/90 backdrop-blur-sm border-l-4 border-blue-500 rounded-r-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-center">
                <div className="text-2xl font-black replace-text-slate-900 mb-1">Stop the Bleed</div>
                <div className="text-sm replace-text-slate-700 font-medium leading-tight">
                  Finally understand why customers don't buy, instead of wondering why
                </div>
              </div>
            </div>
            
            <div className="group relative bg-white/90 backdrop-blur-sm border-l-4 border-green-500 rounded-r-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="text-center">
                <div className="text-2xl font-black replace-text-slate-900 mb-1">Sleep Better</div>
                <div className="text-sm replace-text-slate-700 font-medium leading-tight">
                  No more throwing money at marketing that doesn't bring customers
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Customer Awareness Stage 1 */}
      <section id="psychology" className="px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'clamp(0.5rem, 1.5vw, 1rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="heading-xl text-critical mb-6 sm:mb-8">
              The <span className="text-red-500">$200K</span> Marketing Mistake
            </h2>
            <p className="text-xl replace-text-stone-700 max-w-3xl mx-auto leading-normal">
              <span className="text-white/90"><span className="font-bold">73% of growing companies</span> can't explain their value clearly to customers. They suffer from the "Curse of Knowledge" - knowing too much about their product to communicate it simply.</span>
            </p>
          </div>

          {/* Asymmetrical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200 transform -rotate-1">
                <h3 className="text-2xl font-bold replace-text-slate-900 mb-6">What Business Owners Say:</h3>
                <div className="space-y-4 replace-text-stone-700">
                  <p className="italic">"Our advanced AI-powered customer management platform leverages machine learning algorithms to deliver personalized experiences..."</p>
                  <p className="text-red-600 font-semibold">❌ Customers don't understand this</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-orange-200/30 dark:border-orange-400/30 transform rotate-1">
                <h3 className="text-2xl font-bold mb-6 text-white">What Customers Hear:</h3>
                <div className="space-y-4 replace-text-stone-700">
                  <p className="italic text-white/90">"We help you stop losing customers and make more money from the ones you have."</p>
                  <p className="text-green-600 font-semibold">✅ Clear, benefits-focused</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Experience Section */}
      <section id="psychology" className="px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'clamp(4rem, 10vw, 6rem)', paddingBottom: 'clamp(4rem, 10vw, 6rem)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-4 py-2 mb-4">
              <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-blue-accessible text-sm font-semibold">Common Question</span>
            </div>
            <h2 className="heading-xl replace-text-slate-900 mb-6" style={{ marginTop: '0.25rem' }}>
              "Do You Have Experience in <span className="text-blue-accessible">My Industry</span>?"
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              <span className="text-white/90">This is the right question to ask. But the answer might surprise you...</span>
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
                <h3 className="heading-md text-red-700 mb-4" style={{ marginTop: '0.25rem' }}>Why Industry Experts Often Fail</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl">
                  <div className="text-center">
                    <h4 className="text-lg font-bold mb-3">The Curse of Knowledge</h4>
                    <p className="replace-text-gray-300 text-base leading-relaxed">
                      They're so deep in industry jargon they can't see what confuses customers
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl">
                  <div className="text-center">
                    <h4 className="text-lg font-bold mb-3">Replicate Not Customize</h4>
                    <p className="replace-text-gray-300 text-base leading-relaxed">
                      They copy what worked elsewhere instead of customizing for your unique market
                    </p>
                  </div>
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
                <h3 className="heading-md text-green-800 mb-4" style={{ marginTop: '0.25rem' }}>The Fresh Eyes Advantage</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="text-center">
                    <h4 className="text-lg font-bold mb-3">Customer Perspective</h4>
                    <p className="replace-text-gray-300 text-base leading-relaxed">
                      I ask the same questions your prospects do, spotting exactly where they get confused
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="text-center">
                    <h4 className="text-lg font-bold mb-3">Question Everything</h4>
                    <p className="replace-text-gray-300 text-base leading-relaxed">
                      While experts accept "how we've always done it," I ask "why?" and find new opportunities
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                  <div className="text-center">
                    <h4 className="text-lg font-bold mb-3">Executive Experience</h4>
                    <p className="replace-text-gray-300 text-base leading-relaxed">
                      C-level strategies that work across industries - proven at 20+ US companies
                    </p>
                  </div>
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
                        <div className="text-7xl font-black text-blue-accessible mb-2">85%</div>
                        <p className="text-blue-800 text-lg font-semibold leading-tight">
                          of breakthrough results come from questioning "industry standards"
                        </p>
                      </div>
                      
                      <div className="bg-white/70 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-black replace-text-slate-700">20+</div>
                            <div className="text-xs text-slate-600 font-medium">US Companies</div>
                          </div>
                          <div>
                            <div className="text-2xl font-black replace-text-slate-700">$2B+</div>
                            <div className="text-xs text-slate-600 font-medium">Revenue Managed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - The Real Question */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="heading-lg replace-text-slate-900 mb-4 leading-tight">
                        The Real Question Isn't<br />
                        <span className="text-red-500 line-through decoration-4">"Industry Experience"</span>
                      </h3>
                      
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white transform -rotate-1">
                        <p className="text-xl font-bold mb-3">
                          It's: "Can you see the opportunities I'm blind to?"
                        </p>
                        <div className="flex items-center space-x-2 text-orange-100">
                          <span className="text-sm">Fresh perspective + proven psychology</span>
                        </div>
                      </div>
                      
                      <div className="bg-white/50 rounded-xl p-4 border-l-4 border-orange-500">
                        <p className="replace-text-slate-700 text-sm italic">
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
      <section id="services" className="px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="heading-xl replace-text-slate-900 mb-6 sm:mb-8">
              Fractional CMO
              <br />
              <span className="text-orange-500">Executive</span> Services
            </h2>
            <p className="text-xl replace-text-stone-700 max-w-3xl mx-auto mb-4">
              <span className="text-white/90">Strategic marketing leadership without the $300K+ salary commitment</span>
            </p>
            
            {/* Price Anchoring Header */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between text-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-bold replace-text-slate-900 mb-2">Full-Time CMO Cost</h3>
                  <div className="text-3xl font-black text-red-600 line-through">$300K+</div>
                  <div className="text-sm text-red-700">+ benefits, recruiting, risk</div>
                </div>
                <div className="text-orange-500 text-4xl font-bold mx-8">VS</div>
                <div>
                  <h3 className="text-lg font-bold replace-text-slate-900 mb-2">Fractional CMO</h3>
                  <div className="text-3xl font-black text-orange-500">$5K-18K</div>
                  <div className="text-sm text-orange-700">immediate start, proven results</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Pricing Cards with A/B Testing */}
          <ErrorBoundary level="component" name="EnhancedPricingCards">
            <EnhancedPricingCards />
          </ErrorBoundary>

          {/* Bottom Value Proposition */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-8 rounded-3xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Why Fractional CMO Makes Sense</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-black text-orange-400 mb-2">⚡</div>
                  <h4 className="font-bold mb-1">Immediate Impact</h4>
                  <p className="replace-text-gray-300 text-sm">Start seeing results in weeks, not months</p>
                </div>
                <div>
                  <div className="text-3xl font-black text-orange-400 mb-2">💰</div>
                  <h4 className="font-bold mb-1">Better ROI</h4>
                  <p className="replace-text-gray-300 text-sm">Pay for expertise, not overhead and recruiting</p>
                </div>
                <div>
                  <div className="text-3xl font-black text-orange-400 mb-2">🎯</div>
                  <h4 className="font-bold mb-1">Proven Systems</h4>
                  <p className="replace-text-gray-300 text-sm">Battle-tested systems from 20+ years C-level experience</p>
                </div>
                <div>
                  <div className="text-3xl font-black text-orange-400 mb-2">💎</div>
                  <h4 className="font-bold mb-1">Equity Upside</h4>
                  <p className="replace-text-gray-300 text-sm">Potential equity participation for long-term partnerships</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Ian's Background - Light Theme */}
      <section id="about" className="px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-xl replace-text-slate-900 mb-6">
              Meet Your <span className="text-blue-accessible">C-Level Executive</span> Partner
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              <span className="text-white/95">20+ years C-level experience driving measurable revenue growth at US companies</span>
            </p>
          </div>

          {/* Main Credibility Section */}
          <div className="mb-16">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
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
                    <div className="bg-gradient-to-br from-blue-50/60 to-blue-100/40 dark:from-blue-900/30 dark:to-blue-800/20 backdrop-blur-sm border border-blue-400/50 dark:border-blue-400/40 rounded-xl p-6 text-center shadow-lg">
                      <div className="text-3xl font-black text-blue-accessible mb-1">20+</div>
                      <div className="text-blue-700 dark:text-blue-300 font-medium text-sm">Years Experience</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50/60 to-green-100/40 dark:from-green-900/30 dark:to-green-800/20 backdrop-blur-sm border border-green-400/50 dark:border-green-400/40 rounded-xl p-6 text-center shadow-lg">
                      <div className="text-3xl font-black text-green-600 mb-1">$500K</div>
                      <div className="text-green-700 dark:text-green-300 font-medium text-sm">Monthly Ad Testing</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50/60 to-purple-100/40 dark:from-purple-900/30 dark:to-purple-800/20 backdrop-blur-sm border border-purple-400/50 dark:border-purple-400/40 rounded-xl p-6 text-center shadow-lg">
                      <div className="text-3xl font-black text-purple-600 mb-1">7+</div>
                      <div className="text-purple-700 dark:text-purple-300 font-medium text-sm">Industries Proven</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50/60 to-red-100/40 dark:from-red-900/30 dark:to-red-800/20 backdrop-blur-sm border border-red-400/50 dark:border-red-400/40 rounded-xl p-6 text-center shadow-lg">
                      <div className="text-3xl font-black text-red-600 mb-1">8</div>
                      <div className="text-red-700 dark:text-red-300 font-medium text-sm">Client Limit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Section - Scannable Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-orange-200/30 dark:border-orange-400/30 rounded-2xl p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:-rotate-1 cursor-pointer">
              <div className="w-12 h-12 bg-orange-100/70 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-accessible" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold replace-text-slate-900 mb-3">Battle-Tested Results</h3>
              <p className="replace-text-gray-600 text-sm leading-relaxed">
                <span className="text-white/95">I've spent <strong>$500K/month of my own money</strong> testing what actually brings customers. 
                Not theory - real results with real consequences.</span>
              </p>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-blue-200/30 dark:border-blue-400/30 rounded-2xl p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer">
              <div className="w-12 h-12 bg-blue-100/70 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-accessible" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold replace-text-slate-900 mb-3">Global Reach</h3>
              <p className="replace-text-gray-600 text-sm leading-relaxed">
                <span className="text-white/95">Based in Bangkok, I serve companies worldwide who want <strong>proven marketing excellence</strong> 
                at competitive rates. Perfect for US market expansion.</span>
              </p>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-green-200/30 dark:border-green-400/30 rounded-2xl p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:-rotate-1 cursor-pointer">
              <div className="w-12 h-12 bg-green-100/70 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold replace-text-slate-900 mb-3">Proven Across Industries</h3>
              <p className="replace-text-gray-600 text-sm leading-relaxed">
                <span className="text-white/95">Software, Healthcare, E-commerce, Financial Services, Professional Services, 
                and more. <strong>Psychology works universally.</strong></span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - For Procrastinators and Skeptics */}
      <section className="px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-950 to-black relative overflow-hidden" style={{ paddingTop: 'clamp(4rem, 10vw, 5rem)', paddingBottom: 'clamp(4rem, 10vw, 5rem)' }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px' 
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center">
            {/* For Procrastinators */}
            <div className="mb-12">
              <div className="inline-flex items-center bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-4 py-2 mb-6">
                <svg className="w-4 h-4 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span className="text-orange-300 text-sm font-semibold">Still Thinking About It?</span>
              </div>
              
              <h2 className="heading-xl mb-6 text-white" style={{ marginTop: '0.25rem', color: 'white' }}>
                Every Month You Wait Costs You <span className="text-orange-400">$47,000</span> in Lost Revenue
              </h2>
              
              <p className="text-xl mb-8 max-w-3xl mx-auto replace-text-gray-300">
                That's the average monthly opportunity cost for businesses operating without proper marketing strategy. 
                Your competitors aren't waiting. <span className="text-orange-400 font-semibold">Neither should you.</span>
              </p>
            </div>

            {/* For Skeptics */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 mb-10">
              <h3 className="text-2xl font-bold text-white mb-6">
                "I've Heard It All Before" - <span className="text-blue-400">We Get It.</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-left">
                  <div className="text-red-400 font-bold mb-2">❌ What Others Say:</div>
                  <p className="replace-text-gray-400 text-sm">"We'll grow your business" (with no specifics)</p>
                </div>
                <div className="text-left">
                  <div className="text-red-400 font-bold mb-2">❌ What They Do:</div>
                  <p className="replace-text-gray-400 text-sm">Generic templates and hope for the best</p>
                </div>
                <div className="text-left">
                  <div className="text-green-400 font-bold mb-2">✅ What We Do:</div>
                  <p className="replace-text-gray-300 text-sm">Show you exactly what's broken before you pay a dime</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-2xl p-6 border border-blue-400/20">
                <h4 className="text-lg font-bold text-white mb-3">
                  Here's Why This Analysis is Different:
                </h4>
                <ul className="text-left space-y-2 replace-text-gray-300 text-sm max-w-2xl mx-auto">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-0.5">✓</span>
                    <span><strong>No generic advice:</strong> Specific to YOUR business, YOUR industry, YOUR competition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-0.5">✓</span>
                    <span><strong>No junior marketers:</strong> 20+ years C-level experience reviews your business personally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-0.5">✓</span>
                    <span><strong>No obligation:</strong> Get the analysis, implement it yourself if you want</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-0.5">✓</span>
                    <span><strong>No BS:</strong> If we can't help, we'll tell you straight up</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Risk Reversal */}
            <div className="mb-10">
              <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-6 py-3 mb-6">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-green-300 font-bold">Zero Risk Guarantee</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4" style={{ marginTop: '0.25rem' }}>
                You Have Nothing to Lose (Except More Revenue)
              </h3>
              
              <div className="replace-text-gray-300 space-y-0 max-w-2xl mx-auto">
                <p className="py-0">🚫 No credit card required</p>
                <p className="py-0">🚫 No sales pressure</p>
                <p className="py-0">🚫 No spam emails</p>
                <p className="py-0">✅ Just honest insights about your marketing gaps</p>
              </div>
            </div>

            {/* Final CTA */}
            <div>
              <button 
                onClick={() => {
                  analytics.ctaClick('Yes, Show Me What I\'m Missing', 'final-cta');
                  setShowDropdownForm(true);
                }}
                className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-orange-700 hover:to-red-600 text-white px-10 sm:px-14 py-5 rounded-xl font-black text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center gap-3 group"
              >
                <span>Yes, Show Me What I'm Missing</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
              
              <p className="replace-text-gray-400 text-sm mt-6">
                <span className="text-orange-400 font-semibold">While you're reading this</span>, your competitors are fixing their marketing. 
                <span className="text-white">What are you waiting for?</span>
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Global Footer - Critical navigation component */}
      <ErrorBoundary level="component" name="GlobalFooter">
        <GlobalFooter onShowForm={() => setShowDropdownForm(true)} />
      </ErrorBoundary>

      {/* Enhanced Lead Form with A/B Testing */}
      <ErrorBoundary level="component" name="EnhancedLeadForm">
        <EnhancedLeadForm />
      </ErrorBoundary>

      {/* Exit Intent Management */}
      <ErrorBoundary level="component" name="ExitIntentManager">
        <ExitIntentManager />
      </ErrorBoundary>

      {/* Mobile Conversion Optimizers */}
      <ErrorBoundary level="component" name="MobileOptimization">
        <MobileStickyBar />
        <MobileScrollProgress />
        <MobileExitIntentDetector />
      </ErrorBoundary>

      {/* A/B Testing Dashboard (Development Only) */}
      <ABTestingDashboardTrigger />
        </div>
      </div>
    </>
  )
}

// App Wrapper with Context Providers
function App() {
  return (
    <ABTestProvider>
      <ConversionOptimizationProvider>
        <MainApp />
      </ConversionOptimizationProvider>
    </ABTestProvider>
  );
}

export default App