import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const MarketExpansionBarriers = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Market Saturated? Market Expansion Barriers & Psychology Solutions | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Core market feels saturated? 7 market expansion barriers and positioning psychology that breaks through the TAM limitation mindset.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'market expansion barriers, market saturation problems, TAM limitations, market expansion strategy, positioning psychology');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Our Market is Tapped Out" Myth',
      customerSays: "Everyone in our industry already knows us",
      customerThinks: "We need to find new industries or geographic markets",
      realProblem: "Defined market by product category, not by problems solved",
      solution: "Reframe around jobs-to-be-done, find new use cases for same product",
      whyItWorks: "Same product, different problems = new markets without new development",
      painLevel: "Medium",
      timeStuck: "8-14 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 2,
      title: 'The "Geographic Expansion" Trap',
      customerSays: "We need to expand to new cities/regions",
      customerThinks: "Location equals market opportunity",
      realProblem: "Geographic thinking instead of psychographic market definition",
      solution: "Find similar customer types in different industries/segments locally first",
      whyItWorks: "Customer psychology doesn't change with location, but logistics do",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: 'The "Feature Expansion" Delusion',
      customerSays: "We need more functionality to compete in new markets",
      customerThinks: "More features = more markets we can serve",
      realProblem: "Feature bloat confuses core value proposition for all markets",
      solution: "Same features, different positioning and messaging for adjacent markets",
      whyItWorks: "Clarity > complexity for new market penetration psychology",
      painLevel: "Very High",
      timeStuck: "18-24 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 4,
      title: 'The "Big Fish, Small Pond" Comfort Trap',
      customerSays: "We dominate our niche, why risk expanding?",
      customerThinks: "Expansion might hurt our current market position",
      realProblem: "Risk aversion and ego protection override growth opportunities",
      solution: "Test adjacent markets without abandoning core, portfolio approach",
      whyItWorks: "Diversification reduces risk rather than increasing it",
      painLevel: "Low",
      timeStuck: "6-12 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      title: 'The "Brand Perception Lock-In" Barrier',
      customerSays: "People only see us as [specific category]",
      customerThinks: "We need to rebrand to expand markets",
      realProblem: "Messaging consistency valued over market opportunity",
      solution: "Umbrella positioning that encompasses multiple markets naturally",
      whyItWorks: "Brand evolution > revolution in customer perception psychology",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      id: 6,
      title: 'The "Validation Paralysis" Trap',
      customerSays: "We need more market research before expanding",
      customerThinks: "We don't have enough data to make expansion decisions",
      realProblem: "Analysis paralysis disguised as diligence and risk management",
      solution: "Small tests with existing customers in adjacent use cases",
      whyItWorks: "Speed to market > perfect market research in fast-changing landscapes",
      painLevel: "Medium",
      timeStuck: "8-12 months",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      id: 7,
      title: 'The "Price Point Mismatch" Barrier',
      customerSays: "New markets won't pay our prices",
      customerThinks: "We need to lower prices to enter new markets",
      realProblem: "Same value proposition, different value perception by segment",
      solution: "Value ladder with different packages for different market segments",
      whyItWorks: "Same product, different value framing = segment-appropriate pricing",
      painLevel: "High",
      timeStuck: "12-18 months",
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
        title="Market Saturated? Market Expansion Barriers & Psychology Solutions | Reboot Media"
        description="Core market feels saturated? 7 market expansion barriers and positioning psychology that breaks through the TAM limitation mindset."
        canonicalUrl={getCanonicalUrl('market-expansion-barriers')}
      />

      <div className="market-expansion-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-yellow-900 via-yellow-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(202,138,4,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 replace-text-gray-300">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="hover:text-yellow-400 focus-visible:text-yellow-400 transition-colors">Growth Plateau Solutions</a>
                  <span>→</span>
                  <span className="text-yellow-400 font-semibold">Market Expansion Barriers</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                  Market Feels Saturated
                </div>
                <h1 className="heading-hero text-gradient-critical text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  <span className="text-yellow-400">Market Expansion</span>
                  <span className="block text-white mt-2">Barrier Solutions</span>
                </h1>
                <p className="text-important-accessible text-xl replace-text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Core market feels saturated? The issue isn't market size—it's that you've 
                  <span className="text-yellow-400 font-semibold"> defined your market by product category</span> instead of problems solved.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 focus-visible:from-yellow-600 hover:to-yellow-700 focus-visible:to-yellow-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Break Market Barriers
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
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-yellow-200/50 dark:border-yellow-800/50 p-8">
                <h2 className="heading-xl text-gradient-critical text-2xl font-bold replace-text-gray-900 dark:text-white mb-6 text-center">
                  Why Market "Saturation" is Usually a Positioning Problem
                </h2>
                <p className="text-important-accessible text-lg text-standard dark:replace-text-gray-300 mb-6 leading-relaxed text-center">
                  Most "saturated" markets aren't actually saturated—companies have just defined their addressable market too narrowly. 
                  The solution isn't finding new markets; it's redefining your current one through psychology and positioning.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">78%</div>
                    <p className="text-sm text-optional dark:replace-text-gray-400">Feel market constrained</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">3.4x</div>
                    <p className="text-sm text-optional dark:replace-text-gray-400">Larger addressable market</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">22%</div>
                    <p className="text-sm text-optional dark:replace-text-gray-400">Succeed with repositioning</p>
                  </div>
                </div>
                <p className="text-important-accessible text-standard dark:replace-text-gray-300 font-semibold text-center">
                  Pattern: Same product → Different problems → New markets
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl md:text-4xl font-bold replace-text-gray-900 dark:text-white mb-12 text-center">
                <span className="block">7 Market Expansion Barriers</span>
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
                          <div className="flex gap-4 text-sm text-yellow-100">
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
                          
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                            <h4 className="heading-md text-important-accessible dark:text-white font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center">
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
              <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200/50 dark:border-yellow-800/50">
                <h3 className="text-2xl font-bold replace-text-gray-900 dark:text-white mb-4">
                  🚨 Stop Accepting Market "Limitations" as Reality
                </h3>
                <p className="text-important-accessible text-lg text-standard-accessible dark:replace-text-gray-300 mb-6 max-w-3xl mx-auto">
                  Every month you stay trapped by narrow market definitions, competitors with better positioning psychology 
                  are capturing expansion opportunities you can't see. Get your free expansion analysis and discover which barriers are limiting your growth.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 focus-visible:from-yellow-600 hover:to-yellow-700 focus-visible:to-yellow-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free Market Expansion Analysis
                </button>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} 
                  className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 focus-visible:bg-yellow-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block"
                >
                  See All Plateau Types
                </a>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl font-bold replace-text-gray-900 dark:text-white mb-8 text-center">
                Related Growth Plateau Solutions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-important-accessible dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/customer-acquisition-stall`} className="hover:text-yellow-600 focus-visible:text-yellow-600 transition-colors">
                      Customer Acquisition Stall →
                    </a>
                  </h3>
                  <p className="text-standard dark:replace-text-gray-300">
                    CAC rising while conversion stays flat? Stop competing on the same channels with the same message as everyone else.
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-important-accessible dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="hover:text-yellow-600 focus-visible:text-yellow-600 transition-colors">
                      Marketing Psychology Fundamentals →
                    </a>
                  </h3>
                  <p className="text-standard dark:replace-text-gray-300">
                    Master positioning psychology and awareness stages that reveal hidden market expansion opportunities.
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

export default MarketExpansionBarriers;