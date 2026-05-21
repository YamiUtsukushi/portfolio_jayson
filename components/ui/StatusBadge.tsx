'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

// ============================================
// STATUS BADGE
// Deployed → point vert pulsant
// In-progress → spinner bleu-violet lent
// Archived → gris sans animation
// ============================================

interface StatusBadgeProps {
  status: Project['status'];
  size?: 'sm' | 'md';
}

const statusConfig = {
  deployed: {
    label: 'Déployé',
    bg: 'rgba(34, 197, 94, 0.12)',
    border: 'rgba(34, 197, 94, 0.4)',
    textColor: '#4ADE80',
    dotColor: '#22C55E',
  },
  'in-progress': {
    label: 'En cours',
    bg: 'rgba(131, 140, 229, 0.12)',
    border: 'rgba(131, 140, 229, 0.4)',
    textColor: '#A5ABEF',
    dotColor: '#838CE5',
  },
  archived: {
    label: 'Archivé',
    bg: 'rgba(122, 112, 144, 0.12)',
    border: 'rgba(122, 112, 144, 0.3)',
    textColor: '#9A90AA',
    dotColor: '#7A7090',
  },
} as const;

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const isSmall = size === 'sm';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isSmall ? '5px' : '7px',
        padding: isSmall ? '3px 9px' : '5px 12px',
        borderRadius: '999px',
        background: config.bg,
        border: `1px solid ${config.border}`,
        fontSize: isSmall ? '11px' : '13px',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        color: config.textColor,
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Indicator */}
      {status === 'deployed' && (
        <PulsingDot color={config.dotColor} />
      )}
      {status === 'in-progress' && (
        <SpinnerDot color={config.dotColor} />
      )}
      {status === 'archived' && (
        <StaticDot color={config.dotColor} />
      )}

      <span>{config.label}</span>
    </motion.div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function PulsingDot({ color }: { color: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px' }}>
      {/* Ping ring */}
      <motion.span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          backgroundColor: color,
          opacity: 0.6,
        }}
        animate={{ scale: [1, 2], opacity: [0.6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
      />
      {/* Solid dot */}
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
    </span>
  );
}

function SpinnerDot({ color }: { color: string }) {
  return (
    <motion.span
      style={{
        display: 'inline-block',
        width: '9px',
        height: '9px',
        borderRadius: '50%',
        border: `2px solid ${color}`,
        borderTopColor: 'transparent',
        flexShrink: 0,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function StaticDot({ color }: { color: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        backgroundColor: color,
        opacity: 0.7,
        flexShrink: 0,
      }}
    />
  );
}
