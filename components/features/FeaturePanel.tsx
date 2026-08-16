"use client";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "2 Real Projects",
    description: "Building and shipping real applications",
  },
  {
    number: "02",
    title: "Always Learning",
    description: "Exploring modern technologies and improving every day",
  },
  {
    number: "03",
    title: "Clean & Scalable Code",
    description: "Focused on maintainable and efficient development",
  },
  {
    number: "04",
    title: "Problem Solver",
    description: "Turning ideas into practical digital solutions",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function FeaturePanel() {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-6 backdrop-blur-xl sm:px-10 sm:py-8"
    >
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0">
        {features.map((feature, index) => (
          <div
            key={feature.number}
            className={`flex flex-col gap-1.5 ${index < features.length - 1 ? "lg:border-r lg:border-white/[0.08] lg:pr-8" : ""} ${index === 2 ? "max-lg:border-r max-lg:border-white/[0.08] max-lg:pr-6" : ""}`}
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