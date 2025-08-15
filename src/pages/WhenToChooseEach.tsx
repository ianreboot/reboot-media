import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const WhenToChooseEach = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "When to Choose Each Marketing Model: Decision Matrix | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Clear decision matrix for choosing between Fractional CMO, agency, consultant, or in-house team. 7 business situations with definitive recommendations.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'marketing model decision matrix, when to hire fractional cmo, marketing leadership options, choose marketing approach');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Pre-Revenue Startup" Stage',
      companySays: "We need marketing but have no revenue",
      companyThinks: "We can't afford professional marketing",
      realConsideration: "MVP validation vs growth engine building",
      evaluationFramework: "Product-market fit testing needs",
      outcome: "DIY until MVP proven; Consultant for validation; Fractional CMO at $500K revenue",
      painLevel: "Medium",
      timeStuck: "3-6 months",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      id: 2,
      title: 'The "First Million Revenue" Milestone',
      companySays: "Marketing got us here, but growth is slowing",
      companyThinks: "We need more of what we've been doing",
      realConsideration: "Tactical execution vs strategic shift needs",
      evaluationFramework: "Growth ceiling indicators",
      outcome: "Agency for more tactics; Fractional CMO for breakthrough strategy",
      painLevel: "High",
      timeStuck: "8-12 months",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      id: 3,
      title: 'The "Rapid Scaling" Pressure',
      companySays: "We just raised funding and need to grow fast",
      companyThinks: "We need a full marketing team immediately",
      realConsideration: "Speed vs sustainable growth infrastructure",
      evaluationFramework: "Burn rate vs growth efficiency",
      outcome: "Fractional CMO to build strategy + Agency for execution speed",
      painLevel: "Very High",
      timeStuck: "6-10 months",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: 'The "Marketing Crisis" Emergency',
      companySays: "Our marketing completely stopped working",
      companyThinks: "We need to change everything",
      realConsideration: "Diagnosis vs panic reaction",
      evaluationFramework: "Root cause analysis requirements",
      outcome: "Consultant for audit; Fractional CMO for turnaround; New agency for fresh tactics",
      painLevel: "Critical",
      timeStuck: "2-4 months",
      gradient: "from-red-500 to-pink-500"
    },
    {
      id: 5,
      title: 'The "Mature Business Plateau" Challenge',
      companySays: "We've been at the same revenue for years",
      companyThinks: "Marketing isn't the problem",
      realConsideration: "Market evolution vs internal stagnation",
      evaluationFramework: "Innovation capacity assessment",
      outcome: "Full-time CMO for transformation; Fractional for targeted breakthrough",
      painLevel: "High",
      timeStuck: "24-36 months",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      id: 6,
      title: 'The "Geographic Expansion" Opportunity',
      companySays: "We want to expand to new markets",
      companyThinks: "We'll replicate what works here",
      realConsideration: "Market differences vs universal principles",
      evaluationFramework: "Localization vs standardization needs",
      outcome: "Consultant for market research; Fractional CMO for strategy; Local agency for execution",
      painLevel: "Medium",
      timeStuck: "12-18 months",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      id: 7,
      title: 'The "Digital Transformation" Imperative',
      companySays: "We need to modernize our marketing",
      companyThinks: "We need younger marketers",
      realConsideration: "Technology adoption vs strategic thinking",
      evaluationFramework: "Digital maturity assessment",
      outcome: "In-house for daily digital; Fractional CMO for transformation strategy",
      painLevel: "High",
      timeStuck: "18-24 months",
      gradient: "from-gray-500 to-slate-500"
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
        title="When to Choose Each Marketing Model: Decision Matrix | Reboot Media"
        description="Clear decision matrix for choosing between Fractional CMO, agency, consultant, or in-house team. 7 business situations with definitive recommendations."
        canonicalUrl={getCanonicalUrl('when-to-choose-each')}
      />

      <div className="when-to-choose-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-indigo-900 via-purple-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(129,140,248,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 replace-text-gray-300">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-indigo-400 focus-visible:text-indigo-400 transition-colors">Fractional CMO Guide</a>
                  <span>→</span>
                  <span className="text-indigo-400 font-semibold">When to Choose Each</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                  Clear Decision Matrix for Every Situation
                </div>
                <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                  <span className="text-indigo-400">When to Choose</span>
                  <span className="block text-purple-400 mt-2">Each Marketing Model</span>
                </h1>
                <p className="text-xl replace-text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Stop guessing. Every business situation has an optimal marketing model. 
                  <span className="text-indigo-400 font-semibold"> Match your stage, challenge, and goals to the right approach.</span>
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 focus-visible:from-indigo-600 hover:to-purple-700 focus-visible:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Get Your Custom Recommendation
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
            
            {/* Quick Decision Matrix */}
            <section className="mb-16">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-200/50 dark:border-indigo-800/50 p-8">
                <h2 className="heading-xl text-gradient-critical mb-6">
                  Quick Decision Matrix (Your Situation → Best Model)
                </h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <strong className="text-yellow-800 dark:text-yellow-300">Pre-revenue/MVP Stage:</strong>
                    <p className="text-standard dark:replace-text-gray-300 mt-1">DIY → Consultant for validation</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <strong className="text-blue-800 dark:text-blue-300">$500K-1M Revenue:</strong>
                    <p className="text-standard dark:replace-text-gray-300 mt-1">Fractional CMO + Tactical agency</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <strong className="text-green-800 dark:text-green-300">$1M-3M Scaling:</strong>
                    <p className="text-standard dark:replace-text-gray-300 mt-1">Fractional CMO leading strategy</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <strong className="text-purple-800 dark:text-purple-300">$3M-5M Growth:</strong>
                    <p className="text-standard dark:replace-text-gray-300 mt-1">Fractional + In-house team</p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <strong className="text-red-800 dark:text-red-300">Crisis/Turnaround:</strong>
                    <p className="text-standard dark:replace-text-gray-300 mt-1">Fractional CMO immediately</p>
                  </div>
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <strong className="text-indigo-800 dark:text-indigo-300">$5M+ Established:</strong>
                    <p className="text-standard dark:replace-text-gray-300 mt-1">Full-time CMO + complete team</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-12 text-center">
                7 Business Situations With Clear Recommendations
              </h2>
              
              <div className="space-y-8">
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className={`bg-gradient-to-r ${scenario.gradient} p-6`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="heading-lg text-white mb-2">
                            {scenario.title}
                          </h3>
                          <div className="flex gap-4 text-sm text-white/90">
                            <span>Pain Level: {scenario.painLevel}</span>
                            <span>Decision Delay: {scenario.timeStuck}</span>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                          {scenario.id}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* Company Says */}
                        <div className="space-y-6">
                          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                            <h4 className="heading-md text-red-800 dark:text-red-300 mb-2 flex items-center">
                              <span className="mr-2">💬</span>
                              Company Says:
                            </h4>
                            <p className="text-standard dark:replace-text-gray-300 italic">
                              "{scenario.companySays}"
                            </p>
                          </div>
                          
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border-l-4 border-indigo-500">
                            <h4 className="heading-md text-indigo-800 dark:text-indigo-300 mb-2 flex items-center">
                              <span className="mr-2">💭</span>
                              Company Thinks:
                            </h4>
                            <p className="text-standard dark:replace-text-gray-300">
                              {scenario.companyThinks}
                            </p>
                          </div>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-6">
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                            <h4 className="heading-md text-yellow-800 dark:text-yellow-300 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Consideration:
                            </h4>
                            <p className="text-standard dark:replace-text-gray-300">
                              {scenario.realConsideration}
                            </p>
                          </div>
                          
                          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                            <h4 className="heading-md text-purple-800 dark:text-purple-300 mb-2 flex items-center">
                              <span className="mr-2">⚖️</span>
                              Evaluation Framework:
                            </h4>
                            <p className="text-standard dark:replace-text-gray-300">
                              {scenario.evaluationFramework}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Outcome */}
                      <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                        <h4 className="heading-md text-green-800 dark:text-green-300 mb-2 flex items-center">
                          <span className="mr-2">🎯</span>
                          Clear Recommendation:
                        </h4>
                        <p className="text-standard dark:replace-text-gray-300 font-medium">
                          {scenario.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Model Comparison Table */}
            <section className="mb-16">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-200/50 dark:border-indigo-800/50 p-8 overflow-x-auto">
                <h2 className="heading-xl text-gradient-critical mb-6">
                  Marketing Model Comparison Matrix
                </h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 font-bold replace-text-gray-900 dark:text-white">Factor</th>
                      <th className="text-center py-3 px-2 text-blue-accessible">Fractional CMO</th>
                      <th className="text-center py-3 px-2 text-orange-accessible">Agency</th>
                      <th className="text-center py-3 px-2 text-purple-600">Consultant</th>
                      <th className="text-center py-3 px-2 text-green-600">In-House</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2 font-medium">Best For Revenue</td>
                      <td className="text-center py-3 px-2">$500K-5M</td>
                      <td className="text-center py-3 px-2">Any</td>
                      <td className="text-center py-3 px-2">$1M+</td>
                      <td className="text-center py-3 px-2">$3M+</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2 font-medium">Primary Value</td>
                      <td className="text-center py-3 px-2">Strategy + Execution</td>
                      <td className="text-center py-3 px-2">Execution</td>
                      <td className="text-center py-3 px-2">Analysis</td>
                      <td className="text-center py-3 px-2">Continuity</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2 font-medium">Time to Impact</td>
                      <td className="text-center py-3 px-2">30-60 days</td>
                      <td className="text-center py-3 px-2">60-90 days</td>
                      <td className="text-center py-3 px-2">90-120 days</td>
                      <td className="text-center py-3 px-2">180+ days</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2 font-medium">Cost Structure</td>
                      <td className="text-center py-3 px-2">$5-15K/month</td>
                      <td className="text-center py-3 px-2">$3-20K/month</td>
                      <td className="text-center py-3 px-2">$25-75K project</td>
                      <td className="text-center py-3 px-2">$8-25K/month</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">Accountability</td>
                      <td className="text-center py-3 px-2">✅ Results</td>
                      <td className="text-center py-3 px-2">⚠️ Tasks</td>
                      <td className="text-center py-3 px-2">❌ Advice</td>
                      <td className="text-center py-3 px-2">⚠️ Effort</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16">
              <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200/50 dark:border-indigo-800/50">
                <h3 className="heading-lg text-gradient-critical mb-4">
                  🚨 Stop Choosing the Wrong Marketing Model
                </h3>
                <p className="text-lg text-black-standard dark:replace-text-gray-300 mb-6 max-w-3xl mx-auto">
                  Every month with the wrong model costs you growth, money, and momentum. 
                  Get your personalized recommendation based on your specific situation, budget, and goals.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 focus-visible:from-indigo-600 hover:to-purple-700 focus-visible:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Personalized Recommendation
                </button>
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/cost-roi-analysis`} className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-500 focus-visible:bg-indigo-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block">
                  See Cost Analysis
                </a>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                Related Decision Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/transition-strategies`} className="hover:text-indigo-600 focus-visible:text-indigo-600 transition-colors">
                      How to Transition Between Models →
                    </a>
                  </h3>
                  <p className="text-standard dark:replace-text-gray-300">
                    Growth requires different models at different stages. Learn how to transition smoothly without losing momentum.
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="hover:text-indigo-600 focus-visible:text-indigo-600 transition-colors">
                      Stuck at Current Model? →
                    </a>
                  </h3>
                  <p className="text-standard dark:replace-text-gray-300">
                    Growth plateaus often signal the need for a different marketing model. Identify your plateau and solution.
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

export default WhenToChooseEach;