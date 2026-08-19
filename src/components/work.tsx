"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import gsap from "gsap";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/lib/data";
import { site } from "@/lib/site";
import { ProjectConstellation } from "@/components/constellation";

export const toneStyles = {
  mint: {
    chip: "border-mint/30 bg-mint/10 text-mint",
    index: "text-mint",
    bar: "bg-mint",
    glow: "text-mint",
  },
  amber: {
    chip: "border-amber/30 bg-amber/10 text-amber",
    index: "text-amber",
    bar: "bg-amber",
    glow: "text-amber",
  },
  violet: {
    chip: "border-violet/30 bg-violet/10 text-violet",
    index: "text-violet",
    bar: "bg-violet",
    glow: "text-violet",
  },
} as const;

type Tone = (typeof toneStyles)[keyof typeof toneStyles];

function MiniPreview({
  variant,
  tone,
}: {
  variant: "video" | "retail" | "anatomy";
  tone: Tone;
}) {
  if (variant === "video") {
    return (
      <div className="flex gap-2 p-2.5">
        <div className="relative flex-1 overflow-hidden rounded-md border border-white/10 bg-black/60">
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-y-[6px] border-l-[10px] border-y-transparent border-l-white/80"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-1.5 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-white/15"
          >
            <span
              className={`absolute left-0 top-0 h-full w-1/3 rounded-full ${tone.bar}`}
            />
          </span>
        </div>
        <div className="flex w-16 flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 rounded-md border border-white/10 bg-white/[0.03] p-1"
            >
              <div className="h-3/5 rounded-sm bg-gradient-to-br from-white/15 to-white/5" />
              <div className="mt-1 h-0.5 w-3/4 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "retail") {
    return (
      <div className="flex gap-2 p-2.5">
        <div className="flex w-8 flex-col gap-1.5 border-r border-white/10 pr-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`h-1.5 rounded-full ${
                i === 0 ? `w-full ${tone.bar}` : "w-3/4 bg-white/15"
              }`}
            />
          ))}
        </div>
        <div className="flex-1">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-md border border-white/10 bg-white/[0.03] p-1.5"
              >
                <div className="h-0.5 w-3/4 rounded-full bg-white/15" />
                <div
                  className={`mt-1 h-2 rounded-sm ${
                    i === 1 ? `${tone.bar} opacity-80` : "bg-white/10"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex h-10 items-end gap-1 rounded-md border border-white/10 bg-white/[0.02] p-1.5">
            {[35, 55, 40, 70, 50, 85, 60].map((h, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-sm ${
                  i === 5 ? `${tone.bar} opacity-90` : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center p-2.5">
      <svg
        aria-hidden="true"
        viewBox="0 0 120 64"
        className="h-full w-full"
      >
        <ellipse cx="60" cy="32" rx="26" ry="30" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        <circle cx="60" cy="27" r="11" fill="none" stroke={tone.glow === "text-violet" ? "rgba(139,124,255,0.65)" : "rgba(101,246,213,0.65)"} strokeWidth="1" />
        <line x1="60" y1="10" x2="60" y2="54" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 3" />
        <circle cx="51" cy="37" r="1.5" fill="rgba(255,255,255,0.35)" />
        <circle cx="69" cy="37" r="1.5" fill="rgba(255,255,255,0.35)" />
        <path d="M60 54 L60 60" stroke="rgba(255,255,255,0.15)" />
      </svg>
      <span
        aria-hidden="true"
        className="animate-scan-line absolute inset-x-3 top-1/2 h-px bg-gradient-to-r from-transparent via-violet/70 to-transparent"
      />
    </div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 3}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 3}deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      }}
      className="[transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}

export type Project = (typeof projects)[number];

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    gsap.to(panelRef.current, {
      scale: 0.96,
      y: 10,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [closing, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power1.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { scale: 0.94, y: 18, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: "power3.out", delay: 0.05 },
      );
      gsap.fromTo(
        "[data-modal-stagger]",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out", delay: 0.2 },
      );
    }, panelRef);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button",
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [close]);

  const tone = toneStyles[project.tone];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — project details`}
    >
      <div
        ref={panelRef}
        className="eclipse-card relative w-full max-w-lg overflow-hidden rounded-2xl p-6 md:p-8"
      >
        <div
          aria-hidden="true"
          className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${tone.bar} via-transparent to-transparent opacity-70`}
        />
        <div className="flex items-start justify-between gap-4">
          <p data-modal-stagger className={`font-display text-sm font-semibold ${tone.index}`}>
            {project.index}
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`mono-label shrink-0 rounded border px-2 py-1 !text-[9px] ${tone.chip}`}
            >
              {project.status}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close project details"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-mint/40 hover:text-mint"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <h3 data-modal-stagger className="font-display mt-3 text-2xl font-semibold text-white">
          {project.name}
        </h3>
        <p data-modal-stagger className="mono-label mt-1.5 !text-[9px] text-muted-foreground">
          {project.category}
        </p>
        <p data-modal-stagger className="mono-label mt-1 !text-[9px] text-white/50">
          ROLE — {project.role}
        </p>
        <p data-modal-stagger className="mono-label mt-1 !text-[9px] text-mint/80">
          CURRENT STATE — {project.status.toUpperCase()}
        </p>

        <div data-modal-stagger className="preview-grid mt-4 flex h-28 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
          <div className="h-full w-full">
            <MiniPreview variant={project.preview} tone={tone} />
          </div>
        </div>

        <p data-modal-stagger className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div data-modal-stagger className="mt-5">
          <p className="mono-label !text-[9px] text-white/50">MISSION DETAILS</p>
          <ul className="mt-2.5 space-y-1.5">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
              >
                <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${tone.bar}`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div data-modal-stagger className="mt-5">
          <p className="mono-label !text-[9px] text-white/50">TECHNOLOGIES</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          data-modal-stagger
          className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/5 pt-5"
        >
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-mint/30 bg-mint/10 px-3.5 py-2 text-xs text-mint transition-colors hover:bg-mint/20"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            {project.repo ? "View source" : "GitHub profile"}
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(`About ${project.name}`)}`}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-mint"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Discuss this project
          </a>
          {!project.live && (
            <span className="mono-label ml-auto !text-[8px] text-muted-foreground/50">
              NO LIVE LINK
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" aria-label="Work" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">03 // Work</p>
        <div
          data-reveal-item
          className="mt-10 flex flex-wrap items-end justify-between gap-6"
        >
          <h2 className="font-display max-w-xl text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
            Selected
            <br />
            <span className="text-glow-mint text-mint">projects.</span>
          </h2>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-mint"
          >
            Full archive on GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => {
            const tone = toneStyles[project.tone];
            return (
              <TiltCard key={project.name}>
                <article
                  data-reveal-item
                  data-cursor-label="OPEN"
                  data-cursor-project
                  onClick={() => setOpen(project)}
                  className="card-spotlight eclipse-card group flex h-full cursor-pointer flex-col p-6 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className={`font-display text-sm font-semibold ${tone.index}`}>
                      {project.index}
                    </p>
                    <span
                      className={`mono-label shrink-0 rounded border px-2 py-1 !text-[9px] ${tone.chip}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="preview-grid relative mt-4 flex h-28 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                    <MiniPreview variant={project.preview} tone={tone} />
                  </div>

                  <h3 className="font-display mt-5 text-xl font-semibold text-white transition-colors group-hover:text-mint">
                    {project.name}
                  </h3>
                  <p className="mono-label mt-1.5 !text-[9px] text-muted-foreground">
                    {project.category}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 max-h-40 overflow-hidden opacity-100 transition-all duration-300 group-hover:mt-0 group-hover:max-h-0 group-hover:opacity-0">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-4 group-hover:max-h-12 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5">
                      <span className={`h-1 w-1 animate-pulse-dot rounded-full ${tone.bar}`} />
                      <span className="mono-label !text-[9px] text-muted-foreground">
                        {project.status} — {project.role}
                      </span>
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-mint"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      {project.repo ? "Source" : "GitHub profile"}
                    </a>
                    <span className="mono-label inline-flex items-center gap-1.5 !text-[9px] text-muted-foreground/60 transition-colors group-hover:text-mint">
                      Details
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </article>
              </TiltCard>
            );
          })}

          <div
            data-reveal-item
            className="card-spotlight flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 p-6 text-center transition-colors hover:border-mint/40"
          >
            <p className="font-display text-sm font-semibold text-white/40">
              04 — NEXT ORBIT
            </p>
            <div
              aria-hidden="true"
              className="orbit-rotate relative h-10 w-10 [animation-duration:14s]"
            >
              <span className="absolute inset-0 rounded-full border border-white/10" />
              <span className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-mint/70 shadow-[0_0_6px_rgba(101,246,213,0.7)]" />
            </div>
            <p className="text-sm text-muted-foreground">
              Locked — transmission pending.
              <br />
              <span className="text-mint">
                Your project could take this slot.
              </span>
            </p>
          </div>
        </div>
        <div
          data-reveal-item
          className="card-spotlight mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-violet/25 bg-violet/[0.06] px-6 py-4"
        >
          <p className="mono-label !text-[10px] text-violet">
            {"// "}NOW ON THE BUILD BENCH
          </p>
          <p className="text-sm text-white/85">
            <span className="text-violet">AnatomiaX</span> — 3D AI-powered
            anatomy learning platform. Watch this orbit.
          </p>
          <span
            aria-hidden="true"
            className="orbit-rotate relative hidden h-8 w-8 sm:block [animation-duration:10s]"
          >
            <span className="absolute inset-0 rounded-full border border-violet/30" />
            <span className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet shadow-[0_0_6px_rgba(139,124,255,0.7)]" />
          </span>
        </div>
      </div>

      <ProjectConstellation onOpen={setOpen} />

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}