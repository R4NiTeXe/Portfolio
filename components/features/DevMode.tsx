"use client";

import { useDevLayer } from "@/lib/dev-layer-context";

const buildInfo = [
  { label: "Framework", value: "Next.js 16.3.1" },
  { label: "React", value: "19.2.8" },
  { label: "TypeScript", value: "5.x" },
  { label: "Styling", value: "Tailwind CSS v4" },
  { label: "Rendering", value: "Static-first (SSG)" },
  { label: "3D", value: "React Three Fiber" },
  { label: "Data", value: "MongoDB + Mongoose" },
  { label: "Email", value: "Resend" },
] as const;

const sectionAnchors = [
  "#top",
  "#about",
  "#skills",
  "#journey",
  "#work",
  "#process",
  "#building",
  "#github",
  "#contact",
] as const;

export function DevMode() {
  const { devMode, setDevMode } = useDevLayer();

  if (!devMode) return null;

  return (
    <aside
      aria-label="Developer mode overlay"
      className="fixed bottom-4 right-4 z-[75] w-72 rounded-lg border border-accent/40 bg-[#05070D] p-4 shadow-[0_0_40px_rgba(56,189,248,0.15)]"
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Developer Mode
        </p>
        <button
          type="button"
          onClick={() => setDevMode(false)}
          className="rounded p-1 text-text-muted transition-colors hover:text-text"
          aria-label="Close developer mode"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-3.5 w-3.5"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <dl className="mt-3 space-y-1.5">
        {buildInfo.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3"
          >
            <dt className="font-mono text-[11px] text-text-muted">
              {item.label}
            </dt>
            <dd className="font-mono text-[11px] text-text">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 border-t border-border pt-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
          Sections
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {sectionAnchors.map((anchor) => (
            <li key={anchor}>
              <a
                href={anchor}
                className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-accent transition-colors hover:border-accent/60"
              >
                {anchor}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}