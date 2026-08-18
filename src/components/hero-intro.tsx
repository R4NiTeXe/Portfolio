"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroIntro({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = [...el.querySelectorAll<HTMLElement>("[data-hero-item]")];
    const lines = [...el.querySelectorAll<HTMLElement>("[data-hero-line]")];
    if (!targets.length && !lines.length) return;

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      window.removeEventListener("eclipse:ready", play);
      ctxRef.current = gsap.context(() => {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.09,
            delay: 0.15,
          },
        );
        if (lines.length) {
          gsap.fromTo(
            lines,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.12,
              delay: 0.4,
            },
          );
        }
      }, el);
    };

    const preloaderGone = !document.querySelector(".preloader-ring");
    if (preloaderGone) {
      play();
    } else {
      window.addEventListener("eclipse:ready", play, { once: true });
      const fallback = window.setTimeout(play, 3000);
      return () => {
        window.clearTimeout(fallback);
        window.removeEventListener("eclipse:ready", play);
        ctxRef.current?.revert();
      };
    }

    return () => {
      window.removeEventListener("eclipse:ready", play);
      ctxRef.current?.revert();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
