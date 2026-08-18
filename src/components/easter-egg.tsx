"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/toast";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const push = useToast();
  const progress = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; size: number }[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[progress.current]) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          trigger();
        }
      } else {
        progress.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const trigger = () => {
    push("CHEAT CODE ACCEPTED — ORBIT STORM");
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    particles.current = Array.from({ length: 90 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      life: 1,
      size: 1 + Math.random() * 2.5,
    }));
    let raf = 0;
    const step = () => {
      const ctx2 = ctx;
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current
        .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vx: p.vx * 0.97, vy: p.vy * 0.97, life: p.life - 0.012 }))
        .filter((p) => p.life > 0);
      for (const p of particles.current) {
        ctx2.globalAlpha = p.life;
        ctx2.fillStyle = Math.random() > 0.3 ? "#65F6D5" : "#8B7CFF";
        ctx2.beginPath();
        ctx2.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx2.fill();
      }
      ctx2.globalAlpha = 1;
      if (particles.current.length) {
        raf = requestAnimationFrame(step);
      }
    };
    step();
    const stop = () => cancelAnimationFrame(raf);
    window.setTimeout(() => {
      stop();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[96]"
    />
  );
}