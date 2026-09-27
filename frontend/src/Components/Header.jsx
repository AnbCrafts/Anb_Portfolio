import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/themeContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Blog", id: "blogs", isRoute: true },
    { name: "Contact", id: "contact" },
  ];

  // Detect Scroll for styling changes & Active section scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === "/") {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Top of page -> force Home active
        if (scrollY < 120) {
          setActiveSection("home");
          return;
        }

        // Bottom of page -> force Contact active
        if (windowHeight + scrollY >= documentHeight - 60) {
          setActiveSection("contact");
          return;
        }

        // Evaluate sections top-to-bottom
        const scrollPosition = scrollY + 220;
        let matchedSection = "home";

        for (let i = 0; i < navLinks.length; i++) {
          if (navLinks[i].isRoute) continue;
          const section = document.getElementById(navLinks[i].id);
          if (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              matchedSection = navLinks[i].id;
              break;
            }
          }
        }
        setActiveSection(matchedSection);
      } else if (location.pathname.startsWith("/blogs") || location.pathname.startsWith("/blog")) {
        setActiveSection("blogs");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Sync active section on hash change
  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace("#", "");
      if (navLinks.some((l) => l.id === hashId)) {
        setActiveSection(hashId);
      }
    }
  }, [location.hash]);

  // --- SMART NAVIGATION LOGIC ---
  const handleNavClick = (link) => {
    setIsOpen(false); // Close mobile menu if open

    if (link.isRoute) {
      setActiveSection(link.id);
      navigate(`/${link.id}`);
      return;
    }

    const id = link.id || link;
    setActiveSection(id);

    // 1. If we are on the Home Page ('/'), scroll to the section
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${id}`);
      }
    } 
    // 2. If we are NOT on Home, navigate to Home + Hash
    else {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
        
        {/* LOGO */}
        <div 
            onClick={() => handleNavClick("home")} 
            className="cursor-pointer group flex items-center gap-1"
        >
          <div className="w-8 h-8 bg-slate-900 dark:bg-teal-500 rounded-lg flex items-center justify-center text-white dark:text-slate-950 font-bold text-lg group-hover:rotate-12 transition-transform">
            A
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
            Anubhaw<span className="text-teal-500">.</span>
          </span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={i}
                onClick={() => handleNavClick(link)}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive ? "text-teal-600 dark:text-teal-400 font-semibold" : "text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                }`}
              >
                {link.name}
                {isActive ? (
                  <motion.span
                    layoutId="navbarActiveIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600/40 dark:bg-teal-400/40 transition-all duration-300 hover:w-full" />
                )}
              </button>
            );
          })}
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>

          <Link
            to="/hire"
            className="flex items-center gap-2 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-600 dark:hover:bg-teal-400 transition-all shadow-lg shadow-slate-900/20 dark:shadow-teal-500/20 hover:-translate-y-0.5"
          >
            Hire Me <ArrowRight size={16} />
          </Link>
        </nav>

        {/* MOBILE MENU & THEME TOGGLE */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {theme === "dark" ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>

          <button
            className="p-2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={i}
                    onClick={() => handleNavClick(link)}
                    className={`text-left text-lg font-medium transition-all border-l-2 pl-3 ${
                      isActive
                        ? "text-teal-600 dark:text-teal-400 font-bold border-teal-500 bg-teal-50/50 dark:bg-teal-950/30 py-1 rounded-r-lg"
                        : "text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 border-transparent hover:border-teal-500"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to="/hire"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 py-3 rounded-xl font-bold hover:bg-teal-600 dark:hover:bg-teal-400 transition"
                >
                  Hire Me Now <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}