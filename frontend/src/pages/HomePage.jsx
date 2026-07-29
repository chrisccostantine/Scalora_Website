import { useOutletContext } from 'react-router-dom';
import PageMeta from '../seo/PageMeta';
import Hero from '../components/hero/Hero';
import TrustBar from '../components/sections/TrustBar';
import ServicesOverview from '../components/sections/ServicesOverview';
import OutcomesSection from '../components/sections/OutcomesSection';
import PortfolioGrid from '../components/sections/PortfolioGrid';
import TestimonialGrid from '../components/sections/TestimonialGrid';
import WhyScalora from '../components/sections/WhyScalora';
import ProcessSteps from '../components/sections/ProcessSteps';
import TechShowcase from '../components/sections/TechShowcase';
import PackagesSection from '../components/sections/PackagesSection';
import ReelsShowcase from '../components/sections/ReelsShowcase';
import CTASection from '../components/sections/CTASection';

export default function HomePage() {
  const { content, contentLoading } = useOutletContext();

  return (
    <>
      <PageMeta
        title="Growth & Technology Agency"
        description="Scalora runs Meta, TikTok and Google Ads, social media and content, Shopify and custom websites, and mobile and web applications for businesses in Lebanon, the Gulf, and beyond."
        path="/"
      />
      <Hero />
      <TrustBar />
      <ServicesOverview services={content.services} />
      <OutcomesSection />
      <PortfolioGrid projects={content.projects} loading={contentLoading} teaser />
      <TestimonialGrid testimonials={content.testimonials} />
      <WhyScalora />
      <ProcessSteps compact />
      <TechShowcase />
      <PackagesSection />
      <ReelsShowcase />
      <CTASection />
      <section className="border-t border-white/10 bg-charcoal-950 py-5 text-white">
        <div className="section">
          <p className="text-center text-xs leading-5 text-white/50">
            Scalora manages WhatsApp Business communications on behalf of V Shape Gym Maghdoucheh.
          </p>
        </div>
      </section>
    </>
  );
}
