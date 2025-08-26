"use client";

import { useState, useEffect } from "react";
import LandingPage from "../components/LandingPage";
import LottieWC from "../components/LottieWC";

export default function Home({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (you can replace with real API check)
    const timer = setTimeout(() => setLoading(false), 2000); // ⏳ 2s
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LottieWC />; // 🔹 Show animation while loading
  }

  return (
    <>
      <section>
        <LandingPage />
      </section>
    </>
  ); // 🔹 Show real content after loading
}
