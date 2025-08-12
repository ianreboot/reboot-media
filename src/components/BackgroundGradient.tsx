// Background Gradient System - Multi-layer radial gradient blending
// Based on /home/ian/BACKGROUND_GRADIENT_METHODOLOGY.md

interface BackgroundGradientProps {
  className?: string;
}

export function BackgroundGradient({ className = '' }: BackgroundGradientProps) {
  return (
    <div 
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(216, 201, 155, 0.2), transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(39, 62, 71, 0.15), transparent 45%),
          radial-gradient(circle at 60% 30%, rgba(216, 151, 60, 0.12), transparent 40%),
          linear-gradient(135deg, #f8f6f0 0%, #e8e4d8 100%)
        `,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        zIndex: -1
      }}
    />
  );
}

export default BackgroundGradient;