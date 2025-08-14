import { useEffect } from 'react';
import { getCanonicalUrl } from '../utils/urls';
import PageTemplate from '../components/PageTemplate';
import type { PageTemplateProps } from '../components/PageTemplate';

const GrowthPlateauSolutions = () => {
  useEffect(() => {
    document.title = "Stuck at $1M Revenue? Growth Plateau Solutions That Work | Reboot Media";
  }, []);

  const plateauTypes = [
    {
      id: 'revenue-ceiling',
      title: 'Revenue Ceiling Breakthrough',
      description: 'Stuck at $500K, $1M, or $1.5M for months? The problem isn\'t your product—it\'s that founder-led sales can\'t scale without documented processes.',
      link: '/growth-plateau-solutions/revenue-ceiling-breakthrough',
      icon: '📊'
    },
    {
      id: 'customer-acquisition',
      title: 'Customer Acquisition Stall',
      description: 'CAC keeps rising while conversion stays flat? You\'re competing on the same channels with the same message as everyone else.',
      link: '/growth-plateau-solutions/customer-acquisition-stall',
      icon: '🎯'
    },
    {
      id: 'market-expansion',
      title: 'Market Expansion Barriers',
      description: 'Core market feels saturated? The issue isn\'t market size—it\'s that you\'ve defined your market by product category instead of problems solved.',
      link: '/growth-plateau-solutions/market-expansion-barriers',
      icon: '🌍'
    },
    {
      id: 'operational-scaling',
      title: 'Operational Scaling Crisis',
      description: 'Growth feels like everything\'s breaking? Manual processes that worked at $500K fail spectacularly at $2M+ without systems.',
      link: '/growth-plateau-solutions/operational-scaling-crisis',
      icon: '⚙️'
    },
    {
      id: 'team-bottlenecks',
      title: 'Team Growth Bottlenecks',
      description: 'Can\'t hire fast enough or new people aren\'t working out? The founder bottleneck kills scaling when everything still goes through you.',
      link: '/growth-plateau-solutions/team-growth-bottlenecks',
      icon: '👥'
    },
    {
      id: 'product-market-fit',
      title: 'Product-Market Fit Erosion',
      description: 'What worked before isn\'t working now? Markets evolve faster than products—your messaging may be stuck in the past.',
      link: '/growth-plateau-solutions/product-market-fit-erosion',
      icon: '🎭'
    },
    {
      id: 'competitive-pressure',
      title: 'Competitive Pressure Plateau',
      description: 'Bigger competitors crushing you? Stop competing on their terms—unique positioning beats feature wars every time.',
      link: '/growth-plateau-solutions/competitive-pressure-plateau',
      icon: '⚔️'
    }
  ];

  const pageConfig: PageTemplateProps = {
    seoProps: {
      title: "Stuck at $1M Revenue? Growth Plateau Solutions That Work | Reboot Media",
      description: "Why 67% of growth-stage companies hit revenue plateaus between $500K-$1.5M and the proven marketing psychology fixes that break through to predictable scaling.",
      canonicalUrl: getCanonicalUrl('growth-plateau-solutions'),
    },
    hero: {
      variant: 'gradient',
      gradient: 'red',
      badge: {
        text: 'Revenue Stalled? You\'re Not Alone',
        animated: true
      },
      title: (
        <>
          <span className="text-red-400">67% of Companies</span> Hit the
          <span className="block text-white mt-2">$1M Revenue Wall</span>
        </>
      ),
      subtitle: 'Your product works. Your team works hard. But revenue is stuck between $500K-$1.5M.',
      description: 'The problem isn\'t your business model—it\'s your marketing psychology. Here\'s how the 33% break through.',
      buttons: [
        {
          text: 'Break Through Your Plateau',
          variant: 'primary',
          size: 'xl'
        },
        {
          text: 'Diagnose Your Plateau',
          variant: 'outline',
          size: 'xl',
          href: '#plateau-types'
        }
      ]
    },
    content: [
      {
        id: 'problem-recognition',
        title: 'The Revenue Plateau Crisis',
        content: (
          <div>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-red-200/50 dark:border-red-800/50 p-8 text-center">
                <div className="text-4xl font-black text-red-600 mb-4">67%</div>
                <div className="text-lg font-semibold text-important dark:text-white mb-2">Companies Plateau</div>
                <p className="text-optional dark:text-gray-300">Between $500K-$1.5M revenue</p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-orange-200/50 dark:border-orange-800/50 p-8 text-center">
                <div className="text-4xl font-black text-orange-600 mb-4">14mo</div>
                <div className="text-lg font-semibold text-important dark:text-white mb-2">Average Stuck Time</div>
                <p className="text-optional dark:text-gray-300">Before breaking through</p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-green-200/50 dark:border-green-800/50 p-8 text-center">
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
            </div>
          </div>
        )
      },
      {
        id: 'plateau-types',
        title: '7 Plateau Types (Which is Yours?)',
        content: (
          <div>
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
          </div>
        )
      },
      {
        id: 'how-this-works',
        title: 'The Psychology-Driven Breakthrough Framework',
        variant: 'glass',
        content: (
          <div>
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
        )
      },
      {
        id: 'related-resources',
        title: 'Master the Psychology Behind Breakthrough Growth',
        content: (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-shadow">
              <h3 className="heading-lg text-important dark:text-white mb-4">
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="hover:text-red-600 transition-colors">
                  Marketing Psychology Fundamentals →
                </a>
              </h3>
              <p className="text-lg text-standard dark:text-gray-300 mb-6">
                Master the 5 customer awareness stages and conversion psychology principles that transform scattered marketing into predictable revenue growth.
              </p>
              <a 
                href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`}
                className="flex items-center text-red-600 dark:text-red-400 font-semibold hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                <span className="mr-2">📚</span>
                Master $47K/Month Psychology
              </a>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-shadow">
              <h3 className="heading-lg text-important dark:text-white mb-4">
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-red-600 transition-colors">
                  Need Strategic Marketing Leadership? →
                </a>
              </h3>
              <p className="text-lg text-standard dark:text-gray-300 mb-6">
                Compare fractional CMO vs agency approaches and discover which delivers faster plateau breakthrough results for your specific situation.
              </p>
              <a 
                href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-marketing-agency`}
                className="flex items-center text-red-600 dark:text-red-400 font-semibold hover:text-red-700 dark:hover:text-red-300 transition-colors group"
              >
                <span className="mr-2">🎯</span>
                Get Your CMO vs Agency Answer
                <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        )
      }
    ],
    footerCTA: {
      title: 'Stop Accepting Plateau Revenue as "Normal"',
      description: 'The 33% who break through aren\'t smarter—they just understand marketing psychology. Every month you wait is another $47K+ of growth your competitors capture instead.',
      variant: 'gradient',
      gradient: 'red',
      buttons: [
        {
          text: 'Get Your Free Plateau Breakthrough Analysis →',
          variant: 'primary',
          size: 'xl'
        }
      ]
    },
  };

  return <PageTemplate {...pageConfig} />;
};

export default GrowthPlateauSolutions;