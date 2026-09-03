# 🌑 Personal Portfolio

> **Full-stack development at the edge of light.**  
> A high-performance, celestial-themed personal portfolio built with Next.js 15, React 19, Three.js custom shaders, and real-time physics simulations.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

🔗 **Live Demo:** [ranitnaska.me](https://ranitnaska.me) · **Developer:** [Ranit Naskar](https://github.com/R4NiTeXe)

---

## ✨ Key Highlights

- 🪐 **Custom WebGL Eclipse Shaders:** Built with Three.js and custom GLSL vertex/fragment shaders featuring Fractal Brownian Motion (FBM) surface noise, normal perturbations, and dynamic coronal limb illumination.
- 🚀 **Orbit Lab Arcade:** An integrated 2D orbital gravity simulation written in pure TypeScript on HTML5 Canvas, complete with thruster controls, beacon pickups, and combo multipliers.
- ⚡ **Power-User Tools & Micro-Interactions:**
  - **Command Palette (`Cmd+K` / `Ctrl+K`):** Fast keyboard-driven site navigation and quick actions.
  - **Retro Terminal (`G` key):** Interactive telemetry console displaying boot sequences and credentials.
  - **Easter Eggs:** Hidden Konami code (`↑↑↓↓←→←→ba`) and keyword particle bursts.
  - **Magnetic Cursor:** Hardware-accelerated pointer with lerped trailing and contextual element snapping.
- 🎨 **Visual Spec & Dark Celestial Theme:** Measured chromatic palette (`#070A0F`, `#65F6D5`, `#8B7CFF`), Space Grotesk typography, and fluid GSAP scroll triggers.
- ♿ **Accessible & Optimized:** Strict `prefers-reduced-motion` compliance across all WebGL/Canvas loops, full Schema.org JSON-LD structured data, and dynamic OpenGraph generation.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15 (Turbopack, App Router), React 19, TypeScript |
| **3D & Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei`, Custom GLSL |
| **Animation** | GSAP 3.15 (`ScrollTrigger`, `quickTo`) |
| **Styling & UI** | Tailwind CSS v4, Radix UI primitives, Lucide Icons |
| **Tooling** | ESLint 9, Prettier |

---

## 📁 Architecture Overview

```text
src/
├── app/                  # App Router: pages, layouts, SEO (OG, sitemap, robots)
├── components/
│   ├── hero/             # 3D Eclipse canvas, shaders, and hero section
│   ├── games/            # Orbit Lab physics game, code debugger, git quiz
│   ├── work/             # Featured project showcases & modal previews
│   ├── seo/              # Structured data & Schema.org JSON-LD
│   ├── ui/               # Reusable primitives (buttons, dialogs, badges)
│   ├── celestial.tsx     # Procedural starfield & cosmic background
│   ├── command-palette.tsx
│   ├── terminal.tsx
│   └── cursor.tsx        # Hardware-accelerated magnetic cursor
└── lib/
    ├── data.ts           # Project archives, milestones, and telemetry data
    ├── site.ts           # Global site metadata & external links
    └── utils.ts          # Shared class utility helpers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or later
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/R4NiTeXe/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production build:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📬 Contact & Connect

- **Author:** Ranit Naskar
- **Email:** [ranitnaskar09032007@gmail.com](mailto:ranitnaskar09032007@gmail.com)
- **GitHub:** [@R4NiTeXe](https://github.com/R4NiTeXe)
- **LinkedIn:** [Ranit Naskar](https://www.linkedin.com/in/ranit-naskar/)

---

⭐ *Deliberate software at the edge of light.*
