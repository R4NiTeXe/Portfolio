import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Building } from "@/components/sections/Building";
import { GitHub } from "@/components/sections/GitHub";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Journey />
      <Projects />
      <Process />
      <Building />
      <GitHub />
      <Section id="contact" eyebrow="08" title="Contact" />
    </>
  );
}