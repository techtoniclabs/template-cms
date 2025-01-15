import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  const isAuthenticated = req.nextauth.token || null;
  console.log(req.nextauth.token);
  if (!isAuthenticated) {
    if (req.nextUrl.pathname.startsWith("/cms")) {
      return Response.redirect(new URL("/login", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/api/cms")) {
      return Response.json({ data: "Forbidden" }, { status: 403 });
    }
  }
});

export const config = { matcher: ["/cms:path*", "/api/cms:path*"] };
