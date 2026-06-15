import type { Project } from "@/data/projects";

const STATUS_CLASSES = {
  border: {
    Live:          "border-success/30 text-success",
    "In Progress": "border-accent-lime/30 text-accent-lime",
    Archived:      "border-border text-muted",
  },
  bg: {
    Live:          "bg-success/10 text-success",
    "In Progress": "bg-accent-lime/10 text-accent-lime",
    Archived:      "bg-surface-raised text-muted",
  },
  text: {
    Live:          "text-success",
    "In Progress": "text-accent-lime",
    Archived:      "text-muted",
  },
} as const;

export function getStatusClass(
  status: Project["status"],
  variant: keyof typeof STATUS_CLASSES = "text"
): string {
  return STATUS_CLASSES[variant][status];
}
