"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Briefcase, Rocket } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerHeight = Math.max(300, 600 - scrollY * 0.5); // shrink effect

  const steps = [
    {
      title: "Submit Application",
      desc: "Send us your resume & portfolio.",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      image:
        "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/67528c941b624c573b705539_Submit%20Application-p-500.jpg",
    },
    {
      title: "Expert Evaluation",
      desc: "Our team reviews your skills & experience.",
      icon: <Users className="w-8 h-8 text-green-600" />,
      image:
        " https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/67528c93bb3fdf8af442cc51_Expert%20Evaluation-p-500.jpg",
    },
    {
      title: "Personal Interview",
      desc: "Meet our experts & share your story.",
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
      image:
        " https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/67528c949e24322ef8d4e3d1_Personal%20Interview-p-500.jpg",
    },
    {
      title: "Seamless Onboarding",
      desc: "Start your journey with escStack 🚀",
      icon: <Rocket className="w-8 h-8 text-pink-600" />,
      image:
        " https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/67528c93009c867feedf5fdb_Seamless%20Onboarding-p-500.jpg",
    },
  ];

  const pathways = [
    {
      role: "Associate Software Engineer",
      desc: "Hone your skills with impactful projects.",
      img: "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/67528c93009c867feedf5fdb_Seamless%20Onboarding-p-500.jpg",
    },
    {
      role: "Software Engineer",
      desc: "Deliver innovative solutions with confidence.",
      img: "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/6752957d8f757cda3e4989c0_Software%20Engineer-p-500.jpg",
    },
    {
      role: "Senior Software Engineer",
      desc: "Lead by expertise and technical mastery.",
      img: "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/6752957d193d38902a880e3b_senior%20Software%20Engineer%20-p-500.jpg",
    },
    {
      role: "Associate Team Lead",
      desc: "Mentor peers and manage workflows.",
      img: "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/6752957d3bee2c4c08303f50_Associate%20Team%20Lead-p-500.jpg",
    },
    {
      role: "Team Lead",
      desc: "Drive team success with vision.",
      img: "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/6752957dde323c3f64a82278_Team%20Lead-p-500.jpg",
    },
  ];

  const GlobalCareers = [
    {
      role: "A Truly Global Workforce",
      desc: "From North America to the Middle East and APAC, our engineers and innovators span the globe.",
      img: "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/6752957e54fb8217d7fafab1_Associate%20Software%20Engineer-p-500.jpg",
    },
    {
      role: "Diverse Perspectives",
      desc: "Our team’s varied cultural and professional backgrounds drive creativity and innovation.",
      img: "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/67529cdfdcb72e866453650c_Diverse%20Perspectives-p-500.jpg",
    },
    {
      role: "Seamless Collaboration",
      desc: "Leveraging cutting-edge tools and a unified vision, we overcome borders to deliver excellence.",
      img: "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/67529ce01b624c573b7f6ca1_Seamless%20Collaboration-p-500.jpg",
    },
    {
      role: "Opportunities Without Limits",
      desc: "No matter where you are, escStack offers roles that let you contribute and grow globally.",
      img: "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/67529cdf233bbfdb12eadfa9_Opportunities%20Without%20Limits-p-500.jpg",
    },
  ];

  const culturalImages = [
    "https://images.unsplash.com/photo-1595152772835-219674b2a8a0",
    "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5",
    "https://images.unsplash.com/photo-1526403229177-77dd5200e6c8",
    "https://media.istockphoto.com/id/1363627613/photo/multiracial-group-of-young-friends-bonding-outdoors.webp?a=1&b=1&s=612x612&w=0&k=20&c=BhCjKy55MkViSTYaB_ormQkz32IINj4p7K9DMR4BHuE=",
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88",
    "https://images.unsplash.com/photo-1551434678-21f438bdc338",
    "https://images.unsplash.com/photo-1515204237801-2e0a7d2bb1cf",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    "https://images.unsplash.com/photo-1587620931287-584f3c89c6c2",
    "https://images.unsplash.com/photo-1590650046871-72f53ce9c6e1",
  ];

  const InfiniteScrollRow = ({ images, direction = "left", speed = 0.5 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      let scroll = direction === "left" ? speed : -speed;
      let animationId;

      const animate = () => {
        container.scrollLeft += scroll;

        if (
          direction === "left" &&
          container.scrollLeft >= container.scrollWidth / 2
        ) {
          container.scrollLeft = 0;
        } else if (direction === "right" && container.scrollLeft <= 0) {
          container.scrollLeft = container.scrollWidth / 2;
        }

        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationId);
    }, [direction, speed]);

    const scrollImages = direction === "right" ? [...images].reverse() : images;

    return (
      <div className="overflow-hidden w-full">
        <div
          ref={containerRef}
          className="flex gap-4 w-max"
          style={{ scrollBehavior: "auto" }} // prevent conflict
        >
          {[...scrollImages, ...scrollImages].map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`culture-${idx}`}
              className="h-64 w-auto rounded-xl object-cover flex-shrink-0 hover:grayscale transition duration-300"
            />
          ))}
        </div>
      </div>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const benefits = [
    {
      title: "Fuel Allowance",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Outpatient (OPD) & Inpatient (IPD) Benefits",
      image:
        "https://images.unsplash.com/photo-1588776814546-76e7e0db0f03?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Workation Opportunities",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "World-Class Gyms",
      image:
        "https://images.unsplash.com/photo-1554284126-18ec4dbe2a8b?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Exclusive Salons",
      image:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Work from Home Options",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Paid Leaves",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Skill Development Programs",
      image:
        "https://images.unsplash.com/photo-1518081461907-6b896f96e39d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Performance Bonuses",
      image:
        "https://images.unsplash.com/photo-1526378720394-51b56c8a3a38?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Tech Allowances",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Diverse Work Culture",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Health and Wellness Programs",
      image:
        "https://images.unsplash.com/photo-1556910103-1db64c9f0f9f?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Header */}
      <motion.header
        className="relative flex items-center justify-center text-center text-white dark:text-white"
        style={{ height: headerHeight }}
      >
        <img
          src="https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/675285d33bee2c4c0822e50a_Careers%20hero%20banner%20-p-2000.avif"
          alt="escStack Careers"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Careers</h1>
          <h2 className="text-xl md:text-2xl mb-4">
            Where People Drive Innovation
          </h2>
          <p className="mb-6">
            We’re more than a workplace—we’re a people-first community that
            grows stronger together.
          </p>
          <Link
            href="/jobs"
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-xl"
          >
            Apply at escStack
          </Link>
        </motion.div>
      </motion.header>

      {/* Path to Joining escStack */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Your Path to Joining <span className="text-blue-600">escStack</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 h-full flex flex-col items-center text-center hover:shadow-xl transition">
                  <div className="mb-4">{s.icon}</div>
                  <h2 className="text-lg font-semibold mb-2">{s.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {s.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Pathways */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-full mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Career Pathways</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 text-2xl">
            Your Growth, Our Priority. At escStack, we provide a clear and
            rewarding path to help you achieve your professional aspirations.
          </p>

          <div className="grid md:grid-cols-5 gap-8">
            {pathways.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              >
                {/* Background Image */}
                <img
                  src={p.img}
                  alt={p.role}
                  className="w-full h-64 brightness-70 group-hover:brightness-60 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Role Title */}
                <div className="absolute top-4 text-center w-full ">
                  <h2 className="text-2xl font-bold text-white px-4 py-2 rounded-lg shadow-lg">
                    {p.role}
                  </h2>
                </div>

                {/* Description */}
                <p
                  className="absolute top-24 px-2 py-7 rounded-lg shadow-lg 
               text-white text-center text-sm font-bold 
               opacity-0 transform translate-y-4 
               group-hover:opacity-100 group-hover:translate-y-0 
               transition duration-300"
                >
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Opportunities */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Explore Opportunities</h2>
        <p className="mb-6">Ready to grow with escStack? 🚀</p>
        <Link
          href="/jobs"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-semibold"
        >
          View Open Positions
        </Link>
      </section>

      {/* 🌍 Global Careers */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Global Careers
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
            Connecting Talent Across the World
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-4xl text-base sm:text-lg lg:text-2xl mx-auto mb-12 mt-4">
            At escStack, we take pride in our global presence, bringing together
            talented individuals from diverse cultures and regions to create
            impactful solutions. Here’s what makes our global team exceptional.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {GlobalCareers.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              >
                {/* Background Image */}
                <img
                  src={p.img}
                  alt={p.role}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover brightness-75 group-hover:brightness-60 group-hover:scale-110 transition-transform duration-700"
                />

                {/* Role Title */}
                <div className="absolute top-4 text-center w-full">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white px-2 py-1 rounded-lg shadow-lg">
                    {p.role}
                  </h2>
                </div>

                {/* Description (hover effect) */}
                <p className="text-white text-sm sm:text-base md:text-lg font-semibold px-4 py-2 rounded-lg shadow-lg absolute top-24 text-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition duration-300">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎉 Culture & Lifestyle */}
      <section className="py-20 bg-black dark:bg-gray-800 text-white">
        <div className="text-center mb-10 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Culture & Lifestyle
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 mt-2 max-w-3xl mx-auto">
            Experience a vibrant work culture that celebrates creativity,
            collaboration, and milestones through unforgettable moments.
          </p>
        </div>

        <div className="space-y-6">
          {/* Top row: Left to Right */}
          <InfiniteScrollRow images={culturalImages} direction="left" />

          {/* Bottom row: Right to Left */}
          <InfiniteScrollRow images={culturalImages} direction="right" />
        </div>
      </section>

      {/* 🎯 Benefits Section */}
      <section className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center gap-10 bg-black dark:bg-gray-900 text-white shadow-lg">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h5 className="text-xs sm:text-sm uppercase font-semibold tracking-widest mb-2 text-blue-400">
            Benefits
          </h5>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 bg-blue-700 inline-block px-4 py-1 rounded">
            Why Join Us: Unlock Growth, Impact, and Opportunities
          </h2>

          <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg font-light leading-relaxed">
            {benefits.map((benefit, idx) => (
              <li
                key={idx}
                className={`cursor-pointer hover:text-blue-400 transition-colors duration-300 ${
                  activeIndex === idx ? "text-blue-300 font-semibold" : ""
                }`}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                tabIndex={0}
                aria-label={`Benefit: ${benefit.title}`}
              >
                {benefit.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="flex-1 max-w-md rounded-lg overflow-hidden shadow-lg border-4 border-blue-600">
          <img
            src={benefits[activeIndex].image}
            alt={benefits[activeIndex].title}
            className="w-full h-64 sm:h-80 object-cover transition-opacity duration-500"
            key={benefits[activeIndex].image} // Force img reload on change
          />
        </div>
      </section>
    </div>
  );
}
