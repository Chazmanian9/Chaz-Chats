// Pulls fresh items from a fixed list of RSS feeds and inserts them into
// Supabase as DRAFTS — never published automatically. A human reviews and
// publishes from /admin/drafts. Run via `npm run fetch:posts` or
// `npm run fetch:notes`, or by the GitHub Actions workflows in
// .github/workflows/.
import Parser from "rss-parser";
import { createClient } from "@supabase/supabase-js";

const MODE = process.argv[2];
const MAX_ITEMS_PER_FEED = 5;

const FEEDS = {
  posts: [
    {
      url: "https://techcrunch.com/category/artificial-intelligence/feed/",
      label: "TechCrunch",
      category: "News",
    },
    {
      url: "https://venturebeat.com/category/ai/feed/",
      label: "VentureBeat",
      category: "News",
    },
    {
      url: "https://www.hrdive.com/feeds/news/",
      label: "HR Dive",
      category: "HCM & ERP",
    },
    {
      url: "https://news.sap.com/feed/",
      label: "SAP News Center",
      category: "HCM & ERP",
    },
  ],
  notes: [
    {
      url: "https://techcrunch.com/category/artificial-intelligence/feed/",
      label: "TechCrunch",
      tag: "News",
    },
    {
      url: "https://venturebeat.com/category/ai/feed/",
      label: "VentureBeat",
      tag: "News",
    },
    {
      url: "https://www.hrdive.com/feeds/news/",
      label: "HR Dive",
      tag: "HCM & ERP",
    },
    {
      url: "https://news.sap.com/feed/",
      label: "SAP News Center",
      tag: "HCM & ERP",
    },
  ],
};

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

async function main() {
  if (MODE !== "posts" && MODE !== "notes") {
    throw new Error(`Usage: node fetch-content.mjs <posts|notes>, got: ${MODE}`);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.");
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const parser = new Parser();

  let inserted = 0;
  let skipped = 0;

  for (const feed of FEEDS[MODE]) {
    let parsed;
    try {
      parsed = await parser.parseURL(feed.url);
    } catch (err) {
      console.error(`Failed to fetch feed ${feed.url}:`, err.message);
      continue;
    }

    const items = (parsed.items ?? []).slice(0, MAX_ITEMS_PER_FEED);

    for (const item of items) {
      if (!item.link || !item.title) continue;

      if (MODE === "posts") {
        const slug = slugify(item.title);

        const { data: existing } = await supabase
          .from("posts")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

        if (existing) {
          skipped++;
          continue;
        }

        const excerpt = (item.contentSnippet || item.summary || item.title).slice(0, 220);
        const publishedAt = item.isoDate
          ? item.isoDate.slice(0, 10)
          : new Date().toISOString().slice(0, 10);

        const { error } = await supabase.from("posts").insert({
          slug,
          title: item.title,
          excerpt,
          category: feed.category,
          read_time: "5 min read",
          published_at: publishedAt,
          source_url: item.link,
          source_label: feed.label,
          featured: false,
          status: "draft",
        });

        if (error) {
          console.error(`Insert failed for "${item.title}":`, error.message);
        } else {
          inserted++;
          console.log(`Draft post created: ${item.title}`);
        }
      }

      if (MODE === "notes") {
        const { data: existing } = await supabase
          .from("notes")
          .select("id")
          .eq("source_href", item.link)
          .maybeSingle();

        if (existing) {
          skipped++;
          continue;
        }

        const snippet = (item.contentSnippet || "").slice(0, 200);
        const text = (snippet ? `${item.title} — ${snippet}` : item.title).slice(0, 500);

        const { error } = await supabase.from("notes").insert({
          text,
          tag: feed.tag,
          source_label: feed.label,
          source_href: item.link,
          status: "draft",
        });

        if (error) {
          console.error(`Insert failed for "${item.title}":`, error.message);
        } else {
          inserted++;
          console.log(`Draft note created: ${item.title}`);
        }
      }
    }
  }

  console.log(`Done. ${inserted} new draft ${MODE} created, ${skipped} already existed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
