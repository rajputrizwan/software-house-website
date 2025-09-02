"use client";

import LottiePlayer from "../components/LottiePlayer";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <LottiePlayer />
          <h1 className="text-2xl font-bold mt-6 text-gray-800 dark:text-white">
            Page Not Found
          </h1>
        </div>
      </body>
    </html>
  );
}
