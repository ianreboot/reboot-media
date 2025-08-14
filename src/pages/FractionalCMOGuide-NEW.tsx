import { useEffect } from 'react';
import { getCanonicalUrl } from '../utils/urls';
import PageTemplate from '../components/PageTemplate';
import type { PageTemplateProps } from '../components/PageTemplate';

const FractionalCMOGuide = () => {
  useEffect(() => {
    document.title = "Fractional CMO vs Marketing Agency: Complete Decision Guide | Reboot Media";
    
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
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript && existingScript.textContent?.includes('Fractional CMO vs Marketing Agency')) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const pageConfig: PageTemplateProps = {
    seoProps: {
      title: "Fractional CMO vs Marketing Agency: Complete Decision Guide | Reboot Media",
      description: "Compare fractional CMO vs marketing agency vs full-time CMO. Decision criteria, costs, results, and which approach delivers faster growth for $500K-$1.5M companies.",
      canonicalUrl: getCanonicalUrl('fractional-cmo-guide'),
    },
    hero: {
      variant: 'gradient',
      gradient: 'blue',
      badge: {
        text: 'Decision Guide for Growth-Stage Companies'
      },
      title: (
        <>
          <span className="text-blue-400">Fractional CMO</span> vs 
          <span className="block text-white mt-2">Marketing Agency vs Full-Time CMO</span>
        </>
      ),
      description: 'The complete decision framework for $500K-$1.5M companies. Compare costs, results, timelines, and strategic impact to choose the approach that delivers faster, predictable growth.',
      buttons: [
        {
          text: 'Get Personalized Recommendation',
          variant: 'primary',
          size: 'lg'
        },
        {
          text: 'See Detailed Comparison',
          variant: 'outline',
          size: 'lg',
          href: '#comparison-table'
        }
      ]
    },
    content: [
      {
        id: 'introduction',
        variant: 'glass',
        content: (
          <div>
            <h2 className="heading-lg text-important dark:text-white mb-6">
              The Complete Marketing Leadership Decision Guide
            </h2>
            <p className="text-lg text-standard dark:text-gray-300 mb-6 leading-relaxed">
              Most companies waste months and thousands of dollars choosing the wrong marketing approach. This guide reveals the real decision 
              criteria behind fractional CMO, agency, full-time, and in-house options—plus when to transition between them.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">73%</div>
                <p className="text-sm text-optional dark:text-gray-400">Choose based on ego, not ROI</p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">$47K</div>
                <p className="text-sm text-optional dark:text-gray-400">Average cost of wrong choice</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">18mo</div>
                <p className="text-sm text-optional dark:text-gray-400">Wasted with poor fit</p>
              </div>
            </div>
            <p className="text-standard dark:text-gray-300 font-semibold">
              The pattern: Status decision → Wrong fit → Plateau → Switch → Growth
            </p>
          </div>
        )
      },
      {
        id: 'decision-comparison',
        title: '7 Critical Marketing Leadership Decisions',
        content: (
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Fractional CMO vs Agency */}
            <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="heading-lg text-critical dark:text-white mb-2">
                      📊 Fractional CMO vs Agency
                    </h3>
                    <p className="text-blue-100">Strategy leadership vs execution power</p>
                  </div>
                  <div className="text-3xl text-white/80">⚖️</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-standard dark:text-gray-300 mb-4 leading-relaxed">
                  Most companies think "we need execution help" when they really need strategy refinement. 
                  <strong className="text-blue-600"> Who's accountable when tactics fail?</strong>
                </p>
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-marketing-agency`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors group-hover:text-blue-700">
                  See Why Agencies Fail at Strategy →
                </a>
              </div>
            </div>

            {/* Fractional CMO vs Full-Time */}
            <div className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="heading-lg text-critical dark:text-white mb-2">
                      💼 Fractional vs Full-Time CMO
                    </h3>
                    <p className="text-blue-100">Cost efficiency vs status symbolism</p>
                  </div>
                  <div className="text-3xl text-white/80">🎯</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-standard dark:text-gray-300 mb-4 leading-relaxed">
                  "We're big enough for a full-time CMO" is often ego talking. 
                  <strong className="text-green-600"> Can you give them $200K worth of meaningful work?</strong>
                </p>
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-full-time-cmo`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors group-hover:text-blue-700">
                  Calculate If You Need $200K CMO →
                </a>
              </div>
            </div>

            {/* More comparison cards would go here... */}

          </div>
        )
      },
      {
        id: 'cta-section',
        variant: 'highlight',
        content: (
          <div className="text-center">
            <h3 className="heading-lg text-important dark:text-white mb-4">
              🚨 Stop Making the $47,000 Mistake
            </h3>
            <p className="text-lg text-standard dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              Most companies choose marketing approaches based on status or emotion, not ROI analysis. Get your free decision analysis 
              and discover which approach delivers the fastest, most predictable growth for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Free Decision Analysis
              </button>
              <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/cost-roi-analysis`} className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block">
                Calculate Your $47K Mistake
              </a>
            </div>
          </div>
        )
      },
      {
        id: 'related-resources',
        title: 'Related Marketing Leadership Resources',
        content: (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="hover:text-blue-600 transition-colors">
                  8 Proven Plateau Breakthrough Patterns →
                </a>
              </h3>
              <p className="text-standard dark:text-gray-300">
                Marketing leadership choices often follow revenue plateaus. Discover psychology-driven solutions for breaking through growth ceilings.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="hover:text-blue-600 transition-colors">
                  5 Awareness Stages That Convert →
                </a>
              </h3>
              <p className="text-standard dark:text-gray-300">
                Master the customer awareness stages and conversion psychology that separates great marketing leaders from tacticians.
              </p>
            </div>
          </div>
        )
      }
    ],
  };

  return <PageTemplate {...pageConfig} />;
};

export default FractionalCMOGuide;