
import { getCanonicalUrl } from '../utils/urls';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';
// import { useLeadForm } from '../contexts/LeadFormContext';

const Terms = () => {
  // const { setShowDropdownForm } = useLeadForm();
  // Structured data now handled automatically by SEOHead component

  return (
    <div className="terms-page min-h-screen relative overflow-hidden dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Sophisticated Background Gradient */}
      <BackgroundGradient />
      
      <div className="relative z-10">
      {/* Enhanced SEO Head */}
      <SEOHead 
        title="Terms of Service | Fractional CMO Consulting Agreement | Reboot Media"
        description="Terms of service for Reboot Media's fractional CMO consulting services. Review our service agreements, client responsibilities, and business terms for strategic marketing leadership."
        canonicalUrl={getCanonicalUrl('terms')}
        enableCoreWebVitalsOptimization={true}
      />
        {/* Global Header with Progress Bar */}
        <GlobalHeader showProgressBar={true} />

      {/* Main Content */}
      <div className="pt-16 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 sm:p-8">
            
            <div className="text-center mb-8">
              <h1 className="heading-hero text-gradient-critical mb-4">
                Terms of Service for Reboot Media
              </h1>
              <p className="text-optional dark:replace-text-gray-300">Effective Date: January 8, 2025</p>
            </div>

            <div className="space-y-8">
              
              <p className="text-standard dark:replace-text-gray-300">
                Please read these Terms of Service ("Terms") carefully before using the https://www.rebootmedia.net website 
                (the "Service") and engaging with the marketing consulting services operated by Reboot Media, Inc. ("us", "we", or "our").
              </p>
              
              <p className="text-standard dark:replace-text-gray-300">
                Your access to and use of the Service, as well as your engagement with our marketing consulting services, is conditioned 
                on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and clients who 
                access or use our website and services. By accessing our website or engaging our services, you agree to be bound by these Terms.
              </p>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">1. Description of Services</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  Reboot Media, Inc. provides fractional Chief Marketing Officer (CMO) services, strategic marketing consulting, 
                  and related business advisory services to companies seeking C-level marketing expertise. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>Quick-Win Strategy:</strong> 3-month strategic analysis and revenue growth strategy development</li>
                  <li><strong>Growth Strategy:</strong> 6-month strategic marketing implementation with ongoing guidance</li>
                  <li><strong>Fractional CMO:</strong> 12-month comprehensive marketing leadership transformation</li>
                  <li><strong>Strategic Consulting:</strong> Marketing audits, competitor analysis, and strategic recommendations</li>
                  <li><strong>Growth Advisory:</strong> Ongoing strategic guidance and business development support</li>
                  <li><strong>Marketing Analysis:</strong> Data-driven insights and performance optimization</li>
                </ul>
                <p className="mt-4 text-standard dark:replace-text-gray-300">
                  <strong>Service Dependencies:</strong> Our services may involve third-party tools, platforms, and integrations 
                  for analytics, automation, and marketing execution. Service effectiveness may depend on these third-party systems.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">2. Client Engagement and Responsibilities</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  To engage our marketing consulting services, you must provide accurate information about your business, marketing 
                  challenges, and objectives. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li>Providing timely access to necessary business data, marketing metrics, and operational information</li>
                  <li>Participating in scheduled strategy sessions, meetings, and collaborative planning activities</li>
                  <li>Implementing recommended strategies and tactics within agreed-upon timeframes</li>
                  <li>Maintaining open communication about business changes that may affect our strategic recommendations</li>
                  <li>Respecting intellectual property rights and confidentiality obligations</li>
                  <li>Making timely payments according to agreed terms and schedules</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">3. Acceptable Use</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">You agree to use our services and website only for lawful business purposes. You shall not:</p>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li>Provide false, misleading, or fraudulent information about your business or marketing needs</li>
                  <li>Use our services to engage in any illegal, harmful, or unethical marketing practices</li>
                  <li>Share confidential strategies, methodologies, or proprietary information with competitors</li>
                  <li>Attempt to reverse engineer or replicate our strategic frameworks and methodologies</li>
                  <li>Use automated systems to access our website in ways that could impact performance</li>
                  <li>Violate any applicable laws, regulations, or industry standards</li>
                  <li>Engage in activities that could damage our reputation or business relationships</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">4. Service Limitations and Expectations</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">While we bring extensive C-level experience and proven methodologies, you acknowledge that:</p>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>Results Variability:</strong> Marketing outcomes depend on multiple factors including market conditions, execution quality, timing, and external factors beyond our control</li>
                  <li><strong>Implementation Dependency:</strong> Success requires your team's commitment to implementing recommended strategies and tactics</li>
                  <li><strong>Market Factors:</strong> External market conditions, competition, and economic factors may impact results</li>
                  <li><strong>Data Accuracy:</strong> Our recommendations are based on information you provide and market research; accuracy depends on data quality</li>
                  <li><strong>Timeframe Expectations:</strong> Strategic results typically require 6-12 months to materialize fully</li>
                  <li><strong>Collaboration Requirement:</strong> Our fractional model requires active collaboration and internal resource allocation</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">5. Intellectual Property and Confidentiality</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  Our strategic frameworks, methodologies, templates, and proprietary tools remain the intellectual property 
                  of Reboot Media, Inc. You receive a limited license to use these materials for your internal business purposes only.
                </p>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  We maintain strict confidentiality regarding your business information, strategic plans, and proprietary data. 
                  Similarly, you agree to keep our methodologies, strategies, and business practices confidential.
                </p>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li>Strategic recommendations and plans developed specifically for your business become your property</li>
                  <li>General methodologies, frameworks, and approaches remain our intellectual property</li>
                  <li>Case study rights may be negotiated separately with appropriate anonymization</li>
                  <li>Mutual non-disclosure agreements may supplement these terms for sensitive engagements</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">6. Payment Terms and Cancellation</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  Payment terms are specified in individual service agreements. Standard terms include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>Payment Schedule:</strong> Monthly billing in advance for ongoing services</li>
                  <li><strong>Late Payments:</strong> Services may be suspended for payments more than 15 days overdue</li>
                  <li><strong>Cancellation Policy:</strong> 30-day written notice required for service termination</li>
                  <li><strong>Refund Policy:</strong> Refunds are provided on a case-by-case basis for undelivered services</li>
                  <li><strong>Scope Changes:</strong> Additional services or scope expansions require written agreement</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">7. Data and Privacy</h2>
                <p className="text-standard dark:replace-text-gray-300">
                  Your privacy and business confidentiality are important to us. All your information is governed by our{' '}
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/privacy`} className="transparent-link">comprehensive Privacy Policy</a>. 
                  By engaging our services, you consent to the collection and use of information as described in the Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">8. Service Termination</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  Either party may terminate service agreements with 30 days' written notice. We may terminate services 
                  immediately for breach of these Terms, non-payment, or to protect our business interests.
                </p>
                <p className="text-standard dark:replace-text-gray-300">
                  Upon termination, you retain rights to strategies and recommendations already delivered, while we retain 
                  our intellectual property rights. Outstanding invoices remain payable, and confidentiality obligations continue.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">9. Disclaimer of Warranties</h2>
                <p className="text-standard dark:replace-text-gray-300">
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM 
                  ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                  AND NON-INFRINGEMENT. WE MAKE NO GUARANTEES ABOUT SPECIFIC BUSINESS RESULTS, REVENUE INCREASES, OR MARKET 
                  PERFORMANCE. SUCCESS DEPENDS ON MULTIPLE FACTORS INCLUDING MARKET CONDITIONS, EXECUTION QUALITY, AND BUSINESS 
                  CIRCUMSTANCES BEYOND OUR CONTROL.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">10. Limitation of Liability</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL REBOOT MEDIA, INC., ITS DIRECTORS, EMPLOYEES, OR 
                  AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING 
                  LOST PROFITS, BUSINESS INTERRUPTION, OR OPPORTUNITY COSTS, ARISING FROM OUR SERVICES OR RECOMMENDATIONS.
                </p>
                <p className="text-standard dark:replace-text-gray-300">
                  OUR TOTAL LIABILITY FOR ALL CLAIMS RELATING TO OUR SERVICES SHALL NOT EXCEED THE TOTAL AMOUNT PAID TO US IN 
                  THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $10,000, WHICHEVER IS GREATER.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">11. Governing Law and Disputes</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  These Terms shall be governed by the laws of the State of California, without regard to conflict of law provisions. 
                  Any disputes shall be subject to the exclusive jurisdiction of the state and federal courts located in Orange County, California.
                </p>
                <p className="text-standard dark:replace-text-gray-300">
                  Before initiating legal proceedings, parties agree to attempt good faith resolution through direct negotiation 
                  and, if necessary, mediation with a mutually agreed mediator.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">12. Defense Against Regulatory Complaints</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  We maintain compliance with applicable laws and regulations. If you file regulatory complaints or reports that are 
                  determined to be unfounded, malicious, or made in bad faith, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>Truthfulness Requirement:</strong> Only file complaints based on factual information and good faith belief of violations</li>
                  <li><strong>Pre-Filing Notice:</strong> Provide us 30 days' written notice of concerns before filing regulatory complaints</li>
                  <li><strong>Cost Recovery:</strong> Reimburse our reasonable costs and attorney's fees if complaints are dismissed as unfounded</li>
                  <li><strong>Damages for Bad Faith:</strong> Pay damages of $1,000 plus costs for complaints filed in bad faith or with malicious intent</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">13. Anti-Frivolous Litigation Provisions</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  To protect against abusive litigation, the following provisions apply to all legal actions:
                </p>
                
                <h3 className="heading-lg text-important-accessible dark:text-white mb-3">Prevailing Party Attorney's Fees</h3>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  In any legal proceeding, the prevailing party shall be entitled to recover reasonable attorney's fees and costs 
                  from the non-prevailing party. This applies to all disputes, including contract, tort, statutory, or constitutional claims.
                </p>

                <h3 className="heading-lg text-important-accessible dark:text-white mb-3">Frivolous Claim Penalties</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                  <li><strong>$10,000 Penalty:</strong> Claims determined to be frivolous, unreasonable, or brought primarily for harassment shall result in a $10,000 penalty plus attorney's fees</li>
                  <li><strong>Pre-Filing Requirements:</strong> Before filing any lawsuit, you must provide 30 days' written notice of the specific claims and an opportunity to cure</li>
                  <li><strong>Settlement Protection:</strong> Settlement offers made in good faith cannot be used as evidence of liability or wrongdoing</li>
                </ul>

                <h3 className="heading-lg text-important-accessible dark:text-white mb-3">Anti-SLAPP Protection</h3>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  We reserve all rights under applicable anti-SLAPP (Strategic Lawsuit Against Public Participation) statutes. 
                  Claims targeting our business communications, marketing materials, or public statements may be subject to 
                  early dismissal with mandatory attorney's fees.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">14. Specific Legal Compliance and Safe Harbors</h2>
                
                <h3 className="heading-lg text-important-accessible dark:text-white mb-3">New Law Grace Period</h3>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  For any new laws, regulations, or legal requirements that take effect after the date of these Terms, 
                  we shall have a 90-day grace period to implement necessary compliance measures before any liability attaches.
                </p>

                <h3 className="heading-lg text-important-accessible dark:text-white mb-3">Industry Standard Defense</h3>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  Our practices conform to industry standards for fractional executive services and marketing consulting. 
                  Claims alleging substandard practices must demonstrate departure from accepted industry standards.
                </p>

                <h3 className="heading-lg text-important-accessible dark:text-white mb-3">Accessibility Compliance</h3>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  We strive to maintain website accessibility. For any accessibility-related claims under the ADA or similar laws, 
                  we shall have 90 days from written notice to implement reasonable accommodations before liability attaches.
                </p>

                <h3 className="heading-lg text-important-accessible dark:text-white mb-3">Data Protection Safe Harbors</h3>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>BIPA Compliance:</strong> For biometric data claims, we provide a 90-day cure period from written notice</li>
                  <li><strong>TCPA Defense:</strong> All marketing communications are based on express consent or existing business relationships</li>
                  <li><strong>VPPA Protection:</strong> We do not collect video viewing records subject to Video Privacy Protection Act</li>
                  <li><strong>COPPA Compliance:</strong> Our services are not directed at children under 13, and we do not knowingly collect children's data</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">15. Changes to Terms</h2>
                <p className="text-standard dark:replace-text-gray-300">
                  We may update these Terms to reflect changes in our services, legal requirements, or business practices. 
                  Material changes will be communicated with at least 30 days' notice. Continued use of our services after 
                  changes become effective constitutes acceptance of the revised Terms.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">16. Contact Information</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  If you have questions about these Terms or our services, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                  <p className="font-medium text-important-accessible dark:text-white">Reboot Media, Inc.</p>
                  <p className="text-optional dark:replace-text-gray-400">17595 Harvard Ave C-738</p>
                  <p className="text-optional dark:replace-text-gray-400">Irvine, CA 92614, USA</p>
                  <p className="text-standard dark:replace-text-gray-300">Contact Form: <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/contact`} className="text-orange-500 hover:text-orange-accessible underline">Submit inquiry</a></p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <GlobalFooter />
      </div>
    </div>
  );
};

export default Terms;