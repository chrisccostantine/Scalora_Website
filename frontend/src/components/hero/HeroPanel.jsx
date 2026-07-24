import { motion } from 'framer-motion';

/**
 * An absolutely-positioned glass card inside the hero scene. Position/tilt is
 * static per-panel (art-directed depth); the scene wrapper applies the shared
 * mouse-parallax rotation on top, and each panel idle-floats on its own CSS
 * animation so only one element needs a JS-driven transform.
 */
export default function HeroPanel({
  className = '',
  style = {},
  depth = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  floatDelay = 0,
  hideOnMobile = false,
  children
}) {
  return (
    <motion.div
      className={`absolute ${hideOnMobile ? 'hidden md:block' : ''} ${className}`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        transform: `translate(-50%, -50%) translateZ(${depth}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        animation: `heroFloat 7s ease-in-out ${floatDelay}s infinite`
      }}
      whileHover={{ scale: 1.045, transition: { duration: 0.25 } }}
    >
      {children}
    </motion.div>
  );
}
