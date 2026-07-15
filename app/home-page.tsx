"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import AdsterraBanner from "./components/AdsterraBanner";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const gameUrl = "https://nealfun.app/game/trees-hate-you/index.html";

const ratingMessages: Record<number, string> = {
  1: "The trees win. As always.",
  2: "You tried. The trees tried harder.",
  3: "A fair fight. The trees cheated.",
  4: "Respect. You survived... twice.",
  5: "Legend. The trees fear you now."
};

const reviews = [
  { name: "BarkVictim", initial: "B", tone: "red", stars: 5, time: "2 days ago", text: "I got shot by a bonsai. Five stars." },
  { name: "NatureIsOver", initial: "N", tone: "green", stars: 5, time: "1 week ago", text: "This game gave me trust issues with nature." },
  { name: "RetryRon", initial: "R", tone: "yellow", stars: 4, time: "3 weeks ago", text: "My therapist says I need to stop. One more run." }
];

export default function HomePage() {
  const gameWrapRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("Choose a rating, then leave a note for the forest.");

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === gameWrapRef.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  async function enterFullscreen() {
    await gameWrapRef.current?.requestFullscreen?.();
  }

  async function exitFullscreen() {
    await document.exitFullscreen?.();
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setFormState("submitting");
    setFormMessage("Sending it to the forest ledger...");

    try {
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

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "The trees ate the request. Try again.");
      }

      form.reset();
      setFormState("success");
      setFormMessage("Thanks. The trees have noted your feedback.");
    } catch (error) {
      setFormState("error");
      setFormMessage(error instanceof Error ? error.message : "The trees ate the request. Try again.");
    }
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="game-hero" id="play" aria-label="Play Trees Hate You">
          <div className="game-hero-glow" aria-hidden="true" />
          <div className="game-hero-inner">
            <div className="hero-intro">
              <p className="eyebrow">A viral rage-comedy trap game</p>
              <h1>The forest knows you&apos;re coming.</h1>
              <p className="hero-summary">Take one peaceful walk home after a picnic. Avoid the traps. Distrust every tree. Die quickly. Retry immediately.</p>
              <div className="hero-pills" aria-label="Game details">
                <span>Free web demo</span>
                <span>Keyboard controls</span>
                <span>Instant retry</span>
              </div>
            </div>

            <div className="game-surface">
              <div className="game-toolbar">
                <span className="game-status"><i /> Live demo</span>
                <button className="icon-button" type="button" onClick={enterFullscreen} aria-label="Enter fullscreen" title="Enter fullscreen">⛶</button>
              </div>
              <div className="game-frame-wrap" ref={gameWrapRef}>
                <iframe
                  src={gameStarted ? gameUrl : "about:blank"}
                  title="Trees Hate You playable game"
                  allow="fullscreen; gamepad"
                  allowFullScreen
                />
                {!gameStarted && (
                  <button className="game-start" type="button" onClick={() => setGameStarted(true)} aria-label="Play Trees Hate You">
                    <img src="/trees-hate-you-cover.jpg" alt="Trees Hate You game art" />
                    <span className="play-button">Play the demo <b>▶</b></span>
                  </button>
                )}
                {isFullscreen && (
                  <button className="fullscreen-exit" type="button" onClick={exitFullscreen} aria-label="Exit fullscreen" title="Exit fullscreen">×</button>
                )}
              </div>
            </div>

            <div className="ad-slot" aria-label="Advertisement">
              <span>Advertisement</span>
              <AdsterraBanner />
            </div>
          </div>
        </section>

        <section className="overview-section" id="about">
          <div className="content-wrap overview-grid">
            <article className="overview-copy">
              <p className="eyebrow">What is Trees Hate You?</p>
              <h2>A tiny walk with a very large grudge.</h2>
              <p>Trees Hate You is a short-form rage-comedy platform game. You play a kid trying to get home after a picnic, but the forest has decided you&apos;re not invited to leave.</p>
              <p>The trick is that danger rarely announces itself. A harmless-looking path can shoot you, punch you, drop something on you, or wait just long enough to make you feel clever before it ruins the run.</p>
              <p>Levels are compact and respawns are instant, so the loop is simple: notice a trap, make a worse mistake, laugh, then try again.</p>
            </article>
            <aside className="quick-facts" aria-label="Quick facts">
              <div><span>Genre</span><strong>Rage-comedy platformer</strong></div>
              <div><span>Controls</span><strong>WASD or arrow keys</strong></div>
              <div><span>Session</span><strong>Short runs, instant respawn</strong></div>
              <div><span>Best rule</span><strong>Nothing is safe</strong></div>
            </aside>
          </div>
        </section>

        <section className="guide-section" id="guide">
          <div className="content-wrap">
            <div className="section-heading">
              <p className="eyebrow">Game guide</p>
              <h2>How to make it five steps farther.</h2>
              <p>There is no elegant route through the woods. There is only pattern recognition, timing, and the willingness to be embarrassed several times in a row.</p>
            </div>
            <div className="guide-grid">
              <article><span className="guide-number">01</span><h3>Move deliberately</h3><p>Use WASD or the arrow keys. The game rewards attention more than speed, at least until it decides not to.</p></article>
              <article><span className="guide-number">02</span><h3>Study the betrayal</h3><p>Each death is a clue. Watch where the hit came from, reset, and assume the next obvious answer is wrong too.</p></article>
              <article><span className="guide-number">03</span><h3>Retry before pride wins</h3><p>Respawns are quick. Keep the run moving, take the joke, and use the last failure to buy one extra second.</p></article>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="content-wrap faq-grid">
            <div className="section-heading">
              <p className="eyebrow">FAQ</p>
              <h2>Questions the trees refuse to answer.</h2>
            </div>
            <div className="faq-list">
              <details open><summary>Can I play for free?</summary><p>Yes. The web demo is free to start from the game panel at the top of this page.</p></details>
              <details><summary>What are the controls?</summary><p>Use WASD or the arrow keys to move. A keyboard is recommended for the best experience.</p></details>
              <details><summary>Why do I keep dying to the same spot?</summary><p>Because the game is a trap comedy. Look for timing, movement cues, and anything that looks suspiciously normal.</p></details>
              <details><summary>Does it work on mobile?</summary><p>The site is responsive, but the game itself is best played on desktop with a keyboard.</p></details>
              <details><summary>Is this the official game site?</summary><p>No. This is a fan-made information and play hub, not an official Tykenn property.</p></details>
            </div>
          </div>
        </section>

        <section className="feedback-section" id="rate">
          <div className="content-wrap feedback-grid">
            <div className="section-heading feedback-heading">
              <p className="eyebrow">Player notes</p>
              <h2>Rage. Rate. Retry.</h2>
              <p>Average player score <strong>4.7 / 5</strong> from 312 ratings.</p>
            </div>
            <form className="review-form" onSubmit={submitReview}>
              <div className="stars" role="radiogroup" aria-label="Rate Trees Hate You">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-label={`${value} stars`}
                    aria-checked={rating === value}
                    className={value <= (hoverRating || rating) ? "active" : ""}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    onFocus={() => setHoverRating(value)}
                    onBlur={() => setHoverRating(0)}
                    onClick={() => setRating(value)}
                  >★</button>
                ))}
              </div>
              <p className="rating-copy">{ratingMessages[rating]}</p>
              <label>Nickname<input name="nickname" placeholder="Your forest survivor name" required maxLength={48} /></label>
              <label>Email<input name="email" type="email" placeholder="your@email.com" required maxLength={160} /><small>Only used for full-game launch news.</small></label>
              <label>Your review<textarea name="review" placeholder="Describe your most humiliating death..." required maxLength={600} /></label>
              <button className="submit-review" type="submit" disabled={formState === "submitting"}>{formState === "submitting" ? "Submitting..." : "Submit review"}</button>
              <p className={`form-message ${formState}`}>{formMessage}</p>
            </form>
          </div>
          <div className="content-wrap review-strip" aria-label="Recent player reviews">
            {reviews.map((review) => (
              <article className="player-review" key={review.name}>
                <div className={`avatar ${review.tone}`}>{review.initial}</div>
                <div><div className="review-head"><strong>{review.name}</strong><time>{review.time}</time></div><div className="review-stars">{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}</div><p>{review.text}</p></div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
