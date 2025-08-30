import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const FractionalCMOVsConsultant = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Fractional CMO vs Consultant: Results vs Recommendations | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Fractional CMO vs Consultant comparison. 7 scenarios revealing who owns results vs who gives advice. Implementation accountability matters.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'fractional cmo vs consultant, marketing consultant vs fractional cmo, strategic consultant vs cmo, marketing consultant comparison');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Strategic Advice vs Implementation" Gap',
      companySays: "We need strategic guidance",
      companyThinks: "Consultants are strategy experts",
      realConsideration: "Who implements the recommendations?",
      evaluationFramework: "Advice quality vs execution accountability",
      outcome: "Consultant for frameworks; Fractional CMO for strategy + execution",
      painLevel: "Very High",
      timeStuck: "12-18 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 2,
      title: 'The "Project vs Ongoing Relationship" Structure',
      companySays: "We need a marketing strategy",
      companyThinks: "This is a one-time project",
      realConsideration: "Strategy evolution vs static plans",
      evaluationFramework: "Point-in-time analysis vs continuous optimization",
      outcome: "Consultant for audits; Fractional CMO for dynamic growth",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      title: 'The "Internal Team Development" Priority',
      companySays: "We want our team to learn",
      companyThinks: "Consultants will train our people",
      realConsideration: "Knowledge transfer vs proprietary methodologies",
      evaluationFramework: "Teaching vs doing approaches",
      outcome: "Consultant for workshops; Fractional CMO for hands-on mentoring",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 4,
      title: 'The "Accountability for Results" Question',
      companySays: "Who's responsible if this doesn't work?",
      companyThinks: "Consultants deliver best practices",
      realConsideration: "Recommendations vs performance ownership",
      evaluationFramework: "Input accountability vs outcome responsibility",
      outcome: "Consultant for analysis; Fractional CMO for growth targets",
      painLevel: "Very High",
      timeStuck: "10-16 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 5,
      title: 'The "Industry-Specific Expertise" Need',
      companySays: "We need someone who knows our industry",
      companyThinks: "Consultant specialization beats general marketing",
      realConsideration: "Industry knowledge vs marketing psychology mastery",
      evaluationFramework: "Sector tactics vs universal principles",
      outcome: "Consultant for industry insights; Fractional CMO for psychology application",
      painLevel: "Medium",
      timeStuck: "8-12 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      title: 'The "Cost Structure and ROI" Analysis',
      companySays: "Consulting projects have clear scope",
      companyThinks: "Fixed price is better than ongoing cost",
      realConsideration: "Upfront cost vs ongoing value creation",
      evaluationFramework: "Project ROI vs relationship value",
      outcome: "Consultant for diagnostics; Fractional CMO for growth engine building",
      painLevel: "High",
      timeStuck: "6-12 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 7,
      title: 'The "Speed of Insight vs Depth of Change" Trade-off',
      companySays: "We need answers quickly",
      companyThinks: "Consultants can assess faster with fresh eyes",
      realConsideration: "Quick insights vs sustainable transformation",
      evaluationFramework: "Analysis speed vs change implementation",
      outcome: "Consultant for rapid assessment; Fractional CMO for transformation leadership",
      painLevel: "Medium",
      timeStuck: "4-8 months",
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
        title="Fractional CMO vs Consultant: Results vs Recommendations | Reboot Media"
        description="Fractional CMO vs Consultant comparison. 7 scenarios revealing who owns results vs who gives advice. Implementation accountability matters."
        canonicalUrl={getCanonicalUrl('fractional-cmo-vs-consultant')}
      />

      <div className="fractional-vs-consultant-page min-h-screen relative overflow-hidden">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-purple-900 via-blue-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 text-gradient-safe">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-purple-400 focus-visible:text-purple-400 transition-colors">Fractional CMO Guide</a>
                  <span>→</span>
                  <span className="text-purple-400 font-semibold">vs Consultant</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                  Implementation Ownership vs Advice
                </div>
                <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                  <span className="text-blue-400">Fractional CMO</span> vs
                  <span className="block text-purple-400 mt-2">Consultant</span>
                </h1>
                <p className="text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                  Consultants give great advice, but who implements? The real difference: 
                  <span className="text-purple-400 font-semibold"> Fractional CMOs own results, not just recommendations.</span>
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 focus-visible:from-purple-600 hover:to-blue-700 focus-visible:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Discover Your Best Approach
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
              <div className="glass-card-light rounded-2xl shadow-xl border border-purple-200/50 p-8">
                <h2 className="heading-xl text-gradient-critical mb-6">
                  Why Great Recommendations Don't Equal Great Results
                </h2>
                <p className="text-lg text-standard mb-6 leading-relaxed">
                  The gap between strategy and execution is where most companies fail. Consultants deliver brilliant 100-page strategies 
                  that sit on shelves. Fractional CMOs roll up their sleeves and make things happen.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">87%</div>
                    <p className="text-sm text-optional">Strategies never fully implemented</p>
                  </div>
                  <div className="text-center p-4 glass-card-blue rounded-lg">
                    <div className="text-2xl font-bold text-blue-accessible mb-1">$75K</div>
                    <p className="text-sm text-optional">Average consulting project cost</p>
                  </div>
                  <div className="text-center p-4 glass-card-green rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">14%</div>
                    <p className="text-sm text-optional">Achieve promised ROI</p>
                  </div>
                </div>
                <p className="text-standard font-semibold">
                  The pattern: Great strategy → Poor implementation → Blame execution → Hire another consultant
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-12 text-center">
                7 Consultant vs Fractional CMO Scenarios (Which is Yours?)
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
                          <div className="flex gap-4 text-sm text-purple-100">
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
                          
                          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                            <h4 className="heading-md text-purple-800 mb-2 flex items-center">
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
                          <div className="glass-card-orange rounded-lg p-4 border-l-4 border-orange-500">
                            <h4 className="heading-md text-orange-800 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Consideration:
                            </h4>
                            <p className="text-standard">
                              {scenario.realConsideration}
                            </p>
                          </div>
                          
                          <div className="glass-card-blue rounded-lg p-4 border-l-4 border-blue-500">
                            <h4 className="heading-md text-blue-800 mb-2 flex items-center">
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
                      <div className="mt-6 glass-card-green rounded-lg p-4 border border-green-200">
                        <h4 className="heading-md text-green-800 mb-2 flex items-center">
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
              <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200/50">
                <h3 className="heading-lg text-gradient-critical mb-4">
                  🚨 Stop Paying for Advice Without Accountability
                </h3>
                <p className="text-lg text-black-standard mb-6 max-w-3xl mx-auto">
                  Every month you implement consultant recommendations without support, you're wasting strategy investments. 
                  Get your free implementation assessment and discover whether you need advice or results ownership.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 focus-visible:from-purple-600 hover:to-blue-700 focus-visible:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free Implementation Assessment
                </button>
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="border-2 border-purple-500 text-purple-600 hover:bg-purple-500 focus-visible:bg-purple-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block">
                  Compare vs Agency & In-House
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
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/transition-strategies`} className="hover:text-purple-600 focus-visible:text-purple-600 transition-colors">
                      Stop Wasting $75K on Unimplemented Strategy →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Have great strategy but can't execute? Learn how to transition from consultant advice to fractional CMO implementation.
                  </p>
                </div>
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="hover:text-purple-600 focus-visible:text-purple-600 transition-colors">
                      Psychology That Beats Industry Tactics →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Consultants give industry tactics. Fractional CMOs apply universal psychology. Learn the principles that drive results.
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

export default FractionalCMOVsConsultant;