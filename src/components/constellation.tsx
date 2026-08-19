"use client";

import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { toneStyles } from "@/components/work";
import type { Project } from "@/components/work";

const NODE_ANGLES = [200, 340, 100];

function InfoPanel({ project }: { project: Project }) {
  const tone = toneStyles[project.tone];
  return (
    <div className="pointer-events-none absolute left-1/2 z-20 w-60 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0A0F1A]/95 p-4 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
      <div className="flex items-center justify-between gap-2">
        <p className="mono-label !text-[8px] text-white/40">
          PROJECT {project.index}
        </p>
        <p className={`mono-label shrink-0 !text-[8px] ${tone.chip}`}>
          {project.status}
        </p>
      </div>
      <p className="mt-1.5 font-display text-sm font-semibold text-white">
        {project.name}
      </p>
      <p className="mt-2 line-clamp-3 text-[11px] leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded border border-white/10 px-1.5 py-0.5 text-[8px] tracking-[0.1em] text-muted-foreground uppercase"
          >
            {tech}
          </span>
        ))}
      </div>
      <p className="mono-label mt-3 flex items-center gap-1 !text-[8px] text-mint/70">
        OPEN DETAILS
        <ArrowUpRight className="h-2.5 w-2.5" />
      </p>
    </div>
  );
}

export function ProjectConstellation({
  onOpen,
}: {
  onOpen: (project: Project) => void;
}) {
  const nodePos = NODE_ANGLES.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      left: 50 + 38 * Math.cos(rad),
      top: 52 + 26 * Math.sin(rad),
      above: Math.sin(rad) > 0.4,
    };
  });

  return (
    <div data-reveal-item className="mt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="mono-label !text-[10px] text-mint">
          {"// "}PROJECT ARCHIVE — ORBITAL MAP
        </p>
        <p className="mono-label hidden !text-[8px] text-muted-foreground/50 sm:block">
          HOVER TO INSPECT · CLICK TO OPEN
        </p>
      </div>

      <div className="eclipse-card relative mt-4 hidden h-[340px] overflow-hidden rounded-2xl md:block lg:h-[400px]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <ellipse
            cx="50"
            cy="52"
            rx="48"
            ry="34"
            fill="none"
            stroke="rgba(230,237,243,0.05)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
          <ellipse
            cx="50"
            cy="52"
            rx="38"
            ry="26"
            fill="none"
            stroke="rgba(230,237,243,0.12)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
          <ellipse
            cx="50"
            cy="52"
            rx="26"
            ry="18"
            fill="none"
            stroke="rgba(139,124,255,0.1)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
          {nodePos.map((pos, i) => (
            <line
              key={i}
              x1="50"
              y1="52"
              x2={pos.left}
              y2={pos.top}
              stroke="rgba(230,237,243,0.08)"
              strokeWidth="0.3"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <circle cx="50" cy="52" r="4" fill="rgba(101,246,213,0.06)" />
          <circle cx="50" cy="52" r="2.2" fill="rgba(101,246,213,0.5)" />
        </svg>

        <span className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="font-display block text-sm font-semibold text-white/25">
            ARCHIVE
          </span>
          <span className="mono-label block !text-[8px] text-muted-foreground/40">
            CORE
          </span>
        </span>

        {projects.map((project, i) => {
          const pos = nodePos[i];
          const tone = toneStyles[project.tone];
          return (
            <div
              key={project.name}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
            >
              <div
                className="constellation-drift"
                style={{ animationDelay: `${i * 3}s` }}
              >
                <button
                  type="button"
                  onClick={() => onOpen(project)}
                  data-cursor-label="OPEN"
                  aria-label={`${project.name} — ${project.status}. Open project details.`}
                  className="group relative flex flex-col items-center gap-2"
                >
                  <span className="relative flex h-12 w-12 items-center justify-center">
                    <span
                      className={`absolute inset-0 rounded-full border transition-all duration-300 group-hover:scale-110 ${tone.chip}`}
                    />
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_14px_currentColor] ${tone.bar}`}
                    />
                  </span>
                  <span className="mono-label !text-[9px] text-white/70 transition-colors group-hover:text-white">
                    {project.index} · {project.name}
                  </span>
                  <span
                    className={`absolute top-14 left-1/2 hidden flex-col items-center sm:flex ${
                      pos.above ? "top-auto bottom-14" : ""
                    }`}
                  >
                    <InfoPanel project={project} />
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 md:hidden">
        {projects.map((project) => {
          const tone = toneStyles[project.tone];
          return (
            <button
              key={project.name}
              type="button"
              onClick={() => onOpen(project)}
              data-cursor-label="OPEN"
              className="eclipse-card group flex items-center justify-between gap-3 p-4 text-left transition-transform active:scale-[0.99]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className={`font-display text-sm font-semibold ${tone.index}`}>
                  {project.index}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm text-white transition-colors group-hover:text-mint">
                    {project.name}
                  </span>
                  <span className="mono-label block !text-[8px] text-muted-foreground">
                    {project.category}
                  </span>
                </span>
              </span>
              <span className={`mono-label shrink-0 rounded border px-2 py-0.5 !text-[8px] ${tone.chip}`}>
                {project.status}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}