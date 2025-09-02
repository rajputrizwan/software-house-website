"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  Check,
  ArrowRight,
  Star,
  Users,
  Globe,
  Target,
  Zap,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Quote,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";

// ----------- Services Data -----------
const services = [
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
        popular: false,
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
        popular: true,
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
        popular: false,
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
        popular: false,
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
        popular: false,
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
        popular: true,
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
        popular: false,
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
        popular: false,
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
        features: ["Basic Cloud Setup", "Shared Hosting", "Email Support"],
        popular: false,
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
        popular: true,
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
        popular: false,
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
        popular: false,
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
        features: ["Basic Mobile App", "Cross-Platform UI", "Monthly Updates"],
        popular: false,
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
        popular: true,
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
        popular: false,
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
        popular: false,
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
        popular: false,
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
        popular: true,
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
        popular: false,
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
        popular: false,
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
        features: ["Basic IT Support", "Remote Assistance", "Email Support"],
        popular: false,
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
        popular: true,
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
        popular: false,
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
        popular: false,
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
        popular: false,
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
        popular: true,
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
        popular: false,
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
        popular: false,
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
        features: ["Basic Tech Consulting", "Digital Roadmap", "Email Support"],
        popular: false,
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
        popular: true,
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
        popular: false,
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
        popular: false,
      },
    ],
  },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechNova Inc.",
    role: "CTO",
    content:
      "escStack transformed our digital infrastructure with their cloud solutions. Their team was professional, responsive, and delivered beyond our expectations.",
    avatar: "/avatars/1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Global Retail Group",
    role: "Head of Digital",
    content:
      "The mobile app developed by escStack has significantly improved our customer engagement. Their attention to detail and user experience focus is exceptional.",
    avatar: "/avatars/2.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    company: "FinSecure",
    role: "Security Director",
    content:
      "Implementing escStack's cybersecurity solutions gave us peace of mind. Their enterprise security framework is robust and comprehensive.",
    avatar: "/avatars/3.jpg",
    rating: 4,
  },
  {
    id: 4,
    name: "David Kim",
    company: "HealthPlus",
    role: "IT Manager",
    content:
      "The IT support services have been invaluable to our organization. Quick response times and expert solutions to complex problems.",
    avatar: "/avatars/4.jpg",
    rating: 5,
  },
];

// Company stats data
const stats = [
  {
    icon: <Users className="w-6 h-6" />,
    value: "200+",
    label: "Happy Clients",
  },
  { icon: <Globe className="w-6 h-6" />, value: "15+", label: "Countries" },
  { icon: <Target className="w-6 h-6" />, value: "300+", label: "Projects" },
  {
    icon: <Star className="w-6 h-6" />,
    value: "98%",
    label: "Satisfaction Rate",
  },
];

// FAQ data
const faqs = [
  {
    question: "How long does it take to develop a custom software solution?",
    answer:
      "The timeline varies based on project complexity. Simple applications can take 4-8 weeks, while enterprise solutions may require 3-6 months. We provide detailed timelines after requirements analysis.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes, all our plans include ongoing support options. We offer maintenance packages, updates, and 24/7 technical support depending on your chosen plan.",
  },
  {
    question: "Can we scale our plan as our business grows?",
    answer:
      "Absolutely! Our services are designed to scale with your business. You can upgrade your plan or add additional services at any time.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We work with a wide range of technologies including React, Node.js, Python, AWS, Azure, React Native, Flutter, TensorFlow, and blockchain technologies among others.",
  },
  {
    question: "How do you ensure data security and privacy?",
    answer:
      "We follow industry best practices, implement encryption, regular security audits, and comply with GDPR, HIPAA, and other relevant regulations based on your industry.",
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const testimonialsRef = useRef(null);

  const handleChoosePlan = (plan, service) => {
    setSelectedPlan({ ...plan, service: service.title });
    setOpen(true);
  };

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Powerful Solutions for Your{" "}
            <span className="text-amber-300">Digital Transformation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl max-w-3xl mx-auto mb-8"
          >
            escStack delivers cutting-edge software solutions that drive
            innovation and growth for businesses worldwide.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 font-semibold"
            >
              Explore Services <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              <Phone className="mr-2 w-4 h-4" /> Contact Sales
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center text-blue-600 dark:text-blue-400 mb-2">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-16" id="services">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
            >
              Our <span className="text-blue-600">Services</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Discover our comprehensive range of technology services designed
              to meet your business needs at every stage of growth.
            </motion.p>
          </div>

          {/* Tabs for Services */}
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val)}
            className="w-full"
          >
            <TabsList className="flex flex-wrap justify-center gap-2 h-full mb-12 bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl">
              {services.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all
                             data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md
                             dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white"
                >
                  <span className="flex items-center gap-2">
                    {s.icon}
                    {s.title}
                  </span>
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
                      <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold dark:text-white mb-4">
                          {s.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                          {s.description}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {s.plans.map((plan, i) => (
                          <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="h-full"
                          >
                            <Card
                              className={`p-0 overflow-hidden border-0 shadow-xl rounded-2xl flex flex-col h-full ${
                                plan.popular
                                  ? "ring-2 ring-blue-500 scale-105 relative"
                                  : ""
                              }`}
                            >
                              {plan.popular && (
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                                  MOST POPULAR
                                </div>
                              )}
                              <div
                                className={`h-2 bg-gradient-to-r ${plan.color}`}
                              ></div>
                              <CardContent className="p-6 flex flex-col flex-grow">
                                <div className="mb-6">
                                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                                    {plan.name}
                                  </h3>
                                  <p className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                    {plan.price}
                                  </p>
                                </div>

                                <ul className="space-y-3 mb-8 text-left flex-grow">
                                  {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-start">
                                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700 dark:text-gray-300">
                                        {f}
                                      </span>
                                    </li>
                                  ))}
                                </ul>

                                <Button
                                  className={`w-full font-semibold ${
                                    plan.popular
                                      ? "bg-blue-600 hover:bg-blue-700"
                                      : "bg-gray-800 hover:bg-gray-900"
                                  } text-white`}
                                  onClick={() => handleChoosePlan(plan, s)}
                                >
                                  {plan.id === "custom"
                                    ? "Contact Sales"
                                    : "Get Started"}
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
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              What Our <span className="text-blue-600">Clients Say</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about their experience with escStack.
            </p>
          </div>

          <div className="relative" ref={testimonialsRef}>
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start">
                    <Quote className="w-12 h-12 text-blue-100 mr-4 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                        "{testimonials[activeTestimonial].content}"
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {testimonials[activeTestimonial].name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white">
                            {testimonials[activeTestimonial].name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {testimonials[activeTestimonial].role},{" "}
                            {testimonials[activeTestimonial].company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find answers to common questions about our services and processes.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden dark:border-gray-700"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-800 dark:text-white">
                    {faq.question}
                  </span>
                  <span className="text-blue-600">
                    {expandedFaq === index ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 bg-white dark:bg-gray-900">
                        <p className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Let's discuss your project and find the perfect solution for your
            needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-8"
            >
              <Calendar className="mr-2 w-4 h-4" /> Schedule a Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              <Mail className="mr-2 w-4 h-4" /> Contact Us
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:text-white p-0 overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${selectedPlan?.color}`}></div>
          <div className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold">
                {selectedPlan?.name} Plan
              </DialogTitle>
              <DialogDescription className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                {selectedPlan?.service}
              </DialogDescription>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {selectedPlan?.price}
              </p>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  className="dark:bg-gray-800 dark:text-white mt-1"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="dark:bg-gray-800 dark:text-white mt-1"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Your email address"
                />
              </div>
              <div>
                <Label
                  htmlFor="details"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Project Details
                </Label>
                <Textarea
                  id="details"
                  className="dark:bg-gray-800 dark:text-white mt-1"
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  placeholder="Tell us about your project needs..."
                  rows={4}
                />
              </div>
              <Button
                className="w-full mt-4"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Request <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Plus icon component for FAQ
function Plus(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
