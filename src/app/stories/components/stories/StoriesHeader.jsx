// src/components/stories/StoriesHeader.jsx
"use client";

import { useStories } from "../context/StoriesContext";

export default function StoriesHeader({ onAddStory }) {
  const { stories } = useStories();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Stories</h1>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              {stories.filter((story) => !story.viewed).length} new
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* <button
              onClick={onAddStory}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Story</span>
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
