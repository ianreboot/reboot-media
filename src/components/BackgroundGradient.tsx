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
          radial-gradient(circle at 15% 15%, rgba(216, 201, 155, 0.4) 0%, rgba(216, 201, 155, 0.2) 20%, rgba(216, 201, 155, 0.1) 35%, transparent 50%),
          radial-gradient(circle at 85% 85%, rgba(216, 201, 155, 0.35) 0%, rgba(216, 201, 155, 0.18) 18%, rgba(216, 201, 155, 0.08) 32%, transparent 45%),
          radial-gradient(circle at 25% 75%, rgba(216, 201, 155, 0.3) 0%, rgba(216, 201, 155, 0.15) 22%, rgba(216, 201, 155, 0.06) 36%, transparent 48%),
          radial-gradient(circle at 75% 25%, rgba(216, 201, 155, 0.32) 0%, rgba(216, 201, 155, 0.16) 19%, rgba(216, 201, 155, 0.07) 33%, transparent 42%),
          
          radial-gradient(circle at 60% 15%, rgba(39, 62, 71, 0.35) 0%, rgba(39, 62, 71, 0.18) 15%, rgba(39, 62, 71, 0.09) 25%, transparent 35%),
          radial-gradient(circle at 25% 40%, rgba(39, 62, 71, 0.4) 0%, rgba(39, 62, 71, 0.2) 18%, rgba(39, 62, 71, 0.1) 28%, transparent 40%),
          radial-gradient(circle at 85% 60%, rgba(39, 62, 71, 0.32) 0%, rgba(39, 62, 71, 0.16) 14%, rgba(39, 62, 71, 0.08) 24%, transparent 32%),
          radial-gradient(circle at 15% 85%, rgba(39, 62, 71, 0.38) 0%, rgba(39, 62, 71, 0.19) 16%, rgba(39, 62, 71, 0.09) 26%, transparent 38%),
          
          radial-gradient(circle at 35% 25%, rgba(216, 151, 60, 0.3) 0%, rgba(216, 151, 60, 0.15) 10%, rgba(216, 151, 60, 0.07) 18%, transparent 25%),
          radial-gradient(circle at 70% 35%, rgba(216, 151, 60, 0.35) 0%, rgba(216, 151, 60, 0.18) 12%, rgba(216, 151, 60, 0.08) 20%, transparent 28%),
          radial-gradient(circle at 20% 60%, rgba(216, 151, 60, 0.28) 0%, rgba(216, 151, 60, 0.14) 8%, rgba(216, 151, 60, 0.06) 16%, transparent 22%),
          radial-gradient(circle at 80% 70%, rgba(216, 151, 60, 0.33) 0%, rgba(216, 151, 60, 0.17) 11%, rgba(216, 151, 60, 0.07) 19%, transparent 30%)
        `,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        zIndex: -1
      }}
    />
  );
}

export default BackgroundGradient;