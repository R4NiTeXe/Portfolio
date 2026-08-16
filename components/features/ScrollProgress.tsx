"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ clientY: 0, scrollY: 0 });
  const [thumbHeight, setThumbHeight] = useState(6);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.4,
  });
  const velocity = useVelocity(scrollYProgress);
  const glow = useTransform(velocity, (v) =>
    Math.min(Math.abs(v) * 0.5 + 0.35, 1.7),
  );
  const auraBlur = useTransform(glow, (g) => 6 + g * 8);
  const auraOpacity = useTransform(glow, (g) => 0.18 + g * 0.5);
  const thumbTop = useTransform(
    smoothProgress,
    (v) => `${(v * (100 - thumbHeight)).toFixed(2)}%`,
  );
  const thumbShadow = useMotionTemplate`0 0 ${auraBlur}px 0 color-mix(in srgb, var(--color-accent) 50%, transparent)`;
  const thumbFilter = useTransform(glow, (g) => `brightness(${(0.65 + g * 0.4).toFixed(3)})`);

  useEffect(() => {
    const compute = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      setThumbHeight(Math.max((innerHeight / scrollHeight) * 100, 4));
    };
    compute();
    window.addEventListener("resize", compute);
    const observer = new ResizeObserver(compute);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("resize", compute);
      observer.disconnect();
    };
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    if (event.target === thumb) {
      draggingRef.current = true;
      dragStartRef.current = { clientY: event.clientY, scrollY: window.scrollY };
      track.setPointerCapture(event.pointerId);
      return;
    }
    const ratio = (event.clientY - rect.top) / rect.height;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    smoothScrollTo(ratio * total, false);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const deltaY =
      (event.clientY - dragStartRef.current.clientY) *
      (total / window.innerHeight);
    smoothScrollTo(dragStartRef.current.scrollY + deltaY, true);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    trackRef.current?.releasePointerCapture(event.pointerId);
  }

  return (
    <div
      ref={trackRef}
      onPointerDown={reduceMotion ? undefined : handlePointerDown}
      onPointerMove={reduceMotion ? undefined : handlePointerMove}
      onPointerUp={reduceMotion ? undefined : handlePointerUp}
      className="fixed bottom-2 right-2 top-2 z-[100] w-1.5 cursor-pointer touch-none rounded-full bg-border/70"
      aria-hidden="true"
    >
      <motion.div
        ref={thumbRef}
        className="scrollbar-thumb absolute left-0 right-0 rounded-full"
        style={
          reduceMotion
            ? { top: thumbTop, height: `${thumbHeight}%` }
            : {
                top: thumbTop,
                height: `${thumbHeight}%`,
                filter: thumbFilter,
                boxShadow: thumbShadow,
              }
        }
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 rounded-full bg-accent blur-md"
        style={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: auraOpacity, boxShadow: thumbShadow }
        }
      />
    </div>
  );
}