import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function GlowCard({
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "glass-card group relative overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-[0_0_32px_rgb(56_189_248/0.12)]",
        className,
      )}
      {...rest}
    />
  );
}