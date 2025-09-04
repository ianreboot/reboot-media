// Removed unused imports
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import SchemaMarkup from '../components/SchemaMarkup';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';

const MarketingPsychology = () => {
  const { setShowDropdownForm } = useLeadForm();

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
      
      {/* Enhanced SEO Head with auto-configuration */}
      <SEOHead 
        pageSlug="marketing-psychology"
        structuredDataType="article"
        enableCoreWebVitalsOptimization={true}
      />
      
      {/* Enhanced Schema Markup */}
      <SchemaMarkup 
        type="article"
        pageSlug="marketing-psychology"
        autoGenerate={true}
      />

      <div className="marketing-psychology-page min-h-screen relative overflow-hidden dark:bg-gray-900">
        {/* Sophisticated Background Gradient */}
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
        {/* Hero Section */}
        <section className="pt-20 md:pt-24 pb-8 bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)]"></div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
              <span className="block">Stop Guessing.</span>
              <span className="block">Start Converting.</span>
              <span className="block text-orange-500 mt-2">Master Marketing Psychology</span>
            </h1>
            <p className="text-xl text-gradient-critical mb-8 max-w-3xl mx-auto leading-relaxed">
              The 5 customer awareness stages and conversion psychology principles that transform scattered marketing into predictable revenue growth. Used by Fortune 500 companies and growth-stage businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button aria-label="Opens contact form for free marketing analysis" 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl"
              >
                Get Free Psychology Audit
              </button>
              <a 
                href="#awareness-stages" 
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 focus-visible:bg-orange-500 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0"
              >
                Learn the Framework
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main 
          id="main-content" 
          className="max-w-4xl mx-auto px-6 lg:px-8 py-16"
          role="main"
          aria-label="Marketing psychology principles and customer awareness stages"
        >
          
          {/* Problem Introduction */}
          <section id="problem" className="mb-8">
            <h2 className="heading-xl text-gradient-critical mb-8 text-center">
              Why 73% of Marketing Campaigns Fail to Convert
            </h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gradient-safe mb-6 text-center">
                Most businesses are throwing marketing messages at prospects without understanding <strong>where they are in the buying journey</strong>. They're using product-focused messaging for people who don't even know they have a problem yet. They're creating urgency for prospects who haven't built trust yet.
              </p>
              <p className="text-gradient-safe mb-8 text-center">
                The result? Marketing that feels like shouting into the void. Campaigns that burn through budget without generating qualified leads. Teams frustrated by "marketing that doesn't work."
              </p>
            </div>
            
            {/* Strategic CTA */}
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-md rounded-2xl shadow-xl border border-orange-500/50 dark:border-orange-400/50 border-l-4 border-l-orange-500 p-6 mb-8">
              <p className="text-black-important dark:text-gradient-critical font-semibold mb-4">
                🚨 <strong>Warning:</strong> Every day you use psychology-ignorant marketing costs you qualified prospects
              </p>
              <button aria-label="Opens contact form for free marketing analysis" 
                onClick={() => setShowDropdownForm(true)}
                className="text-orange-accessible dark:text-orange-400 font-semibold hover:underline focus-visible:underline"
              >
                Get your free marketing psychology audit →
              </button>
            </div>
          </section>

          {/* Customer Awareness Stages */}
          <section id="awareness-stages" className="mb-8">
            <h2 className="heading-xl text-gradient-critical mb-8 text-center">
              The 5 Customer Awareness Stages Framework
            </h2>
            <p className="text-gradient-safe mb-12 text-lg text-center">
              Created by legendary copywriter Eugene Schwartz, this framework reveals exactly how to match your message to your prospect's mindset. Master this, and marketing becomes predictable.
            </p>

            <div className="space-y-12">
              
              {/* Stage 1: Unaware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg focus-visible:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3">
                    <span className="text-red-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="heading-lg text-black-important dark:text-gradient-critical mb-2">Unaware Stage</h3>
                    <p className="text-black-optional dark:text-gradient-safe">They don't know they have a problem</p>
                  </div>
                </div>
                
                <p className="text-black-standard dark:text-gradient-safe mb-4">
                  These prospects think everything is fine. They're saying things like "We just need more leads" or "No one understands our product." The real issue? They're solving the wrong problem entirely.
                </p>
                
                <p className="text-black-standard dark:text-gradient-safe mb-6">
                  Most founders make the fatal mistake of talking features to people who don't even know they're bleeding money. Want to see exactly what customers are really thinking and how to turn that confusion into clarity?
                </p>

                <div className="mt-6">
                  <a 
                    href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/unaware-stage-customers`}
                    className="inline-flex items-center text-orange-accessible dark:text-orange-400 font-semibold hover:text-orange-700 focus-visible:text-orange-700 dark:hover:text-orange-300 focus-visible:text-orange-300 transition-colors"
                  >
                    See real customer examples and what actually works →
                  </a>
                </div>
              </div>

              {/* Stage 2: Problem-Aware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg focus-visible:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-3">
                    <span className="text-orange-accessible font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="heading-lg text-black-important dark:text-gradient-critical mb-2">Problem-Aware Stage</h3>
                    <p className="text-black-optional dark:text-gradient-safe">They know they have a problem but not the solution</p>
                  </div>
                </div>
                <p className="text-black-standard dark:text-gradient-safe mb-4">
                  These prospects are frustrated. They say things like "Our marketing isn't working anymore" or "CAC keeps going up but we don't know why." They're throwing solutions at the wall hoping something sticks.
                </p>
                
                <p className="text-black-standard dark:text-gradient-safe mb-6">
                  The key? They don't need more tactics—they need a diagnosis. They're treating symptoms without understanding the disease. Want to see how to guide them from confusion to clarity?
                </p>
                <div className="mt-6 p-4 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg border border-white/30 dark:border-slate-600/30">
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium mb-2">Example Headline:</p>
                  <p className="text-black-critical dark:text-gradient-critical">"Why Your Marketing Feels Scattered (And the 3 Systems That Fix It)"</p>
                </div>
                
                <div className="mt-6">
                  <a 
                    href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/problem-aware-stage-customers`}
                    className="inline-flex items-center text-orange-accessible dark:text-orange-400 font-semibold hover:text-orange-700 focus-visible:text-orange-700 dark:hover:text-orange-300 focus-visible:text-orange-300 transition-colors"
                  >
                    See real customer examples and what actually works →
                  </a>
                </div>
              </div>

              {/* Stage 3: Solution-Aware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg focus-visible:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3">
                    <span className="text-yellow-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="heading-lg text-black-important dark:text-gradient-critical mb-2">Solution-Aware Stage</h3>
                    <p className="text-black-optional dark:text-gradient-safe">They know solutions exist and are comparing options</p>
                  </div>
                </div>
                <p className="text-black-standard dark:text-gradient-safe mb-4">
                  These prospects are comparison shopping. They say "Should we hire an agency or consultant?" and "Everyone looks the same." They have spreadsheets comparing options but can't figure out meaningful differences.
                </p>
                
                <p className="text-black-standard dark:text-gradient-safe mb-6">
                  The secret? They're not comparing features—they're managing risk. The winner is whoever makes success feel most certain. Want to see how to become the obvious choice?
                </p>
                
                <div className="mt-6 p-4 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg border border-white/30 dark:border-slate-600/30">
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium mb-2">Example Headline:</p>
                  <p className="text-black-critical dark:text-gradient-critical">"Marketing Agency vs Fractional CMO: Which Drives Faster Growth?"</p>
                </div>
                
                <div className="mt-6">
                  <a 
                    href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/solution-aware-stage-customers`}
                    className="inline-flex items-center text-orange-accessible dark:text-orange-400 font-semibold hover:text-orange-700 focus-visible:text-orange-700 dark:hover:text-orange-300 focus-visible:text-orange-300 transition-colors"
                  >
                    See real customer examples and what actually works →
                  </a>
                </div>
              </div>

              {/* Stage 4: Product-Aware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg focus-visible:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
                    <span className="text-green-600 font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="heading-lg text-black-important dark:text-gradient-critical mb-2">Product-Aware Stage</h3>
                    <p className="text-black-optional dark:text-gradient-safe">They know your solution and are evaluating you specifically</p>
                  </div>
                </div>
                <p className="text-black-standard dark:text-gradient-safe mb-4">
                  These prospects know about you specifically. They ask "Can you deliver for companies like us?" and "What if this doesn't work?" They're close to buying but need confidence.
                </p>
                
                <p className="text-black-standard dark:text-gradient-safe mb-6">
                  They don't need more features—they need reassurance. Address their hidden fears, show relevant success stories, and make saying yes feel safe. Ready to handle the real objections?
                </p>
                
                <div className="mt-6 p-4 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg border border-white/30 dark:border-slate-600/30">
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium mb-2">Example Headline:</p>
                  <p className="text-black-critical dark:text-gradient-critical">"How We Helped Norton Antivirus Grow from $100K to $3M Monthly Revenue"</p>
                </div>
                
                <div className="mt-6">
                  <a 
                    href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/product-aware-stage-customers`}
                    className="inline-flex items-center text-orange-accessible dark:text-orange-400 font-semibold hover:text-orange-700 focus-visible:text-orange-700 dark:hover:text-orange-300 focus-visible:text-orange-300 transition-colors"
                  >
                    See real customer examples and what actually works →
                  </a>
                </div>
              </div>

              {/* Stage 5: Most Aware */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg focus-visible:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3">
                    <span className="text-blue-accessible font-bold text-lg">5</span>
                  </div>
                  <div>
                    <h3 className="heading-lg text-black-important dark:text-gradient-critical mb-2">Most Aware Stage</h3>
                    <p className="text-black-optional dark:text-gradient-safe">They're ready to buy and just need the final push</p>
                  </div>
                </div>
                <p className="text-black-standard dark:text-gradient-safe mb-4">
                  These prospects are ready. They say "Send me the contract" or "Let me run this by my team one more time." They want to move forward but need that final nudge.
                </p>
                
                <p className="text-black-standard dark:text-gradient-safe mb-6">
                  Don't oversell—they're already sold. Remove friction, make the next step tiny, and give them control. The difference between "thinking about it" and signing today? Usually just one small fear.
                </p>
                
                <div className="mt-6 p-4 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg border border-white/30 dark:border-slate-600/30">
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium mb-2">Example Headline:</p>
                  <p className="text-black-critical dark:text-gradient-critical">"Get Your Free Marketing Analysis - Limited to 8 Clients This Quarter"</p>
                </div>
                
                <div className="mt-6">
                  <a 
                    href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/most-aware-stage-customers`}
                    className="inline-flex items-center text-orange-accessible dark:text-orange-400 font-semibold hover:text-orange-700 focus-visible:text-orange-700 dark:hover:text-orange-300 focus-visible:text-orange-300 transition-colors"
                  >
                    See real customer examples and what actually works →
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* Conversion Psychology Triggers */}
          <section className="mb-8">
            <h2 className="heading-xl text-gradient-critical mb-8 text-center">
              The 4 Psychological Triggers That Drive Action
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              
              {/* Loss Aversion */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-black-critical dark:text-gradient-critical mb-4">1. Loss Aversion</h3>
                <p className="text-black-standard dark:text-gradient-safe mb-4">
                  People are 2.5x more motivated to avoid loss than gain benefit. Frame your value proposition around what they'll lose by not acting.
                </p>
                <div className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium mb-2">Instead of:</p>
                  <p className="text-black-standard dark:text-gradient-safe mb-3">"Get 30% more leads"</p>
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium mb-2">Say:</p>
                  <p className="text-black-critical dark:text-gradient-critical font-medium">"Don't lose 30% of potential leads to broken messaging"</p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-black-critical dark:text-gradient-critical mb-4">2. Social Proof</h3>
                <p className="text-black-standard dark:text-gradient-safe mb-4">
                  People follow what others like them are doing. Use peer testimonials, expert endorsements, and usage indicators strategically.
                </p>
                <div className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium mb-2">Hierarchy:</p>
                  <p className="text-black-critical dark:text-gradient-critical">1. Peer testimonials</p>
                  <p className="text-black-critical dark:text-gradient-critical">2. Expert endorsements</p>
                  <p className="text-black-critical dark:text-gradient-critical">3. Media mentions</p>
                  <p className="text-black-critical dark:text-gradient-critical">4. Usage statistics</p>
                </div>
              </div>

              {/* Scarcity */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-black-critical dark:text-gradient-critical mb-4">3. Scarcity & Urgency</h3>
                <p className="text-black-standard dark:text-gradient-safe mb-4">
                  Limited availability creates urgency. But it must be authentic - fake scarcity destroys trust faster than any other mistake.
                </p>
                <div className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium mb-2">Authentic Example:</p>
                  <p className="text-black-critical dark:text-gradient-critical">"Limited to 8 clients for personalized attention" (if actually true)</p>
                </div>
              </div>

              {/* Authority */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-black-critical dark:text-gradient-critical mb-4">4. Authority Positioning</h3>
                <p className="text-black-standard dark:text-gradient-safe mb-4">
                  People trust experts. Build authority through expertise signals, process transparency, and educational content.
                </p>
                <div className="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-lg p-4 border border-white/30 dark:border-slate-600/30">
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium mb-2">Authority Signals:</p>
                  <p className="text-black-critical dark:text-gradient-critical">• Years of experience</p>
                  <p className="text-black-critical dark:text-gradient-critical">• Specific credentials</p>
                  <p className="text-black-critical dark:text-gradient-critical">• Detailed case studies</p>
                </div>
              </div>

            </div>

            {/* Strategic CTA */}
            <div className="text-center bg-white/85 dark:bg-slate-800/85 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 dark:border-slate-700/30 p-8">
              <h3 className="heading-lg text-black-important dark:text-gradient-critical mb-4">
                Ready to Transform Your Marketing with Psychology?
              </h3>
              <p className="text-black-standard dark:text-gradient-safe mb-6 max-w-2xl mx-auto">
                Don't let another month pass with marketing that ignores how customers actually think. Get your free psychology audit and discover exactly where your messaging is missing the mark.
              </p>
              <button aria-label="Opens contact form for free marketing analysis" 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-lg"
              >
                Get Your Free Marketing Psychology Audit
              </button>
            </div>
          </section>

          {/* Case Study Section */}
          <section className="mb-8">
            <h2 className="heading-xl text-gradient-critical mb-8 text-center">
              <span className="block">Real Results:</span>
              <span className="block">Norton Antivirus Case Study</span>
            </h2>
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 dark:border-slate-700/30 p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">$100K</div>
                  <p className="text-black-optional dark:text-gradient-safe">Monthly Revenue (Before)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$3M</div>
                  <p className="text-black-optional dark:text-gradient-safe">Monthly Revenue (After)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-accessible mb-2">30X</div>
                  <p className="text-black-optional dark:text-gradient-safe">Growth Multiple</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h3 className="text-xl font-semibold text-black-critical dark:text-gradient-critical mb-4">The Psychology Strategy That Worked:</h3>
                <ul className="text-black-standard dark:text-gradient-safe space-y-2">
                  <li><strong>Customer Awareness Mapping:</strong> Identified that customers were Solution-Aware about antivirus, not Problem-Aware about cyber threats</li>
                  <li><strong>Loss Aversion Messaging:</strong> "Don't wait until after you're hacked - protect what matters now"</li>
                  <li><strong>Social Proof Hierarchy:</strong> Featured real customer stories of prevented attacks and saved data</li>
                  <li><strong>Authority Building:</strong> Positioned Norton as the trusted security expert with 30+ years protecting millions</li>
                </ul>
                <div className="mt-6 p-4 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                  <p className="text-sm text-black-optional dark:text-gradient-safe font-medium">Key Insight:</p>
                  <p className="text-black-critical dark:text-gradient-critical">
                    "The breakthrough came when we stopped talking about antivirus features and started educating customers about why they need protection before it's too late."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Linking Section */}
          <section className="mb-8">
            <h2 className="heading-xl text-gradient-critical mb-8 text-center">
              Master These Psychology Principles in Your Business
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg focus-visible:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-black-critical dark:text-gradient-critical mb-3">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="hover:text-orange-accessible focus-visible:text-orange-accessible transition-colors">
                    Stuck in a Growth Plateau? →
                  </a>
                </h3>
                <p className="text-black-standard dark:text-gradient-safe">
                  Learn why 67% of companies hit revenue plateaus and the psychological triggers that break through them.
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg focus-visible:shadow-lg transition-shadow bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-black-critical dark:text-gradient-critical mb-3">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-orange-accessible focus-visible:text-orange-accessible transition-colors">
                    Fractional CMO vs Agency →
                  </a>
                </h3>
                <p className="text-black-standard dark:text-gradient-safe">
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
            <p className="text-gradient-critical mb-8 text-lg max-w-2xl mx-auto">
              Every day you delay implementing these psychology principles, competitors are capturing prospects with messages that actually convert. Get your free audit now.
            </p>
            <div className="flex justify-center mb-6">
              <button aria-label="Opens contact form for free marketing analysis" 
                onClick={() => setShowDropdownForm(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-10 py-5 rounded-xl font-bold text-xl motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none shadow-xl"
              >
                Get Your Free Marketing Psychology Audit →
              </button>
            </div>
            <p className="text-gradient-safe text-sm">
              ✅ Custom psychology audit • ✅ Personalized recommendations • ✅ No obligation
            </p>
          </section>

        </main>

        <GlobalFooter onShowForm={() => setShowDropdownForm(true)} />
        </div>
      </div>

    </>
  );
};

export default MarketingPsychology;