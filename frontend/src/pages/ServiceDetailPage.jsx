import { Link, Navigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import PageMeta from '../seo/PageMeta';
import { getServiceBySlug } from '../data/serviceDetails';
import { Badge, Button } from '../components/ui';
import CTASection from '../components/sections/CTASection';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      <PageMeta title={service.title} description={service.metaDescription} path={`/services/${service.slug}`} />
      <section className="bg-charcoal-950 py-20 sm:py-28">
        <div className="section max-w-3xl">
          <Badge>{service.shortTitle}</Badge>
          <h1 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg text-white/60">{service.tagline}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-charcoal-800/40 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">The problem</p>
              <p className="mt-3 text-sm leading-6 text-white/70">{service.problem}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-charcoal-800/40 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">What you get</p>
              <p className="mt-3 text-sm leading-6 text-white/70">{service.outcome}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">What&rsquo;s included</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-white/75">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-purple" /> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button as={Link} to="/contact" showArrow>
              Book a Strategy Call
            </Button>
            <Button as={Link} to="/services" variant="secondary">
              All services
            </Button>
          </div>
        </div>
      </section>
      <CTASection
        title={`Ready to talk about ${service.shortTitle.toLowerCase()}?`}
        secondary={{ label: 'View our work', to: '/work' }}
      />
    </>
  );
}
