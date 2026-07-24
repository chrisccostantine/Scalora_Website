import PageMeta from '../seo/PageMeta';
import { SectionHeader } from '../components/ui';
import WhyScalora from '../components/sections/WhyScalora';
import TechShowcase from '../components/sections/TechShowcase';
import CTASection from '../components/sections/CTASection';

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About"
        description="Scalora combines performance advertising, creative content, e-commerce, and software development under one agency."
        path="/about"
      />
      <section className="bg-charcoal-950 py-20 sm:py-28">
        <div className="section max-w-3xl">
          <SectionHeader eyebrow="About Scalora" title="One agency for the marketing and the technology behind it." />
          <div className="mt-8 grid gap-5 text-base leading-8 text-white/65">
            <p>
              Most businesses end up managing an ads agency, a social media freelancer, a web developer, and a
              software vendor separately — and paying the coordination cost between all of them. Scalora runs that
              work as one team instead: the people planning the campaign are the same ones building the site the
              campaign sends traffic to.
            </p>
            <p>
              That means advertising, content, e-commerce, and product decisions stay consistent, because they&rsquo;re
              made by people who can see the whole picture — not handed off between vendors who never talk to each
              other.
            </p>
            <p>
              Scalora works with businesses in Lebanon, the Gulf, and internationally, with direct founder
              involvement on every engagement rather than an account manager relaying requests between teams.
            </p>
          </div>
        </div>
      </section>
      <WhyScalora />
      <TechShowcase />
      <CTASection />
    </>
  );
}
