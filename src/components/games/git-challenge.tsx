"use client";

import { useState } from "react";

const scenarios = [
  {
    id: 1,
    prompt: "You need a new feature branch from main and switch to it.",
    code: "$ git checkout main\n$ git pull\n# next?",
    options: [
      "git branch feature",
      "git checkout -b feature",
      "git switch -c feature",
      "Both b and c",
    ],
    correct: 3,
    explain: "checkout -b and switch -c both create and switch.",
  },
  {
    id: 2,
    prompt: "You staged wrong file. Unstage without losing changes.",
    code: "$ git add .\n$ git status # wrong file staged",
    options: ["git reset HEAD <file>", "git rm <file>", "git checkout -- <file>", "git clean"],
    correct: 0,
    explain: "git reset HEAD unstages, keeps working tree.",
  },
  {
    id: 3,
    prompt: "See what changed before commit (staged vs unstaged).",
    code: "$ git status\n# what to run next?",
    options: ["git diff", "git diff --staged", "git status", "git log --oneline"],
    correct: 1,
    explain: "git diff --staged shows staged changes; git diff shows unstaged.",
  },
  {
    id: 4,
    prompt: "Undo last commit, keep changes staged.",
    code: "$ git log --oneline\n# need to undo last commit",
    options: [
      "git reset --hard HEAD~1",
      "git reset --soft HEAD~1",
      "git revert HEAD",
      "git checkout HEAD~1",
    ],
    correct: 1,
    explain: "--soft keeps changes staged; --hard discards.",
  },
] as const;

export function GitChallenge() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const ch = scenarios[i];
  const done = pick !== null;
  const ok = pick === ch.correct;

  return (
    <div className="eclipse-card p-5 md:p-6">
      <p className="mono-label text-mint">
        Git Challenge — {i + 1}/{scenarios.length}
      </p>
      <p className="mt-3 text-sm text-white/85">{ch.prompt}</p>
      <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-muted-foreground">
        {ch.code}
      </pre>
      <div className="mt-3 grid gap-2">
        {ch.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (done) return;
              setPick(idx);
              if (idx === ch.correct) setScore((s) => s + 1);
            }}
            disabled={done}
            className={`rounded-lg border px-3 py-2 text-left font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50 ${
              !done
                ? "border-white/10 hover:border-mint/30 text-muted-foreground"
                : idx === ch.correct
                  ? "border-mint/50 bg-mint/15 text-mint"
                  : idx === pick
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
          <p className={`text-xs ${ok ? "text-mint" : "text-amber"}`}>
            {ok ? "Correct" : "Not quite"} — {ch.explain}
          </p>
          <div className="mt-3 flex gap-2">
            {i < scenarios.length - 1 ? (
              <button
                onClick={() => {
                  setI((v) => v + 1);
                  setPick(null);
                }}
                className="rounded-md bg-mint px-3 py-1.5 text-xs font-medium text-[#04141a]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  setI(0);
                  setPick(null);
                  setScore(0);
                }}
                className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-muted-foreground"
              >
                Restart — {score}/{scenarios.length}
              </button>
            )}
          </div>
        </div>
      )}
      <p className="mono-label mt-3 !text-[9px] text-muted-foreground/60">
        Score {score}/{scenarios.length} — local only
      </p>
    </div>
  );
}
