import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Subscribers — Admin",
  robots: { index: false, follow: false },
};

export default async function SubscribersPage() {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-display text-xl font-semibold">Subscribers</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Supabase isn&apos;t configured — check your environment variables.
        </p>
      </main>
    );
  }

  const { data, error } = await supabaseAdmin
    .from("subscribers")
    .select("email, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-display text-xl font-semibold">Subscribers</h1>
        <p className="mt-4 text-sm text-red-600">
          Failed to load subscribers: {error.message}
        </p>
      </main>
    );
  }

  const subscribers = data ?? [];

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-xl font-semibold">
        Subscribers ({subscribers.length})
      </h1>

      {subscribers.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No subscribers yet.</p>
      ) : (
        <table className="mt-6 w-full text-left text-sm">
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
                <td className="py-2 font-mono text-xs text-muted-foreground">
                  {new Date(s.created_at).toISOString().slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
