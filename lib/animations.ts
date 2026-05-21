import type { Variants } from 'framer-motion';

// ============================================
// EASE CURVES
// ============================================

export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ============================================
// FADE UP — section reveals
// ============================================

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export const fadeUpFastVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
};

// ============================================
// STAGGER CONTAINERS
// ============================================

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// LETTER-BY-LETTER (Hero title)
// ============================================

export const letterVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

export const letterContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

// ============================================
// CARD — project cards avec exit
// ============================================

export const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: EASE_SMOOTH },
  },
};

// ============================================
// SLIDE — page transitions
// ============================================

export const slideInFromLeft: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '0%',
    transition: { duration: 0.6, ease: EASE_IN_OUT },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.6, ease: EASE_IN_OUT },
  },
};

export const pageWipeVariant: Variants = {
  initial: { scaleX: 0, transformOrigin: 'left' },
  animate: {
    scaleX: 1,
    transition: { duration: 0.35, ease: EASE_IN_OUT },
  },
  exit: {
    scaleX: 0,
    transformOrigin: 'right',
    transition: { duration: 0.35, ease: EASE_IN_OUT },
  },
};

export const pageContentVariant: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.35, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: EASE_SMOOTH },
  },
};

// ============================================
// NAVBAR
// ============================================

export const navbarVariant: Variants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const navLinkVariant: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

// ============================================
// HOVER PREVIEW
// ============================================

export const previewVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 5,
    transition: { duration: 0.15, ease: EASE_SMOOTH },
  },
};

// ============================================
// SCALE UP (blob, decoration)
// ============================================

export const scaleUpVariant: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: EASE_OUT_EXPO },
  },
};
