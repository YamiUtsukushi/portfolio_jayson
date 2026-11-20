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
import MotionProvider from '@/components/ui/MotionProvider';
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';

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
  // Base des URLs absolues (image d'aperçu, canonical…)
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Jayson Mooken',
    'développeur full stack',
    'développeur JavaScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Next.js',
    'TypeScript',
    'DevOps',
    'Shopify',
    'portfolio',
    'Île-de-France',
  ],
  authors: [{ name: SITE_NAME, url: 'https://github.com/YamiUtsukushi' }],
  creator: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
        <MotionProvider>
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
        </MotionProvider>
      </body>
    </html>
  );
}
