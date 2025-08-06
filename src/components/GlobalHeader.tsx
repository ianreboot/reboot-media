import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GlobalHeader = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block">
        <div className={`transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
            : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <Link 
                to="/" 
                onClick={scrollToTop}
                className="text-2xl font-black cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <span className={`transition-colors duration-300 ${
                  scrollY > 50 ? 'text-gray-900 dark:text-white' : 'text-white'
                }`}>
                  REBOOT<span className="text-orange-500">.</span>
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-8">
                <a 
                  href="/#services" 
                  className={`font-semibold hover:text-orange-500 transition-colors duration-300 ${
                    scrollY > 50 ? 'text-gray-700 dark:text-gray-200' : 'text-white'
                  }`}
                >
                  Services
                </a>
                <a 
                  href="/#about" 
                  className={`font-semibold hover:text-orange-500 transition-colors duration-300 ${
                    scrollY > 50 ? 'text-gray-700 dark:text-gray-200' : 'text-white'
                  }`}
                >
                  About
                </a>
                <Link 
                  to="/contact" 
                  onClick={scrollToTop}
                  className={`font-semibold hover:text-orange-500 transition-colors duration-300 ${
                    scrollY > 50 ? 'text-gray-700 dark:text-gray-200' : 'text-white'
                  }`}
                >
                  Contact
                </Link>
                <a 
                  href="/#contact"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started
                </a>
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
                REBOOT<span className="text-orange-500">.</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Sticky Bottom */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-2 py-2">
          <div className="flex justify-around items-center">
            <a 
              href="/#services" 
              className="flex flex-col items-center py-2 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
            >
              <div className="w-6 h-6 mb-1 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-xs">S</span>
              </div>
              Services
            </a>
            <a 
              href="/#about" 
              className="flex flex-col items-center py-2 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
            >
              <div className="w-6 h-6 mb-1 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-xs">A</span>
              </div>
              About
            </a>
            <Link 
              to="/contact" 
              onClick={scrollToTop}
              className="flex flex-col items-center py-2 px-3 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
            >
              <div className="w-6 h-6 mb-1 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-xs">C</span>
              </div>
              Contact
            </Link>
            <a 
              href="/#contact"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default GlobalHeader;