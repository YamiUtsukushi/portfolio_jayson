'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import GithubIcon from '@/components/ui/icons/GithubIcon';
import StatusBadge from '@/components/ui/StatusBadge';
import { cardVariant, previewVariant } from '@/lib/animations';
import type { Project } from '@/data/projects';

// ============================================
// PROJECT CARD — 3D Tilt + Preview Hover + Glow
// Pas de <Link> wrapper pour éviter les <a> imbriqués
// Navigation via useRouter sur le onClick de la card
// ============================================

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Désactiver tilt + preview sur touch/mobile
  // useEffect pour éviter le hydration mismatch (window n'existe pas côté SSR)
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Motion values pour le tilt
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  // Springs pour un mouvement fluide
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 30, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 30, mass: 0.5 });
  const springGlowX = useSpring(glowX, { stiffness: 200, damping: 25 });
  const springGlowY = useSpring(glowY, { stiffness: 200, damping: 25 });

  // Glow dynamique basé sur la position de la souris
  const glowBackground = useTransform(
    [springGlowX, springGlowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(131,140,229,0.15) 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rawRotateX.set(((y - centerY) / centerY) * -15);
    rawRotateY.set(((x - centerX) / centerX) * 15);
    glowX.set((x / rect.width) * 100);
    glowY.set((y / rect.height) * 100);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Ne pas naviguer si on clique sur un lien externe (GitHub / Live)
    const target = e.target as HTMLElement;
    if (target.closest('a[href^="http"]')) return;
    router.push(`/projects/${project.slug}`);
  };

  return (
    <>
      <motion.div
        layout
        variants={cardVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        ref={cardRef}
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') router.push(`/projects/${project.slug}`); }}
        aria-label={`Voir le projet ${project.title}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <motion.div
          className="glass-card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            gap: '1rem',
          }}
          animate={{
            boxShadow: isHovered
              ? '0 20px 60px rgba(80,32,122,0.5), 0 0 0 1px rgba(131,140,229,0.25)'
              : '0 8px 32px rgba(80,32,122,0.2)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow dynamique */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: glowBackground,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Header : initiale + status badge */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(80,32,122,0.4) 0%, rgba(131,140,229,0.2) 100%)',
                border: '1px solid rgba(131,140,229,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transform: 'translateZ(20px)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: 'var(--color-accent-mid)',
                }}
              >
                {project.title[0]}
              </span>
            </div>

            <div style={{ transform: 'translateZ(15px)' }}>
              <StatusBadge status={project.status} size="sm" />
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transform: 'translateZ(10px)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.15rem',
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                lineHeight: 1.65,
                margin: 0,
                flex: 1,
              }}
            >
              {project.shortDescription}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: 'rgba(131,140,229,0.08)',
                    border: '1px solid rgba(131,140,229,0.15)',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: 'var(--color-accent-mid)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: 'rgba(122,112,144,0.08)',
                    border: '1px solid rgba(122,112,144,0.15)',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-muted)',
                  }}
                >
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Footer — liens externes + CTA texte */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(131,140,229,0.1)',
              transform: 'translateZ(8px)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                color: 'var(--color-accent-mid)',
                pointerEvents: 'none',
              }}
            >
              Voir le projet
              <ArrowUpRight size={14} />
            </span>

            {/* Liens externes — vrais <a> sans nesting problématique */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {project.githubUrl && (
                <ExternalActionLink
                  href={project.githubUrl}
                  icon={<GithubIcon size={14} />}
                  label="GitHub"
                />
              )}
              {project.liveUrl && (
                <ExternalActionLink
                  href={project.liveUrl}
                  icon={<ExternalLink size={14} />}
                  label="Live"
                />
              )}
            </div>
          </div>

          {/* Shimmer border on hover */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              border: '1px solid rgba(131,140,229,0.3)',
              pointerEvents: 'none',
              opacity: 0,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Hover Preview — désactivé sur touch */}
      <AnimatePresence>
        {isHovered && !isTouch && (
          <HoverPreview
            title={project.title}
            tag={project.tags[0] ?? ''}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// EXTERNAL ACTION LINK — simple <a> tag
// Pas de motion.a pour éviter tout nesting futur
// ============================================

function ExternalActionLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
        borderRadius: '7px',
        background: 'rgba(131,140,229,0.1)',
        border: '1px solid rgba(131,140,229,0.2)',
        color: 'var(--color-muted)',
        textDecoration: 'none',
        transition: 'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.color = 'var(--color-accent-soft)';
        el.style.background = 'rgba(131,140,229,0.2)';
        el.style.borderColor = 'rgba(131,140,229,0.4)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.color = 'var(--color-muted)';
        el.style.background = 'rgba(131,140,229,0.1)';
        el.style.borderColor = 'rgba(131,140,229,0.2)';
      }}
    >
      {icon}
    </a>
  );
}

// ============================================
// HOVER PREVIEW
// ============================================

function HoverPreview({
  title,
  tag,
  mouseX,
  mouseY,
}: {
  title: string;
  tag: string;
  mouseX: number;
  mouseY: number;
}) {
  const padding = 20;
  const previewW = 200;
  const previewH = 80;

  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 900;

  let left = mouseX + padding;
  let top = mouseY - previewH / 2;

  if (left + previewW > viewportW - 20) left = mouseX - previewW - padding;
  if (top < 20) top = 20;
  if (top + previewH > viewportH - 20) top = viewportH - previewH - 20;

  return (
    <motion.div
      variants={previewVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        position: 'fixed',
        left,
        top,
        zIndex: 9990,
        pointerEvents: 'none',
        width: `${previewW}px`,
      }}
    >
      <div
        style={{
          background: 'rgba(18,16,26,0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(131,140,229,0.25)',
          borderRadius: '10px',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          boxShadow: '0 8px 32px rgba(80,32,122,0.3)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.8rem',
            color: 'var(--color-text)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </span>
        {tag && (
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.7rem',
              color: 'var(--color-accent-mid)',
              opacity: 0.8,
            }}
          >
            {tag}
          </span>
        )}
      </div>
    </motion.div>
  );
}
