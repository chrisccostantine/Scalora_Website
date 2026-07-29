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
      <section
        className="border-t border-white/10 bg-charcoal-950 py-10 text-white"
        aria-labelledby="client-relationship-title"
      >
        <div className="section">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-6 text-center sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Client relationship disclosure
            </p>
            <h2 id="client-relationship-title" className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
              V Shape Gym Maghdoucheh
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Scalora manages WhatsApp Business communications on behalf of V Shape Gym Maghdoucheh.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
