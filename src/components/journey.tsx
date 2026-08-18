const milestones = [
  {
    period: "2026 — Present",
    role: "Intern — Full-Stack",
    title: "Agnirath Aerospace",
    description:
      "Full-stack development on the MAGANAL rover project — mission dashboards, telemetry pipelines and control systems for real machines.",
  },
  {
    period: "2024 — 2027",
    role: "Diploma in CSE",
    title: "Brainware University",
    description:
      "CGPA 7.01. Foundations in DSA, DBMS, OOP and operating systems — with hands-on projects on the side.",
  },
  {
    period: "2025",
    role: "Hackathon Finalist",
    title: "Top 6",
    description:
      "Built Dukaan_Sathi under sprint pressure — placing Top 6 among strong teams.",
  },
] as const;

export function Journey() {
  return (
    <section id="journey" aria-label="Journey" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">04 // Journey</p>
        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div data-reveal-item>
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
              The path so far —
              <br />
              <span className="text-glow-mint text-mint">one orbit at a time.</span>
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              From classroom fundamentals to aerospace telemetry — every stop
              sharpened the same edge: build fast, build clean, ship it.
            </p>
          </div>

          <ol className="relative space-y-12 border-l border-white/10 pl-8">
            {milestones.map((milestone, index) => (
              <li key={milestone.title} data-reveal-item className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-[41px] h-2.5 w-2.5 rounded-full ${
                    index === 0
                      ? "animate-pulse-dot bg-mint"
                      : "bg-white/30"
                  }`}
                />
                <p className="mono-label text-muted-foreground">
                  {milestone.period}
                </p>
                <p className="mt-2 text-xs tracking-[0.18em] text-mint uppercase">
                  {milestone.role}
                </p>
                <h3 className="font-display mt-1.5 text-xl font-semibold text-white">
                  {milestone.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {milestone.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}