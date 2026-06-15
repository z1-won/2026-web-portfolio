"use client";

import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import MacOSWindow from "@/components/macos/MacOSWindow";

const PAGE_META: Record<string, { title: string; width: number; height: number }> = {
  "/about": { title: "About", width: 900, height: 650 },
  "/projects": { title: "Projects", width: 1000, height: 660 },
  "/skills":   { title: "Skills",   width: 880,  height: 640 },
  "/writing":  { title: "Writing",  width: 880,  height: 640 },
  "/contact":  { title: "Contact",  width: 720,  height: 580 },
};

export default function SiteWindow({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDesktopWindow = searchParams.get("desktopWindow") === "1";
  const meta =
    Object.entries(PAGE_META)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([k]) => pathname.startsWith(k))?.[1] ?? { title: "Page", width: 900, height: 620 };

  if (isDesktopWindow) {
    return (
      <div
        className="h-full overflow-y-auto"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.84), rgba(247,249,252,0.94))",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <MacOSWindow title={meta.title} defaultWidth={meta.width} defaultHeight={meta.height}>
      <div
        className="h-full overflow-y-auto"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.84), rgba(247,249,252,0.94))",
        }}
      >
        {children}
      </div>
    </MacOSWindow>
  );
}
