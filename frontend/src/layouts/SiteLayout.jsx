import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { api } from '../api/client';
import { fallbackContent } from '../data';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WhatsAppFloatingButton from '../components/layout/WhatsAppFloatingButton';

export default function SiteLayout({ onAdmin }) {
  const [content, setContent] = useState({ ...fallbackContent, projects: [] });
  const [contentLoading, setContentLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    api
      .publicContent()
      .then((data) =>
        setContent({
          brandSettings: data.brandSettings || fallbackContent.brandSettings,
          services: data.services?.length ? data.services : fallbackContent.services,
          projects: data.projects?.length ? data.projects : fallbackContent.projects,
          testimonials: data.testimonials?.length ? data.testimonials : fallbackContent.testimonials
        })
      )
      .catch(() => setContent(fallbackContent))
      .finally(() => setContentLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-charcoal-950">
      <Header onAdmin={onAdmin} brandSettings={content.brandSettings} />
      <main>
        <Outlet context={{ content, contentLoading }} />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
