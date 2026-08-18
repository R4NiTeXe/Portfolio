import { About } from "@/components/about";
import { Celestial } from "@/components/celestial";
import { CommandPalette } from "@/components/command-palette";
import { Contact } from "@/components/contact";
import { Cursor } from "@/components/cursor";
import { EasterEgg } from "@/components/easter-egg";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { OrbitLab } from "@/components/orbit-lab";
import { Preloader } from "@/components/preloader";
import { Reveal } from "@/components/reveal";
import { Skills } from "@/components/skills";
import { Terminal } from "@/components/terminal";
import { ToastProvider } from "@/components/toast";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <ToastProvider>
      <Preloader />
      <Cursor />
      <EasterEgg />
      <Celestial />
      <Nav />
      <CommandPalette />
      <Terminal />

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
        <Reveal>
          <OrbitLab />
        </Reveal>
      </main>

      <Footer />
    </ToastProvider>
  );
}