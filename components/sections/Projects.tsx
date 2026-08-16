"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";

export function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
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
            04 — Work
          </p>
          <h2
            id="work-heading"
            className="text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            Projects
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted md:text-lg">
            Two real products, shipped and running on free tiers. Every layer is
            interactive — pick one in the X-Ray panel to see how it actually
            works.
          </p>
        </motion.div>

        <div className="mt-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}