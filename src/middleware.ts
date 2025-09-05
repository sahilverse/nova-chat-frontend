import { NextRequest, NextResponse } from "next/server";



export function middleware(req: NextRequest) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token && !req.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/(protected)/:path*"],
};