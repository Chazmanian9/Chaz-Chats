export type PostCategory = "News" | "Deep Dive" | "Tool Watch" | "Opinion" | "HCM & ERP";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  readTime: string;
  date: string;
  featured?: boolean;
  sourceUrl?: string;
  sourceLabel?: string;
}

export const categories: PostCategory[] = [
  "News",
  "Deep Dive",
  "Tool Watch",
  "Opinion",
  "HCM & ERP",
];

export const posts: Post[] = [
  {
    slug: "context-engineering-explained",
    title: "Context Engineering Is Eating Prompt Engineering",
    excerpt:
      "Three concrete techniques — retrieval scoping, memory windowing, and tool-call pruning — separate teams getting reliable outputs from teams still guessing.",
    category: "Deep Dive",
    readTime: "8 min read",
    date: "2026-08-05",
    featured: true,
  },
  {
    slug: "agent-frameworks-compared",
    title: "Six Agent Frameworks, One Honest Comparison",
    excerpt:
      "I rebuilt the same three-step approval workflow in LangGraph, CrewAI, AutoGen, and three others — same task, same model, timed and scored.",
    category: "Tool Watch",
    readTime: "11 min read",
    date: "2026-08-02",
  },
  {
    slug: "small-models-are-back",
    title: "Small Models Are Back, and That's the Real Story",
    excerpt:
      "While headlines chase frontier benchmarks, the real momentum is in 2–4B parameter models running on-device. Here's why that matters more for most teams.",
    category: "Opinion",
    readTime: "6 min read",
    date: "2026-07-29",
  },
  {
    slug: "workday-agent-passport",
    title: "Workday Launches Agent Passport to Govern AI Agents at Scale",
    excerpt:
      "A new Workday tool tests and continuously monitors every AI agent in the enterprise against standards including the OWASP LLM Top 10, NIST AI RMF, and MITRE ATLAS — with Cisco on board as a launch partner.",
    category: "HCM & ERP",
    readTime: "4 min read",
    date: "2026-08-06",
    sourceUrl: "https://newsroom.workday.com/press-releases",
    sourceLabel: "Workday Newsroom",
  },
  {
    slug: "workday-wd2026r2",
    title: "Workday's Next Bi-Annual Release (WD2026R2) Lands September 19",
    excerpt:
      "The second of Workday's two yearly feature releases goes live this fall. The preview window open now is the moment to test before it hits production.",
    category: "HCM & ERP",
    readTime: "5 min read",
    date: "2026-08-04",
    sourceUrl: "https://www.kainos.com/workday/workday-biannual-feature-release-overview",
    sourceLabel: "Kainos",
  },
  {
    slug: "sap-successfactors-1h-2026",
    title: "SAP SuccessFactors' 1H 2026 Release Leans Hard Into Suite-Wide AI",
    excerpt:
      "Production rollout landed May 15: agentic AI expands across the HR lifecycle, the latest People Profile becomes mandatory, and Joule AI gets deeper goal-drafting support.",
    category: "HCM & ERP",
    readTime: "6 min read",
    date: "2026-07-30",
    sourceUrl: "https://news.sap.com/2026/04/sap-successfactors-1h-2026-release/",
    sourceLabel: "SAP News Center",
  },
  {
    slug: "dayforce-release-cadence",
    title: "Inside Dayforce's Release Cadence: Quarterly Drops, Updates Every 3 Weeks",
    excerpt:
      "Beyond the big quarterly releases, Dayforce ships smaller planned updates roughly every three weeks — plus emergency patches when something breaks.",
    category: "HCM & ERP",
    readTime: "4 min read",
    date: "2026-07-26",
    sourceUrl: "https://help.dayforce.com/r/documents/Dayforce-2026-Product-Release-Schedule/Dayforce-Release-2026.2.1",
    sourceLabel: "Dayforce Help Portal",
  },
  {
    slug: "adp-q2-fy2026",
    title: "ADP's Q2 FY2026 Numbers Show Where HR Tech Spending Is Headed",
    excerpt:
      "ADP's latest quarterly results, plus a base of 1.1 million clients across 140+ countries, offer a useful read on enterprise HR software demand right now.",
    category: "HCM & ERP",
    readTime: "5 min read",
    date: "2026-07-22",
    sourceUrl: "https://investors.adp.com/news/news-details/2026/ADP-Reports-Second-Quarter-Fiscal-2026-Results/default.aspx",
    sourceLabel: "ADP Investor Relations",
  },
  {
    slug: "evals-nobody-talks-about",
    title: "The Evals Nobody Talks About (But Should)",
    excerpt:
      "Benchmark season is noisy. These are the quieter tests that predict real-world reliability.",
    category: "Deep Dive",
    readTime: "10 min read",
    date: "2026-07-15",
  },
  {
    slug: "hype-cycle-check-in",
    title: "A Mid-Year Hype Cycle Check-In",
    excerpt:
      "Which predictions from January actually held up, and which quietly didn't.",
    category: "Opinion",
    readTime: "6 min read",
    date: "2026-07-03",
  },
];
