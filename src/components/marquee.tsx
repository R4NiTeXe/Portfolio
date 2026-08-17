import { techStack } from "@/lib/site";

const separator = "✦";

function Row() {
  return (
    <>
      {techStack.map((tech) => (
        <span
          key={tech}
          className="flex items-center gap-8 whitespace-nowrap pr-8 text-[13px] tracking-[0.18em] text-muted-foreground"
        >
          {tech}
          <span className="text-mint/50" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Technologies"
      className="relative overflow-hidden border-y border-white/5 py-4"
    >
      <div className="marquee-track flex w-max">
        <Row />
        <div aria-hidden="true">
          <Row />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070A0F] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070A0F] to-transparent" />
    </section>
  );
}