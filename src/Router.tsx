import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

// Core pages loaded immediately
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

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

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const Router = () => {
  // Determine base path based on environment
  const basename = import.meta.env.MODE === 'development' ? '/reboot' : '';

  return (
    <BrowserRouter basename={basename}>
      <LeadFormProvider>
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/marketing-psychology" element={<MarketingPsychology />} />
            <Route path="/marketing-psychology/unaware-stage-customers" element={<UnawareStageCustomers />} />
            <Route path="/marketing-psychology/problem-aware-stage-customers" element={<ProblemAwareStageCustomers />} />
            <Route path="/marketing-psychology/solution-aware-stage-customers" element={<SolutionAwareStageCustomers />} />
            <Route path="/marketing-psychology/product-aware-stage-customers" element={<ProductAwareStageCustomers />} />
            <Route path="/marketing-psychology/most-aware-stage-customers" element={<MostAwareStageCustomers />} />
            <Route path="/growth-plateau-solutions" element={<GrowthPlateauSolutions />} />
            <Route path="/growth-plateau-solutions/revenue-ceiling-breakthrough" element={<RevenueCeilingBreakthrough />} />
            <Route path="/growth-plateau-solutions/customer-acquisition-stall" element={<CustomerAcquisitionStall />} />
            <Route path="/growth-plateau-solutions/market-expansion-barriers" element={<MarketExpansionBarriers />} />
            <Route path="/growth-plateau-solutions/operational-scaling-crisis" element={<OperationalScalingCrisis />} />
            <Route path="/growth-plateau-solutions/team-growth-bottlenecks" element={<TeamGrowthBottlenecks />} />
            <Route path="/growth-plateau-solutions/product-market-fit-erosion" element={<ProductMarketFitErosion />} />
            <Route path="/growth-plateau-solutions/competitive-pressure-plateau" element={<CompetitivePressurePlateau />} />
            <Route path="/fractional-cmo-guide" element={<FractionalCMOGuide />} />
            <Route path="/fractional-cmo-guide/vs-marketing-agency" element={<FractionalCMOVsAgency />} />
            <Route path="/fractional-cmo-guide/vs-full-time-cmo" element={<FractionalCMOVsFullTime />} />
            <Route path="/fractional-cmo-guide/vs-consultant" element={<FractionalCMOVsConsultant />} />
            <Route path="/fractional-cmo-guide/vs-in-house-team" element={<FractionalCMOVsInHouse />} />
            <Route path="/fractional-cmo-guide/transition-strategies" element={<TransitionStrategies />} />
            <Route path="/fractional-cmo-guide/when-to-choose-each" element={<WhenToChooseEach />} />
            <Route path="/fractional-cmo-guide/cost-roi-analysis" element={<CostROIAnalysis />} />
          </Routes>
        </Suspense>
        <LeadForm />
      </LeadFormProvider>
    </BrowserRouter>
  );
};

export default Router;