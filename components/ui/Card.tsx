import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-elevated/60",
        className,
      )}
      {...rest}
    />
  );
}