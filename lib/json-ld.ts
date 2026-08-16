import { site } from "@/lib/data/site";
import { profile } from "@/lib/data/profile";
import { skillClusters } from "@/lib/data/skills";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: site.url,
  image: `${site.url}${site.ogImage}`,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressCountry: "IN",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: profile.education.school,
  },
  knowsAbout: skillClusters.flatMap((cluster) =>
    cluster.items.map((item) => item.name),
  ),
  sameAs: [site.github, site.linkedin],
} as const;