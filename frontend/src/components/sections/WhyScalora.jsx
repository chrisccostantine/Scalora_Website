import { CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../ui';

const reasons = [
  ['Strategy before execution', 'Every build starts with what the business needs to happen, not a template.'],
  ['Creative and technical in one team', 'Ads, content, design, and engineering decisions stay consistent because one team owns all of them.'],
  ['Direct communication', 'You talk to the people doing the work, not an account manager relaying messages.'],
  ['Custom solutions', 'Packages are a starting point — the build is scoped around your actual business.'],
  ['Performance-focused decisions', 'Design and copy choices are made to convert, not just to look good.'],
  ['E-commerce and technology experience', 'Shopify, custom software, and marketing under one roof, not three vendors.']
];

export default function WhyScalora() {
  return (
    <section className="bg-charcoal-950 py-20 sm:py-28">
      <div className="section">
        <SectionHeader eyebrow="Why Scalora" title="One team for marketing and technology." align="center" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
          {reasons.map(([title, text]) => (
            <div key={title} className="flex gap-3 rounded-2xl border border-white/10 bg-charcoal-800/40 p-5">
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-purple" />
              <div>
                <p className="font-bold text-white">{title}</p>
                <p className="mt-1.5 text-sm leading-6 text-white/55">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
