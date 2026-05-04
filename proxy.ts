import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;

  // Handle Admin Auth
  if (pathname.startsWith("/admin")) {

    // Skip auth check for the login page itself
    if (pathname === "/admin/login") {
      if (token) {
        try {
          const secret = new TextEncoder().encode(process.env.JWT_SECRET);
          await jwtVerify(token, secret);
          return NextResponse.redirect(new URL("/admin", req.url));
        } catch (error) {
          return NextResponse.next();
        }
      }
      return NextResponse.next();
    }

    // Auth verification for all other admin routes
    if (!token) {
      const response = NextResponse.rewrite(new URL("/admin/login", req.url));
      response.headers.set("x-is-login", "true");
      return response;
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.rewrite(new URL("/admin/login", req.url));
      response.headers.set("x-is-login", "true");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
