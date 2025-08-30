import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const SolutionAwareStageCustomers = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Solution-Aware Stage Customers: When They're Comparing Options | Reboot Media";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real examples of solution-aware customers comparing agencies, consultants, and tools. Learn what they actually care about when evaluating options and how to stand out.');
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
        title="Solution-Aware Stage Customers: When They're Comparing Options | Reboot Media"
        description="Real examples of solution-aware customers comparing agencies, consultants, and tools. Learn what they actually care about when evaluating options and how to stand out."
        canonicalUrl={getCanonicalUrl('solution-aware-stage-customers')}
      />

      <div className="solution-aware-stage-page min-h-screen relative overflow-hidden">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-orange-900 via-orange-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,165,0,0.1)_0%,transparent_50%)"></div>
            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 className="heading-hero text-gray-800 mb-6 leading-tight">
                "Which One Should We Choose?"
                <span className="block text-orange-500 mt-2">When Every Option Looks the Same (And Why They Don't)</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                These prospects know they need marketing help. They're comparing agencies, consultants, tools, and in-house options. But everyone's saying the same thing—"We drive growth." Here's what they're really thinking.
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
              <div className="glass-card-minimal rounded-xl p-8 border border-white/20">
                <p className="text-lg text-white/90 mb-6 text-center font-medium">
                  Solution-aware customers are overwhelmed. They've got 10 browser tabs open, 5 sales calls scheduled, and a spreadsheet comparing options that all sound identical. They're not looking for another pitch—they're looking for clarity on why one option is actually different.
                </p>
              </div>
            </section>

            {/* Real Customer Examples */}
            <section className="mb-12">
              <h2 className="heading-xl text-gray-800 mb-8 text-center">
                What Solution-Aware Customers Actually Think (And How to Win Them)
              </h2>

              <div className="space-y-8">
                
                {/* Example 1 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-medium shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gray-900 mb-2">Customer thinks:</h3>
                    <p className="text-gray-800 italic font-medium">"Should we hire an agency, a consultant, or build in-house?"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really asking:</h3>
                    <p className="text-gray-700">Who can actually deliver results without creating more work for us? They're weighing speed, control, expertise, and internal politics.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to position yourself:</h3>
                    <p className="text-gray-700">Show the hidden costs of each option. "Agencies give you execution but not strategy. In-house gives you control but takes 6 months to ramp. A fractional CMO gives you both strategy and execution starting week one."</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">It moves beyond features to outcomes. You're not selling a service category—you're selling the fastest path to their specific goal.</p>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-medium shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gray-900 mb-2">Customer thinks:</h3>
                    <p className="text-gray-800 italic font-medium">"Everyone says they're data-driven and results-focused"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really asking:</h3>
                    <p className="text-gray-700">Show me proof that works for companies exactly like mine. Generic case studies mean nothing—they want to see themselves in your success stories.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to position yourself:</h3>
                    <p className="text-gray-700">Get specific about your sweet spot. "We specifically help B2B SaaS companies between $1M-$5M ARR double their qualified pipeline in 6 months. Here's how we did it for three companies just like yours."</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">Specificity creates believability. When you narrow your claim, it becomes more credible and relevant to your exact target customer.</p>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-medium shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gray-900 mb-2">Customer thinks:</h3>
                    <p className="text-gray-800 italic font-medium">"How do we know this will work for us?"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really asking:</h3>
                    <p className="text-gray-700">What happens if this fails? They're risk-assessing, thinking about their reputation, budget waste, and opportunity cost.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to position yourself:</h3>
                    <p className="text-gray-700">Remove the risk entirely. "Start with a paid pilot project. We'll fix one specific problem in 30 days. If it works, we continue. If not, you've got a solution and we part ways."</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">It changes the conversation from "Will this work?" to "What should we fix first?" Lower commitment means faster decisions.</p>
                  </div>
                </div>

                {/* Example 4 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-medium shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gray-900 mb-2">Customer thinks:</h3>
                    <p className="text-gray-800 italic font-medium">"The expensive option must be better, right?"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really asking:</h3>
                    <p className="text-gray-700">How do we justify the cost internally? They need ammunition to sell this decision to their boss, board, or team.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to position yourself:</h3>
                    <p className="text-gray-700">Show ROI in their language. "The $10K/month investment typically returns $50K in monthly recurring revenue within 6 months. But more importantly, you're buying back 20 hours of your week."</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">You're not selling cost—you're selling value. When you quantify both money AND time saved, the decision becomes obvious.</p>
                  </div>
                </div>

                {/* Example 5 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-medium shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gray-900 mb-2">Customer thinks:</h3>
                    <p className="text-gray-800 italic font-medium">"What if we pick the wrong partner?"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really asking:</h3>
                    <p className="text-gray-700">How painful will it be to switch if this doesn't work out? They're thinking about contracts, knowledge transfer, and sunk costs.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to position yourself:</h3>
                    <p className="text-gray-700">Make leaving easy. "Everything we build is yours. All strategies documented. All campaigns transferable. If you ever want to bring it in-house, we'll train your team."</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">Paradoxically, making it easy to leave makes them more likely to stay. It shows confidence and removes the fear of being trapped.</p>
                  </div>
                </div>

                {/* Example 6 */}
                <div className="border border-white/20 rounded-xl p-6 glass-card-medium shadow-lg">
                  <div className="mb-4">
                    <h3 className="heading-lg text-gray-900 mb-2">Customer thinks:</h3>
                    <p className="text-gray-800 italic font-medium">"They all have impressive portfolios"</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-600 mb-2">What they're really asking:</h3>
                    <p className="text-gray-700">But can they replicate that success for us? Past performance doesn't guarantee future results, especially in different industries.</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">How to position yourself:</h3>
                    <p className="text-gray-700">Show your process, not just results. "Here's the exact 90-day playbook we'll run for you. We've refined it across 50+ implementations. Let me show you what weeks 1-12 look like."</p>
                  </div>
                  
                  <div className="p-4 glass-card-blue rounded-lg">
                    <h4 className="heading-md font-semibold text-blue-800 mb-2">Why this works:</h4>
                    <p className="text-sm text-blue-700 font-medium">Process creates confidence. When they can visualize exactly what will happen, success feels inevitable rather than hopeful.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Key Insights Section */}
            <section className="mb-12">
              <h2 className="heading-xl text-gray-800 mb-6 text-center">
                The Pattern: How Solution-Aware Customers Actually Decide
              </h2>
              
              <div className="bg-orange-50/95 rounded-xl p-6 mb-6 backdrop-blur-sm border border-orange-200/50">
                <p className="text-orange-800 mb-4 font-semibold">
                  <strong>Solution-aware customers aren't comparing features—they're managing risk.</strong>
                </p>
                <p className="text-orange-700 font-medium">
                  Every vendor looks qualified on paper. The winner is whoever makes the decision feel safest, clearest, and most likely to succeed.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-white/20 rounded-xl glass-card-medium">
                  <h3 className="heading-lg text-gray-900 mb-3">What NOT to do:</h3>
                  <ul className="text-gray-700 space-y-2 text-sm font-medium">
                    <li>• List more features and capabilities</li>
                    <li>• Compete on price alone</li>
                    <li>• Show generic success stories</li>
                    <li>• Promise unrealistic timelines</li>
                    <li>• Hide your weaknesses</li>
                  </ul>
                </div>
                
                <div className="p-6 border border-white/20 rounded-xl glass-card-medium">
                  <h3 className="heading-lg text-gray-900 mb-3">What TO do:</h3>
                  <ul className="text-gray-700 space-y-2 text-sm font-medium">
                    <li>• Show exactly how you're different</li>
                    <li>• Provide risk reversal mechanisms</li>
                    <li>• Share specific, relevant case studies</li>
                    <li>• Be transparent about process and timeline</li>
                    <li>• Make the first step small and clear</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Strong CTA Section */}
            <section className="text-center bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white rounded-2xl p-12">
              <h2 className="heading-xl text-gray-800 mb-6">
                Stop Sounding Like Every Other Marketing Option
              </h2>
              <p className="text-gray-700 mb-8 text-lg max-w-2xl mx-auto font-medium">
                Get the positioning strategy that makes you the obvious choice—not just another option in their spreadsheet. We'll show you exactly how to differentiate when everyone claims the same benefits.
              </p>
              <button aria-label="Opens contact form for free marketing analysis" 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
              >
                Get Your Differentiation Strategy →
              </button>
              <p className="text-gray-700 text-sm mt-4 font-medium">
                ✅ Stand out from competitors • ✅ Win without competing on price • ✅ Close deals faster
              </p>
            </section>

            {/* Navigation to Next Stage */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/problem-aware-stage-customers`}
                  className="text-gray-700 hover:text-orange-accessible focus-visible:text-orange-accessible transition-colors"
                >
                  ← Previous: Problem-Aware Stage
                </a>
                <a 
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/product-aware-stage-customers`}
                  className="text-orange-accessible hover:text-orange-700 focus-visible:text-orange-700 focus-visible:text-orange-300 font-semibold transition-colors"
                >
                  Next: Product-Aware Stage →
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

export default SolutionAwareStageCustomers;