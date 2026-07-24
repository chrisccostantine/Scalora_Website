import { SectionHeader } from '../ui';

export default function TestimonialGrid({ testimonials }) {
  if (!testimonials?.length) return null;
  return (
    <section className="bg-charcoal-900 py-20 sm:py-28">
      <div className="section">
        <SectionHeader eyebrow="Feedback" title="What it's like working with Scalora." align="center" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.id} className="glass-panel rounded-2xl p-6">
              <blockquote className="text-sm leading-7 text-white/70">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-6">
                <p className="font-bold text-white">{item.clientName}</p>
                <p className="text-sm text-white/45">{item.company}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
