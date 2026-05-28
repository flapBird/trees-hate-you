"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const ratingMessages: Record<number, string> = {
  1: "The trees win. As always.",
  2: "You tried. The trees tried harder.",
  3: "A fair fight. (The trees cheated.)",
  4: "Respect. You survived... twice.",
  5: "LEGEND. The trees fear you now. 🌲😤"
};

const seededReviews = [
  {
    initial: "B",
    name: "BarkVictim",
    stars: 5,
    text: "I got shot by a bonsai. 5 stars.",
    time: "2 days ago",
    tone: "red"
  },
  {
    initial: "N",
    name: "NatureIsOver",
    stars: 5,
    text: "This game gave me trust issues with nature.",
    time: "1 week ago",
    tone: "green"
  },
  {
    initial: "R",
    name: "RetryRon",
    stars: 4,
    text: "My therapist says I need to stop. One more run.",
    time: "3 weeks ago",
    tone: "yellow"
  },
  {
    initial: "T",
    name: "TrunkJustice",
    stars: 5,
    text: "The tree with the gun should be illegal. 10/10.",
    time: "last month",
    tone: "blue"
  }
];

export default function HomePage() {
  const gameWrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("Ready when your pride is.");

  const ratingFeedback = useMemo(() => ratingMessages[rating] ?? "Pick your pain level.", [rating]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === gameWrapRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  async function enterFullscreen() {
    const target = gameWrapRef.current;
    if (!target) {
      return;
    }

    await target.requestFullscreen?.();
  }

  async function exitFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen?.();
    }
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormState("submitting");
    setFormMessage("Sending it to the forest ledger...");

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: formData.get("nickname"),
        email: formData.get("email"),
        review: formData.get("review"),
        rating
      })
    });

    if (response.ok) {
      setFormState("success");
      setFormMessage("Thanks! The trees have noted your feedback.");
      form.reset();
      return;
    }

    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    setFormState("error");
    setFormMessage(data?.error ?? "The trees ate the request. Try again.");
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Primary navigation">
          <a className="logo" href="#play" onClick={() => setMenuOpen(false)}>
            🌲 TREES HATE YOU
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
          </button>
          <div className={menuOpen ? "nav-links open" : "nav-links"}>
            {["Play", "About", "How to Play", "Rate It"].map((item) => (
              <a key={item} href={`#${item === "How to Play" ? "how-to-play" : item === "Rate It" ? "rate" : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="play" aria-label="Play Trees Hate You">
          <div className="hero-copy">
            <h1>Play Trees Hate You Online</h1>
            <p>Short levels, cruel trees, instant retries. Start the demo, trust nothing, and try not to argue with a forest.</p>
          </div>
          <div className="game-panel">
            <div className="game-bar">
              <div>
                <strong>Trees Hate You</strong>
              </div>
              <div className="game-actions">
                <button type="button" onClick={enterFullscreen}>⛶</button>
              </div>
            </div>
            <div className="game-frame-wrap" ref={gameWrapRef}>
              {/* 替换为游戏 HTML 文件路径：如需更换游戏文件，请修改下面 iframe 的 src */}
              <iframe
                ref={iframeRef}
                src="/trees-hate-you.embed.html"
                title="Trees Hate You playable game"
                allow="fullscreen; gamepad"
                allowFullScreen
              />
              {isFullscreen && (
                <button className="fullscreen-exit" type="button" aria-label="Exit fullscreen" title="Exit fullscreen" onClick={exitFullscreen}>
                  ×
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="intro section reveal" id="about">
          <article className="story">
            <div className="tags">
              <span>#RageBait</span>
              <span>#ComedyGame</span>
              <span>#IndieGem</span>
            </div>
            <h2>A Walk in the Woods. What Could Go Wrong?</h2>
            <p>
              A boy finishes a peaceful forest picnic and tries to go home, which is cute, because the trees already voted against him. In Trees Hate You, trunks shoot, branches punch, traps pretend to be friendly, and every safe path is merely a setup with better timing. It is a compact trial-and-death rage-comedy game where learning the pattern only makes the next betrayal feel more personal. The internet calls it the Dark Souls of picnics. The picnic did not ask for this.
            </p>
            <p className="credit">Made by indie developer Tykenn. Demo live on itch.io now. Full Steam release planned for 2026.</p>
          </article>

          <aside className="stats" aria-label="Game highlights">
            <article><b>475K+</b><span>Viral TikTok likes</span></article>
            <article><b>467+</b><span>itch.io reviews</span></article>
            <article><b>Free</b><span>Demo available now</span></article>
            <article><b>2026</b><span>Steam full release</span></article>
          </aside>
        </section>

        <section className="section reveal" id="how-to-play">
          <div className="section-title">
            <h2>How to Survive (You Won't)</h2>
          </div>
          <div className="steps">
            <article>
              <span>🚶</span>
              <h3>Move</h3>
              <p>Use WASD or Arrow Keys to walk through the forest. Looks safe. It's not.</p>
            </article>
            <article>
              <span>🪤</span>
              <h3>Avoid Traps</h3>
              <p>Trees will punch, shoot, and troll you. Learn the pattern. Die anyway.</p>
            </article>
            <article>
              <span>🔁</span>
              <h3>Retry</h3>
              <p>Short levels, instant respawn. Every death is funnier than the last.</p>
            </article>
          </div>
          <p className="pro-tip">⚠️ Pro Tip: If it looks safe, it's a trap. If it looks like a trap, it's also a trap.</p>
        </section>

        <section className="section rating-section reveal" id="rate">
          <div className="section-title">
            <h2>Rage. Rate. Repeat.</h2>
            <p>Average score: <strong>4.7 / 5</strong> from 312 ratings</p>
          </div>

          <div className="review-layout">
            <form className="review-form" onSubmit={submitReview}>
              <div className="stars" role="radiogroup" aria-label="Rate Trees Hate You">
                {[1, 2, 3, 4, 5].map((value) => {
                  const active = value <= (hoverRating || rating);
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-label={`${value} star${value > 1 ? "s" : ""}`}
                      aria-checked={rating === value}
                      className={active ? "active" : ""}
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(0)}
                      onFocus={() => setHoverRating(value)}
                      onBlur={() => setHoverRating(0)}
                      onClick={() => setRating(value)}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
              <p className="rating-copy">{ratingFeedback}</p>

              <label>
                Nickname
                <input name="nickname" placeholder="Your forest survivor name" required maxLength={48} />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="your@email.com - we won't spam" required maxLength={160} />
                <small>Only used to notify you of the full game launch</small>
              </label>
              <label>
                Your Review
                <textarea name="review" placeholder="Describe your most humiliating death..." required maxLength={600} />
              </label>
              <button className="submit-review" type="submit" disabled={formState === "submitting"}>
                <span>{formState === "submitting" ? "Submitting..." : "Submit & Survive 🌲"}</span>
                <span>DIE AGAIN</span>
              </button>
              <p className={`form-message ${formState}`}>{formMessage}</p>
            </form>

            <div className="review-list">
              {seededReviews.map((review) => (
                <article className="player-review" key={review.name}>
                  <div className={`avatar ${review.tone}`}>{review.initial}</div>
                  <div>
                    <div className="review-head">
                      <strong>{review.name}</strong>
                      <time>{review.time}</time>
                    </div>
                    <div className="review-stars" aria-label={`${review.stars} stars`}>
                      {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
                    </div>
                    <p>{review.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <p>© 2026 treeshateyou.help</p>
        <nav aria-label="Footer navigation">
          <a href="#play">Play</a>
          <a href="#about">About</a>
          <a href="#how-to-play">How to Play</a>
          <a href="#rate">Rate It</a>
        </nav>
      </footer>
    </>
  );
}
