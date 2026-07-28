import type { Metadata, Viewport } from "next";
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1a2e1a"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://treeshateyou.help"),
  title: "Trees Hate You | Play the Viral Tree Rage Game Online",
  description:
    "Play Trees Hate You online free, the viral rage-comedy trap game where hostile trees shoot, punch, and trick you through the world's worst forest walk.",
  alternates: {
    canonical: "https://treeshateyou.help"
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/favicon-192.png", type: "image/png", sizes: "192x192" }],
    other: [{ rel: "icon", url: "/favicon-192.png", sizes: "192x192" }]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Trees Hate You - Viral Tree Rage Game",
    description: "Play the rage-comedy trap game where a nice forest walk turns into botanical violence.",
    url: "https://treeshateyou.help",
    siteName: "Trees Hate You Help",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Trees Hate You — play the free browser demo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Trees Hate You - Play Online Free",
    description: "The viral rage bait game where every tree is suspicious and every death is deserved by the forest.",
    images: ["/og.png"]
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
  sameAs: [
    "https://tykenn.itch.io/trees-hate-you",
    "https://store.steampowered.com/app/4171850/Trees_Hate_You/"
  ],
  isAccessibleForFree: true,
  playMode: "SinglePlayer",
  operatingSystem: "Web browser, Windows, SteamOS, Linux",
  author: {
    "@type": "Person",
    name: "Tykenn"
  },
  applicationCategory: "Game"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://nealfun.app" />
        <link rel="dns-prefetch" href="https://nealfun.app" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
