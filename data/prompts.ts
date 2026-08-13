export interface Prompt {
  id: string;
  title: string;
  category: string;
  text: string;
}

export const prompts: Prompt[] = [
  {
    id: "pr1",
    title: "Turn messy notes into a clear summary",
    category: "Productivity",
    text: "Summarize the following notes into 3 sections: Key Decisions, Open Questions, and Next Steps. Keep each section to 3 bullet points max, plain language, no jargon.\n\nNotes:\n[paste your notes here]",
  },
  {
    id: "pr2",
    title: "Explain a concept at three levels",
    category: "Learning",
    text: "Explain [topic] three times: once for a 10-year-old, once for a smart high schooler, and once for a graduate student in the field. Keep each explanation under 100 words.",
  },
  {
    id: "pr3",
    title: "Code review with reasoning, not just fixes",
    category: "Coding",
    text: "Review this code for bugs, readability, and performance. For each issue, explain WHY it's a problem before suggesting a fix. Rank issues by severity (critical / moderate / minor).\n\nCode:\n[paste your code here]",
  },
  {
    id: "pr4",
    title: "Stress-test an idea before you commit",
    category: "Thinking",
    text: "I'm considering this plan: [describe your plan]. Play devil's advocate — give me the 3 strongest reasons this could fail, then 3 ways to de-risk each one.",
  },
  {
    id: "pr5",
    title: "Turn a rough draft into a tight first pass",
    category: "Writing",
    text: "Tighten this draft: cut anything redundant, shorten sentences over 25 words, and flag (don't remove) any claims that need a source. Keep my voice and tone.\n\nDraft:\n[paste your draft here]",
  },
  {
    id: "pr6",
    title: "Get a second opinion on a decision",
    category: "Thinking",
    text: "Here's a decision I'm weighing: [describe the decision and options]. Lay out the tradeoffs as a simple table, then tell me what you'd want to know before choosing if you were me.",
  },
];
