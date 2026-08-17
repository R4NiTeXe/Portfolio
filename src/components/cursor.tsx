"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, select, textarea, [data-hover]"
      );
      ring.classList.toggle("cursor-ring-active", !!interactive);
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_12px_rgba(101,246,213,0.8)]"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed left-0 top-0 h-7 w-7 rounded-full border border-white/25 transition-[border-color,background-color,width,height] duration-200"
      />
    </div>
  );
}