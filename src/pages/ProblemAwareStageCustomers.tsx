import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const ProblemAwareStageCustomers = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Problem-Aware Stage Customers: When They Know Something's Wrong But Not What | Reboot Media";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real examples of problem-aware customers who know they\'re struggling but can\'t pinpoint the solution. Learn their exact pain points and how to guide them to clarity.');
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
        title="Problem-Aware Stage Customers: When They Know Something's Wrong But Not What | Reboot Media"
        description="Real examples of problem-aware customers who know they're struggling but can't pinpoint the solution. Learn their exact pain points and how to guide them to clarity."
        canonicalUrl={getCanonicalUrl('problem-aware-stage-customers')}
      />

      <div className="problem-aware-stage-page min-h-screen relative overflow-hidden">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-orange-900 via-orange-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,165,0,0.1)_0%,transparent_50%)"></div>
            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                "Something Isn't Working"
                <span className="block text-orange-500 mt-2">The Frustration of Knowing You're Stuck Without Knowing Why</span>
              </h1>
              <p className="text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                These prospects know their marketing is broken. They see competitors pulling ahead. But they're throwing solutions at the wall hoping something sticks—because they haven't diagnosed the real problem yet.
              </p>
              <div className="flex justify-center">
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Get Free Psychology Audit
                </button>
              </div>
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
              <p className="text-lg text-gradient-safe mb-6 text-center">
                Problem-aware customers are dangerous to themselves. They know enough to be worried but not enough to make smart decisions. They're buying random tools, hiring random freelancers, and changing strategies every month—burning cash without understanding why nothing works.
              </p>
            </section>

            {/* Real Customer Examples */}
            <section className="mb-12">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                <span className="block">What Problem-Aware Customers Actually Say</span>
                <span className="block">(And What They Really Need)</span>
              </h2>

              <div className="space-y-8">
                
                {/* Example 1 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-light shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-white mb-2">Customer says:</h3>
                    <p className="text-gradient-critical italic text-lg font-medium">"Our marketing isn't working anymore"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">They're measuring the wrong things. Their marketing might be working perfectly—they just can't tell because they're looking at vanity metrics instead of revenue drivers.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Help them see the measurement gap. "Most companies think their marketing is broken when really their measurement is. Let me show you the three numbers that actually predict revenue growth."</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700">It reframes their problem from "everything is broken" to "we just need better visibility." This makes the solution feel achievable instead of overwhelming.</p>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-light shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-white mb-2">Customer says:</h3>
                    <p className="text-gradient-critical italic text-lg font-medium">"We're getting traffic but no one's buying"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">They're attracting the wrong people. High traffic from people who will never buy is worse than low traffic from qualified prospects.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Show them the quality vs quantity truth. "You don't have a traffic problem, you have a targeting problem. Would you rather have 10,000 visitors and 10 sales, or 500 visitors and 50 sales?"</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700">It shifts focus from volume (which feels good but means nothing) to quality (which actually drives revenue). This insight alone can transform their business.</p>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-light shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-white mb-2">Customer says:</h3>
                    <p className="text-gradient-critical italic text-lg font-medium">"Our customer acquisition cost keeps going up"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">They're competing on the same message as everyone else. When you sound identical to competitors, the only differentiator becomes price—and costs skyrocket.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Help them find their unique angle. "CAC goes up when you're fighting for the same customers with the same message. What if we targeted a slightly different problem that only you solve well?"</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700">It reveals that high CAC isn't about spending more on ads—it's about having a differentiated message that converts better at any spend level.</p>
                  </div>
                </div>

                {/* Example 4 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-light shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-white mb-2">Customer says:</h3>
                    <p className="text-gradient-critical italic text-lg font-medium">"We tried content marketing and it didn't work"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">They created content for themselves, not their customers. Blog posts about company updates and product features that no prospect cares about.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Shift to problem-focused content. "Content marketing fails when it's about you. It succeeds when it's about your customer's expensive problems. What's the #1 question prospects ask before buying?"</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700">It reveals the difference between content (writing stuff) and content marketing (solving customer problems publicly). One builds traffic, the other builds revenue.</p>
                  </div>
                </div>

                {/* Example 5 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-light shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-white mb-2">Customer says:</h3>
                    <p className="text-gradient-critical italic text-lg font-medium">"Social media isn't driving any sales"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">They're using social media for broadcasting instead of conversation. Posting into the void and wondering why no one responds.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Teach them engagement over reach. "Social media doesn't drive sales through posts—it drives sales through relationships. Are you spending more time posting or responding to ideal customers?"</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700">It shifts social media from a publishing platform to a relationship platform. This change alone can turn social from time-waster to revenue-driver.</p>
                  </div>
                </div>

                {/* Example 6 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-light shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-white mb-2">Customer says:</h3>
                    <p className="text-gradient-critical italic text-lg font-medium">"Our sales team says leads are terrible"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">Marketing and sales aren't aligned on what a "good lead" looks like. Marketing celebrates quantity while sales needs quality.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Create a shared definition of success. "The leads aren't terrible—the handoff is. What are the three things sales needs to know about a lead to have a successful first conversation?"</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700">It stops the blame game between marketing and sales, focusing instead on creating a system where both teams win together.</p>
                  </div>
                </div>

                {/* Example 7 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-light shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-white mb-2">Customer says:</h3>
                    <p className="text-gradient-critical italic text-lg font-medium">"Competitors keep stealing our customers"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">Real problem:</h3>
                    <p className="text-gradient-safe">They're not giving customers a reason to stay. No differentiation, no relationship, no switching costs—just hoping loyalty happens by accident.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">What to do instead:</h3>
                    <p className="text-gradient-safe">Build switching costs through value. "Competitors can't steal customers who don't want to leave. What would make leaving you so painful that customers wouldn't even consider it?"</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700">It shifts focus from defending against competitors to creating such value that competition becomes irrelevant.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Key Insights Section */}
            <section className="mb-12">
              <h2 className="heading-xl text-gradient-critical mb-6 text-center">
                The Pattern: How to Help Problem-Aware Customers
              </h2>
              
              <div className="glass-card-orange rounded-xl p-6 mb-6">
                <p className="text-orange-800 mb-4">
                  <strong>Problem-aware customers don't need more tactics—they need a diagnosis.</strong>
                </p>
                <p className="text-orange-700">
                  They're drowning in symptoms without understanding the disease. Your job is to help them see the root cause clearly, so they stop wasting money on band-aid solutions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-white/20 rounded-xl">
                  <h3 className="heading-lg text-white mb-3">What NOT to do:</h3>
                  <ul className="text-gradient-safe space-y-2 text-sm">
                    <li>• Jump straight to your solution</li>
                    <li>• Add to their confusion with more options</li>
                    <li>• Validate their self-diagnosis (often wrong)</li>
                    <li>• Overwhelm them with complex frameworks</li>
                    <li>• Promise quick fixes for systematic problems</li>
                  </ul>
                </div>
                
                <div className="p-6 border border-white/20 rounded-xl">
                  <h3 className="heading-lg text-white mb-3">What TO do:</h3>
                  <ul className="text-gradient-safe space-y-2 text-sm">
                    <li>• Help them see the real root cause</li>
                    <li>• Connect symptoms to underlying problems</li>
                    <li>• Provide clarity before solutions</li>
                    <li>• Use their language to explain complex issues</li>
                    <li>• Show them what "good" actually looks like</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Strong CTA Section */}
            <section className="text-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-2xl p-12">
              <h2 className="heading-xl text-gradient-critical mb-6">
                Tired of Throwing Money at Marketing Problems That Won't Go Away?
              </h2>
              <p className="text-gradient-safe mb-8 text-lg max-w-2xl mx-auto">
                Stop guessing what's broken. Get a professional diagnosis that shows you exactly why your marketing isn't converting and the specific steps to fix it—permanently.
              </p>
              <button aria-label="Opens contact form for free marketing analysis" 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
              >
                Get Your Free Marketing Diagnosis →
              </button>
              <p className="text-gradient-safe text-sm mt-4">
                ✅ Find the real problem • ✅ Get a clear fix • ✅ Stop wasting budget
              </p>
            </section>

            {/* Navigation to Next Stage */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/unaware-stage-customers`}
                  className="text-gradient-safe hover:text-orange-400 focus-visible:text-orange-400 transition-colors"
                >
                  ← Previous: Unaware Stage Customers
                </a>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/solution-aware-stage-customers`}
                  className="text-orange-accessible hover:text-orange-700 focus-visible:text-orange-700 focus-visible:text-orange-300 font-semibold transition-colors"
                >
                  Next: Solution-Aware Stage Customers →
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

export default ProblemAwareStageCustomers;