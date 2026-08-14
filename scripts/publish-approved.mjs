// Publishes anything you've approved from /admin/drafts. Run as an extra
// step in each scheduled fetch workflow, so approved content goes live on
// the next daily run even if you don't manually click Publish.
import { createClient } from "@supabase/supabase-js";

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.");
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  let failed = false;

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .update({ status: "published" })
    .eq("status", "approved")
    .select("id");

  if (postsError) {
    console.error("Failed to publish approved posts:", postsError.message);
    failed = true;
  } else {
    console.log(`Published ${posts?.length ?? 0} approved post(s).`);
  }

  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .update({ status: "published" })
    .eq("status", "approved")
    .select("id");

  if (notesError) {
    console.error("Failed to publish approved notes:", notesError.message);
    failed = true;
  } else {
    console.log(`Published ${notes?.length ?? 0} approved note(s).`);
  }

  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
