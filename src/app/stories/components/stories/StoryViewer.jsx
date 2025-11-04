// src/components/stories/StoryViewer.jsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useStories } from "../context/StoriesContext";

export default function StoryViewer() {
  // ----- hooks (always at top, before any early returns) -----
  const { activeStory, clearActiveStory } = useStories();

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressIntervalRef = useRef(null);
  const videoRef = useRef(null);

  const currentStory = activeStory?.stories?.[currentStoryIndex];

  // ----- helper: clear interval -----
  const clearProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // ----- navigation callbacks -----
  const nextStory = useCallback(() => {
    if (!activeStory) return;
    if (currentStoryIndex < activeStory.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      clearActiveStory();
    }
  }, [activeStory, currentStoryIndex, clearActiveStory]);

  const previousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentStoryIndex]);

  // ----- start progress interval -----
  const startProgressInterval = useCallback(() => {
    if (!activeStory || !currentStory || isPaused) return;

    clearProgressInterval();

    const duration = Number(currentStory.duration) || 5000;
    const interval = 50;
    const steps = Math.max(1, Math.floor(duration / interval));
    const increment = 100 / steps;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearProgressInterval();
          // small delay to ensure UI updates
          setTimeout(() => nextStory(), 10);
          return 0;
        }
        return next;
      });
    }, interval);
  }, [activeStory, currentStory, isPaused, nextStory, clearProgressInterval]);

  // ----- toggle pause: also pause/play video -----
  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev;
      // control video playback immediately
      if (videoRef.current && currentStory?.type === "video") {
        try {
          if (next) {
            videoRef.current.pause();
          } else {
            // play returns a promise; ignore errors
            videoRef.current.play().catch(() => {});
          }
        } catch (e) {
          // ignore
        }
      }
      return next;
    });
  }, [currentStory?.type]);

  // ----- keyboard shortcuts -----
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!activeStory) return;
      switch (e.key) {
        case "Escape":
          clearActiveStory();
          break;
        case "ArrowRight":
          nextStory();
          break;
        case "ArrowLeft":
          previousStory();
          break;
        case " ":
          e.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeStory, nextStory, previousStory, clearActiveStory, togglePause]);

  // ----- video ended handler -----
  const handleVideoEnd = useCallback(() => {
    nextStory();
  }, [nextStory]);

  // ----- when activeStory changes: reset index & progress -----
  useEffect(() => {
    if (!activeStory) return;
    setCurrentStoryIndex(0);
    setProgress(0);
    setIsPaused(false); // Always start playing when story opens
    clearProgressInterval();
  }, [activeStory, clearProgressInterval]);

  // ----- when current story changes: reset progress, reset video playback timeline -----
  useEffect(() => {
    setProgress(0);

    if (videoRef.current && currentStory?.type === "video") {
      try {
        videoRef.current.currentTime = 0;
        if (!isPaused) {
          videoRef.current.play().catch(() => {});
        }
      } catch (e) {
        // ignore
      }
    }

    // ensure we clear any old interval so unified effect can start fresh
    clearProgressInterval();
  }, [currentStoryIndex, isPaused, currentStory?.type, clearProgressInterval]);

  // ----- main effect: control progress interval based on pause state -----
  useEffect(() => {
    if (!activeStory || !currentStory) return;

    if (isPaused) {
      clearProgressInterval();
    } else {
      startProgressInterval();
    }

    return () => {
      clearProgressInterval();
    };
  }, [
    isPaused,
    activeStory,
    currentStory,
    startProgressInterval,
    clearProgressInterval,
  ]);

  // ----- auto-play video when not paused -----
  useEffect(() => {
    if (!currentStory || currentStory.type !== "video") return;

    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused, currentStory]);

  // ----- Prevent rendering early (all hooks above) -----
  if (!activeStory || !currentStory) return null;

  // ----- JSX -----
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
        {activeStory.stories.map((_, index) => (
          <div key={index} className="h-1 bg-gray-600 rounded-full flex-1">
            <div
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{
                width:
                  index === currentStoryIndex
                    ? `${progress}%`
                    : index < currentStoryIndex
                    ? "100%"
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button
        onClick={clearActiveStory}
        className="absolute top-4 right-4 text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Pause/Play Button */}
      <button
        onClick={togglePause}
        className="absolute top-4 right-16 text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isPaused ? (
            // Play icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
          ) : (
            // Pause icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 9v6m4-6v6"
            />
          )}
        </svg>
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={previousStory}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full z-10 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextStory}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full z-10 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Story Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        {currentStory.type === "image" ? (
          <img
            src={currentStory.url}
            alt="Story"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            src={currentStory.url}
            className="max-w-full max-h-full object-contain"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          />
        )}

        {/* Story Overlay Content */}
        <div className="absolute bottom-20 left-0 right-0 text-center px-4">
          {currentStory.title && (
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
              {currentStory.title}
            </h2>
          )}
          {currentStory.description && (
            <p className="text-lg text-white/90 drop-shadow-lg max-w-2xl mx-auto">
              {currentStory.description}
            </p>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-3 z-10">
        <img
          src={activeStory.avatar}
          alt={activeStory.username}
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">
            {activeStory.username}
          </h3>
          <p className="text-white/80 text-sm">
            {new Date(currentStory.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" • "}
            {new Date(currentStory.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Pause Overlay - Only show when manually paused, not on hover */}
      {isPaused && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-0">
          <div className="text-white text-center">
            <svg
              className="w-16 h-16 mx-auto mb-2 opacity-70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
            <p className="text-lg font-medium">Paused</p>
            <p className="text-sm opacity-70 mt-1">Click play to continue</p>
          </div>
        </div>
      )}
    </div>
  );
}
