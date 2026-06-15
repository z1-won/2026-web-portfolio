"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projects, type Project } from "@/data/projects";
import MacOSWindow from "@/components/macos/MacOSWindow";

/* ── Color tokens ─────────────────────────────────────────────────── */
const C = {
  winBg:     "#ECECEC",
  sidebar:   "#E0E0E0",
  content:   "#FFFFFF",
  toolbar:   "#F0F0F0",
  border:    "rgba(0,0,0,0.12)",
  selection: "#0063DA",
  textPri:   "#1D1D1F",
  textSec:   "#888888",
};

const TYPE_FOLDER: Record<string, { body: string; tab: string }> = {
  Personal:   { body: "#4B9EF0", tab: "#3A88D8" },
  Team:       { body: "#4AC965", tab: "#38A852" },
  Client:     { body: "#F0A040", tab: "#D88A30" },
  Experiment: { body: "#B47FE8", tab: "#9860D0" },
};

/* ── SVG helpers ──────────────────────────────────────────────────── */

function FolderSVG({ type, size = 52 }: { type: string; size?: number }) {
  const c = TYPE_FOLDER[type] ?? TYPE_FOLDER.Personal;
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 52 43" fill="none">
      <path d="M2 9C2 6.79 3.79 5 6 5H19L24 11H6C3.79 11 2 9.21 2 7V9Z" fill={c.tab} />
      <rect x="2" y="9" width="48" height="32" rx="3" fill={c.body} />
      <rect x="2" y="9" width="48" height="10" rx="3" fill="white" opacity="0.12" />
    </svg>
  );
}

function Icon({ d, size = 14 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d={d} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Status Pill ──────────────────────────────────────────────────── */

function StatusPill({ status }: { status: Project["status"] }) {
  const map = {
    Live:          { bg: "#E8F8EE", text: "#1A7F3C", dot: "#34C759" },
    "In Progress": { bg: "#EEF2FF", text: "#3451B2", dot: "#0063DA" },
    Archived:      { bg: "#F2F2F2", text: "#888888", dot: "#AAAAAA" },
  };
  const s = map[status];
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

/* ── Detail Panel ─────────────────────────────────────────────────── */

function DetailPanel({
  project,
  projectHref,
  onClose,
}: {
  project: Project;
  projectHref: string;
  onClose: () => void;
}) {
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
          ["Kind", project.type],
          ["Period", project.period],
          ["Role", project.role.join(", ")],
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

/* ── Sidebar ──────────────────────────────────────────────────────── */

const sidebarIcons = {
  star:   "M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z",
  circle: "M8 2a6 6 0 100 12A6 6 0 008 2z",
  gear:   "M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 2.5l-.8 1.8-2 .4-1.3 1.3.4 2L1 9.2l1.8.8.4 2 1.3 1.3 2-.4.8 1.8h1.5l.8-1.8 2-.4 1.3-1.3-.4-2 1.8-.8-.8-1.8-.4-2-1.3-1.3-2 .4-.8-1.8z",
  text:   "M3 4h10M3 7h10M3 10h7",
  at:     "M8 5a3 3 0 100 6 3 3 0 000-6zm0-3a6 6 0 110 12 6 6 0 010-12z",
};

function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pt-4">
      <p className="mb-0.5 px-3 text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.textSec }}>
        {label}
      </p>
      <div className="flex flex-col gap-px px-1">{children}</div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, color }: {
  icon: React.ReactNode; label: string; active: boolean; onClick: () => void; color?: string;
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

function SidebarItemLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
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

/* ── Icon/List views ──────────────────────────────────────────────── */

function IconView({ projects, selected, onSelect, getProjectHref }: {
  projects: Project[];
  selected: string | null;
  onSelect: (s: string) => void;
  getProjectHref: (slug: string) => string;
}) {
  return (
    <div className="grid gap-1 p-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }}>
      {projects.map((p) => {
        const sel = selected === p.slug;
        return (
          <button
            key={p.slug}
            onClick={(e) => { e.stopPropagation(); onSelect(p.slug); }}
            onDoubleClick={() => (window.location.href = getProjectHref(p.slug))}
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

function ListView({ projects, selected, onSelect, getProjectHref }: {
  projects: Project[];
  selected: string | null;
  onSelect: (s: string) => void;
  getProjectHref: (slug: string) => string;
}) {
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
              onDoubleClick={() => (window.location.href = getProjectHref(p.slug))}
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

/* ── Main ─────────────────────────────────────────────────────────── */

type Filter = "all" | "live" | "in-progress" | "archived";

const FILTERS: { id: Filter; label: string; dot: string }[] = [
  { id: "all",         label: "전체 프로젝트", dot: "#8A8A8A" },
  { id: "live",        label: "라이브",        dot: "#34C759" },
  { id: "in-progress", label: "진행 중",       dot: "#0063DA" },
  { id: "archived",    label: "보관됨",        dot: "#AAAAAA" },
];

const PAGES = [
  { label: "About",   href: "/about",    icon: sidebarIcons.circle },
  { label: "Skills",  href: "/skills",   icon: sidebarIcons.gear },
  { label: "Writing", href: "/writing",  icon: sidebarIcons.text },
  { label: "Contact", href: "/contact",  icon: sidebarIcons.at },
];

export default function FinderHome() {
  const searchParams = useSearchParams();
  const isDesktopWindow = searchParams.get("desktopWindow") === "1";
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [view, setView]  = useState<"icon" | "list">("icon");
  const [selected, setSelected] = useState<string | null>(null);

  const selectedProject = projects.find((p) => p.slug === selected) ?? null;

  const filtered = projects.filter((p) => {
    if (filter === "live"        && p.status !== "Live")        return false;
    if (filter === "in-progress" && p.status !== "In Progress") return false;
    if (filter === "archived"    && p.status !== "Archived")    return false;
    if (search) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) ||
             p.summary.toLowerCase().includes(q) ||
             p.stack.some((s) => s.toLowerCase().includes(q));
    }
    return true;
  });

  const select = (slug: string) => setSelected((prev) => (prev === slug ? null : slug));
  const getProjectHref = (slug: string) =>
    `/projects/${slug}${isDesktopWindow ? "?desktopWindow=1" : ""}`;
  const getPageHref = (href: string) =>
    `${href}${isDesktopWindow ? "?desktopWindow=1" : ""}`;

  const content = (
      <div className="flex h-full flex-col" style={{ background: C.winBg }}>

        {/* Toolbar */}
        <div
          className="flex h-10 shrink-0 items-center gap-2 border-b px-3"
          style={{ background: C.toolbar, borderColor: C.border }}
        >
          {/* Nav arrows */}
          <div className="flex items-center gap-0.5 mr-1">
            {["M9 3L4 8l5 5", "M5 3l5 5-5 5"].map((d, i) => (
              <button key={i} disabled className="flex h-7 w-7 items-center justify-center rounded opacity-30" style={{ color: C.textSec }}>
                <Icon d={d} />
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center overflow-hidden rounded-md border" style={{ borderColor: "#C8C8C8", background: "white" }}>
            {[
              { id: "icon", d: "M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z" },
              { id: "list", d: "M2 4h10M2 7h10M2 10h10" },
            ].map(({ id, d }) => (
              <button
                key={id}
                onClick={() => setView(id as "icon" | "list")}
                className="flex h-6 w-7 items-center justify-center border-r last:border-r-0 transition-colors"
                style={{ borderColor: "#C8C8C8", background: view === id ? "#D8D8D8" : "transparent", color: view === id ? C.textPri : C.textSec }}
              >
                <Icon d={d} size={12} />
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative">
            <svg className="absolute left-2 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: C.textSec }}>
              <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 8l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-7 w-44 rounded-full border pl-7 pr-3 text-[12px] outline-none focus:ring-2 focus:ring-[#0063DA]"
              style={{ borderColor: "#C8C8C8", background: "white", color: C.textPri }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="flex w-44 shrink-0 flex-col overflow-y-auto border-r" style={{ background: C.sidebar, borderColor: C.border }}>
            <SidebarSection label="즐겨찾기">
              <SidebarItem
                icon={<Icon d={sidebarIcons.star} size={13} />}
                label="DEV FREQUENCY"
                active={false}
                onClick={() => {}}
                color="#E8A020"
              />
            </SidebarSection>

            <SidebarSection label="프로젝트">
              {FILTERS.map((f) => (
                <SidebarItem
                  key={f.id}
                  icon={<span className="h-2.5 w-2.5 rounded-full" style={{ background: f.dot }} />}
                  label={f.label}
                  active={filter === f.id}
                  onClick={() => setFilter(f.id)}
                />
              ))}
            </SidebarSection>

            <SidebarSection label="페이지">
              {PAGES.map((p) => (
                <SidebarItemLink
                  key={p.href}
                  icon={<Icon d={p.icon} size={13} />}
                  label={p.label}
                  href={getPageHref(p.href)}
                />
              ))}
            </SidebarSection>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto" style={{ background: C.content }} onClick={() => setSelected(null)}>
            {filtered.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <p className="text-[13px]" style={{ color: C.textSec }}>No items</p>
                <button onClick={() => { setFilter("all"); setSearch(""); }} className="text-[12px]" style={{ color: C.selection }}>
                  Show all
                </button>
              </div>
            ) : view === "icon" ? (
              <IconView projects={filtered} selected={selected} onSelect={select} getProjectHref={getProjectHref} />
            ) : (
              <ListView projects={filtered} selected={selected} onSelect={select} getProjectHref={getProjectHref} />
            )}
          </main>

          {/* Detail panel */}
          {selectedProject && (
            <DetailPanel
              project={selectedProject}
              projectHref={getProjectHref(selectedProject.slug)}
              onClose={() => setSelected(null)}
            />
          )}
        </div>

        {/* Status bar */}
        <div
          className="flex h-[22px] shrink-0 items-center justify-center border-t px-4"
          style={{ background: C.toolbar, borderColor: C.border }}
        >
          <p className="text-[11px]" style={{ color: C.textSec }}>
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
            {selectedProject ? ` — "${selectedProject.title}" selected` : ""}
          </p>
        </div>
      </div>
  );

  if (isDesktopWindow) {
    return content;
  }

  return (
    <MacOSWindow
      title="About"
      defaultWidth={900}
      defaultHeight={650}
    >
      <iframe
        title="About window"
        src="/about?desktopWindow=1"
        className="h-full w-full border-0 bg-white"
      />
    </MacOSWindow>
  );
}
