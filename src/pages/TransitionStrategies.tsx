import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const TransitionStrategies = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Marketing Leadership Transition Strategies: When to Switch | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Marketing leadership transition guide. 7 transition patterns from agency to fractional, consultant to CMO, and scaling strategies that work.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'marketing transition strategies, switch from agency to fractional cmo, fractional to full time transition, marketing leadership change');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Agency to Fractional CMO" Evolution',
      companySays: "Our agency relationship isn't working",
      companyThinks: "We need more strategic thinking",
      realConsideration: "Execution capabilities vs strategic leadership",
      evaluationFramework: "What's working vs what's missing",
      outcome: "Keep agency for execution, add fractional CMO for strategy",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-orange-500 to-blue-500"
    },
    {
      id: 2,
      title: 'The "Fractional to Full-Time CMO" Scaling',
      companySays: "We're ready for a full-time CMO",
      companyThinks: "Growth means upgrading to full-time",
      realConsideration: "Workload analysis vs status considerations",
      evaluationFramework: "$200K+ marketing budget threshold",
      outcome: "Fractional CMO helps hire and transition to full-time successor",
      painLevel: "Medium",
      timeStuck: "6-12 months",
      gradient: "from-blue-500 to-green-500"
    },
    {
      id: 3,
      title: 'The "Consultant to Fractional CMO" Implementation Gap',
      companySays: "We have great strategy but can't execute",
      companyThinks: "We need implementation help",
      realConsideration: "Strategy refinement vs pure execution",
      evaluationFramework: "Strategy quality vs execution capability",
      outcome: "Fractional CMO refines strategy while implementing",
      painLevel: "Very High",
      timeStuck: "10-16 months",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      id: 4,
      title: 'The "Failed In-House to External" Recovery',
      companySays: "Our internal marketing isn't working",
      companyThinks: "We hired the wrong people",
      realConsideration: "People vs systems vs strategy problems",
      evaluationFramework: "Root cause analysis of failures",
      outcome: "Fractional CMO diagnoses and fixes systemic issues",
      painLevel: "Very High",
      timeStuck: "12-20 months",
      gradient: "from-red-500 to-orange-500"
    },
    {
      id: 5,
      title: 'The "DIY to Professional" Maturity',
      companySays: "Founder-led marketing isn't scaling",
      companyThinks: "We need marketing professionals",
      realConsideration: "Founder strengths vs professional expertise",
      evaluationFramework: "What to keep vs what to delegate",
      outcome: "Fractional CMO builds on founder insights, adds professional systems",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-yellow-500 to-green-500"
    },
    {
      id: 6,
      title: 'The "Multi-Vendor to Single Accountability" Simplification',
      companySays: "Too many marketing vendors, no one's accountable",
      companyThinks: "We need one throat to choke",
      realConsideration: "Vendor management vs unified strategy",
      evaluationFramework: "Coordination costs vs accountability value",
      outcome: "Fractional CMO becomes quarterback for all marketing efforts",
      painLevel: "High",
      timeStuck: "6-12 months",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      id: 7,
      title: 'The "Scale-Down During Tough Times" Efficiency',
      companySays: "We need to cut marketing costs but maintain results",
      companyThinks: "Fractional is cheaper than full-time",
      realConsideration: "Fixed vs variable cost structure",
      evaluationFramework: "Maintaining momentum vs cost reduction",
      outcome: "Fractional CMO maintains strategic continuity at lower cost",
      painLevel: "Medium",
      timeStuck: "3-6 months",
      gradient: "from-gray-500 to-blue-500"
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
        title="Marketing Leadership Transition Strategies: When to Switch | Reboot Media"
        description="Marketing leadership transition guide. 7 transition patterns from agency to fractional, consultant to CMO, and scaling strategies that work."
        canonicalUrl={getCanonicalUrl('transition-strategies')}
      />

      <div className="transition-strategies-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-purple-900 via-pink-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 text-gradient-safe">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-purple-400 focus-visible:text-purple-400 transition-colors">Fractional CMO Guide</a>
                  <span>→</span>
                  <span className="text-pink-400 font-semibold">Transition Strategies</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                  When and How to Switch Approaches
                </div>
                <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                  <span className="text-purple-400">Marketing Leadership</span>
                  <span className="block text-pink-400 mt-2">Transition Strategies</span>
                </h1>
                <p className="text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                  Growth stages require different marketing approaches. Agency → Fractional → Full-time isn't always the path. 
                  <span className="text-pink-400 font-semibold"> Know when to switch and how to do it right.</span>
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 focus-visible:from-purple-600 hover:to-pink-700 focus-visible:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Plan Your Transition Strategy
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
              <div className="glass-card-light rounded-2xl shadow-xl border border-purple-200/50 dark:border-purple-800/50 p-8">
                <h2 className="heading-xl text-gradient-critical mb-6">
                  Why Most Marketing Transitions Fail (And How to Succeed)
                </h2>
                <p className="text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed">
                  Most companies switch marketing approaches reactively—when pain becomes unbearable. Smart companies transition 
                  proactively, using growth triggers and strategic milestones to guide evolution from one model to another.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">82%</div>
                    <p className="text-sm text-optional dark:luminescence-layer-3">Switch reactively in crisis</p>
                  </div>
                  <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600 mb-1">6mo</div>
                    <p className="text-sm text-optional dark:luminescence-layer-3">Lost during transitions</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">31%</div>
                    <p className="text-sm text-optional dark:luminescence-layer-3">Have transition plan</p>
                  </div>
                </div>
                <p className="text-standard dark:text-gradient-safe font-semibold">
                  The pattern: Pain → Panic switch → Lost momentum → Recovery → Growth
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-12 text-center">
                7 Transition Patterns (Which Stage Are You In?)
              </h2>
              
              <div className="space-y-8">
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="glass-card-light rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
                    <div className={`bg-gradient-to-r ${scenario.gradient} p-6`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="heading-lg text-white mb-2">
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
                        
                        {/* Company Says */}
                        <div className="space-y-6">
                          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                            <h4 className="heading-md text-red-800 dark:text-red-300 mb-2 flex items-center">
                              <span className="mr-2">💬</span>
                              Company Says:
                            </h4>
                            <p className="text-standard dark:text-gradient-safe italic">
                              "{scenario.companySays}"
                            </p>
                          </div>
                          
                          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                            <h4 className="heading-md text-purple-800 dark:text-purple-300 mb-2 flex items-center">
                              <span className="mr-2">💭</span>
                              Company Thinks:
                            </h4>
                            <p className="text-standard dark:text-gradient-safe">
                              {scenario.companyThinks}
                            </p>
                          </div>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-6">
                          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500">
                            <h4 className="heading-md text-orange-800 dark:text-orange-300 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Consideration:
                            </h4>
                            <p className="text-standard dark:text-gradient-safe">
                              {scenario.realConsideration}
                            </p>
                          </div>
                          
                          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 border-l-4 border-pink-500">
                            <h4 className="heading-md text-pink-800 dark:text-pink-300 mb-2 flex items-center">
                              <span className="mr-2">⚖️</span>
                              Evaluation Framework:
                            </h4>
                            <p className="text-standard dark:text-gradient-safe">
                              {scenario.evaluationFramework}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Outcome */}
                      <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                        <h4 className="heading-md text-green-800 dark:text-green-300 mb-2 flex items-center">
                          <span className="mr-2">🎯</span>
                          Transition Strategy:
                        </h4>
                        <p className="text-standard dark:text-gradient-safe font-medium">
                          {scenario.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Transition Timeline */}
            <section className="mb-16">
              <div className="glass-card-light rounded-2xl shadow-xl border border-purple-200/50 dark:border-purple-800/50 p-8">
                <h2 className="heading-xl text-gradient-critical mb-6">
                  Typical Marketing Evolution Timeline
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</div>
                    <div>
                      <strong className="text-gray-900 dark:text-white">$0-500K:</strong>
                      <span className="text-standard dark:text-gradient-safe ml-2">Founder-led marketing or DIY approach</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</div>
                    <div>
                      <strong className="text-gray-900 dark:text-white">$500K-1M:</strong>
                      <span className="text-standard dark:text-gradient-safe ml-2">First agency or consultant engagement</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</div>
                    <div>
                      <strong className="text-gray-900 dark:text-white">$1M-3M:</strong>
                      <span className="text-standard dark:text-gradient-safe ml-2">Fractional CMO for strategic growth</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">4</div>
                    <div>
                      <strong className="text-gray-900 dark:text-white">$3M-5M:</strong>
                      <span className="text-standard dark:text-gradient-safe ml-2">Hybrid: Fractional CMO + internal team</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">5</div>
                    <div>
                      <strong className="text-gray-900 dark:text-white">$5M+:</strong>
                      <span className="text-standard dark:text-gradient-safe ml-2">Full-time CMO with complete team</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16">
              <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/50">
                <h3 className="heading-lg text-gradient-critical mb-4">
                  🚨 Stop Losing Momentum During Transitions
                </h3>
                <p className="text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto">
                  Every month you delay a necessary transition or switch reactively without a plan costs you growth momentum. 
                  Get your free transition roadmap and switch smoothly to the right marketing leadership model.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 focus-visible:from-purple-600 hover:to-pink-700 focus-visible:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free Transition Roadmap
                </button>
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="border-2 border-purple-500 text-purple-600 hover:bg-purple-500 focus-visible:bg-purple-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block">
                  Choose Your Marketing Model
                </a>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                Related Transition Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/cost-roi-analysis`} className="hover:text-purple-600 focus-visible:text-purple-600 transition-colors">
                      Save $200K During Transition →
                    </a>
                  </h3>
                  <p className="text-standard dark:text-gradient-safe">
                    Understanding the true costs and returns of switching marketing approaches. Make data-driven transition decisions.
                  </p>
                </div>
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="hover:text-purple-600 focus-visible:text-purple-600 transition-colors">
                      8 Plateau Patterns Forcing Change →
                    </a>
                  </h3>
                  <p className="text-standard dark:text-gradient-safe">
                    Revenue plateaus often signal the need for marketing leadership transitions. Identify your plateau pattern.
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

export default TransitionStrategies;