'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';
import NextLink from 'next/link';
import GithubIcon from '@/components/ui/icons/GithubIcon';
import { navbarVariant, staggerContainer, navLinkVariant } from '@/lib/animations';

// ============================================
// NAVBAR — Glassmorphism sticky
// ============================================

const NAV_LINKS = [
  { href: '/#projets', label: 'Projets' },
  { href: '/about', label: 'À propos' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(10,10,15,0)', 'rgba(10,10,15,0.85)']
  );
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ['rgba(131,140,229,0)', 'rgba(131,140,229,0.12)']
  );

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setIsScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  // Fermer mobile menu au resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.nav
        variants={navbarVariant}
        initial="hidden"
        animate="visible"
        className="fixed left-0 right-0 top-0 z-[100]"
        style={{
          backgroundColor: navBg,
          borderBottom: `1px solid`,
          borderColor: navBorder,
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <motion.a
            href="/"
            className="group relative flex items-center gap-2 no-underline"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.3rem',
                color: 'var(--color-text)',
                letterSpacing: '-0.03em',
              }}
            >
              Jayson
              <span
                style={{
                  color: 'var(--color-accent-mid)',
                  marginLeft: '1px',
                }}
              >
                .
              </span>
            </span>
            {/* Underline glow */}
            <motion.span
              className="absolute -bottom-0.5 left-0 h-px"
              style={{ background: 'linear-gradient(90deg, #838CE5, #D6B9FC)' }}
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop links */}
          <motion.ul
            className="hidden items-center gap-8 md:flex"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <motion.li key={href} variants={navLinkVariant}>
                <NavLink href={href} label={label} />
              </motion.li>
            ))}

            {/* GitHub CTA */}
            <motion.li variants={navLinkVariant}>
              <a
                href="https://github.com/YamiUtsukushi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '8px',
                  background: 'rgba(80, 32, 122, 0.2)',
                  border: '1px solid rgba(131, 140, 229, 0.25)',
                  color: 'var(--color-accent-soft)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(80, 32, 122, 0.4)';
                  el.style.borderColor = 'rgba(131, 140, 229, 0.5)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(80, 32, 122, 0.2)';
                  el.style.borderColor = 'rgba(131, 140, 229, 0.25)';
                }}
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
                <ExternalLink size={11} style={{ opacity: 0.6 }} />
              </a>
            </motion.li>
          </motion.ul>

          {/* Mobile menu button */}
          <motion.button
            className="flex items-center justify-center rounded-lg p-2 md:hidden"
            style={{
              background: 'rgba(131, 140, 229, 0.1)',
              border: '1px solid rgba(131, 140, 229, 0.2)',
              color: 'var(--color-text)',
            }}
            onClick={() => setIsOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                overflow: 'hidden',
                borderTop: '1px solid rgba(131, 140, 229, 0.12)',
                background: 'rgba(10, 10, 15, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <motion.ul
                className="flex flex-col gap-1 px-6 py-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{ listStyle: 'none', margin: 0, padding: '1rem 1.5rem' }}
              >
                {NAV_LINKS.map(({ href, label }) => {
                  const isAnchor = href.startsWith('#') || href.startsWith('/#');
                  const MobileTag = isAnchor ? 'a' : NextLink;
                  return (
                    <motion.li key={href} variants={navLinkVariant}>
                      <MobileTag
                        href={href}
                        onClick={() => setIsOpen(false)}
                        style={{
                          display: 'block',
                          padding: '0.75rem 0',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 500,
                          fontSize: '1rem',
                          color: 'var(--color-muted)',
                          textDecoration: 'none',
                          borderBottom: '1px solid rgba(131, 140, 229, 0.08)',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = 'var(--color-text)')}
                        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = 'var(--color-muted)')}
                      >
                        {label}
                      </MobileTag>
                    </motion.li>
                  );
                })}
                <motion.li variants={navLinkVariant} style={{ paddingTop: '0.75rem' }}>
                  <a
                    href="https://github.com/YamiUtsukushi"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--color-accent-soft)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                    }}
                  >
                    <GithubIcon size={15} />
                    GitHub
                    <ExternalLink size={12} style={{ opacity: 0.6 }} />
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

// ============================================
// NAV LINK
// ============================================

function NavLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith('http');
  const isAnchor = href.startsWith('#') || href.startsWith('/#');
  const Tag = isExternal || isAnchor ? 'a' : NextLink;

  return (
    <Tag
      href={href}
      className="group relative"
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: '0.9rem',
        color: 'var(--color-muted)',
        textDecoration: 'none',
        transition: 'color 0.25s ease',
        paddingBottom: '2px',
        display: 'inline-block',
        position: 'relative',
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = 'var(--color-text)')}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = 'var(--color-muted)')}
    >
      {label}
      <motion.span
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          height: '1px',
          background: 'linear-gradient(90deg, var(--color-accent-mid), var(--color-accent-soft))',
        }}
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </Tag>
  );
}
