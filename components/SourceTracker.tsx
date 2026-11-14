"use client";

import { useEffect } from "react";

// Pamti izvor prvog dolaska (UTM ili referrer) za praćenje upita do prodaje.
export function SourceTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("cd_source")) return;
      const p = new URLSearchParams(window.location.search);
      const utm = ["utm_source", "utm_medium", "utm_campaign"]
        .map((k) => p.get(k))
        .filter(Boolean)
        .join(" / ");
      const ref = document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : "";
      sessionStorage.setItem("cd_source", utm || ref || "izravno");
    } catch {}
  }, []);
  return null;
}
