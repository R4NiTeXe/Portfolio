"use client";

import { useEffect, useRef, useState } from "react";

const BEACONS_PER_WAVE = 5;

export function OrbitLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBest(Number(sessionStorage.getItem("eclipse-orbit-best") ?? 0));
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) setSupported(false);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.36;

    const state = {
      angle: 0,
      speed: 0.004 + Math.random() * 0.002,
      beacons: [] as { angle: number; hit: boolean }[],
      pulsing: 0,
      score: 0,
    };

    const spawnWave = () => {
      const used = new Set<number>();
      while (state.beacons.length < BEACONS_PER_WAVE) {
        const a = Math.floor(Math.random() * 360);
        if (!used.has(a)) {
          used.add(a);
          state.beacons.push({ angle: (a * Math.PI) / 180, hit: false });
        }
      }
    };
    spawnWave();

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      state.angle += state.speed * dt * (state.pulsing > 0 ? 3.2 : 1);
      state.pulsing = Math.max(0, state.pulsing - dt);

      const px = cx + Math.cos(state.angle) * R;
      const py = cy + Math.sin(state.angle) * R;

      ctx.clearRect(0, 0, W, H);

      // orbit path
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(230,237,243,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // central body
      const body = ctx.createRadialGradient(cx - R * 0.15, cy - R * 0.15, 0, cx, cy, R * 0.4);
      body.addColorStop(0, "#101828");
      body.addColorStop(0.55, "#0A0F1A");
      body.addColorStop(1, "#05070D");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.32, 0, Math.PI * 2);
      ctx.fill();

      // beacons
      for (const b of state.beacons) {
        const bx = cx + Math.cos(b.angle) * R;
        const by = cy + Math.sin(b.angle) * R;
        const dist = Math.hypot(bx - px, by - py);
        if (dist < 16 && !b.hit) {
          b.hit = true;
          state.score += 1;
          setScore(state.score);
          if (state.score > Number(sessionStorage.getItem("eclipse-orbit-best") ?? 0)) {
            sessionStorage.setItem("eclipse-orbit-best", String(state.score));
            setBest(state.score);
          }
          state.speed *= 1.06;
          if (state.beacons.every((x) => x.hit)) {
            state.beacons = [];
            spawnWave();
          }
        }
        ctx.strokeStyle = b.hit ? "rgba(101,246,213,0.15)" : "rgba(101,246,213,0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bx, by, b.hit ? 3 : 4, 0, Math.PI * 2);
        ctx.stroke();
        if (!b.hit) {
          ctx.fillStyle = "rgba(101,246,213,0.25)";
          ctx.beginPath();
          ctx.arc(bx, by, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // probe
      ctx.save();
      ctx.translate(px, py);
      if (state.pulsing > 0) {
        ctx.shadowColor = "rgba(101,246,213,0.9)";
        ctx.shadowBlur = 18;
      }
      ctx.fillStyle = "#65F6D5";
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      state.pulsing = 0.35;
    };

    canvas.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, [playing]);

  if (!supported) {
    return (
      <section id="lab" aria-label="Orbit lab" className="relative scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
          <p className="mono-label text-mint">06 // Micro</p>
          <h2 className="font-display mt-6 text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
            ORBIT
            <br />
            <span className="text-glow-mint text-mint">LAB.</span>
          </h2>
          <p className="mono-label mt-6 text-muted-foreground">
            ANIMATIONS PAUSED — REDUCED MOTION ENABLED
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="lab" aria-label="Orbit lab" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">06 // Micro</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div data-reveal-item>
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
              ORBIT
              <br />
              <span className="text-glow-mint text-mint">LAB.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              A tiny probe simulator. The probe circles the core — click or tap
              to pulse its thrust and sweep up beacons before they drift. Every
              capture accelerates the orbit.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <div>
                <p className="font-display text-3xl font-semibold text-mint">
                  {score}
                </p>
                <p className="mono-label mt-1 text-muted-foreground">
                  BEACONS
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-white/60">
                  {best}
                </p>
                <p className="mono-label mt-1 text-muted-foreground">BEST</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setScore(0);
                setPlaying((p) => !p);
              }}
              className="mono-label mt-8 rounded-lg border border-mint/30 bg-mint/10 px-5 py-2.5 text-mint transition-colors hover:bg-mint/20"
            >
              {playing ? "RESTART" : "START"}
            </button>
            <p className="mono-label mt-6 !text-[9px] text-muted-foreground/50">
              {playing ? "CLICK / TAP — PULSE THRUST" : "SIMULATION PAUSED"}
            </p>
          </div>
          <div data-reveal-item>
            <canvas
              ref={canvasRef}
              className="eclipse-card h-[340px] w-full cursor-pointer touch-none rounded-2xl"
              aria-label="Orbit lab game canvas"
            />
          </div>
        </div>
      </div>
    </section>
  );
}