"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Award } from "lucide-react";

// Example Data
const COMPANY = {
  name: "escStack",
  tagline:
    "We craft high-quality software that scales startups and enterprises alike.",
  ctaHref: "/contact",
  ctaLabel: "Get in Touch",
  mission:
    "Deliver modern, scalable, and robust digital products that create real impact.",
  vision:
    "To be the global leader in custom software solutions, enabling businesses to thrive.",
};

const STATS = [
  { icon: Award, value: "50+", label: "Projects" },
  { icon: Award, value: "20+", label: "Clients" },
  { icon: Award, value: "5+", label: "Awards" },
  { icon: Award, value: "10+", label: "Countries" },
  { icon: Award, value: "100%", label: "Success Rate" },
];

const SERVICES = [
  { icon: Award, label: "Web Development" },
  { icon: Award, label: "Mobile Apps" },
  { icon: Award, label: "Cloud Solutions" },
  { icon: Award, label: "UI/UX Design" },
  { icon: Award, label: "Product Strategy" },
  { icon: Award, label: "AI & Automation" },
];

const VALUES = [
  {
    icon: Award,
    title: "Integrity",
    desc: "We are transparent, honest, and ethical in everything we do.",
  },
  {
    icon: Award,
    title: "Innovation",
    desc: "We constantly push the boundaries of technology and design.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We strive for perfection and deliver beyond expectations.",
  },
  {
    icon: Award,
    title: "Collaboration",
    desc: "We believe in teamwork and strong partnerships with clients.",
  },
];

const FOUNDERS = [
  { name: "Alice Johnson", role: "CEO & Founder" },
  { name: "Bob Smith", role: "CTO & Co-Founder" },
  { name: "Charlie Kim", role: "COO & Co-Founder" },
];

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const containerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Section Wrapper
const Section = ({ children, className }) => (
  <section className={`py-16 md:py-20 ${className || ""}`}>{children}</section>
);

export default function AboutPage() {
  return (
    <div className="relative w-full bg-gradient-to-b from-background via-background to-muted">
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-teal-300/30 blur-3xl dark:bg-teal-600/20" />
        <div className="absolute top-1/2 -right-24 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-300/40 blur-3xl dark:bg-emerald-700/20" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-700/20" />
      </div>

      {/* Hero */}
      <Section className="px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerStagger}
          className="mx-auto max-w-6xl text-center"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            About <span className="text-teal-600 dark:text-teal-400">{COMPANY.name}</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground"
          >
            {COMPANY.tagline}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex justify-center gap-3">
            <Button size="lg" asChild>
              <a href={COMPANY.ctaHref}>{COMPANY.ctaLabel}</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
          >
            {STATS.map(({ icon: Icon, label, value }) => (
              <Card
                key={label}
                className="border-none bg-card/70 backdrop-blur-lg shadow-md hover:shadow-xl transition rounded-2xl"
              >
                <CardContent className="flex flex-col items-center gap-1 p-4">
                  <Icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  <div className="text-xl font-semibold">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* Mission & Vision */}
      <Section className="px-4">
        <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-2">
          {[{ title: "Our Mission", desc: COMPANY.mission }, { title: "Our Vision", desc: COMPANY.vision }].map(
            (item) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
              >
                <Card className="h-full rounded-2xl shadow-md hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{item.desc}</CardContent>
                </Card>
              </motion.div>
            )
          )}
        </div>
      </Section>

      {/* What we do */}
      <Section className="px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="mx-auto max-w-6xl"
        >
          <motion.h2 variants={fadeUp} className="text-center text-3xl font-semibold">
            What We Do
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground"
          >
            From strategy to shipping, we partner with startups and enterprises to build products
            that scale and delight.
          </motion.p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {SERVICES.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="h-full rounded-2xl border bg-card/80 shadow-sm backdrop-blur-lg transition hover:shadow-lg hover:border-teal-500/50">
                  <CardContent className="flex items-center gap-3 p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/40">
                      <Icon className="h-5 w-5 text-teal-700 dark:text-teal-400" />
                    </span>
                    <div className="font-medium">{label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Values */}
      <Section className="px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="mx-auto max-w-6xl"
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-semibold text-center">
            Our Values
          </motion.h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp}>
                <Card className="h-full rounded-2xl shadow-md hover:shadow-lg transition">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600/10 dark:bg-teal-500/20">
                        <Icon className="h-5 w-5 text-teal-700 dark:text-teal-400" />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <p className="mt-1 text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Leadership */}
      <Section className="px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="mx-auto max-w-6xl"
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-semibold text-center">
            Leadership
          </motion.h2>
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {FOUNDERS.map((f) => (
              <motion.div key={f.name} variants={fadeUp} whileHover={{ y: -3 }}>
                <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{f.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">{f.role}</div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <Badge variant="secondary">Founder</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-3xl text-center text-muted-foreground">
            Our team includes senior engineers, full-stack developers, junior developers, software
            developers, and project managers—over 50 professionals collaborating to deliver
            excellence.
          </div>
        </motion.div>
      </Section>

      {/* Why escStack */}
      <Section className="px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="mx-auto max-w-6xl"
        >
          <motion.h2 variants={fadeUp} className="text-center text-3xl font-semibold">
            Why {COMPANY.name}?
          </motion.h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "High-Quality Products",
                desc: "We ship polished, maintainable software with clean, scalable architectures.",
              },
              {
                title: "Unique Capabilities",
                desc: "We take on complex, custom builds others avoid—and make them shine.",
              },
              {
                title: "Trusted by Clients",
                desc: "Long-term partnerships across local and global markets.",
              },
              {
                title: "Value & Affordability",
                desc: "Premium engineering without enterprise bloat—transparent pricing always.",
              },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{item.desc}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Achievements */}
      <Section className="px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="mx-auto max-w-6xl"
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-semibold text-center">
            Achievements
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-2 text-center text-muted-foreground">
            Recognized with multiple awards for innovation and client success.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {["Innovation Award", "Top Software House", "Customer Delight"].map((t) => (
              <motion.div key={t} variants={fadeUp} whileHover={{ y: -4 }}>
                <Card className="rounded-2xl border bg-card/80 shadow-sm backdrop-blur-lg hover:shadow-lg transition">
                  <CardContent className="flex items-center gap-3 p-6">
                    <Award className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    <div className="font-medium">{t}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Testimonials */}
      <Section className="px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="mx-auto max-w-6xl"
        >
          <motion.h2 variants={fadeUp} className="text-center text-3xl font-semibold">
            What Clients Say
          </motion.h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
                  <CardContent className="p-6">
                    <p className="text-foreground">
                      "escStack delivered beyond expectations—great communication, clean code, and
                      on-time releases."
                    </p>
                    <Separator className="my-4" />
                    <div className="text-sm text-muted-foreground">
                      Edit this with your real testimonial…
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section className="px-4 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="mx-auto max-w-6xl text-center"
        >
          <Card className="mx-auto max-w-3xl rounded-2xl border-0 bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xl hover:shadow-2xl transition">
            <CardContent className="p-8 md:p-10">
              <h3 className="text-2xl font-semibold">Ready to build something remarkable?</h3>
              <p className="mt-2 text-teal-50">
                Partner with {COMPANY.name} to ship faster, smarter, and with confidence.
              </p>
              <div className="mt-6 flex justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href={COMPANY.ctaHref}>{COMPANY.ctaLabel}</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>
    </div>
  );
}
