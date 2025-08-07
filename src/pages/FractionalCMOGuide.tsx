import { useEffect } from 'react';
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
      "mainEntityOfPage": "https://www.rebootmedia.net/fractional-cmo-guide",
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
        canonicalUrl="https://www.rebootmedia.net/fractional-cmo-guide"
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
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              <span className="text-blue-400">Fractional CMO</span> vs 
              <span className="block text-white mt-2">Marketing Agency vs Full-Time CMO</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
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
        <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          
          {/* Quick Decision Framework */}
          <section className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Which Approach Is Right for You?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Fractional CMO */}
              <div className="border border-blue-200 dark:border-blue-800 rounded-xl p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-xl">
                <div className="text-center mb-6">
                  <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">F</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fractional CMO</h3>
                  <p className="text-blue-600 font-semibold">$5K-$15K/month</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Strategic leadership & direction</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Psychology-driven approach</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Quick start (days, not months)</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Cost-effective expertise</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Limited execution capacity</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-white dark:bg-blue-800/20 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Best For:</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Companies that need strategic direction but have execution resources</p>
                </div>
              </div>

              {/* Marketing Agency */}
              <div className="border border-orange-200 dark:border-orange-800 rounded-xl p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-xl">
                <div className="text-center mb-6">
                  <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">A</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Marketing Agency</h3>
                  <p className="text-orange-600 font-semibold">$8K-$25K/month</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Full execution capability</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Specialized team skills</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Scalable resources</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Limited strategic insight</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Executes your ideas, not strategy</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-white dark:bg-orange-800/20 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Best For:</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Companies with clear strategy needing execution power</p>
                </div>
              </div>

              {/* Full-Time CMO */}
              <div className="border border-green-200 dark:border-green-800 rounded-xl p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md shadow-xl">
                <div className="text-center mb-6">
                  <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">C</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Full-Time CMO</h3>
                  <p className="text-green-600 font-semibold">$200K-$350K/year</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Complete dedication</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Deep cultural integration</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Long-term commitment</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Expensive + benefits/equity</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">3-6 month hiring timeline</span>
                  </div>
                </div>
                <div className="mt-6 p-3 bg-white dark:bg-green-800/20 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Best For:</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">$5M+ companies with complex marketing needs</p>
                </div>
              </div>

            </div>
          </section>

          {/* Decision Criteria */}
          <section className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Key Decision Criteria for Growth-Stage Companies
            </h2>
            
            <div className="space-y-8">
              
              {/* Budget & ROI */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Budget & ROI Expectations
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-slate-600/20">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Fractional CMO</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">$60K-$180K annual cost vs $300K+ full-time equivalent</p>
                    <p className="text-xs text-blue-600 font-semibold">ROI: 300-500% in year one</p>
                  </div>
                  <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-slate-600/20">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Marketing Agency</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">$96K-$300K annual cost + tools/ad spend</p>
                    <p className="text-xs text-orange-600 font-semibold">ROI: 200-300% when strategy is clear</p>
                  </div>
                  <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-slate-600/20">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Full-Time CMO</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">$250K-$400K total compensation</p>
                    <p className="text-xs text-green-600 font-semibold">ROI: 400-600% when fully utilized</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-yellow-200/30 dark:border-yellow-800/30 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Key Insight:</strong> For $500K-$1.5M companies, fractional CMO delivers the highest ROI because you get C-level strategy without full-time overhead.
                  </p>
                </div>
              </div>

              {/* Timeline & Speed */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Timeline to Impact
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 font-bold text-lg">1-7</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Fractional CMO</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Days to start, 30-60 days to meaningful impact</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-yellow-600 font-bold text-lg">2-8</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Marketing Agency</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weeks to onboard, 60-90 days for campaigns</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-red-600 font-bold text-lg">12-24</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Full-Time CMO</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weeks to hire, 90-180 days to full productivity</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-green-200/30 dark:border-green-800/30 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-300">
                    <strong>Speed Advantage:</strong> Fractional CMOs can start immediately because they bring proven frameworks and don't need company-specific onboarding like full-time hires.
                  </p>
                </div>
              </div>

              {/* Strategic vs Tactical */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Strategic vs Tactical Focus
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Strategic Leadership (High Impact)</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-blue-500 font-bold mr-3">1st</span>
                        <span className="text-gray-700 dark:text-gray-300">Fractional CMO - Core competency</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 font-bold mr-3">2nd</span>
                        <span className="text-gray-700 dark:text-gray-300">Full-Time CMO - When dedicated</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-500 font-bold mr-3">3rd</span>
                        <span className="text-gray-700 dark:text-gray-300">Marketing Agency - Limited capability</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Tactical Execution (Scale Required)</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-orange-500 font-bold mr-3">1st</span>
                        <span className="text-gray-700 dark:text-gray-300">Marketing Agency - Core competency</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 font-bold mr-3">2nd</span>
                        <span className="text-gray-700 dark:text-gray-300">Full-Time CMO + Team</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-500 font-bold mr-3">3rd</span>
                        <span className="text-gray-700 dark:text-gray-300">Fractional CMO - Guides, doesn't execute</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-purple-200/30 dark:border-purple-800/30 rounded-lg">
                  <p className="text-sm text-purple-800 dark:text-purple-300">
                    <strong>Strategy Gap:</strong> 73% of growth-stage companies need strategic direction more than execution power. Fix the "what" and "why" before optimizing the "how."
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Detailed Comparison Table */}
          <section id="comparison-table" className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Complete Comparison: Features & Benefits
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 dark:border-gray-700 rounded-xl">
                <thead className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Factor</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Fractional CMO</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-orange-600">Marketing Agency</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">Full-Time CMO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-white/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Monthly Cost</td>
                    <td className="px-6 py-4 text-center text-blue-600 font-semibold">$5K-$15K</td>
                    <td className="px-6 py-4 text-center text-orange-600 font-semibold">$8K-$25K</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">$20K-$30K+</td>
                  </tr>
                  <tr className="hover:bg-white/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Time to Start</td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500 font-bold">1-7 days</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-500 font-bold">2-4 weeks</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-500 font-bold">3-6 months</span></td>
                  </tr>
                  <tr className="hover:bg-white/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Strategic Planning</td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500">★★★★★</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-500">★★☆☆☆</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500">★★★★★</span></td>
                  </tr>
                  <tr className="hover:bg-white/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Execution Capacity</td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-500">★★☆☆☆</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500">★★★★★</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500">★★★★☆</span></td>
                  </tr>
                  <tr className="hover:bg-white/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Industry Expertise</td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500">★★★★★</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500">★★★★☆</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-500">★★★☆☆</span></td>
                  </tr>
                  <tr className="hover:bg-white/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Cultural Integration</td>
                    <td className="px-6 py-4 text-center"><span className="text-yellow-500">★★★☆☆</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-500">★★☆☆☆</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500">★★★★★</span></td>
                  </tr>
                  <tr className="hover:bg-white/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Flexibility</td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500">★★★★★</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-green-500">★★★★☆</span></td>
                    <td className="px-6 py-4 text-center"><span className="text-red-500">★★☆☆☆</span></td>
                  </tr>
                  <tr className="hover:bg-white/50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Best for Revenue Stage</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">$500K-$5M</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">$1M-$10M+</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">$3M-$50M+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl shadow-xl border border-blue-200/30 dark:border-blue-400/30">
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-4">Decision Framework for $500K-$1.5M Companies:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Choose Fractional CMO if:</p>
                  <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                    <li>• Revenue plateau or marketing confusion</li>
                    <li>• Need strategic direction fast</li>
                    <li>• Have some execution resources</li>
                    <li>• Budget constraints for full-time hire</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Choose Agency if:</p>
                  <ul className="space-y-1 text-orange-700 dark:text-orange-300">
                    <li>• Clear strategy, need execution power</li>
                    <li>• Scaling successful campaigns</li>
                    <li>• Specific tactical expertise needed</li>
                    <li>• Have internal strategic guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Psychology-Driven Success Case Study */}
          <section className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Case Study: Why Psychology-Driven Strategy Wins
            </h2>
            
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/30 dark:border-gray-700/30 p-8">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">$850K</div>
                  <p className="text-gray-600 dark:text-gray-400">Revenue Before (Agency)</p>
                  <p className="text-sm text-red-600 mt-1">18 months plateau</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Switch</div>
                  <p className="text-gray-600 dark:text-gray-400">to Psychology-Driven</p>
                  <p className="text-sm text-blue-600 mt-1">Fractional CMO</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.1M</div>
                  <p className="text-gray-600 dark:text-gray-400">Revenue After</p>
                  <p className="text-sm text-green-600 mt-1">8 months later</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Previous Agency Approach:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• Generic "increase conversions" messaging</li>
                    <li>• Feature-focused campaigns</li>
                    <li>• One-size-fits-all landing pages</li>
                    <li>• Volume-based social proof</li>
                    <li><strong className="text-red-600">Result: 18-month revenue plateau</strong></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Psychology-Driven Strategy:</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• Customer awareness stage mapping</li>
                    <li>• Loss aversion messaging framework</li>
                    <li>• Specific peer testimonials</li>
                    <li>• Psychology-matched landing pages</li>
                    <li><strong className="text-green-600">Result: 147% growth in 8 months</strong></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  <strong>CEO Quote:</strong> "The agency was great at execution, but they were executing the wrong strategy. Our fractional CMO identified that 80% of our prospects were Problem-Aware, not Product-Aware. We completely changed our messaging and saw immediate results."
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-xs italic">- SaaS Company, Denver</p>
              </div>
            </div>
          </section>

          {/* Strategic CTA */}
          <section className="mb-8">
            <div className="text-center bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200/20 dark:border-purple-400/20 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Not Sure Which Approach Fits Your Situation?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Get a personalized recommendation based on your revenue stage, marketing maturity, and growth goals.
              </p>
              <button 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Your Personalized Recommendation →
              </button>
            </div>
          </section>

          {/* Internal Linking Section */}
          <section className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Ready to Break Through Your Growth Plateau?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  <a href="/growth-plateau-solutions" className="hover:text-blue-600 transition-colors">
                    Stuck at $1M Revenue? →
                  </a>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Discover why 67% of growth-stage companies hit revenue plateaus and the psychology fixes that break through to predictable scaling.
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  <a href="/marketing-psychology" className="hover:text-blue-600 transition-colors">
                    Master Marketing Psychology →
                  </a>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Learn the 5 customer awareness stages and conversion psychology principles that transform marketing from guesswork into predictable growth.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="text-center bg-gradient-to-br from-blue-900 via-purple-950 to-black text-white rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stop Guessing. Start Growing Predictably.
            </h2>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Whether you choose a fractional CMO, agency, or full-time hire, success comes from psychology-driven strategy. We specialize in the fractional approach for maximum ROI.
            </p>
            <div className="flex justify-center mb-6">
              <button 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Get Your Personalized CMO Strategy →
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              ✅ Psychology-driven approach • ✅ Proven track record • ✅ Results in 30-60 days • ✅ No long-term contracts
            </p>
          </section>

        </main>

        <GlobalFooter onShowForm={() => setShowDropdownForm(true)} />
        </div>
      </div>

    </>
  );
};

export default FractionalCMOGuide;