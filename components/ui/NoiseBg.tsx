'use client';

import { motion } from 'framer-motion';

// ============================================
// NOISE BACKGROUND
// Texture grain cinématique premium
// ============================================

export default function NoiseBg() {
  return (
    <>
      {/* SVG Noise Layer — fixed, covers entire viewport */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9997] select-none overflow-hidden"
        style={{ opacity: 0.04 }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <filter id="portfolio-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#portfolio-noise)" />
        </svg>
      </div>

      {/* Gradient mesh blobs — hero background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
      >
        {/* Blob violet top-left */}
        <motion.div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(80,32,122,0.3) 0%, rgba(80,32,122,0.05) 60%, transparent 100%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.05, 0.97, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Blob accent-mid top-right */}
        <motion.div
          className="absolute -top-20 -right-60 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(131,140,229,0.15) 0%, rgba(131,140,229,0.03) 60%, transparent 100%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 25, -15, 0],
            scale: [1, 0.95, 1.08, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />

        {/* Blob soft bottom-right */}
        <motion.div
          className="absolute bottom-0 right-0 h-[400px] w-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(214,185,252,0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -30, 10, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 6,
          }}
        />
      </div>
    </>
  );
}
