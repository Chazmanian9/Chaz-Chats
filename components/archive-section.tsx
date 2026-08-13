"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { categories, type Post, type PostCategory } from "@/data/posts";

const filters: Array<PostCategory | "All"> = ["All", ...categories];

// Pin timeZone to UTC — post dates are stored as bare dates (e.g. "2026-08-05"),
// which parse as UTC midnight. Without this, a browser in almost any other
// timezone renders a different day than the server did, causing a hydration
// mismatch (this component runs on both sides since it's a Client Component).
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

export function ArchiveSection({ posts }: { posts: Post[] }) {
  const [active, setActive] = React.useState<(typeof filters)[number]>("All");

  const filtered = React.useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="archive" className="border-t border-border/70 py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent-600 dark:text-accent-400">
            Archive
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            The full write-ups
          </h2>
          <p className="mt-4 text-muted-foreground">
            Longer pieces on what&apos;s actually changing in AI and enterprise
            software — researched, fact-checked, and written to hold up past
            the news cycle.
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
          {filtered.map((post) => {
            const cardInner = (
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        post.category === "News" || post.category === "HCM & ERP"
                          ? "accent"
                          : "default"
                      }
                    >
                      {post.category}
                    </Badge>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </div>
                  <CardTitle className="pt-2">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                    <span>·</span>
                    <span>{formatDate(post.date)}</span>
                    {post.sourceLabel && (
                      <>
                        <span>·</span>
                        <span className="text-primary">{post.sourceLabel}</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );

            return post.sourceUrl ? (
              <a
                key={post.slug}
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {cardInner}
              </a>
            ) : (
              <Link key={post.slug} href={`#${post.slug}`} className="group block">
                {cardInner}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            Nothing here yet — check back soon.
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg">
            Load more
          </Button>
        </div>
      </div>
    </section>
  );
}
