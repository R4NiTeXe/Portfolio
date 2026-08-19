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

const ECLIPSE_WORD = ["e", "c", "l", "i", "p", "s", "e"];

export function EasterEgg() {
  const push = useToast();
  const progress = useRef(0);
  const wordProgress = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; size: number }[]>([]);

  const burst = (colors: string[], count: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    particles.current = Array.from({ length: count }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      life: 1,
      size: 1 + Math.random() * 2.5,
    }));
    let raf = 0;
    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current
        .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vx: p.vx * 0.97, vy: p.vy * 0.97, life: p.life - 0.012 }))
        .filter((p) => p.life > 0);
      for (const p of particles.current) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
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
          push("CHEAT CODE ACCEPTED — ORBIT STORM");
          burst(["#65F6D5", "#8B7CFF"], 90);
        }
      } else {
        progress.current = key === KONAMI[0] ? 1 : 0;
      }
      if (key === ECLIPSE_WORD[wordProgress.current]) {
        wordProgress.current += 1;
        if (wordProgress.current === ECLIPSE_WORD.length) {
          wordProgress.current = 0;
          push("ECLIPSE PROTOCOL ENGAGED — RING IGNITED");
          burst(["#101828", "#65F6D5", "#8B7CFF"], 60);
        }
      } else {
        wordProgress.current = key === ECLIPSE_WORD[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[96]"
    />
  );
}