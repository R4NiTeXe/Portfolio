import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const COOKIE_SALT = "r4nitexe-admin-2026";
const SESSION_DAYS = 7;

export function adminCookieValue(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return "";
  return createHash("sha256").update(`${password}:${COOKIE_SALT}`).digest("hex");
}

export async function isAdminRequest(): Promise<boolean> {
  const expected = adminCookieValue();
  if (!expected) return false;

  const cookieStore = await cookies();
  const actual = cookieStore.get(COOKIE_NAME)?.value;

  if (!actual || actual.length !== expected.length) return false;

  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);
  return timingSafeEqual(expectedBuffer, actualBuffer);
}

export async function setAdminCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, adminCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * SESSION_DAYS,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}