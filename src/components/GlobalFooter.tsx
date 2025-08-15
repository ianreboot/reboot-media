import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToTopButton from './BackToTopButton';

interface GlobalFooterProps {
  onShowForm?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GlobalFooter = (_props: GlobalFooterProps) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  
  
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
      
      <div className="relative z-10" style={{ pointerEvents: 'auto' }}>
        {/* Modern Desktop Footer */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-8" style={{ paddingTop: 'clamp(3rem, 5vw, 5rem)', paddingBottom: 'clamp(2rem, 3vw, 3rem)' }}>
            
            {/* Top Section - Brand Statement + Global HQ */}
            <div className="grid grid-cols-12 gap-8 mb-12">
              {/* Brand Statement - Left */}
              <div className="col-span-8">
                <a 
                  href="/" 
                  className="inline-block mb-6 hover:scale-105 motion-safe:focus-visible:scale-105 motion-reduce:transform-none transition-transform motion-safe:duration-300 motion-reduce:duration-0"
                >
                  <h3 className="text-5xl font-black">
                    REBOOT <span className="text-orange-500">MEDIA</span>
                  </h3>
                </a>
                
                <div className="max-w-2xl">
                  <p className="text-2xl font-light replace-text-gray-300 leading-relaxed mb-4">
                    Fortune 500 marketing expertise without the corporate price tag.
                  </p>
                  <p className="text-base replace-text-gray-400 leading-relaxed">
                    We transform ambitious companies with proven C-level strategies that actually work. 
                    No fluff, no theory – just battle-tested approaches from managing $2B+ in revenue.
                  </p>
                </div>
              </div>
              
              {/* Global Headquarters - Right */}
              <div className="col-span-4">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-medium replace-text-gray-400 mb-4">Global Headquarters</h4>
                    <p className="text-xs replace-text-gray-300 leading-relaxed">
                      17595 Harvard Ave C-738<br />
                      Irvine, California 92614<br />
                      United States of America
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs replace-text-gray-400 uppercase tracking-wider mb-2">Operating Globally</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full motion-safe:animate-pulse motion-reduce:animate-none"></div>
                      <span className="text-xs replace-text-gray-300">USA • Bangkok • Singapore</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Navigation - Company (25%) | Legal (25%) | Resources (50%) */}
            <div className="grid grid-cols-4 gap-8 pt-8 border-t border-white/10">
              {/* Company - 1 column */}
              <div className="col-span-1">
                <h4 className="text-sm font-medium replace-text-gray-400 mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/about`} 
                          className="text-sm replace-text-gray-300 hover:text-white focus-visible:text-white transition-colors"
                          style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} 
                       className="text-sm replace-text-gray-300 hover:text-white focus-visible:text-white transition-colors cursor-pointer"
                       style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                      Services
                    </a>
                  </li>
                  <li>
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/contact`} 
                          className="text-sm replace-text-gray-300 hover:text-white focus-visible:text-white transition-colors"
                          style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Legal - 1 column */}
              <div className="col-span-1">
                <h4 className="text-sm font-medium replace-text-gray-400 mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/privacy`} 
                          className="text-sm replace-text-gray-300 hover:text-white focus-visible:text-white transition-colors"
                          style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/terms`} 
                          className="text-sm replace-text-gray-300 hover:text-white focus-visible:text-white transition-colors"
                          style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Resources - 2 columns (50%) */}
              <div className="col-span-2">
                <h4 className="text-sm font-medium replace-text-gray-400 mb-4">Resources & Insights</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <div>
                    <ul className="space-y-2">
                      <li>
                        <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} 
                              className="text-sm replace-text-gray-300 hover:text-white focus-visible:text-white transition-colors"
                              style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                          Marketing Psychology Guide
                        </a>
                      </li>
                      <li>
                        <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} 
                              className="text-sm replace-text-gray-300 hover:text-white focus-visible:text-white transition-colors"
                              style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                          Breaking Growth Plateaus
                        </a>
                      </li>
                      <li>
                        <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} 
                              className="text-sm replace-text-gray-300 hover:text-white focus-visible:text-white transition-colors"
                              style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                          Fractional CMO vs Agency
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    {/* Space for future resources */}
                    <ul className="space-y-2">
                      {/* Future resource links will go here */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Mobile Footer - Keep existing accordion structure */}
        <div className="lg:hidden">
          <div className="px-6 py-8">
            <div className="mb-6">
              <a 
                href="/" 
                className="inline-block cursor-pointer hover:scale-105 motion-safe:focus-visible:scale-105 motion-reduce:transform-none transition-transform motion-safe:duration-300 motion-reduce:duration-0"
                style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}
              >
                <h3 className="text-3xl font-black mb-3">
                  REBOOT <span className="text-orange-500">MEDIA</span>
                </h3>
              </a>
              <p className="replace-text-gray-400 text-sm leading-relaxed">
                Fractional CMO services with proven C-level executive experience driving transformational growth for ambitious companies.
              </p>
              <p className="replace-text-gray-500 text-xs mt-4">
                USA • Bangkok • Singapore • Global
              </p>
            </div>
            
            {/* Mobile Accordion Navigation */}
            <div className="space-y-2">
              
              {/* Services Accordion */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('services')}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white focus-visible:bg-white/10 transition-colors"
                >
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider">Fractional CMO Services</h4>
                  <svg 
                    className={`w-5 h-5 replace-text-gray-400 transition-transform motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['services'] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div className={`motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['services'] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                  <ul className="px-4 py-3 space-y-2 bg-white/5">
                    <li>
                      <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        Quick-Win Strategy
                      </a>
                    </li>
                    <li>
                      <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        Growth Strategy
                      </a>
                    </li>
                    <li>
                      <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
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
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white focus-visible:bg-white/10 transition-colors"
                >
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider">Proven Track Record</h4>
                  <svg 
                    className={`w-5 h-5 replace-text-gray-400 transition-transform motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['track'] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div className={`motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['track'] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                  <ul className="px-4 py-3 space-y-2 bg-white/5">
                    <li className="replace-text-gray-400 text-sm flex items-start">
                      <span className="text-orange-500 mr-2">20+</span>
                      Fortune 500 Companies
                    </li>
                    <li className="replace-text-gray-400 text-sm flex items-start">
                      <span className="text-orange-500 mr-2">$2B+</span>
                      Revenue Under Management
                    </li>
                    <li className="replace-text-gray-400 text-sm flex items-start">
                      <span className="text-orange-500 mr-2">3X</span>
                      Average Revenue Growth
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Resources Accordion */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('resources')}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white focus-visible:bg-white/10 transition-colors"
                >
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider">Resources & Insights</h4>
                  <svg 
                    className={`w-5 h-5 replace-text-gray-400 transition-transform motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['resources'] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div className={`motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['resources'] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                  <ul className="px-4 py-3 space-y-2 bg-white/5">
                    <li>
                      <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/marketing-psychology`} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        Marketing Psychology Guide
                      </a>
                    </li>
                    <li>
                      <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/growth-plateau-solutions`} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        Break Growth Plateaus
                      </a>
                    </li>
                    <li>
                      <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/fractional-cmo-guide`} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        Fractional CMO vs Agency
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Company Accordion */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('company')}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white focus-visible:bg-white/10 transition-colors"
                >
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider">Company</h4>
                  <svg 
                    className={`w-5 h-5 replace-text-gray-400 transition-transform motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['company'] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div className={`motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['company'] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                  <ul className="px-4 py-3 space-y-2 bg-white/5">
                    <li>
                      <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/about`} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#services" onClick={(e) => handleHashNavigation(e, 'services')} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        Services
                      </a>
                    </li>
                    <li>
                      <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/contact`} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Legal Accordion */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('legal')}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm flex items-center justify-between hover:bg-white focus-visible:bg-white/10 transition-colors"
                >
                  <h4 className="font-bold text-white text-sm uppercase tracking-wider">Legal</h4>
                  <svg 
                    className={`w-5 h-5 replace-text-gray-400 transition-transform motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['legal'] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div className={`motion-safe:transition-all motion-reduce:transition-none motion-safe:duration-300 motion-reduce:duration-0 ${expandedSections['legal'] ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                  <ul className="px-4 py-3 space-y-2 bg-white/5">
                    <li>
                      <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/privacy`} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href={`${import.meta.env.MODE === 'development' ? '/reboot' : ''}/terms`} className="replace-text-gray-400 hover:text-orange-400 focus-visible:text-orange-400 transition-colors text-sm" style={{ pointerEvents: 'auto', zIndex: 50, position: 'relative' }}>
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 backdrop-blur-sm mt-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <div className="replace-text-gray-500 text-xs">
                © 2025 Reboot Media, Inc. All rights reserved.
              </div>
              <div className="flex items-center space-x-4 replace-text-gray-500 text-xs">
                <span>A Global Marketing Leadership Company</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </footer>
  );
};

export default GlobalFooter;