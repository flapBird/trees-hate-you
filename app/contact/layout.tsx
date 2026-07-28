import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Trees Hate You",
  description:
    "Contact the team behind this independent Trees Hate You fan site.",
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
