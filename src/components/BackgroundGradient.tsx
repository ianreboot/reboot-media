// Background Gradient System - Simplified for cross-browser consistency
// Optimized to prevent transparency stacking issues

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
      
      {/* Simplified gradient overlay - reduced from 12 to 3 key gradients */}
      <div 
        className={`fixed inset-0 w-full h-full background-gradient-base transparency-normalized ${className}`}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(216, 201, 155, 0.25) 0%, rgba(216, 201, 155, 0.12) 25%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(39, 62, 71, 0.3) 0%, rgba(39, 62, 71, 0.15) 30%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(216, 151, 60, 0.2) 0%, rgba(216, 151, 60, 0.1) 40%, transparent 70%)
          `,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
          // Browser-specific opacity normalization
          opacity: '0.85',
          mixBlendMode: 'multiply' // Ensures consistent blending across browsers
        }}
      />
    </>
  );
}

export default BackgroundGradient;