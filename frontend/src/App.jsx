import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  MonitorSmartphone,
  Palette,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  X
} from 'lucide-react';
import { api } from './api/client';
import { fallbackContent } from './data';

const iconMap = { ShoppingBag, MonitorSmartphone, Code2, Smartphone, Palette, Megaphone, GraduationCap };
const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Contact', '#contact']
];

function imageFileToDataUrl(file, maxSize = 1400, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read image file.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('Could not process image file.'));
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function Header({ onAdmin, brandSettings = fallbackContent.brandSettings }) {
  const [open, setOpen] = useState(false);
  const logo = brandSettings.logoUrl;
  const agencyName = brandSettings.agencyName || 'Scalora';
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="section flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-3 font-bold tracking-tight text-ink">
          {logo ? (
            <img className="h-10 w-10 rounded-lg object-contain" src={logo} alt={`${agencyName} logo`} />
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white">S</span>
          )}
          <span className="text-xl">{agencyName}</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, href]) => (
            <a key={label} className="text-sm font-medium text-slate-600 transition hover:text-ink" href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={onAdmin} className="focus-ring rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Admin
          </button>
          <a className="focus-ring rounded-lg bg-teal px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-ink" href="#contact">
            Start a project
          </a>
        </div>
        <button className="focus-ring rounded-lg p-2 md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] min-h-dvh bg-white p-5 text-ink shadow-glow md:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="flex items-center gap-3 text-xl font-bold">
              {logo ? <img className="h-10 w-10 rounded-lg object-contain" src={logo} alt={`${agencyName} logo`} /> : null}
              {agencyName}
            </span>
            <button className="rounded-lg p-2" onClick={() => setOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>
          <div className="mt-10 grid gap-4">
            {navItems.map(([label, href]) => (
              <a key={label} onClick={() => setOpen(false)} className="border-b border-slate-200 py-3 text-lg font-semibold" href={href}>
                {label}
              </a>
            ))}
            <button onClick={() => { setOpen(false); onAdmin(); }} className="mt-4 rounded-lg bg-ink px-5 py-3 font-bold text-white">
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#f8fafc]">
      <div className="section grid min-h-[calc(100vh-64px)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="animate-floatIn">
          <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-teal/20 bg-white px-3 py-2 text-sm font-semibold text-teal shadow-sm">
            <Sparkles size={16} /> Digital builds for brands that need momentum
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Scalora builds websites, apps, and growth systems that feel serious from day one.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            We create Shopify stores, custom websites, portfolios, web apps, mobile apps, social media systems, performance ad campaigns, and academic software projects with clean execution.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-4 font-bold text-white shadow-glow transition hover:bg-teal" href="#contact">
              Book a free consultation <ArrowRight size={18} />
            </a>
            <a className="focus-ring inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-4 font-bold text-ink hover:border-ink" href="#projects">
              View projects
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-glow">
            <img
              className="h-64 w-full rounded-xl object-cover sm:h-80"
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
              alt="Team designing a digital product"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {['Launch-ready websites', 'Secure apps', 'Growth campaigns'].map((item) => (
                <div key={item} className="rounded-lg bg-slate-50 p-4">
                  <CheckCircle2 className="mb-3 text-teal" size={20} />
                  <p className="text-sm font-bold text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="section grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-bold uppercase tracking-[0.18em] text-coral">About Scalora</p>
          <h2 className="mt-4 text-4xl font-black text-ink sm:text-5xl">A compact agency built for practical digital outcomes.</h2>
        </div>
        <div className="grid gap-6 text-lg leading-8 text-slate-600">
          <p>
            Scalora helps businesses and students move from idea to launch with the right mix of strategy, design, engineering, and growth. We keep the work clear, measurable, and ready for real users.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['01', 'Plan the business goal before the interface.'],
              ['02', 'Design responsive experiences that users can trust.'],
              ['03', 'Build scalable systems with clean architecture.']
            ].map(([number, text]) => (
              <div key={number} className="rounded-lg border border-slate-200 p-5">
                <span className="text-sm font-black text-teal">{number}</span>
                <p className="mt-3 text-base font-semibold text-ink">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ services }) {
  return (
    <section id="services" className="bg-slate-50 py-20">
      <div className="section">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-bold uppercase tracking-[0.18em] text-teal">Services</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black text-ink sm:text-5xl">Everything needed to build, launch, and grow a digital presence.</h2>
          </div>
          <a className="inline-flex items-center gap-2 font-bold text-ink" href="#contact">Discuss your scope <ArrowRight size={18} /></a>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <article key={service.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
                <Icon className="text-coral" size={28} />
                <h3 className="mt-5 text-xl font-black text-ink">{service.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="bg-ink py-20 text-white">
      <div className="section grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-bold uppercase tracking-[0.18em] text-gold">Why Scalora</p>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">Clear execution, polished design, and backend discipline in one partner.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['Business-first planning', 'We shape every build around conversion, operations, or presentation goals.'],
            ['Premium UI systems', 'Modern responsive layouts with strong hierarchy, motion, and brand fit.'],
            ['Secure architecture', 'JWT, roles, validation, clean errors, and production-ready API boundaries.'],
            ['Growth support', 'Creative content and ads management connect the build to customer acquisition.']
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/5 p-6">
              <ShieldCheck className="text-gold" />
              <h3 className="mt-4 text-lg font-black">{title}</h3>
              <p className="mt-2 leading-7 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ projects }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80';
  const [showAllMobileProjects, setShowAllMobileProjects] = useState(false);
  const mobileProjects = showAllMobileProjects ? projects : projects.slice(0, 3);
  const projectCard = (project) => (
    <article key={project.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img className="h-56 w-full object-cover" src={project.imageUrl || fallbackImage} alt={project.title} />
      <div className="p-6">
        <span className="rounded-lg bg-mist px-3 py-1 text-xs font-black uppercase tracking-wide text-ink">{project.category}</span>
        <h3 className="mt-4 text-2xl font-black text-ink">{project.title}</h3>
        <p className="mt-3 leading-7 text-slate-600">{project.summary}</p>
      </div>
    </article>
  );

  return (
    <section id="projects" className="bg-white py-20">
      <div className="section">
        <p className="font-bold uppercase tracking-[0.18em] text-coral">Portfolio</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black text-ink sm:text-5xl">Project formats Scalora can deliver for real business and academic needs.</h2>
        <div className="mt-10 md:hidden">
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
            {mobileProjects.map((project) => (
              <div key={project.id} className="min-w-[84%] snap-start">
                {projectCard(project)}
              </div>
            ))}
          </div>
          {projects.length > 3 && !showAllMobileProjects && (
            <button onClick={() => setShowAllMobileProjects(true)} className="mt-2 w-full rounded-lg bg-ink px-5 py-3 font-black text-white">
              View all projects
            </button>
          )}
        </div>
        <div className="mt-10 hidden gap-6 md:grid lg:grid-cols-3">
          {projects.map(projectCard)}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ testimonials }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="section">
        <h2 className="max-w-3xl text-4xl font-black text-ink sm:text-5xl">Trusted by founders, teams, and students who need polished delivery.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.id} className="rounded-lg border border-slate-200 bg-white p-6">
              <blockquote className="leading-7 text-slate-700">"{item.quote}"</blockquote>
              <figcaption className="mt-6 font-black text-ink">{item.clientName}<span className="block text-sm font-semibold text-slate-500">{item.company}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', projectType: 'Custom Website', message: '' });
  const [status, setStatus] = useState('');
  async function submit(event) {
    event.preventDefault();
    setStatus('Sending...');
    try {
      await api.contact(form);
      setStatus('Your request was sent. Scalora will contact you soon.');
      setForm({ name: '', email: '', phone: '', company: '', projectType: 'Custom Website', message: '' });
    } catch (error) {
      setStatus(error.message);
    }
  }
  return (
    <section id="contact" className="bg-white py-20">
      <div className="section grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="font-bold uppercase tracking-[0.18em] text-teal">Contact</p>
          <h2 className="mt-4 text-4xl font-black text-ink sm:text-5xl">Tell us what you want to build next.</h2>
          <p className="mt-5 leading-8 text-slate-600">Share the project type, timeline, and what success should look like. We will help shape it into a practical build plan.</p>
          <div className="mt-8 flex gap-3">
            <a className="rounded-lg bg-[#25D366] px-5 py-3 font-bold text-white" href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '96100000000'}`}>WhatsApp</a>
            <a className="rounded-lg border border-slate-300 px-5 py-3 font-bold text-ink" href={import.meta.env.VITE_INSTAGRAM_URL || '#'}>Instagram</a>
          </div>
        </div>
        <form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required className="focus-ring rounded-lg border border-slate-300 px-4 py-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="email" className="focus-ring rounded-lg border border-slate-300 px-4 py-3" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="focus-ring rounded-lg border border-slate-300 px-4 py-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="focus-ring rounded-lg border border-slate-300 px-4 py-3" placeholder="Company or university" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <select className="focus-ring rounded-lg border border-slate-300 px-4 py-3" value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
            {['Shopify Website', 'Custom Website', 'Portfolio Website', 'Web Application', 'Mobile Application', 'Social Media', 'Ads Management', 'University Project'].map((type) => <option key={type}>{type}</option>)}
          </select>
          <textarea required rows="5" className="focus-ring rounded-lg border border-slate-300 px-4 py-3" placeholder="Project details" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button className="focus-ring rounded-lg bg-ink px-6 py-4 font-black text-white transition hover:bg-teal">Send project request</button>
          {status && <p className="text-sm font-semibold text-slate-600">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink py-10 text-white">
      <div className="section flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <p className="text-2xl font-black">Scalora</p>
        <p className="text-sm text-slate-300">Digital agency for websites, apps, content, ads, and academic software projects.</p>
      </div>
    </footer>
  );
}

function Site({ onAdmin }) {
  const [content, setContent] = useState(fallbackContent);
  useEffect(() => {
    api.publicContent().then((data) => setContent({
      brandSettings: data.brandSettings || fallbackContent.brandSettings,
      services: data.services?.length ? data.services : fallbackContent.services,
      projects: data.projects?.length ? data.projects : fallbackContent.projects,
      testimonials: data.testimonials?.length ? data.testimonials : fallbackContent.testimonials
    })).catch(() => setContent(fallbackContent));
  }, []);
  return (
    <>
      <Header onAdmin={onAdmin} brandSettings={content.brandSettings} />
      <main>
        <Hero />
        <About />
        <Services services={content.services} />
        <WhyChoose />
        <Projects projects={content.projects} />
        <Testimonials testimonials={content.testimonials} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Admin({ onExit }) {
  const [token, setToken] = useState(localStorage.getItem('scalora_token'));
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({ leads: [], services: [], projects: [], testimonials: [], settings: fallbackContent.brandSettings });
  const [tab, setTab] = useState('leads');
  const [draft, setDraft] = useState({});

  const loaders = useMemo(() => ({
    leads: api.leads,
    settings: api.settings,
    services: api.services,
    projects: api.projects,
    testimonials: api.testimonials
  }), []);

  async function loadAll() {
    const entries = await Promise.all(Object.entries(loaders).map(async ([key, fn]) => [key, await fn()]));
    setData(Object.fromEntries(entries));
  }

  useEffect(() => {
    if (token) loadAll().catch((err) => setError(err.message));
  }, [token]);

  async function login(event) {
    event.preventDefault();
    setError('');
    try {
      const response = await api.login(credentials);
      localStorage.setItem('scalora_token', response.token);
      setToken(response.token);
    } catch (err) {
      setError(err.message);
    }
  }

  async function saveCollection(collection) {
    const save = collection === 'services' ? api.saveService : collection === 'projects' ? api.saveProject : api.saveTestimonial;
    setError('');
    setNotice('');
    setSaving(true);
    try {
      await save(draft);
      setDraft({});
      await loadAll();
      setNotice(`${collection.slice(0, -1)} saved successfully.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(collection, id) {
    const fn = collection === 'services' ? api.removeService : collection === 'projects' ? api.removeProject : api.removeTestimonial;
    setError('');
    setNotice('');
    try {
      await fn(id);
      await loadAll();
      setNotice(`${collection.slice(0, -1)} deleted.`);
    } catch (err) {
      setError(err.message);
    }
  }

  async function saveBrandSettings(settings) {
    setError('');
    setNotice('');
    setSaving(true);
    try {
      await api.saveSettings(settings);
      await loadAll();
      setNotice('Brand settings saved successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-4">
        <form onSubmit={login} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-glow">
          <LayoutDashboard className="text-teal" />
          <h1 className="mt-4 text-3xl font-black text-ink">Scalora Admin</h1>
          <input className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-3" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
          <input className="mt-3 w-full rounded-lg border border-slate-300 px-4 py-3" type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
          <button className="mt-5 w-full rounded-lg bg-ink px-5 py-3 font-black text-white">Login</button>
          <button type="button" onClick={onExit} className="mt-3 w-full rounded-lg border border-slate-300 px-5 py-3 font-bold">Back to site</button>
          {error && <p className="mt-4 text-sm font-semibold text-coral">{error}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="section py-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-bold uppercase tracking-[0.18em] text-teal">Admin Dashboard</p>
            <h1 className="text-4xl font-black text-ink">Manage Scalora content and leads</h1>
          </div>
          <button onClick={() => { localStorage.removeItem('scalora_token'); setToken(null); onExit(); }} className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 font-bold text-white"><LogOut size={18} /> Logout</button>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {['leads', 'services', 'projects', 'testimonials', 'brand'].map((item) => (
            <button key={item} onClick={() => { setTab(item); setDraft({}); }} className={`rounded-lg px-4 py-2 font-bold capitalize ${tab === item ? 'bg-teal text-white' : 'bg-white text-ink'}`}>{item}</button>
          ))}
        </div>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-4 font-semibold text-red-700">{error}</p>}
        {notice && <p className="mt-4 rounded-lg bg-emerald-50 p-4 font-semibold text-emerald-700">{notice}</p>}
        {tab === 'leads' ? (
          <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-100 text-ink"><tr>{['Name', 'Email', 'Phone', 'Type', 'Message', 'Status'].map((h) => <th key={h} className="p-4">{h}</th>)}</tr></thead>
              <tbody>
                {data.leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-slate-200">
                    <td className="p-4 font-bold">{lead.name}</td><td className="p-4">{lead.email}</td><td className="p-4">{lead.phone}</td><td className="p-4">{lead.projectType}</td><td className="p-4 max-w-sm">{lead.message}</td>
                    <td className="p-4"><select className="rounded-lg border border-slate-300 px-3 py-2" value={lead.status} onChange={async (e) => { await api.updateLeadStatus(lead.id, e.target.value); await loadAll(); }}>{['NEW', 'CONTACTED', 'CLOSED', 'REJECTED'].map((s) => <option key={s}>{s}</option>)}</select></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : tab === 'brand' ? (
          <BrandManager settings={data.settings} saving={saving} save={saveBrandSettings} />
        ) : (
          <CollectionManager tab={tab} data={data[tab]} draft={draft} setDraft={setDraft} saving={saving} save={() => saveCollection(tab)} remove={(id) => remove(tab, id)} />
        )}
      </div>
    </main>
  );
}

function CollectionManager({ tab, data, draft, setDraft, saving, save, remove }) {
  const fields = {
    services: ['title', 'description', 'icon', 'displayOrder'],
    projects: ['title', 'category', 'summary', 'imageUrl', 'featured'],
    testimonials: ['clientName', 'company', 'quote', 'displayOrder']
  }[tab];

  async function uploadProjectImage(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      window.alert('Please upload an image file.');
      return;
    }

    try {
      const imageUrl = await imageFileToDataUrl(file);
      setDraft({ ...draft, imageUrl });
    } catch (err) {
      window.alert(err.message);
    }
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-black capitalize">{draft.id ? 'Edit' : 'Add'} {tab.slice(0, -1)}</h2>
        <div className="mt-4 grid gap-3">
          {fields.map((field) => (
            field === 'featured' ? (
              <label key={field} className="flex items-center gap-2 font-semibold"><input type="checkbox" checked={!!draft[field]} onChange={(e) => setDraft({ ...draft, [field]: e.target.checked })} /> Featured</label>
            ) : field === 'imageUrl' && tab === 'projects' ? (
              <div key={field} className="grid gap-3">
                {draft.imageUrl && (
                  <img className="h-36 w-full rounded-lg border border-slate-200 object-cover" src={draft.imageUrl} alt="Project preview" />
                )}
                <label className="focus-ring cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center font-bold text-ink hover:border-teal hover:bg-mist">
                  Upload project image
                  <input className="sr-only" type="file" accept="image/*" onChange={(e) => uploadProjectImage(e.target.files?.[0])} />
                </label>
                {draft.imageUrl && (
                  <button type="button" onClick={() => setDraft({ ...draft, imageUrl: '' })} className="rounded-lg border border-slate-300 px-4 py-2 font-bold text-ink">
                    Remove image
                  </button>
                )}
              </div>
            ) : (
              <input key={field} className="rounded-lg border border-slate-300 px-4 py-3" placeholder={field} value={draft[field] || ''} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} />
            )
          ))}
          <button type="button" disabled={saving} onClick={save} className="rounded-lg bg-ink px-5 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {data.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-black">{item.title || item.clientName}</h3>
            <p className="mt-2 text-slate-600">{item.description || item.summary || item.quote}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setDraft(item)} className="rounded-lg border border-slate-300 px-4 py-2 font-bold">Edit</button>
              <button onClick={() => remove(item.id)} className="rounded-lg bg-coral px-4 py-2 font-bold text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandManager({ settings, saving, save }) {
  const [draft, setDraft] = useState(settings || fallbackContent.brandSettings);

  useEffect(() => {
    setDraft(settings || fallbackContent.brandSettings);
  }, [settings]);

  async function uploadLogo(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      window.alert('Please upload an image file.');
      return;
    }

    try {
      const logoUrl = await imageFileToDataUrl(file, 700, 0.9);
      setDraft((current) => ({ ...current, logoUrl }));
    } catch (err) {
      window.alert(err.message);
    }
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-black">Brand Settings</h2>
        <div className="mt-4 grid gap-3">
          <input
            className="rounded-lg border border-slate-300 px-4 py-3"
            placeholder="Agency name"
            value={draft.agencyName || ''}
            onChange={(e) => setDraft({ ...draft, agencyName: e.target.value })}
          />
          {draft.logoUrl && (
            <div className="grid place-items-center rounded-lg border border-slate-200 bg-slate-50 p-5">
              <img className="max-h-28 max-w-full object-contain" src={draft.logoUrl} alt="Agency logo preview" />
            </div>
          )}
          <label className="focus-ring cursor-pointer rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center font-bold text-ink hover:border-teal hover:bg-mist">
            Upload agency logo
            <input className="sr-only" type="file" accept="image/*" onChange={(e) => uploadLogo(e.target.files?.[0])} />
          </label>
          {draft.logoUrl && (
            <button type="button" onClick={() => setDraft({ ...draft, logoUrl: '' })} className="rounded-lg border border-slate-300 px-4 py-2 font-bold text-ink">
              Remove logo
            </button>
          )}
          <button type="button" disabled={saving} onClick={() => save(draft)} className="rounded-lg bg-ink px-5 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Brand'}
          </button>
        </div>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Frontend Preview</p>
        <div className="mt-5 flex items-center gap-3">
          {draft.logoUrl ? (
            <img className="h-12 w-12 rounded-lg object-contain" src={draft.logoUrl} alt="Agency logo preview" />
          ) : (
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-ink text-lg font-black text-white">S</span>
          )}
          <span className="text-2xl font-black text-ink">{draft.agencyName || 'Scalora'}</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [admin, setAdmin] = useState(location.hash === '#admin');
  return admin ? <Admin onExit={() => setAdmin(false)} /> : <Site onAdmin={() => setAdmin(true)} />;
}
