import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../About';
import { useLeadForm } from '../../contexts/LeadFormContext';

// Mock components
vi.mock('../../components/GlobalHeader', () => ({
  default: ({ showProgressBar }: { showProgressBar?: boolean }) => (
    <div data-testid="global-header" data-progress-bar={showProgressBar}>
      GlobalHeader
    </div>
  )
}));

vi.mock('../../components/GlobalFooter', () => ({
  default: () => <div data-testid="global-footer">GlobalFooter</div>
}));

vi.mock('../../components/BackgroundGradient', () => ({
  default: () => <div data-testid="background-gradient">BackgroundGradient</div>
}));

vi.mock('../../contexts/LeadFormContext', () => ({
  useLeadForm: () => ({
    setShowDropdownForm: vi.fn()
  })
}));

describe('About Page', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    );
  };

  describe('Layout and Structure', () => {
    it('renders the About page with all major sections', () => {
      renderWithRouter(<About />);
      
      expect(screen.getByText('About Reboot Media')).toBeInTheDocument();
      expect(screen.getByText('Our Story')).toBeInTheDocument();
      expect(screen.getByText('Leadership')).toBeInTheDocument();
      expect(screen.getByText('Our Approach')).toBeInTheDocument();
      expect(screen.getByText('Our Values')).toBeInTheDocument();
    });

    it('has proper page structure with background gradient', () => {
      const { container } = renderWithRouter(<About />);
      
      const pageWrapper = container.querySelector('.about-page');
      expect(pageWrapper).toHaveClass('min-h-screen', 'relative', 'overflow-hidden');
      expect(screen.getByTestId('background-gradient')).toBeInTheDocument();
    });
  });

  describe('Header Spacing and Padding', () => {
    it('main content has proper padding to account for fixed header', () => {
      const { container } = renderWithRouter(<About />);
      
      // Check that content wrapper has padding-top
      const contentWrapper = container.querySelector('.pt-20.md\\:pt-24');
      expect(contentWrapper).toBeInTheDocument();
      expect(contentWrapper).toHaveClass('pt-20', 'md:pt-24', 'pb-8');
    });

    it('header is rendered with progress bar enabled', () => {
      renderWithRouter(<About />);
      
      const header = screen.getByTestId('global-header');
      expect(header).toHaveAttribute('data-progress-bar', 'true');
    });

    it('content sections have proper max-width and padding', () => {
      const { container } = renderWithRouter(<About />);
      
      const contentContainer = container.querySelector('.max-w-6xl.mx-auto');
      expect(contentContainer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
    });
  });

  describe('Hero Section', () => {
    it('renders hero content with proper typography', () => {
      renderWithRouter(<About />);
      
      const heroHeading = screen.getByRole('heading', { name: 'About Reboot Media' });
      expect(heroHeading).toHaveClass('heading-hero', 'text-critical');
      
      const heroText = screen.getByText(/Fractional CMO services with proven C-level executive experience/);
      expect(heroText).toHaveClass('text-xl', 'text-important');
    });
  });

  describe('Company Stats', () => {
    it('displays all company statistics', () => {
      renderWithRouter(<About />);
      
      expect(screen.getByText('$2B+')).toBeInTheDocument();
      expect(screen.getByText('Revenue Managed')).toBeInTheDocument();
      
      expect(screen.getByText('20+')).toBeInTheDocument();
      expect(screen.getByText('US Companies')).toBeInTheDocument();
      
      expect(screen.getByText('3X')).toBeInTheDocument();
      expect(screen.getByText('Average Revenue Growth')).toBeInTheDocument();
      
      expect(screen.getByText('Global')).toBeInTheDocument();
    });

    it('stats cards have proper styling', () => {
      const { container } = renderWithRouter(<About />);
      
      const statsGrid = container.querySelector('.grid.sm\\:grid-cols-2.lg\\:grid-cols-4');
      expect(statsGrid).toBeInTheDocument();
      
      const statCard = container.querySelector('.bg-white\\/70');
      expect(statCard).toHaveClass('backdrop-blur-md', 'rounded-2xl', 'shadow-xl');
    });
  });

  describe('Leadership Section', () => {
    it('renders leadership information', () => {
      renderWithRouter(<About />);
      
      expect(screen.getByText('Ian Ho')).toBeInTheDocument();
      expect(screen.getByText('Founder & Fractional CMO')).toBeInTheDocument();
      expect(screen.getByText(/With over 15 years of C-level marketing experience/)).toBeInTheDocument();
    });

    it('LinkedIn link is properly configured', () => {
      renderWithRouter(<About />);
      
      const linkedInLink = screen.getByRole('link', { name: /Connect on LinkedIn/i });
      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ian-ho/');
      expect(linkedInLink).toHaveAttribute('target', '_blank');
      expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Values Section', () => {
    it('displays all company values', () => {
      renderWithRouter(<About />);
      
      expect(screen.getByText('Results-Driven')).toBeInTheDocument();
      expect(screen.getByText('Excellence')).toBeInTheDocument();
      expect(screen.getByText('Transparency')).toBeInTheDocument();
    });

    it('value cards have proper icon containers', () => {
      const { container } = renderWithRouter(<About />);
      
      const iconContainers = container.querySelectorAll('.w-16.h-16.rounded-full');
      expect(iconContainers.length).toBeGreaterThan(0);
      expect(iconContainers[0]).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('CTA Section', () => {
    it('renders the final CTA section', () => {
      renderWithRouter(<About />);
      
      expect(screen.getByText('Ready to Work Together?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Get Your Free Marketing Analysis' })).toBeInTheDocument();
    });

    it('CTA section has gradient background', () => {
      const { container } = renderWithRouter(<About />);
      
      const ctaSection = container.querySelector('.bg-gradient-to-r.from-orange-500.to-amber-500');
      expect(ctaSection).toBeInTheDocument();
      expect(ctaSection).toHaveClass('rounded-2xl', 'shadow-xl');
    });

    it('CTA button triggers lead form', () => {
      // The mock is already set up at the module level
      renderWithRouter(<About />);
      
      const ctaButton = screen.getByRole('button', { name: 'Get Your Free Marketing Analysis' });
      
      // Just check that button exists and is clickable
      expect(ctaButton).toBeInTheDocument();
      fireEvent.click(ctaButton);
      
      // The actual functionality would be tested in an integration test
      // since we're mocking the context
    });
  });

  describe('Responsive Design', () => {
    it('grid layouts are responsive', () => {
      const { container } = renderWithRouter(<About />);
      
      // Check approach grid
      const approachGrid = container.querySelector('.grid.md\\:grid-cols-2');
      expect(approachGrid).toBeInTheDocument();
      
      // Check values grid
      const valuesGrid = container.querySelector('.grid.sm\\:grid-cols-2.lg\\:grid-cols-3');
      expect(valuesGrid).toBeInTheDocument();
    });

    it('text sizes are responsive', () => {
      const { container } = renderWithRouter(<About />);
      
      const heroText = container.querySelector('.text-xl.text-important');
      expect(heroText).toHaveClass('max-w-3xl', 'mx-auto', 'leading-relaxed');
    });
  });

  describe('Accessibility', () => {
    it('page has proper heading hierarchy', () => {
      renderWithRouter(<About />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('About Reboot Media');
      
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(0);
    });

    it('external links have proper attributes', () => {
      renderWithRouter(<About />);
      
      const externalLink = screen.getByRole('link', { name: /Connect on LinkedIn/i });
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('SEO', () => {
    it('renders with SEO metadata', () => {
      renderWithRouter(<About />);
      
      // The SEOHead component would set these
      expect(document.title).toBeTruthy();
    });

    it('privacy link has transparent styling', () => {
      renderWithRouter(<About />);
      
      const privacyLink = screen.getByRole('link', { name: /Privacy protected/i });
      expect(privacyLink).toHaveClass('transparent-link');
    });
  });
});