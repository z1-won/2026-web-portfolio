"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  initialOffset?: number;
  zIndex?: number;
  onClose?: () => void;
  onFocus?: () => void;
}

function TrafficLights({ onClose, onMaximize }: { onClose: () => void; onMaximize: () => void }) {
  const [hover, setHover] = useState(false);
  const dots = [
    { bg: "#FF5F57", shadow: "rgba(125,38,34,0.28)", label: "×" },
    { bg: "#FEBC2E", shadow: "rgba(130,86,14,0.28)", label: "−" },
    { bg: "#28C840", shadow: "rgba(16,105,32,0.28)", label: "⤢" },
  ];
  return (
    <div
      className="flex items-center gap-[6px] shrink-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {dots.map(({ bg, shadow, label }, i) => (
        <button
          key={i}
          onClick={i === 0 ? onClose : i === 2 ? onMaximize : undefined}
          className="flex h-3 w-3 items-center justify-center rounded-full text-[7px] font-bold leading-none"
          style={{
            background: bg,
            boxShadow: `inset 0 0 0 0.5px ${shadow}, 0 0.5px 1px rgba(0,0,0,0.16)`,
            color: "rgba(0,0,0,0.55)",
          }}
        >
          {hover ? label : ""}
        </button>
      ))}
    </div>
  );
}

export default function MacOSWindow({
  title,
  icon,
  children,
  defaultWidth = 960,
  defaultHeight = 620,
  minWidth = 400,
  minHeight = 300,
  initialOffset = 0,
  zIndex = 100,
  onClose,
  onFocus,
}: Props) {
  const [mounted, setMounted] = useState(true);
  const [closed, setClosed] = useState(false);
  const [pos, setPos] = useState({ x: 80, y: 64 });
  const [size, setSize] = useState({ w: defaultWidth, h: defaultHeight });
  const [maximized, setMaximized] = useState(false);
  const prevRef = useRef({ pos: { x: 0, y: 0 }, size: { w: defaultWidth, h: defaultHeight } });
  const posRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ w: defaultWidth, h: defaultHeight });

  useEffect(() => { posRef.current = pos; }, [pos]);
  useEffect(() => { sizeRef.current = size; }, [size]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const MENU_H = 28;
      const DOCK_H = 84;
      const vw = window.innerWidth;
      const avail = window.innerHeight - MENU_H - DOCK_H;
      const w = Math.min(defaultWidth, vw - 48);
      const h = Math.min(defaultHeight, avail - 16);
      const x = (vw - w) / 2 + initialOffset;
      const y = MENU_H + (avail - h) / 2 + initialOffset;
      setPos({ x, y });
      setSize({ w, h });
      posRef.current = { x, y };
      sizeRef.current = { w, h };
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [defaultWidth, defaultHeight, initialOffset]);

  const closeWindow = () => {
    if (onClose) {
      onClose();
      return;
    }
    setClosed(true);
  };

  const startDrag = (e: React.MouseEvent) => {
    if (maximized || (e.target as HTMLElement).closest("[data-no-drag]")) return;
    e.preventDefault();
    const ox = e.clientX - posRef.current.x;
    const oy = e.clientY - posRef.current.y;
    const onMove = (ev: MouseEvent) => {
      const nx = ev.clientX - ox;
      const ny = Math.max(28, ev.clientY - oy);
      setPos({ x: nx, y: ny });
      posRef.current = { x: nx, y: ny };
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const startResize = (e: React.MouseEvent, dir: string) => {
    e.preventDefault();
    e.stopPropagation();
    const sx = e.clientX, sy = e.clientY;
    const sw = sizeRef.current.w, sh = sizeRef.current.h;
    const spx = posRef.current.x, spy = posRef.current.y;
    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      let nw = sw, nh = sh, nx = spx, ny = spy;
      if (dir.includes("e")) nw = Math.max(minWidth, sw + dx);
      if (dir.includes("s")) nh = Math.max(minHeight, sh + dy);
      if (dir.includes("w")) { nw = Math.max(minWidth, sw - dx); nx = spx + (sw - nw); }
      if (dir.includes("n")) { nh = Math.max(minHeight, sh - dy); ny = Math.max(28, spy + (sh - nh)); }
      setSize({ w: nw, h: nh });
      setPos({ x: nx, y: ny });
      sizeRef.current = { w: nw, h: nh };
      posRef.current = { x: nx, y: ny };
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const toggleMaximize = () => {
    if (maximized) {
      setPos(prevRef.current.pos);
      setSize(prevRef.current.size);
      posRef.current = prevRef.current.pos;
      sizeRef.current = prevRef.current.size;
      setMaximized(false);
    } else {
      prevRef.current = { pos: { ...posRef.current }, size: { ...sizeRef.current } };
      const MENU_H = 28, DOCK_H = 84;
      const w = window.innerWidth;
      const h = window.innerHeight - MENU_H - DOCK_H;
      setPos({ x: 0, y: MENU_H });
      setSize({ w, h });
      posRef.current = { x: 0, y: MENU_H };
      sizeRef.current = { w, h };
      setMaximized(true);
    }
  };

  if (!mounted || closed) return null;

  return (
    <div
      className="absolute flex flex-col overflow-hidden"
      onMouseDown={onFocus}
      style={{
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        zIndex,
        borderRadius: maximized ? 0 : 14,
        background: "rgba(246,247,249,0.86)",
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        boxShadow:
          "0 28px 80px rgba(20,28,44,0.34), " +
          "0 6px 22px rgba(20,28,44,0.20), " +
          "0 0 0 0.5px rgba(22,28,36,0.18), " +
          "inset 0 1px 0 rgba(255,255,255,0.74)",
        userSelect: "none",
      }}
    >
      {/* Title bar */}
      <div
        className="flex h-11 shrink-0 items-center px-3 border-b relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(238,241,246,0.68) 100%)",
          borderColor: "rgba(0,0,0,0.10)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.82)",
          cursor: maximized ? "default" : "move",
        }}
        onMouseDown={startDrag}
      >
        <span data-no-drag>
          <TrafficLights onClose={closeWindow} onMaximize={toggleMaximize} />
        </span>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none gap-1.5">
          {icon && <span>{icon}</span>}
          <span className="text-[13px] font-semibold text-[#24272D]">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-hidden"
        style={{
          userSelect: "text",
          background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(250,251,253,0.9))",
        }}
      >
        {children}
      </div>

      {/* Resize handles */}
      {!maximized && (
        <>
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10" onMouseDown={(e) => startResize(e, "se")} />
          <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-10" onMouseDown={(e) => startResize(e, "sw")} />
          <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-10" onMouseDown={(e) => startResize(e, "ne")} />
          <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-10" onMouseDown={(e) => startResize(e, "nw")} />
          <div className="absolute right-0 top-10 bottom-4 w-1.5 cursor-e-resize z-10" onMouseDown={(e) => startResize(e, "e")} />
          <div className="absolute left-0 top-10 bottom-4 w-1.5 cursor-w-resize z-10" onMouseDown={(e) => startResize(e, "w")} />
          <div className="absolute bottom-0 left-4 right-4 h-1.5 cursor-s-resize z-10" onMouseDown={(e) => startResize(e, "s")} />
        </>
      )}
    </div>
  );
}
