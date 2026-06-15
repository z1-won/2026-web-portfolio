import Link from "next/link";
import type { Project } from "@/data/projects";
import { C } from "./tokens";
import { FolderSVG } from "./Icons";
import StatusPill from "./StatusPill";

type Props = {
  project: Project;
  projectHref: string;
  onClose: () => void;
};

export default function DetailPanel({ project, projectHref, onClose }: Props) {
  return (
    <aside
      className="flex w-[220px] shrink-0 flex-col overflow-y-auto border-l"
      style={{ borderColor: C.border, background: "#F5F5F5" }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: C.border }}>
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.textSec }}>Info</span>
        <button
          onClick={onClose}
          className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] hover:bg-black/10"
          style={{ color: C.textSec }}
        >✕</button>
      </div>

      <div className="flex flex-col items-center gap-2 py-6 border-b" style={{ borderColor: C.border }}>
        <FolderSVG type={project.type} size={72} />
        <p className="max-w-[170px] text-center text-[13px] font-medium leading-tight" style={{ color: C.textPri }}>
          {project.title}
        </p>
        <StatusPill status={project.status} />
      </div>

      <div className="px-3 py-3 space-y-2 border-b" style={{ borderColor: C.border }}>
        {[
          ["Kind",   project.type],
          ["Period", project.period],
          ["Role",   project.role.join(", ")],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between text-[11px] gap-2">
            <span style={{ color: C.textSec }}>{k}</span>
            <span className="text-right" style={{ color: C.textPri }}>{v}</span>
          </div>
        ))}
        <div className="text-[11px]">
          <span className="block mb-1" style={{ color: C.textSec }}>Stack</span>
          <div className="flex flex-wrap gap-1">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded border px-1.5 py-0.5 font-mono text-[9px]"
                style={{ borderColor: "#D0D0D0", color: C.textSec, background: "white" }}
              >{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-3 py-3 border-b text-[11px] leading-relaxed" style={{ borderColor: C.border, color: C.textSec }}>
        {project.summary}
      </div>

      <div className="px-3 py-3 space-y-2">
        <Link
          href={projectHref}
          className="flex w-full items-center justify-center rounded-md py-1.5 text-[12px] font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: C.selection }}
        >
          Open Project
        </Link>
        <div className="flex gap-2">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              className="flex flex-1 justify-center rounded-md border py-1.5 text-[11px] hover:bg-black/5 transition-colors"
              style={{ borderColor: "#C8C8C8", color: C.textSec }}>
              GitHub ↗
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
              className="flex flex-1 justify-center rounded-md border py-1.5 text-[11px] hover:bg-black/5 transition-colors"
              style={{ borderColor: "#C8C8C8", color: C.textSec }}>
              Demo ↗
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
