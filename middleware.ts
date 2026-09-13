import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/admin/login";

  if (isAdminRoute) {
    if (isLoginPage) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", nextUrl));
      }
      return NextResponse.next();
    }

    if (!isLoggedIn) {
      const loginUrl = new URL("/admin/login", nextUrl);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
