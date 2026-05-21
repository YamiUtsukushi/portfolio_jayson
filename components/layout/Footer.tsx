'use client';

import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import GithubIcon from '@/components/ui/icons/GithubIcon';
import { fadeUpVariant } from '@/lib/animations';

// ============================================
// FOOTER
// ============================================

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        borderTop: '1px solid rgba(131, 140, 229, 0.1)',
        paddingTop: '3rem',
        paddingBottom: '2rem',
        marginTop: '6rem',
      }}
    >
      {/* Gradient line top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-1px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #838CE5, transparent)',
        }}
      />

      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          paddingLeft: 'clamp(1.5rem, 4vw, 2rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 2rem)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.5rem',
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
            }}
          >
            Jayson
            <span style={{ color: 'var(--color-accent-mid)' }}>.</span>
          </span>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <SocialLink
              href="https://github.com/YamiUtsukushi"
              label="GitHub"
              icon={<GithubIcon size={18} />}
            />
            <SocialLink
              href="mailto:jaymooken@gmail.com"
              label="Email"
              icon={<Mail size={18} />}
            />
          </div>

          {/* Copyright */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--color-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>© {year} Jayson — Construit avec</span>
            <Heart
              size={12}
              style={{ color: '#838CE5', fill: '#838CE5', flexShrink: 0 }}
            />
            <span>Next.js & Framer Motion</span>
          </p>
          </div>
      </motion.div>
    </footer>
  );
}

// ============================================
// SOCIAL LINK
// ============================================

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'rgba(131, 140, 229, 0.08)',
        border: '1px solid rgba(131, 140, 229, 0.2)',
        color: 'var(--color-muted)',
        textDecoration: 'none',
        transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.color = 'var(--color-accent-soft)';
        el.style.background = 'rgba(131, 140, 229, 0.15)';
        el.style.borderColor = 'rgba(131, 140, 229, 0.4)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.color = 'var(--color-muted)';
        el.style.background = 'rgba(131, 140, 229, 0.08)';
        el.style.borderColor = 'rgba(131, 140, 229, 0.2)';
      }}
    >
      {icon}
    </motion.a>
  );
}
