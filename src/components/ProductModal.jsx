import React, { useState } from "react";
import { Icon } from "../utils/icons";
import { StarsRow } from "./shared/Utilities";

export function ProductModal({
  T,
  product,
  onClose,
  wishlisted,
  inCompare,
  onWishlist,
  onCompare,
  onAddToCart,
  relatedProducts,
  reviews,
  viewProduct,
}) {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const disc =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          zIndex: 2999,
          backdropFilter: "blur(6px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(820px,95vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          background: T.surface,
          borderRadius: 24,
          border: `1px solid ${T.border}`,
          zIndex: 3000,
          animation: "scaleIn .3s ease",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
        }}
      >
        <button
          onClick={onClose}
          className="btn"
          style={{
            position: "sticky",
            float: "right",
            top: 12,
            right: 12,
            zIndex: 1,
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 9,
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.textSec,
            margin: "12px 12px 0 0",
          }}
        >
          <Icon.X />
        </button>

        <div style={{ display: "flex", flexWrap: "wrap", clear: "both" }}>
          {/* Left */}
          <div
            style={{
              flex: "0 0 300px",
              minWidth: 240,
              background: `linear-gradient(135deg,${product.color}18,${product.color}40)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              borderRadius: "24px 0 0 24px",
              minHeight: 320,
            }}
          >
            <div className="float" style={{ fontSize: 110, marginBottom: 20 }}>
              {product.img}
            </div>
            {product.colors.length > 1 && (
              <div style={{ display: "flex", gap: 8 }}>
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className="btn"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: c,
                      border: `3px solid ${selectedColor === c ? T.accent : T.border}`,
                      boxShadow: selectedColor === c ? `0 0 0 2px ${T.accent}` : "none",
                      transition: "all .2s",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <div style={{ flex: 1, padding: "28px 28px 20px", minWidth: 240 }}>
            <div
              style={{
                fontSize: 11,
                color: T.textSec,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 6,
              }}
            >
              {product.brand} · {product.category}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6, lineHeight: 1.2 }}>
              {product.name}
            </h2>
            <div style={{ marginBottom: 12 }}>
              <StarsRow rating={product.rating} reviews={product.reviews} T={T} />
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: `1px solid ${T.border}` }}>
              {["overview", "specs", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="btn"
                  style={{
                    background: "none",
                    color: activeTab === tab ? T.accent : T.textSec,
                    fontWeight: activeTab === tab ? 700 : 400,
                    fontSize: 13,
                    padding: "8px 16px",
                    borderBottom: `2px solid ${activeTab === tab ? T.accent : "transparent"}`,
                    textTransform: "capitalize",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div>
                <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.6, marginBottom: 12 }}>
                  {product.description}
                </p>
                <div
                  style={{
                    fontSize: 12,
                    color:
                      product.stock > 10 ? T.success : product.stock > 3 ? T.warning : T.error,
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  {product.stock > 10
                    ? `✓ In Stock (${product.stock} units)`
                    : product.stock > 3
                      ? `⚠ Only ${product.stock} remaining`
                      : "❌ Out of Stock"}
                </div>
              </div>
            )}
            {activeTab === "specs" && (
              <div style={{ marginBottom: 12 }}>
                {product.specs.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 0",
                      borderBottom: `1px solid ${T.border}`,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: T.accent, fontSize: 12 }}>
                      <Icon.Check />
                    </span>
                    <span style={{ color: T.textSec }}>{s}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "reviews" && (
              <div style={{ marginBottom: 12 }}>
                {reviews.length === 0 ? (
                  <p style={{ color: T.textSec, fontSize: 13 }}>No reviews yet.</p>
                ) : (
                  reviews.map((r, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{r.user}</span>
                        <span style={{ fontSize: 11, color: T.textSec }}>{r.date}</span>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <StarsRow rating={r.rating} reviews={null} T={T} />
                      </div>
                      <p style={{ fontSize: 12, color: T.textSec, lineHeight: 1.5 }}>
                        {r.comment}
                      </p>
                      <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>
                        👍 {r.helpful} found helpful
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Price & Actions */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 30, fontWeight: 900, color: T.accent }}>
                ${product.price.toLocaleString()}
              </span>
              {disc > 0 && (
                <>
                  <span style={{ fontSize: 16, color: T.textSec, textDecoration: "line-through" }}>
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span
                    style={{
                      background: T.error,
                      color: "white",
                      fontSize: 11,
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: 5,
                    }}
                  >
                    -{disc}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Qty */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: T.textSec, fontWeight: 600 }}>Qty:</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: T.card,
                  borderRadius: 9,
                  border: `1px solid ${T.border}`,
                  padding: "0 4px",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="btn"
                  style={{ background: "none", color: T.text, padding: "4px 8px", fontSize: 18 }}
                >
                  −
                </button>
                <span style={{ fontWeight: 700, minWidth: 24, textAlign: "center" }}>{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="btn"
                  style={{ background: "none", color: T.text, padding: "4px 8px", fontSize: 18 }}
                >
                  +
                </button>
              </div>
              <span style={{ fontSize: 12, color: T.textSec }}>
                = <strong style={{ color: T.text }}>${(product.price * qty).toLocaleString()}</strong>
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <button
                onClick={() => onAddToCart(selectedColor)}
                className="btn"
                style={{
                  flex: 1,
                  padding: "13px",
                  borderRadius: 11,
                  background: `linear-gradient(135deg,#1D4ED8,${T.accent})`,
                  color: "white",
                  fontSize: 14,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Icon.Cart /> Add to Cart
              </button>
              <button
                onClick={onWishlist}
                className="btn"
                style={{
                  padding: "13px 16px",
                  borderRadius: 11,
                  border: `1px solid ${wishlisted ? "#EF4444" : T.border}`,
                  background: wishlisted ? "#EF444422" : "none",
                }}
              >
                <Icon.Heart f={wishlisted} />
              </button>
              <button
                onClick={onCompare}
                className="btn"
                style={{
                  padding: "13px 16px",
                  borderRadius: 11,
                  border: `1px solid ${inCompare ? T.accent2 : T.border}`,
                  background: inCompare ? `${T.accent2}22` : "none",
                  color: inCompare ? T.accent2 : T.textSec,
                }}
              >
                <Icon.Compare />
              </button>
              <button
                className="btn"
                style={{
                  padding: "13px 16px",
                  borderRadius: 11,
                  border: `1px solid ${T.border}`,
                  background: "none",
                  color: T.textSec,
                }}
              >
                <Icon.Share />
              </button>
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              {["🚚 Free Ship", "🔄 30-Day Return", "🛡 2yr Warranty"].map((f) => (
                <div key={f} style={{ fontSize: 10, color: T.textSec, textAlign: "center", lineHeight: 1.5 }}>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div style={{ padding: "20px 28px 28px", borderTop: `1px solid ${T.border}` }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 14,
                color: T.textSec,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Related Products
            </h3>
            <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => viewProduct(p)}
                  style={{
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    borderRadius: 12,
                    padding: 14,
                    cursor: "pointer",
                    minWidth: 140,
                    flexShrink: 0,
                    textAlign: "center",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
                >
                  <div style={{ fontSize: 36, marginBottom: 6 }}>{p.img}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 2 }}>
                    {p.name.slice(0, 18)}
                  </div>
                  <div style={{ fontSize: 12, color: T.accent, fontWeight: 800 }}>
                    ${p.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
