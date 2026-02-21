import { useState, useEffect } from "react";

export function useCountdown(seconds) {
  const [t, setT] = useState(seconds);
  
  useEffect(() => {
    const iv = setInterval(() => setT(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(iv);
  }, []);
  
  const h = String(Math.floor(t / 3600)).padStart(2, "0");
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
  const s = String(t % 60).padStart(2, "0");
  
  return { h, m, s, total: t };
}
