import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Detect Scroll for styling changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ];

  // --- SMART NAVIGATION LOGIC ---
  const handleNavClick = (id) => {
    setIsOpen(false); // Close mobile menu if open

    // 1. If we are on the Home Page ('/'), scroll to the section
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } 
    // 2. If we are NOT on Home, navigate to Home + Hash
    else {
      navigate(`/#${id}`);
      // Optional: Add a timeout to scroll after navigation if pure hash doesn't catch
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
          ? "bg-white/90 backdrop-blur-lg border-b border-slate-200 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8">
        
        {/* LOGO */}
        <div 
            onClick={() => handleNavClick("home")} 
            className="cursor-pointer group flex items-center gap-1"
        >
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:rotate-12 transition-transform">
            A
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            Anubhaw<span className="text-teal-500">.</span>
          </span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(link.id)}
              className="relative text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors group"
            >
              {link.name}
              {/* Hover Underline Animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          
          <div className="w-px h-6 bg-slate-200 mx-2"></div>

          <Link
            to="/hire"
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-600 transition-all shadow-lg shadow-slate-900/20 hover:shadow-teal-600/20 hover:-translate-y-0.5"
          >
            Hire Me <ArrowRight size={16} />
          </Link>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2 text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left text-lg font-medium text-slate-600 hover:text-teal-600 hover:pl-2 transition-all border-l-2 border-transparent hover:border-teal-500 pl-0"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/hire"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition"
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