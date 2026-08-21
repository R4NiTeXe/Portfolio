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
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Three.js",
          "Next.js",
          "Full-stack Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — ${site.role} | ${site.brand}`,
        description:
          "Portfolio of Ranit Naskar — Software Developer from Kolkata, India crafting full-stack web experiences with React, Node.js, MongoDB, Three.js and modern tooling.",
        publisher: {
          "@id": `${site.url}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: `${site.name} — ${site.role} | ${site.brand}`,
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
