import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { site } from "@/lib/data/site";
import { jetbrainsMono, spaceGrotesk } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DevLayerProvider } from "@/lib/dev-layer-context";
import { Terminal } from "@/components/features/Terminal";
import { DevMode } from "@/components/features/DevMode";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-text">
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
          </DevLayerProvider>
        </MotionConfig>
      </body>
    </html>
  );
}