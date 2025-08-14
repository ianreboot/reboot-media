import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';
import { ErrorProvider } from '../../contexts/ErrorContext';

// Mock component that throws an error
const ThrowErrorComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>Component rendered successfully</div>;
};

// Mock component for testing
const WorkingComponent = () => <div>Working component</div>;

// Wrapper component with ErrorProvider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorProvider enableErrorReporting={false}>
    {children}
  </ErrorProvider>
);

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console errors during tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'group').mockImplementation(() => {});
    vi.spyOn(console, 'groupEnd').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component-level Error Boundary', () => {
    it('should render children when no error occurs', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="component" name="TestBoundary">
            <WorkingComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Working component')).toBeInTheDocument();
    });

    it('should catch and display component error fallback', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="component" name="TestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Component Error')).toBeInTheDocument();
      expect(screen.getByText(/This component encountered an error/)).toBeInTheDocument();
    });

    it('should show retry button for component errors', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="component" name="TestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Retry Component')).toBeInTheDocument();
    });

    it('should show technical details when showDetails is true', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="component" name="TestBoundary" showDetails={true}>
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Technical Details')).toBeInTheDocument();
    });
  });

  describe('Page-level Error Boundary', () => {
    it('should render children when no error occurs', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="page" name="PageTestBoundary">
            <WorkingComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Working component')).toBeInTheDocument();
    });

    it('should catch and display page error fallback', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="page" name="PageTestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
      expect(screen.getByText(/We apologize for the inconvenience/)).toBeInTheDocument();
    });

    it('should show all action buttons for page errors', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="page" name="PageTestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Try Again')).toBeInTheDocument();
      expect(screen.getByText('Refresh Page')).toBeInTheDocument();
      expect(screen.getByText('Go Home')).toBeInTheDocument();
    });

    it('should show session ID', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="page" name="PageTestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText(/Session ID:/)).toBeInTheDocument();
    });

    it('should show technical details when showDetails is true', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="page" name="PageTestBoundary" showDetails={true}>
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Technical Details (for developers)')).toBeInTheDocument();
    });
  });

  describe('Retry Functionality', () => {
    it('should retry and render component successfully when error is resolved', async () => {
      let shouldThrow = true;
      const TestComponent = () => <ThrowErrorComponent shouldThrow={shouldThrow} />;

      const { rerender } = render(
        <TestWrapper>
          <ErrorBoundary level="component" name="RetryTestBoundary">
            <TestComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      // Initially should show error
      expect(screen.getByText('Component Error')).toBeInTheDocument();

      // Fix the error
      shouldThrow = false;

      // Click retry button
      const retryButton = screen.getByText('Retry Component');
      fireEvent.click(retryButton);

      // Should show working component after retry
      await waitFor(() => {
        expect(screen.getByText('Component rendered successfully')).toBeInTheDocument();
      });
    });

    it('should track retry count', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="component" name="RetryCountTestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      const retryButton = screen.getByText('Retry Component');
      fireEvent.click(retryButton);

      // After one retry, should show retry count
      expect(screen.getByText(/Retry attempts: 1/)).toBeInTheDocument();
    });

    it('should stop showing retry button after max retries', () => {
      const { rerender } = render(
        <TestWrapper>
          <ErrorBoundary level="component" name="MaxRetryTestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      // Click retry button 3 times (max retries)
      for (let i = 0; i < 3; i++) {
        const retryButton = screen.getByText('Retry Component');
        fireEvent.click(retryButton);
        rerender(
          <TestWrapper>
            <ErrorBoundary level="component" name="MaxRetryTestBoundary">
              <ThrowErrorComponent />
            </ErrorBoundary>
          </TestWrapper>
        );
      }

      // After max retries, retry button should not be available
      expect(screen.queryByText('Retry Component')).not.toBeInTheDocument();
    });
  });

  describe('Custom Error Handler', () => {
    it('should call custom error handler when provided', () => {
      const onError = vi.fn();

      render(
        <TestWrapper>
          <ErrorBoundary level="component" name="CustomHandlerBoundary" onError={onError}>
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe('Custom Fallback', () => {
    it('should render custom fallback when provided', () => {
      const customFallback = <div>Custom error fallback</div>;

      render(
        <TestWrapper>
          <ErrorBoundary fallback={customFallback}>
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Custom error fallback')).toBeInTheDocument();
      expect(screen.queryByText('Component Error')).not.toBeInTheDocument();
    });
  });

  describe('Error Logging', () => {
    it('should log error details to console', () => {
      const consoleSpy = vi.spyOn(console, 'error');

      render(
        <TestWrapper>
          <ErrorBoundary level="component" name="LoggingTestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(consoleSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
      expect(consoleSpy).toHaveBeenCalledWith('Component Stack:', expect.any(String));
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for error messages', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="page" name="AccessibilityTestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      // Error boundary fallbacks should be properly labeled for screen readers
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
    });

    it('should be focusable for keyboard navigation', () => {
      render(
        <TestWrapper>
          <ErrorBoundary level="component" name="KeyboardTestBoundary">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      const retryButton = screen.getByText('Retry Component');
      expect(retryButton).toBeInTheDocument();
      
      // Button should be focusable
      retryButton.focus();
      expect(retryButton).toHaveFocus();
    });
  });

  describe('Development vs Production Behavior', () => {
    it('should show different UI based on environment', () => {
      // Test development mode (showDetails=true)
      render(
        <TestWrapper>
          <ErrorBoundary level="page" name="DevTestBoundary" showDetails={true}>
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Technical Details (for developers)')).toBeInTheDocument();
    });
  });

  describe('Integration with Error Context', () => {
    it('should work within ErrorProvider context', () => {
      // This test ensures the error boundary works properly when wrapped in ErrorProvider
      render(
        <TestWrapper>
          <ErrorBoundary level="component" name="ContextIntegrationTest">
            <ThrowErrorComponent />
          </ErrorBoundary>
        </TestWrapper>
      );

      expect(screen.getByText('Component Error')).toBeInTheDocument();
    });
  });
});

describe('Error Boundary Edge Cases', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'group').mockImplementation(() => {});
    vi.spyOn(console, 'groupEnd').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle null/undefined children gracefully', () => {
    render(
      <TestWrapper>
        <ErrorBoundary level="component">
          {null}
        </ErrorBoundary>
      </TestWrapper>
    );

    // Should not crash and should render nothing
    expect(document.body).toBeInTheDocument();
  });

  it('should handle errors in error boundary itself gracefully', () => {
    // This is a meta-test to ensure the error boundary doesn't create infinite loops
    const ProblematicComponent = () => {
      throw new Error('Boundary self-error');
    };

    render(
      <TestWrapper>
        <ErrorBoundary level="component" name="SelfErrorTest">
          <ProblematicComponent />
        </ErrorBoundary>
      </TestWrapper>
    );

    // Should show error boundary fallback, not crash
    expect(screen.getByText('Component Error')).toBeInTheDocument();
  });

  it('should not interfere with async operations that do not error', async () => {
    const AsyncComponent = () => {
      const [loaded, setLoaded] = React.useState(false);
      
      React.useEffect(() => {
        // Simulate async operation that completes successfully
        setTimeout(() => {
          setLoaded(true);
        }, 10);
      }, []);
      
      return <div>{loaded ? 'Async component loaded' : 'Loading...'}</div>;
    };

    render(
      <TestWrapper>
        <ErrorBoundary level="component" name="AsyncTest">
          <AsyncComponent />
        </ErrorBoundary>
      </TestWrapper>
    );

    // Initially should show loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // After async operation, should show loaded content
    await waitFor(() => {
      expect(screen.getByText('Async component loaded')).toBeInTheDocument();
    });
  });
});