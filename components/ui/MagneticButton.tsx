'use client';

import { useRef, type ReactNode, type CSSProperties } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ============================================
// MAGNETIC BUTTON
// Attire le curseur dans un rayon de 80px
// Max 15px de déplacement, spring back au leave
// ============================================

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  radius?: number;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  style,
  radius = 80,
  strength = 0.4,
  onClick,
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 15, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const dist = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (dist < radius) {
      const maxOffset = 15;
      const factor = (1 - dist / radius) * strength;
      x.set(Math.min(deltaX * factor, maxOffset));
      y.set(Math.min(deltaY * factor, maxOffset));
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: 'inline-flex', alignItems: 'center' }}
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
          aria-label={ariaLabel}
          className={className}
          style={style}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className={className}
          style={style}
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return inner;
}
