import { NextRequest, NextResponse } from "next/server";

// Gatekeeper for /admin/* — a single shared password via HTTP Basic Auth.
// Not a real auth system: no sessions, no per-user accounts. That's
// intentional — this is a one-person admin view, not a multi-user product.
export function middleware(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return new NextResponse("Admin access is not configured.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice("Basic ".length));
    const password = decoded.slice(decoded.indexOf(":") + 1);
    if (password === adminPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
