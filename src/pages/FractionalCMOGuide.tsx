import { useEffect } from 'react';
import { getCanonicalUrl } from '../utils/urls';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';

const FractionalCMOGuide = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Fractional CMO vs Marketing Agency: Complete Decision Guide | Reboot Media";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compare fractional CMO vs marketing agency vs full-time CMO. Decision criteria, costs, results, and which approach delivers faster growth for $500K-$1.5M companies.');
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'fractional CMO vs marketing agency, fractional CMO vs full-time CMO, fractional CMO evaluation criteria, part-time CMO services, marketing strategy consultant');
    
    // Add JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Fractional CMO vs Marketing Agency: Complete Decision Guide",
      "description": "Compare fractional CMO vs marketing agency vs full-time CMO. Decision criteria, costs, results, and which approach delivers faster growth for $500K-$1.5M companies.",
      "author": {
        "@type": "Person",
        "name": "Ian Ho",
        "url": "https://www.linkedin.com/in/ian-ho/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Reboot Media",
        "url": "https://www.rebootmedia.net"
      },
      "mainEntityOfPage": getCanonicalUrl('fractional-cmo-guide'),
      "datePublished": "2025-01-01",
      "dateModified": "2025-01-01"
    });
    document.head.appendChild(script);

    return () => {
      // Cleanup JSON-LD script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript && existingScript.textContent?.includes('Fractional CMO vs Marketing Agency')) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="Fractional CMO vs Marketing Agency: Complete Decision Guide | Reboot Media"
        description="Compare fractional CMO vs marketing agency vs full-time CMO. Decision criteria, costs, results, and which approach delivers faster growth for $500K-$1.5M companies."
        canonicalUrl={getCanonicalUrl('fractional-cmo-guide')}
      />

      <div className="fractional-cmo-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        {/* Sophisticated Background Gradient */}
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
        {/* Hero Section */}
        <section className="pt-20 md:pt-24 pb-8 bg-gradient-to-br from-blue-900 via-blue-950 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Decision Guide for Growth-Stage Companies
            </div>
            <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
              <span className="text-blue-400">Fractional CMO</span> vs 
              <span className="block text-white mt-2">Marketing Agency vs Full-Time CMO</span>
            </h1>
            <p className="text-xl text-important-accessible dark:replace-text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The complete decision framework for $500K-$1.5M companies. Compare costs, results, timelines, and strategic impact to choose the approach that delivers faster, predictable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Get Personalized Recommendation
              </button>
              <a 
                href="#comparison-table" 
                className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                See Detailed Comparison
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
          
          {/* Introduction */}
          <section className="mb-16">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200/50 dark:border-blue-800/50 p-8">
              <h2 className="heading-lg text-important-accessible dark:text-white mb-6">
                The Complete Marketing Leadership Decision Guide
              </h2>
              <p className="text-lg text-standard dark:replace-text-gray-300 mb-6 leading-relaxed">
                Most companies waste months and thousands of dollars choosing the wrong marketing approach. This guide reveals the real decision 
                criteria behind fractional CMO, agency, full-time, and in-house options—plus when to transition between them.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-accessible mb-1">73%</div>
                  <p className="text-sm text-optional dark:replace-text-gray-400">Choose based on ego, not ROI</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-accessible mb-1">$47K</div>
                  <p className="text-sm text-optional dark:replace-text-gray-400">Average cost of wrong choice</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">18mo</div>
                  <p className="text-sm text-optional dark:replace-text-gray-400">Wasted with poor fit</p>
                </div>
              </div>
              <p className="text-standard dark:replace-text-gray-300 font-semibold">
                The pattern: Status decision → Wrong fit → Plateau → Switch → Growth
              </p>
            </div>
          </section>

          {/* Decision Comparison Cards */}
          <section className="mb-16">
            <h2 className="heading-xl text-gradient-critical mb-12 text-center">
              7 Critical Marketing Leadership Decisions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Fractional CMO vs Agency */}
              <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="heading-lg text-gradient-critical mb-2">
                        📊 Fractional CMO vs Agency
                      </h3>
                      <p className="text-blue-100">Strategy leadership vs execution power</p>
                    </div>
                    <div className="text-3xl text-white/80">⚖️</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-standard dark:replace-text-gray-300 mb-4 leading-relaxed">
                    Most companies think "we need execution help" when they really need strategy refinement. 
                    <strong className="text-blue-accessible"> Who's accountable when tactics fail?</strong>
                  </p>
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-marketing-agency`} className="inline-flex items-center text-blue-accessible hover:text-blue-700 font-semibold transition-colors group-hover:text-blue-700">
                    See Why Agencies Fail at Strategy →
                  </a>
                </div>
              </div>

              {/* Fractional CMO vs Full-Time */}
              <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="heading-lg text-gradient-critical mb-2">
                        💼 Fractional vs Full-Time CMO
                      </h3>
                      <p className="text-blue-100">Cost efficiency vs status symbolism</p>
                    </div>
                    <div className="text-3xl text-white/80">🎯</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-standard dark:replace-text-gray-300 mb-4 leading-relaxed">
                    "We're big enough for a full-time CMO" is often ego talking. 
                    <strong className="text-green-600"> Can you give them $200K worth of meaningful work?</strong>
                  </p>
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-full-time-cmo`} className="inline-flex items-center text-blue-accessible hover:text-blue-700 font-semibold transition-colors group-hover:text-blue-700">
                    Calculate If You Need $200K CMO →
                  </a>
                </div>
              </div>

              {/* Fractional CMO vs Consultant */}
              <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="heading-lg text-gradient-critical mb-2">
                        🧠 Fractional CMO vs Consultant
                      </h3>
                      <p className="text-blue-100">Implementation ownership vs advice</p>
                    </div>
                    <div className="text-3xl text-white/80">🔍</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-standard dark:replace-text-gray-300 mb-4 leading-relaxed">
                    Consultants give great advice, but who implements? 
                    <strong className="text-purple-600"> Fractional CMOs own results, not just recommendations.</strong>
                  </p>
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-consultant`} className="inline-flex items-center text-blue-accessible hover:text-blue-700 font-semibold transition-colors group-hover:text-blue-700">
                    Advice vs Results: Who's Accountable? →
                  </a>
                </div>
              </div>

              {/* Fractional CMO vs In-House Team */}
              <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="heading-lg text-gradient-critical mb-2">
                        👥 Fractional CMO vs In-House Team
                      </h3>
                      <p className="text-blue-100">Expertise speed vs team building</p>
                    </div>
                    <div className="text-3xl text-white/80">⏱️</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-standard dark:replace-text-gray-300 mb-4 leading-relaxed">
                    Building internal teams costs 2.5x base salaries. 
                    <strong className="text-indigo-600"> How long can you wait for competency?</strong>
                  </p>
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-in-house-team`} className="inline-flex items-center text-blue-accessible hover:text-blue-700 font-semibold transition-colors group-hover:text-blue-700">
                    Reveal 2.5x Hidden Team Costs →
                  </a>
                </div>
              </div>

              {/* When to Choose Each */}
              <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-yellow-500 to-red-500 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="heading-lg text-gradient-critical mb-2">
                        🎪 When to Choose Each Option
                      </h3>
                      <p className="text-yellow-100">Decision framework by business stage</p>
                    </div>
                    <div className="text-3xl text-white/80">📋</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-standard dark:replace-text-gray-300 mb-4 leading-relaxed">
                    Revenue stage, growth trajectory, and internal capabilities determine optimal choice. 
                    <strong className="text-red-600"> Use the decision matrix.</strong>
                  </p>
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/when-to-choose-each`} className="inline-flex items-center text-blue-accessible hover:text-blue-700 font-semibold transition-colors group-hover:text-blue-700">
                    Match Your Stage to Right Model →
                  </a>
                </div>
              </div>

              {/* Cost-ROI Analysis */}
              <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="heading-lg text-gradient-critical mb-2">
                        💰 Cost-ROI Analysis
                      </h3>
                      <p className="text-green-100">Hidden costs and real returns</p>
                    </div>
                    <div className="text-3xl text-white/80">📊</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-standard dark:replace-text-gray-300 mb-4 leading-relaxed">
                    Hourly rates lie. True costs include management overhead, ramp time, and opportunity costs. 
                    <strong className="text-teal-600"> See the real numbers.</strong>
                  </p>
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/cost-roi-analysis`} className="inline-flex items-center text-blue-accessible hover:text-blue-700 font-semibold transition-colors group-hover:text-blue-700">
                    See 3.2x ROI vs 1.8x Comparison →
                  </a>
                </div>
              </div>

              {/* Transition Strategies */}
              <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 md:col-span-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="heading-lg text-gradient-critical mb-2">
                        🔄 Transition Strategies
                      </h3>
                      <p className="text-purple-100">When and how to switch between approaches</p>
                    </div>
                    <div className="text-3xl text-white/80">↗️</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-standard dark:replace-text-gray-300 mb-4 leading-relaxed">
                    Growth stages require different marketing approaches. Agency → Fractional → Full-time isn't always the path. 
                    <strong className="text-pink-600"> When to switch and how to do it right.</strong>
                  </p>
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/transition-strategies`} className="inline-flex items-center text-blue-accessible hover:text-blue-700 font-semibold transition-colors group-hover:text-blue-700">
                    Avoid 6-Month Transition Loss →
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50">
              <h3 className="heading-lg text-important-accessible dark:text-white mb-4">
                🚨 Stop Making the $47,000 Mistake
              </h3>
              <p className="text-lg text-standard dark:replace-text-gray-300 mb-6 max-w-3xl mx-auto">
                Most companies choose marketing approaches based on status or emotion, not ROI analysis. Get your free decision analysis 
                and discover which approach delivers the fastest, most predictable growth for your specific situation.
              </p>
              <button 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mr-4"
              >
                Get Free Decision Analysis
              </button>
              <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/cost-roi-analysis`} className="border-2 border-blue-500 text-blue-accessible hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block">
                Calculate Your $47K Mistake
              </a>
            </div>
          </section>

          {/* Related Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold replace-text-gray-900 dark:text-white mb-8 text-center">
              Related Marketing Leadership Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold replace-text-gray-900 dark:text-white mb-3">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="hover:text-blue-accessible transition-colors">
                    8 Proven Plateau Breakthrough Patterns →
                  </a>
                </h3>
                <p className="text-standard dark:replace-text-gray-300">
                  Marketing leadership choices often follow revenue plateaus. Discover psychology-driven solutions for breaking through growth ceilings.
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold replace-text-gray-900 dark:text-white mb-3">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="hover:text-blue-accessible transition-colors">
                    5 Awareness Stages That Convert →
                  </a>
                </h3>
                <p className="text-standard dark:replace-text-gray-300">
                  Master the customer awareness stages and conversion psychology that separates great marketing leaders from tacticians.
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

export default FractionalCMOGuide;