"use client";

import { useState } from "react";
import type { VelogPost } from "@/lib/api/velog";

export default function WritingClient({ posts }: { posts: VelogPost[] }) {
  const [activeTag, setActiveTag] = useState("All");

  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];

  const filtered =
    activeTag === "All" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-8">
        <p className="mb-1 font-mono text-[10px] tracking-widest text-subtle">WRITING</p>
        <h1 className="text-3xl font-bold text-text">Writing</h1>
        <p className="mt-2 text-sm text-muted">
          Technical notes, project retrospectives, and product thinking.
        </p>
      </div>

      {/* Tag tabs */}
      <div className="mb-8 flex gap-1 overflow-x-auto pb-1">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`shrink-0 rounded px-3 py-1.5 font-mono text-xs transition-colors ${
              activeTag === tag
                ? "bg-accent-lime text-bg font-semibold"
                : "text-muted hover:text-text"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted">No posts in this category yet.</p>
      ) : (
        <div className="max-w-2xl">
          {/* Post list */}
          <div>
            {featured && (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-border bg-surface p-6 transition-all hover:border-accent-lime/50"
              >
                {featured.tags.length > 0 && (
                  <span className="mb-3 inline-block rounded border border-border px-2 py-0.5 font-mono text-[10px] text-subtle">
                    {featured.tags[0]}
                  </span>
                )}
                <h2 className="mb-3 text-xl font-semibold text-text group-hover:text-accent-lime">
                  {featured.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted">{featured.summary}</p>
                <p className="mt-4 font-mono text-[10px] text-subtle">{featured.publishedAt}</p>
              </a>
            )}

            {rest.length > 0 && (
              <div className="mt-4 flex flex-col divide-y divide-border">
                {rest.map((post) => (
                  <a
                    key={post.url}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 py-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-medium text-text transition-colors group-hover:text-accent-lime">
                        {post.title}
                      </h3>
                      {post.tags.length > 0 && (
                        <span className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[9px] text-subtle">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-muted line-clamp-2">{post.summary}</p>
                    <p className="font-mono text-[10px] text-subtle">{post.publishedAt}</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
