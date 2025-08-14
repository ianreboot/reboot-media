import React, { Suspense, lazy } from 'react';
import { ComponentLoadingSpinner } from './LoadingComponents';
import ErrorBoundary from './ErrorBoundary';

// Lazy load the heavy PricingCards component with Swiper
const PricingCardsComponent = lazy(() => import('./PricingCards'));

const LazyPricingCards: React.FC = () => {
  return (
    <ErrorBoundary 
      level="component" 
      name="PricingCardsLazyLoad"
      fallback={
        <div className="text-center py-12">
          <p className="text-gray-600">Unable to load pricing information</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Refresh to try again
          </button>
        </div>
      }
    >
      <Suspense fallback={<ComponentLoadingSpinner />}>
        <PricingCardsComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyPricingCards;