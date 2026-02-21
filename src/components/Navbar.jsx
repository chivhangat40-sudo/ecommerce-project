import React from "react";
import { BrandLogo } from "./BrandLogo";
import { Icon } from "../utils/icons";

export function Navbar({
  T,
  darkMode,
  setDarkMode,
  cartCount,
  setCartOpen,
  searchQuery,
  setSearchQuery,
  searchFocused,
  setSearchFocused,
  wishlistCount,
  compareCount,
  page,
  navItems,
  setPage2,
  scrollY,
  currentUser,
  onSignInClick,
  onSignOut,
}) {
  const nav = scrollY > 10;

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: nav ? (darkMode ? "rgba(7,11,20,0.95)" : "rgba(255,255,255,0.95)") : T.surface,
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${nav ? T.border + "88" : T.border}`,
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all .3s ease",
        gap: 16,
      }}
    >
      {/* Logo */}
      <div onClick={() => setPage2("home")} style={{ cursor: "pointer", flexShrink: 0 }}>
        <BrandLogo size={34} showText={true} T={T} />
      </div>

      {/* Nav Links */}
      <div className="hide-mobile" style={{ display: "flex", gap: 4 }}>
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => setPage2(n.id)}
            className="btn nav-link"
            style={{
              background: "none",
              color: page === n.id ? T.accent : T.textSec,
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: page === n.id ? 700 : 500,
              borderBottom: page === n.id ? `2px solid ${T.accent}` : "2px solid transparent",
            }}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 400,
          background: searchFocused ? T.card : T.surface,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          border: `1.5px solid ${searchFocused ? T.accent : T.border}`,
          transition: "all .2s ease",
          gap: 8,
        }}
      >
        <Icon.Search />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search products..."
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: T.text,
            fontSize: 13,
            padding: "9px 0",
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="btn"
            style={{ background: "none", color: T.textSec, padding: 2 }}
          >
            <Icon.X />
          </button>
        )}
      </div>

      {/* Right Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
        <button
          onClick={() => setDarkMode((d) => !d)}
          className="btn"
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            color: T.textSec,
            borderRadius: 9,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {darkMode ? <Icon.Sun /> : <Icon.Moon />}
        </button>

        <button
          onClick={() => setPage2("compare")}
          className="btn hide-mobile"
          style={{
            background: compareCount > 0 ? `${T.accent2}22` : T.card,
            border: `1px solid ${compareCount > 0 ? T.accent2 : T.border}`,
            color: compareCount > 0 ? T.accent2 : T.textSec,
            borderRadius: 9,
            padding: "0 12px",
            height: 36,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <Icon.Compare /> {compareCount > 0 && `${compareCount}`}
        </button>

        <button
          onClick={() => setPage2("profile")}
          className="btn"
          style={{
            background: wishlistCount > 0 ? "#EF444422" : T.card,
            border: `1px solid ${wishlistCount > 0 ? "#EF4444" : T.border}`,
            color: wishlistCount > 0 ? "#EF4444" : T.textSec,
            borderRadius: 9,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Icon.Heart f={wishlistCount > 0} />
          {wishlistCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -7,
                right: -7,
                background: "#EF4444",
                color: "white",
                borderRadius: "50%",
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Sign In / User Button */}
        {currentUser ? (
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <button
              onClick={onSignOut}
              className="btn"
              style={{
                background: `${T.accent}18`,
                border: `1px solid ${T.accent}55`,
                color: T.accent,
                borderRadius: 10,
                padding: "0 14px",
                height: 36,
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <span style={{ fontSize: 16 }}>👤</span>
              <span className="hide-mobile">{currentUser.name.split(" ")[0]}</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onSignInClick}
            className="btn"
            style={{
              background: `linear-gradient(135deg, #7C3AED, #9333EA)`,
              color: "white",
              borderRadius: 10,
              padding: "0 16px",
              height: 36,
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            <Icon.User /> <span className="hide-mobile">Sign In</span>
          </button>
        )}

        <button
          onClick={() => setCartOpen(true)}
          className="btn"
          style={{
            background: `linear-gradient(135deg, #1D4ED8, #2563EB)`,
            color: "white",
            borderRadius: 10,
            padding: "0 16px",
            height: 36,
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 14,
            fontWeight: 700,
            position: "relative",
          }}
        >
          <Icon.Cart /> <span className="hide-mobile">Cart</span>
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                background: T.accent,
                color: "#000",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
