// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
//   Send,
//   MessageCircle,
//   User,
//   ChevronDown,
//   ArrowRight,
//   CheckCircle,
//   Linkedin,
//   Twitter,
//   Github,
//   Calendar,
//   Zap,
//   Sparkles,
//   Quote,
//   X,
//   Check,
// } from "lucide-react";
// import { createClient } from "@supabase/supabase-js";
// import SuccessAnimation from "@/components/ui/success"; // your Lottie component

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default function ContactPage() {
//   // Contact sidebar state
//   const [open, setOpen] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     budget: "",
//     companyName: "",
//     companyUrl: "",
//     region: "",
//     services: [],
//     projectDetails: "",
//     lookingForJob: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Original contact page state
//   const [activeField, setActiveField] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const formRef = useRef(null);

//   // Update current time
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const servicesOptions = [
//     "Remote IT Resources",
//     "Custom Software Development",
//     "Web Development",
//     "Mobile App Development",
//     "AR/VR",
//     "Gaming",
//     "Cyber Security",
//     "Other IT Services",
//   ];

//   const regionOptions = [
//     "Please Select",
//     "North America",
//     "South America",
//     "Europe",
//     "Asia",
//     "Africa",
//     "Australia",
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       if (name === "services") {
//         const updatedServices = checked
//           ? [...formData.services, value]
//           : formData.services.filter((service) => service !== value);
//         setFormData((prev) => ({ ...prev, services: updatedServices }));
//       } else {
//         setFormData((prev) => ({ ...prev, [name]: checked }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstName) newErrors.firstName = "First name is required";
//     if (!formData.lastName) newErrors.lastName = "Last name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Email is invalid";
//     if (!formData.phone) newErrors.phone = "Phone number is required";
//     if (!formData.budget) newErrors.budget = "Budget is required";
//     if (!formData.companyName)
//       newErrors.companyName = "Company name is required";
//     if (!formData.region || formData.region === "Please Select")
//       newErrors.region = "Region is required";
//     if (formData.services.length === 0)
//       newErrors.services = "At least one service is required";
//     if (!formData.projectDetails)
//       newErrors.projectDetails = "Project details are required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     const { error } = await supabase.from("contacts").insert([
//       {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         budget: formData.budget,
//         company_name: formData.companyName,
//         company_url: formData.companyUrl,
//         region: formData.region,
//         services: formData.services,
//         project_details: formData.projectDetails,
//         looking_for_job: formData.lookingForJob,
//       },
//     ]);

//     if (error) {
//       console.error("Supabase insert error:", error);
//       alert("Error submitting form. Please try again.");
//     } else {
//       // send notification email via server API
//       try {
//         const payload = {
//           type: "contact",
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           budget: formData.budget,
//           companyName: formData.companyName,
//           companyUrl: formData.companyUrl,
//           region: formData.region,
//           services: formData.services,
//           projectDetails: formData.projectDetails,
//           lookingForJob: formData.lookingForJob,
//         };

//         const res = await fetch("/api/send-mail", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ subject: "New contact form submission", ...payload }),
//         });

//         if (!res.ok) {
//           console.error("Email API responded with error:", await res.text());
//         }
//       } catch (err) {
//         console.error("Failed to call email API:", err);
//       }

//       setIsSuccess(true);
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         budget: "",
//         companyName: "",
//         companyUrl: "",
//         region: "",
//         services: [],
//         projectDetails: "",
//         lookingForJob: false,
//       });
//     }

//     setIsSubmitting(false);
//   };

//   // Original contact page functions
//   const handleInputFocus = (fieldName) => {
//     setActiveField(fieldName);
//   };

//   const handleInputBlur = () => {
//     setActiveField(null);
//   };

//   // Handler for the main contact form (bottom of the page).
//   const handleMainFormSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);

//     try {
//       const formEl = formRef.current;
//       if (!formEl) {
//         console.error('Form ref missing');
//       } else {
//         const fd = new FormData(formEl);
//         const payload = Object.fromEntries(fd.entries());

//         // send to server API
//         const res = await fetch('/api/send-mail', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ subject: 'Website contact form submission', type: 'contact-public', ...payload }),
//         });

//         if (!res.ok) {
//           console.error('Email API error:', await res.text());
//         }
//       }
//     } catch (err) {
//       console.error('Error submitting main contact form:', err);
//     }

//     // keep the existing UX behavior of showing the sent state briefly
//     setTimeout(() => {
//       setIsSubmitted(false);
//     }, 3000);
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//       },
//     },
//   };

//   const floatingAnimation = {
//     animate: {
//       y: [0, -15, 0],
//       transition: {
//         duration: 6,
//         repeat: Infinity,
//         ease: "easeInOut",
//       },
//     },
//   };

//   const pulseAnimation = {
//     animate: {
//       scale: [1, 1.05, 1],
//       opacity: [0.7, 1, 0.7],
//       transition: {
//         duration: 3,
//         repeat: Infinity,
//         ease: "easeInOut",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/70 dark:from-gray-900 dark:via-blue-950/50 dark:to-indigo-950/70 overflow-hidden relative">
//       {/* Contact Sidebar */}
//       <div>
//         {/* Vertical Sticky Button */}
//         <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
//           <button
//             onClick={() => {
//               setOpen(true);
//               setIsSuccess(false);
//             }}
//             className="bg-gradient-to-b from-cyan-500 to-blue-600 text-white px-3 py-4 rounded-xl shadow-lg transform -rotate-90 origin-bottom-right hover:from-cyan-400 hover:to-blue-500 transition-all"
//           >
//             Let's Talk Business
//           </button>
//         </div>

//         {/* Slide-Out Contact Panel */}
//         <AnimatePresence>
//           {open && (
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="fixed top-0 right-0 h-full w-full sm:w-[600px] bg-white shadow-2xl z-50 flex flex-col rounded-l-xl overflow-hidden"
//             >
//               {/* Header */}
//               <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tl-xl">
//                 <h2 className="text-lg font-semibold">💬 Let's Talk</h2>
//                 <button
//                   onClick={() => setOpen(false)}
//                   className="p-2 rounded-full hover:bg-white/20 transition"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               {/* Body */}
//               {isSuccess ? (
//                 <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-50 text-center">
//                   <SuccessAnimation />
//                   <h2 className="text-2xl text-gray-600 font-semibold mb-2 mt-4">
//                     Thank You!
//                   </h2>
//                   <p className="text-gray-600 mb-6">
//                     Your message has been successfully submitted. We'll get back
//                     to you soon.
//                   </p>
//                   <button
//                     onClick={() => setOpen(false)}
//                     className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-cyan-400 hover:to-blue-500 transition font-semibold"
//                   >
//                     Close
//                   </button>
//                 </div>
//               ) : (
//                 <form
//                   onSubmit={handleSubmit}
//                   className="flex-1 p-6 space-y-5 overflow-y-auto bg-gray-50"
//                 >
//                   {/* First + Last Name */}
//                   <div className="flex gap-5">
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium mb-1 text-gray-700">
//                         First Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm ${
//                           errors.firstName ? "border-red-500" : ""
//                         }`}
//                       />
//                       {errors.firstName && (
//                         <span className="text-red-500 text-xs">
//                           {errors.firstName}
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium mb-1 text-gray-700">
//                         Last Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm ${
//                           errors.lastName ? "border-red-500" : ""
//                         }`}
//                       />
//                       {errors.lastName && (
//                         <span className="text-red-500 text-xs">
//                           {errors.lastName}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm ${
//                         errors.email ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.email && (
//                       <span className="text-red-500 text-xs">
//                         {errors.email}
//                       </span>
//                     )}
//                   </div>

//                   {/* Phone */}
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Phone number <span className="text-red-500">*</span>
//                     </label>
//                     <div className="flex gap-2">
//                       <select
//                         className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm w-1/3"
//                         value={formData.region}
//                         onChange={handleChange}
//                         name="region"
//                       >
//                         <option>Pakistan +92</option>
//                         <option>USA +1</option>
//                         <option>UK +44</option>
//                         <option>India +91</option>
//                       </select>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm ${
//                           errors.phone ? "border-red-500" : ""
//                         }`}
//                         placeholder="Phone number"
//                       />
//                     </div>
//                     {errors.phone && (
//                       <span className="text-red-500 text-xs">
//                         {errors.phone}
//                       </span>
//                     )}
//                   </div>

//                   {/* Budget */}
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Budget <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="budget"
//                       value={formData.budget}
//                       onChange={handleChange}
//                       className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm ${
//                         errors.budget ? "border-red-500" : ""
//                       }`}
//                       placeholder="Your Budget"
//                     />
//                     {errors.budget && (
//                       <span className="text-red-500 text-xs">
//                         {errors.budget}
//                       </span>
//                     )}
//                   </div>

//                   {/* Company Name */}
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Company name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="companyName"
//                       value={formData.companyName}
//                       onChange={handleChange}
//                       className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm ${
//                         errors.companyName ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.companyName && (
//                       <span className="text-red-500 text-xs">
//                         {errors.companyName}
//                       </span>
//                     )}
//                   </div>

//                   {/* Company URL */}
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Company domain / URL
//                     </label>
//                     <input
//                       type="url"
//                       name="companyUrl"
//                       value={formData.companyUrl}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
//                       placeholder="https://example.com"
//                     />
//                   </div>

//                   {/* Region select */}
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Region <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       name="region"
//                       value={formData.region}
//                       onChange={handleChange}
//                       className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm ${
//                         errors.region ? "border-red-500" : ""
//                       }`}
//                     >
//                       {regionOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.region && (
//                       <span className="text-red-500 text-xs">
//                         {errors.region}
//                       </span>
//                     )}
//                   </div>

//                   {/* Services */}
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Services you're looking for{" "}
//                       <span className="text-red-500">*</span>
//                     </label>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
//                       {servicesOptions.map((service) => {
//                         const isSelected = formData.services.includes(service);
//                         return (
//                           <label
//                             key={service}
//                             className={`flex items-center space-x-3 border rounded-xl px-4 py-3 cursor-pointer transition-all shadow-sm
//                             ${
//                               isSelected
//                                 ? "border-cyan-500 bg-cyan-50"
//                                 : "border-gray-300 hover:bg-gray-100"
//                             }`}
//                           >
//                             <input
//                               type="checkbox"
//                               name="services"
//                               value={service}
//                               checked={isSelected}
//                               onChange={handleChange}
//                               className="hidden"
//                             />
//                             <div
//                               className={`h-5 w-5 flex items-center justify-center rounded-md border transition
//                               ${
//                                 isSelected
//                                   ? "bg-cyan-500 border-cyan-500 text-white"
//                                   : "border-gray-400"
//                               }`}
//                             >
//                               {isSelected && <Check size={14} />}
//                             </div>
//                             <span className="text-sm font-medium text-gray-700">
//                               {service}
//                             </span>
//                           </label>
//                         );
//                       })}
//                     </div>
//                     {errors.services && (
//                       <span className="text-red-500 text-xs">
//                         {errors.services}
//                       </span>
//                     )}
//                   </div>

//                   {/* Project Details */}
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Project Details <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="projectDetails"
//                       value={formData.projectDetails}
//                       onChange={handleChange}
//                       className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm ${
//                         errors.projectDetails ? "border-red-500" : ""
//                       }`}
//                       rows="4"
//                     />
//                     {errors.projectDetails && (
//                       <span className="text-red-500 text-xs">
//                         {errors.projectDetails}
//                       </span>
//                     )}
//                   </div>

//                   {/* Looking for job */}
//                   <div
//                     onClick={() =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         lookingForJob: !prev.lookingForJob,
//                       }))
//                     }
//                     className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition
//                     ${
//                       formData.lookingForJob
//                         ? "bg-cyan-50 border-cyan-500"
//                         : "border-gray-300 hover:bg-gray-100"
//                     }`}
//                   >
//                     <div
//                       className={`h-5 w-5 flex items-center justify-center rounded border
//                       ${
//                         formData.lookingForJob
//                           ? "bg-cyan-500 border-cyan-500 text-white"
//                           : "border-gray-400 bg-white"
//                       }`}
//                     >
//                       {formData.lookingForJob && <Check size={14} />}
//                     </div>
//                     <span className="text-sm font-medium text-gray-700">
//                       I am looking for a job at EscStack
//                     </span>
//                   </div>

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:from-cyan-400 hover:to-blue-500 transition font-semibold disabled:opacity-70"
//                   >
//                     {isSubmitting ? "Submitting..." : "Submit"}
//                   </button>
//                 </form>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Original Contact Page Content */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full"
//             style={{
//               width: Math.random() * 100 + 30,
//               height: Math.random() * 100 + 30,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               background: `rgba(${Math.random() * 50 + 180}, ${
//                 Math.random() * 100 + 150
//               }, ${Math.random() * 100 + 200}, ${Math.random() * 0.1 + 0.05})`,
//             }}
//             animate={{
//               y: [0, Math.random() * 60 - 30],
//               x: [0, Math.random() * 60 - 30],
//               scale: [1, 1 + Math.random() * 0.5],
//               rotate: [0, Math.random() * 360],
//             }}
//             transition={{
//               duration: 10 + Math.random() * 20,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//           />
//         ))}

//         {/* Animated grid */}
//         <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>

//         {/* Pulse elements */}
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
//           variants={pulseAnimation}
//           animate="animate"
//         />
//         <motion.div
//           className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
//           variants={pulseAnimation}
//           animate="animate"
//           transition={{ delay: 1 }}
//         />
//       </div>

//       <div className="container relative mx-auto px-4 py-16 md:py-24">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
//           className="text-center mb-16 md:mb-24"
//         >
//           <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
//             <Zap className="w-4 h-4 mr-2" />
//             Get in Touch
//           </div>
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
//             Let's{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//               Create
//             </span>{" "}
//             Together
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Ready to bring your ideas to life? Our team is here to turn your
//             vision into reality with cutting-edge solutions.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
//           {/* Contact Information */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="space-y-8"
//           >
//             <motion.div variants={itemVariants}>
//               <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
//                 Connect With Us
//               </h2>
//               <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
//                 We're passionate about innovation and collaboration. Reach out
//                 through any channel that works for you.
//               </p>
//             </motion.div>

//             {/* Contact Methods */}
//             <div className="space-y-6">
//               {[
//                 {
//                   icon: Mail,
//                   iconColor: "text-blue-600 dark:text-blue-400",
//                   bgColor: "bg-blue-100 dark:bg-blue-900/30",
//                   title: "Email Us",
//                   content: "info.escstack@gmail.com",
//                   description: "We'll respond within 24 hours",
//                   delay: 0.1,
//                 },
//                 {
//                   icon: Phone,
//                   iconColor: "text-green-600 dark:text-green-400",
//                   bgColor: "bg-green-100 dark:bg-green-900/30",
//                   title: "Call Us",
//                   content: "03163797857",
//                   description: "Mon, Wed, Fri: 9AM-1PM or 6PM-11PM",
//                   delay: 0.2,
//                 },
//                 {
//                   icon: MapPin,
//                   iconColor: "text-purple-600 dark:text-purple-400",
//                   bgColor: "bg-purple-100 dark:bg-purple-900/30",
//                   title: "Visit Us",
//                   content: "House No A 58, Ali Town Lahore",
//                   description: "In front of Youth Inn Hostel, Rawind Road",
//                   delay: 0.3,
//                 },
//                 {
//                   icon: Clock,
//                   iconColor: "text-amber-600 dark:text-amber-400",
//                   bgColor: "bg-amber-100 dark:bg-amber-900/30",
//                   title: "Business Hours",
//                   content: "Monday, Wednesday, Friday",
//                   description: "9:00 AM - 1:00 PM & 6:00 PM - 11:00 PM",
//                   delay: 0.4,
//                 },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   variants={itemVariants}
//                   custom={index}
//                   whileHover={{ y: -5 }}
//                   onHoverStart={() => setHoveredCard(index)}
//                   onHoverEnd={() => setHoveredCard(null)}
//                 >
//                   <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"
//                       animate={
//                         hoveredCard === index ? { opacity: 1 } : { opacity: 0 }
//                       }
//                     />
//                     <CardContent className="p-6 flex items-start relative">
//                       <motion.div
//                         className={`p-3 rounded-full mr-4 ${item.bgColor} group-hover:scale-110 transition-transform duration-300`}
//                         whileHover={{ rotate: 10 }}
//                       >
//                         <item.icon className={`w-6 h-6 ${item.iconColor}`} />
//                       </motion.div>
//                       <div>
//                         <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                           {item.title}
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-300">
//                           {item.content}
//                         </p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                           {item.description}
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Social Links */}
//             <motion.div variants={itemVariants} className="pt-6">
//               <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
//                 Follow Our Journey
//               </h3>
//               <div className="flex space-x-4">
//                 {[
//                   {
//                     icon: Linkedin,
//                     color: "bg-blue-600",
//                     label: "LinkedIn",
//                     href: "https://www.linkedin.com/company/escstack",
//                   },
//                   {
//                     icon: Twitter,
//                     color: "bg-sky-500",
//                     label: "Twitter",
//                     href: "https://x.com/EscStack",
//                   },
//                   {
//                     icon: Github,
//                     color: "bg-gray-800 dark:bg-gray-700",
//                     label: "GitHub",
//                     href: "https://github.com/escstack",
//                   },
//                 ].map((social, index) => (
//                   <motion.a
//                     key={index}
//                     whileHover={{ y: -5, scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`${social.color} text-white p-3 rounded-full hover:opacity-90 transition-opacity relative overflow-hidden group`}
//                     aria-label={social.label}
//                   >
//                     <social.icon className="w-5 h-5" />
//                     <motion.span
//                       className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
//                       initial={false}
//                     />
//                   </motion.a>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{
//               duration: 0.8,
//               delay: 0.5,
//               type: "spring",
//               stiffness: 100,
//             }}
//             className="relative"
//           >
//             <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
//               <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden relative">
//                 <motion.div
//                   className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{ duration: 0.8, delay: 0.7 }}
//                 />
//                 <div className="absolute top-4 right-4">
//                   <Sparkles className="w-5 h-5 text-yellow-500" />
//                 </div>
//                 <CardContent className="p-8">
//                   <AnimatePresence mode="wait">
//                     {isSubmitted ? (
//                       <motion.div
//                         key="success-message"
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         className="text-center py-12"
//                       >
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{
//                             type: "spring",
//                             stiffness: 200,
//                             delay: 0.2,
//                           }}
//                         >
//                           <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
//                         </motion.div>
//                         <motion.h3
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.4 }}
//                           className="text-2xl font-bold text-gray-800 dark:text-white mb-4"
//                         >
//                           Message Sent!
//                         </motion.h3>
//                         <motion.p
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.6 }}
//                           className="text-gray-600 dark:text-gray-300"
//                         >
//                           Thank you for reaching out. We'll get back to you
//                           within 24 hours.
//                         </motion.p>
//                       </motion.div>
//                     ) : (
//                       <motion.form
//                         key="contact-form"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         ref={formRef}
//                         onSubmit={handleMainFormSubmit}
//                         className="space-y-6"
//                       >
//                         <div>
//                           <motion.h2
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.8 }}
//                             className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
//                           >
//                             Send us a Message
//                           </motion.h2>
//                           <motion.p
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.9 }}
//                             className="text-gray-600 dark:text-gray-300 mb-6"
//                           >
//                             Fill out the form below and we'll get back to you as
//                             soon as possible.
//                           </motion.p>
//                         </div>

//                         {[
//                           {
//                             id: "name",
//                             label: "Full Name",
//                             icon: User,
//                             placeholder: "Your name",
//                           },
//                           {
//                             id: "email",
//                             label: "Email Address",
//                             icon: Mail,
//                             placeholder: "your.email@example.com",
//                             type: "email",
//                           },
//                           {
//                             id: "subject",
//                             label: "Subject",
//                             placeholder: "What is this regarding?",
//                           },
//                           {
//                             id: "message",
//                             label: "Message",
//                             icon: MessageCircle,
//                             placeholder: "Tell us about your project...",
//                             textarea: true,
//                           },
//                         ].map((field, index) => (
//                           <motion.div
//                             key={field.id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 1 + index * 0.1 }}
//                             className="space-y-2"
//                           >
//                             <Label
//                               htmlFor={field.id}
//                               className="text-gray-700 dark:text-gray-300"
//                             >
//                               {field.label}
//                             </Label>
//                             <div className="relative">
//                               {field.textarea ? (
//                                 <>
//                                   <Textarea
//                                     id={field.id}
//                                     name={field.id}
//                                     onFocus={() => handleInputFocus(field.id)}
//                                     onBlur={handleInputBlur}
//                                     className="min-h-[120px] bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 pl-10"
//                                     placeholder={field.placeholder}
//                                     required
//                                   />
//                                   {field.icon && (
//                                     <field.icon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                                   )}
//                                 </>
//                               ) : (
//                                 <>
//                                   <Input
//                                     id={field.id}
//                                     name={field.id}
//                                     type={field.type || "text"}
//                                     onFocus={() => handleInputFocus(field.id)}
//                                     onBlur={handleInputBlur}
//                                     className={`bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600 ${
//                                       field.icon ? "pl-10" : ""
//                                     }`}
//                                     placeholder={field.placeholder}
//                                     required
//                                   />
//                                   {field.icon && (
//                                     <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                                   )}
//                                 </>
//                               )}
//                             </div>
//                           </motion.div>
//                         ))}

//                         <motion.div
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 1.4 }}
//                           className="pt-4"
//                         >
//                           <Button
//                             type="submit"
//                             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold rounded-lg transition-all relative overflow-hidden group"
//                             size="lg"
//                           >
//                             <span className="relative z-10">Send Message</span>
//                             <Send className="ml-2 w-4 h-4 relative z-10" />
//                             <motion.span
//                               className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                               initial={false}
//                             />
//                           </Button>
//                         </motion.div>
//                       </motion.form>
//                     )}
//                   </AnimatePresence>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             {/* Floating elements around form */}
//             <motion.div
//               className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"
//               variants={floatingAnimation}
//               animate="animate"
//             />
//             <motion.div
//               className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl"
//               variants={floatingAnimation}
//               animate="animate"
//               transition={{ delay: 2 }}
//             />
//           </motion.div>
//         </div>

//         {/* FAQ CTA Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.8,
//             delay: 1.2,
//             type: "spring",
//             stiffness: 100,
//           }}
//           className="mt-24 md:mt-32 text-center"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 200, delay: 1.4 }}
//             className="inline-flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
//           >
//             <Quote className="w-4 h-4 mr-2" />
//             We're here to help
//           </motion.div>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
//             Need More Information?
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
//             Explore our FAQs or schedule a personalized consultation with our
//             experts.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
//               <Link href="/faq" passHref>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
//                 >
//                   View FAQs
//                   <ArrowRight className="ml-2 w-4 h-4" />
//                 </Button>
//               </Link>
//             </motion.div>
//             <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
//               >
//                 Schedule a Call
//                 <Calendar className="ml-2 w-4 h-4" />
//               </Button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  ArrowRight,
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
  // Original contact page state
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

  // Original contact page functions
  const handleInputFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleInputBlur = () => {
    setActiveField(null);
  };

  // Handler for the main contact form (bottom of the page).
  const handleMainFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      const formEl = formRef.current;
      if (!formEl) {
        console.error("Form ref missing");
      } else {
        const fd = new FormData(formEl);
        const payload = Object.fromEntries(fd.entries());

        // send to server API
        const res = await fetch("/api/send-mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: "Website contact form submission",
            type: "contact-public",
            ...payload,
          }),
        });

        if (!res.ok) {
          console.error("Email API error:", await res.text());
        }
      }
    } catch (err) {
      console.error("Error submitting main contact form:", err);
    }

    // keep the existing UX behavior of showing the sent state briefly
    setTimeout(() => {
      setIsSubmitted(false);
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
      {/* Background Elements */}
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
                  content: "info.escstack@gmail.com",
                  description: "We'll respond within 24 hours",
                  delay: 0.1,
                },
                {
                  icon: Phone,
                  iconColor: "text-green-600 dark:text-green-400",
                  bgColor: "bg-green-100 dark:bg-green-900/30",
                  title: "Call Us",
                  content: "03163797857",
                  description: "Mon, Wed, Fri: 9AM-1PM or 6PM-11PM",
                  delay: 0.2,
                },
                {
                  icon: MapPin,
                  iconColor: "text-purple-600 dark:text-purple-400",
                  bgColor: "bg-purple-100 dark:bg-purple-900/30",
                  title: "Visit Us",
                  content: "House No A 58, Ali Town Lahore",
                  description: "In front of Youth Inn Hostel, Rawind Road",
                  delay: 0.3,
                },
                {
                  icon: Clock,
                  iconColor: "text-amber-600 dark:text-amber-400",
                  bgColor: "bg-amber-100 dark:bg-amber-900/30",
                  title: "Business Hours",
                  content: "Monday, Wednesday, Friday",
                  description: "9:00 AM - 1:00 PM & 6:00 PM - 11:00 PM",
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
                  {
                    icon: Linkedin,
                    color: "bg-blue-600",
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/company/escstack",
                  },
                  {
                    icon: Twitter,
                    color: "bg-sky-500",
                    label: "Twitter",
                    href: "https://x.com/EscStack",
                  },
                  {
                    icon: Github,
                    color: "bg-gray-800 dark:bg-gray-700",
                    label: "GitHub",
                    href: "https://github.com/escstack",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
                        onSubmit={handleMainFormSubmit}
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
              <Link href="/faq" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
                >
                  View FAQs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
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
