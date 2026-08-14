import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { posts as localPosts, type Post } from "@/data/posts";
import { notes as localNotes, type Note } from "@/data/notes";
import { tools as localTools, type Tool } from "@/data/tools";

/**
 * Fetches posts for the Archive section.
 * Uses Supabase when NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 * are set; otherwise falls back to the static data/posts.ts fixtures so the
 * site still works in local preview before Supabase is configured.
 */
export async function getPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured || !supabase) return localPosts;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data) {
    console.error("Failed to fetch posts from Supabase, using local fallback:", error);
    return localPosts;
  }

  return data.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    readTime: row.read_time,
    date: row.published_at,
    featured: row.featured,
    sourceUrl: row.source_url ?? undefined,
    sourceLabel: row.source_label ?? undefined,
  }));
}

/**
 * Fetches Notes for the short-form feed. Same fallback behavior as getPosts.
 */
export async function getNotes(): Promise<Note[]> {
  if (!isSupabaseConfigured || !supabase) return localNotes;

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error || !data) {
    console.error("Failed to fetch notes from Supabase, using local fallback:", error);
    return localNotes;
  }

  return data.map((row) => ({
    id: row.id,
    text: row.text,
    tag: row.tag,
    timestamp: relativeTime(row.created_at),
    sourceLabel: row.source_label ?? undefined,
    sourceHref: row.source_href ?? undefined,
  }));
}

/**
 * Fetches the AI Tools directory. Same fallback behavior as getPosts.
 */
export async function getTools(): Promise<Tool[]> {
  if (!isSupabaseConfigured || !supabase) return localTools;

  const { data, error } = await supabase.from("tools").select("*").order("name");

  if (error || !data) {
    console.error("Failed to fetch tools from Supabase, using local fallback:", error);
    return localTools;
  }

  return data.map((row) => ({
    name: row.name,
    description: row.description,
    url: row.url,
    category: row.category,
    pricingTier: row.pricing_tier,
  }));
}

/**
 * Fallback text for every editable site_content field — used when Supabase
 * isn't configured, the fetch fails, or a specific key is missing from the
 * table, so the site never breaks because of missing content.
 */
export const siteContentDefaults: Record<string, string> = {
  hero_headline: "AI news,\nwithout the noise.",
  hero_subheading:
    "Hi, I'm Chaz. I share real AI knowledge, keep you current on what's actually happening, and build genuinely useful free tools and prompts — because I love this stuff, and figured you might too.",
  about_bio:
    "Hey, I'm Chaz! By day, I'm a Senior Technology Analyst living and breathing enterprise HR technology — nearly a decade deep in Workday, and honestly, I love every minute of it. I've led two full Workday implementations from scratch (a company-wide HCM rollout and a multi-country Time & Absence deployment across the US, Canada, and Mexico), served as a compensation lead and security audit lead, and I'm usually the person my teams turn to when it's time to figure out how AI actually fits into HR. I've led AI adoption efforts for HR teams at multiple organizations, and I genuinely love that part of the job — there's nothing better than watching someone go from skeptical to sold once they see what AI can actually do for their day-to-day.\n\nBefore all this, I served in the U.S. Army as a Human Resources Specialist, which is where 'get it right, not just get it fast' became second nature. I've also spent a lot of my career training and mentoring people — SMEs, HR partners, new hires, you name it — because I genuinely like helping people understand systems that feel intimidating at first.\n\nThat's basically what Chaz Chats is: me doing the same thing, just for AI. Real information, checked before it goes out, explained the way I'd explain it to a coworker over coffee — no hype, just useful.",
  about_credential_1: "8+ years in enterprise HR technology",
  about_credential_2: "Led Workday HCM & Time and Absence implementations",
  about_credential_3: "Sources reviewed before every post",
  meta_description:
    "Real AI knowledge, the latest news, and genuinely useful tools and prompts — all free, written by Chaz in plain language, no hype.",
  newsletter_heading: "Get the AI rundown, weekly",
  newsletter_subtext:
    "No daily spam, no hype — just the news, research, and tools that actually mattered that week.",
};

/**
 * Fetches editable homepage/meta text. Same fallback behavior as getPosts:
 * uses local defaults when Supabase isn't configured, and fills in any
 * individual missing key with its default so a partial table never breaks
 * rendering.
 */
export async function getSiteContent(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured || !supabase) return { ...siteContentDefaults };

  const { data, error } = await supabase.from("site_content").select("key, value");

  if (error || !data) {
    console.error("Failed to fetch site content from Supabase, using defaults:", error);
    return { ...siteContentDefaults };
  }

  const merged = { ...siteContentDefaults };
  for (const row of data) {
    if (row.value) merged[row.key] = row.value;
  }
  return merged;
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
