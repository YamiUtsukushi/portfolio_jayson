import Contact from '@/components/sections/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Jayson Mooken — Développeur Full Stack disponible pour des missions en CDI, CDD ou freelance.',
};

// ============================================
// PAGE CONTACT
// ============================================

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        paddingTop: 'clamp(5rem, 14vw, 7rem)',
      }}
    >
      <Contact />
    </main>
  );
}
