import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (!path.startsWith("/authentication")) {
    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/widgets/:path*",
    "/app/:path*",
    "/forms/:path*",
    "/table/:path*",
    "/ui-kits/:path*",
    "/bonus-ui/:path*",
    "/icons/:path*",
    "/buttons/:path*",
    "/charts/:path*",
    "/editor/:path*",
    "/pages/sample-page",
    "/authentication/login",
  ],
};
