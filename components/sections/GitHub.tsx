"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";
import { Button } from "@/components/ui/Button";

export function GitHub() {
  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="scroll-mt-24 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            07 — Open Source
          </p>
          <h2
            id="github-heading"
            className="text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            Code that ships.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted md:text-lg">
            Every project I build is open-source. No private one-off demos — the
            full source of each product is public on GitHub.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.a
              key={project.slug}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card group rounded-lg p-5 transition-colors hover:border-accent/40"
            >
              <p className="font-mono text-sm text-accent">{project.name}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-muted">
                {project.tagline}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors group-hover:text-accent">
                View repository ↗
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10"
        >
          <Button
            href={site.github}
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit GitHub Profile
          </Button>
        </motion.div>
      </div>
    </section>
  );
}