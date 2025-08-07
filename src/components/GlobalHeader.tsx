import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface GlobalHeaderProps {
  onShowForm?: () => void;
  showProgressBar?: boolean;
}

const GlobalHeader = ({ onShowForm, showProgressBar = false }: GlobalHeaderProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // If we're on the home page, just scroll to the section
    if (window.location.pathname === '/' || window.location.pathname === '/reboot/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

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
              {/* Logo */}
              <Link 
                to="/" 
                onClick={scrollToTop}
                className="text-xl sm:text-2xl font-black cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <span className="text-gray-900 dark:text-white">
                  REBOOT <span className="text-orange-500">MEDIA</span>
                </span>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a 
                  href="#services" 
                  onClick={(e) => handleHashNavigation(e, 'services')}
                  className="font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                >
                  Services
                </a>
                <a 
                  href="#about" 
                  onClick={(e) => handleHashNavigation(e, 'about')}
                  className="font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors duration-300 cursor-pointer"
                >
                  About
                </a>
                <Link 
                  to="/contact" 
                  onClick={scrollToTop}
                  className="font-semibold text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors duration-300"
                >
                  Contact
                </Link>
                <button 
                  onClick={onShowForm}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started
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
          <div className="flex justify-around items-center" style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.25rem, 1vw, 0.5rem)' }}>
            <a 
              href="#services" 
              onClick={(e) => handleHashNavigation(e, 'services')}
              className="flex flex-col items-center py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-all duration-200 cursor-pointer group"
              style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)' }}
            >
              <svg className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="font-semibold">Services</span>
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleHashNavigation(e, 'about')}
              className="flex flex-col items-center py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-all duration-200 cursor-pointer group"
              style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)' }}
            >
              <svg className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-semibold">About</span>
            </a>
            <Link 
              to="/contact" 
              onClick={scrollToTop}
              className="flex flex-col items-center py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-all duration-200 group"
              style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)' }}
            >
              <svg className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="font-semibold">Contact</span>
            </Link>
            <button 
              onClick={onShowForm}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              style={{ 
                padding: 'clamp(0.625rem, 2.5vw, 0.75rem) clamp(1rem, 3vw, 1.25rem)',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default GlobalHeader;