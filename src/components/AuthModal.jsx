import React, { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { Icon } from "../utils/icons";
import { PasswordStrength } from "./shared/Utilities";

export function AuthModal({ T, mode, setMode, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (mode === "signup" && !form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (mode === "signup" && form.password !== form.confirm)
      e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        name: mode === "signup" ? form.name : form.email.split("@")[0],
        email: form.email,
      });
    }, 1200);
  };

  const socialProviders = [
    { label: "Continue with Google", icon: "🇬", color: "#EA4335" },
    { label: "Continue with Apple", icon: "🍎", color: "#000000" },
    { label: "Continue with GitHub", icon: "🐙", color: "#333333" },
  ];

  const inputStyle = (field) => ({
    width: "100%",
    background: T.card,
    border: `1.5px solid ${errors[field] ? T.error : T.border}`,
    color: T.text,
    borderRadius: 11,
    padding: "11px 14px",
    fontSize: 14,
    outline: "none",
    transition: "border-color .2s",
  });

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          zIndex: 3999,
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(460px, 95vw)",
          maxHeight: "92vh",
          overflowY: "auto",
          background: T.surface,
          borderRadius: 24,
          border: `1px solid ${T.border}`,
          zIndex: 4000,
          animation: "scaleIn .3s ease",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
        }}
      >
        {/* Header gradient bar */}
        <div
          style={{
            height: 5,
            background: "linear-gradient(90deg, #1D4ED8, #7C3AED, #00D4FF)",
            borderRadius: "24px 24px 0 0",
          }}
        />

        <div style={{ padding: "28px 32px 32px" }}>
          {/* Close */}
          <button
            onClick={onClose}
            className="btn"
            style={{
              position: "absolute",
              top: 18,
              right: 20,
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 9,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.textSec,
            }}
          >
            <Icon.X />
          </button>

          {/* Logo + Title */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <BrandLogo size={42} showText={true} T={T} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h2>
            <p style={{ fontSize: 13, color: T.textSec }}>
              {mode === "signin"
                ? "Sign in to continue shopping"
                : "Join us and start shopping today"}
            </p>
          </div>

          {/* Tab Switch */}
          <div
            style={{
              display: "flex",
              background: T.card,
              borderRadius: 12,
              padding: 4,
              marginBottom: 24,
              border: `1px solid ${T.border}`,
            }}
          >
            {[["signin", "Sign In"], ["signup", "Sign Up"]].map(([m, label]) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setErrors({});
                }}
                className="btn"
                style={{
                  flex: 1,
                  padding: "9px",
                  borderRadius: 9,
                  fontSize: 14,
                  fontWeight: 700,
                  background:
                    mode === m
                      ? "linear-gradient(135deg, #1D4ED8, #7C3AED)"
                      : "none",
                  color: mode === m ? "white" : T.textSec,
                  transition: "all .25s",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Social Login */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {socialProviders.map((p) => (
              <button
                key={p.label}
                onClick={() =>
                  onSuccess({
                    name: p.label.split("with ")[1] + " User",
                    email: "user@example.com",
                  })
                }
                className="btn"
                style={{
                  width: "100%",
                  padding: "11px 16px",
                  borderRadius: 11,
                  background: T.card,
                  border: `1px solid ${T.border}`,
                  color: T.text,
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 18 }}>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ fontSize: 12, color: T.textSec, fontWeight: 600 }}>
              or continue with email
            </span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>

          {/* Form Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "signup" && (
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: T.textSec,
                    display: "block",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Full Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Alex Johnson"
                  style={inputStyle("name")}
                  onFocus={(e) => (e.target.style.borderColor = T.accent)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.name ? T.error : T.border)
                  }
                />
                {errors.name && (
                  <div style={{ fontSize: 11, color: T.error, marginTop: 4 }}>
                    ⚠ {errors.name}
                  </div>
                )}
              </div>
            )}

            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: T.textSec,
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                style={inputStyle("email")}
                onFocus={(e) => (e.target.style.borderColor = T.accent)}
                onBlur={(e) =>
                  (e.target.style.borderColor = errors.email ? T.error : T.border)
                }
              />
              {errors.email && (
                <div style={{ fontSize: 11, color: T.error, marginTop: 4 }}>
                  ⚠ {errors.email}
                </div>
              )}
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: T.textSec,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Password
                </label>
                {mode === "signin" && (
                  <span
                    style={{
                      fontSize: 12,
                      color: T.accent,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Forgot password?
                  </span>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle("password"), paddingRight: 44 }}
                  onFocus={(e) => (e.target.style.borderColor = T.accent)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.password
                      ? T.error
                      : T.border)
                  }
                />
                <button
                  onClick={() => setShowPass((s) => !s)}
                  className="btn"
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    color: T.textSec,
                    padding: 4,
                    fontSize: 16,
                  }}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
              {errors.password && (
                <div style={{ fontSize: 11, color: T.error, marginTop: 4 }}>
                  ⚠ {errors.password}
                </div>
              )}
              {mode === "signup" && form.password && (
                <PasswordStrength password={form.password} T={T} />
              )}
            </div>

            {mode === "signup" && (
              <div>
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: T.textSec,
                    display: "block",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  placeholder="••••••••"
                  style={inputStyle("confirm")}
                  onFocus={(e) => (e.target.style.borderColor = T.accent)}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.confirm
                      ? T.error
                      : T.border)
                  }
                />
                {errors.confirm && (
                  <div style={{ fontSize: 11, color: T.error, marginTop: 4 }}>
                    ⚠ {errors.confirm}
                  </div>
                )}
              </div>
            )}

            {mode === "signup" && (
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  cursor: "pointer",
                  fontSize: 12,
                  color: T.textSec,
                  lineHeight: 1.5,
                }}
              >
                <input
                  type="checkbox"
                  style={{ marginTop: 2, accentColor: T.accent }}
                />
                I agree to the{" "}
                <span style={{ color: T.accent }}>Terms of Service</span> and{" "}
                <span style={{ color: T.accent }}>Privacy Policy</span>
              </label>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn"
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 12,
                marginTop: 4,
                background: loading ? T.border : "linear-gradient(135deg, #1D4ED8, #7C3AED)",
                color: loading ? T.textSec : "white",
                fontSize: 15,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: 18,
                      height: 18,
                      border: "2px solid transparent",
                      borderTop: `2px solid white`,
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  {mode === "signin" ? "Signing in..." : "Creating account..."}
                </>
              ) : mode === "signin" ? (
                "Sign In →"
              ) : (
                "Create Account →"
              )}
            </button>
          </div>

          {/* Switch mode */}
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: T.textSec }}>
            {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setErrors({});
              }}
              style={{ color: T.accent, fontWeight: 700, cursor: "pointer" }}
            >
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
