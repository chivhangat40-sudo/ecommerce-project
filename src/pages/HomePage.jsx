import React, { useState } from "react";
import { PRODUCTS, FLASH_DEALS, CATEGORIES, FEATURED_BRANDS } from "../constants/data";
import { ProductCard, MiniProductCard } from "../components/ProductCard";
import { Icon } from "../utils/icons";
import { useCountdown } from "../hooks/useCountdown";

function FlashDeals({ T, deals, addToCart, viewProduct }) {
  const { h, m, s } = useCountdown(7200);

  return (
    <section style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>⚡ Flash Deals</h2>
          <div style={{ display: "flex", gap: 4 }}>
            {[h, m, s]
              .map((val, i) => (
                <span
                  key={i}
                  style={{
                    background: T.error,
                    color: "white",
                    borderRadius: 7,
                    padding: "3px 8px",
                    fontSize: 16,
                    fontWeight: 900,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {val}
                  {i < 2 ? "" : ""}
                </span>
              ))
              .reduce((acc, el, i) =>
                i === 0
                  ? [el]
                  : [
                      ...acc,
                      <span
                        key={`d${i}`}
                        style={{
                          fontSize: 18,
                          fontWeight: 900,
                          color: T.error,
                          alignSelf: "center",
                        }}
                      >
                        :
                      </span>,
                      el,
                    ],
                []
              )}
          </div>
        </div>
        <span style={{ fontSize: 13, color: T.textSec }}>
          Ends in {h}h {m}m {s}s
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
        {deals.map((deal) => {
          const pct = Math.round((1 - deal.price / deal.originalPrice) * 100);
          const product = PRODUCTS.find((p) => p.id === deal.id);
          return (
            <div
              key={deal.id}
              className="card"
              style={{
                background: T.card,
                border: `2px solid ${T.error}44`,
                borderRadius: 16,
                padding: 20,
                cursor: "pointer",
                boxShadow: `0 4px 24px ${T.error}22`,
              }}
              onClick={() => viewProduct(product)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <div style={{ fontSize: 42 }}>{deal.img}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>
                    {deal.name}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: T.accent }}>
                      ${deal.price}
                    </span>
                    <span style={{ fontSize: 13, color: T.textSec, textDecoration: "line-through" }}>
                      ${deal.originalPrice}
                    </span>
                    <span
                      style={{
                        background: T.error,
                        color: "white",
                        fontSize: 11,
                        fontWeight: 800,
                        padding: "2px 6px",
                        borderRadius: 5,
                      }}
                    >
                      -{pct}%
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: T.textSec,
                    marginBottom: 4,
                  }}
                >
                  <span>Sold: {deal.sold}%</span>
                  <span style={{ color: T.error, fontWeight: 700 }}>{100 - deal.sold}% left</span>
                </div>
                <div style={{ height: 6, background: T.border, borderRadius: 3 }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${deal.sold}%`,
                      background: T.error,
                      borderRadius: 3,
                      transition: "width 1s",
                    }}
                  />
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="btn"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 10,
                  background: `linear-gradient(135deg,${T.error},#B91C1C)`,
                  color: "white",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Add to Cart — ${deal.price}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function HomePage({
  T,
  heroes,
  heroIdx,
  setHeroIdx,
  hero,
  PRODUCTS,
  FLASH_DEALS,
  addToCart,
  toggleWishlist,
  wishlist,
  viewProduct,
  setPage,
  setActiveCategory,
  recentlyViewed,
  CATEGORIES,
}) {
  return (
    <div>
      {/* ── Hero ── */}
      <div
        className="hero-slide"
        key={heroIdx}
        style={{
          background: hero.bg,
          minHeight: 380,
          padding: "60px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 75% 50%, rgba(0,212,255,0.07) 0%, transparent 55%)" }} />
        <div
          style={{
            position: "absolute",
            top: -50,
            right: 80,
            width: 300,
            height: 300,
            background: "rgba(29,78,216,0.12)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
        <div style={{ maxWidth: 560, zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: `${T.accent}18`,
              border: `1px solid ${T.accent}44`,
              borderRadius: 20,
              padding: "4px 14px",
              fontSize: 11,
              color: T.accent,
              fontWeight: 700,
              marginBottom: 14,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            <Icon.Zap /> Featured Collection
          </div>
          <h1
            className="hero-title"
            style={{
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 14,
              letterSpacing: "-1.5px",
            }}
          >
            {hero.title}
          </h1>
          <p style={{ fontSize: 17, color: T.textSec, marginBottom: 28 }}>
            {hero.subtitle}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => {
                setPage("shop");
                setActiveCategory(hero.cat);
              }}
              className="btn"
              style={{
                background: `linear-gradient(135deg, #1D4ED8, ${T.accent})`,
                color: "white",
                borderRadius: 12,
                padding: "13px 30px",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Shop Now →
            </button>
            <button
              className="btn"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: T.text,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "13px 22px",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              View Deals
            </button>
          </div>
        </div>
        <div
          className="float hero-emoji"
          style={{ fontSize: 120, zIndex: 1, opacity: 0.9 }}
        >
          {hero.emoji}
        </div>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 6,
          }}
        >
          {heroes.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className="btn"
              style={{
                width: i === heroIdx ? 22 : 7,
                height: 7,
                borderRadius: 4,
                background: i === heroIdx ? T.accent : `${T.text}33`,
                transition: "all .3s",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setHeroIdx((i) => (i - 1 + heroes.length) % heroes.length)}
          className="btn"
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Icon.ChevL />
        </button>
        <button
          onClick={() => setHeroIdx((i) => (i + 1) % heroes.length)}
          className="btn"
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <Icon.ChevR />
        </button>
      </div>

      {/* ── Perks Bar ── */}
      <div
        style={{
          background: T.surface,
          borderBottom: `1px solid ${T.border}`,
          padding: "0 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            ["🚚", "Free Shipping", "On orders over $75"],
            ["🔄", "30-Day Returns", "Hassle-free"],
            ["🛡", "2-Year Warranty", "All products"],
            ["💳", "Secure Payment", "256-bit SSL"],
            ["📞", "24/7 Support", "Always here"],
          ].map(([icon, title, sub], i, arr) => (
            <div
              key={i}
              style={{
                padding: "14px 24px",
                textAlign: "center",
                borderRight: i < arr.length - 1 ? `1px solid ${T.border}` : "none",
                minWidth: 160,
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 2 }}>{icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>
                {title}
              </div>
              <div style={{ fontSize: 11, color: T.textSec }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        {/* ── Flash Deals ── */}
        <FlashDeals T={T} deals={FLASH_DEALS} addToCart={addToCart} viewProduct={viewProduct} PRODUCTS={PRODUCTS} />

        {/* ── Category Quick-Nav ── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
            Browse Categories
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))",
              gap: 12,
            }}
          >
            {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setPage("shop");
                  setActiveCategory(cat.id);
                }}
                className="card"
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 16,
                  padding: "20px 12px",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{cat.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.textSec }}>
                  {cat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured Products ── */}
        <section style={{ marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>Featured Products</h2>
            <button
              onClick={() => setPage("shop")}
              className="btn"
              style={{
                background: "none",
                color: T.accent,
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              View All →
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
              gap: 18,
            }}
          >
            {PRODUCTS.slice(0, 8).map((p) => (
              <MiniProductCard
                key={p.id}
                T={T}
                product={p}
                wishlisted={wishlist.includes(p.id)}
                onWishlist={() => toggleWishlist(p.id)}
                onAddToCart={() => addToCart(p)}
                onView={() => viewProduct(p)}
              />
            ))}
          </div>
        </section>

        {/* ── Brands ── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
            Top Brands
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {FEATURED_BRANDS.map((brand) => (
              <div
                key={brand}
                style={{
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: 12,
                  padding: "14px 24px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: T.textSec,
                  cursor: "pointer",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = T.accent;
                  e.currentTarget.style.color = T.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.color = T.textSec;
                }}
                onClick={() => setPage("shop")}
              >
                {brand}
              </div>
            ))}
          </div>
        </section>

        {/* ── Recently Viewed ── */}
        {recentlyViewed.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
              Recently Viewed
            </h2>
            <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}>
              {recentlyViewed.map((p) => (
                <div
                  key={p.id}
                  onClick={() => viewProduct(p)}
                  style={{
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    borderRadius: 14,
                    padding: "14px",
                    cursor: "pointer",
                    minWidth: 160,
                    flexShrink: 0,
                    textAlign: "center",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.border)}
                >
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{p.img}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                    {p.name.slice(0, 20)}
                  </div>
                  <div style={{ fontSize: 13, color: T.accent, fontWeight: 800 }}>
                    ${p.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Promo Banner ── */}
        <div
          style={{
            background: `linear-gradient(135deg, #7C3AED, #1D4ED8)`,
            borderRadius: 20,
            padding: "32px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              🎁 Limited Offer
            </div>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "white",
                marginBottom: 8,
              }}
            >
              Get 20% off your first order
            </h3>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
              Use code <strong>TECH20</strong> at checkout. T&C apply.
            </p>
          </div>
          <button
            onClick={() => setPage("shop")}
            className="btn"
            style={{
              background: "white",
              color: "#1D4ED8",
              borderRadius: 12,
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
