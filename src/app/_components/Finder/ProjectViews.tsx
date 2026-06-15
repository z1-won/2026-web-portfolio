import type { Project } from "@/data/projects";
import { C } from "./tokens";
import { FolderSVG } from "./Icons";
import StatusPill from "./StatusPill";

type ViewProps = {
  projects: Project[];
  selected: string | null;
  onSelect: (slug: string) => void;
  onOpen: (slug: string) => void;
};

export function IconView({ projects, selected, onSelect, onOpen }: ViewProps) {
  return (
    <div className="grid gap-1 p-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }}>
      {projects.map((p) => {
        const sel = selected === p.slug;
        return (
          <button
            key={p.slug}
            onClick={(e) => { e.stopPropagation(); onSelect(p.slug); }}
            onDoubleClick={() => onOpen(p.slug)}
            className="flex flex-col items-center gap-1.5 rounded-lg p-3 text-center transition-colors"
            style={{ background: sel ? C.selection : "transparent" }}
          >
            <FolderSVG type={p.type} size={54} />
            <span className="w-full text-[11px] leading-tight" style={{ color: sel ? "white" : C.textPri }}>
              {p.title}
            </span>
            {!sel && <StatusPill status={p.status} />}
          </button>
        );
      })}
    </div>
  );
}

export function ListView({ projects, selected, onSelect, onOpen }: ViewProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr style={{ background: "#F8F8F8", borderBottom: `1px solid ${C.border}` }}>
          {["이름", "상태", "종류", "기간", "스택"].map((h) => (
            <th key={h} className="px-4 py-1.5 text-left text-[11px] font-semibold"
              style={{ color: C.textSec, borderBottom: `1px solid ${C.border}` }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => {
          const sel = selected === p.slug;
          return (
            <tr
              key={p.slug}
              onClick={(e) => { e.stopPropagation(); onSelect(p.slug); }}
              onDoubleClick={() => onOpen(p.slug)}
              className="cursor-default transition-colors"
              style={{ background: sel ? C.selection : "transparent", borderBottom: `1px solid ${sel ? "transparent" : "#F0F0F0"}` }}
            >
              <td className="px-4 py-1.5">
                <div className="flex items-center gap-2">
                  <FolderSVG type={p.type} size={16} />
                  <span className="text-[12px]" style={{ color: sel ? "white" : C.textPri }}>{p.title}</span>
                </div>
              </td>
              <td className="px-4 py-1.5">
                {sel ? <span className="text-[11px] text-white/80">{p.status}</span> : <StatusPill status={p.status} />}
              </td>
              <td className="px-4 py-1.5 text-[11px]" style={{ color: sel ? "rgba(255,255,255,0.8)" : C.textSec }}>{p.type}</td>
              <td className="px-4 py-1.5 font-mono text-[10px]" style={{ color: sel ? "rgba(255,255,255,0.7)" : "#AAAAAA" }}>{p.period}</td>
              <td className="px-4 py-1.5">
                <div className="flex flex-wrap gap-1">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="rounded px-1.5 py-0.5 font-mono text-[9px]"
                      style={{ background: sel ? "rgba(255,255,255,0.2)" : "#F0F0F0", color: sel ? "white" : C.textSec }}>{s}</span>
                  ))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
