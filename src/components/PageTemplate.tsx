import React from 'react';
import { useLeadForm } from '../contexts/LeadFormContext';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import SEOHead from './SEOHead';
import BackgroundGradient from './BackgroundGradient';

// Hero section variant types
export type HeroVariant = 'default' | 'gradient' | 'minimal' | 'legal';
export type HeroGradient = 'blue' | 'red' | 'orange' | 'green' | 'purple' | 'slate';

// Content section types
export interface ContentSection {
  id: string;
  title?: string;
  content: React.ReactNode;
  variant?: 'default' | 'glass' | 'highlight' | 'cta' | 'warning';
  className?: string;
}

// CTA button configuration
export interface CTAButton {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'md' | 'lg' | 'xl';
}

// Navigation breadcrumb
export interface Breadcrumb {
  text: string;
  href?: string;
  isActive?: boolean;
}

// Main props interface
export interface PageTemplateProps {
  // SEO configuration
  seoProps: {
    title: string;
    description: string;
    canonicalUrl: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    structuredData?: Record<string, any>;
  };

  // Hero section configuration
  hero: {
    variant?: HeroVariant;
    gradient?: HeroGradient;
    badge?: {
      text: string;
      icon?: string;
      animated?: boolean;
    };
    title: string | React.ReactNode;
    subtitle?: string | React.ReactNode;
    description?: string | React.ReactNode;
    buttons?: CTAButton[];
    backgroundElements?: React.ReactNode;
  };

  // Optional breadcrumb navigation
  breadcrumbs?: Breadcrumb[];

  // Main content sections
  content: ContentSection[];

  // Footer CTA section (optional)
  footerCTA?: {
    title: string;
    description: string;
    buttons: CTAButton[];
    variant?: 'gradient' | 'solid';
    gradient?: HeroGradient;
  };

  // Additional configuration
  showProgressBar?: boolean;
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl' | '6xl';
  className?: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  seoProps,
  hero,
  breadcrumbs,
  content,
  footerCTA,
  showProgressBar = true,
  containerMaxWidth = '6xl',
  className = '',
}) => {
  const { setShowDropdownForm } = useLeadForm();

  // Handle CTA button clicks
  const handleCTAClick = (button: CTAButton) => {
    if (button.onClick) {
      button.onClick();
    } else if (button.href) {
      window.location.href = button.href;
    } else {
      // Default to showing lead form
      setShowDropdownForm(true);
    }
  };

  // Get hero gradient classes
  const getHeroGradientClasses = (gradient: HeroGradient) => {
    const gradientMap = {
      blue: 'from-blue-900 via-blue-950 to-black',
      red: 'from-red-900 via-red-950 to-black',
      orange: 'from-orange-900 via-orange-950 to-black',
      green: 'from-green-900 via-green-950 to-black',
      purple: 'from-purple-900 via-purple-950 to-black',
      slate: 'from-slate-900 via-slate-950 to-black',
    };
    return gradientMap[gradient] || gradientMap.blue;
  };

  // Get hero background elements
  const getHeroBackgroundElements = (gradient: HeroGradient) => {
    const backgroundMap = {
      blue: 'bg-[radial-gradient(circle_at_40%_60%,rgba(59,130,246,0.1)_0%,transparent_50%)]',
      red: 'bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.1)_0%,transparent_50%)]',
      orange: 'bg-[radial-gradient(circle_at_30%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)]',
      green: 'bg-[radial-gradient(circle_at_60%_40%,rgba(34,197,94,0.1)_0%,transparent_50%)]',
      purple: 'bg-[radial-gradient(circle_at_50%_30%,rgba(147,51,234,0.1)_0%,transparent_50%)]',
      slate: 'bg-[radial-gradient(circle_at_30%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)]',
    };
    return backgroundMap[gradient] || backgroundMap.blue;
  };

  // Get button classes
  const getButtonClasses = (button: CTAButton) => {
    const baseClasses = 'font-bold transition-all duration-300 transform hover:scale-105 shadow-xl rounded-xl';
    const sizeClasses = {
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    };
    const variantClasses = {
      primary: `bg-gradient-to-r from-${hero.gradient || 'blue'}-500 to-${hero.gradient || 'blue'}-600 hover:from-${hero.gradient || 'blue'}-600 hover:to-${hero.gradient || 'blue'}-700 text-white`,
      secondary: `bg-white dark:bg-slate-800 text-${hero.gradient || 'blue'}-600 dark:text-${hero.gradient || 'blue'}-400 hover:bg-gray-50 dark:hover:bg-slate-700`,
      outline: `border-2 border-${hero.gradient || 'blue'}-500 text-${hero.gradient || 'blue'}-400 hover:bg-${hero.gradient || 'blue'}-500 hover:text-white`,
    };

    return `${baseClasses} ${sizeClasses[button.size || 'lg']} ${variantClasses[button.variant || 'primary']}`;
  };

  // Get content section classes
  const getContentSectionClasses = (section: ContentSection) => {
    const variantClasses = {
      default: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8',
      glass: 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/20 p-6 sm:p-8',
      highlight: `bg-gradient-to-r from-${hero.gradient || 'blue'}-50 to-${hero.gradient === 'blue' ? 'purple' : 'orange'}-50 dark:from-${hero.gradient || 'blue'}-900/20 dark:to-${hero.gradient === 'blue' ? 'purple' : 'orange'}-900/20 rounded-2xl p-8 border border-${hero.gradient || 'blue'}-200/50 dark:border-${hero.gradient || 'blue'}-800/50`,
      cta: `text-center bg-gradient-to-br from-${hero.gradient || 'blue'}-900 via-${hero.gradient || 'blue'}-950 to-black text-white rounded-2xl p-12`,
      warning: `bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6`,
    };

    return `${variantClasses[section.variant || 'default']} ${section.className || ''}`;
  };

  const containerClasses = `max-w-${containerMaxWidth} mx-auto px-6 lg:px-8`;

  return (
    <div className={`page-template min-h-screen relative overflow-hidden dark:bg-gray-900 ${className}`}>
      {/* Background Gradient */}
      <BackgroundGradient />
      
      {/* SEO Head */}
      <SEOHead {...seoProps} />
      
      <div className="relative z-10">
        {/* Global Header */}
        <GlobalHeader showProgressBar={showProgressBar} />

        {/* Hero Section */}
        {hero.variant !== 'minimal' && (
          <section className={`pt-20 md:pt-24 pb-8 ${
            hero.variant === 'gradient' 
              ? `bg-gradient-to-br ${getHeroGradientClasses(hero.gradient || 'blue')} relative overflow-hidden`
              : hero.variant === 'legal'
                ? 'bg-white/5 backdrop-blur-sm'
                : ''
          }`}>
            {hero.variant === 'gradient' && (
              <div className={`absolute inset-0 ${getHeroBackgroundElements(hero.gradient || 'blue')}`}></div>
            )}
            {hero.backgroundElements && (
              <div className="absolute inset-0">{hero.backgroundElements}</div>
            )}
            
            <div className={`relative ${containerClasses} ${hero.variant === 'legal' ? 'py-4' : 'text-center'}`}>
              {hero.badge && (
                <div className={`inline-flex items-center gap-2 bg-${hero.gradient || 'blue'}-100 dark:bg-${hero.gradient || 'blue'}-900/30 text-${hero.gradient || 'blue'}-800 dark:text-${hero.gradient || 'blue'}-300 px-4 py-2 rounded-full text-sm font-semibold mb-6`}>
                  {hero.badge.icon && (
                    <span className={`w-2 h-2 bg-${hero.gradient || 'blue'}-500 rounded-full ${hero.badge.animated ? 'animate-pulse' : ''}`}></span>
                  )}
                  {hero.badge.text}
                </div>
              )}

              {typeof hero.title === 'string' ? (
                <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                  {hero.title}
                </h1>
              ) : (
                <h1 className="heading-hero text-gradient-critical mb-6 leading-tight">
                  {hero.title}
                </h1>
              )}

              {hero.subtitle && (
                <h2 className="text-xl md:text-2xl text-important dark:replace-text-gray-300 mb-6 max-w-4xl mx-auto">
                  {hero.subtitle}
                </h2>
              )}

              {hero.description && (
                <p className="text-xl text-important dark:replace-text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {hero.description}
                </p>
              )}

              {hero.buttons && hero.buttons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {hero.buttons.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => handleCTAClick(button)}
                      className={getButtonClasses(button)}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <section className="bg-white/5 backdrop-blur-sm border-b border-white/10">
            <div className={`${containerClasses} py-4`}>
              <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={index}>
                    {breadcrumb.href ? (
                      <a 
                        href={breadcrumb.href} 
                        className="replace-text-gray-400 hover:text-orange-400 transition-colors"
                      >
                        {breadcrumb.text}
                      </a>
                    ) : (
                      <span className={breadcrumb.isActive ? 'text-orange-400' : 'replace-text-gray-400'}>
                        {breadcrumb.text}
                      </span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <span className="replace-text-gray-600">→</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </section>
        )}

        {/* Main Content */}
        <main className={`${containerClasses} ${hero.variant === 'minimal' ? 'pt-20 md:pt-24' : 'pt-16'} pb-16`}>
          {content.map((section, index) => (
            <section key={section.id} className={`${index > 0 ? 'mt-16' : ''} mb-16`}>
              {section.title && (
                <h2 className="heading-xl text-gradient-critical mb-8 text-center">
                  {section.title}
                </h2>
              )}
              <div className={getContentSectionClasses(section)}>
                {section.content}
              </div>
            </section>
          ))}
        </main>

        {/* Footer CTA */}
        {footerCTA && (
          <section className={`${containerClasses} pb-16`}>
            <div className={`text-center ${
              footerCTA.variant === 'gradient' 
                ? `bg-gradient-to-br from-${footerCTA.gradient || hero.gradient || 'blue'}-900 via-${footerCTA.gradient || hero.gradient || 'blue'}-950 to-black text-white rounded-2xl p-12`
                : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-12'
            }`}>
              <h2 className={`heading-xl mb-6 ${footerCTA.variant === 'gradient' ? 'text-white' : 'text-gradient-critical'}`}>
                {footerCTA.title}
              </h2>
              <p className={`text-lg mb-8 max-w-4xl mx-auto leading-relaxed ${
                footerCTA.variant === 'gradient' 
                  ? 'replace-text-gray-300' 
                  : 'text-standard dark:replace-text-gray-300'
              }`}>
                {footerCTA.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {footerCTA.buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => handleCTAClick(button)}
                    className={getButtonClasses(button)}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Global Footer */}
        <GlobalFooter />
      </div>
    </div>
  );
};

export default PageTemplate;