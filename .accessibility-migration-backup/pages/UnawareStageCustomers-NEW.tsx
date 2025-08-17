import { useEffect } from 'react';
import { getCanonicalUrl } from '../utils/urls';
import PageTemplate from '../components/PageTemplate';
import type { PageTemplateProps } from '../components/PageTemplate';

const UnawareStageCustomers = () => {
  useEffect(() => {
    document.title = "Unaware Stage Customers: When They Don't Know The Problem Exists | Reboot Media";
  }, []);

  const pageConfig: PageTemplateProps = {
    seoProps: {
      title: "Unaware Stage Customers: When They Don't Know The Problem Exists | Reboot Media",
      description: "Real examples of unaware stage customers who think everything is fine. Learn what they're actually thinking and how to help them recognize problems they didn't know they had.",
      canonicalUrl: getCanonicalUrl('unaware-stage-customers'),
    },
    hero: {
      variant: 'gradient',
      gradient: 'slate',
      title: (
        <>
          "Everything Is Fine"
          <span className="block text-orange-500 mt-2">When Customers Don't Know They're Bleeding Money</span>
        </>
      ),
      description: 'These prospects think their biggest problem is getting more leads. The reality? They\'re solving the wrong problem entirely, and every day of confusion costs them customers.',
    },
    breadcrumbs: [
      {
        text: 'Marketing Psychology',
        href: `${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`
      },
      {
        text: 'Unaware Stage Customers',
        isActive: true
      }
    ],
    content: [
      {
        id: 'introduction',
        content: (
          <p className="text-lg text-important-accessible dark:text-gradient-safe mb-6">
            Unaware stage customers are the most dangerous for your business. They're convinced they're doing fine when they're actually hemorrhaging opportunities. Here are real examples of what they say and what's actually happening.
          </p>
        )
      },
      {
        id: 'real-examples',
        title: 'What Unaware Customers Actually Say (And What\'s Really Happening)',
        content: (
          <div className="space-y-8">
            {/* Example 1 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <div className="mb-4">
                <h3 className="heading-lg text-important-accessible dark:text-white mb-2">Customer says:</h3>
                <p className="text-standard dark:text-gradient-safe italic">"We built the best product but no one gets it"</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                <p className="text-standard dark:text-gradient-safe">You're speaking engineer, they're thinking business results. Your "advanced features" sound like expensive complications to someone trying to solve a simple problem.</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                <p className="text-standard dark:text-gradient-safe">Start with the cost of their current broken process. Instead of "Our AI-powered analytics platform," try "Stop losing $3,000 monthly to decisions made on gut feeling instead of data."</p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">People buy to solve pain, not to get features. When you lead with the financial impact of their current situation, you're speaking their language: business results.</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <div className="mb-4">
                <h3 className="heading-lg text-important-accessible dark:text-white mb-2">Customer says:</h3>
                <p className="text-standard dark:text-gradient-safe italic">"We just need more traffic to our website"</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Real problem:</h3>
                <p className="text-standard dark:text-gradient-safe">More traffic to a broken experience just means more people saying no. They're treating symptoms while the disease spreads.</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">What to do instead:</h3>
                <p className="text-standard dark:text-gradient-safe">Help them see the real math. "Before sending more people to a site where 90% leave confused, let's figure out why your current visitors aren't buying. More confused people isn't the solution."</p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="heading-md font-semibold text-blue-800 dark:text-blue-200 mb-2">Why this works:</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">It reframes their thinking from "more" to "better." Most businesses fail not from lack of traffic but from poor conversion of existing traffic.</p>
              </div>
            </div>

            {/* More examples would go here... */}
          </div>
        )
      },
      {
        id: 'key-insights',
        title: 'The Pattern: What Unaware Customers Really Need',
        content: (
          <div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-6">
              <p className="text-orange-800 dark:text-orange-200 mb-4">
                <strong>The unaware customer's biggest enemy isn't competition—it's comfort with dysfunction.</strong>
              </p>
              <p className="text-orange-700 dark:text-orange-300">
                They've normalized problems that are costing them thousands monthly. Your job isn't to sell them a solution; it's to help them see the problem clearly for the first time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h3 className="heading-lg text-important-accessible dark:text-white mb-3">What NOT to do:</h3>
                <ul className="text-standard dark:text-gradient-safe space-y-2 text-sm">
                  <li>• Lead with features or capabilities</li>
                  <li>• Assume they understand the problem</li>
                  <li>• Use industry jargon or technical terms</li>
                  <li>• Push for immediate solutions</li>
                  <li>• Compare yourself to competitors they don't know</li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h3 className="heading-lg text-important-accessible dark:text-white mb-3">What TO do:</h3>
                <ul className="text-standard dark:text-gradient-safe space-y-2 text-sm">
                  <li>• Start with the cost of their current situation</li>
                  <li>• Use their exact language and concerns</li>
                  <li>• Provide gentle education, not sales pressure</li>
                  <li>• Show what success looks like for similar companies</li>
                  <li>• Focus on business outcomes, not tools</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }
    ],
    footerCTA: {
      title: 'Are You Struggling with Customers Who Don\'t Even Know You Exist?',
      description: 'Stop wasting months trying to convince people who think everything is fine. Get our systematic approach to turning unaware prospects into eager customers who finally understand what they\'ve been missing.',
      variant: 'gradient',
      gradient: 'slate',
      buttons: [
        {
          text: 'Get Your Free Marketing Psychology Analysis →',
          variant: 'primary',
          size: 'xl'
        }
      ]
    },
    containerMaxWidth: '4xl',
  };

  // Add navigation section after the main content
  const navigationSection = (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <a 
          href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`}
          className="text-accessible-min dark:luminescence-layer-3 hover:text-orange-accessible focus-visible:text-orange-accessible dark:hover:text-orange-400 focus-visible:text-orange-400 transition-colors"
        >
          ← Back to Marketing Psychology Overview
        </a>
        <a 
          href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/problem-aware-stage-customers`}
          className="text-orange-accessible dark:text-orange-400 hover:text-orange-700 focus-visible:text-orange-700 dark:hover:text-orange-300 focus-visible:text-orange-300 font-semibold transition-colors"
        >
          Next: Problem-Aware Stage Customers →
        </a>
      </div>
    </section>
  );

  // Add the navigation section to content
  pageConfig.content.push({
    id: 'navigation',
    variant: 'default',
    content: navigationSection
  });

  return <PageTemplate {...pageConfig} />;
};

export default UnawareStageCustomers;