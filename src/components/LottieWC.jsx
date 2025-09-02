// Loader
"use client"; // Required because Lottie uses browser APIs

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LottiePlayer() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <DotLottieReact
        src="https://lottie.host/4ec7a379-1de0-4ec2-a620-29214af07385/qBJvBm8hEw.lottie"
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
}
