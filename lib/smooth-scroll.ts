import type Lenis from "lenis";

export const lenisRef: { current: Lenis | null } = { current: null };

export function smoothScrollTo(top: number, immediate: boolean) {
  const lenis = lenisRef.current;
  if (lenis) {
    lenis.scrollTo(top, { immediate });
  } else {
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  }
}