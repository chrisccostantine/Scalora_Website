import { Megaphone, Play, ShoppingBag, Smartphone } from 'lucide-react';
import logoMark from '../../assets/brand/logo-mark.png';
import reelPoster from '../../assets/reels/website-launch-poster.jpg';

/**
 * Simplified, static-safe mobile hero visual. Plain flexbox (no absolute
 * positioning, no mouse parallax, no lazy-loaded scene) so it can never
 * overlap or overflow on narrow screens, and renders immediately rather than
 * waiting on the desktop 3D scene's code-split chunk.
 */
export default function MobileHeroStack() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-3 md:hidden">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-charcoal-800/90 shadow-glow motion-safe:animate-heroFloat">
        <img src={logoMark} alt="Scalora" className="h-9 w-9 object-contain" />
      </div>

      <div className="flex w-full items-stretch gap-3">
        <div className="w-[58%] overflow-hidden rounded-2xl border border-white/10 bg-charcoal-800/90 shadow-card motion-safe:animate-heroFloat [animation-delay:0.6s]">
          <div className="flex items-center gap-1 border-b border-white/10 px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
          <div className="space-y-1.5 p-2.5">
            <div className="h-1.5 w-2/3 rounded bg-white/25" />
            <div className="h-6 rounded-lg bg-brand-gradient-soft" />
            <div className="h-1.5 w-full rounded bg-white/10" />
          </div>
          <div className="flex items-center gap-1.5 border-t border-white/10 px-2.5 py-2">
            <Smartphone size={11} className="shrink-0 text-brand-purple" />
            <p className="truncate text-[10px] font-bold text-white">Web Development</p>
          </div>
        </div>

        <div className="relative w-[38%] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-card motion-safe:animate-heroFloat [animation-delay:1.4s]">
          <img src={reelPoster} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Play size={16} className="text-white/90" fill="white" />
          </div>
          <span className="absolute bottom-1 left-1 rounded-full bg-black/55 px-1.5 py-0.5 text-[8px] font-bold text-white">
            Reels
          </span>
        </div>
      </div>

      <div className="flex w-full items-stretch gap-3">
        <div className="w-1/2 rounded-2xl border border-white/10 bg-charcoal-800/90 p-2.5 shadow-card motion-safe:animate-heroFloat [animation-delay:2.1s]">
          <div className="flex items-center justify-between gap-1">
            <span className="flex items-center gap-1 text-[10px] font-bold text-white">
              <Megaphone size={11} className="shrink-0 text-brand-purple" /> Meta Ads
            </span>
            <span className="shrink-0 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
              +32%
            </span>
          </div>
          <div className="mt-2 flex items-end gap-1">
            {[40, 65, 50, 80, 60, 95].map((h, i) => (
              <div key={i} className="w-full rounded-t bg-brand-gradient" style={{ height: `${h * 0.22}px` }} />
            ))}
          </div>
        </div>

        <div className="w-1/2 rounded-2xl border border-white/10 bg-charcoal-800/90 p-2.5 shadow-card motion-safe:animate-heroFloat [animation-delay:1.8s]">
          <div className="flex items-center gap-1.5">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-gradient">
              <ShoppingBag size={12} className="text-white" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold text-white">Shopify</p>
              <p className="truncate text-[9px] text-white/45">Conv. 3.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
