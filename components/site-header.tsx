"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Notes", href: "#notes" },
  { label: "Prompts", href: "#prompts" },
  { label: "Tools", href: "#tools" },
  { label: "Archive", href: "#archive" },
  { label: "About", href: "#about" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="#top" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563EB,#06B6D4)] text-white">
            <MessageCircle className="h-4 w-4" />
          </span>
          Chaz Chats
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button size="sm" asChild>
            <Link href="#notes">Read the Notes</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/70 transition-[max-height] duration-300 ease-in-out md:hidden",
          open ? "max-h-64" : "max-h-0 border-t-0"
        )}
      >
        <nav className="container flex flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" className="mt-2 w-full" asChild>
            <Link href="#notes" onClick={() => setOpen(false)}>
              Read the Notes
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
