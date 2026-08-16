"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CORE = { name: "TypeScript", abbr: "TS" };

const INNER_RING = [
  { name: "React", abbr: "React", angle: -70, icon: "⚛" },
  { name: "Next.js", abbr: "Next", angle: 10, icon: "▲" },
  { name: "Node.js", abbr: "Node", angle: -160, icon: "⚡" },
  { name: "JavaScript", abbr: "JS", angle: 40, icon: "JS" },
];

const OUTER_RING = [
  { name: "MongoDB", abbr: "Mongo", angle: -120, icon: "🍃" },
  { name: "Tailwind CSS", abbr: "TW", angle: -20, icon: "≈" },
  { name: "AWS", abbr: "AWS", angle: 50, icon: "☁" },
  { name: "GitHub", abbr: "GH", angle: 130, icon: "⌥" },
  { name: "HTML5", abbr: "H5", angle: 180, icon: "◇" },
  { name: "CSS3", abbr: "C3", angle: -50, icon: "◆" },
];

function TechCard({
  name,
  abbr,
  icon,
  style,
  delay,
}: {
  name: string;
  abbr: string;
  icon: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={style}
    >
      <div
        className="group relative flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgb(56_189_248/0.15)]"
        style={{ animation: `card-float ${4 + (delay ?? 0)}s ease-in-out infinite`, animationDelay: `${delay ?? 0}s` }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-bold text-accent">
          {icon}
        </span>
        <div className="hidden min-w-0 sm:block">
          <p className="text-[11px] leading-tight font-medium text-text/90">{name}</p>
          <p className="font-mono text-[9px] uppercase tracking-wider text-text-muted/60">{abbr}</p>
        </div>
        <div className="absolute -inset-px rounded-xl opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "radial-gradient(circle at center, rgb(56 189 248 / 0.06), transparent 70%)" }} />
      </div>
    </div>
  );
}

export function TechOrbital() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const rotateX = useTransform(springY, (v) => v * 6);
  const rotateY = useTransform(springX, (v) => v * -6);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  const innerR = 140;
  const outerR = 220;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative flex h-[380px] w-[380px] items-center justify-center sm:h-[440px] sm:w-[440px] lg:h-[500px] lg:w-[500px]"
      style={{ perspective: "800px" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0" style={{ animation: "orbital-spin 120s linear infinite" }}>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 500" fill="none">
            <circle cx="250" cy="250" r={innerR} stroke="rgb(139 92 246 / 0.12)" strokeWidth="0.5" />
            <circle cx="250" cy="250" r={outerR} stroke="rgb(56 189 248 / 0.10)" strokeWidth="0.5" />
            <circle cx="250" cy="250" r="80" stroke="rgb(139 92 246 / 0.08)" strokeWidth="0.5" strokeDasharray="4 6" />
            <line x1="250" y1="30" x2="250" y2="470" stroke="rgb(139 92 246 / 0.05)" strokeWidth="0.5" />
            <line x1="30" y1="250" x2="470" y2="250" stroke="rgb(139 92 246 / 0.05)" strokeWidth="0.5" />
            <line x1="80" y1="80" x2="420" y2="420" stroke="rgb(139 92 246 / 0.04)" strokeWidth="0.5" />
            <line x1="420" y1="80" x2="80" y2="420" stroke="rgb(139 92 246 / 0.04)" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="absolute inset-0" style={{ animation: "orbital-counter-spin 120s linear infinite" }}>
          {INNER_RING.map((tech) => {
            const rad = (tech.angle * Math.PI) / 180;
            const x = Math.cos(rad) * innerR;
            const y = Math.sin(rad) * innerR;
            return (
              <TechCard
                key={tech.name}
                name={tech.name}
                abbr={tech.abbr}
                icon={tech.icon}
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                delay={tech.angle * 0.01}
              />
            );
          })}
        </div>

        <div className="absolute inset-0" style={{ animation: "orbital-spin 180s linear infinite" }}>
          {OUTER_RING.map((tech) => {
            const rad = (tech.angle * Math.PI) / 180;
            const x = Math.cos(rad) * outerR;
            const y = Math.sin(rad) * outerR;
            return (
              <TechCard
                key={tech.name}
                name={tech.name}
                abbr={tech.abbr}
                icon={tech.icon}
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                delay={tech.angle * 0.005}
              />
            );
          })}
        </div>

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.06] shadow-[0_0_40px_rgb(139_92_246/0.3)] backdrop-blur-xl sm:h-24 sm:w-24">
            <span className="font-mono text-2xl font-bold text-accent sm:text-3xl">{CORE.abbr}</span>
            <div className="absolute -inset-1 rounded-2xl border border-accent/10" />
            <div className="absolute -inset-3 rounded-2xl border border-accent/5" />
          </div>
        </div>

        {[...Array(6)].map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const r = 100 + i * 20;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40"
              style={{
                transform: `translate(calc(-50% + ${Math.cos(angle) * r}px), calc(-50% + ${Math.sin(angle) * r}px))`,
                animation: `portal-breathe ${3 + i}s ease-in-out ${i * 0.5}s infinite`,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}