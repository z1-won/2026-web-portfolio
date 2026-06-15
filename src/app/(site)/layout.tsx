import SiteWindow from "@/components/shell/SiteWindow";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteWindow>{children}</SiteWindow>;
}
