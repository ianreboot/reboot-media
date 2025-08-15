import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const RevenueCeilingBreakthrough = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Stuck at $500K, $1M, or $1.5M Revenue? Revenue Ceiling Breakthrough | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Revenue stuck at predictable milestones? 5 real scenarios showing why founder-led sales can\'t scale without documented processes and psychology-driven systems.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'revenue ceiling breakthrough, stuck at 1 million revenue, founder led sales scaling problems, sales process documentation');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: "$500K-750K Plateau: The Founder Sales Trap",
      customerSays: "I'm still closing every deal personally",
      customerThinks: "I need more leads to grow, but I can't train anyone to sell like I do",
      realProblem: "No documented sales process means the founder's intuition can't be replicated",
      solution: "Document discovery questions, objection responses, and pricing conversations as decision trees",
      whyItWorks: "Makes founder's sales intuition transferable and scalable to other team members",
      painLevel: "High",
      timeStuck: "8-12 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 2, 
      title: "$1M-1.2M Plateau: Wrong Lead Quality",
      customerSays: "We have leads but they don't convert like they used to",
      customerThinks: "We need better lead generation or our product isn't competitive",
      realProblem: "Broad targeting attracts unqualified prospects to hit volume goals",
      solution: "Narrow ICP definition, qualify harder upfront, say no to poor-fit prospects",
      whyItWorks: "Better to have 10 perfect-fit prospects than 100 poor-fit ones",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      title: "$1.2M-1.5M Plateau: Pricing Model Breakdown", 
      customerSays: "We win deals but margins keep shrinking",
      customerThinks: "Market is getting more competitive, we need to be more flexible on pricing",
      realProblem: "Custom pricing and negotiation erode unit economics at scale",
      solution: "Standardize offerings into 3 tiers, value-based pricing, remove negotiation",
      whyItWorks: "Predictable revenue requires predictable pricing without exceptions",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 4,
      title: "$1.5M-2M Plateau: Sales Team Scaling Crisis",
      customerSays: "New salespeople aren't hitting quota consistently",
      customerThinks: "We hired the wrong people or our market is getting saturated",
      realProblem: "No systematic onboarding or sales playbook for new reps",
      solution: "Create 90-day rep onboarding, record founder's best sales calls, build objection library",
      whyItWorks: "New reps can learn proven patterns instead of starting from scratch",
      painLevel: "Very High",
      timeStuck: "18-24 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 5,
      title: "$2M+ Plateau: Market Positioning Confusion",
      customerSays: "We're losing deals to competitors we used to beat easily",
      customerThinks: "Competitors have caught up or we need better features",
      realProblem: "Messaging hasn't evolved with company size - still sounds like startup",
      solution: "Reposition as established player, emphasize stability and track record",
      whyItWorks: "Buyer psychology changes - at $2M+ they want proven, not innovative",
      painLevel: "Medium",
      timeStuck: "6-12 months", 
      gradient: "from-purple-500 to-purple-600"
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
        title="Stuck at $500K, $1M, or $1.5M Revenue? Revenue Ceiling Breakthrough | Reboot Media"
        description="Revenue stuck at predictable milestones? 5 real scenarios showing why founder-led sales can't scale without documented processes and psychology-driven systems."
        canonicalUrl={getCanonicalUrl('revenue-ceiling-breakthrough')}
      />

      <div className="revenue-ceiling-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-red-900 via-red-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 replace-text-gray-300">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="hover:text-red-400 focus-visible:text-red-400 transition-colors">Growth Plateau Solutions</a>
                  <span>→</span>
                  <span className="text-red-400 font-semibold">Revenue Ceiling Breakthrough</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Revenue Stuck at Predictable Milestones
                </div>
                <h1 className="heading-hero text-gradient-critical text-4xl md:text-6xl font-black mb-6 leading-tight">
                  <span className="text-red-400">Revenue Ceiling</span>
                  <span className="block text-white mt-2">Breakthrough Guide</span>
                </h1>
                <p className="text-important-accessible text-xl replace-text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Stuck at $500K, $1M, or $1.5M for months? The problem isn't your product or market—it's that 
                  <span className="text-red-400 font-semibold"> founder-led sales can't scale</span> without documented processes.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Break Through Your Revenue Ceiling
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
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-red-200/50 dark:border-red-800/50 p-8">
                <h2 className="heading-xl text-gradient-critical text-2xl font-bold replace-text-gray-900 dark:text-white mb-6 text-center">
                  Why Revenue Gets Stuck at Predictable Dollar Amounts
                </h2>
                <p className="text-important-accessible text-lg text-standard dark:replace-text-gray-300 mb-6 leading-relaxed text-center">
                  After analyzing 200+ growth-stage companies, we discovered that revenue plateaus happen at predictable milestones: 
                  $500K, $1M, $1.2M, $1.5M, and $2M. Each ceiling has a specific psychological and systems cause.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">67%</div>
                    <p className="text-sm text-optional dark:replace-text-gray-400">Hit predictable ceilings</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-accessible mb-1">14mo</div>
                    <p className="text-sm text-optional dark:replace-text-gray-400">Average time stuck</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">33%</div>
                    <p className="text-sm text-optional dark:replace-text-gray-400">Break through with systems</p>
                  </div>
                </div>
                <p className="text-important-accessible text-standard dark:replace-text-gray-300 font-semibold text-center">
                  The root cause? What works at $500K breaks at $1M. What works at $1M breaks at $2M.
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl md:text-4xl font-bold replace-text-gray-900 dark:text-white mb-12 text-center">
                <span className="block">5 Revenue Ceiling Scenarios</span>
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
                          <div className="flex gap-4 text-sm text-red-100">
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
                          
                          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500">
                            <h4 className="heading-md text-important-accessible dark:text-white font-bold text-orange-800 dark:text-orange-300 mb-2 flex items-center">
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
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                            <h4 className="heading-md text-important-accessible dark:text-white font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center">
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
              <div className="text-center bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200/50 dark:border-red-800/50">
                <h3 className="text-2xl font-bold replace-text-gray-900 dark:text-white mb-4">
                  🚨 Tired of Founder-Led Sales Bottlenecks?
                </h3>
                <p className="text-important-accessible text-lg text-standard-accessible dark:replace-text-gray-300 mb-6 max-w-3xl mx-auto">
                  Every month you stay stuck at your revenue ceiling, competitors with documented sales processes are capturing the growth that should be yours. 
                  Get your free plateau analysis and discover which ceiling scenario matches your situation.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free Revenue Ceiling Analysis
                </button>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} 
                  className="border-2 border-red-500 text-red-600 hover:bg-red-500 focus-visible:bg-red-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block"
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
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/customer-acquisition-stall`} className="hover:text-red-600 focus-visible:text-red-600 transition-colors">
                      Customer Acquisition Stall →
                    </a>
                  </h3>
                  <p className="text-standard dark:replace-text-gray-300">
                    CAC keeps rising while conversion stays flat? You're competing on the same channels with the same message as everyone else.
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-important-accessible dark:text-white text-xl font-bold replace-text-gray-900 dark:text-white mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="hover:text-red-600 focus-visible:text-red-600 transition-colors">
                      Marketing Psychology Fundamentals →
                    </a>
                  </h3>
                  <p className="text-standard dark:replace-text-gray-300">
                    Master the 5 customer awareness stages that transform scattered marketing into predictable revenue systems.
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

export default RevenueCeilingBreakthrough;