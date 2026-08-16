import { NextResponse } from "next/server";

const ADMIN_PATH_PREFIX = "/admin";
const SECRET_HEADER = "x-admin-secret";

function isAllowedIp(ip) {
  const allowlist = (process.env.ADMIN_IP_ALLOWLIST || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (allowlist.length === 0) return false;

  return allowlist.includes(ip);
}

function hasValidSecret(request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const candidate = request.headers.get(SECRET_HEADER);
  return typeof candidate === "string" && candidate === secret;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_PATH_PREFIX)) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("cs_admin_session")?.value;
  const hasSession = Boolean(sessionCookie);
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";
  const allowedIp = isAllowedIp(ip);
  const validSecret = hasValidSecret(request);

  if (hasSession || allowedIp || validSecret) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
