"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Code, Brain, Cloud, Smartphone, Layout, Headphones, ShieldCheck, Sparkles } from "lucide-react";

// ----------- Types -----------
type Plan = {
    id: string;
    name: string;
    price: string;
    color: string;
    features: string[];
};

type Service = {
    id: string;
    title: string;
    description: string;
    plans: Plan[];
};

// ----------- Services Data -----------
const services: Service[] = [
    // Core Development
    {
        id: "core-dev",
        title: "Core Software Development",
        icon: <Code className="w-6 h-6 text-green-600" />,
        description:
            "Build high-performance, scalable, and secure software tailored for your business—covering web, mobile, APIs, and enterprise platforms.",
        plans: [
            {
                id: "starter",
                name: "Starter",
                price: "$99 / month",
                color: "from-green-400 to-green-600",
                features: [
                    "Basic Website or Mobile App",
                    "Standard API Integration",
                    "Community Support",
                ],
            },
            {
                id: "professional",
                name: "Professional",
                price: "$299 / month",
                color: "from-blue-400 to-blue-600",
                features: [
                    "Custom Web & Mobile Features",
                    "Advanced API Development",
                    "Cloud Deployment",
                    "Priority Email Support",
                ],
            },
            {
                id: "business",
                name: "Business",
                price: "$599 / month",
                color: "from-purple-400 to-purple-600",
                features: [
                    "Dedicated Account Manager",
                    "Enterprise Security",
                    "Scalable Cloud Hosting",
                    "24/7 Technical Support",
                ],
            },
            {
                id: "custom",
                name: "Enterprise",
                price: "Custom Quote",
                color: "from-pink-400 to-pink-600",
                features: [
                    "Tailored Enterprise Solutions",
                    "Custom Integrations",
                    "On-Site Training",
                    "Global SLA Support",
                ],
            },
        ],
    },

    // AI & Emerging Tech
    {
        id: "ai-ml",
        title: "AI & Emerging Technologies",
        icon: <Brain className="w-6 h-6 text-yellow-600" />,
        description:
            "Empower your business with next-gen solutions—AI, Blockchain, IoT, AR/VR, and advanced automation systems.",
        plans: [
            {
                id: "starter",
                name: "Starter",
                price: "$149 / month",
                color: "from-yellow-400 to-orange-600",
                features: [
                    "Basic AI Model Setup",
                    "Data Dashboard or Chatbot",
                    "Community Support",
                ],
            },
            {
                id: "professional",
                name: "Professional",
                price: "$399 / month",
                color: "from-indigo-400 to-indigo-600",
                features: [
                    "Custom AI/ML Models",
                    "Blockchain Smart Contracts",
                    "Priority Technical Support",
                ],
            },
            {
                id: "business",
                name: "Business",
                price: "$799 / month",
                color: "from-teal-400 to-teal-600",
                features: [
                    "Dedicated AI/ML Engineer",
                    "IoT Platform Integration",
                    "Predictive Analytics",
                    "24/7 Monitoring",
                ],
            },
            {
                id: "custom",
                name: "Innovation Lab",
                price: "Custom Quote",
                color: "from-red-400 to-red-600",
                features: [
                    "AI R&D Partnership",
                    "Custom Model Training",
                    "AR/VR Applications",
                    "Enterprise SLA",
                ],
            },
        ],
    },

    // Cloud & Enterprise
    {
        id: "cloud",
        title: "Enterprise & Cloud Solutions",
        icon: <Cloud className="w-6 h-6 text-cyan-600" />,
        description:
            "Secure, scalable, and enterprise-grade solutions—ERP, CRM, DevOps pipelines, and cloud-native platforms.",
        plans: [
            {
                id: "starter",
                name: "Starter",
                price: "$129 / month",
                color: "from-cyan-400 to-cyan-600",
                features: [
                    "Basic Cloud Setup",
                    "Shared Hosting",
                    "Email Support",
                ],
            },
            {
                id: "professional",
                name: "Professional",
                price: "$349 / month",
                color: "from-blue-500 to-indigo-600",
                features: [
                    "ERP/CRM Integrations",
                    "Custom DevOps Pipeline",
                    "Priority Support",
                ],
            },
            {
                id: "business",
                name: "Business",
                price: "$699 / month",
                color: "from-violet-500 to-purple-700",
                features: [
                    "Enterprise Security",
                    "Kubernetes Orchestration",
                    "24/7 Monitoring",
                ],
            },
            {
                id: "custom",
                name: "Enterprise Cloud",
                price: "Custom Quote",
                color: "from-rose-500 to-red-700",
                features: [
                    "Custom Cloud Architecture",
                    "Advanced Security Framework",
                    "Dedicated DevOps Engineer",
                ],
            },
        ],
    },

    // Mobile Apps
    {
        id: "mobile",
        title: "Mobile App Development",
        icon: <Smartphone className="w-6 h-6 text-purple-600" />,
        description:
            "Crafting high-performance, user-friendly mobile apps for iOS and Android, with seamless integrations and sleek UI/UX.",
        plans: [
            {
                id: "starter",
                name: "Starter",
                price: "$159 / month",
                color: "from-violet-500 to-purple-700",
                features: [
                    "Basic Mobile App",
                    "Cross-Platform UI",
                    "Monthly Updates",
                ],
            },
            {
                id: "professional",
                name: "Professional",
                price: "$399 / month",
                color: "from-cyan-400 to-cyan-600",
                features: [
                    "API Integrations",
                    "Push Notifications",
                    "App Store Deployment",
                ],
            },
            {
                id: "business",
                name: "Business",
                price: "$699 / month",
                color: "from-rose-500 to-red-700",
                features: [
                    "Custom UI/UX",
                    "Dedicated Project Manager",
                    "Advanced Analytics",
                ],
            },
            {
                id: "custom",
                name: "Enterprise Mobility",
                price: "Custom Quote",
                color: "from-indigo-400 to-blue-600",
                features: [
                    "Enterprise Mobile Solutions",
                    "Custom Features",
                    "24/7 Support & SLA",
                ],
            },
        ],
    },

    // Design
    {
        id: "design",
        title: "Design & User Experience",
        icon: <Layout className="w-6 h-6 text-pink-600" />,
        description:
            "Delivering stunning visuals, branding, and human-centered design strategies that drive engagement and growth.",
        plans: [
            {
                id: "starter",
                name: "Starter",
                price: "$89 / month",
                color: "from-pink-400 to-pink-600",
                features: [
                    "Basic Wireframes",
                    "Color & Typography Kit",
                    "Community Support",
                ],
            },
            {
                id: "professional",
                name: "Professional",
                price: "$249 / month",
                color: "from-orange-400 to-red-600",
                features: [
                    "Interactive Prototypes",
                    "Custom Design System",
                    "User Testing",
                ],
            },
            {
                id: "business",
                name: "Business",
                price: "$499 / month",
                color: "from-indigo-400 to-purple-600",
                features: [
                    "Dedicated UX Designer",
                    "Full Branding Package",
                    "Accessibility Compliance",
                ],
            },
            {
                id: "custom",
                name: "Creative Lab",
                price: "Custom Quote",
                color: "from-cyan-400 to-blue-600",
                features: [
                    "Enterprise Product Design",
                    "Motion Graphics",
                    "Ongoing Iterations",
                ],
            },
        ],
    },

    // IT Support
    {
        id: "it-support",
        title: "IT Support & Managed Services",
        icon: <Headphones className="w-6 h-6 text-blue-600" />,
        description:
            "Reliable IT support, network management, and security monitoring to keep your business running 24/7.",
        plans: [
            {
                id: "starter",
                name: "Starter",
                price: "$79 / month",
                color: "from-blue-400 to-blue-600",
                features: [
                    "Basic IT Support",
                    "Remote Assistance",
                    "Email Support",
                ],
            },
            {
                id: "professional",
                name: "Professional",
                price: "$199 / month",
                color: "from-teal-400 to-teal-600",
                features: [
                    "On-Demand Troubleshooting",
                    "Software & Hardware Setup",
                    "Priority Support",
                ],
            },
            {
                id: "business",
                name: "Business",
                price: "$399 / month",
                color: "from-indigo-500 to-purple-700",
                features: [
                    "Dedicated IT Engineer",
                    "24/7 Monitoring",
                    "Network Security",
                ],
            },
            {
                id: "custom",
                name: "Enterprise IT",
                price: "Custom Quote",
                color: "from-rose-500 to-red-700",
                features: [
                    "Full IT Infrastructure",
                    "On-Site Support",
                    "Enterprise SLA",
                ],
            },
        ],
    },

    // Cybersecurity
    {
        id: "security",
        title: "Cybersecurity Solutions",
        icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
        description:
            "Protect your business with enterprise-grade cybersecurity—threat detection, compliance, and data security.",
        plans: [
            {
                id: "starter",
                name: "Starter",
                price: "$99 / month",
                color: "from-red-400 to-red-600",
                features: [
                    "Basic Threat Detection",
                    "Firewall Setup",
                    "Community Support",
                ],
            },
            {
                id: "professional",
                name: "Professional",
                price: "$299 / month",
                color: "from-indigo-400 to-indigo-600",
                features: [
                    "Advanced Threat Monitoring",
                    "Security Audits",
                    "Priority Support",
                ],
            },
            {
                id: "business",
                name: "Business",
                price: "$599 / month",
                color: "from-teal-500 to-teal-700",
                features: [
                    "Dedicated Security Analyst",
                    "Incident Response Team",
                    "24/7 SOC Monitoring",
                ],
            },
            {
                id: "custom",
                name: "Enterprise Security",
                price: "Custom Quote",
                color: "from-violet-500 to-purple-700",
                features: [
                    "Enterprise Security Framework",
                    "Compliance (ISO, GDPR, HIPAA)",
                    "Custom SLA",
                ],
            },
        ],
    },

    // Specialized Innovation
    {
        id: "specialized",
        title: "Specialized Innovation Services",
        icon: <Sparkles className="w-6 h-6 text-amber-600" />,
        description:
            "Tailored innovation programs—digital transformation, R&D partnerships, and cutting-edge tech consulting.",
        plans: [
            {
                id: "starter",
                name: "Starter",
                price: "$199 / month",
                color: "from-amber-400 to-orange-600",
                features: [
                    "Basic Tech Consulting",
                    "Digital Roadmap",
                    "Email Support",
                ],
            },
            {
                id: "professional",
                name: "Professional",
                price: "$499 / month",
                color: "from-cyan-500 to-teal-700",
                features: [
                    "Digital Transformation Strategy",
                    "Innovation Workshops",
                    "Priority Access to Experts",
                ],
            },
            {
                id: "business",
                name: "Business",
                price: "$999 / month",
                color: "from-purple-500 to-pink-700",
                features: [
                    "Dedicated R&D Consultant",
                    "Technology Proof of Concepts",
                    "Full Digital Advisory",
                ],
            },
            {
                id: "custom",
                name: "Innovation Partner",
                price: "Custom Quote",
                color: "from-indigo-500 to-blue-700",
                features: [
                    "End-to-End Transformation",
                    "Enterprise Innovation Lab",
                    "Exclusive Strategic Partnership",
                ],
            },
        ],
    },
];


export default function ServicesPage() {
    const [activeTab, setActiveTab] = useState("core-dev");
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        details: "",
    });

    const handleChoosePlan = (plan: Plan) => {
        setSelectedPlan(plan);
        setOpen(true);
    };

    // const handleSend = async () => {
    //     await fetch("/api/send-mail", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ ...formData, plan: selectedPlan }),
    //     });
    //     setOpen(false);
    //     alert("✅ Confirmation email sent!");
    // };

    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!formData.email || !formData.name) {
            alert("⚠️ Please fill in your name and email.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/send-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, plan: selectedPlan }),
            });

            if (res.ok) {
                alert("✅ Confirmation email sent! Please check your inbox.");
                setOpen(false);
                setFormData({ name: "", email: "", details: "" });
            } else {
                alert("❌ Failed to send email. Try again later.");
            }
        } catch (err) {
            console.error(err);
            alert("⚠️ Error sending email.");
        }
        setLoading(false);
    };

    return (
        <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Company Intro */}
                <div className="text-center mb-12 mt-10">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800">
                        Welcome to <span className="text-blue-600">escStack</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        escStack is a global software house delivering scalable, modern, and
                        innovative technology solutions across industries. We specialize in
                        web, mobile, AI, cloud, and enterprise systems.
                    </p>
                </div>

                {/* Tabs for Services */}
                <Tabs
                    value={activeTab}
                    onValueChange={(val) => setActiveTab(val)}
                    className="w-full"
                >
                    <TabsList className="flex flex-wrap justify-center gap-2 h-full ">
                        {services.map((s) => (
                            <TabsTrigger
                                key={s.id}
                                value={s.id}
                                className="px-4 py-2 rounded-xl text-sm font-medium data-[state=active]:bg-black data-[state=active]:text-white"
                            >
                                {s.icon}
                                {s.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>



                    {services.map((s) => (
                        <TabsContent key={s.id} value={s.id}>
                            <AnimatePresence mode="wait">
                                {activeTab === s.id && (
                                    <motion.div
                                        key={s.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-semibold">{s.title}</h2>
                                            <p className="text-gray-600 mt-2">{s.description}</p>
                                        </div>

                                        <div className="grid md:grid-cols-4 gap-6">
                                            {s.plans.map((plan, i) => (
                                                <motion.div
                                                    key={plan.id}
                                                    initial={{ opacity: 0, y: 40 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.2 }}
                                                >
                                                    <Card
                                                        className={`p-6 shadow-xl border rounded-2xl bg-gradient-to-br ${plan.color} text-white flex flex-col justify-between h-full`}
                                                    >
                                                        <CardContent>
                                                            <h3 className="text-xl font-semibold mb-2">
                                                                {plan.name}
                                                            </h3>
                                                            <p className="text-2xl font-bold mb-4">
                                                                {plan.price}
                                                            </p>
                                                            <ul className="text-sm space-y-2 mb-6 text-left">
                                                                {plan.features.map((f, i) => (
                                                                    <li key={i}>✅ {f}</li>
                                                                ))}
                                                            </ul>
                                                            <Button
                                                                variant="secondary"
                                                                className="w-full bg-white text-gray-900 font-semibold"
                                                                onClick={() => handleChoosePlan(plan)}
                                                            >
                                                                Choose Plan
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Enter Details for {selectedPlan?.name} Plan
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Project Details</Label>
                                <Textarea
                                    value={formData.details}
                                    onChange={(e) =>
                                        setFormData({ ...formData, details: e.target.value })
                                    }
                                />
                            </div>
                            {/* <Button className="w-full mt-4" onClick={handleSend}>
                                Confirm & Send
                            </Button> */}

                            <Button className="w-full mt-4" onClick={handleSend} disabled={loading}>
                                {loading ? "Sending..." : "Confirm & Send"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
