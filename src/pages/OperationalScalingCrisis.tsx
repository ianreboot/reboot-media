import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const OperationalScalingCrisis = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Growth Breaking Everything? Operational Scaling Crisis Solutions | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Growth feels like everything\'s breaking? 7 operational scaling crisis patterns where manual processes that worked at $500K fail at $2M+.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'operational scaling problems, business operations breaking, scaling crisis, manual processes failing, operational bottlenecks');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Hero Dependency" Crisis',
      customerSays: "Everything has to go through me or Sarah",
      customerThinks: "We need to hire more people who can handle complex decisions",
      realProblem: "No documented processes - institutional knowledge trapped in key people's heads",
      solution: "Document processes and decision frameworks, not just outcomes",
      whyItWorks: "Systems > heroes for sustainable scaling - replicates thinking patterns",
      painLevel: "Very High",
      timeStuck: "12-18 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 2,
      title: 'The "Quality Erosion" Crisis',
      customerSays: "Our quality isn't what it used to be",
      customerThinks: "Growth is forcing us to compromise on standards",
      realProblem: "Manual QC processes don't scale with volume increases",
      solution: "Automate quality checkpoints, standardize delivery workflows",
      whyItWorks: "Consistent systems maintain consistent quality at any scale",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      title: 'The "Customer Experience Decay" Crisis',
      customerSays: "Customers complain we're not responsive anymore",
      customerThinks: "We need more customer service people",
      realProblem: "Same service model for 10 customers applied to 100 customers",
      solution: "Tiered service levels, self-service options, automation for routine tasks",
      whyItWorks: "Right service level for right customer segment preserves experience",
      painLevel: "High",
      timeStuck: "6-12 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: 'The "Manual Process Breakdown" Crisis',
      customerSays: "We're drowning in manual work",
      customerThinks: "We need better project management or more organized people",
      realProblem: "Startup tools (spreadsheets, email) used for scale-up operations",
      solution: "Purpose-built systems for current scale, not future dreams",
      whyItWorks: "Right tool for right stage - efficiency follows appropriate systems",
      painLevel: "Very High",
      timeStuck: "10-16 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 5,
      title: 'The "Communication Chaos" Crisis',
      customerSays: "The right hand doesn't know what the left is doing",
      customerThinks: "People aren't communicating well enough",
      realProblem: "Informal communication worked at 5 people, fails at 50 people",
      solution: "Structured communication rhythms, regular updates, shared dashboards",
      whyItWorks: "Information flow enables operational flow at scale",
      painLevel: "Medium",
      timeStuck: "8-12 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      title: 'The "Capacity Crunch" Crisis',
      customerSays: "We're turning away business because we can't handle more",
      customerThinks: "We need to hire more people fast",
      realProblem: "Linear thinking about capacity vs exponential demand growth",
      solution: "Modular capacity planning, outsource non-core functions",
      whyItWorks: "Flexibility > fixed capacity during rapid growth phases",
      painLevel: "High",
      timeStuck: "6-10 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 7,
      title: 'The "Integration Nightmare" Crisis',
      customerSays: "We have data everywhere but insights nowhere",
      customerThinks: "We need better reporting or analytics tools",
      realProblem: "Piecemeal tool adoption without integration planning",
      solution: "API-first tool selection, data centralization, unified dashboards",
      whyItWorks: "Connected systems enable data-driven decisions at scale",
      painLevel: "High",
      timeStuck: "12-18 months",
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
        title="Growth Breaking Everything? Operational Scaling Crisis Solutions | Reboot Media"
        description="Growth feels like everything's breaking? 7 operational scaling crisis patterns where manual processes that worked at $500K fail at $2M+."
        canonicalUrl={getCanonicalUrl('operational-scaling-crisis')}
      />

      <div className="operational-scaling-page min-h-screen relative overflow-hidden">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-green-900 via-green-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Growth Breaking Everything
                </div>
                <h1 className="heading-hero text-gradient-critical text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  <span className="text-green-400">Operational Scaling</span>
                  <span className="block text-white mt-2">Crisis Solutions</span>
                </h1>
                <p className="text-white text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                  Growth feels like everything's breaking? The problem isn't your team or timing—it's that 
                  <span className="text-green-400 font-semibold"> manual processes that worked at $500K</span> fail spectacularly at $2M+ without systems.
                </p>
                <div className="flex justify-center">
                  <button aria-label="Opens contact form for free marketing analysis" 
                    onClick={() => setShowDropdownForm(true)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                  >
                    Break Through Your Plateau
                  </button>
                </div>
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
              <div className="glass-card-light rounded-2xl shadow-xl border border-green-200/50 p-8">
                <h2 className="heading-xl text-gradient-critical text-2xl font-bold text-white mb-6 text-center">
                  Why Growth Breaks Operations (And How to Fix It)
                </h2>
                <p className="text-white/90 text-lg text-standard mb-6 leading-relaxed text-center">
                  Operational scaling crises aren't random—they follow predictable patterns. What works at $500K breaks at $2M+ 
                  because manual processes hit exponential complexity while systems thinking provides linear solutions.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 glass-card-medium rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">84%</div>
                    <p className="text-sm text-white/80">Experience scaling crisis</p>
                  </div>
                  <div className="text-center p-4 glass-card-medium rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">267%</div>
                    <p className="text-sm text-white/80">Complexity increase</p>
                  </div>
                  <div className="text-center p-4 glass-card-medium rounded-lg">
                    <div className="text-2xl font-bold text-blue-accessible mb-1">16%</div>
                    <p className="text-sm text-white/80">Solve with systems first</p>
                  </div>
                </div>
                <div className="glass-card-medium rounded-lg p-4 text-center">
                  <p className="text-white font-semibold">
                    The pattern: Manual processes → Exponential complexity → Systems breakdown
                  </p>
                </div>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                <span className="block">7 Operational Crisis Patterns</span>
                <span className="block">(Which is Yours?)</span>
              </h2>
              
              <div className="space-y-8">
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="glass-card-light rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className={`bg-gradient-to-r ${scenario.gradient} p-6`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="heading-lg text-white text-2xl font-bold text-white mb-2">
                            {scenario.title}
                          </h3>
                          <div className="flex gap-4 text-sm text-green-100">
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
                        
                        {/* Customer Says */}
                        <div className="space-y-6">
                          <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                            <h4 className="heading-md text-red-800 font-bold text-red-800 mb-2 flex items-center">
                              <span className="mr-2">💬</span>
                              Customer Says:
                            </h4>
                            <p className="text-standard italic">
                              "{scenario.customerSays}"
                            </p>
                          </div>
                          
                          <div className="glass-card-light rounded-lg p-4 border-l-4 border-green-500">
                            <h4 className="heading-md text-green-800 font-bold text-green-800 mb-2 flex items-center">
                              <span className="mr-2">💭</span>
                              Customer Thinks:
                            </h4>
                            <p className="text-standard">
                              {scenario.customerThinks}
                            </p>
                          </div>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-6">
                          <div className="glass-card-orange rounded-lg p-4 border-l-4 border-orange-500">
                            <h4 className="heading-md text-orange-800 font-bold text-orange-800 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Problem:
                            </h4>
                            <p className="text-standard">
                              {scenario.realProblem}
                            </p>
                          </div>
                          
                          <div className="glass-card-solid rounded-lg p-4 border-l-4 border-green-500">
                            <h4 className="heading-md text-green-800 font-bold text-green-800 mb-2 flex items-center">
                              <span className="mr-2">✅</span>
                              Solution:
                            </h4>
                            <p className="text-gray-900">
                              {scenario.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Why It Works */}
                      <div className="mt-6 glass-card-solid rounded-lg p-4 border border-blue-200">
                        <h4 className="heading-md text-purple-800 font-bold text-purple-800 mb-2 flex items-center">
                          <span className="mr-2">🧠</span>
                          Why This Works:
                        </h4>
                        <p className="text-gray-900 font-medium">
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
              <div className="text-center glass-card-solid rounded-2xl p-8 border border-green-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🚨 Stop Letting Growth Break Your Operations
                </h3>
                <p className="text-gray-900 text-lg text-black-standard mb-6 max-w-3xl mx-auto">
                  Every month you operate with manual processes designed for smaller scale, operational inefficiencies compound exponentially. 
                  Get your free scaling analysis and discover which crisis patterns are limiting your growth capacity.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 focus-visible:from-green-600 hover:to-green-700 focus-visible:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free Scaling Crisis Analysis
                </button>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} 
                  className="border-2 border-green-500 text-green-600 hover:bg-green-500 focus-visible:bg-green-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block"
                >
                  See All Plateau Types
                </a>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl font-bold text-white mb-8 text-center">
                Related Growth Plateau Solutions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gray-900 text-xl font-bold text-gray-900 mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/team-growth-bottlenecks`} className="hover:text-green-600 focus-visible:text-green-600 transition-colors">
                      Team Growth Bottlenecks →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Can't hire fast enough or new people aren't working out? The founder bottleneck kills scaling when everything goes through you.
                  </p>
                </div>
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gray-900 text-xl font-bold text-gray-900 mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-green-600 focus-visible:text-green-600 transition-colors">
                      Need Strategic Marketing Leadership? →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Systems thinking requires strategic leadership. Discover if fractional CMO services can accelerate your scaling solutions.
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

export default OperationalScalingCrisis;