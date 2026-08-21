import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";

export const alt = "Ranit Naskar — Software Developer | ECLIPSE";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070A0F",
          padding: 56,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -40,
            width: 520,
            height: 360,
            borderRadius: 9999,
            background:
              "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(139,124,255,0.32), rgba(139,124,255,0.08) 55%, transparent 78%)",
            filter: "blur(6px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 120,
            right: -40,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background:
              "radial-gradient(ellipse 50% 42% at 50% 50%, rgba(101,246,213,0.18), rgba(101,246,213,0.04) 55%, transparent 78%)",
            filter: "blur(8px)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.22em",
              color: "#65F6D5",
              textTransform: "uppercase" as const,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: "#65F6D5",
                boxShadow: "0 0 10px rgba(101,246,213,0.9)",
              }}
            />
            ECLIPSE
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "rgba(230,237,243,0.5)",
              textTransform: "uppercase" as const,
            }}
          >
            KOLKATA — IN
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 86,
            right: 120,
            width: 220,
            height: 220,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 30% 28%, #131C2E 0%, #0B1120 45%, #05070D 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            boxShadow:
              "inset -4px 4px 14px rgba(0,0,0,0.95), inset 4px -4px 14px rgba(139,124,255,0.18)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -8,
              left: -18,
              width: 120,
              height: 120,
              borderRadius: 9999,
              background:
                "radial-gradient(circle, rgba(139,124,255,0.22), transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              width: 44,
              height: 44,
              borderRadius: 9999,
              background: "rgba(101,246,213,0.9)",
              filter: "blur(14px)",
              opacity: 0.9,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            marginTop: 28,
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "#65F6D5",
              textTransform: "uppercase" as const,
              display: "flex",
            }}
          >
            {"// Software Developer"}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "white",
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>RANIT</span>
            <span style={{ display: "flex" }}>NASKAR</span>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 300,
              color: "#65F6D5",
              marginTop: 16,
              textShadow: "0 0 24px rgba(101,246,213,0.45)",
              display: "flex",
            }}
          >
            Full-stack development at the edge of light.
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              color: "rgba(230,237,243,0.55)",
              marginTop: 14,
              display: "flex",
            }}
          >
            React · Node.js · MongoDB · Docker · Three.js
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 18,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "rgba(230,237,243,0.45)",
              display: "flex",
            }}
          >
            {new URL(site.url).host}
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "rgba(101,246,213,0.9)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 9999,
                background: "#65F6D5",
              }}
            />
            Available for work
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
