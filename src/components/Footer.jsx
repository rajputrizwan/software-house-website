"use client";
import Link from "next/link";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            EscTech<span className="text-blue-500">•</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            Innovating technology solutions for businesses worldwide.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link href="#" className="hover:text-blue-500 transition-colors">
              <FaTwitter size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">
              <FaLinkedin size={20} />
            </Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">
              <FaGithub size={20} />
            </Link>
            <Link href="#" className="hover:text-pink-500 transition-colors">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FaCube /> Solutions
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="#">AI & Automation</Link>
            </li>
            <li>
              <Link href="#">Cloud Hosting</Link>
            </li>
            <li>
              <Link href="#">Data Analytics</Link>
            </li>
            <li>
              <Link href="#">Cybersecurity</Link>
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
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Newsroom</Link>
            </li>
            <li>
              <Link href="#">History</Link>
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
              <Link href="#">Blog</Link>
            </li>
            <li>
              <Link href="#">Case Studies</Link>
            </li>
            <li>
              <Link href="#">Documentation</Link>
            </li>
            <li>
              <Link href="#">Support</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EscTech. All rights reserved.
      </div>
    </footer>
  );
}
