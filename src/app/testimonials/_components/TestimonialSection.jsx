"use client";

import { ArrowRight } from "lucide-react";

const PEOPLE = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    alt: "Person 1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
    alt: "Person 2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
    alt: "Person 3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
    alt: "Person 4",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
    alt: "Person 5",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    alt: "Person 6",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
    alt: "Person 7",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
    alt: "Person 8",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    alt: "Person 9",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
    alt: "Person 10",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
    alt: "Person 11",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=800&auto=format&fit=crop",
    alt: "Person 12",
  },
];

function RowScroller({ speed = 30, reverse = false, offset = 0, size = 112 }) {
  const px = `${size}px`;
  const gap = 20;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className="flex items-center [animation-duration:var(--dur)] animate-[scroll_linear_infinite]"
        style={{
          "--dur": `${speed}s`,
          paddingLeft: offset,
          paddingRight: offset,
          animationDirection: reverse ? "reverse" : "normal",
          gap: `${gap}px`,
        }}
      >
        {[...PEOPLE, ...PEOPLE].map((p, i) => (
          <figure
            key={`${p.id}-${i}`}
            className="shrink-0 rounded-2xl shadow-lg ring-1 ring-blue-500/20 bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 backdrop-blur-md overflow-hidden hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            style={{ width: px, height: px }}
          >
            <img
              src={p.src}
              alt={p.alt}
              className="h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function TrustedByLeaders() {
  return (
    <section className="relative rounded-[28px] flex items-center justify-center py-16 sm:py-24 px-4">
      {/* Background */}
      {/* <div className="relative rounded-[32px] inset-0 bg-gradient-to-b ro from-blue-100 via-white to-blue-50 dark:from-blue-950 dark:via-blue-900 dark:to-black" /> */}

      {/* Card */}
      <div className="relative w-full max-w-6xl mx-auto rounded-[28px] bg-white/70 dark:bg-blue-950/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] ring-1 ring-blue-500/20 backdrop-blur-xl overflow-hidden">
        {/* Collage */}
        <div className="pt-10 sm:pt-12">
          <div className="space-y-6">
            <RowScroller speed={35} reverse={false} offset={32} size={90} />
            <RowScroller speed={42} reverse={true} offset={0} size={104} />
            <RowScroller speed={38} reverse={false} offset={48} size={96} />
          </div>
        </div>

        {/* Content */}
        <div className="relative px-6 sm:px-10 md:px-16 py-12 sm:py-16 md:py-20 text-center">
          <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 px-3 py-1 text-xs font-medium ring-1 ring-inset ring-blue-500/20">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-blue-900 dark:text-blue-100">
            Trusted by leaders
            <span className="block text-blue-600 dark:text-blue-400 font-medium">
              from various industries
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-blue-700/80 dark:text-blue-200/90 max-w-xl mx-auto">
            Learn why professionals trust our solutions to complete their
            customer journeys.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white dark:from-blue-400 dark:to-blue-300 dark:text-blue-950 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Read Success Stories <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes scroll { 
          from { transform: translateX(0); } 
          to { transform: translateX(-50%); } 
        }
      `}</style>
    </section>
  );
}
