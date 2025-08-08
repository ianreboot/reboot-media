import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface GlobalHeaderProps {
  onShowForm?: () => void;
  showProgressBar?: boolean;
}

const GlobalHeader = ({ onShowForm, showProgressBar = false }: GlobalHeaderProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showDevDropdown, setShowDevDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const navigate = useNavigate();
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Reading progress calculation when enabled
      if (showProgressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showProgressBar]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDevDropdown(false);
      }
    };
    
    if (showDevDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDevDropdown]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      {/* Unified Top Navigation - Desktop and Mobile */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className={`transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-white/75 dark:bg-slate-900/75 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
            : 'bg-white/80 backdrop-blur-md border-b border-white/20'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 sm:py-4">
              {/* Logo and Dev Navigation */}
              <div className="flex items-center gap-4">
                <Link 
                  to="/" 
                  onClick={scrollToTop}
                  className="text-xl sm:text-2xl font-black cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <span className="text-gray-900 dark:text-white">
                    REBOOT <span className="text-orange-500">MEDIA</span>
                  </span>
                </Link>
                
                {/* Development-only Navigation Dropdown */}
                {isDev && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowDevDropdown(!showDevDropdown)}
                      className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center gap-1"
                      title="Quick Navigation (Dev Only)"
                    >
                      <span>Dev Nav</span>
                      <svg className={`w-4 h-4 transition-transform ${showDevDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showDevDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[70vh] overflow-y-auto z-50">
                        <div className="p-2">
                          <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                            DEVELOPMENT NAVIGATION
                          </div>
                          
                          {/* Main Pages */}
                          <div className="mb-3">
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1">MAIN</div>
                            <Link to="/" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors">🏠 Home</Link>
                            <Link to="/about" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors">👥 About</Link>
                            <Link to="/contact" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors">📧 Contact</Link>
                          </div>
                          
                          {/* Marketing Psychology Pages */}
                          <div className="mb-3">
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1">MARKETING PSYCHOLOGY</div>
                            <Link to="/marketing-psychology" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors">🧠 Marketing Psychology</Link>
                            <Link to="/marketing-psychology/unaware-stage-customers" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Unaware Stage</Link>
                            <Link to="/marketing-psychology/problem-aware-stage-customers" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Problem-Aware Stage</Link>
                            <Link to="/marketing-psychology/solution-aware-stage-customers" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Solution-Aware Stage</Link>
                            <Link to="/marketing-psychology/product-aware-stage-customers" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Product-Aware Stage</Link>
                            <Link to="/marketing-psychology/most-aware-stage-customers" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Most-Aware Stage</Link>
                          </div>
                          
                          {/* Growth Plateau Pages */}
                          <div className="mb-3">
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1">GROWTH PLATEAU</div>
                            <Link to="/growth-plateau-solutions" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors">📈 Growth Plateau Solutions</Link>
                            <Link to="/growth-plateau-solutions/product-market-fit-erosion" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Product-Market Fit Erosion</Link>
                            <Link to="/growth-plateau-solutions/customer-acquisition-stall" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Customer Acquisition Stall</Link>
                            <Link to="/growth-plateau-solutions/competitive-pressure-plateau" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Competitive Pressure</Link>
                            <Link to="/growth-plateau-solutions/revenue-ceiling-breakthrough" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Revenue Ceiling</Link>
                            <Link to="/growth-plateau-solutions/operational-scaling-crisis" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Operational Scaling</Link>
                            <Link to="/growth-plateau-solutions/team-growth-bottlenecks" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Team Growth Bottlenecks</Link>
                            <Link to="/growth-plateau-solutions/market-expansion-barriers" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Market Expansion</Link>
                          </div>
                          
                          {/* Fractional CMO Pages */}
                          <div className="mb-3">
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1">FRACTIONAL CMO</div>
                            <Link to="/fractional-cmo-guide" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors">💼 Fractional CMO Guide</Link>
                            <Link to="/fractional-cmo-guide/vs-agency" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ vs Agency</Link>
                            <Link to="/fractional-cmo-guide/vs-full-time" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ vs Full-Time CMO</Link>
                            <Link to="/fractional-cmo-guide/vs-consultant" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ vs Consultant</Link>
                            <Link to="/fractional-cmo-guide/vs-in-house-team" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ vs In-House Team</Link>
                            <Link to="/fractional-cmo-guide/when-to-choose-each" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ When to Choose Each</Link>
                            <Link to="/fractional-cmo-guide/cost-roi-analysis" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Cost & ROI Analysis</Link>
                            <Link to="/fractional-cmo-guide/transition-strategies" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors ml-4">→ Transition Strategies</Link>
                          </div>
                          
                          {/* Legal Pages */}
                          <div>
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-1">LEGAL</div>
                            <Link to="/privacy" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors">🔒 Privacy Policy</Link>
                            <Link to="/terms" onClick={() => { setShowDevDropdown(false); scrollToTop(); }} className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors">📜 Terms of Service</Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={onShowForm}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Unlock Growth Now
                </button>
              </div>
            </div>
          </div>
          
          {/* Reading Progress Bar */}
          {showProgressBar && (
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-800">
              <div 
                className={`h-full bg-gradient-to-r ${getProgressBarGradient()} transition-all duration-150 ease-out`}
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation - Sticky Ribbon (Bottom) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden transform-gpu">
        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-lg border-t border-white/20 dark:border-gray-700 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          <div className="flex justify-end items-center pr-4" style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)' }}>
            <button 
              onClick={onShowForm}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              style={{ 
                padding: 'clamp(0.625rem, 2.5vw, 0.75rem) clamp(1rem, 3vw, 1.25rem)',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)'
              }}
            >
              Unlock Growth Now
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default GlobalHeader;