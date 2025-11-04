"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaBehance,
  FaCube,
  FaDollarSign,
  FaProjectDiagram,
  FaRocket,
  FaInfoCircle,
  FaBriefcase,
  FaNewspaper,
  FaHistory,
  FaRegLightbulb,
  FaRss,
  FaChartBar,
  FaRobot,
  FaUserFriends,
  FaShieldAlt,
  FaGavel,
} from "react-icons/fa";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-blue-500 transition-colors"
          >
            EscTech<span className="text-blue-500">•</span>
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            Innovating technology solutions for businesses worldwide.
          </p>

          {/* Social Links with Animation */}
          <motion.div variants={itemVariants} className="pt-6">
            <h3 className="font-semibold text-white mb-4">
              Follow Our Journey
            </h3>
            <div className="flex space-x-4">
              {[
                {
                  icon: FaLinkedin,
                  color: "bg-blue-600",
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/escstack",
                },
                {
                  icon: FaTwitter,
                  color: "bg-sky-500",
                  label: "Twitter",
                  href: "https://x.com/EscStack",
                },
                {
                  icon: FaGithub,
                  color: "bg-gray-800",
                  label: "GitHub",
                  href: "https://github.com/escstack",
                },
                {
                  icon: FaBehance,
                  color: "bg-blue-700",
                  label: "Behance",
                  href: "https://www.behance.net/escstack",
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
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FaCube /> Solutions
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/solutions/ai-automation"
                className="hover:text-blue-500 transition-colors"
              >
                AI & Automation
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/cloud-hosting"
                className="hover:text-blue-500 transition-colors"
              >
                Cloud Hosting
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/data-analytics"
                className="hover:text-blue-500 transition-colors"
              >
                Data Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/solutions/cybersecurity"
                className="hover:text-blue-500 transition-colors"
              >
                Cybersecurity
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FaBriefcase /> Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-blue-500 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="hover:text-blue-500 transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/newsroom"
                className="hover:text-blue-500 transition-colors"
              >
                Newsroom
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="hover:text-blue-500 transition-colors"
              >
                History
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FaInfoCircle /> Resources
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/blog"
                className="hover:text-blue-500 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/case-studies"
                className="hover:text-blue-500 transition-colors"
              >
                Case Studies
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="hover:text-blue-500 transition-colors"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="hover:text-blue-500 transition-colors"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EscStack. All rights reserved.
        <div className="mt-2 flex justify-center space-x-6 text-xs">
          <Link
            href="/privacy"
            className="hover:text-blue-500 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-500 transition-colors">
            Terms of Service
          </Link>
          <Link
            href="/cookies"
            className="hover:text-blue-500 transition-colors"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
