# Trees Hate You

Next.js fan site for `treeshateyou.help`, with the original game embedded from `public/trees-hate-you.embed.html` and a PostgreSQL-backed review endpoint.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Database

Set `DATABASE_URL` in `.env.local` and in Vercel project environment variables:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

The API route `POST /api/reviews` creates the `reviews` table automatically if it does not exist. The schema is also available in `lib/schema.sql`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Add `DATABASE_URL` in Project Settings > Environment Variables.
4. Deploy.

## Game embed

The iframe source is in `app/home-page.tsx`:

```tsx
src="/trees-hate-you.embed.html"
```

Replace that path if the game HTML filename changes.
