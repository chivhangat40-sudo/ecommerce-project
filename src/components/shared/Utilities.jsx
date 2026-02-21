import React from "react";
import { Icon } from "../../utils/icons";

export function StarsRow({ rating, reviews, T }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex" }}>
        {Array.from({ length: 5 }, (_, i) => (
          <Icon.Star
            key={i}
            fill={i < Math.floor(rating) ? "#F59E0B" : i < rating ? "#F59E0B88" : "#334155"}
          />
        ))}
      </div>
      <span style={{ fontSize: 11, color: T.textSec }}>
        {rating} ({reviews?.toLocaleString() || "0"})
      </span>
    </div>
  );
}

export function PasswordStrength({ password, T }) {
  const checks = [
    { label: "8+ chars", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
    { label: "Symbol", pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const color =
    score <= 1 ? T.error : score === 2 ? T.warning : score === 3 ? "#F59E0B" : T.success;
  const label = ["", "Weak", "Fair", "Good", "Strong"][score];

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: i <= score ? color : T.border,
              transition: "background .3s",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {checks.map((c) => (
            <span
              key={c.label}
              style={{
                fontSize: 10,
                color: c.pass ? T.success : T.textSec,
                fontWeight: 600,
              }}
            >
              {c.pass ? "✓" : "○"} {c.label}
            </span>
          ))}
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color }}>{label}</span>
      </div>
    </div>
  );
}
