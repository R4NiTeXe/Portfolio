import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070A0F] px-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(101,246,213,0.35),transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="orbit-rotate pointer-events-none absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 [animation-duration:40s]"
      >
        <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-mint/60 shadow-[0_0_10px_rgba(101,246,213,0.6)]" />
      </div>
      <div
        aria-hidden="true"
        className="orbit-rotate pointer-events-none absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 [animation-duration:26s] [animation-direction:reverse]"
      >
        <span className="absolute top-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet/60 shadow-[0_0_8px_rgba(139,124,255,0.6)]" />
      </div>

      <p className="mono-label relative z-10 text-mint">
        404 — SIGNAL LOST
      </p>
      <h1 className="font-display relative z-10 mt-4 text-6xl leading-[1.02] font-semibold tracking-tight text-white md:text-8xl">
        ORBIT
        <br />
        <span className="text-glow-mint text-mint">LOST.</span>
      </h1>
      <p className="relative z-10 mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
        This coordinate doesn&apos;t exist in the current map — the probe
        drifted off its trajectory. Returning to a known orbit.
      </p>
      <Link
        href="/"
        className="relative z-10 mt-9 inline-flex h-11 items-center gap-2 rounded-lg bg-mint px-6 text-sm font-medium text-[#04110c] shadow-[0_0_24px_-8px_rgba(101,246,213,0.5)] transition-all hover:bg-mint/85 hover:shadow-[0_0_36px_-8px_rgba(101,246,213,0.7)]"
      >
        Re-enter orbit
        <ArrowDown className="h-4 w-4 rotate-180" />
      </Link>
      <p className="mono-label relative z-10 mt-8 text-white/30">
        ECLIPSE-OS // NAVIGATION CORE
      </p>
    </div>
  );
}