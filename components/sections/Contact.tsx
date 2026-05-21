'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare } from 'lucide-react';
import { EASE_SMOOTH, EASE_OUT_EXPO, fadeUpVariant } from '@/lib/animations';

// ============================================
// CONTACT SECTION — Formulaire + API Resend
// ============================================

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const INITIAL: FormData = { name: '', email: '', message: '' };

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormData>(INITIAL);
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocused] = useState<keyof FormData | null>(null);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'loading') return;

    setState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Une erreur est survenue.');
        setState('error');
        return;
      }

      setState('success');
      setForm(INITIAL);
      // Reset après 6s
      setTimeout(() => setState('idle'), 6000);
    } catch {
      setErrorMsg('Impossible de contacter le serveur. Réessaie.');
      setState('error');
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        paddingTop: 'clamp(4rem, 10vw, 6rem)',
        paddingBottom: 'clamp(4rem, 10vw, 6rem)',
        paddingLeft: 'clamp(1rem, 6vw, 6rem)',
        paddingRight: 'clamp(1rem, 6vw, 6rem)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
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
            Me contacter
          </motion.span>

          <motion.h2
            variants={fadeUpVariant}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: 'var(--color-text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '0 0 1rem 0',
            }}
          >
            On construit{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D6B9FC 0%, #838CE5 60%, #50207A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              quelque chose ?
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--color-muted)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Disponible pour des missions freelance, des opportunités en CDI ou
            juste une discussion tech.
          </motion.p>
        </motion.div>

        {/* Carte formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT_EXPO }}
          style={{
            background: 'rgba(18,16,26,0.7)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(131,140,229,0.15)',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow background */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '240px',
              height: '240px',
              background: 'radial-gradient(circle, rgba(80,32,122,0.25), transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <AnimatePresence mode="wait">
            {state === 'success' ? (
              /* ── État succès ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  gap: '1rem',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <CheckCircle size={52} style={{ color: '#4ADE80' }} />
                </motion.div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--color-text)', margin: 0 }}>
                  Message envoyé !
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-muted)', margin: 0 }}>
                  Je t'ai bien reçu et te répondrai rapidement sur <strong style={{ color: 'var(--color-accent-soft)' }}>{form.email || 'ton adresse'}</strong>.
                </p>
              </motion.div>
            ) : (
              /* ── Formulaire ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1 }}
                noValidate
              >
                {/* Nom + Email — 2 colonnes sur desktop */}
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: '1.25rem' }}>
                  <Field
                    icon={<User size={15} />}
                    label="Nom"
                    id="name"
                    type="text"
                    placeholder="Ton nom"
                    value={form.name}
                    onChange={handleChange('name')}
                    focused={focused === 'name'}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                  <Field
                    icon={<Mail size={15} />}
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="toi@example.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    focused={focused === 'email'}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label
                    htmlFor="message"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 500 }}
                  >
                    <MessageSquare size={14} style={{ color: 'var(--color-accent-mid)' }} />
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Décris ton projet, ta mission ou juste dis bonjour..."
                    value={form.message}
                    onChange={handleChange('message')}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(131,140,229,0.05)',
                      border: `1px solid ${focused === 'message' ? 'rgba(131,140,229,0.4)' : 'rgba(131,140,229,0.12)'}`,
                      color: 'var(--color-text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      lineHeight: 1.65,
                      resize: 'vertical',
                      minHeight: '120px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      boxSizing: 'border-box',
                      boxShadow: focused === 'message' ? '0 0 0 3px rgba(131,140,229,0.08)' : 'none',
                    }}
                  />
                </div>

                {/* Message d'erreur */}
                <AnimatePresence>
                  {state === 'error' && errorMsg && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.25)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: '#FCA5A5',
                      }}
                    >
                      <AlertCircle size={14} style={{ flexShrink: 0 }} />
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={state === 'loading'}
                  whileHover={state !== 'loading' ? { scale: 1.02 } : {}}
                  whileTap={state !== 'loading' ? { scale: 0.98 } : {}}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '13px 28px',
                    borderRadius: '10px',
                    background: state === 'loading'
                      ? 'rgba(80,32,122,0.4)'
                      : 'linear-gradient(135deg, #50207A 0%, #6B2FA0 100%)',
                    border: '1px solid rgba(131,140,229,0.3)',
                    color: '#F0EAFF',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: state === 'loading' ? 'not-allowed' : 'pointer',
                    boxShadow: state === 'loading' ? 'none' : '0 4px 24px rgba(80,32,122,0.4)',
                    transition: 'all 0.25s ease',
                    alignSelf: 'flex-end',
                    opacity: state === 'loading' ? 0.7 : 1,
                  }}
                >
                  {state === 'loading' ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(214,185,252,0.3)', borderTopColor: '#D6B9FC', borderRadius: '50%' }}
                      />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ligne alternative */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            color: 'var(--color-muted)',
          }}
        >
          Tu préfères l'email direct ?{' '}
          <a
            href="mailto:jaymooken@gmail.com"
            style={{
              color: 'var(--color-accent-mid)',
              textDecoration: 'none',
              borderBottom: '1px dashed rgba(131,140,229,0.4)',
              paddingBottom: '1px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent-soft)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-accent-mid)')}
          >
            jaymooken@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}

// ============================================
// FIELD — Input avec label + icône
// ============================================

function Field({
  icon, label, id, type, placeholder, value, onChange,
  focused, onFocus, onBlur, required,
}: {
  icon: React.ReactNode;
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  required?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={id}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--color-muted)',
          fontWeight: 500,
        }}
      >
        <span style={{ color: 'var(--color-accent-mid)' }}>{icon}</span>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: '10px',
          background: 'rgba(131,140,229,0.05)',
          border: `1px solid ${focused ? 'rgba(131,140,229,0.4)' : 'rgba(131,140,229,0.12)'}`,
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          outline: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxSizing: 'border-box',
          boxShadow: focused ? '0 0 0 3px rgba(131,140,229,0.08)' : 'none',
        }}
      />
    </div>
  );
}
