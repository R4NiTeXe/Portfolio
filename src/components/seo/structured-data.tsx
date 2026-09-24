import { site } from "@/lib/site";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        url: site.url,
        jobTitle: site.role,
        email: `mailto:${site.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kolkata",
          addressRegion: "West Bengal",
          addressCountry: "IN",
        },
        sameAs: [site.github, site.linkedin],
        knowsAbout: [
          "TypeScript",
          "React.js",
          "Next.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "JWT",
          "Docker",
          "Three.js",
          "React Three Fiber",
          "Full-stack Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        description:
          "Portfolio of Ranit Naskar — Software Developer from Kolkata, India building full-stack systems from idea to deployment with TypeScript, Next.js, Node.js, MongoDB and Docker.",
        publisher: {
          "@id": `${site.url}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        isPartOf: {
          "@id": `${site.url}/#website`,
        },
        about: {
          "@id": `${site.url}/#person`,
        },
        mainEntity: {
          "@id": `${site.url}/#person`,
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
