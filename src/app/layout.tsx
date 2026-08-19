import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${site.name} — ECLIPSE Portfolio`,
  description:
    "Portfolio of Ranit Naskar — Software Developer crafting deliberate software at the edge of light.",
  keywords: ["portfolio", "full-stack", "developer", "next.js", "three.js"],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ECLIPSE Portfolio`,
    description:
      "Software Developer from Kolkata, India — building deliberate software at the edge of light.",
    type: "website",
    siteName: site.brand,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ECLIPSE Portfolio`,
    description:
      "Software Developer from Kolkata, India — building deliberate software at the edge of light.",
  },
};

export const viewport: Viewport = {
  themeColor: "#070A0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} font-sans`}
        suppressHydrationWarning
      >
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#04141a]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}