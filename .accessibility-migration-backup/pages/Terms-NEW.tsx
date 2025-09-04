import { getCanonicalUrl } from '../utils/urls';
import PageTemplate from '../components/PageTemplate';
import type { PageTemplateProps } from '../components/PageTemplate';

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

  const pageConfig: PageTemplateProps = {
    seoProps: {
      title: "Terms of Service | Fractional CMO Consulting Agreement | Reboot Media",
      description: "Terms of service for Reboot Media's fractional CMO consulting services. Review our service agreements, client responsibilities, and business terms for strategic marketing leadership.",
      keywords: "terms of service, fractional CMO agreement, consulting terms, marketing service contract, CMO consulting agreement, business consulting terms, strategic marketing contract",
      canonicalUrl: getCanonicalUrl('terms'),
      ogTitle: "Terms of Service - Fractional CMO Consulting Agreement",
      ogDescription: "Review the terms and conditions for Reboot Media's fractional CMO consulting services and strategic marketing leadership.",
      structuredData: termsPageStructuredData,
    },
    hero: {
      variant: 'minimal',
      title: 'Terms of Service for Reboot Media',
      description: 'Effective Date: January 8, 2025',
    },
    containerMaxWidth: '4xl',
    content: [
      {
        id: 'terms-content',
        variant: 'glass',
        content: (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="heading-hero text-gradient-critical mb-4">
                Terms of Service for Reboot Media
              </h1>
              <p className="text-optional dark:text-gradient-safe">Effective Date: January 8, 2025</p>
            </div>
            
            <p className="text-standard dark:text-gradient-safe">
              Please read these Terms of Service ("Terms") carefully before using the https://www.rebootmedia.net website 
              (the "Service") and engaging with the marketing consulting services operated by Reboot Media, Inc. ("us", "we", or "our").
            </p>
            
            <p className="text-standard dark:text-gradient-safe">
              Your access to and use of the Service, as well as your engagement with our marketing consulting services, is conditioned 
              on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and clients who 
              access or use our website and services. By accessing our website or engaging our services, you agree to be bound by these Terms.
            </p>

            <section>
              <h2 className="heading-xl text-gradient-critical mb-4">1. Description of Services</h2>
              <p className="mb-4 text-standard dark:text-gradient-safe">
                Reboot Media, Inc. provides fractional Chief Marketing Officer (CMO) services, strategic marketing consulting, 
                and related business advisory services to companies seeking C-level marketing expertise. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-standard dark:text-gradient-safe">
                <li><strong>Quick-Win Strategy:</strong> 3-month strategic analysis and revenue growth strategy development</li>
                <li><strong>Growth Strategy:</strong> 6-month strategic marketing implementation with ongoing guidance</li>
                <li><strong>Fractional CMO:</strong> 12-month comprehensive marketing leadership transformation</li>
                <li><strong>Strategic Consulting:</strong> Marketing audits, competitor analysis, and strategic recommendations</li>
                <li><strong>Growth Advisory:</strong> Ongoing strategic guidance and business development support</li>
                <li><strong>Marketing Analysis:</strong> Data-driven insights and performance optimization</li>
              </ul>
              <p className="mt-4 text-standard dark:text-gradient-safe">
                <strong>Service Dependencies:</strong> Our services may involve third-party tools, platforms, and integrations 
                for analytics, automation, and marketing execution. Service effectiveness may depend on these third-party systems.
              </p>
            </section>

            <section>
              <h2 className="heading-xl text-gradient-critical mb-4">2. Client Engagement and Responsibilities</h2>
              <p className="mb-4 text-standard dark:text-gradient-safe">
                To engage our marketing consulting services, you must provide accurate information about your business, marketing 
                challenges, and objectives. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-standard dark:text-gradient-safe">
                <li>Providing timely access to necessary business data, marketing metrics, and operational information</li>
                <li>Participating in scheduled strategy sessions, meetings, and collaborative planning activities</li>
                <li>Implementing recommended strategies and tactics within agreed-upon timeframes</li>
                <li>Maintaining open communication about business changes that may affect our strategic recommendations</li>
                <li>Respecting intellectual property rights and confidentiality obligations</li>
                <li>Making timely payments according to agreed terms and schedules</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-xl text-gradient-critical mb-4">16. Contact Information</h2>
              <p className="mb-4 text-standard dark:text-gradient-safe">
                If you have questions about these Terms or our services, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="font-medium text-important-accessible dark:text-white">Reboot Media, Inc.</p>
                <p className="text-optional dark:luminescence-layer-3">17595 Harvard Ave C-738</p>
                <p className="text-optional dark:luminescence-layer-3">Irvine, CA 92614, USA</p>
                <p className="text-standard dark:text-gradient-safe">Contact Form: <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/contact`} className="text-orange-500 hover:text-orange-accessible focus-visible:text-orange-accessible underline">Submit inquiry</a></p>
              </div>
            </section>
          </div>
        )
      }
    ],
  };

  return <PageTemplate {...pageConfig} />;
};

export default Terms;