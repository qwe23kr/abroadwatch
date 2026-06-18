import { ImageResponse } from "next/og";

export const alt = "AbroadWatch travel emergency and safety guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background: "linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 88,
              height: 88,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              background: "white",
              color: "#2563eb",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            AW
          </div>
          <div style={{ fontSize: 44, fontWeight: 800 }}>AbroadWatch</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            <div>Travel emergencies,</div>
            <div>handled step by step.</div>
          </div>
          <div style={{ fontSize: 28, color: "#dbeafe" }}>
            Passports · Hospitals · Police · Scams · 19 Asian cities
          </div>
        </div>
      </div>
    ),
    size,
  );
}
