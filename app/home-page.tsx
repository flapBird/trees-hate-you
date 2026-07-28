"use client";

import Image from "next/image";
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

type PublicReview = {
  id: string;
  nickname: string;
  rating: number;
  review: string;
  created_at: string;
};

type ReviewResponse = {
  configured: boolean;
  reviews: PublicReview[];
  stats: {
    average: number | null;
    count: number;
  };
};

export default function HomePage() {
  const gameWrapRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showDeviceWarning, setShowDeviceWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [launchUpdates, setLaunchUpdates] = useState(false);
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [reviewStats, setReviewStats] = useState<ReviewResponse["stats"]>({
    average: null,
    count: 0
  });
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("Choose a rating, then leave a note for the forest.");

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === gameWrapRef.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const syncPointer = () => setIsTouchDevice(media.matches || navigator.maxTouchPoints > 0);
    syncPointer();
    media.addEventListener?.("change", syncPointer);
    return () => media.removeEventListener?.("change", syncPointer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews", {
          cache: "no-store",
          signal: controller.signal
        });
        if (!response.ok) return;
        const data = (await response.json()) as ReviewResponse;
        setReviews(data.reviews);
        setReviewStats(data.stats);
      } catch {
        // Reviews are secondary content; keep the game usable if they are unavailable.
      } finally {
        setReviewsLoading(false);
      }
    }

    loadReviews();
    return () => controller.abort();
  }, []);

  function beginGame(skipDeviceWarning = false) {
    if (isTouchDevice && !skipDeviceWarning) {
      setShowDeviceWarning(true);
      gameWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setShowDeviceWarning(false);
    setGameLoading(true);
    setGameStarted(true);
    window.setTimeout(() => {
      gameWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  }

  async function enterFullscreen() {
    try {
      await gameWrapRef.current?.requestFullscreen?.();
    } catch {
      // Browsers can reject fullscreen when it is unavailable or not user initiated.
    }
  }

  async function exitFullscreen() {
    try {
      await document.exitFullscreen?.();
    } catch {
      // Keep the game usable if the browser has already left fullscreen.
    }
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
          rating,
          launchUpdates,
          website: formData.get("website")
        })
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "The trees ate the request. Try again.");
      }

      form.reset();
      setLaunchUpdates(false);
      setFormState("success");
      setFormMessage("Thanks. Your review is waiting for moderation.");
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
              <h1>Trees Hate You: play the viral tree rage game online.</h1>
              <p className="hero-summary">Take one peaceful walk home after a picnic. Distrust every tree, die quickly, and retry immediately.</p>
              <div className="hero-pills" aria-label="Game details">
                <span>Free web demo</span>
                <span>Keyboard or controller</span>
                <span>Instant retry</span>
              </div>
              <div className="hero-actions">
                <button className="primary-action" type="button" onClick={() => beginGame()}>
                  Play browser demo <span aria-hidden="true">▶</span>
                </button>
              </div>
            </div>

            <div className="game-surface">
              <div className="game-toolbar">
                <span className="game-status">
                  <i /> {gameStarted ? (gameLoading ? "Loading demo" : "Demo ready") : "Browser demo"}
                </span>
                <button className="icon-button" type="button" onClick={enterFullscreen} aria-label="Enter fullscreen" title="Enter fullscreen">⛶</button>
              </div>
              <div className="game-frame-wrap" ref={gameWrapRef}>
                <iframe
                  src={gameStarted ? gameUrl : "about:blank"}
                  title="Trees Hate You playable game"
                  allow="fullscreen; gamepad; autoplay"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-popups-to-escape-sandbox"
                  onLoad={() => gameStarted && setGameLoading(false)}
                />
                {!gameStarted && !showDeviceWarning && (
                  <button className="game-start" type="button" onClick={() => beginGame()} aria-label="Play Trees Hate You">
                    <Image
                      src="/trees-hate-you-cover.jpg"
                      alt="Trees Hate You game art"
                      width={318}
                      height={318}
                      sizes="(max-width: 767px) 65vw, 300px"
                      priority
                    />
                    <span className="play-button">Play the demo <b>▶</b></span>
                  </button>
                )}
                {showDeviceWarning && (
                  <div className="device-warning" role="dialog" aria-modal="true" aria-labelledby="device-warning-title">
                    <div>
                      <p className="eyebrow">Before you load the game</p>
                      <h2 id="device-warning-title">Keyboard or gamepad required.</h2>
                      <p>The web demo has no touch controls and may be slow on mobile devices.</p>
                      <div className="warning-actions">
                        <button type="button" className="primary-action" onClick={() => beginGame(true)}>Continue anyway</button>
                        <button type="button" className="text-action" onClick={() => setShowDeviceWarning(false)}>Not now</button>
                      </div>
                    </div>
                  </div>
                )}
                {gameStarted && gameLoading && (
                  <div className="game-loading" role="status" aria-live="polite">
                    <span
                      className="t-shimmer"
                      data-text="Loading the browser demo. This can take 15–30 seconds."
                    >
                      Loading the browser demo. This can take 15–30 seconds.
                    </span>
                  </div>
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
              <h2>What is Trees Hate You?</h2>
              <p>Trees Hate You is a short-form rage-comedy trap game. You play a kid trying to get home after a picnic, but the forest has decided you&apos;re not invited to leave. Harmless paths can shoot, punch, drop, or trick you the moment you feel safe.</p>
              <p>Compact levels and quick respawns keep the joke moving: notice a trap, make a worse mistake, laugh, then try again. It feels closer to a playable comedy sketch than a long adventure, with every failure teaching you one small thing about the next attempt.</p>
            </article>
            <aside className="quick-facts" aria-label="Quick facts">
              <div><span>Genre</span><strong>Rage-comedy platformer</strong></div>
              <div><span>Controls</span><strong>WASD, arrow keys, or controller</strong></div>
              <div><span>Session</span><strong>Short runs, instant respawn</strong></div>
              <div><span>Best rule</span><strong>Nothing is safe</strong></div>
              <div><span>Ideal for</span><strong>Short, chaotic challenge runs</strong></div>
            </aside>
          </div>
        </section>

        <section className="guide-section" id="guide">
          <div className="content-wrap">
            <div className="section-heading">
              <p className="eyebrow">Game guide</p>
              <h2>How to play Trees Hate You.</h2>
              <p>There is no elegant route through the woods. There is only pattern recognition, timing, and the willingness to be embarrassed several times in a row. The goal is not to play perfectly on a first attempt. The goal is to turn each ridiculous death into useful information for the next run.</p>
            </div>
            <div className="guide-grid">
              <article><span className="guide-number">01</span><h3>Movement: slow down first</h3><p>Use WASD or the arrow keys. The game rewards attention more than speed, at least until it decides not to. Before you commit to a jump or a long sprint, look at what changed around you: a branch that moved, a platform placed too neatly, or an empty gap that feels unusually generous. The safest first input is often a tiny one.</p></article>
              <article><span className="guide-number">02</span><h3>Traps: study the betrayal</h3><p>Each death is a clue. Watch where the hit came from, reset, and assume the next obvious answer is wrong too. Some traps are about timing, while others exist to punish the exact behavior that worked ten seconds earlier. Remember the trigger, not just the location. A tree that did nothing on the first pass may be waiting for your return.</p></article>
              <article><span className="guide-number">03</span><h3>Retries: use the fresh memory</h3><p>Respawns are quick. Keep the run moving, take the joke, and use the last failure to buy one extra second. Do not pause so long that the sequence disappears from your head. A good retry is a small experiment: move earlier, wait longer, jump shorter, or deliberately test the suspicious object. Progress usually comes from one changed decision, not a completely new plan.</p></article>
            </div>
          </div>
        </section>

        <section className="playbook-section">
          <div className="content-wrap">
            <div className="section-heading">
              <p className="eyebrow">First-run playbook</p>
              <h2>Tips for your first twenty minutes.</h2>
              <p>Most early frustration comes from treating Trees Hate You like a normal platformer. It is more useful to think of each room as a tiny puzzle with a sense of humor. The environment is part of the enemy roster.</p>
            </div>
            <div className="playbook-grid">
              <article>
                <h3>spot the too-obvious route</h3>
                <p>When a route seems perfectly clean, stop for a moment. The game likes to frame an easy answer so that you commit to it at full speed. Check the edges of platforms, the ceiling above a landing zone, and the space behind objects before you trust a clear path. You do not need to be paranoid about every pixel, but you should be skeptical of convenience.</p>
              </article>
              <article>
                <h3>keep your hands relaxed</h3>
                <p>Rage games become much harder when every death makes you hold a key longer or mash through the next section. Trees Hate You is at its funniest when you let it surprise you, reset, and return with one small adjustment. If a trap catches you twice, take a second to identify the trigger instead of trying to overpower it with speed.</p>
              </article>
              <article>
                <h3>play with the sound on</h3>
                <p>Visual cues matter most, but game sound can help you notice an incoming interaction or mark the timing of a previous failure. More importantly, the sound design helps sell the absurdity. This is a game built around tension breaking in an instant, and hearing the impact makes the lesson stick a little better.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="audience-section">
          <div className="content-wrap audience-grid">
            <article>
              <p className="eyebrow">Who will enjoy it?</p>
              <h2>Why Trees Hate You works as a rage-comedy game.</h2>
              <p>Trees Hate You is made for players who enjoy the moment when a game catches them off guard, then makes the failure memorable enough to share. The challenge is real, but the tone is knowingly silly. A dangerous forest should be intimidating; a dangerous forest with a gun is something else entirely.</p>
              <p>It is a good fit for quick solo sessions, a friend watching over your shoulder, or a stream where everyone gets to predict the trap one second too late. Because levels are short, you can jump in without committing to a long campaign. Because the traps vary, the game remains entertaining even when somebody else is holding the controller.</p>
            </article>
            <aside className="audience-note">
              <strong>Best way to play</strong>
              <p>Use a desktop browser with a keyboard, keep the game window focused, and give yourself permission to fail fast. The forest is not grading you. It is just extremely committed to the bit.</p>
            </aside>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="content-wrap faq-grid">
            <div className="section-heading">
              <p className="eyebrow">FAQ</p>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faq-list">
              <details open><summary>Can I play Trees Hate You for free?</summary><p>Yes. The web demo is free to start from the game panel at the top of this page. Click Play the demo, wait for the game frame to load, and use a keyboard for the smoothest controls. No account is required for the basic web experience.</p></details>
              <details><summary>What are the Trees Hate You controls?</summary><p>Use WASD, the arrow keys, or the left stick on a supported controller. The web demo has no touch controls, so a desktop browser is recommended.</p></details>
              <details><summary>Why do I keep dying to the same Trees Hate You trap?</summary><p>Because the game is a trap comedy, not just a reflex test. Look for timing, movement cues, objects that appeared after you moved, and anything that looks suspiciously normal. After each death, change one part of your approach so you can learn which action caused the problem.</p></details>
              <details><summary>Is Trees Hate You hard for new players?</summary><p>It can be, but the difficulty is built around short attempts rather than long punishments. You do not lose a large amount of progress after a mistake. Instead, you get a quick restart and a clearer idea of what the level was trying to do to you.</p></details>
              <details><summary>Can I play Trees Hate You on mobile?</summary><p>You can open this website on mobile, but the demo requires a keyboard or gamepad and may run slowly in some mobile browsers. Use a desktop or laptop for the intended experience.</p></details>
              <details><summary>What if the browser demo does not load?</summary><p>Try another desktop browser or use the official itch.io and Steam demo links below the game. The downloadable builds are a better fallback for low frame rates or blocked embeds.</p></details>
              <details><summary>Is Trees Hate You a horror game?</summary><p>Not in the traditional sense. It uses tension, surprises, and jump-like moments, but the overall tone is comedic. The game is designed to make a failure feel ridiculous rather than grim, even when a tree has clearly planned your downfall.</p></details>
              <details><summary>Is this the official Trees Hate You site?</summary><p>No. This is a fan-made information and play hub, not an official Tykenn property. The game demo is loaded from an external host, and official announcements should always be checked through the developer&apos;s own channels.</p></details>
            </div>
          </div>
        </section>

        <section className="feedback-section" id="rate">
          <div className="content-wrap feedback-grid">
            <div className="section-heading feedback-heading">
              <p className="eyebrow">Player notes</p>
              <h2>Rate your Trees Hate You run.</h2>
              <p>
                {reviewsLoading
                  ? "Loading approved player reviews..."
                  : reviewStats.count > 0
                    ? <>Approved player score <strong>{reviewStats.average?.toFixed(1)} / 5</strong> from {reviewStats.count} {reviewStats.count === 1 ? "rating" : "ratings"}.</>
                    : "No approved player ratings yet. Be the first to leave one."}
              </p>
            </div>
            <form className="review-form" onSubmit={submitReview} aria-busy={formState === "submitting"}>
              <label className="form-honeypot" aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              </label>
              <fieldset className="stars">
                <legend>Rate Trees Hate You</legend>
                <div className="star-row">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      className={value <= (hoverRating || rating) ? "star-option active" : "star-option"}
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={rating === value}
                        onFocus={() => setHoverRating(value)}
                        onBlur={() => setHoverRating(0)}
                        onChange={() => setRating(value)}
                      />
                      <span aria-hidden="true">★</span>
                      <span className="visually-hidden">{value} stars</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <p className="rating-copy">{ratingMessages[rating]}</p>
              <label>Nickname<input name="nickname" placeholder="Your forest survivor name" required maxLength={48} /></label>
              <label>
                Email <span className="optional-label">(optional)</span>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required={launchUpdates}
                  disabled={!launchUpdates}
                  maxLength={160}
                />
              </label>
              <label className="consent-check">
                <input
                  type="checkbox"
                  checked={launchUpdates}
                  onChange={(event) => setLaunchUpdates(event.target.checked)}
                />
                <span>Email me once when the full game launches. You can submit a review without subscribing.</span>
              </label>
              <label>Your review<textarea name="review" placeholder="Describe your most humiliating death..." required maxLength={600} /></label>
              <button className="submit-review" type="submit" disabled={formState === "submitting"}>{formState === "submitting" ? "Submitting..." : "Submit review"}</button>
              <p className={`form-message ${formState}`} aria-live="polite">{formMessage}</p>
            </form>
            {reviews.length > 0 && (
              <div className="review-strip" aria-label="Approved player reviews">
                {reviews.slice(0, 6).map((item) => (
                  <article className="player-review" key={item.id}>
                    <span className={`avatar ${item.rating >= 5 ? "yellow" : item.rating >= 4 ? "green" : "red"}`} aria-hidden="true">
                      {item.nickname.slice(0, 1).toUpperCase()}
                    </span>
                    <div>
                      <div className="review-head">
                        <strong>{item.nickname}</strong>
                        <time dateTime={item.created_at}>
                          {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(item.created_at))}
                        </time>
                      </div>
                      <div className="review-stars" aria-label={`${item.rating} out of 5 stars`}>
                        {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                      </div>
                      <p>{item.review}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
