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

function Obj({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div data-celestial-obj aria-hidden="true" className={className} style={style}>
      {children}
    </div>
  );
}

function Planet({
  variant,
  size,
  className = "",
}: {
  variant: "mint" | "violet" | "dark" | "atmo" | "amber";
  size: string;
  className?: string;
}) {
  const glow = {
    mint: "bg-[radial-gradient(circle,rgba(101,246,213,0.12),transparent_70%)]",
    violet: "bg-[radial-gradient(circle,rgba(139,124,255,0.12),transparent_70%)]",
    dark: "bg-[radial-gradient(circle,rgba(139,124,255,0.07),transparent_70%)]",
    atmo: "bg-transparent",
    amber: "bg-[radial-gradient(circle,rgba(255,184,107,0.1),transparent_70%)]",
  }[variant];

  return (
    <div
      data-celestial-obj
      aria-hidden="true"
      className={className}
    >
      <div aria-hidden="true" className={`absolute -inset-6 rounded-full blur-xl ${glow}`} />
      <div className={`planet-${variant} float-slow ${size}`} style={{ willChange: "transform" }} />
    </div>
  );
}

function Arc({
  width,
  height,
  duration,
  opacity,
  squash = 0.55,
  fade = "arc-fade-a",
  beacon = false,
  beaconColor = "bg-mint/80 shadow-[0_0_8px_rgba(101,246,213,0.7)]",
  className = "",
}: {
  width: string;
  height: string;
  duration: number;
  opacity: number;
  squash?: number;
  fade?: "arc-fade-a" | "arc-fade-b" | "arc-fade-c";
  beacon?: boolean;
  beaconColor?: string;
  className?: string;
}) {
  return (
    <Obj className={`absolute ${width} ${height} ${className}`}>
      <div className={`orbit-rotate absolute inset-0 [animation-duration:${duration}s]`}>
        <div
          className="orbit-squash absolute inset-0"
          data-squash={squash}
          style={{ "--squash": squash } as React.CSSProperties}
        >
          <div className={`orbit-ellipse absolute inset-0 ${fade}`} style={{ opacity }} />
          {beacon && (
            <span
              aria-hidden="true"
              className={`arc-beacon absolute rounded-full ${beaconColor}`}
            />
          )}
        </div>
      </div>
    </Obj>
  );
}

export function Celestial() {
  const rootRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const distantRef = useRef<HTMLDivElement>(null);
  const arcsRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  const stars = useMemo(() => {
    const rand = seeded(20260819);
    const tier1 = Array.from({ length: 42 }, () => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      tier: 1,
      mobile: rand() > 0.42,
      dur: 0,
    }));
    const tier2 = Array.from({ length: 22 }, () => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      tier: 2,
      mobile: rand() > 0.55,
      dur: 60 + rand() * 60,
      twinkle: rand() > 0.55,
    }));
    const tier3 = Array.from({ length: 6 }, () => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      tier: 3,
      mobile: rand() > 0.5,
      violet: rand() > 0.5,
    }));
    const signals = [
      { left: `${14 + rand() * 8}%`, top: `${8 + rand() * 6}%` },
      { left: `${78 + rand() * 10}%`, top: `${30 + rand() * 10}%` },
    ];
    return { tier1, tier2, tier3, signals };
  }, []);

  const dust = useMemo(() => {
    const rand = seeded(40091);
    const dots = Array.from({ length: 16 }, () => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      mobile: rand() > 0.5,
      dur: 70 + rand() * 80,
    }));
    const specks = Array.from({ length: 4 }, () => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      dur: 90 + rand() * 60,
    }));
    return { dots, specks };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onVis = () => {
      const hidden = document.hidden;
      root.classList.toggle("celestial-paused", hidden);
      gsap.globalTimeline.timeScale(hidden ? 0 : 1);
    };
    document.addEventListener("visibilitychange", onVis);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.querySelectorAll<HTMLElement>("[data-group]").forEach((g) => {
        g.style.opacity = "1";
      });
      return () => document.removeEventListener("visibilitychange", onVis);
    }

    const layers = [
      { el: starsRef.current, factor: 8 },
      { el: dustRef.current, factor: 14 },
      { el: distantRef.current, factor: 16 },
      { el: arcsRef.current, factor: 24 },
      { el: nearRef.current, factor: 36 },
    ].filter((l) => l.el);

    const setters = layers.map(({ el, factor }) => ({
      x: gsap.quickTo(el!, "x", { duration: 1.1, ease: "power2.out" }),
      y: gsap.quickTo(el!, "y", { duration: 1.1, ease: "power2.out" }),
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
      const drift = (el: HTMLElement | null, y: number) => {
        if (!el) return;
        gsap.to(el, {
          y,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "max",
            scrub: 1.5,
          },
        });
      };

      drift(starsRef.current, 18);
      drift(dustRef.current, 26);
      drift(distantRef.current, 36);
      drift(arcsRef.current, 55);
      drift(nearRef.current, 85);

      const sections = [
        "hero",
        "about",
        "skills",
        "work",
        "journey",
        "contact",
      ] as const;
      sections.forEach((id) => {
        const group = root.querySelector<HTMLElement>(`[data-group="${id}"]`);
        const section = document.getElementById(id);
        if (!group || !section) return;
        const apply = (self: { progress: number }) => {
          const p = self.progress;
          const t = Math.min(1, Math.min(p / 0.45, (1 - p) / 0.45));
          group.style.opacity = String(Math.max(0, t));
        };
        const st = ScrollTrigger.create({
          trigger: section,
          start: () => section.offsetTop - window.innerHeight,
          end: () => section.offsetTop + section.offsetHeight,
          scrub: 0.7,
          onUpdate: apply,
        });
        apply(st);
      });
    }, root);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      gsap.globalTimeline.timeScale(1);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#070A0F]"
    >
      {/* L1 — distant star field (3 depths + rare signal stars) */}
      <div
        ref={starsRef}
        className="absolute inset-0 will-change-transform"
      >
        {stars.tier1.map((s, i) => (
          <span
            key={`t1-${i}`}
            className={`star-s1 ${s.mobile ? "" : "hidden md:block"}`}
            style={{ left: s.left, top: s.top, opacity: 0.22 + (i % 5) * 0.05 }}
          />
        ))}
        {stars.tier2.map((s, i) => (
          <span
            key={`t2-${i}`}
            className={`star-s2 float-slow ${s.mobile ? "" : "hidden md:block"} ${s.twinkle ? "star-twinkle" : ""}`}
            style={{
              left: s.left,
              top: s.top,
              opacity: 0.3,
              animationDuration: `${s.dur}s`,
              "--tw-lo": "0.2",
              "--tw-hi": "0.8",
              "--tw-dur": `${5 + (i % 5)}s`,
            } as React.CSSProperties}
          />
        ))}
        {stars.tier3.map((s, i) => (
          <span
            key={`t3-${i}`}
            className={`star-s3 star-twinkle ${s.mobile ? "" : "hidden md:block"}`}
            style={{
              left: s.left,
              top: s.top,
              background: s.violet
                ? "rgba(185,174,255,0.9)"
                : "rgba(101,246,213,0.85)",
              boxShadow: s.violet
                ? "0 0 6px rgba(139,124,255,0.5)"
                : "0 0 6px rgba(101,246,213,0.5)",
              "--tw-lo": "0.35",
              "--tw-hi": "1",
              "--tw-dur": `${6 + (i % 4)}s`,
            } as React.CSSProperties}
          />
        ))}
        {stars.signals.map((s, i) => (
          <span
            key={`sig-${i}`}
            className="star-signal star-twinkle hidden md:block"
            style={{
              left: s.left,
              top: s.top,
              "--tw-lo": "0.35",
              "--tw-hi": "1",
              "--tw-dur": "5s",
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* L2 — micro dust + rare foreground specks */}
      <div
        ref={dustRef}
        className="absolute inset-0 will-change-transform"
      >
        {dust.dots.map((d, i) => (
          <span
            key={`d-${i}`}
            className={`celestial-dust float-slow ${d.mobile ? "" : "hidden md:block"}`}
            style={{
              left: d.left,
              top: d.top,
              opacity: 0.25 + (i % 4) * 0.08,
              animationDuration: `${d.dur}s`,
            }}
          />
        ))}
        {dust.specks.map((d, i) => (
          <span
            key={`sp-${i}`}
            className="celestial-spec float-slow hidden md:block"
            style={{ left: d.left, top: d.top, animationDuration: `${d.dur}s` }}
          />
        ))}
      </div>

      {/* Static gravitational wash — ties the universe to the eclipse axis */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(139,124,255,0.05),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_105%,rgba(101,246,213,0.035),transparent_60%)]" />

      {/* L5 — near celestial objects (stronger parallax) */}
      <div
        ref={nearRef}
        className="absolute inset-0 will-change-transform"
      >
        {/* HERO */}
        <div data-group="hero" className="absolute inset-0" style={{ opacity: 0 }}>
          <div className="aurora-violet float-slow absolute -top-[10%] left-[-12%] h-[52vh] w-[62vw] rounded-full opacity-50 blur-2xl [animation-duration:64s] max-md:opacity-25" />
          <div className="aurora-mint float-slow absolute top-[38%] right-[-14%] hidden h-[44vh] w-[40vw] rounded-full opacity-35 blur-2xl [animation-duration:80s] [animation-delay:-24s] md:block" />
          <Planet
            variant="dark"
            size="h-16 w-16"
            className="absolute right-[3%] top-[58%] hidden opacity-70 lg:block"
          />
          <Planet
            variant="atmo"
            size="h-18 w-18"
            className="absolute right-[6%] top-[64%] hidden opacity-40 blur-[1px] md:block"
          />
          <Planet
            variant="amber"
            size="h-3.5 w-3.5"
            className="absolute top-[8%] left-[13%] hidden opacity-50 lg:block"
          />
          <Arc
            width="w-[300px]"
            height="h-[170px]"
            duration={150}
            opacity={0.35}
            fade="arc-fade-a"
            beacon
            className="absolute top-[46%] right-[-4%] hidden opacity-80 lg:block"
          />
        </div>

        {/* ABOUT */}
        <div data-group="about" className="absolute inset-0" style={{ opacity: 0 }}>
          <div className="aurora-violet float-slow absolute top-[30%] right-[-16%] hidden h-[46vh] w-[42vw] rounded-full opacity-30 blur-2xl [animation-duration:70s] [animation-delay:-16s] md:block" />
          <Planet
            variant="mint"
            size="h-14 w-14"
            className="absolute top-[70%] left-[1%] hidden opacity-60 lg:block"
          />
          <Planet
            variant="atmo"
            size="h-16 w-16"
            className="absolute top-[9%] right-[2%] hidden opacity-35 md:block"
          />
          <Arc
            width="w-[200px]"
            height="h-[120px]"
            duration={200}
            opacity={0.3}
            fade="arc-fade-b"
            beacon
            beaconColor="bg-violet/70 shadow-[0_0_8px_rgba(139,124,255,0.6)]"
            className="absolute top-[74%] left-[-12%] hidden lg:block"
          />
        </div>

        {/* SKILLS — technical environment, no network */}
        <div data-group="skills" className="absolute inset-0" style={{ opacity: 0 }}>
          <div
            className="grid-lines absolute inset-0 opacity-25"
            style={{
              maskImage:
                "linear-gradient(180deg, transparent 0%, black 12%, black 75%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent 0%, black 12%, black 75%, transparent 100%)",
            }}
          />
          <div className="aurora-violet float-slow absolute top-[40%] right-[-10%] hidden h-[38vh] w-[34vw] rounded-full opacity-20 blur-2xl [animation-duration:72s] md:block" />
          <Arc
            width="w-[200px]"
            height="h-[110px]"
            duration={170}
            opacity={0.3}
            fade="arc-fade-b"
            beacon
            beaconColor="bg-mint/70 shadow-[0_0_8px_rgba(101,246,213,0.6)]"
            className="absolute top-[6%] right-[-6%] hidden lg:block"
          />
          <Arc
            width="w-[200px]"
            height="h-[120px]"
            duration={210}
            opacity={0.22}
            squash={0.6}
            fade="arc-fade-c"
            className="absolute top-[6%] right-[2%] hidden lg:block"
          />
          {[
            { x: "6%", y: "38%", c: "rgba(230,237,243,0.5)", s: "2px" },
            { x: "12%", y: "46%", c: "rgba(101,246,213,0.6)", s: "3px" },
            { x: "93%", y: "30%", c: "rgba(139,124,255,0.55)", s: "3px" },
            { x: "97%", y: "42%", c: "rgba(230,237,243,0.4)", s: "2px" },
            { x: "50%", y: "12%", c: "rgba(101,246,213,0.45)", s: "2px" },
          ].map((p, i) => (
            <span
              key={`cp-${i}`}
              aria-hidden="true"
              className="star-twinkle hidden md:block"
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                width: p.s,
                height: p.s,
                borderRadius: "9999px",
                background: p.c,
                boxShadow: `0 0 6px ${p.c}`,
                "--tw-lo": "0.3",
                "--tw-hi": "0.95",
                "--tw-dur": `${5 + i * 1.3}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* WORK */}
        <div data-group="work" className="absolute inset-0" style={{ opacity: 0 }}>
          <div className="aurora-mint float-slow absolute top-[12%] right-[-12%] hidden h-[40vh] w-[36vw] rounded-full opacity-25 blur-2xl [animation-duration:76s] [animation-delay:-30s] md:block" />
          <Planet
            variant="violet"
            size="h-20 w-20"
            className="absolute top-[8%] right-[4%] hidden opacity-55 lg:block"
          />
          <Planet
            variant="atmo"
            size="h-14 w-14"
            className="absolute left-[5%] top-[9%] hidden opacity-30 lg:block"
          />
          <Arc
            width="w-[240px]"
            height="h-[150px]"
            duration={190}
            opacity={0.25}
            fade="arc-fade-a"
            className="absolute top-[6%] left-[-10%] hidden xl:block"
          />
        </div>

        {/* JOURNEY */}
        <div data-group="journey" className="absolute inset-0" style={{ opacity: 0 }}>
          <div className="aurora-violet float-slow absolute top-[40%] left-[-14%] hidden h-[42vh] w-[38vw] rounded-full opacity-[0.15] blur-2xl [animation-duration:84s] md:block" />
          <Arc
            width="w-[260px]"
            height="h-[160px]"
            duration={220}
            opacity={0.2}
            fade="arc-fade-c"
            className="absolute bottom-[12%] left-[-14%] hidden lg:block"
          />
          <Planet
            variant="dark"
            size="h-8 w-8"
            className="absolute right-[6%] top-[8%] hidden opacity-40 lg:block"
          />
        </div>

        {/* CONTACT — minimal */}
        <div data-group="contact" className="absolute inset-0" style={{ opacity: 0 }}>
          <div className="aurora-mint float-slow absolute top-[18%] right-[-10%] hidden h-[34vh] w-[30vw] rounded-full opacity-[0.12] blur-2xl [animation-duration:88s] md:block" />
          <Planet
            variant="atmo"
            size="h-20 w-20"
            className="absolute top-[6%] right-[2%] hidden opacity-25 md:block"
          />
          <Arc
            width="w-[160px]"
            height="h-[80px]"
            duration={240}
            opacity={0.18}
            fade="arc-fade-a"
            className="absolute bottom-[4%] left-[-6%] hidden lg:block"
          />
        </div>
      </div>

      {/* L4 — distant orbital paths (slower parallax) */}
      <div
        ref={arcsRef}
        className="absolute inset-0 will-change-transform"
      >
        <Arc
          width="w-[220px]"
          height="h-[100px]"
          duration={260}
          opacity={0.16}
          squash={0.5}
          fade="arc-fade-b"
          className="absolute top-[0%] right-[2%] hidden lg:block"
        />
        <Arc
          width="w-[230px]"
          height="h-[140px]"
          duration={300}
          opacity={0.13}
          squash={0.52}
          fade="arc-fade-c"
          className="absolute top-[0%] left-[-10%] hidden lg:block"
        />
      </div>

      {/* L3 — distant celestial bodies (barely visible) */}
      <div
        ref={distantRef}
        className="absolute inset-0 will-change-transform"
      >
        <Planet
          variant="atmo"
          size="h-28 w-28"
          className="absolute top-[2%] left-[38%] hidden opacity-25 blur-[1px] lg:block"
        />
        <Planet
          variant="dark"
          size="h-40 w-40"
          className="absolute bottom-[8%] right-[-16%] hidden opacity-30 blur-[1px] md:block"
        />
        <Planet
          variant="atmo"
          size="h-10 w-10"
          className="absolute top-[2%] left-[2%] opacity-35 md:hidden"
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_35%,transparent_40%,rgba(4,6,10,0.55)_100%)]" />
    </div>
  );
}