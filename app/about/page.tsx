import type { Metadata } from "next";
import AdsterraAboutBanners from "../components/AdsterraAboutBanners";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "About Trees Hate You — The Viral Tree Rage Game by Tykenn",
  description:
    "Learn about Trees Hate You, the viral indie rage-comedy trap game where hostile trees shoot, punch, and troll players through the world's worst forest walk. Made by Tykenn.",
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
      <main className="legal-main about-main">
        <AdsterraAboutBanners />
        <section className="legal-sheet" aria-label="About Trees Hate You">
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
              A developer-posted clip went viral in late 2025, and players quickly began sharing
              increasingly unhinged reactions to being murdered by shrubbery. The game resonates
              because the betrayals are creative, the deaths are absurd, and the rage is cathartic.
            </p>
            <p>
              Players often describe it as the Dark Souls of picnics, a trust-issues simulator,
              and a compelling reason to never look at oak trees the same way again.
            </p>

            <h2>About This Site</h2>
            <p>
              This is an independent fan-made play and information hub. It is built to make the
              game easy to find, easy to try, and a little easier to understand before the forest
              starts winning.
            </p>
            <p>
              Trees Hate You is created by <strong>Tykenn</strong>. The browser and Windows demo is
              available on{" "}
              <a href="https://tykenn.itch.io/trees-hate-you" target="_blank" rel="noopener noreferrer">
                itch.io
              </a>
              , an updated demo is available on{" "}
              <a href="https://store.steampowered.com/app/4307190/Trees_Hate_You_Demo/" target="_blank" rel="noopener noreferrer">
                Steam
              </a>
              , and the full game is planned for 2026. This site is not affiliated with Tykenn.
            </p>

            <h2>Game Features</h2>
            <ul style={{ color: "var(--muted)", lineHeight: "1.8", paddingLeft: "1.2em" }}>
              <li>Short, replayable levels designed for quick retries</li>
              <li>Creative traps — trees punch, shoot, drop, and deceive</li>
              <li>Instant respawn with no loading screens</li>
              <li>Keyboard and controller support</li>
              <li>Character customization and an unlockable Challenge Mode</li>
              <li>Free demo available on the web, itch.io, and Steam</li>
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
