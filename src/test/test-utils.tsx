import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider } from '../contexts/ErrorContext'
import { LeadFormProvider } from '../contexts/LeadFormContext'
import ErrorBoundary from '../components/ErrorBoundary'

// Test wrapper component that includes necessary providers
const TestProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorProvider enableErrorReporting={false}>
      <BrowserRouter>
        <LeadFormProvider>
          <ErrorBoundary level="page" name="TestBoundary" showDetails={true}>
            {children}
          </ErrorBoundary>
        </LeadFormProvider>
      </BrowserRouter>
    </ErrorProvider>
  )
}

// Custom render function that includes providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestProviders, ...options })

// Export everything
export * from '@testing-library/react'
export { customRender as render, TestProviders }