export { auth as middleware } from "auth"
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"], // chỉ những route cần auth
};