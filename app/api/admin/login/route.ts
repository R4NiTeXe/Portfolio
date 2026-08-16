import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { RateLimit } from "@/lib/models/RateLimit";
import { setAdminCookie } from "@/lib/admin-auth";

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const IP_SALT = "r4nitexe-admin-login-2026";

const loginSchema = z.object({
  password: z.string().min(1).max(200),
});

function hashInput(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await connectToDatabase();

  const ip = getClientIp(request);
  const key = hashInput(`${ip}:${IP_SALT}`);
  const windowStart =
    Math.floor(Date.now() / LOGIN_WINDOW_MS) * LOGIN_WINDOW_MS;

  const rateDoc = await RateLimit.findOneAndUpdate(
    { key, windowStart },
    {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt: new Date(windowStart + LOGIN_WINDOW_MS) },
    },
    { upsert: true, returnDocument: "after" },
  );

  if (rateDoc.count > LOGIN_MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 },
    );
  }

  const expected = Buffer.from(process.env.ADMIN_PASSWORD ?? "");
  const actual = Buffer.from(parsed.data.password);

  const matches =
    expected.length > 0 &&
    expected.length === actual.length &&
    timingSafeEqual(expected, actual);

  if (!matches) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}