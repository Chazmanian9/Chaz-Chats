# Chaz Chats — Marketing Site

Next.js (App Router) + Tailwind CSS + shadcn/ui-style components + Lucide icons.
Posts, Notes, and newsletter signups run on Supabase — with automatic
fallback to local mock data if Supabase isn't configured yet, so the site
always works.

## Getting started (local preview, no Supabase needed)

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without any env vars set, it runs entirely on
the fixtures in `data/posts.ts` and `data/notes.ts` — the newsletter form
will show a friendly "not connected yet" message instead of pretending to
work.

## Going live with real data + working signups (Supabase)

1. **Create a free Supabase project** at [supabase.com](https://supabase.com).
2. **Run the schema**: open your project → SQL Editor → New query → paste
   the contents of `supabase/schema.sql` → Run. This creates the `posts`,
   `notes`, and `subscribers` tables, sets up Row Level Security, and seeds
   it with everything currently on the site.
3. **Grab your keys**: Project Settings → API. You need the Project URL,
   the `anon` `public` key, and the `service_role` key.
4. **Set env vars**. Copy `.env.local.example` to `.env.local` for local dev,
   and add the same three values in Vercel under
   Project Settings → Environment Variables for production.
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — safe for the browser, read-only
   - `SUPABASE_SERVICE_ROLE_KEY` — **server-only secret**, never expose this
5. **Redeploy** (or restart `npm run dev` locally). Posts/Notes now come
   from Supabase, and the newsletter form actually writes to the
   `subscribers` table.

## Adding new content without touching code

Once Supabase is connected, add posts or notes straight from Supabase's
Table Editor (Project → Table Editor → posts / notes → Insert row). No
redeploy required for the data itself — the site re-checks for new content
on the schedule set by `revalidate` in `app/page.tsx` (defaults to once a
day; lower it to `21600` for every 6 hours, etc.).

## Structure

```
app/
  page.tsx              Server Component — fetches posts/notes, composes page
  api/subscribe/route.ts  Newsletter signup endpoint (writes to Supabase)
  layout.tsx             Root layout, fonts, theme provider
  globals.css             Theme tokens + Tailwind layers
components/
  site-header.tsx          Navbar with mobile menu + dark mode toggle
  hero-section.tsx          Hero with signature "chat console" mockup
  notes-feed.tsx             Short-form updates feed (takes `notes` prop)
  prompts-section.tsx         Copy-to-clipboard prompt library
  archive-section.tsx          Filterable long-form post grid (takes `posts` prop)
  about-section.tsx             Bio + credibility section
  newsletter.tsx                  Real email capture, posts to /api/subscribe
  site-footer.tsx                  Footer links + socials
  theme-toggle.tsx, theme-provider.tsx   next-themes wiring
  ui/                                     button, card, badge, input primitives
data/
  posts.ts, notes.ts, prompts.ts    Local fallback fixtures
lib/
  supabase.ts        Public (browser-safe) Supabase client
  supabase-admin.ts   Server-only privileged client (service role key)
  data.ts              getPosts() / getNotes() — Supabase with local fallback
  utils.ts               cn() class merge helper
supabase/
  schema.sql          Run once in Supabase's SQL editor to set everything up
```

## Design system

- Primary: `#2563EB` (Tech Blue)
- Accent: `#06B6D4` (Cyan)
- Background: `#F8FAFC` light / `#0F172A` dark
- Display font: Space Grotesk · Body: Inter · Mono/labels: IBM Plex Mono

## Next steps worth considering

- **Prompt Library** still reads from `data/prompts.ts` (not Supabase yet) —
  same pattern as posts/notes if you want it dynamic too.
- **Sending actual newsletter emails**: Supabase now owns your subscriber
  list, but sending campaigns is a separate step — export/sync to a sender
  like Beehiiv, ConvertKit, or Resend when you're ready to mail.
- **Individual post pages**: Archive cards without a `sourceUrl` currently
  link to `#slug` placeholders — build `app/archive/[slug]/page.tsx` when
  you're writing full-length original articles.
