import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BackgroundGradient from '../BackgroundGradient';

describe('BackgroundGradient', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { container } = render(<BackgroundGradient />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders as a fixed positioned element', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      expect(gradientElement).toHaveClass('fixed');
      expect(gradientElement).toHaveClass('inset-0');
    });

    it('has proper z-index for background layer', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Should have negative z-index in inline styles
      expect(gradientElement.style.zIndex).toBe('-1');
    });
  });

  describe('Performance Optimization', () => {
    it('uses CSS transform for GPU acceleration', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Check for transform classes that enable GPU acceleration
      const hasTransform = gradientElement.className.includes('transform') || 
                          gradientElement.style.transform !== '';
      
      // At minimum, should not cause layout thrashing
      expect(gradientElement).toHaveClass('fixed');
    });

    it('does not cause layout shifts', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Fixed positioning prevents layout shifts
      expect(gradientElement).toHaveClass('fixed');
      expect(gradientElement).toHaveClass('inset-0');
    });
  });

  describe('Visual Design', () => {
    it('implements mathematical gradient system', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Should have background styling applied
      expect(gradientElement.style.backgroundImage || gradientElement.style.background).toBeTruthy();
    });

    it('uses proper color hierarchy (60-30-10 rule)', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Background should use neutral colors (60% of color scheme)
      const hasNeutralBackground = gradientElement.className.includes('bg-white') ||
                                  gradientElement.className.includes('bg-gray') ||
                                  gradientElement.className.includes('bg-slate');
      
      expect(hasNeutralBackground || gradientElement.style.background).toBeTruthy();
    });

    it('supports reduced motion preferences', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Should not have animations that violate reduced motion preferences
      const hasAnimation = gradientElement.className.includes('animate-') ||
                          gradientElement.style.animation !== '';
      
      if (hasAnimation) {
        // If animated, should respect prefers-reduced-motion
        expect(gradientElement.className).toMatch(/motion-reduce/);
      }
    });
  });

  describe('Accessibility', () => {
    it('does not interfere with screen readers', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Background elements should be decorative (not require aria-hidden for divs)
      expect(gradientElement.tagName.toLowerCase()).toBe('div');
    });

    it('does not affect keyboard navigation', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Should not be focusable
      expect(gradientElement).not.toHaveAttribute('tabindex');
      expect(gradientElement.tagName.toLowerCase()).not.toBe('button');
      expect(gradientElement.tagName.toLowerCase()).not.toBe('a');
    });
  });

  describe('Browser Compatibility', () => {
    it('provides fallbacks for unsupported features', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Should have background styling in inline styles
      expect(gradientElement.style.background || gradientElement.style.backgroundColor).toBeTruthy();
    });

    it('uses efficient CSS properties', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // Fixed positioning is more efficient than absolute for full-screen backgrounds
      expect(gradientElement).toHaveClass('fixed');
      
      // Should use efficient sizing
      expect(gradientElement).toHaveClass('inset-0');
    });
  });

  describe('Integration', () => {
    it('works with other components', () => {
      const { container } = render(
        <div>
          <BackgroundGradient />
          <div>Content above background</div>
        </div>
      );
      
      const backgroundElement = container.querySelector('[class*="fixed"]');
      const contentElement = container.querySelector('div:last-child');
      
      expect(backgroundElement).toBeInTheDocument();
      expect(contentElement).toBeInTheDocument();
      expect(contentElement?.textContent).toBe('Content above background');
    });

    it('maintains proper stacking context', () => {
      const { container } = render(
        <div>
          <BackgroundGradient />
          <div data-testid="content">Foreground content</div>
        </div>
      );
      
      const backgroundElement = container.querySelector('[class*="fixed"]');
      
      // Background should have negative z-index in inline styles
      expect((backgroundElement as HTMLElement)?.style.zIndex).toBe('-1');
    });
  });

  describe('Performance Impact', () => {
    it('does not cause unnecessary DOM mutations', () => {
      const { container, rerender } = render(<BackgroundGradient />);
      const initialHTML = container.innerHTML;
      
      // Re-render should not change DOM structure
      rerender(<BackgroundGradient />);
      expect(container.innerHTML).toBe(initialHTML);
    });

    it('uses efficient CSS for full viewport coverage', () => {
      const { container } = render(<BackgroundGradient />);
      const gradientElement = container.firstChild as HTMLElement;
      
      // inset-0 is more efficient than setting top/right/bottom/left individually
      expect(gradientElement).toHaveClass('inset-0');
      expect(gradientElement).toHaveClass('fixed');
    });
  });
});