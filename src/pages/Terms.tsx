
import { Link } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import { getObfuscatedEmailDisplay } from '../utils/emailUtils';

const Terms = () => {
  // SEO structured data
  const termsPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service",
    "description": "Terms of service for Reboot Media fractional CMO consulting services",
    "url": "https://www.rebootmedia.net/terms",
    "mainEntity": {
      "@type": "TermsOfService",
      "name": "Reboot Media Terms of Service",
      "effectiveDate": "2025-01-08",
      "publisher": {
        "@type": "Organization",
        "name": "Reboot Media, Inc.",
        "url": "https://www.rebootmedia.net/"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* SEO Head */}
      <SEOHead 
        title="Terms of Service | Fractional CMO Consulting Agreement | Reboot Media"
        description="Terms of service for Reboot Media's fractional CMO consulting services. Review our service agreements, client responsibilities, and business terms for strategic marketing leadership."
        keywords="terms of service, fractional CMO agreement, consulting terms, marketing service contract, CMO consulting agreement, business consulting terms, strategic marketing contract"
        canonicalUrl="https://www.rebootmedia.net/terms"
        ogTitle="Terms of Service - Fractional CMO Consulting Agreement"
        ogDescription="Review the terms and conditions for Reboot Media's fractional CMO consulting services and strategic marketing leadership."
        structuredData={termsPageStructuredData}
      />
      
      {/* Global Header */}
      <GlobalHeader />

      {/* Main Content */}
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-8 sm:p-12">
            
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Service for Reboot Media
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Effective Date: January 8, 2025</p>
            </div>

            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              
              <p>
                Please read these Terms of Service ("Terms") carefully before using the https://www.rebootmedia.net website 
                (the "Service") and engaging with the <Link to="/about" className="text-orange-500 hover:text-orange-600 underline" onClick={() => window.scrollTo(0, 0)}>fractional CMO services</Link> operated by Reboot Media, Inc. ("us", "we", or "our").
              </p>
              
              <p>
                Your access to and use of the Service, as well as your engagement with our <Link to="/contact" className="text-orange-500 hover:text-orange-600 underline" onClick={() => window.scrollTo(0, 0)}>fractional CMO services</Link>, is conditioned 
                on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and clients who 
                access or use our website and services. By accessing our website or engaging our services, you agree to be bound by these Terms.
              </p>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Description of Services</h2>
                <p className="mb-4">
                  <Link to="/about" className="text-orange-500 hover:text-orange-600 underline" onClick={() => window.scrollTo(0, 0)}>Reboot Media, Inc.</Link> provides fractional Chief Marketing Officer (CMO) services, strategic marketing consulting, 
                  and related business advisory services to companies seeking C-level marketing expertise. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Quick-Win Strategy:</strong> 3-month strategic analysis and revenue growth strategy development</li>
                  <li><strong>Growth Strategy:</strong> 6-month strategic marketing implementation with ongoing guidance</li>
                  <li><strong>Fractional CMO:</strong> 12-month comprehensive marketing leadership transformation</li>
                  <li><strong>Strategic Consulting:</strong> Marketing audits, competitor analysis, and strategic recommendations</li>
                  <li><strong>Growth Advisory:</strong> Ongoing strategic guidance and business development support</li>
                  <li><strong>Marketing Analysis:</strong> Data-driven insights and performance optimization</li>
                </ul>
                <p className="mt-4">
                  <strong>Service Dependencies:</strong> Our services may involve third-party tools, platforms, and integrations 
                  for analytics, automation, and marketing execution. Service effectiveness may depend on these third-party systems.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Client Engagement and Responsibilities</h2>
                <p className="mb-4">
                  To engage our fractional CMO services, you must provide accurate information about your business, marketing 
                  challenges, and objectives. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Providing timely access to necessary business data, marketing metrics, and operational information</li>
                  <li>Participating in scheduled strategy sessions, meetings, and collaborative planning activities</li>
                  <li>Implementing recommended strategies and tactics within agreed-upon timeframes</li>
                  <li>Maintaining open communication about business changes that may affect our strategic recommendations</li>
                  <li>Respecting intellectual property rights and confidentiality obligations</li>
                  <li>Making timely payments according to agreed terms and schedules</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Acceptable Use</h2>
                <p className="mb-4">You agree to use our services and website only for lawful business purposes. You shall not:</p>
                <ul className="list-disc list-inside space-y-2">
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
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Service Limitations and Expectations</h2>
                <p className="mb-4">While we bring extensive C-level experience and proven methodologies, you acknowledge that:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Results Variability:</strong> Marketing outcomes depend on multiple factors including market conditions, execution quality, timing, and external factors beyond our control</li>
                  <li><strong>Implementation Dependency:</strong> Success requires your team's commitment to implementing recommended strategies and tactics</li>
                  <li><strong>Market Factors:</strong> External market conditions, competition, and economic factors may impact results</li>
                  <li><strong>Data Accuracy:</strong> Our recommendations are based on information you provide and market research; accuracy depends on data quality</li>
                  <li><strong>Timeframe Expectations:</strong> Strategic results typically require 6-12 months to materialize fully</li>
                  <li><strong>Collaboration Requirement:</strong> Our fractional model requires active collaboration and internal resource allocation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Intellectual Property and Confidentiality</h2>
                <p className="mb-4">
                  Our strategic frameworks, methodologies, templates, and proprietary tools remain the intellectual property 
                  of Reboot Media, Inc. You receive a limited license to use these materials for your internal business purposes only.
                </p>
                <p className="mb-4">
                  We maintain strict confidentiality regarding your business information, strategic plans, and proprietary data. 
                  Similarly, you agree to keep our methodologies, strategies, and business practices confidential.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Strategic recommendations and plans developed specifically for your business become your property</li>
                  <li>General methodologies, frameworks, and approaches remain our intellectual property</li>
                  <li>Case study rights may be negotiated separately with appropriate anonymization</li>
                  <li>Mutual non-disclosure agreements may supplement these terms for sensitive engagements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Payment Terms and Cancellation</h2>
                <p className="mb-4">
                  Payment terms are specified in individual service agreements. Standard terms include:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Payment Schedule:</strong> Monthly billing in advance for ongoing services</li>
                  <li><strong>Late Payments:</strong> Services may be suspended for payments more than 15 days overdue</li>
                  <li><strong>Cancellation Policy:</strong> 30-day written notice required for service termination</li>
                  <li><strong>Refund Policy:</strong> Refunds are provided on a case-by-case basis for undelivered services</li>
                  <li><strong>Scope Changes:</strong> Additional services or scope expansions require written agreement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Data and Privacy</h2>
                <p>
                  Your privacy and business confidentiality are important to us. All your information is governed by our{' '}
                  <Link to="/privacy" className="text-orange-500 hover:text-orange-600 underline" onClick={() => window.scrollTo(0, 0)}>comprehensive Privacy Policy</Link>. 
                  By engaging our services, you consent to the collection and use of information as described in the Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Service Termination</h2>
                <p className="mb-4">
                  Either party may terminate service agreements with 30 days' written notice. We may terminate services 
                  immediately for breach of these Terms, non-payment, or to protect our business interests.
                </p>
                <p>
                  Upon termination, you retain rights to strategies and recommendations already delivered, while we retain 
                  our intellectual property rights. Outstanding invoices remain payable, and confidentiality obligations continue.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Disclaimer of Warranties</h2>
                <p>
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM 
                  ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                  AND NON-INFRINGEMENT. WE MAKE NO GUARANTEES ABOUT SPECIFIC BUSINESS RESULTS, REVENUE INCREASES, OR MARKET 
                  PERFORMANCE. SUCCESS DEPENDS ON MULTIPLE FACTORS INCLUDING MARKET CONDITIONS, EXECUTION QUALITY, AND BUSINESS 
                  CIRCUMSTANCES BEYOND OUR CONTROL.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Limitation of Liability</h2>
                <p className="mb-4">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL REBOOT MEDIA, INC., ITS DIRECTORS, EMPLOYEES, OR 
                  AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING 
                  LOST PROFITS, BUSINESS INTERRUPTION, OR OPPORTUNITY COSTS, ARISING FROM OUR SERVICES OR RECOMMENDATIONS.
                </p>
                <p>
                  OUR TOTAL LIABILITY FOR ALL CLAIMS RELATING TO OUR SERVICES SHALL NOT EXCEED THE TOTAL AMOUNT PAID TO US IN 
                  THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $10,000, WHICHEVER IS GREATER.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Governing Law and Disputes</h2>
                <p className="mb-4">
                  These Terms shall be governed by the laws of the State of California, without regard to conflict of law provisions. 
                  Any disputes shall be subject to the exclusive jurisdiction of the state and federal courts located in Orange County, California.
                </p>
                <p>
                  Before initiating legal proceedings, parties agree to attempt good faith resolution through direct negotiation 
                  and, if necessary, mediation with a mutually agreed mediator.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Changes to Terms</h2>
                <p>
                  We may update these Terms to reflect changes in our services, legal requirements, or business practices. 
                  Material changes will be communicated with at least 30 days' notice. Continued use of our services after 
                  changes become effective constitutes acceptance of the revised Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Contact Information</h2>
                <p className="mb-4">
                  If you have questions about these Terms or our services, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                  <p className="font-medium">Reboot Media, Inc.</p>
                  <p>17595 Harvard Ave C-738</p>
                  <p>Irvine, CA 92614, USA</p>
                  <p>Email: {getObfuscatedEmailDisplay()}</p>
                  <p>Contact Form: <Link to="/contact" className="text-orange-500 hover:text-orange-600 underline" onClick={() => window.scrollTo(0, 0)}>Schedule consultation</Link></p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <GlobalFooter />
    </div>
  );
};

export default Terms;