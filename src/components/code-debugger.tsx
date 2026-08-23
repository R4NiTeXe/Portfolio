"use client";

import { useState } from "react";

const challenges = [
  {
    id: 1,
    code: `function sum(a, b) {\n  return a + b;\n}\n// What does sum(2, "3") return?`,
    question: "sum(2, '3') returns?",
    options: ["5", '"23"', "NaN", "TypeError"],
    correct: 1,
    explain: 'JS coerces number to string when + with string → "23".',
  },
  {
    id: 2,
    code: `const [count, setCount] = useState(0);\n// Click handler:\nconst inc = () => setCount(count + 1);\n// Called twice quickly → stale closure`,
    question: "Fix for stale state?",
    options: ["setCount(count + 1)", "setCount(c => c + 1)", "setCount++", "useRef"],
    correct: 1,
    explain: "Functional updater avoids stale closure.",
  },
  {
    id: 3,
    code: `useEffect(() => {\n  fetch(\"/api/data\").then(setData);\n}, []);\n// Missing cleanup if unmounted`,
    question: "Best fix?",
    options: ["Add []", "AbortController + cleanup", "Use setTimeout", "No fix needed"],
    correct: 1,
    explain: "AbortController prevents setState on unmounted component.",
  },
] as const;

export function CodeDebugger() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const ch = challenges[index];
  const done = picked !== null;
  const correct = picked === ch.correct;

  return (
    <div className="eclipse-card p-5 md:p-6">
      <p className="mono-label text-mint">
        Code Debugger — {index + 1}/{challenges.length}
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs leading-relaxed text-white/80">
        {ch.code}
      </pre>
      <p className="mt-3 text-sm font-medium text-white">{ch.question}</p>
      <div className="mt-3 grid gap-2">
        {ch.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => {
              if (done) return;
              setPicked(i);
              if (i === ch.correct) setScore((s) => s + 1);
            }}
            disabled={done}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 ${
              !done
                ? "border-white/10 hover:border-mint/30 hover:bg-white/[0.04] text-muted-foreground"
                : i === ch.correct
                  ? "border-mint/50 bg-mint/15 text-mint"
                  : i === picked
                    ? "border-destructive/50 bg-destructive/10 text-destructive"
                    : "border-white/5 text-muted-foreground/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {done && (
        <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <p className={`text-xs ${correct ? "text-mint" : "text-amber"}`}>
            {correct ? "Correct" : "Not quite"} — {ch.explain}
          </p>
          <div className="mt-3 flex gap-2">
            {index < challenges.length - 1 ? (
              <button
                onClick={() => {
                  setIndex((v) => v + 1);
                  setPicked(null);
                }}
                className="rounded-md bg-mint px-3 py-1.5 text-xs font-medium text-[#04141a]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  setIndex(0);
                  setPicked(null);
                  setScore(0);
                }}
                className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-muted-foreground"
              >
                Restart — Score {score}/{challenges.length}
              </button>
            )}
          </div>
        </div>
      )}
      <p className="mono-label mt-3 !text-[9px] text-muted-foreground/60">
        Score {score}/{challenges.length} — local only
      </p>
    </div>
  );
}
