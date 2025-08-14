/**
 * Error Boundary Demonstration Utilities
 * 
 * These utilities help test and demonstrate the error boundary functionality
 * in development environments. They provide controlled ways to trigger
 * different types of errors for testing purposes.
 * 
 * Usage:
 * - Only use in development environment
 * - Call from browser dev console or temporary UI buttons
 * - Helps validate error boundary coverage and functionality
 */

import React from 'react';
import { useError } from '../contexts/ErrorContext';

// Define the interface for our demo functions
interface ErrorBoundaryDemoInterface {
  trigger: (type: DemoErrorType) => void;
  random: () => void;
  stress: (count?: number, interval?: number) => Promise<void>;
  test: (boundary: string, type?: DemoErrorType) => void;
  list: () => void;
  coverage: () => void;
}

// Extend the window interface
declare global {
  interface Window {
    errorBoundaryDemo?: ErrorBoundaryDemoInterface;
  }
}

/**
 * Types of demo errors available
 */
export type DemoErrorType = 
  | 'component-error'
  | 'async-error' 
  | 'promise-rejection'
  | 'network-error'
  | 'form-validation-error'
  | 'critical-system-error'
  | 'memory-error'
  | 'api-error';

/**
 * Demo error configurations
 */
const DEMO_ERRORS: Record<DemoErrorType, {
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  trigger: () => Error | Promise<never>;
}> = {
  'component-error': {
    name: 'Component Render Error',
    description: 'Simulates an error during component rendering',
    severity: 'high',
    trigger: () => new Error('Demo: Component failed to render due to invalid props')
  },
  'async-error': {
    name: 'Asynchronous Error',
    description: 'Simulates an error in async operation',
    severity: 'medium',
    trigger: () => new Error('Demo: Async operation failed - network timeout')
  },
  'promise-rejection': {
    name: 'Unhandled Promise Rejection',
    description: 'Simulates an unhandled promise rejection',
    severity: 'high',
    trigger: () => Promise.reject('Demo: Promise rejected without catch handler')
  },
  'network-error': {
    name: 'Network Request Error',
    description: 'Simulates a failed network request',
    severity: 'medium',
    trigger: () => new Error('Demo: Failed to fetch data from API - 500 Server Error')
  },
  'form-validation-error': {
    name: 'Form Validation Error',
    description: 'Simulates a form validation failure',
    severity: 'low',
    trigger: () => new Error('Demo: Form validation failed - invalid email format')
  },
  'critical-system-error': {
    name: 'Critical System Error',
    description: 'Simulates a critical system failure',
    severity: 'critical',
    trigger: () => new Error('Demo: Critical system failure - database connection lost')
  },
  'memory-error': {
    name: 'Memory/Resource Error',
    description: 'Simulates a memory or resource exhaustion error',
    severity: 'high',
    trigger: () => new Error('Demo: Out of memory - heap size exceeded')
  },
  'api-error': {
    name: 'API Integration Error',
    description: 'Simulates an API integration failure',
    severity: 'medium',
    trigger: () => new Error('Demo: API integration failed - authentication expired')
  }
};

/**
 * Demo component that can throw various types of errors on command
 */
export const ErrorDemoComponent: React.FC<{
  errorType?: DemoErrorType;
  shouldThrow?: boolean;
}> = ({ errorType = 'component-error', shouldThrow = false }) => {
  const { reportError } = useError();

  React.useEffect(() => {
    if (shouldThrow) {
      const demoError = DEMO_ERRORS[errorType];
      const error = demoError.trigger();
      
      if (error instanceof Promise) {
        // Handle promise rejection
        error.catch((reason) => {
          reportError(new Error(`Promise Rejection: ${reason}`), {
            demoType: errorType,
            timestamp: new Date().toISOString()
          });
        });
      } else if (error instanceof Error) {
        // Throw synchronous error (will be caught by error boundary)
        throw error;
      }
    }
  }, [shouldThrow, errorType, reportError]);

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="font-bold text-blue-800 mb-2">Error Demo Component</h3>
      <p className="text-blue-600 text-sm mb-2">
        {shouldThrow 
          ? `Triggering: ${DEMO_ERRORS[errorType].name}` 
          : 'Ready to trigger demo errors'
        }
      </p>
      <p className="text-blue-500 text-xs">
        {DEMO_ERRORS[errorType].description}
      </p>
    </div>
  );
};

/**
 * Utility functions for testing error boundaries
 */
export class ErrorBoundaryTester {
  private static instance: ErrorBoundaryTester;

  private constructor() {}

  static getInstance(): ErrorBoundaryTester {
    if (!ErrorBoundaryTester.instance) {
      ErrorBoundaryTester.instance = new ErrorBoundaryTester();
    }
    return ErrorBoundaryTester.instance;
  }

  /**
   * Trigger a specific demo error
   */
  triggerError(type: DemoErrorType): void {
    if (import.meta.env.PROD) {
      console.warn('Error demo is disabled in production');
      return;
    }

    const demoError = DEMO_ERRORS[type];
    const error = demoError.trigger();

    console.group(`🧪 Demo Error: ${demoError.name}`);
    console.log('Description:', demoError.description);
    console.log('Severity:', demoError.severity);
    console.log('Error:', error);
    console.groupEnd();

    if (error instanceof Promise) {
      // Trigger unhandled promise rejection
      setTimeout(() => {
        error.catch(() => {}); // Prevent actual unhandled rejection in demo
        window.dispatchEvent(new CustomEvent('unhandledrejection', {
          detail: { reason: `Demo: ${demoError.name}` }
        }));
      }, 100);
    } else {
      // Throw the error
      setTimeout(() => {
        throw error;
      }, 100);
    }
  }

  /**
   * Trigger random error for stress testing
   */
  triggerRandomError(): void {
    const errorTypes = Object.keys(DEMO_ERRORS) as DemoErrorType[];
    const randomType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    this.triggerError(randomType);
  }

  /**
   * Run error boundary stress test
   */
  async stressTest(errorCount: number = 5, intervalMs: number = 1000): Promise<void> {
    if (import.meta.env.PROD) {
      console.warn('Stress test is disabled in production');
      return;
    }

    console.group(`🧪 Error Boundary Stress Test`);
    console.log(`Triggering ${errorCount} errors with ${intervalMs}ms intervals`);

    for (let i = 0; i < errorCount; i++) {
      setTimeout(() => {
        console.log(`Stress test error ${i + 1}/${errorCount}`);
        this.triggerRandomError();
      }, i * intervalMs);
    }

    console.groupEnd();
  }

  /**
   * Test specific error boundary by name
   */
  testBoundary(boundaryName: string, errorType: DemoErrorType = 'component-error'): void {
    if (import.meta.env.PROD) {
      console.warn('Boundary testing is disabled in production');
      return;
    }

    console.group(`🧪 Testing Error Boundary: ${boundaryName}`);
    console.log('Error type:', errorType);
    console.log('Target boundary:', boundaryName);
    
    // Add boundary identifier to error for tracking
    const originalError = DEMO_ERRORS[errorType].trigger();
    let enhancedError: Error;
    
    if (originalError instanceof Error) {
      enhancedError = new Error(`[${boundaryName}] ${originalError.message}`);
      enhancedError.stack = originalError.stack;
    } else {
      enhancedError = new Error(`[${boundaryName}] Demo error`);
    }

    setTimeout(() => {
      throw enhancedError;
    }, 100);

    console.groupEnd();
  }

  /**
   * List all available demo errors
   */
  listAvailableErrors(): void {
    console.group('🧪 Available Demo Errors');
    Object.entries(DEMO_ERRORS).forEach(([key, config]) => {
      console.log(`${key}:`, {
        name: config.name,
        description: config.description,
        severity: config.severity
      });
    });
    console.groupEnd();
  }

  /**
   * Validate error boundary coverage
   */
  validateCoverage(): void {
    if (import.meta.env.PROD) {
      console.warn('Coverage validation is disabled in production');
      return;
    }

    const boundaries = document.querySelectorAll('[data-error-boundary]');
    console.group('🧪 Error Boundary Coverage Report');
    console.log('Found boundaries:', boundaries.length);
    
    boundaries.forEach((boundary, index) => {
      const name = boundary.getAttribute('data-error-boundary') || `Boundary-${index}`;
      console.log(`- ${name}:`, boundary);
    });

    if (boundaries.length === 0) {
      console.warn('No error boundaries found! Make sure they have data-error-boundary attributes.');
    }

    console.groupEnd();
  }
}

/**
 * Global demo functions for browser console
 * Available in development mode only
 */
if (import.meta.env.DEV) {
  // Attach to window for easy access in dev console
  window.errorBoundaryDemo = {
    trigger: (type: DemoErrorType) => ErrorBoundaryTester.getInstance().triggerError(type),
    random: () => ErrorBoundaryTester.getInstance().triggerRandomError(),
    stress: (count?: number, interval?: number) => ErrorBoundaryTester.getInstance().stressTest(count, interval),
    test: (boundary: string, type?: DemoErrorType) => ErrorBoundaryTester.getInstance().testBoundary(boundary, type),
    list: () => ErrorBoundaryTester.getInstance().listAvailableErrors(),
    coverage: () => ErrorBoundaryTester.getInstance().validateCoverage(),
  };

  console.log('🧪 Error Boundary Demo available in window.errorBoundaryDemo');
  console.log('Examples:');
  console.log('- window.errorBoundaryDemo.trigger("component-error")');
  console.log('- window.errorBoundaryDemo.random()');
  console.log('- window.errorBoundaryDemo.stress(3, 500)');
  console.log('- window.errorBoundaryDemo.list()');
}

export default ErrorBoundaryTester;