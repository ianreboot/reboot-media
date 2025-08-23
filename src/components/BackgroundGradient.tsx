// AI: Animated Background Gradient System - CSS-based organic motion inspired by Three.js particle systems
// Creates gentle, professional movement without performance overhead

interface BackgroundGradientProps {
  className?: string;
}

export function BackgroundGradient({ className = '' }: BackgroundGradientProps) {
  return (
    <>
      {/* Base dark background - ensures consistent backdrop */}
      <div 
        className={`fixed inset-0 w-full h-full transparency-normalized ${className}`}
        style={{
          background: '#0f172a', // solid dark base
          zIndex: -2
        }}
      />
      
      {/* Animated gradient overlay - organic movement system */}
      <div 
        className={`fixed inset-0 w-full h-full background-gradient-animated transparency-normalized ${className}`}
        style={{
          background: `
            radial-gradient(circle, rgba(216, 201, 155, 0.4) 0%, rgba(216, 201, 155, 0.2) 25%, transparent 50%),
            radial-gradient(circle, rgba(39, 62, 71, 0.5) 0%, rgba(39, 62, 71, 0.25) 30%, transparent 60%),
            radial-gradient(circle, rgba(216, 151, 60, 0.35) 0%, rgba(216, 151, 60, 0.15) 40%, transparent 70%)
          `,
          backgroundSize: '40% 40%, 35% 35%, 45% 45%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '20% 20%, 80% 80%, 50% 50%', // Initial position, will be animated by CSS
          zIndex: -1,
          opacity: '1.0',
          mixBlendMode: 'normal'
        }}
      />
    </>
  );
}

export default BackgroundGradient;