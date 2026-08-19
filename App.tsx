
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Checklist from './pages/Checklist';
import Agents from './pages/Agents';
import Plans from './pages/Plans';
import AutomationGuide from './pages/AutomationGuide';
import Masterclass from './pages/Masterclass';
import SectorsDetail from './pages/SectorsDetail';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/serveis" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/recursos" element={<Resources />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/contacte" element={<Contact />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/diagnostic" element={<Checklist />} />
          <Route path="/diagnostico" element={<Checklist />} />
          <Route path="/agentes-digitales" element={<Agents />} />
          <Route path="/agents-digitals" element={<Agents />} />
          <Route path="/sectors/:sectorId" element={<SectorsDetail />} />
          <Route path="/sectores/:sectorId" element={<SectorsDetail />} />
          <Route path="/planes" element={<Plans />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/recursos/guia-automatizacion" element={<AutomationGuide />} />
          <Route path="/recursos/masterclass-content-engine" element={<Masterclass />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
