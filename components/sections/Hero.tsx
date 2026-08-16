"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import { fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { CosmicBackground } from "@/components/features/CosmicBackground";
import { TechOrbital } from "@/components/features/TechOrbital";
import { FeaturePanel } from "@/components/features/FeaturePanel";

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
              className="mb-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-[#110A26]/60 px-3.5 py-1.5 font-mono text-xs text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] backdrop-blur-md">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 text-purple-400 fill-current"
                >
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                </svg>
                {profile.brand} · {profile.role}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4rem]"
            >
              Providing{" "}
              <span className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                the
              </span>{" "}
              <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                best
              </span>
              <br />
              project experience
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
              className="mt-6 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#about"
                className="group relative inline-flex items-center justify-center rounded-xl border border-purple-500/40 bg-gradient-to-r from-[#2E0854] via-[#1F073D] to-[#120326] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-[1.03] hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] active:scale-[0.98]"
              >
                <span>Learn More!</span>
                <div className="absolute inset-0 rounded-xl bg-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>

              <Button href="#work" variant="secondary" size="md">
                Explore Projects
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