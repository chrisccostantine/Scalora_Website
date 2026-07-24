import { processSteps } from '../../data/process';
import { SectionHeader } from '../ui';

export default function ProcessSteps({ compact = false }) {
  return (
    <section id="process" className="bg-charcoal-900 py-20 sm:py-28">
      <div className="section">
        <SectionHeader
          eyebrow="Process"
          title="A structured process from discovery to growth."
          description={compact ? undefined : 'The same five stages apply whether the deliverable is a campaign, a store, or an application.'}
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step) => (
            <div key={step.number} className="rounded-2xl border border-white/10 bg-charcoal-800/40 p-5">
              <span className="text-sm font-black text-gradient">{step.number}</span>
              <p className="mt-3 text-base font-bold text-white">{step.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/55">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
