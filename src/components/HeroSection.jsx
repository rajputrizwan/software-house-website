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
