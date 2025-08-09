import { useEffect } from 'react';
import { getOrganizationUrl, getLogoUrl, getCanonicalUrl } from '../utils/urls';

interface SchemaMarkupProps {
  type?: 'organization' | 'service' | 'article' | 'faq' | 'breadcrumb';
  customData?: Record<string, unknown>;
}

const SchemaMarkup = ({ type = 'organization', customData }: SchemaMarkupProps) => {
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Reboot Media, Inc.",
    "alternateName": "Reboot Media",
    "url": getOrganizationUrl(),
    "logo": getLogoUrl('reboot-media.avif'),
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
        "item": getCanonicalUrl('')
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Marketing Psychology",
        "item": getCanonicalUrl('marketing-psychology')
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Growth Plateau Solutions",
        "item": getCanonicalUrl('growth-plateau-solutions')
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Fractional CMO Guide",
        "item": getCanonicalUrl('fractional-cmo-guide')
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Reboot Media, Inc.",
    "image": getLogoUrl('reboot-media.avif'),
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

  useEffect(() => {
    // Remove any existing schema scripts
    const existingScripts = document.querySelectorAll('script[data-schema-markup]');
    existingScripts.forEach(script => script.remove());

    // Determine which schemas to add
    const schemasToAdd = [];
    
    switch(type) {
      case 'organization':
        schemasToAdd.push(organizationSchema, serviceSchema, faqSchema, localBusinessSchema);
        break;
      case 'service':
        schemasToAdd.push(serviceSchema);
        break;
      case 'article':
        if (customData) schemasToAdd.push(customData);
        break;
      case 'faq':
        schemasToAdd.push(faqSchema);
        break;
      case 'breadcrumb':
        schemasToAdd.push(breadcrumbSchema);
        break;
      default:
        schemasToAdd.push(organizationSchema);
    }

    // Add new schema scripts
    schemasToAdd.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema-markup', 'true');
      script.setAttribute('data-schema-type', `${type}-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll('script[data-schema-markup]');
      scripts.forEach(script => script.remove());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, customData]);

  return null; // This component doesn't render anything
};

export default SchemaMarkup;