/**
 * Marketing Attribution Tracking Utilities
 * Client-side touchpoint and UTM parameter tracking
 */

interface UTMParams {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  term?: string | null;
  content?: string | null;
}

interface TouchpointPayload {
  sessionId: string;
  channel: string;
  interaction: string;
  url: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  device: 'desktop' | 'mobile' | 'tablet';
  referrer?: string;
  leadId?: string;
}

class AttributionTracker {
  private sessionId: string;
  private utmParams: UTMParams;
  private apiEndpoint: string = '/api/attribution/touchpoint';
  private trackingEnabled: boolean = true;
  private queue: TouchpointPayload[] = [];
  private flushInterval: number = 5000; // 5 seconds
  private maxQueueSize: number = 10;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.utmParams = this.parseUTMParams();
    this.initializeTracking();
    this.setupEventListeners();
    this.startQueueFlush();
  }

  /**
   * Get or create a session ID
   */
  private getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('attribution_session_id');
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('attribution_session_id', sessionId);
    }
    
    return sessionId;
  }

  /**
   * Parse UTM parameters from URL
   */
  private parseUTMParams(): UTMParams {
    const params = new URLSearchParams(window.location.search);
    
    const utm: UTMParams = {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      term: params.get('utm_term'),
      content: params.get('utm_content')
    };

    // Store UTM params in session for attribution
    if (utm.source || utm.medium || utm.campaign) {
      sessionStorage.setItem('utm_params', JSON.stringify(utm));
    } else {
      // Try to get from session storage if not in URL
      const stored = sessionStorage.getItem('utm_params');
      if (stored) {
        return JSON.parse(stored);
      }
    }

    return utm;
  }

  /**
   * Initialize tracking on page load
   */
  private initializeTracking(): void {
    // Track initial page view
    this.trackPageView();

    // Track if coming from a specific source
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.hostname)) {
      this.trackReferral(referrer);
    }
  }

  /**
   * Setup event listeners for tracking
   */
  private setupEventListeners(): void {
    // Track form interactions
    document.addEventListener('submit', (e) => {
      const target = e.target as HTMLFormElement;
      if (target.tagName === 'FORM') {
        const formName = target.getAttribute('name') || target.id || 'unnamed_form';
        this.trackFormSubmit(formName);
      }
    });

    // Track form field focus (form start)
    let formStartTracked = new Set<string>();
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      const form = target.closest('form');
      if (form && !formStartTracked.has(form.id || 'form')) {
        formStartTracked.add(form.id || 'form');
        const formName = form.getAttribute('name') || form.id || 'unnamed_form';
        this.trackFormStart(formName);
      }
    });

    // Track clicks on CTA buttons
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      // Track CTA clicks
      if (target.classList.contains('cta') || 
          target.classList.contains('btn-primary') ||
          target.getAttribute('data-track') === 'true') {
        const action = target.textContent?.trim() || 'button_click';
        this.trackInteraction('cta_click', { action });
      }

      // Track download links
      const link = target.closest('a') as HTMLAnchorElement;
      if (link && link.href) {
        if (link.href.includes('.pdf') || 
            link.href.includes('.doc') || 
            link.href.includes('/download')) {
          const filename = link.href.split('/').pop() || 'unknown';
          this.trackContentDownload(filename);
        }
      }
    });

    // Track video plays
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.addEventListener('play', () => {
        const videoName = video.getAttribute('data-name') || video.src || 'unknown_video';
        this.trackVideoView(videoName);
      });
    });

    // Track scroll depth
    let maxScroll = 0;
    let scrollTracked = { 25: false, 50: false, 75: false, 100: false };
    
    window.addEventListener('scroll', () => {
      const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Track milestone scrolls
        if (!scrollTracked[25] && scrollPercentage >= 25) {
          scrollTracked[25] = true;
          this.trackInteraction('scroll_depth', { depth: 25 });
        }
        if (!scrollTracked[50] && scrollPercentage >= 50) {
          scrollTracked[50] = true;
          this.trackInteraction('scroll_depth', { depth: 50 });
        }
        if (!scrollTracked[75] && scrollPercentage >= 75) {
          scrollTracked[75] = true;
          this.trackInteraction('scroll_depth', { depth: 75 });
        }
        if (!scrollTracked[100] && scrollPercentage >= 95) {
          scrollTracked[100] = true;
          this.trackInteraction('scroll_depth', { depth: 100 });
        }
      }
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackInteraction('page_hidden', { 
          timeOnPage: Math.round(performance.now() / 1000) 
        });
      } else {
        this.trackInteraction('page_visible', {});
      }
    });

    // Track before unload
    window.addEventListener('beforeunload', () => {
      this.flushQueue(true); // Force sync flush
    });
  }

  /**
   * Determine channel from referrer and UTM params
   */
  private determineChannel(): string {
    // UTM source takes precedence
    if (this.utmParams.source) {
      const source = this.utmParams.source.toLowerCase();
      if (source.includes('google') || source.includes('bing')) return 'paid';
      if (source.includes('facebook') || source.includes('twitter') || 
          source.includes('linkedin') || source.includes('instagram')) return 'social';
      if (source.includes('email') || source.includes('newsletter')) return 'email';
      return 'referral';
    }

    // Check referrer
    const referrer = document.referrer;
    if (!referrer) return 'direct';
    
    if (referrer.includes('google.com') || referrer.includes('bing.com')) {
      return this.utmParams.medium === 'cpc' ? 'paid' : 'organic';
    }
    if (referrer.includes('facebook.com') || referrer.includes('twitter.com') ||
        referrer.includes('linkedin.com') || referrer.includes('instagram.com')) {
      return 'social';
    }
    
    return 'referral';
  }

  /**
   * Detect device type
   */
  private detectDevice(): 'desktop' | 'mobile' | 'tablet' {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/mobile|android|iphone/i.test(userAgent) && width < 768) {
      return 'mobile';
    }
    if (/ipad|tablet/i.test(userAgent) || (width >= 768 && width < 1024)) {
      return 'tablet';
    }
    return 'desktop';
  }

  /**
   * Track a touchpoint
   */
  private async trackTouchpoint(interaction: string, details: any = {}): Promise<void> {
    if (!this.trackingEnabled) return;

    const payload: TouchpointPayload = {
      sessionId: this.sessionId,
      channel: this.determineChannel(),
      interaction,
      url: window.location.href,
      device: this.detectDevice(),
      referrer: document.referrer || undefined,
      ...this.utmParams.source && { utmSource: this.utmParams.source },
      ...this.utmParams.medium && { utmMedium: this.utmParams.medium },
      ...this.utmParams.campaign && { utmCampaign: this.utmParams.campaign },
      ...this.utmParams.term && { utmTerm: this.utmParams.term },
      ...this.utmParams.content && { utmContent: this.utmParams.content },
      ...details
    };

    // Add to queue
    this.queue.push(payload);

    // Flush if queue is full
    if (this.queue.length >= this.maxQueueSize) {
      await this.flushQueue();
    }
  }

  /**
   * Flush the tracking queue
   */
  private async flushQueue(sync: boolean = false): Promise<void> {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    try {
      // Send each touchpoint (could batch in production)
      for (const touchpoint of batch) {
        if (sync) {
          // Synchronous request for beforeunload
          navigator.sendBeacon(this.apiEndpoint, JSON.stringify(touchpoint));
        } else {
          // Async request
          await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
            body: JSON.stringify(touchpoint)
          });
        }
      }
    } catch (error) {
      console.error('Attribution tracking error:', error);
      // Re-add to queue on error (with limit to prevent infinite growth)
      if (this.queue.length < this.maxQueueSize * 2) {
        this.queue = [...batch, ...this.queue];
      }
    }
  }

  /**
   * Start periodic queue flushing
   */
  private startQueueFlush(): void {
    setInterval(() => {
      this.flushQueue();
    }, this.flushInterval);
  }

  /**
   * Public tracking methods
   */
  
  public trackPageView(page?: string): void {
    this.trackTouchpoint('page_view', { 
      page: page || window.location.pathname 
    });
  }

  public trackFormStart(formName: string): void {
    this.trackTouchpoint('form_start', { formName });
  }

  public trackFormSubmit(formName: string): void {
    this.trackTouchpoint('form_complete', { formName });
  }

  public trackContentDownload(filename: string): void {
    this.trackTouchpoint('content_download', { filename });
  }

  public trackVideoView(videoName: string): void {
    this.trackTouchpoint('video_view', { videoName });
  }

  public trackChatInteraction(): void {
    this.trackTouchpoint('chat_interaction', {});
  }

  public trackPhoneCall(phoneNumber?: string): void {
    this.trackTouchpoint('phone_call', { phoneNumber });
  }

  public trackEmailClick(campaign?: string): void {
    this.trackTouchpoint('email_click', { campaign });
  }

  public trackReferral(referrer: string): void {
    this.trackTouchpoint('referral_visit', { referrer });
  }

  public trackInteraction(type: string, details: any = {}): void {
    this.trackTouchpoint(type, details);
  }

  /**
   * Set lead ID after identification
   */
  public setLeadId(leadId: string): void {
    sessionStorage.setItem('lead_id', leadId);
  }

  /**
   * Enable/disable tracking
   */
  public setTrackingEnabled(enabled: boolean): void {
    this.trackingEnabled = enabled;
  }

  /**
   * Get current session ID
   */
  public getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Get attribution data for current session
   */
  public getAttributionData(): {
    sessionId: string;
    channel: string;
    utmParams: UTMParams;
    device: string;
    referrer: string;
  } {
    return {
      sessionId: this.sessionId,
      channel: this.determineChannel(),
      utmParams: this.utmParams,
      device: this.detectDevice(),
      referrer: document.referrer
    };
  }
}

// Create singleton instance
const attributionTracker = new AttributionTracker();

// Export for use in React components
export default attributionTracker;

// Export utility functions
export const trackPageView = (page?: string) => attributionTracker.trackPageView(page);
export const trackFormStart = (formName: string) => attributionTracker.trackFormStart(formName);
export const trackFormSubmit = (formName: string) => attributionTracker.trackFormSubmit(formName);
export const trackContentDownload = (filename: string) => attributionTracker.trackContentDownload(filename);
export const trackVideoView = (videoName: string) => attributionTracker.trackVideoView(videoName);
export const trackChatInteraction = () => attributionTracker.trackChatInteraction();
export const trackPhoneCall = (phoneNumber?: string) => attributionTracker.trackPhoneCall(phoneNumber);
export const trackEmailClick = (campaign?: string) => attributionTracker.trackEmailClick(campaign);
export const setLeadId = (leadId: string) => attributionTracker.setLeadId(leadId);
export const getAttributionData = () => attributionTracker.getAttributionData();