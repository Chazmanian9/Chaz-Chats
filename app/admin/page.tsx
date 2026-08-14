import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";
import { AdminTabs } from "@/components/admin/admin-tabs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — Chaz Chats",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-xl font-semibold">Admin</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Supabase isn&apos;t configured — check your environment variables.
        </p>
      </main>
    );
  }

  const postCols = "id, title, excerpt, category, source_label, source_url, status, created_at, discarded_at";
  const noteCols = "id, text, tag, source_label, source_href, status, created_at, discarded_at";

  const [
    { data: posts, error: postsError },
    { data: notes, error: notesError },
    { data: subscribers, error: subscribersError },
    { data: siteContent, error: siteContentError },
  ] = await Promise.all([
    supabaseAdmin.from("posts").select(postCols).order("created_at", { ascending: false }).limit(300),
    supabaseAdmin.from("notes").select(noteCols).order("created_at", { ascending: false }).limit(300),
    supabaseAdmin.from("subscribers").select("email, created_at").order("created_at", { ascending: false }),
    supabaseAdmin.from("site_content").select("key, label, value, updated_at").order("key"),
  ]);

  return (
    <AdminTabs
      initialPosts={posts ?? []}
      initialNotes={notes ?? []}
      subscribers={subscribers ?? []}
      initialSiteContent={siteContent ?? []}
      loadError={postsError?.message ?? notesError?.message ?? subscribersError?.message ?? null}
      contentLoadError={siteContentError?.message ?? null}
    />
  );
}
