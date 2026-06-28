import { PROJECTS, findProject, findNext } from '@/lib/projects';
import { notFound } from 'next/navigation';
import CaseStudy from './CaseStudy';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = findProject(slug);
  if (!p) return { title: 'Sheronpinto®' };
  return {
    title: `${p.title} — Sheronpinto®`,
    description: p.description
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const next = findNext(slug);
  const index = PROJECTS.findIndex((p) => p.id === slug);
  return (
    <CaseStudy
      project={project}
      next={next}
      index={index}
      total={PROJECTS.length}
    />
  );
}
