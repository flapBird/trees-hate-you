import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Trees Hate You — The Viral Tree Rage Game by Tykenn",
  description:
    "Learn about Trees Hate You, the viral indie rage-comedy trap game where hostile trees shoot, punch, and troll players through the world's worst forest walk. Made by Tykenn.",
  keywords: ["about trees hate you", "trees hate you game info", "tykenn indie game", "tree rage game about", "rage comedy game"],
  alternates: {
    canonical: "https://treeshateyou.help/about"
  },
  openGraph: {
    title: "About Trees Hate You — The Viral Tree Rage Game",
    description: "The story behind the rage-comedy trap game that made the internet argue with a forest.",
    url: "https://treeshateyou.help/about"
  }
};

export default function AboutPage() {
  return (
    <>
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Primary navigation">
          <a className="logo" href="/">🌲 TREES HATE YOU</a>
          <div className="nav-links" style={{ position: "static", display: "flex", padding: 0, border: 0, background: "transparent", boxShadow: "none", transform: "none" }}>
            <a href="/#play">Play</a>
            <a href="/about">About</a>
            <a href="/#how-to-play">How to Play</a>
            <a href="/privacy">Privacy</a>
            <a href="/contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="section" aria-label="About Trees Hate You">
          <div className="tags">
            <span>#RageBait</span>
            <span>#ComedyGame</span>
            <span>#IndieGem</span>
          </div>
          <h1>About Trees Hate You</h1>

          <div className="story">
            <h2>A Forest With a Grudge</h2>
            <p>
              Trees Hate You is a short-form rage-comedy trap game where a peaceful forest walk
              turns into botanical warfare. You play as a boy who just finished a picnic and wants
              to go home. The trees have other plans.
            </p>
            <p>
              Every trunk hides a punch. Every branch is a loaded weapon. Traps disguise themselves
              as safe paths, and the game delights in punishing your trust. It is the kind of
              experience where dying is part of the fun — short levels, instant retries, and a
              death count that grows faster than your patience.
            </p>

            <h2>Why the Internet Loves (and Hates) It</h2>
            <p>
              Trees Hate You went viral on TikTok in late 2025, racking up over 475K likes as
              streamers and players documented their increasingly unhinged reactions to being
              murdered by shrubbery. The game resonates because it is genuinely funny — the
              betrayals are creative, the deaths are absurd, and the rage is cathartic.
            </p>
            <p>
              It has been described as "the Dark Souls of picnics," "a trust issues simulator,"
              and "the reason I will never look at oak trees the same way again."
            </p>

            <h2>About the Developer</h2>
            <p>
              Trees Hate You is created by <strong>Tykenn</strong>, an indie game developer who
              understands that the best comedy comes from shared suffering. The demo is available
              on itch.io, and a full Steam release is planned for 2026 with additional levels,
              new tree types, and more creative ways to perish in a forest.
            </p>
            <p>
              For press inquiries, collaboration opportunities, or just to chat about game dev,
              you can{" "}
              <a
                href="https://cal.com/lees-wal-c7qaqq"
                target="_blank"
                rel="noopener"
                style={{ color: "var(--leaf)", fontWeight: 850, textDecoration: "underline" }}
              >
                book a call with the developer
              </a>{" "}
              directly.
            </p>

            <h2>Game Features</h2>
            <ul style={{ color: "var(--muted)", lineHeight: "1.8", paddingLeft: "1.2em" }}>
              <li>Short, replayable levels designed for quick retries</li>
              <li>Creative traps — trees punch, shoot, drop, and deceive</li>
              <li>Instant respawn with no loading screens</li>
              <li>Keyboard controls: WASD or Arrow Keys</li>
              <li>Free demo available now on the web and itch.io</li>
              <li>Full Steam release with expanded content coming in 2026</li>
            </ul>

            <p className="credit">
              Made by indie developer Tykenn. Demo live on itch.io now. Full Steam release planned for 2026.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 treeshateyou.help</p>
        <nav aria-label="Footer navigation">
          <a href="/#play">Play</a>
          <a href="/about">About</a>
          <a href="/#how-to-play">How to Play</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </nav>
      </footer>
    </>
  );
}
