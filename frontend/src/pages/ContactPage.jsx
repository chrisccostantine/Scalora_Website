import { Instagram, MessageCircle } from 'lucide-react';
import PageMeta from '../seo/PageMeta';
import { SectionHeader } from '../components/ui';
import ContactForm from '../components/forms/ContactForm';
import { whatsappLink } from '../lib/whatsapp';

export default function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Book a strategy call with Scalora, or reach out directly on WhatsApp or Instagram."
        path="/contact"
      />
      <section className="bg-charcoal-950 py-20 sm:py-28">
        <div className="section grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader eyebrow="Contact" title="Tell us what you want to build next." />
            <p className="mt-5 max-w-md text-base leading-7 text-white/60">
              Share the project type, budget range, and timeline. We reply within one business day with next steps —
              not a generic sales pitch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a
                href="https://instagram.com/scalora.agency"
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white"
              >
                <Instagram size={18} /> @scalora.agency
              </a>
            </div>
            <div className="mt-10 grid gap-4 text-sm text-white/50">
              <p>&rarr; We review the brief and reply within one business day.</p>
              <p>&rarr; If it&rsquo;s a fit, we schedule a short strategy call.</p>
              <p>&rarr; You get a scoped plan before anything is billed.</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
