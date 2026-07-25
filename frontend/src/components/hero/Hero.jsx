import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Badge, Button } from '../ui';
import MobileHeroStack from './MobileHeroStack';

const HeroScene = lazy(() => import('./HeroScene'));

function HeroSceneFallback() {
  return (
    <div className="mx-auto hidden aspect-square w-full max-w-[560px] items-center justify-center md:flex">
      <div className="h-24 w-24 animate-pulse rounded-full border border-white/10 bg-charcoal-800/80" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-charcoal-950">
      <div className="section grid min-h-[calc(100vh-64px)] min-w-0 items-center gap-14 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="min-w-0 animate-floatIn">
          <Badge icon={Sparkles}>Growth, creative &amp; technology under one team</Badge>
          <h1 className="mt-6 max-w-xl break-words font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Creative, advertising and technology built to{' '}
            <span className="text-gradient">scale your business.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/60 sm:text-lg">
            Scalora runs the paid ads, builds the content, ships the website or app, and reports on what actually
            moved — so you deal with one team instead of five vendors.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button as={Link} to="/contact" showArrow>
              Book a Strategy Call
            </Button>
            <Button as={Link} to="/work" variant="secondary">
              View Our Work
            </Button>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
            Strategy-led execution &middot; Direct founder involvement &middot; One team for marketing and technology
          </p>
        </div>

        <div aria-hidden="true" className="min-w-0">
          <MobileHeroStack />
          <div className="hidden md:block">
            <Suspense fallback={<HeroSceneFallback />}>
              <HeroScene />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
