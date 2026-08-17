"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setGone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      document.documentElement.style.overflow = "";
      setGone(true);
    }, 1500);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070A0F]"
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <div className="preloader-ring absolute inset-0 rounded-full border border-mint/30" />
        <div className="preloader-ring-2 absolute inset-2 rounded-full border border-violet/40" />
        <div className="h-10 w-10 rounded-full bg-black shadow-[0_0_40px_rgba(101,246,213,0.25)] ring-1 ring-mint/60" />
      </div>
      <p className="mono-label mt-8 animate-pulse text-mint">
        Initializing ECLIPSE
      </p>
    </div>
  );
}