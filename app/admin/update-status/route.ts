import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";

// Plain form POST handler (not a Server Action) so this works as a normal
// browser navigation under the /admin Basic Auth middleware — Server
// Actions' background fetch didn't reliably carry cached auth headers.
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

  return NextResponse.redirect(new URL("/admin/drafts", request.url), 303);
}
