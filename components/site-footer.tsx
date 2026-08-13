import Link from "next/link";
import { Github, Linkedin, MessageCircle, Twitter } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Home", href: "#top" },
    { label: "Notes", href: "#notes" },
  { label: "Prompts", href: "#prompts" },
    { label: "Tools", href: "#tools" },
    { label: "Archive", href: "#archive" },
    { label: "About", href: "#about" },
  ],
  Topics: [
    { label: "News", href: "#archive" },
    { label: "Deep Dives", href: "#archive" },
    { label: "Tool Watch", href: "#archive" },
    { label: "Opinion", href: "#archive" },
    { label: "HCM & ERP", href: "#archive" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const socials = [
  { icon: Twitter, label: "X / Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="#top" className="flex items-center gap-2 font-display text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563EB,#06B6D4)] text-white">
                <MessageCircle className="h-4 w-4" />
              </span>
              Chaz Chats
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              AI news and analysis, tracked daily and written in plain
              language — by Chaz.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Chaz Chats. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS & shadcn/ui.
          </p>
        </div>
      </div>
    </footer>
  );
}
