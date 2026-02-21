import React from "react";
import { Icon } from "../utils/icons";

export function CartDrawer({
  T,
  open,
  onClose,
  cart,
  cartTotal,
  cartCount,
  updateQty,
  removeFromCart,
  couponCode,
  setCouponCode,
  appliedCoupon,
  applyCoupon,
  discount,
  shipping,
  finalTotal,
  addToast,
  setCart,
}) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          zIndex: 1999,
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: 420,
          maxWidth: "95vw",
          background: T.surface,
          borderLeft: `1px solid ${T.border}`,
          zIndex: 2000,
          display: "flex",
          flexDirection: "column",
          animation: "slideR .3s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 20px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800 }}>Shopping Cart</h2>
            <p style={{ color: T.textSec, fontSize: 12 }}>
              {cartCount} item{cartCount !== 1 ? "s" : ""}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="btn"
                style={{
                  background: "none",
                  border: `1px solid ${T.border}`,
                  color: T.textSec,
                  borderRadius: 8,
                  padding: "5px 10px",
                  fontSize: 12,
                }}
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
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
                color: T.textSec,
              }}
            >
              <Icon.X />
            </button>
          </div>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: T.textSec }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>🛒</div>
              <div style={{ fontSize: 16, color: T.text, fontWeight: 600, marginBottom: 6 }}>
                Cart is empty
              </div>
              <p style={{ fontSize: 13 }}>Add some amazing gadgets!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: `1px solid ${T.border}` }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    background: `${item.color}22`,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    flexShrink: 0,
                  }}
                >
                  {item.img}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 1 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 11, color: T.textSec, marginBottom: 8 }}>
                    {item.brand}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: T.card,
                        borderRadius: 8,
                        border: `1px solid ${T.border}`,
                        padding: "2px 4px",
                      }}
                    >
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="btn"
                        style={{ background: "none", color: T.text, padding: "2px 6px", fontSize: 16 }}
                      >
                        −
                      </button>
                      <span style={{ fontWeight: 700, fontSize: 13, minWidth: 18, textAlign: "center" }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="btn"
                        style={{ background: "none", color: T.text, padding: "2px 6px", fontSize: 16 }}
                      >
                        +
                      </button>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: T.accent }}>
                        ${(item.price * item.qty).toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn"
                        style={{
                          background: "none",
                          color: T.error,
                          fontSize: 11,
                          fontWeight: 600,
                          padding: 0,
                        }}
                      >
                        <Icon.Trash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "16px 20px", borderTop: `1px solid ${T.border}` }}>
            {/* Coupon */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Coupon code (TECH20, SAVE50)"
                style={{
                  flex: 1,
                  background: T.card,
                  border: `1px solid ${appliedCoupon ? T.success : T.border}`,
                  color: T.text,
                  borderRadius: 9,
                  padding: "8px 12px",
                  fontSize: 12,
                  outline: "none",
                }}
              />
              <button
                onClick={applyCoupon}
                className="btn"
                style={{
                  background: T.accent,
                  color: "#000",
                  borderRadius: 9,
                  padding: "8px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <div style={{ fontSize: 12, color: T.success, fontWeight: 600, marginBottom: 10 }}>
                ✓ Coupon "{appliedCoupon}" applied!
              </div>
            )}

            {/* Totals */}
            {[
              ["Subtotal", `$${cartTotal.toLocaleString()}`],
              discount > 0 ? ["Discount", `-$${discount.toFixed(2)}`] : null,
              ["Shipping", shipping === 0 ? "FREE" : `$${shipping}`],
            ]
              .filter(Boolean)
              .map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: T.textSec }}>{label}</span>
                  <span
                    style={{
                      fontWeight: 600,
                      color:
                        label === "Discount"
                          ? T.success
                          : label === "Shipping" && shipping === 0
                            ? T.success
                            : T.text,
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderTop: `1px solid ${T.border}`,
                marginBottom: 14,
              }}
            >
              <span style={{ fontWeight: 800, fontSize: 16 }}>Total</span>
              <span style={{ fontWeight: 900, fontSize: 20, color: T.accent }}>
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            <button
              className="btn"
              onClick={() => {
                addToast("🎉 Order placed successfully!");
                setCart([]);
                onClose();
              }}
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                background: `linear-gradient(135deg,#1D4ED8,${T.accent})`,
                color: "white",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              Checkout — ${finalTotal.toFixed(2)}
            </button>
            {shipping > 0 && (
              <p style={{ textAlign: "center", fontSize: 11, color: T.textSec, marginTop: 8 }}>
                Add ${(75 - Number(String(finalTotal).replace("$", ""))).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
