import React, { useState, useRef, useEffect } from 'react';
import { optimizeForLCP, optimizeForCLS } from '../utils/performanceMonitor';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  quality?: number;
  webpSrc?: string;
  avifSrc?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes,
  quality = 85,
  webpSrc,
  avifSrc,
  placeholder,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading when image is 50px from viewport
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, priority]);

  // Optimize for Core Web Vitals
  useEffect(() => {
    if (imgRef.current && priority) {
      optimizeForLCP(imgRef.current);
    }

    if (containerRef.current && width && height) {
      optimizeForCLS(containerRef.current, { width, height });
    }
  }, [priority, width, height]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (!width) return baseSrc;
    
    const breakpoints = [0.5, 1, 1.5, 2];
    return breakpoints
      .map(multiplier => {
        const scaledWidth = Math.round(width * multiplier);
        return `${baseSrc}?w=${scaledWidth}&q=${quality} ${scaledWidth}w`;
      })
      .join(', ');
  };

  // Container styles for preventing layout shift
  const containerStyle: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
    ...(width && height && {
      width: `${width}px`,
      height: `${height}px`,
    }),
  };

  // Image styles
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0,
  };

  // Placeholder styles
  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: placeholder || 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: !isLoaded ? 'shimmer 1.5s infinite' : 'none',
    display: isLoaded ? 'none' : 'block',
  };

  if (!isInView) {
    return (
      <div ref={containerRef} style={containerStyle} className={className}>
        <div style={placeholderStyle} />
      </div>
    );
  }

  if (hasError) {
    return (
      <div 
        style={{ ...containerStyle, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        className={className}
      >
        <span style={{ color: '#999', fontSize: '0.875rem' }}>Failed to load image</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={containerStyle} className={className}>
      {/* Placeholder */}
      <div style={placeholderStyle} />
      
      {/* Modern format support with picture element */}
      <picture>
        {/* AVIF format (best compression) */}
        {avifSrc && (
          <source
            srcSet={generateSrcSet(avifSrc)}
            sizes={sizes}
            type="image/avif"
          />
        )}
        
        {/* WebP format (good compression, wide support) */}
        {webpSrc && (
          <source
            srcSet={generateSrcSet(webpSrc)}
            sizes={sizes}
            type="image/webp"
          />
        )}
        
        {/* Fallback to original format */}
        <img
          ref={imgRef}
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          style={imageStyle}
          loading={loading}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          {...(priority && { fetchPriority: 'high' } as any)}
        />
      </picture>
      
      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

// Hook for image optimization recommendations
export function useImageOptimization() {
  const recommendations = {
    // Recommend WebP/AVIF for better compression
    modernFormats: {
      webp: 'Use WebP format for 25-35% better compression than JPEG',
      avif: 'Use AVIF format for 50% better compression than JPEG',
    },
    
    // Recommend responsive images
    responsive: {
      srcset: 'Use srcset for different screen densities',
      sizes: 'Use sizes attribute for responsive behavior',
      lazy: 'Use lazy loading for images below the fold',
    },
    
    // Performance optimizations
    performance: {
      preload: 'Preload critical images for better LCP',
      dimensions: 'Always specify width/height to prevent CLS',
      compression: 'Compress images to reduce bundle size',
    },
  };

  const optimizeImage = (imageElement: HTMLImageElement, options: {
    priority?: boolean;
    dimensions?: { width: number; height: number };
  }) => {
    if (options.priority) {
      optimizeForLCP(imageElement);
    }
    
    if (options.dimensions) {
      optimizeForCLS(imageElement, options.dimensions);
    }
  };

  return {
    recommendations,
    optimizeImage,
  };
}

export default OptimizedImage;