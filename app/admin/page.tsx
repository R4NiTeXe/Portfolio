"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface AdminMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "sent" | "failed";
  createdAt: string;
}

const statusStyles: Record<AdminMessage["status"], string> = {
  sent: "border-accent/50 text-accent",
  pending: "border-border text-text-muted",
  failed: "border-red-400/50 text-red-400",
};

const inputClasses =
  "w-full rounded-md border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-accent/60 focus:outline-none";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchMessages(): Promise<
    AdminMessage[] | "unauthorized" | "error"
  > {
    const response = await fetch("/api/admin/messages");
    if (response.status === 401) return "unauthorized";
    if (response.ok) return (await response.json()) as AdminMessage[];
    return "error";
  }

  useEffect(() => {
    let cancelled = false;
    fetchMessages().then((result) => {
      if (cancelled) return;
      if (result === "unauthorized" || result === "error") {
        setChecking(false);
      } else {
        setMessages(result);
        setAuthenticated(true);
        setChecking(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoggingIn(false);

    if (response.ok) {
      setPassword("");
      setLoginError("");
      const result = await fetchMessages();
      if (result !== "unauthorized" && result !== "error") {
        setMessages(result);
        setAuthenticated(true);
        setChecking(false);
      }
    } else if (response.status === 429) {
      setLoginError("Too many attempts. Try again later.");
    } else {
      setLoginError("Wrong password.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setMessages([]);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this message permanently?")) return;
    setDeletingId(id);
    const response = await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
      headers: { "x-admin-csrf": "1" },
    });
    setDeletingId(null);
    if (response.ok) {
      setMessages((current) => current.filter((m) => m.id !== id));
    }
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-16 md:px-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            Admin — Message Inbox
          </p>
          {authenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-text"
            >
              Logout
            </button>
          ) : null}
        </div>

        {checking ? (
          <p className="mt-8 text-sm text-text-muted">Checking session…</p>
        ) : authenticated ? (
          <div className="mt-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
              {messages.length} message{messages.length === 1 ? "" : "s"}
            </p>

            {messages.length === 0 ? (
              <div className="glass-card rounded-lg p-10 text-center">
                <p className="text-sm text-text-muted">
                  No messages yet — the inbox is empty.
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {messages.map((message) => (
                  <li
                    key={message.id}
                    className="glass-card rounded-lg p-5 md:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-base font-semibold text-text">
                          {message.subject}
                        </h2>
                        <p className="mt-1 text-sm text-text-muted">
                          {message.name} ·{" "}
                          <a
                            href={`mailto:${message.email}`}
                            className="text-accent transition-colors hover:text-accent-violet"
                          >
                            {message.email}
                          </a>
                        </p>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-text-muted">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={cn(
                            "rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest",
                            statusStyles[message.status],
                          )}
                        >
                          {message.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(message.id)}
                          disabled={deletingId === message.id}
                          className="font-mono text-xs text-text-muted transition-colors hover:text-red-400 disabled:opacity-50"
                        >
                          {deletingId === message.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-text-muted">
                      {message.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleLogin}
            className="glass-card mt-8 rounded-lg p-8"
            aria-busy={loggingIn}
          >
            <h1 className="text-lg font-semibold text-text">Sign in</h1>
            <p className="mt-1 text-sm text-text-muted">
              This inbox is private. Enter the admin password to continue.
            </p>
            <label
              htmlFor="admin-password"
              className="mb-2 mt-6 block font-mono text-xs uppercase tracking-widest text-text-muted"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              maxLength={200}
              autoComplete="current-password"
              className={inputClasses}
            />
            {loginError ? (
              <p aria-live="polite" className="mt-3 text-sm text-red-400">
                {loginError}
              </p>
            ) : null}
            <div className="mt-6">
              <Button type="submit" disabled={loggingIn}>
                {loggingIn ? "Signing in…" : "Sign in"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}