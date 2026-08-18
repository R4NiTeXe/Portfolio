import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eclipse } from "@/components/eclipse";
import { HeroIntro } from "@/components/hero-intro";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <Eclipse />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[23%] left-[75.5%] z-0 hidden h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(101,246,213,0.8),transparent_65%)] opacity-90 blur-xl md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[35%] left-[85%] z-0 hidden h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.85),transparent_70%)] opacity-70 blur-2xl md:block"
      />

      <HeroIntro>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-24 md:px-12 lg:px-20">
          <p data-hero-item className="mono-label text-mint">
            {"// "}
            {site.role} — Kolkata, IN
          </p>
          <h1 data-hero-item className="font-display mt-5 text-5xl leading-[1.02] font-semibold tracking-tight text-white md:text-7xl xl:text-[5.5rem]">
            RANIT
            <br />
            NASKAR
          </h1>
          <p data-hero-item className="text-glow-mint mt-6 max-w-md text-lg font-light text-mint md:text-xl">
            {site.tagline}
          </p>
          <p data-hero-item className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Software Developer from Kolkata, India — building full-stack products
            with React, Node.js and MongoDB. Currently crafting with the team at
            Agnirath Aerospace.
          </p>
          <div data-hero-item className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-11 bg-mint px-6 font-medium text-[#04110c] hover:bg-mint/85"
            >
              <Link href="#work">View Work</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-11 border border-white/10 bg-white/[0.03] px-6 text-white hover:bg-white/[0.07]"
            >
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </HeroIntro>

      <aside className="glass absolute bottom-8 left-6 z-10 hidden rounded-xl px-5 py-4 sm:block md:left-12">
        <div className="flex items-center gap-2.5">
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
          <span className="mono-label text-mint">{site.availability}</span>
        </div>
        <p className="mt-2.5 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          {site.location}
        </p>
        <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          {site.education}
        </p>
      </aside>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="mono-label text-muted-foreground">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="animate-scroll-line absolute inset-x-0 top-0 h-3 bg-mint" />
        </span>
      </div>
    </section>
  );
}