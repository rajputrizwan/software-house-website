"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, X } from "lucide-react";

const CalendlyEmbedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-4 w-full max-w-4xl h-[80vh]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Schedule a Call
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="h-full">
          <iframe
            src="https://calendly.com/escstack/30min?embed_domain=youwebsite.com&embed_type=Inline"
            width="100%"
            height="100%"
            frameBorder="0"
            className="rounded-lg"
          />
        </div>
      </motion.div>
    </div>
  );
};

// Usage in ContactPage
export default function ContactPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <>
      {/* Your existing contact methods */}

      <motion.div
        variants={itemVariants}
        whileHover={{ y: -5 }}
        onClick={() => setIsCalendlyOpen(true)}
        className="cursor-pointer"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group rounded-xl p-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full mr-4 bg-red-100 dark:bg-red-900/30 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Schedule a Call
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Book a meeting with our team
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Choose from available slots
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <CalendlyEmbedModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </>
  );
}
