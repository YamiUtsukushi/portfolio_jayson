'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

// ============================================
// SCROLL PROGRESS BAR
// Barre 2px en haut de page, gradient violet
// ============================================

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #50207A 0%, #838CE5 50%, #D6B9FC 100%)',
        boxShadow: '0 0 8px rgba(131, 140, 229, 0.6)',
      }}
    />
  );
}
