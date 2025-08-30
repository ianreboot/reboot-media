import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const CompetitivePressurePlateau = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Bigger Competitors Crushing You? Competitive Pressure Plateau Solutions | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Bigger competitors crushing you? 6 competitive pressure plateau patterns where companies try to compete on competitors\' terms instead of unique positioning.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'competitive pressure plateau, bigger competitors winning, competitive disadvantage, unique positioning, competitor differentiation');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Competing on Their Terms" Trap',
      customerSays: "Bigger competitors are crushing us",
      customerThinks: "We need to match their features and prices to compete",
      realProblem: "Trying to compete on competitors' strengths instead of your unique advantages",
      solution: "Identify and amplify your unique positioning advantages they can't match",
      whyItWorks: "Unique positioning beats feature matching - compete where you win",
      painLevel: "Very High",
      timeStuck: "12-18 months",
      gradient: "from-red-500 to-red-600"
    },
    {
      id: 2,
      title: 'The "Feature War" Futility',
      customerSays: "We keep adding features but still lose deals",
      customerThinks: "Our product isn't competitive enough feature-wise",
      realProblem: "Features wars favor companies with bigger budgets, not better solutions",
      solution: "Compete on outcomes and experience, not feature checklists",
      whyItWorks: "Customers buy results and peace of mind, not feature counts",
      painLevel: "High",
      timeStuck: "10-16 months",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      title: 'The "Price Race to Bottom" Trap',
      customerSays: "We have to discount heavily to win deals",
      customerThinks: "Price is the only way to compete with bigger players",
      realProblem: "Commoditized positioning forces price competition instead of value competition",
      solution: "Differentiate on value dimensions where size doesn't matter",
      whyItWorks: "Value > Price when positioning emphasizes unique outcomes",
      painLevel: "Very High",
      timeStuck: "6-12 months",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      id: 4,
      title: 'The "Resource Allocation" Mistake',
      customerSays: "We can't compete with their marketing budget",
      customerThinks: "We need more money to compete effectively",
      realProblem: "Trying to out-spend instead of out-smart with better positioning",
      solution: "Focus resources on defensible positioning advantages and niche dominance",
      whyItWorks: "Strategic focus > budget size when targeting underserved segments",
      painLevel: "Medium",
      timeStuck: "8-14 months",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 5,
      title: 'The "Me-Too" Positioning Problem',
      customerSays: "Prospects say we're similar to [big competitor]",
      customerThinks: "We need to explain our differences better",
      realProblem: "Positioning sounds like competitor with minor variations",
      solution: "Create category of one positioning that makes comparison irrelevant",
      whyItWorks: "When you're the only option for specific outcome, price becomes secondary",
      painLevel: "High",
      timeStuck: "12-18 months",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 6,
      title: 'The "Fear-Based Decision Making" Paralysis',
      customerSays: "Every move we make, they counter with something bigger",
      customerThinks: "Maybe we should avoid competing directly",
      realProblem: "Fear-based decisions instead of strategic advantage-based moves",
      solution: "Compete in spaces where your advantages matter most, avoid their strengths",
      whyItWorks: "Strategic positioning > defensive reactions in competitive dynamics",
      painLevel: "Medium",
      timeStuck: "6-10 months",
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
        title="Bigger Competitors Crushing You? Competitive Pressure Plateau Solutions | Reboot Media"
        description="Bigger competitors crushing you? 6 competitive pressure plateau patterns where companies try to compete on competitors' terms instead of unique positioning."
        canonicalUrl={getCanonicalUrl('competitive-pressure-plateau')}
      />

      <div className="competitive-pressure-page min-h-screen relative overflow-hidden">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-red-900 via-red-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Bigger Competitors Winning
                </div>
                <h1 className="heading-hero text-gradient-critical text-4xl md:text-6xl font-black mb-6 leading-tight">
                  <span className="text-red-400">Competitive Pressure</span>
                  <span className="block text-white mt-2">Plateau Solutions</span>
                </h1>
                <p className="text-black-important text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                  Bigger competitors crushing you? The problem isn't their size or budget—it's that you're trying to 
                  <span className="text-red-400 font-semibold"> compete on their terms</span> instead of creating unique positioning where you win.
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
              <div className="glass-card-light rounded-2xl shadow-xl border border-red-200/50 p-8">
                <h2 className="heading-xl text-gradient-critical text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why David Beats Goliath (Strategic Positioning Over Brute Force)
                </h2>
                <p className="text-black-important text-lg text-standard mb-6 leading-relaxed text-center">
                  Competitive pressure plateaus happen when smaller companies try to compete on bigger companies' terms—features, price, or scale. 
                  The solution isn't bigger budgets; it's smarter positioning that makes their advantages irrelevant.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 mb-1">76%</div>
                    <p className="text-sm text-optional">Feel competitor pressure</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-accessible mb-1">38%</div>
                    <p className="text-sm text-optional">Try to match features</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">14%</div>
                    <p className="text-sm text-optional">Win with unique positioning</p>
                  </div>
                </div>
                <p className="text-black-important text-standard font-semibold text-center">
                  The pattern: Competitor pressure → Feature matching → Price competition → Plateau
                </p>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                6 Competitive Pressure Patterns (Which is Yours?)
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
                          <div className="flex gap-4 text-sm text-red-100">
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
                            <h4 className="heading-md text-black-important font-bold text-red-800 mb-2 flex items-center">
                              <span className="mr-2">💬</span>
                              Customer Says:
                            </h4>
                            <p className="text-standard italic">
                              "{scenario.customerSays}"
                            </p>
                          </div>
                          
                          <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                            <h4 className="heading-md text-black-important font-bold text-orange-800 mb-2 flex items-center">
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
                          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                            <h4 className="heading-md text-black-important font-bold text-yellow-800 mb-2 flex items-center">
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
                      <div className="mt-6 glass-card-blue rounded-lg p-4 border border-blue-200">
                        <h4 className="heading-md text-black-important font-bold text-blue-800 mb-2 flex items-center">
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
              <div className="text-center glass-card-solid rounded-2xl p-8 border border-red-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🚨 Stop Playing by Their Rules
                </h3>
                <p className="text-black-important text-lg text-black-standard mb-6 max-w-3xl mx-auto">
                  Every month you compete on their terms—features, price, scale—you're fighting a battle you can't win. 
                  Get your free competitive analysis and discover unique positioning angles that make their size irrelevant.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 focus-visible:from-red-600 hover:to-red-700 focus-visible:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Free Competitive Analysis
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
              <h2 className="heading-xl text-gradient-critical text-3xl font-bold text-gray-900 mb-8 text-center">
                Related Growth Plateau Solutions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-black-important text-xl font-bold text-gray-900 mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/customer-acquisition-stall`} className="hover:text-red-600 focus-visible:text-red-600 transition-colors">
                      Customer Acquisition Stall →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Competitive pressure often drives CAC inflation. Learn psychology-driven acquisition that sidesteps competitor wars.
                  </p>
                </div>
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-black-important text-xl font-bold text-gray-900 mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-red-600 focus-visible:text-red-600 transition-colors">
                      Need Strategic Marketing Leadership? →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Competitive positioning requires strategic thinking. Discover if fractional CMO expertise can create winning differentiation.
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

export default CompetitivePressurePlateau;