"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestones } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 72%",
            end: "bottom 58%",
            scrub: 0.8,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-milestone]").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            once: true,
          },
        });
        ScrollTrigger.create({
          trigger: item,
          start: "top 72%",
          onEnter: () =>
            item.querySelector("[data-milestone-dot]")?.classList.add("orbit-node-active"),
          onLeaveBack: () =>
            item.querySelector("[data-milestone-dot]")?.classList.remove("orbit-node-active"),
        });
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" aria-label="Journey" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">04 // Journey</p>
        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div data-reveal-item>
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
              The path so far —
              <br />
              <span className="text-glow-mint text-mint">
                one orbit at a time.
              </span>
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              From classroom fundamentals to aerospace telemetry — every stop
              sharpened the same edge: build fast, build clean, ship it.
            </p>
          </div>

          <ol
            ref={listRef}
            className="relative space-y-12 border-l border-white/10 pl-8"
          >
            <span
              aria-hidden="true"
              ref={fillRef}
              className="absolute top-0 left-0 h-full w-px origin-top bg-gradient-to-b from-mint/70 via-mint/30 to-transparent"
            />
            {milestones.map((milestone, index) => (
              <li
                key={`${milestone.period}-${milestone.title}`}
                data-milestone
                className="relative"
              >
                <span
                  data-milestone-dot
                  aria-hidden="true"
                  className={`orbit-node absolute top-1.5 -left-[41px] h-2.5 w-2.5 ${
                    index === 0 ? "orbit-node-active" : ""
                  }`}
                />
                <p className="mono-label text-muted-foreground">
                  {milestone.period}
                </p>
                <p className="mt-2 text-xs tracking-[0.18em] text-mint uppercase">
                  {milestone.role}
                </p>
                <h3 className="font-display mt-1.5 text-xl font-semibold text-white">
                  {milestone.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {milestone.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}