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
              <h1 className="heading-hero text-critical dark:text-white mb-6 leading-tight">
                "Everything Is Fine"
                <span className="block text-orange-500 mt-2">When Customers Don't Know They're Bleeding Money</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                These prospects think their biggest problem is getting more leads. The reality? They're solving the wrong problem entirely, and every day of confusion costs them customers.
              </p>
            </div>
          </section>

          {/* Navigation Breadcrumb */}
          <section className="bg-white/5 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4">
              <nav className="flex items-center space-x-2 text-sm">
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="text-gray-400 hover:text-orange-400 transition-colors">
                  Marketing Psychology
                </a>
                <span className="text-gray-600">→</span>
                <span className="text-orange-400">Unaware Stage Customers</span>
              </nav>
            </div>
          </section>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-important dark:text-gray-300 mb-6">
                Unaware stage customers are the most dangerous for your business. They're convinced they're doing fine when they're actually hemorrhaging opportunities. Here are real examples of what they say and what's actually happening.
              </p>
            </section>

            {/* Real Customer Examples */}
            <section className="mb-12">
              <h2 className="heading-xl text-critical dark:text-white mb-8">
                What Unaware Customers Actually Say (And What's Really Happening)
              </h2>

              <div className="space-y-8">
                
                {/* Example 1 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer says:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"We built the best product but no one gets it"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-standard dark:text-gray-300">You're speaking engineer, they're thinking business results. Your "advanced features" sound like expensive complications to someone trying to solve a simple problem.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-standard dark:text-gray-300">Start with the cost of their current broken process. Instead of "Our AI-powered analytics platform," try "Stop losing $3,000 monthly to decisions made on gut feeling instead of data."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">People buy to solve pain, not to get features. When you lead with the financial impact of their current situation, you're speaking their language: business results.</p>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer says:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"We just need more traffic to our website"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-standard dark:text-gray-300">More traffic to a broken experience just means more people saying no. They're treating symptoms while the disease spreads.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-standard dark:text-gray-300">Help them see the real math. "Before sending more people to a site where 90% leave confused, let's figure out why your current visitors aren't buying. More confused people isn't the solution."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">It reframes their thinking from "more" to "better." Most businesses fail not from lack of traffic but from poor conversion of existing traffic.</p>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer says:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"Our prices are competitive, I don't know why we're not winning deals"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-standard dark:text-gray-300">When price becomes the conversation, you've already lost. You're being compared like a commodity because you haven't shown unique value.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-standard dark:text-gray-300">Change the conversation from cost to outcome. "The companies beating you aren't competing on price—they're making price irrelevant by showing specific results their solution delivers."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Value-focused messaging shifts the conversation from "How much does it cost?" to "What will this accomplish?" Premium pricing becomes possible when you're solving important problems.</p>
                  </div>
                </div>

                {/* Example 4 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer says:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"Everyone in our industry struggles with marketing"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-standard dark:text-gray-300">They're normalizing failure instead of recognizing opportunity. While they accept "everyone struggles," their smartest competitors are pulling ahead.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-standard dark:text-gray-300">Show them the exception proves the rule. "While most companies in your space do struggle, the 15% that don't are capturing disproportionate market share. Here's what they do differently."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">It transforms resignation into opportunity. Instead of accepting industry-wide failure, you position your solution as the differentiator that creates competitive advantage.</p>
                  </div>
                </div>

                {/* Example 5 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer says:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"Our team is too busy to focus on marketing right now"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-standard dark:text-gray-300">They're confusing activity with progress. Being "busy" often means working harder on the wrong things while competitors work smarter on the right things.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-standard dark:text-gray-300">Reframe busy as expensive. "The cost of your team being too busy for marketing isn't just missed opportunities—it's working twice as hard for half the results because you're invisible to your best prospects."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">It shows that "too busy for marketing" actually creates more work, not less. Effective marketing reduces the effort required to acquire customers, not increases it.</p>
                  </div>
                </div>

                {/* Example 6 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer says:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"We've tried marketing before and it didn't work"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                    <p className="text-standard dark:text-gray-300">They're treating marketing like a magic button instead of a systematic process. One failed attempt makes them think the entire discipline doesn't work.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                    <p className="text-standard dark:text-gray-300">Separate strategy from tactics. "Marketing isn't one thing that either works or doesn't. The question is: did you have the right message, to the right people, at the right time? Most 'marketing failures' are actually messaging failures."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">It shifts blame from "marketing doesn't work" to "we haven't found the right marketing approach yet." This opens the door to trying systematic, psychology-based approaches.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Key Insights Section */}
            <section className="mb-12">
              <h2 className="heading-xl text-critical dark:text-white mb-6">
                The Pattern: What Unaware Customers Really Need
              </h2>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-6">
                <p className="text-orange-800 dark:text-orange-200 mb-4">
                  <strong>The unaware customer's biggest enemy isn't competition—it's comfort with dysfunction.</strong>
                </p>
                <p className="text-orange-700 dark:text-orange-300">
                  They've normalized problems that are costing them thousands monthly. Your job isn't to sell them a solution; it's to help them see the problem clearly for the first time.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <h3 className="heading-lg text-important dark:text-white mb-3">What NOT to do:</h3>
                  <ul className="text-standard dark:text-gray-300 space-y-2 text-sm">
                    <li>• Lead with features or capabilities</li>
                    <li>• Assume they understand the problem</li>
                    <li>• Use industry jargon or technical terms</li>
                    <li>• Push for immediate solutions</li>
                    <li>• Compare yourself to competitors they don't know</li>
                  </ul>
                </div>
                
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <h3 className="heading-lg text-important dark:text-white mb-3">What TO do:</h3>
                  <ul className="text-standard dark:text-gray-300 space-y-2 text-sm">
                    <li>• Start with the cost of their current situation</li>
                    <li>• Use their exact language and concerns</li>
                    <li>• Provide gentle education, not sales pressure</li>
                    <li>• Show what success looks like for similar companies</li>
                    <li>• Focus on business outcomes, not tools</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Strong CTA Section */}
            <section className="text-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-2xl p-12">
              <h2 className="heading-xl text-critical dark:text-white mb-6">
                Are You Struggling with Customers Who Don't Even Know You Exist?
              </h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Stop wasting months trying to convince people who think everything is fine. Get our systematic approach to turning unaware prospects into eager customers who finally understand what they've been missing.
              </p>
              <button 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Get Your Free Marketing Psychology Analysis →
              </button>
              <p className="text-gray-400 text-sm mt-4">
                ✅ Identify your biggest unaware prospect problems • ✅ Custom messaging strategy • ✅ No obligation
              </p>
            </section>

            {/* Navigation to Next Stage */}
            <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  ← Back to Marketing Psychology Overview
                </a>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/problem-aware-stage-customers`}
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors"
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