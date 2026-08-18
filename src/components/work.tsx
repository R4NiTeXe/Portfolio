import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

const projects = [
  {
    name: "Video_Tube",
    description:
      "A video-sharing platform — upload, watch and engage, built end to end.",
    stack: ["React.js", "Node.js", "MongoDB"],
    status: "Shipped",
    tone: "default",
    href: "https://github.com/R4NiTeXe",
  },
  {
    name: "Dukaan_Sathi",
    description:
      "An e-commerce companion app designed for small shopkeepers — shipped under sprint pressure.",
    stack: ["React.js", "Express.js", "MongoDB"],
    status: "Top 6 — Hackathon",
    tone: "amber",
    href: "https://github.com/R4NiTeXe",
  },
  {
    name: "AnatomiaX",
    description:
      "An interactive anatomy learning platform — the orbit of my current build.",
    stack: ["Three.js", "React.js"],
    status: "In development",
    tone: "violet",
    href: "https://github.com/R4NiTeXe",
  },
] as const;

export function Work() {
  return (
    <section id="work" aria-label="Work" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">03 // Work</p>
        <div data-reveal-item className="mt-10 flex flex-wrap items-end justify-between gap-6">
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
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-item
              className="eclipse-card group flex flex-col p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="font-display text-xl font-semibold text-white">
                  {project.name}
                </p>
                {project.tone === "amber" && (
                  <span className="mono-label shrink-0 rounded border border-amber/30 bg-amber/10 px-2 py-1 text-amber">
                    {project.status}
                  </span>
                )}
                {project.tone === "violet" && (
                  <span className="mono-label shrink-0 rounded border border-violet/30 bg-violet/10 px-2 py-1 text-violet">
                    {project.status}
                  </span>
                )}
                {project.tone === "default" && (
                  <span className="mono-label shrink-0 text-muted-foreground">
                    {project.status}
                  </span>
                )}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/10 px-2 py-0.5 text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs text-mint opacity-70 transition-opacity group-hover:opacity-100">
                View project
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}

          <a
            href={`mailto:${site.email}?subject=Project%20inquiry`}
            data-reveal-item
            className="group flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 p-6 text-center transition-colors hover:border-mint/40"
          >
            <span className="font-display text-2xl font-light text-white/40 transition-colors group-hover:text-mint">
              +
            </span>
            <p className="text-sm text-muted-foreground">
              Your next idea could
              <br />
              live here —{" "}
              <span className="text-mint">start a project.</span>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}