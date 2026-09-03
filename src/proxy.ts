import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isLandingPage = pathname === "/";
  const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/tools") || pathname.startsWith("/tool") || pathname.startsWith("/agents") || pathname.startsWith("/agent");

  if (isLandingPage) {
    return NextResponse.next();
  }

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\.).*)"],
};
