import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="about" eyebrow="01" title="About">
        <p className="max-w-2xl text-text-muted">Coming soon.</p>
      </Section>

      <Section id="skills" eyebrow="02" title="Skills" />

      <Section id="work" eyebrow="03" title="Work" />

      <Section id="journey" eyebrow="04" title="Journey" />

      <Section id="contact" eyebrow="05" title="Contact" />
    </>
  );
}