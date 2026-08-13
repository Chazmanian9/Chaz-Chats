import { revalidatePath } from "next/cache";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Drafts — Admin",
  robots: { index: false, follow: false },
};

async function publishPost(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!supabaseAdmin) return;
  await supabaseAdmin.from("posts").update({ status: "published" }).eq("id", id);
  revalidatePath("/admin/drafts");
  revalidatePath("/");
}

async function discardPost(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!supabaseAdmin) return;
  await supabaseAdmin.from("posts").delete().eq("id", id);
  revalidatePath("/admin/drafts");
}

async function publishNote(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!supabaseAdmin) return;
  await supabaseAdmin.from("notes").update({ status: "published" }).eq("id", id);
  revalidatePath("/admin/drafts");
  revalidatePath("/");
}

async function discardNote(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  if (!supabaseAdmin) return;
  await supabaseAdmin.from("notes").delete().eq("id", id);
  revalidatePath("/admin/drafts");
}

export default async function DraftsPage() {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-xl font-semibold">Drafts</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Supabase isn&apos;t configured — check your environment variables.
        </p>
      </main>
    );
  }

  const [{ data: draftPosts, error: postsError }, { data: draftNotes, error: notesError }] =
    await Promise.all([
      supabaseAdmin
        .from("posts")
        .select("id, title, excerpt, category, source_label, source_url, created_at")
        .eq("status", "draft")
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("notes")
        .select("id, text, tag, source_label, source_href, created_at")
        .eq("status", "draft")
        .order("created_at", { ascending: false }),
    ]);

  const posts = draftPosts ?? [];
  const notes = draftNotes ?? [];

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-xl font-semibold">Draft Posts ({posts.length})</h1>
      {postsError && (
        <p className="mt-4 text-sm text-red-600">Failed to load draft posts: {postsError.message}</p>
      )}
      {posts.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No draft posts waiting for review.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary-700 dark:text-primary-300">
                  {post.category}
                </span>
                {post.source_label && (
                  <span className="text-xs text-muted-foreground">{post.source_label}</span>
                )}
              </div>
              <h2 className="mt-3 font-display text-base font-semibold">{post.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
              {post.source_url && (
                <a
                  href={post.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-primary hover:underline"
                >
                  View source
                </a>
              )}
              <div className="mt-4 flex gap-2">
                <form action={publishPost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-600"
                  >
                    Publish
                  </button>
                </form>
                <form action={discardPost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground hover:border-red-400 hover:text-red-600"
                  >
                    Discard
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h1 className="mt-14 font-display text-xl font-semibold">Draft Notes ({notes.length})</h1>
      {notesError && (
        <p className="mt-4 text-sm text-red-600">Failed to load draft notes: {notesError.message}</p>
      )}
      {notes.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No draft notes waiting for review.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent-700 dark:text-accent-300">
                  {note.tag}
                </span>
                {note.source_label && (
                  <span className="text-xs text-muted-foreground">{note.source_label}</span>
                )}
              </div>
              <p className="mt-3 text-sm">{note.text}</p>
              {note.source_href && (
                <a
                  href={note.source_href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-primary hover:underline"
                >
                  View source
                </a>
              )}
              <div className="mt-4 flex gap-2">
                <form action={publishNote}>
                  <input type="hidden" name="id" value={note.id} />
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-600"
                  >
                    Publish
                  </button>
                </form>
                <form action={discardNote}>
                  <input type="hidden" name="id" value={note.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground hover:border-red-400 hover:text-red-600"
                  >
                    Discard
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
