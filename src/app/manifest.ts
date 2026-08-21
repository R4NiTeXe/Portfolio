import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.brand} Portfolio`,
    short_name: site.brand,
    description:
      "Portfolio of Ranit Naskar — Software Developer from Kolkata, India crafting deliberate software at the edge of light.",
    start_url: "/",
    display: "standalone",
    background_color: "#070A0F",
    theme_color: "#070A0F",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
