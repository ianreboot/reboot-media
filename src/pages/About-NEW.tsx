import { CheckCircle, Award, TrendingUp, Users, Globe, Briefcase } from 'lucide-react';
import { getCanonicalUrl } from '../utils/urls';
import PageTemplate from '../components/PageTemplate';
import type { PageTemplateProps } from '../components/PageTemplate';

const About = () => {
  // SEO structured data
  const aboutPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Reboot Media",
    "description": "Learn about Reboot Media's fractional CMO services and C-level marketing expertise",
    "url": "https://www.rebootmedia.net/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Reboot Media, Inc.",
      "foundingDate": "2020",
      "description": "Fractional CMO services with Fortune 500 executive experience",
      "url": "https://www.rebootmedia.net/",
      "founder": {
        "@type": "Person",
        "name": "Ian Ho",
        "url": "https://www.linkedin.com/in/ian-ho/"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "17595 Harvard Ave C-738",
        "addressLocality": "Irvine",
        "addressRegion": "CA",
        "postalCode": "92614",
        "addressCountry": "US"
      }
    }
  };

  const pageConfig: PageTemplateProps = {
    seoProps: {
      title: "About Us | Fortune 500 Fractional CMO Leadership | Reboot Media",
      description: "Meet the team behind Reboot Media's fractional CMO services. Led by Ian Ho with 15+ years Fortune 500 C-level marketing experience managing $2B+ revenue. Founded 2020, serving companies globally with proven strategic marketing leadership.",
      keywords: "about fractional CMO, Fortune 500 marketing executive, CMO consulting team, marketing leadership experience, Ian Ho CMO, Reboot Media founder, C-level marketing expertise, strategic marketing consultant",
      canonicalUrl: getCanonicalUrl('about'),
      ogTitle: "About Reboot Media - Fortune 500 Fractional CMO Leadership",
      ogDescription: "Led by Fortune 500 marketing executive Ian Ho with $2B+ revenue management experience. Get proven C-level marketing leadership for your growing business.",
      structuredData: aboutPageStructuredData,
    },
    hero: {
      variant: 'default',
      title: 'About Reboot Media',
      description: 'Fractional CMO services with proven C-level executive experience from Fortune 500 companies. We don\'t just give advice – we deliver battle-tested strategies that drive measurable growth.',
    },
    content: [
      {
        id: 'company-story',
        title: 'Our Story',
        variant: 'glass',
        content: (
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-standard-accessible dark:text-gradient-safe">
              <p className="text-lg leading-relaxed">
                Founded in 2020, Reboot Media was born from a simple realization: most growing companies struggle 
                with marketing not because they lack resources, but because they lack proven strategic leadership.
              </p>
              <p>
                After managing $2B+ in revenue across 20+ US companies and guiding Fortune 500 marketing strategies, 
                our founder saw the same patterns repeatedly – talented teams trapped by amateur-hour decision making.
              </p>
              <p>
                We created Reboot Media to bridge this gap, providing C-level marketing expertise without the 
                full-time executive cost. Our fractional CMO model gives you access to Fortune 500-caliber 
                strategy and execution at a fraction of traditional consulting costs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 p-6 rounded-xl">
              <h3 className="heading-lg text-important-accessible dark:text-white mb-4">Why "Reboot" Media?</h3>
              <p className="text-standard-accessible dark:text-gradient-safe">
                Sometimes the best solution isn't to add more features – it's to restart with a clean, 
                proven foundation. We help companies "reboot" their marketing with strategies that actually work, 
                eliminating the guesswork and focusing on what drives real business results.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'leadership',
        title: 'Leadership',
        variant: 'glass',
        content: (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <div className="w-48 h-48 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl mx-auto flex items-center justify-center">
                  <div className="text-6xl font-bold text-white">IH</div>
                </div>
              </div>
              <div className="lg:w-2/3 space-y-4">
                <h3 className="heading-lg text-important-accessible dark:text-white">Ian Ho</h3>
                <p className="text-lg text-orange-accessible dark:text-orange-400 font-semibold">Founder & Fractional CMO</p>
                <p className="text-standard-accessible dark:text-gradient-safe leading-relaxed">
                  With over 15 years of C-level marketing experience across Fortune 500 companies, Ian has managed 
                  marketing budgets exceeding $2B and driven growth strategies for companies from startup to enterprise scale.
                </p>
                <p className="text-standard-accessible dark:text-gradient-safe leading-relaxed">
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
        )
      },
      {
        id: 'company-stats',
        variant: 'default',
        content: (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center">
              <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">$2B+</div>
              <p className="text-optional dark:luminescence-layer-3">Revenue Managed</p>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center">
              <Briefcase className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">20+</div>
              <p className="text-optional dark:luminescence-layer-3">US Companies</p>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center">
              <Award className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">3X</div>
              <p className="text-optional dark:luminescence-layer-3">Average Revenue Growth</p>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 text-center">
              <Globe className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Global</div>
              <p className="text-sm text-accessible-min dark:luminescence-layer-3">USA • Bangkok • Singapore</p>
            </div>
          </div>
        )
      },
      {
        id: 'our-approach',
        title: 'Our Approach',
        variant: 'glass',
        content: (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="heading-md text-important-accessible dark:text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                The Fresh Eyes Advantage
              </h3>
              <p className="text-standard-accessible dark:text-gradient-safe leading-relaxed">
                Outside perspective cuts through internal assumptions and politics. We see opportunities 
                your team misses because they're too close to the problem. This objectivity is your competitive advantage.
              </p>
            </div>
            <div>
              <h3 className="heading-md text-important-accessible dark:text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Battle-Tested Strategies
              </h3>
              <p className="text-standard-accessible dark:text-gradient-safe leading-relaxed">
                Every recommendation comes from proven Fortune 500 experience. We don't experiment with your business – 
                we apply strategies that have already worked at scale.
              </p>
            </div>
            <div>
              <h3 className="heading-md text-important-accessible dark:text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                C-Level Expertise
              </h3>
              <p className="text-standard-accessible dark:text-gradient-safe leading-relaxed">
                Access to executive-level strategic thinking without the $300K+ annual cost. Get Fortune 500 
                caliber marketing leadership at a fraction of traditional consulting rates.
              </p>
            </div>
            <div>
              <h3 className="heading-md text-important-accessible dark:text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Measurable Results
              </h3>
              <p className="text-standard-accessible dark:text-gradient-safe leading-relaxed">
                We focus on metrics that matter: revenue growth, market share expansion, and customer lifetime value. 
                Our success is measured by your business results, not vanity metrics.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'values',
        title: 'Our Values',
        variant: 'glass',
        content: (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-accessible dark:text-orange-400" />
              </div>
              <h3 className="heading-md text-important-accessible dark:text-white mb-2">Results-Driven</h3>
              <p className="text-optional dark:luminescence-layer-3 text-sm">Every strategy must drive measurable business growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-accessible dark:text-blue-400" />
              </div>
              <h3 className="heading-md text-important-accessible dark:text-white mb-2">Excellence</h3>
              <p className="text-optional dark:luminescence-layer-3 text-sm">Fortune 500 standards applied to every engagement</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="heading-md text-important-accessible dark:text-white mb-2">Transparency</h3>
              <p className="text-optional dark:luminescence-layer-3 text-sm">Clear communication and honest feedback always</p>
            </div>
          </div>
        )
      }
    ],
    footerCTA: {
      title: 'Ready to Work Together?',
      description: 'Stop fumbling with amateur advice. Get battle-tested strategies from executives who\'ve guided Fortune 500 brands to measurable growth. Privacy protected.',
      variant: 'gradient',
      gradient: 'orange',
      buttons: [
        {
          text: 'Get Your Free Marketing Analysis',
          variant: 'secondary',
          size: 'lg'
        }
      ]
    },
    containerMaxWidth: '6xl',
  };

  return <PageTemplate {...pageConfig} />;
};

export default About;