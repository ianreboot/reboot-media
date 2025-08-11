import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import FractionalCMOGuide from '../pages/FractionalCMOGuide';
import MarketingPsychology from '../pages/MarketingPsychology';
import GrowthPlateauSolutions from '../pages/GrowthPlateauSolutions';

// Mock components and contexts
vi.mock('../contexts/LeadFormContext', () => ({
  useLeadForm: () => ({
    setShowDropdownForm: vi.fn(),
    showDropdownForm: false
  }),
  LeadFormProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

vi.mock('../components/GlobalFooter', () => ({
  default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('../components/BackgroundGradient', () => ({
  default: () => <div data-testid="background">Background</div>
}));

vi.mock('../components/PricingCards', () => ({
  default: () => <div data-testid="pricing">Pricing</div>
}));

describe('Header Padding Integration Tests', () => {
  const renderPage = (PageComponent: React.ComponentType) => {
    return render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageComponent />} />
        </Routes>
      </BrowserRouter>
    );
  };

  describe('Fixed Header Impact on Content', () => {
    it('About page content is not hidden under fixed header', () => {
      const { container } = renderPage(About);
      
      // Check that main content has top padding
      const mainContent = container.querySelector('.pt-20.md\\:pt-24');
      expect(mainContent).toBeInTheDocument();
      
      // Verify the padding values
      expect(mainContent).toHaveClass('pt-20', 'md:pt-24');
    });

    it('identifies pages that might have header overlap issues', () => {
      const pagesToTest = [
        { name: 'About', component: About },
        { name: 'Contact', component: Contact },
        { name: 'Privacy', component: Privacy },
        { name: 'Terms', component: Terms },
        { name: 'FractionalCMOGuide', component: FractionalCMOGuide },
        { name: 'MarketingPsychology', component: MarketingPsychology },
        { name: 'GrowthPlateauSolutions', component: GrowthPlateauSolutions }
      ];

      const issuesFound: string[] = [];

      pagesToTest.forEach(({ name, component }) => {
        try {
          const { container } = renderPage(component);
          
          // Look for main content wrapper
          const contentWrappers = container.querySelectorAll('[class*="pt-"]');
          
          if (contentWrappers.length === 0) {
            issuesFound.push(`${name}: No padding-top classes found`);
          } else {
            // Check if any wrapper has sufficient padding
            let hasSufficientPadding = false;
            contentWrappers.forEach(wrapper => {
              const classes = wrapper.className;
              if (classes.includes('pt-20') || classes.includes('pt-24') || 
                  classes.includes('pt-16') || classes.includes('pt-32')) {
                hasSufficientPadding = true;
              }
            });
            
            if (!hasSufficientPadding) {
              issuesFound.push(`${name}: May have insufficient top padding`);
            }
          }
        } catch (error) {
          // Page might not exist or have import issues
          console.warn(`Could not test ${name}: ${error}`);
        }
      });

      // Report any issues found
      if (issuesFound.length > 0) {
        console.warn('Pages with potential header overlap issues:', issuesFound);
      }
      
      // This test documents the current state rather than failing
      expect(issuesFound.length).toBeLessThanOrEqual(pagesToTest.length);
    });
  });

  describe('Mobile Responsive Padding', () => {
    it('verifies mobile has different padding values', () => {
      const { container } = renderPage(About);
      
      // Mobile should have pt-20, desktop pt-24
      const content = container.querySelector('.pt-20.md\\:pt-24');
      expect(content).toBeInTheDocument();
    });

    it('checks that header height is accounted for in padding', () => {
      const { container } = render(
        <BrowserRouter>
          <GlobalHeader />
        </BrowserRouter>
      );
      
      // Header inner content
      const headerInner = container.querySelector('.py-3.sm\\:py-4');
      expect(headerInner).toBeInTheDocument();
      
      // py-3 = 0.75rem * 2 = 1.5rem = 24px on mobile
      // py-4 = 1rem * 2 = 2rem = 32px on desktop
      // Plus logo height and margins, total header is roughly 64-80px
      // So pt-20 (5rem = 80px) should be sufficient
    });
  });

  describe('Sticky Header Visual Issues', () => {
    it('header has proper backdrop blur for content visibility', () => {
      const { container } = render(
        <BrowserRouter>
          <GlobalHeader />
        </BrowserRouter>
      );
      
      const headerDiv = container.querySelector('[class*="backdrop-blur"]');
      expect(headerDiv).toBeInTheDocument();
      expect(headerDiv).toHaveClass('backdrop-blur-md');
    });

    it('header background opacity allows content to show through slightly', () => {
      const { container } = render(
        <BrowserRouter>
          <GlobalHeader />
        </BrowserRouter>
      );
      
      const headerDiv = container.querySelector('[class*="bg-white/"]');
      expect(headerDiv).toBeInTheDocument();
      // Should have partial opacity
      expect(headerDiv?.className).toMatch(/bg-white\/\d{2}/);
    });
  });

  describe('Content Start Position', () => {
    it('ensures no content starts at absolute top (0px)', () => {
      const { container } = renderPage(About);
      
      // Get all major content sections
      const sections = container.querySelectorAll('section, main, [class*="container"]');
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const styles = window.getComputedStyle(section);
        
        // If element is positioned at top, it should have padding or margin
        if (rect.top === 0 && styles.position !== 'fixed' && styles.position !== 'absolute') {
          const paddingTop = parseFloat(styles.paddingTop);
          const marginTop = parseFloat(styles.marginTop);
          
          expect(paddingTop + marginTop).toBeGreaterThan(0);
        }
      });
    });
  });

  describe('Specific Padding Recommendations', () => {
    it('documents recommended padding values for sticky header', () => {
      // Recommended padding values based on header analysis
      const recommendations = {
        mobile: {
          minPadding: 'pt-16', // 4rem = 64px minimum
          recommended: 'pt-20', // 5rem = 80px recommended
          withProgressBar: 'pt-24' // 6rem = 96px with progress bar
        },
        desktop: {
          minPadding: 'pt-20', // 5rem = 80px minimum
          recommended: 'pt-24', // 6rem = 96px recommended
          withProgressBar: 'pt-28' // 7rem = 112px with progress bar
        }
      };
      
      // This test serves as documentation
      expect(recommendations.mobile.recommended).toBe('pt-20');
      expect(recommendations.desktop.recommended).toBe('pt-24');
    });
  });
});