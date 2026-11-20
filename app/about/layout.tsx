import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// La page À propos est un composant client : ses métadonnées vivent ici.
export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Parcours de Jayson Mooken, développeur Full Stack : expériences en alternance et en freelance, Master Data, IA & DevOps mention Très Bien, compétences et CV à télécharger.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
