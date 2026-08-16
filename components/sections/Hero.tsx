"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import { Button } from "@/components/ui/Button";
import { CosmicBackground } from "@/components/features/CosmicBackground";
import { TechOrbital } from "@/components/features/TechOrbital";
import { FeaturePanel } from "@/components/features/FeaturePanel";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <CosmicBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pt-24 pb-12 md:px-10 lg:px-16">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-4">
          <div className="flex flex-col gap-1">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-text-muted backdrop-blur-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {profile.brand} / {profile.role}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-6xl xl:text-[4.2rem]"
            >
              Building digital
              <br />
              products that feel
              <br />
              <span className="bg-gradient-to-r from-accent-violet via-accent to-accent bg-[length:200%_auto] bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ahead of their time.
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-5 max-w-lg text-sm leading-relaxed text-text-muted/80 sm:text-base"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="#work" size="lg">
                Explore My Work
              </Button>
              <Button
                href={profile.resumePath}
                variant="secondary"
                size="lg"
                download
              >
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-6"
            >
              <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted/50">
                Open To
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.openTo.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-text-muted/70 backdrop-blur-sm"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent/60" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex lg:justify-end"
          >
            <TechOrbital />
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-8 md:px-10 lg:px-16">
        <FeaturePanel />
      </div>
    </section>
  );
}