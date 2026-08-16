import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Journey } from "@/components/sections/Journey";
import { Process } from "@/components/sections/Process";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Section id="work" eyebrow="03" title="Work" />
      <Journey />
      <Process />
      <Section id="contact" eyebrow="06" title="Contact" />
    </>
  );
}