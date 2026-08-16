"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { RecruiterMode } from "@/components/layout/RecruiterMode";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const active = useScrollSpy(navItems.map((item) => item.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || recruiterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, recruiterOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass" : "bg-transparent",
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10"
        >
          <a
            href="#top"
            className="font-mono text-sm font-semibold tracking-tight text-text transition-colors hover:text-accent"
          >
            {profile.brand}
            <span className="text-accent">.</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "text-sm transition-colors",
                      active === item.id
                        ? "text-accent"
                        : "text-text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setRecruiterOpen(true)}
              className="rounded-md border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              Recruiter Mode
            </button>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-text-muted transition-colors hover:text-text md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass border-t border-border md:hidden"
            >
              <ul className="space-y-1 px-6 py-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-sm transition-colors",
                        active === item.id
                          ? "bg-accent/10 text-accent"
                          : "text-text-muted hover:bg-elevated hover:text-text",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setRecruiterOpen(true);
                    }}
                    className="w-full rounded-md border border-accent/40 px-3 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
                  >
                    Recruiter Mode
                  </button>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {recruiterOpen ? (
          <RecruiterMode onClose={() => setRecruiterOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}