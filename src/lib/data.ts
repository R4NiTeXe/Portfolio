export const skills = [
  {
    title: "Languages",
    tone: "mint" as const,
    items: ["C", "C++", "JavaScript", "TypeScript"],
  },
  {
    title: "Frontend",
    tone: "mint" as const,
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "GSAP",
      "Motion",
      "Three.js",
      "React Three Fiber",
    ],
  },
  {
    title: "Backend",
    tone: "mint" as const,
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC", "Zod"],
  },
  {
    title: "Database",
    tone: "mint" as const,
    items: ["MongoDB", "Mongoose", "MySQL", "Redis"],
  },
  {
    title: "Testing",
    tone: "mint" as const,
    items: ["Vitest", "Supertest", "Cypress"],
  },
  {
    title: "API / Documentation",
    tone: "mint" as const,
    items: ["Swagger/OpenAPI", "Postman"],
  },
  {
    title: "DevOps",
    tone: "mint" as const,
    items: [
      "Docker",
      "Docker Compose",
      "Nginx",
      "Git",
      "GitHub",
      "Linux",
      "Vercel",
      "Render",
    ],
  },
  {
    title: "AI-Assisted Development",
    tone: "violet" as const,
    items: ["ChatGPT", "Gemini", "Claude", "OpenCode", "Kimi Code", "MiMo", "Nimotron", "DeepSeek"],
  },
] as const;

export const foundations = ["DSA", "DBMS", "OOP"] as const;

export const projects = [
  {
    index: "01",
    name: "CarePlus",
    category: "Full-Stack Hospital ERP",
    status: "Live",
    tone: "mint" as const,
    role: "Full-stack build — individual",
    description:
      "Full-stack hospital ERP covering patients, appointments, pharmacy, laboratory, billing, inventory, and staff workflows — JWT authentication, RBAC, validation, and Dockerized deployment.",
    features: [
      "Patients, appointments, pharmacy, lab, billing & inventory",
      "JWT authentication & RBAC",
      "Zod validation, rate limiting & audit trails",
      "Vitest & Supertest coverage",
      "Swagger/OpenAPI documentation",
      "Docker Compose & Nginx deployment",
      "Production deployment",
    ],
    stack: ["Next.js", "TypeScript", "Express.js", "MongoDB", "Docker"],
    href: "https://github.com/R4NiTeXe/CarePlus01",
    repo: "https://github.com/R4NiTeXe/CarePlus01",
    live: "https://care-plus01-frontend.vercel.app/",
    preview: "care",
  },
  {
    index: "02",
    name: "Video_Tube",
    category: "Individual Full-Stack Project",
    status: "Shipped",
    tone: "mint" as const,
    role: "Full-stack build — individual",
    description:
      "A full video-sharing platform built end to end — authentication, uploads, viewing, engagement and notifications, deployed to production.",
    features: [
      "User authentication",
      "Video uploads & viewing",
      "Likes, comments & subscriptions",
      "Notifications",
      "Creator-focused functionality",
      "REST APIs & media workflows",
      "Production deployment",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    href: "https://github.com/R4NiTeXe",
    repo: "https://github.com/R4NiTeXe/Video-Tube",
    live: "https://video-tube044.vercel.app/",
    preview: "video",
  },
  {
    index: "03",
    name: "Dukaan_Sathi",
    category: "Hackathon Team Project",
    status: "Top 6 Finalist",
    tone: "amber" as const,
    role: "Team member — hackathon sprint",
    description:
      "An AI-assisted e-commerce companion for small shopkeepers — practical retail and business workflows, built under sprint pressure at the Digontom Pvt. Ltd. hackathon.",
    features: [
      "AI-assisted retail workflows",
      "Practical business tooling for shopkeepers",
      "Top 6 Finalist — Digontom Pvt. Ltd. Hackathon team",
    ],
    stack: ["React.js", "Express.js", "MongoDB"],
    href: "https://github.com/R4NiTeXe",
    repo: "https://github.com/R4NiTeXe/Dukaan_Sathi",
    live: "https://dukaansathi-ai.vercel.app/",
    preview: "retail",
  },
  {
    index: "04",
    name: "AnatomiaX",
    category: "3D AI-Powered Anatomy Learning Platform",
    status: "In development",
    tone: "violet" as const,
    role: "Personal project — build bench",
    description:
      "An interactive 3D anatomy learning platform — explorable models, educational information and AI-assisted learning. Currently on the build bench.",
    features: [
      "Interactive 3D anatomy models",
      "Educational information layers",
      "AI-assisted learning",
    ],
    stack: ["Three.js", "React.js", "React Three Fiber", "AI tooling"],
    href: "https://github.com/R4NiTeXe",
    repo: "https://github.com/R4NiTeXe/AnatomiaX",
    live: null,
    preview: "anatomy",
  },
] as const;

export const milestones = [
  {
    period: "2022",
    role: "Secondary Education",
    title: "WBBSE — Class X",
    description: "Foundations of mathematics and science before the engineering path.",
  },
  {
    period: "2024",
    role: "Higher Secondary",
    title: "WBCHSE — Class XII",
    description: "Completed Class XII — the turn toward computing.",
  },
  {
    period: "2024 — 2027",
    role: "Diploma in CSE",
    title: "Brainware University",
    tag: "active",
    description: "CGPA 7.01 through the 4th semester — DSA, DBMS, OOP and systems foundations.",
  },
  {
    period: "2026",
    role: "Hackathon — Top 6 Finalist",
    title: "Digontom Pvt. Ltd.",
    description:
      "Built Dukaan_Sathi as a team under sprint pressure — placing Top 6 among strong competitors.",
  },
  {
    period: "20.04.2026 — 07.08.2026",
    role: "Team Project Intern",
    title: "Agnirath Aerospace & Defence Research",
    description:
      "Team member on MAGANAL — a Mars rover research project: autonomous navigation, obstacle detection, environmental sensing and life-assessment logic.",
  },
  {
    period: "2026",
    role: "Full-Stack Development",
    title: "Video_Tube — shipped",
    description:
      "Designed, built and deployed a complete video platform — REST APIs, media workflows and production deployment.",
  },
  {
    period: "2026",
    role: "Full-Stack Development",
    title: "CarePlus — Hospital ERP",
    description:
      "Full-stack hospital ERP — patients, appointments, pharmacy, lab, billing and inventory with Next.js, TypeScript, Express, MongoDB and Docker.",
  },
  {
    period: "2027",
    role: "Target",
    title: "Diploma Completion",
    tag: "target",
    description: "Completing the Diploma in CSE — and continuing to ship software on the way.",
  },
] as const;

export const dataSheet = [
  { label: "Name", value: "Ranit Naskar" },
  { label: "Role", value: "Software Developer · Fullstack" },
  { label: "Location", value: "Kolkata, West Bengal, India" },
  { label: "Education", value: "Diploma CSE — Brainware, 2027" },
  { label: "Languages", value: "English · Bengali · Hindi" },
  { label: "Email", value: "ranitnaskar09032007@gmail.com" },
] as const;

export const maganal = {
  name: "MAGANAL",
  full: "Mars Autonomous Ground Analyser with Navigation and Life-Assessment Logic",
  org: "Agnirath Aerospace and Defence Research Pvt. Ltd.",
  period: "20/04/2026 — 07/08/2026",
  role: "Team Project Intern",
  areas: [
    "Autonomous Navigation",
    "Obstacle Detection",
    "Environmental Sensing",
    "Terrain & Image Monitoring",
    "Life-Assessment Concepts",
    "Team Engineering",
  ] as const,
  note: "Translating mission requirements into a functional prototype, as part of a multidisciplinary team.",
} as const;
