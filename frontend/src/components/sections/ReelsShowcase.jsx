import { useEffect, useRef } from 'react';
import { reelClips, creativeGallery } from '../../data/reels';
import { useInView } from '../../hooks/useInView';
import { SectionHeader } from '../ui';

function VideoCard({ clip }) {
  const [containerRef, inView] = useInView({ threshold: 0.5 });
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    if (inView && !document.hidden) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    function onVisibility() {
      if (document.hidden) video.pause();
      else if (inView) video.play().catch(() => {});
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[9/16] w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-charcoal-800 shadow-card"
    >
      <video
        ref={videoRef}
        src={clip.video}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
      <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white">
        {clip.label}
      </span>
    </div>
  );
}

export default function ReelsShowcase() {
  return (
    <section className="bg-charcoal-950 py-20 sm:py-28">
      <div className="section">
        <SectionHeader
          eyebrow="Reels & content"
          title="Vertical video and creative, made to be watched."
          description="A sample of Scalora-produced reels and ad creative — muted previews, tap to unmute."
        />
        <div className="-mx-4 mt-10 flex gap-5 overflow-x-auto px-4 pb-4">
          {reelClips.map((clip) => (
            <VideoCard key={clip.id} clip={clip} />
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {creativeGallery.map((item) => (
            <figure key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal-800/60">
              <img src={item.image} alt={item.label} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <figcaption className="p-3">
                <p className="text-xs font-bold text-white">{item.label}</p>
                <p className="text-[11px] text-white/40">{item.category}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
