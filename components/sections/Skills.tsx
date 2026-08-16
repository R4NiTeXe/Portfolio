"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillClusters } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const [clusterId, setClusterId] = useState(skillClusters[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const cluster =
    skillClusters.find((c) => c.id === clusterId) ?? skillClusters[0];
  const selected =
    cluster.items.find((item) => item.name === selectedId) ?? null;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
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
            02 — Developer DNA
          </p>
          <h2
            id="skills-heading"
            className="text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            Skills
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted md:text-lg">
            Every technology below is used in a real project — no invented
            percentages. Select one to see what it actually does here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <div
            role="tablist"
            aria-label="Skill clusters"
            className="flex flex-wrap gap-2"
          >
            {skillClusters.map((c) => (
              <button
                key={c.id}
                role="tab"
                type="button"
                id={`tab-${c.id}`}
                aria-selected={clusterId === c.id}
                aria-controls="skills-panel"
                onClick={() => {
                  setClusterId(c.id);
                  setSelectedId(null);
                }}
                className={cn(
                  "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                  clusterId === c.id
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-border text-text-muted hover:border-accent/40 hover:text-text",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div
            id="skills-panel"
            role="tabpanel"
            aria-labelledby={`tab-${cluster.id}`}
            className="mt-6 grid gap-6 lg:grid-cols-5"
          >
            <div className="lg:col-span-3">
              <ul className="flex flex-wrap gap-2">
                {cluster.items.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      aria-pressed={selected?.name === item.name}
                      onClick={() => setSelectedId(item.name)}
                      className={cn(
                        "rounded-md border px-4 py-2 text-sm transition-colors",
                        selected?.name === item.name
                          ? "border-accent-violet/60 bg-accent-violet/10 text-accent-violet"
                          : "border-border text-text-muted hover:border-border hover:bg-elevated hover:text-text",
                      )}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="glass-card h-full rounded-lg p-5"
                  >
                    <h3 className="text-base font-semibold text-text">
                      {selected.name}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {selected.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-2 text-sm leading-6 text-text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                          />
                          {capability}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 font-mono text-xs uppercase tracking-widest text-accent-violet">
                      Used in
                    </p>
                    <p className="mt-1 text-sm text-text">
                      {selected.usedIn.join(" · ")}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card flex h-full items-center justify-center rounded-lg p-5"
                  >
                    <p className="text-sm text-text-muted">
                      Select a technology to see how it&apos;s actually used.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}