import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center gap-6 px-6 py-4 text-sm font-medium">
          <span className="font-display text-base font-semibold">Admin</span>
          <Link href="/admin/drafts" className="text-muted-foreground hover:text-foreground">
            Drafts
          </Link>
          <Link href="/admin/subscribers" className="text-muted-foreground hover:text-foreground">
            Subscribers
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
