"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";

export function Building() {
  return (
    <section
      id="building"
      aria-labelledby="building-heading"
      className="scroll-mt-24 py-10 md:py-14"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass-card flex flex-col gap-4 rounded-lg p-6 sm:flex-row sm:items-center sm:gap-6"
        >
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-violet">
            <span
              aria-hidden="true"
              className="relative flex h-2.5 w-2.5"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-violet opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-violet" />
            </span>
            Currently building
          </p>
          <p id="building-heading" className="text-sm leading-6 text-text">
            {profile.currentlyBuilding}
          </p>
        </motion.div>
      </div>
    </section>
  );
}