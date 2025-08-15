import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const ProductMarketFitErosion = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "What Worked Before Isn't Working Now? Product-Market Fit Erosion | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'What worked before isn\'t working now? 6 product-market fit erosion patterns where markets evolve faster than products and messaging.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'product market fit erosion, what worked before stopped working, market evolution problems, PMF decay, market fit lost');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Market Evolution" Disconnect',
      customerSays: "What worked before isn't working now",
      customerThinks: "Maybe we need to update our product features",
      realProblem: "Market evolved faster than product positioning and messaging",
      solution: "Reposition existing product for current market needs and pain points",
      whyItWorks: "Same product, updated positioning = restored market fit without development",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 2,
      title: 'The "Competitor Catchup" Erosion',
      customerSays: "Competitors are somehow winning deals we used to win easily",
      customerThinks: "We need better features or lower prices to compete",
      realProblem: "Competitors caught up to your advantages, but you didn't evolve differentiation",
      solution: "Identify new differentiation points based on current capabilities vs market",
      whyItWorks: "Continuous differentiation evolution maintains competitive advantage",
      painLevel: "High", 
      timeStuck: "6-12 months",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      id: 3,
      title: 'The "Customer Needs Shift" Gap',
      customerSays: "Customers are asking for things we don't do",
      customerThinks: "We need to build new features to stay relevant",
      realProblem: "Customer priorities shifted but messaging still addresses old priorities",
      solution: "Reframe existing capabilities around new customer priorities and outcomes",
      whyItWorks: "Messaging pivot > product pivot for addressing evolved customer needs",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      id: 4,
      title: 'The "Lost Touch with Audience" Drift',
      customerSays: "Prospects don't seem to understand what we do",
      customerThinks: "We need clearer marketing or better sales materials",
      realProblem: "Lost connection with core audience language and current pain points",
      solution: "Customer research to understand current language and priority shifts",
      whyItWorks: "Speaking current customer language restores connection and conversion",
      painLevel: "Medium",
      timeStuck: "8-12 months", 
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 5,
      title: 'The "Success Plateau" Complacency',
      customerSays: "We had great product-market fit, but growth is slowing",
      customerThinks: "Maybe the market is just saturating naturally",
      realProblem: "Stopped iterating on positioning and messaging after initial success",
      solution: "Continuous market feedback loops and positioning optimization",
      whyItWorks: "Product-market fit requires ongoing maintenance, not one-time achievement",
      painLevel: "Low",
      timeStuck: "12-18 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 6,
      title: 'The "Feature Creep" Confusion',
      customerSays: "Our product does more than ever but conversions are down",
      customerThinks: "We need better onboarding or user experience",
      realProblem: "Added features confused core value proposition and market positioning",
      solution: "Simplify messaging back to core value, position features as supporting benefits",
      whyItWorks: "Clarity > complexity - confused prospects don't buy",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-red-500 to-red-600"
    }
  ];

  return (
    <>
      {/* Screen Reader Status Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="status-announcer"
      >
        <span className="sr-only">Content loaded successfully</span>
      </div>
      
      <SEOHead 
        title="What Worked Before Isn't Working Now? Product-Market Fit Erosion | Reboot Media"
        description="What worked before isn't working now? 6 product-market fit erosion patterns where markets evolve faster than products and messaging."
        canonicalUrl={getCanonicalUrl('product-market-fit-erosion')}
      />

      <div className="pmf-erosion-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-purple-900 via-purple-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 replace-text-gray-300">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="hover:text-purple-400 focus-visible:text-purple-400 transition-colors">Growth Plateau Solutions</a>
                  <span>→</span>
                  <span className="text-purple-400 font-semibold">Product-Market Fit Erosion</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                  What Worked Before Stopped Working
                </div>
                <h1 className="heading-hero text-gradient-critical text-4xl md:text-6xl font-black mb-6 leading-tight">
                  <span className="text-purple-400">Product-Market Fit</span>
                  <span className="block text-white mt-2">Erosion Solutions</span>
                </h1>
                <p className="text-important-accessible text-xl replace-text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  What worked before isn't working now? The problem isn't your product losing relevance—it's that 
                  <span className="text-purple-400 font-semibold"> markets evolve faster than products</span>, and your messaging may be stuck in the past.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 focus-visible:from-purple-600 hover:to-purple-700 focus-visible:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Restore Your Market Fit
                </button>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <main 
          id="main-content" 
          role="main"
          aria-label="Main content"
          className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
            
            {/* Introduction */}
            <section className="mb-16">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-purple-200/50 dark:border-purple-800/50 p-8">
                <h2 className="heading-xl text-gradient-critical text-2xl font-bold mb-6 text-center">
                  Why Product-Market Fit Erodes (And How to Restore It)
                </h2>
                <p className="text-important-accessible text-lg text-standard dark:replace-text-gray-300 mb-6 leading-relaxed text-center">
                  Product-market fit isn't a permanent achievement—it requires ongoing maintenance. Markets, customers, and competitive landscapes evolve 
                  constantly, but many companies assume their initial PMF will last forever without iteration.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">71%</div>
                    <p className="text-sm text-optional dark:replace-text-gray-400">Experience PMF erosion</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">18mo</div>
                    <p className="text-sm text-optional dark:replace-text-gray-400">Average fit decay time</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">29%</div>
                    <p className="text-sm text-optional dark:replace-text-gray-400">Restore with repositioning</p>
                  </div>
                </div>
                <p className="text-important-accessible text-standard dark:replace-text-gray-300 font-semibold text-center">
                  The pattern: Initial success → Market evolution → Messaging lag → Fit erosion
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl md:text-4xl font-bold mb-12 text-center">
                <span className="block">6 PMF Erosion Patterns</span>
                <span className="block">(Which is Yours?)</span>
              </h2>
              
              <div className="space-y-8">
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className={`bg-gradient-to-r ${scenario.gradient} p-6`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="heading-lg text-important-accessible dark:text-white text-2xl font-bold text-white mb-2">
                            {scenario.title}
                          </h3>
                          <div className="flex gap-4 text-sm text-purple-100">
                            <span>Pain Level: {scenario.painLevel}</span>
                            <span>Typical Time Stuck: {scenario.timeStuck}</span>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                          {scenario.id}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* Customer Says */}
                        <div className="space-y-6">
                          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                            <h4 className="heading-md text-important-accessible dark:text-white font-bold text-red-800 dark:text-red-300 mb-2 flex items-center">
                              <span className="mr-2">💬</span>
                              Customer Says:
                            </h4>
                            <p className="text-standard dark:replace-text-gray-300 italic">
                              "{scenario.customerSays}"
                            </p>
                          </div>
                          
                          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                            <h4 className="heading-md text-important-accessible dark:text-white font-bold text-purple-800 dark:text-purple-300 mb-2 flex items-center">
                              <span className="mr-2">💭</span>
                              Customer Thinks:
                            </h4>
                            <p className="text-standard dark:replace-text-gray-300">
                              {scenario.customerThinks}
                            </p>
                          </div>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-6">
                          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500">
                            <h4 className="heading-md text-important-accessible dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Problem:
                            </h4>
                            <p className="text-standard dark:replace-text-gray-300">
                              {scenario.realProblem}
                            </p>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                            <h4 className="heading-md text-important-accessible dark:text-white font-bold text-green-800 dark:text-green-300 mb-2 flex items-center">
                              <span className="mr-2">✅</span>
                              Solution:
                            </h4>
                            <p className="text-standard dark:replace-text-gray-300">
                              {scenario.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Why It Works */}
                      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                        <h4 className="heading-md text-important-accessible dark:text-white font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                          <span className="mr-2">🧠</span>
                          Why This Works:
                        </h4>
                        <p className="text-standard-accessible dark:replace-text-gray-300 font-medium">
                          {scenario.whyItWorks}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16">
              <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/50">
                <h3 className="heading-lg text-important-accessible dark:text-white text-2xl font-bold mb-4">
                  🚨 Stop Watching Your Market Fit Decay
                </h3>
                <p className="text-important-accessible text-lg text-standard-accessible dark:replace-text-gray-300 mb-6 max-w-3xl mx-auto">
                  Every month your messaging stays frozen while markets evolve, competitors with current positioning capture opportunities you're missing. 
                  Get your free PMF analysis and discover which erosion patterns are disconnecting you from your market.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 focus-visible:from-purple-600 hover:to-purple-700 focus-visible:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free PMF Restoration Analysis
                </button>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} 
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-500 focus-visible:bg-purple-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block"
                >
                  See All Plateau Types
                </a>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl font-bold mb-8 text-center">
                Related Growth Plateau Solutions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-important-accessible dark:text-white text-xl font-bold mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/market-expansion-barriers`} className="hover:text-purple-600 focus-visible:text-purple-600 transition-colors">
                      Market Expansion Barriers →
                    </a>
                  </h3>
                  <p className="text-standard dark:replace-text-gray-300">
                    Fit erosion often reveals expansion opportunities. Discover how positioning psychology unlocks adjacent markets.
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-important-accessible dark:text-white text-xl font-bold mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="hover:text-purple-600 focus-visible:text-purple-600 transition-colors">
                      Marketing Psychology Fundamentals →
                    </a>
                  </h3>
                  <p className="text-standard dark:replace-text-gray-300">
                    Master customer awareness stages and positioning psychology that prevents and reverses market fit erosion.
                  </p>
                </div>
              </div>
            </section>

          </main>

          <GlobalFooter onShowForm={() => setShowDropdownForm(true)} />
        </div>
      </div>
    </>
  );
};

export default ProductMarketFitErosion;