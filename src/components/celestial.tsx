"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function Celestial() {
  const starsRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const planetsRef = useRef<HTMLDivElement>(null);
  const arcsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridLightRef = useRef<HTMLDivElement>(null);

  const stars = useMemo(() => {
    const rand = seeded(20260819);
    return Array.from({ length: 52 }, (_, i) => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      size: rand() > 0.72 ? 2 : 1,
      violet: rand() > 0.78,
      dim: rand() > 0.6,
      hidden: i % 3 === 0,
    }));
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = [
      { el: starsRef.current, factor: 14 },
      { el: auroraRef.current, factor: 8 },
      { el: planetsRef.current, factor: 30 },
      { el: arcsRef.current, factor: 42 },
    ].filter((l) => l.el);

    const setters = layers.map(({ el, factor }) => ({
      x: gsap.quickTo(el!, "x", { duration: 1.2, ease: "power2.out" }),
      y: gsap.quickTo(el!, "y", { duration: 1.2, ease: "power2.out" }),
      factor,
    }));

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setters.forEach(({ x, y, factor }) => {
        x(nx * factor);
        y(ny * factor * 0.7);
      });
    };

    const onLeave = () => {
      setters.forEach(({ x, y }) => {
        x(0);
        y(0);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    const ctx = gsap.context(() => {
      gsap.to(auroraRef.current, {
        opacity: 0.72,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });
      gsap.to(planetsRef.current, {
        y: 70,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "max",
          scrub: 2,
        },
      });
      gsap.to(starsRef.current, {
        opacity: 0.8,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "max",
          scrub: 2,
        },
      });
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    const light = gridLightRef.current;
    if (!grid || !light) return;

    const onMove = (e: PointerEvent) => {
      const r = grid.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 100;
      const ny = ((e.clientY - r.top) / r.height) * 100;
      light.style.background = `radial-gradient(340px circle at ${nx}% ${ny}%, rgba(101,246,213,0.05), transparent 70%)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-[#070A0F]"
    >
      {/* Layer 1 — distant stars */}
      <div
        ref={starsRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        {stars.map((star, i) => (
          <span
            key={i}
            className={`celestial-star ${star.dim ? "opacity-30" : "opacity-55"} ${
              star.hidden ? "hidden md:block" : ""
            }`}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              background: star.violet
                ? "rgba(185,174,255,0.9)"
                : "rgba(230,237,243,0.8)",
            }}
          />
        ))}
      </div>

      {/* Layer 2 — aurora atmosphere (violet, mint, deep blue) */}
      <div ref={auroraRef} className="absolute inset-0">
        <div className="aurora-violet float-slow absolute -top-[12%] left-[-8%] h-[60vh] w-[75vw] rounded-full opacity-60 blur-3xl [animation-duration:52s]" />
        <div className="aurora-violet float-slow absolute top-[30%] right-[-18%] h-[55vh] w-[45vw] rounded-full opacity-40 blur-3xl [animation-duration:70s] [animation-delay:-20s]" />
        <div className="aurora-mint float-slow absolute -bottom-[18%] right-[6%] h-[50vh] w-[42vw] rounded-full opacity-55 blur-3xl [animation-duration:58s] [animation-delay:-34s]" />
        <div className="absolute -bottom-[28%] left-[24%] h-[52vh] w-[60vw] rounded-full bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(58,160,255,0.05),transparent_75%)] blur-3xl" />
        <div className="aurora-mint float-slow absolute top-[2%] right-[30%] h-[30vh] w-[26vw] rounded-full opacity-25 blur-3xl [animation-duration:64s] [animation-delay:-12s]" />
      </div>

      {/* Layer 3 — distant celestial bodies */}
      <div
        ref={planetsRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        {/* Planet A — dark body, mint/violet rim light, orbiting moon */}
        <div className="absolute top-[16%] right-[9%] hidden lg:block">
          <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(139,124,255,0.12),transparent_70%)] blur-2xl" />
          <div className="planet-body float-slow relative h-24 w-24 [animation-duration:64s]" />
          {/* Moon in orbit */}
          <div className="orbit-rotate absolute -inset-10 [animation-duration:36s]">
            <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#b7abff,#6a5ae0_70%)] shadow-[0_0_8px_rgba(139,124,255,0.5)]" />
          </div>
        </div>

        {/* Planet B — distant dark body, deep violet rim, barely visible */}
        <div className="absolute bottom-[12%] left-[-3%] hidden md:block">
          <div className="planet-body float-slow h-44 w-44 opacity-40 [animation-duration:90s]" />
        </div>

        {/* Planet C — tiny far body with faint mint rim */}
        <div className="absolute top-[52%] left-[34%]">
          <div className="planet-body float-slow h-4 w-4 opacity-60 [animation-duration:74s]" />
        </div>

        {/* Tiny distant moon near the top */}
        <div className="absolute top-[6%] left-[22%] hidden md:block">
          <div className="float-slow h-1.5 w-1.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,#c8ffef,#65f6d5_60%,#1d8a75)] opacity-40 [animation-duration:80s]" />
        </div>
      </div>

      {/* Layer 4 — thin orbital paths with traveling particles */}
      <div
        ref={arcsRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        <div className="absolute top-[2%] right-[14%] hidden lg:block">
          <div
            className="orbit-rotate relative h-[300px] w-[300px] [animation-duration:130s]"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, black 30%, black 70%, transparent 100%)",
            }}
          >
            <div className="orbit-arc absolute inset-0 opacity-60" />
            <div className="absolute top-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-mint/80 shadow-[0_0_8px_rgba(101,246,213,0.8)]" />
          </div>
        </div>

        <div className="absolute top-[50%] left-[3%] hidden md:block">
          <div
            className="orbit-rotate relative h-[170px] w-[170px] [animation-duration:190s] [animation-direction:reverse]"
            style={{
              maskImage:
                "linear-gradient(180deg, transparent 0%, black 40%, black 60%, transparent 100%)",
            }}
          >
            <div className="orbit-arc absolute inset-0 opacity-35" />
            <div className="absolute top-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet/70 shadow-[0_0_8px_rgba(139,124,255,0.7)]" />
          </div>
        </div>

        <div className="absolute -right-[8%] -bottom-[18%] hidden lg:block">
          <div
            className="orbit-rotate relative h-[380px] w-[380px] [animation-duration:240s]"
            style={{
              maskImage:
                "linear-gradient(270deg, transparent 0%, black 35%, black 75%, transparent 100%)",
            }}
          >
            <div className="orbit-arc absolute inset-0 opacity-25" />
          </div>
        </div>
      </div>

      {/* Technical grid — faint, reacts to pointer */}
      <div ref={gridRef} className="absolute inset-0">
        <div className="grid-lines absolute inset-0 opacity-[0.45]" />
        <div ref={gridLightRef} className="absolute inset-0" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_35%,transparent_40%,rgba(4,6,10,0.55)_100%)]" />
    </div>
  );
}