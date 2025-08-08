import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import MarketingPsychology from './pages/MarketingPsychology';
import UnawareStageCustomers from './pages/UnawareStageCustomers';
import ProblemAwareStageCustomers from './pages/ProblemAwareStageCustomers';
import SolutionAwareStageCustomers from './pages/SolutionAwareStageCustomers';
import ProductAwareStageCustomers from './pages/ProductAwareStageCustomers';
import MostAwareStageCustomers from './pages/MostAwareStageCustomers';
import GrowthPlateauSolutions from './pages/GrowthPlateauSolutions';
import RevenueCeilingBreakthrough from './pages/RevenueCeilingBreakthrough';
import CustomerAcquisitionStall from './pages/CustomerAcquisitionStall';
import MarketExpansionBarriers from './pages/MarketExpansionBarriers';
import OperationalScalingCrisis from './pages/OperationalScalingCrisis';
import TeamGrowthBottlenecks from './pages/TeamGrowthBottlenecks';
import ProductMarketFitErosion from './pages/ProductMarketFitErosion';
import CompetitivePressurePlateau from './pages/CompetitivePressurePlateau';
import FractionalCMOGuide from './pages/FractionalCMOGuide';
import FractionalCMOVsAgency from './pages/FractionalCMOVsAgency';
import FractionalCMOVsFullTime from './pages/FractionalCMOVsFullTime';
import FractionalCMOVsConsultant from './pages/FractionalCMOVsConsultant';
import FractionalCMOVsInHouse from './pages/FractionalCMOVsInHouse';
import TransitionStrategies from './pages/TransitionStrategies';
import WhenToChooseEach from './pages/WhenToChooseEach';
import CostROIAnalysis from './pages/CostROIAnalysis';
import ScrollToTop from './components/ScrollToTop';
import { LeadFormProvider } from './contexts/LeadFormContext';
import LeadForm from './components/LeadForm';

const Router = () => {
  // Determine base path based on environment
  const basename = import.meta.env.MODE === 'development' ? '/reboot' : '';

  return (
    <BrowserRouter basename={basename}>
      <LeadFormProvider>
        <ScrollToTop />
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
        <LeadForm />
      </LeadFormProvider>
    </BrowserRouter>
  );
};

export default Router;