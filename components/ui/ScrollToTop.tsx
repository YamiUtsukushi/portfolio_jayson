'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// ============================================
// SCROLL TO TOP — Remet la page en haut à chaque navigation
// Désactive la restauration automatique du navigateur
// ============================================

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Désactive la restauration de scroll du navigateur
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Double appel pour s'assurer que ça passe après les transitions Framer Motion
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
