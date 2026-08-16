"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            01 — About
          </p>
          <h2
            id="about-heading"
            className="text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            Still learning.{" "}
            <span className="gradient-text">Already building.</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-16">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <p className="max-w-xl text-lg leading-8 text-text-muted">
              {profile.bio}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="glass-card rounded-lg p-5">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                  Currently learning
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {profile.currentlyLearning}
                </p>
              </div>
              <div className="glass-card rounded-lg p-5">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent-violet">
                  What I like building
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  Full-stack applications that feel like real products — from
                  streaming platforms to AI-assisted billing tools.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-lg p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                Education
              </p>
              <h3 className="mt-3 text-lg font-semibold text-text">
                {profile.education.degree}
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                {profile.education.school}
              </p>
              <p className="mt-3 inline-block rounded-md border border-border px-3 py-1 font-mono text-xs text-accent">
                {profile.education.years}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}