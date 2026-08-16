"use client";

import { useMemo } from "react";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function CosmicBackground() {
  const stars = useMemo(() => {
    const rand = mulberry32(42);
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 2 + 0.5,
      opacity: rand() * 0.6 + 0.2,
      delay: rand() * 8,
      duration: rand() * 4 + 3,
    }));
  }, []);

  return (
    <div className="cosmic-bg absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `portal-breathe ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}

      <div className="energy-portal">
        <div className="energy-portal-outer" />
        <div className="energy-portal-glow" />
        <div className="energy-portal-core" />
        <div className="energy-portal-ring" style={{ width: "300px", height: "300px" }} />
        <div className="energy-portal-ring" style={{ width: "400px", height: "400px", animationDelay: "1s" }} />
        <div className="energy-portal-ring" style={{ width: "520px", height: "520px", animationDelay: "2s" }} />
      </div>
    </div>
  );
}