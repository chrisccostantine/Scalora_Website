import { Link } from 'react-router-dom';
import { Button } from '../ui';

export default function CTASection({
  title = 'Ready to put growth, creative, and technology under one team?',
  description = 'Tell us what you are building. We will reply with next steps, not a generic sales pitch.',
  primary = { label: 'Book a Strategy Call', to: '/contact' },
  secondary
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal-900 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-brand-gradient-soft" />
      <div className="section text-center">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/60">{description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button as={Link} to={primary.to} showArrow>
            {primary.label}
          </Button>
          {secondary && (
            <Button as={Link} to={secondary.to} variant="secondary">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
