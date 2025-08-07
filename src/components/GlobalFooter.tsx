import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface GlobalFooterProps {
  onShowForm?: () => void;
}

const GlobalFooter = ({ onShowForm }: GlobalFooterProps) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // Navigate to home page first if not already there
    if (window.location.pathname !== '/' && window.location.pathname !== '/reboot/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }}></div>
      </div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ paddingTop: 'clamp(2rem, 5vw, 3rem)', paddingBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Link 
                  to="/" 
                  onClick={scrollToTop}
                  className="inline-block cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-3xl font-black mb-3">
                    REBOOT <span className="text-orange-500">MEDIA</span>
                  </h3>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Fractional CMO services with proven C-level executive experience driving transformational growth for ambitious companies.
                </p>
              </div>
              
              {/* Social Links - Hidden on mobile */}
              <div className="hidden md:flex space-x-4">
                <a href="https://www.linkedin.com/in/ian-ho/" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-orange-500/20 transition-all duration-300 group"
                   aria-label="Follow us on LinkedIn">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links - Desktop normal, Mobile accordions */}
            <div className="lg:col-span-3">
              {/* Desktop View - Only show on large screens */}
              <div className="hidden lg:grid lg:grid-cols-4 gap-6">
                
                {/* Services */}
                <div>
                  <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Fractional CMO Services</h4>
                  <ul className="space-y-1.5">
                    <li>
                      <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Quick-Win Strategy
                      </a>
                    </li>
                    <li>
                      <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Growth Strategy
                      </a>
                    </li>
                    <li>
                      <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Executive Leadership
                      </a>
                    </li>
                  </ul>
                </div>
                
                {/* Resources */}
                <div>
                  <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Resources & Insights</h4>
                  <ul className="space-y-1.5">
                    <li>
                      <Link to="/marketing-psychology" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Marketing Psychology Guide
                      </Link>
                    </li>
                    <li>
                      <Link to="/growth-plateau-solutions" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Break Growth Plateaus
                      </Link>
                    </li>
                    <li>
                      <Link to="/fractional-cmo-guide" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Fractional CMO vs Agency
                      </Link>
                    </li>
                  </ul>
                </div>
                
                {/* Company */}
                <div>
                  <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Company Information</h4>
                  <ul className="space-y-1.5">
                    <li>
                      <Link to="/about" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        About Our Leadership
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Schedule Consultation
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm inline-flex items-center group">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Service Terms
                      </Link>
                    </li>
                  </ul>
                </div>
                
                {/* Contact */}
                <div>
                  <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Start Your Growth</h4>
                  <div className="space-y-4">
                    {onShowForm ? (
                      <button 
                        onClick={onShowForm}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Get Free Strategy Analysis
                      </button>
                    ) : (
                      <Link 
                        to="/contact" 
                        onClick={scrollToTop}
                        className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                      >
                        Get Free Strategy Analysis
                      </Link>
                    )}
                    <p className="text-gray-500 text-xs">
                      USA • Bangkok • Singapore • Global
                    </p>
                  </div>
                </div>
                
              </div>
              
              {/* Mobile/Tablet Accordion View - Show on medium and below */}
              <div className="lg:hidden space-y-2">
                
                {/* Services Accordion */}
                <div className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('services')}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">Fractional CMO Services</h4>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSections['services'] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <div className={`transition-all duration-300 ${expandedSections['services'] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                    <ul className="px-4 py-3 space-y-2 bg-white/5">
                      <li>
                        <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                          Quick-Win Strategy
                        </a>
                      </li>
                      <li>
                        <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                          Growth Strategy
                        </a>
                      </li>
                      <li>
                        <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                          Executive Leadership
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Track Record Accordion */}
                <div className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('track')}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">Proven Track Record</h4>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSections['track'] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <div className={`transition-all duration-300 ${expandedSections['track'] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                    <ul className="px-4 py-3 space-y-2 bg-white/5">
                      <li className="text-gray-400 text-sm flex items-start">
                        <span className="text-orange-500 mr-2">20+</span>
                        Fortune 500 Companies
                      </li>
                      <li className="text-gray-400 text-sm flex items-start">
                        <span className="text-orange-500 mr-2">$2B+</span>
                        Revenue Under Management
                      </li>
                      <li className="text-gray-400 text-sm flex items-start">
                        <span className="text-orange-500 mr-2">3X</span>
                        Average Revenue Growth
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Company Accordion */}
                <div className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('company')}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">Company Information</h4>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSections['company'] ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <div className={`transition-all duration-300 ${expandedSections['company'] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                    <ul className="px-4 py-3 space-y-2 bg-white/5">
                      <li>
                        <Link to="/about" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                          About Our Leadership
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                          Schedule Consultation
                        </Link>
                      </li>
                      <li>
                        <Link to="/privacy" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link to="/terms" onClick={scrollToTop} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                          Service Terms
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-500 text-sm">
                © 2025 Reboot Media, Inc. All rights reserved.
              </div>
              <div className="flex space-x-6 text-gray-500 text-sm">
                <span className="text-xs md:text-sm">17595 Harvard Ave C-738, Irvine CA 92614</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;