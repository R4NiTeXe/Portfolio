"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Magnetic } from "@/components/magnetic";
import { useToast } from "@/components/toast";
import { site } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = { name?: string; email?: string; message?: string };
type TransmissionStatus = "idle" | "transmitting" | "success" | "error";

function TransmissionForm() {
  const push = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<TransmissionStatus>("idle");
  const [composeUrl, setComposeUrl] = useState("");
  const [ripple, setRipple] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-lg border bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/30 transition-colors focus:outline-none focus:ring-1 ${
      invalid
        ? "border-destructive/60 focus:border-destructive/70 focus:ring-destructive/30"
        : "border-white/10 focus:border-mint/40 focus:ring-mint/30"
    }`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      push("EMAIL COPIED TO CLIPBOARD");
    } catch {
      push("COPY FAILED — SELECT MANUALLY");
    }
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "NAME IS REQUIRED";
    else if (name.trim().length < 2) next.name = "NAME MUST BE AT LEAST 2 CHARACTERS";
    if (!email.trim()) next.email = "EMAIL IS REQUIRED";
    else if (!EMAIL_RE.test(email.trim())) next.email = "ENTER A VALID EMAIL ADDRESS";
    if (!message.trim()) next.message = "MESSAGE IS REQUIRED";
    else if (message.trim().length < 10)
      next.message = "MESSAGE MUST BE AT LEAST 10 CHARACTERS";
    setErrors(next);
    return !next.name && !next.email && !next.message;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "transmitting") return;
    if (!validate()) return;

    setStatus("transmitting");
    setRipple((r) => r + 1);
    const subject = `Portfolio transmission from ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()}\n${email.trim()}`;
    const url = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    timerRef.current = window.setTimeout(() => {
      try {
        window.location.href = url;
      } catch {
        // navigation to mailto can throw in restricted environments
      }
      setComposeUrl(url);
      setStatus("success");
    }, 450);
  };

  const clearError = (field: keyof FieldErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (status !== "idle" && status !== "transmitting") setStatus("idle");
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="eclipse-card relative overflow-hidden p-6 md:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[3px] w-24 bg-gradient-to-r from-mint to-transparent"
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="mono-label text-mint">
          {"// "}DIRECT TRANSMISSION — MESSAGE FORM
        </p>
        <p className="mono-label !text-[9px] text-muted-foreground/60">
          VALIDATED LOCALLY — NOTHING LEAVES YOUR BROWSER
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="tx-name"
            className="mono-label block !text-[9px] text-muted-foreground"
          >
            Name <span className="text-destructive">*</span>
          </label>
          <input
            id="tx-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "tx-name-error" : undefined}
            className={`mt-2 h-11 ${fieldClass(!!errors.name)}`}
          />
          {errors.name && (
            <p
              id="tx-name-error"
              className="mono-label mt-1.5 !text-[9px] text-destructive"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="tx-email"
            className="mono-label block !text-[9px] text-muted-foreground"
          >
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="tx-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "tx-email-error" : undefined}
            className={`mt-2 h-11 ${fieldClass(!!errors.email)}`}
          />
          {errors.email && (
            <p
              id="tx-email-error"
              className="mono-label mt-1.5 !text-[9px] text-destructive"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="tx-message"
          className="mono-label block !text-[9px] text-muted-foreground"
        >
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="tx-message"
          name="message"
          rows={4}
          placeholder="Tell me about your project, role, or idea…"
          required
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearError("message");
          }}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "tx-message-error" : undefined}
          className={`mt-2 min-h-32 resize-y py-3 ${fieldClass(!!errors.message)}`}
        />
        {errors.message && (
          <p
            id="tx-message-error"
            className="mono-label mt-1.5 !text-[9px] text-destructive"
          >
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "transmitting"}
          data-cursor-label="SEND"
          className="relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-lg border border-mint/40 bg-mint/10 px-6 text-sm font-medium text-mint transition-all hover:bg-mint/20 hover:shadow-[0_0_24px_-8px_rgba(101,246,213,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {ripple > 0 && (
            <span key={ripple} aria-hidden="true" className="transmission-ripple" />
          )}
          {status === "transmitting" ? (
            <>
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
              TRANSMITTING
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Transmission
            </>
          )}
        </button>
        <p aria-live="polite" className="mono-label !text-[9px] text-muted-foreground/60">
          OPENS YOUR EMAIL CLIENT — YOU PRESS SEND
        </p>
      </div>

      {status === "success" && (
        <div
          role="status"
          className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-mint/30 bg-mint/[0.06] px-4 py-3"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
          <p className="mono-label !text-[9px] text-mint">
            TRANSMISSION READY — YOUR EMAIL CLIENT SHOULD HAVE OPENED. COMPLETE
            THE SEND THERE; NO EMAIL HAS BEEN SENT YET.
          </p>
          <a
            href={composeUrl}
            className="mono-label !text-[9px] text-muted-foreground underline-offset-2 hover:text-mint hover:underline"
          >
            COMPOSE MANUALLY
          </a>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-destructive/40 bg-destructive/[0.06] px-4 py-3"
        >
          <p className="mono-label !text-[9px] text-destructive">
            COULD NOT OPEN YOUR EMAIL CLIENT — COMPOSE MANUALLY OR COPY THE
            ADDRESS.
          </p>
          <a
            href={composeUrl}
            className="mono-label !text-[9px] text-destructive underline-offset-2 hover:underline"
          >
            COMPOSE MANUALLY
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="mono-label !text-[9px] text-destructive underline-offset-2 hover:underline"
          >
            COPY EMAIL
          </button>
        </div>
      )}
    </form>
  );
}

export function Contact() {
  const push = useToast();
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      push("EMAIL COPIED TO CLIPBOARD");
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1600);
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
              send a signal and I usually respond within a day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-mint/70" />
                {site.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    aria-hidden="true"
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60"
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                SIGNAL STRONG — {site.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
                {site.availability}
              </span>
            </div>
            <div className="mt-8">
              <Magnetic>
                <a
                  href="/CV_RanitNaskar_DCS_044.pdf"
                  download="Ranit_Naskar_CV.pdf"
                  data-cursor-label="GET"
                  className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-lg border border-mint/40 bg-mint/10 px-6 text-sm font-medium text-mint transition-all hover:bg-mint/20 hover:shadow-[0_0_24px_-8px_rgba(101,246,213,0.6)] active:scale-95"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
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
                data-cursor-label={copied ? "COPIED" : "COPY"}
                className="eclipse-card group flex w-full items-center gap-4 p-4 text-left transition-all active:scale-[0.98]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-mint/80 transition-colors group-hover:border-mint/40 group-hover:text-mint">
                  {copied ? (
                    <Check className="h-4 w-4 text-mint" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="mono-label block text-muted-foreground">
                    Email
                  </span>
                  <span className="block truncate text-sm text-white transition-colors group-hover:text-mint">
                    {site.email}
                  </span>
                </span>
                {copied ? (
                  <span className="mono-label shrink-0 text-mint">
                    COPIED
                  </span>
                ) : (
                  <Copy className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-mint" />
                )}
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
                className="eclipse-card group flex items-center gap-4 p-4 transition-all active:scale-[0.98]"
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

        <div data-reveal-item className="mt-12">
          <TransmissionForm />
        </div>
      </div>
    </section>
  );
}