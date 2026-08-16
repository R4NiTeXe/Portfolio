"use client";

import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col items-center justify-center bg-bg px-6 text-center text-text">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
          500 — Error
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
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
      </body>
    </html>
  );
}