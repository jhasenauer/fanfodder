import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { NextRequest } from "next/server";
 
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const session = auth();
  console.log('Middleware - auth check for:', req.nextUrl.pathname);
  console.log(session == null ? 'No session' : 'Session exists: ' + JSON.stringify(session));

  if (!session && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  runtime: 'nodejs',
}