"use client";

import { maganal } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">04 // Experience</p>
        <div data-reveal-item className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-xl text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
            Mission experience —
            <br />
            <span className="text-glow-mint text-mint">built under constraints.</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Team engineering in a research environment — translating mission requirements into a
            functional prototype.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div
            data-reveal-item
            className="card-spotlight eclipse-card relative overflow-hidden p-6 md:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 h-[3px] w-24 bg-gradient-to-r from-amber to-transparent"
            />
            <p className="mono-label mt-2 flex items-center gap-2 text-amber">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-amber" />
              Team Project Intern — {maganal.org}
            </p>
            <p className="mono-label mt-2 !text-[9px] text-muted-foreground">{maganal.period}</p>
            <h3 className="font-display mt-4 text-2xl font-semibold text-white">
              MAGANAL <span className="text-mint">— Mars rover R&amp;D</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/90">{maganal.full}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{maganal.note}</p>
            <ul className="mt-5 space-y-2">
              {[
                "Autonomous navigation",
                "Obstacle detection",
                "Environmental sensing",
                "Terrain monitoring",
                "Multidisciplinary engineering collaboration",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
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
            className="card-spotlight eclipse-card relative overflow-hidden p-6 md:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 h-[3px] w-24 bg-gradient-to-r from-mint to-transparent"
            />
            <p className="mono-label mt-2 text-mint">{"// "}ACHIEVEMENT</p>
            <p className="font-display mt-4 text-3xl font-semibold text-white">TOP 6 FINALIST</p>
            <p className="mono-label mt-2 !text-[9px] text-muted-foreground">
              Digontom Pvt. Ltd. Hackathon — 2026
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Built <span className="text-white">Dukaan_Sathi</span> as a team under sprint
              pressure — placing Top 6 among strong competitors.
            </p>
            <div className="mt-5 rounded-lg border border-mint/20 bg-mint/[0.06] px-4 py-3">
              <p className="mono-label !text-[9px] text-mint">2026 · DUKAAN_SATHI · TEAM SPRINT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
