// Permanently deletes posts/notes that were discarded 30+ days ago.
// Run daily by .github/workflows/cleanup-discarded.yml.
import { createClient } from "@supabase/supabase-js";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.");
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const cutoff = new Date(Date.now() - THIRTY_DAYS_MS).toISOString();

  const { data: purgedPosts, error: postsError } = await supabase
    .from("posts")
    .delete()
    .eq("status", "discarded")
    .lt("discarded_at", cutoff)
    .select("id");

  if (postsError) {
    console.error("Failed to purge posts:", postsError.message);
  } else {
    console.log(`Purged ${purgedPosts?.length ?? 0} discarded post(s) older than 30 days.`);
  }

  const { data: purgedNotes, error: notesError } = await supabase
    .from("notes")
    .delete()
    .eq("status", "discarded")
    .lt("discarded_at", cutoff)
    .select("id");

  if (notesError) {
    console.error("Failed to purge notes:", notesError.message);
  } else {
    console.log(`Purged ${purgedNotes?.length ?? 0} discarded note(s) older than 30 days.`);
  }

  if (postsError || notesError) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
