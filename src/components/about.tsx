const stats = [
  { value: "Top 6", label: "Hackathon finalist" },
  { value: "3+", label: "Projects shipped" },
  { value: "7.01", label: "CGPA — Brainware University" },
  { value: "3", label: "Languages spoken" },
] as const;

export function About() {
  return (
    <section id="about" aria-label="About" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">01 // About</p>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
              Turning ideas into
              <br />
              <span className="text-glow-mint text-mint">deliberate software.</span>
            </h2>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              I&apos;m Ranit — a software developer from Kolkata, India. I build
              full-stack products with a code-first mindset: Node.js APIs,
              React interfaces, and databases designed to scale quietly in the
              background.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Currently pursuing a Diploma in CSE at Brainware University while
              interning at Agnirath Aerospace — where I work on the MAGANAL
              rover project, wiring full-stack systems for real machines.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start">
            {stats.map((stat) => (
              <div key={stat.label} className="eclipse-card p-5">
                <p className="font-display text-3xl font-semibold text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mono-label mt-3 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}