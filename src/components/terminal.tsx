"use client";

import { useEffect, useRef, useState } from "react";

const LINES: { prefix?: string; text: string; color?: string }[] = [
  { prefix: "", text: "ECLIPSE OS v3.0 — PORTFOLIO TERMINAL", color: "text-mint" },
  { prefix: "", text: "> boot sequence initiated" },
  { prefix: "", text: "> loading core modules ......... OK" },
  { prefix: "", text: "> loading mission data ......... OK" },
  { prefix: "", text: "> establishing uplink .......... OK" },
  { prefix: "TYPE     ", text: "Software Developer · Fullstack", color: "text-mint" },
  { prefix: "LOC      ", text: "Kolkata, West Bengal, India" },
  { prefix: "EDU      ", text: "Diploma CSE — Brainware University · 2027 · CGPA 7.01" },
  { prefix: "EXPER    ", text: "MAGANAL rover mission — Team Project Intern, Agnirath Aerospace · Completed Aug 2026 (20.04.2026 — 07.08.2026)" },
  { prefix: "MISSION  ", text: "MAGANAL — Mars Autonomous Ground Analyser with Navigation and Life-Assessment Logic", color: "text-violet" },
  { prefix: "SKILLS   ", text: "C / C++ · React.js · Node.js · Express.js · MongoDB · MySQL · Docker · Linux" },
  { prefix: "AI       ", text: "ChatGPT · Gemini · Claude · OpenCode · Kimi Code · MiMo · Nimotron · DeepSeek", color: "text-violet" },
  { prefix: "PROJECTS ", text: "Video_Tube [SHIPPED] · Dukaan_Sathi [TOP 6] · AnatomiaX [IN DEV]", color: "text-amber" },
  { prefix: "CONTACT  ", text: "ranitnaskar09032007@gmail.com · github.com/R4NiTeXe", color: "text-mint" },
  { prefix: "", text: "> SYSTEM STATUS: OPERATIONAL — OPEN TO NEW PROJECTS", color: "text-mint" },
];

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (typing) return;
      if (e.key.toLowerCase() === "g") {
        setOpen((prev) => !prev);
      }
    };
    const onEvent = () => setOpen((prev) => !prev);
    window.addEventListener("keydown", onKey);
    window.addEventListener("eclipse:terminal", onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("eclipse:terminal", onEvent);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setShown(0);
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (reduced) {
      setShown(LINES.length);
    } else {
      const tick = () => {
        setShown((prev) => {
          if (prev >= LINES.length) return prev;
          timer = setTimeout(tick, prev % 3 === 2 ? 280 : 85);
          return prev + 1;
        });
      };
      timer = setTimeout(tick, 350);
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key.toLowerCase() === "g") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      if (timer) clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (open) bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [shown, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        ref={bodyRef}
        className="eclipse-card h-[70vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-mint/20 p-6 font-mono text-[12.5px] leading-relaxed shadow-[0_0_60px_-20px_rgba(101,246,213,0.4)] md:p-8"
        onClick={() => setOpen(false)}
        role="dialog"
        aria-label="ECLIPSE OS terminal"
      >
        <p className="text-muted-foreground">
          ECLIPSE-OS://<span className="text-mint">portfolio</span>$
          <span className="blink-cursor ml-1 inline-block h-3.5 w-2 bg-mint align-middle" />
        </p>
        <div className="mt-3 space-y-0.5">
          {LINES.slice(0, shown).map((line, i) => (
            <p key={i} className="flex gap-2">
              <span className="w-20 shrink-0 text-white/40">{line.prefix}</span>
              <span className={line.color ?? "text-white/75"}>
                {line.text}
                {i === shown - 1 && (
                  <span className="blink-cursor ml-1 inline-block h-3 w-1.5 bg-mint align-middle" />
                )}
              </span>
            </p>
          ))}
        </div>
        <p className="mono-label mt-6 text-white/40">
          [G] / [ESC] — close terminal
        </p>
      </div>
    </div>
  );
}