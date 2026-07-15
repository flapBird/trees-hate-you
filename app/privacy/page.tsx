import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy — Trees Hate You",
  description:
    "Privacy Policy for Trees Hate You. Learn how we handle your data, what cookies we use, and how third-party services like Google Analytics and advertising partners operate on this site.",
  alternates: {
    canonical: "https://treeshateyou.help/privacy"
  },
  openGraph: {
    title: "Privacy Policy — Trees Hate You",
    description: "How we handle your data when you play Trees Hate You online.",
    url: "https://treeshateyou.help/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-main">
        <section className="legal-sheet" aria-label="Privacy Policy">
          <h1>Privacy Policy</h1>
          <p style={{ color: "var(--muted)", marginBottom: "8px" }}>
            Last updated: June 11, 2026
          </p>

          <div className="story">
            <h2>1. Information We Collect</h2>
            <h3>1.1 Information You Provide</h3>
            <p>
              When you submit a review through our Rate It form, we collect:
            </p>
            <ul style={{ color: "var(--muted)", lineHeight: "1.8", paddingLeft: "1.2em" }}>
              <li>Your chosen nickname</li>
              <li>Your email address</li>
              <li>Your star rating (1–5)</li>
              <li>Your written review</li>
            </ul>
            <p>
              We use your email solely to notify you about the full Steam release of Trees Hate You.
              We never sell, rent, or share your personal information with third parties for their
              own marketing purposes.
            </p>

            <h3>1.2 Information Collected Automatically</h3>
            <p>
              When you visit treeshateyou.help, we use Google Analytics (via gtag.js) to collect
              anonymous usage data including:
            </p>
            <ul style={{ color: "var(--muted)", lineHeight: "1.8", paddingLeft: "1.2em" }}>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website or source</li>
              <li>Browser type, device type, and screen resolution</li>
              <li>General geographic location (country/city level)</li>
            </ul>
            <p>
              This data is anonymized and aggregated. It helps us understand how players
              discover and interact with the game.
            </p>

            <h2>2. Cookies</h2>
            <p>
              Google Analytics sets cookies in your browser to track session data and
              distinguish returning visitors. These are first-party analytics cookies and do not
              contain personally identifiable information.
            </p>
            <p>
              Our advertising partners may also set cookies for frequency capping, ad
              personalization, and performance measurement. You can manage or disable cookies
              through your browser settings at any time.
            </p>

            <h2>3. Third-Party Services</h2>
            <h3>3.1 Google Analytics</h3>
            <p>
              We use Google Analytics 4 (GA4) to measure site traffic and usage patterns.
              Google's privacy policy is available at{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--leaf)", textDecoration: "underline" }}>
                policies.google.com/privacy
              </a>.
            </p>

            <h3>3.2 Advertising</h3>
            <p>
              treeshateyou.help displays advertisements served by third-party ad networks.
              These networks may use cookies, web beacons, and similar technologies to serve
              relevant ads and measure their effectiveness. Your browser may send information
              such as your IP address and browser type to these networks.
            </p>

            <h3>3.3 Game Hosting</h3>
            <p>
              The Trees Hate You game demo is embedded from nealfun.app, an external hosting
              service. A preconnect hint is used for performance optimization. Their privacy
              practices are independent of ours.
            </p>

            <h2>4. Data Retention</h2>
            <p>
              Review submissions (nickname, email, rating, review) are stored in our database
              indefinitely unless you request deletion. Google Analytics data is retained
              according to Google's default data retention settings (currently 14 months for
              event-level data).
            </p>

            <h2>5. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul style={{ color: "var(--muted)", lineHeight: "1.8", paddingLeft: "1.2em" }}>
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p>
              To exercise any of these rights, contact us using the information below.
            </p>

            <h2>6. Children&apos;s Privacy</h2>
            <p>
              Trees Hate You is a general-audience game and website. We do not knowingly
              collect personal information from children under 13. If you believe a child
              has provided us with personal data, please contact us so we can delete it.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be posted on
              this page with an updated revision date.
            </p>

            <h2>8. Contact</h2>
            <p>
              For privacy-related inquiries, please visit our{" "}
              <a href="/contact" style={{ color: "var(--leaf)", textDecoration: "underline" }}>Contact page</a>{" "}
              or reach out to the developer through the contact form.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
