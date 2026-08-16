"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { XRayLayer } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

interface ProjectXRayProps {
  layers: XRayLayer[];
}

export function ProjectXRay({ layers }: ProjectXRayProps) {
  const [activeId, setActiveId] = useState(layers[0].id);
  const active = layers.find((layer) => layer.id === activeId) ?? layers[0];

  return (
    <div className="glass-card overflow-hidden rounded-lg">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
          X-Ray
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
          Explore the layers
        </p>
      </div>

      <div className="grid sm:grid-cols-3">
        <ul role="tablist" aria-label="Project layers" className="sm:col-span-1">
          {layers.map((layer) => (
            <li key={layer.id} className="border-b border-border/60 last:border-b-0">
              <button
                type="button"
                role="tab"
                id={`xray-tab-${layer.id}`}
                aria-selected={activeId === layer.id}
                aria-controls={`xray-panel-${layer.id}`}
                onClick={() => setActiveId(layer.id)}
                className={cn(
                  "w-full px-5 py-3 text-left font-mono text-xs uppercase tracking-widest transition-colors",
                  activeId === layer.id
                    ? "bg-accent/10 text-accent"
                    : "text-text-muted hover:bg-elevated hover:text-text",
                )}
              >
                {layer.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t border-border/60 p-5 sm:col-span-2 sm:border-l sm:border-t-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              role="tabpanel"
              id={`xray-panel-${active.id}`}
              aria-labelledby={`xray-tab-${active.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-sm font-semibold text-text">{active.label}</h4>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                {active.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {active.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-accent"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}