import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const FractionalCMOVsAgency = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Fractional CMO vs Marketing Agency: Strategy vs Execution | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Fractional CMO vs Agency decision guide. 7 decision scenarios showing when to choose strategic leadership vs execution power for growth companies.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'fractional cmo vs marketing agency, fractional cmo vs agency, marketing agency vs fractional cmo, marketing strategy vs execution');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "We Need Execution Help" Trap',
      companySays: "We have a strategy, we just need someone to execute",
      companyThinks: "Agencies are cheaper for execution",
      realConsideration: "Who's accountable when strategy fails?",
      evaluationFramework: "Strategy-execution integration matters more than cost",
      outcome: "Fractional CMO when strategy needs refinement; Agency when strategy is proven",
      painLevel: "High",
      timeStuck: "6-12 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: 'The "Scale and Bandwidth" Decision',
      companySays: "We need a full team working on this",
      companyThinks: "Agencies give you more hands on deck",
      realConsideration: "Quality vs quantity of effort",
      evaluationFramework: "Is this a capacity or capability problem?",
      outcome: "Agency for proven campaigns; Fractional CMO for strategic development",
      painLevel: "Medium",
      timeStuck: "4-8 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      title: 'The "Knowledge Transfer" Gap',
      companySays: "We want to build internal capability",
      companyThinks: "Agencies won't teach us their secrets",
      realConsideration: "Are you learning or just paying?",
      evaluationFramework: "Long-term capability building vs short-term results",
      outcome: "Fractional CMO teaches team; Agency keeps knowledge proprietary",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 4,
      title: 'The "Industry Experience" Premium',
      companySays: "They don't understand our industry",
      companyThinks: "We need agency specialists in our vertical",
      realConsideration: "Industry knowledge vs marketing psychology principles",
      evaluationFramework: "Universal psychology > industry-specific tactics",
      outcome: "Fractional CMO for psychology expertise; Agency for industry-specific execution",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      title: 'The "Accountability and Results" Question',
      companySays: "Who's responsible if this doesn't work?",
      companyThinks: "Agencies have more to lose with multiple clients",
      realConsideration: "Skin-in-the-game vs diversified risk",
      evaluationFramework: "Dedicated focus vs risk distribution",
      outcome: "Fractional CMO owns outcomes; Agency manages expectations",
      painLevel: "Very High",
      timeStuck: "10-16 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 6,
      title: 'The "Total Cost of Ownership" Reality',
      companySays: "Fractional CMO costs more per hour",
      companyThinks: "Agency retainer is cheaper overall",
      realConsideration: "Hidden costs, setup time, and relationship management",
      evaluationFramework: "True ROI calculation including opportunity costs",
      outcome: "Fractional CMO higher hourly, lower total cost; Agency lower hourly, higher management overhead",
      painLevel: "Medium",
      timeStuck: "4-8 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 7,
      title: 'The "Speed to Results" Pressure',
      companySays: "We need results in 90 days",
      companyThinks: "Agencies have established processes for quick wins",
      realConsideration: "Quick wins vs sustainable growth",
      evaluationFramework: "Short-term tactics vs long-term system building",
      outcome: "Agency for campaign sprints; Fractional CMO for growth architecture",
      painLevel: "High",
      timeStuck: "6-12 months",
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
        title="Fractional CMO vs Marketing Agency: Strategy vs Execution | Reboot Media"
        description="Fractional CMO vs Agency decision guide. 7 decision scenarios showing when to choose strategic leadership vs execution power for growth companies."
        canonicalUrl={getCanonicalUrl('fractional-cmo-vs-agency')}
      />

      <div className="fractional-vs-agency-page min-h-screen relative overflow-hidden">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-blue-900 via-orange-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 text-gradient-safe">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-blue-400 focus-visible:text-blue-400 transition-colors">Fractional CMO Guide</a>
                  <span>→</span>
                  <span className="text-blue-400 font-semibold">vs Marketing Agency</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 glass-card-blue0 rounded-full animate-pulse"></span>
                  Strategy Leadership vs Execution Power
                </div>
                <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                  <span className="text-blue-400">Fractional CMO</span>
                  <span className="block text-white mt-2">vs Marketing Agency</span>
                </h1>
                <p className="text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                  Most companies think "we need execution help" when they really need strategy refinement. The problem isn't your tactics—it's that 
                  <span className="text-blue-400 font-semibold"> who's accountable when strategy fails?</span>
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-orange-600 hover:from-blue-600 focus-visible:from-blue-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Get Your Decision Analysis
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
              <div className="glass-card-light rounded-2xl shadow-xl border border-blue-200/50 p-8">
                <h2 className="heading-xl text-gradient-critical mb-6">
                  Why Strategy vs Execution Is the Wrong Question
                </h2>
                <p className="text-lg text-standard mb-6 leading-relaxed">
                  Most companies frame this as strategy OR execution, when the real question is: who owns the results when tactics fail? 
                  Agencies execute your ideas; Fractional CMOs take responsibility for outcomes.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 glass-card-blue rounded-lg">
                    <div className="text-2xl font-bold text-blue-accessible mb-1">84%</div>
                    <p className="text-sm text-optional">Blame execution, not strategy</p>
                  </div>
                  <div className="text-center p-4 glass-card-orange rounded-lg">
                    <div className="text-2xl font-bold text-orange-accessible mb-1">67%</div>
                    <p className="text-sm text-optional">Switch within 18 months</p>
                  </div>
                  <div className="text-center p-4 glass-card-green rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">23%</div>
                    <p className="text-sm text-optional">Consider strategy first</p>
                  </div>
                </div>
                <p className="text-standard font-semibold">
                  The pattern: Tactics fail → Blame execution → Switch → Same results
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-12 text-center">
                7 Decision Scenarios (Which is Yours?)
              </h2>
              
              <div className="space-y-8">
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="glass-card-light rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className={`bg-gradient-to-r ${scenario.gradient} p-6`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="heading-lg text-white mb-2">
                            {scenario.title}
                          </h3>
                          <div className="flex gap-4 text-sm text-blue-100">
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
                          <div className="glass-card-light rounded-lg p-4 border-l-4 border-red-500">
                            <h4 className="heading-md text-red-800 mb-2 flex items-center">
                              <span className="mr-2">💬</span>
                              Company Says:
                            </h4>
                            <p className="text-standard italic">
                              "{scenario.companySays}"
                            </p>
                          </div>
                          
                          <div className="glass-card-orange rounded-lg p-4 border-l-4 border-orange-500">
                            <h4 className="heading-md text-orange-800 mb-2 flex items-center">
                              <span className="mr-2">💭</span>
                              Company Thinks:
                            </h4>
                            <p className="text-standard">
                              {scenario.companyThinks}
                            </p>
                          </div>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-6">
                          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                            <h4 className="heading-md text-yellow-800 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Consideration:
                            </h4>
                            <p className="text-standard">
                              {scenario.realConsideration}
                            </p>
                          </div>
                          
                          <div className="glass-card-green rounded-lg p-4 border-l-4 border-green-500">
                            <h4 className="heading-md text-green-800 mb-2 flex items-center">
                              <span className="mr-2">⚖️</span>
                              Evaluation Framework:
                            </h4>
                            <p className="text-standard">
                              {scenario.evaluationFramework}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Outcome */}
                      <div className="mt-6 glass-card-blue rounded-lg p-4 border border-blue-200">
                        <h4 className="heading-md text-blue-800 mb-2 flex items-center">
                          <span className="mr-2">🎯</span>
                          Recommended Outcome:
                        </h4>
                        <p className="text-black-standard font-medium">
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
              <div className="text-center bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 border border-blue-200/50">
                <h3 className="heading-lg text-gradient-critical mb-4">
                  🚨 Stop Executing the Wrong Strategy
                </h3>
                <p className="text-lg text-black-standard mb-6 max-w-3xl mx-auto">
                  Every month you execute without strategic accountability, you're burning budget and missing opportunities. 
                  Get your free strategy vs execution analysis and discover which approach builds the growth engine your company needs.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-orange-600 hover:from-blue-600 focus-visible:from-blue-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free Strategy Analysis
                </button>
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="border-2 border-blue-500 text-blue-accessible hover:glass-card-blue0 focus-visible:glass-card-blue0 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block">
                  Compare vs Full-Time & Consultant
                </a>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                Related Decision Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/cost-roi-analysis`} className="hover:text-blue-accessible focus-visible:text-blue-accessible transition-colors">
                      Why Agencies Cost More Than Expected →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Hidden costs of agency relationships vs fractional CMO engagements. See the real numbers behind the hourly rate illusion.
                  </p>
                </div>
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/customer-acquisition-stall`} className="hover:text-blue-accessible focus-visible:text-blue-accessible transition-colors">
                      Fix Your $8K CAC Problem →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Agency vs fractional decisions often follow CAC inflation. Discover psychology-driven acquisition that sidesteps tactical wars.
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

export default FractionalCMOVsAgency;