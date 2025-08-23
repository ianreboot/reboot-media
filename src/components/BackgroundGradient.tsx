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
          top: '-75vh',
          left: '-75vw',
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
      
      {/* Light Teal flare - second largest */}
      <div 
        className={`light-source-teal transparency-normalized ${className}`}
        style={{
          position: 'fixed',
          width: '160vw',
          height: '160vw',
          top: '-75vh',
          right: '-75vw',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(94, 234, 212, 0.25) 0%, 
            rgba(94, 234, 212, 0.12) 10%, 
            rgba(94, 234, 212, 0.06) 18%, 
            rgba(94, 234, 212, 0.03) 25%, 
            rgba(94, 234, 212, 0.015) 30%, 
            transparent 35%)`,
          zIndex: -8
        }}
      />

      {/* Light Purple flare - medium size */}
      <div 
        className={`light-source-purple transparency-normalized ${className}`}
        style={{
          position: 'fixed',
          width: '140vw',
          height: '140vw',
          top: '-80vh',
          left: '-80vw',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(196, 181, 253, 0.3) 0%, 
            rgba(196, 181, 253, 0.15) 12%, 
            rgba(196, 181, 253, 0.08) 20%, 
            rgba(196, 181, 253, 0.04) 28%, 
            rgba(196, 181, 253, 0.02) 35%, 
            transparent 40%)`,
          zIndex: -7
        }}
      />

      {/* Light Orange flare - smallest */}
      <div 
        className={`light-source-orange transparency-normalized ${className}`}
        style={{
          position: 'fixed',
          width: '120vw',
          height: '120vw',
          top: '-85vh',
          right: '-85vw',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(254, 215, 170, 0.28) 0%, 
            rgba(254, 215, 170, 0.14) 10%, 
            rgba(254, 215, 170, 0.07) 18%, 
            rgba(254, 215, 170, 0.035) 26%, 
            rgba(254, 215, 170, 0.018) 32%, 
            transparent 38%)`,
          zIndex: -6
        }}
      />
    </>
  );
}

export default BackgroundGradient;