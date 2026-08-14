"use client";

import * as React from "react";

export function StatusButton({
  table,
  id,
  status,
  label,
  tone = "default",
}: {
  table: "posts" | "notes";
  id: string;
  status: "published" | "draft" | "approved" | "discarded";
  label: string;
  tone?: "default" | "danger";
}) {
  const [pending, setPending] = React.useState(false);

  async function handleClick() {
    setPending(true);
    try {
      const formData = new FormData();
      formData.set("table", table);
      formData.set("id", id);
      formData.set("status", status);

      const res = await fetch("/admin/update-status", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        alert(`Failed (${res.status}): ${text}`);
        return;
      }

      window.location.reload();
    } catch (err) {
      alert(`Network error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={
        tone === "danger"
          ? "rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground hover:border-red-400 hover:text-red-600 disabled:opacity-50"
          : "rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-600 disabled:opacity-50"
      }
    >
      {pending ? "…" : label}
    </button>
  );
}
