"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { motion, useInView } from "framer-motion";
import {
  FaLightbulb,
  FaHandshake,
  FaGlobe,
  FaBullseye,
  FaRocket,
  FaBriefcase,
  FaLaugh,
  FaTrophy,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaBehance,
  FaDribbble,
  FaInstagram,
  FaMedium,
  FaEnvelope,
  FaChevronDown,
  FaUsers,
  FaProjectDiagram,
  FaFlag,
  FaHeart,
} from "react-icons/fa";

// Simple count-up component without external dependencies
function CountUpAnimation({ end, suffix, duration = 2.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min(
          (timestamp - startTimestamp) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTeamMember, setHoveredTeamMember] = useState(null);

  const sectionRefs = {
    mission: useRef(null),
    team: useRef(null),
    values: useRef(null),
    story: useRef(null),
  };

  useEffect(() => {
    setIsVisible(true);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    };

    const observers = Object.values(sectionRefs).map((ref) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          observerCallback,
          observerOptions
        );
        observer.observe(ref.current);
        return observer;
      }
    });

    return () => {
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, []);

  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push boundaries and explore new possibilities to deliver cutting-edge solutions.",
      icon: <FaLightbulb className="text-4xl mb-6 text-amber-400" />,
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "Integrity",
      description:
        "We do what's right, not what's easy. Transparency and honesty guide all our decisions.",
      icon: <FaHandshake className="text-4xl mb-6 text-emerald-400" />,
      color: "from-emerald-400 to-green-500",
    },
    {
      title: "Collaboration",
      description:
        "We believe the best ideas emerge when diverse perspectives work together toward a common goal.",
      icon: <FaGlobe className="text-4xl mb-6 text-cyan-400" />,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Impact",
      description:
        "We measure success by the positive change we create for our clients, community, and world.",
      icon: <FaBullseye className="text-4xl mb-6 text-violet-400" />,
      color: "from-violet-400 to-purple-500",
    },
  ];

  const milestones = [
    {
      year: "2015",
      event: "Company founded with a vision to revolutionize the industry",
      icon: <FaRocket className="text-xl mr-2 text-blue-500" />,
    },
    {
      year: "2017",
      event: "Secured Series A funding and expanded to international markets",
      icon: <FaBriefcase className="text-xl mr-2 text-green-500" />,
    },
    {
      year: "2019",
      event: "Launched flagship product to critical acclaim",
      icon: <FaLaugh className="text-xl mr-2 text-yellow-500" />,
    },
    {
      year: "2021",
      event: "Reached 1 million happy customers worldwide",
      icon: <FaGlobe className="text-xl mr-2 text-cyan-500" />,
    },
    {
      year: "2023",
      event: "Recognized as industry leader with multiple awards",
      icon: <FaTrophy className="text-xl mr-2 text-amber-500" />,
    },
  ];

  // Animation variants
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
        duration: 0.5,
      },
    },
  };

  const socialIcons = {
    linkedin: <FaLinkedin className="text-lg" />,
    twitter: <FaTwitter className="text-lg" />,
    github: <FaGithub className="text-lg" />,
    behance: <FaBehance className="text-lg" />,
    dribbble: <FaDribbble className="text-lg" />,
    instagram: <FaInstagram className="text-lg" />,
    medium: <FaMedium className="text-lg" />,
    email: <FaEnvelope className="text-lg" />,
  };

  return (
    <div
      className={`min-h-screen transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Head>
        <title>About Us | Our Story, Team & Mission</title>
        <meta
          name="description"
          content="Learn about our company's mission, values, and the talented team behind our success."
        />
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow dark:opacity-10"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow dark:opacity-10"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-background.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
        </div>

        <motion.div
          className="absolute inset-0 opacity-30"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(120, 119, 216, 0.3) 0%, transparent 40%),
                              radial-gradient(circle at 80% 70%, rgba(253, 203, 110, 0.3) 0%, transparent 40%)`,
            backgroundSize: "50% 50%",
          }}
        ></motion.div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We Create The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Future
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Dedicated to innovation, excellence, and making a positive impact
            through technology and design.
          </motion.p>
          <Link href="/stories" passHref>
            <motion.button
              className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Stories
            </motion.button>
          </Link>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section
        ref={sectionRefs.mission}
        className="py-20 px-4 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Our Mission
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Empowering innovation through technology
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We believe technology should be a force for good, solving
                real-world problems and creating opportunities for everyone. Our
                mission is to build products that are not only powerful and
                innovative but also accessible and user-friendly.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Through relentless focus on quality, sustainability, and ethical
                practices, we aim to set new standards in our industry while
                making a positive impact on the world around us.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="rounded-2xl overflow-hidden aspect-video shadow-xl transform transition-transform duration-500 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/future-visualization.jpg')",
                  }}
                ></div>
                <motion.div
                  className="absolute top-4 left-4 w-6 h-6 rounded-full bg-gradient-to-r from-blue-700/80 to-purple-700/80"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-700/80 to-purple-700/80"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        ref={sectionRefs.story}
        className="py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="relative">
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:flex-row items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="md:w-1/4 mb-4 md:mb-0 flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold py-2 px-4 rounded-full inline-flex items-center">
                      {milestone.icon}
                      {milestone.year}
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <motion.div
                      className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500 dark:border-blue-400"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <p className="text-lg text-gray-800 dark:text-gray-200">
                        {milestone.event}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="absolute left-4 md:left-1/4 md:transform md:-translate-x-2 top-0 bottom-0 w-1 bg-blue-200 dark:bg-blue-800 -z-10 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={sectionRefs.team}
        className="py-20 px-4 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Diverse talents united by a common passion for innovation and
              excellence
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4"></div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                id: 1,
                name: "Ayaz Hussain",
                role: "Founder & CEO",
                bio: "Visionary leader driving innovation and strategic growth for the company.",
                social: {
                  linkedin: "https://www.linkedin.com/in/ayaz-hussain-cs/",
                  github: "https://github.com/ayaz7964",
                },
                image: "/ayaz.png",
              },
              {
                id: 2,
                name: "Muhammad Rizwan Rajput",
                role: "Co-Founder & CTO",
                bio: "Technology architect passionate about scalable systems and AI-driven products.",
                social: {
                  linkedin: "https://www.linkedin.com/in/rajput-rizwan/",
                  github: "https://github.com/rajputrizwan",
                },
                image: "/rizwan.png",
              },
              {
                id: 3,
                name: "Muhammad Tayyab Bhutto",
                role: "Co-Founder & CPO",
                bio: "Creative mind shaping intuitive user experiences and visionary product design.",
                social: {
                  linkedin:
                    "https://www.linkedin.com/in/muhammad-tayyab-bhutto/",
                  github: "https://github.com/Muhammad-Tayyab-Bhutto",
                },
                image: "/meer.png",
              },
              {
                id: 4,
                name: "Meer Khalil",
                role: "Co-Founder & Chief AI Officer",
                bio: "AI strategist leading intelligent automation and ethical model deployment.",
                social: {
                  linkedin: "https://www.linkedin.com/in/meer-khalil/",
                  github: "https://github.com/meer-khalil",
                },
                image: "/khalil.png",
              },
            ].map((member) => (
              <motion.div
                key={member.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl relative group"
                variants={itemVariants}
                onHoverStart={() => setHoveredTeamMember(member.id)}
                onHoverEnd={() => setHoveredTeamMember(null)}
                whileHover={{ y: -10 }}
              >
                <div className="h-60 relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold">
                        {member.name}
                      </h3>
                      <p className="text-blue-200">{member.role}</p>
                    </div>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="flex space-x-4">
                      {Object.entries(member.social).map(([platform, url]) => (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm"
                          whileHover={{
                            scale: 1.2,
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          }}
                          whileTap={{ scale: 0.9 }}
                          title={platform}
                        >
                          {socialIcons[platform]}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={sectionRefs.values}
        className="py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Count-up Animation */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                number: 50,
                suffix: "+",
                label: "Team Members",
                icon: <FaUsers className="text-3xl mb-4 mx-auto" />,
              },
              {
                number: 200,
                suffix: "+",
                label: "Projects Completed",
                icon: <FaProjectDiagram className="text-3xl mb-4 mx-auto" />,
              },
              {
                number: 15,
                suffix: "+",
                label: "Countries",
                icon: <FaFlag className="text-3xl mb-4 mx-auto" />,
              },
              {
                number: 98,
                suffix: "%",
                label: "Client Satisfaction",
                icon: <FaHeart className="text-3xl mb-4 mx-auto" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                {stat.icon}
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <CountUpAnimation
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Create Something Amazing Together?
          </motion.h2>

          <motion.p
            className="text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's discuss how we can help you achieve your goals and bring your
            vision to life.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/contact" passHref>
              <motion.button
                className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition-all duration-300 shadow-lg flex items-center justify-center mx-auto sm:mx-0 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </Link>

            <Link href="/work" passHref>
              <motion.button
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300 shadow-lg flex items-center justify-center mx-auto sm:mx-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
