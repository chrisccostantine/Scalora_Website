import { useState } from 'react';
import { api } from '../../api/client';
import { Button } from '../ui';

const PROJECT_TYPES = [
  'Meta Ads Management',
  'Social Media Management',
  'Reels Production',
  'Shopify Website',
  'Custom Website',
  'Web Application',
  'Mobile Application',
  'University Project'
];

const BUDGET_RANGES = ['Under $500', '$500 - $1,500', '$1,500 - $5,000', '$5,000+', 'Not sure yet'];
const TIMELINES = ['As soon as possible', 'Within 1 month', '1-3 months', 'Just exploring'];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: PROJECT_TYPES[0],
  budget: BUDGET_RANGES[0],
  timeline: TIMELINES[0],
  message: ''
};

const inputClass =
  'focus-ring rounded-xl border border-white/10 bg-charcoal-900 px-4 py-3 text-sm text-white placeholder:text-white/35';

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setSending(true);
    setStatus('Sending...');
    try {
      await api.contact(form);
      setStatus('Your request was sent. Scalora will reply within one business day.');
      setForm(initialForm);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass-panel grid gap-4 rounded-2xl p-5 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          className={inputClass}
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          type="email"
          className={inputClass}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Phone / WhatsApp"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Business name"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>
      <select
        className={inputClass}
        value={form.projectType}
        onChange={(e) => setForm({ ...form, projectType: e.target.value })}
      >
        {PROJECT_TYPES.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
      <div className="grid gap-4 sm:grid-cols-2">
        <select className={inputClass} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
          {BUDGET_RANGES.map((range) => (
            <option key={range}>{range}</option>
          ))}
        </select>
        <select className={inputClass} value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}>
          {TIMELINES.map((timeline) => (
            <option key={timeline}>{timeline}</option>
          ))}
        </select>
      </div>
      <textarea
        required
        rows="5"
        className={inputClass}
        placeholder="Tell us about the project"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <Button as="button" type="submit" disabled={sending} className="disabled:cursor-not-allowed disabled:opacity-60">
        {sending ? 'Sending...' : 'Send project request'}
      </Button>
      {status && <p className="text-sm font-semibold text-white/60" role="status">{status}</p>}
    </form>
  );
}
