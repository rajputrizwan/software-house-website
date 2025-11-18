// pages/testimonials.jsx (or app/testimonials/page.jsx)

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import TestimonialsSection from "./_components/TestimonialSection";

export default function TestimonialsPage() {
  return (
    <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-start">
      {/* Company Worthiness Section */}
      <div className="w-full max-w-5xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Why Choose <span className="text-blue-600">escStack</span>?
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          At <span className="font-semibold text-blue-600">escStack</span>, we
          don’t just build software — we create reliable, scalable, and
          future-ready solutions. Trusted by startups and enterprises alike, our
          mission is to empower businesses with cutting-edge technology.
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-blue-600">
              🚀 Proven Expertise
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Our team specializes in modern stacks like Next.js, React, Node,
              and AI-powered solutions to give your business a competitive edge.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-blue-600">
              🤝 Client-Centric Approach
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              We believe in long-term partnerships, focusing on transparency,
              clear communication, and measurable results.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-blue-600">
              🌍 Global Trust
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Businesses worldwide trust{" "}
              <span className="font-medium">escStack</span> for delivering
              high-quality, secure, and scalable digital solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        What Our Users Say
      </h2>

      {/* Grid Section */}
      <div className="w-full max-w-6xl px-4 mb-12">
        <TestimonialsSection />
      </div>

      {/* Animated Testimonials */}
      <div className="w-full">
        <AnimatedTestimonials
          data={[
            {
              description:
                "escStack completely transformed how we build products. The process was smooth, the team is highly skilled, and the results exceeded expectations.",
              image:
                "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2070&auto=format&fit=crop",
              name: "Isabelle Carlos",
              handle: "@isabellecarlos",
            },
            {
              description:
                "Working with escStack made our project feel effortless. The team understood our vision and delivered a professional, scalable product.",
              image:
                "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?q=80&w=2070&auto=format&fit=crop",
              name: "Lana Akash",
              handle: "@lanaakash",
            },
            {
              description:
                "The smooth development process and expert guidance from escStack saved us months of time. We’ll definitely partner with them again.",
              image:
                "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2070&auto=format&fit=crop",
              name: "Liam O’Connor",
              handle: "@liamoc",
            },
          ]}
        />
      </div>
    </section>
  );
}
