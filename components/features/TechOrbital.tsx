"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TechNode {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  icon: ReactNode;
  delay?: number;
}

// Positions precisely match reference image layout.
// TS is at center (0,0). All offsets in px relative to center.
const TECH_NODES: TechNode[] = [
  // React atom — top center
  {
    id: "react", name: "React", x: 10, y: -175, size: 64,
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#00D8FF]" fill="currentColor">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ), delay: 0.1,
  },
  // JS — upper right, large
  {
    id: "js", name: "JavaScript", x: 150, y: -120, size: 70,
    icon: (
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F7DF1E] text-xl font-black text-black leading-none">JS</div>
    ), delay: 0.2,
  },
  // Firebase / bird icon — upper left of center
  {
    id: "firebase", name: "Firebase", x: -70, y: -100, size: 58,
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#FFCA28]" fill="currentColor">
        <path d="m14.5 2.1-5 9.5L14.5 9l5 10.5L2 17l8.5-5.5z" />
      </svg>
    ), delay: 0.3,
  },
  // Arco / Next.js Λ — right of center, large
  {
    id: "nextjs", name: "Next.js", x: 135, y: -15, size: 70,
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-white" fill="currentColor">
        <path d="M12 4.5 3 19.5h18L12 4.5Z" />
      </svg>
    ), delay: 0.15,
  },
  // Prisma diamond — left of center
  {
    id: "prisma", name: "Mongoose", x: -145, y: -15, size: 58,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-white/80" fill="currentColor">
        <path d="M12 2 4 12l8 10 8-10-8-10Zm0 3.8L18 12l-6 7.4L6 12l6-6.2Z" />
      </svg>
    ), delay: 0.25,
  },
  // AWS — right
  {
    id: "aws", name: "AWS", x: 220, y: 50, size: 62,
    icon: (
      <div className="flex flex-col items-center gap-1">
        <div className="font-sans text-sm font-bold tracking-wide text-[#FF9900] leading-none">aws</div>
        <svg viewBox="0 0 40 8" className="w-8" fill="none">
          <path d="M0 4 C10 0 30 8 40 4" stroke="#FF9900" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
    ), delay: 0.35,
  },
  // Lightning bolt — lower left
  {
    id: "express", name: "Express", x: -100, y: 155, size: 56,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#63B3ED]" fill="currentColor">
        <path d="M13 2 4 14h7v8l9-12h-7V2Z" />
      </svg>
    ), delay: 0.4,
  },
  // GitHub — lower center-right
  {
    id: "github", name: "GitHub", x: 55, y: 160, size: 58,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="currentColor">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
      </svg>
    ), delay: 0.28,
  },
  // CSS badge — bottom
  {
    id: "css", name: "CSS3", x: -15, y: 225, size: 54,
    icon: (
      <div className="flex h-8 w-8 items-center justify-center rounded border-[2.5px] border-[#264DE4] text-sm font-black text-[#264DE4] leading-none">3</div>
    ), delay: 0.45,
  },
  // Extra card — bottom-right (partially visible)
  {
    id: "nodejs", name: "Node.js", x: 170, y: 155, size: 52,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#5FA04E]" fill="currentColor">
        <path d="M12 1.85 1.35 7.93v8.14L12 22.15l10.65-6.08V7.93L12 1.85Zm0 2.3 8.15 4.65v9.3L12 22.15v-2.3l6.15-3.51V9.35L12 5.84 5.85 9.35v7.29L12 20.15v2.3L3.85 16.15v-9.3L12 4.15Z" />
      </svg>
    ), delay: 0.5,
  },
];

export function TechOrbital() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 22 });
  const rotateX = useTransform(springY, (v) => v * 7);
  const rotateY = useTransform(springX, (v) => v * -7);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative flex h-[500px] w-[500px] items-center justify-center lg:h-[560px] lg:w-[560px]"
      style={{ perspective: "900px" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Radar Grid */}
        <div className="pointer-events-none absolute inset-0">
          <svg className="h-full w-full" viewBox="0 0 560 560" fill="none">
            {/* Outer circle */}
            <circle cx="280" cy="280" r="255" stroke="rgba(140,100,255,0.18)" strokeWidth="1" />
            {/* Mid circle */}
            <circle cx="280" cy="280" r="170" stroke="rgba(140,100,255,0.22)" strokeWidth="1" />
            {/* Inner dashed circle */}
            <circle cx="280" cy="280" r="90" stroke="rgba(140,100,255,0.15)" strokeWidth="1" strokeDasharray="4 6" />
            {/* Vertical line */}
            <line x1="280" y1="15" x2="280" y2="545" stroke="rgba(255,255,255,0.11)" strokeWidth="0.8" />
            {/* Horizontal line */}
            <line x1="15" y1="280" x2="545" y2="280" stroke="rgba(255,255,255,0.11)" strokeWidth="0.8" />
            {/* Diagonal TL-BR */}
            <line x1="100" y1="100" x2="460" y2="460" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" strokeDasharray="5 6" />
            {/* Diagonal TR-BL */}
            <line x1="460" y1="100" x2="100" y2="460" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" strokeDasharray="5 6" />
            {/* Cardinal accent dots */}
            <circle cx="280" cy="110" r="3" fill="rgba(160,80,255,0.9)" />
            <circle cx="280" cy="450" r="3" fill="rgba(160,80,255,0.9)" />
            <circle cx="110" cy="280" r="3" fill="rgba(60,180,255,0.9)" />
            <circle cx="450" cy="280" r="3" fill="rgba(60,180,255,0.9)" />
          </svg>
        </div>

        {/* Tech Cards */}
        {TECH_NODES.map((node) => (
          <div
            key={node.id}
            className="absolute left-1/2 top-1/2"
            style={{ width: node.size, height: node.size, transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))` }}
          >
            <div
              className="group relative flex h-full w-full items-center justify-center rounded-2xl border border-white/[0.09] bg-surface/90 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-all duration-300 hover:scale-110 hover:border-purple-400/50 hover:shadow-[0_0_28px_rgba(160,80,255,0.4)]"
              style={{ animation: `card-float ${3.8 + (node.delay ?? 0) * 2.5}s ease-in-out infinite`, animationDelay: `${(node.delay ?? 0) * 1.8}s` }}
            >
              <div className="pointer-events-none absolute inset-x-2 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              {node.icon}
              <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {node.name}
              </div>
            </div>
          </div>
        ))}

        {/* Center Core: TypeScript */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-accent/50 bg-bg/95 shadow-[0_0_50px_rgba(49,120,198,0.6)] backdrop-blur-2xl">
            <div className="absolute -inset-2 rounded-[20px] border border-blue-400/20 animate-pulse" />
            <span className="font-mono text-[22px] font-black tracking-tight text-accent">TS</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
