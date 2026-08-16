import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { skillClusters } from "@/lib/data/skills";
import { Button } from "@/components/ui/Button";

interface RecruiterModeProps {
  onClose: () => void;
}

export function RecruiterMode({ onClose }: RecruiterModeProps) {
  const coreTech = skillClusters
    .flatMap((cluster) => cluster.items)
    .slice(0, 8)
    .map((item) => item.name);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruiter-mode-heading"
      onClick={onClose}
    >
      <div
        className="glass-card max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Recruiter Mode
            </p>
            <h2
              id="recruiter-mode-heading"
              className="mt-2 text-2xl font-semibold text-text"
            >
              {profile.name}
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              {profile.brand} · {profile.role}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close recruiter mode"
            className="rounded-md p-2 text-text-muted transition-colors hover:bg-elevated hover:text-text"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <dl className="space-y-6 text-sm">
          <div>
            <dt className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              Core Technologies
            </dt>
            <dd className="flex flex-wrap gap-2">
              {coreTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs text-text"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              Projects
            </dt>
            <dd className="space-y-2">
              {projects.map((project) => (
                <div key={project.slug} className="rounded-md border border-border bg-bg/40 p-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    {project.name}
                  </a>
                  <p className="mt-1 text-text-muted">{project.tagline}</p>
                </div>
              ))}
            </dd>
          </div>

          <div>
            <dt className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              Education
            </dt>
            <dd className="text-text">
              {profile.education.degree} — {profile.education.school},{" "}
              {profile.education.years}
            </dd>
          </div>

          <div>
            <dt className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              Open To
            </dt>
            <dd className="flex flex-wrap gap-2">
              {profile.openTo.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-accent/30 px-3 py-1 text-xs text-accent"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={profile.resumePath} download size="md">
            Download Resume
          </Button>
          <Button href="#contact" variant="secondary" size="md" onClick={onClose}>
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
}