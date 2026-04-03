import { NextResponse } from "next/server";

// Guest mode enabled: courses and lesson workspace are available without registration.
export function middleware() {
import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/courses", "/lessons", "/projects"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth = protectedPaths.some((path) => pathname.startsWith(path));
  const hasSession = Boolean(req.cookies.get("ai_learn_session")?.value);

  if (needsAuth && !hasSession) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: []
  matcher: ["/dashboard/:path*", "/courses/:path*", "/lessons/:path*", "/projects/:path*"]
};
