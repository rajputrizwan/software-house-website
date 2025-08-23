"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeBodyWrapper({ children, className = "" }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Apply dark mode classes only after hydration
  const themeClass =
    mounted && theme === "dark"
      ? "dark bg-gray-900 text-white"
      : "bg-white text-gray-900";

  return (
    <div
      className={`${className} ${themeClass} transition-colors duration-300 min-h-screen flex flex-col`}
    >
      {children}
    </div>
  );
}
