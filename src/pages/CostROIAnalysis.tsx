import { useEffect } from 'react';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
import { useLeadForm } from '../contexts/LeadFormContext';
import { getCanonicalUrl } from '../utils/urls';

const CostROIAnalysis = () => {
  const { setShowDropdownForm } = useLeadForm();

  useEffect(() => {
    document.title = "Marketing Cost & ROI Analysis: Real Numbers Comparison | Reboot Media";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'True cost and ROI comparison across marketing models. Real numbers including hidden costs. Fractional CMO delivers 3.2x ROI vs 1.8x for alternatives.');
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'fractional cmo cost analysis, marketing roi comparison, cmo vs agency cost, marketing investment return');
  }, []);

  const scenarios = [
    {
      id: 1,
      title: 'The "Hourly Rate Sticker Shock" Fallacy',
      companySays: "Fractional CMOs charge $300-500/hour!",
      companyThinks: "That's way more than employees or agencies",
      realConsideration: "Value per hour vs hours needed",
      evaluationFramework: "Results-based pricing vs time-based costs",
      outcome: "20 strategic hours worth more than 160 tactical hours",
      painLevel: "High",
      timeStuck: "6-12 months",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 2,
      title: 'The "Hidden Costs Nobody Mentions" Reality',
      companySays: "We know what marketing costs",
      companyThinks: "Salaries + tools = total cost",
      realConsideration: "Recruitment, training, benefits, turnover, management time",
      evaluationFramework: "Fully-loaded cost analysis",
      outcome: "In-house: $250K+, Agency: $180K+, Fractional CMO: $120K",
      painLevel: "Very High",
      timeStuck: "12-18 months",
      gradient: "from-red-500 to-orange-500"
    },
    {
      id: 3,
      title: 'The "Time to Value" Calculation',
      companySays: "We need results quickly",
      companyThinks: "More hours = faster results",
      realConsideration: "Expertise speed vs learning curve delays",
      evaluationFramework: "Revenue impact timeline analysis",
      outcome: "Fractional CMO: 30 days, Agency: 90 days, In-house: 180 days",
      painLevel: "High",
      timeStuck: "8-14 months",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      id: 4,
      title: 'The "Opportunity Cost" Blind Spot',
      companySays: "We'll save money doing it ourselves",
      companyThinks: "DIY is always cheaper",
      realConsideration: "Lost revenue while learning vs expert acceleration",
      evaluationFramework: "6-month revenue differential",
      outcome: "DIY costs $200K+ in lost opportunities vs fractional expertise",
      painLevel: "Very High",
      timeStuck: "18-24 months",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      title: 'The "ROI Multiplier" Comparison',
      companySays: "Show me the return on investment",
      companyThinks: "All marketing delivers similar ROI",
      realConsideration: "Strategic impact vs tactical execution returns",
      evaluationFramework: "12-month revenue attribution",
      outcome: "Fractional CMO: 3.2x ROI, Agency: 1.8x, Consultant: 0.9x",
      painLevel: "Critical",
      timeStuck: "12-20 months",
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      id: 6,
      title: 'The "Scale Economics" Threshold',
      companySays: "At what point does full-time make sense?",
      companyThinks: "Growth means upgrading to full-time",
      realConsideration: "Marketing budget efficiency thresholds",
      evaluationFramework: "Budget utilization analysis",
      outcome: "Full-time justified at $200K+ monthly marketing spend",
      painLevel: "Medium",
      timeStuck: "6-10 months",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      id: 7,
      title: 'The "Risk-Adjusted Return" Framework',
      companySays: "What if it doesn't work?",
      companyThinks: "Employees are safer investments",
      realConsideration: "Flexibility value vs fixed cost risk",
      evaluationFramework: "Downside protection analysis",
      outcome: "Fractional: Month-to-month flex, Employee: 6-month severance risk",
      painLevel: "High",
      timeStuck: "8-12 months",
      gradient: "from-gray-500 to-slate-500"
    }
  ];

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
        title="Marketing Cost & ROI Analysis: Real Numbers Comparison | Reboot Media"
        description="True cost and ROI comparison across marketing models. Real numbers including hidden costs. Fractional CMO delivers 3.2x ROI vs 1.8x for alternatives."
        canonicalUrl={getCanonicalUrl('cost-roi-analysis')}
      />

      <div className="cost-roi-page min-h-screen relative overflow-hidden">
        <BackgroundGradient />
        
        <div className="relative z-10">
          <GlobalHeader onShowForm={() => setShowDropdownForm(true)} showProgressBar={true} />
        
          {/* Hero Section */}
          <section className="pt-20 md:pt-24 pb-16 bg-gradient-to-br from-green-900 via-emerald-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
            <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
              
              {/* Breadcrumb */}
              <div className="mb-8">
                <nav className="flex items-center space-x-2 text-gradient-safe">
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="hover:text-green-400 focus-visible:text-green-400 transition-colors">Fractional CMO Guide</a>
                  <span>→</span>
                  <span className="text-green-400 font-semibold">Cost & ROI Analysis</span>
                </nav>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="w-2 h-2 glass-card-green0 rounded-full animate-pulse"></span>
                  Real Numbers, Hidden Costs, True ROI
                </div>
                <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                  <span className="text-emerald-400">Marketing Cost &</span>
                  <span className="block text-green-400 mt-2">ROI Analysis</span>
                </h1>
                <p className="text-xl text-gradient-safe mb-8 max-w-3xl mx-auto leading-relaxed">
                  The $300/hour fractional CMO looks expensive until you calculate the true fully-loaded costs. 
                  <span className="text-green-400 font-semibold"> Most companies underestimate costs by 60% and overestimate ROI by 40%.</span>
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 focus-visible:from-green-600 hover:to-emerald-700 focus-visible:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-xl"
                >
                  Calculate Your True Marketing Costs
                </button>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <main 
          id="main-content" 
          role="main"
          aria-label="Main content"
          className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
            
            {/* Cost Comparison Table */}
            <section className="mb-16">
              <div className="glass-card-light rounded-2xl shadow-xl border border-green-200/50 p-8 overflow-x-auto">
                <h2 className="heading-xl text-gradient-critical mb-6">
                  True Cost Comparison (Including Hidden Costs)
                </h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 font-bold text-gray-900">Cost Factor</th>
                      <th className="text-center py-3 px-2 text-blue-accessible">Fractional CMO</th>
                      <th className="text-center py-3 px-2 text-orange-accessible">Marketing Agency</th>
                      <th className="text-center py-3 px-2 text-purple-600">Full-Time CMO</th>
                      <th className="text-center py-3 px-2 text-green-600">In-House Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 font-medium">Base Cost</td>
                      <td className="text-center py-3 px-2">$8-15K/mo</td>
                      <td className="text-center py-3 px-2">$5-20K/mo</td>
                      <td className="text-center py-3 px-2">$15-25K/mo</td>
                      <td className="text-center py-3 px-2">$12-18K/mo</td>
                    </tr>
                    <tr className="border-b border-gray-100 glass-card-medium">
                      <td className="py-3 px-2 font-medium text-white">+ Recruitment Cost</td>
                      <td className="text-center py-3 px-2 text-white">$0</td>
                      <td className="text-center py-3 px-2 text-white">$2-5K</td>
                      <td className="text-center py-3 px-2 text-white">$20-40K</td>
                      <td className="text-center py-3 px-2 text-white">$15-25K</td>
                    </tr>
                    <tr className="border-b border-gray-100 glass-card-medium">
                      <td className="py-3 px-2 font-medium text-white">+ Benefits/Overhead</td>
                      <td className="text-center py-3 px-2 text-white">$0</td>
                      <td className="text-center py-3 px-2 text-white">$0</td>
                      <td className="text-center py-3 px-2 text-white">$5-8K/mo</td>
                      <td className="text-center py-3 px-2 text-white">$4-6K/mo</td>
                    </tr>
                    <tr className="border-b border-gray-100 glass-card-medium">
                      <td className="py-3 px-2 font-medium text-white">+ Management Time</td>
                      <td className="text-center py-3 px-2 text-white">5 hrs/mo</td>
                      <td className="text-center py-3 px-2 text-white">20 hrs/mo</td>
                      <td className="text-center py-3 px-2 text-white">10 hrs/mo</td>
                      <td className="text-center py-3 px-2 text-white">40 hrs/mo</td>
                    </tr>
                    <tr className="border-b border-gray-100 glass-card-medium">
                      <td className="py-3 px-2 font-medium text-white">+ Ramp-Up Time</td>
                      <td className="text-center py-3 px-2 text-white">2-4 weeks</td>
                      <td className="text-center py-3 px-2 text-white">6-8 weeks</td>
                      <td className="text-center py-3 px-2 text-white">12-16 weeks</td>
                      <td className="text-center py-3 px-2 text-white">16-24 weeks</td>
                    </tr>
                    <tr className="border-b border-gray-100 glass-card-medium">
                      <td className="py-3 px-2 font-medium text-white">+ Turnover Risk</td>
                      <td className="text-center py-3 px-2 text-white">Low</td>
                      <td className="text-center py-3 px-2 text-white">Medium</td>
                      <td className="text-center py-3 px-2 text-white">High (18mo avg)</td>
                      <td className="text-center py-3 px-2 text-white">Very High (43%)</td>
                    </tr>
                    <tr className="border-t-2 border-gray-200 glass-card-solid">
                      <td className="py-3 px-2 font-bold text-white">TRUE ANNUAL COST</td>
                      <td className="text-center py-3 px-2 font-bold text-green-300">$96-180K</td>
                      <td className="text-center py-3 px-2 font-bold text-orange-300">$84-300K</td>
                      <td className="text-center py-3 px-2 font-bold text-red-300">$260-436K</td>
                      <td className="text-center py-3 px-2 font-bold text-purple-300">$216-384K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ROI Comparison */}
            <section className="mb-16">
              <div className="glass-card-light rounded-2xl shadow-xl border border-green-200/50 p-8">
                <h2 className="heading-xl text-gradient-critical mb-6">
                  12-Month ROI Comparison (Real Client Data)
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="heading-lg text-gradient-critical mb-4">Average Revenue Impact</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 glass-card-medium rounded-lg">
                        <span className="font-medium text-white">Fractional CMO</span>
                        <span className="font-bold text-green-300">+42% growth</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-card-medium rounded-lg">
                        <span className="font-medium text-white">Agency</span>
                        <span className="font-bold text-orange-300">+23% growth</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-card-medium rounded-lg">
                        <span className="font-medium text-white">Consultant</span>
                        <span className="font-bold text-purple-300">+12% growth</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-card-medium rounded-lg">
                        <span className="font-medium text-white">In-House</span>
                        <span className="font-bold text-blue-300">+18% growth</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="heading-lg text-gradient-critical mb-4">ROI Multiplier</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 glass-card-solid rounded-lg">
                        <span className="font-medium text-white">Fractional CMO</span>
                        <span className="font-bold text-green-300">3.2x ROI</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-card-solid rounded-lg">
                        <span className="font-medium text-white">Agency</span>
                        <span className="font-bold text-orange-300">1.8x ROI</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-card-solid rounded-lg">
                        <span className="font-medium text-white">Consultant</span>
                        <span className="font-bold text-purple-300">0.9x ROI</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-card-solid rounded-lg">
                        <span className="font-medium text-white">In-House</span>
                        <span className="font-bold text-blue-300">1.4x ROI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Scenarios */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-12 text-center">
                7 Cost & ROI Revelations (The Numbers They Don't Share)
              </h2>
              
              <div className="space-y-8">
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="glass-card-light rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    <div className={`bg-gradient-to-r ${scenario.gradient} p-6`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="heading-lg text-white mb-2">
                            {scenario.title}
                          </h3>
                          <div className="flex gap-4 text-sm text-white/90">
                            <span>Pain Level: {scenario.painLevel}</span>
                            <span>Time Lost: {scenario.timeStuck}</span>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                          {scenario.id}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* Company Says */}
                        <div className="space-y-6">
                          <div className="glass-card-light rounded-lg p-4 border-l-4 border-red-500">
                            <h4 className="heading-md text-red-800 mb-2 flex items-center">
                              <span className="mr-2">💬</span>
                              Company Says:
                            </h4>
                            <p className="text-standard italic">
                              "{scenario.companySays}"
                            </p>
                          </div>
                          
                          <div className="glass-card-light rounded-lg p-4 border-l-4 border-green-500">
                            <h4 className="heading-md text-green-800 mb-2 flex items-center">
                              <span className="mr-2">💭</span>
                              Company Thinks:
                            </h4>
                            <p className="text-standard">
                              {scenario.companyThinks}
                            </p>
                          </div>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-6">
                          <div className="glass-card-orange rounded-lg p-4 border-l-4 border-orange-500">
                            <h4 className="heading-md text-orange-800 mb-2 flex items-center">
                              <span className="mr-2">🔍</span>
                              Real Consideration:
                            </h4>
                            <p className="text-standard">
                              {scenario.realConsideration}
                            </p>
                          </div>
                          
                          <div className="glass-card-blue rounded-lg p-4 border-l-4 border-blue-500">
                            <h4 className="heading-md text-blue-800 mb-2 flex items-center">
                              <span className="mr-2">⚖️</span>
                              Evaluation Framework:
                            </h4>
                            <p className="text-standard">
                              {scenario.evaluationFramework}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Outcome */}
                      <div className="mt-6 glass-card-solid rounded-lg p-4 border border-emerald-200">
                        <h4 className="heading-md text-emerald-800 mb-2 flex items-center">
                          <span className="mr-2">💰</span>
                          Financial Reality:
                        </h4>
                        <p className="text-black-standard font-medium">
                          {scenario.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Investment Calculator CTA */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">
                  Quick ROI Calculator
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glass-card-medium rounded-lg p-4">
                    <p className="mb-4 text-white">If your current revenue is <strong>$1M</strong> and you're growing at <strong>10%/year</strong>:</p>
                    <ul className="space-y-2 text-white">
                      <li>• With current growth: $1.1M next year</li>
                      <li>• With Agency (23% growth): $1.23M next year</li>
                      <li>• With Fractional CMO (42% growth): $1.42M next year</li>
                    </ul>
                  </div>
                  <div className="glass-card-solid rounded-lg p-4">
                    <p className="mb-4 text-white">That's an additional revenue difference of:</p>
                    <ul className="space-y-2 text-white">
                      <li className="font-bold text-yellow-300">• +$320,000 with Fractional CMO</li>
                      <li>• +$130,000 with Agency</li>
                      <li>• Investment: $120-180K for Fractional CMO</li>
                      <li className="font-bold text-green-300">• Net gain: $140-200K in year one</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16">
              <div className="text-center glass-card-light rounded-2xl p-8 border border-green-200/50">
                <h3 className="heading-lg text-gradient-critical mb-4">
                  🚨 Every Month You Delay Costs You $26,000+
                </h3>
                <p className="text-lg text-black-standard mb-6 max-w-3xl mx-auto">
                  That's the average monthly opportunity cost of not having strategic marketing leadership. 
                  Get your personalized cost-benefit analysis and see your specific numbers.
                </p>
                <button aria-label="Opens contact form for free marketing analysis" 
                  onClick={() => setShowDropdownForm(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 focus-visible:from-green-600 hover:to-emerald-700 focus-visible:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus-visible:scale-105 shadow-lg mr-4"
                >
                  Get Your ROI Analysis
                </button>
                <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="border-2 border-green-500 text-green-600 hover:glass-card-green0 focus-visible:glass-card-green0 hover:text-white focus-visible:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-block">
                  Back to Guide
                </a>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                Related Financial Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/when-to-choose-each`} className="hover:text-green-600 focus-visible:text-green-600 transition-colors">
                      Revenue Stage Decision Matrix →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Different revenue stages require different marketing investments. Find your optimal model based on your stage.
                  </p>
                </div>
                <div className="glass-card-light rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl focus-visible:shadow-xl transition-shadow">
                  <h3 className="heading-lg text-gradient-critical mb-3">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/revenue-ceiling-breakthrough`} className="hover:text-green-600 focus-visible:text-green-600 transition-colors">
                      Breaking Revenue Ceilings →
                    </a>
                  </h3>
                  <p className="text-standard">
                    Most companies hit revenue ceilings due to marketing underinvestment. Learn the investment triggers for breakthrough.
                  </p>
                </div>
              </div>
            </section>

          </main>

          <GlobalFooter onShowForm={() => setShowDropdownForm(true)} />
        </div>
      </div>
    </>
  );
};

export default CostROIAnalysis;