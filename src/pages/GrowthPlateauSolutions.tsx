import { useState, useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';

const GrowthPlateauSolutions = () => {
  const [showForm, setShowForm] = useState(false);

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
      "mainEntityOfPage": "https://www.rebootmedia.net/growth-plateau-solutions",
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

  return (
    <>
      <SEOHead 
        title="Stuck at $1M Revenue? Growth Plateau Solutions That Work | Reboot Media"
        description="Why 67% of growth-stage companies hit revenue plateaus between $500K-$1.5M and the proven marketing psychology fixes that break through to predictable scaling."
        canonicalUrl="https://www.rebootmedia.net/growth-plateau-solutions"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <GlobalHeader onShowForm={() => setShowForm(true)} />
        
        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-br from-red-900 via-red-950 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.1)_0%,transparent_50%)]"></div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Revenue Stalled? You're Not Alone
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              <span className="text-red-400">67% of Companies</span> Hit the
              <span className="block text-white mt-2">$1M Revenue Wall</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your product works. Your team works hard. But your revenue is stuck between $500K-$1.5M. The problem isn't your business model—it's your marketing psychology. Here's how the 33% break through.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Break Through Your Plateau
              </button>
              <a 
                href="#plateau-causes" 
                className="border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                Why This Happens
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          
          {/* Problem Recognition */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Recognize Yourself Here?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              
              {/* Frustrations */}
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  These Sound Familiar?
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">▸</span>
                    "Our revenue has been flat for 8+ months"
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">▸</span>
                    "Marketing feels scattered and unfocused"
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">▸</span>
                    "Competitors are somehow outpacing us"
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">▸</span>
                    "Investors are asking tough questions"
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">▸</span>
                    "We can't seem to break past $1M consistently"
                  </li>
                </ul>
              </div>

              {/* Inner Voice */}
              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-800 dark:text-orange-300 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  What You're Thinking
                </h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">💭</span>
                    "We need more leads, but quality is suffering"
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">💭</span>
                    "Our messaging doesn't seem to resonate"
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">💭</span>
                    "Should we hire an agency or CMO?"
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">💭</span>
                    "Maybe our market is just saturated"
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">💭</span>
                    "Everyone says scale is hard, maybe this is normal"
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Strategic CTA */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                🚨 Stop Right Here: This Plateau Costs You $47,000+ Every Month
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                While you're stuck at $1M, you should be at $1.5M+ with proper marketing psychology. That's $500K+ annual difference. Every month of delay costs you qualified opportunities competitors are capturing.
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="text-red-600 dark:text-red-400 font-semibold hover:underline"
              >
                Get your plateau breakthrough analysis →
              </button>
            </div>
          </section>

          {/* Root Causes */}
          <section id="plateau-causes" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              The Real Reasons You're Stuck (It's Not What You Think)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-12 text-lg">
              After analyzing 200+ growth-stage companies, we've identified the 4 marketing psychology mistakes that create revenue plateaus. Fix these, and scaling becomes predictable.
            </p>

            <div className="space-y-8">
              
              {/* Cause 1: Curse of Knowledge */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3 flex-shrink-0">
                    <span className="text-red-600 font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">The "Curse of Knowledge" Trap</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      You know your product so well that you've forgotten how confusing it is to newcomers. Your messaging assumes knowledge your prospects don't have.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-red-600 mb-2">❌ What You Say:</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">"Our AI-powered solution leverages machine learning algorithms to optimize conversion funnels"</p>
                        </div>
                        <div>
                          <p className="font-semibold text-green-600 mb-2">✅ What They Need to Hear:</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">"Get 30% more customers from your existing website traffic without changing your prices"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cause 2: Wrong Awareness Stage */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-3 flex-shrink-0">
                    <span className="text-orange-600 font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Targeting the Wrong Awareness Stage</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      You're using "buy now" messaging for people who don't even know they have a problem. Or educational content for people ready to purchase.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 dark:text-white mb-3">The 5 Customer Awareness Stages:</p>
                      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-red-400 rounded-full mr-3"></span>
                          <span><strong>Unaware:</strong> Don't know they have a problem → Problem education</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-orange-400 rounded-full mr-3"></span>
                          <span><strong>Problem-Aware:</strong> Know problem, not solutions → Solution categories</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
                          <span><strong>Solution-Aware:</strong> Comparing options → Why you're different</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                          <span><strong>Product-Aware:</strong> Evaluating you → Objection handling</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                          <span><strong>Most Aware:</strong> Ready to buy → Remove friction</span>
                        </div>
                      </div>
                      <p className="text-red-600 font-semibold mt-3 text-sm">Most plateau companies target all stages with the same message. That's why conversions are flat.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cause 3: No Loss Aversion */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3 flex-shrink-0">
                    <span className="text-yellow-600 font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Ignoring Loss Aversion Psychology</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      People are 2.5x more motivated to avoid loss than gain benefit. Your messaging focuses on gains while competitors use loss aversion to win deals.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-blue-600 mb-2">💡 Gain-Focused (Weak):</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">"Increase your revenue by 30%"</p>
                        </div>
                        <div>
                          <p className="font-semibold text-red-600 mb-2">🔥 Loss Aversion (Powerful):</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">"Don't lose 30% of potential revenue to broken messaging"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cause 4: Weak Social Proof */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 flex-shrink-0">
                    <span className="text-green-600 font-bold text-xl">4</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Generic Social Proof That Doesn't Convert</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      "Trusted by thousands" means nothing. Your prospects need specific social proof from people in their exact situation with measurable results.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-red-600 mb-1 text-sm">❌ Generic:</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">"Trusted by 10,000+ companies"</p>
                        </div>
                        <div>
                          <p className="font-semibold text-green-600 mb-1 text-sm">✅ Specific:</p>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">"How Sarah's $800K SaaS company broke through to $2.1M in 8 months using psychology-driven messaging"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Strategic CTA */}
          <section className="mb-16">
            <div className="text-center bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-800/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Stop Losing $47K Monthly to Plateau Psychology
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Every month you delay fixing these psychology mistakes, competitors are capturing the growth that should be yours. Get your free plateau breakthrough analysis.
              </p>
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mr-4"
              >
                Get Free Plateau Analysis
              </button>
              <a 
                href="#breakthrough-framework" 
                className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block"
              >
                See the Solution
              </a>
            </div>
          </section>

          {/* Breakthrough Framework */}
          <section id="breakthrough-framework" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              The Psychology-Driven Breakthrough Framework
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-12 text-lg">
              The 33% of companies that break through plateaus use this systematic approach. It's not about working harder—it's about marketing psychology that actually converts.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              
              {/* Step 1 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-green-50 dark:bg-green-900/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Customer Awareness Audit</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Map your prospects' awareness stages and identify messaging mismatches that kill conversions.
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>• Survey existing customers about their buying journey</li>
                  <li>• Analyze competitor messaging by awareness stage</li>
                  <li>• Identify gaps where prospects get confused</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-blue-50 dark:bg-blue-900/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Loss Aversion Messaging</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Reframe your value proposition around what prospects lose by not acting.
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>• Calculate the cost of inaction for your prospects</li>
                  <li>• Rewrite headlines using loss aversion psychology</li>
                  <li>• Test urgency without fake scarcity</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-orange-50 dark:bg-orange-900/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Specific Social Proof</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Replace generic testimonials with specific peer success stories.
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>• Collect detailed customer transformation stories</li>
                  <li>• Focus on similar company size and industry</li>
                  <li>• Include specific metrics and timeframes</li>
                </ul>
              </div>

              {/* Step 4 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-purple-50 dark:bg-purple-900/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Systematic Testing</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Test psychological triggers systematically, not randomly.
                </p>
                <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                  <li>• A/B test awareness-matched messaging</li>
                  <li>• Measure conversion at each funnel stage</li>
                  <li>• Scale what works, kill what doesn't</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Case Study */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Case Study: How We Broke Through a 14-Month Plateau
            </h2>
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">$1.1M</div>
                  <p className="text-gray-600 dark:text-gray-400">Stuck Revenue (14 months)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.8M</div>
                  <p className="text-gray-600 dark:text-gray-400">New Revenue (8 months later)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">154%</div>
                  <p className="text-gray-600 dark:text-gray-400">Revenue Growth</p>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">SaaS Company: The Breakthrough Process</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">The Problem:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Revenue stuck at $1.1M for 14 months</li>
                      <li>• Marketing qualified leads were flat</li>
                      <li>• Conversion rates declining month-over-month</li>
                      <li>• CEO getting pressure from board</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">The Psychology Fixes:</h4>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Mapped 85% of prospects to Problem-Aware stage</li>
                      <li>• Switched from feature-focused to problem-amplification messaging</li>
                      <li>• Added loss aversion: "Don't lose deals to manual processes"</li>
                      <li>• Replaced generic testimonials with peer case studies</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">The Breakthrough Moment:</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    "We discovered our prospects weren't looking for a 'CRM solution'—they were desperately trying to solve 'deal leakage.' When we changed our headline from 'Advanced CRM Features' to 'Stop Losing Deals to Broken Follow-Up,' conversions jumped 340% in 30 days."
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 italic">- CEO, Midwest SaaS Company</p>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Linking Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Master the Psychology Behind Breakthrough Growth
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  <a href="/marketing-psychology" className="hover:text-red-600 transition-colors">
                    Learn Marketing Psychology Fundamentals →
                  </a>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Master the 5 customer awareness stages and conversion psychology principles that transform scattered marketing into predictable revenue growth.
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  <a href="/fractional-cmo-guide" className="hover:text-red-600 transition-colors">
                    Need Strategic Marketing Leadership? →
                  </a>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Compare fractional CMO vs agency approaches and discover which delivers faster plateau breakthrough results for your specific situation.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="text-center bg-gradient-to-br from-red-900 via-red-950 to-black text-white rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stop Accepting Plateau Revenue as "Normal"
            </h2>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              The 33% who break through aren't smarter—they just understand marketing psychology. Every month you wait is another $47K+ of growth your competitors capture instead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Break Through Your Revenue Plateau
              </button>
              <a 
                href="/contact" 
                className="border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                Schedule Breakthrough Call
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              ✅ Free plateau analysis • ✅ Psychology-driven roadmap • ✅ No obligation • ✅ 67% breakthrough rate
            </p>
          </section>

        </main>

        <GlobalFooter onShowForm={() => setShowForm(true)} />
      </div>

      {/* Form Modal Placeholder */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Break Through Your Plateau</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Get your free plateau analysis and discover the specific psychology mistakes keeping your revenue stuck between $500K-$1.5M.
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

export default GrowthPlateauSolutions;