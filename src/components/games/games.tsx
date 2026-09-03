"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CodeDebugger } from "./code-debugger";
import { GitChallenge } from "./git-challenge";

const OrbitLab = dynamic(() => import("./orbit-lab").then((m) => m.OrbitLab), {
  ssr: false,
  loading: () => (
    <div className="eclipse-card h-[340px] w-full animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />
  ),
});

type Tab = "orbit" | "debug" | "git";

export function Games() {
  const [tab, setTab] = useState<Tab>("orbit");

  return (
    <section id="games" aria-label="Games" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">05 // Games</p>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display max-w-xl text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
            Engineering
            <br />
            <span className="text-glow-mint text-mint">playground.</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Small interactive experiments — probe orbits, debugging logic, and Git workflows. Built
            for fun, not leaderboards.
          </p>
        </div>

        <div role="tablist" aria-label="Games" className="mt-8 flex flex-wrap gap-2">
          {[
            { id: "orbit" as Tab, label: "Orbit Lab", desc: "Probe orbit" },
            { id: "debug" as Tab, label: "Code Debugger", desc: "Find the bug" },
            { id: "git" as Tab, label: "Git Challenge", desc: "Workflow quiz" },
          ].map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`game-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`rounded-full border px-4 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 ${
                tab === t.id
                  ? "border-mint bg-mint text-[#04141a] font-medium"
                  : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-white"
              }`}
            >
              {t.label} <span className="opacity-60">— {t.desc}</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <div
            id="game-orbit"
            role="tabpanel"
            hidden={tab !== "orbit"}
            className={tab !== "orbit" ? "hidden" : ""}
          >
            <OrbitLab />
          </div>
          <div
            id="game-debug"
            role="tabpanel"
            hidden={tab !== "debug"}
            className={tab !== "debug" ? "hidden" : ""}
          >
            <CodeDebugger />
          </div>
          <div
            id="game-git"
            role="tabpanel"
            hidden={tab !== "git"}
            className={tab !== "git" ? "hidden" : ""}
          >
            <GitChallenge />
          </div>
        </div>
      </div>
    </section>
  );
}
