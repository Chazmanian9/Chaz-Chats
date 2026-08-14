import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";

// Called via fetch() from components/admin/admin-tabs.tsx, under the
// /admin Basic Auth middleware.
export async function POST(request: Request) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const formData = await request.formData();
  const table = formData.get("table");
  const id = formData.get("id");
  const status = formData.get("status");

  if (
    (table !== "posts" && table !== "notes") ||
    typeof id !== "string" ||
    (status !== "published" && status !== "draft" && status !== "discarded")
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const update: Record<string, unknown> = { status };
  update.discarded_at = status === "discarded" ? new Date().toISOString() : null;

  const { error } = await supabaseAdmin.from(table).update(update).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // The homepage caches for 24h (see app/page.tsx's `revalidate`); without
  // this, a publish/discard/restore wouldn't show up live until that cache
  // naturally expired or a new deploy happened to force a fresh render.
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
