import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import PageTemplate from '../PageTemplate';
import type { PageTemplateProps } from '../PageTemplate';
import { LeadFormProvider } from '../../contexts/LeadFormContext';

// Mock the components that PageTemplate uses
vi.mock('../GlobalHeader', () => ({
  default: ({ showProgressBar }: { showProgressBar?: boolean }) => (
    <div data-testid="global-header" data-progress-bar={showProgressBar}>
      Global Header
    </div>
  ),
}));

vi.mock('../GlobalFooter', () => ({
  default: () => <div data-testid="global-footer">Global Footer</div>,
}));

vi.mock('../SEOHead', () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="seo-head" data-title={title} data-description={description}>
      SEO Head
    </div>
  ),
}));

vi.mock('../BackgroundGradient', () => ({
  default: () => <div data-testid="background-gradient">Background Gradient</div>,
}));

// Helper component to wrap PageTemplate with required providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <LeadFormProvider>{children}</LeadFormProvider>
  </BrowserRouter>
);

describe('PageTemplate', () => {
  const defaultProps: PageTemplateProps = {
    seoProps: {
      title: 'Test Page Title',
      description: 'Test page description',
      canonicalUrl: 'https://example.com/test',
    },
    hero: {
      title: 'Test Hero Title',
      description: 'Test hero description',
    },
    content: [
      {
        id: 'test-content',
        content: <div>Test content</div>,
      },
    ],
  };

  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <PageTemplate {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByTestId('background-gradient')).toBeInTheDocument();
    expect(screen.getByTestId('global-header')).toBeInTheDocument();
    expect(screen.getByTestId('global-footer')).toBeInTheDocument();
    expect(screen.getByTestId('seo-head')).toBeInTheDocument();
  });

  it('renders hero section with correct content', () => {
    render(
      <TestWrapper>
        <PageTemplate {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Hero Title')).toBeInTheDocument();
    expect(screen.getByText('Test hero description')).toBeInTheDocument();
  });

  it('renders content sections', () => {
    render(
      <TestWrapper>
        <PageTemplate {...defaultProps} />
      </TestWrapper>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders hero badge when provided', () => {
    const propsWithBadge: PageTemplateProps = {
      ...defaultProps,
      hero: {
        ...defaultProps.hero,
        badge: {
          text: 'Test Badge',
          animated: true,
        },
      },
    };

    render(
      <TestWrapper>
        <PageTemplate {...propsWithBadge} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('renders hero buttons when provided', () => {
    const propsWithButtons: PageTemplateProps = {
      ...defaultProps,
      hero: {
        ...defaultProps.hero,
        buttons: [
          {
            text: 'Primary Button',
            variant: 'primary',
            size: 'lg',
          },
          {
            text: 'Secondary Button',
            variant: 'secondary',
            size: 'md',
          },
        ],
      },
    };

    render(
      <TestWrapper>
        <PageTemplate {...propsWithButtons} />
      </TestWrapper>
    );

    expect(screen.getByText('Primary Button')).toBeInTheDocument();
    expect(screen.getByText('Secondary Button')).toBeInTheDocument();
  });

  it('renders breadcrumbs when provided', () => {
    const propsWithBreadcrumbs: PageTemplateProps = {
      ...defaultProps,
      breadcrumbs: [
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Category',
          href: '/category',
        },
        {
          text: 'Current Page',
          isActive: true,
        },
      ],
    };

    render(
      <TestWrapper>
        <PageTemplate {...propsWithBreadcrumbs} />
      </TestWrapper>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('renders footer CTA when provided', () => {
    const propsWithFooterCTA: PageTemplateProps = {
      ...defaultProps,
      footerCTA: {
        title: 'Footer CTA Title',
        description: 'Footer CTA description',
        buttons: [
          {
            text: 'CTA Button',
            variant: 'primary',
          },
        ],
      },
    };

    render(
      <TestWrapper>
        <PageTemplate {...propsWithFooterCTA} />
      </TestWrapper>
    );

    expect(screen.getByText('Footer CTA Title')).toBeInTheDocument();
    expect(screen.getByText('Footer CTA description')).toBeInTheDocument();
    expect(screen.getByText('CTA Button')).toBeInTheDocument();
  });

  it('applies different hero variants correctly', () => {
    // Test gradient variant
    const { rerender } = render(
      <TestWrapper>
        <PageTemplate
          {...defaultProps}
          hero={{
            ...defaultProps.hero,
            variant: 'gradient',
            gradient: 'blue',
          }}
        />
      </TestWrapper>
    );

    // Should render hero title in gradient variant
    expect(screen.getByText('Test Hero Title')).toBeInTheDocument();

    // Test minimal variant - hero content should not be rendered in a section
    rerender(
      <TestWrapper>
        <PageTemplate
          {...defaultProps}
          hero={{
            ...defaultProps.hero,
            variant: 'minimal',
          }}
        />
      </TestWrapper>
    );

    // The content should still render (just without hero section)
    expect(screen.getByText('Test content')).toBeInTheDocument();

    // Test legal variant
    rerender(
      <TestWrapper>
        <PageTemplate
          {...defaultProps}
          hero={{
            ...defaultProps.hero,
            variant: 'legal',
          }}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Test Hero Title')).toBeInTheDocument();
  });

  it('applies different content section variants', () => {
    const propsWithVariants: PageTemplateProps = {
      ...defaultProps,
      content: [
        {
          id: 'glass-content',
          variant: 'glass',
          content: <div>Glass content</div>,
        },
        {
          id: 'highlight-content',
          variant: 'highlight',
          content: <div>Highlight content</div>,
        },
        {
          id: 'cta-content',
          variant: 'cta',
          content: <div>CTA content</div>,
        },
      ],
    };

    render(
      <TestWrapper>
        <PageTemplate {...propsWithVariants} />
      </TestWrapper>
    );

    expect(screen.getByText('Glass content')).toBeInTheDocument();
    expect(screen.getByText('Highlight content')).toBeInTheDocument();
    expect(screen.getByText('CTA content')).toBeInTheDocument();
  });

  it('renders content section titles when provided', () => {
    const propsWithTitles: PageTemplateProps = {
      ...defaultProps,
      content: [
        {
          id: 'titled-content',
          title: 'Section Title',
          content: <div>Section content</div>,
        },
      ],
    };

    render(
      <TestWrapper>
        <PageTemplate {...propsWithTitles} />
      </TestWrapper>
    );

    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('passes showProgressBar prop to GlobalHeader', () => {
    render(
      <TestWrapper>
        <PageTemplate {...defaultProps} showProgressBar={false} />
      </TestWrapper>
    );

    expect(screen.getByTestId('global-header')).toHaveAttribute(
      'data-progress-bar',
      'false'
    );
  });

  it('applies custom container max width', () => {
    render(
      <TestWrapper>
        <PageTemplate {...defaultProps} containerMaxWidth="4xl" />
      </TestWrapper>
    );

    // The container should render without errors
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TestWrapper>
        <PageTemplate {...defaultProps} className="custom-class" />
      </TestWrapper>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders JSX hero title correctly', () => {
    const propsWithJSXTitle: PageTemplateProps = {
      ...defaultProps,
      hero: {
        ...defaultProps.hero,
        title: (
          <>
            <span className="text-blue-400">Highlighted</span> Title
          </>
        ),
      },
    };

    render(
      <TestWrapper>
        <PageTemplate {...propsWithJSXTitle} />
      </TestWrapper>
    );

    expect(screen.getByText('Highlighted')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});