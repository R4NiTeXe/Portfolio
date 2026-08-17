import { Backdrop } from "@/components/backdrop";
import { Cursor } from "@/components/cursor";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { Preloader } from "@/components/preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Backdrop />
      <Nav />

      <main id="top" className="relative">
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <p className="mono-label text-mint">System online</p>
            <h1 className="font-display mt-4 text-4xl font-semibold text-white md:text-6xl">
              ECLIPSE
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Hero section arrives in Phase 4
            </p>
          </div>
        </section>

        <Marquee />
      </main>

      <Footer />
    </>
  );
}