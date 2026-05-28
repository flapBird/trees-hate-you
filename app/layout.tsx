import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#1a2e1a"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://treeshateyou.help"),
  title: "Trees Hate You - Play the Viral Tree Rage Game Online Free",
  description:
    "Play Trees Hate You online free, the viral rage-comedy trap game where hostile trees shoot, punch, and trick you through the world's worst forest walk.",
  keywords: ["trees hate you", "tree rage game", "rage bait game", "play online free", "indie game", "comedy game"],
  alternates: {
    canonical: "https://treeshateyou.help"
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }]
  },
  manifest: "/site.webmanifest",
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
      <head>
        <link rel="preconnect" href="https://nealfun.app" />
        <link rel="dns-prefetch" href="https://nealfun.app" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FJWM0N3HTC" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FJWM0N3HTC');
          `}
        </Script>
        <Script src="https://pl29575396.effectivecpmnetwork.com/4d/25/73/4d25731ffdaddeb34fb0b88cffecec65.js"></Script>
      </head>
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
