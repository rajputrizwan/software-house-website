// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Check } from "lucide-react";
// import { createClient } from "@supabase/supabase-js";
// import SuccessAnimation from "@/components/ui/success"; // your Lottie component

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default function ContactSidebar() {
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

//   const inputClass =
//     "w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm";

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

//   return (
//     <div>
//       {/* Vertical Sticky Button */}
//       <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
//         <button
//           onClick={() => {
//             setOpen(true);
//             setIsSuccess(false);
//           }}
//           className="bg-gradient-to-b from-cyan-500 to-blue-600 text-white px-3 py-4 rounded-xl shadow-lg transform -rotate-90 origin-bottom-right hover:from-cyan-400 hover:to-blue-500 transition-all"
//         >
//           Let's Talk Bussiness
//         </button>
//       </div>

//       {/* Slide-Out Contact Panel */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="fixed top-0 right-0 h-full w-full sm:w-[600px] bg-white shadow-2xl z-50 flex flex-col rounded-l-xl overflow-hidden"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tl-xl">
//               <h2 className="text-lg font-semibold">💬 Let's Talk</h2>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="p-2 rounded-full hover:bg-white/20 transition"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             {/* Body */}
//             {isSuccess ? (
//               <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-50 text-center">
//                 <SuccessAnimation />
//                 <h2 className="text-2xl text-gray-600 font-semibold mb-2 mt-4">
//                   Thank You!
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                   Your message has been successfully submitted. We'll get back
//                   to you soon.
//                 </p>
//                 <button
//                   onClick={() => setOpen(false)}
//                   className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-cyan-400 hover:to-blue-500 transition font-semibold"
//                 >
//                   Close
//                 </button>
//               </div>
//             ) : (
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex-1 p-6 space-y-5 overflow-y-auto bg-gray-50"
//               >
//                 {/* First + Last Name */}
//                 <div className="flex gap-5">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       First Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className={`${inputClass} ${
//                         errors.firstName ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.firstName && (
//                       <span className="text-red-500 text-xs">
//                         {errors.firstName}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium mb-1 text-gray-700">
//                       Last Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className={`${inputClass} ${
//                         errors.lastName ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.lastName && (
//                       <span className="text-red-500 text-xs">
//                         {errors.lastName}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`${inputClass} ${
//                       errors.email ? "border-red-500" : ""
//                     }`}
//                   />
//                   {errors.email && (
//                     <span className="text-red-500 text-xs">{errors.email}</span>
//                   )}
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Phone number <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex gap-2">
//                     <select
//                       className={`${inputClass} w-1/3`}
//                       value={formData.region}
//                       onChange={handleChange}
//                       name="region"
//                     >
//                       <option>Pakistan +92</option>
//                       <option>USA +1</option>
//                       <option>UK +44</option>
//                       <option>India +91</option>
//                     </select>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className={`${inputClass} ${
//                         errors.phone ? "border-red-500" : ""
//                       }`}
//                       placeholder="Phone number"
//                     />
//                   </div>
//                   {errors.phone && (
//                     <span className="text-red-500 text-xs">{errors.phone}</span>
//                   )}
//                 </div>

//                 {/* Budget */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Budget <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="budget"
//                     value={formData.budget}
//                     onChange={handleChange}
//                     className={`${inputClass} ${
//                       errors.budget ? "border-red-500" : ""
//                     }`}
//                     placeholder="Your Budget"
//                   />
//                   {errors.budget && (
//                     <span className="text-red-500 text-xs">
//                       {errors.budget}
//                     </span>
//                   )}
//                 </div>

//                 {/* Company Name */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Company name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     className={`${inputClass} ${
//                       errors.companyName ? "border-red-500" : ""
//                     }`}
//                   />
//                   {errors.companyName && (
//                     <span className="text-red-500 text-xs">
//                       {errors.companyName}
//                     </span>
//                   )}
//                 </div>

//                 {/* Company URL */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Company domain / URL
//                   </label>
//                   <input
//                     type="url"
//                     name="companyUrl"
//                     value={formData.companyUrl}
//                     onChange={handleChange}
//                     className={inputClass}
//                     placeholder="https://example.com"
//                   />
//                 </div>

//                 {/* Region select */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Region <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="region"
//                     value={formData.region}
//                     onChange={handleChange}
//                     className={`${inputClass} ${
//                       errors.region ? "border-red-500" : ""
//                     }`}
//                   >
//                     {regionOptions.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.region && (
//                     <span className="text-red-500 text-xs">
//                       {errors.region}
//                     </span>
//                   )}
//                 </div>

//                 {/* Services */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Services you're looking for{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
//                     {servicesOptions.map((service) => {
//                       const isSelected = formData.services.includes(service);
//                       return (
//                         <label
//                           key={service}
//                           className={`flex items-center space-x-3 border rounded-xl px-4 py-3 cursor-pointer transition-all shadow-sm
//                             ${
//                               isSelected
//                                 ? "border-cyan-500 bg-cyan-50"
//                                 : "border-gray-300 hover:bg-gray-100"
//                             }`}
//                         >
//                           <input
//                             type="checkbox"
//                             name="services"
//                             value={service}
//                             checked={isSelected}
//                             onChange={handleChange}
//                             className="hidden"
//                           />
//                           <div
//                             className={`h-5 w-5 flex items-center justify-center rounded-md border transition
//                               ${
//                                 isSelected
//                                   ? "bg-cyan-500 border-cyan-500 text-white"
//                                   : "border-gray-400"
//                               }`}
//                           >
//                             {isSelected && <Check size={14} />}
//                           </div>
//                           <span className="text-sm font-medium text-gray-700">
//                             {service}
//                           </span>
//                         </label>
//                       );
//                     })}
//                   </div>
//                   {errors.services && (
//                     <span className="text-red-500 text-xs">
//                       {errors.services}
//                     </span>
//                   )}
//                 </div>

//                 {/* Project Details */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1 text-gray-700">
//                     Project Details <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     name="projectDetails"
//                     value={formData.projectDetails}
//                     onChange={handleChange}
//                     className={`${inputClass} ${
//                       errors.projectDetails ? "border-red-500" : ""
//                     }`}
//                     rows="4"
//                   />
//                   {errors.projectDetails && (
//                     <span className="text-red-500 text-xs">
//                       {errors.projectDetails}
//                     </span>
//                   )}
//                 </div>

//                 {/* Looking for job */}
//                 <div
//                   onClick={() =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       lookingForJob: !prev.lookingForJob,
//                     }))
//                   }
//                   className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition
//                     ${
//                       formData.lookingForJob
//                         ? "bg-cyan-50 border-cyan-500"
//                         : "border-gray-300 hover:bg-gray-100"
//                     }`}
//                 >
//                   <div
//                     className={`h-5 w-5 flex items-center justify-center rounded border
//                       ${
//                         formData.lookingForJob
//                           ? "bg-cyan-500 border-cyan-500 text-white"
//                           : "border-gray-400 bg-white"
//                       }`}
//                   >
//                     {formData.lookingForJob && <Check size={14} />}
//                   </div>
//                   <span className="text-sm font-medium text-gray-700">
//                     I am looking for a job at EscStack
//                   </span>
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:from-cyan-400 hover:to-blue-500 transition font-semibold disabled:opacity-70"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit"}
//                 </button>
//               </form>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
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

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm";

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

  return (
    <div>
      {/* Vertical Sticky Button */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => {
            setOpen(true);
            setIsSuccess(false);
            setSubmitError("");
          }}
          className="bg-gradient-to-b from-cyan-500 to-blue-600 text-white px-3 py-4 rounded-xl shadow-lg transform -rotate-90 origin-bottom-right hover:from-cyan-400 hover:to-blue-500 transition-all"
        >
          Let's Talk Business
        </button>
      </div>

      {/* Slide-Out Contact Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[600px] bg-white shadow-2xl z-50 flex flex-col rounded-l-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tl-xl">
              <h2 className="text-lg font-semibold">💬 Let's Talk</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            {isSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-50 text-center">
                <SuccessAnimation />
                <h2 className="text-2xl text-gray-600 font-semibold mb-2 mt-4">
                  Thank You!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your message has been successfully submitted. We'll get back
                  to you soon.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-cyan-400 hover:to-blue-500 transition font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex-1 p-6 space-y-5 overflow-y-auto bg-gray-50"
              >
                {/* First + Last Name */}
                <div className="flex gap-5">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`${inputClass} ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-xs">
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`${inputClass} ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                      placeholder="Last Name"
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-xs">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email}</span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
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
                        errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="Phone number"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-red-500 text-xs">{errors.phone}</span>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Budget <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      errors.budget ? "border-red-500" : ""
                    }`}
                    placeholder="Your Budget"
                  />
                  {errors.budget && (
                    <span className="text-red-500 text-xs">
                      {errors.budget}
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Company name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      errors.companyName ? "border-red-500" : ""
                    }`}
                    placeholder="Company Name"
                  />
                  {errors.companyName && (
                    <span className="text-red-500 text-xs">
                      {errors.companyName}
                    </span>
                  )}
                </div>

                {/* Company URL */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Company domain / URL
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

                {/* Region select */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      errors.region ? "border-red-500" : ""
                    }`}
                  >
                    {regionOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <span className="text-red-500 text-xs">
                      {errors.region}
                    </span>
                  )}
                </div>

                {/* Services */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Services you're looking for{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {servicesOptions.map((service) => {
                      const isSelected = formData.services.includes(service);
                      return (
                        <label
                          key={service}
                          className={`flex items-center space-x-3 border rounded-xl px-4 py-3 cursor-pointer transition-all shadow-sm
                            ${
                              isSelected
                                ? "border-cyan-500 bg-cyan-50"
                                : "border-gray-300 hover:bg-gray-100"
                            }`}
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
                            className={`h-5 w-5 flex items-center justify-center rounded-md border transition
                              ${
                                isSelected
                                  ? "bg-cyan-500 border-cyan-500 text-white"
                                  : "border-gray-400"
                              }`}
                          >
                            {isSelected && <Check size={14} />}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {service}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.services && (
                    <span className="text-red-500 text-xs">
                      {errors.services}
                    </span>
                  )}
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      errors.projectDetails ? "border-red-500" : ""
                    }`}
                    rows="4"
                    placeholder="Tell us about your project..."
                  />
                  {errors.projectDetails && (
                    <span className="text-red-500 text-xs">
                      {errors.projectDetails}
                    </span>
                  )}
                </div>

                {/* Looking for job */}
                <div
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      lookingForJob: !prev.lookingForJob,
                    }))
                  }
                  className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition
                    ${
                      formData.lookingForJob
                        ? "bg-cyan-50 border-cyan-500"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <div
                    className={`h-5 w-5 flex items-center justify-center rounded border
                      ${
                        formData.lookingForJob
                          ? "bg-cyan-500 border-cyan-500 text-white"
                          : "border-gray-400 bg-white"
                      }`}
                  >
                    {formData.lookingForJob && <Check size={14} />}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    I am looking for a job at EscStack
                  </span>
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {submitError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:from-cyan-400 hover:to-blue-500 transition font-semibold disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
