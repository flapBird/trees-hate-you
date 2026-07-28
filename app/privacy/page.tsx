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
            Last updated: July 28, 2026
          </p>

          <div className="story">
            <h2>1. Information We Collect</h2>
            <h3>1.1 Information You Provide</h3>
            <p>
              When you submit a review through our Rate It form, we collect:
            </p>
            <ul style={{ color: "var(--muted)", lineHeight: "1.8", paddingLeft: "1.2em" }}>
              <li>Your chosen nickname</li>
              <li>Your star rating (1–5)</li>
              <li>Your written review</li>
              <li>Your email address only if you explicitly opt in to launch updates</li>
            </ul>
            <p>
              Reviews enter a moderation queue before they can appear publicly. If you opt in, we
              use your email solely for a launch update. You can submit a review without providing
              an email address.
            </p>
            <p>
              When you use the Contact form, we collect your name, email address, and message so the
              fan-site team can review the request. Contact messages are stored separately from
              public reviews and are never published as player feedback.
            </p>

            <h3>1.2 Information Collected Automatically</h3>
            <p>
              If you select Accept all in the privacy choices panel, we use Google Analytics
              (via gtag.js) to collect aggregated usage data including:
            </p>
            <ul style={{ color: "var(--muted)", lineHeight: "1.8", paddingLeft: "1.2em" }}>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website or source</li>
              <li>Browser type, device type, and screen resolution</li>
              <li>General geographic location (country/city level)</li>
            </ul>
            <p>
              Analytics and advertising scripts do not load when you select Essential only.
            </p>

            <h2>2. Cookies</h2>
            <p>
              Essential site storage remembers your privacy choice. If you accept all, Google
              Analytics and our advertising partner may use cookies or similar storage to measure
              traffic, control ad frequency, and understand campaign performance.
            </p>
            <p id="choices">
              You can reopen the privacy choices panel at any time using the Privacy choices button
              in the footer. Changing from Accept all to Essential only reloads the page so optional
              scripts stop running.
            </p>

            <h2>3. Third-Party Services</h2>
            <h3>3.1 Google Analytics</h3>
            <p>
              With your consent, we use Google Analytics 4 (GA4) to measure site traffic and usage patterns.
              Google&apos;s privacy policy is available at{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--leaf)", textDecoration: "underline" }}>
                policies.google.com/privacy
              </a>.
            </p>

            <h3>3.2 Advertising</h3>
            <p>
              With your consent, treeshateyou.help displays advertisements served by a third-party ad network.
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
              Review submissions and contact messages are retained while they are needed for
              moderation, publication, support, abuse prevention, or legal obligations. Rejected
              reviews and resolved contact messages may be deleted during routine maintenance.
              Analytics retention is controlled in the Google Analytics property settings.
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
