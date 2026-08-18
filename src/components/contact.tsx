"use client";

import { ArrowUpRight, Copy, Download, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";
import { useToast } from "@/components/toast";
import { site } from "@/lib/site";

export function Contact() {
  const push = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      push("EMAIL COPIED TO CLIPBOARD");
    } catch {
      push("COPY FAILED — SELECT MANUALLY");
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <p className="mono-label text-mint">05 // Contact</p>
        <div className="mt-10 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div data-reveal-item>
            <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
              INITIATE
              <br />
              <span className="text-glow-mint text-mint">
                TRANSMISSION.
              </span>
            </h2>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              I&apos;m open to internships, freelance work and interesting
              collaborations. The eclipse is always accepting new orbits —
              send a signal and I&apos;ll respond within a day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-mint/70" />
                {site.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
                {site.availability}
              </span>
            </div>
            <div className="mt-8">
              <Magnetic>
                <a
                  href="/Ranit_Naskar_CV.pdf"
                  download="Ranit_Naskar_CV.pdf"
                  data-cursor-label="GET"
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-mint/40 bg-mint/10 px-6 text-sm font-medium text-mint transition-all hover:bg-mint/20 hover:shadow-[0_0_24px_-8px_rgba(101,246,213,0.6)]"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="space-y-3">
            <Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                data-cursor-label="COPY"
                className="eclipse-card group flex w-full items-center gap-4 p-4 text-left transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-mint/80 transition-colors group-hover:border-mint/40 group-hover:text-mint">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="mono-label block text-muted-foreground">
                    Email
                  </span>
                  <span className="block truncate text-sm text-white transition-colors group-hover:text-mint">
                    {site.email}
                  </span>
                </span>
                <Copy className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-mint" />
              </button>
            </Magnetic>

            {[
              {
                label: "Phone",
                value: site.phone,
                href: `tel:${site.phone.replace(/\s/g, "")}`,
                icon: <Phone className="h-4 w-4" />,
              },
              {
                label: "GitHub",
                value: "@R4NiTeXe",
                href: site.github,
                icon: <GithubIcon className="h-4 w-4" />,
              },
              {
                label: "LinkedIn",
                value: "in/ranit-naskar",
                href: site.linkedin,
                icon: <LinkedinIcon className="h-4 w-4" />,
              },
            ].map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  channel.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                data-reveal-item
                data-cursor-label="OPEN"
                className="eclipse-card group flex items-center gap-4 p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-mint/80 transition-colors group-hover:border-mint/40 group-hover:text-mint">
                  {channel.icon}
                </span>
                <span className="min-w-0">
                  <span className="mono-label block text-muted-foreground">
                    {channel.label}
                  </span>
                  <span className="block truncate text-sm text-white transition-colors group-hover:text-mint">
                    {channel.value}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}