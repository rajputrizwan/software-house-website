"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Info,
  Briefcase,
  Layers,
  Users,
  FileText,
  HelpCircle,
  Tag,
  Phone,
  ChevronDown,
} from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

/**
 * Tailwind-only, accessible Navbar
 * - Uses next/link for client navigation
 * - Highlights active page (exact or prefix match, e.g. /blog -> /blog/post)
 * - Sticky background when scrolling
 * - Desktop dropdown + mobile menu (close on outside click / Esc)
 * - No custom CSS (only Tailwind utilities)
 */
export default function Navbar() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false); // mobile
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownRef = useRef(null);

  // Define your nav (use lowercase route names for consistency)
  const navItems = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4 mr-2" /> },
    {
      href: "/about",
      label: "About Us",
      icon: <Info className="w-4 h-4 mr-2" />,
    },
    {
      href: "/services",
      label: "Services",
      icon: <Briefcase className="w-4 h-4 mr-2" />,
    },
    // {
    //   href: "/portfolio",
    //   label: "Portfolio",
    //   icon: <Layers className="w-4 h-4 mr-2" />,
    // },
    {
      href: "/contact",
      label: "Contact",
      icon: <Phone className="w-4 h-4 mr-2" />,
    },
  ];

  const moreItems = [
    {
      href: "/careers",
      label: "Careers",
      icon: <Users className="w-4 h-4 mr-2" />,
    },
    {
      href: "/blog",
      label: "Blog",
      icon: <FileText className="w-4 h-4 mr-2" />,
    },
    {
      href: "/testimonials",
      label: "Testimonials",
      icon: <Users className="w-4 h-4 mr-2" />,
    },
    {
      href: "/faq",
      label: "FAQ",
      icon: <HelpCircle className="w-4 h-4 mr-2" />,
    },
    {
      href: "/services",
      label: "Pricing",
      icon: <Briefcase className="w-4 h-4 mr-2" />,
    },
  ];

  // Normalize path (remove trailing slash except root)
  const normalize = (p) => {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  };
  const currentPath = normalize(pathname);

  // Active if exact match or if current path is a sub-route of href (e.g. /blog/post -> /blog)
  const isActive = (href) => {
    const h = normalize(href);
    if (h === "/") return currentPath === "/";
    return currentPath === h || currentPath.startsWith(h + "/");
  };

  // Sticky background on scroll
  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // close both menus when navigating (attached to Link onClick)
  const handleNavClick = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-colors duration-200 ${
        isSticky
          ? "bg-white dark:bg-gray-900 shadow"
          : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md"
      }`}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="container mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={handleNavClick}
          className="font-bold text-lg md:text-xl flex items-center gap-2"
        >
          <span className="text-blue-600">Esc</span>Stack
          <span className="relative">
            <span className="absolute -top-1 -right-3 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-3 w-2 h-2 bg-blue-600 rounded-full" />
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center px-2 py-1 transition-colors duration-150 ${
                  isActive(item.href)
                    ? "text-black dark:text-white font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>

              {/* underline animation (Tailwind only) */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300 ${
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </li>
          ))}

          {/* Dropdown (More) */}
          <li className="relative cursor-pointer" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((s) => !s)}
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              className="flex items-center px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white gap-1 cursor-pointer"
            >
              More
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <ul
                role="menu"
                className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
              >
                {moreItems.map((item) => (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      onClick={handleNavClick}
                      role="menuitem"
                      className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                        isActive(item.href)
                          ? "text-black dark:text-white font-semibold bg-gray-100 dark:bg-gray-700"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Dark mode toggle */}
          <li>
            <DarkModeToggle />
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={() => setIsOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="flex flex-col gap-1.5 p-1 focus:outline-none"
          >
            <span
              className={`block h-0.5 w-6 bg-black dark:bg-white transform transition ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black dark:bg-white transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black dark:bg-white transform transition ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-lg z-40">
            <ul className="flex flex-col py-4 px-4 gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive(item.href)
                        ? "text-black dark:text-white font-semibold bg-gray-100 dark:bg-gray-800"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}

              <li className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col gap-1">
                  {moreItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavClick}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        isActive(item.href)
                          ? "text-black dark:text-white font-semibold bg-gray-100 dark:bg-gray-800"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
