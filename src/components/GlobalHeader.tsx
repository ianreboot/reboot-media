import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface GlobalHeaderProps {
  onShowForm?: () => void;
}

const GlobalHeader = ({ onShowForm }: GlobalHeaderProps) => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block">
        <div className={`transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-white/75 dark:bg-slate-900/75 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
            : 'bg-white/80 backdrop-blur-md border-b border-white/20'
        }`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <Link 
                to="/" 
                onClick={scrollToTop}
                className="text-2xl font-black cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <span className="text-gray-900 dark:text-white">
                  REBOOT <span className="text-orange-500">MEDIA</span>
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-8">
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
        </div>
      </nav>

      {/* Mobile Navigation - Top Brand Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className={`transition-all duration-300 ${
          scrollY > 30 
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
            : 'bg-black/20 backdrop-blur-sm'
        }`}>
          <div className="px-4 py-3">
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="text-xl font-black cursor-pointer"
            >
              <span className={`transition-colors duration-300 ${
                scrollY > 30 ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}>
                REBOOT <span className="text-orange-500">MEDIA</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Sticky Ribbon (Bottom) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden transform-gpu">
        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-lg border-t border-white/20 dark:border-gray-700 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          <div className="flex justify-around items-center" style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.25rem, 1vw, 0.5rem)' }}>
            <a 
              href="#services" 
              onClick={(e) => handleHashNavigation(e, 'services')}
              className="flex flex-col items-center py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-all duration-200 cursor-pointer group"
              style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)' }}
            >
              <div className="w-8 h-8 mb-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center group-hover:from-orange-100 group-hover:to-orange-200 dark:group-hover:from-orange-900 dark:group-hover:to-orange-800 transition-all duration-200 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium">Services</span>
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleHashNavigation(e, 'about')}
              className="flex flex-col items-center py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-all duration-200 cursor-pointer group"
              style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)' }}
            >
              <div className="w-8 h-8 mb-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center group-hover:from-orange-100 group-hover:to-orange-200 dark:group-hover:from-orange-900 dark:group-hover:to-orange-800 transition-all duration-200 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium">About</span>
            </a>
            <Link 
              to="/contact" 
              onClick={scrollToTop}
              className="flex flex-col items-center py-1 px-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-all duration-200 group"
              style={{ fontSize: 'clamp(0.625rem, 2.5vw, 0.75rem)' }}
            >
              <div className="w-8 h-8 mb-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center group-hover:from-orange-100 group-hover:to-orange-200 dark:group-hover:from-orange-900 dark:group-hover:to-orange-800 transition-all duration-200 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium">Contact</span>
            </Link>
            <button 
              onClick={onShowForm}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              style={{ 
                padding: 'clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 3vw, 1.25rem)',
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