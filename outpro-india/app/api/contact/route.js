import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import Lead from "@/lib/models/Lead";
import { sendLeadNotification } from "@/lib/mailer";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(120),
  email: z.string().email("Enter a valid email address"),
  company: z.string().max(160).optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a little more").max(4000),
});

// Very small in-memory rate limiter — replace with a durable store (Redis/Upstash)
// before relying on this in a multi-instance production deployment.
const rateLimitWindowMs = 60_000;
const rateLimitMax = 5;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip) || { count: 0, start: now };
  if (now - entry.start > rateLimitWindowMs) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  hits.set(ip, entry);
  return entry.count > rateLimitMax;
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || "Invalid input.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    await connectDB();
    const lead = await Lead.create(parsed.data);
    await sendLeadNotification(parsed.data);
    return NextResponse.json({ ok: true, id: lead._id }, { status: 201 });
  } catch (err) {
    console.error("[api/contact] error:", err);
    return NextResponse.json(
      { error: "We couldn't save your message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
