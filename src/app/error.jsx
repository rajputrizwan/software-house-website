"use client";

import LottiePlayer from "../components/LottiePlayer";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <LottiePlayer />
      <h2 className="text-xl mt-6">Oops! Something went wrong.</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {error?.message || "Please try again later."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
