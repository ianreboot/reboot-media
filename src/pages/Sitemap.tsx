import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import { getCanonicalUrl } from '../utils/urls';

const Sitemap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const marketingPsychologyPages = [
    { path: '/marketing-psychology', label: 'Marketing Psychology Complete Guide', description: 'Master the 5 stages of customer awareness' },
    { path: '/marketing-psychology/unaware-stage-customers', label: 'Unaware Stage Customers', description: 'Reaching customers who don\'t know they have a problem' },
    { path: '/marketing-psychology/problem-aware-stage-customers', label: 'Problem Aware Stage', description: 'Converting customers who recognize their pain points' },
    { path: '/marketing-psychology/solution-aware-stage-customers', label: 'Solution Aware Stage', description: 'Engaging customers exploring potential solutions' },
    { path: '/marketing-psychology/product-aware-stage-customers', label: 'Product Aware Stage', description: 'Convincing customers comparing specific products' },
    { path: '/marketing-psychology/most-aware-stage-customers', label: 'Most Aware Stage', description: 'Closing deals with ready-to-buy customers' },
  ];

  const growthPlateauPages = [
    { path: '/growth-plateau-solutions', label: 'Breaking Growth Plateaus', description: 'Comprehensive guide to overcoming business stagnation' },
    { path: '/growth-plateau-solutions/revenue-ceiling-breakthrough', label: 'Revenue Ceiling Breakthrough', description: 'Strategies to break through revenue limitations' },
    { path: '/growth-plateau-solutions/customer-acquisition-stall', label: 'Customer Acquisition Stall', description: 'Reviving your customer acquisition engine' },
    { path: '/growth-plateau-solutions/market-expansion-barriers', label: 'Market Expansion Barriers', description: 'Overcoming obstacles to new market entry' },
    { path: '/growth-plateau-solutions/operational-scaling-crisis', label: 'Operational Scaling Crisis', description: 'Solving operational bottlenecks at scale' },
    { path: '/growth-plateau-solutions/team-growth-bottlenecks', label: 'Team Growth Bottlenecks', description: 'Building teams that scale with your business' },
    { path: '/growth-plateau-solutions/product-market-fit-erosion', label: 'Product-Market Fit Erosion', description: 'Regaining alignment with market needs' },
    { path: '/growth-plateau-solutions/competitive-pressure-plateau', label: 'Competitive Pressure Plateau', description: 'Breaking free from competitive gridlock' },
  ];

  const fractionalCMOPages = [
    { path: '/fractional-cmo-guide', label: 'Fractional CMO Complete Guide', description: 'Everything about fractional marketing leadership' },
    { path: '/fractional-cmo-guide/vs-marketing-agency', label: 'Fractional CMO vs Marketing Agency', description: 'Strategic leadership vs tactical execution' },
    { path: '/fractional-cmo-guide/vs-full-time-cmo', label: 'Fractional CMO vs Full-Time CMO', description: 'When fractional makes more sense' },
    { path: '/fractional-cmo-guide/vs-consultant', label: 'Fractional CMO vs Consultant', description: 'Ongoing leadership vs project-based advice' },
    { path: '/fractional-cmo-guide/vs-in-house-team', label: 'Fractional CMO vs In-House Team', description: 'External expertise vs internal resources' },
    { path: '/fractional-cmo-guide/transition-strategies', label: 'Transition Strategies', description: 'Moving between marketing leadership models' },
    { path: '/fractional-cmo-guide/when-to-choose-each', label: 'When to Choose Each Option', description: 'Decision framework for marketing leadership' },
    { path: '/fractional-cmo-guide/cost-roi-analysis', label: 'Cost & ROI Analysis', description: 'Financial comparison of marketing options' },
  ];

  const mainPages = [
    { path: '/', label: 'Home', description: 'Fractional CMO services with Fortune 500 expertise' },
    { path: '/about', label: 'About', description: 'Learn about Reboot Media and our approach' },
    { path: '/contact', label: 'Contact', description: 'Get in touch for a free growth analysis' },
    { path: '/privacy', label: 'Privacy Policy', description: 'How we protect your data' },
    { path: '/terms', label: 'Terms of Service', description: 'Terms and conditions of service' },
  ];

  return (
    <>
      <SEOHead 
        title="Sitemap - All Resources & Topics | Reboot Media"
        description="Complete directory of marketing psychology guides, growth plateau solutions, and fractional CMO resources. Find exactly what you need to transform your business."
        keywords="sitemap, marketing resources, growth guides, fractional CMO topics, business transformation resources"
        canonicalUrl={getCanonicalUrl('sitemap')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/20">
        <GlobalHeader showProgressBar={false} />
        
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-gray-900 mb-4">
                Complete Resource Directory
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive collection of guides, strategies, and insights designed to transform your business from plateau to peak performance.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-3xl font-bold text-orange-500">{mainPages.length + marketingPsychologyPages.length + growthPlateauPages.length + fractionalCMOPages.length}</div>
                <div className="text-sm text-gray-600">Total Pages</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-3xl font-bold text-blue-500">3</div>
                <div className="text-sm text-gray-600">Main Categories</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-3xl font-bold text-green-500">20+</div>
                <div className="text-sm text-gray-600">Subpages</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-3xl font-bold text-purple-500">100%</div>
                <div className="text-sm text-gray-600">Free Access</div>
              </div>
            </div>

            {/* Main Pages Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">🏠</span>
                Main Pages
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {mainPages.map((page) => (
                    <a
                      key={page.path}
                      href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}${page.path}`}
                      className="block px-6 py-4 hover:bg-orange-50 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            {page.label}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{page.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Marketing Psychology Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">🧠</span>
                Marketing Psychology
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {marketingPsychologyPages.map((page) => (
                    <a
                      key={page.path}
                      href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}${page.path}`}
                      className="block px-6 py-4 hover:bg-orange-50 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            {page.label}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{page.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Growth Plateau Solutions Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">📈</span>
                Growth Plateau Solutions
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {growthPlateauPages.map((page) => (
                    <a
                      key={page.path}
                      href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}${page.path}`}
                      className="block px-6 py-4 hover:bg-orange-50 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            {page.label}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{page.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Fractional CMO Guide Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">💼</span>
                Fractional CMO Guide
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {fractionalCMOPages.map((page) => (
                    <a
                      key={page.path}
                      href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}${page.path}`}
                      className="block px-6 py-4 hover:bg-orange-50 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                            {page.label}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{page.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-6 opacity-95">
                Get a free growth analysis from our Fortune 500 experienced team.
              </p>
              <a
                href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/contact`}
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                <span>🚀</span>
                <span>Start Your Growth Journey</span>
              </a>
            </div>
          </div>
        </main>
        
        <GlobalFooter />
      </div>
    </>
  );
};

export default Sitemap;