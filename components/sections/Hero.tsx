'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, MapPin, Code2, Zap } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import GithubIcon from '@/components/ui/icons/GithubIcon';
import { fadeUpVariant, EASE_SMOOTH, EASE_OUT_EXPO } from '@/lib/animations';

// ============================================
// HERO — Layout asymétrique, non centré
// Texte gauche · Carte flottante droite
// ============================================

const ROTATING_WORDS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'PHP',
];

const STATS = [
  { value: '3+', label: 'ans d\'exp.' },
  { value: '10+', label: 'projets' },
  { value: 'Bac+5', label: 'diplôme' },
  { value: 'Freelance', label: 'disponible' },
];

const STACK = [
  { name: 'Next.js', color: '#EDE8FF' },
  { name: 'TypeScript', color: '#838CE5' },
  { name: 'React', color: '#D6B9FC' },
  { name: 'Node.js', color: '#4ADE80' },
  { name: 'Python', color: '#838CE5' },
  { name: 'Docker', color: '#D6B9FC' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [wordIndex, setWordIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cycle des mots
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Clignotement curseur
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(5rem, 14vw, 6rem)',
        paddingBottom: 'clamp(2.5rem, 6vw, 4rem)',
        paddingLeft: 'clamp(1rem, 6vw, 6rem)',
        paddingRight: 'clamp(1rem, 4vw, 4rem)',
        position: 'relative',
      }}
    >
      {/* Layout principal — deux colonnes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          width: '100%',
          maxWidth: '95%',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* ===== COLONNE GAUCHE ===== */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >

          {/* Eyebrow label — pas de pill générique */}
          <motion.div
            variants={fadeUpVariant}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '32px',
                height: '1px',
                background: 'var(--color-accent-mid)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-mid)',
              }}
            >
              Portfolio · 2025
            </span>
          </motion.div>

          {/* Titre principal — asymétrique, pas centré */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Ligne 1 — langue qui change avec underline animé */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: {
                  opacity: 1, x: 0,
                  transition: { duration: 0.7, ease: EASE_SMOOTH, delay: 0.1 },
                },
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1.15,
                position: 'relative',
                display: 'block',
                overflow: 'visible',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #D6B9FC 0%, #838CE5 60%, #50207A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>

              {/* Underline animé */}
              <motion.span
                key={`ul-${wordIndex}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15, ease: EASE_SMOOTH }}
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #838CE5, #D6B9FC)',
                  transformOrigin: 'left',
                  borderRadius: '2px',
                }}
              />
            </motion.div>

            {/* Ligne 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: {
                  opacity: 1, x: 0,
                  transition: { duration: 0.7, ease: EASE_SMOOTH, delay: 0.2 },
                },
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 2.6vw, 2rem)',
                  color: 'var(--color-muted)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.5,
                  paddingBottom: '0.15em',
                  maxWidth: '640px',
                }}
              >
                m&apos;a appris que deux caractères mal placés peuvent ruiner une journée entière
                <span style={{ color: 'var(--color-accent-mid)' }}>.</span>
                {' '}J&apos;appelle ça du frisson
                <span style={{ color: 'var(--color-accent-mid)' }}>.</span>
              </span>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1, y: 0,
                transition: { duration: 0.6, ease: EASE_SMOOTH, delay: 0.45 },
              },
            }}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'var(--color-muted)',
              lineHeight: 1.75,
              maxWidth: '480px',
            }}
          >
            Ingénieur Développeur <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>Full Stack</strong> avec
            3 ans d&apos;expérience dans la conception et le déploiement de produits SaaS, d&apos;applications web et de
            solutions e-commerce. Maîtrise de l&apos;ensemble de la chaîne de développement : architecture, back-end
            (Node.js, Python, Java), front-end (React, Next.js, TypeScript) et DevOps (Docker, CI/CD). Disponible
            rapidement pour une mission en{' '}
            <strong style={{ color: 'var(--color-accent-soft)', fontWeight: 500 }}>CDI ou CDD</strong>{' '}
            en Île-de-France ou full remote.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1, y: 0,
                transition: { duration: 0.6, ease: EASE_SMOOTH, delay: 0.55 },
              },
            }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <MagneticButton
              href="#projets"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 26px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #50207A 0%, #6B2FA0 100%)',
                border: '1px solid rgba(131, 140, 229, 0.35)',
                color: '#F0EAFF',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(80, 32, 122, 0.45), 0 1px 0 rgba(214,185,252,0.15) inset',
                whiteSpace: 'nowrap',
              }}
            >
              Voir les projets
              <ArrowRight size={15} />
            </MagneticButton>

            <MagneticButton
              href="https://github.com/YamiUtsukushi"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 22px',
                borderRadius: '10px',
                background: 'rgba(131, 140, 229, 0.06)',
                border: '1px solid rgba(131, 140, 229, 0.2)',
                color: 'var(--color-accent-soft)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.9rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <GithubIcon size={15} />
              GitHub
            </MagneticButton>

            <a
              href="mailto:jaymooken@gmail.com"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--color-muted)',
                textDecoration: 'none',
                borderBottom: '1px dashed rgba(122,112,144,0.4)',
                paddingBottom: '1px',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent-soft)';
                e.currentTarget.style.borderColor = 'var(--color-accent-mid)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-muted)';
                e.currentTarget.style.borderColor = 'rgba(122,112,144,0.4)';
              }}
            >
              ou envoie un mail →
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.5, delay: 0.7, ease: EASE_SMOOTH },
              },
            }}
            className="hero-stats-row"
            style={{
              display: 'flex',
              gap: '0',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(131,140,229,0.1)',
              flexWrap: 'wrap',
            }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="hero-stat-item"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.75 + i * 0.08, duration: 0.4, ease: EASE_SMOOTH }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  paddingRight: '2rem',
                  marginRight: '2rem',
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(131,140,229,0.1)' : 'none',
                }}
              >
                <span
                  className="hero-stat-value"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    color: stat.value === '✓' ? '#4ADE80' : 'var(--color-text)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    color: 'var(--color-muted)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ===== COLONNE DROITE — Carte flottante ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT_EXPO }}
          className="hero-card-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Carte principale — Terminal */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'rgba(18, 16, 26, 0.8)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(131,140,229,0.2)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(80,32,122,0.35), 0 0 0 1px rgba(131,140,229,0.05)',
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                borderBottom: '1px solid rgba(131,140,229,0.1)',
                background: 'rgba(80,32,122,0.08)',
              }}
            >
              {['#FF5F57', '#FFBD2E', '#27C93F'].map((c) => (
                <span
                  key={c}
                  style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }}
                />
              ))}
              <span
                style={{
                  marginLeft: '8px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  color: 'var(--color-muted)',
                }}
              >
                jayson.config.ts
              </span>
            </div>

            {/* Code */}
            <div style={{ padding: '1.25rem 1.5rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.8rem', lineHeight: 1.75 }}>
              {[
                { indent: 0, content: <><Tok c="#838CE5">const</Tok> <Tok c="#D6B9FC">dev</Tok> <Tok c="#7A7090">=</Tok> {'{'}</> },
                { indent: 1, content: <><Tok c="#4ADE80">name</Tok><Tok c="#7A7090">:</Tok> <Tok c="#D6B9FC">&quot;Jayson Mooken&quot;</Tok><Tok c="#7A7090">,</Tok></> },
                { indent: 1, content: <><Tok c="#4ADE80">age</Tok><Tok c="#7A7090">:</Tok> <Tok c="#838CE5">24</Tok><Tok c="#7A7090">,</Tok></> },
                { indent: 1, content: <><Tok c="#4ADE80">location</Tok><Tok c="#7A7090">:</Tok> <Tok c="#D6B9FC">&quot;Île-de-France 🇫🇷&quot;</Tok><Tok c="#7A7090">,</Tok></> },
                { indent: 1, content: <><Tok c="#4ADE80">level</Tok><Tok c="#7A7090">:</Tok> <Tok c="#D6B9FC">&quot;Bac+5 Expert Dev&quot;</Tok><Tok c="#7A7090">,</Tok></> },
                { indent: 1, content: <><Tok c="#4ADE80">xp</Tok><Tok c="#7A7090">:</Tok> <Tok c="#D6B9FC">&quot;3+ ans (dont freelance)&quot;</Tok><Tok c="#7A7090">,</Tok></> },
                { indent: 1, content: <><Tok c="#4ADE80">open</Tok><Tok c="#7A7090">:</Tok> <Tok c="#838CE5">true</Tok><Tok c="#7A7090">,</Tok></> },
                { indent: 0, content: <><Tok c="#EDE8FF">{'}'};</Tok></> },
                { indent: 0, content: <span style={{ color: 'transparent' }}>.</span> },
                { indent: 0, content: <><Tok c="#7A7090">// On construit quelque chose ?</Tok></> },
                {
                  indent: 0,
                  content: (
                    <>
                      <Tok c="#838CE5">{'>'}</Tok>
                      <span style={{ color: 'var(--color-text)' }}> _</span>
                      <span style={{ opacity: cursorVisible ? 1 : 0, color: 'var(--color-accent-mid)' }}>|</span>
                    </>
                  ),
                },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.06, duration: 0.3 }}
                  style={{ paddingLeft: `${line.indent * 1.2}rem` }}
                >
                  {line.content}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stack tags — petite carte secondaire */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{
              background: 'rgba(18,16,26,0.7)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(131,140,229,0.15)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <Code2 size={13} style={{ color: 'var(--color-accent-mid)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Stack principal
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {STACK.map((tech, i) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.07, duration: 0.3 }}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    background: `${tech.color}10`,
                    border: `1px solid ${tech.color}30`,
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    color: tech.color,
                    letterSpacing: '0.02em',
                  }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Status — disponible */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.75rem 1.25rem',
              background: 'rgba(34,197,94,0.06)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '10px',
            }}
          >
            {/* Pulsing dot */}
            <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px', flexShrink: 0 }}>
              <motion.span
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22C55E', opacity: 0.6 }}
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
              <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, color: '#4ADE80' }}>
              Disponible pour nouveaux projets
            </span>
            <Zap size={12} style={{ color: '#4ADE80', marginLeft: 'auto', opacity: 0.7, flexShrink: 0 }} />
          </motion.div>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '4px' }}>
            <MapPin size={12} style={{ color: 'var(--color-muted)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              France — Remote friendly
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — bas de page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--color-accent-mid), transparent)',
          }}
        />
      </motion.div>

      {/* Grid CSS pour layout responsive */}
      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 7fr 5fr !important;
          }
        }
        @media (max-width: 899px) {
          .hero-card-col {
            display: none !important;
          }
          .hero-grid {
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 599px) {
          .hero-stats-row {
            padding-top: 1.25rem !important;
          }
          .hero-stat-item {
            padding-right: 0.9rem !important;
            margin-right: 0.9rem !important;
          }
          .hero-stat-value {
            font-size: 1.1rem !important;
          }
        }
        @media (max-width: 400px) {
          .hero-stat-item {
            padding-right: 0.6rem !important;
            margin-right: 0.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ============================================
// TOKEN — couleur de syntaxe
// ============================================

function Tok({ c, children }: { c: string; children: React.ReactNode }) {
  return <span style={{ color: c }}>{children}</span>;
}
