"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import gsap from "gsap";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/lib/data";
import { site } from "@/lib/site";

const toneStyles = {
  mint: {
    chip: "border-mint/30 bg-mint/10 text-mint",
    orb: "from-mint/55 to-mint/5",
    index: "text-mint",
    bar: "bg-mint",
  },
  amber: {
    chip: "border-amber/30 bg-amber/10 text-amber",
    orb: "from-amber/55 to-amber/5",
    index: "text-amber",
    bar: "bg-amber",
  },
  violet: {
    chip: "border-violet/30 bg-violet/10 text-violet",
    orb: "from-violet/55 to-violet/5",
    index: "text-violet",
    bar: "bg-violet",
  },
} as const;

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

function ProjectPreview({
  tone,
  variant,
  onSwap,
}: {
  tone: (typeof toneStyles)[keyof typeof toneStyles];
  variant: number;
  onSwap: () => void;
}) {
  return (
    <div className="preview-grid relative mt-4 flex h-28 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
      {variant === 0 && (
        <>
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${tone.orb} blur-sm`}
          />
          <span
            aria-hidden="true"
            className="orbit-rotate absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 [animation-duration:20s]"
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${tone.index} shadow-[0_0_8px_currentColor]`}
          />
        </>
      )}
      {variant === 1 && (
        <>
          <span
            aria-hidden="true"
            className={`animate-pulse-ring absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border ${tone.bar}/30`}
          />
          <span
            aria-hidden="true"
            className={`animate-pulse-ring absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border ${tone.bar}/20 [animation-delay:0.5s]`}
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${tone.bar} shadow-[0_0_16px_currentColor]`}
          />
        </>
      )}
      {variant === 2 && (
        <>
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.02]`}
          />
          <span
            aria-hidden="true"
            className="animate-scan-line absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-mint/70 to-transparent"
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${tone.index} opacity-70`}
          />
        </>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSwap();
        }}
        data-cursor-label="SWAP"
        aria-label="Swap preview"
        className="absolute right-1.5 bottom-1.5 rounded border border-white/10 bg-[#070A0F]/80 px-1.5 py-0.5 mono-label !text-[8px] text-white/40 transition-colors hover:border-mint/40 hover:text-mint"
      >
        SWAP
      </button>
    </div>
  );
}

type Project = (typeof projects)[number];

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

        <div data-modal-stagger className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
            >
              {tech}
            </span>
          ))}
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
            View source
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
  const [previews, setPreviews] = useState<Record<string, number>>({});

  const swapPreview = (name: string) =>
    setPreviews((prev) => ({ ...prev, [name]: ((prev[name] ?? 0) + 1) % 3 }));

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

                  <ProjectPreview
                    tone={tone}
                    variant={previews[project.name] ?? 0}
                    onSwap={() => swapPreview(project.name)}
                  />

                  <h3 className="font-display mt-5 text-xl font-semibold text-white transition-colors group-hover:text-mint">
                    {project.name}
                  </h3>
                  <p className="mono-label mt-1.5 !text-[9px] text-muted-foreground">
                    {project.category}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
                      >
                        {tech}
                      </span>
                    ))}
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
                      Source
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

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}