import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#05070D",
          color: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#38BDF8" }}>
          R4NiTeXe / ASPIRING FULL-STACK DEVELOPER
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700 }}>
          Ranit Naskar
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#94A3B8", marginTop: 12 }}>
          {site.description}
        </div>
      </div>
    ),
    size,
  );
}