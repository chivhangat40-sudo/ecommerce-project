import React from "react";
import { Icon } from "../utils/icons";
import { StarsRow } from "./shared/Utilities";

export function ProductCard({
  T,
  product,
  viewMode,
  wishlisted,
  inCompare,
  onWishlist,
  onCompare,
  onAddToCart,
  onView,
}) {
  const disc =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;
  const inStock = product.stock > 0;

  if (viewMode === "list") {
    return (
      <div
        className="card"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div
          onClick={onView}
          style={{
            width: 90,
            height: 90,
            background: `${product.color}22`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {product.img}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: T.textSec, marginBottom: 2 }}>
            {product.brand} · {product.category}
          </div>
          <div
            onClick={onView}
            style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, cursor: "pointer" }}
          >
            {product.name}
          </div>
          <div style={{ fontSize: 12, color: T.textSec, marginBottom: 6 }}>
            {product.description}
          </div>
          <StarsRow rating={product.rating} reviews={product.reviews} T={T} />
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: T.accent, marginBottom: 2 }}>
            ${product.price.toLocaleString()}
          </div>
          {disc > 0 && (
            <div style={{ fontSize: 12, color: T.textSec, textDecoration: "line-through", marginBottom: 8 }}>
              ${product.originalPrice.toLocaleString()}
            </div>
          )}
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={onWishlist}
              className="btn wishlist-hover"
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 8,
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon.Heart f={wishlisted} />
            </button>
            <button
              onClick={onAddToCart}
              className="btn"
              style={{
                background: `linear-gradient(135deg,#1D4ED8,#2563EB)`,
                color: "white",
                borderRadius: 8,
                padding: "0 14px",
                height: 34,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card"
      style={{
        background: T.card,
        border: `1px solid ${inCompare ? T.accent2 : T.border}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      {/* Image */}
      <div
        style={{
          background: `linear-gradient(135deg, ${product.color}18, ${product.color}35)`,
          padding: "24px 16px",
          position: "relative",
          cursor: "pointer",
          textAlign: "center",
          minHeight: 130,
        }}
        onClick={onView}
      >
        <span style={{ fontSize: 60 }}>{product.img}</span>
        {product.badge && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background:
                product.badge === "NEW"
                  ? "#059669"
                  : product.badge === "HOT"
                    ? "#DC2626"
                    : product.badge === "BESTSELLER"
                      ? "#D97706"
                      : product.badge === "PRO"
                        ? "#7C3AED"
                        : product.badge === "EXCLUSIVE"
                          ? "#0E7490"
                          : "#1D4ED8",
              color: product.badge === "BESTSELLER" ? "#000" : "white",
              fontSize: 9,
              fontWeight: 800,
              padding: "3px 7px",
              borderRadius: 5,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            {product.badge}
          </div>
        )}
        {disc > 0 && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "#DC2626",
              color: "white",
              fontSize: 10,
              fontWeight: 800,
              padding: "3px 7px",
              borderRadius: 5,
            }}
          >
            -{disc}%
          </div>
        )}
        <div style={{ position: "absolute", bottom: 8, right: 8, display: "flex", gap: 4 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWishlist();
            }}
            className="btn wishlist-hover"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "none",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon.Heart f={wishlisted} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompare();
            }}
            className="btn"
            style={{
              background: inCompare ? `${T.accent2}cc` : "rgba(0,0,0,0.5)",
              border: "none",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <Icon.Compare />
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <div
          style={{
            fontSize: 10,
            color: T.textSec,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {product.brand}
        </div>
        <div
          onClick={onView}
          style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, cursor: "pointer" }}
        >
          {product.name}
        </div>
        <div style={{ fontSize: 11, color: T.textSec }}>{product.description}</div>
        <StarsRow rating={product.rating} reviews={product.reviews} T={T} />
        <div
          style={{
            fontSize: 11,
            color: product.stock > 10 ? T.success : product.stock > 3 ? T.warning : T.error,
            fontWeight: 600,
          }}
        >
          {product.stock > 10
            ? "✓ In Stock"
            : product.stock > 3
              ? `⚠ Only ${product.stock} left`
              : "🔴 Almost Gone"}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: T.accent }}>
            ${product.price.toLocaleString()}
          </span>
          {disc > 0 && (
            <span style={{ fontSize: 12, color: T.textSec, textDecoration: "line-through" }}>
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={onAddToCart}
          disabled={!inStock}
          className="btn"
          style={{
            marginTop: 8,
            padding: "10px",
            borderRadius: 9,
            border: "none",
            background: inStock ? `linear-gradient(135deg,#1D4ED8,#2563EB)` : `${T.border}`,
            color: inStock ? "white" : T.textMuted,
            fontSize: 12,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Icon.Cart /> {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export function MiniProductCard({ T, product, wishlisted, onWishlist, onAddToCart, onView }) {
  const disc =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  return (
    <div
      className="card"
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}
    >
      <div
        onClick={onView}
        style={{
          background: `${product.color}22`,
          padding: "20px 14px",
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <span style={{ fontSize: 52 }}>{product.img}</span>
        {disc > 0 && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "#DC2626",
              color: "white",
              fontSize: 9,
              fontWeight: 800,
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            -{disc}%
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlist();
          }}
          className="btn"
          style={{
            position: "absolute",
            bottom: 6,
            right: 6,
            background: "rgba(0,0,0,0.5)",
            border: "none",
            borderRadius: "50%",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon.Heart f={wishlisted} />
        </button>
      </div>
      <div style={{ padding: "12px" }}>
        <div style={{ fontSize: 11, color: T.textSec, marginBottom: 2 }}>{product.brand}</div>
        <div
          onClick={onView}
          style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, cursor: "pointer", lineHeight: 1.3 }}
        >
          {product.name}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: T.accent }}>
            ${product.price.toLocaleString()}
          </span>
          <button
            onClick={onAddToCart}
            className="btn"
            style={{
              background: "#1D4ED8",
              color: "white",
              borderRadius: 8,
              padding: "5px 10px",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
}
