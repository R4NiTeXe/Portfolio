export interface XRayLayer {
  id: string;
  label: string;
  description: string;
  tech: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  features: string[];
  problem: string;
  solution: string;
  architecture: string;
  challenges: string[];
  learned: string[];
  futureImprovements: string[];
  github: string;
  live?: string;
  collaborators?: string[];
  xray: XRayLayer[];
}

export const projects: Project[] = [
  {
    slug: "video-tube",
    name: "Video-Tube",
    tagline: "Enterprise-grade full-stack video platform",
    description:
      "A production-ready, highly scalable video-sharing platform with adaptive bitrate streaming, real-time telemetry, and a heavily optimized caching layer. Runs on free tiers today — the architecture is built to scale on paid infrastructure.",
    tech: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Cloudinary",
      "Zustand",
      "React Query",
      "hls.js",
    ],
    features: [
      "Adaptive bitrate streaming with 1080p / 720p / 480p HLS fallback",
      "Custom video player with J/K/L, F, Space keyboard shortcuts",
      "Algorithmic discovery with cron-computed trending scores",
      "Subscription engine with real-time SSE fan-out notifications",
      "Atomic like/unlike mutations at the database level",
      "Threaded comment trees with cursor-based pagination",
      "Strict magic-byte MIME validation for uploads",
    ],
    problem:
      "Most learning video platforms are tutorials with toy architectures. I wanted to prove I could design and ship a real streaming platform — adaptive playback, concurrency-safe interactions, and caching under real constraints.",
    solution:
      "A decoupled service-oriented architecture: Express 5 API, Redis for high-throughput locking and revocation, MongoDB for persistent state, Cloudinary for transcoding, and a Next.js client with intelligent React Query caching.",
    architecture:
      "Heavy video transcoding is offloaded to Cloudinary so the Node.js event loop is never blocked. HLS playlists are generated at 1080p, 720p and 480p, served through a custom hls.js player. Redis handles distributed locking (SET NX EX), SSE fan-out, and JWT revocation.",
    challenges: [
      "Keeping the event loop unblocked during media-heavy workflows",
      "Preventing race conditions on concurrent like/unlike mutations",
      "ReDoS-safe aggregation pipelines with strict regex sanitization",
      "Working within free-tier storage, bandwidth and cold-start limits",
    ],
    learned: [
      "Designing distributed locking and cache invalidation with Redis",
      "Building HLS streaming pipelines with Cloudinary webhooks",
      "Securing JWT lifecycles with short-lived tokens and revocation",
      "Writing aggregation pipelines that stay fast under cursor pagination",
    ],
    futureImprovements: [
      "Move to paid infrastructure and lift streaming bandwidth caps",
      "Add chunked video uploads with resumable sessions",
      "Introduce real-time watch analytics per content creator",
    ],
    github: "https://github.com/R4NiTeXe/Video-Tube",
    live: "https://video-tube044.vercel.app/",
    xray: [
      {
        id: "frontend",
        label: "Frontend",
        description:
          "Next.js App Router client with React Query caching, Zustand global auth state, and a custom hls.js player with Framer Motion quality popovers.",
        tech: ["Next.js", "React Query", "Zustand", "hls.js", "Framer Motion"],
      },
      {
        id: "api",
        label: "API",
        description:
          "Express 5 REST layer with ES Modules, JWT middleware, rate limiting, and SSE endpoints for real-time notifications.",
        tech: ["Express", "Node.js", "JWT", "SSE"],
      },
      {
        id: "media",
        label: "Media Pipeline",
        description:
          "Cloudinary transcoding generates .m3u8 playlists at 1080p, 720p and 480p; webhooks keep the platform in sync with the media pipeline.",
        tech: ["Cloudinary", "HLS"],
      },
      {
        id: "cache",
        label: "Cache & Real-time",
        description:
          "Redis 7 with ioredis for distributed mutex locking (SET NX EX), SSE fan-out, and refresh-token revocation.",
        tech: ["Redis", "ioredis"],
      },
      {
        id: "database",
        label: "Database",
        description:
          "MongoDB 7 with Mongoose 9 — $lookup aggregations, atomic interactions, and trending-score computation.",
        tech: ["MongoDB", "Mongoose"],
      },
      {
        id: "auth",
        label: "Authentication",
        description:
          "JWT lifecycle with httpOnly cookies: short-lived access tokens (1d), refresh tokens (10d), and Redis-backed revocation.",
        tech: ["JWT", "bcrypt"],
      },
    ],
  },
  {
    slug: "dukaan-sathi",
    name: "Dukaan Sathi",
    tagline: "AI-powered billing & business intelligence for local Indian shops",
    description:
      "Speak a customer's purchase in Bengali, Hindi or English — AI turns it into a structured bill in seconds. Built with a real-time analytics dashboard, an AI business advisor, and full inventory and customer management.",
    tech: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Google Gemini",
      "Cloudinary",
      "Tailwind CSS",
      "Recharts",
      "Framer Motion",
    ],
    features: [
      "Voice-to-bill AI with Google Gemini in Bengali, Hindi and English",
      "One-tap re-billing of recent items with quantity steppers",
      "Catalog matching with automatic learning of new products",
      "Real-time dashboard with revenue trends and top-product charts",
      "AI business advisor answering questions from real database numbers",
      "Customer purchase history and total spend per phone number",
      "Dual-token JWT with silent refresh and brute-force protection",
    ],
    problem:
      "Local Indian shops still bill manually — slow, error-prone, and invisible to any analytics. English-only software adds a language barrier on top.",
    solution:
      "A tap-to-speak billing flow: Gemini extracts items, quantities, units and prices from natural speech in Bengali, Hindi or English, producing a structured bill in seconds — backed by a real-time analytics dashboard.",
    architecture:
      "A Next.js 15 frontend proxies /api/v1 to an Express 4 backend. The AI layer runs intent detection over MongoDB aggregations, narrated by Gemini. Billing, products, customers and bills are modeled in Mongoose with Zod validation at the edge.",
    challenges: [
      "Reliable item extraction from noisy spoken Bengali and Hindi",
      "Ambiguous product resolution against the saved catalog",
      "Silent token refresh without interrupting active billing sessions",
      "Keeping analytics queries fast on real shop data volumes",
    ],
    learned: [
      "Designing AI-assisted flows where the model is a feature, not the product",
      "Building silent-refresh JWT interceptor patterns on the client",
      "Structuring aggregated analytics over relational-shaped data in MongoDB",
      "Shipping a bilingual product for a non-technical audience",
    ],
    futureImprovements: [
      "Offline billing mode for shops with poor connectivity",
      "GST-ready invoice templates",
      "Multi-shop accounts with per-user roles",
    ],
    github: "https://github.com/R4NiTeXe/Dukaan_Sathi",
    live: "https://dukaansathi-ai.vercel.app/",
    collaborators: ["Pritam Maji"],
    xray: [
      {
        id: "frontend",
        label: "Frontend",
        description:
          "Next.js 15 App Router with Tailwind v4, Recharts dashboards, Framer Motion, next-themes, and an axios client with silent-refresh interceptors.",
        tech: ["Next.js", "Tailwind CSS", "Recharts", "Framer Motion"],
      },
      {
        id: "api",
        label: "API",
        description:
          "Express 4 REST API with Zod validators at the edge, express-rate-limit, Helmet security headers, and a dev proxy from the Next.js frontend.",
        tech: ["Express", "Zod", "Helmet"],
      },
      {
        id: "ai",
        label: "AI Service",
        description:
          "Google Gemini Flash powers the voice-to-bill pipeline (Bengali, Hindi, English) and the business advisor's intent detection over real database numbers.",
        tech: ["Google Gemini"],
      },
      {
        id: "logic",
        label: "Business Logic",
        description:
          "Billing engine with catalog matching and new-product learning, customer stats, bill numbering, and targeted MongoDB aggregations for analytics.",
        tech: ["Node.js", "MongoDB Aggregations"],
      },
      {
        id: "database",
        label: "Database",
        description:
          "MongoDB Atlas with Mongoose 8 — User, Bill, Product and Customer models powering billing, analytics and inventory.",
        tech: ["MongoDB Atlas", "Mongoose"],
      },
      {
        id: "auth",
        label: "Authentication & Media",
        description:
          "Dual-token JWT with silent refresh and brute-force protection; Cloudinary + Multer for profile avatars and shop UPI QR codes.",
        tech: ["JWT", "Cloudinary", "Multer"],
      },
    ],
  },
];