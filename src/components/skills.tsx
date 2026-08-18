"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { foundations, skills } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const CONSTELLATION = [
  { x: 8, y: 22 },
  { x: 38, y: 8 },
  { x: 68, y: 24 },
  { x: 94, y: 10 },
  { x: 18, y: 68 },
  { x: 46, y: 78 },
  { x: 76, y: 70 },
  { x: 96, y: 58 },
];

function Constellation() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<SVGPathElement>("[data-const-line]");
      lines.forEach((line) => {
        const len = line.getTotalLength();
        line.style.strokeDasharray = `${len}`;
        line.style.strokeDashoffset = `${len}`;
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: { trigger: svg, start: "top 78%", once: true },
        });
      });
      gsap.fromTo(
        "[data-const-node]",
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.09,
          ease: "back.out(2)",
          scrollTrigger: { trigger: svg, start: "top 78%", once: true },
        },
      );
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
    >
      {[
        [0, 1],
        [0, 2],
        [1, 2],
        [1, 3],
        [0, 4],
        [1, 4],
        [2, 4],
        [2, 5],
        [3, 5],
        [4, 5],
        [5, 6],
        [5, 7],
        [6, 7],
      ].map(([a, b], i) => (
        <line
          key={i}
          data-const-line
          x1={CONSTELLATION[a].x}
          y1={CONSTELLATION[a].y}
          x2={CONSTELLATION[b].x}
          y2={CONSTELLATION[b].y}
          stroke="rgba(101,246,213,0.22)"
          strokeWidth="0.18"
        />
      ))}
      {CONSTELLATION.map((node, i) => (
        <circle
          key={i}
          data-const-node
          cx={node.x}
          cy={node.y}
          r="0.7"
          fill="#65F6D5"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <Constellation />
        <p className="mono-label text-mint">02 // Skills</p>
        <div
          data-reveal-item
          className="mt-10 flex flex-wrap items-end justify-between gap-6"
        >
          <h2 className="font-display max-w-xl text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
            The stack behind
            <br />
            <span className="text-glow-mint text-mint">the eclipse.</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Tools I reach for daily — from bare C to typed React, from
            localhost to deployed containers.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const tone =
              group.tone === "violet"
                ? { text: "text-violet", border: "border-violet/30", chip: "border-violet/20 bg-violet/[0.06] hover:border-violet/50 hover:text-violet" }
                : { text: "text-mint", border: "border-mint/30", chip: "border-white/10 hover:border-mint/40 hover:text-mint" };
            return (
              <div
                key={group.title}
                data-reveal-item
                className="card-spotlight eclipse-card group relative overflow-hidden p-6"
              >
                <div
                  aria-hidden="true"
                  className="orbit-rotate absolute -top-6 -right-6 h-14 w-14 rounded-full border border-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  <span
                    className={`absolute top-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${tone.text} shadow-[0_0_6px_currentColor]`}
                  />
                </div>
                <p
                  className={`mono-label transition-colors duration-300 ${tone.text}`}
                >
                  {group.title}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-md border px-2.5 py-1 text-xs text-muted-foreground transition-all duration-300 ${tone.chip}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p data-reveal-item className="mono-label mt-8 text-muted-foreground">
          {"// "}ALSO: {foundations.join(" · ")}
        </p>
      </div>
    </section>
  );
}