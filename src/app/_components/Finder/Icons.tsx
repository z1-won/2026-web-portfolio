import { TYPE_FOLDER } from "./tokens";

export function FolderSVG({ type, size = 52 }: { type: string; size?: number }) {
  const c = TYPE_FOLDER[type] ?? TYPE_FOLDER.Personal;
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 52 43" fill="none">
      <path d="M2 9C2 6.79 3.79 5 6 5H19L24 11H6C3.79 11 2 9.21 2 7V9Z" fill={c.tab} />
      <rect x="2" y="9" width="48" height="32" rx="3" fill={c.body} />
      <rect x="2" y="9" width="48" height="10" rx="3" fill="white" opacity="0.12" />
    </svg>
  );
}

export function Icon({ d, size = 14 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d={d} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
