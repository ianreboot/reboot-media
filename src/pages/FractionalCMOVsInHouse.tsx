import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const FractionalCMOVsInHouse = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Fractional CMO vs In-House Team: Build vs Buy Marketing | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Fractional CMO vs In-House Team decision guide. 7 scenarios revealing true costs of building internal teams. 2.5x more expensive than expected.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'fractional cmo vs in house team, build vs buy marketing, internal marketing team cost, fractional vs internal marketing');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Build vs Buy" Philosophy',
      companySays: "We should build marketing capability internally",
      companyThinks: "Internal teams are more invested and cheaper long-term",
      realConsideration: "Time to competency vs immediate expertise",
      evaluationFramework: "Learning curve costs vs proven expertise value",
      outcome: "In-house for commodity tasks; Fractional CMO for strategic expertise",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      id: 2,
      title: 'The "Total Cost of Team Building" Reality',
      companySays: "We can hire marketers for less than fractional costs",
      companyThinks: "Salaries are the only cost consideration",
      realConsideration: "Recruitment, training, management, benefits, tools, turnover",
      evaluationFramework: "True fully-loaded cost per productive hour",
      outcome: "In-house teams cost 2.5x base salaries; Fractional CMO often cheaper",
      painLevel: "Very High",
      timeStuck: "10-16 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: 'The "Skill Gaps and Training Time" Challenge',
      companySays: "We'll train our team up",
      companyThinks: "Smart people can learn marketing",
      realConsideration: "Years of experience vs months of training",
      evaluationFramework: "Learning timeline vs business growth timeline",
      outcome: "In-house for execution; Fractional CMO for expertise-dependent results",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 4,
      title: 'The "Management Overhead" Burden',
      companySays: "I want direct control over the marketing team",
      companyThinks: "Managing employees is easier than managing contractors",
      realConsideration: "Performance management vs outcome management",
      evaluationFramework: "Time spent managing vs value delivered",
      outcome: "In-house when you have management bandwidth; Fractional CMO for results focus",
      painLevel: "Medium",
      timeStuck: "6-12 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: 'The "Hiring Risk and Turnover" Reality',
      companySays: "We'll find the right people",
      companyThinks: "Good hiring process reduces risk",
      realConsideration: "Marketing talent shortage and high turnover rates",
      evaluationFramework: "Hiring success rate vs relationship continuity",
      outcome: "In-house for stable, predictable roles; Fractional CMO for specialized expertise",
      painLevel: "Very High",
      timeStuck: "12-20 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 6,
      title: 'The "Knowledge Retention" Concern',
      companySays: "We don't want to lose marketing knowledge when people leave",
      companyThinks: "Internal teams build institutional knowledge",
      realConsideration: "Documentation vs personal knowledge",
      evaluationFramework: "Knowledge systems vs people dependency",
      outcome: "In-house for knowledge building; Fractional CMO for systems and processes",
      painLevel: "Medium",
      timeStuck: "8-12 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 7,
      title: 'The "Flexibility and Scaling" Needs',
      companySays: "What if we need to scale up or down quickly?",
      companyThinks: "Employees give us more control over capacity",
      realConsideration: "Fixed costs vs variable expertise needs",
      evaluationFramework: "Scalability requirements vs cost efficiency",
      outcome: "In-house for predictable workloads; Fractional CMO for variable strategic needs",
      painLevel: "High",
      timeStuck: "6-10 months",
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
        title="Fractional CMO vs In-House Team: Build vs Buy Marketing | Reboot Media"
        description="Fractional CMO vs In-House Team decision guide. 7 scenarios revealing true costs of building internal teams. 2.5x more expensive than expected."
        canonicalUrl={getCanonicalUrl('fractional-cmo-vs-in-house')}
      />

      <div className="fractional-vs-inhouse-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-indigo-900 via-blue-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 text-gradient-safe">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-indigo-400 focus-visible:text-indigo-400 transition-colors">Fractional CMO Guide</a>
                  <span>→</span>
                  <span className="text-indigo-400 font-semibold">vs In-House Team</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                  Build vs Buy Marketing Expertise
                </div>
                <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                  <span className="text-blue-400">Fractional CMO</span> vs
                  <span className="block text-indigo-400 mt-2">In-House Team</span>
                </h1>
                <p className="text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                  Building internal teams is harder and more expensive than most realize. The hidden truth: 
                  <span className="text-indigo-400 font-semibold"> Teams cost 2.5x base salaries and take years to reach expertise.</span>
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 focus-visible:from-indigo-600 hover:to-blue-700 focus-visible:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Calculate Your True Team Cost
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
              <div className="glass-card-light rounded-2xl shadow-xl border border-indigo-200/50 dark:border-indigo-800/50 p-8">
                <h2 className="heading-xl text-gradient-critical mb-6">
                  Why Building Internal Teams Costs More Than You Think
                </h2>
                <p className="text-lg text-standard dark:text-gradient-safe mb-6 leading-relaxed">
                  The "build vs buy" decision for marketing expertise is often made with incomplete math. Companies calculate salaries 
                  but miss recruitment costs, training time, management overhead, turnover risk, and the 18-month learning curve.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">2.5x</div>
                    <p className="text-sm text-optional dark:luminescence-layer-3">True cost multiplier</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">43%</div>
                    <p className="text-sm text-optional dark:luminescence-layer-3">Marketing turnover rate</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">18mo</div>
                    <p className="text-sm text-optional dark:luminescence-layer-3">To reach competency</p>
                  </div>
                </div>
                <p className="text-standard dark:text-gradient-safe font-semibold">
                  The pattern: Underestimate costs → Hire junior → Struggle with results → Start over
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-12 text-center">
                7 Build vs Buy Scenarios (Which is Yours?)
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
                          <div className="flex gap-4 text-sm text-indigo-100">
                            <span>Pain Level: {scenario.painLevel}</span>
                            <span>Typical Time Stuck: {scenario.timeStuck}</span>
                          </div>
                        </div>
                        <div className="glass-panel rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
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
                          
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border-l-4 border-indigo-500">
                            <h4 className="heading-md text-indigo-800 dark:text-indigo-300 mb-2 flex items-center">
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
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                            <h4 className="heading-md text-yellow-800 dark:text-yellow-300 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Consideration:
                            </h4>
                            <p className="text-standard dark:text-gradient-safe">
                              {scenario.realConsideration}
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                            <h4 className="heading-md text-blue-800 dark:text-blue-300 mb-2 flex items-center">
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
                          Recommended Outcome:
                        </h4>
                        <p className="text-black-standard dark:text-gradient-safe font-medium">
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
              <div className="text-center bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-indigo-200/50 dark:border-indigo-800/50">
                <h3 className="heading-lg text-gradient-critical mb-4">
                  🚨 Stop Underestimating Team Building Costs
                </h3>
                <p className="text-lg text-black-standard dark:text-gradient-safe mb-6 max-w-3xl mx-auto">
                  Every month you delay expertise while building internal teams costs you opportunities and revenue. 
                  Get your free team cost analysis and discover the true investment required for marketing competency.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 focus-visible:from-indigo-600 hover:to-blue-700 focus-visible:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free Team Cost Analysis
                </button>
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/cost-roi-analysis`} className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-500 focus-visible:bg-indigo-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block">
                  Calculate Your 2.5x Hidden Costs
                </a>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                Related Decision Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/transition-strategies`} className="hover:text-indigo-600 focus-visible:text-indigo-600 transition-colors">
                      Recover From 43% Turnover Disaster →
                    </a>
                  </h3>
                  <p className="text-standard dark:text-gradient-safe">
                    Internal marketing not working? Learn how to transition from failed in-house teams to fractional CMO success.
                  </p>
                </div>
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/team-growth-bottlenecks`} className="hover:text-indigo-600 focus-visible:text-indigo-600 transition-colors">
                      Fix 18-Month Competency Gap →
                    </a>
                  </h3>
                  <p className="text-standard dark:text-gradient-safe">
                    When building teams becomes the bottleneck to growth. Break through with the right expertise model.
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

export default FractionalCMOVsInHouse;