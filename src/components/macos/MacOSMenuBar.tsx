"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const APP_NAME: Record<string, string> = {
  "/":         "Finder",
  "/about":    "About",
  "/projects": "Projects",
  "/skills":   "Skills",
  "/writing":  "Writing",
  "/contact":  "Contact",
};

const FINDER_MENUS = [
  {
    label: "파일",
    items: ["새로운 Finder 윈도우", "새로운 탭", "열기", "—", "윈도우 닫기", "정보 가져오기", "—", "버린 항목 비우기"],
  },
  {
    label: "편집",
    items: ["실행 취소", "다시 실행", "—", "오려두기", "복사", "붙여넣기", "전체 선택", "—", "찾기"],
  },
  {
    label: "보기",
    items: ["아이콘으로", "목록으로", "계층으로", "갤러리로", "—", "사이드바 보기", "미리보기 보기", "상태 막대 보기", "—", "정렬 기준"],
  },
  {
    label: "이동",
    items: ["뒤로", "앞으로", "—", "홈", "컴퓨터", "네트워크", "—", "다운로드", "응용 프로그램", "—", "폴더로 이동…"],
  },
  {
    label: "윈도우",
    items: ["최소화", "확대/축소", "—", "모두 앞으로 가져오기", "Finder 윈도우 합치기"],
  },
  {
    label: "도움말",
    items: ["검색", "—", "macOS 도움말"],
  },
];

const GENERIC_MENUS = [
  { label: "파일",   items: ["윈도우 닫기"] },
  { label: "편집",   items: ["전체 선택", "복사"] },
  { label: "보기",   items: ["확대", "축소", "실제 크기"] },
  { label: "윈도우", items: ["최소화", "확대/축소"] },
  { label: "도움말", items: ["검색"] },
];

function Clock() {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      setDisplay(
        d.toLocaleString("ko-KR", {
          month: "numeric",
          day: "numeric",
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    fmt();
    const t = setInterval(fmt, 1000);
    return () => clearInterval(t);
  }, []);
  return <span>{display}</span>;
}

function AppleLogo() {
  return (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="currentColor">
      <path d="M12.22 11.38c-.27.63-.59 1.21-.97 1.73-.51.73-.93 1.23-1.25 1.51-.5.46-1.04.7-1.62.71-.41 0-.91-.12-1.49-.36-.58-.24-1.12-.36-1.6-.36-.51 0-1.06.12-1.65.36-.59.24-1.07.37-1.44.38-.55.02-1.11-.23-1.66-.73-.35-.31-.79-.84-1.31-1.59C.18 12.25.05 11.01.05 9.83c0-1.27.27-2.37.82-3.28.43-.74 1.01-1.32 1.74-1.76.73-.44 1.52-.66 2.38-.67.47 0 1.08.14 1.84.43.76.29 1.25.43 1.46.43.16 0 .7-.17 1.6-.5.85-.31 1.57-.44 2.16-.39 1.6.13 2.8.76 3.58 1.91-1.43.87-2.13 2.08-2.12 3.63.01 1.21.45 2.22 1.31 3.01.39.37.82.66 1.3.87zm-3.34-14c0 .95-.35 1.84-1.04 2.66-.83.98-1.85 1.54-2.94 1.45-.01-.11-.02-.23-.02-.35 0-.91.4-1.88 1.1-2.67.35-.4.8-.74 1.35-1C7.88.19 8.4.04 8.88.01c.01.13.02.25.02.37z" />
    </svg>
  );
}

/* Right-side status icons */
function WifiIcon() {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="currentColor">
      <path d="M8 11a1.25 1.25 0 100 2.5A1.25 1.25 0 008 11z" />
      <path d="M5.05 8.45a4.17 4.17 0 015.9 0" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M2.4 5.8a7.5 7.5 0 0111.2 0" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M0 3.2A11 11 0 0116 3.2" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BatteryIcon({ pct = 65 }: { pct?: number }) {
  const fill = Math.max(0, Math.min(100, pct));
  return (
    <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
      <rect x="0.5" y="0.5" width="21" height="12" rx="3" stroke="currentColor" strokeOpacity="0.55" />
      <rect x="22" y="3.5" width="3" height="6" rx="1.5" fill="currentColor" fillOpacity="0.45" />
      <rect x="2" y="2" width={Math.round(17 * fill / 100)} height="9" rx="1.5"
        fill={fill <= 20 ? "#FF3B30" : fill <= 40 ? "#FF9F0A" : "currentColor"}
        fillOpacity="0.8" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="currentColor">
      <path d="M2 5H4.5L8 2v10L4.5 9H2a1 1 0 01-1-1V6a1 1 0 011-1z" />
      <path d="M10.5 4.5a3.5 3.5 0 010 5M12 3a5.5 5.5 0 010 8" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ControlCenterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      {/* Two sliders icon — macOS control center style */}
      <rect x="1" y="2" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="9" y="2" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="1" y="10" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.5" />
      <rect x="9" y="10" width="6" height="6" rx="1.5" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

function SpotlightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round">
      <circle cx="6" cy="6" r="4.5" />
      <path d="M9.8 9.8L13 13" />
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
      <path d="M7 1C4.24 1 2 3.24 2 6v3.5L0.5 11h13L12 9.5V6c0-2.76-2.24-5-5-5z" />
      <path d="M5.5 12.5a1.5 1.5 0 003 0" fill="currentColor" />
    </svg>
  );
}

function BrightnessIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="7.5" cy="7.5" r="2.5" fill="currentColor" stroke="none" />
      <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3.2 3.2l1.05 1.05M10.75 10.75l1.05 1.05M3.2 11.8l1.05-1.05M10.75 4.25l1.05-1.05" />
    </svg>
  );
}

interface MenuDef { label: string; items: string[] }

function MenuDropdown({ menu, onClose }: { menu: MenuDef; onClose: () => void }) {
  return (
    <div
      className="absolute top-full left-0 min-w-[206px] rounded-[10px] py-1.5 z-[300]"
      style={{
        background: "rgba(246,246,247,0.76)",
        backdropFilter: "blur(42px) saturate(180%)",
        WebkitBackdropFilter: "blur(42px) saturate(180%)",
        boxShadow:
          "0 18px 48px rgba(23,29,40,0.26), " +
          "0 2px 8px rgba(23,29,40,0.16), " +
          "inset 0 0 0 0.5px rgba(255,255,255,0.58), " +
          "0 0 0 0.5px rgba(30,35,44,0.12)",
        marginTop: 3,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menu.items.map((item, i) =>
        item === "—" ? (
          <div key={i} className="my-1 mx-2 border-t" style={{ borderColor: "rgba(0,0,0,0.09)" }} />
        ) : (
          <button
            key={i}
            className="flex w-full items-center justify-between px-3 py-[4px] text-[13px] text-left rounded-md mx-1 transition-colors hover:bg-[#0A84FF] hover:text-white group"
            style={{ color: "#1D1D1F", width: "calc(100% - 8px)" }}
            onClick={onClose}
          >
            <span>{item}</span>
          </button>
        )
      )}
    </div>
  );
}

export default function MacOSMenuBar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const appName =
    Object.entries(APP_NAME)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([k]) => pathname === k || pathname.startsWith(k + "/"))?.[1] ?? "Finder";

  const menus = pathname === "/" ? FINDER_MENUS : GENERIC_MENUS;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200] flex h-7 items-center text-[13px]"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(246,248,252,0.58))",
        backdropFilter: "blur(34px) saturate(190%)",
        WebkitBackdropFilter: "blur(34px) saturate(190%)",
        borderBottom: "0.5px solid rgba(255,255,255,0.42)",
        boxShadow: "0 0.5px 0 rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08)",
      }}
      onClick={() => setActiveMenu(null)}
    >
      {/* Left: Apple + app + menus */}
      <div className="flex h-full items-center">
        <button
          className="relative flex h-full items-center px-3 transition-colors rounded-[5px] hover:bg-white/30"
          style={{ color: "#1D1D1F" }}
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(activeMenu === "__apple" ? null : "__apple");
          }}
        >
          <AppleLogo />
          {activeMenu === "__apple" && (
            <MenuDropdown
              menu={{
                label: "Apple",
                items: ["이 Mac에 관하여", "—", "시스템 설정…", "App Store…", "—", "잠자기", "재시동…", "시스템 종료…"],
              }}
              onClose={() => setActiveMenu(null)}
            />
          )}
        </button>

        <button
          className="flex h-[22px] items-center px-2.5 font-semibold transition-colors rounded-[5px] hover:bg-white/30"
          style={{ color: "#1D1D1F" }}
        >
          {appName}
        </button>

        {menus.map((menu) => {
          const active = activeMenu === menu.label;
          return (
            <button
              key={menu.label}
              className="relative flex h-full items-center px-2.5 transition-colors"
              style={{
                background: active ? "rgba(10,132,255,0.92)" : "transparent",
                color: active ? "white" : "#1D1D1F",
                borderRadius: active ? 5 : 0,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(active ? null : menu.label);
              }}
            >
              {menu.label}
              {active && <MenuDropdown menu={menu} onClose={() => setActiveMenu(null)} />}
            </button>
          );
        })}
      </div>

      {/* Right: status items — ordered as real macOS */}
      <div className="ml-auto flex h-full items-center text-[#1D1D1F] gap-px pr-1">
        {/* Brightness */}
        <button className="flex h-[22px] items-center px-2 transition-colors rounded-[5px] hover:bg-white/30">
          <BrightnessIcon />
        </button>

        {/* Input method — 한/A */}
        <button className="flex h-[22px] items-center px-2 transition-colors rounded-[5px] hover:bg-white/30 text-[12px] font-medium">
          한
        </button>

        {/* Volume */}
        <button className="flex h-[22px] items-center px-1.5 transition-colors rounded-[5px] hover:bg-white/30">
          <VolumeIcon />
        </button>

        {/* WiFi */}
        <button className="flex h-[22px] items-center px-2 transition-colors rounded-[5px] hover:bg-white/30">
          <WifiIcon />
        </button>

        {/* Battery */}
        <button className="flex h-[22px] items-center gap-1 px-2 transition-colors rounded-[5px] hover:bg-white/30">
          <BatteryIcon pct={65} />
          <span className="text-[11px] font-medium">65%</span>
        </button>

        {/* Spotlight */}
        <button className="flex h-[22px] items-center px-2 transition-colors rounded-[5px] hover:bg-white/30">
          <SpotlightIcon />
        </button>

        {/* Notification Center */}
        <button className="flex h-[22px] items-center px-1.5 transition-colors rounded-[5px] hover:bg-white/30">
          <NotificationIcon />
        </button>

        {/* Control Center */}
        <button className="flex h-[22px] items-center px-2 transition-colors rounded-[5px] hover:bg-white/30">
          <ControlCenterIcon />
        </button>

        {/* Clock */}
        <button className="flex h-[22px] items-center px-3 transition-colors rounded-[5px] hover:bg-white/30 text-[12px] whitespace-nowrap font-medium">
          <Clock />
        </button>
      </div>
    </div>
  );
}
