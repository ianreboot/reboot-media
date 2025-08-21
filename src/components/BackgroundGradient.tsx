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
      
      {/* Enhanced gradient overlay - increased visibility for testing */}
      <div 
        className={`fixed inset-0 w-full h-full background-gradient-base transparency-normalized ${className}`}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(216, 201, 155, 0.4) 0%, rgba(216, 201, 155, 0.2) 25%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(39, 62, 71, 0.5) 0%, rgba(39, 62, 71, 0.25) 30%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(216, 151, 60, 0.35) 0%, rgba(216, 151, 60, 0.15) 40%, transparent 70%)
          `,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
          // Remove multiply blend mode and increase opacity for visibility
          opacity: '1.0',
          mixBlendMode: 'normal'
        }}
      />
    </>
  );
}

export default BackgroundGradient;