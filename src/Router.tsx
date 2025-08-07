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
import FractionalCMOGuide from './pages/FractionalCMOGuide';
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
          <Route path="/fractional-cmo-guide" element={<FractionalCMOGuide />} />
        </Routes>
        <LeadForm />
      </LeadFormProvider>
    </BrowserRouter>
  );
};

export default Router;