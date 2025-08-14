import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import NotificationSystem from './components/NotificationSystem';
import { ErrorProvider } from './contexts/ErrorContext';

// ALL pages are now lazy-loaded for optimal code splitting
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

// Lazy-loaded page chunks for code splitting
const MarketingPsychology = lazy(() => import('./pages/MarketingPsychology'));
const UnawareStageCustomers = lazy(() => import('./pages/UnawareStageCustomers'));
const ProblemAwareStageCustomers = lazy(() => import('./pages/ProblemAwareStageCustomers'));
const SolutionAwareStageCustomers = lazy(() => import('./pages/SolutionAwareStageCustomers'));
const ProductAwareStageCustomers = lazy(() => import('./pages/ProductAwareStageCustomers'));
const MostAwareStageCustomers = lazy(() => import('./pages/MostAwareStageCustomers'));

const GrowthPlateauSolutions = lazy(() => import('./pages/GrowthPlateauSolutions'));
const RevenueCeilingBreakthrough = lazy(() => import('./pages/RevenueCeilingBreakthrough'));
const CustomerAcquisitionStall = lazy(() => import('./pages/CustomerAcquisitionStall'));
const MarketExpansionBarriers = lazy(() => import('./pages/MarketExpansionBarriers'));
const OperationalScalingCrisis = lazy(() => import('./pages/OperationalScalingCrisis'));
const TeamGrowthBottlenecks = lazy(() => import('./pages/TeamGrowthBottlenecks'));
const ProductMarketFitErosion = lazy(() => import('./pages/ProductMarketFitErosion'));
const CompetitivePressurePlateau = lazy(() => import('./pages/CompetitivePressurePlateau'));

const FractionalCMOGuide = lazy(() => import('./pages/FractionalCMOGuide'));
const FractionalCMOVsAgency = lazy(() => import('./pages/FractionalCMOVsAgency'));
const FractionalCMOVsFullTime = lazy(() => import('./pages/FractionalCMOVsFullTime'));
const FractionalCMOVsConsultant = lazy(() => import('./pages/FractionalCMOVsConsultant'));
const FractionalCMOVsInHouse = lazy(() => import('./pages/FractionalCMOVsInHouse'));
const TransitionStrategies = lazy(() => import('./pages/TransitionStrategies'));
const WhenToChooseEach = lazy(() => import('./pages/WhenToChooseEach'));
const CostROIAnalysis = lazy(() => import('./pages/CostROIAnalysis'));
import ScrollToTop from './components/ScrollToTop';
import { LeadFormProvider } from './contexts/LeadFormContext';
import LeadForm from './components/LeadForm';
import { PageLoadingSpinner, LazyLoadErrorFallback } from './components/LoadingComponents';

// Analytics dashboards removed - were making 404 API calls to over-engineered endpoints

const Router = () => {
  // Determine base path based on environment
  const basename = import.meta.env.MODE === 'development' ? '/reboot' : '';

  return (
    <ErrorProvider enableErrorReporting={true}>
      <ErrorBoundary 
        level="page" 
        name="ApplicationRootBoundary"
        showDetails={import.meta.env.DEV}
      >
        <BrowserRouter basename={basename}>
          <LeadFormProvider>
            <ScrollToTop />
            
            {/* Main application with router-level error boundary */}
            <ErrorBoundary 
              level="page" 
              name="RouterBoundary"
              showDetails={import.meta.env.DEV}
            >
              <Suspense 
                fallback={
                  <ErrorBoundary 
                    level="component" 
                    name="LoadingSpinnerBoundary"
                    fallback={<LazyLoadErrorFallback />}
                  >
                    <PageLoadingSpinner />
                  </ErrorBoundary>
                }
              >
                <Routes>
                  {/* Wrap each route with page-level error boundaries */}
                  <Route 
                    path="/" 
                    element={
                      <ErrorBoundary level="page" name="HomePage">
                        <App />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/about" 
                    element={
                      <ErrorBoundary level="page" name="AboutPage">
                        <About />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/contact" 
                    element={
                      <ErrorBoundary level="page" name="ContactPage">
                        <Contact />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/privacy" 
                    element={
                      <ErrorBoundary level="page" name="PrivacyPage">
                        <Privacy />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/terms" 
                    element={
                      <ErrorBoundary level="page" name="TermsPage">
                        <Terms />
                      </ErrorBoundary>
                    } 
                  />
                  
                  {/* Marketing Psychology Routes */}
                  <Route 
                    path="/marketing-psychology" 
                    element={
                      <ErrorBoundary level="page" name="MarketingPsychologyPage">
                        <MarketingPsychology />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/marketing-psychology/unaware-stage-customers" 
                    element={
                      <ErrorBoundary level="page" name="UnawareStageCustomersPage">
                        <UnawareStageCustomers />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/marketing-psychology/problem-aware-stage-customers" 
                    element={
                      <ErrorBoundary level="page" name="ProblemAwareStageCustomersPage">
                        <ProblemAwareStageCustomers />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/marketing-psychology/solution-aware-stage-customers" 
                    element={
                      <ErrorBoundary level="page" name="SolutionAwareStageCustomersPage">
                        <SolutionAwareStageCustomers />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/marketing-psychology/product-aware-stage-customers" 
                    element={
                      <ErrorBoundary level="page" name="ProductAwareStageCustomersPage">
                        <ProductAwareStageCustomers />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/marketing-psychology/most-aware-stage-customers" 
                    element={
                      <ErrorBoundary level="page" name="MostAwareStageCustomersPage">
                        <MostAwareStageCustomers />
                      </ErrorBoundary>
                    } 
                  />
                  
                  {/* Growth Plateau Solutions Routes */}
                  <Route 
                    path="/growth-plateau-solutions" 
                    element={
                      <ErrorBoundary level="page" name="GrowthPlateauSolutionsPage">
                        <GrowthPlateauSolutions />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/growth-plateau-solutions/revenue-ceiling-breakthrough" 
                    element={
                      <ErrorBoundary level="page" name="RevenueCeilingBreakthroughPage">
                        <RevenueCeilingBreakthrough />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/growth-plateau-solutions/customer-acquisition-stall" 
                    element={
                      <ErrorBoundary level="page" name="CustomerAcquisitionStallPage">
                        <CustomerAcquisitionStall />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/growth-plateau-solutions/market-expansion-barriers" 
                    element={
                      <ErrorBoundary level="page" name="MarketExpansionBarriersPage">
                        <MarketExpansionBarriers />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/growth-plateau-solutions/operational-scaling-crisis" 
                    element={
                      <ErrorBoundary level="page" name="OperationalScalingCrisisPage">
                        <OperationalScalingCrisis />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/growth-plateau-solutions/team-growth-bottlenecks" 
                    element={
                      <ErrorBoundary level="page" name="TeamGrowthBottlenecksPage">
                        <TeamGrowthBottlenecks />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/growth-plateau-solutions/product-market-fit-erosion" 
                    element={
                      <ErrorBoundary level="page" name="ProductMarketFitErosionPage">
                        <ProductMarketFitErosion />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/growth-plateau-solutions/competitive-pressure-plateau" 
                    element={
                      <ErrorBoundary level="page" name="CompetitivePressurePlateauPage">
                        <CompetitivePressurePlateau />
                      </ErrorBoundary>
                    } 
                  />
                  
                  {/* Fractional CMO Guide Routes */}
                  <Route 
                    path="/fractional-cmo-guide" 
                    element={
                      <ErrorBoundary level="page" name="FractionalCMOGuidePage">
                        <FractionalCMOGuide />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/fractional-cmo-guide/vs-marketing-agency" 
                    element={
                      <ErrorBoundary level="page" name="FractionalCMOVsAgencyPage">
                        <FractionalCMOVsAgency />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/fractional-cmo-guide/vs-full-time-cmo" 
                    element={
                      <ErrorBoundary level="page" name="FractionalCMOVsFullTimePage">
                        <FractionalCMOVsFullTime />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/fractional-cmo-guide/vs-consultant" 
                    element={
                      <ErrorBoundary level="page" name="FractionalCMOVsConsultantPage">
                        <FractionalCMOVsConsultant />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/fractional-cmo-guide/vs-in-house-team" 
                    element={
                      <ErrorBoundary level="page" name="FractionalCMOVsInHousePage">
                        <FractionalCMOVsInHouse />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/fractional-cmo-guide/transition-strategies" 
                    element={
                      <ErrorBoundary level="page" name="TransitionStrategiesPage">
                        <TransitionStrategies />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/fractional-cmo-guide/when-to-choose-each" 
                    element={
                      <ErrorBoundary level="page" name="WhenToChooseEachPage">
                        <WhenToChooseEach />
                      </ErrorBoundary>
                    } 
                  />
                  <Route 
                    path="/fractional-cmo-guide/cost-roi-analysis" 
                    element={
                      <ErrorBoundary level="page" name="CostROIAnalysisPage">
                        <CostROIAnalysis />
                      </ErrorBoundary>
                    } 
                  />
                  
                  {/* Analytics Dashboard Routes - removed over-engineered monitoring */}
                </Routes>
              </Suspense>
            </ErrorBoundary>
            
            {/* Global components with error boundaries */}
            <ErrorBoundary level="component" name="LeadFormBoundary">
              <LeadForm />
            </ErrorBoundary>
            
          </LeadFormProvider>
        </BrowserRouter>
        
        {/* Notification system - outside router to persist across navigation */}
        <NotificationSystem />
        
      </ErrorBoundary>
    </ErrorProvider>
  );
};

export default Router;