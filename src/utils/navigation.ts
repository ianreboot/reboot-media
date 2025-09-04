import { useNavigate } from 'react-router-dom';

// Get the base path from environment
export const getBasePath = () => {
  return import.meta.env.MODE === 'development' ? '/reboot' : '';
};

// Navigate to a hash on the home page
export const navigateToHash = (hash: string) => {
  const basePath = getBasePath();
  
  // If we're already on the home page, just scroll to the section
  if (window.location.pathname === '/' || window.location.pathname === basePath + '/') {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // Navigate to home page with hash
    window.location.href = `${basePath}/${hash}`;
  }
};

// Custom hook for hash navigation
export const useHashNavigation = () => {
  const navigate = useNavigate();
  
  const navigateToSection = (sectionId: string) => {
    // First navigate to home
    navigate('/');
    
    // Then scroll to section after a brief delay
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return { navigateToSection };
};