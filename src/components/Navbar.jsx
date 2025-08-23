"use client";
import { useState, useEffect, useRef } from "react";
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [activeSection, setActiveSection] = useState("home");
  const [isSticky, setIsSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { id: "home", label: "Home", icon: <Home className="w-4 h-4 mr-1" /> },
    { id: "about", label: "About Us", icon: <Info className="w-4 h-4 mr-1" /> },
    {
      id: "services",
      label: "Services",
      icon: <Briefcase className="w-4 h-4 mr-1" />,
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: <Layers className="w-4 h-4 mr-1" />,
    },
    {
      id: "contact",
      label: "Contact",
      icon: <Phone className="w-4 h-4 mr-1" />,
    },
  ];

  const moreItems = [
    {
      id: "careers",
      label: "Careers",
      icon: <Users className="w-4 h-4 mr-1" />,
    },
    { id: "blog", label: "Blog", icon: <FileText className="w-4 h-4 mr-1" /> },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <Users className="w-4 h-4 mr-1" />,
    },
    { id: "faq", label: "FAQ", icon: <HelpCircle className="w-4 h-4 mr-1" /> },
    { id: "pricing", label: "Pricing", icon: <Tag className="w-4 h-4 mr-1" /> },
  ];

  const toggleNav = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown & mobile menu on outside click or Esc key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setIsOpen(false); // closes mobile menu too
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all ${
        isSticky
          ? "bg-white dark:bg-gray-900 shadow-lg"
          : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo with pulsing circle */}
        <a
          href="#home"
          className="font-bold text-lg md:text-xl relative flex items-center"
        >
          <span className="text-blue-600">Esc</span>Tech
          <span className="absolute -top-1 -right-3 w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-3 w-2 h-2 bg-blue-600 rounded-full"></span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 items-center relative">
          {navItems.map((item) => (
            <li key={item.id} className="group relative">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, `#${item.id}`)}
                className={`relative flex items-center px-2 transition-colors duration-200
                  ${
                    activeSection === item.id
                      ? "text-black dark:text-white font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  }`}
              >
                {item.icon}
                {item.label}
              </a>
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300
                  ${
                    activeSection === item.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
              />
            </li>
          ))}

          {/* Dropdown Menu */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center px-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              More{" "}
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50">
                {moreItems.map((item) => (
                  <li key={item.id} className="group relative">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleScrollTo(e, `#${item.id}`)}
                      className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                    <span className="absolute left-4 bottom-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-[80%]" />
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <DarkModeToggle />
          </li>
        </ul>

        {/* Mobile Burger */}
        <button
          onClick={toggleNav}
          className="md:hidden flex flex-col space-y-1.5 focus:outline-none"
        >
          <span
            className={`h-0.5 w-6 bg-black dark:bg-white transition-all ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-black dark:bg-white transition-all ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-black dark:bg-white transition-all ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
            {navItems.concat(moreItems).map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, `#${item.id}`)}
                  className={`flex items-center px-2 transition-colors duration-200
                    ${
                      activeSection === item.id
                        ? "text-black dark:text-white font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`}
                >
                  {item.icon}
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <DarkModeToggle />
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
