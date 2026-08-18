import { About } from "@/components/about";
import { Backdrop } from "@/components/backdrop";
import { Contact } from "@/components/contact";
import { Cursor } from "@/components/cursor";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { Preloader } from "@/components/preloader";
import { Reveal } from "@/components/reveal";
import { Skills } from "@/components/skills";
import { Work } from "@/components/work";

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

        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Work />
        </Reveal>
        <Reveal>
          <Journey />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>

      <Footer />
    </>
  );
}