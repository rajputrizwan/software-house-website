// src/components/context/StoriesContext.jsx
"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

const StoriesContext = createContext();

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_STORIES":
      return { ...state, stories: action.payload };
    case "ADD_STORY":
      return { ...state, stories: [action.payload, ...state.stories] };
    case "SET_ACTIVE_STORY":
      return { ...state, activeStory: action.payload };
    case "CLEAR_ACTIVE_STORY":
      return { ...state, activeStory: null };
    case "MARK_STORY_VIEWED":
      return {
        ...state,
        stories: state.stories.map((story) =>
          story.id === action.payload ? { ...story, viewed: true } : story
        ),
      };
    default:
      return state;
  }
};

const initialStories = [
  {
    id: "1",
    userId: "user1",
    username: "Tech Innovations",
    avatar:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop&crop=face",
    stories: [
      {
        id: "1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=800&fit=crop",
        duration: 5000,
        title: "New Project Launch",
        description: "Just launched our latest web application!",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=800&fit=crop",
        duration: 5000,
        title: "Team Collaboration",
        description: "Our amazing team working on innovative solutions",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
    ],
    viewed: false,
  },
  {
    id: "2",
    userId: "user2",
    username: "Dev Team",
    avatar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face",
    stories: [
      {
        id: "2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=800&fit=crop",
        duration: 5000,
        title: "Code Review Session",
        description: "Daily code review and knowledge sharing",
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ],
    viewed: true,
  },
  {
    id: "3",
    userId: "user3",
    username: "Design Studio",
    avatar:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop&crop=face",
    stories: [
      {
        id: "3-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=800&fit=crop",
        duration: 5000,
        title: "UI/UX Design",
        description: "Creating beautiful user interfaces",
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      },
    ],
    viewed: false,
  },
];

export function StoriesProvider({ children }) {
  const [state, dispatch] = useReducer(storiesReducer, {
    stories: [],
    activeStory: null,
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      dispatch({ type: "SET_STORIES", payload: initialStories });
    }, 500);
  }, []);

  const addStory = (storyData) => {
    const newStory = {
      id: Date.now().toString(),
      userId: "current-user",
      username: "Your Company",
      avatar:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop&crop=face",
      stories: [storyData],
      viewed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_STORY", payload: newStory });
  };

  const setActiveStory = (story) => {
    dispatch({ type: "SET_ACTIVE_STORY", payload: story });
    if (!story.viewed) {
      dispatch({ type: "MARK_STORY_VIEWED", payload: story.id });
    }
  };

  const clearActiveStory = () => {
    dispatch({ type: "CLEAR_ACTIVE_STORY" });
  };

  return (
    <StoriesContext.Provider
      value={{
        stories: state.stories,
        activeStory: state.activeStory,
        addStory,
        setActiveStory,
        clearActiveStory,
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
}

export const useStories = () => {
  const context = useContext(StoriesContext);
  if (!context) {
    throw new Error("useStories must be used within StoriesProvider");
  }
  return context;
};
