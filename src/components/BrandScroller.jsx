"use client";

const BRANDS = [
  {
    id: 1,
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    alt: "Netflix",
  },
  {
    id: 2,
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    alt: "Microsoft",
  },
  {
    id: 3,
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    alt: "IBM",
  },
  {
    id: 4,
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
  },
  {
    id: 5,
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    alt: "Apple",
  },
  {
    id: 6,
    src: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    alt: "Spotify",
  },
];

function BrandScroller({ speed = 30 }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-scroll"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <div
            key={`${brand.id}-${i}`}
            className="flex items-center justify-center mx-8"
            style={{ width: "120px", height: "60px" }} // smaller size
          >
            <img
              src={brand.src}
              alt={brand.alt}
              className="h-full w-auto object-contain transition duration-300" // removed grayscale
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function BrandSlider() {
  return (
    <section className="py-16 sm:py-24 px-6 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10">
        Trusted by Leading Brands
      </h2>
      <BrandScroller speed={25} />
    </section>
  );
}
