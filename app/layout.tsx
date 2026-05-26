import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://treeshateyou.help"),
  title: "Trees Hate You - Play the Viral Tree Rage Game Online Free",
  description:
    "Play Trees Hate You online free, the viral rage-comedy trap game where hostile trees shoot, punch, and trick you through the world's worst forest walk.",
  keywords: ["trees hate you", "tree rage game", "rage bait game", "play online free", "indie game", "comedy game"],
  alternates: {
    canonical: "https://treeshateyou.help"
  },
  openGraph: {
    title: "Trees Hate You - Viral Tree Rage Game",
    description: "Play the rage-comedy trap game where a nice forest walk turns into botanical violence.",
    url: "https://treeshateyou.help",
    siteName: "Trees Hate You Help",
    type: "website",
    images: ["/og-image.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Trees Hate You - Play Online Free",
    description: "The viral rage bait game where every tree is suspicious and every death is deserved by the forest.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "Trees Hate You",
  description: "A viral rage-comedy trap game where hostile trees try to kill you at every step.",
  genre: ["Rage Game", "Indie Game", "Comedy Game"],
  gamePlatform: ["PC", "Web Browser"],
  url: "https://treeshateyou.help",
  author: {
    "@type": "Person",
    name: "Tykenn"
  },
  applicationCategory: "Game"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
