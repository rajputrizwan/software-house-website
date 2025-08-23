"use client"; // Required because <dotlottie-wc> is a browser component

import React, { useEffect, useRef } from "react";

export default function LottieWC() {
  const lottieRef = useRef(null);

  useEffect(() => {
    // Optional: manipulate the web component via JS
    if (lottieRef.current) {
      lottieRef.current.setAttribute("loop", "");
      lottieRef.current.setAttribute("autoplay", "");
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <dotlottie-wc
        ref={lottieRef}
        src="https://lottie.host/6f98e225-6761-467c-8547-05d81f1b689f/5yNwmfMMXO.lottie"
        style={{ width: "300px", height: "300px" }}
        speed="1"
        autoplay
        loop
      ></dotlottie-wc>
    </div>
  );
}
