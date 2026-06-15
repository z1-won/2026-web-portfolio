"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import MacOSDock from "./MacOSDock";
import MacOSMenuBar from "./MacOSMenuBar";
import MacOSWindow from "./MacOSWindow";

type DesktopWindowKind = "finder" | "about" | "skills" | "projects" | "writing" | "contact";

type DesktopWindow = {
  id: string;
  kind: DesktopWindowKind;
  title: string;
  href: string;
  width: number;
  height: number;
};

const WINDOW_META: Record<DesktopWindowKind, Omit<DesktopWindow, "id" | "kind">> = {
  finder:   { title: "프로젝트", href: "/?desktopWindow=1",        width: 1020, height: 660 },
  about:    { title: "About",    href: "/about?desktopWindow=1",    width: 900,  height: 650 },
  skills:   { title: "Skills",   href: "/skills?desktopWindow=1",   width: 880,  height: 640 },
  projects: { title: "Projects", href: "/projects?desktopWindow=1", width: 1000, height: 660 },
  writing:  { title: "Writing",  href: "/writing?desktopWindow=1",  width: 880,  height: 640 },
  contact:  { title: "Contact",  href: "/contact?desktopWindow=1",  width: 720,  height: 580 },
};

const WALLPAPER = { backgroundColor: "#f0f0f0" };

const MOBILE_NAV = [
  { href: "/",        label: "홈",      d: "M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" },
  { href: "/about",   label: "About",   d: "M8 2a3 3 0 100 6 3 3 0 000-6zM2.5 14c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5" },
  { href: "/skills",  label: "Skills",  d: "M8 2l1.8 3.8H14l-3.6 2.6 1.4 4.1L8 10.4l-3.8 2.1 1.4-4.1L2 5.8h4.2z" },
  { href: "/writing", label: "Writing", d: "M3 4h10M3 8h10M3 12h7" },
  { href: "/contact", label: "Contact", d: "M2 4h12v9H2zM2 4l6 5.5 6-5.5" },
];

export default function DesktopShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isDesktopWindow = searchParams.get("desktopWindow") === "1";
  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const openWindow = useCallback((kind: DesktopWindowKind) => {
    const id = crypto.randomUUID();
    setWindows((current) => [
      ...current,
      { id, kind, ...WINDOW_META[kind] },
    ]);
    setActiveId(id);
  }, []);

  useEffect(() => {
    const onOpenWindow = (event: Event) => {
      const detail = (event as CustomEvent<{ kind?: DesktopWindowKind }>).detail;
      if (!detail?.kind || !WINDOW_META[detail.kind]) return;
      openWindow(detail.kind);
    };
    window.addEventListener("open-desktop-window", onOpenWindow);
    return () => window.removeEventListener("open-desktop-window", onOpenWindow);
  }, [openWindow]);

  if (isDesktopWindow) {
    return (
      <div className="h-screen w-screen overflow-auto bg-bg text-text">
        {children}
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh bg-bg text-text md:h-screen md:w-screen md:overflow-hidden">
      {/* Desktop wallpaper */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block" style={WALLPAPER} />

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-11 items-center border-b border-border bg-bg/90 px-4 backdrop-blur-sm md:hidden">
        <span className="font-mono text-[11px] font-bold tracking-widest text-text">BANG JIWON</span>
      </header>

      {/* Desktop macOS menubar */}
      <div className="hidden md:block">
        <MacOSMenuBar />
      </div>

      {/* Content — rendered once, positioned differently per breakpoint */}
      <div className="pb-14 md:absolute md:bottom-0 md:left-0 md:right-0 md:top-7 md:overflow-hidden md:pb-0">
        {children}
      </div>

      {/* Desktop windows (opened from dock) */}
      <div className="hidden md:block">
        {windows.map((win, index) => (
          <MacOSWindow
            key={win.id}
            title={win.title}
            defaultWidth={win.width}
            defaultHeight={win.height}
            initialOffset={index * 24}
            zIndex={activeId === win.id ? 180 : 120 + index}
            onFocus={() => setActiveId(win.id)}
            onClose={() => {
              setWindows((current) => current.filter((item) => item.id !== win.id));
              setActiveId((current) => (current === win.id ? null : current));
            }}
          >
            <iframe
              title={`${win.title} window`}
              src={win.href}
              className="h-full w-full border-0 bg-white"
            />
          </MacOSWindow>
        ))}
      </div>

      {/* Desktop dock */}
      <div className="hidden md:block">
        <MacOSDock />
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-14 border-t border-border bg-bg/95 backdrop-blur-sm md:hidden">
        {MOBILE_NAV.map(({ href, label, d }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center justify-center gap-1 text-[10px] transition-colors ${
                active ? "text-accent-lime" : "text-muted"
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={d} />
              </svg>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
