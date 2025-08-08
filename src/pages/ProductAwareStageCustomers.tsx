import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const ProductAwareStageCustomers = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Product-Aware Stage Customers: When They're Evaluating You Specifically | Reboot Media";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real examples of product-aware customers evaluating your specific solution. Learn their concerns, objections, and what makes them finally say yes.');
    }
  }, []);

  return (
    <>
      <SEOHead 
        title="Product-Aware Stage Customers: When They're Evaluating You Specifically | Reboot Media"
        description="Real examples of product-aware customers evaluating your specific solution. Learn their concerns, objections, and what makes them finally say yes."
        canonicalUrl={getCanonicalUrl('product-aware-stage-customers')}
      />

      <div className="product-aware-stage-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-8 bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)"></div>
            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="heading-hero text-critical dark:text-white mb-6 leading-tight">
                "Can YOU Actually Deliver?"
                <span className="block text-orange-500 mt-2">The Final Questions Before They Say Yes</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                These prospects know about you. They've read your case studies, maybe had a call. Now they're in the final evaluation—looking for reasons to trust you or walk away.
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
                <span className="text-orange-400">Product-Aware Stage Customers</span>
              </nav>
            </div>
          </section>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-important dark:text-gray-300 mb-6">
                Product-aware customers are close. They're seriously considering you but have specific concerns holding them back. They're not questioning if they need help—they're questioning if YOU'RE the right help.
              </p>
            </section>

            {/* Real Customer Examples */}
            <section className="mb-12">
              <h2 className="heading-xl text-critical dark:text-white mb-8">
                The Final Objections (And How to Overcome Them)
              </h2>

              <div className="space-y-8">
                
                {/* Example 1 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer thinks:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"Your case studies are impressive, but our business is different"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">What they're really saying:</h3>
                    <p className="text-standard dark:text-gray-300">I don't see myself in your success stories. They need proof you understand their specific challenges, not just their industry.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">How to handle it:</h3>
                    <p className="text-standard dark:text-gray-300">Get granular about similarities. "You're right, you're not exactly like Client X. But you both sell to procurement teams with 6-month sales cycles. Here's how we adapted our approach for their specific situation..."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Acknowledging differences while highlighting relevant similarities shows you're not using a cookie-cutter approach.</p>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer thinks:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"What if we don't see results as quickly as your other clients?"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">What they're really saying:</h3>
                    <p className="text-standard dark:text-gray-300">I need to manage expectations internally. They're worried about looking bad if results don't come fast enough.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">How to handle it:</h3>
                    <p className="text-standard dark:text-gray-300">Set realistic milestones. "Month 1 is diagnosis and quick wins. Month 2 is foundation building. Month 3 is when you see momentum. By Month 6, transformation is obvious. Here's what to expect each step."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Clear timelines with specific milestones help them sell the patience required internally while building confidence.</p>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer thinks:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"How do we know you won't just disappear after signing?"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">What they're really saying:</h3>
                    <p className="text-standard dark:text-gray-300">We've been burned before. Past vendors over-promised in sales then under-delivered in execution.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">How to handle it:</h3>
                    <p className="text-standard dark:text-gray-300">Show your communication cadence. "You'll have my personal phone number. Weekly status calls. Monthly executive reviews. Slack access. Here's exactly how three current clients interact with us."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Specific communication commitments backed by current client examples makes ongoing support tangible, not theoretical.</p>
                  </div>
                </div>

                {/* Example 4 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer thinks:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"We need to run this by our board/CEO/team first"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">What they're really saying:</h3>
                    <p className="text-standard dark:text-gray-300">I need help selling this internally. They believe in the solution but need ammunition for stakeholders.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">How to handle it:</h3>
                    <p className="text-standard dark:text-gray-300">Arm them for internal sales. "I'll prepare a one-page executive summary with ROI projections. Want me to join the call to answer technical questions? Here's what convinced the board at Similar Company."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Becoming their partner in the internal sale shows confidence and makes their job easier, increasing close rates.</p>
                  </div>
                </div>

                {/* Example 5 */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important dark:text-white mb-2">Customer thinks:</h3>
                    <p className="text-standard dark:text-gray-300 italic">"The price is higher than we budgeted"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">What they're really saying:</h3>
                    <p className="text-standard dark:text-gray-300">Help me justify this investment. They often have the money but need to defend the allocation.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">How to handle it:</h3>
                    <p className="text-standard dark:text-gray-300">Reframe cost as investment. "The $10K monthly investment typically generates $50K in new monthly recurring revenue by month 6. But let's be conservative—even at 25% of typical results, you're profitable in 8 weeks."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Conservative ROI projections are more believable than aggressive ones. Under-promise and over-deliver builds trust.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Key Insights Section */}
            <section className="mb-12">
              <h2 className="heading-xl text-critical dark:text-white mb-6">
                The Truth About Product-Aware Customers
              </h2>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-6">
                <p className="text-orange-800 dark:text-orange-200 mb-4">
                  <strong>Product-aware customers want to say yes—they just need you to make it safe.</strong>
                </p>
                <p className="text-orange-700 dark:text-orange-300">
                  They've done the research. They see the value. Now they need confidence that choosing you won't make them look bad. Address the fear, not just the features.
                </p>
              </div>
            </section>

            {/* Strong CTA Section */}
            <section className="text-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-2xl p-12">
              <h2 className="heading-xl text-critical dark:text-white mb-6">
                Turn "We Need to Think About It" Into "When Can We Start?"
              </h2>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Get the objection-handling framework that addresses their real concerns—not just surface questions. Close more deals without being pushy.
              </p>
              <button 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Get Your Objection-Handling Playbook →
              </button>
              <p className="text-gray-400 text-sm mt-4">
                ✅ Address hidden concerns • ✅ Build decision confidence • ✅ Close without pressure
              </p>
            </section>

            {/* Navigation to Next Stage */}
            <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/solution-aware-stage-customers`}
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  ← Previous: Solution-Aware Stage
                </a>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/most-aware-stage-customers`}
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors"
                >
                  Next: Most Aware Stage →
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

export default ProductAwareStageCustomers;