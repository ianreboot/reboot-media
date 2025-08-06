
import { Link } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import { getObfuscatedEmailDisplay } from '../utils/emailUtils';

const Privacy = () => {
  // SEO structured data
  const privacyPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "Privacy policy for Reboot Media fractional CMO services",
    "url": "https://www.rebootmedia.net/privacy",
    "mainEntity": {
      "@type": "PrivacyPolicy",
      "name": "Reboot Media Privacy Policy",
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
        title="Privacy Policy | Fractional CMO Services Data Protection | Reboot Media"
        description="Learn how Reboot Media protects your personal information. Our privacy policy details data collection, usage, and protection practices for our fractional CMO consulting services. GDPR and CCPA compliant."
        keywords="privacy policy, data protection, GDPR compliance, CCPA compliance, fractional CMO privacy, marketing consultant data security, client confidentiality, business consulting privacy"
        canonicalUrl="https://www.rebootmedia.net/privacy"
        ogTitle="Privacy Policy - Data Protection for Fractional CMO Services"
        ogDescription="Comprehensive privacy policy for Reboot Media's fractional CMO services. Learn about our data protection practices and your privacy rights."
        structuredData={privacyPageStructuredData}
      />
      
      {/* Global Header */}
      <GlobalHeader />

      {/* Main Content */}
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-8 sm:p-12">
            
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy Policy for Reboot Media
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Effective Date: January 8, 2025</p>
            </div>

            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to Reboot Media, Inc. ("we," "us," or "our"). We are committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, and disclose information about you when you use our 
                  <Link to="/about" className="text-orange-500 hover:text-orange-600 underline" onClick={() => window.scrollTo(0, 0)}>fractional CMO services</Link> and website at https://www.rebootmedia.net/ (the "Service").
                </p>
                <p className="text-sm">
                  Our Company Address: 17595 Harvard Ave C-738, Irvine, CA 92614, USA.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3">Contact and Lead Generation Information:</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Contact Forms:</strong> When you submit our contact form or request a consultation, we collect your name, email address, company information, website URL, and any additional details you provide about your business needs.</li>
                  <li><strong>Lead Qualification Data:</strong> Information about your business size, current marketing challenges, budget range, and strategic priorities to help us provide relevant fractional CMO services.</li>
                  <li><strong>Communication Records:</strong> Records of our email exchanges, consultation calls, and meeting notes to maintain continuity in our service delivery.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Website Analytics and Technical Information:</h3>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Usage Analytics:</strong> We collect data about how visitors interact with our website, including page views, session duration, bounce rates, and conversion funnel performance using Google Analytics.</li>
                  <li><strong>Device and Browser Information:</strong> Technical details such as IP address, browser type, device type, operating system, and screen resolution to optimize our website experience.</li>
                  <li><strong>Marketing Attribution:</strong> Information about how you found our website (search engines, referral sites, social media, direct traffic) to measure our marketing effectiveness.</li>
                  <li><strong>Local Storage:</strong> We may use browser storage to remember your preferences and improve your website experience.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Business Relationship Information:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Client Project Data:</strong> For active fractional CMO engagements, we collect and analyze your marketing data, campaign performance metrics, customer insights, and strategic business information necessary to deliver our services.</li>
                  <li><strong>Calendar and Scheduling:</strong> Meeting preferences, availability, and scheduling information for consultations and ongoing strategic sessions.</li>
                  <li><strong>Payment Information:</strong> Billing details, payment method information, and transaction records (processed securely through third-party payment processors).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Service Delivery:</strong> To provide <Link to="/about" className="text-orange-500 hover:text-orange-600 underline" onClick={() => window.scrollTo(0, 0)}>fractional CMO services</Link>, strategic consulting, marketing analysis, and ongoing business guidance tailored to your specific needs.</li>
                  <li><strong>Client Communication:</strong> To respond to inquiries, schedule consultations, send strategic recommendations, and maintain ongoing client relationships.</li>
                  <li><strong>Business Development:</strong> To qualify leads, understand market needs, and improve our service offerings based on client feedback and industry trends.</li>
                  <li><strong>Website Optimization:</strong> To improve our website user experience, measure conversion rates, and optimize our content for better engagement.</li>
                  <li><strong>Marketing and Outreach:</strong> To send relevant business insights, industry updates, and information about our services (with your consent and opt-out options).</li>
                  <li><strong>Legal and Compliance:</strong> To comply with applicable laws, protect our rights, prevent fraud, and ensure the security of our services.</li>
                  <li><strong>Performance Analysis:</strong> To measure the effectiveness of our marketing strategies and business development efforts.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Sharing and Disclosure</h2>
                <p className="mb-4">
                  We do not sell or rent your personal information to third parties. We may share your information in these specific circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Service Providers:</strong> We work with trusted third-party providers for website hosting, email services, analytics (Google Analytics), payment processing, and calendar scheduling. These providers only access information necessary to perform their functions.</li>
                  <li><strong>Client Project Collaboration:</strong> With your explicit consent, we may share relevant information with your internal team members or other service providers working on your marketing initiatives.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law, to protect our rights, prevent fraud, ensure user safety, or respond to legal processes.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>Aggregated Data:</strong> We may share anonymized, aggregated insights about industry trends and marketing performance that cannot identify individual clients or prospects.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Your Data Rights and Choices</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Access and Update:</strong> You can request access to your personal information and ask us to update or correct any inaccuracies.</li>
                  <li><strong>Data Deletion:</strong> You can request deletion of your personal information, subject to legal retention requirements and ongoing business relationships.</li>
                  <li><strong>Communication Preferences:</strong> You can opt-out of marketing communications at any time while maintaining essential service-related communications.</li>
                  <li><strong>Data Portability:</strong> You can request a copy of your personal information in a structured, machine-readable format.</li>
                  <li><strong>Consent Withdrawal:</strong> You can withdraw consent for specific data processing activities where consent is the legal basis.</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at {getObfuscatedEmailDisplay()} or through our{' '}
                  <Link to="/contact" className="text-orange-500 hover:text-orange-600 underline" onClick={() => window.scrollTo(0, 0)}>fractional CMO contact page</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Regional Privacy Rights</h2>
                
                <h3 className="text-xl font-semibold mb-3">California Residents (CCPA/CPRA):</h3>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li><strong>Right to Know:</strong> Request information about categories and specific pieces of personal information we collect</li>
                  <li><strong>Right to Delete:</strong> Request deletion of your personal information (subject to certain exceptions)</li>
                  <li><strong>Right to Opt-Out:</strong> We do not sell personal information, but you can opt-out of any future sales</li>
                  <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights</li>
                  <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">EU/UK Residents (GDPR):</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Right to Access:</strong> Obtain confirmation of data processing and access to your personal data</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete personal data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data under certain conditions</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                  <li><strong>Right to Object:</strong> Object to processing of your personal data for certain purposes</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of processing under specific circumstances</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Data Security and Retention</h2>
                <p className="mb-4">
                  We implement industry-standard security measures to protect your information, including encrypted data 
                  transmission, secure data storage, access controls, and regular security audits. However, no security 
                  system is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p className="mb-4">
                  <strong>Data Retention:</strong> We retain your information for as long as necessary to provide our services, 
                  comply with legal obligations, resolve disputes, and enforce our agreements. Client project data is typically 
                  retained for the duration of our engagement plus seven years for business records purposes.
                </p>
                <p>
                  <strong>Data Breach Notification:</strong> In the unlikely event of a data breach that may compromise your 
                  personal information, we will notify affected users and relevant authorities as required by applicable laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. International Data Transfers</h2>
                <p>
                  Your information is processed and stored in the United States. If you are accessing our services from outside 
                  the United States, please be aware that your information may be transferred to, stored, and processed in the 
                  United States, which may have different privacy laws than your country of residence. We ensure appropriate 
                  safeguards are in place for international transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal 
                  information from children under 18. If we become aware of such collection, we will take steps to delete the 
                  information promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Third-Party Services</h2>
                <p className="mb-4">
                  Our website and services may contain links to third-party websites or integrate with third-party services 
                  (such as Google Analytics, calendar systems, or social media platforms). We are not responsible for the 
                  privacy practices of these third parties. We encourage you to review their privacy policies.
                </p>
                <p>
                  <strong>Google Analytics:</strong> We use Google Analytics to understand website usage patterns. Google Analytics 
                  collects information such as how often users visit our site, what pages they visit, and referral sources. 
                  You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy to reflect changes in our practices, legal requirements, or service 
                  functionality. We will post the updated policy on this page with a new effective date and, for material 
                  changes, may provide additional notification through email or prominent website notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Contact Us</h2>
                <p className="mb-4">
                  If you have questions about this Privacy Policy, your data rights, or wish to exercise any of your privacy 
                  rights, please contact us:
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

export default Privacy;