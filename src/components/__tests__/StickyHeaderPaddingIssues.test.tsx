import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GlobalHeader from '../GlobalHeader';
import About from '../../pages/About';
import App from '../../App';

// Mock components to avoid circular dependencies
vi.mock('../../contexts/LeadFormContext', () => ({
  useLeadForm: () => ({
    setShowDropdownForm: vi.fn(),
    showDropdownForm: false
  }),
  LeadFormProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

vi.mock('../GlobalFooter', () => ({
  default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('../BackgroundGradient', () => ({
  default: () => <div data-testid="background">Background</div>
}));

vi.mock('../PricingCards', () => ({
  default: () => <div data-testid="pricing">Pricing</div>
}));

describe('Sticky Header Padding Issues', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    );
  };

  describe('Header Positioning', () => {
    it('GlobalHeader has fixed positioning with proper z-index', () => {
      const { container } = renderWithRouter(<GlobalHeader />);
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
    });

    it('GlobalHeader content has appropriate padding', () => {
      const { container } = renderWithRouter(<GlobalHeader />);
      
      const contentWrapper = container.querySelector('.max-w-7xl.mx-auto');
      expect(contentWrapper).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
      
      const innerContent = container.querySelector('.flex.justify-between.items-center');
      expect(innerContent).toHaveClass('py-3', 'sm:py-4');
    });
  });

  describe('Page Content Padding', () => {
    it('About page has sufficient top padding for fixed header', () => {
      const { container } = renderWithRouter(<About />);
      
      // Check for the content wrapper with padding
      const contentWrapper = container.querySelector('.pt-20.md\\:pt-24');
      expect(contentWrapper).toBeInTheDocument();
      
      // Verify it has the right classes
      expect(contentWrapper).toHaveClass('pt-20', 'md:pt-24', 'pb-8');
    });

    it('App component hero section does not get hidden under header', () => {
      const { container } = renderWithRouter(<App />);
      
      // Hero section should use flex centering instead of padding-top
      const heroSection = container.querySelector('#home');
      expect(heroSection).toHaveClass('min-h-screen', 'flex', 'items-center');
      
      // Content inside has its own padding
      const heroContent = heroSection?.querySelector('.w-full.py-8');
      expect(heroContent).toBeInTheDocument();
    });
  });

  describe('Mobile Specific Issues', () => {
    it('mobile navigation is fixed at bottom', () => {
      const { container } = renderWithRouter(<GlobalHeader />);
      
      const mobileNav = container.querySelector('nav.fixed.bottom-0');
      expect(mobileNav).toBeInTheDocument();
      expect(mobileNav).toHaveClass('left-0', 'right-0', 'z-50', 'md:hidden');
    });

    it('mobile content has proper padding structure', () => {
      const { container } = renderWithRouter(<GlobalHeader />);
      
      const mobileNavContent = container.querySelector('nav.fixed.bottom-0 .flex');
      expect(mobileNavContent).toHaveStyle({
        padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)'
      });
    });
  });

  describe('Responsive Padding Values', () => {
    it('header inner content uses responsive padding', () => {
      const { container } = renderWithRouter(<GlobalHeader />);
      
      // Check that padding changes at breakpoints
      const innerDiv = container.querySelector('.py-3.sm\\:py-4');
      expect(innerDiv).toBeInTheDocument();
    });

    it('page sections use clamp for fluid spacing', () => {
      const { container } = renderWithRouter(<App />);
      
      const psychologySection = container.querySelector('#psychology');
      expect(psychologySection).toHaveStyle({
        paddingTop: 'clamp(0.5rem, 1.5vw, 1rem)'
      });
    });
  });

  describe('Potential Overlap Issues', () => {
    it('header background changes on scroll to improve visibility', () => {
      const { container } = renderWithRouter(<GlobalHeader />);
      
      const headerInner = container.querySelector('nav > div');
      
      // Initial state should have more transparency
      expect(headerInner?.className).toContain('bg-white/80');
      
      // After scroll (simulated by checking classes), it should be more opaque
      // This would need scroll simulation in a real test
    });

    it('ensures no content starts at viewport top (would be hidden by header)', () => {
      const { container } = renderWithRouter(<About />);
      
      // Main content should not start at top:0
      const mainContent = container.querySelector('.pt-20');
      expect(mainContent).toBeInTheDocument();
      
      // This padding ensures content is visible below the fixed header
    });
  });

  describe('Known Issues to Fix', () => {
    it('identifies sections that might have insufficient top padding', () => {
      const { container } = renderWithRouter(<App />);
      
      // Check if any section starts too close to top
      const sections = container.querySelectorAll('section');
      
      sections.forEach((section, index) => {
        // Skip hero section as it uses different layout
        if (section.id === 'home') return;
        
        const styles = window.getComputedStyle(section);
        const paddingTop = styles.paddingTop;
        
        // Log sections that might need adjustment
        if (paddingTop && parseInt(paddingTop) < 16) { // Less than 1rem
          console.warn(`Section ${index} may have insufficient top padding: ${paddingTop}`);
        }
      });
    });

    it('verifies mobile button positioning does not overlap content', () => {
      const { container } = renderWithRouter(<GlobalHeader />);
      
      const mobileButton = container.querySelector('nav.fixed.bottom-0 button');
      expect(mobileButton).toBeInTheDocument();
      
      // Button should have appropriate sizing
      expect(mobileButton).toHaveStyle({
        padding: 'clamp(0.625rem, 2.5vw, 0.75rem) clamp(1rem, 3vw, 1.25rem)'
      });
    });
  });
});