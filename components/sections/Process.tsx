"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data/site";

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
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
            05 — Process
          </p>
          <h2
            id="process-heading"
            className="text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            How I build
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="glass-card group rounded-lg p-5 transition-colors hover:border-accent/40"
            >
              <p className="font-mono text-2xl font-semibold text-accent/70 transition-colors group-hover:text-accent">
                {step.number}
              </p>
              <h3 className="mt-4 text-base font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}