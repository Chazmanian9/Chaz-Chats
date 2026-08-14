import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";
import { StatusButton } from "@/components/admin/status-button";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Drafts — Admin",
  robots: { index: false, follow: false },
};

const PUBLISHED_LIMIT = 20;
const DISCARDED_LIMIT = 30;

function daysLeft(discardedAt: string) {
  const purgeAt = new Date(discardedAt).getTime() + 30 * 24 * 60 * 60 * 1000;
  const days = Math.ceil((purgeAt - Date.now()) / (24 * 60 * 60 * 1000));
  return Math.max(days, 0);
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

  const postCols = "id, title, excerpt, category, source_label, source_url, created_at, discarded_at";
  const noteCols = "id, text, tag, source_label, source_href, created_at, discarded_at";

  const [
    { data: draftPosts, error: draftPostsError },
    { data: draftNotes, error: draftNotesError },
    { data: publishedPosts },
    { data: publishedNotes },
    { data: discardedPosts },
    { data: discardedNotes },
  ] = await Promise.all([
    supabaseAdmin.from("posts").select(postCols).eq("status", "draft").order("created_at", { ascending: false }),
    supabaseAdmin.from("notes").select(noteCols).eq("status", "draft").order("created_at", { ascending: false }),
    supabaseAdmin
      .from("posts")
      .select(postCols)
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(PUBLISHED_LIMIT),
    supabaseAdmin
      .from("notes")
      .select(noteCols)
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(PUBLISHED_LIMIT),
    supabaseAdmin
      .from("posts")
      .select(postCols)
      .eq("status", "discarded")
      .order("discarded_at", { ascending: false })
      .limit(DISCARDED_LIMIT),
    supabaseAdmin
      .from("notes")
      .select(noteCols)
      .eq("status", "discarded")
      .order("discarded_at", { ascending: false })
      .limit(DISCARDED_LIMIT),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <section>
        <h1 className="font-display text-xl font-semibold">
          Draft Posts ({draftPosts?.length ?? 0})
        </h1>
        {draftPostsError && (
          <p className="mt-4 text-sm text-red-600">Failed to load: {draftPostsError.message}</p>
        )}
        {!draftPosts?.length ? (
          <p className="mt-4 text-sm text-muted-foreground">No draft posts waiting for review.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {draftPosts.map((post) => (
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
                  <StatusButton table="posts" id={post.id} status="published" label="Publish" />
                  <StatusButton table="posts" id={post.id} status="discarded" label="Discard" tone="danger" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-14">
        <h1 className="font-display text-xl font-semibold">
          Draft Notes ({draftNotes?.length ?? 0})
        </h1>
        {draftNotesError && (
          <p className="mt-4 text-sm text-red-600">Failed to load: {draftNotesError.message}</p>
        )}
        {!draftNotes?.length ? (
          <p className="mt-4 text-sm text-muted-foreground">No draft notes waiting for review.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {draftNotes.map((note) => (
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
                  <StatusButton table="notes" id={note.id} status="published" label="Publish" />
                  <StatusButton table="notes" id={note.id} status="discarded" label="Discard" tone="danger" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-14">
        <h1 className="font-display text-xl font-semibold">
          Recently Published (posts: {publishedPosts?.length ?? 0}, notes: {publishedNotes?.length ?? 0})
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">Showing the {PUBLISHED_LIMIT} most recent of each — read-only.</p>
        <ul className="mt-6 space-y-2">
          {(publishedPosts ?? []).map((post) => (
            <li key={post.id} className="rounded-xl border border-border/70 bg-card px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">[Post]</span> {post.title}
            </li>
          ))}
          {(publishedNotes ?? []).map((note) => (
            <li key={note.id} className="rounded-xl border border-border/70 bg-card px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">[Note]</span> {note.text}
            </li>
          ))}
          {!publishedPosts?.length && !publishedNotes?.length && (
            <p className="text-sm text-muted-foreground">Nothing published yet.</p>
          )}
        </ul>
      </section>

      <section className="mt-14">
        <h1 className="font-display text-xl font-semibold">
          Discarded (posts: {discardedPosts?.length ?? 0}, notes: {discardedNotes?.length ?? 0})
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Permanently deleted 30 days after discarding — restore before then if you change your mind.
        </p>
        {!discardedPosts?.length && !discardedNotes?.length ? (
          <p className="mt-4 text-sm text-muted-foreground">Nothing in the trash.</p>
        ) : (
          <ul className="mt-6 space-y-3">
            {(discardedPosts ?? []).map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 text-sm"
              >
                <div>
                  <span className="text-muted-foreground">[Post]</span> {post.title}
                  {post.discarded_at && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      purges in {daysLeft(post.discarded_at)}d
                    </span>
                  )}
                </div>
                <StatusButton table="posts" id={post.id} status="draft" label="Restore" />
              </li>
            ))}
            {(discardedNotes ?? []).map((note) => (
              <li
                key={note.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 text-sm"
              >
                <div>
                  <span className="text-muted-foreground">[Note]</span> {note.text}
                  {note.discarded_at && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      purges in {daysLeft(note.discarded_at)}d
                    </span>
                  )}
                </div>
                <StatusButton table="notes" id={note.id} status="draft" label="Restore" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
