import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const FractionalCMOVsFullTime = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Fractional vs Full-Time CMO: Cost Efficiency vs Status | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Fractional vs Full-Time CMO decision guide. 7 scenarios revealing when ego drives decisions vs business logic. Real cost and capability analysis.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'fractional cmo vs full time cmo, part time cmo vs full time, fractional executive vs full time, cmo cost comparison');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "We\'re Big Enough Now" Status Symbol',
      companySays: "We should have a full-time CMO",
      companyThinks: "Full-time means we've made it",
      realConsideration: "Can we give them $150K+ worth of meaningful work?",
      evaluationFramework: "Workload analysis vs ego/status needs",
      outcome: "Fractional CMO until $4M+ revenue; Full-time after proven growth",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 2,
      title: 'The "Cultural Fit and Loyalty" Concern',
      companySays: "Fractional people aren't really committed",
      companyThinks: "Full-time means more dedication",
      realConsideration: "Results-driven vs time-based commitment",
      evaluationFramework: "Outcome alignment vs physical presence",
      outcome: "Fractional CMO for expertise focus; Full-time for cultural integration",
      painLevel: "Medium",
      timeStuck: "8-12 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      title: 'The "Specialized vs Generalized Needs" Assessment',
      companySays: "We need someone who knows everything about marketing",
      companyThinks: "Full-time CMO covers all bases",
      realConsideration: "Breadth vs depth of expertise at current stage",
      evaluationFramework: "Stage-specific needs vs comprehensive coverage",
      outcome: "Fractional CMO for specialized growth challenges; Full-time for comprehensive management",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: 'The "Management Bandwidth" Reality',
      companySays: "I don't have time to manage another contractor",
      companyThinks: "Full-time employees manage themselves",
      realConsideration: "Direction clarity vs management overhead",
      evaluationFramework: "Systems thinking vs people management complexity",
      outcome: "Fractional CMO with clear deliverables; Full-time when you need management layer",
      painLevel: "High",
      timeStuck: "10-14 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: 'The "Ramp-Up Time" Calculations',
      companySays: "Full-time will understand our business better",
      companyThinks: "More hours = deeper understanding",
      realConsideration: "Learning curve vs immediate expertise application",
      evaluationFramework: "Time to competency vs time to value",
      outcome: "Fractional CMO for faster results; Full-time for long-term development",
      painLevel: "Very High",
      timeStuck: "12-16 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 6,
      title: 'The "Total Compensation Reality" Shock',
      companySays: "Full-time will cost less in the long run",
      companyThinks: "Fractional hourly rates look expensive",
      realConsideration: "Salary + benefits + equity + management time",
      evaluationFramework: "True fully-loaded cost analysis",
      outcome: "Fractional CMO cheaper until $200K+ marketing budgets",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 7,
      title: 'The "Flexibility and Scaling" Needs',
      companySays: "What if our needs change?",
      companyThinks: "Full-time gives us more control",
      realConsideration: "Adaptability vs commitment constraints",
      evaluationFramework: "Future uncertainty vs fixed obligations",
      outcome: "Fractional CMO for variable needs; Full-time for predictable scale",
      painLevel: "Medium",
      timeStuck: "6-12 months",
      gradient: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Fractional vs Full-Time CMO: Cost Efficiency vs Status | Reboot Media"
        description="Fractional vs Full-Time CMO decision guide. 7 scenarios revealing when ego drives decisions vs business logic. Real cost and capability analysis."
        canonicalUrl={getCanonicalUrl('fractional-cmo-vs-full-time')}
      />

      <div className="fractional-vs-fulltime-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-blue-900 via-green-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 text-gray-300">
                  <Link to="/fractional-cmo-guide" className="hover:text-blue-400 transition-colors" onClick={() => window.scrollTo(0, 0)}>Fractional CMO Guide</Link>
                  <span>→</span>
                  <span className="text-green-400 font-semibold">vs Full-Time CMO</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Cost Efficiency vs Status Symbolism
                </div>
                <h1 className="heading-hero text-critical dark:text-white mb-6 leading-tight">
                  <span className="text-blue-400">Fractional</span> vs
                  <span className="block text-green-400 mt-2">Full-Time CMO</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  "We're big enough for a full-time CMO" is often ego talking, not business logic. The real question: 
                  <span className="text-green-400 font-semibold"> Can you give them $200K worth of meaningful work?</span>
                </p>
                <button 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Calculate Your True CMO Needs
                </button>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <main className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
            
            {/* Introduction */}
            <section className="mb-16">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-green-200/50 dark:border-green-800/50 p-8">
                <h2 className="heading-xl text-critical dark:text-white mb-6">
                  Why Status Decisions Cost You $200K+ Per Year
                </h2>
                <p className="text-lg text-standard dark:text-gray-300 mb-6 leading-relaxed">
                  The decision between fractional and full-time CMO is often driven by status and perception rather than workload analysis. 
                  Companies hire full-time for the title, then wonder why they're paying executive salaries for director-level work.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">71%</div>
                    <p className="text-sm text-optional dark:text-gray-400">Hire for status, not workload</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">$250K+</div>
                    <p className="text-sm text-optional dark:text-gray-400">True full-time cost</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">40%</div>
                    <p className="text-sm text-optional dark:text-gray-400">Underutilized capacity</p>
                  </div>
                </div>
                <p className="text-standard dark:text-gray-300 font-semibold">
                  The pattern: Status decision → Overpay for role → Underutilization → Turnover
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-critical dark:text-white mb-12 text-center">
                7 Full-Time vs Fractional Decisions (Which is Yours?)
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
                          <div className="flex gap-4 text-sm text-green-100">
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
                            <p className="text-standard dark:text-gray-300 italic">
                              "{scenario.companySays}"
                            </p>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                            <h4 className="heading-md text-green-800 dark:text-green-300 mb-2 flex items-center">
                              <span className="mr-2">💭</span>
                              Company Thinks:
                            </h4>
                            <p className="text-standard dark:text-gray-300">
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
                            <p className="text-standard dark:text-gray-300">
                              {scenario.realConsideration}
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                            <h4 className="heading-md text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                              <span className="mr-2">⚖️</span>
                              Evaluation Framework:
                            </h4>
                            <p className="text-standard dark:text-gray-300">
                              {scenario.evaluationFramework}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Outcome */}
                      <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                        <h4 className="heading-md text-purple-800 dark:text-purple-300 mb-2 flex items-center">
                          <span className="mr-2">🎯</span>
                          Recommended Outcome:
                        </h4>
                        <p className="text-standard dark:text-gray-300 font-medium">
                          {scenario.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16">
              <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8 border border-green-200/50 dark:border-green-800/50">
                <h3 className="heading-lg text-critical dark:text-white mb-4">
                  🚨 Stop Overpaying for Underutilized Talent
                </h3>
                <p className="text-lg text-standard dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                  Every month you pay for full-time when you need fractional, you're burning $10K+ on underutilized capacity. 
                  Get your free workload analysis and discover if you have $200K worth of strategic work.
                </p>
                <button 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mr-4"
                >
                  Get Free Workload Analysis
                </button>
                <Link to="/fractional-cmo-guide/cost-roi-analysis" className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block" onClick={() => window.scrollTo(0, 0)}>
                  See Why Full-Time Costs $436K/Year
                </Link>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-critical dark:text-white mb-8 text-center">
                Related Decision Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-critical dark:text-white mb-3">
                    <Link to="/fractional-cmo-guide/transition-strategies" className="hover:text-green-600 transition-colors" onClick={() => window.scrollTo(0, 0)}>
                      When $200K CMO Actually Makes Sense →
                    </Link>
                  </h3>
                  <p className="text-standard dark:text-gray-300">
                    When and how to transition from fractional to full-time CMO. Growth triggers and transition strategies that work.
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-critical dark:text-white mb-3">
                    <Link to="/growth-plateau-solutions/revenue-ceiling-breakthrough" className="hover:text-green-600 transition-colors" onClick={() => window.scrollTo(0, 0)}>
                      Break Your $1M Revenue Ceiling →
                    </Link>
                  </h3>
                  <p className="text-standard dark:text-gray-300">
                    The fractional vs full-time decision often happens at revenue plateaus. Break through with the right leadership model.
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

export default FractionalCMOVsFullTime;