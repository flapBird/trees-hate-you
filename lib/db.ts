import { Pool } from "pg";

declare global {
  // Reuse the pool across hot reloads and serverless warm invocations.
  // eslint-disable-next-line no-var
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
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS reviews_created_at_idx
    ON reviews (created_at DESC);
  `);

  schemaReady = true;
}
