"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const AnimatedCanopy = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}) => (
  <div
    {...props}
    className={cn(
      "group relative flex h-full w-full overflow-hidden p-4 [--duration:10s] [--gap:16px] [gap:var(--gap)]",
      vertical ? "flex-col" : "flex-row",
      className
    )}
  >
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn("flex shrink-0 [gap:var(--gap)]", {
          "group-hover:[animation-play-state:paused]": pauseOnHover,
          "animate-canopy-horizontal": !vertical && !reverse,
          "animate-canopy-horizontal-reverse": !vertical && reverse,
          "animate-canopy-vertical": vertical && !reverse,
          "animate-canopy-vertical-reverse": vertical && reverse,
        })}
      >
        {children}
      </div>
    ))}

    {applyMask && (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/50 from-5% via-transparent via-50% to-white/50 to-95% dark:from-gray-800/50 dark:via-transparent dark:to-gray-800/50",
          vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"
        )}
      />
    )}
  </div>
);

const TestimonialCard = ({ testimonial, className }) => {
  const [borderColor, setBorderColor] = useState("border-blue-400");

  const colors = [
    "border-red-400",
    "border-green-400",
    "border-yellow-400",
    "border-pink-400",
    "border-purple-400",
    "border-indigo-400",
    "border-teal-400",
    "border-orange-400",
  ];

  const handleMouseEnter = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBorderColor(randomColor);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={cn(
        "group flex shrink-0 cursor-pointer overflow-hidden rounded-xl border border-transparent p-4 transition-all shadow-md",
        borderColor,
        className,
        "mx-2 h-36 w-72 sm:h-40 sm:w-80 md:h-44 md:w-96" // responsive card sizes
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="relative h-12 w-12 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-600">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-full w-full object-cover not-prose"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-foreground">
              {testimonial.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {testimonial.handle}
            </span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm text-foreground">
            {testimonial.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const AnimatedTestimonials = ({
  data,
  className,
  cardClassName,
  alternateDirection = true,
  rows = 3,
}) => (
  <div
    className={cn(
      "w-full overflow-x-hidden py-6 border-t border-b border-gray-200 dark:border-gray-700",
      className
    )}
  >
    {Array.from({ length: rows }).map((_, rowIndex) => {
      const reverse = alternateDirection ? rowIndex % 2 === 1 : false;
      return (
        <AnimatedCanopy
          key={`Canopy-${rowIndex}`}
          reverse={reverse}
          className="[--duration:25s]"
          pauseOnHover
          applyMask={false}
          repeat={3}
        >
          {data.map((testimonial) => (
            <TestimonialCard
              key={`${rowIndex}-${testimonial.name}`}
              testimonial={testimonial}
              className={cardClassName}
            />
          ))}
        </AnimatedCanopy>
      );
    })}
  </div>
);
