import React, { useState, useEffect, useRef } from "react";
import { DARK, LIGHT } from "./constants/themes";
import { PRODUCTS, CATEGORIES, FLASH_DEALS, REVIEWS_DATA, NAV_ITEMS } from "./constants/data";
import { Navbar } from "./components/Navbar";
import { ToastContainer, CompareBar } from "./components/shared/ToastAndBars";
import { AuthModal } from "./components/AuthModal";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import { HomePage } from "./pages/HomePage";
import { Footer } from "./pages/Footer";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [page, setPage] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [cart, setCart] = useState([
    { ...PRODUCTS[2], qty: 1, selectedColor: PRODUCTS[2].colors[0] },
  ]);
  const [wishlist, setWishlist] = useState([1, 6]);
  const [compareList, setCompareList] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [heroIdx, setHeroIdx] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orders] = useState([
    {
      id: "ORD-2847",
      date: "Jan 15, 2025",
      status: "Delivered",
      total: 1548,
      items: [PRODUCTS[0], PRODUCTS[2]],
    },
    {
      id: "ORD-2291",
      date: "Dec 28, 2024",
      status: "Shipped",
      total: 699,
      items: [PRODUCTS[5]],
    },
    {
      id: "ORD-1983",
      date: "Nov 10, 2024",
      status: "Delivered",
      total: 249,
      items: [PRODUCTS[7]],
    },
  ]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [toast, setToast] = useState([]);
  const toastId = useRef(0);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [currentUser, setCurrentUser] = useState(null);

  const T = darkMode ? DARK : LIGHT;

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const heroes = [
      {
        title: "Next-Gen Smartphones",
        subtitle: "Experience tomorrow, today.",
        bg: `linear-gradient(135deg, ${T.bg} 0%, #1D4ED8 60%, #00D4FF22 100%)`,
        emoji: "📱",
        cat: "smartphones",
      },
      {
        title: "Pro Laptops Redefined",
        subtitle: "Power meets portability.",
        bg: `linear-gradient(135deg, ${T.bg} 0%, #7C3AED 60%, #E040FB22 100%)`,
        emoji: "💻",
        cat: "laptops",
      },
      {
        title: "Immersive Audio",
        subtitle: "Hear every detail, feel every beat.",
        bg: `linear-gradient(135deg, ${T.bg} 0%, #059669 60%, #10B98122 100%)`,
        emoji: "🎧",
        cat: "audio",
      },
    ];
    const iv = setInterval(() => setHeroIdx((i) => (i + 1) % heroes.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const addToast = (msg, type = "success") => {
    const id = ++toastId.current;
    setToast((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToast((p) => p.filter((t) => t.id !== id)), 3000);
  };

  const addToCart = (product, color) => {
    setCart((prev) => {
      const ex = prev.find(
        (i) => i.id === product.id && i.selectedColor === (color || product.colors[0])
      );
      if (ex)
        return prev.map((i) =>
          i.id === product.id && i.selectedColor === (color || product.colors[0])
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      return [...prev, { ...product, qty: 1, selectedColor: color || product.colors[0] }];
    });
    addToast(`${product.name} added to cart! 🛒`);
  };

  const removeFromCart = (id) => setCart((p) => p.filter((i) => i.id !== id));
  const updateQty = (id, d) =>
    setCart((p) => p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)));

  const toggleWishlist = (id) => {
    setWishlist((p) => {
      const has = p.includes(id);
      addToast(has ? "Removed from wishlist" : "Added to wishlist ❤️", has ? "info" : "success");
      return has ? p.filter((x) => x !== id) : [...p, id];
    });
  };

  const toggleCompare = (product) => {
    setCompareList((p) => {
      if (p.find((x) => x.id === product.id))
        return p.filter((x) => x.id !== product.id);
      if (p.length >= 3) {
        addToast("Max 3 products to compare", "error");
        return p;
      }
      addToast(`${product.name} added to compare`);
      return [...p, product];
    });
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setRecentlyViewed((p) => {
      const filtered = p.filter((x) => x.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const discount =
    appliedCoupon === "TECH20" ? cartTotal * 0.2 : appliedCoupon === "SAVE50" ? 50 : 0;
  const shipping = cartTotal > 75 ? 0 : 9.99;
  const finalTotal = cartTotal - discount + shipping;

  const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];
  const ALL_TAGS = [...new Set(PRODUCTS.flatMap((p) => p.tags))];

  const heroes = [
    {
      title: "Next-Gen Smartphones",
      subtitle: "Experience tomorrow, today.",
      bg: `linear-gradient(135deg, ${T.bg} 0%, #1D4ED8 60%, #00D4FF22 100%)`,
      emoji: "📱",
      cat: "smartphones",
    },
    {
      title: "Pro Laptops Redefined",
      subtitle: "Power meets portability.",
      bg: `linear-gradient(135deg, ${T.bg} 0%, #7C3AED 60%, #E040FB22 100%)`,
      emoji: "💻",
      cat: "laptops",
    },
    {
      title: "Immersive Audio",
      subtitle: "Hear every detail, feel every beat.",
      bg: `linear-gradient(135deg, ${T.bg} 0%, #059669 60%, #10B98122 100%)`,
      emoji: "🎧",
      cat: "audio",
    },
  ];
  const hero = heroes[heroIdx];

  const css = `
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{overflow-x:hidden;font-family:'Segoe UI',system-ui,sans-serif}
    ::-webkit-scrollbar{width:5px;height:5px}
    ::-webkit-scrollbar-track{background:${T.bg}}
    ::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
    input,select,textarea{font-family:inherit}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideR{from{transform:translateX(110%)}to{transform:translateX(0)}}
    @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes scaleIn{from{transform:scale(0.92);opacity:0}to{transform:scale(1);opacity:1}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px ${T.accent}44}50%{box-shadow:0 0 40px ${T.accent}99}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    .card{transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
    .card:hover{transform:translateY(-5px);box-shadow:0 24px 64px rgba(0,0,0,0.3)!important}
    .btn{transition:all .2s ease;cursor:pointer;border:none;outline:none}
    .btn:hover{filter:brightness(1.15);transform:translateY(-1px)}
    .btn:active{transform:translateY(0)}
    .chip{transition:all .2s;cursor:pointer}
    .chip:hover{opacity:0.8}
    .nav-link{transition:color .2s;cursor:pointer}
    .fade-up{animation:fadeUp .4s ease both}
    .float{animation:float 4s ease-in-out infinite}
    .hero-slide{animation:scaleIn .5s ease}
    input[type=range]{accent-color:${T.accent}}
    input[type=checkbox]{accent-color:${T.accent};cursor:pointer}
    input[type=radio]{accent-color:${T.accent};cursor:pointer}
    .wishlist-hover:hover svg{stroke:#EF4444!important}
    @media(max-width:768px){
      .hide-mobile{display:none!important}
      .hero-emoji{font-size:80px!important}
      .hero-title{font-size:28px!important}
      .grid-main{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))!important}
    }
  `;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        color: T.text,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <style>{css}</style>

      {/* TOAST NOTIFICATIONS */}
      <ToastContainer toast={toast} T={T} />

      {/* STICKY NAVBAR */}
      <Navbar
        T={T}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={cartCount}
        setCartOpen={setCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchFocused={searchFocused}
        setSearchFocused={setSearchFocused}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        page={page}
        setPage={setPage}
        navItems={NAV_ITEMS}
        scrollY={scrollY}
        setPage2={(p) => {
          setPage(p);
          setSelectedProduct(null);
        }}
        currentUser={currentUser}
        onSignInClick={() => {
          setAuthMode("signin");
          setAuthOpen(true);
        }}
        onSignOut={() => {
          setCurrentUser(null);
          addToast("Signed out successfully", "info");
        }}
      />

      {/* AUTH MODAL */}
      {authOpen && (
        <AuthModal
          T={T}
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setAuthOpen(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
            setAuthOpen(false);
            addToast(
              `Welcome${authMode === "signup" ? "" : " back"}, ${user.name}! 👋`
            );
          }}
        />
      )}

      {/* PAGES */}
      {page === "home" && (
        <HomePage
          T={T}
          heroes={heroes}
          heroIdx={heroIdx}
          setHeroIdx={setHeroIdx}
          hero={hero}
          PRODUCTS={PRODUCTS}
          FLASH_DEALS={FLASH_DEALS}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
          viewProduct={viewProduct}
          setPage={setPage}
          setActiveCategory={setActiveCategory}
          recentlyViewed={recentlyViewed}
          CATEGORIES={CATEGORIES}
        />
      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <ProductModal
          T={T}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          wishlisted={wishlist.includes(selectedProduct.id)}
          inCompare={!!compareList.find((x) => x.id === selectedProduct.id)}
          onWishlist={() => toggleWishlist(selectedProduct.id)}
          onCompare={() => toggleCompare(selectedProduct)}
          onAddToCart={(color) => {
            addToCart(selectedProduct, color);
          }}
          relatedProducts={PRODUCTS.filter(
            (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
          ).slice(0, 3)}
          reviews={REVIEWS_DATA[selectedProduct.id] || []}
          viewProduct={viewProduct}
        />
      )}

      {/* CART DRAWER */}
      <CartDrawer
        T={T}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        cartCount={cartCount}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        appliedCoupon={appliedCoupon}
        applyCoupon={() => {
          if (couponCode === "TECH20" || couponCode === "SAVE50") {
            setAppliedCoupon(couponCode);
            addToast(`Coupon "${couponCode}" applied! 🎉`);
          } else addToast("Invalid coupon code", "error");
        }}
        discount={discount}
        shipping={shipping}
        finalTotal={finalTotal}
        addToast={addToast}
        setCart={setCart}
      />

      {/* COMPARE BAR */}
      <CompareBar
        T={T}
        compareList={compareList}
        toggleCompare={toggleCompare}
        setPage={setPage}
        setCompareList={setCompareList}
      />

      {/* FOOTER */}
      <Footer T={T} setPage={setPage} setActiveCategory={setActiveCategory} />
    </div>
  );
}
