export interface JourneyStep {
  id: string;
  period: string;
  title: string;
  description: string;
}

export const journey: JourneyStep[] = [
  {
    id: "foundations",
    period: "Starting point",
    title: "Web foundations",
    description:
      "Learned the core of the web — HTML, CSS and JavaScript — and how browsers, servers and HTTP actually fit together.",
  },
  {
    id: "fullstack",
    period: "Building up",
    title: "Full-stack learning",
    description:
      "Moved into the MERN world: React, Next.js, Node.js, Express and MongoDB — and the engineering patterns that hold them together.",
  },
  {
    id: "projects",
    period: "2024–now",
    title: "Real-world projects",
    description:
      "Designed and shipped two real products: Video-Tube, a streaming platform with Redis-backed caching, and Dukaan Sathi, an AI billing platform in Bengali, Hindi and English.",
  },
  {
    id: "current",
    period: "Now",
    title: "Current development",
    description:
      "Deepening skills in TypeScript, distributed caching, and production engineering — while building this portfolio as a product.",
  },
  {
    id: "future",
    period: "Next",
    title: "Future professional development",
    description:
      "Heading toward internships and junior full-stack roles where I can build real products with real users at scale.",
  },
];