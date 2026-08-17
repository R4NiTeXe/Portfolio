import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold text-white">
              {site.brand}
            </p>
            <p className="mono-label mt-3 text-muted-foreground">
              R4NiTeXe © {new Date().getFullYear()}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Full-stack development at the edge of light. Crafted in Kolkata,
              India.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="mono-label mb-4 text-white/60">Navigate</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-mint"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mono-label mb-4 text-white/60">Transmit</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-mint"
                >
                  <Mail className="h-4 w-4 text-mint/70" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-mint"
                >
                  <GithubIcon className="h-4 w-4 text-mint/70" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-mint"
                >
                  <LinkedinIcon className="h-4 w-4 text-mint/70" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="mono-label !text-[10px] !tracking-[0.14em] text-muted-foreground/60">
            Kolkata · India
          </p>
          <p className="mono-label !text-[10px] !tracking-[0.14em] text-muted-foreground/60">
            Designed at the edge of light
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-mint"
          >
            <span className="mono-label !text-[10px] !tracking-[0.14em]">
              Return
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-mint/50">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}