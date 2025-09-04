const BASE_URL = "https://dev.rebootmedia.net/reboot";
const getCanonicalUrl = (path = "") => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (cleanPath === "") {
    return BASE_URL + "/";
  }
  return `${BASE_URL}/${cleanPath}`;
};
const getOgImageUrl = (imagePath = "og-image.jpg") => {
  return `${BASE_URL}/${imagePath}`;
};
const getLogoUrl = (logoPath = "reboot-media.avif") => {
  return `${BASE_URL}/${logoPath}`;
};
const getOrganizationUrl = () => {
  return BASE_URL;
};
const PRIMARY_KEYWORDS = [
  "fractional CMO",
  "fractional chief marketing officer",
  "marketing psychology",
  "growth plateau solutions",
  "revenue growth strategy",
  "customer acquisition",
  "marketing leadership",
  "conversion optimization",
  "B2B marketing strategy",
  "marketing consultant"
];
const PAGE_SEO_CONFIG = {
  home: {
    title: "Fractional CMO Services | Marketing Psychology Expert | Reboot Media",
    description: "Break through revenue plateaus with psychology-driven fractional CMO services. 150-300% growth for $500K-$5M companies. 27 success stories. Start your transformation today.",
    keywords: [...PRIMARY_KEYWORDS, "fractional CMO services", "marketing psychology expert", "revenue growth"].join(", "),
    structuredData: "organization"
  },
  "marketing-psychology": {
    title: "Marketing Psychology Principles That Drive Conversions | 5 Customer Stages",
    description: "Master the 5 customer awareness stages and conversion psychology principles that Fortune 500 companies use. Transform marketing from guesswork into predictable revenue growth.",
    keywords: ["marketing psychology", "customer awareness stages", "conversion psychology", "behavioral marketing", "psychology-driven marketing"].join(", "),
    structuredData: "article"
  },
  "fractional-cmo-guide": {
    title: "Fractional CMO Guide: When to Hire, Cost & ROI | Complete 2025 Guide",
    description: "Complete fractional CMO guide: When to hire, typical costs ($5K-18K/month), ROI expectations, and how to choose the right fractional CMO for your $500K-$5M company.",
    keywords: ["fractional CMO guide", "fractional CMO cost", "when to hire fractional CMO", "fractional CMO ROI", "fractional CMO services"].join(", "),
    structuredData: "article"
  },
  "growth-plateau-solutions": {
    title: "Growth Plateau Solutions: Break Through Revenue Ceilings | 7 Proven Strategies",
    description: "7 proven strategies to break through revenue plateaus and scale from $500K to $5M+. Psychology-driven approach used by 500+ companies worldwide.",
    keywords: ["growth plateau solutions", "revenue ceiling breakthrough", "scale revenue", "growth-stage marketing", "revenue plateau"].join(", "),
    structuredData: "article"
  },
  about: {
    title: "About Ian Ho | Fractional CMO & Marketing Psychology Expert | Reboot Media",
    description: "Meet Ian Ho, fractional CMO and marketing psychology expert. 15+ years driving 150-300% revenue growth for growth-stage companies using proven psychological frameworks.",
    keywords: ["Ian Ho fractional CMO", "marketing psychology expert", "fractional CMO experience", "marketing consultant biography"].join(", "),
    structuredData: "person"
  },
  contact: {
    title: "Get Fractional CMO Services | Free Strategy Call | Reboot Media",
    description: "Ready to break through your revenue plateau? Get a free 30-minute strategy call with fractional CMO Ian Ho. Discover your growth blockers and next steps.",
    keywords: ["fractional CMO consultation", "marketing strategy call", "fractional CMO contact", "marketing psychology audit"].join(", "),
    structuredData: "contact"
  }
};
const generateStructuredData = (type, pageSlug, customData) => {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Reboot Media, Inc.",
    "alternateName": ["Reboot Media", "RebootMedia"],
    "url": "https://www.rebootmedia.net",
    "logo": {
      "@type": "ImageObject",
      "url": getOgImageUrl("reboot-logo-white.svg"),
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
  const articleSchema = (title, description) => ({
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
    "keywords": PAGE_SEO_CONFIG[pageSlug]?.keywords || PRIMARY_KEYWORDS.join(", ")
  });
  const breadcrumbSchema = (pageName) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": getCanonicalUrl("")
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
    case "organization":
      return [baseOrganization, serviceSchema, faqSchema];
    case "service":
      return [serviceSchema];
    case "article":
      const config = PAGE_SEO_CONFIG[pageSlug];
      return [
        articleSchema(config?.title || "Article", config?.description || "Article description"),
        breadcrumbSchema(config?.title || "Article")
      ];
    case "faq":
      return [faqSchema];
    case "person":
      return [{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ian Ho",
        "jobTitle": "Fractional Chief Marketing Officer",
        "description": "Fractional CMO and marketing psychology expert with 15+ years experience driving 150-300% revenue growth for growth-stage companies.",
        "url": getCanonicalUrl("about"),
        "image": getOgImageUrl("ian-ho-profile.jpg"),
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
    case "contact":
      return [baseOrganization];
    default:
      return customData ? [customData] : [baseOrganization];
  }
};
const trackEvent = (eventName, parameters = {}) => {
  {
    console.log(`📊 GA4 Event: ${eventName}`, parameters);
    return;
  }
};
const trackCoreWebVital = (name, value, rating) => {
  console.log(`Core Web Vitals: ${name}=${value} (${rating})`);
  trackEvent("core_web_vital", {
    metric_name: name,
    metric_value: value,
    metric_rating: rating
  });
};
const analytics = {
  // Page views - standard GA4
  pageView: (page) => {
    trackEvent("page_view", {
      page_path: page || window.location.pathname,
      page_title: document.title
    });
  },
  // Form interactions - business critical
  formStart: (formName) => {
    trackEvent("form_start", { form_name: formName });
  },
  formSubmit: (formName) => {
    trackEvent("form_submit", { form_name: formName });
  },
  // Lead generation - business critical
  leadGenerated: (source) => {
    trackEvent("generate_lead", {
      source: source || "unknown",
      value: 1
      // Lead value for conversion tracking
    });
  },
  // Conversions - business critical
  conversion: (type, value) => {
    trackEvent("conversion", {
      conversion_type: type,
      value: value || 1
    });
  },
  // Content engagement - useful for optimization
  contentDownload: (filename) => {
    trackEvent("file_download", { file_name: filename });
  },
  // CTA clicks - important for optimization
  ctaClick: (ctaText, location) => {
    trackEvent("cta_click", {
      cta_text: ctaText,
      cta_location: location
    });
  },
  // Phone calls - lead indicator
  phoneClick: () => {
    trackEvent("phone_call", { method: "click" });
  },
  // Email clicks - lead indicator
  emailClick: () => {
    trackEvent("email_click", { method: "click" });
  },
  // Core Web Vitals - simple logging
  coreWebVital: trackCoreWebVital,
  // Scroll depth - useful for content optimization
  scrollDepth: (depth) => {
    if ([25, 50, 75, 100].includes(depth)) {
      trackEvent("scroll", { scroll_depth: depth });
    }
  },
  // UTM tracking - marketing attribution
  getUTMParameters: () => {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get("utm_source"),
      medium: params.get("utm_medium"),
      campaign: params.get("utm_campaign"),
      term: params.get("utm_term"),
      content: params.get("utm_content")
    };
  }
};
if (typeof window !== "undefined") {
  analytics.pageView();
}
const isLocalhost = Boolean(
  window.location.hostname === "localhost" || window.location.hostname === "[::1]" || window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);
function registerServiceWorker(config) {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }
    window.addEventListener("load", () => {
      const swUrl = `${"/reboot/"}sw.js`;
      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "[SW] This web app is being served cache-first by a service worker. To learn more, visit https://developers.google.com/web/progressive-web-apps/"
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}
function registerValidSW(swUrl, config) {
  navigator.serviceWorker.register(swUrl).then((registration) => {
    console.log("[SW] Service worker registered successfully:", registration);
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker == null) {
        return;
      }
      installingWorker.onstatechange = () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            console.log("[SW] New content is available and will be used when all tabs for this page are closed.");
            if (config && config.onUpdate) {
              config.onUpdate(registration);
            }
            if (config && config.onNeedRefresh) {
              config.onNeedRefresh();
            }
          } else {
            console.log("[SW] Content is cached for offline use.");
            if (config && config.onSuccess) {
              config.onSuccess(registration);
            }
            if (config && config.onOfflineReady) {
              config.onOfflineReady();
            }
          }
        }
      };
    };
    setInterval(() => {
      registration.update();
    }, 6e4);
  }).catch((error) => {
    console.error("[SW] Service worker registration failed:", error);
  });
}
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" }
  }).then((response) => {
    const contentType = response.headers.get("content-type");
    if (response.status === 404 || contentType != null && contentType.indexOf("javascript") === -1) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      registerValidSW(swUrl, config);
    }
  }).catch(() => {
    console.log("[SW] No internet connection found. App is running in offline mode.");
  });
}
function setupPerformanceIntegration() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(() => {
      console.log("[SW] Service worker ready for basic caching");
    });
  }
}
export {
  PAGE_SEO_CONFIG as P,
  analytics as a,
  getCanonicalUrl as b,
  getLogoUrl as c,
  getOrganizationUrl as d,
  getOgImageUrl as e,
  generateStructuredData as g,
  registerServiceWorker as r,
  setupPerformanceIntegration as s
};
//# sourceMappingURL=app-utils-B6wQ-etB.js.map
