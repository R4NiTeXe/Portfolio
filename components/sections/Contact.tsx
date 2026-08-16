"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClasses =
  "w-full rounded-md border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-accent/60 focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        event.currentTarget.reset();
        return;
      }

      if (response.status === 429) {
        setErrorMessage(
          "Too many messages from this device. Please try again in a few minutes.",
        );
      } else {
        setErrorMessage(
          "Something went wrong. Please try again, or email me directly.",
        );
      }
      setStatus("error");
    } catch {
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-accent">
            08 — Contact
          </p>
          <h2
            id="contact-heading"
            className="text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            Let&apos;s build something
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <p className="max-w-md text-base leading-7 text-text-muted md:text-lg">
              Have a project, an internship, or just a question? My inbox is
              open — send a message and I&apos;ll get back to you.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="block text-sm text-text transition-colors hover:text-accent"
              >
                <span className="mr-2 font-mono text-xs uppercase tracking-widest text-text-muted">
                  Email
                </span>
                {profile.email}
              </a>
              <p className="text-sm text-text">
                <span className="mr-2 font-mono text-xs uppercase tracking-widest text-text-muted">
                  Location
                </span>
                {profile.location}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-lg p-6 md:p-8"
              aria-busy={status === "loading"}
            >
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    placeholder="you@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-muted"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  minLength={3}
                  maxLength={200}
                  placeholder="What is this about?"
                  className={inputClasses}
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-muted"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={6}
                  placeholder="Tell me about your project or opportunity…"
                  className={inputClasses}
                />
              </div>

              <div className="mt-6 flex items-center gap-4">
                <Button type="submit" size="md" disabled={status === "loading"}>
                  {status === "loading" ? "Sending…" : "Send Message"}
                </Button>
              </div>

              <p aria-live="polite" className="mt-4 min-h-6 text-sm">
                {status === "success" ? (
                  <span className="text-accent">
                    Message sent — thank you! I&apos;ll reply soon.
                  </span>
                ) : null}
                {status === "error" ? (
                  <span className="text-red-400">{errorMessage}</span>
                ) : null}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}