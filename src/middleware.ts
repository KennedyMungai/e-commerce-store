import authConfig from "@/auth.config";
import NextAuth, { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {
  adminRoutePrefix,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_REDIRECT_ROUTE,
} from "@/routes";

export const { auth } = NextAuth(authConfig);

type NextAuthRequest = NextRequest & { auth: Session | null };

export default auth((request: NextAuthRequest) => {
  const { auth, nextUrl } = request;

  const isLoggedIn = !!auth?.user;
  const isAdmin = auth?.user?.role === "admin" || "superadmin";
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutePrefix);
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn)
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));

    return;
  }

  if (isLoggedIn && !isAdmin && !isAdminRoute)
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));

  if (!isLoggedIn && !isAuthRoute)
    return NextResponse.redirect(new URL("/signin", nextUrl));

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};