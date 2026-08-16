import { profile } from "@/lib/data/profile";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <div id="top" className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent">
          {profile.brand} / {profile.role}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-text md:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-text-muted">
          {profile.tagline}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="#work" size="lg">
            Explore My Work
          </Button>
          <Button href={profile.resumePath} variant="secondary" size="lg" download>
            Download Resume
          </Button>
        </div>
      </div>

      <Section id="about" eyebrow="01" title="About">
        <p className="max-w-2xl text-text-muted">{profile.bio}</p>
      </Section>

      <Section id="skills" eyebrow="02" title="Skills" />

      <Section id="work" eyebrow="03" title="Work" />

      <Section id="journey" eyebrow="04" title="Journey" />

      <Section id="contact" eyebrow="05" title="Contact" />
    </>
  );
}