import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { NotesFeed } from "@/components/notes-feed";
import { PromptsSection } from "@/components/prompts-section";
import { ArchiveSection } from "@/components/archive-section";
import { AboutSection } from "@/components/about-section";
import { Newsletter } from "@/components/newsletter";
import { SiteFooter } from "@/components/site-footer";
import { getPosts, getNotes } from "@/lib/data";

// How often Next.js is allowed to re-fetch fresh data from Supabase and
// regenerate this page. 86400 = once a day. Lower it (e.g. 21600 = every
// 6 hours) if you want the site to feel more "live" once you're publishing
// more often. This only matters once Supabase is actually configured —
// without it, the site just uses the local fixtures every time.
export const revalidate = 86400;

export default async function Home() {
  const [posts, notes] = await Promise.all([getPosts(), getNotes()]);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <NotesFeed notes={notes} />
        <PromptsSection />
        <ArchiveSection posts={posts} />
        <AboutSection />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
