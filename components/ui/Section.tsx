import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-24 py-20 md:py-28", className)}
      {...rest}
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          {eyebrow ? (
            <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={`${id}-heading`}
            className="text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-7 text-text-muted md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}