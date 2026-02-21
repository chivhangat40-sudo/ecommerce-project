import React from "react";
import { Icon } from "../../utils/icons";

export function ToastContainer({ toast, T }) {
  return (
    <div style={{ position: "fixed", top: 80, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toast.map((t) => (
        <div
          key={t.id}
          style={{
            animation: "slideR .3s ease",
            background:
              t.type === "error" ? "#7F1D1D" : t.type === "info" ? T.surface : "#064E3B",
            border: `1px solid ${t.type === "error" ? T.error : t.type === "info" ? T.border : T.success}`,
            color: "white",
            padding: "11px 18px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 500,
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            minWidth: 240,
            maxWidth: 320,
          }}
        >
          <span style={{ fontSize: 16 }}>
            {t.type === "error" ? "❌" : t.type === "info" ? "ℹ️" : "✅"}
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export function CompareBar({ T, compareList, toggleCompare, setPage, setCompareList }) {
  if (compareList.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 800,
        background: T.surface,
        borderTop: `1px solid ${T.border}`,
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        backdropFilter: "blur(20px)",
        animation: "slideUp .3s ease",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 14, color: T.accent }}>
        Compare ({compareList.length}/3)
      </div>
      <div style={{ display: "flex", gap: 10, flex: 1 }}>
        {compareList.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: T.card,
              borderRadius: 8,
              padding: "6px 12px",
              border: `1px solid ${T.border}`,
            }}
          >
            <span>{p.img}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name.slice(0, 18)}..</span>
            <button
              onClick={() => toggleCompare(p)}
              className="btn"
              style={{ background: "none", color: T.textSec, padding: 2 }}
            >
              <Icon.X />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPage("compare")}
        className="btn"
        style={{
          background: T.accent,
          color: "#000",
          borderRadius: 10,
          padding: "9px 20px",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        Compare Now →
      </button>
      <button
        onClick={() => setCompareList([])}
        className="btn"
        style={{
          background: "none",
          border: `1px solid ${T.border}`,
          color: T.textSec,
          borderRadius: 10,
          padding: "9px 16px",
          fontSize: 13,
        }}
      >
        Clear
      </button>
    </div>
  );
}
