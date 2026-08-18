"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Download,
  Mail,
  Search,
  TerminalSquare,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { navLinks } from "@/lib/site";

type Command = {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const scrollTo = (href: string) => {
      const el = document.querySelector<HTMLElement>(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return [
      ...navLinks.map((link) => ({
        id: `go-${link.href}`,
        label: `Go to ${link.label}`,
        hint: link.href,
        icon: <span className="text-mint">→</span>,
        run: () => scrollTo(link.href),
      })),
      {
        id: "terminal",
        label: "Toggle terminal mode",
        hint: "G",
        icon: <TerminalSquare className="h-4 w-4 text-mint" />,
        run: () => window.dispatchEvent(new CustomEvent("eclipse:terminal")),
      },
      {
        id: "cv",
        label: "Download CV",
        hint: "PDF",
        icon: <Download className="h-4 w-4 text-mint" />,
        run: () => {
          window.open("/Ranit_Naskar_CV.pdf", "_blank");
        },
      },
      {
        id: "github",
        label: "Open GitHub profile",
        hint: "external",
        icon: <GithubIcon className="h-4 w-4 text-mint" />,
        run: () => window.open(site.github, "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn profile",
        hint: "external",
        icon: <LinkedinIcon className="h-4 w-4 text-mint" />,
        run: () => window.open(site.linkedin, "_blank"),
      },
      {
        id: "email",
        label: "Send an email",
        hint: site.email,
        icon: <Mail className="h-4 w-4 text-mint" />,
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelected(0);
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => inputRef.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[selected]?.run();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, [open, filtered, selected]);

  useEffect(() => {
    setSelected(0);
    listRef.current?.scrollTo({ top: 0 });
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[85] flex items-start justify-center bg-black/70 p-4 pt-[14vh] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="eclipse-card w-full max-w-md overflow-hidden rounded-xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-4">
          <Search className="h-4 w-4 shrink-0 text-mint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command — navigate, open, transmit…"
            aria-label="Command input"
            className="h-12 flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
          <span className="mono-label shrink-0 !text-[9px] text-muted-foreground/50">
            ESC
          </span>
        </div>
        <ul
          ref={listRef}
          className="max-h-72 overflow-y-auto p-2"
          role="listbox"
        >
          {filtered.length === 0 && (
            <li className="mono-label px-3 py-4 text-muted-foreground/60">
              NO MATCHING COMMANDS
            </li>
          )}
          {filtered.map((command, i) => (
            <li key={command.id} role="option" aria-selected={i === selected}>
              <button
                type="button"
                onMouseEnter={() => setSelected(i)}
                onClick={() => {
                  command.run();
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  i === selected
                    ? "bg-mint/10 text-white"
                    : "text-muted-foreground"
                }`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                  {command.icon}
                </span>
                <span className="flex-1 truncate">{command.label}</span>
                <span className="mono-label !text-[9px] text-muted-foreground/50">
                  {command.hint}
                </span>
                {i === selected && (
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-mint" />
                )}
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/10 px-4 py-2.5">
          <p className="mono-label !text-[9px] text-muted-foreground/50">
            ↑↓ NAVIGATE · ENTER RUN · CTRL+K CLOSE
          </p>
        </div>
      </div>
    </div>
  );
}