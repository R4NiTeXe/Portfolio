"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Eclipse } from "@/components/eclipse";
import { HeroIntro } from "@/components/hero-intro";
import { Magnetic } from "@/components/magnetic";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

function HeroUplink() {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setT((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(t % 60).padStart(2, "0");

  return (
    <p className="mono-label mt-4 text-muted-foreground">
      T+{mm}:{ss} · UPLINK STABLE
    </p>
  );
}

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: 46,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      if (panelRef.current) {
        gsap.to(panelRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
      if (!reduced && glowRef.current) {
        const qx = gsap.quickTo(glowRef.current, "x", {
          duration: 0.6,
          ease: "power3.out",
        });
        const qy = gsap.quickTo(glowRef.current, "y", {
          duration: 0.6,
          ease: "power3.out",
        });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          qx(nx * 24);
          qy(ny * 16);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <Eclipse />

      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden will-change-transform md:block"
      >
        <div className="absolute top-[3%] left-[1%] h-[300px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.5),transparent_70%)] opacity-45 blur-2xl" />
        <div className="absolute top-[6%] left-[70%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.6),transparent_70%)] opacity-45 blur-2xl" />
        <div className="absolute top-[21%] left-[75.5%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(101,246,213,1),transparent_65%)] opacity-90 blur-xl" />
        <div className="absolute top-[35%] left-[85%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.85),transparent_70%)] opacity-70 blur-2xl" />
      </div>

      <div
        ref={orbitRef}
        className="pointer-events-none absolute top-[17%] right-[6%] z-10 hidden w-[330px] lg:block"
      >
        <p className="mono-label text-mint">{"// "}CURRENT ORBIT</p>
        <div className="mt-4 border-l-2 border-mint/30 pl-4">
          <p className="text-sm leading-relaxed text-white/90">
            MAGANAL rover mission — Team Project Intern, Agnirath Aerospace
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            Completed Aug 2026 — autonomous navigation · obstacle detection ·
            environmental sensing
          </p>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Diploma CSE — Brainware University, 2027
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-mint" />
          <span className="mono-label text-mint">@R4NiTeXe</span>
        </div>
        <HeroUplink />
      </div>

      <HeroIntro>
        <div
          ref={contentRef}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-24 md:px-12 lg:px-20"
        >
          <p data-hero-item className="mono-label flex items-center gap-2 text-mint">
            {"// "}
            {site.role} — Kolkata, IN
            <span className="blink-cursor inline-block h-3 w-px bg-mint" />
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[1.02] font-semibold tracking-tight text-white md:text-7xl xl:text-[5.5rem]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block will-change-transform">
                RANIT
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block will-change-transform">
                NASKAR
              </span>
            </span>
          </h1>
          <p
            data-hero-item
            className="text-glow-mint mt-5 max-w-md text-xl font-light text-mint md:text-2xl"
          >
            {site.tagline}
          </p>
          <p
            data-hero-item
            className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground"
          >
            Full-stack developer from Kolkata — React, Node.js and MongoDB on
            the front lines of real projects, including the MAGANAL rover
            mission at Agnirath Aerospace.
          </p>
          <p data-hero-item className="mono-label mt-4 text-mint">
            {"// "}React · Node.js · MongoDB · Docker
          </p>
          <div data-hero-item className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button
                asChild
                size="lg"
                data-cursor-label="EXPLORE"
                className="group relative h-11 overflow-hidden bg-mint px-6 font-medium text-[#04110c] shadow-[0_0_24px_-8px_rgba(101,246,213,0.5)] transition-all hover:bg-mint/85 hover:shadow-[0_0_36px_-8px_rgba(101,246,213,0.7)] active:scale-95"
              >
                <Link href="#work">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative inline-flex items-center">
                    View Work
                    <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                size="lg"
                variant="ghost"
                data-cursor-label="OPEN"
                className="h-11 border border-white/10 bg-white/[0.03] px-6 text-white transition-all hover:border-mint/40 hover:bg-white/[0.06] hover:text-mint active:scale-95"
              >
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </Magnetic>
          </div>
        </div>
      </HeroIntro>

      <aside
        ref={panelRef}
        className="glass absolute bottom-8 left-6 z-10 hidden w-60 rounded-xl px-5 py-4 sm:block md:left-12"
      >
        <p className="mono-label !text-[9px] text-white/40">
          SYS // STATUS
          <span className="blink-cursor ml-1 inline-block h-2 w-px bg-mint/70" />
        </p>
        <dl className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Status
            </dt>
            <dd className="flex items-center gap-1.5 text-[11px] text-mint">
              <span className="animate-pulse-dot h-1 w-1 rounded-full bg-mint" />
              Available
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Mode
            </dt>
            <dd className="mono-label !text-[9px] text-white/80">
              Full-Stack
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Mission
            </dt>
            <dd className="mono-label !text-[9px] text-violet">
              MAGANAL
            </dd>
          </div>
        </dl>
      </aside>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="mono-label text-muted-foreground">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="animate-scroll-line absolute inset-x-0 top-0 h-3 bg-mint" />
        </span>
        <ArrowDown className="h-3 w-3 animate-pulse text-muted-foreground/50" />
      </div>
    </section>
  );
}