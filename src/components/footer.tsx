"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";
import { navLinks, site } from "@/lib/site";

const BUILD_LOG = [
  { version: "v3.0", note: "ORBIT — mini game, easter egg, live telemetry" },
  { version: "v2.1", note: "Terminal mode, command palette, project modals" },
  { version: "v2.0", note: "Celestial system, section rebuild, verified data" },
  { version: "v1.9", note: "ECLIPSE identity, reference layout alignment" },
  { version: "v1.0", note: "Initial ECLIPSE portfolio launch" },
] as const;

const SYS_LOG = [
  { tag: "SYS", text: "NAVIGATION READY" },
  { tag: "WORK", text: "PROJECT ARCHIVE LOADED" },
  { tag: "ORBIT", text: "STABLE" },
  { tag: "UI", text: "INTERFACE READY" },
] as const;

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const timer = window.setInterval(() => setTime(fmt()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

function useFps() {
  const [fps, setFps] = useState<number | null>(null);
  const frames = useRef(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    let alive = false;
    let last = performance.now();
    const loop = (now: number) => {
      frames.current += 1;
      if (now - last >= 1000) {
        setFps(Math.round((frames.current * 1000) / (now - last)));
        frames.current = 0;
        last = now;
      }
      if (alive) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (alive) return;
      alive = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return { fps, footerRef };
}

function useSessionUptime() {
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(
      () => setUptime(Math.floor((Date.now() - start) / 1000)),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);
  const mm = String(Math.floor(uptime / 60)).padStart(2, "0");
  const ss = String(uptime % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function Footer() {
  const time = useClock();
  const { fps, footerRef } = useFps();
  const uptime = useSessionUptime();

  return (
    <footer ref={footerRef} className="relative border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold text-white">
              {site.brand}
            </p>
            <p className="mono-label mt-3 text-muted-foreground">
              R4NiTeXe © {new Date().getFullYear()}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Full-stack development at the edge of light. Crafted in Kolkata,
              India.
            </p>
            <p className="mono-label mt-5 flex items-center gap-2 !text-[10px] text-mint">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
              SYS // STATUS: OPERATIONAL
            </p>
            <details className="mt-4">
              <summary className="mono-label cursor-pointer list-none !text-[9px] text-white/40 transition-colors hover:text-mint">
                BUILD LOG
                <span className="ml-1 inline-block transition-transform duration-300 group-open:rotate-45 open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="mt-3 space-y-1.5 border-l border-white/10 pl-3">
                {BUILD_LOG.map((entry) => (
                  <li
                    key={entry.version}
                    className="flex items-baseline gap-2 text-[11px] text-muted-foreground"
                  >
                    <span className="mono-label shrink-0 !text-[9px] text-mint">
                      {entry.version}
                    </span>
                    <span className="truncate">{entry.note}</span>
                  </li>
                ))}
              </ul>
            </details>
            <details className="mt-4">
              <summary className="mono-label cursor-pointer list-none !text-[9px] text-white/40 transition-colors hover:text-mint">
                SYSTEM LOG — STATIC · DECORATIVE
                <span className="ml-1 inline-block transition-transform duration-300 group-open:rotate-45 open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="mt-3 space-y-1.5 border-l border-white/10 pl-3">
                {SYS_LOG.map((entry) => (
                  <li
                    key={entry.tag}
                    className="flex items-baseline gap-2 text-[11px] text-muted-foreground"
                  >
                    <span className="mono-label shrink-0 !text-[9px] text-mint">
                      [{entry.tag}]
                    </span>
                    <span className="truncate">{entry.text}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          <nav aria-label="Footer">
            <p className="mono-label mb-4 text-white/60">Navigate</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-mint"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mono-label mb-4 text-white/60">Transmit</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-mint"
                >
                  <Mail className="h-4 w-4 text-mint/70" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-mint"
                >
                  <GithubIcon className="h-4 w-4 text-mint/70" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-mint"
                >
                  <LinkedinIcon className="h-4 w-4 text-mint/70" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="mono-label !text-[10px] !tracking-[0.14em] text-muted-foreground/60">
            {time ? `KOLKATA · ${time} IST` : "KOLKATA · INDIA"}
          </p>
          <p className="mono-label !text-[10px] !tracking-[0.14em] text-muted-foreground/60">
            {fps !== null ? `SYS // ${fps} FPS — LIVE` : "SYS // ONLINE"}
          </p>
          <p className="mono-label !text-[10px] !tracking-[0.14em] text-muted-foreground/60">
            SESSION {uptime}
          </p>
          <p className="mono-label !text-[10px] !tracking-[0.14em] text-muted-foreground/60">
            ENGINEERED WITH AI ASSISTANCE · OPENCODE
          </p>
          <Magnetic strength={0.35}>
            <a
              href="#top"
              data-cursor-label="UP"
              className="group inline-flex items-center gap-3 text-xs text-muted-foreground transition-colors hover:text-mint"
            >
              <span className="mono-label !text-[10px] !tracking-[0.14em]">
                Return to orbit
              </span>
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-mint/50">
                <span
                  aria-hidden="true"
                  className="orbit-rotate absolute inset-0 rounded-full border border-transparent [animation-duration:9s] [border-top-color:rgba(101,246,213,0.5)] group-hover:[animation-play-state:running]"
                />
                <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}