import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const MostAwareStageCustomers = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Most Aware Stage Customers: When They're Ready to Buy | Reboot Media";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real examples of most aware customers ready to buy but needing final reassurance. Learn what actually makes them pull the trigger.');
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
        title="Most Aware Stage Customers: When They're Ready to Buy | Reboot Media"
        description="Real examples of most aware customers ready to buy but needing final reassurance. Learn what actually makes them pull the trigger."
        canonicalUrl={getCanonicalUrl('most-aware-stage-customers')}
      />

      <div className="most-aware-stage-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-8 bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)"></div>
            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                "We Want to Move Forward"
                <span className="block text-orange-500 mt-2">The Final Push That Turns Decision Into Action</span>
              </h1>
              <p className="text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                These prospects have decided. They want to work with you. But something small is holding them back from signing. Here's what that final friction really is—and how to remove it.
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
                <span className="text-orange-400">Most Aware Stage Customers</span>
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
              <p className="text-lg text-important-accessible dark:text-gradient-safe mb-6 text-center">
                Most aware customers are 95% sold. They believe in your solution, trust your expertise, and have budget approval. But that last 5%? That's where deals die. These final moments require finesse, not force.
              </p>
            </section>

            {/* Real Customer Examples */}
            <section className="mb-12">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                The Last-Minute Hesitations (And How to Dissolve Them)
              </h2>

              <div className="space-y-8">
                
                {/* Example 1 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible dark:text-white mb-2">Customer says:</h3>
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg p-4 border-l-4 border-orange-400">
                      <p className="text-gradient-critical font-medium italic text-lg">"Let me just run this by my partner/team one more time"</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-2">What's really happening:</h3>
                      <p className="text-gradient-safe font-medium">They're sold but need social proof they're making the right choice. They want reassurance, not more selling.</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-3">What to do:</h3>
                      <p className="text-gradient-safe font-medium">"Of course. Would it help if I provided a summary you can share? Also, happy to do a quick call with them to answer any specific concerns. Most clients find that speeds up the process."</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border-l-4 border-blue-500 shadow-sm">
                    <h4 className="heading-md font-semibold text-gradient-critical mb-3">Why this works:</h4>
                    <p className="text-gradient-safe font-medium leading-relaxed">You're facilitating their process, not pushing against it. This supportive approach often leads to immediate signing.</p>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible dark:text-white mb-2">Customer says:</h3>
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg p-4 border-l-4 border-orange-400">
                      <p className="text-gradient-critical font-medium italic text-lg">"Can we start next month instead?"</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-2">What's really happening:</h3>
                      <p className="text-gradient-safe font-medium">They're ready but overwhelmed. Starting feels like adding more to their plate right now.</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-3">What to do:</h3>
                      <p className="text-gradient-safe font-medium">"We can officially start next month, but I can begin the background research now so we hit the ground running. This actually saves you time—you won't need to be involved until you're ready."</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border-l-4 border-blue-500 shadow-sm">
                    <h4 className="heading-md font-semibold text-gradient-critical mb-3">Why this works:</h4>
                    <p className="text-gradient-safe font-medium leading-relaxed">You're respecting their timeline while creating value immediately. This removes the pressure while maintaining momentum.</p>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible dark:text-white mb-2">Customer says:</h3>
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg p-4 border-l-4 border-orange-400">
                      <p className="text-gradient-critical font-medium italic text-lg">"What if we need to pause or stop?"</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-2">What's really happening:</h3>
                      <p className="text-gradient-safe font-medium">Fear of commitment. They want an escape route even though they don't plan to use it.</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-3">What to do:</h3>
                      <p className="text-gradient-safe font-medium">"We work month-to-month after the first 90 days. You can pause or stop with 30 days notice. Everything we build is yours to keep. My goal is results that make you never want to leave."</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border-l-4 border-blue-500 shadow-sm">
                    <h4 className="heading-md font-semibold text-gradient-critical mb-3">Why this works:</h4>
                    <p className="text-gradient-safe font-medium leading-relaxed">Flexibility reduces fear. When leaving is easy, staying becomes a choice rather than an obligation.</p>
                  </div>
                </div>

                {/* Example 4 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible dark:text-white mb-2">Customer says:</h3>
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg p-4 border-l-4 border-orange-400">
                      <p className="text-gradient-critical font-medium italic text-lg">"Send me the contract and I'll review it"</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-2">What's really happening:</h3>
                      <p className="text-gradient-safe font-medium">They're ready but want to feel in control of the timing. Sending and waiting creates dead space where doubt creeps in.</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-3">What to do:</h3>
                      <p className="text-gradient-safe font-medium">"I'll send it right now. Want to do a quick screen share to walk through it together? Takes 5 minutes and you can sign right then if everything looks good. Much faster than email tag."</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border-l-4 border-blue-500 shadow-sm">
                    <h4 className="heading-md font-semibold text-gradient-critical mb-3">Why this works:</h4>
                    <p className="text-gradient-safe font-medium leading-relaxed">Maintaining momentum while they're emotionally ready prevents second-guessing and accelerates the close.</p>
                  </div>
                </div>

                {/* Example 5 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible dark:text-white mb-2">Customer says:</h3>
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-lg p-4 border-l-4 border-orange-400">
                      <p className="text-gradient-critical font-medium italic text-lg">"Is there any flexibility on the price?"</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-2">What's really happening:</h3>
                      <p className="text-gradient-safe font-medium">They're ready to buy but feel obligated to negotiate. It's not about money—it's about feeling like they got a win.</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                      <h3 className="text-lg font-bold text-gradient-critical mb-3">What to do:</h3>
                      <p className="text-gradient-safe font-medium">"The price is firm, but I can include an extra strategy session in month one to accelerate results. That's a $2,000 value. Would that work better for you?"</p>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border-l-4 border-blue-500 shadow-sm">
                    <h4 className="heading-md font-semibold text-gradient-critical mb-3">Why this works:</h4>
                    <p className="text-gradient-safe font-medium leading-relaxed">Adding value instead of cutting price maintains your positioning while giving them the "win" they need to feel good about the decision.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Key Insights Section */}
            <section className="mb-12">
              <h2 className="heading-xl text-gradient-critical mb-6 text-center">
                The Secret to Closing Most Aware Customers
              </h2>
              
              <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 dark:from-orange-900/30 dark:via-yellow-900/30 dark:to-orange-800/30 rounded-xl p-8 mb-6 border-2 border-orange-200 dark:border-orange-700 shadow-lg">
                <p className="text-gradient-critical text-xl font-bold mb-6 text-center">
                  Most aware customers don't need more convincing—they need permission to say yes.
                </p>
                <div className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-6 backdrop-blur-sm">
                  <p className="text-gradient-safe text-lg font-medium leading-relaxed">
                    Remove friction, not objections. Make the next step tiny. Give them control over timing. The sale is already made—your job is to make signing feel natural, not pressured.
                  </p>
                </div>
              </div>
            </section>

            {/* Strong CTA Section */}
            <section className="text-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-2xl p-12">
              <h2 className="heading-xl text-gradient-critical mb-6">
                Stop Losing Deals at the Finish Line
              </h2>
              <p className="text-gradient-safe mb-8 text-lg max-w-2xl mx-auto">
                Master the subtle art of closing without pressure. Get the psychological framework that turns "I need to think about it" into signed contracts—today.
              </p>
              <button aria-label="Opens contact form for free marketing analysis" 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
              >
                Get Your Closing Psychology Guide →
              </button>
              <p className="luminescence-layer-3 text-sm mt-4">
                ✅ Remove final friction • ✅ Close without pressure • ✅ Increase conversion rates
              </p>
            </section>

            {/* Navigation */}
            <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/product-aware-stage-customers`}
                  className="text-accessible-min dark:luminescence-layer-3 hover:text-orange-accessible focus-visible:text-orange-accessible dark:hover:text-orange-400 focus-visible:text-orange-400 transition-colors"
                >
                  ← Previous: Product-Aware Stage
                </a>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`}
                  className="text-orange-accessible dark:text-orange-400 hover:text-orange-700 focus-visible:text-orange-700 dark:hover:text-orange-300 focus-visible:text-orange-300 font-semibold transition-colors"
                >
                  Back to Marketing Psychology Overview →
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

export default MostAwareStageCustomers;