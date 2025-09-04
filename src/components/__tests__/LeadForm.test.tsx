import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { LeadFormProvider, useLeadForm } from '../../contexts/LeadFormContext';
import LeadForm from '../LeadForm';

// Mock fetch for form submission
global.fetch = vi.fn();

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const { setShowDropdownForm } = useLeadForm();
  
  return (
    <div>
      <button 
        data-testid="show-form" 
        onClick={() => setShowDropdownForm(true)}
      >
        Show Form
      </button>
      {children}
    </div>
  );
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <LeadFormProvider>
      <TestWrapper>
        {component}
      </TestWrapper>
    </LeadFormProvider>
  );
};

describe('LeadForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: { message: 'Success' } })
    });
  });

  describe('Form Rendering', () => {
    it('does not render when showDropdownForm is false', () => {
      const { container } = renderWithProvider(<LeadForm />);
      expect(container.firstChild).toBeNull();
    });

    it('renders modal when form is shown', () => {
      renderWithProvider(<LeadForm />);
      
      // Click button to show form
      fireEvent.click(screen.getByTestId('show-form'));
      
      expect(screen.getByText(/Is Your Marketing.*Keeping You.*Up at Night/)).toBeInTheDocument();
    });

    it('displays all form steps', () => {
      renderWithProvider(<LeadForm />);
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      // Step 1 should be visible
      expect(screen.getByText(/Is Your Marketing.*Keeping You.*Up at Night/)).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('validates email format', async () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      // Navigate to email step
      const challengeOption = screen.getByText(/Revenue/);
      fireEvent.click(challengeOption);
      
      const nextButton = screen.getByText('Next Step');
      fireEvent.click(nextButton);
      
      // Enter invalid email
      const emailInput = screen.getByLabelText(/Email/);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      
      const submitButton = screen.getByText(/Continue/);
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid email address/)).toBeInTheDocument();
      });
    });

    it('requires all required fields', async () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      // Try to submit without filling required fields
      const challengeOption = screen.getByText(/Revenue/);
      fireEvent.click(challengeOption);
      
      const nextButton = screen.getByText('Next Step');
      fireEvent.click(nextButton);
      
      // Enter only email, skip other required fields
      const emailInput = screen.getByLabelText(/Email/);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      
      const continueButton = screen.getByText(/Continue/);
      fireEvent.click(continueButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Please fill in all required fields/)).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('submits form successfully', async () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      // Fill out form completely
      const challengeOption = screen.getByText(/Revenue/);
      fireEvent.click(challengeOption);
      
      const nextButton = screen.getByText('Next Step');
      fireEvent.click(nextButton);
      
      // Fill step 2
      const emailInput = screen.getByLabelText(/Email/);
      const nameInput = screen.getByLabelText(/Name/);
      const companyInput = screen.getByLabelText(/Company/);
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(companyInput, { target: { value: 'Test Company' } });
      
      const continueButton = screen.getByText(/Continue/);
      fireEvent.click(continueButton);
      
      // Fill step 3
      const timelineOption = screen.getByText(/Immediately/);
      fireEvent.click(timelineOption);
      
      const websiteInput = screen.getByLabelText(/Website/);
      fireEvent.change(websiteInput, { target: { value: 'https://example.com' } });
      
      const submitButton = screen.getByText(/Get My Strategy/);
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/forms/lead'),
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('test@example.com')
          })
        );
      });
    });

    it('handles submission errors gracefully', async () => {
      (fetch as vi.Mock).mockRejectedValue(new Error('Network error'));
      
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      // Fill out form and submit
      const challengeOption = screen.getByText(/Revenue/);
      fireEvent.click(challengeOption);
      
      const nextButton = screen.getByText('Next Step');
      fireEvent.click(nextButton);
      
      const emailInput = screen.getByLabelText(/Email/);
      const nameInput = screen.getByLabelText(/Name/);
      const companyInput = screen.getByLabelText(/Company/);
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(companyInput, { target: { value: 'Test Company' } });
      
      const continueButton = screen.getByText(/Continue/);
      fireEvent.click(continueButton);
      
      const timelineOption = screen.getByText(/Immediately/);
      fireEvent.click(timelineOption);
      
      const submitButton = screen.getByText(/Get My Strategy/);
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
      });
    });
  });

  describe('Form Navigation', () => {
    it('allows navigation between steps', () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      // Step 1
      expect(screen.getByText(/What's your primary challenge/)).toBeInTheDocument();
      
      const challengeOption = screen.getByText(/Revenue/);
      fireEvent.click(challengeOption);
      
      const nextButton = screen.getByText('Next Step');
      fireEvent.click(nextButton);
      
      // Step 2
      expect(screen.getByText(/Let's get your strategy/)).toBeInTheDocument();
      
      // Go back
      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);
      
      // Should be back to step 1
      expect(screen.getByText(/What's your primary challenge/)).toBeInTheDocument();
    });

    it('closes form when close button is clicked', () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      expect(screen.getByText(/What's your primary challenge/)).toBeInTheDocument();
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      expect(screen.queryByText(/What's your primary challenge/)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      // Check for proper labeling
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('traps focus within modal', () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
      
      // Should focus first interactive element
      const firstButton = screen.getByText(/Revenue/);
      expect(document.activeElement).toBe(firstButton);
    });
  });

  describe('Form Psychology Optimization', () => {
    it('follows 4-field maximum for lead capture', () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      // Navigate to final step
      const challengeOption = screen.getByText(/Revenue/);
      fireEvent.click(challengeOption);
      
      const nextButton = screen.getByText('Next Step');
      fireEvent.click(nextButton);
      
      // Count essential fields in step 2 (should be ≤4)
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBeLessThanOrEqual(4);
    });

    it('displays privacy assurance', () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      const challengeOption = screen.getByText(/Revenue/);
      fireEvent.click(challengeOption);
      
      const nextButton = screen.getByText('Next Step');
      fireEvent.click(nextButton);
      
      // Check for privacy assurance
      expect(screen.getByText(/We don't sell your information/)).toBeInTheDocument();
    });

    it('uses value exchange language in CTA', () => {
      renderWithProvider(
        <div>
          <button data-testid="show-form">Show Form</button>
          <LeadForm />
        </div>
      );
      
      fireEvent.click(screen.getByTestId('show-form'));
      
      const challengeOption = screen.getByText(/Revenue/);
      fireEvent.click(challengeOption);
      
      const nextButton = screen.getByText('Next Step');
      fireEvent.click(nextButton);
      
      const continueButton = screen.getByText(/Continue/);
      fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/Company/), { target: { value: 'Test Company' } });
      fireEvent.click(continueButton);
      
      // Final CTA should use value exchange language
      expect(screen.getByText(/Get My Strategy/)).toBeInTheDocument();
    });
  });
});