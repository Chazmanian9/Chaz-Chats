import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";

// Called via fetch() from components/admin/admin-tabs.tsx, under the
// /admin Basic Auth middleware. Separate from update-status/route.ts —
// this only ever touches the site_content table, never posts/notes.
export async function POST(request: Request) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const formData = await request.formData();
  const key = formData.get("key");
  const value = formData.get("value");

  if (typeof key !== "string" || typeof value !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("site_content")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("key", key);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
