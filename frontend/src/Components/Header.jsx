import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sun, Moon, Code2, Sparkles } from "lucide-react";
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

    const id = typeof link === "string" ? link : link.id;
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
          ? "py-3 bg-[#050315]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
        
        {/* 3D GLOWING LOGO */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="cursor-pointer group flex items-center gap-3 select-none"
        >
          <div className="relative">
            {/* Glow Aura */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#433bff] to-[#38bdf8] opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-300" />
            
            {/* 3D Box */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-[#0f172a] via-[#0b0f19] to-[#1e1b4b] border border-[#38bdf8]/40 rounded-xl flex items-center justify-center text-white font-extrabold text-xl group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-xl">
              <Code2 className="w-5 h-5 text-[#38bdf8] group-hover:text-white transition-colors" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tight flex items-center gap-1 group-hover:text-[#38bdf8] transition-colors">
              Anubhaw
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#433bff] animate-pulse" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium -mt-1 group-hover:text-slate-200 transition-colors">
              Portfolio
            </span>
          </div>
        </div>

        {/* DESKTOP NAVIGATION DOCK */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0b0f19]/80 backdrop-blur-xl border border-slate-800/90 px-3 py-1.5 rounded-full shadow-2xl shadow-indigo-950/30">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={i}
                onClick={() => handleNavClick(link)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                  isActive 
                    ? "text-white font-semibold" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbarActiveIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#433bff]/80 via-[#38bdf8]/60 to-[#433bff]/80 border border-[#38bdf8]/50 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.name}
                  {link.name === "Blog" && (
                    <Sparkles className="w-3 h-3 text-[#38bdf8] animate-spin-slow" />
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS: THEME TOGGLE & HIRE BUTTON */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full text-slate-300 hover:text-white bg-[#0b0f19]/80 border border-slate-800/80 hover:border-[#38bdf8]/50 hover:shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all duration-300"
          >
            {theme === "dark" ? (
              <Moon size={18} className="text-[#38bdf8]" />
            ) : (
              <Sun size={18} className="text-amber-400" />
            )}
          </button>

          {/* Glowing CTA Button */}
          <Link
            to="/hire"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#433bff] via-[#38bdf8] to-[#433bff] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-lg shadow-[#433bff]/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Hire Me</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 text-slate-200 bg-[#0b0f19]/80 border border-slate-800 rounded-lg hover:border-[#38bdf8]/40 transition"
          >
            {theme === "dark" ? <Moon size={20} className="text-[#38bdf8]" /> : <Sun size={20} className="text-amber-400" />}
          </button>

          <button
            aria-label="Open Menu"
            className="p-2 text-slate-200 bg-[#0b0f19]/80 border border-slate-800 rounded-lg hover:border-[#38bdf8]/40 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} className="text-[#38bdf8]" /> : <Menu size={24} />}
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
            className="md:hidden bg-[#050315]/95 backdrop-blur-2xl border-b border-slate-800/80 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-3">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={i}
                    onClick={() => handleNavClick(link)}
                    className={`text-left text-base font-semibold transition-all px-4 py-3 rounded-xl flex items-center justify-between ${
                      isActive
                        ? "text-white bg-gradient-to-r from-[#433bff]/30 to-[#38bdf8]/20 border border-[#38bdf8]/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                    )}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-slate-800/80">
                <Link
                  to="/hire"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#433bff] to-[#38bdf8] text-white py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition"
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