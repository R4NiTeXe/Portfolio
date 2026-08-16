import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/lib/data/site";
import { jetbrainsMono, spaceGrotesk } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DevLayerProvider } from "@/lib/dev-layer-context";
import { Terminal } from "@/components/features/Terminal";
import { DevMode } from "@/components/features/DevMode";
import { ScrollProgress } from "@/components/features/ScrollProgress";
import { personJsonLd } from "@/lib/json-ld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  category: "Portfolio",
  keywords: [
    "Ranit Naskar",
    "R4NiTeXe",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Redis",
    "Video-Tube",
    "Dukaan Sathi",
    "Kolkata Developer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-elevated focus:px-4 focus:py-2 focus:text-sm focus:text-accent"
        >
          Skip to main content
        </a>
        <MotionConfig reducedMotion="user">
          <DevLayerProvider>
            <Navbar />
            <main id="main-content" className="flex flex-1 flex-col">
              {children}
            </main>
            <Footer />
            <Terminal />
            <DevMode />
            <ScrollProgress />
          </DevLayerProvider>
        </MotionConfig>
      </body>
    </html>
  );
}