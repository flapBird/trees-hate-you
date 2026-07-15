export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="brand" href="/#play">
            <span className="brand-mark" aria-hidden="true">THY</span>
            <span>Trees Hate You</span>
          </a>
          <p>A small fan-made place to play, learn, and complain about suspicious trees.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/#play">Play</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Conditions</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 treeshateyou.help</span>
        <span>Fan site. Not affiliated with Tykenn.</span>
      </div>
    </footer>
  );
}
