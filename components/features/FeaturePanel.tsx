"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { heroFeatures } from "@/lib/data/features";

export function FeaturePanel() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-6 backdrop-blur-xl sm:px-10 sm:py-8"
    >
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0">
        {heroFeatures.map((feature, index) => (
          <div
            key={feature.number}
            className={`flex flex-col gap-1.5 ${index < heroFeatures.length - 1 ? "lg:border-r lg:border-white/[0.08] lg:pr-8" : ""} ${index === 2 ? "max-lg:border-r max-lg:border-white/[0.08] max-lg:pr-6" : ""}`}
          >
            <span className="font-mono text-xs tracking-wider text-accent/60">
              {feature.number}
            </span>
            <h3 className="text-sm font-semibold text-text/90">
              {feature.title}
            </h3>
            <p className="text-xs leading-relaxed text-text-muted/60">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}