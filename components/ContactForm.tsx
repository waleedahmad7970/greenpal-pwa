"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const inputCls =
  "w-full rounded-xl bg-card border border-rule px-4 py-3.5 text-base outline-none focus:border-signal transition-colors placeholder:text-muted/60";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name"));
    const venue = String(fd.get("venue") || "");
    const message = String(fd.get("message"));

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: String(fd.get("email")),
          phone: "",
          subject: `New Venue Inquiry from ${name}`,
          message: venue ? `Venue: ${venue}\n\n${message}` : message,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.success === false) throw new Error(body.message || "Failed to send message.");
      setStatus("sent");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Couldn't reach the server. Check your connection, or reach us by phone or WhatsApp below."
          : err instanceof Error
            ? err.message
            : "Failed to send message.",
      );
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-signal bg-card p-6">
        <p className="font-display text-2xl font-semibold">Message sent.</p>
        <p className="text-muted mt-2">We&apos;ll reply from a real person within a day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required autoComplete="name" placeholder="Your name" className={inputCls} />
      <input name="email" type="email" required autoComplete="email" inputMode="email" placeholder="Email" className={inputCls} />
      <input name="venue" placeholder="Venue (optional)" className={inputCls} />
      <textarea name="message" required rows={4} placeholder="How can we help?" className={`${inputCls} resize-none`} />
      {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-signal text-ink font-bold py-4 active:scale-[0.98] transition-transform disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
