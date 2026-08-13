-- Chaz Chats — Supabase schema
-- Run this once in your Supabase project's SQL Editor (Project → SQL Editor → New query).

-- ============ POSTS (Archive) ============
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  category text not null check (category in ('News', 'Deep Dive', 'Tool Watch', 'Opinion', 'HCM & ERP')),
  read_time text not null default '5 min read',
  published_at date not null default current_date,
  source_url text,
  source_label text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists posts_published_at_idx on posts (published_at desc);

-- ============ NOTES (short-form feed) ============
create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  tag text not null,
  source_label text,
  source_href text,
  created_at timestamptz not null default now()
);

create index if not exists notes_created_at_idx on notes (created_at desc);

-- ============ SUBSCRIBERS (newsletter signups) ============
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- ============ TOOLS (AI tools directory) ============
create table if not exists tools (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text not null,
  url text not null,
  category text not null check (category in ('Chat', 'Coding', 'Image & Video', 'Research')),
  pricing_tier text not null check (pricing_tier in ('Free', 'Freemium', 'Paid')),
  created_at timestamptz not null default now()
);

create index if not exists tools_category_idx on tools (category);

-- ============ Row Level Security ============
-- Posts, notes, and tools are public read-only content: anyone can read, nobody can write from the browser.
alter table posts enable row level security;
alter table notes enable row level security;
alter table tools enable row level security;
alter table subscribers enable row level security;

create policy "Public can read posts" on posts for select using (true);
create policy "Public can read notes" on notes for select using (true);
create policy "Public can read tools" on tools for select using (true);

-- Subscribers: no public read (protects your email list), inserts happen only through
-- the server-side API route using the service role key, which bypasses RLS entirely.
-- No insert/select policy is created for the anon role on purpose.

-- ============ Seed data (matches what's currently on the site) ============
insert into posts (slug, title, excerpt, category, read_time, published_at, source_url, source_label, featured) values
  ('context-engineering-explained', 'Context Engineering Is Eating Prompt Engineering', 'Three concrete techniques — retrieval scoping, memory windowing, and tool-call pruning — separate teams getting reliable outputs from teams still guessing.', 'Deep Dive', '8 min read', '2026-08-05', null, null, true),
  ('agent-frameworks-compared', 'Six Agent Frameworks, One Honest Comparison', 'I rebuilt the same three-step approval workflow in LangGraph, CrewAI, AutoGen, and three others — same task, same model, timed and scored.', 'Tool Watch', '11 min read', '2026-08-02', null, null, false),
  ('small-models-are-back', 'Small Models Are Back, and That''s the Real Story', 'While headlines chase frontier benchmarks, the real momentum is in 2–4B parameter models running on-device. Here''s why that matters more for most teams.', 'Opinion', '6 min read', '2026-07-29', null, null, false),
  ('workday-agent-passport', 'Workday Launches Agent Passport to Govern AI Agents at Scale', 'A new Workday tool tests and continuously monitors every AI agent in the enterprise against standards including the OWASP LLM Top 10, NIST AI RMF, and MITRE ATLAS — with Cisco on board as a launch partner.', 'HCM & ERP', '4 min read', '2026-08-06', 'https://newsroom.workday.com/press-releases', 'Workday Newsroom', false),
  ('workday-wd2026r2', 'Workday''s Next Bi-Annual Release (WD2026R2) Lands September 19', 'The second of Workday''s two yearly feature releases goes live this fall. The preview window open now is the moment to test before it hits production.', 'HCM & ERP', '5 min read', '2026-08-04', 'https://www.kainos.com/workday/workday-biannual-feature-release-overview', 'Kainos', false),
  ('sap-successfactors-1h-2026', 'SAP SuccessFactors'' 1H 2026 Release Leans Hard Into Suite-Wide AI', 'Production rollout landed May 15: agentic AI expands across the HR lifecycle, the latest People Profile becomes mandatory, and Joule AI gets deeper goal-drafting support.', 'HCM & ERP', '6 min read', '2026-07-30', 'https://news.sap.com/2026/04/sap-successfactors-1h-2026-release/', 'SAP News Center', false),
  ('dayforce-release-cadence', 'Inside Dayforce''s Release Cadence: Quarterly Drops, Updates Every 3 Weeks', 'Beyond the big quarterly releases, Dayforce ships smaller planned updates roughly every three weeks — plus emergency patches when something breaks.', 'HCM & ERP', '4 min read', '2026-07-26', 'https://help.dayforce.com/r/documents/Dayforce-2026-Product-Release-Schedule/Dayforce-Release-2026.2.1', 'Dayforce Help Portal', false),
  ('adp-q2-fy2026', 'ADP''s Q2 FY2026 Numbers Show Where HR Tech Spending Is Headed', 'ADP''s latest quarterly results, plus a base of 1.1 million clients across 140+ countries, offer a useful read on enterprise HR software demand right now.', 'HCM & ERP', '5 min read', '2026-07-22', 'https://investors.adp.com/news/news-details/2026/ADP-Reports-Second-Quarter-Fiscal-2026-Results/default.aspx', 'ADP Investor Relations', false),
  ('evals-nobody-talks-about', 'The Evals Nobody Talks About (But Should)', 'Benchmark season is noisy. These are the quieter tests that predict real-world reliability.', 'Deep Dive', '10 min read', '2026-07-15', null, null, false),
  ('hype-cycle-check-in', 'A Mid-Year Hype Cycle Check-In', 'Which predictions from January actually held up, and which quietly didn''t.', 'Opinion', '6 min read', '2026-07-03', null, null, false)
on conflict (slug) do nothing;

insert into tools (name, description, url, category, pricing_tier) values
  ('ChatGPT', 'OpenAI''s general-purpose AI assistant for writing, research, coding, and everyday questions.', 'https://chatgpt.com', 'Chat', 'Freemium'),
  ('Claude', 'Anthropic''s AI assistant, built for careful reasoning, long documents, and coding help.', 'https://claude.ai', 'Chat', 'Freemium'),
  ('GitHub Copilot', 'AI pair programmer that autocompletes code and chats inline across major IDEs.', 'https://github.com/features/copilot', 'Coding', 'Paid'),
  ('Cursor', 'A VS Code fork rebuilt around AI — natural-language edits, codebase-aware chat, and agent mode.', 'https://cursor.com', 'Coding', 'Freemium'),
  ('Midjourney', 'Generates high-quality images and video from text prompts, with an active community showcase.', 'https://www.midjourney.com', 'Image & Video', 'Paid'),
  ('Perplexity', 'An AI answer engine that searches the live web and cites its sources for every response.', 'https://www.perplexity.ai', 'Research', 'Freemium')
on conflict (name) do nothing;

insert into notes (text, tag, source_label, source_href, created_at) values
  ('The quiet trend this week: three separate labs shipped smaller, cheaper models instead of bigger ones. Efficiency is becoming the flex.', 'Trend', null, null, now() - interval '2 hours'),
  ('If you''re only benchmarking on reasoning tasks, you''re missing where most models actually fail in production: long-context consistency.', 'Take', null, null, now() - interval '6 hours'),
  ('New paper on agent memory architectures is worth your 10 minutes. Cleanest explanation of episodic vs. semantic memory I''ve seen.', 'Reading', 'Read the paper', '#', now() - interval '1 day'),
  ('Watching the pricing war between the major API providers closely. Cost-per-token dropped again this week — good news if you''re building.', 'News', null, null, now() - interval '1 day'),
  ('Hot take: most ''AI agent'' products right now are workflows with extra steps. Nothing wrong with that — just name it accurately.', 'Take', null, null, now() - interval '2 days'),
  ('Workday''s Agent Passport is the first serious attempt I''ve seen at governing AI agents against real standards (OWASP, NIST) instead of a vague ''trust us.''', 'HCM & ERP', 'Workday Newsroom', 'https://newsroom.workday.com/press-releases', now() - interval '3 days')
on conflict do nothing;
