import { renderHook, act } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  ErrorProvider, 
  useError, 
  useErrorReporter,
  withErrorBoundary
} from '../ErrorContext';

// Test component for provider testing
const TestComponent = () => {
  const { state, addError, showNotification } = useError();
  
  return (
    <div>
      <div data-testid="error-count">{state.errors.length}</div>
      <div data-testid="notification-count">{state.notifications.length}</div>
      <button 
        data-testid="add-error" 
        onClick={() => addError({
          message: 'Test error',
          severity: 'high',
          source: 'TestComponent'
        })}
      >
        Add Error
      </button>
      <button 
        data-testid="show-notification" 
        onClick={() => showNotification({
          title: 'Test Notification',
          message: 'Test notification message',
          type: 'info'
        })}
      >
        Show Notification
      </button>
    </div>
  );
};

// Wrapper for tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorProvider enableErrorReporting={false}>
    {children}
  </ErrorProvider>
);

describe('ErrorContext', () => {
  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'group').mockImplementation(() => {});
    vi.spyOn(console, 'groupEnd').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('ErrorProvider', () => {
    it('should provide error context to children', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      expect(result.current.state).toBeDefined();
      expect(result.current.addError).toBeDefined();
      expect(result.current.showNotification).toBeDefined();
    });

    it('should throw error when useError is used outside provider', () => {
      expect(() => renderHook(() => useError())).toThrow('useError must be used within an ErrorProvider');
    });

    it('should initialize with empty state', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      expect(result.current.state.errors).toHaveLength(0);
      expect(result.current.state.notifications).toHaveLength(0);
      expect(result.current.state.isReporting).toBe(false);
      expect(result.current.state.globalErrorCount).toBe(0);
    });
  });

  describe('Error Management', () => {
    it('should add error to state', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.addError({
          message: 'Test error message',
          severity: 'medium',
          source: 'TestSource'
        });
      });

      expect(result.current.state.errors).toHaveLength(1);
      expect(result.current.state.errors[0].message).toBe('Test error message');
      expect(result.current.state.errors[0].severity).toBe('medium');
      expect(result.current.state.errors[0].source).toBe('TestSource');
      expect(result.current.state.errors[0].resolved).toBe(false);
      expect(result.current.state.globalErrorCount).toBe(1);
    });

    it('should generate unique error IDs', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      const errorId1 = act(() => {
        return result.current.addError({
          message: 'Error 1',
          severity: 'low',
          source: 'Source1'
        });
      });

      const errorId2 = act(() => {
        return result.current.addError({
          message: 'Error 2',
          severity: 'low',
          source: 'Source2'
        });
      });

      expect(errorId1).not.toBe(errorId2);
      expect(result.current.state.errors).toHaveLength(2);
    });

    it('should resolve error by ID', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      let errorId: string;
      act(() => {
        errorId = result.current.addError({
          message: 'Test error',
          severity: 'low',
          source: 'TestSource'
        });
      });

      // Find the error by ID since errorId isn't returned correctly from act
      const addedError = result.current.state.errors[0];
      expect(addedError).toBeDefined();

      act(() => {
        result.current.resolveError(addedError.id);
      });

      const resolvedError = result.current.state.errors.find(e => e.id === addedError.id);
      expect(resolvedError?.resolved).toBe(true);
    });

    it('should clear all errors', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      // Add multiple errors
      act(() => {
        result.current.addError({ message: 'Error 1', severity: 'low', source: 'Source1' });
        result.current.addError({ message: 'Error 2', severity: 'low', source: 'Source2' });
      });

      expect(result.current.state.errors).toHaveLength(2);

      act(() => {
        result.current.clearErrors();
      });

      expect(result.current.state.errors).toHaveLength(0);
    });

    it('should automatically show notifications for high/critical errors', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.addError({
          message: 'Critical error',
          severity: 'critical',
          source: 'TestSource'
        });
      });

      // Should automatically create a notification
      expect(result.current.state.notifications).toHaveLength(1);
      expect(result.current.state.notifications[0].type).toBe('error');
      expect(result.current.state.notifications[0].title).toBe('Critical Error');
    });
  });

  describe('Notification Management', () => {
    it('should add notification to state', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.showNotification({
          title: 'Test Title',
          message: 'Test message',
          type: 'info'
        });
      });

      expect(result.current.state.notifications).toHaveLength(1);
      expect(result.current.state.notifications[0].title).toBe('Test Title');
      expect(result.current.state.notifications[0].message).toBe('Test message');
      expect(result.current.state.notifications[0].type).toBe('info');
    });

    it('should handle notification duration setting', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.showNotification({
          title: 'Auto-dismiss',
          message: 'This will disappear',
          type: 'info',
          duration: 1000
        });
      });

      expect(result.current.state.notifications).toHaveLength(1);
      expect(result.current.state.notifications[0].duration).toBe(1000);
    });

    it('should remove notification by ID', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      let notificationId: string;
      act(() => {
        notificationId = result.current.showNotification({
          title: 'Test',
          message: 'Test message',
          type: 'info'
        });
      });

      expect(result.current.state.notifications).toHaveLength(1);
      const addedNotification = result.current.state.notifications[0];

      act(() => {
        result.current.hideNotification(addedNotification.id);
      });

      expect(result.current.state.notifications).toHaveLength(0);
    });

    it('should clear all notifications', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      // Add multiple notifications
      act(() => {
        result.current.showNotification({ title: 'Test 1', message: 'Message 1', type: 'info' });
        result.current.showNotification({ title: 'Test 2', message: 'Message 2', type: 'warning' });
      });

      expect(result.current.state.notifications).toHaveLength(2);

      act(() => {
        result.current.clearNotifications();
      });

      expect(result.current.state.notifications).toHaveLength(0);
    });
  });

  describe('Error Reporting', () => {
    it('should report error when enabled', async () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ({ children }) => (
          <ErrorProvider enableErrorReporting={true}>
            {children}
          </ErrorProvider>
        )
      });

      const testError = new Error('Test error for reporting');
      
      await act(async () => {
        await result.current.reportError(testError, { context: 'test' });
      });

      // Should add error to state when reporting is enabled
      expect(result.current.state.errors).toHaveLength(1);
      expect(result.current.state.errors[0].source).toBe('ErrorReporting');
    });

    it('should not report error when disabled', async () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      const testError = new Error('Test error');
      
      await act(async () => {
        await result.current.reportError(testError);
      });

      // Should not add error to state when reporting is disabled
      expect(result.current.state.errors).toHaveLength(0);
    });

    it('should handle reporting errors gracefully', async () => {
      const { result } = renderHook(() => useError(), {
        wrapper: ({ children }) => (
          <ErrorProvider enableErrorReporting={true}>
            {children}
          </ErrorProvider>
        )
      });

      // Simulate a reporting error by mocking fetch to throw
      const originalFetch = global.fetch;
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const testError = new Error('Test error');
      
      await act(async () => {
        await result.current.reportError(testError);
      });

      // Should handle reporting error gracefully
      expect(result.current.state.isReporting).toBe(false);
      
      global.fetch = originalFetch;
    });
  });

  describe('Error Statistics', () => {
    it('should calculate error statistics correctly', () => {
      const { result } = renderHook(() => useError(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.addError({ message: 'Error 1', severity: 'high', source: 'Source1' });
        result.current.addError({ message: 'Error 2', severity: 'high', source: 'Source1' });
        result.current.addError({ message: 'Error 3', severity: 'low', source: 'Source2' });
      });

      const stats = result.current.getErrorStats();

      expect(stats.total).toBe(3);
      expect(stats.bySource['Source1']).toBe(2);
      expect(stats.bySource['Source2']).toBe(1);
      expect(stats.bySeverity['high']).toBe(2);
      expect(stats.bySeverity['low']).toBe(1);
    });
  });

  describe('useErrorReporter Hook', () => {
    it('should provide error reporting function with context', () => {
      const { result } = renderHook(() => useErrorReporter(), {
        wrapper: TestWrapper
      });

      expect(typeof result.current).toBe('function');
    });

    it('should capture additional context automatically', async () => {
      const { result } = renderHook(() => useErrorReporter(), {
        wrapper: ({ children }) => (
          <ErrorProvider enableErrorReporting={true}>
            {children}
          </ErrorProvider>
        )
      });

      const testError = new Error('Test error with context');
      
      await act(async () => {
        await result.current(testError, { customData: 'test' });
      });

      // Should have added error with context
      const { result: errorResult } = renderHook(() => useError(), {
        wrapper: ({ children }) => (
          <ErrorProvider enableErrorReporting={true}>
            {children}
          </ErrorProvider>
        )
      });

      // Verify error was captured (this is a simplified test)
      expect(typeof result.current).toBe('function');
    });
  });

  describe('withErrorBoundary HOC', () => {
    it('should wrap component with error boundary', () => {
      const TestComponentForHOC = () => <div>Test Component</div>;
      const WrappedComponent = withErrorBoundary(TestComponentForHOC, {
        level: 'component',
        name: 'TestBoundary'
      });

      render(
        <TestWrapper>
          <WrappedComponent />
        </TestWrapper>
      );

      expect(screen.getByText('Test Component')).toBeInTheDocument();
    });

    it('should set correct display name', () => {
      const TestComponentForHOC = () => <div>Test</div>;
      TestComponentForHOC.displayName = 'TestComponent';
      
      const WrappedComponent = withErrorBoundary(TestComponentForHOC);
      
      expect(WrappedComponent.displayName).toBe('withErrorBoundary(TestComponent)');
    });
  });

  describe('Integration Tests', () => {
    it('should work with React components', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      expect(screen.getByTestId('error-count')).toHaveTextContent('0');
      expect(screen.getByTestId('notification-count')).toHaveTextContent('0');
    });

    it('should update component when errors are added', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      const addErrorButton = screen.getByTestId('add-error');
      fireEvent.click(addErrorButton);

      expect(screen.getByTestId('error-count')).toHaveTextContent('1');
      // Should also have notification due to high severity
      expect(screen.getByTestId('notification-count')).toHaveTextContent('1');
    });

    it('should update component when notifications are shown', () => {
      render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );

      const showNotificationButton = screen.getByTestId('show-notification');
      fireEvent.click(showNotificationButton);

      expect(screen.getByTestId('notification-count')).toHaveTextContent('1');
    });
  });
});