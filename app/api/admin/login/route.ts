import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password === process.env.ADMIN_PASSWORD) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(secret);

      const response = NextResponse.json({ message: "Logged in successfully" });
      
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
