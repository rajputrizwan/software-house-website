"use client";

import { useState } from "react";

function LoadingSpinner() {
  return (
    <div
      className="flex justify-center items-center space-x-3"
      role="status"
      aria-live="polite"
    >
      {[0, 200, 400].map((delay) => (
        <span
          key={delay}
          className="block w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
          aria-label="Loading dot"
        />
      ))}
      <style jsx>{`
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          40% {
            transform: translateY(-12px);
            opacity: 1;
          }
        }
        .animate-bounce {
          animation: bounce 1.4s infinite;
        }
      `}</style>
    </div>
  );
}

export default function Dashboard() {
  function cleanFeedback(text) {
    return text.replace(/Best regards,[\s\S]*$/i, "").trim();
  }

  // Example usage
  const rawFeedback = `Dear Teacher, 

I appreciate your thoughtful responses... 

Best regards,
[Your Name]`;

  const cleanedFeedback = cleanFeedback(rawFeedback);
  console.log(cleanedFeedback);

  const PROMPTS = {
    student: {
      learning_style:
        "Generate 5 multiple choice questions to determine a student's learning style (visual, auditory, kinesthetic).",
      interests:
        "Generate 5 questions about a student's interests in subjects like math, science, language arts, and social studies.",
      weaknesses:
        "Generate 5 questions to identify student's weak areas in learning.",
      motivation:
        "Generate 5 questions to assess a student's motivation and study habits.",
      technology_use:
        "Generate 5 questions about a student's use of technology for learning.",
      time_management:
        "Generate 5 questions to evaluate a student's time management skills.",
    },
    teacher: {
      teaching_style:
        "Generate 5 multiple choice questions to assess a teacher's teaching style.",
      class_management:
        "Generate 5 questions about classroom management techniques.",
      student_assessment:
        "Generate 5 questions for assessing student understanding.",
      curriculum_design:
        "Generate 5 questions about designing and adapting curriculum effectively.",
      professional_development:
        "Generate 5 questions regarding ongoing professional development and training.",
      technology_integration:
        "Generate 5 questions about integrating technology into teaching practices.",
    },
  };

  const [selectedUserType, setSelectedUserType] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const topicsForUser = selectedUserType
    ? Object.keys(PROMPTS[selectedUserType])
    : [];

  async function fetchQuestions(userType, topic) {
    setError(null);
    setLoading(true);
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);

    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType, topic }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate questions");
      }

      const data = await res.json();

      if (Array.isArray(data.questions)) {
        setQuestions(data.questions);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleTopicSelect = async (topic) => {
    setSelectedTopic(topic);
    await fetchQuestions(selectedUserType, topic);
  };

  const reset = () => {
    setSelectedUserType(null);
    setSelectedTopic(null);
    setQuestions([]);
    setAnswers({});
    setError(null);
    setSubmitted(false);
  };

  const handleAnswerChange = (questionIdx, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIdx]: option,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedback(null);
    setLoadingFeedback(true);

    try {
      const res = await fetch("/api/generate-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: selectedUserType,
          topic: selectedTopic,
          questions,
          answers,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate feedback");
      }
      const data = await res.json();
      setFeedback(
        data.feedback
          .replace(/Dear\s+\[Teacher's Name\],\s*/i, "")
          .replace(/Best regards,[\s\S]*$/i, "")
          .trim()
      );
    } catch (err) {
      setFeedback(`Error: ${err.message}`);
    } finally {
      setLoadingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-16 text-center max-w-4xl text-gray-900 dark:text-white tracking-tight">
        Welcome to Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Dashboard
        </span>
      </h1>

      {!selectedUserType ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl w-full">
          {["teacher", "student"].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedUserType(role)}
              className={`group flex flex-col items-center p-8 rounded-3xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-transform transform hover:-translate-y-2 focus:outline-none focus:ring-4 ${
                role === "teacher"
                  ? "hover:border-blue-600 focus:ring-blue-400"
                  : "hover:border-green-600 focus:ring-green-400"
              }`}
              aria-label={`Select ${role} role`}
            >
              <div
                className={`text-4xl mb-5 ${
                  role === "teacher" ? "text-blue-600" : "text-green-600"
                }`}
                aria-hidden="true"
              >
                {role === "teacher" ? "👩‍🏫" : "🎓"}
              </div>
              <h2
                className={`text-2xl font-bold mb-3 ${
                  role === "teacher"
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-green-700 dark:text-green-400"
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </h2>
              <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed max-w-sm">
                {role === "teacher"
                  ? "Access advanced tools for managing classes, analyzing questions, and guiding students effectively."
                  : "Get personalized learning, practice questions, and feedback to boost your knowledge."}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <section
          className="max-w-3xl w-full rounded-3xl p-10 bg-gradient-to-tr from-blue-100/30 via-indigo-100/20 to-purple-100/30 dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-purple-900/40 backdrop-blur-md border border-white/30 dark:border-white/20 shadow-lg shadow-indigo-500/20 dark:shadow-purple-900/50 transition-transform duration-500"
          aria-live="polite"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Selected Role:{" "}
              <span
                className={`capitalize font-bold ${
                  selectedUserType === "teacher"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {selectedUserType}
              </span>
            </h2>
            <button
              onClick={reset}
              className="text-sm font-medium text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
            >
              Change Role
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-300">
              Select a topic to generate questions:
            </h3>
            <div className="flex flex-wrap gap-4">
              {topicsForUser.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTopicSelect(topic)}
                  className={`px-6 py-3 rounded-full border font-semibold transition focus:outline-none focus:ring-2 ${
                    selectedTopic === topic
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  aria-pressed={selectedTopic === topic}
                >
                  {topic.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div
              className="flex flex-col items-center space-y-4 mt-8"
              role="status"
              aria-live="polite"
            >
              <LoadingSpinner />
              <p className="text-center text-gray-700 dark:text-gray-300 text-lg font-medium select-none">
                Generating questions, please wait...
              </p>
            </div>
          )}

          {error && (
            <p
              className="text-center text-red-600 dark:text-red-400 font-semibold mt-8"
              role="alert"
            >
              Error: {error}
            </p>
          )}

          {questions.length > 0 && !loading && (
            <form onSubmit={handleSubmit} className="mt-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Questions for "{selectedTopic?.replace(/_/g, " ")}":
              </h3>
              <ol className="list-decimal list-inside space-y-8 text-gray-800 dark:text-gray-300">
                {questions.map(({ question, options }, idx) => (
                  <li
                    key={idx}
                    className="ml-2 font-medium"
                    style={{ listStylePosition: "inside" }}
                  >
                    <div className="mb-3">{question}</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {options.map((opt, i) => (
                        <li key={i}>
                          <label
                            htmlFor={`question-${idx}-option-${i}`}
                            className={`
    flex justify-between items-center cursor-pointer rounded-xl border
    p-5 select-none
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-gray-100
    shadow-sm
    border-gray-300 dark:border-gray-700
    hover:shadow-md
    transition duration-300
    peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-700 peer-checked:text-white
    peer-checked:border-transparent
    focus-within:outline-none focus-within:ring-4 focus-within:ring-blue-400
  `}
                            style={{ userSelect: "none" }}
                          >
                            <input
                              type="radio"
                              id={`question-${idx}-option-${i}`}
                              name={`question-${idx}`}
                              value={opt}
                              checked={answers[idx] === opt}
                              onChange={() => handleAnswerChange(idx, opt)}
                              required
                              className="peer sr-only"
                            />
                            <span className="font-semibold">{opt}</span>

                            <span
                              className="
      flex-shrink-0
      w-6 h-6 rounded-full border-2
      border-gray-600 dark:border-gray-300
      peer-checked:border-gray-900 dark:peer-checked:border-white
      peer-checked:bg-gray-900 dark:peer-checked:bg-white
      transition
      flex items-center justify-center
      ml-4
    "
                              aria-hidden="true"
                            >
                              <svg
                                className="w-4 h-4 text-blue-600 peer-checked:text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>

              <button
                type="submit"
                className="mt-8 w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold text-lg hover:from-blue-700 hover:to-purple-800 transition"
              >
                Submit Answers
              </button>

              {/* {submitted && (
                <div
                  className="mt-8 p-5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-lg shadow-md"
                  aria-live="polite"
                >
                  <h4 className="font-semibold mb-4 text-lg">Your Answers:</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {questions.map(({ question }, idx) => (
                      <li key={idx}>
                        <strong>{question}</strong> — {answers[idx]}
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}

              {loadingFeedback && (
                <div className="mt-6 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-3 text-gray-700 dark:text-gray-300 font-medium text-lg">
                    Analyzing responses & preparing feedback...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    AI is crafting your personalized improvement plan
                  </p>
                </div>
              )}

              {feedback && (
                <section
                  className="mt-8 p-0 overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700
               bg-white/60 dark:bg-gray-900/50 backdrop-blur-md transition-all duration-500 animate-fadeIn"
                  aria-live="polite"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 p-5">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
                        />
                      </svg>
                      Personalized Feedback Report
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Generated by AI — tailored to you
                    </p>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-6 text-gray-800 dark:text-gray-100">
                    <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
                      {feedback}
                    </div>
                  </div>
                </section>
              )}
            </form>
          )}
        </section>
      )}
    </div>
  );
}
