"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, site } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const el = progressRef.current;
      if (el) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b px-6 transition-all duration-300 md:px-10 ${
        scrolled
          ? "border-white/5 bg-[#070A0F]/80 py-2 backdrop-blur-md"
          : "border-transparent bg-transparent py-3.5"
      }`}
    >
      <span
        aria-hidden="true"
        ref={progressRef}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-mint via-mint/60 to-transparent shadow-[0_0_8px_rgba(101,246,213,0.6)]"
      />
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-12 max-w-[1440px] items-center justify-between transition-all duration-300 md:h-14"
      >
        <a
          href="#top"
          className={`font-display font-semibold tracking-wide text-white transition-all duration-300 ${
            scrolled ? "text-base md:text-lg" : "text-lg md:text-xl"
          }`}
        >
          {site.brand}
          <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-mint align-middle" />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-underline rounded-full px-3.5 py-2 text-[13px] transition-all duration-300 ${
                    isActive
                      ? "nav-active bg-white/[0.06] text-white"
                      : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-amber" />
          <span className="mono-label !text-[10px] !tracking-[0.14em] text-amber">
            {site.availability}
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-white/10 bg-[#0A0F1A]/95">
            <SheetHeader>
              <SheetTitle className="font-display text-white">
                {site.brand}
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mono-label mt-8 flex items-center gap-2 !text-[10px] !tracking-[0.14em] text-amber">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-amber" />
              {site.availability}
            </p>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}