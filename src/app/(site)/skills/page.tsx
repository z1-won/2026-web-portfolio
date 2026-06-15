import Link from "next/link";
import { skillGroups } from "@/data/skills";
import { certificates } from "@/data/certificates";
import { projects } from "@/data/projects";

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ desktopWindow?: string }>;
}) {
  const { desktopWindow } = await searchParams;
  const querySuffix = desktopWindow === "1" ? "?desktopWindow=1" : "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-12">
        <p className="mb-1 font-mono text-[10px] tracking-widest text-subtle">CAPABILITIES</p>
        <h1 className="text-3xl font-bold text-text">Skills & Certificates</h1>
        <p className="mt-2 text-sm text-muted">Stack, capability categories, and project evidence.</p>
      </div>

      {/* Skill Matrix */}
      <section className="mb-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const relatedProjects = projects.filter((p) =>
              group.relatedProjectSlugs.includes(p.slug)
            );
            return (
              <div
                key={group.name}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <h2 className="mb-1 font-mono text-sm font-semibold text-text">{group.name}</h2>
                <p className="mb-4 text-xs leading-relaxed text-muted">{group.description}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-subtle"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {relatedProjects.length > 0 && (
                  <div>
                    <p className="mb-2 font-mono text-[9px] tracking-widest text-subtle">RELATED</p>
                    <div className="flex flex-col gap-1">
                      {relatedProjects.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/projects/${p.slug}${querySuffix}`}
                          className="text-xs text-muted transition-colors hover:text-accent-lime"
                        >
                          → {p.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Certificates */}
      <section>
        <p className="mb-6 font-mono text-[10px] tracking-widest text-subtle">CERTIFICATES</p>

        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Name", "Issuer", "Date", "Category"].map((h) => (
                  <th
                    key={h}
                    className="pb-3 text-left font-mono text-[10px] tracking-widest text-subtle"
                  >
                    {h.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {certificates.map((cert) => (
                <tr key={cert.name} className="group">
                  <td className="py-3 pr-4">
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text transition-colors group-hover:text-accent-lime"
                      >
                        {cert.name} ↗
                      </a>
                    ) : (
                      <span className="text-text">{cert.name}</span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-muted">{cert.issuer}</td>
                  <td className="py-3 pr-4 font-mono text-[11px] text-muted">{cert.date}</td>
                  <td className="py-3">
                    <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-subtle">
                      {cert.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {certificates.map((cert) => (
            <div key={cert.name} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-text">{cert.name}</p>
                <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-subtle">
                  {cert.category}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
              <p className="mt-1 font-mono text-[10px] text-subtle">{cert.date}</p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-accent-blue hover:underline"
                >
                  View Certificate ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
