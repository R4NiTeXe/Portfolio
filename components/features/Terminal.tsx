"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { profile } from "@/lib/data/profile";
import { site } from "@/lib/data/site";
import { skillClusters } from "@/lib/data/skills";
import { projects } from "@/lib/data/projects";
import { journey } from "@/lib/data/journey";
import { useDevLayer } from "@/lib/dev-layer-context";

interface TerminalLine {
  id: number;
  kind: "cmd" | "out";
  text: string;
}

interface CommandDefinition {
  name: string;
  description: string;
  run: () => string;
}

const commands: CommandDefinition[] = [
  {
    name: "help",
    description: "list available commands",
    run: () =>
      commands
        .map((command) => `  ${command.name.padEnd(14)} ${command.description}`)
        .join("\n"),
  },
  {
    name: "whoami",
    description: "who is this?",
    run: () => `${profile.name} — ${profile.role} (${profile.brand})`,
  },
  {
    name: "about",
    description: "read the bio",
    run: () => profile.bio,
  },
  {
    name: "skills",
    description: "show skill clusters",
    run: () =>
      skillClusters
        .map(
          (cluster) =>
            `  ${cluster.label}: ${cluster.items.map((item) => item.name).join(", ")}`,
        )
        .join("\n"),
  },
  {
    name: "projects",
    description: "show shipped projects",
    run: () =>
      projects
        .map(
          (project) =>
            `  ${project.name.padEnd(14)} ${project.tagline}\n    github: ${project.github}`,
        )
        .join("\n"),
  },
  {
    name: "journey",
    description: "show the timeline",
    run: () =>
      journey
        .map((step) => `  [${step.period}] ${step.title}`)
        .join("\n"),
  },
  {
    name: "socials",
    description: "show links",
    run: () => `  github: ${site.github}\n  linkedin: ${site.linkedin}`,
  },
  {
    name: "contact",
    description: "show email",
    run: () => `  ${profile.email}`,
  },
  {
    name: "devmode",
    description: "toggle developer mode overlay",
    run: () => "",
  },
  {
    name: "clear",
    description: "clear the terminal",
    run: () => "",
  },
  {
    name: "exit",
    description: "close the terminal",
    run: () => "",
  },
];

const BANNER = [
  "R4NiTeXe terminal — you found the developer layer.",
  `  > ${profile.tagline}`,
  "  Type 'help' to see available commands.",
].join("\n");

export function Terminal() {
  const { terminalOpen, setTerminalOpen, setDevMode, devMode } = useDevLayer();
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, kind: "out", text: BANNER },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [nextId, setNextId] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      inputRef.current?.focus();
      outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
    }
  }, [terminalOpen, lines]);

  if (!terminalOpen) return null;

  function runCommand(raw: string) {
    const text = raw.trim();
    const id = nextId;
    setNextId((current) => current + 1);

    if (!text) {
      setLines((current) => [...current, { id, kind: "cmd", text: "" }]);
      return;
    }

    const historyLines = [...history, text];
    setHistory(historyLines);
    setHistoryIndex(-1);

    const command = commands.find((c) => c.name === text.toLowerCase());
    let output = `  command not found: ${text} — type 'help'`;

    if (command) {
      switch (command.name) {
        case "clear":
          setLines([]);
          return;
        case "exit":
          setTerminalOpen(false);
          return;
        case "devmode":
          setDevMode(!devMode);
          output = `  developer mode ${devMode ? "disabled" : "enabled"}.`;
          break;
        default:
          output = command.run();
      }
    }

    setLines((current) => [
      ...current,
      { id, kind: "cmd", text },
      { id: id + 1, kind: "out", text: output },
    ]);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const index =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setInput(history[index]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex === history.length - 1) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const index = historyIndex + 1;
        setHistoryIndex(index);
        setInput(history[index]);
      }
    } else if (event.key === "Escape") {
      setTerminalOpen(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Developer terminal"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm"
      onClick={() => setTerminalOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-lg border border-accent/30 bg-[#05070D] shadow-[0_0_60px_rgba(56,189,248,0.15)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            r4nitexe — /dev/terminal
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTerminalOpen(false)}
              className="rounded p-1 text-text-muted transition-colors hover:text-text"
              aria-label="Close terminal"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={outputRef}
          className="h-[320px] overflow-y-auto p-4 font-mono text-[13px] leading-6 text-text-muted"
        >
          {lines.map((line) =>
            line.kind === "cmd" ? (
              <p key={line.id} className="text-text">
                <span className="text-accent">ranit@portfolio</span>
                <span className="text-text-muted">:</span>
                <span className="text-accent-violet">~</span>
                <span className="text-text-muted">$ </span>
                {line.text}
              </p>
            ) : (
              <p key={line.id} className="whitespace-pre-wrap">
                {line.text}
              </p>
            ),
          )}
          <form
            className="flex items-center"
            onSubmit={(event) => {
              event.preventDefault();
              runCommand(input);
              setInput("");
            }}
          >
            <span className="text-accent">ranit@portfolio</span>
            <span className="text-text-muted">:</span>
            <span className="text-accent-violet">~</span>
            <span className="text-text-muted">$ </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              spellCheck={false}
              className="ml-1 flex-1 bg-transparent text-text focus:outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
}