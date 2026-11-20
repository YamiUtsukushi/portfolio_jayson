'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ============================================
// CUSTOM CURSOR
// Orbe violet 12px avec lag (lerp) + anneau extérieur
// Expand à 2.5x + mix-blend-mode:difference sur hover
//
// Perf :
// - Détection du survol par délégation (un seul écouteur `pointerover`
//   sur le document + `closest()`), au lieu d'un MutationObserver qui
//   ré-attachait des écouteurs sur tous les liens à chaque changement du DOM.
// - La position passe par des motion values : aucun re-rendu React
//   pendant que la souris bouge.
// - L'anneau ne s'anime qu'en `scale` (GPU), plus en width/height (layout).
// ============================================

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [tabindex]:not([tabindex="-1"])';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Orbe : suit la souris rapidement
  const orbX = useSpring(mouseX, { damping: 25, stiffness: 700, mass: 0.5 });
  const orbY = useSpring(mouseY, { damping: 25, stiffness: 700, mass: 0.5 });

  // Anneau : suit avec plus de lag
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.8 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.8 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Seulement sur desktop (pointer: fine) : sur mobile aucun écouteur,
    // le curseur reste invisible (opacity 0)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true); // no-op pour React si déjà true
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      setIsHovering(!!target?.closest?.(INTERACTIVE_SELECTOR));
    };

    const handleLeave = () => setIsVisible(false);
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Orbe central */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] select-none"
        style={{ x: orbX, y: orbY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
          mixBlendMode: isHovering ? 'difference' : 'normal',
        }}
        transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#838CE5',
            boxShadow: '0 0 10px rgba(131, 140, 229, 0.6)',
          }}
        />
      </motion.div>

      {/* Anneau extérieur — légèrement en retard */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] select-none"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: isVisible ? 0.6 : 0,
          scale: isHovering ? 1.8 : isClicking ? 0.9 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1.5px solid rgba(131, 140, 229, 0.5)',
          }}
        />
      </motion.div>
    </>
  );
}
