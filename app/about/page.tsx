'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Briefcase,
  GraduationCap,
  Code2,
  Layers,
  Globe,
  Heart,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import GithubIcon from '@/components/ui/icons/GithubIcon';
import { fadeUpVariant, EASE_SMOOTH, EASE_OUT_EXPO } from '@/lib/animations';

// ============================================
// DATA — tirée du CV + README
// ============================================

const EXPERIENCES = [
  {
    title: 'Développeur FullStack Freelance',
    company: 'Indépendant',
    period: 'Nov. 2025 — Aujourd\'hui',
    location: 'Île-de-France / Remote',
    current: true,
    color: '#4ADE80',
    description:
      'Réalisation de projets web pour des clients en tant que freelance. Développement front et back selon les besoins, livraison continue, grande autonomie technique.',
    stack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Shopify'],
    highlights: [
      'Développement de thèmes et apps Shopify sur mesure',
      'Conception de SaaS et interfaces web complexes',
      'Accompagnement technique de bout en bout',
    ],
  },
  {
    title: 'Développeur FullStack',
    company: 'Atakama Technologies',
    period: 'Oct. 2023 — Sept. 2025',
    location: 'La Ciotat (Remote)',
    current: false,
    color: '#838CE5',
    description:
      'Conception "From Scratch" & Product Ownership — pilotage intégral de la création d\'un portail SaaS de gestion de projets, de la rédaction du cahier des charges à la mise en production.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Grafana', 'GitHub Actions'],
    highlights: [
      'Création de la charte graphique et maquettes UI/UX',
      'Transformation de l\'outil interne Nudge en SaaS client',
      'Monitoring temps réel avec Grafana + Prometheus',
    ],
  },
  {
    title: 'Développeur FullStack',
    company: 'L3M-Holding',
    period: 'Oct. 2022 — Sept. 2023',
    location: 'Rosny-sous-Bois',
    current: false,
    color: '#D6B9FC',
    description:
      'Développement d\'une application Shopify de gestion de coupons et personnalisation de thèmes e-commerce en Liquid.',
    stack: ['Shopify', 'Liquid', 'React', 'Node.js', 'PostgreSQL'],
    highlights: [
      'App Shopify de gestion de coupons (couverture nationale)',
      'Thèmes e-commerce custom : HTML, CSS, Liquid, JS',
      'Base de données PostgreSQL pour distribution sécurisée',
    ],
  },
];

const FORMATIONS = [
  {
    degree: 'Mastère Expert en Systèmes d\'Information',
    specialty: 'Chef de projet IA et DATA',
    school: 'Nexa Digital School',
    location: 'Paris',
    period: '2023 — 2025',
    level: 'Bac +5',
    rncp: 'Titre RNCP niveau 7',
    topics: ['DevOps', 'Cloud', 'IA', 'SCRUM'],
    color: '#D6B9FC',
  },
  {
    degree: 'Bachelor Concepteur Développeur d\'Applications',
    specialty: '',
    school: 'Doranco École Sup\' des Tech Créatives',
    location: 'Bagnolet, Île-de-France',
    period: '2022 — 2023',
    level: 'Bac +3/4',
    rncp: 'Titre RNCP niveau 6',
    topics: ['Java', 'React', 'Node.js'],
    color: '#838CE5',
  },
  {
    degree: 'Développeur d\'applications informatiques PGI / ERP',
    specialty: '',
    school: 'Doranco École Sup\' des Tech Créatives',
    location: 'Bagnolet, Île-de-France',
    period: '2022',
    level: 'Bac +2',
    rncp: 'Titre RNCP niveau 5',
    topics: ['ERP', 'PGI', 'Java'],
    color: '#50207A',
  },
  {
    degree: 'Bachelor Expert en informatique',
    specialty: '',
    school: 'Efficom Paris',
    location: 'Montrouge',
    period: '2020 — 2021',
    level: 'Bac +2',
    rncp: '',
    topics: ['Développement', 'Architecture'],
    color: '#7A7090',
  },
];

const SKILLS_CATEGORIES = [
  {
    label: 'Front-End',
    icon: '🎨',
    color: '#D6B9FC',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind', 'Sass', 'Liquid'],
  },
  {
    label: 'Back-End',
    icon: '⚙️',
    color: '#838CE5',
    skills: ['Node.js', 'Express', 'Go', 'Python', 'Java', 'PHP', 'Ruby on Rails', 'Spring Boot', 'Symfony'],
  },
  {
    label: 'Base de données',
    icon: '🗄️',
    color: '#4ADE80',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'GraphQL', 'SQLite', 'MariaDB'],
  },
  {
    label: 'Data & IA',
    icon: '🤖',
    color: '#F59E0B',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'Keras', 'Pandas', 'ETL Pipelines', 'UML / Merise'],
  },
  {
    label: 'DevOps & Cloud',
    icon: '☁️',
    color: '#38BDF8',
    skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'GitHub Actions', 'GitLab CI', 'Grafana', 'Prometheus', 'SonarQube'],
  },
  {
    label: 'Mobile & Outils',
    icon: '📱',
    color: '#FB923C',
    skills: ['Java (Android)', 'Kotlin', 'Git', 'Figma', 'Postman', 'IntelliJ', 'VSCode', 'Android Studio'],
  },
];

const SOFT_SKILLS = [
  { label: 'Esprit critique', icon: '🔍' },
  { label: 'Autonomie', icon: '⚡' },
  { label: 'Esprit d\'équipe', icon: '🤝' },
  { label: 'Persévérance', icon: '🎯' },
  { label: 'Réactivité', icon: '🚀' },
  { label: 'Adaptabilité', icon: '🌀' },
  { label: 'Gestion du temps', icon: '⏱️' },
  { label: 'Ouvert aux changements', icon: '🌱' },
];

const LANGUAGES = [
  { lang: 'Créole', level: 'Langue maternelle', pct: 100, color: '#4ADE80' },
  { lang: 'Français', level: 'Courant', pct: 98, color: '#838CE5' },
  { lang: 'Anglais', level: 'B1+', pct: 55, color: '#D6B9FC' },
];

const HOBBIES = [
  {
    icon: '🥊',
    title: 'Boxe anglaise',
    desc: 'Discipline personnelle, confiance en soi, dépassement de ses limites.',
  },
  {
    icon: '🍳',
    title: 'Cuisiner',
    desc: 'Partager avec les autres — ma recette de l\'altruisme et du travail d\'équipe.',
  },
];

// ============================================
// PAGE ABOUT
// ============================================

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(5rem, 14vw, 7rem)',
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
        paddingLeft: 'clamp(1rem, 6vw, 6rem)',
        paddingRight: 'clamp(1rem, 6vw, 6rem)',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      {/* Back link */}
      <BackLink />

      {/* Header */}
      <AboutHeader />

      {/* Expériences */}
      <Section id="xp" icon={<Briefcase size={16} />} title="Expériences professionnelles">
        <ExperienceTimeline />
      </Section>

      {/* Formations */}
      <Section id="formations" icon={<GraduationCap size={16} />} title="Diplômes & Formations">
        <FormationsGrid />
      </Section>

      {/* Compétences */}
      <Section id="stack" icon={<Code2 size={16} />} title="Compétences techniques">
        <SkillsGrid />
      </Section>

      {/* Soft skills + langues */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }} className="two-col-grid">
        <Section id="softskills" icon={<Layers size={16} />} title="Atouts personnels">
          <SoftSkillsList />
        </Section>
        <Section id="langues" icon={<Globe size={16} />} title="Langues">
          <LanguagesBlock />
        </Section>
      </div>

      {/* Centres d'intérêt */}
      <Section id="hobbies" icon={<Heart size={16} />} title="Centres d'intérêt">
        <HobbiesBlock />
      </Section>

      {/* CTA contact */}
      <ContactCTA />

      <style>{`
        @media (max-width: 700px) {
          .two-col-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 599px) {
          .about-contact-pill {
            font-size: 0.72rem !important;
            padding: 4px 9px !important;
          }
          .about-section-title {
            font-size: 1rem !important;
          }
          .about-exp-card {
            padding: 1.1rem !important;
          }
          .about-cta-box {
            padding: 2rem 1.25rem !important;
          }
        }
      `}</style>
    </main>
  );
}

// ============================================
// BACK LINK
// ============================================
function BackLink() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: EASE_SMOOTH }}
      style={{ marginBottom: '2.5rem' }}
    >
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--color-muted)',
          textDecoration: 'none',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-soft)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
      >
        <ArrowLeft size={14} />
        Retour
      </Link>
    </motion.div>
  );
}

// ============================================
// HEADER
// ============================================
function AboutHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ marginBottom: '5rem' }}
    >
      {/* Eyebrow */}
      <motion.div
        variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } } }}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}
      >
        <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'var(--color-accent-mid)' }} />
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent-mid)' }}>
          À propos de moi
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_SMOOTH, delay: 0.1 } } }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          color: 'var(--color-text)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          margin: '0 0 1.5rem 0',
        }}
      >
        Jayson{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #D6B9FC 0%, #838CE5 60%, #50207A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Mooken
        </span>
      </motion.h1>

      {/* Bio */}
      <motion.p
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_SMOOTH, delay: 0.2 } } }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          color: 'var(--color-muted)',
          lineHeight: 1.8,
          maxWidth: '620px',
          margin: '0 0 2rem 0',
        }}
      >
        Ingénieur Développeur FullStack{' '}
        <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>Bac+5</strong>,
        spécialisé dans la conception et le déploiement de produits{' '}
        <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>SaaS</strong>.
        De l'architecture de données à la création d'interfaces utilisateurs, je transforme
        les besoins métiers en solutions robustes, scalables et performantes.
        Habitué au <strong style={{ color: 'var(--color-accent-soft)', fontWeight: 500 }}>100% remote</strong>.
      </motion.p>

      {/* Contact pills */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.35 } } }}
        style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
      >
        {[
          { icon: <MapPin size={12} />, label: 'Île-de-France · Remote', href: null },
          { icon: <Mail size={12} />, label: 'jaymooken@gmail.com', href: 'mailto:jaymooken@gmail.com' },
          { icon: <Phone size={12} />, label: '06 34 04 20 59', href: 'tel:0634042059' },
          { icon: <GithubIcon size={12} />, label: 'YamiUtsukushi', href: 'https://github.com/YamiUtsukushi' },
        ].map(({ icon, label, href }) => {
          const Tag = href ? 'a' : 'span';
          return (
            <Tag
              key={label}
              href={href ?? undefined}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '8px',
                background: 'rgba(131,140,229,0.06)',
                border: '1px solid rgba(131,140,229,0.15)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                color: 'var(--color-muted)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                cursor: href ? 'pointer' : 'default',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                if (href) {
                  e.currentTarget.style.color = 'var(--color-accent-soft)';
                  e.currentTarget.style.borderColor = 'rgba(131,140,229,0.35)';
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.color = 'var(--color-muted)';
                e.currentTarget.style.borderColor = 'rgba(131,140,229,0.15)';
              }}
            >
              {icon}
              {label}
              {href?.startsWith('http') && <ExternalLink size={10} style={{ opacity: 0.5 }} />}
            </Tag>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

// ============================================
// SECTION WRAPPER
// ============================================
function Section({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ marginBottom: '4.5rem' }}
    >
      {/* Section header */}
      <motion.div
        variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } } }}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'rgba(80,32,122,0.3)',
            border: '1px solid rgba(131,140,229,0.2)',
            color: 'var(--color-accent-soft)',
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.2rem',
            color: 'var(--color-text)',
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {title}
        </h2>
        <span
          style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(131,140,229,0.2), transparent)',
            marginLeft: '8px',
          }}
        />
      </motion.div>

      {children}
    </motion.section>
  );
}

// ============================================
// EXPERIENCE TIMELINE
// ============================================
function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} style={{ position: 'relative', paddingLeft: '1.5rem' }}>
      {/* Vertical line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '8px',
          bottom: '8px',
          width: '1px',
          background: 'linear-gradient(to bottom, rgba(131,140,229,0.3), rgba(131,140,229,0.05))',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.55, ease: EASE_SMOOTH }}
            style={{ position: 'relative' }}
          >
            {/* Dot */}
            <span
              style={{
                position: 'absolute',
                left: '-1.9rem',
                top: '1rem',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: exp.color,
                boxShadow: `0 0 10px ${exp.color}80`,
                flexShrink: 0,
              }}
            />

            {/* Card */}
            <div
              style={{
                background: 'rgba(18,16,26,0.6)',
                backdropFilter: 'blur(16px)',
                border: `1px solid rgba(131,140,229,0.12)`,
                borderLeft: `2px solid ${exp.color}40`,
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${exp.color}60`;
                e.currentTarget.style.boxShadow = `0 8px 32px ${exp.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(131,140,229,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '0.6rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)', margin: 0, letterSpacing: '-0.02em' }}>
                      {exp.title}
                    </h3>
                    {exp.current && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '2px 8px', borderRadius: '6px',
                        background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
                        fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#4ADE80', fontWeight: 500,
                      }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ADE80' }} />
                        En poste
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: exp.color, fontWeight: 500 }}>
                    {exp.company}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)' }}>{exp.period}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-muted)', opacity: 0.7 }}>{exp.location}</div>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.7, margin: '0.75rem 0' }}>
                {exp.description}
              </p>

              {/* Highlights */}
              <ul style={{ listStyle: 'none', margin: '0 0 1rem 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {exp.highlights.map((h) => (
                  <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)' }}>
                    <ChevronRight size={12} style={{ color: exp.color, marginTop: '3px', flexShrink: 0 }} />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {exp.stack.map((tech) => (
                  <span key={tech} style={{
                    padding: '2px 8px', borderRadius: '5px',
                    background: `${exp.color}10`, border: `1px solid ${exp.color}25`,
                    fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', color: exp.color,
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// FORMATIONS GRID
// ============================================
function FormationsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: '1.25rem',
      }}
    >
      {FORMATIONS.map((f, i) => (
        <motion.div
          key={f.degree}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5, ease: EASE_OUT_EXPO }}
          style={{
            background: 'rgba(18,16,26,0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(131,140,229,0.12)',
            borderRadius: '14px',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${f.color}50`;
            e.currentTarget.style.boxShadow = `0 8px 32px ${f.color}20`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(131,140,229,0.12)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Level badge */}
          <span style={{
            display: 'inline-block',
            padding: '3px 10px', borderRadius: '6px', marginBottom: '1rem',
            background: `${f.color}15`, border: `1px solid ${f.color}30`,
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
            color: f.color, letterSpacing: '0.04em',
          }}>
            {f.level}
          </span>

          {/* Degree */}
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '0.95rem', color: 'var(--color-text)',
            letterSpacing: '-0.02em', lineHeight: 1.4,
            margin: '0 0 0.3rem 0',
          }}>
            {f.degree}
          </h3>

          {f.specialty && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: f.color, margin: '0 0 0.5rem 0', fontWeight: 500 }}>
              {f.specialty}
            </p>
          )}

          {/* School */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', margin: '0 0 0.3rem 0' }}>
            {f.school}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-muted)', opacity: 0.6, margin: '0 0 1rem 0' }}>
            {f.location} · {f.period}
          </p>

          {/* Topics */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {f.topics.map((t) => (
              <span key={t} style={{
                padding: '2px 8px', borderRadius: '5px',
                background: 'rgba(131,140,229,0.06)', border: '1px solid rgba(131,140,229,0.12)',
                fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: 'var(--color-muted)',
              }}>
                {t}
              </span>
            ))}
          </div>

          {f.rncp && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-muted)', opacity: 0.5, margin: '0.75rem 0 0 0' }}>
              {f.rncp}
            </p>
          )}

          {/* Accent corner */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '60px', height: '60px',
            background: `radial-gradient(circle at top right, ${f.color}15, transparent 70%)`,
            pointerEvents: 'none',
          }} />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// SKILLS GRID
// ============================================
function SkillsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
        gap: '1.25rem',
      }}
    >
      {SKILLS_CATEGORIES.map((cat, i) => (
        <motion.div
          key={cat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08, duration: 0.45, ease: EASE_SMOOTH }}
          style={{
            background: 'rgba(18,16,26,0.5)',
            border: '1px solid rgba(131,140,229,0.1)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem' }}>{cat.icon}</span>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: '0.82rem', color: cat.color, letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              {cat.label}
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {cat.skills.map((s) => (
              <span key={s} style={{
                padding: '3px 9px', borderRadius: '6px',
                background: `${cat.color}08`, border: `1px solid ${cat.color}20`,
                fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-text)',
              }}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// SOFT SKILLS
// ============================================
function SoftSkillsList() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {SOFT_SKILLS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: -14 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.06, duration: 0.4, ease: EASE_SMOOTH }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: 'rgba(18,16,26,0.4)',
            border: '1px solid rgba(131,140,229,0.08)',
          }}
        >
          <span style={{ fontSize: '0.9rem' }}>{s.icon}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
            {s.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// LANGUAGES
// ============================================
function LanguagesBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {LANGUAGES.map((lang, i) => (
        <motion.div
          key={lang.lang}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.45, ease: EASE_SMOOTH }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 500, color: 'var(--color-text)' }}>
              {lang.lang}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-muted)' }}>
              {lang.level}
            </span>
          </div>
          <div style={{ height: '4px', borderRadius: '4px', background: 'rgba(131,140,229,0.1)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${lang.pct}%` } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: EASE_SMOOTH }}
              style={{
                height: '100%',
                borderRadius: '4px',
                background: `linear-gradient(90deg, ${lang.color}, ${lang.color}80)`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// HOBBIES
// ============================================
function HobbiesBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: '1.25rem' }}>
      {HOBBIES.map((h, i) => (
        <motion.div
          key={h.title}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.12, duration: 0.45, ease: EASE_OUT_EXPO }}
          style={{
            background: 'rgba(18,16,26,0.5)',
            border: '1px solid rgba(131,140,229,0.1)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}
        >
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>{h.icon}</span>
          <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)', margin: '0 0 0.4rem 0' }}>
            {h.title}
          </h4>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--color-muted)', lineHeight: 1.65, margin: 0 }}>
            {h.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// CONTACT CTA
// ============================================
function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_SMOOTH }}
      style={{
        marginTop: '2rem',
        padding: '3rem 2.5rem',
        borderRadius: '20px',
        background: 'rgba(80,32,122,0.12)',
        border: '1px solid rgba(131,140,229,0.15)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px', height: '150px',
        background: 'radial-gradient(ellipse, rgba(80,32,122,0.3), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
        color: 'var(--color-text)', letterSpacing: '-0.03em',
        margin: '0 0 0.75rem 0',
      }}>
        On construit quelque chose ?
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.95rem',
        color: 'var(--color-muted)', lineHeight: 1.7,
        margin: '0 auto 2rem auto', maxWidth: '420px',
      }}>
        Ouvert aux opportunités en Île-de-France ou full remote.
        Disponible rapidement.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href="mailto:jaymooken@gmail.com"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #50207A 0%, #6B2FA0 100%)',
            border: '1px solid rgba(131,140,229,0.35)',
            color: '#F0EAFF', fontFamily: 'var(--font-body)',
            fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(80,32,122,0.45)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(80,32,122,0.65)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(80,32,122,0.45)'; }}
        >
          <Mail size={15} />
          Envoyer un mail
        </a>
        <a
          href="https://www.linkedin.com/in/jayson-mooken/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 22px', borderRadius: '10px',
            background: 'rgba(131,140,229,0.06)',
            border: '1px solid rgba(131,140,229,0.2)',
            color: 'var(--color-accent-soft)', fontFamily: 'var(--font-body)',
            fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(131,140,229,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(131,140,229,0.2)'; }}
        >
          <ExternalLink size={14} />
          LinkedIn
        </a>
      </div>
    </motion.div>
  );
}
