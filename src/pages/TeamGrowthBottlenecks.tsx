import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const TeamGrowthBottlenecks = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Can't Hire Fast Enough? Team Growth Bottleneck Solutions | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Can\'t hire fast enough or new people aren\'t working out? 7 team growth bottleneck patterns where founder dependency kills scaling.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'team growth bottlenecks, hiring problems scaling, founder bottleneck, culture dilution fears, team scaling issues');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Founder Bottleneck" Crisis',
      customerSays: "I'm still involved in every decision",
      customerThinks: "I need to find people who think like me",
      realProblem: "Can't delegate because no one understands decision frameworks, just outcomes",
      solution: "Document decision frameworks and thinking patterns, not just final decisions",
      whyItWorks: "Replicates thinking patterns so others can make founder-quality decisions",
      painLevel: "Very High",
      timeStuck: "12-24 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: 'The "Cultural Dilution" Fear',
      customerSays: "New people just don't get our culture",
      customerThinks: "Hiring too fast is destroying what makes us special",
      realProblem: "Culture was never explicitly defined, just assumed and absorbed",
      solution: "Document culture explicitly, hire for cultural adds not just fits",
      whyItWorks: "Intentional culture evolution vs accidental drift preserves core values",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      title: 'The "Wrong Hiring Priorities" Trap',
      customerSays: "These senior hires aren't working out",
      customerThinks: "We need more experienced people to handle growth",
      realProblem: "Hiring for future scale instead of current stage needs",
      solution: "Hire for 18-month horizon, not 5-year vision - stage-appropriate talent",
      whyItWorks: "Right skills for right stage reduces friction and hiring costs",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 4,
      title: 'The "Communication Breakdown" Crisis',
      customerSays: "Teams don't talk to each other anymore",
      customerThinks: "People are getting territorial or political",
      realProblem: "No communication systems as team size crosses coordination limits",
      solution: "Regular cross-team updates, shared metrics, transparent communication tools",
      whyItWorks: "Transparency reduces politics and increases efficiency at scale",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: 'The "No Process Documentation" Crisis',
      customerSays: "Only Jenny knows how to do X",
      customerThinks: "We need backup people for key functions",
      realProblem: "Growth outpaced process documentation - tribal knowledge everywhere",
      solution: "Process documentation sprints, knowledge transfer sessions, redundancy planning",
      whyItWorks: "Documented processes enable consistent execution regardless of personnel",
      painLevel: "High",
      timeStuck: "8-12 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 6,
      title: 'The "Management Skills Gap" Crisis',
      customerSays: "Our managers don't know how to manage",
      customerThinks: "We promoted the wrong people or hired bad managers",
      realProblem: "Technical skills ≠ management skills, but no training provided",
      solution: "Management training, external coaching, clear management expectations",
      whyItWorks: "Management is a learned skill, not an inherent talent",
      painLevel: "Very High",
      timeStuck: "12-18 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 7,
      title: 'The "Performance Standard Drift" Crisis',
      customerSays: "Some people aren't keeping up with growth",
      customerThinks: "We hired some low performers or people are getting complacent",
      realProblem: "Performance standards weren't raised as company expectations evolved",
      solution: "Regular performance recalibration, explicit growth expectations, coaching plans",
      whyItWorks: "Explicit standards prevent performance drift and maintain quality",
      painLevel: "Medium",
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
        title="Can't Hire Fast Enough? Team Growth Bottleneck Solutions | Reboot Media"
        description="Can't hire fast enough or new people aren't working out? 7 team growth bottleneck patterns where founder dependency kills scaling."
        canonicalUrl={getCanonicalUrl('team-growth-bottlenecks')}
      />

      <div className="team-growth-page min-h-screen relative overflow-hidden">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 glass-card-blue0 rounded-full animate-pulse"></span>
                  Can't Hire Fast Enough
                </div>
                <h1 className="heading-hero text-gradient-critical text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  <span className="text-blue-400">Team Growth</span>
                  <span className="block text-white mt-2">Bottleneck Solutions</span>
                </h1>
                <p className="text-black-important text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                  Can't hire fast enough or new people aren't working out? The problem isn't talent availability—it's that 
                  <span className="text-blue-400 font-semibold"> the founder bottleneck</span> kills scaling when everything still goes through you.
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
              <div className="glass-card-light rounded-2xl shadow-xl border border-blue-200/50 p-8">
                <h2 className="heading-xl text-gradient-critical text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Team Growth Gets Stuck (And How Culture Really Scales)
                </h2>
                <p className="text-black-important text-lg text-standard mb-6 leading-relaxed text-center">
                  Team growth bottlenecks aren't about finding "good people"—they're about systems that enable people to succeed. 
                  Culture shifts with size, and what worked at 5 people breaks at 50 without intentional frameworks.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 glass-card-blue rounded-lg">
                    <div className="text-2xl font-bold text-blue-accessible mb-1">89%</div>
                    <p className="text-sm text-optional">Struggle with team scaling</p>
                  </div>
                  <div className="text-center p-4 glass-card-light rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">43%</div>
                    <p className="text-sm text-optional">New hire failure rate</p>
                  </div>
                  <div className="text-center p-4 glass-card-green rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">11%</div>
                    <p className="text-sm text-optional">Break founder dependency</p>
                  </div>
                </div>
                <p className="text-black-important text-standard font-semibold text-center">
                  The pattern: Founder dependency → Team growth → Systems breakdown
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                <span className="block">7 Team Bottleneck Patterns</span>
                <span className="block">(Which is Yours?)</span>
              </h2>
              
              <div className="space-y-8">
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="glass-card-light rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className={`bg-gradient-to-r ${scenario.gradient} p-6`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="heading-lg text-black-important text-2xl font-bold text-white mb-2">
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
                        
                        {/* Customer Says */}
                        <div className="space-y-6">
                          <div className="glass-card-light rounded-lg p-4 border-l-4 border-red-500">
                            <h4 className="heading-md text-black-important font-bold text-red-800 mb-2 flex items-center">
                              <span className="mr-2">💬</span>
                              Customer Says:
                            </h4>
                            <p className="text-standard italic">
                              "{scenario.customerSays}"
                            </p>
                          </div>
                          
                          <div className="glass-card-blue rounded-lg p-4 border-l-4 border-blue-500">
                            <h4 className="heading-md text-black-important font-bold text-blue-800 mb-2 flex items-center">
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
                            <h4 className="heading-md text-black-important font-bold text-orange-800 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Problem:
                            </h4>
                            <p className="text-standard">
                              {scenario.realProblem}
                            </p>
                          </div>
                          
                          <div className="glass-card-green rounded-lg p-4 border-l-4 border-green-500">
                            <h4 className="heading-md text-black-important font-bold text-green-800 mb-2 flex items-center">
                              <span className="mr-2">✅</span>
                              Solution:
                            </h4>
                            <p className="text-standard">
                              {scenario.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Why It Works */}
                      <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h4 className="heading-md text-black-important font-bold text-purple-800 mb-2 flex items-center">
                          <span className="mr-2">🧠</span>
                          Why This Works:
                        </h4>
                        <p className="text-black-standard font-medium">
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
              <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🚨 Stop Being the Bottleneck to Your Own Growth
                </h3>
                <p className="text-black-important text-lg text-black-standard mb-6 max-w-3xl mx-auto">
                  Every month you stay trapped in founder dependency patterns, your team's growth potential stagnates while competitors 
                  with documented systems scale efficiently. Get your free team analysis and discover which bottleneck patterns are limiting your scaling.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 focus-visible:from-blue-600 hover:to-blue-700 focus-visible:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free Team Bottleneck Analysis
                </button>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} 
                  className="border-2 border-blue-500 text-blue-accessible hover:glass-card-blue0 focus-visible:glass-card-blue0 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block"
                >
                  See All Plateau Types
                </a>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Growth Plateau Solutions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-black-important text-xl font-bold text-gray-900 mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/operational-scaling-crisis`} className="hover:text-blue-accessible focus-visible:text-blue-accessible transition-colors">
                      Operational Scaling Crisis →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Growth breaking operations? Manual processes that worked at $500K fail at $2M+ without systems thinking.
                  </p>
                </div>
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-black-important text-xl font-bold text-gray-900 mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-blue-accessible focus-visible:text-blue-accessible transition-colors">
                      Need Strategic Marketing Leadership? →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Team bottlenecks often start with marketing leadership gaps. Discover if fractional CMO services can break your founder dependency.
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

export default TeamGrowthBottlenecks;