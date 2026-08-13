"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toolCategories, type Tool, type ToolCategory } from "@/data/tools";

const filters: Array<ToolCategory | "All"> = ["All", ...toolCategories];

export function ToolsSection({ tools }: { tools: Tool[] }) {
  const [active, setActive] = React.useState<(typeof filters)[number]>("All");

  const filtered = React.useMemo(
    () => (active === "All" ? tools : tools.filter((t) => t.category === active)),
    [active, tools]
  );

  return (
    <section id="tools" className="border-t border-border/70 py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-600 dark:text-accent-400">
            AI Tools
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tools worth trying
          </h2>
          <p className="mt-4 text-muted-foreground">
            A short, curated list of AI tools actually worth your time — no
            affiliate links, no filler.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                active === filter
                  ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="accent">{tool.category}</Badge>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </div>
                  <CardTitle className="pt-2">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{tool.pricingTier}</Badge>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            Nothing here yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
