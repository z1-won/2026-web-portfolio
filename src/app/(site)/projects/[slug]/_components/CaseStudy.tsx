import Link from "next/link";
import type { Project } from "@/data/projects";

const SECTIONS = [
  { id: "overview",        label: "Overview" },
  { id: "role",            label: "My Role" },
  { id: "features",        label: "Key Features" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "learning",        label: "Learning" },
];

type Props = {
  project: Project;
  otherProjects: Project[];
  querySuffix: string;
};

export default function CaseStudy({ project, otherProjects, querySuffix }: Props) {
  return (
    <>
      <div className="flex gap-12">
        {/* Sticky nav (desktop) */}
        <aside className="hidden w-40 shrink-0 md:block">
          <nav className="sticky top-20 flex flex-col gap-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded px-3 py-2 text-xs text-muted transition-colors hover:bg-surface hover:text-text"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1 flex flex-col gap-12">
          <section id="overview">
            <h2 className="mb-4 font-mono text-[10px] tracking-widest text-subtle">OVERVIEW</h2>
            <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
          </section>

          <section id="role">
            <h2 className="mb-4 font-mono text-[10px] tracking-widest text-subtle">MY ROLE</h2>
            <ul className="flex flex-col gap-2">
              {project.contribution.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="mt-0.5 shrink-0 font-mono text-[10px] text-accent-lime">0{i + 1}</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section id="features">
            <h2 className="mb-4 font-mono text-[10px] tracking-widest text-subtle">KEY FEATURES</h2>
            <ul className="flex flex-col gap-2">
              {project.features.map((f, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent-lime" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section id="troubleshooting">
            <h2 className="mb-4 font-mono text-[10px] tracking-widest text-subtle">TROUBLESHOOTING</h2>
            <div className="flex flex-col gap-3">
              {project.troubleshooting.map((t, i) => (
                <div key={i} className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-sm leading-relaxed text-muted">{t}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="learning">
            <h2 className="mb-4 font-mono text-[10px] tracking-widest text-subtle">LEARNING</h2>
            <div className="flex flex-col gap-3">
              {project.learning.map((l, i) => (
                <div key={i} className="border-l-2 border-accent-lime pl-4">
                  <p className="text-sm leading-relaxed text-muted">{l}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Related projects */}
      <div className="mt-16 border-t border-border pt-12">
        <p className="mb-6 font-mono text-[10px] tracking-widest text-subtle">MORE PROJECTS</p>
        <div className="flex flex-wrap gap-3">
          {otherProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}${querySuffix}`}
              className="rounded border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-accent-lime/50 hover:text-text"
            >
              {p.title} →
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
