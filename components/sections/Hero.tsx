"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Hero3D } from "@/components/features/Hero3D";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center overflow-hidden pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-accent-violet/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:px-10 lg:grid-cols-2">
        <div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-5 font-mono text-sm uppercase tracking-[0.3em] text-accent"
          >
            {profile.brand} / {profile.role}
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-5xl font-semibold tracking-tight text-text md:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-8 text-text-muted md:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-4 max-w-xl leading-7 text-text-muted"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
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
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10"
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
              Open To
            </p>
            <ul className="flex flex-wrap gap-2">
              {profile.openTo.map((item) => (
                <li key={item}>
                  <Badge tone="accent">{item}</Badge>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:block"
        >
          <Hero3D />
        </motion.div>
      </div>
    </section>
  );
}