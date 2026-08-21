import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";
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
  metadataBase: new URL(site.url),
  title: `${site.name} — Software Developer | ${site.brand}`,
  description:
    "Portfolio of Ranit Naskar — Software Developer from Kolkata, India crafting full-stack web experiences with React, Node.js, MongoDB, Three.js and modern tooling. Explore projects, journey and contact.",
  keywords: [
    "Ranit Naskar",
    "Software Developer",
    "Full-stack Developer",
    "Portfolio",
    "React",
    "Node.js",
    "Next.js",
    "Three.js",
    "Kolkata",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${site.name} — Software Developer | ${site.brand}`,
    description:
      "Software Developer from Kolkata, India — building deliberate software at the edge of light.",
    url: site.url,
    siteName: site.brand,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — Software Developer | ${site.brand} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Software Developer | ${site.brand}`,
    description:
      "Software Developer from Kolkata, India — building deliberate software at the edge of light.",
    images: ["/opengraph-image"],
  },
  // Add Google Search Console verification when token is available:
  // verification: { google: "YOUR_VERIFICATION_TOKEN" },
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
        <StructuredData />
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