"use client";

import { useState } from "react";
import Image from "next/image";
import { socialLinks } from "@/data/social";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("wonw512@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-12">
        <p className="mb-1 font-mono text-[10px] tracking-widest text-subtle">CONTACT</p>
        <h1 className="text-3xl font-bold text-text">Let&apos;s Connect</h1>
        <p className="mt-2 text-sm text-muted">
          제품, 웹 개발, 협업에 관심 있다면 어디서든 연락주세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {socialLinks.map((link) => {
          const isEmail = link.platform === "Email";
          return isEmail ? (
            <button
              key={link.platform}
              onClick={copyEmail}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 text-left transition-all hover:border-accent-lime/50 hover:bg-surface-raised"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded font-mono text-sm font-bold text-muted group-hover:text-accent-lime transition-colors">
                {link.icon.startsWith("/") ? (
                  <Image src={link.icon} alt={link.platform} width={24} height={24} className="object-contain" />
                ) : link.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-text">{link.platform}</p>
                <p className="mt-0.5 text-xs text-muted">{link.purpose}</p>
              </div>
              <div className="mt-auto flex items-center gap-2 text-xs text-muted">
                {copied ? (
                  <span className="text-accent-lime">Copied!</span>
                ) : (
                  <span className="group-hover:text-accent-lime transition-colors">Copy address</span>
                )}
              </div>
            </button>
          ) : (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-all hover:border-accent-lime/50 hover:bg-surface-raised"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded font-mono text-sm font-bold text-muted group-hover:text-accent-lime transition-colors">
                {link.icon.startsWith("/") ? (
                  <Image src={link.icon} alt={link.platform} width={24} height={24} className="object-contain" />
                ) : link.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-text">{link.platform}</p>
                <p className="mt-0.5 text-xs text-muted">{link.purpose}</p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-xs text-muted group-hover:text-accent-lime transition-colors">
                Open {link.platform}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
