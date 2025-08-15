import { r as reactExports } from "./react-core-CWvNQPo6.js";
import { g as generateStructuredData, b as getCanonicalUrl, c as getLogoUrl, d as getOrganizationUrl, P as PAGE_SEO_CONFIG, e as getOgImageUrl } from "./app-utils-B6wQ-etB.js";
import { u as useLocation } from "./router-Up7tU2vJ.js";
const SchemaMarkup = ({
  type = "organization",
  pageSlug = "",
  customData,
  autoGenerate = true
}) => {
  reactExports.useEffect(() => {
    const existingScripts = document.querySelectorAll('script[data-schema-markup="true"]');
    existingScripts.forEach((script) => script.remove());
    let schemasToAdd = [];
    if (autoGenerate && pageSlug) {
      schemasToAdd = generateStructuredData(type, pageSlug, customData);
    } else if (customData) {
      schemasToAdd = [customData];
    } else {
      schemasToAdd = generateLegacySchemas(type);
    }
    schemasToAdd.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema-markup", "true");
      script.setAttribute("data-schema-type", `${type}-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    return () => {
      const scripts = document.querySelectorAll('script[data-schema-markup="true"]');
      scripts.forEach((script) => script.remove());
    };
  }, [type, pageSlug, customData, autoGenerate]);
  return null;
};
const generateLegacySchemas = (type) => {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Reboot Media, Inc.",
    "alternateName": "Reboot Media",
    "url": getOrganizationUrl(),
    "logo": getLogoUrl("reboot-logo-white.svg"),
    "description": "Fractional CMO services providing C-level marketing leadership for growth-stage companies. Marketing psychology expertise that transforms $500K-$1.5M revenue companies into scalable enterprises.",
    "founder": {
      "@type": "Person",
      "name": "Ian Ho",
      "jobTitle": "Fractional CMO",
      "url": "https://www.linkedin.com/in/ian-ho/",
      "sameAs": [
        "https://www.linkedin.com/in/ian-ho/"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "17595 Harvard Ave C-738",
      "addressLocality": "Irvine",
      "addressRegion": "CA",
      "postalCode": "92614",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "areaServed": ["US", "SG", "TH", "MY", "ID", "PH"],
      "availableLanguage": ["en"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/reboot-media/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "27",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Fractional CMO Services",
    "provider": {
      "@type": "Organization",
      "name": "Reboot Media, Inc."
    },
    "name": "Fractional Chief Marketing Officer Services",
    "description": "Strategic marketing leadership for growth-stage companies. Psychology-driven approach that breaks through revenue plateaus.",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "13.7563",
        "longitude": "100.5018"
      },
      "geoRadius": "5000000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fractional CMO Service Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Marketing Psychology Audit",
          "description": "3-month minimum engagement to analyze and fix conversion psychology",
          "priceRange": "$5,000 - $8,000 per month"
        },
        {
          "@type": "Offer",
          "name": "Growth Psychology Strategy",
          "description": "6-month strategic marketing transformation",
          "priceRange": "$8,000 - $12,000 per month"
        },
        {
          "@type": "Offer",
          "name": "Fractional CMO Leadership",
          "description": "12-month complete marketing leadership",
          "priceRange": "$12,000 - $18,000 per month"
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
        "name": "What is a Fractional CMO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Fractional CMO is a part-time Chief Marketing Officer who provides strategic marketing leadership without the full-time cost. They offer C-level expertise at 1/3 the cost of a full-time executive, perfect for companies between $500K-$1.5M revenue."
        }
      },
      {
        "@type": "Question",
        "name": "How is a Fractional CMO different from a marketing agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Fractional CMO provides strategic leadership and direction, while agencies focus on execution. Fractional CMOs set the strategy, agencies execute your ideas. For companies stuck at revenue plateaus, strategy is typically the missing piece."
        }
      },
      {
        "@type": "Question",
        "name": "What results can I expect from Fractional CMO services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companies typically see 150-300% revenue growth within 8-12 months through psychology-driven marketing strategy. Our Norton case study showed $100K to $3M monthly revenue growth through customer awareness stage optimization."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can a Fractional CMO start?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fractional CMOs can typically start within 1-7 days, compared to 3-6 months for hiring a full-time CMO. You'll see meaningful impact within 30-60 days through immediate strategy improvements."
        }
      },
      {
        "@type": "Question",
        "name": "What size companies benefit most from Fractional CMO services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companies between $500K-$5M revenue benefit most from fractional CMO services. This is the critical growth stage where strategic marketing leadership makes the difference between plateau and scale."
        }
      }
    ]
  };
  const breadcrumbSchema = {
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
        "name": "Marketing Psychology",
        "item": getCanonicalUrl("marketing-psychology")
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Growth Plateau Solutions",
        "item": getCanonicalUrl("growth-plateau-solutions")
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Fractional CMO Guide",
        "item": getCanonicalUrl("fractional-cmo-guide")
      }
    ]
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Reboot Media, Inc.",
    "image": getLogoUrl("reboot-logo-white.svg"),
    "priceRange": "$5,000 - $18,000 per month",
    "@id": getOrganizationUrl(),
    "url": getOrganizationUrl(),
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "17595 Harvard Ave C-738",
      "addressLocality": "Irvine",
      "addressRegion": "CA",
      "postalCode": "92614",
      "addressCountry": "US"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };
  switch (type) {
    case "organization":
      return [baseOrganization, serviceSchema, faqSchema, localBusinessSchema];
    case "service":
      return [serviceSchema];
    case "faq":
      return [faqSchema];
    case "breadcrumb":
      return [breadcrumbSchema];
    case "localbusiness":
      return [localBusinessSchema];
    default:
      return [baseOrganization];
  }
};
const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  pageSlug,
  structuredDataType = "organization",
  customStructuredData,
  enableCoreWebVitalsOptimization = true,
  twitterCard = "summary_large_image",
  articleAuthor = "Ian Ho",
  articlePublisher = "Reboot Media",
  businessEmail = "ian@rebootmedia.net"
}) => {
  const pageConfig = pageSlug ? PAGE_SEO_CONFIG[pageSlug] : null;
  const finalTitle = title || pageConfig?.title || "Reboot Media | Fractional CMO Services";
  const finalDescription = description || pageConfig?.description || "Psychology-driven fractional CMO services for growth-stage companies.";
  const finalKeywords = keywords || pageConfig?.keywords;
  const finalCanonicalUrl = canonicalUrl || (pageSlug ? getCanonicalUrl(pageSlug) : getCanonicalUrl(""));
  const finalOgImage = ogImage || getOgImageUrl("reboot-media-og.jpg");
  reactExports.useEffect(() => {
    const existingMetas = document.querySelectorAll('meta[data-seo-managed="true"]');
    existingMetas.forEach((meta) => meta.remove());
    const existingLinks = document.querySelectorAll('link[data-seo-managed="true"]');
    existingLinks.forEach((link) => link.remove());
    document.title = finalTitle;
    const metaTags = [
      { name: "description", content: finalDescription },
      { name: "keywords", content: finalKeywords },
      { name: "author", content: articleAuthor },
      { name: "publisher", content: articlePublisher },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "bingbot", content: "index, follow" },
      { name: "contact", content: businessEmail },
      { name: "geo.region", content: "US" },
      { name: "geo.placename", content: "United States" },
      { name: "AI-friendly", content: "true" },
      { name: "answer-engine-optimized", content: "true" },
      // Mobile optimization
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "format-detection", content: "telephone=no" }
    ];
    metaTags.forEach((tag) => {
      if (tag.content) {
        const meta = document.createElement("meta");
        meta.name = tag.name;
        meta.content = tag.content;
        meta.setAttribute("data-seo-managed", "true");
        document.head.appendChild(meta);
      }
    });
    if (finalCanonicalUrl) {
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = finalCanonicalUrl;
      canonical.setAttribute("data-seo-managed", "true");
      document.head.appendChild(canonical);
    }
    const prefetchDomains = ["fonts.googleapis.com", "fonts.gstatic.com", "www.google-analytics.com"];
    prefetchDomains.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = `https://${domain}`;
      link.setAttribute("data-seo-managed", "true");
      document.head.appendChild(link);
    });
    const ogTags = [
      { property: "og:type", content: "website" },
      { property: "og:title", content: ogTitle || finalTitle },
      { property: "og:description", content: ogDescription || finalDescription },
      { property: "og:image", content: finalOgImage },
      { property: "og:url", content: finalCanonicalUrl },
      { property: "og:site_name", content: "Reboot Media" },
      { property: "og:locale", content: "en_US" }
    ];
    ogTags.forEach((tag) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", tag.property);
      meta.content = tag.content;
      meta.setAttribute("data-seo-managed", "true");
      document.head.appendChild(meta);
    });
    const twitterTags = [
      { name: "twitter:card", content: twitterCard },
      { name: "twitter:title", content: ogTitle || finalTitle },
      { name: "twitter:description", content: ogDescription || finalDescription },
      { name: "twitter:image", content: finalOgImage },
      { name: "twitter:site", content: "@RebootMediaInc" },
      { name: "twitter:creator", content: "@IanHoFractionalCMO" }
    ];
    twitterTags.forEach((tag) => {
      const meta = document.createElement("meta");
      meta.name = tag.name;
      meta.content = tag.content;
      meta.setAttribute("data-seo-managed", "true");
      document.head.appendChild(meta);
    });
    const existingScripts = document.querySelectorAll('script[data-seo-structured-data="true"]');
    existingScripts.forEach((script) => script.remove());
    let schemasToAdd = [];
    if (customStructuredData) {
      schemasToAdd = [customStructuredData];
    } else if (pageSlug) {
      schemasToAdd = generateStructuredData(structuredDataType, pageSlug);
    } else {
      schemasToAdd = generateStructuredData("organization", "");
    }
    schemasToAdd.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-structured-data", "true");
      script.setAttribute("data-schema-index", index.toString());
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    if (enableCoreWebVitalsOptimization) {
      const fontPreloads = [
        "https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap"
      ];
      fontPreloads.forEach((fontUrl) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = fontUrl;
        link.as = "style";
        link.setAttribute("data-seo-managed", "true");
        document.head.appendChild(link);
      });
      const criticalImages = document.querySelectorAll('img[data-priority="high"]');
      criticalImages.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.loading = "eager";
          img.decoding = "sync";
          if ("fetchPriority" in img) {
            img.fetchPriority = "high";
          }
        }
      });
    }
    return () => {
      const managedElements = document.querySelectorAll('[data-seo-managed="true"], [data-seo-structured-data="true"]');
      managedElements.forEach((element) => element.remove());
    };
  }, [finalTitle, finalDescription, finalKeywords, finalCanonicalUrl, ogTitle, ogDescription, finalOgImage, pageSlug, structuredDataType, customStructuredData, enableCoreWebVitalsOptimization, twitterCard, articleAuthor, articlePublisher, businessEmail]);
  return null;
};
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  reactExports.useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname, hash]);
  return null;
};
export {
  SEOHead as S,
  SchemaMarkup as a,
  ScrollToTop as b
};
//# sourceMappingURL=components-utils-B8LwQ22Q.js.map
