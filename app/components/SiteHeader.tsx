"use client";

import { useState } from "react";

const links = [
  { href: "/", label: "Play" },
  { href: "/#guide", label: "Guide" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Primary navigation">
        <a className="brand" href="/" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">THY</span>
          <span>Trees Hate You</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
        </button>
        <div className={open ? "nav-links nav-links-open" : "nav-links"}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="nav-play" href="/" onClick={() => setOpen(false)}>Play now</a>
        </div>
      </nav>
    </header>
  );
}
