import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectHero from "./_components/ProjectHero";
import CaseStudy from "./_components/CaseStudy";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ desktopWindow?: string }>;
}) {
  const { slug } = await params;
  const { desktopWindow } = await searchParams;
  const querySuffix = desktopWindow === "1" ? "?desktopWindow=1" : "";
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <Link
        href={`/projects${querySuffix}`}
        className="mb-8 inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent-lime"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Archive
      </Link>

      <ProjectHero project={project} />
      <CaseStudy project={project} otherProjects={otherProjects} querySuffix={querySuffix} />
    </div>
  );
}
