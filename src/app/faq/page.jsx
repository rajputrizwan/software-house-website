"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted px-6 py-12 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <p className="text-muted-foreground mb-8">
          Find answers to the most common questions. Can’t find what you’re
          looking for?{" "}
          <a href="/contact" className="underline hover:text-primary">
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
            className="flex-1"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === category ? "default" : "outline"}
              onClick={() => setCategory(cat)}
              className="rounded-full"
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
              className="overflow-hidden border rounded-2xl shadow-sm"
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex justify-between items-center px-4 py-3 font-medium text-left"
              >
                {f.q}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform",
                    active === i && "rotate-180 text-primary"
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
                    <CardContent className="px-4 pb-4 text-muted-foreground">
                      {f.a}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}

          {filtered.length === 0 && (
            <p className="text-muted-foreground text-center">
              No results found.
            </p>
          )}
        </div>
      </div>

      {/* Floating CTA */}
      <motion.div
        className="fixed bottom-6 right-6 max-w-sm w-full sm:w-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="p-5 shadow-xl border border-primary/30 bg-gradient-to-r from-primary/90 to-primary rounded-2xl text-white">
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="h-6 w-6" />
            <h3 className="text-lg font-semibold">Still need help?</h3>
          </div>
          <p className="text-sm mb-4 opacity-90">
            Can’t find your answer in the FAQ? Reach out to our support team and
            we’ll assist you right away.
          </p>
          <Button asChild variant="secondary" className="w-full rounded-xl">
            <a href="/contact">Contact Support</a>
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
