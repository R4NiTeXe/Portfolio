export interface SkillItem {
  name: string;
  capabilities: string[];
  usedIn: string[];
}

export interface SkillCluster {
  id: string;
  label: string;
  items: SkillItem[];
}

export const skillClusters: SkillCluster[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      {
        name: "React / Next.js",
        capabilities: [
          "App Router and Server/Client component separation",
          "React Query caching with optimistic UI updates",
          "Typed client-server communication",
        ],
        usedIn: ["Video-Tube", "Dukaan Sathi"],
      },
      {
        name: "TypeScript",
        capabilities: [
          "Typed APIs and data models",
          "Strict mode across full-stack codebases",
        ],
        usedIn: ["Video-Tube", "Dukaan Sathi"],
      },
      {
        name: "Tailwind CSS",
        capabilities: [
          "Utility-first styling with dark-mode support",
          "Token-driven theming",
        ],
        usedIn: ["Dukaan Sathi"],
      },
      {
        name: "Framer Motion",
        capabilities: [
          "UI micro-animations",
          "Animated quality-selector popovers",
        ],
        usedIn: ["Video-Tube", "Dukaan Sathi"],
      },
      {
        name: "TanStack Query",
        capabilities: [
          "Intelligent client caching",
          "Optimistic UI state updates",
        ],
        usedIn: ["Video-Tube"],
      },
      {
        name: "Zustand",
        capabilities: ["Minimal global auth state management"],
        usedIn: ["Video-Tube"],
      },
      {
        name: "hls.js",
        capabilities: ["Adaptive bitrate HLS playback", "Custom player controls"],
        usedIn: ["Video-Tube"],
      },
      {
        name: "Recharts",
        capabilities: ["Real-time analytics charts", "Revenue trend visuals"],
        usedIn: ["Dukaan Sathi"],
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      {
        name: "Node.js / Express",
        capabilities: [
          "REST API design with ESM",
          "Express 4 and 5 routing and middleware",
        ],
        usedIn: ["Video-Tube", "Dukaan Sathi"],
      },
      {
        name: "JWT Authentication",
        capabilities: [
          "Access/refresh token lifecycles with httpOnly cookies",
          "Silent refresh and Redis-backed revocation",
        ],
        usedIn: ["Video-Tube", "Dukaan Sathi"],
      },
      {
        name: "Zod Validation",
        capabilities: ["Schema validation at the API edge"],
        usedIn: ["Dukaan Sathi"],
      },
      {
        name: "Server-Sent Events",
        capabilities: ["Real-time notification fan-out"],
        usedIn: ["Video-Tube"],
      },
      {
        name: "Rate Limiting",
        capabilities: ["Abuse prevention per IP", "Brute-force protection"],
        usedIn: ["Dukaan Sathi"],
      },
    ],
  },
  {
    id: "database",
    label: "Database",
    items: [
      {
        name: "MongoDB + Mongoose",
        capabilities: [
          "Schema design with ODM models",
          "$lookup aggregations for analytics",
          "Atomic interaction updates",
        ],
        usedIn: ["Video-Tube", "Dukaan Sathi"],
      },
      {
        name: "Redis",
        capabilities: [
          "Distributed locking with SET NX EX",
          "Caching and token revocation",
        ],
        usedIn: ["Video-Tube"],
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      {
        name: "Git / GitHub",
        capabilities: ["Version control", "Public building-in-public repos"],
        usedIn: ["Video-Tube", "Dukaan Sathi"],
      },
      {
        name: "Docker",
        capabilities: ["Multi-stage production builds"],
        usedIn: ["Video-Tube"],
      },
      {
        name: "Cloudinary",
        capabilities: ["Media pipelines and HLS generation", "Uploads and CDN"],
        usedIn: ["Video-Tube", "Dukaan Sathi"],
      },
      {
        name: "Google Gemini API",
        capabilities: ["Voice-to-bill extraction", "AI advisor intent detection"],
        usedIn: ["Dukaan Sathi"],
      },
      {
        name: "Vercel / Render",
        capabilities: ["Frontend and API deployment"],
        usedIn: ["Video-Tube", "Dukaan Sathi"],
      },
    ],
  },
];