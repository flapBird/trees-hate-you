"use client";

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">THY</span>
            <span>Trees Hate You</span>
          </Link>
          <p>A small fan-made place to play, learn, and complain about suspicious trees.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/#play">Play</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 treeshateyou.help</span>
        <span>Fan site. Not affiliated with Tykenn.</span>
      </div>
    </footer>
  );
}
