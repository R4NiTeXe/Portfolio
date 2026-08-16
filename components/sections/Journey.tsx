"use client";

import { motion } from "framer-motion";
import { journey } from "@/lib/data/journey";
import { cn } from "@/lib/utils";

export function Journey() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
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
            04 — Timeline
          </p>
          <h2
            id="journey-heading"
            className="text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            Journey
          </h2>
        </motion.div>

        <ol className="mt-12 space-y-0">
          {journey.map((step, index) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative border-l border-border pl-8 pb-12 last:pb-0"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full",
                  step.period === "Now"
                    ? "bg-accent-violet shadow-[0_0_12px_rgba(139,92,246,0.8)]"
                    : "bg-accent",
                )}
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                {step.period}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-text-muted md:text-base">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}