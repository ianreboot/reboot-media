import { describe, it, expect, vi } from 'vitest';

// Mock import.meta
vi.mock('import.meta', () => ({
  env: {
    MODE: 'production'
  }
}));

// Import after mocking
import { 
  getCanonicalUrl, 
  getOgImageUrl, 
  getLogoUrl, 
  getOrganizationUrl
} from '../urls';

describe('urls utility', () => {
  describe('in production mode (default)', () => {
    describe('getCanonicalUrl', () => {
      it('returns base URL with trailing slash when path is empty string', () => {
        const result = getCanonicalUrl('');
        expect(result).toBe('https://www.rebootmedia.net/');
      });

      it('returns correct URL for simple path', () => {
        const result = getCanonicalUrl('about');
        expect(result).toBe('https://www.rebootmedia.net/about');
      });

      it('handles paths with leading slash', () => {
        const result = getCanonicalUrl('/about');
        expect(result).toBe('https://www.rebootmedia.net/about');
      });

      it('handles nested paths', () => {
        const result = getCanonicalUrl('fractional-cmo-guide/vs-agency');
        expect(result).toBe('https://www.rebootmedia.net/fractional-cmo-guide/vs-agency');
      });

      it('handles paths with trailing slash', () => {
        const result = getCanonicalUrl('about/');
        expect(result).toBe('https://www.rebootmedia.net/about/');
      });

      it('handles complex nested paths', () => {
        const result = getCanonicalUrl('marketing-psychology/unaware-stage-customers');
        expect(result).toBe('https://www.rebootmedia.net/marketing-psychology/unaware-stage-customers');
      });

      it('does not double slash when path has leading slash', () => {
        const result = getCanonicalUrl('/contact');
        expect(result).toBe('https://www.rebootmedia.net/contact');
      });

      it('preserves query parameters if included', () => {
        const result = getCanonicalUrl('products?category=featured');
        expect(result).toBe('https://www.rebootmedia.net/products?category=featured');
      });

      it('preserves hash fragments if included', () => {
        const result = getCanonicalUrl('about#team');
        expect(result).toBe('https://www.rebootmedia.net/about#team');
      });

      it('returns base URL with trailing slash when called with no arguments', () => {
        const result = getCanonicalUrl();
        expect(result).toBe('https://www.rebootmedia.net/');
      });
    });

    describe('getOgImageUrl', () => {
      it('returns default OG image URL when no path provided', () => {
        const result = getOgImageUrl();
        expect(result).toBe('https://www.rebootmedia.net/og-image.jpg');
      });

      it('returns custom OG image URL with provided path', () => {
        const result = getOgImageUrl('custom-og.png');
        expect(result).toBe('https://www.rebootmedia.net/custom-og.png');
      });
    });

    describe('getLogoUrl', () => {
      it('returns default logo URL when no path provided', () => {
        const result = getLogoUrl();
        expect(result).toBe('https://www.rebootmedia.net/reboot-media.avif');
      });

      it('returns custom logo URL with provided path', () => {
        const result = getLogoUrl('logo.svg');
        expect(result).toBe('https://www.rebootmedia.net/logo.svg');
      });
    });

    describe('getOrganizationUrl', () => {
      it('returns the base organization URL', () => {
        const result = getOrganizationUrl();
        expect(result).toBe('https://www.rebootmedia.net');
      });
    });
  });

  // Note: Testing development mode would require dynamic import or separate test file
  // since import.meta.env is resolved at build time
});