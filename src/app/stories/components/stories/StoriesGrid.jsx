// src/components/stories/StoriesGrid.jsx
"use client";

import { useStories } from "../context/StoriesContext";
import StoryCircle from "./StoryCircle";

export default function StoriesGrid() {
  const { stories, setActiveStory } = useStories();

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No stories yet
        </h3>
        <p className="text-gray-500">Be the first to share a story!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {stories.map((story) => (
        <StoryCircle
          key={story.id}
          story={story}
          onClick={() => setActiveStory(story)}
        />
      ))}
    </div>
  );
}
