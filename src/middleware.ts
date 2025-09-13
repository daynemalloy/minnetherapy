import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Redirect to appropriate dashboard based on role
    if (path === "/" && token) {
      if (token.role === "PROVIDER") {
        return NextResponse.redirect(new URL("/provider/dashboard", req.url))
      } else if (token.role === "PATIENT") {
        return NextResponse.redirect(new URL("/patient/dashboard", req.url))
      }
    }

    // Protect provider routes
    if (path.startsWith("/provider") && token?.role !== "PROVIDER") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Protect patient routes
    if (path.startsWith("/patient") && token?.role !== "PATIENT") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Protect admin routes
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/patient/:path*",
    "/provider/:path*",
    "/admin/:path*",
    "/api/appointments/:path*",
    "/api/messages/:path*",
    "/api/providers/:path*",
  ],
}
