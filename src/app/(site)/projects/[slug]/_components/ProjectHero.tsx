import Image from "next/image";
import type { Project } from "@/data/projects";
import { getStatusClass } from "@/lib/utils/project-utils";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-raised">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <span className="font-mono text-sm text-subtle">{project.category.join(" / ")}</span>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className={`rounded border px-2 py-0.5 font-mono text-[10px] ${getStatusClass(project.status, "border")}`}>
            {project.status}
          </span>
          <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
            {project.type}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-text md:text-4xl">{project.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5 text-[10px]">
          <span className="font-mono text-subtle">{project.period}</span>
          <span className="text-subtle">·</span>
          <span className="font-mono text-subtle">{project.role.join(", ")}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-subtle">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded border border-border px-4 py-2 text-xs text-muted transition-colors hover:border-text hover:text-text"
            >
              GitHub ↗
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded border border-accent-lime bg-accent-lime px-4 py-2 text-xs font-semibold text-bg transition-opacity hover:opacity-90"
            >
              Live Demo ↗
            </a>
          )}
          {project.links.velog && (
            <a
              href={project.links.velog}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded border border-border px-4 py-2 text-xs text-muted transition-colors hover:border-accent-pink hover:text-accent-pink"
            >
              Retrospective ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
