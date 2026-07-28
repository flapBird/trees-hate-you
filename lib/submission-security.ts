import { createHmac } from "crypto";
import type { Pool } from "pg";

function getClientFingerprint(request: Request, namespace: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const secret = process.env.RATE_LIMIT_SECRET || "trees-hate-you-rate-limit-v1";

  return createHmac("sha256", secret)
    .update(`${namespace}:${clientIp}:${userAgent}`)
    .digest("hex");
}

export function isCrossSiteSubmission(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") {
    return true;
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) {
    return false;
  }

  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export async function enforceSubmissionRateLimit({
  request,
  pool,
  namespace,
  maxAttempts,
  windowMinutes
}: {
  request: Request;
  pool: Pool;
  namespace: string;
  maxAttempts: number;
  windowMinutes: number;
}) {
  const fingerprint = getClientFingerprint(request, namespace);
  const { rows } = await pool.query<{ attempts: number }>(
    `INSERT INTO submission_rate_limits (
       fingerprint, window_started_at, attempts, updated_at
     )
     VALUES ($1, NOW(), 1, NOW())
     ON CONFLICT (fingerprint) DO UPDATE SET
       attempts = CASE
         WHEN submission_rate_limits.window_started_at
           < NOW() - ($2::double precision * INTERVAL '1 minute')
         THEN 1
         ELSE submission_rate_limits.attempts + 1
       END,
       window_started_at = CASE
         WHEN submission_rate_limits.window_started_at
           < NOW() - ($2::double precision * INTERVAL '1 minute')
         THEN NOW()
         ELSE submission_rate_limits.window_started_at
       END,
       updated_at = NOW()
     RETURNING attempts`,
    [fingerprint, windowMinutes]
  );

  return (rows[0]?.attempts ?? maxAttempts + 1) <= maxAttempts;
}
