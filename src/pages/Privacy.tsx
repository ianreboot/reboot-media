
import { getCanonicalUrl } from '../utils/urls';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SEOHead from '../components/SEOHead';
import BackgroundGradient from '../components/BackgroundGradient';

const Privacy = () => {
  // Structured data now handled automatically by SEOHead component

  return (
    <div className="privacy-page min-h-screen relative overflow-hidden dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Sophisticated Background Gradient */}
      <BackgroundGradient />
      
      <div className="relative z-10">
      {/* Enhanced SEO Head */}
      <SEOHead 
        title="Privacy Policy | Fractional CMO Services Data Protection | Reboot Media"
        description="Learn how Reboot Media protects your personal information. Our privacy policy details data collection, usage, and protection practices for our fractional CMO consulting services. GDPR and CCPA compliant."
        canonicalUrl={getCanonicalUrl('privacy')}
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
                Privacy Policy for Reboot Media
              </h1>
              <p className="text-optional dark:replace-text-gray-300">Effective Date: January 8, 2025</p>
            </div>

            <div className="space-y-8">
              
              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">1. Introduction</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  Welcome to Reboot Media, Inc. ("we," "us," or "our"). We are committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, and disclose information about you when you use our 
                  fractional CMO services and website at https://www.rebootmedia.net/ (the "Service").
                </p>
                <p className="text-sm text-optional dark:replace-text-gray-400">
                  Our Company Address: 17595 Harvard Ave C-738, Irvine, CA 92614, USA.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="heading-lg text-important dark:text-white mb-3">Contact and Lead Generation Information:</h3>
                    <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                      <li><strong>Contact Forms:</strong> When you submit our contact form or request a consultation, we collect your name, email address, company information, website URL, and any additional details you provide about your business needs.</li>
                      <li><strong>Lead Qualification Data:</strong> Information about your business size, current marketing challenges, budget range, and strategic priorities to help us provide relevant marketing consulting services.</li>
                      <li><strong>Communication Records:</strong> Records of our email exchanges, consultation calls, and meeting notes to maintain continuity in our service delivery.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="heading-lg text-important dark:text-white mb-3">Website Analytics and Technical Information:</h3>
                    <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                      <li><strong>Usage Analytics:</strong> We collect data about how visitors interact with our website, including page views, session duration, bounce rates, and conversion funnel performance using Google Analytics.</li>
                      <li><strong>Device and Browser Information:</strong> Technical details such as IP address, browser type, device type, operating system, and screen resolution to optimize our website experience.</li>
                      <li><strong>Marketing Attribution:</strong> Information about how you found our website (search engines, referral sites, social media, direct traffic) to measure our marketing effectiveness.</li>
                      <li><strong>Local Storage:</strong> We may use browser storage to remember your preferences and improve your website experience.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="heading-lg text-important dark:text-white mb-3">Business Relationship Information:</h3>
                    <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                      <li><strong>Client Project Data:</strong> For active consulting engagements, we collect and analyze your marketing data, campaign performance metrics, customer insights, and strategic business information necessary to deliver our services.</li>
                      <li><strong>Calendar and Scheduling:</strong> Meeting preferences, availability, and scheduling information for consultations and ongoing strategic sessions.</li>
                      <li><strong>Payment Information:</strong> Billing details, payment method information, and transaction records (processed securely through third-party payment processors).</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>Service Delivery:</strong> To provide marketing consulting services, strategic consulting, marketing analysis, and ongoing business guidance tailored to your specific needs.</li>
                  <li><strong>Client Communication:</strong> To respond to inquiries, schedule consultations, send strategic recommendations, and maintain ongoing client relationships.</li>
                  <li><strong>Business Development:</strong> To qualify leads, understand market needs, and improve our service offerings based on client feedback and industry trends.</li>
                  <li><strong>Website Optimization:</strong> To improve our website user experience, measure conversion rates, and optimize our content for better engagement.</li>
                  <li><strong>Marketing and Outreach:</strong> To send relevant business insights, industry updates, and information about our services (with your consent and opt-out options).</li>
                  <li><strong>Legal and Compliance:</strong> To comply with applicable laws, protect our rights, prevent fraud, and ensure the security of our services.</li>
                  <li><strong>Performance Analysis:</strong> To measure the effectiveness of our marketing strategies and business development efforts.</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">4. Data Sharing and Disclosure</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  We do not sell or rent your personal information to third parties. We may share your information in these specific circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>Service Providers:</strong> We work with trusted third-party providers for website hosting, email services, analytics (Google Analytics), payment processing, and calendar scheduling. These providers only access information necessary to perform their functions.</li>
                  <li><strong>Client Project Collaboration:</strong> With your explicit consent, we may share relevant information with your internal team members or other service providers working on your marketing initiatives.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law, to protect our rights, prevent fraud, ensure user safety, or respond to legal processes.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>Aggregated Data:</strong> We may share anonymized, aggregated insights about industry trends and marketing performance that cannot identify individual clients or prospects.</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">5. Your Data Rights and Choices</h2>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>Access and Update:</strong> You can request access to your personal information and ask us to update or correct any inaccuracies.</li>
                  <li><strong>Data Deletion:</strong> You can request deletion of your personal information, subject to legal retention requirements and ongoing business relationships.</li>
                  <li><strong>Communication Preferences:</strong> You can opt-out of marketing communications at any time while maintaining essential service-related communications.</li>
                  <li><strong>Data Portability:</strong> You can request a copy of your personal information in a structured, machine-readable format.</li>
                  <li><strong>Consent Withdrawal:</strong> You can withdraw consent for specific data processing activities where consent is the legal basis.</li>
                </ul>
                <p className="mt-4 text-standard dark:replace-text-gray-300">
                  To exercise these rights, please contact us through our{' '}
                  <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/contact`} className="transparent-link">contact form</a>.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">6. Regional Privacy Rights and Compliance</h2>
                
                <h3 className="heading-lg text-important dark:text-white mb-3">California Residents (CCPA/CPRA) - Enhanced Rights:</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                  <li><strong>Right to Know:</strong> Request detailed information about categories and specific pieces of personal information we collect, sources, business purposes, and third parties with whom we share data</li>
                  <li><strong>Right to Delete:</strong> Request deletion of your personal information within 30 days (subject to legal retention requirements and ongoing business relationships)</li>
                  <li><strong>Right to Opt-Out:</strong> We do not sell or share personal information for cross-context behavioral advertising. You may opt-out of any future sales</li>
                  <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising privacy rights, including different pricing or service levels</li>
                  <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information within 30 days of verification</li>
                  <li><strong>Right to Limit Sensitive Data:</strong> Request limitations on use of sensitive personal information beyond business purposes</li>
                  <li><strong>Authorized Agent Requests:</strong> Designate authorized agents to make requests on your behalf with proper verification</li>
                </ul>

                <h3 className="heading-lg text-important dark:text-white mb-3">EU/UK Residents (GDPR) - Comprehensive Rights:</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                  <li><strong>Right to Access:</strong> Obtain confirmation of data processing and free access to your personal data within 30 days</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete personal data without undue delay</li>
                  <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion when data is no longer necessary, consent is withdrawn, or processing is unlawful</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured, commonly-used, machine-readable format and transmit to another controller</li>
                  <li><strong>Right to Object:</strong> Object to processing for legitimate interests, direct marketing, or research/statistical purposes</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation when accuracy is contested, processing is unlawful, or data is no longer needed but required for legal claims</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time for consent-based processing</li>
                  <li><strong>Right to Lodge Complaints:</strong> File complaints with supervisory authorities if you believe GDPR has been violated</li>
                </ul>

                <h3 className="heading-lg text-important dark:text-white mb-3">Response Timelines and Procedures:</h3>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>Standard Response:</strong> 30 days for most requests (may be extended by 60 days for complex requests)</li>
                  <li><strong>Identity Verification:</strong> Reasonable verification procedures to protect against fraudulent requests</li>
                  <li><strong>Free Exercise of Rights:</strong> No charge for requests unless excessive or repetitive</li>
                  <li><strong>Request Methods:</strong> Submit requests through our contact form or written notice to our business address</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">7. Enhanced Data Security and Retention</h2>
                
                <h3 className="heading-lg text-important dark:text-white mb-3">Security Measures</h3>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  We implement comprehensive security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                  <li><strong>Encryption:</strong> All data transmitted to and from our servers is encrypted using industry-standard SSL/TLS protocols</li>
                  <li><strong>Access Controls:</strong> Role-based access controls limit data access to authorized personnel only</li>
                  <li><strong>Data Storage:</strong> Personal information is stored on secure servers with multiple layers of protection</li>
                  <li><strong>Regular Audits:</strong> We conduct regular security assessments and vulnerability testing</li>
                  <li><strong>Employee Training:</strong> Staff receive regular training on data protection and privacy best practices</li>
                  <li><strong>Vendor Requirements:</strong> Third-party vendors must meet our security standards and sign data processing agreements</li>
                </ul>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  <em>Important:</em> While we implement robust security measures, no system is 100% secure. We cannot guarantee absolute security but commit to industry-leading practices.
                </p>

                <h3 className="heading-lg text-important dark:text-white mb-3">Data Retention Policies</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                  <li><strong>Active Client Data:</strong> Retained for the duration of our engagement plus seven years for business records</li>
                  <li><strong>Prospect Data:</strong> Retained for 36 months from last contact unless consent is withdrawn</li>
                  <li><strong>Website Analytics:</strong> Google Analytics data retained for 26 months (industry standard)</li>
                  <li><strong>Legal Requirements:</strong> Some data may be retained longer to comply with legal obligations</li>
                  <li><strong>Deletion Upon Request:</strong> Data deleted within 30 days of verified deletion requests (subject to legal retention requirements)</li>
                </ul>

                <h3 className="heading-lg text-important dark:text-white mb-3">Data Breach Response</h3>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  In the event of a data breach that may compromise your personal information, we commit to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-standard dark:replace-text-gray-300">
                  <li><strong>72-Hour Authority Notification:</strong> Report breaches to relevant authorities within 72 hours as required by law</li>
                  <li><strong>Prompt User Notification:</strong> Notify affected users without undue delay when high risk to rights and freedoms exists</li>
                  <li><strong>Transparent Communication:</strong> Provide clear information about the nature of the breach, data involved, and steps taken</li>
                  <li><strong>Remediation Actions:</strong> Implement immediate measures to contain the breach and prevent future occurrences</li>
                  <li><strong>Cooperation:</strong> Work with law enforcement and regulatory authorities as needed</li>
                </ul>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">8. International Data Transfers</h2>
                <p className="text-standard dark:replace-text-gray-300">
                  Your information is processed and stored in the United States. If you are accessing our services from outside 
                  the United States, please be aware that your information may be transferred to, stored, and processed in the 
                  United States, which may have different privacy laws than your country of residence. We ensure appropriate 
                  safeguards are in place for international transfers.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">9. Children's Privacy</h2>
                <p className="text-standard dark:replace-text-gray-300">
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal 
                  information from children under 18. If we become aware of such collection, we will take steps to delete the 
                  information promptly.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">10. Cookies and Tracking Technologies</h2>
                
                <h3 className="heading-lg text-important dark:text-white mb-3">Types of Cookies We Use</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                  <li><strong>Essential Cookies:</strong> Necessary for website functionality, user preferences, and session management</li>
                  <li><strong>Analytics Cookies:</strong> Google Analytics cookies to understand website usage and improve user experience</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences like dark/light mode and language settings</li>
                  <li><strong>No Marketing Cookies:</strong> We do not use cookies for advertising or cross-site tracking</li>
                </ul>

                <h3 className="heading-lg text-important dark:text-white mb-3">Cookie Control and Opt-Out</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                  <li><strong>Browser Settings:</strong> You can control cookies through your browser settings</li>
                  <li><strong>Google Analytics Opt-Out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-accessible underline">Google Analytics Opt-out Browser Add-on</a></li>
                  <li><strong>Do Not Track:</strong> We respect Do Not Track signals where technically feasible</li>
                  <li><strong>Cookie Lifespan:</strong> Most cookies expire after 26 months of inactivity</li>
                </ul>

                <h3 className="heading-lg text-important dark:text-white mb-3">Local Storage</h3>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  We use browser local storage to remember your preferences (theme, language) and improve your experience. 
                  This data stays on your device and can be cleared through browser settings.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">11. Third-Party Services and Data Sharing</h2>
                
                <h3 className="heading-lg text-important dark:text-white mb-3">Service Providers</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                  <li><strong>Google Analytics:</strong> Website usage analytics (data processed in US, subject to Google's privacy policy)</li>
                  <li><strong>Hosting Providers:</strong> Website hosting and content delivery (data processed in US/EU)</li>
                  <li><strong>Email Services:</strong> Client communication and marketing (when explicitly consented)</li>
                  <li><strong>Calendar Systems:</strong> Appointment scheduling for consultations</li>
                  <li><strong>Payment Processors:</strong> Secure payment processing (PCI DSS compliant)</li>
                </ul>

                <h3 className="heading-lg text-important dark:text-white mb-3">Data Processing Agreements</h3>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  All third-party service providers are required to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-standard dark:replace-text-gray-300">
                  <li>Sign data processing agreements (DPAs) meeting GDPR/CCPA standards</li>
                  <li>Implement appropriate technical and organizational measures</li>
                  <li>Process data only for specified purposes</li>
                  <li>Notify us of any data breaches within 24 hours</li>
                  <li>Delete or return data upon termination of services</li>
                </ul>

                <h3 className="heading-lg text-important dark:text-white mb-3">No Data Sales</h3>
                <p className="text-standard dark:replace-text-gray-300">
                  <strong>We do not sell, rent, or trade your personal information to third parties.</strong> We may share 
                  aggregated, anonymized data for industry research or business development purposes that cannot identify individuals.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-standard dark:replace-text-gray-300">
                  We may update this Privacy Policy to reflect changes in our practices, legal requirements, or service 
                  functionality. We will post the updated policy on this page with a new effective date and, for material 
                  changes, may provide additional notification through email or prominent website notice.
                </p>
              </section>

              <section>
                <h2 className="heading-xl text-gradient-critical mb-4">13. Contact Us</h2>
                <p className="mb-4 text-standard dark:replace-text-gray-300">
                  If you have questions about this Privacy Policy, your data rights, or wish to exercise any of your privacy 
                  rights, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                  <p className="font-medium text-important dark:text-white">Reboot Media, Inc.</p>
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

export default Privacy;