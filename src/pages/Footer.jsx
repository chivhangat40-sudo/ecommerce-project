import React from "react";
import { BrandLogo } from "../components/BrandLogo";

export function Footer({ T, setPage, setActiveCategory }) {
  return (
    <footer
      style={{
        background: T.surface,
        borderTop: `1px solid ${T.border}`,
        marginTop: 60,
        padding: "48px 40px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 32,
            marginBottom: 40,
          }}
        >
          <div>
            <div style={{ marginBottom: 12 }}>
              <BrandLogo size={30} showText={true} T={T} />
            </div>
            <p
              style={{
                color: T.textSec,
                fontSize: 13,
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              Your premium destination for electronics & gadgets. Curated for tech enthusiasts.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["𝕏", "📘", "📸", "▶️"].map((s, i) => (
                <button
                  key={i}
                  className="btn"
                  style={{
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    borderRadius: 8,
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {[
            {
              title: "Shop",
              links: [
                ["All Products", "shop", "all"],
                ["Smartphones", "shop", "smartphones"],
                ["Laptops", "shop", "laptops"],
                ["Audio", "shop", "audio"],
                ["Gaming", "shop", "gaming"],
              ],
            },
            {
              title: "Support",
              links: [
                ["Help Center", null],
                [" Track Order", null],
                ["Returns", null],
                ["Warranty", null],
              ],
            },
            {
              title: "Company",
              links: [
                ["About Us", null],
                ["Careers", null],
                ["Blog", null],
                ["Press", null],
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: T.text,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 14,
                }}
              >
                {col.title}
              </h4>
              {col.links.map(([label, page, cat]) => (
                <div
                  key={label}
                  onClick={() => {
                    if (page) {
                      setPage(page);
                      if (cat) setActiveCategory(cat);
                    }
                  }}
                  style={{
                    marginBottom: 9,
                    fontSize: 13,
                    color: T.textSec,
                    cursor: page ? "pointer" : "default",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) =>
                    page && (e.currentTarget.style.color = T.accent)
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.style.color = T.textSec
                  }
                >
                  {label}
                </div>
              ))}
            </div>
          ))}
          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.text,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 14,
              }}
            >
              Newsletter
            </h4>
            <p style={{ fontSize: 12, color: T.textSec, marginBottom: 12, lineHeight: 1.5 }}>
              Get the latest deals and product launches.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                placeholder="your@email.com"
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  color: T.text,
                  borderRadius: 9,
                  padding: "9px 12px",
                  fontSize: 12,
                  outline: "none",
                }}
              />
              <button
                className="btn"
                style={{
                  background: `linear-gradient(135deg,#1D4ED8,${T.accent})`,
                  color: "white",
                  borderRadius: 9,
                  padding: "9px",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: `1px solid ${T.border}`,
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span style={{ color: T.textSec, fontSize: 12 }}>
            © 2025 OfficxlVault_Tech Inc. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <span
                key={l}
                style={{
                  color: T.textSec,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
