"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Award,
    Users,
    Globe,
    Rocket,
    ShieldCheck,
    Sparkles,
    Target,
    Trophy,
    Laptop,
    BrainCircuit,
    Palette,
    Cloud,
} from "lucide-react";

// ====================
// Editable content
// ====================
const COMPANY = {
    name: "escStack",
    tagline:
        "We craft unique, high‑quality digital products—reliably, efficiently, and at a price that respects your runway.",
    mission:
        "Provide high‑quality services no one else provides—delivered with care, speed, and technical excellence.",
    vision:
        "Become one of the world's most recognized software houses through innovation, quality, and customer success.",
    ctaLabel: "View Services",
    ctaHref: "/services",
};

const STATS = [
    { icon: Trophy, label: "Projects Delivered", value: "100+" },
    { icon: Users, label: "Happy Clients", value: "100+" },
    { icon: Globe, label: "Regions Served", value: "Global" },
    { icon: Rocket, label: "Founded", value: "2022" },
    { icon: ShieldCheck, label: "Engineers", value: "50+" },
];

const VALUES = [
    {
        icon: Sparkles,
        title: "Quality First",
        desc: "We obsess over performance, polish, and reliability in every release.",
    },
    {
        icon: Target,
        title: "Customer‑Focused",
        desc: "Your outcomes drive our roadmap—from discovery to delivery and beyond.",
    },
    {
        icon: ShieldCheck,
        title: "Trust & Transparency",
        desc: "Clear timelines, open communication, and no surprises—ever.",
    },
    {
        icon: Award,
        title: "Distinctive Solutions",
        desc: "We build what others won’t: bespoke, unique, and future‑proof.",
    },
];

const SERVICES = [
    { icon: Laptop, label: "Web Development" },
    { icon: BrainCircuit, label: "AI Solutions" },
    { icon: Cloud, label: "Cloud & DevOps" },
    { icon: Palette, label: "UI/UX Design" },
    { icon: Users, label: "Dedicated Teams" },
];

const FOUNDERS = [
    { name: "Ayaz Hussain", role: "Founder" },
    { name: "Rizwan Rajpot", role: "Founder • Senior Engineer" },
    { name: "Shabeer Nawaz", role: "Founder" },
];

// ====================
// Animation helpers
// ====================
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

const containerStagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

// function Section({
//     className,
//     children,
//     id,
// } : {
//     className?: string;
//     children: React.ReactNode;
//     id?: string;
// }) {
//     return (
//         <section id={id} className={cn("relative py-16 md:py-24", className)}>
//             {children}
//         </section>
//     );
// }

function Section({ className, children, id }) {
    return (
        <section id={id} className={cn("py-16", className)}>
            {children}
        </section>
    );
}
export default function AboutPage() {
    return (
        <div className="relative w-full bg-gradient-to-b from-white via-white to-slate-50">
            {/* Background accents */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />
                <div className="absolute top-1/2 -right-24 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
            </div>

            {/* Hero */}
            <Section className="px-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerStagger}
                    className="mx-auto max-w-6xl text-center"
                >
                    <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight">
                        About <span className="text-teal-600">{COMPANY.name}</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-slate-600"
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
                            <Card key={label} className="border-none bg-white/70 backdrop-blur shadow-sm">
                                <CardContent className="flex flex-col items-center gap-1 p-4">
                                    <Icon className="h-6 w-6" />
                                    <div className="text-xl font-semibold">{value}</div>
                                    <div className="text-xs text-slate-500">{label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </motion.div>
            </Section>

            {/* Mission & Vision */}
            <Section className="px-4">
                <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={fadeUp}
                    >
                        <Card className="h-full rounded-2xl shadow-md">
                            <CardHeader>
                                <CardTitle className="text-2xl">Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-600">
                                {COMPANY.mission}
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={fadeUp}
                    >
                        <Card className="h-full rounded-2xl shadow-md">
                            <CardHeader>
                                <CardTitle className="text-2xl">Our Vision</CardTitle>
                            </CardHeader>
                            <CardContent className="text-slate-600">
                                {COMPANY.vision}
                            </CardContent>
                        </Card>
                    </motion.div>
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
                        className="mx-auto mt-3 max-w-2xl text-center text-slate-600"
                    >
                        From strategy to shipping, we partner with startups and enterprises to build products that scale and delight.
                    </motion.p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {SERVICES.map(({ icon: Icon, label }) => (
                            <motion.div
                                key={label}
                                variants={fadeUp}
                                whileHover={{ y: -4 }}
                                className="group"
                            >
                                <Card className="h-full rounded-2xl border bg-white/80 shadow-sm backdrop-blur transition">
                                    <CardContent className="flex items-center gap-3 p-5">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
                                            <Icon className="h-5 w-5 text-teal-700" />
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
                                <Card className="h-full rounded-2xl shadow-md">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600/10">
                                                <Icon className="h-5 w-5 text-teal-700" />
                                            </span>
                                            <div>
                                                <h3 className="text-xl font-semibold">{title}</h3>
                                                <p className="mt-1 text-slate-600">{desc}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            {/* Founders & Team */}
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
                                <Card className="rounded-2xl shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">{f.name}</CardTitle>
                                        <div className="text-sm text-slate-500">{f.role}</div>
                                    </CardHeader>
                                    <CardContent className="pb-6">
                                        <Badge variant="secondary">Founder</Badge>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mx-auto mt-8 max-w-3xl text-center text-slate-600">
                        Our team includes senior engineers, full‑stack developers, junior developers, software developers, and project managers—over 50 professionals collaborating to deliver excellence.
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
                                title: "High‑Quality Products",
                                desc: "We ship polished, maintainable software with clean, scalable architectures.",
                            },
                            {
                                title: "Unique Capabilities",
                                desc: "We take on complex, custom builds others avoid—and make them shine.",
                            },
                            {
                                title: "Trusted by Clients",
                                desc: "Long‑term partnerships across local and global markets.",
                            },
                            {
                                title: "Value & Affordability",
                                desc: "Premium engineering without enterprise bloat—transparent pricing always.",
                            },
                        ].map((item) => (
                            <motion.div key={item.title} variants={fadeUp}>
                                <Card className="rounded-2xl shadow-md">
                                    <CardHeader>
                                        <CardTitle className="text-xl">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-slate-600">{item.desc}</CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            {/* Awards / Achievements */}
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
                    <motion.p variants={fadeUp} className="mt-2 text-center text-slate-600">
                        Recognized with multiple awards for innovation and client success.
                    </motion.p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {["Innovation Award", "Top Software House", "Customer Delight"].map((t) => (
                            <motion.div key={t} variants={fadeUp} whileHover={{ y: -4 }}>
                                <Card className="rounded-2xl border bg-white/80 shadow-sm backdrop-blur">
                                    <CardContent className="flex items-center gap-3 p-6">
                                        <Award className="h-6 w-6" />
                                        <div className="font-medium">{t}</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Section>

            {/* Testimonials (editable placeholder) */}
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
                                <Card className="rounded-2xl shadow-md">
                                    <CardContent className="p-6">
                                        <p className="text-slate-700">
                                            "escStack delivered beyond expectations—great communication, clean code, and on‑time releases."
                                        </p>
                                        <Separator className="my-4" />
                                        <div className="text-sm text-slate-500">Edit this with your real testimonial…</div>
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
                    <Card className="mx-auto max-w-3xl rounded-2xl border-0 bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg">
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
