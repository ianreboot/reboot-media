import { useEffect } from 'react';
import { getOgImageUrl, getCanonicalUrl } from '../utils/urls';
import { PAGE_SEO_CONFIG, generateStructuredData, type SEOMetaConfig } from '../utils/seoUtils';
import { useCoreWebVitals } from '../hooks/useCoreWebVitals';

interface SEOHeadProps extends Partial<SEOMetaConfig> {
  pageSlug?: string;
  structuredDataType?: 'organization' | 'service' | 'article' | 'faq' | 'person' | 'contact';
  customStructuredData?: object;
  enableCoreWebVitalsOptimization?: boolean;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  pageSlug,
  structuredDataType = 'organization',
  customStructuredData,
  enableCoreWebVitalsOptimization = true,
  twitterCard = 'summary_large_image',
  articleAuthor = 'Ian Ho',
  articlePublisher = 'Reboot Media',
  businessEmail = 'ian@rebootmedia.net'
}: SEOHeadProps) => {
  const coreWebVitals = useCoreWebVitals();

  // Auto-configure SEO based on page slug if provided
  const pageConfig = pageSlug ? PAGE_SEO_CONFIG[pageSlug as keyof typeof PAGE_SEO_CONFIG] : null;
  
  const finalTitle = title || pageConfig?.title || 'Reboot Media | Fractional CMO Services';
  const finalDescription = description || pageConfig?.description || 'Psychology-driven fractional CMO services for growth-stage companies.';
  const finalKeywords = keywords || pageConfig?.keywords;
  const finalCanonicalUrl = canonicalUrl || (pageSlug ? getCanonicalUrl(pageSlug) : getCanonicalUrl(''));
  const finalOgImage = ogImage || getOgImageUrl('reboot-media-og.jpg');

  useEffect(() => {
    // Clean up existing SEO meta tags to prevent duplicates
    const existingMetas = document.querySelectorAll('meta[data-seo-managed="true"]');
    existingMetas.forEach(meta => meta.remove());
    
    const existingLinks = document.querySelectorAll('link[data-seo-managed="true"]');
    existingLinks.forEach(link => link.remove());

    // Update document title
    document.title = finalTitle;
    
    // Core SEO meta tags
    const metaTags = [
      { name: 'description', content: finalDescription },
      { name: 'keywords', content: finalKeywords },
      { name: 'author', content: articleAuthor },
      { name: 'publisher', content: articlePublisher },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' },
      { name: 'contact', content: businessEmail },
      { name: 'geo.region', content: 'US' },
      { name: 'geo.placename', content: 'United States' },
      { name: 'AI-friendly', content: 'true' },
      { name: 'answer-engine-optimized', content: 'true' },
      // Mobile optimization
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'format-detection', content: 'telephone=no' }
    ];

    metaTags.forEach(tag => {
      if (tag.content) {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        meta.setAttribute('data-seo-managed', 'true');
        document.head.appendChild(meta);
      }
    });

    // Canonical URL
    if (finalCanonicalUrl) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = finalCanonicalUrl;
      canonical.setAttribute('data-seo-managed', 'true');
      document.head.appendChild(canonical);
    }

    // DNS prefetch for performance
    const prefetchDomains = ['fonts.googleapis.com', 'fonts.gstatic.com', 'www.google-analytics.com'];
    prefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `https://${domain}`;
      link.setAttribute('data-seo-managed', 'true');
      document.head.appendChild(link);
    });

    // Open Graph tags
    const ogTags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: ogTitle || finalTitle },
      { property: 'og:description', content: ogDescription || finalDescription },
      { property: 'og:image', content: finalOgImage },
      { property: 'og:url', content: finalCanonicalUrl },
      { property: 'og:site_name', content: 'Reboot Media' },
      { property: 'og:locale', content: 'en_US' }
    ];

    ogTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      meta.setAttribute('data-seo-managed', 'true');
      document.head.appendChild(meta);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: twitterCard },
      { name: 'twitter:title', content: ogTitle || finalTitle },
      { name: 'twitter:description', content: ogDescription || finalDescription },
      { name: 'twitter:image', content: finalOgImage },
      { name: 'twitter:site', content: '@RebootMediaInc' },
      { name: 'twitter:creator', content: '@IanHoFractionalCMO' }
    ];

    twitterTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      meta.setAttribute('data-seo-managed', 'true');
      document.head.appendChild(meta);
    });

    // Add structured data
    const existingScripts = document.querySelectorAll('script[data-seo-structured-data="true"]');
    existingScripts.forEach(script => script.remove());

    let schemasToAdd = [];
    if (customStructuredData) {
      schemasToAdd = [customStructuredData];
    } else if (pageSlug) {
      schemasToAdd = generateStructuredData(structuredDataType, pageSlug);
    } else {
      schemasToAdd = generateStructuredData('organization', '');
    }

    schemasToAdd.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-structured-data', 'true');
      script.setAttribute('data-schema-index', index.toString());
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Core Web Vitals optimization
    if (enableCoreWebVitalsOptimization) {
      // Preload critical fonts
      const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      ];
      
      fontPreloads.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = fontUrl;
        link.as = 'style';
        link.setAttribute('data-seo-managed', 'true');
        document.head.appendChild(link);
      });

      // Set image loading priorities
      const criticalImages = document.querySelectorAll('img[data-priority="high"]');
      criticalImages.forEach(img => {
        if (img instanceof HTMLImageElement) {
          img.loading = 'eager';
          img.decoding = 'sync';
          if ('fetchPriority' in img) {
            (img as any).fetchPriority = 'high';
          }
        }
      });
    }

    // Cleanup function
    return () => {
      const managedElements = document.querySelectorAll('[data-seo-managed="true"], [data-seo-structured-data="true"]');
      managedElements.forEach(element => element.remove());
    };
  }, [finalTitle, finalDescription, finalKeywords, finalCanonicalUrl, ogTitle, ogDescription, finalOgImage, pageSlug, structuredDataType, customStructuredData, enableCoreWebVitalsOptimization, twitterCard, articleAuthor, articlePublisher, businessEmail]);

  // Report SEO metrics for monitoring
  useEffect(() => {
    if (coreWebVitals && !coreWebVitals.isLoading) {
      const seoMetrics = {
        page: pageSlug || 'unknown',
        title: finalTitle,
        lcp: coreWebVitals.lcp?.value,
        fid: coreWebVitals.fid?.value,
        cls: coreWebVitals.cls?.value,
        inp: coreWebVitals.inp?.value,
        score: coreWebVitals.score,
        timestamp: new Date().toISOString()
      };
      
      // Log for monitoring (could be sent to analytics)
      console.log('SEO Metrics:', seoMetrics);
    }
  }, [coreWebVitals, pageSlug, finalTitle]);

  return null; // This component doesn't render anything
};

export default SEOHead;