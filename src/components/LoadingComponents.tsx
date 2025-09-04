import React from 'react';

// Completely rewritten loading component - self-contained, no external dependencies
export const PageLoadingSpinner: React.FC<{ pageName?: string }> = ({ pageName }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    <div style={{
      textAlign: 'center',
      maxWidth: '300px',
      padding: '20px'
    }}>
      {/* Simple spinner - no external assets */}
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #e5e7eb',
        borderTop: '3px solid #3b82f6',
        borderRadius: '50%',
        margin: '0 auto 20px',
        animation: 'spin 1s linear infinite'
      }}></div>
      
      {/* Loading text */}
      <div style={{
        color: '#374151',
        fontSize: '20px',
        fontWeight: '500'
      }}>
        {pageName ? `Loading ${pageName}...` : 'Loading...'}
      </div>
      
      {/* Inline CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

// Minimal loading component for fast transitions
export const ComponentLoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-600 mx-auto mb-2"></div>
      <p className="text-gray-500 text-xs">Loading...</p>
    </div>
  </div>
);

// Content skeleton for immediate visual feedback
export const ContentSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto px-6 py-12 animate-pulse">
    {/* Header skeleton */}
    <div className="mb-8">
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-100 rounded w-5/6"></div>
    </div>
    
    {/* Content blocks skeleton */}
    <div className="space-y-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-11/12"></div>
            <div className="h-4 bg-gray-100 rounded w-4/5"></div>
          </div>
        </div>
      ))}
    </div>
    
    {/* CTA skeleton */}
    <div className="mt-12 text-center">
      <div className="h-12 bg-blue-100 rounded-lg w-48 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-100 rounded w-64 mx-auto"></div>
    </div>
  </div>
);

// Error boundary fallback for lazy loading failures
export const LazyLoadErrorFallback: React.FC<{ error?: Error; retry?: () => void }> = ({ 
  error, 
  retry 
}) => (
  <div className="fixed inset-0 z-[9999]" style={{ 
    backgroundColor: '#fef2f2 !important', 
    background: '#fef2f2 !important',
    opacity: '1 !important',
    zIndex: 9999
  }}>
    <div className="relative flex items-center justify-center min-h-screen">
    <div className="text-center max-w-md mx-auto px-6">
      <div className="mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-600 text-2xl">⚠</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Loading Failed
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          We encountered an issue loading this page. Please try again.
        </p>
        {error && process.env.NODE_ENV === 'development' && (
          <details className="text-left bg-gray-100 rounded p-3 mb-4">
            <summary className="cursor-pointer text-xs font-medium text-gray-700">
              Error Details
            </summary>
            <pre className="text-xs text-gray-600 mt-2 whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        )}
      </div>
      
      <div className="space-y-3">
        {retry && (
          <button
            onClick={retry}
            className="w-full bg-blue-600 hover:bg-blue-700 focus-visible:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
        )}
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-gray-200 hover:bg-gray-300 focus-visible:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          Refresh Page
        </button>
        <button
          onClick={() => window.history.back()}
          className="text-blue-accessible hover:text-blue-700 focus-visible:text-blue-700 text-sm font-medium"
        >
          ← Go Back
        </button>
      </div>
    </div>
    </div>
  </div>
);

// Progressive loading component that upgrades from skeleton to spinner
export const ProgressiveLoader: React.FC<{ 
  stage?: 'skeleton' | 'spinner' | 'content',
  pageName?: string 
}> = ({ stage = 'skeleton', pageName }) => {
  switch (stage) {
    case 'skeleton':
      return <ContentSkeleton />;
    case 'spinner':
      return <PageLoadingSpinner pageName={pageName} />;
    case 'content':
      return null;
    default:
      return <ComponentLoadingSpinner />;
  }
};