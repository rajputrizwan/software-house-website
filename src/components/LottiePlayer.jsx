"use client"; // Required because Lottie uses browser APIs

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LottiePlayer() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <DotLottieReact
        src="https://lottie.host/af02051d-e608-4d3e-bfe3-36f9359e214c/xGIdZGYsJD.lottie"
        loop
        autoplay
        style={{ width: 500, height: 500 }}
      />
    </div>
  );
}
