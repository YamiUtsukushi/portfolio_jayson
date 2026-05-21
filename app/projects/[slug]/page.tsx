import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, projects } from '@/data/projects';
import ProjectDetailClient from './ProjectDetailClient';

// ============================================
// PROJECT DETAIL PAGE — Static generation
// ============================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Génération statique de toutes les pages projets
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Projet introuvable' };

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Jayson`,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
