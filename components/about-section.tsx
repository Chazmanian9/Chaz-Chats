import { BadgeCheck, Briefcase, Workflow } from "lucide-react";

const credentials = [
  { icon: Briefcase, label: "8+ years in enterprise HR technology" },
  { icon: Workflow, label: "Led Workday HCM & Time and Absence implementations" },
  { icon: BadgeCheck, label: "Sources reviewed before every post" },
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
              Hey, I&apos;m Chaz! By day, I&apos;m a Senior Technology Analyst
              living and breathing enterprise HR technology — nearly a decade
              deep in Workday, and honestly, I love every minute of it.
              I&apos;ve led two full Workday implementations from scratch (a
              company-wide HCM rollout and a multi-country Time &amp; Absence
              deployment across the US, Canada, and Mexico), served as a
              compensation lead and security audit lead, and I&apos;m usually
              the person my teams turn to when it&apos;s time to figure out
              how AI actually fits into HR. I&apos;ve led AI adoption efforts
              for HR teams at multiple organizations, and I genuinely love
              that part of the job — there&apos;s nothing better than
              watching someone go from skeptical to sold once they see what
              AI can actually do for their day-to-day.
            </p>
            <p className="mt-4 text-muted-foreground">
              Before all this, I served in the U.S. Army as a Human Resources
              Specialist, which is where &apos;get it right, not just get it
              fast&apos; became second nature. I&apos;ve also spent a lot of
              my career training and mentoring people — SMEs, HR partners,
              new hires, you name it — because I genuinely like helping
              people understand systems that feel intimidating at first.
            </p>
            <p className="mt-4 text-muted-foreground">
              That&apos;s basically what Chaz Chats is: me doing the same
              thing, just for AI. Real information, checked before it goes
              out, explained the way I&apos;d explain it to a coworker over
              coffee — no hype, just useful.
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
