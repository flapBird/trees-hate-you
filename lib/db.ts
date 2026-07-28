import { Pool } from "pg";

declare global {
  // Reuse the pool across hot reloads and serverless warm invocations.
  var treesHateYouPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

export const hasDatabase = Boolean(connectionString);

export const pool =
  globalThis.treesHateYouPool ??
  (connectionString
    ? new Pool({
        connectionString,
        ssl: connectionString.includes("sslmode=require")
          ? { rejectUnauthorized: false }
          : undefined
      })
    : undefined);

if (pool && process.env.NODE_ENV !== "production") {
  globalThis.treesHateYouPool = pool;
}

let schemaReady = false;

export async function ensureReviewSchema() {
  if (!pool || schemaReady) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id BIGSERIAL PRIMARY KEY,
      nickname TEXT NOT NULL,
      email TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      review TEXT NOT NULL,
      marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
      status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'rejected')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    ALTER TABLE reviews
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';
  `);

  await pool.query(`
    ALTER TABLE reviews
    ADD COLUMN IF NOT EXISTS marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE;
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS reviews_created_at_idx
    ON reviews (created_at DESC);
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS reviews_status_created_at_idx
    ON reviews (status, created_at DESC);
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'read', 'archived')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS contact_messages_status_created_at_idx
    ON contact_messages (status, created_at DESC);
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS submission_rate_limits (
      fingerprint TEXT PRIMARY KEY,
      window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      attempts INTEGER NOT NULL DEFAULT 1,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  schemaReady = true;
}
