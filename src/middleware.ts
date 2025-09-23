import { NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "@/lib/routes";



export function middleware(req: NextRequest) {
    const token = req.cookies.get("refresh_token")?.value || null;

    const isHomePage = req.nextUrl.pathname === "/";
    const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname);
    const isAuthRoute = AUTH_ROUTES.includes(req.nextUrl.pathname);

    if (!token && !isPublicRoute && !isAuthRoute && !isHomePage) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|favicon.ico).*)"],
};