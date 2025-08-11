import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock components to isolate App testing
vi.mock('../components/GlobalHeader', () => ({
  default: ({ onShowForm }: { onShowForm?: () => void }) => (
    <div data-testid="global-header" onClick={onShowForm}>GlobalHeader</div>
  )
}));

vi.mock('../components/GlobalFooter', () => ({
  default: ({ onShowForm }: { onShowForm?: () => void }) => (
    <div data-testid="global-footer" onClick={onShowForm}>GlobalFooter</div>
  )
}));

vi.mock('../components/PricingCards', () => ({
  default: () => <div data-testid="pricing-cards">PricingCards</div>
}));

vi.mock('../components/BackgroundGradient', () => ({
  default: () => <div data-testid="background-gradient">BackgroundGradient</div>
}));

vi.mock('../contexts/LeadFormContext', () => ({
  useLeadForm: () => ({
    setShowDropdownForm: vi.fn()
  })
}));

describe('App Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Layout Structure', () => {
    it('renders all major sections', () => {
      renderWithRouter(<App />);
      
      // Check for main components
      expect(screen.getByTestId('global-header')).toBeInTheDocument();
      expect(screen.getByTestId('global-footer')).toBeInTheDocument();
      expect(screen.getByTestId('pricing-cards')).toBeInTheDocument();
      expect(screen.getByTestId('background-gradient')).toBeInTheDocument();
    });

    it('has proper viewport structure', () => {
      const { container } = renderWithRouter(<App />);
      
      const homepage = container.querySelector('.homepage');
      expect(homepage).toHaveClass('min-h-screen', 'relative', 'overflow-hidden');
    });

    it('hero section has minimum height and centering', () => {
      const { container } = renderWithRouter(<App />);
      
      const heroSection = container.querySelector('#home');
      expect(heroSection).toHaveClass('min-h-screen', 'flex', 'items-center');
    });
  });

  describe('Content Spacing and Padding', () => {
    it('sections have appropriate responsive padding', () => {
      const { container } = renderWithRouter(<App />);
      
      // Check psychology section
      const psychologySection = container.querySelector('#psychology');
      expect(psychologySection).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
      expect(psychologySection).toHaveStyle({
        paddingTop: 'clamp(0.5rem, 1.5vw, 1rem)',
        paddingBottom: 'clamp(3rem, 8vw, 5rem)'
      });
    });

    it('services section has proper spacing', () => {
      const { container } = renderWithRouter(<App />);
      
      const servicesSection = container.querySelector('#services');
      expect(servicesSection).toHaveStyle({
        paddingTop: 'clamp(3rem, 8vw, 5rem)',
        paddingBottom: 'clamp(3rem, 8vw, 5rem)'
      });
    });

    it('about section has appropriate padding', () => {
      const { container } = renderWithRouter(<App />);
      
      const aboutSection = container.querySelector('#about');
      expect(aboutSection).toHaveStyle({
        paddingTop: 'clamp(3rem, 8vw, 5rem)',
        paddingBottom: 'clamp(3rem, 8vw, 5rem)'
      });
    });
  });

  describe('Typography and Headings', () => {
    it('renders main headline with proper classes', () => {
      renderWithRouter(<App />);
      
      const headline = screen.getByText('Stop Losing');
      const parentH1 = headline.closest('h1');
      expect(parentH1).toHaveClass('heading-hero', 'text-critical');
    });

    it('typewriter effect word displays correctly', async () => {
      renderWithRouter(<App />);
      
      // Wait for typewriter effect to start
      await waitFor(() => {
        const typedSpan = screen.getByText(/\|/);
        expect(typedSpan).toHaveClass('animate-blink');
      }, { timeout: 1000 });
    });
  });

  describe('SEO and Meta Tags', () => {
    it('renders SEO head component', () => {
      renderWithRouter(<App />);
      
      // SEOHead component would set document.title
      expect(document.title).toBeTruthy();
    });
  });

  describe('Responsive Design', () => {
    it('hero benefits grid is responsive', () => {
      const { container } = renderWithRouter(<App />);
      
      const benefitsGrid = container.querySelector('.grid.grid-cols-1.sm\\:grid-cols-3');
      expect(benefitsGrid).toBeInTheDocument();
    });

    it('CTA button has responsive sizing', () => {
      renderWithRouter(<App />);
      
      const ctaButton = screen.getByRole('button', { name: /Show Me What's Broken in My Marketing/i });
      expect(ctaButton).toHaveClass('px-8', 'sm:px-12', 'text-lg', 'sm:text-xl');
    });
  });

  describe('Content Layout Issues', () => {
    it('hero section content is properly contained', () => {
      const { container } = renderWithRouter(<App />);
      
      const heroContent = container.querySelector('#home .max-w-7xl');
      expect(heroContent).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
    });

    it('ensures content does not overlap with fixed header', () => {
      const { container } = renderWithRouter(<App />);
      
      // The hero section should have enough top padding or use flex centering
      // to prevent content from being hidden under the fixed header
      const heroSection = container.querySelector('#home');
      expect(heroSection).toHaveClass('flex', 'items-center');
      
      // The content wrapper has padding
      const contentWrapper = heroSection?.querySelector('.w-full.py-8');
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  describe('Industry Experience Section', () => {
    it('renders industry experience question section', () => {
      renderWithRouter(<App />);
      
      expect(screen.getByText(/Do You Have Experience in/)).toBeInTheDocument();
      expect(screen.getByText('My Industry')).toBeInTheDocument();
    });

    it('has proper step-by-step layout', () => {
      const { container } = renderWithRouter(<App />);
      
      // Check for problem section
      const problemSection = screen.getByText('The Problem').closest('div');
      expect(problemSection).toBeInTheDocument();
      
      // Check for solution section
      const solutionSection = screen.getByText('The Solution').closest('div');
      expect(solutionSection).toBeInTheDocument();
    });
  });

  describe('Final CTA Section', () => {
    it('renders procrastinator messaging', () => {
      renderWithRouter(<App />);
      
      expect(screen.getByText(/Still Thinking About It?/)).toBeInTheDocument();
      expect(screen.getByText(/Every Month You Wait Costs You/)).toBeInTheDocument();
    });

    it('renders skeptic messaging', () => {
      renderWithRouter(<App />);
      
      expect(screen.getByText(/I've Heard It All Before/)).toBeInTheDocument();
    });

    it('final CTA section has dark background', () => {
      const { container } = renderWithRouter(<App />);
      
      const finalSection = container.querySelector('.bg-gradient-to-br.from-slate-900');
      expect(finalSection).toBeInTheDocument();
    });
  });

  describe('Mobile Optimization', () => {
    it('text uses responsive sizing', () => {
      renderWithRouter(<App />);
      
      const subheadline = screen.getByText(/Stop fumbling with amateur advice/);
      const parent = subheadline.closest('p');
      expect(parent).toHaveClass('text-xl');
    });

    it('benefits cards stack on mobile', () => {
      const { container } = renderWithRouter(<App />);
      
      // Find the benefits grid more specifically
      const heroSection = container.querySelector('#home');
      const benefitsGrid = heroSection?.querySelector('.grid.grid-cols-1.sm\\:grid-cols-3');
      expect(benefitsGrid).toBeInTheDocument();
      expect(benefitsGrid).toHaveClass('grid-cols-1', 'sm:grid-cols-3');
    });
  });
});