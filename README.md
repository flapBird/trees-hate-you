# Trees Hate You — fan site and play hub

**[treeshateyou.help](https://treeshateyou.help)** is a fan-made informational and play hub for the viral rage-comedy platform game *Trees Hate You* by Tykenn. The site lets visitors play the free web demo, read a detailed game guide, and leave feedback — all wrapped in a clean, SEO-friendly, ad-supported Next.js application.

---

## What this site does

- Embeds the official **Trees Hate You** web demo (hosted on nealfun.app) with fullscreen support
- Provides a structured, long-form content layout covering what the game is, how to play, and who it's for
- Includes a game guide, quick-facts sidebar, first-run playbook, and audience notes
- Accepts player ratings and reviews via a form backed by a PostgreSQL database
- Serves legal pages: About, Contact, Privacy Policy, and Terms & Conditions
- Delivers a static `sitemap.xml` and `robots.txt` for search engine crawlers
- Displays native and banner advertisements through Adsterra and effectivecpmnetwork
- Uses proper SEO metadata (title, description, canonical, Open Graph) on every route

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Runtime | React 19 (client and server components) |
| Styling | Plain CSS (no framework) with responsive breakpoints at 768 px, 1200 px, and 1400 px |
| Database | PostgreSQL via `pg` (reviews storage) |
| Hosting | Vercel |
| Analytics | Google Analytics 4 (gtag) |
| Ads | Adsterra banners + effectivecpmnetwork native banners |

---

## Project structure

```
app/
├── layout.tsx                  # Root layout: metadata, scripts, ad sidebars
├── page.tsx                    # Entry point → renders HomePage
├── home-page.tsx              # Main landing page (client component)
├── globals.css                 # All styles
├── robots.ts                   # Dynamic robots.txt
├── about/page.tsx              # About page
├── contact/
│   ├── layout.tsx              # Contact metadata (canonical, title)
│   └── page.tsx               # Contact form (client component)
├── privacy/page.tsx            # Privacy Policy
├── terms/page.tsx              # Terms & Conditions
├── api/reviews/route.ts        # REST API: GET/POST reviews
├── components/
│   ├── SiteHeader.tsx          # Shared site header with navigation
│   ├── SiteFooter.tsx          # Shared site footer
│   ├── NativeBannerAd.tsx      # Native ad (script injection, client-only)
│   └── AdsterraBanner.tsx      # Adsterra iframe banner (client-only)
└── lib/db.ts                   # PostgreSQL pool + schema helper
scripts/
└── generate-sitemap.mjs        # Pre-build script: writes public/sitemap.xml
public/
├── favicon.svg / favicon-32.png / favicon-192.png
├── site.webmanifest
├── trees-hate-you-cover.jpg
└── sitemap.xml                 # Generated at build time
```

### Design decisions

**Server vs. client components.** The root `layout.tsx` and most legal pages are server components for fast static generation. The home page and contact form use `"use client"` because they need interactivity: game iframe handling, fullscreen API, star-rating hover state, and form submission.

**Ad rendering.** Two advertising slots appear as sticky sidebars on viewports ≥ 1400 px wide. The left sidebar holds a native banner from effectivecpmnetwork (loaded via script injection in a client component), while the right sidebar uses an Adsterra iframe. On smaller screens the sidebars are hidden and a horizontal Adsterra banner appears below the game panel.

**Review system.** Player reviews are submitted through a form on the home page and persisted to a PostgreSQL database via a Next.js Route Handler under `/api/reviews`. The schema is created lazily on first use (`CREATE TABLE IF NOT EXISTS`), so no manual migration step is needed. When `DATABASE_URL` is unset the endpoint returns a friendly `503` instead of crashing.

**SEO.** Every page exports explicit `title`, `description`, `canonical` and `openGraph` metadata. A static `sitemap.xml` is generated before each build and placed in `public/` so Vercel serves it directly from the edge without hitting a Serverless Function. A `robots.ts` file declares the sitemap location and allows all crawlers.

**No CSS framework.** All styling lives in a single `globals.css` file using CSS custom properties for the design token layer. This keeps the bundle lean and makes theme adjustments trivial — change a handful of `:root` variables and the entire site updates.

---

## Getting started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- PostgreSQL (optional — only required for the reviews feature)

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd trees-hate-you-site

# Install dependencies
npm install

# Set up environment (optional)
cp .env.example .env.local
# Edit .env.local to add your DATABASE_URL if you want review storage
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server supports hot reload.

### Build

```bash
npm run build   # Runs presitemap → next build
npm start       # Serves the production build
```

The `presitemap` script generates `public/sitemap.xml` before the Next.js build runs, ensuring the sitemap is always current.

### Lint

```bash
npm run lint
```

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | No | PostgreSQL connection string for storing player reviews. When absent the review API returns `503` gracefully. |

---

## Advertising partners

This site is monetized through two ad networks:

- **Adsterra** — 468 × 60 iframe banners below the game panel and in the right sidebar
- **effectivecpmnetwork** — native banner in the left sidebar, loaded via script injection with `data-cfasync="false"` for Cloudflare compatibility

Both integrations are isolated in their own client components to avoid hydration mismatches.

---

## Deployment

The site is deployed on [Vercel](https://vercel.com). Every push to `main` triggers a production build. The `presitemap` script runs automatically as part of `npm run build`, so `public/sitemap.xml` is regenerated on every deploy.

If you fork this project, update the following before deploying:
- `metadataBase` and all canonical URLs in `layout.tsx` and sub-page layouts
- Google Analytics measurement ID in `layout.tsx`
- Ad network keys in `AdsterraBanner.tsx` and `NativeBannerAd.tsx`
- `siteUrl` in `scripts/generate-sitemap.mjs`

---

## License

This is a fan-made informational site. Game content, the Trees Hate You name, and related trademarks belong to Tykenn. The site code is open for reference and learning.
