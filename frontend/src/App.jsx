import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import ProcessPage from './pages/ProcessPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import { initAnalytics } from './lib/analytics';

export default function App() {
  const [admin, setAdmin] = useState(location.hash === '#admin');

  useEffect(() => {
    initAnalytics();
  }, []);

  if (admin) {
    return <AdminPage onExit={() => setAdmin(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout onAdmin={() => setAdmin(true)} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
