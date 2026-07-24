import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Megaphone, Play, ShoppingBag, Smartphone, TrendingUp } from 'lucide-react';
import HeroPanel from './HeroPanel';
import { useHeroMotion } from './useHeroMotion';
import logoMark from '../../assets/brand/logo-mark.png';
import reelPoster from '../../assets/reels/website-launch-poster.jpg';

function BrowserChrome({ children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal-800/90 shadow-card">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      {children}
    </div>
  );
}

function CardLabel({ icon: Icon, label, sub }) {
  return (
    <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2.5">
      <Icon size={13} className="text-brand-purple" />
      <div className="min-w-0">
        <p className="truncate text-[11px] font-bold text-white">{label}</p>
        {sub && <p className="truncate text-[10px] text-white/45">{sub}</p>}
      </div>
    </div>
  );
}

function FloatingLabel({ children }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/10 bg-charcoal-900/80 px-3 py-1.5 text-[11px] font-semibold text-white/75 shadow-card backdrop-blur">
      {children}
    </span>
  );
}

export default function HeroScene() {
  const { containerRef, rotateX, rotateY } = useHeroMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const scrollFade = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[560px]">
      {/* soft studio-style ambient light, not a neon blob */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-56 w-56 rounded-full bg-brand-blue/20 blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-brand-purple/20 blur-[100px]" />
      </div>

      <motion.div
        className="perspective-hero relative aspect-square w-full"
        style={{ y: scrollShift, opacity: scrollFade }}
      >
        <motion.div className="relative h-full w-full" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
          {/* central brand mark */}
          <HeroPanel style={{ top: '50%', left: '50%' }} depth={20} floatDelay={0}>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-charcoal-800/90 shadow-glow sm:h-28 sm:w-28">
              <img src={logoMark} alt="Scalora" className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
            </div>
          </HeroPanel>

          {/* desktop website mockup */}
          <HeroPanel style={{ top: '24%', left: '27%' }} depth={70} rotateY={-8} rotateX={4} floatDelay={0.4}>
            <div className="w-48 sm:w-56">
              <BrowserChrome>
                <div className="space-y-2 p-3">
                  <div className="h-2 w-2/3 rounded bg-white/25" />
                  <div className="h-10 rounded-lg bg-brand-gradient-soft" />
                  <div className="h-2 w-full rounded bg-white/10" />
                  <div className="h-2 w-4/5 rounded bg-white/10" />
                </div>
                <CardLabel icon={Smartphone} label="Web Development" sub="Custom &amp; Shopify builds" />
              </BrowserChrome>
            </div>
          </HeroPanel>

          {/* meta ads performance card */}
          <HeroPanel
            style={{ top: '16%', left: '75%' }}
            depth={100}
            rotateY={10}
            rotateX={-3}
            floatDelay={1.1}
            hideOnMobile
          >
            <div className="w-40 rounded-2xl border border-white/10 bg-charcoal-800/90 p-3 shadow-card sm:w-44">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                  <Megaphone size={13} className="text-brand-purple" /> Meta Ads
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  +32%
                </span>
              </div>
              <div className="mt-3 flex items-end gap-1.5">
                {[40, 65, 50, 80, 60, 95].map((h, i) => (
                  <div key={i} className="w-full rounded-t bg-brand-gradient" style={{ height: `${h * 0.4}px` }} />
                ))}
              </div>
              <p className="mt-2 text-[10px] text-white/45">ROAS 4.8x &middot; demo data</p>
            </div>
          </HeroPanel>

          {/* vertical reel preview */}
          <HeroPanel style={{ top: '70%', left: '20%' }} depth={55} rotateY={-6} rotateX={-3} floatDelay={1.8}>
            <div className="relative h-32 w-20 overflow-hidden rounded-2xl border border-white/10 shadow-card sm:h-36 sm:w-24">
              <img src={reelPoster} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play size={20} className="text-white/90" fill="white" />
              </div>
              <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-bold text-white">
                Reels
              </span>
            </div>
          </HeroPanel>

          {/* shopify / e-commerce card */}
          <HeroPanel style={{ top: '80%', left: '73%' }} depth={65} rotateY={8} rotateX={3} floatDelay={2.3}>
            <div className="w-40 rounded-2xl border border-white/10 bg-charcoal-800/90 p-3 shadow-card sm:w-44">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-gradient">
                  <ShoppingBag size={14} className="text-white" />
                </span>
                <div>
                  <p className="text-[11px] font-bold text-white">Shopify</p>
                  <p className="text-[10px] text-white/45">Conversion 3.2%</p>
                </div>
              </div>
              <div className="mt-2.5 h-12 rounded-lg bg-brand-gradient-soft" />
            </div>
          </HeroPanel>

          {/* analytics chart */}
          <HeroPanel
            style={{ top: '50%', left: '90%' }}
            depth={130}
            rotateY={12}
            floatDelay={2.9}
            hideOnMobile
          >
            <div className="w-36 rounded-2xl border border-white/10 bg-charcoal-800/90 p-3 shadow-card">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                <TrendingUp size={13} className="text-brand-purple" /> Campaign Growth
              </span>
              <svg viewBox="0 0 100 32" className="mt-2 h-8 w-full">
                <polyline
                  points="0,28 15,20 30,24 45,12 60,16 75,6 100,2"
                  fill="none"
                  stroke="url(#heroLineGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="heroLineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2f6bff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </HeroPanel>

          {/* mobile app screen */}
          <HeroPanel
            style={{ top: '62%', left: '5%' }}
            depth={45}
            rotateY={-10}
            floatDelay={3.4}
            hideOnMobile
          >
            <div className="flex h-28 w-16 flex-col justify-between rounded-2xl border border-white/10 bg-charcoal-800/90 p-2 shadow-card">
              <div className="space-y-1.5">
                <div className="h-2 w-full rounded bg-white/20" />
                <div className="h-6 rounded-lg bg-brand-gradient-soft" />
                <div className="h-6 rounded-lg bg-white/5" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-brand-gradient py-1">
                <BarChart3 size={12} className="text-white" />
              </div>
            </div>
          </HeroPanel>

          {/* floating service labels */}
          <HeroPanel style={{ top: '6%', left: '50%' }} depth={140} floatDelay={0.9} hideOnMobile>
            <FloatingLabel>Social Growth</FloatingLabel>
          </HeroPanel>
          <HeroPanel style={{ top: '92%', left: '46%' }} depth={140} floatDelay={1.6} hideOnMobile>
            <FloatingLabel>Bookings</FloatingLabel>
          </HeroPanel>
          <HeroPanel style={{ top: '44%', left: '2%' }} depth={140} floatDelay={2.1} hideOnMobile>
            <FloatingLabel>Conversion Rate</FloatingLabel>
          </HeroPanel>
        </motion.div>
      </motion.div>
    </div>
  );
}
