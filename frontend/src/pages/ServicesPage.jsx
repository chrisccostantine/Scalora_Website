import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageMeta from '../seo/PageMeta';
import { serviceCategories, serviceDetails } from '../data/serviceDetails';
import { SectionHeader } from '../components/ui';
import CTASection from '../components/sections/CTASection';

export default function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Services"
        description="Meta Ads, TikTok & Google Ads, social media management, reels production, Shopify and custom websites, web applications, and mobile app development."
        path="/services"
      />
      <section className="bg-charcoal-950 pb-8 pt-16 sm:pt-24">
        <div className="section">
          <SectionHeader
            eyebrow="Services"
            title="Every discipline a growing business needs, run by one team."
            description="Advertising, content, e-commerce, and software — grouped by what each one is built to solve."
          />
        </div>
      </section>

      {serviceCategories.map((category) => (
        <section key={category.title} className="border-t border-white/5 bg-charcoal-950 py-14">
          <div className="section">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gradient">{category.title}</p>
            <p className="mt-2 max-w-xl text-sm text-white/55">{category.description}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {category.slugs.map((slug) => {
                const service = serviceDetails.find((item) => item.slug === slug);
                if (!service) return null;
                return (
                  <Link
                    key={slug}
                    to={`/services/${slug}`}
                    className="group glass-panel flex items-center justify-between rounded-2xl p-6 transition hover:border-white/20"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white">{service.title}</h3>
                      <p className="mt-1.5 text-sm text-white/55">{service.tagline}</p>
                    </div>
                    <ArrowRight size={18} className="shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
