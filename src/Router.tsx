import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ScrollToTop from './components/ScrollToTop';

const Router = () => {
  // Determine base path based on environment
  const basename = import.meta.env.MODE === 'development' ? '/reboot' : '';

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;