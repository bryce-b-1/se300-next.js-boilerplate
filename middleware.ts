import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "./lib/auth/token";
import { cookies } from "next/headers";

export default async function middleware(request: NextRequest) {
  const token = (await cookies()).get("session")?.value;
  const session =  await verifySessionToken(token ?? "");
  // console.log("Token? -> " + token);
  // console.log("Session? -> " + session);
  const protectedRoutes = ["/dashboard"]
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && session == null){
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
