import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="container relative grid gap-14 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium font-mono text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Notes updated daily
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            AI news,
            <br />
            <span className="text-gradient">without the noise.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            I&apos;m Chaz. I track what&apos;s actually shipping in AI —
            models, tools, research, policy — and write it up straight, no
            hype, no fluff.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="#notes">
                Read the latest Notes
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#archive">Browse the Archive</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">150+</p>
              <p>write-ups published</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">8.4k</p>
              <p>weekly readers</p>
            </div>
          </div>
        </div>

        {/* Signature element: a live-feeling notes/update console */}
        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="animate-float mx-auto w-full max-w-sm rounded-2xl border border-border bg-card p-1.5 shadow-xl shadow-primary/10">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                chaz-chats — live notes
              </span>
            </div>
            <div className="space-y-3 rounded-xl bg-background p-4">
              <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-2.5 text-sm">
                Cost-per-token dropped again this week — good news if
                you&apos;re building.
              </div>
              <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-2.5 text-sm">
                New paper on agent memory is worth your 10 minutes.
              </div>
              <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-accent/30 sm:-bottom-6 sm:-right-6" />
        </div>
      </div>
    </section>
  );
}
