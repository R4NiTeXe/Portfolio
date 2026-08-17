const groups = [
  {
    title: "Languages",
    items: ["C", "C++", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Tailwind CSS", "GSAP", "Three.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "MySQL"],
  },
  {
    title: "Tools & Ops",
    items: ["Git", "GitHub", "Linux", "Docker", "Vercel", "Render", "Postman"],
  },
  {
    title: "Foundations",
    items: ["DSA", "DBMS", "OOP"],
  },
] as const;

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">02 // Skills</p>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-xl text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
            The stack behind
            <br />
            <span className="text-glow-mint text-mint">the eclipse.</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Tools I reach for daily — from bare C to typed React, from
            localhost to deployed containers.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="eclipse-card p-6">
              <p className="mono-label text-mint">{group.title}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-mint/40 hover:text-mint"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="eclipse-card flex flex-col justify-between p-6">
            <p className="mono-label text-mint">Always learning</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Currently deepening Three.js and systems programming — the
              bright side of the eclipse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}