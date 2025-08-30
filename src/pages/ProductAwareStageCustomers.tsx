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
        title="Product-Aware Stage Customers: When They're Evaluating You Specifically | Reboot Media"
        description="Real examples of product-aware customers evaluating your specific solution. Learn their concerns, objections, and what makes them finally say yes."
        canonicalUrl={getCanonicalUrl('product-aware-stage-customers')}
      />

      <div className="product-aware-stage-page min-h-screen relative overflow-hidden">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-orange-900 via-orange-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,165,0,0.1)_0%,transparent_50%)"></div>
            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                "Can YOU Actually Deliver?"
                <span className="block text-orange-500 mt-2">The Final Questions Before They Say Yes</span>
              </h1>
              <p className="text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                These prospects know about you. They've read your case studies, maybe had a call. Now they're in the final evaluation—looking for reasons to trust you or walk away.
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
              <p className="text-lg text-gradient-safe mb-6 text-center font-medium">
                Product-aware customers are close. They're seriously considering you but have specific concerns holding them back. They're not questioning if they need help—they're questioning if YOU'RE the right help.
              </p>
            </section>

            {/* Real Customer Examples */}
            <section className="mb-12">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                <span className="block">The Final Objections</span>
                <span className="block">(And How to Overcome Them)</span>
              </h2>

              <div className="space-y-8">
                
                {/* Example 1 */}
                <div className="border border-white/20 rounded-xl p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible mb-2">Customer thinks:</h3>
                    <p className="text-gradient-critical italic font-medium">"Your case studies are impressive, but our business is different"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really saying:</h3>
                    <p className="text-gradient-safe">I don't see myself in your success stories. They need proof you understand their specific challenges, not just their industry.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to handle it:</h3>
                    <p className="text-gradient-safe">Get granular about similarities. "You're right, you're not exactly like Client X. But you both sell to procurement teams with 6-month sales cycles. Here's how we adapted our approach for their specific situation..."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">Acknowledging differences while highlighting relevant similarities shows you're not using a cookie-cutter approach.</p>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="border border-white/20 rounded-xl p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible mb-2">Customer thinks:</h3>
                    <p className="text-gradient-critical italic font-medium">"What if we don't see results as quickly as your other clients?"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really saying:</h3>
                    <p className="text-gradient-safe">I need to manage expectations internally. They're worried about looking bad if results don't come fast enough.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to handle it:</h3>
                    <p className="text-gradient-safe">Set realistic milestones. "Month 1 is diagnosis and quick wins. Month 2 is foundation building. Month 3 is when you see momentum. By Month 6, transformation is obvious. Here's what to expect each step."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">Clear timelines with specific milestones help them sell the patience required internally while building confidence.</p>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="border border-white/20 rounded-xl p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible mb-2">Customer thinks:</h3>
                    <p className="text-gradient-critical italic font-medium">"How do we know you won't just disappear after signing?"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really saying:</h3>
                    <p className="text-gradient-safe">We've been burned before. Past vendors over-promised in sales then under-delivered in execution.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to handle it:</h3>
                    <p className="text-gradient-safe">Show your communication cadence. "You'll have my personal phone number. Weekly status calls. Monthly executive reviews. Slack access. Here's exactly how three current clients interact with us."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">Specific communication commitments backed by current client examples makes ongoing support tangible, not theoretical.</p>
                  </div>
                </div>

                {/* Example 4 */}
                <div className="border border-white/20 rounded-xl p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible mb-2">Customer thinks:</h3>
                    <p className="text-gradient-critical italic font-medium">"We need to run this by our board/CEO/team first"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really saying:</h3>
                    <p className="text-gradient-safe">I need help selling this internally. They believe in the solution but need ammunition for stakeholders.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to handle it:</h3>
                    <p className="text-gradient-safe font-medium">Arm them for internal sales. "I'll prepare a one-page executive summary with ROI projections. Want me to join the call to answer technical questions? Here's what convinced the board at Similar Company."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">Becoming their partner in the internal sale shows confidence and makes their job easier, increasing close rates.</p>
                  </div>
                </div>

                {/* Example 5 */}
                <div className="border border-white/20 rounded-xl p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-important-accessible mb-2">Customer thinks:</h3>
                    <p className="text-gradient-critical italic font-medium">"The price is higher than we budgeted"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really saying:</h3>
                    <p className="text-gradient-safe">Help me justify this investment. They often have the money but need to defend the allocation.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to handle it:</h3>
                    <p className="text-gradient-safe font-medium">Reframe cost as investment. "The $10K monthly investment typically generates $50K in new monthly recurring revenue by month 6. But let's be conservative—even at 25% of typical results, you're profitable in 8 weeks."</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">Conservative ROI projections are more believable than aggressive ones. Under-promise and over-deliver builds trust.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Key Insights Section */}
            <section className="mb-12">
              <h2 className="heading-xl text-gradient-critical mb-6 text-center">
                The Truth About Product-Aware Customers
              </h2>
              
              <div className="bg-orange-50 rounded-xl p-6 mb-6 border border-orange-200">
                <p className="text-orange-800 mb-4 font-semibold">
                  <strong>Product-aware customers want to say yes—they just need you to make it safe.</strong>
                </p>
                <p className="text-orange-700 font-medium">
                  They've done the research. They see the value. Now they need confidence that choosing you won't make them look bad. Address the fear, not just the features.
                </p>
              </div>
            </section>

            {/* Strong CTA Section */}
            <section className="text-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-2xl p-12 border border-gray-700/50 shadow-2xl">
              <h2 className="heading-xl text-gradient-critical mb-6">
                Turn "We Need to Think About It" Into "When Can We Start?"
              </h2>
              <p className="text-gradient-safe mb-8 text-lg max-w-2xl mx-auto font-medium">
                Get the objection-handling framework that addresses their real concerns—not just surface questions. Close more deals without being pushy.
              </p>
              <button aria-label="Opens contact form for free marketing analysis" 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
              >
                Get Your Objection-Handling Playbook →
              </button>
              <p className="text-gradient-safe text-sm mt-4 font-medium">
                ✅ Address hidden concerns • ✅ Build decision confidence • ✅ Close without pressure
              </p>
            </section>

            {/* Navigation to Next Stage */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/solution-aware-stage-customers`}
                  className="text-gradient-safe hover:text-orange-accessible focus-visible:text-orange-accessible focus-visible:text-orange-400 transition-colors"
                >
                  ← Previous: Solution-Aware Stage
                </a>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/most-aware-stage-customers`}
                  className="text-orange-accessible hover:text-orange-700 focus-visible:text-orange-700 focus-visible:text-orange-300 font-semibold transition-colors"
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