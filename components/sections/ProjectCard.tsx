"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data/projects";
import { Button } from "@/components/ui/Button";
import { ProjectXRay } from "@/components/features/ProjectXRay";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isFirst = index === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      aria-labelledby={`project-${project.slug}`}
      className="scroll-mt-24 border-t border-border py-16 md:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {isFirst ? "Featured" : "Project 02"} — {String(index + 1).padStart(2, "0")}
          </p>
          <h3
            id={`project-${project.slug}`}
            className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            {project.name}
          </h3>
          <p className="mt-2 text-base font-medium text-accent-violet">
            {project.tagline}
          </p>
          <p className="mt-4 leading-7 text-text-muted">{project.description}</p>

          {project.collaborators ? (
            <p className="mt-4 text-sm text-text-muted">
              Built with{" "}
              <span className="font-medium text-text">
                {project.collaborators.join(", ")}
              </span>
            </p>
          ) : null}

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm leading-6 text-text-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                {feature}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.live ? (
              <Button href={project.live} target="_blank" rel="noopener noreferrer">
                Live Demo
              </Button>
            ) : null}
            <Button
              href={project.github}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source
            </Button>
          </div>
        </div>

        <div>
          <ProjectXRay layers={project.xray} />
        </div>
      </div>
    </motion.article>
  );
}