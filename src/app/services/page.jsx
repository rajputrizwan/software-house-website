"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronLeft,
  ChevronRight,
  Quote,
  Play,
  Pause,
  Rocket,
  TrendingUp,
  Shield,
  Clock,
  HeartHandshake,
  Palette,
  Cpu,
  Database,
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

// Stats
const stats = [
  {
    icon: <Rocket className="w-6 h-6" />,
    value: "150+",
    label: "Projects Completed",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: "98%",
    label: "Client Satisfaction",
  },
  { icon: <Users className="w-6 h-6" />, value: "50+", label: "Team Members" },
  {
    icon: <Globe className="w-6 h-6" />,
    value: "15+",
    label: "Countries Served",
  },
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

export default function ModernServicesPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
              Digital Innovation
              <br />
              <span className="text-4xl md:text-6xl">Made Simple</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
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
              className="group border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-3"
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
            className="w-6 h-10 border-2 border-blue-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-blue-600 rounded-full mt-2"
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
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              Our Services
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
              What We{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Offer
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to drive your business
              forward in the modern landscape.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div
                  className={`relative rounded-3xl ${service.bgColor} p-8 h-full border-2 border-transparent group-hover:border-white/20 transition-all duration-500 shadow-lg group-hover:shadow-2xl overflow-hidden`}
                >
                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all`}
                  >
                    <div className="text-white">{service.icon}</div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: service.delay + index * 0.1 }}
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${service.color} text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group/btn`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 group-hover:bg-white/5 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
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
                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Step Number */}
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center absolute -top-4 -left-4 text-lg font-bold shadow-lg">
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

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 group-hover:bg-white/5 transition-all duration-500" />
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
    </div>
  );
}
