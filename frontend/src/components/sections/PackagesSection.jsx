import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { pricedPackages, engagementModels } from '../../data/packages';
import { Button, SectionHeader } from '../ui';

export default function PackagesSection() {
  return (
    <section className="bg-charcoal-900 py-20 sm:py-28">
      <div className="section">
        <SectionHeader
          eyebrow="Packages"
          title="Starting points, not one-size-fits-all pricing."
          description="Every engagement is scoped to the business — these are the starting points we quote from most often."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricedPackages.map((pkg) => (
            <div key={pkg.title} className="glass-panel flex flex-col rounded-2xl p-7">
              <p className="text-base font-bold text-white">{pkg.title}</p>
              <p className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-white">${pkg.price}</span>
                <span className="text-sm font-semibold text-white/45">{pkg.period}</span>
              </p>
              <p className="mt-3 text-sm leading-6 text-white/55">{pkg.description}</p>
              <ul className="mt-5 grid flex-1 gap-2.5">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand-purple" /> {feature}
                  </li>
                ))}
              </ul>
              <Button as={Link} to="/contact" variant="secondary" className="mt-6">
                Starting from ${pkg.price}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {engagementModels.map((model) => (
            <div key={model.title} className="rounded-2xl border border-white/10 p-6">
              <p className="font-bold text-white">{model.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/55">{model.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button as={Link} to="/contact" showArrow>
            Request a proposal
          </Button>
        </div>
      </div>
    </section>
  );
}
