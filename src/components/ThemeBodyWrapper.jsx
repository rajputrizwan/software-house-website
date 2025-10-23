"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeBodyWrapper({ children, className = "" }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Return a neutral version during SSR to prevent hydration mismatch
    return (
      <div className={`${className} min-h-screen flex flex-col`}>
        {children}
      </div>
    );
  }

  // Determine the actual theme to apply (system theme or selected theme)
  const currentTheme = theme === "system" ? systemTheme : theme;
  const themeClass =
    currentTheme === "dark"
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
