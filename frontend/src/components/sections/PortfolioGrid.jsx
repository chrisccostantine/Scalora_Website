import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, SectionHeader } from '../ui';

function ProjectCard({ project }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal-800/60 shadow-card transition duration-300 hover:-translate-y-1 hover:border-white/20">
      {project.imageUrl && <img className="h-52 w-full object-cover" src={project.imageUrl} alt={project.title} loading="lazy" />}
      <div className="p-6">
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/60">
          {project.category}
        </span>
        <h3 className="mt-4 text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-2.5 text-sm leading-6 text-white/55">{project.summary}</p>
      </div>
    </article>
  );
}

export default function PortfolioGrid({ projects, loading, teaser = false, showFilters = false }) {
  const [category, setCategory] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [projects]);
  const visible = useMemo(() => {
    const list = category === 'All' ? projects : projects.filter((p) => p.category === category);
    return teaser ? list.slice(0, 3) : list;
  }, [projects, category, teaser]);

  return (
    <section id="work" className="bg-charcoal-950 py-20 sm:py-28">
      <div className="section">
        <SectionHeader
          eyebrow="Portfolio"
          title="Project formats Scalora delivers for real business needs."
          action={
            teaser ? (
              <Button as={Link} to="/work" variant="secondary" showArrow className="shrink-0">
                View all work
              </Button>
            ) : undefined
          }
        />

        {showFilters && (
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`focus-ring rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                  category === item
                    ? 'border-transparent bg-brand-gradient text-white'
                    : 'border-white/10 text-white/50 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {loading && projects.length === 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal-800/60">
                <div className="h-52 animate-pulse bg-white/5" />
                <div className="space-y-4 p-6">
                  <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                  <div className="h-7 w-3/4 animate-pulse rounded bg-white/5" />
                  <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mt-10 md:hidden">
              <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
                {visible.map((project) => (
                  <div key={project.id} className="min-w-[84%] snap-start">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 hidden gap-6 md:grid lg:grid-cols-3">
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
