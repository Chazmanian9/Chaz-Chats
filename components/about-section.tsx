import { BadgeCheck, Newspaper, Users } from "lucide-react";

const credentials = [
  { icon: Newspaper, label: "150+ write-ups on AI shipped since 2024" },
  { icon: Users, label: "8.4k readers getting the weekly rundown" },
  { icon: BadgeCheck, label: "Sources checked before every News post" },
];

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border/70 py-20 sm:py-28">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-start">
          <div className="mx-auto flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563EB,#06B6D4)] font-display text-2xl font-semibold text-white md:mx-0">
            C
          </div>

          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-600 dark:text-accent-400">
              About
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Hi, I&apos;m Chaz.
            </h2>
            <p className="mt-4 text-muted-foreground">
              I read the papers, test the products, and sit through the
              livestreams so you don&apos;t have to. Chaz Chats exists to cut
              through AI hype and tell you plainly what changed, what it
              means, and whether it&apos;s actually worth your attention.
            </p>
            <p className="mt-4 text-muted-foreground">
              No live chat, no comment wars — just short daily Notes for the
              fast-moving stuff and longer Archive pieces when something
              deserves a real look.
            </p>

            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {credentials.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
