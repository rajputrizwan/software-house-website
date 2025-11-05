import React, { useState, useEffect, useCallback } from "react";
import {
  Aperture,
  TrendingUp,
  Users,
  Heart,
  DollarSign,
  Briefcase,
  Car,
  Calendar,
} from "lucide-react";

// --- Professional Data Definitions (Updated Images) ---

const culturalImages = [
  // 1. Diverse Team Collaboration (Professional meeting)
  "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  // 2. Modern Office & Bright Workspace
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  // 3. Focused Small Group Discussion
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  // 4. Team Standing and Brainstorming
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  // 5. Professional Presentation & Engagement
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  // 6. Casual, Innovative Environment
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
];

const benefits = [
  {
    title: "Comprehensive Health & Wellness",
    description:
      "Full Medical, Dental, and Vision coverage, including a dedicated budget for mental health and preventative care.",
    icon: Heart,
    // Image: Clean, modern health/insurance concept
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "401(k) Retirement Matching",
    description:
      "Generous employer match program to help secure your financial future and plan for retirement effectively.",
    icon: DollarSign,
    // Image: Professional finance/chart background
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Flexible Work Model (Hybrid)",
    description:
      "The choice to work from home or in our modern office, ensuring work-life balance and maximum productivity.",
    icon: Aperture,
    // Image: Laptop in a bright, flexible space
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Annual Training Stipend",
    description:
      "A dedicated budget for external courses, certifications, conferences, and continuous skill development programs.",
    icon: TrendingUp,
    // Image: Person learning/coding on a computer screen
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Generous Paid Time Off (PTO)",
    description:
      "Robust vacation, sick, and personal leave policies to ensure you have time to recharge and focus on life outside work.",
    icon: Calendar,
    // Image: Relaxing beach view (clearly conveys 'time off')
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Commuter Assistance & Allowance",
    description:
      "Stipends for fuel, public transit passes, or ride-share credits to make your daily commute hassle-free.",
    icon: Car,
    // Image: Modern, clean subway station/transit
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Team & Workation Events",
    description:
      "Company-sponsored offsites, team-building activities, and annual subsidized workation opportunities.",
    icon: Briefcase,
    // Image: Team enjoying an informal, professional event
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

/**
 * Reusable component for creating a continuous, infinitely scrolling row of images.
 * Uses CSS keyframes for optimal performance and smooth movement.
 */
const InfiniteScrollRow = ({ images, direction = "left" }) => {
  // Duplicate images for seamless looping effect
  const duplicatedImages = [...images, ...images];

  // Define unique animation name based on direction
  const animationName = `scroll-${direction}`;
  const duration = images.length * 4;

  // Inject the keyframes dynamically
  const styleSheet = `
        @keyframes ${animationName} {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(${direction === "left" ? "-50%" : "0"});
            }
            from {
                transform: translateX(${direction === "left" ? "0" : "-50%"});
            }
        }
    `;

  // Calculate the total width needed (w-64 = 16rem)
  const imageWidthRem = 16;
  const totalWidthStyle = {
    width: `${imageWidthRem * duplicatedImages.length}rem`,
    animation: `${animationName} ${duration}s linear infinite`,
    transform: direction === "right" ? "translateX(-50%)" : "translateX(0)",
    flexShrink: 0,
  };

  return (
    <div className="overflow-hidden py-4 border-y border-gray-800/50">
      {/* Inject the keyframes CSS */}
      <style>{styleSheet}</style>

      <div className="flex" style={totalWidthStyle}>
        {duplicatedImages.map((src, index) => (
          <div
            key={index}
            className="w-48 h-32 md:w-64 md:h-40 p-2 flex-shrink-0"
          >
            <img
              src={src}
              alt={`Cultural Moment ${index}`}
              className="w-full h-full object-cover rounded-xl shadow-2xl hover:shadow-cyan-400/40 transition-shadow duration-300 transform hover:scale-[1.02]"
              loading="lazy"
              // Robust error fallback
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/256x160/1a2230/9ca3af?text=Professional+Culture";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Application Component
const CultureBenefit = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle image preloading for smooth crossfade transitions
  const preloadImages = useCallback(() => {
    benefits.forEach((benefit) => {
      const img = new Image();
      img.src = benefit.image;
    });
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // Ensure the index is valid
  const activeBenefit = benefits[activeIndex] || benefits[0];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-inter">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {/* Custom styling for the App component */}
        {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
                
                /* Image cross-fade effect setup */
                .image-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .crossfade-img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    /* Increased duration for smoother, more professional transition */
                    transition: opacity 0.7s ease-in-out; 
                }
                `}
      </style>

      {/* Culture & Lifestyle Section */}
      <section className="py-20 md:py-32 bg-gray-950 overflow-hidden">
        <div className="text-center mb-12 md:mb-20 px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-cyan-400 shadow-lg shadow-cyan-400/10 inline-block px-2">
            Our <span className="text-white">High-Performance</span> Culture
          </h2>
          <p className="text-lg md:text-2xl text-gray-300 mt-4 max-w-5xl mx-auto">
            We are defined by "innovation, diversity", and a collaborative
            spirit that drives exceptional global impact and career growth.
          </p>
        </div>

        {/* Infinite Scroll Rows */}
        <div className="space-y-4">
          <InfiniteScrollRow images={culturalImages} direction="right" />
          <InfiniteScrollRow
            images={culturalImages.reverse()}
            direction="left"
          />
        </div>
      </section>

      {/* --- */}

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="flex flex-col lg:flex-row items-start lg:gap-16">
          {/* Left Content: Benefits List */}
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
            <span className="text-sm uppercase font-semibold tracking-widest text-indigo-400 bg-gray-900 px-3 py-1 rounded-full mb-4 inline-block shadow-lg">
              Employee Value Proposition
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 leading-snug">
              Invest in Yourself: Comprehensive Benefits for Total Well-being
            </h2>

            <div className="space-y-4">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl cursor-pointer transition-all duration-300 group shadow-xl ${
                      isActive
                        ? "bg-indigo-900/60 border border-indigo-500 transform scale-[1.01]"
                        : "hover:bg-gray-800/70 border border-gray-800"
                    }`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select benefit: ${benefit.title}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <div className="flex items-start space-x-4">
                      <Icon
                        className={`w-7 h-7 mt-1 transition-colors flex-shrink-0 ${
                          isActive
                            ? "text-cyan-400"
                            : "text-indigo-400 group-hover:text-cyan-400"
                        }`}
                      />
                      <div>
                        <h3
                          className={`text-xl font-bold transition-colors ${
                            isActive
                              ? "text-white"
                              : "text-gray-100 group-hover:text-white"
                          }`}
                        >
                          {benefit.title}
                        </h3>
                        <p
                          className={`mt-1 text-base transition-colors ${
                            isActive
                              ? "text-indigo-200"
                              : "text-gray-400 group-hover:text-gray-300"
                          }`}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image: Dynamic Display with Crossfade */}
          <div className="lg:w-1/2  w-full lg:sticky lg:top-25 max-w-lg mx-auto lg:max-w-none">
            <div className="aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-700/50 border-4 border-indigo-600/70 relative">
              {/* Static container for relative positioning */}
              <div className="image-container">
                {/* Use map for all benefits to enable smooth CSS crossfade */}
                {benefits.map((b, idx) => (
                  <img
                    key={b.image}
                    src={b.image}
                    alt={b.title}
                    // Use opacity to create the crossfade effect
                    className="crossfade-img"
                    style={{ opacity: activeIndex === idx ? 1 : 0 }}
                    loading="eager" // Preload actively viewed images
                    // Robust error fallback
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/800x600/0f172a/94a3b8?text=Comprehensive+Benefit";
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 text-center lg:text-left">
              <h4 className="text-2xl font-bold text-cyan-400">
                {activeBenefit.title}
              </h4>
              <p className="text-base text-gray-400 mt-1">
                {activeBenefit.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CultureBenefit;
