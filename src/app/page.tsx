"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";
import MacOSWindow from "@/components/macos/MacOSWindow";
import { C } from "./_components/Finder/tokens";
import { Icon } from "./_components/Finder/Icons";
import { IconView, ListView } from "./_components/Finder/ProjectViews";
import DetailPanel from "./_components/Finder/DetailPanel";
import { SidebarSection, SidebarItem, SidebarItemLink } from "./_components/Finder/Sidebar";

/* ── Constants ────────────────────────────────────────────────────── */

const sidebarIcons = {
  star:   "M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z",
  circle: "M8 2a6 6 0 100 12A6 6 0 008 2z",
  gear:   "M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.5 2.5l-.8 1.8-2 .4-1.3 1.3.4 2L1 9.2l1.8.8.4 2 1.3 1.3 2-.4.8 1.8h1.5l.8-1.8 2-.4 1.3-1.3-.4-2 1.8-.8-.8-1.8-.4-2-1.3-1.3-2 .4-.8-1.8z",
  text:   "M3 4h10M3 7h10M3 10h7",
  at:     "M8 5a3 3 0 100 6 3 3 0 000-6zm0-3a6 6 0 110 12 6 6 0 010-12z",
};

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

/* ── Component ────────────────────────────────────────────────────── */

export default function FinderHome() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktopWindow = searchParams.get("desktopWindow") === "1";
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"icon" | "list">("icon");
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
  const openProject = (slug: string) => router.push(getProjectHref(slug));

  const content = (
    <div className="flex h-full flex-col" style={{ background: C.winBg }}>

      {/* Toolbar */}
      <div
        className="flex h-10 shrink-0 items-center gap-2 border-b px-3"
        style={{ background: C.toolbar, borderColor: C.border }}
      >
        <div className="flex items-center gap-0.5 mr-1">
          {["M9 3L4 8l5 5", "M5 3l5 5-5 5"].map((d, i) => (
            <button key={i} disabled className="flex h-7 w-7 items-center justify-center rounded opacity-30" style={{ color: C.textSec }}>
              <Icon d={d} />
            </button>
          ))}
        </div>

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
            <IconView projects={filtered} selected={selected} onSelect={select} onOpen={openProject} />
          ) : (
            <ListView projects={filtered} selected={selected} onSelect={select} onOpen={openProject} />
          )}
        </main>

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
