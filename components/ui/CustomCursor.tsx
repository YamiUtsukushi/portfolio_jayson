'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ============================================
// CUSTOM CURSOR
// Orbe violet 12px avec lag (lerp) + anneau extérieur
// Expand à 2.5x + mix-blend-mode:difference sur hover
// ============================================

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Orbe : suit la souris rapidement
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  // Anneau : suit avec plus de lag
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Seulement sur desktop (pointer: fine)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Détection hover sur éléments interactifs
    const handleElementEnter = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label, [tabindex]'
    );

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementEnter);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    // Observer pour les éléments ajoutés dynamiquement
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label, [tabindex]'
      );
      newElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
        el.addEventListener('mouseenter', handleElementEnter);
        el.addEventListener('mouseleave', handleElementLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* Orbe central */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] select-none"
        style={{
          x: orbX,
          y: orbY,
          translateX: '-50%',
          translateY: '-50%',
        }}
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
        ref={ringRef}
        className="pointer-events-none fixed z-[9999] select-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.6 : 0,
          scale: isHovering ? 1.5 : isClicking ? 0.9 : 1,
          width: isHovering ? '44px' : '36px',
          height: isHovering ? '44px' : '36px',
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1.5px solid rgba(131, 140, 229, 0.5)',
            backgroundColor: 'transparent',
          }}
        />
      </motion.div>
    </>
  );
}
