"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full px-5 transition-all duration-300 ${
          scrolled ? "glass-strong" : "glass"
        }`}
      >
        <a
          href="#top"
          className="font-display text-base font-semibold tracking-wide text-white"
        >
          {site.brand}
          <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-mint align-middle" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[13px] text-muted-foreground transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-dot" />
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
              <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-dot" />
              {site.availability}
            </p>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}