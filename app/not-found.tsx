"use client";

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
        404 — Not found
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text md:text-4xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-text-muted">
        You wandered off the map — the portfolio lives on a single page.
      </p>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </main>
  );
}