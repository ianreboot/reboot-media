import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';

/**
 * Types for error management
 */
export interface AppError {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  source: string;
  details?: Record<string, any>;
  resolved: boolean;
}

export interface ErrorNotification {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  duration?: number; // Auto-dismiss duration in ms (0 = persistent)
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

/**
 * Error state interface
 */
interface ErrorState {
  errors: AppError[];
  notifications: ErrorNotification[];
  isReporting: boolean;
  globalErrorCount: number;
}

/**
 * Error actions
 */
type ErrorAction =
  | { type: 'ADD_ERROR'; payload: Omit<AppError, 'id' | 'timestamp' | 'resolved'> }
  | { type: 'RESOLVE_ERROR'; payload: { id: string } }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<ErrorNotification, 'id'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: { id: string } }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_REPORTING'; payload: { isReporting: boolean } }
  | { type: 'INCREMENT_GLOBAL_ERROR_COUNT' };

/**
 * Error context interface
 */
interface ErrorContextType {
  state: ErrorState;
  addError: (error: Omit<AppError, 'id' | 'timestamp' | 'resolved'>) => string;
  resolveError: (id: string) => void;
  clearErrors: () => void;
  showNotification: (notification: Omit<ErrorNotification, 'id'>) => string;
  hideNotification: (id: string) => void;
  clearNotifications: () => void;
  reportError: (error: Error, context?: Record<string, any>) => Promise<void>;
  getErrorStats: () => {
    total: number;
    bySource: Record<string, number>;
    bySeverity: Record<string, number>;
  };
}

/**
 * Generate unique ID for errors and notifications
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Initial error state
 */
const initialState: ErrorState = {
  errors: [],
  notifications: [],
  isReporting: false,
  globalErrorCount: 0,
};

/**
 * Error reducer
 */
const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case 'ADD_ERROR': {
      const newError: AppError = {
        ...action.payload,
        id: generateId(),
        timestamp: new Date(),
        resolved: false,
      };
      return {
        ...state,
        errors: [...state.errors, newError],
        globalErrorCount: state.globalErrorCount + 1,
      };
    }
    
    case 'RESOLVE_ERROR': {
      return {
        ...state,
        errors: state.errors.map(error =>
          error.id === action.payload.id
            ? { ...error, resolved: true }
            : error
        ),
      };
    }
    
    case 'CLEAR_ERRORS': {
      return {
        ...state,
        errors: [],
      };
    }
    
    case 'ADD_NOTIFICATION': {
      const newNotification: ErrorNotification = {
        ...action.payload,
        id: generateId(),
      };
      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };
    }
    
    case 'REMOVE_NOTIFICATION': {
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload.id
        ),
      };
    }
    
    case 'CLEAR_NOTIFICATIONS': {
      return {
        ...state,
        notifications: [],
      };
    }
    
    case 'SET_REPORTING': {
      return {
        ...state,
        isReporting: action.payload.isReporting,
      };
    }
    
    case 'INCREMENT_GLOBAL_ERROR_COUNT': {
      return {
        ...state,
        globalErrorCount: state.globalErrorCount + 1,
      };
    }
    
    default:
      return state;
  }
};

/**
 * Create error context
 */
const ErrorContext = createContext<ErrorContextType | null>(null);

/**
 * Error Context Provider Props
 */
interface ErrorProviderProps {
  children: ReactNode;
  enableErrorReporting?: boolean;
}

/**
 * Error Context Provider Component
 * 
 * Provides global error state management, notification system,
 * and error reporting capabilities throughout the application.
 * 
 * Features:
 * - Centralized error collection and management
 * - User-friendly notification system
 * - Error reporting to external services
 * - Error analytics and statistics
 * - Automatic error categorization
 */
export const ErrorProvider: React.FC<ErrorProviderProps> = ({ 
  children, 
  enableErrorReporting = true 
}) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  /**
   * Add an error to the error collection
   */
  const addError = useCallback((error: Omit<AppError, 'id' | 'timestamp' | 'resolved'>): string => {
    const errorId = generateId();
    dispatch({ 
      type: 'ADD_ERROR', 
      payload: error 
    });

    // Auto-show notification for high/critical errors
    if (error.severity === 'high' || error.severity === 'critical') {
      const notificationTitle = error.severity === 'critical' 
        ? 'Critical Error' 
        : 'Error Occurred';

      showNotification({
        title: notificationTitle,
        message: error.message,
        type: 'error',
        duration: error.severity === 'critical' ? 0 : 5000, // Critical errors are persistent
        actions: [
          {
            label: 'Dismiss',
            action: () => hideNotification(errorId),
            variant: 'secondary',
          },
          {
            label: 'Retry',
            action: () => {
              window.location.reload();
            },
            variant: 'primary',
          },
        ],
      });
    }

    return errorId;
  }, []);

  /**
   * Mark an error as resolved
   */
  const resolveError = useCallback((id: string): void => {
    dispatch({ type: 'RESOLVE_ERROR', payload: { id } });
  }, []);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERRORS' });
  }, []);

  /**
   * Show a notification to the user
   */
  const showNotification = useCallback((notification: Omit<ErrorNotification, 'id'>): string => {
    const notificationId = generateId();
    dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: notification 
    });

    // Auto-dismiss notification if duration is set
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        hideNotification(notificationId);
      }, notification.duration);
    }

    return notificationId;
  }, []);

  /**
   * Hide a notification
   */
  const hideNotification = useCallback((id: string): void => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: { id } });
  }, []);

  /**
   * Clear all notifications
   */
  const clearNotifications = useCallback((): void => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  }, []);

  /**
   * Report error to external service
   */
  const reportError = useCallback(async (error: Error, context?: Record<string, any>): Promise<void> => {
    if (!enableErrorReporting) return;

    dispatch({ type: 'SET_REPORTING', payload: { isReporting: true } });

    try {
      // Prepare error data for reporting
      const errorData = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        context: context || {},
      };

      // Log for development
      console.group('🚨 Reporting Error to External Service');
      console.error('Error Data:', errorData);
      console.groupEnd();

      // In production, send to your error reporting service
      if (import.meta.env.PROD) {
        // Example integrations (uncomment and configure as needed):
        
        // Sentry integration
        // import * as Sentry from '@sentry/react';
        // Sentry.captureException(error, { extra: context });

        // Custom API endpoint
        // await fetch('/api/errors', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(errorData),
        // });

        // LogRocket integration
        // import LogRocket from 'logrocket';
        // LogRocket.captureException(error);

        console.log('Error reported successfully');
      }

      // Add to local error collection
      addError({
        message: error.message,
        severity: 'high',
        source: 'ErrorReporting',
        details: { context, stack: error.stack },
      });

    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
      
      // Show notification about reporting failure
      showNotification({
        title: 'Reporting Failed',
        message: 'Unable to report error. Please try again or contact support.',
        type: 'warning',
        duration: 5000,
      });
    } finally {
      dispatch({ type: 'SET_REPORTING', payload: { isReporting: false } });
    }
  }, [enableErrorReporting, addError, showNotification]);

  /**
   * Get error statistics
   */
  const getErrorStats = useCallback(() => {
    const stats = {
      total: state.errors.length,
      bySource: {} as Record<string, number>,
      bySeverity: {} as Record<string, number>,
    };

    state.errors.forEach(error => {
      // Count by source
      stats.bySource[error.source] = (stats.bySource[error.source] || 0) + 1;
      
      // Count by severity
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    });

    return stats;
  }, [state.errors]);

  const contextValue: ErrorContextType = {
    state,
    addError,
    resolveError,
    clearErrors,
    showNotification,
    hideNotification,
    clearNotifications,
    reportError,
    getErrorStats,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

/**
 * Custom hook to use error context
 * 
 * @returns Error context with error management functions
 * @throws Error if used outside of ErrorProvider
 */
export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  
  return context;
};

/**
 * Custom hook for convenient error reporting
 * 
 * @returns Function to report errors with automatic context capture
 */
export const useErrorReporter = () => {
  const { reportError } = useError();

  return useCallback((error: Error, additionalContext?: Record<string, any>) => {
    // Capture additional context automatically
    const context = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent,
      ...additionalContext,
    };

    return reportError(error, context);
  }, [reportError]);
};

/**
 * HOC for automatic error boundary integration with error context
 */
export const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: {
    level?: 'page' | 'component';
    name?: string;
    showDetails?: boolean;
  }
) => {
  const WithErrorBoundaryComponent: React.FC<P> = (props) => {
    const { reportError } = useError();

    const handleError = (error: Error) => {
      reportError(error, {
        component: WrappedComponent.name || 'UnknownComponent',
        props: Object.keys(props as object),
      });
    };

    return (
      <ErrorBoundary
        onError={handleError}
        {...errorBoundaryProps}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
};

// Import ErrorBoundary component for use in HOC
import ErrorBoundary from '../components/ErrorBoundary';

export default ErrorContext;