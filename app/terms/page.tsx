import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions | Trees Hate You",
  description: "Terms and conditions for using treeshateyou.help — covering site usage, third-party game content, user feedback guidelines, and service availability.",
  alternates: { canonical: "https://treeshateyou.help/terms" }
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-main">
        <article className="legal-sheet">
          <p className="eyebrow">Legal</p>
          <h1>Terms &amp; Conditions</h1>
          <p className="legal-date">Last updated: July 15, 2026</p>

          <h2>Using this site</h2>
          <p>treeshateyou.help is a fan-made informational site. You may use it to view game-related information, access the embedded demo, and submit feedback, provided you do not interfere with the site or other visitors.</p>

          <h2>Game content and third parties</h2>
          <p>The game demo is hosted by a third-party service. Game content, trademarks, and related intellectual property belong to their respective owners. This site is not affiliated with Tykenn or the game&apos;s publisher.</p>

          <h2>Feedback</h2>
          <p>When you submit a rating, review, or message, please keep it lawful and respectful. We may remove content that is abusive, misleading, automated, or otherwise unsuitable for the site.</p>

          <h2>Availability</h2>
          <p>We try to keep the site available, but cannot guarantee uninterrupted access. The embedded game, advertising partners, analytics services, and other third-party features may change or become unavailable without notice.</p>

          <h2>Changes</h2>
          <p>These terms may be updated as the site evolves. Continuing to use the site after an update means you accept the revised terms.</p>

          <h2>Contact</h2>
          <p>Questions about these terms can be sent through the <a href="/contact">Contact page</a>.</p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
