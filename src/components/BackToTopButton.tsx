import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 sm:bottom-6 right-6 z-40 p-3 bg-orange-500/60 hover:bg-orange-600 focus-visible:bg-orange-600/80 text-white rounded-full shadow-md transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-60 hover:opacity-90 focus-visible:opacity-90' : 'translate-y-16 opacity-0'
      }`}
      style={{ 
        visibility: isVisible ? 'visible' : 'hidden'
      }}
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTopButton;