'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects, getAllTags } from '@/data/projects';
import { fadeUpVariant, staggerContainer } from '@/lib/animations';
import type { Project } from '@/data/projects';

// ============================================
// PROJECT GRID — Filtres animés + AnimatePresence
// ============================================

type StatusFilter = 'all' | Project['status'];

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'deployed', label: 'Déployé' },
  { value: 'in-progress', label: 'En cours' },
  { value: 'archived', label: 'Archivé' },
];

export default function ProjectGrid() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [activeStatus, setActiveStatus] = useState<StatusFilter>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = getAllTags();

  const filtered = projects.filter((p) => {
    const statusMatch = activeStatus === 'all' || p.status === activeStatus;
    const tagMatch = activeTag === null || p.tags.includes(activeTag);
    return statusMatch && tagMatch;
  });

  // Trier: featured en premier, puis par année desc
  const sorted = [...filtered].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.year - a.year;
  });

  return (
    <section
      ref={ref}
      id="projets"
      style={{
        paddingTop: 'clamp(4rem, 10vw, 6rem)',
        paddingBottom: 'clamp(2.5rem, 6vw, 4rem)',
        paddingLeft: 'clamp(1rem, 4vw, 1.5rem)',
        paddingRight: 'clamp(1rem, 4vw, 1.5rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <motion.span
            variants={fadeUpVariant}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-mid)',
              marginBottom: '0.75rem',
            }}
          >
            Mes Réalisations
          </motion.span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Projets récents
          </h2>
        </motion.div>

        {/* Filtres statut */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
        >
          {STATUS_FILTERS.map(({ value, label }) => (
            <FilterButton
              key={value}
              label={label}
              isActive={activeStatus === value}
              onClick={() => {
                setActiveStatus(value);
                setActiveTag(null);
              }}
            />
          ))}
        </motion.div>

        {/* Filtres tags */}
        {allTags.length > 0 && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '3rem',
            }}
          >
            <TagButton
              label="Tous les techs"
              isActive={activeTag === null}
              onClick={() => setActiveTag(null)}
            />
            {allTags.map((tag) => (
              <TagButton
                key={tag}
                label={tag}
                isActive={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              />
            ))}
          </motion.div>
        )}

        {/* Project count */}
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--color-muted)',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          {sorted.length} projet{sorted.length !== 1 ? 's' : ''}{' '}
          {activeStatus !== 'all' || activeTag
            ? 'correspondent à ta sélection'
            : 'au total'}
        </motion.p>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 599px) {
            .filter-btn {
              padding: 6px 14px !important;
              font-size: 0.8rem !important;
            }
            .tag-btn {
              padding: 4px 10px !important;
              font-size: 0.7rem !important;
            }
          }
        `}</style>

        {/* Grid */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {sorted.length > 0 ? (
              sorted.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  color: 'var(--color-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</p>
                <p>Aucun projet ne correspond à ce filtre.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FILTER BUTTON
// ============================================

function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        background: isActive
          ? 'rgba(80,32,122,0.7)'
          : 'rgba(18,16,26,0.6)',
        borderColor: isActive
          ? 'rgba(131,140,229,0.6)'
          : 'rgba(131,140,229,0.15)',
        color: isActive ? '#EDE8FF' : '#7A7090',
        boxShadow: isActive
          ? '0 0 20px rgba(80,32,122,0.4)'
          : 'none',
      }}
      transition={{ duration: 0.2 }}
      style={{
        padding: '8px 18px',
        borderRadius: '999px',
        border: '1px solid',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: '0.85rem',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
      {label}
    </motion.button>
  );
}

// ============================================
// TAG BUTTON
// ============================================

function TagButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        background: isActive
          ? 'rgba(131,140,229,0.2)'
          : 'transparent',
        borderColor: isActive
          ? 'rgba(131,140,229,0.5)'
          : 'rgba(131,140,229,0.12)',
        color: isActive ? 'var(--color-accent-soft)' : 'var(--color-muted)',
      }}
      transition={{ duration: 0.15 }}
      style={{
        padding: '4px 12px',
        borderRadius: '6px',
        border: '1px solid',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.75rem',
        cursor: 'pointer',
      }}
    >
      {label}
    </motion.button>
  );
}
