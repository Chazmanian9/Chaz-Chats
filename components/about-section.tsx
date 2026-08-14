import { BadgeCheck, Briefcase, Workflow } from "lucide-react";

const credentialIcons = [Briefcase, Workflow, BadgeCheck];

export function AboutSection({
  bio,
  credentials,
}: {
  bio: string;
  credentials: string[];
}) {
  const paragraphs = bio.split("\n\n");

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
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="mt-4 text-muted-foreground">
                {paragraph}
              </p>
            ))}

            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {credentials.map((label, i) => {
                const Icon = credentialIcons[i] ?? BadgeCheck;
                return (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
