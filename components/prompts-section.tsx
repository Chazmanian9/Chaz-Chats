"use client";

import * as React from "react";
import { Check, Copy, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prompts } from "@/data/prompts";

export function PromptsSection() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  async function handleCopy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <section id="prompts" className="border-t border-border/70 py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-600 dark:text-accent-400">
            Prompt Library
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Prompts worth stealing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tested, reusable prompts. Copy one, drop in your own details, done.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {prompts.map((p) => {
            const isCopied = copiedId === p.id;
            return (
              <Card key={p.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge>{p.category}</Badge>
                      <CardTitle className="mt-3">{p.title}</CardTitle>
                    </div>
                    <Wand2 className="h-4 w-4 shrink-0 text-accent" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <pre className="flex-1 whitespace-pre-wrap rounded-xl border border-border bg-background p-3 font-mono text-xs leading-relaxed text-foreground/80">
                    {p.text}
                  </pre>
                  <button
                    onClick={() => handleCopy(p.id, p.text)}
                    className={`mt-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isCopied
                        ? "bg-green-600 text-white"
                        : "bg-primary text-primary-foreground hover:bg-primary-600"
                    }`}
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {isCopied ? "Copied!" : "Copy prompt"}
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
