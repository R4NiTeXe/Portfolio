"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const WAVE_SIZE = 5;
const COMBO_WINDOW = 6;
const LEVEL_BEACONS = 6;

type GameMode = "idle" | "running" | "paused";

const IDLE_MESSAGE = "ORBIT STABLE — AWAITING COMMAND";

export function OrbitLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<GameMode>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState(IDLE_MESSAGE);
  const [supported, setSupported] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const modeRef = useRef<GameMode>("idle");
  const thrustRef = useRef(false);
  const brakeRef = useRef(false);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const comboRef = useRef(0);
  const comboTimerRef = useRef(0);
  const levelRef = useRef(1);
  const capturesRef = useRef(0);
  const invulnRef = useRef(0);
  const messageTimerRef = useRef<number | null>(null);
  const startLoopRef = useRef<(() => void) | null>(null);

  const say = useCallback((text: string) => {
    setMessage(text);
    if (messageTimerRef.current) window.clearTimeout(messageTimerRef.current);
    messageTimerRef.current = window.setTimeout(() => setMessage(IDLE_MESSAGE), 3200);
  }, []);

  const startGame = useCallback(() => {
    if (!supported) return;
    modeRef.current = "running";
    setMode("running");
    startLoopRef.current?.();
    say("ORBIT STABLE — COLLECT BEACONS");
  }, [supported, say]);

  const pauseGame = useCallback(() => {
    if (modeRef.current !== "running") return;
    modeRef.current = "paused";
    setMode("paused");
    say("SIMULATION PAUSED");
  }, [say]);

  const resumeGame = useCallback(() => {
    if (modeRef.current !== "paused") return;
    modeRef.current = "running";
    setMode("running");
    startLoopRef.current?.();
    say("ORBIT RESUMED");
  }, [say]);

  const resetGame = useCallback(() => {
    modeRef.current = "running";
    setMode("running");
    scoreRef.current = 0;
    comboRef.current = 0;
    comboTimerRef.current = 0;
    capturesRef.current = 0;
    levelRef.current = 1;
    setScore(0);
    setCombo(0);
    setLevel(1);
    say("MISSION RESTARTED — ORBIT INITIALIZED");
  }, [say]);

  useEffect(() => {
    return () => {
      if (messageTimerRef.current) window.clearTimeout(messageTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = Number(sessionStorage.getItem("eclipse-orbit-best") ?? 0);
    bestRef.current = stored;
    setBest(stored);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setSupported(false);
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

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
      speed: 0.5,
      pulse: 0,
      trail: [] as { x: number; y: number; life: number }[],
      beacons: [] as { angle: number; hit: boolean; fade: number }[],
      obstacles: [] as { angle: number; dir: 1 | -1; size: number; fade: number }[],
    };

    const spawnWave = () => {
      const used = new Set<number>();
      const next: typeof state.beacons = [];
      while (next.length < WAVE_SIZE) {
        const a = Math.floor(Math.random() * 360);
        if (!used.has(a)) {
          used.add(a);
          next.push({ angle: (a * Math.PI) / 180, hit: false, fade: 0 });
        }
      }
      state.beacons = next;
    };

    const spawnObstacle = () => {
      const a = Math.floor(Math.random() * 360);
      state.obstacles.push({
        angle: (a * Math.PI) / 180,
        dir: Math.random() > 0.5 ? 1 : -1,
        size: 3 + Math.random() * 2.5,
        fade: 0,
      });
      if (state.obstacles.length > 8) state.obstacles.shift();
    };

    spawnWave();

    const recordCapture = () => {
      scoreRef.current += 1 * comboRef.current;
      setScore(scoreRef.current);
      comboRef.current += 1;
      setCombo(comboRef.current);
      comboTimerRef.current = COMBO_WINDOW;
      capturesRef.current += 1;
      if (scoreRef.current > bestRef.current) {
        bestRef.current = scoreRef.current;
        sessionStorage.setItem("eclipse-orbit-best", String(bestRef.current));
        setBest(bestRef.current);
      }
      const nextLevel = 1 + Math.floor(capturesRef.current / LEVEL_BEACONS);
      if (nextLevel > levelRef.current) {
        levelRef.current = Math.min(nextLevel, 5);
        setLevel(levelRef.current);
        spawnObstacle();
        say(`LEVEL ${levelRef.current} — ORBIT HARDENING`);
      } else {
        say(`BEACON CAPTURED — COMBO ×${comboRef.current}`);
      }
      if (state.beacons.every((b) => b.hit)) {
        state.beacons = [];
        spawnWave();
        say("WAVE CLEARED — NEW BEACON FIELD");
      }
    };

    let raf = 0;
    let loopAlive = false;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const currentMode = modeRef.current;

      if (currentMode === "running") {
        const target =
          0.5 +
          levelRef.current * 0.35 +
          (thrustRef.current ? 2.2 : 0) -
          (brakeRef.current ? 1.1 : 0);
        state.speed += (target - state.speed) * Math.min(dt * 3, 1);
        state.angle += state.speed * dt;
        state.pulse = Math.max(0, state.pulse - dt);
        invulnRef.current = Math.max(0, invulnRef.current - dt);

        if (comboTimerRef.current > 0) {
          comboTimerRef.current -= dt;
          if (comboTimerRef.current <= 0 && comboRef.current > 0) {
            comboRef.current = 0;
            setCombo(0);
            say("COMBO LOST — ORBIT DECAY");
          }
        }

        for (const o of state.obstacles) o.angle += o.dir * 0.14 * dt;
        if (levelRef.current >= 2 && Math.random() < dt * levelRef.current * 0.16) {
          spawnObstacle();
        }
      }

      const px = cx + Math.cos(state.angle) * R;
      const py = cy + Math.sin(state.angle) * R;

      if (currentMode === "running") {
        state.trail.push({ x: px, y: py, life: thrustRef.current ? 0.4 : 0.18 });
        state.trail = state.trail
          .map((t) => ({ ...t, life: t.life - dt }))
          .filter((t) => t.life > 0);

        if (invulnRef.current <= 0) {
          for (const b of state.beacons) {
            if (b.hit) continue;
            const bx = cx + Math.cos(b.angle) * R;
            const by = cy + Math.sin(b.angle) * R;
            if (Math.hypot(bx - px, by - py) < 15) {
              b.hit = true;
              b.fade = 0.35;
              recordCapture();
            }
          }
          for (const o of state.obstacles) {
            const ox = cx + Math.cos(o.angle) * R;
            const oy = cy + Math.sin(o.angle) * R;
            if (Math.hypot(ox - px, oy - py) < 12) {
              o.fade = 0.35;
              invulnRef.current = 1.2;
              comboRef.current = 0;
              setCombo(0);
              state.speed = Math.max(0.4, state.speed * 0.5);
              say("COLLISION — ORBIT DECAY");
            }
          }
        }
      }

      for (const b of state.beacons) if (b.fade > 0) b.fade -= dt;
      for (const o of state.obstacles) if (o.fade > 0) o.fade -= dt;
      state.beacons = state.beacons.filter((b) => b.fade > 0 || !b.hit);
      state.obstacles = state.obstacles.filter((o) => o.fade > 0 || true);

      ctx.clearRect(0, 0, W, H);

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(230,237,243,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.68, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139,124,255,0.07)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const body = ctx.createRadialGradient(cx - R * 0.15, cy - R * 0.15, 0, cx, cy, R * 0.4);
      body.addColorStop(0, "#101828");
      body.addColorStop(0.55, "#0A0F1A");
      body.addColorStop(1, "#05070D");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.32, 0, Math.PI * 2);
      ctx.fill();

      for (const b of state.beacons) {
        const bx = cx + Math.cos(b.angle) * R;
        const by = cy + Math.sin(b.angle) * R;
        if (b.hit && b.fade > 0) {
          const a = Math.max(0, b.fade / 0.35);
          ctx.strokeStyle = `rgba(101,246,213,${0.9 * a})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(bx, by, (1 - a) * 14 + 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = `rgba(101,246,213,${0.6 * a})`;
          ctx.beginPath();
          ctx.arc(bx, by, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        if (!b.hit) {
          ctx.strokeStyle = "rgba(101,246,213,0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(bx, by, 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = "rgba(101,246,213,0.25)";
          ctx.beginPath();
          ctx.arc(bx, by, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const o of state.obstacles) {
        if (o.fade > 0.2) continue;
        const ox = cx + Math.cos(o.angle) * R;
        const oy = cy + Math.sin(o.angle) * R;
        const a = o.fade > 0 ? Math.max(0, o.fade / 0.35) : 1;
        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = `rgba(255,184,107,${0.75 * a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const s = o.size;
        ctx.moveTo(-s, 0);
        ctx.lineTo(0, -s);
        ctx.lineTo(s, 0);
        ctx.lineTo(0, s);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      if (state.trail.length > 1) {
        for (const t of state.trail) {
          const a = Math.max(0, t.life / 0.4);
          ctx.fillStyle = `rgba(101,246,213,${0.35 * a})`;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2.2 * a + 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.save();
      ctx.translate(px, py);
      if (state.pulse > 0) {
        ctx.strokeStyle = `rgba(101,246,213,${state.pulse})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (invulnRef.current > 0 && Math.floor(performance.now() / 90) % 2 === 0) {
        ctx.globalAlpha = 0.4;
      }
      ctx.shadowColor = "rgba(101,246,213,0.9)";
      ctx.shadowBlur = state.pulse > 0 ? 18 : 8;
      ctx.fillStyle = "#65F6D5";
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (loopAlive) raf = requestAnimationFrame(step);
    };

    const startLoop = () => {
      if (loopAlive) return;
      loopAlive = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stopLoop = () => {
      loopAlive = false;
      cancelAnimationFrame(raf);
    };
    startLoopRef.current = startLoop;

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      thrustRef.current = true;
    };
    const onUp = () => {
      thrustRef.current = false;
    };

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const onVisibility = () => {
      if (document.hidden) {
        if (modeRef.current === "running") pauseGame();
        stopLoop();
      } else if (supported) {
        startLoop();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (!visible) {
          if (modeRef.current === "running") pauseGame();
          stopLoop();
        } else {
          startLoop();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      if (modeRef.current === "idle") return;
      const key = e.key;
      if (key === " " || key === "ArrowUp" || key === "w" || key === "W") {
        e.preventDefault();
        thrustRef.current = true;
        if (modeRef.current === "running") say("THRUST DETECTED");
      } else if (key === "ArrowDown" || key === "s" || key === "S") {
        e.preventDefault();
        brakeRef.current = true;
      } else if (key === "p" || key === "P") {
        e.preventDefault();
        if (modeRef.current === "running") pauseGame();
        else if (modeRef.current === "paused") resumeGame();
      } else if (key === "r" || key === "R") {
        e.preventDefault();
        resetGame();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === " " || key === "ArrowUp" || key === "w" || key === "W") {
        thrustRef.current = false;
      } else if (key === "ArrowDown" || key === "s" || key === "S") {
        brakeRef.current = false;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const onStart = () => {
      if (!supported) return;
      startGame();
      document.getElementById("lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("eclipse:lab-start", onStart);

    startLoop();

    return () => {
      startLoopRef.current = null;
      stopLoop();
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("eclipse:lab-start", onStart);
    };
  }, [say, startGame, pauseGame, resumeGame, resetGame, supported]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setSupported(false);
  }, []);

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
              A tiny probe simulator. Thrust to steer the orbit, sweep up
              beacons before they drift, and dodge the hazard diamonds.
              Captures build combo multipliers — collisions decay the orbit.
            </p>

            <div className="mt-6 grid grid-cols-4 gap-4">
              <div>
                <p className="font-display text-2xl font-semibold text-mint md:text-3xl">
                  {score}
                </p>
                <p className="mono-label mt-1 !text-[9px] text-muted-foreground">
                  SCORE
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-white/60 md:text-3xl">
                  {best}
                </p>
                <p className="mono-label mt-1 !text-[9px] text-muted-foreground">
                  BEST
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-violet md:text-3xl">
                  {combo > 1 ? `×${combo}` : "—"}
                </p>
                <p className="mono-label mt-1 !text-[9px] text-muted-foreground">
                  COMBO
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-amber md:text-3xl">
                  {level}
                </p>
                <p className="mono-label mt-1 !text-[9px] text-muted-foreground">
                  LEVEL
                </p>
              </div>
            </div>

            <p
              aria-live="polite"
              className="mono-label mt-5 min-h-4 !text-[9px] text-mint"
            >
              {"// "}
              {message}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (mode === "idle") startGame();
                  else if (mode === "running") pauseGame();
                  else resumeGame();
                }}
                data-cursor-label={mode === "idle" ? "START" : mode === "running" ? "PAUSE" : "RUN"}
                className="mono-label min-h-11 rounded-lg border border-mint/30 bg-mint/10 px-5 py-2.5 text-mint transition-colors hover:bg-mint/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A0F]"
              >
                {mode === "idle" ? "START" : mode === "running" ? "PAUSE" : "RESUME"}
              </button>
              <button
                type="button"
                onClick={resetGame}
                data-cursor-label="RESET"
                className="mono-label min-h-11 rounded-lg border border-white/15 px-5 py-2.5 text-muted-foreground transition-colors hover:border-mint/40 hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A0F]"
              >
                RESTART
              </button>
              <button
                type="button"
                onClick={() => setShowHelp((s) => !s)}
                aria-expanded={showHelp}
                className="mono-label min-h-11 rounded-lg border border-white/15 px-5 py-2.5 text-muted-foreground transition-colors hover:border-mint/40 hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070A0F]"
              >
                {showHelp ? "HIDE GUIDE" : "HOW TO FLY"}
              </button>
            </div>

            {showHelp && (
              <div className="eclipse-card mt-5 max-w-md rounded-xl p-4">
                <p className="mono-label !text-[9px] text-mint">
                  ORBITAL PROTOCOL
                </p>
                <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
                  <li>
                    <span className="text-white/80">CONTROL</span> — SPACE / W /
                    ↑ (hold) = thrust · S / ↓ = brake · tap canvas on touch
                  </li>
                  <li>
                    <span className="text-white/80">COLLECT</span> — pass
                    through mint beacon rings
                  </li>
                  <li>
                    <span className="text-white/80">AVOID</span> — amber hazard
                    diamonds — collision decays the orbit
                  </li>
                  <li>
                    <span className="text-white/80">SCORE</span> — fast
                    consecutive captures stack a combo multiplier (×2, ×3…)
                  </li>
                  <li>
                    <span className="text-white/80">PAUSE</span> — P key ·
                    auto-pauses off-screen
                  </li>
                </ul>
              </div>
            )}

            <p className="mono-label mt-5 !text-[9px] text-muted-foreground/50">
              {mode === "idle"
                ? "START TO ENGAGE — BEST SCORE IS SAVED LOCALLY"
                : mode === "running"
                  ? "SPACE / W / ↑ — THRUST · P — PAUSE · R — RESTART"
                  : "SIMULATION PAUSED"}
            </p>
          </div>
          <div data-reveal-item>
            <canvas
              ref={canvasRef}
              className="eclipse-card h-[340px] w-full cursor-pointer touch-none rounded-2xl md:h-[420px]"
              aria-label="Orbit lab game canvas"
              aria-describedby="lab-guide"
            />
            <p id="lab-guide" className="sr-only">
              Thrust the probe around the orbit to collect mint beacon rings.
              Avoid amber hazard diamonds. Combo multipliers build with fast
              consecutive captures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}