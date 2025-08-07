import { useState, useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';

const MarketingPsychology = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = "Marketing Psychology Principles That Drive Conversions | Reboot Media";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master the 5 customer awareness stages and conversion psychology principles that transform marketing from guesswork into predictable revenue growth. Used by 500+ companies worldwide.');
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'marketing psychology, customer awareness stages, conversion psychology, behavioral marketing, psychology-driven marketing');
    
    // Add JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Marketing Psychology Principles That Drive Conversions",
      "description": "Master the 5 customer awareness stages and conversion psychology principles that transform marketing from guesswork into predictable revenue growth.",
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
      "mainEntityOfPage": "https://www.rebootmedia.net/marketing-psychology",
      "datePublished": "2025-01-01",
      "dateModified": "2025-01-01"
    });
    document.head.appendChild(script);
    
    return () => {
      // Cleanup JSON-LD script
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="Marketing Psychology Principles That Drive Conversions | Reboot Media"
        description="Master the 5 customer awareness stages and conversion psychology principles that transform marketing from guesswork into predictable revenue growth. Used by 500+ companies worldwide."
        canonicalUrl="https://www.rebootmedia.net/marketing-psychology"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <GlobalHeader onShowForm={() => setShowForm(true)} />
        
        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)]"></div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Stop Guessing. Start Converting.
              <span className="block text-orange-500 mt-2">Master Marketing Psychology</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The 5 customer awareness stages and conversion psychology principles that transform scattered marketing into predictable revenue growth. Used by Fortune 500 companies and growth-stage businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Get Free Psychology Audit
              </button>
              <a 
                href="#awareness-stages" 
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                Learn the Framework
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          
          {/* Problem Introduction */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Why 73% of Marketing Campaigns Fail to Convert
            </h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Most businesses are throwing marketing messages at prospects without understanding <strong>where they are in the buying journey</strong>. They're using product-focused messaging for people who don't even know they have a problem yet. They're creating urgency for prospects who haven't built trust yet.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                The result? Marketing that feels like shouting into the void. Campaigns that burn through budget without generating qualified leads. Teams frustrated by "marketing that doesn't work."
              </p>
            </div>
            
            {/* Strategic CTA */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
              <p className="text-gray-800 dark:text-gray-200 font-semibold mb-4">
                🚨 <strong>Warning:</strong> Every day you use psychology-ignorant marketing costs you qualified prospects
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="text-orange-600 dark:text-orange-400 font-semibold hover:underline"
              >
                Get your free marketing psychology audit →
              </button>
            </div>
          </section>

          {/* Customer Awareness Stages */}
          <section id="awareness-stages" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              The 5 Customer Awareness Stages Framework
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-12 text-lg">
              Created by legendary copywriter Eugene Schwartz, this framework reveals exactly how to match your message to your prospect's mindset. Master this, and marketing becomes predictable.
            </p>

            <div className="space-y-12">
              
              {/* Stage 1: Unaware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3">
                    <span className="text-red-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unaware Stage</h3>
                    <p className="text-gray-600 dark:text-gray-400">They don't know they have a problem</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What They're Thinking:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• "Our marketing is doing fine"</li>
                      <li>• "We just need more leads"</li>
                      <li>• "Everyone struggles with marketing"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Your Message Strategy:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Problem education and statistics</li>
                      <li>• "Did you know..." frameworks</li>
                      <li>• Industry benchmarks and gaps</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Example Headline:</p>
                  <p className="text-gray-900 dark:text-white">"Why 67% of Growth-Stage Companies Hit Revenue Plateaus (And How the 33% Break Through)"</p>
                </div>
              </div>

              {/* Stage 2: Problem-Aware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-3">
                    <span className="text-orange-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Problem-Aware Stage</h3>
                    <p className="text-gray-600 dark:text-gray-400">They know they have a problem but not the solution</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What They're Thinking:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• "Our marketing isn't working"</li>
                      <li>• "We're stuck at the same revenue"</li>
                      <li>• "Competitors are outpacing us"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Your Message Strategy:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Solution categories and options</li>
                      <li>• Problem amplification (carefully)</li>
                      <li>• "Why this happens" explanations</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Example Headline:</p>
                  <p className="text-gray-900 dark:text-white">"Why Your Marketing Feels Scattered (And the 3 Systems That Fix It)"</p>
                </div>
              </div>

              {/* Stage 3: Solution-Aware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3">
                    <span className="text-yellow-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Solution-Aware Stage</h3>
                    <p className="text-gray-600 dark:text-gray-400">They know solutions exist and are comparing options</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What They're Thinking:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• "Should we hire an agency or consultant?"</li>
                      <li>• "What's the best approach?"</li>
                      <li>• "Who can we trust with this?"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Your Message Strategy:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Comparative advantages</li>
                      <li>• Social proof and case studies</li>
                      <li>• "Why X vs Y" content</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Example Headline:</p>
                  <p className="text-gray-900 dark:text-white">"Marketing Agency vs Fractional CMO: Which Drives Faster Growth?"</p>
                </div>
              </div>

              {/* Stage 4: Product-Aware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
                    <span className="text-green-600 font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product-Aware Stage</h3>
                    <p className="text-gray-600 dark:text-gray-400">They know your solution and are evaluating you specifically</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What They're Thinking:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• "Can they deliver results for us?"</li>
                      <li>• "What's their track record?"</li>
                      <li>• "Is this worth the investment?"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Your Message Strategy:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Specific benefits and results</li>
                      <li>• Objection handling</li>
                      <li>• Risk reversal and guarantees</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Example Headline:</p>
                  <p className="text-gray-900 dark:text-white">"How We Grew Norton's Affiliate Program from $100K to $3M Monthly Revenue"</p>
                </div>
              </div>

              {/* Stage 5: Most Aware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3">
                    <span className="text-blue-600 font-bold text-lg">5</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Most Aware Stage</h3>
                    <p className="text-gray-600 dark:text-gray-400">They're ready to buy and just need the final push</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What They're Thinking:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• "Let's move forward"</li>
                      <li>• "What are the next steps?"</li>
                      <li>• "When can we start?"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Your Message Strategy:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Clear calls to action</li>
                      <li>• Friction removal</li>
                      <li>• Gentle urgency creation</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Example Headline:</p>
                  <p className="text-gray-900 dark:text-white">"Schedule Your Free Strategy Call - Limited to 8 Clients This Quarter"</p>
                </div>
              </div>

            </div>
          </section>

          {/* Conversion Psychology Triggers */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              The 4 Psychological Triggers That Drive Action
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              
              {/* Loss Aversion */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Loss Aversion</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  People are 2.5x more motivated to avoid loss than gain benefit. Frame your value proposition around what they'll lose by not acting.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Instead of:</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">"Get 30% more leads"</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Say:</p>
                  <p className="text-gray-900 dark:text-white font-medium">"Don't lose 30% of potential leads to broken messaging"</p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Social Proof</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  People follow what others like them are doing. Use peer testimonials, expert endorsements, and usage indicators strategically.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Hierarchy:</p>
                  <p className="text-gray-900 dark:text-white">1. Peer testimonials</p>
                  <p className="text-gray-900 dark:text-white">2. Expert endorsements</p>
                  <p className="text-gray-900 dark:text-white">3. Media mentions</p>
                  <p className="text-gray-900 dark:text-white">4. Usage statistics</p>
                </div>
              </div>

              {/* Scarcity */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Scarcity & Urgency</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Limited availability creates urgency. But it must be authentic - fake scarcity destroys trust faster than any other mistake.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Authentic Example:</p>
                  <p className="text-gray-900 dark:text-white">"Limited to 8 clients for personalized attention" (if actually true)</p>
                </div>
              </div>

              {/* Authority */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Authority Positioning</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  People trust experts. Build authority through expertise signals, process transparency, and educational content.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Authority Signals:</p>
                  <p className="text-gray-900 dark:text-white">• Years of experience</p>
                  <p className="text-gray-900 dark:text-white">• Specific credentials</p>
                  <p className="text-gray-900 dark:text-white">• Detailed case studies</p>
                </div>
              </div>

            </div>

            {/* Strategic CTA */}
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Transform Your Marketing with Psychology?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Don't let another month pass with marketing that ignores how customers actually think. Get your free psychology audit and discover exactly where your messaging is missing the mark.
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Your Free Marketing Psychology Audit
              </button>
            </div>
          </section>

          {/* Case Study Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Real Results: Norton Affiliate Program Case Study
            </h2>
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">$100K</div>
                  <p className="text-gray-600 dark:text-gray-400">Monthly Revenue (Before)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$3M</div>
                  <p className="text-gray-600 dark:text-gray-400">Monthly Revenue (After)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">30X</div>
                  <p className="text-gray-600 dark:text-gray-400">Growth Multiple</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">The Psychology Strategy That Worked:</h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Customer Awareness Mapping:</strong> Identified that affiliates were Solution-Aware, not Problem-Aware</li>
                  <li><strong>Loss Aversion Messaging:</strong> "Don't miss high-converting security offers while competition grabs market share"</li>
                  <li><strong>Social Proof Hierarchy:</strong> Featured top-performing affiliate testimonials prominently</li>
                  <li><strong>Authority Building:</strong> Positioned as the security marketing experts with proven conversion data</li>
                </ul>
                <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Key Insight:</p>
                  <p className="text-gray-900 dark:text-white">
                    "The breakthrough came when we stopped talking about Norton's features and started talking about the affiliate's fear of missing profitable opportunities."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Linking Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Master These Psychology Principles in Your Business
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  <a href="/growth-plateau-solutions" className="hover:text-orange-600 transition-colors">
                    Stuck in a Growth Plateau? →
                  </a>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Learn why 67% of companies hit revenue plateaus and the psychological triggers that break through them.
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  <a href="/fractional-cmo-guide" className="hover:text-orange-600 transition-colors">
                    Fractional CMO vs Agency →
                  </a>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Discover which approach delivers faster results when you need strategic marketing psychology expertise.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="text-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't Let Psychology-Ignorant Marketing Cost You More Revenue
            </h2>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              Every day you delay implementing these psychology principles, competitors are capturing prospects with messages that actually convert. Get your free audit now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Get Free Marketing Psychology Audit
              </button>
              <a 
                href="/contact" 
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                Schedule Strategy Call
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              ✅ 30-minute strategy session • ✅ Custom psychology audit • ✅ No obligation
            </p>
          </section>

        </main>

        <GlobalFooter onShowForm={() => setShowForm(true)} />
      </div>

      {/* Form Modal Placeholder */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Your Free Psychology Audit</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We'll analyze your current marketing through the customer awareness lens and show you exactly where conversions are being lost.
            </p>
            <button 
              onClick={() => setShowForm(false)}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
            >
              Close (Form Integration Pending)
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketingPsychology;