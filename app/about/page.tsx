import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

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
      <SiteHeader />
      <main className="legal-main">
        <section className="legal-sheet" aria-label="About Trees Hate You">
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

            <h2>About This Site</h2>
            <p>
              This is an independent fan-made play and information hub. It is built to make the
              game easy to find, easy to try, and a little easier to understand before the forest
              starts winning.
            </p>
            <p>
              Trees Hate You is created by <strong>Tykenn</strong>. The demo is available on
              itch.io, and a full Steam release is planned for 2026 with additional levels, new
              tree types, and more creative ways to perish in a forest. This site is not
              affiliated with Tykenn or the game&apos;s publisher.
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

      <SiteFooter />
    </>
  );
}
