import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { validateSecretId } from "./libs/utils";

export function middleware(request: NextRequest) {
  // The secret can only be revealed exactly once.
  // Prevent secret being fetched on HEAD requests.
  if (
    (request.nextUrl.pathname.startsWith("/get/") ||
      request.nextUrl.pathname.startsWith("/g/")) &&
    request.method === "HEAD"
  ) {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  // Validate secret ID for both long and short routes
  if (
    request.nextUrl.pathname.startsWith("/get/") ||
    request.nextUrl.pathname.startsWith("/share/") ||
    request.nextUrl.pathname.startsWith("/g/") ||
    request.nextUrl.pathname.startsWith("/s/")
  ) {
    const match = request.nextUrl.pathname.match(
      /^\/(share|get|s|g)\/(sp-[a-zA-Z1-9]+)/
    );
    const id = match ? match[2] : null;
    if (!id || !validateSecretId(id)) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}
