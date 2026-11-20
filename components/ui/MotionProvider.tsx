'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// ============================================
// MOTION PROVIDER
// Si le visiteur a activé « réduire les animations » dans son système,
// Framer Motion coupe les animations de mouvement (transform) et garde
// les fondus. Moins de travail pour les machines modestes, et plus
// confortable pour les personnes sensibles au mouvement.
// ============================================

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
