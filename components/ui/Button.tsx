import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-violet text-bg font-semibold shadow-[0_0_20px_rgb(56_189_248/0.25)] hover:shadow-[0_0_28px_rgb(56_189_248/0.4)] transition-shadow",
  secondary:
    "border border-border text-text hover:border-accent/60 hover:text-accent transition-colors bg-transparent",
  ghost: "text-text-muted hover:text-text transition-colors",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm rounded-md",
  md: "h-11 px-6 text-sm rounded-lg",
  lg: "h-12 px-8 text-base rounded-lg",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonLinkProps = ButtonBaseProps &
  { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">;

type ButtonElementProps = ButtonBaseProps & ComponentPropsWithoutRef<"button">;

export function Button(props: ButtonLinkProps | ButtonElementProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type, ...buttonProps } = props;
  return (
    <button type={type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}