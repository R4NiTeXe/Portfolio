import { Backdrop } from "@/components/backdrop";
import { Cursor } from "@/components/cursor";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
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
        <Hero />

        <Marquee />
      </main>

      <Footer />
    </>
  );
}