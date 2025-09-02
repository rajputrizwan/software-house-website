"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  ChevronDown,
  CheckCircle,
  Linkedin,
  Twitter,
  Github,
  Calendar,
  Zap,
  Sparkles,
  Quote,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [activeField, setActiveField] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredCard, setHoveredCard] = useState(null);
  const formRef = useRef(null);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleInputBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatingAnimation = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/70 dark:from-gray-900 dark:via-blue-950/50 dark:to-indigo-950/70 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 100 + 30,
              height: Math.random() * 100 + 30,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() * 50 + 180}, ${
                Math.random() * 100 + 150
              }, ${Math.random() * 100 + 200}, ${Math.random() * 0.1 + 0.05})`,
            }}
            animate={{
              y: [0, Math.random() * 60 - 30],
              x: [0, Math.random() * 60 - 30],
              scale: [1, 1 + Math.random() * 0.5],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Animated grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>

        {/* Pulse elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          variants={pulseAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          variants={pulseAnimation}
          animate="animate"
          transition={{ delay: 1 }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Create
            </span>{" "}
            Together
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Our team is here to turn your
            vision into reality with cutting-edge solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Connect With Us
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We're passionate about innovation and collaboration. Reach out
                through any channel that works for you.
              </p>
            </motion.div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  iconColor: "text-blue-600 dark:text-blue-400",
                  bgColor: "bg-blue-100 dark:bg-blue-900/30",
                  title: "Email Us",
                  content: "info@escstack.com",
                  description: "We'll respond within 24 hours",
                  delay: 0.1,
                },
                {
                  icon: Phone,
                  iconColor: "text-green-600 dark:text-green-400",
                  bgColor: "bg-green-100 dark:bg-green-900/30",
                  title: "Call Us",
                  content: "+1 (555) 123-4567",
                  description: "Mon-Fri from 8am to 6pm",
                  delay: 0.2,
                },
                {
                  icon: MapPin,
                  iconColor: "text-purple-600 dark:text-purple-400",
                  bgColor: "bg-purple-100 dark:bg-purple-900/30",
                  title: "Visit Us",
                  content: "123 Tech Boulevard, San Francisco, CA 94107",
                  description: "Come say hello!",
                  delay: 0.3,
                },
                {
                  icon: Clock,
                  iconColor: "text-amber-600 dark:text-amber-400",
                  bgColor: "bg-amber-100 dark:bg-amber-900/30",
                  title: "Current Time",
                  content: currentTime.toLocaleTimeString(),
                  description: `We're currently ${
                    currentTime.getHours() > 8 && currentTime.getHours() < 18
                      ? "available"
                      : "unavailable"
                  }`,
                  delay: 0.4,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"
                      animate={
                        hoveredCard === index ? { opacity: 1 } : { opacity: 0 }
                      }
                    />
                    <CardContent className="p-6 flex items-start relative">
                      <motion.div
                        className={`p-3 rounded-full mr-4 ${item.bgColor} group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 10 }}
                      >
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.content}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-6">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                Follow Our Journey
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, color: "bg-blue-600", label: "LinkedIn" },
                  { icon: Twitter, color: "bg-sky-500", label: "Twitter" },
                  {
                    icon: Github,
                    color: "bg-gray-800 dark:bg-gray-700",
                    label: "GitHub",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className={`${social.color} text-white p-3 rounded-full hover:opacity-90 transition-opacity relative overflow-hidden group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                    <motion.span
                      className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
                      initial={false}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            className="relative"
          >
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
                <div className="absolute top-4 right-4">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </div>
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            delay: 0.2,
                          }}
                        >
                          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
                        >
                          Message Sent!
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-gray-600 dark:text-gray-300"
                        >
                          Thank you for reaching out. We'll get back to you
                          within 24 hours.
                        </motion.p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div>
                          <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                          >
                            Send us a Message
                          </motion.h2>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="text-gray-600 dark:text-gray-300 mb-6"
                          >
                            Fill out the form below and we'll get back to you as
                            soon as possible.
                          </motion.p>
                        </div>

                        {[
                          {
                            id: "name",
                            label: "Full Name",
                            icon: User,
                            placeholder: "Your name",
                          },
                          {
                            id: "email",
                            label: "Email Address",
                            icon: Mail,
                            placeholder: "your.email@example.com",
                            type: "email",
                          },
                          {
                            id: "subject",
                            label: "Subject",
                            placeholder: "What is this regarding?",
                          },
                          {
                            id: "message",
                            label: "Message",
                            icon: MessageCircle,
                            placeholder: "Tell us about your project...",
                            textarea: true,
                          },
                        ].map((field, index) => (
                          <motion.div
                            key={field.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + index * 0.1 }}
                            className="space-y-2"
                          >
                            <Label
                              htmlFor={field.id}
                              className="text-gray-700 dark:text-gray-300"
                            >
                              {field.label}
                            </Label>
                            <div className="relative">
                              {field.textarea ? (
                                <>
                                  <Textarea
                                    id={field.id}
                                    name={field.id}
                                    value={formData[field.id]}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus(field.id)}
                                    onBlur={handleInputBlur}
                                    className="min-h-[120px] bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 pl-10"
                                    placeholder={field.placeholder}
                                    required
                                  />
                                  {field.icon && (
                                    <field.icon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                  )}
                                </>
                              ) : (
                                <>
                                  <Input
                                    id={field.id}
                                    name={field.id}
                                    type={field.type || "text"}
                                    value={formData[field.id]}
                                    onChange={handleInputChange}
                                    onFocus={() => handleInputFocus(field.id)}
                                    onBlur={handleInputBlur}
                                    className={`bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 ${
                                      field.icon ? "pl-10" : ""
                                    }`}
                                    placeholder={field.placeholder}
                                    required
                                  />
                                  {field.icon && (
                                    <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  )}
                                </>
                              )}
                            </div>
                          </motion.div>
                        ))}

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 }}
                          className="pt-4"
                        >
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold rounded-lg transition-all relative overflow-hidden group"
                            size="lg"
                          >
                            <span className="relative z-10">Send Message</span>
                            <Send className="ml-2 w-4 h-4 relative z-10" />
                            <motion.span
                              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={false}
                            />
                          </Button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Floating elements around form */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"
              variants={floatingAnimation}
              animate="animate"
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl"
              variants={floatingAnimation}
              animate="animate"
              transition={{ delay: 2 }}
            />
          </motion.div>
        </div>

        {/* FAQ CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            type: "spring",
            stiffness: 100,
          }}
          className="mt-24 md:mt-32 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 1.4 }}
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <Quote className="w-4 h-4 mr-2" />
            We're here to help
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Need More Information?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Explore our FAQs or schedule a personalized consultation with our
            experts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
              >
                View FAQs
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Schedule a Call
                <Calendar className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
