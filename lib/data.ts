import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { posts as localPosts, type Post } from "@/data/posts";
import { notes as localNotes, type Note } from "@/data/notes";

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

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
