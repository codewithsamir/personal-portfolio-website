import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function isValidToken(token?: string) {
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// API calls anyone may make without being logged in
function isPublicApi(pathname: string, method: string) {
  if (pathname.startsWith("/api/admin/login") || pathname.startsWith("/api/admin/logout")) return true;
  if (pathname === "/api/contact" && method === "POST") return true;

  // Read-only content is public, except private data and the seeding endpoint
  const privateReads = ["/api/messages", "/api/seed"];
  if (method === "GET" && !privateReads.some((p) => pathname.startsWith(p))) return true;

  return false;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;

  // Protect API routes that change data or expose private data
  if (pathname.startsWith("/api")) {
    if (isPublicApi(pathname, req.method) || (await isValidToken(token))) {
      return NextResponse.next();
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Handle Admin Auth
  if (pathname.startsWith("/admin")) {

    // Skip auth check for the login page itself
    if (pathname === "/admin/login") {
      if (await isValidToken(token)) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    // Auth verification for all other admin routes
    if (!(await isValidToken(token))) {
      const response = NextResponse.rewrite(new URL("/admin/login", req.url));
      response.headers.set("x-is-login", "true");
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
