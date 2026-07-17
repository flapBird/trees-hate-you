import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Trees Hate You",
  description:
    "Contact the developer behind Trees Hate You, the viral rage-comedy tree trap game.",
  alternates: {
    canonical: "https://treeshateyou.help/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
