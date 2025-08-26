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
import {
  Code,
  Brain,
  Cloud,
  Smartphone,
  Layout,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// ----------- Services Data -----------
const services = [
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
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: <Brain className="w-6 h-6 text-purple-600" />,
    description:
      "Empower your business with cutting-edge AI solutions — chatbots, predictive analytics, recommendation engines, and automation tools.",
    plans: [
      {
        id: "ai-starter",
        name: "AI Starter",
        price: "$199 / month",
        color: "from-yellow-400 to-yellow-600",
        features: ["Basic Chatbot", "Data Processing", "Email Support"],
      },
      {
        id: "ai-pro",
        name: "AI Professional",
        price: "$499 / month",
        color: "from-purple-400 to-purple-600",
        features: [
          "Custom AI Models",
          "Data Visualization",
          "Priority Support",
          "Integration with Apps",
        ],
      },
      {
        id: "ai-enterprise",
        name: "AI Enterprise",
        price: "Custom Quote",
        color: "from-pink-400 to-pink-600",
        features: [
          "Enterprise AI Solutions",
          "Predictive Analytics",
          "24/7 Monitoring",
          "On-Premise/Cloud Deployment",
        ],
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    icon: <Cloud className="w-6 h-6 text-blue-600" />,
    description:
      "We provide cloud infrastructure, hosting, and DevOps services to ensure scalability, security, and seamless deployment.",
    plans: [
      {
        id: "cloud-basic",
        name: "Cloud Basic",
        price: "$149 / month",
        color: "from-blue-300 to-blue-500",
        features: ["Shared Hosting", "99.9% Uptime", "Email Support"],
      },
      {
        id: "cloud-pro",
        name: "Cloud Pro",
        price: "$399 / month",
        color: "from-indigo-400 to-indigo-600",
        features: [
          "Dedicated Cloud Server",
          "DevOps Support",
          "Backup & Recovery",
          "Priority Support",
        ],
      },
      {
        id: "cloud-enterprise",
        name: "Cloud Enterprise",
        price: "Custom Quote",
        color: "from-cyan-400 to-cyan-600",
        features: [
          "Enterprise Cloud Hosting",
          "Kubernetes/Docker",
          "24/7 Support",
          "Global Scaling",
        ],
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: <Smartphone className="w-6 h-6 text-pink-600" />,
    description:
      "Native and cross-platform mobile apps designed for performance, usability, and scalability.",
    plans: [
      {
        id: "mobile-basic",
        name: "Mobile Basic",
        price: "$199 / month",
        color: "from-pink-300 to-pink-500",
        features: ["1 Mobile App", "Basic UI/UX", "Email Support"],
      },
      {
        id: "mobile-pro",
        name: "Mobile Pro",
        price: "$499 / month",
        color: "from-rose-400 to-rose-600",
        features: [
          "Cross-Platform Apps",
          "Advanced Features",
          "Priority Support",
          "Play Store / App Store Deploy",
        ],
      },
      {
        id: "mobile-enterprise",
        name: "Mobile Enterprise",
        price: "Custom Quote",
        color: "from-red-400 to-red-600",
        features: [
          "Enterprise Mobile Solutions",
          "Custom API Integrations",
          "Scalable Architecture",
          "24/7 Support",
        ],
      },
    ],
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    icon: <Layout className="w-6 h-6 text-orange-600" />,
    description:
      "Modern, intuitive, and user-friendly designs to ensure your product delivers an amazing user experience.",
    plans: [
      {
        id: "ui-basic",
        name: "UI Basic",
        price: "$99 / month",
        color: "from-orange-300 to-orange-500",
        features: ["1 Landing Page", "Basic Wireframes", "Community Support"],
      },
      {
        id: "ui-pro",
        name: "UI Pro",
        price: "$249 / month",
        color: "from-amber-400 to-amber-600",
        features: [
          "Multi-Page Design",
          "High-Fidelity Prototypes",
          "Priority Support",
        ],
      },
      {
        id: "ui-enterprise",
        name: "UI Enterprise",
        price: "Custom Quote",
        color: "from-yellow-400 to-yellow-600",
        features: [
          "Enterprise-Level Design",
          "Custom UI/UX Systems",
          "24/7 Design Support",
        ],
      },
    ],
  },
  {
    id: "support",
    title: "IT Support & Maintenance",
    icon: <Headphones className="w-6 h-6 text-indigo-600" />,
    description:
      "Reliable support and maintenance services to keep your systems running smoothly.",
    plans: [
      {
        id: "support-basic",
        name: "Support Basic",
        price: "$79 / month",
        color: "from-gray-300 to-gray-500",
        features: ["Email Support", "System Monitoring", "Monthly Reports"],
      },
      {
        id: "support-pro",
        name: "Support Pro",
        price: "$199 / month",
        color: "from-slate-400 to-slate-600",
        features: [
          "Phone & Email Support",
          "Weekly Reports",
          "Security Patches",
        ],
      },
      {
        id: "support-enterprise",
        name: "Support Enterprise",
        price: "Custom Quote",
        color: "from-gray-600 to-gray-800",
        features: [
          "24/7 Dedicated Support",
          "On-Site Visits",
          "Disaster Recovery",
        ],
      },
    ],
  },
  {
    id: "security",
    title: "Cybersecurity Solutions",
    icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
    description:
      "Protect your business with enterprise-grade security solutions.",
    plans: [
      {
        id: "security-basic",
        name: "Security Basic",
        price: "$149 / month",
        color: "from-red-300 to-red-500",
        features: [
          "Basic Threat Protection",
          "Firewall Setup",
          "Email Support",
        ],
      },
      {
        id: "security-pro",
        name: "Security Pro",
        price: "$399 / month",
        color: "from-red-500 to-red-700",
        features: [
          "Advanced Security Suite",
          "24/7 Monitoring",
          "Priority Support",
        ],
      },
      {
        id: "security-enterprise",
        name: "Security Enterprise",
        price: "Custom Quote",
        color: "from-red-700 to-red-900",
        features: [
          "Enterprise-Level Security",
          "On-Premise Audits",
          "Incident Response Team",
        ],
      },
    ],
  },
  {
    id: "innovation",
    title: "Innovation & R&D",
    icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
    description:
      "Turn your ideas into reality with our research and development team.",
    plans: [
      {
        id: "r&d-basic",
        name: "R&D Basic",
        price: "$199 / month",
        color: "from-yellow-300 to-yellow-500",
        features: ["Idea Validation", "Prototype Design", "Email Support"],
      },
      {
        id: "r&d-pro",
        name: "R&D Pro",
        price: "$499 / month",
        color: "from-yellow-500 to-yellow-700",
        features: [
          "MVP Development",
          "AI & Blockchain Research",
          "Priority Support",
        ],
      },
      {
        id: "r&d-enterprise",
        name: "R&D Enterprise",
        price: "Custom Quote",
        color: "from-yellow-700 to-yellow-900",
        features: [
          "Full-Scale R&D Team",
          "Custom Product Development",
          "Dedicated Innovation Manager",
        ],
      },
    ],
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("core-dev");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleSend = async () => {
    if (!formData.email || !formData.name) {
      alert("⚠ Please fill in your name and email.");
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
      alert("⚠ Error sending email.");
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
              <Button
                className="w-full mt-4"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? "Sending..." : "Confirm & Send"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
