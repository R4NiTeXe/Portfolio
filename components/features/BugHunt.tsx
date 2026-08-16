"use client";

import { useDevLayer } from "@/lib/dev-layer-context";

export function BugHunt() {
  const { bugClicks, registerBugClick } = useDevLayer();
  const clicksLeft = 5 - bugClicks;

  return (
    <button
      type="button"
      onClick={registerBugClick}
      aria-label="There might be a bug here…"
      title="There might be a bug here…"
      className="group relative inline-flex items-center justify-center text-text-muted/50 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12 7V3" />
        <path d="M7 9c-1 0-2-1-2-2s1-2 2-2" />
        <path d="M17 9c1 0 2-1 2-2s-1-2-2-2" />
        <path d="M8 21c1 1 3 1 4 0s3 0 4 0" />
        <path d="M6 13H4.5A1.5 1.5 0 0 1 3 11.5v0A1.5 1.5 0 0 1 4.5 10H6" />
        <path d="M18 13h1.5a1.5 1.5 0 0 0 1.5-1.5v0A1.5 1.5 0 0 0 19.5 10H18" />
        <path d="M6 9h12a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4Z" />
        <path d="M10 15v1" />
        <path d="M14 15v1" />
      </svg>
      {clicksLeft > 0 ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-1.5 -top-1.5 flex h-2 w-2 rounded-full bg-accent/70 opacity-60 transition-opacity group-hover:opacity-100"
        />
      ) : null}
    </button>
  );
}