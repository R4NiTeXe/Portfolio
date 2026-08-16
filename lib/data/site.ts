export const site = {
  name: "Ranit Naskar",
  brand: "R4NiTeXe",
  role: "Aspiring Full-Stack Developer",
  title: "Ranit Naskar | Aspiring Full-Stack Developer",
  description:
    "Portfolio of Ranit Naskar (R4NiTeXe) — aspiring full-stack developer building modern web applications with Next.js, Node.js, Express and MongoDB. Featuring Video-Tube and Dukaan Sathi.",
  url: "https://ranitnaskar.me",
  github: "https://github.com/R4NiTeXe",
  linkedin: "https://www.linkedin.com/in/ranit-naskar",
  ogImage: "/opengraph-image",
} as const;

export const processSteps = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description:
      "Understand the problem, the users, and the constraints before writing any code.",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description:
      "Plan the experience and the architecture — how data flows, and how it feels.",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description:
      "Develop the product in small, testable pieces with a clean separation of concerns.",
  },
  {
    id: "test",
    number: "04",
    title: "Test",
    description:
      "Find and fix problems — validation, edge cases, and real user flows.",
  },
  {
    id: "ship",
    number: "05",
    title: "Ship",
    description:
      "Deploy to production, monitor, and keep improving based on real usage.",
  },
] as const;