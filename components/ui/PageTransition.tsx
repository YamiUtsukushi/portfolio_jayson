'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

// ============================================
// PAGE TRANSITION
// Wipe violet — panneau #50207A glisse gauche→droite
// puis se retire. Durée: 0.6s ease-in-out
// ============================================

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    // Pas d'animation `exit` : avec l'App Router, `children` passe déjà à la
    // nouvelle route pendant la sortie, et au retour navigateur (popstate)
    // la sortie ne se termine jamais → la page restait bloquée à opacity 0.
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Overlay d'entrée — panneau violet qui se retire */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-[9990]"
          style={{ backgroundColor: '#50207A', transformOrigin: 'left' }}
          initial={{ scaleX: 1, transformOrigin: 'right' }}
          animate={{
            scaleX: 0,
            transformOrigin: 'right',
            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0 },
          }}
        />

        {/* Contenu de la page */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
