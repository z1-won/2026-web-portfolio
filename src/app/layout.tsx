import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import DesktopShell from "@/components/macos/DesktopShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono-base",
});

export const metadata: Metadata = {
  title: "Bang Jiwon",
  description: "PM-minded FullStack Developer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased">
        <Suspense fallback={null}>
          <DesktopShell>{children}</DesktopShell>
        </Suspense>
      </body>
    </html>
  );
}
