import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { Message } from "@/lib/models/Message";
import { RateLimit } from "@/lib/models/RateLimit";
import { Resend } from "resend";
import { profile } from "@/lib/data/profile";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const IP_SALT = "r4nitexe-contact-2026";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(5000),
});

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

  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.length > 0
  ) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { name, email, subject, message } = parsed.data;

  await connectToDatabase();

  const ip = getClientIp(request);
  const key = createHash("sha256")
    .update(`${ip}:${IP_SALT}`)
    .digest("hex");
  const windowStart =
    Math.floor(Date.now() / RATE_LIMIT_WINDOW_MS) * RATE_LIMIT_WINDOW_MS;

  const rateDoc = await RateLimit.findOneAndUpdate(
    { key, windowStart },
    {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt: new Date(windowStart + RATE_LIMIT_WINDOW_MS) },
    },
    { upsert: true, returnDocument: "after" },
  );

  if (rateDoc.count > RATE_LIMIT_MAX) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  const record = await Message.create({ name, email, subject, message });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: profile.email,
        replyTo: email,
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      });
      if (error) throw error;
      record.status = "sent";
    } catch {
      record.status = "failed";
    }
    await record.save();
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}