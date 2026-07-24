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

const inputClass = 'rounded-lg border border-white/10 bg-charcoal-900 px-4 py-3 text-sm text-white placeholder:text-white/35';

export default function CollectionManager({ tab, data, draft, setDraft, saving, save, remove }) {
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
      <div className="rounded-2xl border border-white/10 bg-charcoal-800/60 p-5">
        <h2 className="text-lg font-black capitalize text-white">
          {draft.id ? 'Edit' : 'Add'} {tab.slice(0, -1)}
        </h2>
        <div className="mt-4 grid gap-3">
          {fields.map((field) =>
            field === 'featured' ? (
              <label key={field} className="flex items-center gap-2 text-sm font-semibold text-white/70">
                <input
                  type="checkbox"
                  checked={!!draft[field]}
                  onChange={(e) => setDraft({ ...draft, [field]: e.target.checked })}
                />
                Featured
              </label>
            ) : field === 'imageUrl' && tab === 'projects' ? (
              <div key={field} className="grid gap-3">
                {draft.imageUrl && (
                  <img className="h-36 w-full rounded-lg border border-white/10 object-cover" src={draft.imageUrl} alt="Project preview" />
                )}
                <label className="focus-ring cursor-pointer rounded-lg border border-dashed border-white/15 bg-charcoal-900 px-4 py-5 text-center text-sm font-bold text-white/70 hover:border-brand-violet">
                  Upload project image
                  <input className="sr-only" type="file" accept="image/*" onChange={(e) => uploadProjectImage(e.target.files?.[0])} />
                </label>
                {draft.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setDraft({ ...draft, imageUrl: '' })}
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-white/70"
                  >
                    Remove image
                  </button>
                )}
              </div>
            ) : (
              <input
                key={field}
                className={inputClass}
                placeholder={field}
                value={draft[field] || ''}
                onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
              />
            )
          )}
          <button
            type="button"
            disabled={saving}
            onClick={save}
            className="rounded-lg bg-brand-gradient px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {data.map((item) => (
          <div key={item.id} className="rounded-2xl border border-white/10 bg-charcoal-800/60 p-5">
            <h3 className="text-base font-black text-white">{item.title || item.clientName}</h3>
            <p className="mt-2 text-sm text-white/55">{item.description || item.summary || item.quote}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setDraft(item)} className="rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-white/80">
                Edit
              </button>
              <button onClick={() => remove(item.id)} className="rounded-lg bg-red-500/90 px-4 py-2 text-sm font-bold text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
