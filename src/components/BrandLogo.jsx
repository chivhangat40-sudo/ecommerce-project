import React from "react";

export function BrandLogo({ size = 36, showText = true, T }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="url(#logoGrad1)" />
        <path d="M8 12 L14 12 L20 26 L26 12 L32 12" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="13" y1="30" x2="27" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="8" cy="12" r="2.2" fill="white" />
        <circle cx="32" cy="12" r="2.2" fill="white" />
        <circle cx="20" cy="26" r="2.2" fill="white" />
      </svg>

      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontSize: size * 0.48,
              fontWeight: 900,
              letterSpacing: "-0.5px",
              color: T ? T.text : "white",
              fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
          >
            <span style={{ color: "#1D4ED8" }}>Officxl</span>
            <span style={{ color: T ? T.text : "white" }}>Vault</span>
            <span style={{ color: "#00D4FF", fontSize: size * 0.38 }}>_Tech</span>
          </span>
        </div>
      )}
    </div>
  );
}
