import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Note } from "@/data/notes";

const tagVariant = (tag: string) => (tag === "News" || tag === "HCM & ERP" ? "accent" : "default") as const;

export function NotesFeed({ notes }: { notes: Note[] }) {
  return (
    <section id="notes" className="border-t border-border/70 py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-600 dark:text-accent-400">
            Notes
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Quick takes, as things happen
          </h2>
          <p className="mt-4 text-muted-foreground">
            Short, unpolished thoughts on what&apos;s moving in AI right now.
            No comment threads — just the signal.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-2xl border border-border bg-card p-5 transition-colors duration-200 hover:border-primary/40"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563EB,#06B6D4)] text-xs font-semibold text-white">
                    C
                  </span>
                  <div className="text-sm">
                    <span className="font-medium">Chaz</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {note.timestamp}
                    </span>
                  </div>
                </div>
                <Badge variant={tagVariant(note.tag)}>{note.tag}</Badge>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {note.text}
              </p>

              {note.sourceLabel && (
                <Link
                  href={note.sourceHref ?? "#"}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  {note.sourceLabel}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          <span>Notes are one-way — replies and live chat aren&apos;t part of this feed.</span>
        </div>
      </div>
    </section>
  );
}
