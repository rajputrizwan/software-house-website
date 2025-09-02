// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ChevronDown, HelpCircle } from "lucide-react";
// import { cn } from "@/lib/utils";

// // ✅ FAQ List (extended for software house)
// const FAQS = [
//   {
//     category: "General",
//     q: "What is this platform about?",
//     a: "This platform helps you streamline workflows with AI, making your tasks faster and smarter.",
//   },
//   {
//     category: "Pricing",
//     q: "Do you offer a free trial?",
//     a: "Yes, we provide a 14-day free trial with access to all premium features.",
//   },
//   {
//     category: "Technical",
//     q: "Is my data secure?",
//     a: "Absolutely. We use industry-standard encryption and follow best practices for data privacy.",
//   },
//   {
//     category: "General",
//     q: "Can I use it on mobile?",
//     a: "Yes, our platform is fully responsive and optimized for all devices.",
//   },
//   {
//     category: "Technical",
//     q: "Do you have an API?",
//     a: "Yes, we provide a powerful REST API with comprehensive documentation.",
//   },

//   // 🔥 Software House Specific FAQs
//   {
//     category: "Services",
//     q: "What kind of software solutions do you develop?",
//     a: "We build custom web apps, mobile apps, enterprise software, and AI-powered solutions tailored to your business needs.",
//   },
//   {
//     category: "Process",
//     q: "How do you start a new project?",
//     a: "We begin with a discovery session to understand your requirements, then provide a proposal, timeline, and development plan.",
//   },
//   {
//     category: "Process",
//     q: "Which development methodologies do you follow?",
//     a: "We primarily use Agile and Scrum, ensuring iterative development, transparency, and faster delivery.",
//   },
//   {
//     category: "Technical",
//     q: "What technologies do you specialize in?",
//     a: "We work with modern stacks including React, Next.js, Node.js, Python, Java, Flutter, and cloud platforms like AWS & Supabase.",
//   },
//   {
//     category: "Pricing",
//     q: "How do you charge for projects?",
//     a: "We offer both fixed-price and hourly models, depending on the scope and flexibility required by the client.",
//   },
//   {
//     category: "Support",
//     q: "Do you provide post-launch support and maintenance?",
//     a: "Yes, we offer ongoing support, monitoring, and upgrades to ensure your software continues to run smoothly.",
//   },
//   {
//     category: "Team",
//     q: "Can you provide dedicated developers or teams?",
//     a: "Yes, we offer staff augmentation so you can hire skilled developers or entire teams on a full-time or part-time basis.",
//   },
//   {
//     category: "Delivery",
//     q: "How long does it take to build a typical project?",
//     a: "It depends on the scope. Small apps may take 4–6 weeks, while enterprise solutions can take several months.",
//   },
//   {
//     category: "Security",
//     q: "How do you ensure software security?",
//     a: "We follow secure coding practices, regular code reviews, penetration testing, and compliance with industry standards.",
//   },
//   {
//     category: "Contracts",
//     q: "Do you sign NDAs (Non-Disclosure Agreements)?",
//     a: "Yes, we take confidentiality seriously and can sign NDAs to protect your business idea and data.",
//   },
// ];

// export default function FAQPage() {
//   const [search, setSearch] = useState("");
//   const [active, setActive] = useState(null);
//   const [category, setCategory] = useState("All");

//   const categories = ["All", ...new Set(FAQS.map((f) => f.category))];

//   const filtered = FAQS.filter(
//     (f) =>
//       (category === "All" || f.category === category) &&
//       (f.q.toLowerCase().includes(search.toLowerCase()) ||
//         f.a.toLowerCase().includes(search.toLowerCase()))
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 px-6 py-12 relative">
//       <div className="max-w-4xl mx-auto text-center">
//         {/* Heading */}
//         <motion.h1
//           className="text-4xl font-extrabold mb-4 text-white"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           Frequently Asked Questions
//         </motion.h1>
//         <p className="text-gray-400 mb-8">
//           Find answers to the most common questions. Can’t find what you’re
//           looking for?{" "}
//           <a href="/contact" className="underline hover:text-primary">
//             Contact us
//           </a>
//           .
//         </p>

//         {/* Search */}
//         <div className="flex flex-col md:flex-row gap-3 mb-8">
//           <Input
//             placeholder="Search questions..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
//           />
//         </div>

//         {/* Category Filters */}
//         <div className="flex flex-wrap justify-center gap-3 mb-10">
//           {categories.map((cat) => (
//             <Button
//               key={cat}
//               variant={cat === category ? "default" : "outline"}
//               onClick={() => setCategory(cat)}
//               className={cn(
//                 "rounded-full",
//                 cat === category
//                   ? "bg-primary text-primary-foreground shadow-md"
//                   : "border-gray-700 text-gray-300 hover:bg-gray-800"
//               )}
//             >
//               {cat}
//             </Button>
//           ))}
//         </div>

//         {/* FAQ List */}
//         <div className="space-y-4 text-left">
//           {filtered.map((f, i) => (
//             <Card
//               key={i}
//               className="overflow-hidden border border-gray-800 bg-gray-900 text-gray-200 rounded-2xl shadow-sm"
//             >
//               <button
//                 onClick={() => setActive(active === i ? null : i)}
//                 className="w-full flex justify-between items-center px-4 py-3 font-medium text-left text-white"
//               >
//                 {f.q}
//                 <ChevronDown
//                   className={cn(
//                     "h-5 w-5 transition-transform text-gray-400",
//                     active === i && "rotate-180 text-primary"
//                   )}
//                 />
//               </button>
//               <AnimatePresence initial={false}>
//                 {active === i && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <CardContent className="px-4 pb-4 text-gray-400">
//                       {f.a}
//                     </CardContent>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </Card>
//           ))}

//           {filtered.length === 0 && (
//             <p className="text-gray-500 text-center">No results found.</p>
//           )}
//         </div>
//       </div>

//       {/* Floating CTA */}
//       <motion.div
//         className="fixed bottom-6 right-6 max-w-sm w-full sm:w-auto"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 0.5 }}
//       >
//         <Card className="p-5 shadow-xl border border-primary/30 bg-primary text-primary-foreground rounded-2xl">
//           <div className="flex items-center gap-3 mb-3">
//             <HelpCircle className="h-6 w-6" />
//             <h3 className="text-lg font-semibold">Still need help?</h3>
//           </div>
//           <p className="text-sm mb-4 opacity-90">
//             Can’t find your answer in the FAQ? Reach out to our support team and
//             we’ll assist you right away.
//           </p>
//           <Button asChild variant="secondary" className="w-full rounded-xl">
//             <a href="/contact">Contact Support</a>
//           </Button>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ✅ FAQ List (extended for software house)
const FAQS = [
  {
    category: "General",
    q: "What is this platform about?",
    a: "This platform helps you streamline workflows with AI, making your tasks faster and smarter.",
  },
  {
    category: "Pricing",
    q: "Do you offer a free trial?",
    a: "Yes, we provide a 14-day free trial with access to all premium features.",
  },
  {
    category: "Technical",
    q: "Is my data secure?",
    a: "Absolutely. We use industry-standard encryption and follow best practices for data privacy.",
  },
  {
    category: "General",
    q: "Can I use it on mobile?",
    a: "Yes, our platform is fully responsive and optimized for all devices.",
  },
  {
    category: "Technical",
    q: "Do you have an API?",
    a: "Yes, we provide a powerful REST API with comprehensive documentation.",
  },

  // 🔥 Software House Specific FAQs
  {
    category: "Services",
    q: "What kind of software solutions do you develop?",
    a: "We build custom web apps, mobile apps, enterprise software, and AI-powered solutions tailored to your business needs.",
  },
  {
    category: "Process",
    q: "How do you start a new project?",
    a: "We begin with a discovery session to understand your requirements, then provide a proposal, timeline, and development plan.",
  },
  {
    category: "Process",
    q: "Which development methodologies do you follow?",
    a: "We primarily use Agile and Scrum, ensuring iterative development, transparency, and faster delivery.",
  },
  {
    category: "Technical",
    q: "What technologies do you specialize in?",
    a: "We work with modern stacks including React, Next.js, Node.js, Python, Java, Flutter, and cloud platforms like AWS & Supabase.",
  },
  {
    category: "Pricing",
    q: "How do you charge for projects?",
    a: "We offer both fixed-price and hourly models, depending on the scope and flexibility required by the client.",
  },
  {
    category: "Support",
    q: "Do you provide post-launch support and maintenance?",
    a: "Yes, we offer ongoing support, monitoring, and upgrades to ensure your software continues to run smoothly.",
  },
  {
    category: "Team",
    q: "Can you provide dedicated developers or teams?",
    a: "Yes, we offer staff augmentation so you can hire skilled developers or entire teams on a full-time or part-time basis.",
  },
  {
    category: "Delivery",
    q: "How long does it take to build a typical project?",
    a: "It depends on the scope. Small apps may take 4–6 weeks, while enterprise solutions can take several months.",
  },
  {
    category: "Security",
    q: "How do you ensure software security?",
    a: "We follow secure coding practices, regular code reviews, penetration testing, and compliance with industry standards.",
  },
  {
    category: "Contracts",
    q: "Do you sign NDAs (Non-Disclosure Agreements)?",
    a: "Yes, we take confidentiality seriously and can sign NDAs to protect your business idea and data.",
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(FAQS.map((f) => f.category))];

  const filtered = FAQS.filter(
    (f) =>
      (category === "All" || f.category === category) &&
      (f.q.toLowerCase().includes(search.toLowerCase()) ||
        f.a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 py-12 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base">
          Find answers to the most common questions. Can't find what you're
          looking for?{" "}
          <a
            href="/contact"
            className="underline hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contact us
          </a>
          .
        </p>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <Input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === category ? "default" : "outline"}
              onClick={() => setCategory(cat)}
              size="sm"
              className={cn(
                "rounded-full text-xs sm:text-sm",
                cat === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 text-left">
          {filtered.map((f, i) => (
            <Card
              key={i}
              className="overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow-sm"
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex justify-between items-center px-4 py-3 font-medium text-left text-gray-900 dark:text-white text-sm sm:text-base"
              >
                {f.q}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 sm:h-5 sm:w-5 transition-transform text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2",
                    active === i &&
                      "rotate-180 text-blue-600 dark:text-blue-400"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="px-4 pb-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      {f.a}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}

          {filtered.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No results found.
            </p>
          )}
        </div>
      </div>

      {/* Floating CTA - Made Responsive */}
      <motion.div
        className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm w-auto z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="p-4 sm:p-5 shadow-xl border border-blue-200 dark:border-blue-800 bg-blue-600 text-white rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            <h3 className="text-base sm:text-lg font-semibold">
              Still need help?
            </h3>
          </div>
          <p className="text-xs sm:text-sm mb-4 opacity-90">
            Can't find your answer in the FAQ? Reach out to our support team and
            we'll assist you right away.
          </p>
          <Button
            asChild
            variant="secondary"
            className="w-full rounded-xl bg-white text-blue-600 hover:bg-gray-100 text-sm sm:text-base"
            size="sm"
          >
            <a href="/contact">Contact Support</a>
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
