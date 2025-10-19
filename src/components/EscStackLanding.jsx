"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

// shadcn/ui (assumes you've installed these)
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
    return () => {};
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
      {/* Tailwind keyframes in globals.css:
          @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        */}
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
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border backdrop-blur"
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

      <div className="relative h-[440px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={CASES[index].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45 }}
            className="grid md:grid-cols-2 h-full"
          >
            <div className="relative">
              <img
                src={CASES[index].image}
                alt={CASES[index].title}
                className="absolute inset-0 h-full w-full object-cover"
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

  // static dark surface for value-props section
  const sectionClass =
    "container mx-auto px-6 md:px-10 py-16 bg-gradient-to-b from-transparent to-black/6 dark:from-transparent dark:to-black/30 rounded-2xl";

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* ----------------------------- VALUE PROPS ----------------------------- */}
      <section className={sectionClass}>
        {/* Surface toggle removed; using static dark surface for consistency */}

        <motion.div
          {...fadeUp()}
          className="grid md:grid-cols-3 gap-6"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
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
              key={i}
              className="relative overflow-hidden border border-transparent bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-md p-0 rounded-2xl hover:-translate-y-2 transform-gpu transition will-change-transform duration-300"
            >
              {/* cyan accent bar */}
              <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400/80" aria-hidden="true" />

              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-gradient-to-tr from-cyan-50/60 to-cyan-100/40 p-3 text-cyan-400 dark:text-cyan-300 drop-shadow-[0_8px_30px_rgba(6,182,212,0.06)]">
                    {v.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg md:text-xl font-semibold text-cyan-400 dark:text-cyan-300">
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
            </Card>
          ))}
        </motion.div>
        {/* small CTA row */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">Ready to discuss outcomes? We’ll map a pragmatic plan.</div>
          <div>
            <Link href="/contact">
              <Button className="bg-cyan-600 hover:bg-cyan-500 text-white ring-1 ring-cyan-400/10 shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
                Book a free consult
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------- SERVICES SECTION ------------------------ */}
      <section className="container mx-auto px-6 md:px-10 py-16">
  <div className="relative max-w-2xl mx-auto text-center">
          {/* decorative neon blobs */}
          <div className="pointer-events-none absolute -top-8 -left-10 w-44 h-44 rounded-full bg-gradient-to-br from-cyan-400/30 to-indigo-400/20 blur-3xl mix-blend-screen opacity-60" />
          <div className="pointer-events-none absolute -bottom-6 -right-16 w-56 h-56 rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-400/12 blur-2xl mix-blend-overlay opacity-50" />

          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-300 leading-snug">
            Product teams that ship impact
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-3 mx-auto max-w-2xl">
            Senior pods, platform engineering, and AI integrations—tailored to
            move your product from prototype to scale with measurable outcomes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
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
                          router.push("/contact");
                        }
                      }
                    }}
                    className="group relative h-full bg-white/60 dark:bg-gray-900/44 backdrop-blur-md border border-white/6 dark:border-gray-800/40 shadow-[0_12px_50px_rgba(14,116,144,0.06)] rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 motion-safe:transition-transform motion-safe:transform-gpu group-hover:motion-safe:-translate-y-1 overflow-hidden"
                  >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-lg p-3 bg-gradient-to-tr from-cyan-50/30 to-purple-50/10 text-cyan-300 dark:text-cyan-200 shadow-sm transition-shadow group-hover:shadow-[0_30px_100px_rgba(34,211,238,0.16)] w-12 h-12 ring-1 ring-cyan-300/8 relative">
                      <span className="sr-only">{s.title} icon</span>
                      <div className="transform-gpu transition-transform group-hover:scale-105" aria-hidden="true">
                        {s.icon}
                      </div>
                      {/* inner glow */}
                      <div className="pointer-events-none absolute inset-0 rounded-lg blur-[14px] opacity-60 mix-blend-screen bg-gradient-to-tr from-cyan-300/30 to-purple-400/6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle id={titleId} className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                        {s.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="grid gap-2 text-sm">
                    {s.bullet.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-0.5 text-cyan-400 dark:text-cyan-300">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span className="text-gray-700 dark:text-gray-200 text-sm">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 border-t border-white/5 dark:border-gray-700 pt-3 flex items-center justify-between">
                    <Link href="/services" className="text-sm text-cyan-600 hover:text-cyan-500">
                      Learn more →
                    </Link>
                    <div className="flex items-center gap-2">
                      <Link href="/contact">
                        <Button className="bg-cyan-700 hover:bg-cyan-600 text-white shadow-[0_14px_60px_rgba(6,182,212,0.16)] ring-1 ring-cyan-500/20 focus-visible:ring-2 focus-visible:ring-cyan-400/40">
                          Talk to us
                        </Button>
                      </Link>
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
      <section className="container mx-auto px-6 md:px-10 py-16 space-y-20">
        {/* Feature A */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp()}>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
              alt="Design workshop"
              className="rounded-2xl border border-gray-200 dark:border-gray-700 object-cover w-full h-[360px]"
            />
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <Badge variant="outline" className="mb-3">
              Design → Dev
            </Badge>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              From Insight to Interface—Design Systems Developers Love
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              We codify tokens, components, and guidelines to make teams faster
              and interfaces consistent—without slowing down discovery.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <Link href="/work">See case studies</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services">Our design process</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Feature B */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp(0.1)} className="order-2 md:order-1">
            <Badge variant="outline" className="mb-3">
              AI + Data
            </Badge>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              Practical AI That Ships—LLMs, RAG, and Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              We integrate LLMs, retrieval, and guardrails to create helpful
              product experiences, backed by analytics that prove value.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" asChild>
                <Link href="/contact">Prototype with us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services#ai">AI services</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div {...fadeUp()} className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop"
              alt="AI console"
              className="rounded-2xl border border-gray-200 dark:border-gray-700 object-cover w-full h-[360px]"
            />
          </motion.div>
        </div>

        {/* Feature C */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp()}>
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop"
              alt="Cloud ops"
              className="rounded-2xl border border-gray-200 dark:border-gray-700 object-cover w-full h-[360px]"
            />
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <Badge variant="outline" className="mb-3">
              DevOps & SRE
            </Badge>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              Reliable by Design—Observability, SLOs, and Cost Discipline
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Delivery with confidence: CI/CD, rollbacks, infra as code, and
              runbooks that scale with your roadmap.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <Link href="/services#cloud">See capabilities</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Talk to an architect</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------- METRICS -------------------------------- */}
      <section className="container mx-auto px-6 md:px-10 py-16" aria-label="Key statistics">
        <Card className="border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/60 backdrop-blur-md">
          <CardContent className="p-6 md:p-10">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {METRICS.map((m, i) => (
                <motion.div key={m.label} {...fadeUp(i * 0.04)} className="text-center" role="group" aria-labelledby={`metric-${i}-label`}>
                  <dt id={`metric-${i}-label`} className="sr-only">{m.label}</dt>
                  <dd className="text-2xl md:text-3xl font-extrabold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-500 to-pink-500 drop-shadow-[0_12px_30px_rgba(139,92,246,0.12)]">
                      <CountUp value={m.value} duration={900} />
                    </span>
                  </dd>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2" aria-hidden="false">
                    {m.label}
                  </div>
                  <div className="mx-auto mt-3 h-0.5 w-14 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 opacity-90" aria-hidden="true" />
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

        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {PROCESS.map((p, i) => (
            <motion.div key={p.step} {...fadeUp(i * 0.05)}>
              <Card className="relative overflow-visible h-full border border-white/6 dark:border-gray-800/40 bg-white/60 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl focus-within:ring-2 focus-within:ring-violet-400/30 transition-transform hover:-translate-y-1">
                {/* diagonal ribbon with step number (responsive). Keep an sr-only label for screen readers. */}
                <div className="absolute -top-3 left-3 -rotate-12 md:-top-4 md:left-4 md:-rotate-12 z-20">
                  <span className="inline-flex items-center bg-gradient-to-tr from-violet-500 to-fuchsia-600 text-white text-sm md:text-base font-extrabold px-2 md:px-3 py-0.5 md:py-1 rounded-md shadow-lg ring-1 ring-white/30 border border-white/10">
                    <span className="sr-only">Step </span>
                    <span aria-hidden="true">{p.step}</span>
                  </span>
                </div>
                <CardHeader className="items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      {p.title}
                    </CardTitle>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {p.copy}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* hint removed per request */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------- CASE STUDIES ---------------------------- */}
      <section className="container mx-auto px-6 md:px-10 py-16">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Selected Work
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              A quick look at problems we've solved recently.
            </p>
          </div>
          <Link href="/work">
            <Button variant="outline">All case studies</Button>
          </Link>
        </div>
        <CaseCarousel />
      </section>

      {/* -------------------------------- TECH WALL ------------------------------ */}
      <section className="container mx-auto px-6 md:px-10 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Tech We Love
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Modern, well-supported technologies chosen for longevity.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {TECH.map((t) => (
            <div
              key={t}
              className="border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-sm text-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition bg-white/60 dark:bg-gray-800/60 ring-1 ring-cyan-400/6"
            >
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------ TESTIMONIALS ----------------------------- */}
      <section className="container mx-auto px-6 md:px-10 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            What Clients Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            We measure success by outcomes and relationships.
          </p>
        </div>

        <Tabs defaultValue="t0" className="mt-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3 bg-gray-100 dark:bg-gray-800">
            {TESTIMONIALS.map((t, i) => (
              <TabsTrigger
                key={i}
                value={`t${i}`}
                className="text-gray-900 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                {t.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {TESTIMONIALS.map((t, i) => (
            <TabsContent key={i} value={`t${i}`} className="mt-6">
              <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardContent className="p-6 md:p-10">
                  <p className="text-xl leading-relaxed text-gray-900 dark:text-white">
                    "{t.quote}"
                  </p>
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    — {t.name}, {t.role}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* -------------------------------- PRICING PREVIEW ------------------------ */}
      <section className="container mx-auto px-6 md:px-10 py-16">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Engagement Models
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Transparent monthly pricing—tailored to your stage and ambition.
            </p>
          </div>
          <Link href="/contact">
            <Button variant="outline">Compare in detail</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((p, i) => (
            <motion.div key={p.tier} {...fadeUp(i * 0.05)}>
              <Card className="h-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {p.tier}
                    </CardTitle>
                    {i === 1 && (
                      <Badge
                        variant="secondary"
                        className="uppercase tracking-wider"
                      >
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                    {p.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{p.pitch}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-cyan-400 dark:text-cyan-300 drop-shadow-[0_6px_16px_rgba(6,182,212,0.06)]" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full">Get started</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* -------------------------------- FAQ / ACCORDION ------------------------ */}
      <section className="container mx-auto px-6 md:px-10 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            FAQs
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            The essentials—process, timelines, and collaboration.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem
            value="q1"
            className="border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              How quickly can we kick off?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              Most projects begin within 1–2 weeks. For urgent engagements, our
              fast-track squad can start discovery in 72 hours.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q2"
            className="border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              Do you work with in-house teams?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              Absolutely. We embed with your engineers, PMs, and designers or
              run parallel streams with clear integration points.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q3"
            className="border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              How do you ensure quality?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              We use typed codebases, automated tests, preview environments,
              code-review rituals, and performance/security budgets.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q4"
            className="border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              What about IP and security?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              IP is yours. We follow least-privilege access, secrets management,
              SSO, and can align with SOC2/HIPAA requirements.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* -------------------------------- FINAL CTA ------------------------------ */}
      <section className="container mx-auto px-6 md:px-10 py-16">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-100/40 via-white to-gray-100/30 dark:from-gray-800/40 dark:via-gray-900 dark:to-gray-800/30 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-3">
                Let's build
              </Badge>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                Ready to move from idea to impact?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Tell us about your product vision—we'll map a pragmatic plan and
                assemble a senior pod to deliver it.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/contact">
                  <Button size="lg" className="gap-2 bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_12px_48px_rgba(6,182,212,0.12)] ring-1 ring-cyan-400/10">
                    Book a discovery call
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    Our services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1529336953121-ad3a76ffb2a7?q=80&w=1600&auto=format&fit=crop"
                alt="Team collaboration"
                className="rounded-xl border border-gray-200 dark:border-gray-700 object-cover w-full h-[280px]"
              />
              <div className="absolute -bottom-4 -right-4 hidden md:block">
                <Badge className="shadow-lg gap-2 bg-cyan-600 text-white">
                  <Award className="h-4 w-4" />
                  5★ client rating
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
