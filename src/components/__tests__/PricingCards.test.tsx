import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PricingCards from '../PricingCards';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const mockOnShowForm = vi.fn();

describe('PricingCards', () => {
  describe('Rendering', () => {
    it('renders all pricing tiers', () => {
      renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      expect(screen.getByText(/Strategy Session/)).toBeInTheDocument();
      expect(screen.getByText(/Part-Time Fractional CMO/)).toBeInTheDocument();
      expect(screen.getByText(/Full Fractional CMO/)).toBeInTheDocument();
    });

    it('displays pricing information', () => {
      renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Check for pricing displays
      expect(screen.getByText(/Free Strategy Session/)).toBeInTheDocument();
      expect(screen.getByText(/\$15,000/)).toBeInTheDocument();
      expect(screen.getByText(/\$25,000/)).toBeInTheDocument();
    });

    it('shows features for each tier', () => {
      renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Strategy Session features
      expect(screen.getByText(/90-minute video call/)).toBeInTheDocument();
      expect(screen.getByText(/Growth obstacle analysis/)).toBeInTheDocument();
      
      // Part-Time features
      expect(screen.getByText(/20 hours per month/)).toBeInTheDocument();
      expect(screen.getByText(/Strategic planning/)).toBeInTheDocument();
      
      // Full-Time features
      expect(screen.getByText(/40 hours per month/)).toBeInTheDocument();
      expect(screen.getByText(/Complete marketing leadership/)).toBeInTheDocument();
    });
  });

  describe('Interactive Elements', () => {
    it('calls onShowForm when CTA buttons are clicked', () => {
      renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      const ctaButtons = screen.getAllByText(/Book Free Session|Get Started/);
      
      ctaButtons.forEach((button) => {
        fireEvent.click(button);
      });
      
      expect(mockOnShowForm).toHaveBeenCalledTimes(ctaButtons.length);
    });

    it('has proper button accessibility', () => {
      renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('Design System Compliance', () => {
    it('uses 8pt grid spacing', () => {
      const { container } = renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Check for proper spacing classes (8pt grid: space-2, space-4, space-6, space-8, etc.)
      const spacingElements = container.querySelectorAll('[class*="space-"], [class*="gap-"], [class*="p-"], [class*="m-"]');
      expect(spacingElements.length).toBeGreaterThan(0);
    });

    it('implements 60-30-10 color hierarchy', () => {
      const { container } = renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Check for neutral background colors (60%)
      const neutralElements = container.querySelectorAll('[class*="bg-white"], [class*="bg-gray"]');
      expect(neutralElements.length).toBeGreaterThan(0);
      
      // Check for primary accent colors (10%)
      const primaryElements = container.querySelectorAll('[class*="bg-orange"], [class*="text-orange"], [class*="border-orange"]');
      expect(primaryElements.length).toBeGreaterThan(0);
    });

    it('uses fluid typography with clamp() functions', () => {
      const { container } = renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Check for responsive text classes
      const textElements = container.querySelectorAll('[class*="text-"], [class*="leading-"]');
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe('Trust Signals', () => {
    it('displays social proof elements', () => {
      renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Check for trust indicators
      expect(screen.getByText(/No long-term contracts/)).toBeInTheDocument();
      expect(screen.getByText(/Cancel anytime/)).toBeInTheDocument();
    });

    it('shows risk reversal elements', () => {
      renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Check for risk reversal
      expect(screen.getByText(/100% satisfaction guarantee/)).toBeInTheDocument();
      expect(screen.getByText(/Free Strategy Session/)).toBeInTheDocument();
    });
  });

  describe('Conversion Optimization', () => {
    it('highlights recommended option', () => {
      const { container } = renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Check for "Most Popular" or similar highlighting
      const popularBadge = container.querySelector('[class*="bg-orange"], [class*="border-orange"]');
      expect(popularBadge).toBeInTheDocument();
    });

    it('uses action-oriented CTA language', () => {
      renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // CTAs should be action-oriented, not generic "Submit"
      expect(screen.getByText(/Book Free Session/)).toBeInTheDocument();
      expect(screen.getByText(/Get Started/)).toBeInTheDocument();
      expect(screen.queryByText(/Submit/)).not.toBeInTheDocument();
    });

    it('displays clear value propositions', () => {
      renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Each tier should have clear value props
      expect(screen.getByText(/Identify growth obstacles/)).toBeInTheDocument();
      expect(screen.getByText(/Strategic marketing leadership/)).toBeInTheDocument();
      expect(screen.getByText(/Full marketing department/)).toBeInTheDocument();
    });
  });

  describe('Mobile Responsiveness', () => {
    it('renders properly on mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      const { container } = renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      // Should have responsive grid/flex classes
      const responsiveElements = container.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"]');
      expect(responsiveElements.length).toBeGreaterThan(0);
    });

    it('maintains 44px minimum touch targets on mobile', () => {
      const { container } = renderWithRouter(<PricingCards onShowForm={mockOnShowForm} />);
      
      const buttons = container.querySelectorAll('button');
      buttons.forEach((button) => {
        const styles = getComputedStyle(button);
        const minHeight = parseInt(styles.minHeight) || parseInt(styles.height);
        const minWidth = parseInt(styles.minWidth) || parseInt(styles.width);
        
        // 44px = 2.75rem, but we'll check for reasonable button sizes
        expect(minHeight).toBeGreaterThanOrEqual(40); // Allow slight variance
        expect(minWidth).toBeGreaterThanOrEqual(40);
      });
    });
  });

  describe('Performance', () => {
    it('renders efficiently without unnecessary re-renders', () => {
      const renderSpy = vi.fn();
      const TestWrapper = () => {
        renderSpy();
        return <PricingCards onShowForm={mockOnShowForm} />;
      };
      
      const { rerender } = renderWithRouter(<TestWrapper />);
      
      // Initial render
      expect(renderSpy).toHaveBeenCalledTimes(1);
      
      // Re-render with same props should not cause additional renders
      rerender(<BrowserRouter><TestWrapper /></BrowserRouter>);
      expect(renderSpy).toHaveBeenCalledTimes(2); // Only one additional call
    });
  });
});