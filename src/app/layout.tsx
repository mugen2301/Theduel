import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  title: "The Duel | Custom Sportswear Manufacturing",
  description:
    "Premium custom sublimated jerseys, polos, tracksuits, hoodies, and corporate uniforms for teams, academies, dealers, and companies.",
  metadataBase: new URL("https://www.theduel.in"),
  openGraph: {
    title: "The Duel | Custom Sportswear Manufacturing",
    description:
      "Build custom teamwear with factory-backed production, artwork approval, and bulk ordering.",
    url: "https://www.theduel.in",
    siteName: "The Duel",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
