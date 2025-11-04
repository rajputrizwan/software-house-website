"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";
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
  Headphones,
  ShieldCheck,
  Check,
  ArrowRight,
  Star,
  Users,
  Globe,
  Zap,
  Send,
  ChevronLeft,
  ChevronRight,
  Quote,
  Play,
  HeartHandshake,
  Palette,
  Cpu,
  CheckCircle,
  Award,
} from "lucide-react";

// Services Data
const services = [
  {
    id: 1,
    icon: <Code className="w-8 h-8" />,
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies",
    features: [
      "React/Next.js",
      "Responsive Design",
      "SEO Optimized",
      "Fast Performance",
    ],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    delay: 0.1,
  },
  {
    id: 2,
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications for iOS and Android",
    features: [
      "React Native",
      "Flutter",
      "App Store Deployment",
      "Push Notifications",
    ],
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    delay: 0.2,
  },
  {
    id: 3,
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment solutions",
    features: ["AWS/Azure/GCP", "DevOps", "Serverless", "Microservices"],
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    delay: 0.3,
  },
  {
    id: 4,
    icon: <Brain className="w-8 h-8" />,
    title: "AI & ML",
    description: "Artificial Intelligence and Machine Learning solutions",
    features: [
      "Custom AI Models",
      "Data Analytics",
      "Predictive Analysis",
      "Computer Vision",
    ],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    delay: 0.4,
  },
  {
    id: 5,
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Cybersecurity",
    description: "Complete security solutions to protect your digital assets",
    features: [
      "Security Audits",
      "Penetration Testing",
      "Data Protection",
      "Compliance",
    ],
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    delay: 0.5,
  },
  {
    id: 6,
    icon: <Headphones className="w-8 h-8" />,
    title: "IT Support",
    description: "24/7 technical support and maintenance services",
    features: [
      "24/7 Monitoring",
      "Quick Response",
      "Proactive Maintenance",
      "Expert Team",
    ],
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    delay: 0.6,
  },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO, TechNova",
    content:
      "The team delivered exceptional results. Our web application performance improved by 200%.",
    avatar: "SC",
    rating: 5,
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    role: "Product Manager, InnovateCo",
    content:
      "Outstanding mobile app development. The user experience is seamless and intuitive.",
    avatar: "MR",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "CEO, StartupGrid",
    content:
      "Their cloud solutions helped us scale effortlessly during our rapid growth phase.",
    avatar: "EW",
    rating: 4,
  },
];

const stats = [
  { icon: <Users />, value: 1200, suffix: "+", label: "Happy Clients" },
  { icon: <CheckCircle />, value: 350, suffix: "+", label: "Projects Done" },
  { icon: <Globe />, value: 15, label: "Countries Served" },
  { icon: <Award />, value: 18, suffix: "+", label: "Awards Won" },
];

// Process Steps - Updated to follow blue theme
const processSteps = [
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Discover & Plan",
    description:
      "We analyze your requirements and create a detailed project roadmap",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Design & Develop",
    description:
      "Our team designs and builds your solution with cutting-edge technology",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Test & Deploy",
    description:
      "Rigorous testing followed by seamless deployment to production",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Support & Scale",
    description: "Ongoing maintenance and scaling as your business grows",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
  },
];

// ----------- Services Data for Tabs -----------
const tabServices = [
  {
    id: "core-dev",
    title: "Core Software Development",
    icon: <Code className="w-6 h-6" />,
    description:
      "Build high-performance, scalable, and secure software tailored for your business—covering web, mobile, APIs, and enterprise platforms.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$99 / month",
        color: "from-blue-500 to-purple-500",
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
        color: "from-blue-600 to-purple-600",
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
        color: "from-blue-700 to-purple-700",
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
        color: "from-blue-800 to-purple-800",
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
  {
    id: "ai-ml",
    title: "AI & Emerging Technologies",
    icon: <Brain className="w-6 h-6" />,
    description:
      "Empower your business with next-gen solutions—AI, Blockchain, IoT, AR/VR, and advanced automation systems.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$149 / month",
        color: "from-blue-500 to-purple-500",
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
        color: "from-blue-600 to-purple-600",
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
        color: "from-blue-700 to-purple-700",
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
        color: "from-blue-800 to-purple-800",
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
  {
    id: "cloud",
    title: "Enterprise & Cloud Solutions",
    icon: <Cloud className="w-6 h-6" />,
    description:
      "Secure, scalable, and enterprise-grade solutions—ERP, CRM, DevOps pipelines, and cloud-native platforms.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$129 / month",
        color: "from-blue-500 to-purple-500",
        features: ["Basic Cloud Setup", "Shared Hosting", "Email Support"],
        popular: false,
      },
      {
        id: "professional",
        name: "Professional",
        price: "$349 / month",
        color: "from-blue-600 to-purple-600",
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
        color: "from-blue-700 to-purple-700",
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
        color: "from-blue-800 to-purple-800",
        features: [
          "Custom Cloud Architecture",
          "Advanced Security Framework",
          "Dedicated DevOps Engineer",
        ],
        popular: false,
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    icon: <Smartphone className="w-6 h-6" />,
    description:
      "Crafting high-performance, user-friendly mobile apps for iOS and Android, with seamless integrations and sleek UI/UX.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$159 / month",
        color: "from-blue-500 to-purple-500",
        features: ["Basic Mobile App", "Cross-Platform UI", "Monthly Updates"],
        popular: false,
      },
      {
        id: "professional",
        name: "Professional",
        price: "$399 / month",
        color: "from-blue-600 to-purple-600",
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
        color: "from-blue-700 to-purple-700",
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
        color: "from-blue-800 to-purple-800",
        features: [
          "Enterprise Mobile Solutions",
          "Custom Features",
          "24/7 Support & SLA",
        ],
        popular: false,
      },
    ],
  },
];

export default function ModernServicesPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState("core-dev");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Sending data:", { ...formData, plan: selectedPlan });

      alert("✅ Confirmation email sent! Please check your inbox.");
      setOpen(false);
      setFormData({ name: "", email: "", details: "" });
    } catch (err) {
      console.error(err);
      alert("⚠️ Error sending email.");
    }
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image Background */}
        <div className="absolute inset-0">
          {/* Using a tech/innovation themed background from Unsplash */}
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
            alt="Digital Innovation Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Digital Innovation
              <br />
              <span className="text-4xl md:text-6xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              We transform your ideas into powerful digital solutions with
              cutting-edge technology and exceptional design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-3"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all"
                >
                  <div className="text-white">{stat.icon}</div>
                </motion.div>

                {/* ✅ Animated CountUp */}
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <CountUp
                    end={stat.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                    separator=","
                  />
                  {stat.suffix && stat.suffix}
                </motion.h3>

                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section className="w-full py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white"
            >
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Solutions
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
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
            <TabsList className="flex flex-wrap justify-center gap-2 h-full mb-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-2 rounded-2xl border border-white/20">
              {tabServices.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all
                             data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg
                             dark:data-[state=active]:bg-gradient-to-r dark:data-[state=active]:from-blue-600 dark:data-[state=active]:to-purple-600"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400 data-[state=active]:text-white">
                      {s.icon}
                    </span>
                    {s.title}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabServices.map((s) => (
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
                              className={`p-0 overflow-hidden border-0 shadow-xl rounded-2xl flex flex-col h-full backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 ${
                                plan.popular
                                  ? "ring-2 ring-blue-500 scale-105 relative"
                                  : ""
                              }`}
                            >
                              {plan.popular && (
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-semibold z-10">
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
                                  className={`w-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white relative overflow-hidden group`}
                                  onClick={() => handleChoosePlan(plan, s)}
                                >
                                  <span className="relative z-10">
                                    {plan.id === "custom"
                                      ? "Contact Sales"
                                      : "Get Started"}
                                  </span>
                                  <ArrowRight className="ml-2 w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                  <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                  />
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

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A streamlined approach to delivering exceptional results every
              time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className={`relative rounded-3xl ${step.bgColor} p-8 h-full border-2 border-transparent group-hover:border-white/20 transition-all duration-500 shadow-lg group-hover:shadow-2xl overflow-hidden text-center`}
                >
                  {/* Hover Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 z-0`}
                  />

                  {/* Step Number (Top Right) */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center absolute top-4 right-4 text-lg font-bold shadow-xl z-50 border-2 border-white/70">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all`}
                  >
                    <div className="text-white">{step.icon}</div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Card Outline */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 group-hover:bg-white/5 transition-all duration-500 z-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              What Clients{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to
              say about their experience.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                  <Quote className="w-12 h-12 text-blue-500 mb-6" />

                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonials[activeTestimonial].avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white text-lg">
                          {testimonials[activeTestimonial].name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {testimonials[activeTestimonial].role}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonials[activeTestimonial].rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeTestimonial === index
                        ? "bg-blue-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8"
            >
              <HeartHandshake className="w-10 h-10" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Let's collaborate to bring your vision to life with cutting-edge
              technology and exceptional design.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                Get Started Today
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Schedule a Call
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:text-white p-0 overflow-hidden rounded-2xl">
          <div
            className={`h-2 bg-gradient-to-r ${
              selectedPlan?.color || "from-blue-600 to-purple-600"
            }`}
          ></div>
          <div className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold">
                {selectedPlan ? `${selectedPlan.name} Plan` : "Get In Touch"}
              </DialogTitle>
              <DialogDescription className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                {selectedPlan
                  ? selectedPlan.service
                  : "Let's discuss your project"}
              </DialogDescription>
              {selectedPlan && (
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {selectedPlan.price}
                </p>
              )}
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
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white relative overflow-hidden group"
                onClick={handleSend}
                disabled={loading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Request <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
