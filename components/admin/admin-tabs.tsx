"use client";

import * as React from "react";

type PostRow = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  source_label: string | null;
  source_url: string | null;
  status: string;
  created_at: string;
  discarded_at: string | null;
};

type NoteRow = {
  id: string;
  text: string;
  tag: string;
  source_label: string | null;
  source_href: string | null;
  status: string;
  created_at: string;
  discarded_at: string | null;
};

type Subscriber = { email: string; created_at: string };

type Tab = "new" | "published" | "discarded" | "subscribers";

const TABS: Tab[] = ["new", "published", "discarded", "subscribers"];
const TAB_LABELS: Record<Tab, string> = {
  new: "New",
  published: "Published",
  discarded: "Discarded",
  subscribers: "Subscribers",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function AdminTabs({
  initialPosts,
  initialNotes,
  subscribers,
  loadError,
}: {
  initialPosts: PostRow[];
  initialNotes: NoteRow[];
  subscribers: Subscriber[];
  loadError: string | null;
}) {
  const [posts, setPosts] = React.useState(initialPosts);
  const [notes, setNotes] = React.useState(initialNotes);
  const [tab, setTab] = React.useState<Tab>("new");
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  async function updateStatus(
    table: "posts" | "notes",
    id: string,
    status: "published" | "draft" | "discarded"
  ) {
    const list = table === "posts" ? posts : notes;
    const setList = (table === "posts" ? setPosts : setNotes) as React.Dispatch<
      React.SetStateAction<(PostRow | NoteRow)[]>
    >;
    const prevItem = list.find((item) => item.id === id);
    if (!prevItem) return;

    setPendingId(id);
    const nextItem = {
      ...prevItem,
      status,
      discarded_at: status === "discarded" ? new Date().toISOString() : null,
    };
    setList((current) => current.map((item) => (item.id === id ? nextItem : item)));

    try {
      const formData = new FormData();
      formData.set("table", table);
      formData.set("id", id);
      formData.set("status", status);

      const res = await fetch("/admin/update-status", { method: "POST", body: formData });

      if (!res.ok) {
        const text = await res.text();
        alert(`Failed (${res.status}): ${text}`);
        setList((current) => current.map((item) => (item.id === id ? prevItem : item)));
      }
    } catch (err) {
      alert(`Network error: ${err instanceof Error ? err.message : String(err)}`);
      setList((current) => current.map((item) => (item.id === id ? prevItem : item)));
    } finally {
      setPendingId(null);
    }
  }

  const statusFilter =
    tab === "new" ? "draft" : tab === "published" ? "published" : tab === "discarded" ? "discarded" : null;

  const visiblePosts = statusFilter ? posts.filter((p) => p.status === statusFilter) : [];
  const visibleNotes = statusFilter ? notes.filter((n) => n.status === statusFilter) : [];

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-xl font-semibold">Admin</h1>

      <div className="mt-6 flex gap-1 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={
              "-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors " +
              (tab === t
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground")
            }
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {loadError && <p className="mt-4 text-sm text-red-600">Failed to load: {loadError}</p>}

      <div className="mt-8">
        {tab === "subscribers" ? (
          subscribers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No subscribers yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 font-medium">Email</th>
                  <th className="py-2 font-medium">Signed up</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr key={s.email} className="border-b border-border/70">
                    <td className="py-2">{s.email}</td>
                    <td className="py-2 font-mono text-xs text-muted-foreground">{formatDate(s.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : visiblePosts.length === 0 && visibleNotes.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing here.</p>
        ) : (
          <ul className="space-y-4">
            {visiblePosts.map((post) => (
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
                {tab === "new" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      disabled={pendingId === post.id}
                      onClick={() => updateStatus("posts", post.id, "published")}
                      className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-600 disabled:opacity-50"
                    >
                      Publish
                    </button>
                    <button
                      type="button"
                      disabled={pendingId === post.id}
                      onClick={() => updateStatus("posts", post.id, "discarded")}
                      className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground hover:border-red-400 hover:text-red-600 disabled:opacity-50"
                    >
                      Discard
                    </button>
                  </div>
                )}
                {tab === "discarded" && (
                  <button
                    type="button"
                    disabled={pendingId === post.id}
                    onClick={() => updateStatus("posts", post.id, "draft")}
                    className="mt-4 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-600 disabled:opacity-50"
                  >
                    Restore
                  </button>
                )}
                {tab === "published" && (
                  <p className="mt-3 text-xs text-muted-foreground">Published {formatDate(post.created_at)}</p>
                )}
              </li>
            ))}

            {visibleNotes.map((note) => (
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
                {tab === "new" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      disabled={pendingId === note.id}
                      onClick={() => updateStatus("notes", note.id, "published")}
                      className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-600 disabled:opacity-50"
                    >
                      Publish
                    </button>
                    <button
                      type="button"
                      disabled={pendingId === note.id}
                      onClick={() => updateStatus("notes", note.id, "discarded")}
                      className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground hover:border-red-400 hover:text-red-600 disabled:opacity-50"
                    >
                      Discard
                    </button>
                  </div>
                )}
                {tab === "discarded" && (
                  <button
                    type="button"
                    disabled={pendingId === note.id}
                    onClick={() => updateStatus("notes", note.id, "draft")}
                    className="mt-4 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-600 disabled:opacity-50"
                  >
                    Restore
                  </button>
                )}
                {tab === "published" && (
                  <p className="mt-3 text-xs text-muted-foreground">Published {formatDate(note.created_at)}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
