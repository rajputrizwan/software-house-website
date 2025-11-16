

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import TechStack from "./LandingComponent/TechStack"
// import CtaSection from "./LandingComponent/CtaSection";

// // shadcn/ui components
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "@/components/ui/accordion";

// // lucide icons
// import {
//   Sparkles,
//   Rocket,
//   ShieldCheck,
//   Brain,
//   Code2,
//   Smartphone,
//   Cloud,
//   Database,
//   LineChart,
//   Cpu,
//   Globe2,
//   Layers,
//   UserCheck,
//   Workflow,
//   Telescope,
//   Award,
//   ArrowRight,
//   CheckCircle2,
//   ChevronLeft,
//   ChevronRight,
//   PlayCircle,
// } from "lucide-react";


// /* ------------------------------------------------------------
//     Motion helpers
//   ------------------------------------------------------------ */
// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 24 },
//   whileInView: { opacity: 1, y: 0 },
//   transition: { duration: 0.6, delay },
//   viewport: { once: true, amount: 0.3 },
// });

// const staggerParent = {
//   hidden: {},
//   show: {
//     transition: { staggerChildren: 0.08 },
//   },
// };
// const staggerChild = {
//   hidden: { opacity: 0, y: 14 },
//   show: { opacity: 1, y: 0 },
// };

// /* ------------------------------------------------------------
//     Dummy data
//   ------------------------------------------------------------ */
// const CLIENT_LOGOS = [
//   "/logos/stripe.svg",
//   "/logos/atlassian.svg",
//   "/logos/slack.svg",
//   "/logos/spotify.svg",
//   "/logos/airbnb.svg",
//   "/logos/shopify.svg",
//   "/logos/vercel.svg",
//   "/logos/figma.svg",
// ];

// const SERVICES = [
//   {
//     icon: <Code2 className="h-6 w-6" />,
//     title: "Web Application Engineering",
//     desc: "High-performance, SEO-friendly web apps built with Next.js, TypeScript, and clean architectures.",
//     bullet: ["Next.js / Remix", "GraphQL / REST", "Scalable monorepos"],
//   },
//   {
//     icon: <Smartphone className="h-6 w-6" />,
//     title: "Mobile Apps",
//     desc: "Pixel-perfect iOS/Android experiences using React Native or Flutter with native modules when needed.",
//     bullet: [
//       "React Native / Flutter",
//       "App Store & Play Store",
//       "CI/CD for mobile",
//     ],
//   },
//   {
//     icon: <Cloud className="h-6 w-6" />,
//     title: "Cloud & DevOps",
//     desc: "Resilient, observable, and cost-efficient infrastructure with automated delivery.",
//     bullet: [
//       "AWS / GCP / Azure",
//       "Kubernetes / Terraform",
//       "GitHub Actions / ArgoCD",
//     ],
//   },
//   {
//     icon: <Brain className="h-6 w-6" />,
//     title: "AI & Data",
//     desc: "Applied AI/ML systems: LLM integrations, retrieval pipelines, analytics, and MLOps.",
//     bullet: ["LLMs / RAG", "ETL / Data Lakes", "MLOps / Vertex / SageMaker"],
//   },
//   {
//     icon: <ShieldCheck className="h-6 w-6" />,
//     title: "Security & Compliance",
//     desc: "Shift-left security with SAST/DAST, secrets hygiene, and compliance-ready build pipelines.",
//     bullet: ["OWASP ASVS", "SOC2-friendly pipelines", "Zero-trust patterns"],
//   },
//   {
//     icon: <Layers className="h-6 w-6" />,
//     title: "Product Design (UI/UX)",
//     desc: "Human-centered design—from wireframes to design systems that engineers love.",
//     bullet: ["UX Research", "Design Systems", "Usability testing"],
//   },
// ];

// const METRICS = [
//   { value: "50+", label: "Products Delivered" },
//   { value: "20+", label: "Global Clients" },
//   { value: "99.95%", label: "Uptime SLO" },
//   { value: "24/7", label: "Support Coverage" },
// ];

// /* Simple numeric count-up for statistics (falls back to static if non-numeric) */
// function CountUp({ value, duration = 1000 }) {
//   const [display, setDisplay] = useState(value);
//   useEffect(() => {
//     // extract numeric portion
//     const m = String(value).match(/([0-9]+(?:\.[0-9]+)?)/);
//     if (!m) {
//       setDisplay(value);
//       return;
//     }
//     const target = parseFloat(m[1]);
//     let start = 0;
//     const startTime = performance.now();
//     const suffix = String(value).replace(m[1], "");

//     function step(now) {
//       const t = Math.min(1, (now - startTime) / duration);
//       const cur = start + (target - start) * t;
//       // format: if target has decimals, show one or two decimals
//       const formatted = String(target).includes('.') ? cur.toFixed(2) : Math.round(cur).toString();
//       setDisplay(formatted + suffix);
//       if (t < 1) requestAnimationFrame(step);
//     }

//     requestAnimationFrame(step);
//     return () => { };
//   }, [value, duration]);

//   return <span>{display}</span>;
// }

// const PROCESS = [
//   {
//     step: 1,
//     title: "Discovery & Scope",
//     copy: "We clarify goals, risks, and success metrics. Outcome: prioritized backlog and delivery roadmap.",
//   },
//   {
//     step: 2,
//     title: "Design & Architecture",
//     copy: "We propose a modern architecture, pick the right stack, and craft prototype flows.",
//   },
//   {
//     step: 3,
//     title: "Build & Iterate",
//     copy: "Agile delivery with demoable increments, CI/CD, and quality gates at each stage.",
//   },
//   {
//     step: 4,
//     title: "Launch & Scale",
//     copy: "Observability, automated rollouts, SRE practices, and growth experiments post-launch.",
//   },
// ];

// const CASES = [
//   {
//     id: "commercex",
//     logo: "/logos/shopify.svg",
//     title: "CommerceX – Headless Commerce",
//     summary:
//       "Replatformed a legacy store to a headless architecture with sub-second TTFB.",
//     image:
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop",
//     metrics: ["+38% CVR", "-62% infra cost", "A/A tested"],
//   },
//   {
//     id: "medlytics",
//     logo: "/logos/figma.svg",
//     title: "MedLytics – AI Diagnostics",
//     summary:
//       "LLM-assisted triage for radiology reports with human-in-the-loop feedback.",
//     image:
//       "https://images.unsplash.com/photo-1584985591739-7ec8d8f15b6a?q=80&w=1400&auto=format&fit=crop",
//     metrics: ["95% precision", "HIPAA pipeline", "Audit-ready"],
//   },
//   {
//     id: "fleetops",
//     logo: "/logos/vercel.svg",
//     title: "FleetOps – Telematics Platform",
//     summary:
//       "Realtime IoT ingestion with time-series analytics and proactive alerts.",
//     image:
//       "https://images.unsplash.com/photo-1533555906625-5e41b7c80cde?q=80&w=1400&auto=format&fit=crop",
//     metrics: ["10k events/sec", "99.99% uptime", "Multi-region"],
//   },
// ];


// // --- Sub-Component for individual tech chips ---
// const TechChip = ({ name }) => (
//   <div className="
//         inline-flex items-center px-4 py-1.5 text-sm font-medium 
//         text-blue-700 bg-blue-100 rounded-full 
//         dark:bg-blue-900/40 dark:text-blue-300
//         transition-colors duration-300 hover:bg-blue-200 dark:hover:bg-blue-800/50
//         whitespace-nowrap cursor-default
//     ">
//     {name}
//   </div>
// );

// // --- Sub-Component for Category Card ---
// const CategoryCard = ({ category, description, technologies, IconComponent }) => (
//   <div className="
//         flex flex-col p-8 h-full bg-white dark:bg-gray-800 rounded-xl 
//         shadow-xl border-t-4 border-t-transparent
//         transition-all duration-300 ease-out 
//         hover:shadow-2xl hover:border-t-blue-500 dark:hover:border-t-blue-400
//         transform hover:translate-y-[-2px]
//     ">
//     <div className="flex items-start space-x-4 mb-4 text-blue-600 dark:text-blue-400">
//       {/* Render the specific icon component */}
//       <IconComponent />
//       <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">
//         {category}
//       </h3>
//     </div>

//     <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-base">
//       {description}
//     </p>

//     {/* Chips for the individual technologies */}
//     <div className="mt-auto flex flex-wrap gap-2">
//       {technologies.map((tech) => (
//         <TechChip key={tech} name={tech} />
//       ))}
//     </div>
//   </div>
// );
// const primaryBtn =
//   "inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full text-sm font-semibold shadow-[0_12px_40px_rgba(59,130,246,0.12)] transition transform will-change-transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400/40";
// const primaryGradient = "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white";
// const secondaryBtn =
//   "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ring-1 ring-transparent transition bg-white/8 hover:bg-white/10 dark:bg-white/4 dark:hover:bg-white/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300";


// const TECH = [
//   "Next.js",
//   "TypeScript",
//   "React Native",
//   "Node.js",
//   "Go",
//   "Python",
//   "PostgreSQL",
//   "MongoDB",
//   "Redis",
//   "Kafka",
//   "Docker",
//   "Kubernetes",
//   "Terraform",
//   "AWS",
//   "GCP",
//   "Azure",
//   "LangChain",
//   "OpenAI",
//   "Pinecone",
//   "Supabase",
//   "Prisma",
//   "tRPC",
//   "GraphQL",
//   "TailwindCSS",
// ];

// const TESTIMONIALS = [
//   {
//     quote:
//       "escStack delivered beyond expectations—architecture, velocity, and polish. We shipped in half the time.",
//     name: "Amelia Hart",
//     role: "VP Product, Northwind",
//   },
//   {
//     quote:
//       "Their DevOps mindset cut our cloud bill by 58% while improving deployment frequency. Unreal.",
//     name: "Omar Siddiqui",
//     role: "CTO, OrbitPay",
//   },
//   {
//     quote:
//       "We finally have a design system devs can implement. Hand-offs are smooth and measurable.",
//     name: "Grace Park",
//     role: "Head of Design, Lumen",
//   },
// ];

// const PRICING = [
//   {
//     tier: "Startup",
//     price: "$4.5k / mo",
//     pitch: "Get a small, senior pod to validate and ship quickly.",
//     features: [
//       "Product/tech discovery",
//       "Design sprint + prototype",
//       "1–2 senior engineers",
//       "Cloud setup + CI/CD",
//       "Weekly demos",
//     ],
//   },
//   {
//     tier: "Growth",
//     price: "$12k / mo",
//     pitch: "Scale features & reliability with a cross-functional crew.",
//     features: [
//       "Tech lead + 3–4 engineers",
//       "Design system & QA",
//       "SRE + observability",
//       "Performance budget",
//       "Security baseline",
//     ],
//   },
//   {
//     tier: "Enterprise",
//     price: "Custom",
//     pitch: "Complex systems, compliance, and bespoke SLAs.",
//     features: [
//       "Solution architect",
//       "Multi-team delivery",
//       "SOC2 / HIPAA posture",
//       "24/7 on-call",
//       "Advanced analytics",
//     ],
//   },
// ];

// const FAQ_ITEMS = [
//   {
//     id: 'q1',
//     question: 'How quickly can we kick off?',
//     answer:
//       'Most projects begin within 1–2 weeks. For urgent engagements, our fast-track squad can start discovery in 72 hours.',
//   },
//   {
//     id: 'q2',
//     question: 'Do you work with in-house teams?',
//     answer:
//       'Absolutely. We embed with your engineers, PMs, and designers or run parallel streams with clear integration points.',
//   },
//   {
//     id: 'q3',
//     question: 'How do you ensure quality?',
//     answer:
//       'We use typed codebases, automated tests, preview environments, code-review rituals, and performance/security budgets.',
//   },
//   {
//     id: 'q4',
//     question: 'What about IP and security?',
//     answer:
//       'IP is yours. We follow least-privilege access, secrets management, SSO, and can align with SOC2/HIPAA requirements.',
//   },
// ];

// /* ------------------------------------------------------------
//     Lightweight marquee for logos
//   ------------------------------------------------------------ */
// function LogosMarquee({ items = [] }) {
//   return (
//     <div className="relative w-full overflow-hidden py-6">
//       <div
//         className="flex gap-12 whitespace-nowrap animate-[marquee_24s_linear_infinite]"
//         aria-label="Trusted by global clients"
//       >
//         {items.concat(items).map((src, i) => {
//           const file = src.split("/").pop() || src;
//           const brand = file.split(".")[0].replace(/[-_]/g, " ");
//           const altText = brand.charAt(0).toUpperCase() + brand.slice(1) + " logo";
//           return (
//             <img
//               key={`${src}-${i}`}
//               src={src}
//               alt={altText}
//               role="img"
//               className="h-8 w-auto opacity-70 hover:opacity-100 transition"
//               loading="lazy"
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------
//     Case studies carousel (simple, no external deps)
//   ------------------------------------------------------------ */
// function CaseCarousel() {
//   const [index, setIndex] = useState(0);
//   const next = () => setIndex((p) => (p + 1) % CASES.length);
//   const prev = () => setIndex((p) => (p - 1 + CASES.length) % CASES.length);

//   return (
//     <div
//       className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border backdrop-blur"
//       role="region"
//       aria-label="Case studies carousel"
//     >
//       <div className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
//         <Button
//           variant="secondary"
//           size="icon"
//           onClick={prev}
//           className="rounded-full"
//           aria-label="Previous case"
//         >
//           <ChevronLeft className="h-5 w-5" aria-hidden="true" />
//         </Button>
//       </div>
//       <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-10">
//         <Button
//           variant="secondary"
//           size="icon"
//           onClick={next}
//           className="rounded-full"
//           aria-label="Next case"
//         >
//           <ChevronRight className="h-5 w-5" aria-hidden="true" />
//         </Button>
//       </div>

//       <div className="relative h-[440px]">
//         <AnimatePresence initial={false} mode="wait">
//           <motion.div
//             key={CASES[index].id}
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -40 }}
//             transition={{ duration: 0.45 }}
//             className="grid md:grid-cols-2 h-full"
//           >
//             <div className="relative">
//               <img
//                 src={CASES[index].image}
//                 alt={CASES[index].title}
//                 className="absolute inset-0 h-full w-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent" />
//             </div>
//             <div className="p-8 md:p-10 flex flex-col justify-center" aria-live="polite" aria-atomic="true">
//               <div className="flex items-center gap-3 mb-2">
//                 <img
//                   src={CASES[index].logo}
//                   alt={`${CASES[index].title} logo`}
//                   className="h-6 w-auto opacity-80"
//                 />
//                 <Badge variant="secondary">Case Study</Badge>
//               </div>
//               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                 {CASES[index].title}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 mt-2">
//                 {CASES[index].summary}
//               </p>
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {CASES[index].metrics.map((m) => (
//                   <Badge key={m} variant="outline" className="text-xs">
//                     {m}
//                   </Badge>
//                 ))}
//               </div>
//               <div className="mt-6">
//                 <Link href="/contact">
//                   <Button>
//                     View details
//                     <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------
//     Main page
//   ------------------------------------------------------------ */
// export default function EscStackLanding() {
//   /* Hero video play control (mobile-safe) */
//   const videoRef = useRef(null);
//   const [videoReady, setVideoReady] = useState(false);

//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;
//     const onCanPlay = () => setVideoReady(true);
//     v.addEventListener("canplay", onCanPlay);
//     return () => v.removeEventListener("canplay", onCanPlay);
//   }, []);

//   const router = useRouter();

//   // Testimonials carousel state
//   const [tIndex, setTIndex] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [playing, setPlaying] = useState(true);
//   // Tech filter state
//   const [techQuery, setTechQuery] = useState("");
//   const filteredTech = TECH.filter((s) => s.toLowerCase().includes(techQuery.trim().toLowerCase()));
//   // FAQ filter & controls
//   const [faqQuery, setFaqQuery] = useState("");
//   const [openAll, setOpenAll] = useState(false);
//   const filteredFaq = FAQ_ITEMS.filter((f) => f.question.toLowerCase().includes(faqQuery.trim().toLowerCase()) || f.answer.toLowerCase().includes(faqQuery.trim().toLowerCase()));

//   useEffect(() => {
//     if (paused || !playing) return;
//     const id = setInterval(() => {
//       setTIndex((p) => (p + 1) % TESTIMONIALS.length);
//     }, 6000);
//     return () => clearInterval(id);
//   }, [paused, playing]);

//   // keyboard navigation
//   useEffect(() => {
//     function onKey(e) {
//       if (e.key === "ArrowLeft") setTIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
//       if (e.key === "ArrowRight") setTIndex((p) => (p + 1) % TESTIMONIALS.length);
//       if (e.key === " ") { setPlaying((s) => !s); }
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   // static dark surface for value-props section
//   const sectionClass =
//     "container mx-auto px-6 md:px-10 py-16 bg-gradient-to-b from-transparent to-black/6 dark:from-transparent dark:to-black/30 rounded-2xl";

//   return (
//     <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">



//       {/* ----------------------------- HERO SECTION ----------------------------- */}



//       <section className="relative overflow-hidden">
//         {/* subtle background gradient for the whole section */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/6 via-transparent to-purple-600/6 pointer-events-none" />

//         <div className="container mx-auto px-6 md:px-10 py-12 md:py-20 relative z-10">
//           <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-10 lg:gap-20">
//             {/* Left / Top: copy */}
//             <div className="w-full lg:w-1/2 max-w-4xl">
//               <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 mb-5"
//               >
//                 <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                 <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
//                   Building the future, one line of code at a time
//                 </span>
//               </motion.div>

//               <motion.h1
//                 id="hero-heading"
//                 initial={{ opacity: 0, y: 18 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.08 }}
//                 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white"
//               >
//                 Software Engineering That
//                 <span className="block lg:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                   {" "}
//                   Delivers Impact
//                 </span>
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.16 }}
//                 className="mt-5 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl"
//               >
//                 We build high-performance web & mobile applications, cloud
//                 infrastructure, and AI solutions for forward-thinking companies.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.24 }}
//                 className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
//               >
//                 <Link
//                   href="/contact"
//                   className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto"
//                   aria-label="Start your project"
//                 >
//                   Start your project
//                   <ArrowRight className="h-4 w-4" />
//                 </Link>

//                 <Link
//                   href="/work"
//                   className="inline-flex items-center gap-2 justify-center px-5 py-3 rounded-lg text-sm font-medium transition border border-slate-200 bg-white/90 text-slate-900 hover:bg-white dark:bg-transparent dark:text-white dark:border-white/20 dark:hover:bg-white/5 w-full sm:w-auto"
//                   aria-label="See our work"
//                 >
//                   <PlayCircle className="h-4 w-4" />
//                   See our work
//                 </Link>
//               </motion.div>
//             </div>

//             {/* Right / Bottom: visual card */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: 0.32 }}
//               className="w-full lg:w-1/2 flex-shrink-0"
//             >
//               <div className="rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl bg-gradient-to-tr from-white to-slate-50 dark:from-gray-800 dark:to-gray-900">
//                 <div className="relative aspect-video bg-gradient-to-tr from-blue-700/6 to-purple-700/6 flex items-center justify-center">
//                   {/* overlay gradient for stronger brand color — keeps contrast readable */}
//                   <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 pointer-events-none" />
//                   <div className="relative z-10 text-center p-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg mx-auto mb-4">
//                       <Rocket className="h-7 w-7 text-white" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                       Modern Software Solutions
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
//                       Web, mobile, cloud, and AI—delivered with precision
//                     </p>
//                   </div>
//                 </div>

//                 {/* optional stats or CTA strip */}
//                 <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40">
//                   <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                     <div className="flex items-center gap-6">
//                       <div className="text-center">
//                         <div className="text-lg font-semibold text-gray-900 dark:text-white">100+</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-lg font-semibold text-gray-900 dark:text-white">50+</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">Clients</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-lg font-semibold text-gray-900 dark:text-white">5</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">Years</div>
//                       </div>
//                     </div>

//                     <div className="mt-3 sm:mt-0">
//                       <Link
//                         href="/contact"
//                         className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto"
//                       >
//                         Contact Now
//                         <ArrowRight className="h-4 w-4" />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>



//       {/* ----------------------------- VALUE PROPS ----------------------------- */}


//       <section className={sectionClass}>
//         {/* Grid features */}
//         <motion.div
//           {...fadeUp()}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//           variants={staggerParent}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.3 }}
//           aria-label="Key capabilities"
//         >
//           {[
//             {
//               icon: <Telescope className="h-6 w-6" aria-hidden="true" />,
//               title: "Outcome-Focused",
//               body: "We align on measurable business outcomes, not just outputs—your KPIs drive our roadmap.",
//             },
//             {
//               icon: <Cpu className="h-6 w-6" aria-hidden="true" />,
//               title: "Engineering Excellence",
//               body: "Battle-tested patterns, performance budgets, and observability baked into every build.",
//             },
//             {
//               icon: <Globe2 className="h-6 w-6" aria-hidden="true" />,
//               title: "Global Delivery",
//               body: "Follow-the-sun coverage, distributed pods, and time-zone friendly collaboration.",
//             },
//           ].map((v, i) => (
//             <Card
//               as="article"
//               aria-roledescription="feature"
//               aria-label={v.title}
//               key={i}
//               className="relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-white/40 to-white/10 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-md p-0 transition-transform transform-gpu hover:-translate-y-2 focus-within:-translate-y-2 will-change-transform duration-300"
//             >
//               {/* vertical accent bar using blue->purple gradient */}
//               <div
//                 className="absolute left-0 top-0 h-full w-1 rounded-r-full"
//                 aria-hidden="true"
//                 style={{
//                   background:
//                     "linear-gradient(180deg, rgba(59,130,246,0.95), rgba(99,102,241,0.9), rgba(139,92,246,0.95))",
//                 }}
//               />

//               <div className="p-6 md:p-8">
//                 <div className="flex items-start gap-4">
//                   <div
//                     className="rounded-lg p-3 bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-300 drop-shadow-[0_10px_30px_rgba(99,102,241,0.06)] inline-flex"
//                     aria-hidden="true"
//                   >
//                     {v.icon}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <CardTitle className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
//                       {v.title}
//                     </CardTitle>

//                     <CardContent className="p-0 mt-2">
//                       <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
//                         {v.body}
//                       </p>
//                     </CardContent>
//                   </div>
//                 </div>
//               </div>

//               {/* focusable overlay to provide keyboard focus styles */}
//               <span className="sr-only">Feature: {v.title}</span>
//             </Card>
//           ))}
//         </motion.div>

      
//       </section>

//       {/* ------------------------- SERVICES SECTION ------------------------ */}



//       <section className="container mx-auto px-6 md:px-10 py-16">
//         <div className="relative max-w-2xl mx-auto text-center">
//           {/* decorative neon blobs (blue -> purple theme) */}
//           <div className="pointer-events-none absolute -top-8 -left-10 w-44 h-44 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-400/20 blur-3xl mix-blend-screen opacity-60" />
//           <div className="pointer-events-none absolute -bottom-6 -right-16 w-56 h-56 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-400/12 blur-2xl mix-blend-overlay opacity-50" />

//           <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 leading-snug">
//             Product teams that ship impact
//           </h2>
//           <p className="text-lg text-gray-700 dark:text-gray-300 mt-3 mx-auto max-w-2xl">
//             Senior pods, platform engineering, and AI integrations—tailored to
//             move your product from prototype to scale with measurable outcomes.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//           {SERVICES.map((s, i) => (
//             <motion.div key={s.title} {...fadeUp(i * 0.05)}>
//               {(() => {
//                 const titleId = `service-${i}-title`;
//                 return (
//                   <Card
//                     role="article"
//                     aria-labelledby={titleId}
//                     tabIndex={0}
//                     onKeyDown={(e) => {
//                       // allow Enter / Space to activate primary action unless an interactive element is focused
//                       const k = e.key;
//                       if (k === "Enter" || k === " ") {
//                         const tag = (e.target && e.target.tagName) || "";
//                         if (!["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
//                           e.preventDefault();
//                           // use location navigation to avoid nested Link/Button issues
//                           if (typeof window !== "undefined") window.location.href = "/contact";
//                         }
//                       }
//                     }}
//                     className="group relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/60 to-slate-50 dark:from-gray-900/40 dark:to-gray-900/30 backdrop-blur-md border border-white/6 dark:border-gray-800/40 shadow-[0_12px_50px_rgba(14,116,144,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30 motion-safe:transform-gpu motion-safe:transition-transform group-hover:motion-safe:-translate-y-1"
//                   >
//                     {/* vertical accent bar using blue -> purple gradient */}
//                     <div
//                       className="absolute left-0 top-0 h-full w-1 rounded-r-full"
//                       aria-hidden="true"
//                       style={{
//                         background:
//                           "linear-gradient(180deg, rgba(59,130,246,0.95), rgba(99,102,241,0.9), rgba(139,92,246,0.95))",
//                       }}
//                     />

//                     <CardHeader className="p-6 md:p-8">
//                       <div className="flex items-start gap-4">
//                         <div className="flex items-center justify-center rounded-lg p-3 bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-300 shadow-sm transition-shadow group-hover:shadow-[0_30px_100px_rgba(99,102,241,0.12)] w-12 h-12 ring-1 ring-blue-300/8 relative">
//                           <span className="sr-only">{s.title} icon</span>
//                           <div className="transform-gpu transition-transform group-hover:scale-105" aria-hidden="true">
//                             {s.icon}
//                           </div>
//                           {/* inner glow */}
//                           <div className="pointer-events-none absolute inset-0 rounded-lg blur-[14px] opacity-60 mix-blend-screen bg-gradient-to-tr from-blue-300/30 to-purple-400/6" />
//                         </div>

//                         <div className="flex-1 min-w-0">
//                           <CardTitle id={titleId} className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
//                             {s.title}
//                           </CardTitle>
//                           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                             {s.desc}
//                           </p>
//                         </div>
//                       </div>
//                     </CardHeader>

//                     <CardContent className="p-6 md:p-6 pt-0 space-y-4">
//                       <ul className="grid gap-2 text-sm">
//                         {s.bullet.map((b) => (
//                           <li key={b} className="flex items-start gap-3">
//                             <span className="mt-0.5 text-blue-500 dark:text-blue-300">
//                               <CheckCircle2 className="h-4 w-4" />
//                             </span>
//                             <span className="text-gray-700 dark:text-gray-200 text-sm">{b}</span>
//                           </li>
//                         ))}
//                       </ul>

//                       <div className="mt-4 border-t border-white/5 dark:border-gray-700 pt-3 flex items-center justify-between">
//                         <Link href="/services" className="text-sm font-medium text-blue-600 hover:text-indigo-600">
//                           Learn more →
//                         </Link>

//                         <div className="flex items-center gap-2">
//                           {/* Use an inline button that navigates on click (avoids nesting Link + Button) */}
//                           <button
//                             type="button"
//                             onClick={() => (typeof window !== "undefined" ? (window.location.href = "/contact") : null)}
//                             className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium shadow-[0_14px_60px_rgba(59,130,246,0.14)] ring-1 ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-400/40 transition"
//                           >
//                             Talk to us
//                           </button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })()}
//             </motion.div>
//           ))}
//         </div>
//       </section>














//       {/* ------------------------- ALTERNATING FEATURES ------------------------ */}



//       <section className="container mx-auto px-6 md:px-10 py-16 space-y-16">
//         {/* Feature A */}
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <motion.div {...(fadeUp ? fadeUp() : {})} className="rounded-2xl overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
//               alt="Design and front-end engineering workshop"
//               className="w-full h-[360px] object-cover rounded-2xl border border-gray-200 dark:border-gray-700"
//               loading="lazy"
//             />
//           </motion.div>

//           <motion.div {...(fadeUp ? fadeUp(0.07) : {})} className="space-y-4">
//             <Badge className="rounded-full border text-sm px-3 py-1 bg-transparent text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800">
//               Design → Dev
//             </Badge>

//             <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white leading-tight">
//               Design systems & front-end engineering for consistent products
//             </h3>

//             <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
//               We translate product strategy into living design systems and production-ready components.
//               Our teams deliver design tokens, accessible UI primitives and developer tooling so your
//               product ships faster with consistent UX across web and mobile.
//             </p>

//             <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
//               <Link
//                 href="/work"
//                 className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
//                 aria-label="See case studies"
//               >
//                 See case studies
//                 <ArrowRight className="w-4 h-4" />
//               </Link>

//               <Link
//                 href="/services"
//                 className={`${secondaryBtn} text-slate-900 dark:text-white border-slate-100 dark:border-white/10 w-full sm:w-auto`}
//                 aria-label="Our design process"
//               >
//                 Our design process
//               </Link>
//             </div>
//           </motion.div>
//         </div>

//         {/* Feature B */}
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <motion.div {...(fadeUp ? fadeUp(0.08) : {})} className="order-2 md:order-1 space-y-4">
//             <Badge className="rounded-full border text-sm px-3 py-1 bg-transparent text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800">
//               AI · Data
//             </Badge>

//             <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white leading-tight">
//               Practical AI & data engineering that powers product value
//             </h3>

//             <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
//               We integrate LLMs, retrieval-augmented systems, and instrumentation so you get
//               measurable outcomes — faster time-to-value, safer behavior, and analytics that prove ROI.
//               Production-ready ML pipelines and guardrails are standard.
//             </p>

//             <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
//               <Link
//                 href="/services#ai"
//                 className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
//                 aria-label="AI services"
//               >
//                 AI services
//                 <ArrowRight className="w-4 h-4" />
//               </Link>

//               <Link
//                 href="/contact"
//                 className={`${secondaryBtn} text-slate-900 dark:text-white border-slate-100 dark:border-white/10 w-full sm:w-auto`}
//                 aria-label="Prototype with us"
//               >
//                 Prototype with us
//               </Link>
//             </div>
//           </motion.div>

//           <motion.div {...(fadeUp ? fadeUp() : {})} className="order-1 md:order-2 rounded-2xl overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop"
//               alt="AI and data engineering console"
//               className="w-full h-[360px] object-cover rounded-2xl border border-gray-200 dark:border-gray-700"
//               loading="lazy"
//             />
//           </motion.div>
//         </div>

//         {/* Feature C */}
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <motion.div {...(fadeUp ? fadeUp() : {})} className="rounded-2xl overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop"
//               alt="Cloud infrastructure and SRE"
//               className="w-full h-[360px] object-cover rounded-2xl border border-gray-200 dark:border-gray-700"
//               loading="lazy"
//             />
//           </motion.div>

//           <motion.div {...(fadeUp ? fadeUp(0.07) : {})} className="space-y-4">
//             <Badge className="rounded-full border text-sm px-3 py-1 bg-transparent text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800">
//               DevOps · SRE
//             </Badge>

//             <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white leading-tight">
//               Reliable delivery—observability, SLOs & cost discipline
//             </h3>

//             <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
//               We build resilient cloud platforms with CI/CD, infra-as-code, and SRE practices so your
//               service meets SLAs and stays cost-efficient. Runbooks, monitoring and automated plays
//               are built into every release.
//             </p>

//             <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
//               <Link
//                 href="/services#cloud"
//                 className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
//                 aria-label="See capabilities"
//               >
//                 See capabilities
//                 <ArrowRight className="w-4 h-4" />
//               </Link>

//               <Link
//                 href="/contact"
//                 className={`${secondaryBtn} text-slate-900 dark:text-white border-slate-100 dark:border-white/10 w-full sm:w-auto`}
//                 aria-label="Talk to an architect"
//               >
//                 Talk to an architect
//               </Link>
//             </div>
//           </motion.div>
//         </div>

//         {/* Section CTA (single, clear, primary action) */}
//         <div className="max-w-3xl mx-auto text-center mt-6">
//           <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">
//             Ready to build? Our senior pods design, ship and operate production software — let’s discuss your roadmap.
//           </p>

//           <div className="flex items-center justify-center gap-3">
//             <Link
//               href="/contact"
//               className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
//               aria-label="Start a project"
//             >
//               Start a project
//               <ArrowRight className="w-4 h-4" />
//             </Link>

//             <Link
//               href="/work"
//               className={`${secondaryBtn} text-slate-900 dark:text-white border-slate-100 dark:border-white/10 hidden sm:inline-flex`}
//               aria-label="View work"
//             >
//               View work
//             </Link>
//           </div>
//         </div>
//       </section>



//       {/* -------------------------------- METRICS -------------------------------- */}
//       <section
//         className="container mx-auto px-6 md:px-10 py-16"
//         aria-label="Key statistics"
//       >
//         <Card className="border border-gray-200 dark:border-gray-700 backdrop-blur-md rounded-2xl">
//           <CardContent className="p-6 md:p-10">
//             <dl className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10">
//               {METRICS.map((m, i) => (
//                 <motion.div
//                   key={m.label}
//                   {...fadeUp(i * 0.05)}
//                   className="text-center"
//                   role="group"
//                   aria-labelledby={`metric-${i}-label`}
//                 >
//                   <dt id={`metric-${i}-label`} className="sr-only">
//                     {m.label}
//                   </dt>

//                   {/* Animated Value */}
//                   <dd className="text-3xl md:text-4xl font-extrabold leading-tight">
//                     <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
//                       <CountUp value={m.value} duration={900} />
//                     </span>
//                   </dd>

//                   {/* Label */}
//                   <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">
//                     {m.label}
//                   </div>

//                   {/* Accent Line */}
//                   <div className="mx-auto mt-4 h-0.5 w-14 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-90" />
//                 </motion.div>
//               ))}
//             </dl>
//           </CardContent>
//         </Card>
//       </section>

//       {/* -------------------------------- PROCESS -------------------------------- */}


//       <section className="container mx-auto px-6 md:px-10 py-16">
//         <div className="max-w-2xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//             How We Deliver
//           </h2>
//           <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-3">
//             We run short, measurable cycles so you see value fast and with predictable risk.
//           </p>
//         </div>

//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {PROCESS.map((p, i) => (
//             <motion.div key={p.step} {...fadeUp(i * 0.05)}>
//               <Card
//                 className={
//                   "relative overflow-visible h-full rounded-2xl border border-transparent dark:border-gray-800/40 backdrop-blur-md " +
//                   "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-400/25 transition-transform hover:-translate-y-1 motion-safe:transform-gpu motion-safe:duration-300"
//                 }
//               >
//                 {/* diagonal ribbon with step number (responsive). Keep an sr-only label for screen readers. */}
//                 <div className="absolute -top-3 left-3 md:-top-4 md:left-4 -rotate-12 z-20">
//                   <span
//                     className="inline-flex items-center text-white text-sm md:text-base font-extrabold px-2 md:px-3 py-0.5 md:py-1 rounded-md shadow-lg ring-1 ring-white/30 border border-white/10"
//                     style={{
//                       background:
//                         "linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(79,70,229,1) 55%, rgba(139,92,246,1) 100%)",
//                     }}
//                   >
//                     <span className="sr-only">Step </span>
//                     <span aria-hidden="true">{p.step}</span>
//                   </span>
//                 </div>

//                 <CardHeader className="items-start gap-4 p-6 md:p-8">
//                   <div className="flex-1">
//                     <CardTitle className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
//                       {p.title}
//                     </CardTitle>
//                     <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">
//                       {p.copy}
//                     </div>
//                   </div>
//                 </CardHeader>

//                 <CardContent className="p-0" aria-hidden="true">
//                   {/* intentionally empty as per original */}
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </section>

     

//       <TechStack />


//       {/* -------------------------------- FINAL CTA ------------------------------ */}
//       <CtaSection />

//     </main>
//   );
// }




"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TechStack from "./LandingComponent/TechStack";
import CtaSection from "./LandingComponent/CtaSection";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// lucide icons
import {
  Sparkles,
  Rocket,
  ShieldCheck,
  Brain,
  Code2,
  Smartphone,
  Cloud,
  Database,
  LineChart,
  Cpu,
  Globe2,
  Layers,
  UserCheck,
  Workflow,
  Telescope,
  Award,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
} from "lucide-react";

/* ------------------------------------------------------------
    Motion helpers
  ------------------------------------------------------------ */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, amount: 0.3 },
});

const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};
const staggerChild = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

/* ------------------------------------------------------------
    Dummy data
  ------------------------------------------------------------ */
const CLIENT_LOGOS = [
  "/logos/stripe.svg",
  "/logos/atlassian.svg",
  "/logos/slack.svg",
  "/logos/spotify.svg",
  "/logos/airbnb.svg",
  "/logos/shopify.svg",
  "/logos/vercel.svg",
  "/logos/figma.svg",
];

const SERVICES = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Web Application Engineering",
    desc: "High-performance, SEO-friendly web apps built with Next.js, TypeScript, and clean architectures.",
    bullet: ["Next.js / Remix", "GraphQL / REST", "Scalable monorepos"],
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Apps",
    desc: "Pixel-perfect iOS/Android experiences using React Native or Flutter with native modules when needed.",
    bullet: [
      "React Native / Flutter",
      "App Store & Play Store",
      "CI/CD for mobile",
    ],
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Cloud & DevOps",
    desc: "Resilient, observable, and cost-efficient infrastructure with automated delivery.",
    bullet: [
      "AWS / GCP / Azure",
      "Kubernetes / Terraform",
      "GitHub Actions / ArgoCD",
    ],
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI & Data",
    desc: "Applied AI/ML systems: LLM integrations, retrieval pipelines, analytics, and MLOps.",
    bullet: ["LLMs / RAG", "ETL / Data Lakes", "MLOps / Vertex / SageMaker"],
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Security & Compliance",
    desc: "Shift-left security with SAST/DAST, secrets hygiene, and compliance-ready build pipelines.",
    bullet: ["OWASP ASVS", "SOC2-friendly pipelines", "Zero-trust patterns"],
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Product Design (UI/UX)",
    desc: "Human-centered design—from wireframes to design systems that engineers love.",
    bullet: ["UX Research", "Design Systems", "Usability testing"],
  },
];

const METRICS = [
  { value: "50+", label: "Products Delivered" },
  { value: "20+", label: "Global Clients" },
  { value: "99.95%", label: "Uptime SLO" },
  { value: "24/7", label: "Support Coverage" },
];

/* Simple numeric count-up for statistics (falls back to static if non-numeric) */
function CountUp({ value, duration = 1000 }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    // extract numeric portion
    const m = String(value).match(/([0-9]+(?:\.[0-9]+)?)/);
    if (!m) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(m[1]);
    let start = 0;
    const startTime = performance.now();
    const suffix = String(value).replace(m[1], "");

    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const cur = start + (target - start) * t;
      // format: if target has decimals, show one or two decimals
      const formatted = String(target).includes('.') ? cur.toFixed(2) : Math.round(cur).toString();
      setDisplay(formatted + suffix);
      if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
    return () => { };
  }, [value, duration]);

  return <span>{display}</span>;
}

const PROCESS = [
  {
    step: 1,
    title: "Discovery & Scope",
    copy: "We clarify goals, risks, and success metrics. Outcome: prioritized backlog and delivery roadmap.",
  },
  {
    step: 2,
    title: "Design & Architecture",
    copy: "We propose a modern architecture, pick the right stack, and craft prototype flows.",
  },
  {
    step: 3,
    title: "Build & Iterate",
    copy: "Agile delivery with demoable increments, CI/CD, and quality gates at each stage.",
  },
  {
    step: 4,
    title: "Launch & Scale",
    copy: "Observability, automated rollouts, SRE practices, and growth experiments post-launch.",
  },
];

const CASES = [
  {
    id: "commercex",
    logo: "/logos/shopify.svg",
    title: "CommerceX – Headless Commerce",
    summary:
      "Replatformed a legacy store to a headless architecture with sub-second TTFB.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop",
    metrics: ["+38% CVR", "-62% infra cost", "A/A tested"],
  },
  {
    id: "medlytics",
    logo: "/logos/figma.svg",
    title: "MedLytics – AI Diagnostics",
    summary:
      "LLM-assisted triage for radiology reports with human-in-the-loop feedback.",
    image:
      "https://images.unsplash.com/photo-1584985591739-7ec8d8f15b6a?q=80&w=1400&auto=format&fit=crop",
    metrics: ["95% precision", "HIPAA pipeline", "Audit-ready"],
  },
  {
    id: "fleetops",
    logo: "/logos/vercel.svg",
    title: "FleetOps – Telematics Platform",
    summary:
      "Realtime IoT ingestion with time-series analytics and proactive alerts.",
    image:
      "https://images.unsplash.com/photo-1533555906625-5e41b7c80cde?q=80&w=1400&auto=format&fit=crop",
    metrics: ["10k events/sec", "99.99% uptime", "Multi-region"],
  },
];


// --- Sub-Component for individual tech chips ---
const TechChip = ({ name }) => (
  <div className="
        inline-flex items-center px-4 py-1.5 text-sm font-medium 
        text-blue-700 bg-blue-100 rounded-full 
        dark:bg-blue-900/40 dark:text-blue-300
        transition-colors duration-300 hover:bg-blue-200 dark:hover:bg-blue-800/50
        whitespace-nowrap cursor-default
      ">
    {name}
  </div>
);

// --- Sub-Component for Category Card ---
const CategoryCard = ({ category, description, technologies, IconComponent }) => (
  <div className="
        flex flex-col p-8 h-full bg-white dark:bg-gray-800 rounded-xl 
        shadow-xl border-t-4 border-t-transparent
        transition-all duration-300 ease-out 
        hover:shadow-2xl hover:border-t-blue-500 dark:hover:border-t-blue-400
        transform hover:translate-y-[-2px]
      ">
    <div className="flex items-start space-x-4 mb-4 text-blue-600 dark:text-blue-400">
      {/* Render the specific icon component */}
      <IconComponent />
      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">
        {category}
      </h3>
    </div>

    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-base">
      {description}
    </p>

    {/* Chips for the individual technologies */}
    <div className="mt-auto flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <TechChip key={tech} name={tech} />
      ))}
    </div>
  </div>
);
const primaryBtn =
  "inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full text-sm font-semibold shadow-[0_12px_40px_rgba(59,130,246,0.12)] transition transform will-change-transform hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400/40";
const primaryGradient = "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white";
const secondaryBtn =
  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ring-1 ring-transparent transition bg-white/8 hover:bg-white/10 dark:bg-white/4 dark:hover:bg-white/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300";


const TECH = [
  "Next.js",
  "TypeScript",
  "React Native",
  "Node.js",
  "Go",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Kafka",
  "Docker",
  "Kubernetes",
  "Terraform",
  "AWS",
  "GCP",
  "Azure",
  "LangChain",
  "OpenAI",
  "Pinecone",
  "Supabase",
  "Prisma",
  "tRPC",
  "GraphQL",
  "TailwindCSS",
];

const TESTIMONIALS = [
  {
    quote:
      "escStack delivered beyond expectations—architecture, velocity, and polish. We shipped in half the time.",
    name: "Amelia Hart",
    role: "VP Product, Northwind",
  },
  {
    quote:
      "Their DevOps mindset cut our cloud bill by 58% while improving deployment frequency. Unreal.",
    name: "Omar Siddiqui",
    role: "CTO, OrbitPay",
  },
  {
    quote:
      "We finally have a design system devs can implement. Hand-offs are smooth and measurable.",
    name: "Grace Park",
    role: "Head of Design, Lumen",
  },
];

const PRICING = [
  {
    tier: "Startup",
    price: "$4.5k / mo",
    pitch: "Get a small, senior pod to validate and ship quickly.",
    features: [
      "Product/tech discovery",
      "Design sprint + prototype",
      "1–2 senior engineers",
      "Cloud setup + CI/CD",
      "Weekly demos",
    ],
  },
  {
    tier: "Growth",
    price: "$12k / mo",
    pitch: "Scale features & reliability with a cross-functional crew.",
    features: [
      "Tech lead + 3–4 engineers",
      "Design system & QA",
      "SRE + observability",
      "Performance budget",
      "Security baseline",
    ],
  },
  {
    tier: "Enterprise",
    price: "Custom",
    pitch: "Complex systems, compliance, and bespoke SLAs.",
    features: [
      "Solution architect",
      "Multi-team delivery",
      "SOC2 / HIPAA posture",
      "24/7 on-call",
      "Advanced analytics",
    ],
  },
];

const FAQ_ITEMS = [
  {
    id: 'q1',
    question: 'How quickly can we kick off?',
    answer:
      'Most projects begin within 1–2 weeks. For urgent engagements, our fast-track squad can start discovery in 72 hours.',
  },
  {
    id: 'q2',
    question: 'Do you work with in-house teams?',
    answer:
      'Absolutely. We embed with your engineers, PMs, and designers or run parallel streams with clear integration points.',
  },
  {
    id: 'q3',
    question: 'How do you ensure quality?',
    answer:
      'We use typed codebases, automated tests, preview environments, code-review rituals, and performance/security budgets.',
  },
  {
    id: 'q4',
    question: 'What about IP and security?',
    answer:
      'IP is yours. We follow least-privilege access, secrets management, SSO, and can align with SOC2/HIPAA requirements.',
  },
];

/* ------------------------------------------------------------
    Lightweight marquee for logos
  ------------------------------------------------------------ */
function LogosMarquee({ items = [] }) {
  return (
    <div className="relative w-full overflow-hidden py-6">
      <div
        className="flex gap-12 whitespace-nowrap animate-[marquee_24s_linear_infinite]"
        aria-label="Trusted by global clients"
      >
        {items.concat(items).map((src, i) => {
          const file = src.split("/").pop() || src;
          const brand = file.split(".")[0].replace(/[-_]/g, " ");
          const altText = brand.charAt(0).toUpperCase() + brand.slice(1) + " logo";
          return (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={altText}
              role="img"
              className="h-8 w-auto opacity-70 hover:opacity-100 transition"
              loading="lazy"
            />
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
    Case studies carousel (simple, no external deps)
  ------------------------------------------------------------ */
function CaseCarousel() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((p) => (p + 1) % CASES.length);
  const prev = () => setIndex((p) => (p - 1 + CASES.length) % CASES.length);

  return (
    <div
      /* --- FIX: Removed fixed height h-[440px] and made it responsive --- */
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border backdrop-blur h-auto md:h-[440px]"
      role="region"
      aria-label="Case studies carousel"
    >
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={prev}
          className="rounded-full"
          aria-label="Previous case"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={next}
          className="rounded-full"
          aria-label="Next case"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>

      {/* --- FIX: Removed fixed height from this container --- */}
      <div className="relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={CASES[index].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45 }}
            /* --- FIX: Explicitly set grid-cols-1 on mobile, and removed h-full which was conflicting --- */
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {/* --- FIX: Set a specific height on mobile, and let it be full height on desktop --- */}
            <div className="relative h-[240px] md:h-full">
              <img
                src={CASES[index].image}
                alt={CASES[index].title}
                /* --- FIX: On desktop, it's absolute, on mobile, it's relative (implied) but still full width/height of its parent --- */
                className="absolute inset-0 h-full w-full object-cover md:absolute"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center" aria-live="polite" aria-atomic="true">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={CASES[index].logo}
                  alt={`${CASES[index].title} logo`}
                  className="h-6 w-auto opacity-80"
                />
                <Badge variant="secondary">Case Study</Badge>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {CASES[index].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {CASES[index].summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {CASES[index].metrics.map((m) => (
                  <Badge key={m} variant="outline" className="text-xs">
                    {m}
                  </Badge>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/contact">
                  <Button>
                    View details
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
    Main page
  ------------------------------------------------------------ */
export default function EscStackLanding() {
  /* Hero video play control (mobile-safe) */
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setVideoReady(true);
    v.addEventListener("canplay", onCanPlay);
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  const router = useRouter();

  // Testimonials carousel state
  const [tIndex, setTIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(true);
  // Tech filter state
  const [techQuery, setTechQuery] = useState("");
  const filteredTech = TECH.filter((s) => s.toLowerCase().includes(techQuery.trim().toLowerCase()));
  // FAQ filter & controls
  const [faqQuery, setFaqQuery] = useState("");
  const [openAll, setOpenAll] = useState(false);
  const filteredFaq = FAQ_ITEMS.filter((f) => f.question.toLowerCase().includes(faqQuery.trim().toLowerCase()) || f.answer.toLowerCase().includes(faqQuery.trim().toLowerCase()));

  useEffect(() => {
    if (paused || !playing) return;
    const id = setInterval(() => {
      setTIndex((p) => (p + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [paused, playing]);

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") setTIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      if (e.key === "ArrowRight") setTIndex((p) => (p + 1) % TESTIMONIALS.length);
      if (e.key === " ") { setPlaying((s) => !s); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // static dark surface for value-props section
  const sectionClass =
    "container mx-auto px-6 md:px-10 py-16 bg-gradient-to-b from-transparent to-black/6 dark:from-transparent dark:to-black/30 rounded-2xl";

  return (
    // /* --- FIX: Added overflow-x-hidden here to prevent any minor horizontal scroll. --- */
    // /* --- This is a good safety net, but the fixes below are the real solution. --- */
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden">



      {/* ----------------------------- HERO SECTION ----------------------------- */}



      <section className="relative overflow-hidden">
        {/* subtle background gradient for the whole section */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/6 via-transparent to-purple-600/6 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-10 py-12 md:py-20 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-10 lg:gap-20">
            {/* Left / Top: copy */}
            <div className="w-full lg:w-1/2 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 mb-5"
              >
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                  Building the future, one line of code at a time
                </span>
              </motion.div>

              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white"
              >
                Software Engineering That
                <span className="block lg:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}
                  Delivers Impact
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-5 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl"
              >
                We build high-performance web & mobile applications, cloud
                infrastructure, and AI solutions for forward-thinking companies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto"
                  aria-label="Start your project"
                >
                  Start your project
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 justify-center px-5 py-3 rounded-lg text-sm font-medium transition border border-slate-200 bg-white/90 text-slate-900 hover:bg-white dark:bg-transparent dark:text-white dark:border-white/20 dark:hover:bg-white/5 w-full sm:w-auto"
                  aria-label="See our work"
                >
                  <PlayCircle className="h-4 w-4" />
                  See our work
                </Link>
              </motion.div>
            </div>

            {/* Right / Bottom: visual card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="w-full lg:w-1/2 flex-shrink-0"
            >
              <div className="rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl bg-gradient-to-tr from-white to-slate-50 dark:from-gray-800 dark:to-gray-900">
                <div className="relative aspect-video bg-gradient-to-tr from-blue-700/6 to-purple-700/6 flex items-center justify-center">
                  {/* overlay gradient for stronger brand color — keeps contrast readable */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 pointer-events-none" />
                  <div className="relative z-10 text-center p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg mx-auto mb-4">
                      <Rocket className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Modern Software Solutions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                      Web, mobile, cloud, and AI—delivered with precision
                    </p>
                  </div>
                </div>

                {/* optional stats or CTA strip */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* --- FIX: Reduced gap-6 to gap-4 on mobile, added justify-center for small screens --- */}
                    <div className="flex items-center justify-center gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">100+</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">50+</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Clients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">5V</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Years</div>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0 w-full sm:w-auto">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto"
                      >
                        Contact Now
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ----------------------------- VALUE PROPS ----------------------------- */}


      <section className={sectionClass}>
        {/* Grid features */}
        <motion.div
          {...fadeUp()}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          aria-label="Key capabilities"
        >
          {[
            {
              icon: <Telescope className="h-6 w-6" aria-hidden="true" />,
              title: "Outcome-Focused",
              body: "We align on measurable business outcomes, not just outputs—your KPIs drive our roadmap.",
            },
            {
              icon: <Cpu className="h-6 w-6" aria-hidden="true" />,
              title: "Engineering Excellence",
              body: "Battle-tested patterns, performance budgets, and observability baked into every build.",
            },
            {
              icon: <Globe2 className="h-6 w-6" aria-hidden="true" />,
              title: "Global Delivery",
              body: "Follow-the-sun coverage, distributed pods, and time-zone friendly collaboration.",
            },
          ].map((v, i) => (
            <Card
              as="article"
              aria-roledescription="feature"
              aria-label={v.title}
              key={i}
              className="relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-white/40 to-white/10 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-md p-0 transition-transform transform-gpu hover:-translate-y-2 focus-within:-translate-y-2 will-change-transform duration-300"
            >
              {/* vertical accent bar using blue->purple gradient */}
              <div
                className="absolute left-0 top-0 h-full w-1 rounded-r-full"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(59,130,246,0.95), rgba(99,102,241,0.9), rgba(139,92,246,0.95))",
                }}
              />

              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-lg p-3 bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-300 drop-shadow-[0_10px_30px_rgba(99,102,241,0.06)] inline-flex"
                    aria-hidden="true"
                  >
                    {v.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                      {v.title}
                    </CardTitle>

                    <CardContent className="p-0 mt-2">
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                        {v.body}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </div>

              {/* focusable overlay to provide keyboard focus styles */}
              <span className="sr-only">Feature: {v.title}</span>
            </Card>
          ))}
        </motion.div>

      
      </section>

      {/* ------------------------- SERVICES SECTION ------------------------ */}



      <section className="container mx-auto px-6 md:px-10 py-16">
        <div className="relative max-w-2xl mx-auto text-center">
          {/* decorative neon blobs (blue -> purple theme) */}
          <div className="pointer-events-none absolute -top-8 -left-10 w-44 h-44 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-400/20 blur-3xl mix-blend-screen opacity-60" />
          <div className="pointer-events-none absolute -bottom-6 -right-16 w-56 h-56 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-400/12 blur-2xl mix-blend-overlay opacity-50" />

          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 leading-snug">
            Product teams that ship impact
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-3 mx-auto max-w-2xl">
            Senior pods, platform engineering, and AI integrations—tailored to
            move your product from prototype to scale with measurable outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} {...fadeUp(i * 0.05)}>
              {(() => {
                const titleId = `service-${i}-title`;
                return (
                  <Card
                    role="article"
                    aria-labelledby={titleId}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      // allow Enter / Space to activate primary action unless an interactive element is focused
                      const k = e.key;
                      if (k === "Enter" || k === " ") {
                        const tag = (e.target && e.target.tagName) || "";
                        if (!["BUTTON", "A", "INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
                          e.preventDefault();
                          // use location navigation to avoid nested Link/Button issues
                          if (typeof window !== "undefined") window.location.href = "/contact";
                        }
                      }
                    }}
                    className="group relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/60 to-slate-50 dark:from-gray-900/40 dark:to-gray-900/30 backdrop-blur-md border border-white/6 dark:border-gray-800/40 shadow-[0_12px_50px_rgba(14,116,144,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30 motion-safe:transform-gpu motion-safe:transition-transform group-hover:motion-safe:-translate-y-1"
                  >
                    {/* vertical accent bar using blue -> purple gradient */}
                    <div
                      className="absolute left-0 top-0 h-full w-1 rounded-r-full"
                      aria-hidden="true"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(59,130,246,0.95), rgba(99,102,241,0.9), rgba(139,92,246,0.95))",
                      }}
                    />

                    <CardHeader className="p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center rounded-lg p-3 bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-300 shadow-sm transition-shadow group-hover:shadow-[0_30px_100px_rgba(99,102,241,0.12)] w-12 h-12 ring-1 ring-blue-300/8 relative">
                          <span className="sr-only">{s.title} icon</span>
                          <div className="transform-gpu transition-transform group-hover:scale-105" aria-hidden="true">
                            {s.icon}
                          </div>
                          {/* inner glow */}
                          <div className="pointer-events-none absolute inset-0 rounded-lg blur-[14px] opacity-60 mix-blend-screen bg-gradient-to-tr from-blue-300/30 to-purple-400/6" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <CardTitle id={titleId} className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                            {s.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 md:p-6 pt-0 space-y-4">
                      <ul className="grid gap-2 text-sm">
                        {s.bullet.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span className="mt-0.5 text-blue-500 dark:text-blue-300">
                              <CheckCircle2 className="h-4 w-4" />
                            </span>
                            <span className="text-gray-700 dark:text-gray-200 text-sm">{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 border-t border-white/5 dark:border-gray-700 pt-3 flex items-center justify-between">
                        <Link href="/services" className="text-sm font-medium text-blue-600 hover:text-indigo-600">
                          Learn more →
                        </Link>

                        <div className="flex items-center gap-2">
                          {/* Use an inline button that navigates on click (avoids nesting Link + Button) */}
                          <button
                            type="button"
                            onClick={() => (typeof window !== "undefined" ? (window.location.href = "/contact") : null)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium shadow-[0_14px_60px_rgba(59,130,246,0.14)] ring-1 ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-400/40 transition"
                          >
                            Talk to us
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </motion.div>
          ))}
        </div>
      </section>














      {/* ------------------------- ALTERNATING FEATURES ------------------------ */}



      <section className="container mx-auto px-6 md:px-10 py-16 space-y-16">
        {/* Feature A */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div {...(fadeUp ? fadeUp() : {})} className="rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
              alt="Design and front-end engineering workshop"
              className="w-full h-[360px] object-cover rounded-2xl border border-gray-200 dark:border-gray-700"
              loading="lazy"
            />
          </motion.div>

          <motion.div {...(fadeUp ? fadeUp(0.07) : {})} className="space-y-4">
            <Badge className="rounded-full border text-sm px-3 py-1 bg-transparent text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800">
              Design → Dev
            </Badge>

            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white leading-tight">
              Design systems & front-end engineering for consistent products
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              We translate product strategy into living design systems and production-ready components.
              Our teams deliver design tokens, accessible UI primitives and developer tooling so your
              product ships faster with consistent UX across web and mobile.
            </p>

            {/* <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href="/work"
                className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
                aria-label="See case studies"
              >
                See case studies
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className={`${secondaryBtn} text-slate-900 dark:text-white border-slate-100 dark:border-white/10 w-full sm:w-auto`}
                aria-label="Our design process"
              >
                Our design process
              </Link>
            </div> */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
  <Link
    href="/work"
    className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
    aria-label="See case studies"
  >
    See case studies
    <ArrowRight className="w-4 h-4" />
  </Link>

  {/* --- FIX: Replaced 'secondaryBtn' with explicit theme-compatible classes --- */}
  <Link
    href="/services"
    className="
      inline-flex items-center justify-center px-6 py-3 rounded-full 
      text-sm font-semibold transition
      w-full sm:w-auto
      bg-white text-slate-900 border border-slate-200 hover:bg-slate-50
      dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300
    "
    aria-label="Our design process"
  >
    Our design process
  </Link>
</div>
          </motion.div>
        </div>

        {/* Feature B */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div {...(fadeUp ? fadeUp(0.08) : {})} className="order-2 md:order-1 space-y-4">
            <Badge className="rounded-full border text-sm px-3 py-1 bg-transparent text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800">
              AI · Data
            </Badge>

            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white leading-tight">
              Practical AI & data engineering that powers product value
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              We integrate LLMs, retrieval-augmented systems, and instrumentation so you get
              measurable outcomes — faster time-to-value, safer behavior, and analytics that prove ROI.
              Production-ready ML pipelines and guardrails are standard.
            </p>

            {/* <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href="/services#ai"
                className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
                aria-label="AI services"
              >
                AI services
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className={`${secondaryBtn} text-slate-900 dark:text-white border-slate-100 dark:border-white/10 w-full sm:w-auto`}
                aria-label="Prototype with us"
              >
                Prototype with us
              </Link>
            </div> */}

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
  <Link
    href="/services#ai"
    className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
    aria-label="AI services"
  >
    AI services
    <ArrowRight className="w-4 h-4" />
  </Link>

  {/* --- FIX: Replaced 'secondaryBtn' with explicit theme-compatible classes --- */}
  <Link
    href="/contact"
    className="
      inline-flex items-center justify-center px-6 py-3 rounded-full 
      text-sm font-semibold transition
      w-full sm:w-auto
      bg-white text-slate-900 border border-slate-200 hover:bg-slate-50
      dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300
    "
    aria-label="Prototype with us"
  >
    Prototype with us
  </Link>
</div>
          </motion.div>

          <motion.div {...(fadeUp ? fadeUp() : {})} className="order-1 md:order-2 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop"
              alt="AI and data engineering console"
              className="w-full h-[360px] object-cover rounded-2xl border border-gray-200 dark:border-gray-700"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Feature C */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div {...(fadeUp ? fadeUp() : {})} className="rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop"
              alt="Cloud infrastructure and SRE"
              className="w-full h-[360px] object-cover rounded-2xl border border-gray-200 dark:border-gray-700"
              loading="lazy"
            />
          </motion.div>

          <motion.div {...(fadeUp ? fadeUp(0.07) : {})} className="space-y-4">
            <Badge className="rounded-full border text-sm px-3 py-1 bg-transparent text-blue-600 dark:text-blue-300 border-blue-100 dark:border-blue-800">
              DevOps · SRE
            </Badge>

            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white leading-tight">
              Reliable delivery—observability, SLOs & cost discipline
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              We build resilient cloud platforms with CI/CD, infra-as-code, and SRE practices so your
              service meets SLAs and stays cost-efficient. Runbooks, monitoring and automated plays
              are built into every release.
            </p>

            {/* <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href="/services#cloud"
                className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
                aria-label="See capabilities"
              >
                See capabilities
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className={`${secondaryBtn} text-slate-900 dark:text-white border-slate-100 dark:border-white/10 w-full sm:w-auto`}
                aria-label="Talk to an architect"
              >
                Talk to an architect
              </Link>
            </div> */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
  <Link
    href="/services#cloud"
    className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
    aria-label="See capabilities"
  >
    See capabilities
    <ArrowRight className="w-4 h-4" />
  </Link>

  {/* --- FIX: Replaced 'secondaryBtn' with explicit theme-compatible classes --- */}
  <Link
    href="/contact"
    className="
      inline-flex items-center justify-center px-6 py-3 rounded-full 
      text-sm font-semibold transition
      w-full sm:w-auto
      bg-white text-slate-900 border border-slate-200 hover:bg-slate-50
      dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300
    "
    aria-label="Talk to an architect"
  >
    Talk to an architect
  </Link>
</div>
          </motion.div>
        </div>

        {/* Section CTA (single, clear, primary action) */}
        <div className="max-w-3xl mx-auto text-center mt-6">
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6">
            Ready to build? Our senior pods design, ship and operate production software — let’s discuss your roadmap.
          </p>

          {/* <div className="flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
              aria-label="Start a project"
            >
              Start a project
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/work"
              className={`${secondaryBtn} text-slate-900 dark:text-white border-slate-100 dark:border-white/10 hidden sm:inline-flex`}
              aria-label="View work"
            >
              View work
            </Link>
          </div> */}

          {/* --- UPDATED SNIPPET --- */}

{/* FIX 1: Changed 'flex' to 'flex-col sm:flex-row'.
  This stacks the buttons vertically on mobile screens (w-full)
  and places them side-by-side on screens 'sm' and larger (w-auto).
*/}
<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
  <Link
    href="/contact"
    className={`${primaryBtn} ${primaryGradient} w-full sm:w-auto`}
    aria-label="Start a project"
  >
    Start a project
    <ArrowRight className="w-4 h-4" />
  </Link>

  {/* FIX 2: Rebuilt the secondary button classes for responsiveness and theme-compatible styling.
    - Removed 'hidden sm:inline-flex' and added 'w-full sm:w-auto' to match the primary button.
    - Removed the base 'secondaryBtn' variable to apply consistent padding ('px-6 py-3') and 'justify-center'.
    - Added 'bg-white' and 'dark:bg-gray-800' for the theme-compatible backgrounds.
    - Added explicit 'border-slate-200' and 'dark:border-gray-700'.
    - Added 'hover:bg-slate-50' and 'dark:hover:bg-gray-700' for hover states.
  */}
  <Link
    href="/work"
    className="
      inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full 
      text-sm font-semibold transition
      w-full sm:w-auto
      bg-white text-slate-900 border border-slate-200 hover:bg-slate-50
      dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300
    "
    aria-label="View work"
  >
    View work
  </Link>
</div>
        </div>
      </section>



      {/* -------------------------------- METRICS -------------------------------- */}
      <section
        className="container mx-auto px-6 md:px-10 py-16"
        aria-label="Key statistics"
      >
        <Card className="border border-gray-200 dark:border-gray-700 backdrop-blur-md rounded-2xl">
          <CardContent className="p-6 md:p-10">
            {/* --- FIX: Changed grid-cols-2 to grid-cols-1, sm:grid-cols-2 --- */}
            {/* This ensures it's single-column on the smallest screens. */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  {...fadeUp(i * 0.05)}
                  className="text-center"
                  role="group"
                  aria-labelledby={`metric-${i}-label`}
                >
                  <dt id={`metric-${i}-label`} className="sr-only">
                    {m.label}
                  </dt>

                  {/* Animated Value */}
                  <dd className="text-3xl md:text-4xl font-extrabold leading-tight">
                    <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                      <CountUp value={m.value} duration={900} />
                    </span>
                  </dd>

                  {/* Label */}
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">
                    {m.label}
                  </div>

                  {/* Accent Line */}
                  <div className="mx-auto mt-4 h-0.5 w-14 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-90" />
                </motion.div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </section>

      {/* -------------------------------- PROCESS -------------------------------- */}


      <section className="container mx-auto px-6 md:px-10 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            How We Deliver
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-3">
            We run short, measurable cycles so you see value fast and with predictable risk.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {PROCESS.map((p, i) => (
            <motion.div key={p.step} {...fadeUp(i * 0.05)}>
              <Card
                className={
                  "relative overflow-visible h-full rounded-2xl border border-transparent dark:border-gray-800/40 backdrop-blur-md " +
                  "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-400/25 transition-transform hover:-translate-y-1 motion-safe:transform-gpu motion-safe:duration-300"
                }
              >
                {/* diagonal ribbon with step number (responsive). Keep an sr-only label for screen readers. */}
                <div className="absolute -top-3 left-3 md:-top-4 md:left-4 -rotate-12 z-20">
                  <span
                    className="inline-flex items-center text-white text-sm md:text-base font-extrabold px-2 md:px-3 py-0.5 md:py-1 rounded-md shadow-lg ring-1 ring-white/30 border border-white/10"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(37,99,235,1) 0%, rgba(79,70,229,1) 55%, rgba(139,92,246,1) 100%)",
                    }}
                  >
                    <span className="sr-only">Step </span>
                    <span aria-hidden="true">{p.step}</span>
                  </span>
                </div>

                <CardHeader className="items-start gap-4 p-6 md:p-8">
                  <div className="flex-1">
                    <CardTitle className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                      {p.title}
                    </CardTitle>
                    <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1">
                      {p.copy}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0" aria-hidden="true">
                  {/* intentionally empty as per original */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      

      <TechStack />


      {/* -------------------------------- FINAL CTA ------------------------------ */}
      <CtaSection />

    </main>
  );
}


