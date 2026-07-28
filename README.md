# Trees Hate You — fan site and play hub

**[treeshateyou.help](https://treeshateyou.help)** is a fan-made informational and play hub for the viral rage-comedy platform game *Trees Hate You* by Tykenn. The site lets visitors play the free web demo, read a detailed game guide, and leave feedback — all wrapped in a clean, SEO-friendly, ad-supported Next.js application.

---

## What this site does

- Embeds the official **Trees Hate You** web demo (hosted on nealfun.app) with fullscreen support
- Provides a structured, long-form content layout covering what the game is, how to play, and who it's for
- Includes a game guide, quick-facts sidebar, first-run playbook, and audience notes
- Accepts moderated player ratings and reviews via a PostgreSQL database
- Stores contact messages separately from public reviews
- Uses consent-gated analytics and advertising with reversible privacy choices
- Serves legal pages: About, Contact, Privacy Policy, and Terms & Conditions
- Delivers dynamic `sitemap.xml` and `robots.txt` metadata routes for search engines
- Displays a consent-gated banner advertisement through Adsterra
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
| Ads | Consent-gated Adsterra banner |

---

## Project structure

```
app/
├── layout.tsx                  # Root layout: metadata and shared privacy services
├── page.tsx                    # Entry point → renders HomePage
├── home-page.tsx              # Main landing page (client component)
├── globals.css                 # All styles
├── robots.ts                   # Dynamic robots.txt
├── sitemap.ts                  # Dynamic sitemap.xml
├── about/page.tsx              # About page
├── contact/
│   ├── layout.tsx              # Contact metadata (canonical, title)
│   └── page.tsx               # Contact form (client component)
├── privacy/page.tsx            # Privacy Policy
├── terms/page.tsx              # Terms & Conditions
├── api/reviews/route.ts        # Approved reviews, statistics, and submissions
├── api/contact/route.ts        # Private contact-message submissions
├── components/
│   ├── SiteHeader.tsx          # Shared site header with navigation
│   ├── SiteFooter.tsx          # Shared site footer
│   ├── GoogleAnalytics.tsx     # Consent-gated GA4 loader
│   ├── PrivacyConsent.tsx      # Privacy-choice panel
│   └── AdsterraBanner.tsx      # Consent-gated banner ad
lib/
├── db.ts                       # PostgreSQL pool + schema helper
└── submission-security.ts      # Same-origin and database rate limiting
public/
├── favicon.svg / favicon-32.png / favicon-192.png
├── site.webmanifest
├── trees-hate-you-cover.jpg
└── og.png                      # 1200 × 630 social sharing card
```

 started

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
npm run build   # Runs the optimized Next.js production build
npm start       # Serves the production build
```

The sitemap is generated from `app/sitemap.ts`, so builds do not rewrite page
timestamps when the content has not changed.

### Lint

```bash
npm run lint
```

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | No | PostgreSQL connection string for reviews and contact messages. |
| `RATE_LIMIT_SECRET` | Recommended | Long random value used to hash abuse-prevention fingerprints. |

---

## Advertising partners

This site uses an Adsterra 468 × 60 banner below the game panel. The advertising
script and Google Analytics remain disabled until the visitor selects
**Accept all** in the privacy choices panel.

---

## Deployment

The site is deployed on [Vercel](https://vercel.com). Every push to `main`
triggers a production build. Next.js serves `robots.txt` and `sitemap.xml`
directly from metadata routes.

If you fork this project, update the following before deploying:
- `metadataBase` and all canonical URLs in `layout.tsx` and sub-page layouts
- Google Analytics measurement ID in `layout.tsx`
- The ad network key in `AdsterraBanner.tsx`
- The canonical site URL in `layout.tsx`, `robots.ts`, and `sitemap.ts`

---

## License

This is a fan-made informational site. Game content, the Trees Hate You name, and related trademarks belong to Tykenn. The site code is open for reference and learning.
