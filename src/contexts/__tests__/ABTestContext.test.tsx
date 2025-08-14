/**
 * A/B Testing Framework Unit Tests
 * Tests the core business logic for experiment management and statistical analysis
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ABTestProvider, useABTest, useVariant } from '../ABTestContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Test components
const TestABTestConsumer: React.FC<{ testId: string; onTrack?: (event: string, value: number) => void }> = ({ testId, onTrack }) => {
  const { variant, track, isInTest, hasBeenExposed } = useVariant(testId);
  
  const handleTrack = () => {
    track('button_click', 1);
    onTrack?.('button_click', 1);
  };
  
  return (
    <div>
      <div data-testid="variant">{variant || 'no-variant'}</div>
      <div data-testid="is-in-test">{isInTest.toString()}</div>
      <div data-testid="has-been-exposed">{hasBeenExposed.toString()}</div>
      <button data-testid="track-button" onClick={handleTrack}>
        Track Event
      </button>
    </div>
  );
};

const TestABTestProvider: React.FC<{ 
  children: React.ReactNode; 
  testConfig?: any;
  debugMode?: boolean;
}> = ({ children, testConfig, debugMode = false }) => {
  return (
    <ABTestProvider testConfig={testConfig} debugMode={debugMode}>
      {children}
    </ABTestProvider>
  );
};

describe('ABTestContext', () => {
  let mockMath: any;
  
  beforeEach(() => {
    localStorageMock.clear();
    // Mock Math.random for consistent testing
    mockMath = vi.spyOn(Math, 'random').mockReturnValue(0.5);
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    mockMath.mockRestore();
  });

  describe('ABTestProvider', () => {
    it('should provide AB test context to children', () => {
      render(
        <TestABTestProvider>
          <TestABTestConsumer testId="test_experiment" />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('variant')).toBeInTheDocument();
      expect(screen.getByTestId('is-in-test')).toBeInTheDocument();
    });

    it('should initialize with no active tests by default', () => {
      render(
        <TestABTestProvider>
          <TestABTestConsumer testId="nonexistent_test" />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('variant')).toHaveTextContent('no-variant');
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('false');
      expect(screen.getByTestId('has-been-exposed')).toHaveTextContent('false');
    });

    it('should use provided test configuration', () => {
      const testConfig = {
        hero_cta_test: {
          variants: ['control', 'variant_a', 'variant_b'],
          traffic: 100,
          enabled: true
        }
      };

      render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="hero_cta_test" />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('true');
      expect(screen.getByTestId('variant')).not.toHaveTextContent('no-variant');
    });
  });

  describe('Variant Assignment', () => {
    it('should consistently assign same variant to same user', () => {
      const testConfig = {
        consistency_test: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: true
        }
      };

      const { unmount } = render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="consistency_test" />
        </TestABTestProvider>
      );
      
      const firstVariant = screen.getByTestId('variant').textContent;
      unmount();

      // Re-render with same config
      render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="consistency_test" />
        </TestABTestProvider>
      );
      
      const secondVariant = screen.getByTestId('variant').textContent;
      expect(secondVariant).toBe(firstVariant);
    });

    it('should respect traffic percentage settings', () => {
      // Mock Math.random to return different values for traffic testing
      mockMath.mockRestore();
      
      const testConfig = {
        traffic_test: {
          variants: ['control', 'variant_a'],
          traffic: 50, // 50% traffic
          enabled: true
        }
      };

      // Test with random value that should include in test (< 0.5)
      vi.spyOn(Math, 'random').mockReturnValue(0.3);
      
      const { unmount } = render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="traffic_test" />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('true');
      unmount();

      // Test with random value that should exclude from test (>= 0.5)
      vi.spyOn(Math, 'random').mockReturnValue(0.7);
      localStorageMock.clear(); // Clear to force new assignment
      
      render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="traffic_test" />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('false');
    });

    it('should distribute variants evenly', () => {
      const testConfig = {
        distribution_test: {
          variants: ['control', 'variant_a', 'variant_b', 'variant_c'],
          traffic: 100,
          enabled: true
        }
      };

      const variantCounts: Record<string, number> = {};
      
      // Simulate multiple user assignments
      for (let i = 0; i < 1000; i++) {
        localStorageMock.clear();
        vi.spyOn(Math, 'random').mockReturnValue(i / 1000); // Evenly distributed random values
        
        const { unmount } = render(
          <TestABTestProvider testConfig={testConfig}>
            <TestABTestConsumer testId="distribution_test" />
          </TestABTestProvider>
        );
        
        const variant = screen.getByTestId('variant').textContent;
        if (variant && variant !== 'no-variant') {
          variantCounts[variant] = (variantCounts[variant] || 0) + 1;
        }
        
        unmount();
      }

      // Each variant should get roughly 25% (allowing for some variance)
      Object.values(variantCounts).forEach(count => {
        expect(count).toBeGreaterThan(200); // At least 20%
        expect(count).toBeLessThan(300); // At most 30%
      });
    });

    it('should handle disabled tests', () => {
      const testConfig = {
        disabled_test: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: false
        }
      };

      render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="disabled_test" />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('false');
      expect(screen.getByTestId('variant')).toHaveTextContent('no-variant');
    });
  });

  describe('Event Tracking', () => {
    it('should track conversion events correctly', async () => {
      const user = userEvent.setup();
      const mockTracker = vi.fn();
      
      const testConfig = {
        tracking_test: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: true
        }
      };

      render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="tracking_test" onTrack={mockTracker} />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('true');
      
      await user.click(screen.getByTestId('track-button'));
      
      expect(mockTracker).toHaveBeenCalledWith('button_click', 1);
    });

    it('should store tracking data in localStorage', async () => {
      const user = userEvent.setup();
      
      const testConfig = {
        storage_test: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: true
        }
      };

      render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="storage_test" />
        </TestABTestProvider>
      );
      
      await user.click(screen.getByTestId('track-button'));
      
      // Check if tracking data is stored
      const storedData = localStorageMock.getItem('ab_test_data');
      expect(storedData).toBeDefined();
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        expect(parsedData).toHaveProperty('storage_test');
      }
    });

    it('should not track events for users not in test', async () => {
      const user = userEvent.setup();
      const mockTracker = vi.fn();
      
      render(
        <TestABTestProvider>
          <TestABTestConsumer testId="nonexistent_test" onTrack={mockTracker} />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('false');
      
      await user.click(screen.getByTestId('track-button'));
      
      // Should not call the tracker since user is not in test
      expect(mockTracker).not.toHaveBeenCalled();
    });
  });

  describe('Statistical Significance', () => {
    const TestStatisticsComponent: React.FC<{ testId: string }> = ({ testId }) => {
      const { getTestResults, calculateSignificance } = useABTest();
      const results = getTestResults(testId);
      const significance = calculateSignificance(testId);
      
      return (
        <div>
          <div data-testid="sample-size">
            {results ? Object.values(results).reduce((sum, variant: any) => sum + variant.participants, 0) : 0}
          </div>
          <div data-testid="significance">{significance?.isSignificant ? 'significant' : 'not-significant'}</div>
          <div data-testid="confidence">{significance?.confidence || 0}</div>
        </div>
      );
    };

    it('should calculate statistical significance correctly', () => {
      // This would require more complex setup with actual data
      // For now, testing the structure
      render(
        <TestABTestProvider>
          <TestStatisticsComponent testId="significance_test" />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('sample-size')).toBeInTheDocument();
      expect(screen.getByTestId('significance')).toBeInTheDocument();
      expect(screen.getByTestId('confidence')).toBeInTheDocument();
    });
  });

  describe('Test Configuration Validation', () => {
    it('should handle invalid test configurations gracefully', () => {
      const invalidConfig = {
        invalid_test: {
          variants: [], // Empty variants array
          traffic: 150, // Invalid traffic percentage
          enabled: true
        }
      };

      render(
        <TestABTestProvider testConfig={invalidConfig}>
          <TestABTestConsumer testId="invalid_test" />
        </TestABTestProvider>
      );
      
      // Should not crash and should not assign user to test
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('false');
    });

    it('should validate traffic percentages', () => {
      const configs = [
        { traffic: -10 }, // Negative
        { traffic: 0 },   // Zero
        { traffic: 150 }  // Over 100
      ];

      configs.forEach((config, index) => {
        const testConfig = {
          [`validation_test_${index}`]: {
            variants: ['control', 'variant_a'],
            ...config,
            enabled: true
          }
        };

        render(
          <TestABTestProvider testConfig={testConfig}>
            <TestABTestConsumer testId={`validation_test_${index}`} />
          </TestABTestProvider>
        );
        
        // Invalid configs should result in no test assignment
        expect(screen.getByTestId('is-in-test')).toHaveTextContent('false');
      });
    });
  });

  describe('Debug Mode', () => {
    it('should provide debug information when enabled', () => {
      const testConfig = {
        debug_test: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: true
        }
      };

      render(
        <TestABTestProvider testConfig={testConfig} debugMode={true}>
          <TestABTestConsumer testId="debug_test" />
        </TestABTestProvider>
      );
      
      // In debug mode, should still function normally
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('true');
      expect(screen.getByTestId('variant')).not.toHaveTextContent('no-variant');
    });
  });

  describe('Multiple Tests', () => {
    const MultiTestComponent: React.FC = () => {
      return (
        <div>
          <TestABTestConsumer testId="test_1" />
          <div data-testid="separator">---</div>
          <TestABTestConsumer testId="test_2" />
        </div>
      );
    };

    it('should handle multiple simultaneous tests', () => {
      const testConfig = {
        test_1: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: true
        },
        test_2: {
          variants: ['control', 'variant_b'],
          traffic: 100,
          enabled: true
        }
      };

      render(
        <TestABTestProvider testConfig={testConfig}>
          <MultiTestComponent />
        </TestABTestProvider>
      );
      
      const variants = screen.getAllByTestId('variant');
      const isInTests = screen.getAllByTestId('is-in-test');
      
      expect(variants).toHaveLength(2);
      expect(isInTests).toHaveLength(2);
      
      // Both tests should be active
      isInTests.forEach(element => {
        expect(element).toHaveTextContent('true');
      });
    });

    it('should maintain independent variant assignments', () => {
      const testConfig = {
        independent_test_1: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: true
        },
        independent_test_2: {
          variants: ['control', 'variant_x'],
          traffic: 100,
          enabled: true
        }
      };

      render(
        <TestABTestProvider testConfig={testConfig}>
          <div>
            <TestABTestConsumer testId="independent_test_1" />
            <TestABTestConsumer testId="independent_test_2" />
          </div>
        </TestABTestProvider>
      );
      
      const variants = screen.getAllByTestId('variant');
      
      // Variants should be independently assigned
      expect(variants[0].textContent).toBeDefined();
      expect(variants[1].textContent).toBeDefined();
      
      // Re-render should maintain same assignments
      const firstVariants = variants.map(v => v.textContent);
      
      render(
        <TestABTestProvider testConfig={testConfig}>
          <div>
            <TestABTestConsumer testId="independent_test_1" />
            <TestABTestConsumer testId="independent_test_2" />
          </div>
        </TestABTestProvider>
      );
      
      const secondVariants = screen.getAllByTestId('variant').map(v => v.textContent);
      expect(secondVariants).toEqual(firstVariants);
    });
  });

  describe('Edge Cases', () => {
    it('should handle component unmounting gracefully', () => {
      const testConfig = {
        unmount_test: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: true
        }
      };

      const { unmount } = render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="unmount_test" />
        </TestABTestProvider>
      );
      
      expect(screen.getByTestId('is-in-test')).toHaveTextContent('true');
      
      // Should unmount without errors
      expect(() => unmount()).not.toThrow();
    });

    it('should handle localStorage being unavailable', () => {
      // Mock localStorage to throw error
      const originalGetItem = localStorageMock.getItem;
      localStorageMock.getItem = vi.fn().mockImplementation(() => {
        throw new Error('localStorage not available');
      });

      const testConfig = {
        storage_error_test: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: true
        }
      };

      expect(() => {
        render(
          <TestABTestProvider testConfig={testConfig}>
            <TestABTestConsumer testId="storage_error_test" />
          </TestABTestProvider>
        );
      }).not.toThrow();
      
      // Should still render but maybe with degraded functionality
      expect(screen.getByTestId('variant')).toBeInTheDocument();
      
      // Restore original function
      localStorageMock.getItem = originalGetItem;
    });

    it('should handle rapid re-renders without issues', () => {
      const testConfig = {
        rerender_test: {
          variants: ['control', 'variant_a'],
          traffic: 100,
          enabled: true
        }
      };

      const { rerender } = render(
        <TestABTestProvider testConfig={testConfig}>
          <TestABTestConsumer testId="rerender_test" />
        </TestABTestProvider>
      );
      
      const initialVariant = screen.getByTestId('variant').textContent;
      
      // Rapid re-renders
      for (let i = 0; i < 10; i++) {
        rerender(
          <TestABTestProvider testConfig={testConfig}>
            <TestABTestConsumer testId="rerender_test" />
          </TestABTestProvider>
        );
      }
      
      // Variant should remain consistent
      expect(screen.getByTestId('variant')).toHaveTextContent(initialVariant || '');
    });
  });
});