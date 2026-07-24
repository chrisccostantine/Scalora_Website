import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInView } from '../../hooks/useInView';
import { useIdle } from '../../hooks/useIdle';

// Drives the hero scene's subtle look-around effect: mouse-follow parallax on
// desktop, a slow automatic orbit after inactivity, and a full stop when the
// scene is off-screen, the tab is hidden, or the user prefers reduced motion.
export function useHeroMotion() {
  const reducedMotion = usePrefersReducedMotion();
  const [containerRef, inView] = useInView({ threshold: 0.2 });
  const idle = useIdle(5000);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.8 });
  const springY = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.8 });
  const rotateX = useTransform(springY, [-1, 1], [5, -5]);
  const rotateY = useTransform(springX, [-1, 1], [-7, 7]);

  const frameRef = useRef();
  const canAnimate = inView && !reducedMotion;

  useEffect(() => {
    if (!canAnimate) return undefined;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return undefined;

    function onPointerMove(event) {
      if (document.hidden) return;
      const { innerWidth, innerHeight } = window;
      pointerX.set((event.clientX / innerWidth) * 2 - 1);
      pointerY.set((event.clientY / innerHeight) * 2 - 1);
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [canAnimate, pointerX, pointerY]);

  useEffect(() => {
    if (!canAnimate || !idle) return undefined;
    let start;
    function step(timestamp) {
      if (document.hidden) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) / 1000;
      pointerX.set(Math.sin(elapsed * 0.15) * 0.6);
      pointerY.set(Math.cos(elapsed * 0.12) * 0.3);
      frameRef.current = requestAnimationFrame(step);
    }
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [canAnimate, idle, pointerX, pointerY]);

  useEffect(() => {
    if (!idle) {
      pointerX.stop?.();
    }
  }, [idle, pointerX]);

  return { containerRef, rotateX, rotateY, reducedMotion, inView };
}
