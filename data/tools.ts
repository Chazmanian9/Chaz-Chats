export type ToolCategory = "Chat" | "Coding" | "Image & Video" | "Research";
export type PricingTier = "Free" | "Freemium" | "Paid";

export interface Tool {
  name: string;
  description: string;
  url: string;
  category: ToolCategory;
  pricingTier: PricingTier;
}

export const toolCategories: ToolCategory[] = [
  "Chat",
  "Coding",
  "Image & Video",
  "Research",
];

export const tools: Tool[] = [
  {
    name: "ChatGPT",
    description:
      "OpenAI's general-purpose AI assistant for writing, research, coding, and everyday questions.",
    url: "https://chatgpt.com",
    category: "Chat",
    pricingTier: "Freemium",
  },
  {
    name: "Claude",
    description:
      "Anthropic's AI assistant, built for careful reasoning, long documents, and coding help.",
    url: "https://claude.ai",
    category: "Chat",
    pricingTier: "Freemium",
  },
  {
    name: "GitHub Copilot",
    description:
      "AI pair programmer that autocompletes code and chats inline across major IDEs.",
    url: "https://github.com/features/copilot",
    category: "Coding",
    pricingTier: "Paid",
  },
  {
    name: "Cursor",
    description:
      "A VS Code fork rebuilt around AI — natural-language edits, codebase-aware chat, and agent mode.",
    url: "https://cursor.com",
    category: "Coding",
    pricingTier: "Freemium",
  },
  {
    name: "Midjourney",
    description:
      "Generates high-quality images and video from text prompts, with an active community showcase.",
    url: "https://www.midjourney.com",
    category: "Image & Video",
    pricingTier: "Paid",
  },
  {
    name: "Perplexity",
    description:
      "An AI answer engine that searches the live web and cites its sources for every response.",
    url: "https://www.perplexity.ai",
    category: "Research",
    pricingTier: "Freemium",
  },
];
