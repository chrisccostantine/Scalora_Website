import { techCategories } from '../../data/techStack';
import { SectionHeader } from '../ui';

export default function TechShowcase() {
  return (
    <section className="bg-charcoal-950 py-20 sm:py-28">
      <div className="section">
        <SectionHeader eyebrow="Platforms & technology" title="Tools we actually build with." align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {techCategories.map((category) => (
            <div key={category.title} className="rounded-2xl border border-white/10 bg-charcoal-800/40 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">{category.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {category.items.map((item) => (
                  <li key={item} className="text-sm font-semibold text-white/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
