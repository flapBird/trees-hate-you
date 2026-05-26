import { NextResponse } from "next/server";
import { ensureReviewSchema, hasDatabase, pool } from "../../../lib/db";

type ReviewPayload = {
  nickname?: string;
  email?: string;
  rating?: number;
  review?: string;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET() {
  if (!hasDatabase || !pool) {
    return NextResponse.json({ configured: false, reviews: [] });
  }

  await ensureReviewSchema();
  const { rows } = await pool.query(
    `SELECT id, nickname, rating, review, created_at
     FROM reviews
     ORDER BY created_at DESC
     LIMIT 12`
  );

  return NextResponse.json({ configured: true, reviews: rows });
}

export async function POST(request: Request) {
  let payload: ReviewPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const nickname = cleanText(payload.nickname, 48);
  const email = cleanText(payload.email, 160);
  const review = cleanText(payload.review, 600);
  const rating = Number(payload.rating);

  if (!nickname || !email || !review || !Number.isInteger(rating)) {
    return NextResponse.json({ error: "Nickname, email, rating, and review are required." }, { status: 400 });
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!hasDatabase || !pool) {
    return NextResponse.json(
      {
        error: "Database is not configured yet. Add DATABASE_URL in Vercel or .env.local."
      },
      { status: 503 }
    );
  }

  await ensureReviewSchema();
  const { rows } = await pool.query(
    `INSERT INTO reviews (nickname, email, rating, review)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nickname, rating, review, created_at`,
    [nickname, email, rating, review]
  );

  return NextResponse.json({ ok: true, review: rows[0] }, { status: 201 });
}
