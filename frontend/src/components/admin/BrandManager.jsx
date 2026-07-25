import { useEffect, useState } from 'react';
import { fallbackContent } from '../../data';

function imageFileToDataUrl(file, maxSize = 700) {
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
        // PNG, not JPEG: logos need a transparent background preserved. JPEG has
        // no alpha channel, so transparent logos silently got a white background baked in.
        resolve(canvas.toDataURL('image/png'));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function BrandManager({ settings, saving, save }) {
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
      const logoUrl = await imageFileToDataUrl(file);
      setDraft((current) => ({ ...current, logoUrl }));
    } catch (err) {
      window.alert(err.message);
    }
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="rounded-2xl border border-white/10 bg-charcoal-800/60 p-5">
        <h2 className="text-lg font-black text-white">Brand Settings</h2>
        <div className="mt-4 grid gap-3">
          <input
            className="rounded-lg border border-white/10 bg-charcoal-900 px-4 py-3 text-sm text-white placeholder:text-white/35"
            placeholder="Agency name optional"
            value={draft.agencyName || ''}
            onChange={(e) => setDraft({ ...draft, agencyName: e.target.value })}
          />
          {draft.logoUrl && (
            <div className="grid place-items-center rounded-lg border border-white/10 bg-charcoal-900 p-5">
              <img className="max-h-28 max-w-full object-contain" src={draft.logoUrl} alt="Agency logo preview" />
            </div>
          )}
          <label className="focus-ring cursor-pointer rounded-lg border border-dashed border-white/15 bg-charcoal-900 px-4 py-5 text-center text-sm font-bold text-white/70 hover:border-brand-violet">
            Upload agency logo
            <input className="sr-only" type="file" accept="image/*" onChange={(e) => uploadLogo(e.target.files?.[0])} />
          </label>
          {draft.logoUrl && (
            <button
              type="button"
              onClick={() => setDraft({ ...draft, logoUrl: '' })}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-white/70"
            >
              Remove logo
            </button>
          )}
          <button
            type="button"
            disabled={saving}
            onClick={() => save(draft)}
            className="rounded-lg bg-brand-gradient px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Brand'}
          </button>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-charcoal-800/60 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gradient">Frontend Preview</p>
        <div className="mt-5 flex items-center gap-3">
          {draft.logoUrl ? (
            <img className="h-12 w-12 rounded-lg object-contain" src={draft.logoUrl} alt="Agency logo preview" />
          ) : (
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-gradient text-lg font-black text-white">S</span>
          )}
          {draft.agencyName?.trim() && <span className="text-2xl font-black text-white">{draft.agencyName}</span>}
        </div>
      </div>
    </div>
  );
}
