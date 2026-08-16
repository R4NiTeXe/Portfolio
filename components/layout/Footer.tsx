import { profile } from "@/lib/data/profile";
import { site } from "@/lib/data/site";

const socialLinks = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-10">
        <div>
          <a
            href="#top"
            className="font-mono text-sm font-semibold text-text transition-colors hover:text-accent"
          >
            {profile.brand}
            <span className="text-accent">.</span>
          </a>
          <p className="mt-2 text-xs text-text-muted">
            {profile.name} — {profile.role} · {profile.location}
          </p>
        </div>

        <ul className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-sm text-text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs text-text-muted">
          © {new Date().getFullYear()} {profile.name}. Built in public.
        </p>
      </div>
    </footer>
  );
}