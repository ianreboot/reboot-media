/**
 * Simple GA4 Analytics - Practical business website tracking
 * Replaces over-engineered monitoring system with what actually matters
 */

// Simple event tracking - no complex infrastructure needed
const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  // Development mode - just log events for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 GA4 Event: ${eventName}`, parameters);
    return;
  }
  
  // Production GA4 call (when tracking ID is added)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      // Add UTM parameters if available
      campaign_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
      campaign_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
      campaign_name: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
      ...parameters
    });
  }
};

// Core Web Vitals - simple logging, no dashboards
const trackCoreWebVital = (name: string, value: number, rating: string) => {
  console.log(`Core Web Vitals: ${name}=${value} (${rating})`);
  
  // Send to GA4 if available
  trackEvent('core_web_vital', {
    metric_name: name,
    metric_value: value,
    metric_rating: rating
  });
};

// Essential business events only
export const analytics = {
  // Page views - standard GA4
  pageView: (page?: string) => {
    trackEvent('page_view', { 
      page_path: page || window.location.pathname,
      page_title: document.title
    });
  },

  // Form interactions - business critical
  formStart: (formName: string) => {
    trackEvent('form_start', { form_name: formName });
  },

  formSubmit: (formName: string) => {
    trackEvent('form_submit', { form_name: formName });
  },

  // Lead generation - business critical
  leadGenerated: (source?: string) => {
    trackEvent('generate_lead', { 
      source: source || 'unknown',
      value: 1 // Lead value for conversion tracking
    });
  },

  // Conversions - business critical
  conversion: (type: string, value?: number) => {
    trackEvent('conversion', { 
      conversion_type: type,
      value: value || 1
    });
  },

  // Content engagement - useful for optimization
  contentDownload: (filename: string) => {
    trackEvent('file_download', { file_name: filename });
  },

  // CTA clicks - important for optimization
  ctaClick: (ctaText: string, location: string) => {
    trackEvent('cta_click', { 
      cta_text: ctaText,
      cta_location: location
    });
  },

  // Phone calls - lead indicator
  phoneClick: () => {
    trackEvent('phone_call', { method: 'click' });
  },

  // Email clicks - lead indicator
  emailClick: () => {
    trackEvent('email_click', { method: 'click' });
  },

  // Core Web Vitals - simple logging
  coreWebVital: trackCoreWebVital,

  // Scroll depth - useful for content optimization
  scrollDepth: (depth: number) => {
    if ([25, 50, 75, 100].includes(depth)) {
      trackEvent('scroll', { scroll_depth: depth });
    }
  },

  // UTM tracking - marketing attribution
  getUTMParameters: () => {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      term: params.get('utm_term'),
      content: params.get('utm_content')
    };
  }
};

// Auto-track page views
if (typeof window !== 'undefined') {
  analytics.pageView();
}

export default analytics;