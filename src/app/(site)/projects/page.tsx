"use client";

import { useState, useMemo, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";
import { getStatusClass } from "@/lib/utils/project-utils";

const allStacks = [...new Set(projects.flatMap((p) => p.stack))].sort();
const allCategories = [...new Set(projects.flatMap((p) => p.category))].sort();
const allTypes = ["Personal", "Team", "Client", "Experiment"] as const;
const allStatuses = ["Live", "In Progress", "Archived"] as const;

const toggle = (arr: string[], val: string) =>
  arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

type FilterState = {
  stacks: string[];
  categories: string[];
  type: string;
  status: string;
};

const initialFilters: FilterState = { stacks: [], categories: [], type: "", status: "" };

type FilterContentProps = {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  hasFilters: boolean;
  reset: () => void;
};

function FilterContent({ filters, setFilters, hasFilters, reset }: FilterContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-mono text-[10px] tracking-widest text-subtle">CATEGORY</p>
        <div className="flex flex-col gap-1.5">
          {allCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilters((prev) => ({ ...prev, categories: toggle(prev.categories, c) }))}
              className={`rounded px-2 py-1 text-left text-xs transition-colors ${
                filters.categories.includes(c)
                  ? "bg-accent-lime text-bg font-medium"
                  : "text-muted hover:text-text"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] tracking-widest text-subtle">STACK</p>
        <div className="flex flex-wrap gap-1.5">
          {allStacks.map((s) => (
            <button
              key={s}
              onClick={() => setFilters((prev) => ({ ...prev, stacks: toggle(prev.stacks, s) }))}
              className={`rounded border px-2 py-0.5 font-mono text-[10px] transition-colors ${
                filters.stacks.includes(s)
                  ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                  : "border-border text-subtle hover:border-muted hover:text-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] tracking-widest text-subtle">TYPE</p>
        <div className="flex flex-col gap-1.5">
          {allTypes.map((t) => (
            <button
              key={t}
              onClick={() => setFilters((prev) => ({ ...prev, type: prev.type === t ? "" : t }))}
              className={`rounded px-2 py-1 text-left text-xs transition-colors ${
                filters.type === t
                  ? "bg-accent-blue/10 text-accent-blue font-medium"
                  : "text-muted hover:text-text"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] tracking-widest text-subtle">STATUS</p>
        <div className="flex flex-col gap-1.5">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilters((prev) => ({ ...prev, status: prev.status === s ? "" : s }))}
              className={`rounded px-2 py-1 text-left text-xs transition-colors ${
                filters.status === s
                  ? "bg-success/10 text-success font-medium"
                  : "text-muted hover:text-text"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={reset}
          className="rounded border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent-red hover:text-accent-red"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const querySuffix = searchParams.get("desktopWindow") === "1" ? "?desktopWindow=1" : "";
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filters.stacks.length && !filters.stacks.some((s) => p.stack.includes(s))) return false;
      if (filters.categories.length && !filters.categories.some((c) => p.category.includes(c))) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.status && p.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const filterCount =
    filters.stacks.length +
    filters.categories.length +
    (filters.type ? 1 : 0) +
    (filters.status ? 1 : 0);
  const hasFilters = filterCount > 0;
  const reset = () => setFilters(initialFilters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-8">
        <p className="mb-1 font-mono text-[10px] tracking-widest text-subtle">ARCHIVE</p>
        <h1 className="text-3xl font-bold text-text">Project Archive</h1>
        <p className="mt-2 text-sm text-muted">All builds, experiments, product work, and retrospectives.</p>
      </div>

      {/* Mobile filter button */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded border border-border px-3 py-2 text-xs text-muted hover:border-accent-lime hover:text-accent-lime"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 3h10M3 6h6M5 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Filter
          {filterCount > 0 ? (
            <span className="rounded-full bg-accent-lime px-1 text-[9px] font-bold text-bg">{filterCount}</span>
          ) : null}
        </button>
        <div className="flex gap-1">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded border px-2 py-1 text-[10px] font-mono transition-colors ${
                view === v ? "border-accent-lime text-accent-lime" : "border-border text-subtle"
              }`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          {filters.categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilters((prev) => ({ ...prev, categories: prev.categories.filter((v) => v !== c) }))}
              className="flex items-center gap-1 rounded border border-accent-lime/40 px-2 py-0.5 text-[10px] text-accent-lime"
            >
              {c} ×
            </button>
          ))}
          {filters.stacks.map((s) => (
            <button
              key={s}
              onClick={() => setFilters((prev) => ({ ...prev, stacks: prev.stacks.filter((v) => v !== s) }))}
              className="flex items-center gap-1 rounded border border-accent-blue/40 px-2 py-0.5 font-mono text-[10px] text-accent-blue"
            >
              {s} ×
            </button>
          ))}
          {filters.type && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: "" }))}
              className="flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[10px] text-muted"
            >
              {filters.type} ×
            </button>
          )}
          {filters.status && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, status: "" }))}
              className="flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[10px] text-muted"
            >
              {filters.status} ×
            </button>
          )}
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop filter panel */}
        <aside className="hidden w-48 shrink-0 md:block">
          <div className="sticky top-20">
            <FilterContent
              filters={filters}
              setFilters={setFilters}
              hasFilters={hasFilters}
              reset={reset}
            />
          </div>
        </aside>

        {/* Project grid */}
        <div className="flex-1">
          <div className="mb-4 hidden items-center justify-between md:flex">
            <p className="font-mono text-[10px] text-subtle">{filtered.length} projects</p>
            <div className="flex gap-1">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`rounded border px-2 py-1 text-[10px] font-mono transition-colors ${
                    view === v ? "border-accent-lime text-accent-lime" : "border-border text-subtle"
                  }`}
                >
                  {v.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-sm text-muted">No projects match these filters.</p>
              <button onClick={reset} className="text-xs text-accent-lime hover:underline">
                Clear all filters
              </button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}${querySuffix}`}
                  className="group flex flex-col rounded-lg border border-border bg-surface p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-accent-lime/50"
                >
                  <div className="mb-3 relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded bg-surface-raised">
                    {p.thumbnail ? (
                      <Image
                        src={p.thumbnail}
                        alt={`${p.title} thumbnail`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span className="font-mono text-xs text-subtle">{p.category[0]}</span>
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-text">{p.title}</h3>
                    <span className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] ${getStatusClass(p.status, "bg")}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-2">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.stack.slice(0, 3).map((s) => (
                      <span key={s} className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-subtle">{s}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border">
              {filtered.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}${querySuffix}`}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-accent-lime"
                >
                  <div className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded bg-surface-raised">
                    {p.thumbnail ? (
                      <Image
                        src={p.thumbnail}
                        alt={`${p.title} thumbnail`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="font-mono text-[10px] text-subtle">{p.type[0]}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text group-hover:text-accent-lime">{p.title}</p>
                    <p className="mt-0.5 text-xs text-muted line-clamp-1">{p.summary}</p>
                  </div>
                  <div className="hidden shrink-0 flex-wrap gap-1 sm:flex">
                    {p.stack.slice(0, 2).map((s) => (
                      <span key={s} className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-subtle">{s}</span>
                    ))}
                  </div>
                  <span className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] ${getStatusClass(p.status)}`}>
                    {p.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setDrawerOpen(false)}>
          <div className="absolute inset-0 bg-bg/60 backdrop-blur-sm" />
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-xl border-t border-border bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-mono text-xs font-semibold text-text">Filters</p>
              <button onClick={() => setDrawerOpen(false)} className="text-muted hover:text-text">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <FilterContent
              filters={filters}
              setFilters={setFilters}
              hasFilters={hasFilters}
              reset={reset}
            />
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-6 w-full rounded bg-accent-lime py-2.5 text-sm font-semibold text-bg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
