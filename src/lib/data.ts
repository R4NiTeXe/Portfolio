export const skills = [
  {
    title: "Languages",
    tone: "mint" as const,
    items: ["C", "C++"],
  },
  {
    title: "Frontend",
    tone: "mint" as const,
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "GSAP",
      "Three.js",
    ],
  },
  {
    title: "Backend",
    tone: "mint" as const,
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    tone: "mint" as const,
    items: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools & Platforms",
    tone: "mint" as const,
    items: [
      "Git",
      "GitHub",
      "Linux",
      "VS Code",
      "Postman",
      "Docker",
      "Vercel",
      "Render",
    ],
  },
  {
    title: "AI-Assisted Development",
    tone: "violet" as const,
    items: [
      "ChatGPT",
      "Gemini",
      "Claude",
      "OpenCode",
      "Kimi Code",
      "MiMo",
      "Nimotron",
      "DeepSeek",
    ],
  },
] as const;

export const foundations = ["DSA", "DBMS", "OOP"] as const;

export const projects = [
  {
    index: "01",
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
      "Backend APIs & media handling",
      "Production deployment",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    href: "https://github.com/R4NiTeXe",
    repo: "https://github.com/R4NiTeXe/Video-Tube",
    live: null,
    preview: "video",
  },
  {
    index: "02",
    name: "Dukaan_Sathi",
    category: "Hackathon Team Project",
    status: "Top 6 — Hackathon",
    tone: "amber" as const,
    role: "Team member — hackathon sprint",
    description:
      "An AI-assisted e-commerce companion for small shopkeepers — practical retail and business workflows, built under sprint pressure at the Digontom Pvt. Ltd. hackathon.",
    features: [
      "AI-assisted retail workflows",
      "Practical business tooling for shopkeepers",
      "Hackathon sprint — Top 6 finalist team",
    ],
    stack: ["React.js", "Express.js", "MongoDB"],
    href: "https://github.com/R4NiTeXe",
    repo: "https://github.com/R4NiTeXe/Dukaan_Sathi",
    live: null,
    preview: "retail",
  },
  {
    index: "03",
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
    stack: ["Three.js", "React.js", "AI tooling"],
    href: "https://github.com/R4NiTeXe",
    repo: null,
    live: null,
    preview: "anatomy",
  },
] as const;

export const milestones = [
  {
    period: "2022",
    role: "Secondary Education",
    title: "WBBSE — Class X",
    description:
      "Foundations of mathematics and science before the engineering path.",
  },
  {
    period: "2024",
    role: "Higher Secondary",
    title: "WBCHSE — Class XII (Arts)",
    description: "Completed Class XII with 66% — the turn toward computing.",
  },
  {
    period: "2024 — 2027",
    role: "Diploma in CSE",
    title: "Brainware University",
    tag: "active",
    description:
      "CGPA 7.01 through the 4th semester — DSA, DBMS, OOP and systems foundations.",
  },
  {
    period: "2025",
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
      "Designed, built and deployed a complete video platform — the first full production cycle.",
  },
  {
    period: "2027",
    role: "Target",
    title: "Diploma Completion",
    tag: "target",
    description:
      "Completing the Diploma in CSE — and continuing to ship software on the way.",
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