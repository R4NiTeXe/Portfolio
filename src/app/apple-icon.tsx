import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070A0F",
          borderRadius: 24,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 30% 28%, #131C2E 0%, #0B1120 45%, #05070D 100%)",
            border: "2px solid rgba(101,246,213,0.3)",
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -6,
              left: -10,
              width: 60,
              height: 60,
              borderRadius: 9999,
              background:
                "radial-gradient(circle, rgba(139,124,255,0.3), transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 10,
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: "rgba(101,246,213,0.9)",
              filter: "blur(6px)",
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.12em",
              display: "flex",
            }}
          >
            E
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
