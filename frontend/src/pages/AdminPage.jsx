import { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { api } from '../api/client';
import { fallbackContent } from '../data';
import CollectionManager from '../components/admin/CollectionManager';
import BrandManager from '../components/admin/BrandManager';

export default function AdminPage({ onExit }) {
  const [token, setToken] = useState(localStorage.getItem('scalora_token'));
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({ leads: [], services: [], projects: [], testimonials: [], settings: fallbackContent.brandSettings });
  const [tab, setTab] = useState('leads');
  const [draft, setDraft] = useState({});

  const loaders = useMemo(
    () => ({
      leads: api.leads,
      settings: api.settings,
      services: api.services,
      projects: api.projects,
      testimonials: api.testimonials
    }),
    []
  );

  async function loadAll() {
    const entries = await Promise.all(Object.entries(loaders).map(async ([key, fn]) => [key, await fn()]));
    setData(Object.fromEntries(entries));
  }

  useEffect(() => {
    if (token) loadAll().catch((err) => setError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <main className="grid min-h-screen place-items-center bg-charcoal-950 p-4">
        <form onSubmit={login} className="w-full max-w-md rounded-2xl border border-white/10 bg-charcoal-800/60 p-8 shadow-glow">
          <LayoutDashboard className="text-brand-purple" />
          <h1 className="mt-4 text-3xl font-black text-white">Scalora Admin</h1>
          <input
            className="mt-6 w-full rounded-lg border border-white/10 bg-charcoal-900 px-4 py-3 text-white"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            placeholder="Email"
          />
          <input
            className="mt-3 w-full rounded-lg border border-white/10 bg-charcoal-900 px-4 py-3 text-white"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="Password"
          />
          <button className="mt-5 w-full rounded-lg bg-brand-gradient px-5 py-3 font-black text-white">Login</button>
          <button type="button" onClick={onExit} className="mt-3 w-full rounded-lg border border-white/10 px-5 py-3 font-bold text-white/70">
            Back to site
          </button>
          {error && <p className="mt-4 text-sm font-semibold text-red-400">{error}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-charcoal-950">
      <div className="section py-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gradient">Admin Dashboard</p>
            <h1 className="text-3xl font-black text-white">Manage Scalora content and leads</h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('scalora_token');
              setToken(null);
              onExit();
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-3 font-bold text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {['leads', 'services', 'projects', 'testimonials', 'brand'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setTab(item);
                setDraft({});
              }}
              className={`rounded-lg px-4 py-2 font-bold capitalize ${
                tab === item ? 'bg-brand-gradient text-white' : 'bg-charcoal-800 text-white/70'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {error && <p className="mt-4 rounded-lg bg-red-500/10 p-4 font-semibold text-red-400">{error}</p>}
        {notice && <p className="mt-4 rounded-lg bg-emerald-500/10 p-4 font-semibold text-emerald-400">{notice}</p>}
        {tab === 'leads' ? (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-charcoal-800/60">
            <table className="w-full min-w-[1100px] text-left text-sm text-white/80">
              <thead className="bg-white/5 text-white">
                <tr>
                  {['Name', 'Email', 'Phone', 'Type', 'Budget', 'Timeline', 'Message', 'Status'].map((h) => (
                    <th key={h} className="p-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-white/10">
                    <td className="p-4 font-bold text-white">{lead.name}</td>
                    <td className="p-4">{lead.email}</td>
                    <td className="p-4">{lead.phone}</td>
                    <td className="p-4">{lead.projectType}</td>
                    <td className="p-4">{lead.budget}</td>
                    <td className="p-4">{lead.timeline}</td>
                    <td className="max-w-sm p-4">{lead.message}</td>
                    <td className="p-4">
                      <select
                        className="rounded-lg border border-white/10 bg-charcoal-900 px-3 py-2 text-white"
                        value={lead.status}
                        onChange={async (e) => {
                          await api.updateLeadStatus(lead.id, e.target.value);
                          await loadAll();
                        }}
                      >
                        {['NEW', 'CONTACTED', 'CLOSED', 'REJECTED'].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : tab === 'brand' ? (
          <BrandManager settings={data.settings} saving={saving} save={saveBrandSettings} />
        ) : (
          <CollectionManager
            tab={tab}
            data={data[tab]}
            draft={draft}
            setDraft={setDraft}
            saving={saving}
            save={() => saveCollection(tab)}
            remove={(id) => remove(tab, id)}
          />
        )}
      </div>
    </main>
  );
}
