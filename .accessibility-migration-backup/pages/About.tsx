import { CheckCircle, Award, TrendingUp, Users, Globe, Briefcase } from 'lucide-react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';

const About = () => {
  const { setShowDropdownForm } = useLeadForm();




  return (
    <div className="about-page min-h-screen relative overflow-hidden dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Screen Reader Status Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="status-announcer"
      >
        <span className="sr-only">Content loaded successfully</span>
      </div>
      
      {/* Sophisticated Background Gradient */}
      <BackgroundGradient />
      
      {/* Enhanced SEO Head */}
      <SEOHead 
        pageSlug="about"
        structuredDataType="person"
        enableCoreWebVitalsOptimization={true}
      />
      
      {/* Global Header */}
      <div className="relative z-10">
        <GlobalHeader showProgressBar={true} />

      {/* Main Content */}
      <div className="pt-20 md:pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="heading-hero text-gradient-critical mb-6">
              About Reboot Media
            </h1>
            <p className="text-xl text-gradient-critical max-w-3xl mx-auto leading-relaxed text-shadow-sm">
              Fractional CMO services with proven C-level executive experience from Fortune 500 companies. 
              We don't just give advice – we deliver battle-tested strategies that drive measurable growth.
            </p>
          </div>

          {/* Company Story */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 sm:p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
            <div className="relative z-10">
            <h2 className="heading-xl text-gradient-critical mb-6">Our Story</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-black-standard dark:text-gradient-safe">
                <p className="text-lg leading-relaxed text-shadow-sm">
                  Founded in 2020, Reboot Media was born from a simple realization: most growing companies struggle 
                  with marketing not because they lack resources, but because they lack proven strategic leadership.
                </p>
                <p className="text-shadow-sm">
                  After managing $2B+ in revenue across 20+ US companies and guiding Fortune 500 marketing strategies, 
                  our founder saw the same patterns repeatedly – talented teams trapped by amateur-hour decision making.
                </p>
                <p className="text-shadow-sm">
                  We created Reboot Media to bridge this gap, providing C-level marketing expertise without the 
                  full-time executive cost. Our fractional CMO model gives you access to Fortune 500-caliber 
                  strategy and execution at a fraction of traditional consulting costs.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 dark:bg-black/20"></div>
                <div className="relative z-10">
                  <h3 className="heading-lg text-black-critical dark:text-gradient-critical mb-4 text-shadow-sm">Why "Reboot" Media?</h3>
                  <p className="text-black-important dark:text-gradient-enhanced text-shadow-sm">
                    Sometimes the best solution isn't to add more features – it's to restart with a clean, 
                    proven foundation. We help companies "reboot" their marketing with strategies that actually work, 
                    eliminating the guesswork and focusing on what drives real business results.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Leadership */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 sm:p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
            <div className="relative z-10">
            <h2 className="heading-xl text-gradient-critical mb-8 text-center">Leadership</h2>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/3">
                  <div className="w-48 h-48 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl mx-auto flex items-center justify-center">
                    <div className="text-6xl font-bold text-white">IH</div>
                  </div>
                </div>
                <div className="lg:w-2/3 space-y-4">
                  <h3 className="heading-lg text-black-critical dark:text-gradient-critical text-shadow-sm">Ian Ho</h3>
                  <p className="text-lg text-orange-accessible dark:text-orange-300 font-semibold text-shadow-sm">Founder & Fractional CMO</p>
                  <p className="text-black-important dark:text-gradient-enhanced leading-relaxed text-shadow-sm">
                    With over 15 years of C-level marketing experience across Fortune 500 companies, Ian has managed 
                    marketing budgets exceeding $2B and driven growth strategies for companies from startup to enterprise scale.
                  </p>
                  <p className="text-black-important dark:text-gradient-enhanced leading-relaxed text-shadow-sm">
                    His expertise spans strategic planning, revenue optimization, digital transformation, and organizational 
                    scaling. Ian's hands-on approach combines analytical rigor with creative strategic thinking to deliver 
                    measurable business results.
                  </p>
                  <div className="pt-4">
                    <a 
                      href="https://www.linkedin.com/in/ian-ho/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 focus-visible:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Company Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
              <div className="relative z-10">
                <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-black-critical dark:text-gradient-critical text-shadow-sm">$2B+</div>
                <p className="text-black-important dark:text-gradient-safe text-shadow-sm">Revenue Managed</p>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
              <div className="relative z-10">
                <Briefcase className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-black-critical dark:text-gradient-critical text-shadow-sm">20+</div>
                <p className="text-black-important dark:text-gradient-safe text-shadow-sm">US Companies</p>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
              <div className="relative z-10">
                <Award className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-black-critical dark:text-gradient-critical text-shadow-sm">3X</div>
                <p className="text-black-important dark:text-gradient-safe text-shadow-sm">Average Revenue Growth</p>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
              <div className="relative z-10">
                <Globe className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-black-critical dark:text-gradient-critical text-shadow-sm">Global</div>
                <p className="text-sm text-black-important dark:text-gradient-safe text-shadow-sm">USA • Bangkok • Singapore</p>
              </div>
            </div>
          </div>

          {/* Our Approach */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 sm:p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">Our Approach</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="heading-md text-black-critical dark:text-gradient-critical mb-4 flex items-center text-shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    The Fresh Eyes Advantage
                  </h3>
                  <p className="text-black-important dark:text-gradient-enhanced leading-relaxed text-shadow-sm">
                    Outside perspective cuts through internal assumptions and politics. We see opportunities 
                    your team misses because they're too close to the problem. This objectivity is your competitive advantage.
                  </p>
                </div>
                <div>
                  <h3 className="heading-md text-black-critical dark:text-gradient-critical mb-4 flex items-center text-shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Battle-Tested Strategies
                  </h3>
                  <p className="text-black-important dark:text-gradient-enhanced leading-relaxed text-shadow-sm">
                    Every recommendation comes from proven Fortune 500 experience. We don't experiment with your business – 
                    we apply strategies that have already worked at scale.
                  </p>
                </div>
                <div>
                  <h3 className="heading-md text-black-critical dark:text-gradient-critical mb-4 flex items-center text-shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    C-Level Expertise
                  </h3>
                  <p className="text-black-important dark:text-gradient-enhanced leading-relaxed text-shadow-sm">
                    Access to executive-level strategic thinking without the $300K+ annual cost. Get Fortune 500 
                    caliber marketing leadership at a fraction of traditional consulting rates.
                  </p>
                </div>
                <div>
                  <h3 className="heading-md text-black-critical dark:text-gradient-critical mb-4 flex items-center text-shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Measurable Results
                  </h3>
                  <p className="text-black-important dark:text-gradient-enhanced leading-relaxed text-shadow-sm">
                    We focus on metrics that matter: revenue growth, market share expansion, and customer lifetime value. 
                    Our success is measured by your business results, not vanity metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 sm:p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 dark:bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">Our Values</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-orange-accessible dark:text-orange-400" />
                  </div>
                  <h3 className="heading-md text-black-critical dark:text-gradient-critical mb-2 text-shadow-sm">Results-Driven</h3>
                  <p className="text-black-important dark:text-gradient-safe text-sm text-shadow-sm">Every strategy must drive measurable business growth</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-blue-accessible dark:text-blue-400" />
                  </div>
                  <h3 className="heading-md text-black-critical dark:text-gradient-critical mb-2 text-shadow-sm">Excellence</h3>
                  <p className="text-black-important dark:text-gradient-safe text-sm text-shadow-sm">Fortune 500 standards applied to every engagement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="heading-md text-black-critical dark:text-gradient-critical mb-2 text-shadow-sm">Transparency</h3>
                  <p className="text-black-important dark:text-gradient-safe text-sm text-shadow-sm">Clear communication and honest feedback always</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
            <h2 className="heading-xl text-white mb-4">Ready to Work Together?</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Stop fumbling with amateur advice. Get battle-tested strategies from executives who've 
              guided Fortune 500 brands to measurable growth. <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/privacy`} className="transparent-link">Privacy protected</a>.
            </p>
            <button aria-label="Opens contact form for free marketing analysis"
              onClick={() => setShowDropdownForm(true)}
              className="inline-block px-8 py-4 bg-white text-orange-accessible font-semibold rounded-xl hover:bg-gray-50 focus-visible:bg-gray-50 transition-colors text-lg"
            >
              Get Your Free Marketing Analysis
            </button>
          </div>

        </div>
      </div>

      {/* Global Footer */}
      <GlobalFooter />
      </div>
    </div>
  );
};

export default About;