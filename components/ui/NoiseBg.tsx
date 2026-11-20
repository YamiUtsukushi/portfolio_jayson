'use client';

import { motion } from 'framer-motion';

// ============================================
// GRADIENT MESH — blobs violets animés en fond
//
// Le grain cinématique est rendu par `body::before` dans globals.css :
// une petite tuile SVG rastérisée une seule fois puis répétée.
// (L'ancienne couche <feTurbulence> plein écran ici était un doublon
// recalculé par le navigateur, très coûteux.)
//
// Les blobs n'ont pas de `filter: blur()` : leur radial-gradient se fond
// déjà dans la transparence, et un flou de 80–100px animé en continu
// forçait le navigateur à recalculer de grandes surfaces à chaque image.
// Ils n'animent que `transform`, géré par la carte graphique.
// ============================================

const BLOB_BASE: React.CSSProperties = {
  willChange: 'transform',
};

export default function NoiseBg() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
    >
      {/* Blob violet top-left */}
      <motion.div
        className="absolute -top-60 -left-60 h-[900px] w-[900px] rounded-full"
        style={{
          ...BLOB_BASE,
          background:
            'radial-gradient(circle at center, rgba(80,32,122,0.28) 0%, rgba(80,32,122,0.1) 35%, rgba(80,32,122,0.03) 55%, transparent 70%)',
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob accent-mid top-right */}
      <motion.div
        className="absolute -top-40 -right-80 h-[800px] w-[800px] rounded-full"
        style={{
          ...BLOB_BASE,
          background:
            'radial-gradient(circle at center, rgba(131,140,229,0.14) 0%, rgba(131,140,229,0.05) 35%, rgba(131,140,229,0.015) 55%, transparent 70%)',
        }}
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Blob soft bottom-right */}
      <motion.div
        className="absolute -bottom-40 -right-40 h-[700px] w-[1000px] rounded-full"
        style={{
          ...BLOB_BASE,
          background:
            'radial-gradient(ellipse at center, rgba(214,185,252,0.07) 0%, rgba(214,185,252,0.025) 40%, transparent 70%)',
        }}
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -30, 10, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
    </div>
  );
}
