// "use client";

// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Award } from "lucide-react";

// // Example Data
// const COMPANY = {
//   name: "escStack",
//   tagline:
//     "We craft high-quality software that scales startups and enterprises alike.",
//   ctaHref: "/contact",
//   ctaLabel: "Get in Touch",
//   mission:
//     "Deliver modern, scalable, and robust digital products that create real impact.",
//   vision:
//     "To be the global leader in custom software solutions, enabling businesses to thrive.",
// };

// const STATS = [
//   { icon: Award, value: "50+", label: "Projects" },
//   { icon: Award, value: "20+", label: "Clients" },
//   { icon: Award, value: "5+", label: "Awards" },
//   { icon: Award, value: "10+", label: "Countries" },
//   { icon: Award, value: "100%", label: "Success Rate" },
// ];

// const SERVICES = [
//   { icon: Award, label: "Web Development" },
//   { icon: Award, label: "Mobile Apps" },
//   { icon: Award, label: "Cloud Solutions" },
//   { icon: Award, label: "UI/UX Design" },
//   { icon: Award, label: "Product Strategy" },
//   { icon: Award, label: "AI & Automation" },
// ];

// const VALUES = [
//   {
//     icon: Award,
//     title: "Integrity",
//     desc: "We are transparent, honest, and ethical in everything we do.",
//   },
//   {
//     icon: Award,
//     title: "Innovation",
//     desc: "We constantly push the boundaries of technology and design.",
//   },
//   {
//     icon: Award,
//     title: "Excellence",
//     desc: "We strive for perfection and deliver beyond expectations.",
//   },
//   {
//     icon: Award,
//     title: "Collaboration",
//     desc: "We believe in teamwork and strong partnerships with clients.",
//   },
// ];

// const FOUNDERS = [
//   { name: "Alice Johnson", role: "CEO & Founder" },
//   { name: "Bob Smith", role: "CTO & Co-Founder" },
//   { name: "Charlie Kim", role: "COO & Co-Founder" },
// ];

// // Animations
// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };
// const containerStagger = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// // Section Wrapper
// const Section = ({ children, className }) => (
//   <section className={`py-16 md:py-20 ${className || ""}`}>{children}</section>
// );

// export default function AboutPage() {
//   return (
//     <div className="relative w-full bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
//       {/* Background accents */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 overflow-hidden"
//       >
//         <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-600/20" />
//         <div className="absolute top-1/2 -right-24 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-400/40 blur-3xl dark:bg-blue-700/20" />
//         <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-800/20" />
//       </div>

//       {/* Hero */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={containerStagger}
//           className="mx-auto max-w-6xl text-center"
//         >
//           <motion.h1
//             variants={fadeUp}
//             className="text-4xl md:text-5xl font-bold tracking-tight"
//           >
//             About{" "}
//             <span className="text-blue-600 dark:text-blue-400">
//               {COMPANY.name}
//             </span>
//           </motion.h1>
//           <motion.p
//             variants={fadeUp}
//             className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-600 dark:text-gray-300"
//           >
//             {COMPANY.tagline}
//           </motion.p>
//           <motion.div
//             variants={fadeUp}
//             className="mt-6 flex justify-center gap-3"
//           >
//             <Button size="lg" asChild>
//               <a href={COMPANY.ctaHref}>{COMPANY.ctaLabel}</a>
//             </Button>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             variants={fadeUp}
//             className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
//           >
//             {STATS.map(({ icon: Icon, label, value }) => (
//               <Card
//                 key={label}
//                 className="rounded-2xl border border-gray-200 dark:border-gray-700/50 
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg 
//                   shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//               >
//                 <CardContent className="flex flex-col items-center gap-1 p-4">
//                   <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                   <div className="text-xl font-semibold">{value}</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     {label}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </motion.div>
//         </motion.div>
//       </Section>

//       {/* Mission & Vision */}
//       <Section className="px-4">
//         <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-2">
//           {[
//             { title: "Our Mission", desc: COMPANY.mission },
//             { title: "Our Vision", desc: COMPANY.vision },
//           ].map((item) => (
//             <motion.div
//               key={item.title}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.25 }}
//               variants={fadeUp}
//             >
//               <Card
//                 className="h-full rounded-2xl border border-gray-200 dark:border-gray-700/50 
//                 bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//               >
//                 <CardHeader>
//                   <CardTitle className="text-2xl">{item.title}</CardTitle>
//                 </CardHeader>
//                 <CardContent className="text-muted-foreground">
//                   {item.desc}
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </Section>

//       {/* What we do */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-center text-3xl font-semibold"
//           >
//             What We Do
//           </motion.h2>
//           <motion.p
//             variants={fadeUp}
//             className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground"
//           >
//             From strategy to shipping, we partner with startups and enterprises
//             to build products that scale and delight.
//           </motion.p>

//           <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//             {SERVICES.map(({ icon: Icon, label }) => (
//               <motion.div
//                 key={label}
//                 variants={fadeUp}
//                 whileHover={{ y: -4 }}
//                 className="group"
//               >
//                 <Card
//                   className="h-full rounded-2xl border border-gray-200 dark:border-gray-700/50 
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardContent className="flex items-center gap-3 p-5">
//                     <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/40">
//                       <Icon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
//                     </span>
//                     <div className="font-medium">{label}</div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </Section>

//       {/* Values */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-3xl font-semibold text-center"
//           >
//             Our Values
//           </motion.h2>
//           <div className="mt-8 grid gap-6 md:grid-cols-2">
//             {VALUES.map(({ icon: Icon, title, desc }) => (
//               <motion.div key={title} variants={fadeUp}>
//                 <Card
//                   className="h-full rounded-2xl border border-gray-200 dark:border-gray-700/50 
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex items-start gap-4">
//                       <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-500/20">
//                         <Icon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
//                       </span>
//                       <div>
//                         <h3 className="text-xl font-semibold">{title}</h3>
//                         <p className="mt-1 text-muted-foreground">{desc}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </Section>

//       {/* Leadership */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-3xl font-semibold text-center"
//           >
//             Leadership
//           </motion.h2>
//           <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//             {FOUNDERS.map((f) => (
//               <motion.div key={f.name} variants={fadeUp} whileHover={{ y: -3 }}>
//                 <Card
//                   className="rounded-2xl border border-gray-200 dark:border-gray-700/50 
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-lg">{f.name}</CardTitle>
//                     <div className="text-sm text-muted-foreground">
//                       {f.role}
//                     </div>
//                   </CardHeader>
//                   <CardContent className="pb-6">
//                     <Badge variant="secondary">Founder</Badge>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>

//           <div className="mx-auto mt-8 max-w-3xl text-center text-muted-foreground">
//             Our team includes senior engineers, full-stack developers, junior
//             developers, software developers, and project managers—over 50
//             professionals collaborating to deliver excellence.
//           </div>
//         </motion.div>
//       </Section>

//       {/* Why escStack */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-center text-3xl font-semibold"
//           >
//             Why {COMPANY.name}?
//           </motion.h2>
//           <div className="mt-8 grid gap-6 md:grid-cols-2">
//             {[
//               {
//                 title: "High-Quality Products",
//                 desc: "We ship polished, maintainable software with clean, scalable architectures.",
//               },
//               {
//                 title: "Unique Capabilities",
//                 desc: "We take on complex, custom builds others avoid—and make them shine.",
//               },
//               {
//                 title: "Trusted by Clients",
//                 desc: "Long-term partnerships across local and global markets.",
//               },
//               {
//                 title: "Value & Affordability",
//                 desc: "Premium engineering without enterprise bloat—transparent pricing always.",
//               },
//             ].map((item) => (
//               <motion.div key={item.title} variants={fadeUp}>
//                 <Card
//                   className="rounded-2xl border border-gray-200 dark:border-gray-700/50 
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardHeader>
//                     <CardTitle className="text-xl">{item.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="text-muted-foreground">
//                     {item.desc}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </Section>

//       {/* Achievements */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-3xl font-semibold text-center"
//           >
//             Achievements
//           </motion.h2>
//           <motion.p
//             variants={fadeUp}
//             className="mt-2 text-center text-muted-foreground"
//           >
//             Recognized with multiple awards for innovation and client success.
//           </motion.p>
//           <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
//             {["Innovation Award", "Top Software House", "Customer Delight"].map(
//               (t) => (
//                 <motion.div key={t} variants={fadeUp} whileHover={{ y: -4 }}>
//                   <Card
//                     className="rounded-2xl border border-gray-200 dark:border-gray-700/50 
//                     bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                   >
//                     <CardContent className="flex items-center gap-3 p-6">
//                       <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//                       <div className="font-medium">{t}</div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               )
//             )}
//           </div>
//         </motion.div>
//       </Section>

//       {/* Testimonials */}
//       <Section className="px-4">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           variants={containerStagger}
//           className="mx-auto max-w-6xl"
//         >
//           <motion.h2
//             variants={fadeUp}
//             className="text-center text-3xl font-semibold"
//           >
//             What Clients Say
//           </motion.h2>
//           <div className="mt-8 grid gap-6 md:grid-cols-2">
//             {[1, 2].map((i) => (
//               <motion.div key={i} variants={fadeUp}>
//                 <Card
//                   className="rounded-2xl border border-gray-200 dark:border-gray-700/50 
//                   bg-white/70 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-lg hover:border-blue-500/40 transition"
//                 >
//                   <CardContent className="p-6">
//                     <p className="text-foreground">
//                       "escStack delivered beyond expectations—great
//                       communication, clean code, and on-time releases."
//                     </p>
//                     <Separator className="my-4" />
//                     <div className="text-sm text-muted-foreground">
//                       Edit this with your real testimonial…
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </Section>

//       {/* CTA */}
//       <Section className="px-4">
//         <div className="mx-auto w-full max-w-4xl">
//           <Card
//             className="rounded-2xl border border-gray-200 dark:border-gray-700/50 
//             bg-gradient-to-r from-blue-600 to-indigo-600 
//             text-white shadow-xl"
//           >
//             <CardContent className="flex flex-col md:flex-row items-center justify-between py-12 px-8 gap-6">
//               {/* Text */}
//               <div className="text-center md:text-left">
//                 <h3 className="text-2xl md:text-3xl font-bold mb-3">
//                   Ready to Build With escStack?
//                 </h3>
//                 <p className="text-lg opacity-90 max-w-lg">
//                   Join hundreds of businesses scaling faster with our innovative
//                   and future-ready solutions. Let's bring your idea to life.
//                 </p>
//               </div>

//               {/* Button */}
//               <div>
//                 <a
//                   href="/contact"
//                   className="px-6 py-3 rounded-xl font-semibold text-blue-600 
//                   bg-white hover:bg-gray-100 transition shadow-md"
//                 >
//                   Get in Touch
//                 </a>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </Section>
//     </div>
//   );
// }









"use client";

// escStack — About Us (One-file premium build)
// Tech: Next.js (App Router), TailwindCSS, shadcn/ui, framer-motion, lucide-react
// Notes: All UI kept in a single file per your preference. Production-ready patterns, accessible markup,
// subtle motion, and professional copy. Replace placeholder images/logos with your own assets.

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Award,
  Users,
  Rocket,
  Globe,
  Lightbulb,
  ShieldCheck,
  Code2,
  Brain,
  Cloud,
  Smartphone,
  Wrench,
  Star,
  Sparkles,
  Quote,
  Building2,
  Workflow,
  CheckCircle2,
  HeartHandshake,
  BarChart3,
  Layers3,
  Cpu,
  Infinity as InfinityIcon,
} from "lucide-react";

/*******************************************
 * DATA
 *******************************************/
const COMPANY = {
  name: "escStack",
  tagline: "We craft high‑quality software that scales startups and enterprises alike.",
  subTagline:
    "A senior team focused on velocity, quality, and measurable business outcomes.",
  ctaHref: "/contact",
  ctaLabel: "Get in Touch",
  mission:
    "Deliver modern, scalable, and robust digital products that create real impact.",
  vision:
    "To be the global leader in custom software solutions, enabling businesses to thrive.",
};

const STATS = [
  { icon: Rocket, value: "50+", label: "Projects", back: "Complex, multi-tenant and global." },
  { icon: Users, value: "20+", label: "Clients", back: "Seed → Enterprise partners." },
  { icon: Award, value: "5+", label: "Awards", back: "Innovation & CX recognitions." },
  { icon: Globe, value: "10+", label: "Countries", back: "Distributed delivery model." },
  { icon: Lightbulb, value: "100%", label: "Success Rate", back: "We ship. On time." },
];

const SERVICES = [
  { icon: Code2, label: "Web Development", desc: "Next.js apps that are fast, accessible, and secure." },
  { icon: Smartphone, label: "Mobile Apps", desc: "Native-like experiences with React Native & Flutter." },
  { icon: Cloud, label: "Cloud & DevOps", desc: "AWS/GCP, CI/CD, observability, autoscaling." },
  { icon: Brain, label: "AI & Automation", desc: "ML pipelines, RAG, agents, and workflow automation." },
  { icon: Wrench, label: "Product Engineering", desc: "From MVPs to enterprise platforms, built to last." },
  { icon: ShieldCheck, label: "Security & Compliance", desc: "OWASP, SOC2-ready patterns, SSO/SCIM." },
];

const VALUES = [
  { icon: Lightbulb, title: "Integrity", desc: "Transparent, honest, and ethical collaboration." },
  { icon: Rocket, title: "Innovation", desc: "Relentless curiosity and pragmatic invention." },
  { icon: Award, title: "Excellence", desc: "Craftsmanship, testing, and performance by default." },
  { icon: Users, title: "Collaboration", desc: "One team mindset with your stakeholders." },
];

const PROCESS = [
  { step: 1, title: "Discovery", desc: "Workshops, goals, constraints, and success metrics." },
  { step: 2, title: "Design", desc: "Flows, wireframes, hi‑fi UI, design tokens, accessibility." },
  { step: 3, title: "Build", desc: "Modular architecture, CI/CD, incremental delivery." },
  { step: 4, title: "Launch", desc: "Hardening, analytics, SLOs, and rollout strategies." },
  { step: 5, title: "Evolve", desc: "Experiments, roadmap, and continuous improvement." },
];

const FOUNDERS = [
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    desc:
      "Vision-driven operator with 15+ years in product strategy and growth. Former PM at high-growth SaaS.",
    focus: ["Product Strategy", "Partnerships", "Operations"],
    avatar: "/team/alice.jpg",
  },
  {
    name: "Bob Smith",
    role: "CTO & Co‑Founder",
    desc:
      "Systems thinker who leads platform architecture, security, and performance at scale.",
    focus: ["Architecture", "Security", "DevEx"],
    avatar: "/team/bob.jpg",
  },
  {
    name: "Charlie Kim",
    role: "COO & Co‑Founder",
    desc:
      "Delivery excellence champion ensuring predictable timelines and world-class quality.",
    focus: ["Delivery", "QA", "People"],
    avatar: "/team/charlie.jpg",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "escStack delivered beyond expectations—clean code, proactive communication, and real business impact.",
    name: "Sarah Lee",
    role: "VP Product, FintechCo",
  },
  {
    quote: "A rare partner: pragmatic, fast, and obsessed with quality.",
    name: "Michael Chen",
    role: "Founder, RetailOps",
  },
  {
    quote: "Their team feels like an extension of ours. We ship faster and sleep better.",
    name: "Priya Patel",
    role: "COO, HealthAI",
  },
];

const LOGOS = [
  "/logos/brand-1.svg",
  "/logos/brand-2.svg",
  "/logos/brand-3.svg",
  "/logos/brand-4.svg",
  "/logos/brand-5.svg",
  "/logos/brand-6.svg",
];

/*******************************************
 * ANIMATION VARIANTS & HELPERS
 *******************************************/
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// Simple 3D tilt using pointer position
function useTilt(max = 8) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 1], [max, -max]);
  const rotateY = useTransform(x, [0, 1], [-max, max]);

  function onMouseMove(e: React.MouseEvent) {
    const rect = (ref.current as HTMLElement | null)?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    x.set(px);
    y.set(py);
  }
  function onLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  useEffect(() => {
    onLeave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, rotateX, rotateY, onMouseMove, onLeave };
}

/*******************************************
 * REUSABLE SECTION WRAPPER
 *******************************************/
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-20 md:py-28 ${className}`}>{children}</section>
);

/*******************************************
 * MAIN COMPONENT
 *******************************************/
export default function AboutPage() {
  return (
    <div className="relative w-full bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Background accents */}
      <BackgroundAccents />

      {/* HERO */}
      <Hero />

      {/* LOGO MARQUEE */}
      <LogoMarquee />

      {/* STATS (Flip cards) */}
      <StatsSection />

      {/* MISSION + VISION */}
      <MissionVision />

      {/* SERVICES (Tilt cards) */}
      <ServicesSection />

      {/* VALUES */}
      <ValuesSection />

      {/* PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* CASE STUDIES (Flip stack cards) */}
      <CaseStudies />

      {/* LEADERSHIP */}
      <Leadership />

      {/* TESTIMONIALS (Carousel) */}
      <TestimonialsCarousel />

      {/* CTA */}
      <FinalCTA />
    </div>
  );
}

/*******************************************
 * SUB‑SECTIONS
 *******************************************/
function BackgroundAccents() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/20 animate-pulse" />
      <div className="absolute top-1/2 -right-32 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-700/20 animate-pulse" />
      <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-800/20 animate-pulse" />
    </div>
  );
}

function Hero() {
  return (
    <Section className="px-4 relative">
      <motion.div initial="hidden" animate="visible" variants={containerStagger} className="mx-auto max-w-6xl text-center">
        <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          About {COMPANY.name}
        </motion.h1>
        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-3xl text-lg md:text-xl text-gray-600 dark:text-gray-300">
          {COMPANY.tagline}
        </motion.p>
        <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-3xl text-base md:text-lg text-gray-500 dark:text-gray-400">
          {COMPANY.subTagline}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild className="rounded-xl px-8 shadow-md">
            <a href={COMPANY.ctaHref}>{COMPANY.ctaLabel}</a>
          </Button>
          <Button variant="secondary" size="lg" asChild className="rounded-xl px-8">
            <a href="#services">Explore Services</a>
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function LogoMarquee() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 -top-10 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <Section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">Trusted by teams worldwide</p>
          <div className="mt-6 overflow-hidden">
            <div className="[--speed:30s] flex animate-[marquee_var(--speed)_linear_infinite] gap-12 will-change-transform">
              {LOGOS.concat(LOGOS).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Brand logo"
                  className="h-8 w-auto opacity-70 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function StatsSection() {
  return (
    <Section className="px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={containerStagger} className="mx-auto max-w-6xl">
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">Impact in Numbers</motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Momentum backed by outcomes. Every engagement is measured and optimized.
        </motion.p>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {STATS.map(({ icon: Icon, label, value, back }) => (
            <motion.div key={label} variants={fadeUp} className="group [perspective:1000px]">
              <div className="relative h-36 w-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <Card className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl shadow-md [backface-visibility:hidden] flex items-center justify-center">
                  <CardContent className="flex flex-col items-center gap-2 p-5">
                    <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
                  </CardContent>
                </Card>
                {/* Back */}
                <Card className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center">
                  <CardContent className="p-5 text-center text-sm/5 opacity-95">
                    {back}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function MissionVision() {
  return (
    <Section className="px-4">
      <div className="mx-auto grid max-w-6xl items-stretch gap-8 md:grid-cols-2">
        {[{ title: "Our Mission", desc: COMPANY.mission }, { title: "Our Vision", desc: COMPANY.vision }].map((item) => (
          <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <Card className="h-full rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-lg">{item.desc}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ServicesSection() {
  return (
    <Section className="px-4" id="services">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={containerStagger} className="mx-auto max-w-6xl">
        <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">What We Do</motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          From strategy to shipping, we partner with startups and enterprises to build products that scale and delight.
        </motion.p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, label, desc }) => (
            <ServiceTiltCard key={label} Icon={Icon} label={label} desc={desc} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function ServiceTiltCard({ Icon, label, desc }: { Icon: any; label: string; desc: string }) {
  const { ref, rotateX, rotateY, onMouseMove, onLeave } = useTilt(10);
  return (
    <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} onMouseMove={onMouseMove} onMouseLeave={onLeave}>
      <motion.div ref={ref as any} style={{ rotateX, rotateY }} className="rounded-2xl">
        <Card className="h-full rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-2xl transition">
          <CardContent className="flex items-start gap-4 p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/40">
              <Icon className="h-6 w-6 text-blue-700 dark:text-blue-400" />
            </span>
            <div>
              <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">{label}</div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function ValuesSection() {
  return (
    <Section className="px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={containerStagger} className="mx-auto max-w-6xl">
        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Our Values</motion.h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp} whileHover={{ scale: 1.02 }}>
              <Card className="h-full rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-xl transition">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <span className="mt-1 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-500/20">
                      <Icon className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
                      <p className="mt-2 text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

function ProcessTimeline() {
  return (
    <Section className="px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">How We Work</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          A proven delivery model that balances speed and quality, from kickoff to continuous improvement.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {PROCESS.map((p, i) => (
            <motion.div key={p.step} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
              <Card className="relative h-full rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="rounded-full">Step {p.step}</Badge>
                    <h3 className="font-semibold">{p.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
                {i < PROCESS.length - 1 && (
                  <div className="absolute right-[-12px] top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-blue-500/40 to-transparent md:block" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CaseStudies() {
  const cases = [
    {
      title: "Fintech Platform",
      result: "+38% conversion",
      desc: "Rebuilt onboarding with real‑time risk checks and delightful micro‑interactions.",
    },
    {
      title: "Retail Analytics",
      result: "-42% infra costs",
      desc: "Event streaming + columnar storage + auto-scaling saved six figures annually.",
    },
    {
      title: "Health AI",
      result: "4× faster triage",
      desc: "RAG assistant accelerated case review with auditable outputs.",
    },
  ];

  return (
    <Section className="px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Selected Work</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Flip‑stack cards highlighting measurable wins across industries.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <motion.div key={c.title} className="group [perspective:1000px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="relative h-64 w-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <Card className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/60 shadow-md [backface-visibility:hidden] flex">
                  <CardContent className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{c.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{c.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <BarChart3 className="h-5 w-5" />
                      <span className="font-medium">Outcome</span>
                    </div>
                  </CardContent>
                </Card>
                {/* Back */}
                <Card className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex">
                  <CardContent className="p-6 flex flex-col justify-between">
                    <div className="flex items-center gap-2 opacity-90">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm uppercase tracking-wider">Result</span>
                    </div>
                    <div className="text-3xl font-extrabold">{c.result}</div>
                    <div className="text-sm/6 opacity-90">Benchmarked post‑launch over 8 weeks.</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Leadership() {
  return (
    <Section className="px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={containerStagger} className="mx-auto max-w-6xl">
        <motion.h2 variants={fadeUp} className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">Leadership</motion.h2>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {FOUNDERS.map((f) => (
            <motion.div key={f.name} variants={fadeUp} whileHover={{ y: -4, scale: 1.02 }} className="group">
              <Card className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-lg shadow-md hover:shadow-xl transition">
                <div className="h-40 w-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />
                <CardHeader className="pb-2">
                  <div className="-mt-12 flex items-center gap-4">
                    <div className="h-20 w-20 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur ring-2 ring-white/50 overflow-hidden shadow">
                      <img src={f.avatar} alt={f.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">{f.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">{f.role}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-6 text-muted-foreground">
                  <p>{f.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {f.focus.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl text-center text-muted-foreground">
          Our growing team includes senior engineers, full‑stack developers, UI/UX designers, project managers, and QA engineers—over 50 professionals collaborating to deliver excellence.
        </div>
      </motion.div>
    </Section>
  );
}

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const len = TESTIMONIALS.length;
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % len), 5000);
    return () => clearInterval(id);
  }, [len]);

  return (
    <Section className="px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100">What Clients Say</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Real feedback from long‑term partners across fintech, retail, and health.
        </p>
        <div className="relative mx-auto mt-10 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur shadow-md">
            <div className="relative h-full">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: i === index ? 1 : 0, x: i === index ? 0 : -40 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 p-8 ${i === index ? "pointer-events-auto" : "pointer-events-none"}`}
                >
                  <Quote className="h-8 w-8 opacity-40" />
                  <p className="mt-4 text-lg text-foreground">“{t.quote}”</p>
                  <Separator className="my-6" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                    <span className="ml-2 font-medium">{t.name}</span> — {t.role}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${index === i ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section className="px-4">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
          <CardContent className="flex flex-col md:flex-row items-center justify-between py-12 px-8 gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to build with {COMPANY.name}?</h3>
              <p className="text-lg opacity-90 max-w-lg">
                Join teams scaling faster with our modern engineering, design systems, and secure delivery.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="/contact" className="px-6 py-3 rounded-xl font-semibold text-blue-700 bg-white hover:bg-gray-100 transition shadow-md">Get in Touch</a>
              <a href="#services" className="px-6 py-3 rounded-xl font-semibold border border-white/50 hover:bg-white/10 transition">See Services</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

/*******************************************
 * EXTRA: Utility styles for marquee keyframes
 *******************************************/
// Tailwind cannot define dynamic keyframes inline; this utility relies on a global style.
// Add this to your globals.css if not already present:
// @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
// .animate-[marquee_var(--speed)_linear_infinite] { animation: marquee var(--speed) linear infinite; }
