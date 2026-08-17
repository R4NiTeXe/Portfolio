"use client";

import dynamic from "next/dynamic";

const EclipseCanvas = dynamic(
  () => import("./eclipse-scene").then((m) => m.EclipseCanvas),
  {
    ssr: false,
    loading: () => <div className="h-full w-full rounded-full bg-white/[0.02]" />,
  }
);

export function Eclipse() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-24 right-[-12%] z-0 h-56 w-56 opacity-70 select-none md:top-[19%] md:right-auto md:left-1/2 md:h-80 md:w-80 md:-translate-x-1/2 md:-translate-y-1/2 md:opacity-100"
    >
      <EclipseCanvas />
    </div>
  );
}