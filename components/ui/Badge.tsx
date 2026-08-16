import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "accent" | "neutral" | "violet";
}

const toneClasses = {
  accent: "border-accent/30 text-accent",
  violet: "border-accent-violet/30 text-accent-violet",
  neutral: "border-border text-text-muted",
} as const;

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}