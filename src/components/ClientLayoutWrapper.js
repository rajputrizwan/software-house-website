"use client";

import { useState, useEffect } from "react";
import LottieWC from "./LottieWC";

export default function ClientLayoutWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LottieWC />; // 🔹 loader visible first
  }

  return children; // 🔹 show app after loader
}
