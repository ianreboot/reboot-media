import { describe, it, expect } from 'vitest';
import { render, screen, renderHook, act } from '@testing-library/react';
import { LeadFormProvider, useLeadForm } from '../LeadFormContext';

describe('LeadFormContext', () => {
  describe('LeadFormProvider', () => {
    it('provides context values to children', () => {
      const TestComponent = () => {
        const { showDropdownForm } = useLeadForm();
        return <div>Form visible: {showDropdownForm.toString()}</div>;
      };

      render(
        <LeadFormProvider>
          <TestComponent />
        </LeadFormProvider>
      );

      expect(screen.getByText('Form visible: false')).toBeInTheDocument();
    });

    it('initializes showDropdownForm as false', () => {
      const { result } = renderHook(() => useLeadForm(), {
        wrapper: LeadFormProvider
      });

      expect(result.current.showDropdownForm).toBe(false);
    });
  });

  describe('useLeadForm hook', () => {
    it('throws error when used outside provider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = () => {};

      expect(() => {
        renderHook(() => useLeadForm());
      }).toThrowError('useLeadForm must be used within a LeadFormProvider');

      // Restore console.error
      console.error = originalError;
    });

    it('returns context values when used within provider', () => {
      const { result } = renderHook(() => useLeadForm(), {
        wrapper: LeadFormProvider
      });

      expect(result.current).toHaveProperty('showDropdownForm');
      expect(result.current).toHaveProperty('setShowDropdownForm');
      expect(typeof result.current.setShowDropdownForm).toBe('function');
    });

    it('updates showDropdownForm when setShowDropdownForm is called', () => {
      const { result } = renderHook(() => useLeadForm(), {
        wrapper: LeadFormProvider
      });

      expect(result.current.showDropdownForm).toBe(false);

      act(() => {
        result.current.setShowDropdownForm(true);
      });

      expect(result.current.showDropdownForm).toBe(true);

      act(() => {
        result.current.setShowDropdownForm(false);
      });

      expect(result.current.showDropdownForm).toBe(false);
    });
  });

  describe('Integration', () => {
    it('multiple components can access the same context', () => {
      const Component1 = () => {
        const { showDropdownForm } = useLeadForm();
        return <div data-testid="comp1">Component 1: {showDropdownForm.toString()}</div>;
      };

      const Component2 = () => {
        const { setShowDropdownForm } = useLeadForm();
        return (
          <button onClick={() => setShowDropdownForm(true)}>
            Show Form
          </button>
        );
      };

      render(
        <LeadFormProvider>
          <Component1 />
          <Component2 />
        </LeadFormProvider>
      );

      expect(screen.getByTestId('comp1')).toHaveTextContent('Component 1: false');

      // Click button in Component2 wrapped in act
      act(() => {
        screen.getByRole('button', { name: 'Show Form' }).click();
      });

      // Component1 should reflect the change
      expect(screen.getByTestId('comp1')).toHaveTextContent('Component 1: true');
    });
  });
});