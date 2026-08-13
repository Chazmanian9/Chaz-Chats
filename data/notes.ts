export interface Note {
  id: string;
  text: string;
  tag: string;
  timestamp: string;
  sourceLabel?: string;
  sourceHref?: string;
}

export const notes: Note[] = [
  {
    id: "n1",
    text: "The quiet trend this week: three separate labs shipped smaller, cheaper models instead of bigger ones. Efficiency is becoming the flex.",
    tag: "Trend",
    timestamp: "2h ago",
  },
  {
    id: "n2",
    text: "If you're only benchmarking on reasoning tasks, you're missing where most models actually fail in production: long-context consistency.",
    tag: "Take",
    timestamp: "6h ago",
  },
  {
    id: "n3",
    text: "New paper on agent memory architectures is worth your 10 minutes. Cleanest explanation of episodic vs. semantic memory I've seen.",
    tag: "Reading",
    timestamp: "1d ago",
    sourceLabel: "Read the paper",
    sourceHref: "#",
  },
  {
    id: "n4",
    text: "Watching the pricing war between the major API providers closely. Cost-per-token dropped again this week — good news if you're building.",
    tag: "News",
    timestamp: "1d ago",
  },
  {
    id: "n5",
    text: "Hot take: most 'AI agent' products right now are workflows with extra steps. Nothing wrong with that — just name it accurately.",
    tag: "Take",
    timestamp: "2d ago",
  },
  {
    id: "n6",
    text: "Workday's Agent Passport is the first serious attempt I've seen at governing AI agents against real standards (OWASP, NIST) instead of a vague 'trust us.'",
    tag: "HCM & ERP",
    timestamp: "3d ago",
    sourceLabel: "Workday Newsroom",
    sourceHref: "https://newsroom.workday.com/press-releases",
  },
];
