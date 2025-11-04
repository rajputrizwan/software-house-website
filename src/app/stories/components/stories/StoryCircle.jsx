// src/components/stories/StoryCircle.jsx
"use client";

export default function StoryCircle({ story, onClick }) {
  const hasUnviewed = !story.viewed;
  const storyCount = story.stories.length;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center space-y-2 group focus:outline-none"
    >
      <div className="relative">
        <div
          className={`p-0.5 rounded-full ${
            hasUnviewed
              ? "bg-gradient-to-tr from-yellow-400 to-purple-600"
              : "bg-gray-300"
          }`}
        >
          <div className="bg-white p-0.5 rounded-full">
            <img
              src={story.avatar}
              alt={story.username}
              className="w-20 h-20 rounded-full object-cover group-hover:scale-110 transition-transform duration-200"
            />
          </div>
        </div>
        {storyCount > 1 && (
          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white font-medium">
            {storyCount}
          </div>
        )}
      </div>
      <span className="text-sm font-medium text-gray-700 truncate max-w-24">
        {story.username}
      </span>
    </button>
  );
}
