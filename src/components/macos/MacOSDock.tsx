"use client";

import { memo, useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const iconStyle: React.CSSProperties = {
  filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.22))",
};

const MusicIcon = memo(function MusicIcon() {
  return (
    <svg width="67" height="67" viewBox="0 0 1024 1024" fill="none" style={iconStyle}>
      <defs>
        <linearGradient id="music-bg" x1="512" y1="98" x2="512" y2="926" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB5B73"/>
          <stop offset="1" stopColor="#FB243C"/>
        </linearGradient>
      </defs>
      <rect x="98" y="98" width="828" height="828" rx="180" fill="url(#music-bg)"/>
      <path d="M417.579 282.696C401.571 285.775 390 299.783 390 316.085V632.29C390 641.931 383.122 650.2 373.642 651.955L316.616 662.516C283.806 668.592 260 697.21 260 730.578C260 765.497 289.447 793.182 324.299 791.031L346.929 789.634C389.117 787.03 422 752.055 422 709.786V426.714C422 418.084 428.126 410.668 436.601 409.038L653.356 367.355C661.99 365.694 670 372.31 670 381.103V576.29C670 585.931 663.122 594.2 653.642 595.955L596.616 606.516C563.806 612.592 540 641.21 540 674.578C540 709.497 569.447 737.182 604.299 735.031L626.929 733.634C669.117 731.03 702 696.055 702 653.786V252.213C702 239.652 690.558 230.2 678.223 232.573L417.579 282.696Z" fill="white"/>
    </svg>
  );
});

const FinderIcon = memo(function FinderIcon() {
  return (
    <svg width="67" height="67" viewBox="0 0 1024 1024" fill="none" style={iconStyle}>
      <defs>
        <linearGradient id="finder-bg0" x1="512" y1="98" x2="512" y2="926" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1AD2FD"/>
          <stop offset="1" stopColor="#1D6AF1"/>
        </linearGradient>
        <linearGradient id="finder-bg1" x1="670.929" y1="98" x2="670.929" y2="926" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EFEFEF"/>
          <stop offset="1" stopColor="#D0DAE5"/>
        </linearGradient>
        <mask id="finder-mask" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="98" y="98" width="828" height="828">
          <rect x="98" y="98" width="828" height="828" rx="180" fill="white"/>
        </mask>
      </defs>
      <rect x="98" y="98" width="828" height="828" rx="180" fill="url(#finder-bg0)"/>
      <g mask="url(#finder-mask)">
        <path fillRule="evenodd" clipRule="evenodd" d="M511.931 126.377C477.79 214.756 425.078 351.213 415.882 556.356C415.278 569.85 426.157 581 439.664 581H536.062C539.55 581 542.283 583.904 542.065 587.385C537.415 661.476 541.93 805.089 588.19 926H746C845.411 926 926 845.411 926 746V278C926 178.589 845.411 98 746 98H522.789C519.472 106.855 515.822 116.304 511.931 126.377Z" fill="url(#finder-bg1)"/>
      </g>
      <path fillRule="evenodd" clipRule="evenodd" d="M744.686 648.808C751.143 656.367 750.25 667.729 742.691 674.186C639.833 762.053 535.663 781.028 447.15 767.982C359.45 755.056 288.06 710.884 248.629 673.575C241.408 666.742 241.093 655.35 247.925 648.129C254.758 640.908 266.15 640.593 273.371 647.425C308.273 680.449 373.084 720.677 452.4 732.367C530.904 743.938 624.567 727.747 719.309 646.814C726.867 640.357 738.229 641.25 744.686 648.808Z" fill="#383838"/>
      <rect x="660" y="336" width="36" height="90" rx="18" fill="#383838"/>
      <rect x="298" y="336" width="36" height="90" rx="18" fill="#383838"/>
    </svg>
  );
});

const AboutIcon = memo(function AboutIcon() {
  return (
    <svg width="67" height="67" viewBox="0 0 1024 1024" fill="none" style={iconStyle}>
      <defs>
        <linearGradient id="about-bg" x1="512" y1="98" x2="512" y2="926" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6F7FB" />
          <stop offset="1" stopColor="#DCE4F0" />
        </linearGradient>
        <linearGradient id="about-accent" x1="512" y1="238" x2="512" y2="820" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5E9DFF" />
          <stop offset="1" stopColor="#0063DA" />
        </linearGradient>
      </defs>
      <rect x="98" y="98" width="828" height="828" rx="180" fill="url(#about-bg)" />
      <circle cx="512" cy="384" r="128" fill="url(#about-accent)" />
      <path
        d="M284 774C306 639 395 560 512 560C629 560 718 639 740 774C744 797 726 818 703 818H321C298 818 280 797 284 774Z"
        fill="url(#about-accent)"
      />
      <path
        d="M354 252H670"
        stroke="white"
        strokeOpacity="0.75"
        strokeWidth="32"
        strokeLinecap="round"
      />
    </svg>
  );
});

const MapsIcon = memo(function MapsIcon() {
  return (
    <svg width="67" height="67" viewBox="0 0 1024 1024" fill="none" style={iconStyle}>
      <defs>
        <linearGradient id="maps-bg0" x1="512" y1="98" x2="512" y2="821.548" gradientUnits="userSpaceOnUse">
          <stop stopColor="#85F080"/>
          <stop offset="1" stopColor="#32D158"/>
        </linearGradient>
        <linearGradient id="maps-bg1" x1="266.75" y1="394.214" x2="266.75" y2="926" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FC96D7"/>
          <stop offset="1" stopColor="#F283CA"/>
        </linearGradient>
        <linearGradient id="maps-bg2" x1="674.554" y1="557" x2="674.554" y2="926" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9C700"/>
          <stop offset="1" stopColor="#FFCC00"/>
        </linearGradient>
        <linearGradient id="maps-bg3" x1="411" y1="98" x2="411" y2="484" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0E92FF"/>
          <stop offset="1" stopColor="#0076F6"/>
        </linearGradient>
        <linearGradient id="maps-bg4" x1="411" y1="428" x2="411" y2="778" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D90FF"/>
          <stop offset="1" stopColor="#007AFF"/>
        </linearGradient>
      </defs>
      <rect x="98" y="98" width="828" height="828" rx="180" fill="#333333"/>
      <path d="M909.426 821.548L98 366.952V278C98 178.589 178.589 98 278 98H746C845.411 98 926 178.589 926 278V746C926 772.981 920.064 798.575 909.426 821.548Z" fill="url(#maps-bg0)"/>
      <path d="M435.5 926H278C178.589 926 98 845.411 98 746V394.214L435.5 572.5V926Z" fill="url(#maps-bg1)"/>
      <path d="M911.109 817.802C883.378 881.48 819.888 926 746 926H438V557L911.109 817.802Z" fill="url(#maps-bg2)"/>
      <path d="M926 695.152V746C926 822.971 877.688 888.658 809.733 914.391L98 503.472V278C98 258.521 101.094 239.765 106.817 222.197L926 695.152Z" fill="white"/>
      <rect x="287" y="98" width="248" height="828" fill="white"/>
      <rect x="323" y="98" width="176" height="386" fill="url(#maps-bg3)"/>
      <circle cx="411" cy="603" r="211" fill="white"/>
      <circle cx="411" cy="603" r="175" fill="url(#maps-bg4)"/>
      <path d="M396.084 480.427C401.368 466.813 420.631 466.813 425.916 480.427L505.933 686.574C511.365 700.569 493.951 712.139 483.155 701.709L413.779 634.685C412.229 633.188 409.771 633.188 408.221 634.685L338.845 701.709C328.049 712.139 310.634 700.569 316.066 686.574L396.084 480.427Z" fill="white"/>
      <path d="M925.931 272.976C924.956 272.992 923.979 273 923 273C828.007 273 751 195.993 751 101C751 100.021 751.008 99.0439 751.024 98.0688C749.355 98.023 747.68 98 746 98H603.014C603.005 98.9989 603 99.9989 603 101C603 277.731 746.269 421 923 421C924.001 421 925.001 420.995 926 420.986V278C926 276.32 925.977 274.645 925.931 272.976Z" fill="white"/>
      <path d="M926 292.977C925.002 292.992 924.002 293 923 293C816.961 293 731 207.039 731 101C731 99.9982 731.008 98.9982 731.023 98H623.015C623.005 98.9988 623 99.9988 623 101C623 266.685 757.315 401 923 401C924.001 401 925.001 400.995 926 400.985V292.977Z" fill="#D1D1D6"/>
    </svg>
  );
});

const SafariIcon = memo(function SafariIcon() {
  return (
    <svg width="67" height="67" viewBox="0 0 1024 1024" fill="none" style={iconStyle}>
      <defs>
        <linearGradient id="safari-bg0" x1="512" y1="98" x2="512" y2="926" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="#D1D1D1"/>
        </linearGradient>
        <linearGradient id="safari-circle" x1="512" y1="164" x2="512" y2="860" gradientUnits="userSpaceOnUse">
          <stop stopColor="#21A6F0"/>
          <stop offset="1" stopColor="#1D76E7"/>
        </linearGradient>
        <line id="safari-tick" x1="512" y1="199" x2="512" y2="249" stroke="white" strokeWidth="10" strokeLinecap="round"/>
      </defs>
      <rect x="98" y="98" width="828" height="828" rx="180" fill="url(#safari-bg0)"/>
      <circle cx="512" cy="512" r="348" fill="url(#safari-circle)"/>
      {Array.from({ length: 36 }, (_, i) => (
        <use key={i} href="#safari-tick" transform={`rotate(${i * 10}, 512, 512)`}/>
      ))}
      <path d="M283.9 729.358C280.182 732.012 276.353 727.907 279.261 724.383L482.675 480.552L740.101 294.643C743.819 291.988 747.648 296.094 744.74 299.617L541.326 543.448L283.9 729.358Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M541.326 543.448L744.739 299.617C747.647 296.094 743.819 291.988 740.101 294.643L482.674 480.552L541.326 543.448Z" fill="#FD4D42"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M279.096 729.187C280.154 730.322 282.041 730.685 283.9 729.357L541.326 543.449L744.74 299.617C746.194 297.855 745.964 295.948 744.905 294.813L279.096 729.187Z" fill="black" fillOpacity="0.26"/>
    </svg>
  );
});

const DayOneIcon = memo(function DayOneIcon() {
  return (
    <svg width="67" height="67" viewBox="0 0 1024 1024" fill="none" style={iconStyle}>
      <defs>
        <linearGradient id="dayone-bg" x1="512" y1="98" x2="512" y2="926" gradientUnits="userSpaceOnUse">
          <stop stopColor="#43BFFF"/>
          <stop offset="1" stopColor="#1D9EFB"/>
        </linearGradient>
      </defs>
      <rect x="98" y="98" width="828" height="828" rx="180" fill="url(#dayone-bg)"/>
      <path d="M320 98H704V610.244C704 627.821 685.729 639.435 669.814 631.975L524.733 563.969C516.665 560.187 507.334 560.187 499.267 563.969L354.186 631.975C338.271 639.435 320 627.821 320 610.244V98Z" fill="white"/>
    </svg>
  );
});

const DOCK_ITEMS = [
  { label: "Music", href: "/skills", kind: "skills", Icon: MusicIcon },
  { label: "Finder", href: "/", kind: "finder", Icon: FinderIcon },
  { label: "About", href: "/about", kind: "about", Icon: AboutIcon },
  { label: "Maps", href: "/projects", kind: "projects", Icon: MapsIcon },
  { label: "Safari", href: "/writing", kind: "writing", Icon: SafariIcon },
  { label: "DayOne", href: "/contact", kind: "contact", Icon: DayOneIcon },
] as const;

const ICON_BASE = 70;
const MAX_SCALE = 1.72;
const SPREAD = 112;

export default function MacOSDock() {
  const pathname = usePathname();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>(DOCK_ITEMS.map(() => 1));
  const [hovered, setHovered] = useState(false);
  const [tooltip, setTooltip] = useState<number | null>(null);

  const recalc = useCallback((mouseX: number) => {
    const next = DOCK_ITEMS.map((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return 1;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - cx);
      if (dist > SPREAD) return 1;
      const t = 1 - dist / SPREAD;
      return 1 + (MAX_SCALE - 1) * Math.pow(t, 1.5);
    });
    setScales(next);
    const max = Math.max(...next);
    setTooltip(max > 1.15 ? next.indexOf(max) : null);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] flex justify-center pb-[7px] pointer-events-none">
      <div
        className="relative flex items-end gap-[7px] px-[14px] pb-[7px] pt-[9px] pointer-events-auto"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.44), rgba(205,210,219,0.34))",
          backdropFilter: "blur(38px) saturate(190%)",
          WebkitBackdropFilter: "blur(38px) saturate(190%)",
          border: "0.5px solid rgba(255,255,255,0.46)",
          borderRadius: 22,
          boxShadow:
            "0 0 0 0.5px rgba(34,42,58,0.18), " +
            "0 24px 58px rgba(13,20,34,0.32), " +
            "0 5px 18px rgba(13,20,34,0.18), " +
            "inset 0 1px 0 rgba(255,255,255,0.62), " +
            "inset 0 -1px 0 rgba(70,80,96,0.12)",
        }}
        onMouseMove={(e) => {
          setHovered(true);
          recalc(e.clientX);
        }}
        onMouseLeave={() => {
          setHovered(false);
          setScales(DOCK_ITEMS.map(() => 1));
          setTooltip(null);
        }}
      >
        {DOCK_ITEMS.map(({ label, href, kind, Icon }, i) => {
          const scale = hovered ? scales[i] : 1;
          const lift = (scale - 1) * (ICON_BASE * 0.48);
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <div key={label} className="relative flex flex-col items-center">
              {tooltip === i && (
                <div
                  className="absolute pointer-events-none select-none whitespace-nowrap"
                  style={{
                    bottom: ICON_BASE + 14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "4px 9px",
                    borderRadius: 7,
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.96)",
                    background: "rgba(34,38,46,0.86)",
                    backdropFilter: "blur(16px) saturate(150%)",
                    WebkitBackdropFilter: "blur(16px) saturate(150%)",
                    boxShadow:
                      "0 8px 22px rgba(0,0,0,0.26), " +
                      "0 0 0 0.5px rgba(255,255,255,0.14)",
                    zIndex: 10,
                  }}
                >
                  {label}
                </div>
              )}

              <div
                ref={(el) => { itemRefs.current[i] = el; }}
                style={{
                  width: ICON_BASE,
                  height: ICON_BASE,
                  transform: `scale(${scale}) translateY(-${lift}px)`,
                  transformOrigin: "bottom center",
                  willChange: "transform",
                  transition: hovered
                    ? "transform 0.08s ease-out"
                    : "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("open-desktop-window", {
                        detail: { kind },
                      })
                    );
                  }}
                  className="flex h-full w-full items-center justify-center overflow-visible"
                  title={label}
                >
                  <Icon />
                </button>
              </div>

              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  marginTop: 4,
                  background: "rgba(28,31,36,0.78)",
                  boxShadow: "0 0.5px 0 rgba(255,255,255,0.44)",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.2s",
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
