import React, { useState } from "react";

export function FilterBox({ T, title, children }) {
  const [open, setOpen] = useState(true);
  
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn"
        style={{
          width: "100%",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          color: T.text,
          fontSize: 13,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {title}
        <span
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform .2s",
            color: T.textSec,
            fontSize: 16,
          }}
        >
          ›
        </span>
      </button>
      {open && <div style={{ padding: "0 16px 14px" }}>{children}</div>}
    </div>
  );
}
