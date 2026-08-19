"use client";

import { useEffect, useRef } from "react";
import { Copy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dataSheet, maganal } from "@/lib/data";
import { useToast } from "@/components/toast";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { text: "Top 6", label: "Hackathon finalist" },
  { to: 7.01, decimals: 2, label: "CGPA — Brainware University" },
  { to: 3, decimals: 0, label: "Languages spoken" },
  { to: 2027, decimals: 0, label: "Diploma completion target" },
] as const;

const systemLog = [
  { when: "2024 — 2027", what: "DIPLOMA CSE — BRAINWARE UNIVERSITY" },
  { when: "2025", what: "HACKATHON TOP 6 — DIGONTOM PVT. LTD." },
  { when: "20.04 — 07.08.2026", what: "MAGANAL ROVER — AGNIRATH AEROSPACE" },
] as const;

function CountUp({
  to,
  decimals = 0,
}: {
  to: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = to.toFixed(decimals);
      return;
    }
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = obj.v.toFixed(decimals);
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, decimals]);

  return (
    <span ref={ref} aria-hidden="true">
      {to.toFixed(decimals)}
    </span>
  );
}

export function About() {
  const push = useToast();

  const copyRow = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      push(`${label} COPIED TO CLIPBOARD`);
    } catch {
      push("COPY FAILED — SELECT MANUALLY");
    }
  };

  return (
    <section id="about" aria-label="About" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">01 // About</p>

        <h2
          data-reveal-item
          className="font-display mt-6 text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl"
        >
          Turning ideas into
          <br />
          <span className="text-glow-mint text-mint">deliberate software.</span>
        </h2>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div data-reveal-item>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              I&apos;m Ranit — a software developer from Kolkata, India. I
              build full-stack products with a code-first mindset: Node.js
              APIs, React interfaces, and databases designed to scale quietly
              in the background.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Pursuing a Diploma in CSE at Brainware University after the Team
              Project Internship at Agnirath Aerospace — on the MAGANAL rover
              mission.
            </p>

            <div className="mt-8 max-w-xl rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="mono-label !text-[9px] text-white/40">
                DATA SHEET
                <span className="blink-cursor ml-1 inline-block h-2 w-px bg-mint/70" />
              </p>
              <dl className="mt-4 space-y-2.5">
                {dataSheet.map((row) => {
                  const copyable = row.label === "Email";
                  return (
                    <div
                      key={row.label}
                      role={copyable ? "button" : undefined}
                      tabIndex={copyable ? 0 : undefined}
                      onClick={
                        copyable
                          ? () => copyRow(row.value, row.label.toUpperCase())
                          : undefined
                      }
                      onKeyDown={
                        copyable
                          ? (e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                copyRow(row.value, row.label.toUpperCase());
                              }
                            }
                          : undefined
                      }
                      data-cursor-label={copyable ? "COPY" : undefined}
                      className={`group flex items-baseline justify-between gap-6 border-b border-white/5 pb-2.5 transition-colors last:border-0 last:pb-0 ${
                        copyable
                          ? "cursor-pointer hover:border-mint/30 hover:bg-white/[0.03]"
                          : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <dt className="mono-label !text-[9px] text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="flex items-center gap-2 text-right text-[13px] text-white/85">
                        {row.value}
                        {copyable && (
                          <Copy className="h-3 w-3 text-mint/0 transition-colors group-hover:text-mint/70" />
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="mt-5 max-w-xl rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="mono-label !text-[9px] text-white/40">
                SYSTEM LOG — LAST 3 EVENTS
              </p>
              <ul className="mt-4 space-y-2.5">
                {systemLog.map((entry) => (
                  <li
                    key={entry.what}
                    className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-2.5 last:border-0 last:pb-0"
                  >
                    <span className="mono-label !text-[9px] text-mint">
                      {entry.when}
                    </span>
                    <span className="text-right text-[13px] text-white/85">
                      {entry.what}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start">
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-reveal-item
                className="card-spotlight eclipse-card p-5"
              >
                <p className="font-display text-3xl font-semibold text-white md:text-4xl">
                  {"text" in stat ? (
                    stat.text
                  ) : (
                    <CountUp to={stat.to} decimals={stat.decimals} />
                  )}
                </p>
                <p className="mono-label mt-3 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div
            data-reveal-item
            className="card-spotlight eclipse-card relative overflow-hidden p-6"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 h-[3px] w-24 bg-gradient-to-r from-amber to-transparent"
            />
            <p className="mono-label mt-2 flex items-center gap-2 text-amber">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-amber" />
              {maganal.role} — {maganal.org}
            </p>
            <p className="mt-2 mono-label !text-[9px] text-muted-foreground">
              {maganal.period}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/90">
              Team member on <span className="text-mint">{maganal.name}</span>{" "}
              — {maganal.full}. The project runs on{" "}
              {maganal.areas.slice(0, -1).join(", ")} and{" "}
              {maganal.areas[maganal.areas.length - 1]}.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {maganal.areas.map((area) => (
                <span
                  key={area}
                  className="rounded border border-amber/20 bg-amber/[0.06] px-2 py-0.5 text-[10px] tracking-[0.12em] text-amber/90 uppercase"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div
            data-reveal-item
            className="card-spotlight eclipse-card relative overflow-hidden p-6"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 h-[3px] w-24 bg-gradient-to-r from-violet to-transparent"
            />
            <p className="mono-label mt-2 text-mint">{"// "}CURRENT FOCUS</p>
            <p className="mt-4 text-sm leading-relaxed text-white/90">
              <span className="text-violet">AnatomiaX</span> — a 3D AI-powered
              anatomy learning platform, on the build bench.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Alongside: deepening Three.js, systems programming and
              mission-grade full-stack engineering.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-4">
          {[
            { word: "BUILD", note: "Prototypes, APIs, interfaces — crafted deliberately." },
            { word: "SHIP", note: "Full production cycles — like Video_Tube." },
            { word: "LEARN", note: "Every orbit teaches — hackathons, rovers, diplomas." },
            { word: "REPEAT", note: "Improve the next pass with what the last one taught." },
          ].map((step) => (
            <div
              key={step.word}
              data-reveal-item
              className="card-spotlight eclipse-card p-4"
            >
              <p className="font-display text-sm font-semibold text-mint">
                {step.word}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                {step.note}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal-item className="mt-10">
          <div
            aria-hidden="true"
            className="h-10 w-full rounded-full bg-[radial-gradient(ellipse_60%_120%_at_50%_50%,rgba(101,246,213,0.6),transparent_70%)] blur-md"
          />
          <p className="mono-label mt-4 text-mint">
            {"// "}SIGNAL: OPERATIONAL — MODE: FULL-STACK — OPEN TO NEW PROJECTS
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            <p className="mono-label !text-[9px] text-muted-foreground">
              MISSION LOG — <span className="text-mint">{maganal.name}</span> ·{" "}
              {maganal.org}
            </p>
            <p className="mono-label !text-[9px] text-muted-foreground">
              PHASE: TEAM PROJECT — INTERNSHIP COMPLETE · {maganal.period}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}