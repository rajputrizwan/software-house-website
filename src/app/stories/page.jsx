// src/app/stories/page.jsx
"use client";

import { useState } from "react";
import { StoriesProvider } from "./components/context/StoriesContext";
import StoriesHeader from "./components/stories/StoriesHeader";
import StoriesGrid from "./components/stories/StoriesGrid";
import StoryViewer from "./components/stories/StoryViewer";
import CreateStoryModal from "./components/stories/CreateStoryModal";

export default function StoriesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <StoriesProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <StoriesHeader onAddStory={() => setIsCreateModalOpen(true)} />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Company Stories
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the latest updates, project launches, and
                behind-the-scenes moments from our software house team.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">8</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>

            {/* Stories Grid */}
            <StoriesGrid />
          </div>
        </main>

        <StoryViewer />

        {isCreateModalOpen && (
          <CreateStoryModal onClose={() => setIsCreateModalOpen(false)} />
        )}
      </div>
    </StoriesProvider>
  );
}
