"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MessageCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import SuccessAnimation from "@/components/ui/success";

// Initialize Supabase client with error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Supabase credentials are missing. Please check your environment variables."
  );
}

const supabase = createClient(supabaseUrl || "", supabaseKey || "");

export default function ContactSidebar() {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+92", // Default country code
    budget: "",
    companyName: "",
    companyUrl: "",
    region: "",
    services: [],
    projectDetails: "",
    lookingForJob: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Theme detection
  useEffect(() => {
    setIsMounted(true);

    // Function to check current theme
    const checkTheme = () => {
      if (document.documentElement.classList.contains("dark")) {
        return "dark";
      }
      return "light";
    };

    // Set initial theme
    setTheme(checkTheme());

    // Observe theme changes
    const observer = new MutationObserver(() => {
      setTheme(checkTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const [theme, setTheme] = useState("light");

  // Theme-aware color classes
  const getThemeClasses = () => {
    const baseClasses = {
      light: {
        bg: {
          primary: "bg-white",
          secondary: "bg-gray-50",
          gradient: "from-cyan-500 to-blue-600",
          gradientHover: "from-cyan-400 to-blue-500",
          success: "bg-gray-50",
        },
        text: {
          primary: "text-gray-900",
          secondary: "text-gray-700",
          muted: "text-gray-600",
          inverted: "text-white",
        },
        border: "border-gray-200",
        input:
          "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500",
        card: "bg-white shadow-2xl",
        checkbox: {
          selected: "bg-cyan-500 border-cyan-500 text-white",
          unselected: "border-gray-400 bg-white",
        },
      },
      dark: {
        bg: {
          primary: "bg-gray-900",
          secondary: "bg-gray-800",
          gradient: "from-cyan-600 to-blue-700",
          gradientHover: "from-cyan-500 to-blue-600",
          success: "bg-gray-800",
        },
        text: {
          primary: "text-white",
          secondary: "text-gray-300",
          muted: "text-gray-400",
          inverted: "text-white",
        },
        border: "border-gray-700",
        input:
          "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500",
        card: "bg-gray-900 shadow-2xl shadow-black/50",
        checkbox: {
          selected: "bg-cyan-500 border-cyan-500 text-white",
          unselected: "border-gray-600 bg-gray-700",
        },
      },
    };

    return baseClasses[theme] || baseClasses.light;
  };

  const currentTheme = getThemeClasses();

  const inputClass = `w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${currentTheme.input}`;

  const servicesOptions = [
    "Remote IT Resources",
    "Custom Software Development",
    "Web Development",
    "Mobile App Development",
    "AR/VR",
    "Gaming",
    "Cyber Security",
    "Other IT Services",
  ];

  const regionOptions = [
    "Please Select",
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Africa",
    "Australia",
  ];

  const countryCodes = [
    { code: "+92", country: "Pakistan" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSubmitError(""); // Clear any previous submit errors

    if (type === "checkbox") {
      if (name === "services") {
        const updatedServices = checked
          ? [...formData.services, value]
          : formData.services.filter((service) => service !== value);
        setFormData((prev) => ({ ...prev, services: updatedServices }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number contains invalid characters";
    }

    // Other required fields
    if (!formData.budget.trim()) newErrors.budget = "Budget is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.region || formData.region === "Please Select")
      newErrors.region = "Region is required";
    if (formData.services.length === 0)
      newErrors.services = "At least one service is required";
    if (!formData.projectDetails.trim())
      newErrors.projectDetails = "Project details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Check if Supabase is configured
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Database connection not configured");
      }

      // Combine country code with phone number
      const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;

      const { error } = await supabase.from("contacts").insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: fullPhoneNumber,
          budget: formData.budget,
          company_name: formData.companyName,
          company_url: formData.companyUrl,
          region: formData.region,
          services: formData.services,
          project_details: formData.projectDetails,
          looking_for_job: formData.lookingForJob,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        setSubmitError(
          error.message || "Error submitting form. Please try again."
        );
      } else {
        // send notification email via server API (admin + confirmation to user)
        try {
          const payload = {
            type: "contact",
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: `${formData.countryCode} ${formData.phone}`,
            budget: formData.budget,
            companyName: formData.companyName,
            companyUrl: formData.companyUrl,
            region: formData.region,
            services: formData.services,
            projectDetails: formData.projectDetails,
            lookingForJob: formData.lookingForJob,
          };

          const res = await fetch("/api/send-mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject: "New contact form submission", ...payload }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("Email API responded with error:", text);
            // Non-fatal for user; we'll still show success for form submission
            setSubmitError("Submitted but failed to send notification email.");
          } else {
            console.log("Contact email notification sent (server responded OK)");
          }
        } catch (err) {
          console.error("Failed to call email API:", err);
          setSubmitError("Submitted but failed to send notification email.");
        }

        setIsSuccess(true);
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          countryCode: "+92",
          budget: "",
          companyName: "",
          companyUrl: "",
          region: "",
          services: [],
          projectDetails: "",
          lookingForJob: false,
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null; // Avoid hydration issues
  }

  return (
    <div>
      {/* Vertical Sticky Button - Fixed */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <motion.button
          onClick={() => {
            setOpen(true);
            setIsSuccess(false);
            setSubmitError("");
          }}
          className={`
            relative bg-gradient-to-b ${currentTheme.bg.gradient} 
            text-white px-4 py-6 rounded-l-xl shadow-2xl 
            hover:from-cyan-400 hover:to-blue-500 transition-all duration-300
            group flex items-center justify-center
            border-l border-t border-b border-white/20
            transform -rotate-90 origin-bottom-right
            whitespace-nowrap
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: 0 }}
          animate={{ x: open ? "100%" : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Ping animation */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm tracking-wide">
            Let's Talk Business
          </span>
        </motion.button>
      </div>

      {/* Slide-Out Contact Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed top-0 right-0 h-full w-full sm:w-[600px] ${currentTheme.bg.primary} ${currentTheme.card} z-50 flex flex-col overflow-hidden`}
            >
              {/* Header */}
              <div
                className={`flex justify-between items-center p-6 bg-gradient-to-r ${currentTheme.bg.gradient} text-white`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Get In Touch</h2>
                    <p className="text-white/80 text-sm">
                      We'll get back to you soon
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              {isSuccess ? (
                <div
                  className={`flex-1 flex flex-col items-center justify-center p-10 ${currentTheme.bg.success} text-center`}
                >
                  <SuccessAnimation />
                  <h2
                    className={`text-2xl font-semibold mb-2 mt-4 ${currentTheme.text.primary}`}
                  >
                    Thank You!
                  </h2>
                  <p className={`mb-6 ${currentTheme.text.secondary}`}>
                    Your message has been successfully submitted. We'll get back
                    to you soon.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className={`bg-gradient-to-r ${currentTheme.bg.gradient} text-white px-8 py-3 rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all font-semibold`}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className={`flex-1 p-6 space-y-6 overflow-y-auto ${currentTheme.bg.secondary}`}
                >
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                      >
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`${inputClass} ${
                          errors.firstName
                            ? "border-red-500 ring-2 ring-red-500/20"
                            : ""
                        }`}
                        placeholder="First Name"
                      />
                      {errors.firstName && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                      >
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`${inputClass} ${
                          errors.lastName
                            ? "border-red-500 ring-2 ring-red-500/20"
                            : ""
                        }`}
                        placeholder="Last Name"
                      />
                      {errors.lastName && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                    >
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputClass} ${
                        errors.email
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-xs mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                    >
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-3">
                      <select
                        className={`${inputClass} w-1/3`}
                        value={formData.countryCode}
                        onChange={handleChange}
                        name="countryCode"
                      >
                        {countryCodes.map(({ code, country }) => (
                          <option key={code} value={code}>
                            {country} {code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`${inputClass} ${
                          errors.phone
                            ? "border-red-500 ring-2 ring-red-500/20"
                            : ""
                        }`}
                        placeholder="Phone number"
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-red-400 text-xs mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Budget & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                      >
                        Budget <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`${inputClass} ${
                          errors.budget
                            ? "border-red-500 ring-2 ring-red-500/20"
                            : ""
                        }`}
                        placeholder="Your Budget"
                      />
                      {errors.budget && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.budget}
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                      >
                        Company Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`${inputClass} ${
                          errors.companyName
                            ? "border-red-500 ring-2 ring-red-500/20"
                            : ""
                        }`}
                        placeholder="Company Name"
                      />
                      {errors.companyName && (
                        <span className="text-red-400 text-xs mt-1 block">
                          {errors.companyName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company URL */}
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                    >
                      Company Website
                    </label>
                    <input
                      type="url"
                      name="companyUrl"
                      value={formData.companyUrl}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="https://example.com"
                    />
                  </div>

                  {/* Region */}
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                    >
                      Region <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className={`${inputClass} ${
                        errors.region
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : ""
                      }`}
                    >
                      {regionOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.region && (
                      <span className="text-red-400 text-xs mt-1 block">
                        {errors.region}
                      </span>
                    )}
                  </div>

                  {/* Services */}
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                    >
                      Services You're Interested In{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {servicesOptions.map((service) => {
                        const isSelected = formData.services.includes(service);
                        return (
                          <label
                            key={service}
                            className={`
                              flex items-center space-x-3 border rounded-xl px-4 py-3 cursor-pointer transition-all shadow-sm
                              ${
                                isSelected
                                  ? "border-cyan-500 bg-cyan-500/10"
                                  : `${currentTheme.border} hover:bg-gray-500/10`
                              }
                            `}
                          >
                            <input
                              type="checkbox"
                              name="services"
                              value={service}
                              checked={isSelected}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <div
                              className={`
                                h-5 w-5 flex items-center justify-center rounded border transition
                                ${
                                  isSelected
                                    ? currentTheme.checkbox.selected
                                    : currentTheme.checkbox.unselected
                                }
                              `}
                            >
                              {isSelected && <Check size={14} />}
                            </div>
                            <span
                              className={`text-sm font-medium ${currentTheme.text.primary}`}
                            >
                              {service}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.services && (
                      <span className="text-red-400 text-xs mt-1 block">
                        {errors.services}
                      </span>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${currentTheme.text.primary}`}
                    >
                      Project Details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleChange}
                      className={`${inputClass} ${
                        errors.projectDetails
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : ""
                      }`}
                      rows="4"
                      placeholder="Tell us about your project goals, requirements, and timeline..."
                    />
                    {errors.projectDetails && (
                      <span className="text-red-400 text-xs mt-1 block">
                        {errors.projectDetails}
                      </span>
                    )}
                  </div>

                  {/* Job Opportunity */}
                  <div
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        lookingForJob: !prev.lookingForJob,
                      }))
                    }
                    className={`
                      flex items-center gap-3 border rounded-xl px-4 py-4 cursor-pointer transition-all
                      ${
                        formData.lookingForJob
                          ? "bg-cyan-500/10 border-cyan-500"
                          : `${currentTheme.border} hover:bg-gray-500/10`
                      }
                    `}
                  >
                    <div
                      className={`
                        h-5 w-5 flex items-center justify-center rounded border transition
                        ${
                          formData.lookingForJob
                            ? currentTheme.checkbox.selected
                            : currentTheme.checkbox.unselected
                        }
                      `}
                    >
                      {formData.lookingForJob && <Check size={14} />}
                    </div>
                    <span
                      className={`text-sm font-medium ${currentTheme.text.primary}`}
                    >
                      I'm interested in job opportunities at EscStack
                    </span>
                  </div>

                  {/* Submit Error */}
                  {submitError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`
                      w-full bg-gradient-to-r ${currentTheme.bg.gradient} text-white py-4 
                      rounded-xl shadow-lg font-semibold disabled:opacity-70 
                      disabled:cursor-not-allowed transition-all duration-200
                      hover:from-cyan-400 hover:to-blue-500
                    `}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
