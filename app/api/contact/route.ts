import { NextResponse } from "next/server";
import { ensureReviewSchema, hasDatabase, pool } from "../../../lib/db";
import {
  enforceSubmissionRateLimit,
  isCrossSiteSubmission
} from "../../../lib/submission-security";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (isCrossSiteSubmission(request)) {
    return NextResponse.json({ error: "Cross-site submissions are not allowed." }, { status: 403 });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (cleanText(payload.website, 200)) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const name = cleanText(payload.name, 48);
  const email = cleanText(payload.email, 160);
  const message = cleanText(payload.message, 1200);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!hasDatabase || !pool) {
    return NextResponse.json(
      { error: "Messages are temporarily unavailable." },
      { status: 503 }
    );
  }

  try {
    await ensureReviewSchema();
    const allowed = await enforceSubmissionRateLimit({
      request,
      pool,
      namespace: "contact",
      maxAttempts: 3,
      windowMinutes: 60
    });

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many messages from this device. Please try again later." },
        { status: 429 }
      );
    }

    await pool.query(
      `INSERT INTO contact_messages (name, email, message, status)
       VALUES ($1, $2, $3, 'new')`,
      [name, email, message]
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "The message could not be saved. Please try again later." },
      { status: 503 }
    );
  }
}
