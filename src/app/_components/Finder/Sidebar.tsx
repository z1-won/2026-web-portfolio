import Link from "next/link";
import { C } from "./tokens";
import { Icon } from "./Icons";

export function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pt-4">
      <p className="mb-0.5 px-3 text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.textSec }}>
        {label}
      </p>
      <div className="flex flex-col gap-px px-1">{children}</div>
    </div>
  );
}

export function SidebarItem({ icon, label, active, onClick, color }: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-md px-2 py-1 text-left text-[12px] transition-colors"
      style={{ background: active ? C.selection : "transparent", color: active ? "white" : color ?? C.textPri }}
    >
      <span className="shrink-0" style={{ color: active ? "rgba(255,255,255,0.85)" : color ?? C.textSec }}>
        {icon}
      </span>
      {label}
    </button>
  );
}

export function SidebarItemLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-2 py-1 text-[12px] transition-colors hover:bg-black/8"
      style={{ color: C.textPri }}
    >
      <span className="shrink-0" style={{ color: C.textSec }}>{icon}</span>
      {label}
      <span className="ml-auto" style={{ color: C.textSec }}><Icon d="M5 3l5 5-5 5" size={10} /></span>
    </Link>
  );
}
