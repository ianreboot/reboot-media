/**
 * SEO Utilities for Reboot Media
 * Comprehensive SEO optimization functions for lead generation and organic growth
 */

import { getCanonicalUrl, getOgImageUrl } from './urls';

// Primary keywords for fractional CMO services
export const PRIMARY_KEYWORDS = [
  'fractional CMO',
  'fractional chief marketing officer',
  'marketing psychology',
  'growth plateau solutions',
  'revenue growth strategy',
  'customer acquisition',
  'marketing leadership',
  'conversion optimization',
  'B2B marketing strategy',
  'marketing consultant'
];

// Geographic targeting keywords
export const GEO_KEYWORDS = [
  'fractional CMO services US',
  'marketing consultant USA',
  'remote fractional CMO',
  'virtual CMO services',
  'online marketing strategy',
  'digital marketing leadership'
];

// Long-tail conversion keywords
export const CONVERSION_KEYWORDS = [
  'when to hire fractional CMO',
  'fractional CMO vs agency',
  'marketing psychology principles',
  'customer awareness stages',
  'revenue plateau breakthrough',
  'marketing ROI optimization',
  'growth-stage marketing strategy'
];

// Page-specific SEO configurations
export const PAGE_SEO_CONFIG = {
  home: {
    title: 'Fractional CMO Services | Marketing Psychology Expert | Reboot Media',
    description: 'Break through revenue plateaus with psychology-driven fractional CMO services. 150-300% growth for $500K-$5M companies. 27 success stories. Start your transformation today.',
    keywords: [...PRIMARY_KEYWORDS, 'fractional CMO services', 'marketing psychology expert', 'revenue growth'].join(', '),
    structuredData: 'organization'
  },
  'marketing-psychology': {
    title: 'Marketing Psychology Principles That Drive Conversions | 5 Customer Stages',
    description: 'Master the 5 customer awareness stages and conversion psychology principles that Fortune 500 companies use. Transform marketing from guesswork into predictable revenue growth.',
    keywords: ['marketing psychology', 'customer awareness stages', 'conversion psychology', 'behavioral marketing', 'psychology-driven marketing'].join(', '),
    structuredData: 'article'
  },
  'fractional-cmo-guide': {
    title: 'Fractional CMO Guide: When to Hire, Cost & ROI | Complete 2025 Guide',
    description: 'Complete fractional CMO guide: When to hire, typical costs ($5K-18K/month), ROI expectations, and how to choose the right fractional CMO for your $500K-$5M company.',
    keywords: ['fractional CMO guide', 'fractional CMO cost', 'when to hire fractional CMO', 'fractional CMO ROI', 'fractional CMO services'].join(', '),
    structuredData: 'article'
  },
  'growth-plateau-solutions': {
    title: 'Growth Plateau Solutions: Break Through Revenue Ceilings | 7 Proven Strategies',
    description: '7 proven strategies to break through revenue plateaus and scale from $500K to $5M+. Psychology-driven approach used by 500+ companies worldwide.',
    keywords: ['growth plateau solutions', 'revenue ceiling breakthrough', 'scale revenue', 'growth-stage marketing', 'revenue plateau'].join(', '),
    structuredData: 'article'
  },
  about: {
    title: 'About Ian Ho | Fractional CMO & Marketing Psychology Expert | Reboot Media',
    description: 'Meet Ian Ho, fractional CMO and marketing psychology expert. 15+ years driving 150-300% revenue growth for growth-stage companies using proven psychological frameworks.',
    keywords: ['Ian Ho fractional CMO', 'marketing psychology expert', 'fractional CMO experience', 'marketing consultant biography'].join(', '),
    structuredData: 'person'
  },
  contact: {
    title: 'Get Fractional CMO Services | Free Strategy Call | Reboot Media',
    description: 'Ready to break through your revenue plateau? Get a free 30-minute strategy call with fractional CMO Ian Ho. Discover your growth blockers and next steps.',
    keywords: ['fractional CMO consultation', 'marketing strategy call', 'fractional CMO contact', 'marketing psychology audit'].join(', '),
    structuredData: 'contact'
  }
};

/**
 * Generate comprehensive meta tags for a page
 */
export interface SEOMetaConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  articleAuthor?: string;
  articlePublisher?: string;
  businessPhone?: string;
  businessEmail?: string;
}

export const generateMetaTags = (config: SEOMetaConfig): string => {
  const {
    title,
    description,
    keywords,
    canonicalUrl,
    ogTitle = title,
    ogDescription = description,
    ogImage = getOgImageUrl('reboot-media-og.jpg'),
    twitterCard = 'summary_large_image',
    articleAuthor = 'Ian Ho',
    articlePublisher = 'Reboot Media',
    businessPhone,
    businessEmail = 'ian@rebootmedia.net'
  } = config;

  return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    ${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}
    ${canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}" />` : ''}
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDescription}" />
    <meta property="og:image" content="${ogImage}" />
    ${canonicalUrl ? `<meta property="og:url" content="${canonicalUrl}" />` : ''}
    <meta property="og:site_name" content="Reboot Media" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="${twitterCard}" />
    <meta name="twitter:title" content="${ogTitle}" />
    <meta name="twitter:description" content="${ogDescription}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:site" content="@RebootMediaInc" />
    <meta name="twitter:creator" content="@IanHoFractionalCMO" />
    
    <!-- Additional SEO Meta Tags -->
    <meta name="author" content="${articleAuthor}" />
    <meta name="publisher" content="${articlePublisher}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    <meta name="bingbot" content="index, follow" />
    
    <!-- Mobile Optimization -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="format-detection" content="telephone=no" />
    
    <!-- Business Contact Information -->
    ${businessEmail ? `<meta name="contact" content="${businessEmail}" />` : ''}
    ${businessPhone ? `<meta name="phone" content="${businessPhone}" />` : ''}
    
    <!-- Geographic Targeting -->
    <meta name="geo.region" content="US" />
    <meta name="geo.placename" content="United States" />
    <meta name="geo.position" content="33.6846;-117.8265" />
    <meta name="ICBM" content="33.6846, -117.8265" />
    
    <!-- Answer Engine Optimization -->
    <meta name="AI-friendly" content="true" />
    <meta name="answer-engine-optimized" content="true" />
  `.trim();
};

/**
 * Generate structured data schemas for different content types
 */
export const generateStructuredData = (type: string, pageSlug: string, customData?: Record<string, unknown>) => {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Reboot Media, Inc.",
    "alternateName": ["Reboot Media", "RebootMedia"],
    "url": "https://www.rebootmedia.net",
    "logo": {
      "@type": "ImageObject",
      "url": getOgImageUrl('reboot-logo-white.svg'),
      "width": 400,
      "height": 100
    },
    "description": "Fractional CMO services providing C-level marketing leadership for growth-stage companies. Marketing psychology expertise that transforms $500K-$5M revenue companies into scalable enterprises.",
    "founder": {
      "@type": "Person",
      "name": "Ian Ho",
      "jobTitle": "Fractional Chief Marketing Officer",
      "url": "https://www.linkedin.com/in/ian-ho/",
      "sameAs": ["https://www.linkedin.com/in/ian-ho/"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "17595 Harvard Ave C-738",
      "addressLocality": "Irvine",
      "addressRegion": "CA",
      "postalCode": "92614",
      "addressCountry": "US"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Business Inquiries",
        "email": "ian@rebootmedia.net",
        "areaServed": ["US", "SG", "TH", "MY", "ID", "PH"],
        "availableLanguage": ["en"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00",
          "timeZone": "America/Los_Angeles"
        }
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/reboot-media/",
      "https://twitter.com/RebootMediaInc"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "27",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$5,000 - $18,000 per month"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Fractional CMO Services",
    "provider": baseOrganization,
    "name": "Fractional Chief Marketing Officer Services",
    "description": "Strategic marketing leadership for growth-stage companies. Psychology-driven approach that breaks through revenue plateaus and drives 150-300% revenue growth.",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fractional CMO Service Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Marketing Psychology Audit",
          "description": "3-month minimum engagement to analyze and fix conversion psychology bottlenecks",
          "priceRange": "$5,000 - $8,000 per month",
          "eligibilityToWorkStatus": "Available for hire",
          "availability": "InStock"
        },
        {
          "@type": "Offer",
          "name": "Growth Psychology Strategy",
          "description": "6-month strategic marketing transformation using customer awareness optimization",
          "priceRange": "$8,000 - $12,000 per month",
          "eligibilityToWorkStatus": "Available for hire",
          "availability": "InStock"
        },
        {
          "@type": "Offer",
          "name": "Fractional CMO Leadership",
          "description": "12-month complete marketing leadership with full team integration",
          "priceRange": "$12,000 - $18,000 per month",
          "eligibilityToWorkStatus": "Available for hire",
          "availability": "InStock"
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Fractional CMO and how can they help my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Fractional CMO is a part-time Chief Marketing Officer who provides strategic marketing leadership without the full-time cost. They offer C-level expertise at 1/3 the cost of a full-time executive, perfect for companies between $500K-$5M revenue. Fractional CMOs focus on strategy, psychology-driven growth, and breaking through revenue plateaus."
        }
      },
      {
        "@type": "Question",
        "name": "How is a Fractional CMO different from a marketing agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Fractional CMO provides strategic leadership and direction, while agencies focus on execution. Fractional CMOs diagnose why your marketing isn't working, set the right strategy, then agencies execute your ideas. For companies stuck at revenue plateaus, strategy is typically the missing piece, not more execution."
        }
      },
      {
        "@type": "Question",
        "name": "What results can I expect from Fractional CMO services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companies typically see 150-300% revenue growth within 8-12 months through psychology-driven marketing strategy. Our client Norton grew from $100K to $3M monthly revenue through customer awareness stage optimization. Results depend on company size, market conditions, and execution quality."
        }
      },
      {
        "@type": "Question",
        "name": "How much do Fractional CMO services cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fractional CMO services typically range from $5,000-$18,000 per month depending on engagement level and company size. This is 1/3 the cost of a full-time CMO ($180K-$300K annually) while providing the same strategic expertise and faster time-to-impact."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can a Fractional CMO start and show results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fractional CMOs can typically start within 1-7 days, compared to 3-6 months for hiring a full-time CMO. You'll see meaningful strategic improvements within 30-60 days and revenue impact within 90-120 days through immediate optimization of your marketing psychology and customer awareness strategy."
        }
      }
    ]
  };

  const articleSchema = (title: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": "Ian Ho",
      "jobTitle": "Fractional CMO",
      "url": "https://www.linkedin.com/in/ian-ho/",
      "sameAs": ["https://www.linkedin.com/in/ian-ho/"]
    },
    "publisher": baseOrganization,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": getCanonicalUrl(pageSlug)
    },
    "datePublished": "2025-01-14",
    "dateModified": "2025-01-14",
    "image": {
      "@type": "ImageObject",
      "url": getOgImageUrl(`${pageSlug}-article.jpg`),
      "width": 1200,
      "height": 630
    },
    "wordCount": 2500,
    "timeRequired": "PT8M",
    "keywords": PAGE_SEO_CONFIG[pageSlug as keyof typeof PAGE_SEO_CONFIG]?.keywords || PRIMARY_KEYWORDS.join(', ')
  });

  const breadcrumbSchema = (pageName: string) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getCanonicalUrl('')
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": getCanonicalUrl(pageSlug)
      }
    ]
  });

  switch (type) {
    case 'organization':
      return [baseOrganization, serviceSchema, faqSchema];
    
    case 'service':
      return [serviceSchema];
    
    case 'article':
      const config = PAGE_SEO_CONFIG[pageSlug as keyof typeof PAGE_SEO_CONFIG];
      return [
        articleSchema(config?.title || 'Article', config?.description || 'Article description'),
        breadcrumbSchema(config?.title || 'Article')
      ];
    
    case 'faq':
      return [faqSchema];
    
    case 'person':
      return [{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ian Ho",
        "jobTitle": "Fractional Chief Marketing Officer",
        "description": "Fractional CMO and marketing psychology expert with 15+ years experience driving 150-300% revenue growth for growth-stage companies.",
        "url": getCanonicalUrl('about'),
        "image": getOgImageUrl('ian-ho-profile.jpg'),
        "sameAs": [
          "https://www.linkedin.com/in/ian-ho/",
          "https://twitter.com/IanHoFractionalCMO"
        ],
        "worksFor": baseOrganization,
        "hasCredential": "Marketing Psychology Certification",
        "knowsAbout": [
          "Fractional CMO Services",
          "Marketing Psychology",
          "Customer Awareness Stages",
          "Revenue Growth Strategy",
          "Conversion Optimization"
        ],
        "alumniOf": {
          "@type": "Organization",
          "name": "UC Irvine"
        }
      }];
    
    case 'contact':
      return [baseOrganization];
    
    default:
      return customData ? [customData] : [baseOrganization];
  }
};

/**
 * Core Web Vitals thresholds for SEO ranking
 */
export const CORE_WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // ms
  FID: { good: 100, needsImprovement: 300 },   // ms
  CLS: { good: 0.1, needsImprovement: 0.25 },  // score
  INP: { good: 200, needsImprovement: 500 },   // ms
  TTFB: { good: 800, needsImprovement: 1800 }  // ms
};

/**
 * Calculate SEO score based on Core Web Vitals and other factors
 */
export const calculateSEOScore = (metrics: {
  lcp?: number;
  fid?: number;
  cls?: number;
  inp?: number;
  ttfb?: number;
  hasStructuredData?: boolean;
  hasMetaTags?: boolean;
  hasCanonical?: boolean;
  mobileOptimized?: boolean;
}): {
  score: number;
  grade: string;
  factors: Record<string, { score: number; weight: number; description: string }>;
} => {
  const factors = {
    lcp: {
      score: metrics.lcp ? (metrics.lcp <= CORE_WEB_VITALS_THRESHOLDS.LCP.good ? 100 : 
                           metrics.lcp <= CORE_WEB_VITALS_THRESHOLDS.LCP.needsImprovement ? 70 : 30) : 0,
      weight: 25,
      description: 'Largest Contentful Paint (User Experience)'
    },
    fid: {
      score: metrics.fid ? (metrics.fid <= CORE_WEB_VITALS_THRESHOLDS.FID.good ? 100 : 
                           metrics.fid <= CORE_WEB_VITALS_THRESHOLDS.FID.needsImprovement ? 70 : 30) : 0,
      weight: 20,
      description: 'First Input Delay (Interactivity)'
    },
    cls: {
      score: metrics.cls !== undefined ? (metrics.cls <= CORE_WEB_VITALS_THRESHOLDS.CLS.good ? 100 : 
                                         metrics.cls <= CORE_WEB_VITALS_THRESHOLDS.CLS.needsImprovement ? 70 : 30) : 0,
      weight: 15,
      description: 'Cumulative Layout Shift (Visual Stability)'
    },
    ttfb: {
      score: metrics.ttfb ? (metrics.ttfb <= CORE_WEB_VITALS_THRESHOLDS.TTFB.good ? 100 : 
                            metrics.ttfb <= CORE_WEB_VITALS_THRESHOLDS.TTFB.needsImprovement ? 70 : 30) : 0,
      weight: 15,
      description: 'Time to First Byte (Server Response)'
    },
    structuredData: {
      score: metrics.hasStructuredData ? 100 : 0,
      weight: 10,
      description: 'Structured Data (Rich Snippets)'
    },
    metaTags: {
      score: metrics.hasMetaTags ? 100 : 0,
      weight: 8,
      description: 'Meta Tags & Social Media Optimization'
    },
    canonical: {
      score: metrics.hasCanonical ? 100 : 0,
      weight: 4,
      description: 'Canonical URLs (Duplicate Content)'
    },
    mobileOptimized: {
      score: metrics.mobileOptimized ? 100 : 0,
      weight: 3,
      description: 'Mobile Optimization'
    }
  };

  const totalWeightedScore = Object.values(factors).reduce(
    (sum, factor) => sum + (factor.score * factor.weight / 100), 0
  );
  const totalWeight = Object.values(factors).reduce((sum, factor) => sum + factor.weight, 0);
  const score = Math.round(totalWeightedScore / totalWeight * 100);

  const getGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  return {
    score,
    grade: getGrade(score),
    factors
  };
};

/**
 * Generate XML sitemap entry for a page
 */
export const generateSitemapEntry = (url: string, lastMod: string, changeFreq: string, priority: number): string => {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

/**
 * Optimize content for featured snippets
 */
export const optimizeForFeaturedSnippets = (content: string): {
  qaFormat: string;
  listFormat: string;
  stepFormat: string;
} => {
  return {
    qaFormat: `
      <div data-snippet-type="qa">
        <h3>What is ${content}?</h3>
        <p>Answer optimized for featured snippets with clear, concise explanation.</p>
      </div>
    `,
    listFormat: `
      <div data-snippet-type="list">
        <h3>Top Benefits of ${content}:</h3>
        <ol>
          <li>First key benefit</li>
          <li>Second key benefit</li>
          <li>Third key benefit</li>
        </ol>
      </div>
    `,
    stepFormat: `
      <div data-snippet-type="steps">
        <h3>How to ${content}:</h3>
        <ol>
          <li><strong>Step 1:</strong> First action to take</li>
          <li><strong>Step 2:</strong> Second action to take</li>
          <li><strong>Step 3:</strong> Third action to take</li>
        </ol>
      </div>
    `
  };
};

export default {
  PAGE_SEO_CONFIG,
  generateMetaTags,
  generateStructuredData,
  calculateSEOScore,
  optimizeForFeaturedSnippets,
  CORE_WEB_VITALS_THRESHOLDS,
  PRIMARY_KEYWORDS,
  CONVERSION_KEYWORDS
};