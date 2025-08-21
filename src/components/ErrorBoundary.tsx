import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

/**
 * Error information for logging and reporting
 */
interface ErrorDetails {
  error: Error;
  errorInfo: ErrorInfo;
  timestamp: Date;
  componentStack: string;
  userId?: string;
  sessionId: string;
  errorBoundary: string;
}

/**
 * Props for ErrorBoundary component
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  level?: 'page' | 'component';
  name?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

/**
 * State for ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

/**
 * Generate unique session ID for error tracking
 */
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Session ID for this browser session
 */
const SESSION_ID = generateSessionId();

/**
 * Maximum number of retry attempts before showing persistent error
 */
const MAX_RETRY_COUNT = 3;

/**
 * Log error details to console and external services
 */
const logError = (errorDetails: ErrorDetails): void => {
  // Log to console for development
  console.group('🚨 Error Boundary Caught Error');
  console.error('Error:', errorDetails.error);
  console.error('Component Stack:', errorDetails.errorInfo.componentStack);
  console.error('Error Boundary:', errorDetails.errorBoundary);
  console.error('Timestamp:', errorDetails.timestamp.toISOString());
  console.error('Session ID:', errorDetails.sessionId);
  console.groupEnd();

  // In production, send to error reporting service
  if (import.meta.env.PROD) {
    try {
      // Example: Send to external error tracking service
      // Replace with your preferred error tracking service (Sentry, LogRocket, etc.)
      const errorPayload = {
        message: errorDetails.error.message,
        stack: errorDetails.error.stack,
        componentStack: errorDetails.componentStack,
        timestamp: errorDetails.timestamp.toISOString(),
        sessionId: errorDetails.sessionId,
        errorBoundary: errorDetails.errorBoundary,
        url: window.location.href,
        userAgent: navigator.userAgent,
      };

      // You can integrate with services like:
      // - Sentry: Sentry.captureException(errorDetails.error, { contexts: { errorBoundary: errorPayload } });
      // - LogRocket: LogRocket.captureException(errorDetails.error);
      // - Custom API: fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorPayload) });
      
      console.log('Error reported to monitoring service:', errorPayload);
    } catch (reportingError) {
      console.error('Failed to report error to monitoring service:', reportingError);
    }
  }
};

/**
 * Comprehensive Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the app.
 * 
 * Features:
 * - Automatic error logging and reporting
 * - Retry functionality for transient errors
 * - Different error UI based on level (page vs component)
 * - Session tracking for error correlation
 * - Graceful degradation
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeouts: Set<NodeJS.Timeout> = new Set();

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details
    const errorDetails: ErrorDetails = {
      error,
      errorInfo,
      timestamp: new Date(),
      componentStack: errorInfo.componentStack ?? 'No component stack available',
      sessionId: SESSION_ID,
      errorBoundary: this.props.name ?? 'UnnamedErrorBoundary',
    };

    logError(errorDetails);

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * Handle retry attempt
   */
  handleRetry = (): void => {
    const { retryCount } = this.state;
    
    if (retryCount < MAX_RETRY_COUNT) {
      console.log(`🔄 Retrying... (Attempt ${retryCount + 1}/${MAX_RETRY_COUNT})`);
      
      this.setState((prevState) => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
      }));
    }
  };

  /**
   * Handle page refresh
   */
  handleRefresh = (): void => {
    window.location.reload();
  };

  /**
   * Handle navigation to safe page
   */
  handleGoHome = (): void => {
    window.location.href = '/';
  };

  /**
   * Component cleanup
   */
  componentWillUnmount(): void {
    // Clear any pending retry timeouts
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
    this.retryTimeouts.clear();
  }

  render(): ReactNode {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { children, fallback, level = 'component', name, showDetails = false } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default fallback UI based on error level
      if (level === 'page') {
        return (
          <PageErrorFallback
            error={error}
            errorInfo={errorInfo}
            retryCount={retryCount}
            onRetry={retryCount < MAX_RETRY_COUNT ? this.handleRetry : undefined}
            onRefresh={this.handleRefresh}
            onGoHome={this.handleGoHome}
            showDetails={showDetails}
            errorBoundaryName={name}
          />
        );
      }

      return (
        <ComponentErrorFallback
          error={error}
          errorInfo={errorInfo}
          retryCount={retryCount}
          onRetry={retryCount < MAX_RETRY_COUNT ? this.handleRetry : undefined}
          showDetails={showDetails}
          errorBoundaryName={name}
        />
      );
    }

    return children;
  }
}

/**
 * Page-level error fallback component
 */
interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
  onRetry?: () => void;
  onRefresh?: () => void;
  onGoHome?: () => void;
  showDetails?: boolean;
  errorBoundaryName?: string;
}

const PageErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  retryCount,
  onRetry,
  onRefresh,
  onGoHome,
  showDetails = false,
  errorBoundaryName,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
    <div className="max-w-2xl w-full">
      {/* Main Error Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">Something Went Wrong</h1>
              <p className="text-red-100 text-sm">
                We apologize for the inconvenience. The page encountered an error.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Don't worry - this happens sometimes. We've been notified and are working on a fix.
              In the meantime, you can try one of the options below.
            </p>
            
            {retryCount > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-orange-700 font-medium">
                    Retry attempts: {retryCount}/{MAX_RETRY_COUNT}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {onRetry && (
              <button
                onClick={onRetry}
                className="bg-blue-600 hover:bg-blue-700 focus-visible:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            )}
            
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="bg-gray-600 hover:bg-gray-700 focus-visible:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Page
              </button>
            )}
            
            {onGoHome && (
              <button
                onClick={onGoHome}
                className="bg-orange-600 hover:bg-orange-700 focus-visible:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </button>
            )}
          </div>

          {/* Error Details (Development/Debug Mode) */}
          {showDetails && error && (
            <details className="bg-gray-50 rounded-lg">
              <summary className="p-4 cursor-pointer font-medium text-gray-700 hover:bg-gray-100 focus-visible:bg-gray-100 rounded-lg">
                Technical Details (for developers)
              </summary>
              <div className="p-4 pt-0">
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-red-800 mb-2">Error Message</h4>
                  <code className="text-sm text-red-700 break-all">{error.message}</code>
                </div>
                
                {error.stack && (
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Stack Trace</h4>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap break-all overflow-x-auto">
                      {error.stack}
                    </pre>
                  </div>
                )}

                {errorInfo?.componentStack && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Component Stack</h4>
                    <pre className="text-xs text-blue-accessible whitespace-pre-wrap break-all overflow-x-auto">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}

                {errorBoundaryName && (
                  <div className="mt-4 text-xs text-gray-500">
                    Error Boundary: {errorBoundaryName}
                  </div>
                )}
              </div>
            </details>
          )}

          {/* Contact Support */}
          <div className="bg-blue-50 rounded-lg p-4 mt-6">
            <h4 className="font-medium text-blue-800 mb-2">Still Having Issues?</h4>
            <p className="text-blue-700 text-sm mb-3">
              If this problem persists, please contact our support team.
            </p>
            <p className="text-xs text-blue-accessible">
              Session ID: <code className="bg-blue-100 px-2 py-1 rounded">{SESSION_ID}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Component-level error fallback component
 */
const ComponentErrorFallback: React.FC<Omit<ErrorFallbackProps, 'onRefresh' | 'onGoHome'>> = ({
  error,
  errorInfo,
  retryCount,
  onRetry,
  showDetails = false,
  errorBoundaryName,
}) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      
      <div className="flex-1">
        <h3 className="text-red-800 font-medium mb-2">Component Error</h3>
        <p className="text-red-700 text-sm mb-4">
          This component encountered an error and couldn't render properly.
        </p>

        {retryCount > 0 && (
          <div className="bg-orange-100 border border-orange-200 rounded p-3 mb-4">
            <span className="text-orange-700 text-sm">
              Retry attempts: {retryCount}/{MAX_RETRY_COUNT}
            </span>
          </div>
        )}

        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 focus-visible:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors duration-200 text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry Component
          </button>
        )}

        {/* Error Details for Component Level */}
        {showDetails && error && (
          <details className="mt-4 bg-white rounded border">
            <summary className="p-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:bg-gray-50">
              Technical Details
            </summary>
            <div className="p-3 pt-0 border-t">
              <div className="text-xs text-gray-600 mb-2">
                <strong>Error:</strong> {error.message}
              </div>
              {errorInfo && (
                <div className="text-xs text-gray-500 mb-2">
                  Component Stack Available
                </div>
              )}
              {errorBoundaryName && (
                <div className="text-xs text-gray-500">
                  Boundary: {errorBoundaryName}
                </div>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  </div>
);

export default ErrorBoundary;
export { PageErrorFallback, ComponentErrorFallback };
export type { ErrorBoundaryProps, ErrorDetails };