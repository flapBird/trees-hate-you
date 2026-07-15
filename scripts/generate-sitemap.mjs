import { writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const publicDir = resolve(__dirname, "../public");
const siteUrl = "https://treeshateyou.help";
const lastmod = new Date().toISOString();

const urls = [
  { loc: siteUrl, changefreq: "weekly", priority: 1 },
  { loc: `${siteUrl}/about`, changefreq: "monthly", priority: 0.8 },
  { loc: `${siteUrl}/contact`, changefreq: "monthly", priority: 0.5 },
  { loc: `${siteUrl}/privacy`, changefreq: "yearly", priority: 0.3 },
  { loc: `${siteUrl}/terms`, changefreq: "yearly", priority: 0.3 },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
for (const u of urls) {
  xml += `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>
`;
}
xml += `</urlset>
`;

writeFileSync(resolve(publicDir, "sitemap.xml"), xml, "utf-8");
console.log("✓ Generated public/sitemap.xml");
