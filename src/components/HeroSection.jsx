"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Rocket,
  ShieldCheck,
  UserCheck,
  Workflow,
  PlayCircle,
  X,
} from "lucide-react";

export default function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full min-h-[85vh] flex items-start md:items-center overflow-hidden text-center md:text-left pt-20">
      {/* ---------------- Background ---------------- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://netsoltech.com/_nuxt/bannerVideoNew.DXW5LSDC.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/70 via-blue-500/60 to-purple-600/50 dark:from-cyan-500/50 dark:to-purple-700/50 opacity-20 animate-gradient-move"></div>

      {/* ---------------- Content ---------------- */}
      <div className="relative z-10 container mx-auto px-6 md:px-10">
        <motion.div
          className="max-w-2xl mx-auto md:mx-0 text-center md:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-4 gap-2" variant="secondary">
            <Sparkles className="h-4 w-4" />
            Product Engineering · AI · Cloud
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg">
            Build Intelligent, Scalable{" "}
            <span className="text-cyan-400">Software</span> with escStack
          </h1>

          <p className="mt-4 text-lg text-white/90 dark:text-white/80 max-w-xl drop-shadow-md">
            We partner with startups and enterprises to design, build, and scale
            world-class web, mobile, and AI products—shipped with velocity and
            reliability.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Start a project
                <Rocket className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                Explore solutions
              </Button>
            </Link>
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 text-white backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
              onClick={() => setIsVideoOpen(true)}
            >
              Watch reel
              <PlayCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* Sub points */}
          <div className="my-6 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              SOC2-ready delivery
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Senior-only teams
            </div>
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              CI/CD by default
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---------------- Video Modal ---------------- */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl rounded-xl overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-white hover:text-cyan-400 z-10"
                onClick={() => setIsVideoOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Video */}
              <video
                src="/hero-reel.mp4"
                autoPlay
                controls
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient animation keyframes */}
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 20s ease infinite;
        }
      `}</style>
    </section>
  );
}










// "use client";

// import { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Sparkles,
//   Rocket,
//   ShieldCheck,
//   UserCheck,
//   Workflow,
//   PlayCircle,
//   X,
// } from "lucide-react";

// /**
//  * Polished HeroSection (JavaScript)
//  * - No TypeScript annotations (works in .js/.jsx)
//  * - Dark mode aware
//  * - Video background on md+ screens, static gradient on small screens
//  * - Primary button: blue with white text
//  * - Secondary button: adaptive & professional for both themes
//  * - Accessible modal and reduced-motion respect
//  */

// export default function HeroSection() {
//   const [isVideoOpen, setIsVideoOpen] = useState(false);

//   // reduced motion support
//   const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     setShouldReduceMotion(mq.matches);

//     // Handler without TypeScript types (works in JS)
//     const handler = (e) => setShouldReduceMotion(e.matches);

//     // Modern browsers
//     if (mq.addEventListener) {
//       mq.addEventListener("change", handler);
//       return () => mq.removeEventListener("change", handler);
//     }

//     // Safari & older browsers
//     if (mq.addListener) {
//       mq.addListener(handler);
//       return () => mq.removeListener(handler);
//     }

//     // No-op cleanup if both not present
//     return () => {};
//   }, []);

//   // Prevent background scroll while modal open
//   useEffect(() => {
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = isVideoOpen ? "hidden" : prev;
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [isVideoOpen]);

//   // focus the close button when modal opens (minimal trap)
//   const closeBtnRef = useRef(null);
//   useEffect(() => {
//     if (isVideoOpen && closeBtnRef.current) {
//       closeBtnRef.current.focus();
//     }
//   }, [isVideoOpen]);

//   return (
//     <section
//       className="relative w-full min-h-[72vh] md:min-h-[85vh] flex items-start md:items-center overflow-hidden text-center md:text-left pt-20"
//       aria-labelledby="hero-heading"
//     >
//       {/* ---------- Background: video on md+, gradient poster on small screens ---------- */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
//         aria-hidden="true"
//       >
//         <source
//           src="https://netsoltech.com/_nuxt/bannerVideoNew.DXW5LSDC.mp4"
//           type="video/mp4"
//         />
//       </video>

//       {/* Static gradient + poster for mobile (smoother and faster) */}
//       <div
//         className="block md:hidden absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-400/30 via-blue-500/25 to-purple-600/22"
//         aria-hidden="true"
//       />

//       {/* Dark overlay (adjusted) */}
//       <div className="absolute inset-0 bg-black/30 dark:bg-black/55" aria-hidden="true" />

//       {/* Animated gradient overlay (subtle) */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-40 animate-gradient-move"
//         style={{
//           background:
//             "linear-gradient(90deg, rgba(56,189,248,0.36) 0%, rgba(59,130,246,0.34) 50%, rgba(139,92,246,0.32) 100%)",
//           mixBlendMode: "overlay",
//         }}
//         aria-hidden="true"
//       />

//       {/* ---------- Content ---------- */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
//         <motion.div
//           className="mx-auto md:mx-0 max-w-xl md:max-w-3xl lg:max-w-4xl text-center md:text-left"
//           initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
//           animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Badge */}
//           <Badge
//             className="mb-4 inline-flex items-center gap-2 py-1.5 px-3 text-sm rounded-full"
//             variant="secondary"
//           >
//             <Sparkles className="h-4 w-4" />
//             Product Engineering · AI · Cloud
//           </Badge>

//           {/* Heading */}
//           <h1
//             id="hero-heading"
//             className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg"
//           >
//             Build Intelligent, Scalable{" "}
//             <span className="text-cyan-200 md:text-cyan-300">Software</span>{" "}
//             with{" "}
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
//               escStack
//             </span>
//           </h1>

//           {/* Intro */}
//           <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-xl drop-shadow-md">
//             We partner with startups and enterprises to design, build, and scale
//             world-class web, mobile, and AI products — shipped with velocity and reliability.
//           </p>

//           {/* CTAs */}
//           <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 sm:gap-4">
//             {/* Primary */}
//             <Link href="/contact" aria-label="Start a project">
//               <Button
//                 size="lg"
//                 className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-5 py-3 text-sm font-semibold shadow-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 transition"
//               >
//                 Start a project
//                 <Rocket className="h-4 w-4" />
//               </Button>
//             </Link>

//             {/* Secondary (professional adaptive) */}
//             <Link href="/services" aria-label="Explore solutions" legacyBehavior>
//               <a
//                 className={
//                   "inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition " +
//                   "bg-white/90 text-slate-900 border border-slate-200 shadow-sm hover:bg-white " +
//                   "dark:bg-transparent dark:text-white dark:border-white/20 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300"
//                 }
//               >
//                 Explore solutions
//               </a>
//             </Link>

//             {/* Tertiary */}
//             <button
//               onClick={() => setIsVideoOpen(true)}
//               aria-haspopup="dialog"
//               aria-expanded={isVideoOpen}
//               className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium bg-white/10 text-white hover:bg-white/20 border border-white/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30"
//             >
//               <PlayCircle className="h-4 w-4" />
//               Watch reel
//             </button>
//           </div>

//           {/* Sub-points (chips) */}
//           <div className="mt-6 md:mt-8 flex flex-wrap justify-center md:justify-start gap-3 text-sm">
//             <Chip icon={<ShieldCheck className="h-4 w-4" />}>SOC2-ready delivery</Chip>
//             <Chip icon={<UserCheck className="h-4 w-4" />}>Senior-only teams</Chip>
//             <Chip icon={<Workflow className="h-4 w-4" />}>CI/CD by default</Chip>
//           </div>
//         </motion.div>
//       </div>

//       {/* ---------- Video Modal ---------- */}
//       <AnimatePresence>
//         {isVideoOpen && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             role="dialog"
//             aria-modal="true"
//             aria-label="Hero reel"
//           >
//             {/* Backdrop (click closes) */}
//             <div
//               className="absolute inset-0 bg-black/80"
//               onClick={() => setIsVideoOpen(false)}
//               aria-hidden="true"
//             />

//             {/* Modal content */}
//             <motion.div
//               className="relative w-full max-w-3xl mx-4 rounded-xl overflow-hidden shadow-2xl"
//               initial={{ scale: 0.96 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.96 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Close button */}
//               <button
//                 ref={closeBtnRef}
//                 className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-black/40 p-2 text-white hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
//                 onClick={() => setIsVideoOpen(false)}
//                 aria-label="Close video"
//               >
//                 <X className="h-5 w-5" />
//               </button>

//               {/* Video element */}
//               <video
//                 src="/hero-reel.mp4"
//                 autoPlay
//                 controls
//                 className="w-full h-auto max-h-[72vh] bg-black"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ---------- Animations & small responsive tweaks ---------- */}
//       <style>{`
//         @keyframes gradient-move {
//           0% { background-position: 0% 50%;}
//           50% { background-position: 100% 50%;}
//           100% { background-position: 0% 50%;}
//         }
//         .animate-gradient-move {
//           background-size: 200% 200%;
//           animation: gradient-move 18s linear infinite;
//         }
//         @media (max-width: 420px) {
//           h1 { letter-spacing: -0.01em; font-size: 1.6rem; } /* keep head compact on tiny phones */
//         }
//       `}</style>
//     </section>
//   );
// }

// /* ---------- tiny helper components: Chip ---------- */
// function Chip({ icon, children }) {
//   return (
//     <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-md text-sm bg-white/6 text-white/90 dark:bg-white/5">
//       <span className="opacity-90">{icon}</span>
//       <span className="whitespace-nowrap">{children}</span>
//     </div>
//   );
// }
