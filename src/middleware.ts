export { auth as middleware } from "auth"
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"], // chỉ những route cần auth
};