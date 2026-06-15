"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  finder: { title: "프로젝트", href: "/?desktopWindow=1", width: 1020, height: 660 },
  about: { title: "About", href: "/about?desktopWindow=1", width: 900, height: 650 },
  skills: { title: "Skills", href: "/skills?desktopWindow=1", width: 880, height: 640 },
  projects: { title: "Projects", href: "/projects?desktopWindow=1", width: 1000, height: 660 },
  writing: { title: "Writing", href: "/writing?desktopWindow=1", width: 880, height: 640 },
  contact: { title: "Contact", href: "/contact?desktopWindow=1", width: 720, height: 580 },
};

const WALLPAPER = {
  backgroundColor: "#f0f0f0",
};

export default function DesktopShell({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isDesktopWindow = searchParams.get("desktopWindow") === "1";
  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const openWindow = useCallback((kind: DesktopWindowKind) => {
    const id = crypto.randomUUID();
    setWindows((current) => [
      ...current,
      {
        id,
        kind,
        ...WINDOW_META[kind],
      },
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
    <div className="relative h-screen w-screen overflow-hidden" style={WALLPAPER}>
      <MacOSMenuBar />

      <div className="absolute inset-0 overflow-hidden" style={{ top: 28 }}>
        {children}
      </div>

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

      <MacOSDock />
    </div>
  );
}
