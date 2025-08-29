import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(req: NextRequest) {
  // Read Supabase access token from cookie
  const accessToken = req.cookies.get("sb-access-token")?.value;

  // If no token, redirect to login
  if (!accessToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("message", "Please login first");
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // protect dashboard and nested routes
};
