import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface GlobalHeaderProps {
  onShowForm?: () => void;
  showProgressBar?: boolean;
}

const GlobalHeader = ({ onShowForm, showProgressBar = false }: GlobalHeaderProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showDevDropdown, setShowDevDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  // Check if we're in development mode
  const isDev = import.meta.env.MODE === 'development';

  // Get progress bar gradient based on current page
  const getProgressBarGradient = () => {
    const path = location.pathname;
    if (path.includes('/fractional-cmo-guide')) return 'from-blue-500 to-purple-600';
    if (path.includes('/marketing-psychology')) return 'from-orange-500 to-orange-600';
    if (path.includes('/growth-plateau-solutions')) return 'from-red-500 to-red-600';
    if (path.includes('/about')) return 'from-blue-500 to-indigo-600';
    if (path.includes('/contact')) return 'from-green-500 to-green-600';
    if (path.includes('/privacy') || path.includes('/terms')) return 'from-slate-500 to-slate-600';
    return 'from-orange-500 to-orange-600'; // default
  };

  // Enhanced scroll handler with direction detection and throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Update scroll direction for mobile navbar hiding
          setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < 100);
          setLastScrollY(currentScrollY);
          setScrollY(currentScrollY);
          
          // Reading progress calculation when enabled
          if (showProgressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (currentScrollY / docHeight) * 100;
            setReadingProgress(Math.min(100, Math.max(0, progress)));
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showProgressBar, lastScrollY]);
  
  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDevDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };
    
    if (showDevDropdown || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDevDropdown, showMobileMenu]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowDevDropdown(false);
        setShowMobileMenu(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [showMobileMenu]);


  const handleMenuItemClick = useCallback(() => {
    setShowDevDropdown(false);
    setShowMobileMenu(false);
    // Delay scroll to top until after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  // Main navigation items for both desktop and mobile
  const navigationItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: '👥' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ];

  // const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  //   e.preventDefault();
  //   
  //   // If we're on the home page, just scroll to the section
  //   if (window.location.pathname === '/' || window.location.pathname === '/reboot/') {
  //     const element = document.getElementById(sectionId);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   } else {
  //     // Navigate to home page first, then scroll
  //     navigate('/');
  //     setTimeout(() => {
  //       const element = document.getElementById(sectionId);
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth' });
  //       }
  //     }, 100);
  //   }
  // };

  return (
    <>
      {/* Skip Navigation Links - WCAG 2.4.1 Level A requirement */}
      <div className="sr-only">
        <a 
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        <a 
          href="#navigation-menu"
          className="skip-link"
        >
          Skip to navigation
        </a>
      </div>

      {/* Screen Reader Announcements for Dynamic Content */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only loading-announcement"
        id="page-status-announcer"
      >
        <span className="sr-only">Page loaded successfully</span>
      </div>

      {/* Main Navigation Header */}
      <nav 
        id="navigation-menu"
        className={`fixed top-0 left-0 right-0 z-[60] motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-500 motion-reduce:duration-0 ease-out ${
          !isScrollingUp && scrollY > 100 ? '-translate-y-full' : 'translate-y-0'
        }`}
        role="banner"
        aria-label="Main navigation and site header"
        style={{ pointerEvents: 'auto' }}
      >
        <div className={`motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${
          scrollY > 50 
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-xl border-b border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-white/90 backdrop-blur-sm border-b border-white/30'
        }`} style={{
          // Browser-specific backdrop normalization
          backdropFilter: scrollY > 50 ? 'blur(8px) saturate(180%)' : 'blur(6px) saturate(150%)',
          WebkitBackdropFilter: scrollY > 50 ? 'blur(8px) saturate(180%)' : 'blur(6px) saturate(150%)',
          // Explicit background fallback for Safari
          backgroundColor: scrollY > 50 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.90)'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-18">
              
              {/* Left Side: Logo and Dev Navigation */}
              <div className="flex items-center gap-6">
                <a 
                  href="/"
                  className="group flex items-center text-xl sm:text-2xl font-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg p-1"
                  aria-label="Reboot Media - Go to homepage"
                >
                  <span className={`motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 group-hover:scale-105 group-motion-safe:focus-visible:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none ${
                    scrollY > 50 
                      ? 'replace-text-gray-900 dark:text-white' 
                      : 'replace-text-gray-800 dark:text-white'
                  }`}>
                    REBOOT <span className="text-orange-500">MEDIA</span>
                  </span>
                </a>
                
                {/* Development-only Navigation Dropdown */}
                {isDev && (
                  <div className="relative hidden sm:block" ref={dropdownRef}>
                    <button
                      onClick={() => setShowDevDropdown(!showDevDropdown)}
                      className="px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus-visible:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 motion-safe:transition-all motion-reduce:transition-none duration-200 font-medium flex items-center gap-2 shadow-md hover:shadow-lg focus-visible:shadow-lg"
                      title="Quick Navigation (Dev Only)"
                      aria-expanded={showDevDropdown}
                      aria-haspopup="true"
                    >
                      <span>Dev Nav</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${showDevDropdown ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showDevDropdown && (
                      <div 
                        className="absolute top-full left-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-h-[70vh] overflow-y-auto z-[80] backdrop-blur-md"
                        role="menu"
                        aria-labelledby="dev-nav-button"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <div className="p-3 dev-nav-links" style={{ pointerEvents: 'auto' }}>
                          <div className="text-xs font-bold text-purple-600 dark:text-purple-400 px-3 py-2 border-b border-gray-100 dark:border-gray-700 mb-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-lg">
                            DEVELOPMENT NAVIGATION
                          </div>
                          
                          {/* Main Pages */}
                          <div className="mb-3">
                            <div className="text-xs font-semibold replace-text-gray-500 dark:replace-text-gray-400 px-3 py-1">MAIN</div>
                            <a 
                              href="/" 
                              onClick={handleMenuItemClick} 
                              className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-lg motion-safe:transition-all motion-reduce:transition-none duration-200 hover:translate-x-1 focus-visible:translate-x-1"
                              role="menuitem"
                            >
                              🏠 Home
                            </a>
                            <a 
                              href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/about`} 
                              onClick={handleMenuItemClick} 
                              className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-lg motion-safe:transition-all motion-reduce:transition-none duration-200 hover:translate-x-1 focus-visible:translate-x-1"
                              role="menuitem"
                            >
                              👥 About
                            </a>
                            <a 
                              href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/contact`} 
                              onClick={handleMenuItemClick} 
                              className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-lg motion-safe:transition-all motion-reduce:transition-none duration-200 hover:translate-x-1 focus-visible:translate-x-1"
                              role="menuitem"
                            >
                              📧 Contact
                            </a>
                          </div>
                          
                          {/* Marketing Psychology Pages */}
                          <div className="mb-3">
                            <div className="text-xs font-semibold replace-text-gray-500 dark:replace-text-gray-400 px-3 py-1">MARKETING PSYCHOLOGY</div>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors">🧠 Marketing Psychology</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/unaware-stage-customers`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Unaware Stage</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/problem-aware-stage-customers`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Problem-Aware Stage</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/solution-aware-stage-customers`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Solution-Aware Stage</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/product-aware-stage-customers`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Product-Aware Stage</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology/most-aware-stage-customers`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Most-Aware Stage</a>
                          </div>
                          
                          {/* Growth Plateau Pages */}
                          <div className="mb-3">
                            <div className="text-xs font-semibold replace-text-gray-500 dark:replace-text-gray-400 px-3 py-1">GROWTH PLATEAU</div>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors">📈 Growth Plateau Solutions</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/product-market-fit-erosion`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Product-Market Fit Erosion</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/customer-acquisition-stall`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Customer Acquisition Stall</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/competitive-pressure-plateau`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Competitive Pressure</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/revenue-ceiling-breakthrough`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Revenue Ceiling</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/operational-scaling-crisis`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Operational Scaling</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/team-growth-bottlenecks`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Team Growth Bottlenecks</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions/market-expansion-barriers`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Market Expansion</a>
                          </div>
                          
                          {/* Fractional CMO Pages */}
                          <div className="mb-3">
                            <div className="text-xs font-semibold replace-text-gray-500 dark:replace-text-gray-400 px-3 py-1">FRACTIONAL CMO</div>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors">💼 Fractional CMO Guide</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-marketing-agency`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ vs Agency</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-full-time-cmo`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ vs Full-Time CMO</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-consultant`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ vs Consultant</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/vs-in-house-team`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ vs In-House Team</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/when-to-choose-each`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ When to Choose Each</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/cost-roi-analysis`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Cost & ROI Analysis</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide/transition-strategies`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors ml-4">→ Transition Strategies</a>
                          </div>
                          
                          {/* Legal Pages */}
                          <div>
                            <div className="text-xs font-semibold replace-text-gray-500 dark:replace-text-gray-400 px-3 py-1">LEGAL</div>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/privacy`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors">🔒 Privacy Policy</a>
                            <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/terms`} onClick={() => setShowDevDropdown(false)} className="block px-3 py-2 text-sm replace-text-gray-700 dark:replace-text-gray-300 hover:bg-purple-50 focus-visible:bg-purple-50 dark:hover:bg-purple-900 focus-visible:bg-purple-900/20 rounded-md transition-colors">📜 Terms of Service</a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Side: Desktop Navigation & Mobile Menu Toggle */}
              <div className="flex items-center gap-4">
                
                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-6" style={{ pointerEvents: 'auto' }}>
                  {navigationItems.map((item) => (
                    <a
                      key={item.path}
                      href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}${item.path}`}
                      className={`relative px-3 py-2 text-sm font-medium motion-safe:transition-all motion-reduce:transition-none duration-200 rounded-lg hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-800 focus-visible:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        location.pathname === item.path
                          ? 'text-orange-accessible dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                          : 'replace-text-gray-700 dark:replace-text-gray-300 hover:replace-text-gray-900 focus-visible:replace-text-gray-900 dark:hover:text-white focus-visible:text-white'
                      }`}
                      style={{ 
                        pointerEvents: 'auto',
                        zIndex: 70,
                        position: 'relative'
                      }}
                    >
                      <span className="hidden xl:inline">{item.icon} </span>
                      {item.label}
                      {location.pathname === item.path && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></div>
                      )}
                    </a>
                  ))}
                </div>

                {/* CTA Button - Hidden on Mobile */}
                <button 
                  onClick={onShowForm}
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-6 py-2.5 rounded-full font-semibold motion-safe:transition-all motion-reduce:transition-none duration-200 shadow-lg hover:shadow-xl focus-visible:shadow-xl motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  aria-label="Open growth analysis form"
                  style={{ 
                    pointerEvents: 'auto',
                    zIndex: 65,
                    position: 'relative'
                  }}
                >
                  <span className="text-sm">🚀</span>
                  <span>Unlock Growth Now</span>
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden p-2 rounded-lg replace-text-gray-600 dark:replace-text-gray-400 hover:replace-text-gray-900 focus-visible:replace-text-gray-900 dark:hover:text-white focus-visible:text-white hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-800 focus-visible:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 motion-safe:transition-all motion-reduce:transition-none duration-200"
                  aria-expanded={showMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  <div className="relative w-6 h-6">
                    <span className={`absolute block w-6 h-0.5 bg-current transform motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${
                      showMobileMenu ? 'rotate-45 translate-y-0' : '-translate-y-2'
                    }`}></span>
                    <span className={`absolute block w-6 h-0.5 bg-current transform motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${
                      showMobileMenu ? 'opacity-0' : 'opacity-100'
                    }`}></span>
                    <span className={`absolute block w-6 h-0.5 bg-current transform motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${
                      showMobileMenu ? '-rotate-45 translate-y-0' : 'translate-y-2'
                    }`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Reading Progress Bar */}
          {showProgressBar && (
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-800">
              <div 
                className={`h-full bg-gradient-to-r ${getProgressBarGradient()} motion-safe:transition-all motion-reduce:transition-none duration-150 ease-out`}
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay - Single consistent backdrop */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          aria-hidden="true"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}

      {/* Mobile Menu Slide-out */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 z-[70] h-full w-80 max-w-[90vw] bg-white dark:bg-slate-900 shadow-2xl transform transition-transform motion-safe:duration-300 motion-reduce:duration-0 ease-out lg:hidden ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold replace-text-gray-900 dark:text-white">Navigation</h2>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="p-2 rounded-lg replace-text-gray-500 hover:replace-text-gray-700 focus-visible:replace-text-gray-700 dark:replace-text-gray-400 dark:hover:replace-text-gray-200 focus-visible:replace-text-gray-200 hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-800 focus-visible:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Close mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-6 space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.path}
                  href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}${item.path}`}
                  onClick={handleMenuItemClick}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl motion-safe:transition-all motion-reduce:transition-none duration-200 ${
                    location.pathname === item.path
                      ? 'text-orange-accessible dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500'
                      : 'replace-text-gray-700 dark:replace-text-gray-300 hover:replace-text-gray-900 focus-visible:replace-text-gray-900 dark:hover:text-white focus-visible:text-white hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-gray-800 focus-visible:bg-gray-800'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                  {location.pathname === item.path && (
                    <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
                </a>
              ))}
            </nav>

            {/* Mobile Dev Navigation */}
            {isDev && (
              <div className="mt-8 px-6">
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    DEVELOPMENT SHORTCUTS
                  </div>
                  <div className="space-y-1 dev-nav-links">
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} onClick={handleMenuItemClick} className="block px-3 py-2 text-sm replace-text-gray-600 dark:replace-text-gray-400 hover:replace-text-gray-900 focus-visible:replace-text-gray-900 dark:hover:text-white focus-visible:text-white hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-gray-800 focus-visible:bg-gray-800 rounded-lg transition-colors">🧠 Marketing Psychology</a>
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} onClick={handleMenuItemClick} className="block px-3 py-2 text-sm replace-text-gray-600 dark:replace-text-gray-400 hover:replace-text-gray-900 focus-visible:replace-text-gray-900 dark:hover:text-white focus-visible:text-white hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-gray-800 focus-visible:bg-gray-800 rounded-lg transition-colors">📈 Growth Plateau</a>
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} onClick={handleMenuItemClick} className="block px-3 py-2 text-sm replace-text-gray-600 dark:replace-text-gray-400 hover:replace-text-gray-900 focus-visible:replace-text-gray-900 dark:hover:text-white focus-visible:text-white hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-gray-800 focus-visible:bg-gray-800 rounded-lg transition-colors">💼 Fractional CMO</a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Footer with CTA */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <button
              onClick={() => {
                onShowForm?.();
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-6 py-4 rounded-xl font-bold text-base motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 shadow-lg hover:shadow-xl focus-visible:shadow-xl motion-safe:transform motion-safe:hover:scale-105 motion-reduce:transform-none motion-safe:focus-visible:scale-105 motion-reduce:transform-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <span className="text-lg">🚀</span>
              <span>Unlock Growth Now</span>
            </button>
            <p className="text-xs text-center replace-text-gray-500 dark:replace-text-gray-400 mt-3">
              Free marketing analysis • No commitment
            </p>
          </div>
        </div>
      </div>

      {/* Simplified Mobile Bottom CTA (when menu closed) */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${
        showMobileMenu ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}>
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="px-4 py-3">
            <button aria-label="Opens contact form for free marketing analysis"
              onClick={onShowForm}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 focus-visible:from-orange-600 hover:to-orange-700 focus-visible:to-orange-700 text-white px-6 py-3 rounded-xl font-bold text-sm motion-safe:transition-all motion-reduce:transition-none duration-200 shadow-lg hover:shadow-xl focus-visible:shadow-xl transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              🚀 Unlock Growth Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalHeader;