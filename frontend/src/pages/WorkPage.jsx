import { useOutletContext } from 'react-router-dom';
import PageMeta from '../seo/PageMeta';
import PortfolioGrid from '../components/sections/PortfolioGrid';
import CTASection from '../components/sections/CTASection';

export default function WorkPage() {
  const { content, contentLoading } = useOutletContext();
  return (
    <>
      <PageMeta
        title="Work"
        description="A look at the Shopify stores, custom websites, and web applications Scalora has delivered."
        path="/work"
      />
      <div className="pt-8" />
      <PortfolioGrid projects={content.projects} loading={contentLoading} showFilters />
      <CTASection title="Have a project in mind?" secondary={{ label: 'See our services', to: '/services' }} />
    </>
  );
}
