import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const CustomerAcquisitionStall = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "CAC Rising, Conversion Flat? Customer Acquisition Stall Solutions | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'CAC inflation killing growth? 7 customer acquisition stall patterns and psychology fixes that break through the same-channel, same-message competition trap.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'customer acquisition cost rising, CAC inflation, lead generation problems, conversion rate stuck, customer acquisition stall');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "More Leads" Trap',
      customerSays: "Our CAC keeps rising but MQLs are flat",
      customerThinks: "We need more volume to hit our growth targets",
      realProblem: "Broad targeting to hit lead volume goals attracts unqualified prospects",
      solution: "Narrow ICP, qualify harder before handoff, focus on revenue per lead not total leads",
      whyItWorks: "Better to pay $200 for qualified lead than $50 for junk that wastes sales time",
      painLevel: "High",
      timeStuck: "6-12 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 2,
      title: 'The "Best Practice" Copying Trap',
      customerSays: "We're doing everything competitors do",
      customerThinks: "If it works for them, it should work for us",
      realProblem: "Same channels, same message, same prospects = commodity competition",
      solution: "Find overlooked channels where your ICP hangs out, differentiated messaging",
      whyItWorks: "Blue ocean in channel strategy, not product features",
      painLevel: "Medium",
      timeStuck: "8-14 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      title: 'The "Features War" Messaging Trap',
      customerSays: "Our product is clearly superior",
      customerThinks: "Prospects should see how much better our features are",
      realProblem: "Prospects don't care about features, they care about outcomes",
      solution: "Outcome-focused messaging matched to customer awareness stages",
      whyItWorks: "People buy results and risk reduction, not feature lists",
      painLevel: "Very High", 
      timeStuck: "12-18 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 4,
      title: 'The "Spray and Pray" Testing Trap',
      customerSays: "We try different things but nothing sticks",
      customerThinks: "We need to test more channels and tactics",
      realProblem: "Random testing without hypothesis or systematic measurement",
      solution: "Scientific approach: hypothesis → test → measure → scale what works",
      whyItWorks: "Compound improvement from systematic testing beats random changes",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 5,
      title: 'The "Vanity Metrics" Focus Trap',
      customerSays: "Our website traffic is growing nicely",
      customerThinks: "More visitors should equal more customers",
      realProblem: "Traffic doesn't equal revenue if visitors aren't qualified",
      solution: "Focus on revenue-driving metrics: revenue per visitor, qualified leads, close rates",
      whyItWorks: "Revenue per visitor > total visitors for sustainable growth",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 6,
      title: 'The "One-Size-Fits-All" Funnel Trap',
      customerSays: "Our conversion rate is stuck",
      customerThinks: "We need better landing pages or offers",
      realProblem: "Unaware prospects get 'buy now' messaging, aware prospects get education",
      solution: "Different funnels for different awareness stages and traffic sources",
      whyItWorks: "Right message, right stage, right time = higher conversion",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 7,
      title: 'The "Discount Dependency" Trap',
      customerSays: "We have to discount to close deals",
      customerThinks: "Market is getting more price sensitive",
      realProblem: "Value proposition isn't compelling enough without price reduction",
      solution: "Reframe around ROI and risk reduction, remove negotiation options",
      whyItWorks: "Value > Price when communicated through loss aversion psychology",
      painLevel: "Very High",
      timeStuck: "12-24 months",
      gradient: "from-pink-500 to-pink-600"
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
        title="CAC Rising, Conversion Flat? Customer Acquisition Stall Solutions | Reboot Media"
        description="CAC inflation killing growth? 7 customer acquisition stall patterns and psychology fixes that break through the same-channel, same-message competition trap."
        canonicalUrl={getCanonicalUrl('customer-acquisition-stall')}
      />

      <div className="customer-acquisition-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-orange-900 via-orange-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,88,12,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 text-gradient-safe">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="hover:text-orange-400 focus-visible:text-orange-400 transition-colors">Growth Plateau Solutions</a>
                  <span>→</span>
                  <span className="text-orange-400 font-semibold">Customer Acquisition Stall</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  CAC Rising, Conversion Flat
                </div>
                <h1 className="heading-hero text-gradient-critical text-4xl md:text-6xl font-black mb-6 leading-tight">
                  <span className="text-orange-400">Customer Acquisition</span>
                  <span className="block text-white mt-2">Stall Solutions</span>
                </h1>
                <p className="text-black-important dark:text-gradient-critical text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                  CAC keeps rising while conversion stays flat? The problem isn't your product or budget—it's that you're 
                  <span className="text-orange-400 font-semibold"> competing on the same channels with the same message</span> as everyone else.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Fix Your CAC Inflation
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
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-orange-200/50 dark:border-orange-800/50 p-8">
                <h2 className="heading-xl text-gradient-critical text-2xl font-bold replace-text-gray-900 dark:text-white mb-6 text-center">
                  Why Customer Acquisition Costs Keep Rising
                </h2>
                <p className="text-black-important dark:text-gradient-critical text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed text-center">
                  CAC inflation isn't random—it follows predictable patterns. When everyone competes on the same channels with similar messaging, 
                  costs go up and quality goes down. The solution isn't more budget; it's psychology-driven differentiation.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-accessible mb-1">73%</div>
                    <p className="text-sm text-optional dark:luminescence-layer-3">Experience CAC inflation</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">156%</div>
                    <p className="text-sm text-optional dark:luminescence-layer-3">Average CAC increase</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">27%</div>
                    <p className="text-sm text-optional dark:luminescence-layer-3">Break cycle with differentiation</p>
                  </div>
                </div>
                <p className="text-black-important dark:text-gradient-critical text-standard dark:text-gradient-safe font-semibold text-center">
                  The pattern: Same channels → Same message → Same prospects → Price competition
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl md:text-4xl font-bold replace-text-gray-900 dark:text-white mb-12 text-center">
                <span className="block">7 CAC Inflation Patterns</span>
                <span className="block">(Which is Yours?)</span>
              </h2>
              
              <div className="space-y-8">
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className={`bg-gradient-to-r ${scenario.gradient} p-6`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="heading-lg text-black-important dark:text-white text-2xl font-bold text-white mb-2">
                            {scenario.title}
                          </h3>
                          <div className="flex gap-4 text-sm text-orange-100">
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
                            <h4 className="heading-md text-black-important dark:text-white font-bold text-red-800 dark:text-red-300 mb-2 flex items-center">
                              <span className="mr-2">💬</span>
                              Customer Says:
                            </h4>
                            <p className="text-standard dark:text-gradient-safe italic">
                              "{scenario.customerSays}"
                            </p>
                          </div>
                          
                          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500">
                            <h4 className="heading-md text-black-important dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center">
                              <span className="mr-2">💭</span>
                              Customer Thinks:
                            </h4>
                            <p className="text-standard dark:text-gradient-safe">
                              {scenario.customerThinks}
                            </p>
                          </div>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-6">
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                            <h4 className="heading-md text-black-important dark:text-white font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Problem:
                            </h4>
                            <p className="text-standard dark:text-gradient-safe">
                              {scenario.realProblem}
                            </p>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                            <h4 className="heading-md text-black-important dark:text-white font-bold text-green-800 dark:text-green-300 mb-2 flex items-center">
                              <span className="mr-2">✅</span>
                              Solution:
                            </h4>
                            <p className="text-standard dark:text-gradient-safe">
                              {scenario.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Why It Works */}
                      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                        <h4 className="heading-md text-black-important dark:text-white font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                          <span className="mr-2">🧠</span>
                          Why This Works:
                        </h4>
                        <p className="text-black-standard dark:text-gradient-safe font-medium">
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
              <div className="text-center bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 border border-orange-200/50 dark:border-orange-800/50">
                <h3 className="text-2xl font-bold replace-text-gray-900 dark:text-white mb-4">
                  🚨 Stop Competing on Price in Saturated Channels
                </h3>
                <p className="text-black-important dark:text-gradient-critical text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto">
                  Every month you compete on the same channels with the same message, your CAC gets worse while competitors with 
                  differentiated psychology capture qualified prospects. Get your free acquisition analysis and discover which pattern is killing your efficiency.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free CAC Analysis
                </button>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} 
                  className="border-2 border-orange-500 text-orange-accessible hover:bg-orange-500 focus-visible:bg-orange-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block"
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
                  <h3 className="heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/revenue-ceiling-breakthrough`} className="hover:text-orange-accessible focus-visible:text-orange-accessible transition-colors">
                      Revenue Ceiling Breakthrough →
                    </a>
                  </h3>
                  <p className="text-standard dark:text-gradient-safe">
                    Revenue stuck at $500K, $1M, or $1.5M? The problem isn't your product—founder-led sales can't scale without documented processes.
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-black-important dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="hover:text-orange-accessible focus-visible:text-orange-accessible transition-colors">
                      Marketing Psychology Fundamentals →
                    </a>
                  </h3>
                  <p className="text-standard dark:text-gradient-safe">
                    Master the 5 customer awareness stages that break through commodity competition with psychology-driven differentiation.
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

export default CustomerAcquisitionStall;