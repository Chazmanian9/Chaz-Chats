import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// `isSupabaseConfigured` lets the rest of the app fall back to local mock
// data when Supabase env vars haven't been set yet (e.g. local preview
// before you've created a Supabase project).
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Safe to use in Server Components and the browser — this only ever uses
// the public anon key, which can only read what RLS policies allow
// (posts and notes are public-read; subscribers is not readable at all).
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
