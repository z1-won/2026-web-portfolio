import type { Project } from "@/data/projects";

const STATUS_MAP = {
  Live:          { bg: "#E8F8EE", text: "#1A7F3C", dot: "#34C759" },
  "In Progress": { bg: "#EEF2FF", text: "#3451B2", dot: "#0063DA" },
  Archived:      { bg: "#F2F2F2", text: "#888888", dot: "#AAAAAA" },
};

export default function StatusPill({ status }: { status: Project["status"] }) {
  const s = STATUS_MAP[status];
  return (
    <span
      className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ background: s.bg, color: s.text }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
}
