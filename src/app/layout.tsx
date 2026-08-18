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
    "Futuristic portfolio of Ranit Naskar — full-stack engineer crafting interfaces at the edge of light.",
  keywords: ["portfolio", "full-stack", "developer", "next.js", "three.js"],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ECLIPSE Portfolio`,
    description:
      "Full-stack developer from Kolkata, India — building deliberate software at the edge of light.",
    type: "website",
    siteName: site.brand,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ECLIPSE Portfolio`,
    description:
      "Full-stack developer from Kolkata, India — building deliberate software at the edge of light.",
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
        {children}
      </body>
    </html>
  );
}