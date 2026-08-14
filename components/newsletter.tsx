"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export function Newsletter({
  heading,
  subtext,
}: {
  heading: string;
  subtext: string;
}) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
    }
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-[linear-gradient(135deg,theme(colors.primary.600),theme(colors.accent.600))] px-6 py-14 text-center sm:px-16">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-10" />
          <div className="relative mx-auto max-w-lg">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold text-white sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-3 text-sm text-white/80">{subtext}</p>

            {status === "success" ? (
              <div className="mt-8 flex items-center justify-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-medium text-white backdrop-blur">
                <CheckCircle2 className="h-4 w-4" />
                You&apos;re on the list — thanks for subscribing.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
              >
                <Input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white sm:w-72"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="bg-white text-primary-700 hover:bg-white/90"
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </Button>
              </form>
            )}

            {status === "error" && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/90">
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </div>
            )}

            <p className="mt-4 text-xs text-white/60">
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
