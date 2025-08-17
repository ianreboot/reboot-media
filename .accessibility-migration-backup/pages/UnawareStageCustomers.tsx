import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const UnawareStageCustomers = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Unaware Stage Customers: When They Don't Know The Problem Exists | Reboot Media";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real examples of unaware stage customers who think everything is fine. Learn what they\'re actually thinking and how to help them recognize problems they didn\'t know they had.');
    }
  }, []);

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
        title="Unaware Stage Customers: When They Don't Know The Problem Exists | Reboot Media"
        description="Real examples of unaware stage customers who think everything is fine. Learn what they're actually thinking and how to help them recognize problems they didn't know they had."
        canonicalUrl={getCanonicalUrl('unaware-stage-customers')}
      />

      <div className="unaware-stage-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-8 bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                "Everything Is Fine"
                <span className="block text-orange-500 mt-2">When Customers Don't Know They're Bleeding Money</span>
              </h1>
              <p className="text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                These prospects think their biggest problem is getting more leads. The reality? They're solving the wrong problem entirely, and every day of confusion costs them customers.
              </p>
            </div>
          </section>

          {/* Navigation Breadcrumb */}
          <section className="bg-white/5 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4">
              <nav className="flex items-center space-x-2 text-sm">
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="luminescence-layer-3 hover:text-orange-400 focus-visible:text-orange-400 transition-colors">
                  Marketing Psychology
                </a>
                <span className="text-accessible-min">→</span>
                <span className="text-orange-400">Unaware Stage Customers</span>
              </nav>
            </div>
          </section>

          {/* Main Content */}
          <main 
          id="main-content" 
          role="main"
          aria-label="Main content"
          className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-gradient-critical mb-6 text-center">
                Unaware stage customers are the most dangerous for your business. They're convinced they're doing fine when they're actually hemorrhaging opportunities. Here are real examples of what they say and what's actually happening.
              </p>
            </section>

            {/* Real Customer Examples */}
            <section className="mb-12">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                What Unaware Customers Actually Say (And What's Really Happening)
              </h2>

              <div className="space-y-8">
                
                {/* Example 1 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gradient-critical mb-2">Customer says:</h3>
                    <blockquote className="text-gradient-enhanced italic text-lg font-medium bg-orange-50/20 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                      "We built the best product but no one gets it"
                    </blockquote>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">You're speaking engineer, they're thinking business results. Your "advanced features" sound like expensive complications to someone trying to solve a simple problem.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Start with the cost of their current broken process. Instead of "Our AI-powered analytics platform," try "Stop losing $3,000 monthly to decisions made on gut feeling instead of data."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 contrast-enhanced">People buy to solve pain, not to get features. When you lead with the financial impact of their current situation, you're speaking their language: business results.</p>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gradient-critical mb-2">Customer says:</h3>
                    <blockquote className="text-gradient-enhanced italic text-lg font-medium bg-orange-50/20 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                      "We just need more traffic to our website"
                    </blockquote>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">More traffic to a broken experience just means more people saying no. They're treating symptoms while the disease spreads.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Help them see the real math. "Before sending more people to a site where 90% leave confused, let's figure out why your current visitors aren't buying. More confused people isn't the solution."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 contrast-enhanced">It reframes their thinking from "more" to "better." Most businesses fail not from lack of traffic but from poor conversion of existing traffic.</p>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gradient-critical mb-2">Customer says:</h3>
                    <blockquote className="text-gradient-enhanced italic text-lg font-medium bg-orange-50/20 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                      "Our prices are competitive, I don't know why we're not winning deals"
                    </blockquote>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">When price becomes the conversation, you've already lost. You're being compared like a commodity because you haven't shown unique value.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Change the conversation from cost to outcome. "The companies beating you aren't competing on price—they're making price irrelevant by showing specific results their solution delivers."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 contrast-enhanced">Value-focused messaging shifts the conversation from "How much does it cost?" to "What will this accomplish?" Premium pricing becomes possible when you're solving important problems.</p>
                  </div>
                </div>

                {/* Example 4 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gradient-critical mb-2">Customer says:</h3>
                    <blockquote className="text-gradient-enhanced italic text-lg font-medium bg-orange-50/20 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                      "Everyone in our industry struggles with marketing"
                    </blockquote>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">They're normalizing failure instead of recognizing opportunity. While they accept "everyone struggles," their smartest competitors are pulling ahead.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Show them the exception proves the rule. "While most companies in your space do struggle, the 15% that don't are capturing disproportionate market share. Here's what they do differently."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 contrast-enhanced">It transforms resignation into opportunity. Instead of accepting industry-wide failure, you position your solution as the differentiator that creates competitive advantage.</p>
                  </div>
                </div>

                {/* Example 5 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gradient-critical mb-2">Customer says:</h3>
                    <blockquote className="text-gradient-enhanced italic text-lg font-medium bg-orange-50/20 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                      "Our team is too busy to focus on marketing right now"
                    </blockquote>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">They're confusing activity with progress. Being "busy" often means working harder on the wrong things while competitors work smarter on the right things.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Reframe busy as expensive. "The cost of your team being too busy for marketing isn't just missed opportunities—it's working twice as hard for half the results because you're invisible to your best prospects."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 contrast-enhanced">It shows that "too busy for marketing" actually creates more work, not less. Effective marketing reduces the effort required to acquire customers, not increases it.</p>
                  </div>
                </div>

                {/* Example 6 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gradient-critical mb-2">Customer says:</h3>
                    <blockquote className="text-gradient-enhanced italic text-lg font-medium bg-orange-50/20 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-500">
                      "We've tried marketing before and it didn't work"
                    </blockquote>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">They're treating marketing like a magic button instead of a systematic process. One failed attempt makes them think the entire discipline doesn't work.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Separate strategy from tactics. "Marketing isn't one thing that either works or doesn't. The question is: did you have the right message, to the right people, at the right time? Most 'marketing failures' are actually messaging failures."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 contrast-enhanced">It shifts blame from "marketing doesn't work" to "we haven't found the right marketing approach yet." This opens the door to trying systematic, psychology-based approaches.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Key Insights Section */}
            <section className="mb-12">
              <h2 className="heading-xl text-gradient-critical mb-6 text-center">
                The Pattern: What Unaware Customers Really Need
              </h2>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-6 border border-orange-200 dark:border-orange-800">
                <p className="text-orange-800 dark:text-orange-200 mb-4 text-gradient-enhanced">
                  <strong>The unaware customer's biggest enemy isn't competition—it's comfort with dysfunction.</strong>
                </p>
                <p className="text-orange-700 dark:text-orange-300 text-gradient-safe">
                  They've normalized problems that are costing them thousands monthly. Your job isn't to sell them a solution; it's to help them see the problem clearly for the first time.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-red-200 dark:border-red-800 rounded-xl bg-red-50/20 dark:bg-red-900/20">
                  <h3 className="heading-lg text-gradient-critical mb-3 flex items-center">
                    <span className="text-red-600 dark:text-red-400 mr-2 text-2xl">✗</span>
                    What NOT to do:
                  </h3>
                  <ul className="text-gradient-safe space-y-2 text-sm">
                    <li className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> Lead with features or capabilities</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> Assume they understand the problem</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> Use industry jargon or technical terms</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> Push for immediate solutions</li>
                    <li className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> Compare yourself to competitors they don't know</li>
                  </ul>
                </div>
                
                <div className="p-6 border border-green-200 dark:border-green-800 rounded-xl bg-green-50/20 dark:bg-green-900/20">
                  <h3 className="heading-lg text-gradient-critical mb-3 flex items-center">
                    <span className="text-green-600 dark:text-green-400 mr-2 text-2xl">✓</span>
                    What TO do:
                  </h3>
                  <ul className="text-gradient-safe space-y-2 text-sm">
                    <li className="flex items-start"><span className="text-green-500 mr-2 font-bold">•</span> Start with the cost of their current situation</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2 font-bold">•</span> Use their exact language and concerns</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2 font-bold">•</span> Provide gentle education, not sales pressure</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2 font-bold">•</span> Show what success looks like for similar companies</li>
                    <li className="flex items-start"><span className="text-green-500 mr-2 font-bold">•</span> Focus on business outcomes, not tools</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Strong CTA Section */}
            <section className="text-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-2xl p-12">
              <h2 className="heading-xl text-gradient-critical mb-6">
                Are You Struggling with Customers Who Don't Even Know You Exist?
              </h2>
              <p className="text-gradient-safe mb-8 text-lg max-w-2xl mx-auto">
                Stop wasting months trying to convince people who think everything is fine. Get our systematic approach to turning unaware prospects into eager customers who finally understand what they've been missing.
              </p>
              <button aria-label="Opens contact form for free marketing analysis" 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
              >
                Get Your Free Marketing Psychology Analysis →
              </button>
              <p className="text-gradient-safe text-sm mt-4">
                ✅ Identify your biggest unaware prospect problems • ✅ Custom messaging strategy • ✅ No obligation
              </p>
            </section>

            {/* Navigation to Next Stage */}
            <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`}
                  className="text-gradient-safe hover:text-orange-accessible focus-visible:text-orange-accessible dark:hover:text-orange-400 focus-visible:text-orange-400 transition-colors"
                >
                  ← Back to Marketing Psychology Overview
                </a>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/problem-aware-stage-customers`}
                  className="text-orange-accessible dark:text-orange-400 hover:text-orange-700 focus-visible:text-orange-700 dark:hover:text-orange-300 focus-visible:text-orange-300 font-semibold transition-colors"
                >
                  Next: Problem-Aware Stage Customers →
                </a>
              </div>
            </section>

          </main>

          <GlobalFooter onShowForm={() => setShowDropdownForm(true)} />
        </div>
      </div>

    </>
  );
};

export default UnawareStageCustomers;