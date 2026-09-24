"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let mx = -100;
    let my = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, select, textarea, summary, [data-hover]"
      );

      // Uniform subtle pull toward interactive element center
      const labeled = interactive?.closest<HTMLElement>("[data-cursor-label]");
      const anchor = (labeled ?? interactive) as HTMLElement | null;
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        const pull = 0.12;
        mx = x + (rect.left + rect.width / 2 - x) * pull;
        my = y + (rect.top + rect.height / 2 - y) * pull;
      } else {
        mx = x;
        my = y;
      }
      label.textContent = labeled?.dataset.cursorLabel ?? "";
      ring.classList.toggle("cursor-ring-hover", !!interactive && !labeled);
      ring.classList.toggle("cursor-ring-labeling", !!labeled);
    };

    const onDown = () => {
      dot.style.scale = "0.7";
      ring.style.scale = "0.9";
    };
    const onUp = () => {
      dot.style.scale = "1";
      ring.style.scale = "1";
    };

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
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
        className="cursor-ring fixed left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/25 transition-[border-color,background-color,width,height] duration-200"
      >
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
}
