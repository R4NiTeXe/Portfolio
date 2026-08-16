"use client";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
        500 — Error
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text md:text-4xl">
        Something broke.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-text-muted">
        {error.digest ? (
          <>Error digest: {error.digest}</>
        ) : (
          <>An unexpected error occurred while rendering this page.</>
        )}
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </main>
  );
}