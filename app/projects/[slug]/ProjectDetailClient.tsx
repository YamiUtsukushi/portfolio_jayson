'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import GithubIcon from '@/components/ui/icons/GithubIcon';
import StatusBadge from '@/components/ui/StatusBadge';
import MagneticButton from '@/components/ui/MagneticButton';
import { fadeUpVariant, staggerContainerSlow, fadeInVariant } from '@/lib/animations';
import type { Project } from '@/data/projects';

// ============================================
// PROJECT DETAIL CLIENT — Page détail projet
// ============================================

interface Props {
  project: Project;
}

export default function ProjectDetailClient({ project }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const bodyInView = useInView(bodyRef, { once: true, margin: '-80px' });

  return (
    <article
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(5rem, 14vw, 7rem)',
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
        paddingLeft: 'clamp(1rem, 4vw, 1.5rem)',
        paddingRight: 'clamp(1rem, 4vw, 1.5rem)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Back button */}
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: '3rem' }}
        >
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <motion.span
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-mid)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              <ArrowLeft size={15} />
              Retour aux projets
            </motion.span>
          </Link>
        </motion.div>

        {/* HEADER */}
        <motion.div
          ref={headerRef}
          variants={staggerContainerSlow}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '4rem' }}
        >
          {/* Status + Year */}
          <motion.div
            variants={fadeUpVariant}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <StatusBadge status={project.status} size="md" />
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--color-muted)',
              }}
            >
              <Calendar size={12} />
              {project.year}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 10px',
                borderRadius: '6px',
                background: 'rgba(131,140,229,0.08)',
                border: '1px solid rgba(131,140,229,0.15)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--color-accent-mid)',
                textTransform: 'capitalize',
              }}
            >
              <Tag size={11} />
              {project.category}
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            variants={fadeUpVariant}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 1.5rem 0',
            }}
          >
            {project.title}
          </motion.h1>

          {/* Short description */}
          <motion.p
            variants={fadeUpVariant}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: '1.1rem',
              color: 'var(--color-muted)',
              lineHeight: 1.7,
              margin: '0 0 2rem 0',
            }}
          >
            {project.shortDescription}
          </motion.p>

          {/* Tags */}
          <motion.div
            variants={fadeUpVariant}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  background: 'rgba(131,140,229,0.08)',
                  border: '1px solid rgba(131,140,229,0.2)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.8rem',
                  color: 'var(--color-accent-mid)',
                  letterSpacing: '0.02em',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUpVariant}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            {project.liveUrl && (
              <MagneticButton
                href={project.liveUrl}
                target="_blank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #50207A 0%, #6B2FA0 100%)',
                  border: '1px solid rgba(131,140,229,0.3)',
                  color: '#F0EAFF',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(80,32,122,0.35)',
                }}
              >
                <ExternalLink size={15} />
                Voir le site
              </MagneticButton>
            )}
            {project.githubUrl && (
              <MagneticButton
                href={project.githubUrl}
                target="_blank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  background: 'rgba(131,140,229,0.08)',
                  border: '1px solid rgba(131,140,229,0.25)',
                  color: 'var(--color-accent-soft)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                <GithubIcon size={15} />
                GitHub
              </MagneticButton>
            )}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(131,140,229,0.3), transparent)',
            marginBottom: '4rem',
            transformOrigin: 'left',
          }}
        />

        {/* BODY — Long description */}
        <motion.div
          ref={bodyRef}
          variants={fadeUpVariant}
          initial="hidden"
          animate={bodyInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-muted)',
            lineHeight: 1.85,
          }}
        >
          {project.longDescription.split('\n\n').map((block, i) => {
            const isHeading = !block.startsWith('•') && block.length < 80 && !block.includes('\n');
            const isList = block.includes('•');

            if (isHeading && i > 0) {
              return (
                <h3
                  key={i}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: 'var(--color-text)',
                    letterSpacing: '-0.02em',
                    marginTop: '2rem',
                    marginBottom: '1rem',
                  }}
                >
                  {block}
                </h3>
              );
            }

            if (isList) {
              const items = block
                .split('\n')
                .filter((l) => l.startsWith('•'))
                .map((l) => l.replace('•', '').trim());

              return (
                <ul key={i} style={{ margin: '1rem 0', paddingLeft: '0', listStyle: 'none' }}>
                  {items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '0.6rem',
                        color: 'var(--color-muted)',
                      }}
                    >
                      <span
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: 'var(--color-accent-mid)',
                          flexShrink: 0,
                          marginTop: '0.6rem',
                        }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={i} style={{ marginBottom: '1.25rem', color: 'var(--color-muted)' }}>
                {block}
              </p>
            );
          })}
        </motion.div>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ marginTop: '4rem' }}
          >
            <motion.h3
              variants={fadeUpVariant}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'var(--color-text)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Captures d&apos;écran
            </motion.h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                gap: '1rem',
              }}
            >
              {project.screenshots.map((src, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariant}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(131,140,229,0.15)',
                    background: 'var(--color-bg-card)',
                    aspectRatio: '16/9',
                  }}
                >
                  <img
                    src={src}
                    alt={`Screenshot ${i + 1} — ${project.title}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer CTA */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            marginTop: '5rem',
            padding: 'clamp(1.25rem, 4vw, 2.5rem)',
            borderRadius: '16px',
            background: 'rgba(80,32,122,0.1)',
            border: '1px solid rgba(131,140,229,0.15)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.4rem',
              color: 'var(--color-text)',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Tu as un projet en tête ?
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-muted)',
              marginBottom: '1.5rem',
              fontSize: '0.95rem',
            }}
          >
            Je suis disponible pour collaborer.
          </p>
          <MagneticButton
            href="mailto:jaymooken@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #50207A 0%, #6B2FA0 100%)',
              border: '1px solid rgba(131,140,229,0.3)',
              color: '#F0EAFF',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(80,32,122,0.35)',
            }}
          >
            Me contacter
          </MagneticButton>
        </motion.div>
      </div>
    </article>
  );
}
