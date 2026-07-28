import { NextResponse } from "next/server";
import { ensureReviewSchema, hasDatabase, pool } from "../../../lib/db";
import {
  enforceSubmissionRateLimit,
  isCrossSiteSubmission
} from "../../../lib/submission-security";

type ReviewPayload = {
  nickname?: string;
  email?: string;
  rating?: number;
  review?: string;
  website?: string;
  launchUpdates?: boolean;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET() {
  if (!hasDatabase || !pool) {
    return NextResponse.json({
      configured: false,
      reviews: [],
      stats: { average: null, count: 0 }
    });
  }

  try {
    await ensureReviewSchema();
    const [reviewsResult, statsResult] = await Promise.all([
      pool.query(
        `SELECT id, nickname, rating, review, created_at
         FROM reviews
         WHERE status = 'approved'
         ORDER BY created_at DESC
         LIMIT 12`
      ),
      pool.query<{ average: string | null; count: number }>(
        `SELECT
           ROUND(AVG(rating)::numeric, 1)::text AS average,
           COUNT(*)::int AS count
         FROM reviews
         WHERE status = 'approved'`
      )
    ]);

    const stats = statsResult.rows[0];
    return NextResponse.json({
      configured: true,
      reviews: reviewsResult.rows,
      stats: {
        average: stats?.average ? Number(stats.average) : null,
        count: stats?.count ?? 0
      }
    });
  } catch {
    return NextResponse.json(
      { error: "Reviews are temporarily unavailable." },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  if (isCrossSiteSubmission(request)) {
    return NextResponse.json({ error: "Cross-site submissions are not allowed." }, { status: 403 });
  }

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
  const launchUpdates = payload.launchUpdates === true;

  if (cleanText(payload.website, 200)) {
    return NextResponse.json({ ok: true, pending: true }, { status: 202 });
  }

  if (!nickname || !review || !Number.isInteger(rating)) {
    return NextResponse.json({ error: "Nickname, rating, and review are required." }, { status: 400 });
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
  }

  if (launchUpdates && !isEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address to receive launch updates." },
      { status: 400 }
    );
  }

  if (!hasDatabase || !pool) {
    return NextResponse.json(
      {
        error: "Database is not configured yet. Add DATABASE_URL in Vercel or .env.local."
      },
      { status: 503 }
    );
  }

  try {
    await ensureReviewSchema();
    const allowed = await enforceSubmissionRateLimit({
      request,
      pool,
      namespace: "reviews",
      maxAttempts: 5,
      windowMinutes: 60
    });

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many reviews from this device. Please try again later." },
        { status: 429 }
      );
    }

    const { rows } = await pool.query(
      `INSERT INTO reviews (
         nickname, email, rating, review, marketing_opt_in, status
       )
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING id, created_at`,
      [nickname, launchUpdates ? email : "", rating, review, launchUpdates]
    );

    return NextResponse.json(
      { ok: true, pending: true, submission: rows[0] },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "The review could not be saved. Please try again later." },
      { status: 503 }
    );
  }
}
