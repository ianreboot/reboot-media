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
      
      {/* Gold flare - smaller, more focused with extended transparency */}
      <div 
        className={`light-source-gold transparency-normalized ${className}`}
        style={{
          position: 'fixed',
          width: '80vw',
          height: '80vw',
          top: '10vh',
          left: '10vw',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(216, 201, 155, 0.7) 0%, 
            rgba(216, 201, 155, 0.4) 20%, 
            rgba(216, 201, 155, 0.2) 40%, 
            rgba(216, 201, 155, 0.1) 60%, 
            rgba(216, 201, 155, 0.05) 75%, 
            transparent 90%)`,
          zIndex: -9
        }}
      />
      
      {/* Light Teal flare - repositioned to top-right with better contrast */}
      <div 
        className={`light-source-blue transparency-normalized ${className}`}
        style={{
          position: 'fixed',
          width: '70vw',
          height: '70vw',
          top: '-10vh',
          right: '-10vw',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(94, 234, 212, 0.6) 0%, 
            rgba(94, 234, 212, 0.35) 25%, 
            rgba(94, 234, 212, 0.18) 50%, 
            rgba(94, 234, 212, 0.08) 70%, 
            transparent 85%)`,
          zIndex: -8
        }}
      />
    </>
  );
}

export default BackgroundGradient;