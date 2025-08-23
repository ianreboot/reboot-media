// AI: Infinite Light Source System - DOM elements as boundless light sources
// Eliminates hard edges through oversized containers with transform-based movement

interface BackgroundGradientProps {
  className?: string;
}

export function BackgroundGradient({ className = '' }: BackgroundGradientProps) {
  return (
    <>
      {/* Base dark background - ensures consistent backdrop */}
      <div 
        className={`fixed inset-0 w-full h-full ${className}`}
        style={{
          background: '#0f172a', // solid dark base
          zIndex: -10
        }}
      />
      
      {/* Gold flare - oversized to eliminate container edges */}
      <div 
        className={`light-source-gold transparency-normalized ${className}`}
        style={{
          position: 'fixed',
          width: '200vw',
          height: '200vw',
          top: '-50vh',
          left: '-50vw',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(216, 201, 155, 0.7) 0%, 
            rgba(216, 201, 155, 0.4) 15%, 
            rgba(216, 201, 155, 0.2) 25%, 
            rgba(216, 201, 155, 0.1) 35%, 
            rgba(216, 201, 155, 0.05) 45%, 
            transparent 55%)`,
          zIndex: -9
        }}
      />
      
      {/* Light Teal flare - oversized to eliminate container edges */}
      <div 
        className={`light-source-blue transparency-normalized ${className}`}
        style={{
          position: 'fixed',
          width: '180vw',
          height: '180vw',
          top: '-60vh',
          right: '-60vw',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(94, 234, 212, 0.5) 0%, 
            rgba(94, 234, 212, 0.25) 15%, 
            rgba(94, 234, 212, 0.12) 25%, 
            rgba(94, 234, 212, 0.06) 35%, 
            rgba(94, 234, 212, 0.03) 45%, 
            transparent 55%)`,
          zIndex: -8
        }}
      />
    </>
  );
}

export default BackgroundGradient;