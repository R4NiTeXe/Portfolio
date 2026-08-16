import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { profile } from "../lib/data/profile.ts";
import { site } from "../lib/data/site.ts";
import { skillClusters } from "../lib/data/skills.ts";
import { projects } from "../lib/data/projects.ts";
import { journey } from "../lib/data/journey.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
mkdirSync(publicDir, { recursive: true });

const link = (href, label) =>
  `<a href="${href}">${label}</a>`;

const contactLine = [
  profile.email,
  profile.location,
  site.github,
  site.linkedin,
  site.url,
].join(" · ");

const projectBlocks = projects
  .map(
    (project) => `
  <section class="project">
    <div class="project-head">
      <h3>${project.name}</h3>
      ${project.collaborators ? `<span class="muted">with ${project.collaborators.join(", ")}</span>` : ""}
    </div>
    <p class="tagline">${project.tagline}</p>
    <p class="desc">${project.description}</p>
    <p class="tech">${project.tech.join(" · ")}</p>
    <p class="links">${link(project.github, "GitHub")}${project.live ? ` · ${link(project.live, "Live demo")}` : ""}</p>
  </section>`,
  )
  .join("\n");

const skillBlocks = skillClusters
  .map(
    (cluster) =>
      `<p><strong>${cluster.label}:</strong> ${cluster.items.map((item) => item.name).join(", ")}</p>`,
  )
  .join("\n");

const journeyBlocks = journey
  .map(
    (step) =>
      `<li><strong>${step.period} — ${step.title}:</strong> ${step.description}</li>`,
  )
  .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Resume — ${profile.name}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: "Segoe UI", Arial, sans-serif;
    color: #0B0F17;
    font-size: 11pt;
    line-height: 1.45;
    max-width: 780px;
    margin: 0 auto;
    padding: 40px 48px;
  }
  header { border-bottom: 2px solid #38BDF8; padding-bottom: 14px; margin-bottom: 18px; }
  h1 { font-size: 26pt; letter-spacing: -0.5px; }
  .role { color: #0284C7; font-size: 12pt; margin-top: 2px; }
  .contact { color: #475569; font-size: 9.5pt; margin-top: 8px; }
  h2 {
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #0284C7;
    border-bottom: 1px solid #CBD5E1;
    padding-bottom: 3px;
    margin: 18px 0 8px;
  }
  h3 { font-size: 12pt; }
  .project { margin-bottom: 10px; }
  .project-head { display: flex; justify-content: space-between; }
  .tagline { color: #7C3AED; font-weight: 600; font-size: 10pt; }
  .desc { margin-top: 3px; }
  .tech { color: #475569; font-size: 9.5pt; margin-top: 3px; }
  .links { font-size: 9.5pt; margin-top: 2px; }
  a { color: #0284C7; text-decoration: none; }
  ul { list-style: none; }
  li { margin-bottom: 4px; }
  .muted { color: #475569; font-size: 10pt; }
  @media print {
    body { padding: 0; max-width: none; }
  }
</style>
</head>
<body>
  <header>
    <h1>${profile.name}</h1>
    <p class="role">${profile.role}</p>
    <p class="contact">${contactLine}</p>
  </header>

  <section>
    <h2>Summary</h2>
    <p>${profile.bio}</p>
  </section>

  <section>
    <h2>Projects</h2>
    ${projectBlocks}
  </section>

  <section>
    <h2>Skills</h2>
    ${skillBlocks}
  </section>

  <section>
    <h2>Journey</h2>
    <ul>${journeyBlocks}</ul>
  </section>

  <section>
    <h2>Education</h2>
    <p><strong>${profile.education.degree}</strong> — ${profile.education.school} (${profile.education.years})</p>
  </section>
</body>
</html>
`;

const htmlPath = join(publicDir, "resume.html");
const pdfPath = join(publicDir, "resume.pdf");
writeFileSync(htmlPath, html, "utf8");
console.log(`Wrote ${htmlPath}`);

const edge =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const pdfUrl = `file:///${htmlPath.replace(/\\/g, "/")}`;

try {
  execFileSync(
    edge,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${pdfPath}`,
      pdfUrl,
    ],
    { stdio: "ignore", timeout: 60000 },
  );
  console.log(`Wrote ${pdfPath}`);
} catch (error) {
  console.error("PDF generation failed:", error.message);
  process.exitCode = 1;
}