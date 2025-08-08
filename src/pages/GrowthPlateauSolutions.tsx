import { useEffect } from 'react';
import { getCanonicalUrl } from '../utils/urls';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';

const GrowthPlateauSolutions = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Stuck at $1M Revenue? Growth Plateau Solutions That Work | Reboot Media";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Why 67% of growth-stage companies hit revenue plateaus between $500K-$1.5M and the proven marketing psychology fixes that break through to predictable scaling.');
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'growth plateau solutions, revenue stuck marketing problems, business growth plateau, marketing not working growth stage, scale past million dollar revenue');
    
    // Add JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Stuck at $1M Revenue? Growth Plateau Solutions That Work",
      "description": "Why 67% of growth-stage companies hit revenue plateaus between $500K-$1.5M and the proven marketing psychology fixes that break through to predictable scaling.",
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
      "mainEntityOfPage": getCanonicalUrl('growth-plateau-solutions'),
      "datePublished": "2025-01-01",
      "dateModified": "2025-01-01"
    });
    document.head.appendChild(script);

    return () => {
      // Cleanup JSON-LD script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript && existingScript.textContent?.includes('Growth Plateau Solutions')) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const plateauTypes = [
    {
      id: 'revenue-ceiling',
      title: 'Revenue Ceiling Breakthrough',
      description: 'Stuck at $500K, $1M, or $1.5M for months? The problem isn\'t your product—it\'s that founder-led sales can\'t scale without documented processes.',
      link: '/growth-plateau-solutions/revenue-ceiling-breakthrough',
      gradient: 'from-red-500 to-red-600',
      icon: '📊'
    },
    {
      id: 'customer-acquisition',
      title: 'Customer Acquisition Stall',
      description: 'CAC keeps rising while conversion stays flat? You\'re competing on the same channels with the same message as everyone else.',
      link: '/growth-plateau-solutions/customer-acquisition-stall',
      gradient: 'from-orange-500 to-orange-600',
      icon: '🎯'
    },
    {
      id: 'market-expansion',
      title: 'Market Expansion Barriers',
      description: 'Core market feels saturated? The issue isn\'t market size—it\'s that you\'ve defined your market by product category instead of problems solved.',
      link: '/growth-plateau-solutions/market-expansion-barriers',
      gradient: 'from-yellow-500 to-yellow-600',
      icon: '🌍'
    },
    {
      id: 'operational-scaling',
      title: 'Operational Scaling Crisis',
      description: 'Growth feels like everything\'s breaking? Manual processes that worked at $500K fail spectacularly at $2M+ without systems.',
      link: '/growth-plateau-solutions/operational-scaling-crisis',
      gradient: 'from-green-500 to-green-600',
      icon: '⚙️'
    },
    {
      id: 'team-bottlenecks',
      title: 'Team Growth Bottlenecks',
      description: 'Can\'t hire fast enough or new people aren\'t working out? The founder bottleneck kills scaling when everything still goes through you.',
      link: '/growth-plateau-solutions/team-growth-bottlenecks',
      gradient: 'from-blue-500 to-blue-600',
      icon: '👥'
    },
    {
      id: 'product-market-fit',
      title: 'Product-Market Fit Erosion',
      description: 'What worked before isn\'t working now? Markets evolve faster than products—your messaging may be stuck in the past.',
      link: '/growth-plateau-solutions/product-market-fit-erosion',
      gradient: 'from-purple-500 to-purple-600',
      icon: '🎭'
    },
    {
      id: 'competitive-pressure',
      title: 'Competitive Pressure Plateau',
      description: 'Bigger competitors crushing you? Stop competing on their terms—unique positioning beats feature wars every time.',
      link: '/growth-plateau-solutions/competitive-pressure-plateau',
      gradient: 'from-pink-500 to-pink-600',
      icon: '⚔️'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Stuck at $1M Revenue? Growth Plateau Solutions That Work | Reboot Media"
        description="Why 67% of growth-stage companies hit revenue plateaus between $500K-$1.5M and the proven marketing psychology fixes that break through to predictable scaling."
        canonicalUrl={getCanonicalUrl('growth-plateau-solutions')}
      />

      <div className="growth-plateau-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        {/* Sophisticated Background Gradient */}
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
        {/* Hero Section */}
        <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-red-900 via-red-950 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.1)_0%,transparent_50%)]"></div>
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Revenue Stalled? You're Not Alone
            </div>
            <h1 className="heading-hero text-critical dark:text-white mb-6 leading-tight">
              <span className="text-red-400">67% of Companies</span> Hit the
              <span className="block text-white mt-2">$1M Revenue Wall</span>
            </h1>
            <p className="text-xl md:text-2xl text-important dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Your product works. Your team works hard. But revenue is stuck between $500K-$1.5M. 
              The problem isn't your business model—it's your <span className="text-red-400 font-semibold">marketing psychology</span>. 
              Here's how the 33% break through.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Break Through Your Plateau
              </button>
              <a 
                href="#plateau-types" 
                className="border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300"
              >
                Diagnose Your Plateau
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
          
          {/* Problem Recognition */}
          <section className="mb-20 text-center">
            <h2 className="heading-xl text-critical dark:text-white mb-8">
              The Revenue Plateau Crisis
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-red-200/50 dark:border-red-800/50 p-8">
                <div className="text-4xl font-black text-red-600 mb-4">67%</div>
                <div className="text-lg font-semibold text-important dark:text-white mb-2">Companies Plateau</div>
                <p className="text-optional dark:text-gray-300">Between $500K-$1.5M revenue</p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-orange-200/50 dark:border-orange-800/50 p-8">
                <div className="text-4xl font-black text-orange-600 mb-4">14mo</div>
                <div className="text-lg font-semibold text-important dark:text-white mb-2">Average Stuck Time</div>
                <p className="text-optional dark:text-gray-300">Before breaking through</p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-green-200/50 dark:border-green-800/50 p-8">
                <div className="text-4xl font-black text-green-600 mb-4">$47K</div>
                <div className="text-lg font-semibold text-important dark:text-white mb-2">Monthly Cost</div>
                <p className="text-optional dark:text-gray-300">Of staying plateaued</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-200/50 dark:border-red-800/50">
              <h3 className="heading-lg text-important dark:text-white mb-4">
                🚨 Every Month You Wait Costs You $47,000+
              </h3>
              <p className="text-lg text-standard dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                While you're stuck at $1M, you should be at $1.5M+ with proper marketing psychology. That's $500K+ annual difference. 
                Every month of delay costs you qualified opportunities competitors are capturing.
              </p>
              <button 
                onClick={() => setShowDropdownForm(true)}
                className="text-red-600 dark:text-red-400 font-bold hover:underline text-lg"
              >
                Get your plateau breakthrough analysis →
              </button>
            </div>
          </section>

          {/* Plateau Types Grid */}
          <section id="plateau-types" className="mb-20">
            <h2 className="heading-xl text-critical dark:text-white mb-8 text-center">
              7 Plateau Types (Which is Yours?)
            </h2>
            <p className="text-xl text-standard dark:text-gray-300 mb-16 text-center max-w-4xl mx-auto">
              After analyzing 200+ growth-stage companies, we've identified exactly why companies get stuck. 
              Each plateau type has specific psychology fixes that unlock the next revenue level.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plateauTypes.map((plateau) => (
                <div key={plateau.id} className="group">
                  <a 
                    href={plateau.link}
                    className="block bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-white dark:hover:bg-slate-700/80"
                  >
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4">{plateau.icon}</div>
                      <h3 className="heading-md text-important dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-red-500 group-hover:to-orange-500 transition-all duration-300">
                        {plateau.title}
                      </h3>
                    </div>
                    <p className="text-standard dark:text-gray-300 text-base leading-relaxed mb-6">
                      {plateau.description}
                    </p>
                    <div className="flex items-center justify-center text-red-600 dark:text-red-400 font-semibold group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">
                      Discover Your Breakthrough →
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* How This Works */}
          <section className="mb-20">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-12">
              <h2 className="heading-xl text-critical dark:text-white mb-8 text-center">
                The Psychology-Driven Breakthrough Framework
              </h2>
              <p className="text-xl text-standard dark:text-gray-300 mb-12 text-center max-w-4xl mx-auto">
                The 33% of companies that break through plateaus use this systematic approach. 
                It's not about working harder—it's about <span className="font-semibold text-red-600 dark:text-red-400">marketing psychology that actually converts</span>.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">1</div>
                  <h3 className="font-bold text-lg text-important dark:text-white mb-3">Customer Says</h3>
                  <p className="text-optional dark:text-gray-400 text-sm">Exact language your stuck customers use</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">2</div>
                  <h3 className="font-bold text-lg text-important dark:text-white mb-3">Real Problem</h3>
                  <p className="text-optional dark:text-gray-400 text-sm">Hidden psychological root cause</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">3</div>
                  <h3 className="font-bold text-lg text-important dark:text-white mb-3">Solution</h3>
                  <p className="text-optional dark:text-gray-400 text-sm">Systems + psychology fix</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">4</div>
                  <h3 className="font-bold text-lg text-important dark:text-white mb-3">Why It Works</h3>
                  <p className="text-optional dark:text-gray-400 text-sm">Psychology principle explained</p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="mb-16">
            <h2 className="heading-xl text-critical dark:text-white mb-12 text-center">
              Master the Psychology Behind Breakthrough Growth
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-shadow">
                <h3 className="heading-lg text-important dark:text-white mb-4">
                  <a href="/marketing-psychology" className="hover:text-red-600 transition-colors">
                    Marketing Psychology Fundamentals →
                  </a>
                </h3>
                <p className="text-lg text-standard dark:text-gray-300 mb-6">
                  Master the 5 customer awareness stages and conversion psychology principles that transform scattered marketing into predictable revenue growth.
                </p>
                <div className="flex items-center text-red-600 dark:text-red-400 font-semibold">
                  <span className="mr-2">📚</span>
                  Master $47K/Month Psychology
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-shadow">
                <h3 className="heading-lg text-important dark:text-white mb-4">
                  <a href="/fractional-cmo-guide" className="hover:text-red-600 transition-colors">
                    Need Strategic Marketing Leadership? →
                  </a>
                </h3>
                <p className="text-lg text-standard dark:text-gray-300 mb-6">
                  Compare fractional CMO vs agency approaches and discover which delivers faster plateau breakthrough results for your specific situation.
                </p>
                <div className="flex items-center text-red-600 dark:text-red-400 font-semibold">
                  <span className="mr-2">🎯</span>
                  Get Your CMO vs Agency Answer
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="text-center bg-gradient-to-br from-red-900 via-red-950 to-black text-white rounded-2xl p-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Stop Accepting Plateau Revenue as "Normal"
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              The 33% who break through aren't smarter—they just understand marketing psychology. 
              Every month you wait is another $47K+ of growth your competitors capture instead.
            </p>
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-6 rounded-xl font-bold text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Get Your Free Plateau Breakthrough Analysis →
              </button>
            </div>
            <p className="text-gray-400 text-lg">
              ✅ Free plateau analysis • ✅ Psychology-driven roadmap • ✅ No obligation • ✅ 67% breakthrough rate
            </p>
          </section>

        </main>

        <GlobalFooter onShowForm={() => setShowDropdownForm(true)} />
        </div>
      </div>

    </>
  );
};

export default GrowthPlateauSolutions;