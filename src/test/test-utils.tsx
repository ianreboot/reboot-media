import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider } from '../contexts/ErrorContext'
import { LeadFormProvider } from '../contexts/LeadFormContext'
import { ABTestProvider } from '../contexts/ABTestContext'
import { ConversionOptimizationProvider } from '../contexts/ConversionOptimizationContext'
import ErrorBoundary from '../components/ErrorBoundary'

// Test wrapper component that includes all necessary providers
const TestProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorProvider enableErrorReporting={false}>
      <ABTestProvider>
        <ConversionOptimizationProvider>
          <BrowserRouter>
            <LeadFormProvider>
              <ErrorBoundary level="page" name="TestBoundary" showDetails={true}>
                {children}
              </ErrorBoundary>
            </LeadFormProvider>
          </BrowserRouter>
        </ConversionOptimizationProvider>
      </ABTestProvider>
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