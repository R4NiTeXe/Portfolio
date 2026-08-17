"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import { site } from "@/lib/data/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "about", label: "About me" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
] as const;

const allNavItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

const socialLinks = [
  {
    name: "GitHub",
    href: site.github,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: site.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: `mailto:${profile.email}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(allNavItems.map((item) => item.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.06] bg-black/40 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16"
      >
        <a
          href="#top"
          className="flex items-center gap-3 font-mono text-sm font-semibold tracking-tight text-text transition-colors hover:text-accent"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent/15 shadow-[0_0_20px_rgba(56,189,248,0.4)] backdrop-blur-md">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-accent animate-[spin_12s_linear_infinite]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            {profile.brand}
          </span>
        </a>

        {/* Center Capsule Pill Navbar with Glass + Purple Glow */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <div className="absolute -top-4 left-1/2 h-12 w-52 -translate-x-1/2 rounded-full bg-purple-600/25 blur-2xl pointer-events-none" />
            <ul className="relative flex items-center gap-1 rounded-full border border-purple-500/35 bg-[#0D0820]/70 px-3 py-1.5 shadow-[0_0_30px_rgba(168,85,247,0.3),0_0_60px_rgba(139,92,246,0.15)] backdrop-blur-2xl">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300",
                      active === item.id
                        ? "bg-purple-600/30 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)] border border-purple-400/40"
                        : "text-text-muted/70 hover:text-white hover:bg-white/[0.05]",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.06] text-text-muted/70 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.1] hover:text-white hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-text-muted transition-colors hover:text-text lg:hidden"
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
            className="border-t border-white/[0.06] bg-black/60 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {allNavItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-sm transition-colors",
                      active === item.id
                        ? "bg-white/[0.06] text-text"
                        : "text-text-muted hover:bg-white/[0.04] hover:text-text",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center gap-3 border-t border-white/[0.06] px-6 py-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] text-text-muted/50 transition-colors hover:text-text/80"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
