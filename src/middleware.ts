import { auth } from "auth";
import { NextResponse } from "next/server";

export default async function middleware(req: any) {
    const url = req.nextUrl;

    if (url.pathname.startsWith("/course/") && url.pathname.includes("/learn")) {
        return auth(req); // Bắt buộc auth khi có /learn
    }

    // Cho qua nếu không phải /learn
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/course/:path*",
        "/cart/:path*",
        "/admin/:path*",
        "/profile/:path*",
        "/home/:path*",
        "/instructor/:path*",
        "/message/:path*",
        "/transaction-history/:path*",
    ],// chỉ những route cần auth
};
