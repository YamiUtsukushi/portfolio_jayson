import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import NoiseBg from '@/components/ui/NoiseBg';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import ScrollToTop from '@/components/ui/ScrollToTop';

// ============================================
// FONTS — Syne (titres) + DM Sans (corps)
// ============================================

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
  title: {
    default: 'Jayson — Développeur Full-Stack',
    template: '%s | Jayson',
  },
  description:
    'Portfolio de Jayson — Développeur Full-Stack passionné par les interfaces modernes, les expériences web immersives et les architectures solides.',
  keywords: ['développeur', 'full-stack', 'React', 'Next.js', 'TypeScript', 'portfolio'],
  authors: [{ name: 'Jayson', url: 'https://github.com/YamiUtsukushi' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Jayson — Développeur Full-Stack',
    description: 'Portfolio de Jayson — Développeur Full-Stack',
    siteName: 'Jayson Portfolio',
  },
  robots: { index: true, follow: true },
};

// ============================================
// ROOT LAYOUT
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen overflow-x-hidden antialiased"
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
        }}
        suppressHydrationWarning
      >
        {/* Scroll to top à chaque changement de route */}
        <ScrollToTop />

        {/* Curseur custom — desktop uniquement (CSS cursor:none déjà appliqué) */}
        <CustomCursor />

        {/* Scroll progress bar — fixed top */}
        <ScrollProgress />

        {/* Noise texture + gradient mesh blobs */}
        <NoiseBg />

        {/* Navigation */}
        <Navbar />

        {/* Page content avec transitions */}
        <PageTransition>
          <main style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </main>
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
