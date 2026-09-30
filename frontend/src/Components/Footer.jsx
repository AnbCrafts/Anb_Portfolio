import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer3DCanvas from "./Footer3DCanvas";
import GlowBadge from "./GlowBadge";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (id) => {
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${id}`);
      }
    } else {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/AnbCrafts", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Mail size={20} />, href: "mailto:anubhawg.cse.jisu22@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative w-full bg-[#050315] text-[#fbfbfe] pt-20 pb-10 border-t border-slate-800/80 overflow-hidden">
      
      {/* 3D INTERACTIVE PARTICLE LANDSCAPE WAVE CANVAS */}
      <Footer3DCanvas />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* TOP SECTION: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          
          {/* COLUMN 1: Brand & Bio */}
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold text-[#fbfbfe] tracking-tight">
              Anubhaw<span className="text-[#38bdf8]">.</span>
            </h3>
            <p className="text-[#dedcff]/80 leading-relaxed max-w-xs text-sm">
              Crafting scalable digital experiences with clean code and user-centric 3D engineering.
            </p>
            <div className="pt-2">
              <GlowBadge variant="emerald">
                <span className="relative flex h-2 w-2 mr-1 inline-block align-middle">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
                </span>
                OPEN TO NEW OPPORTUNITIES
              </GlowBadge>
            </div>
          </div>

          {/* COLUMN 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-[#38bdf8] uppercase tracking-wider mb-5">Navigation</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-[#dedcff]/80 hover:text-[#38bdf8] transition-colors inline-block text-left cursor-pointer font-medium"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Socials & Action */}
          <div>
            <h4 className="text-sm font-bold text-[#38bdf8] uppercase tracking-wider mb-5">Connect</h4>
            <p className="text-sm text-[#dedcff]/80 mb-5">
              Feel free to reach out if you want to collaborate on a project.
            </p>
            
            {/* Horizontal Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  className="p-3 bg-[#0b0f19]/90 rounded-xl text-[#dedcff] hover:text-[#38bdf8] hover:bg-slate-800/90 hover:border-[#38bdf8]/60 transition-all duration-300 border border-slate-800/80 shadow-md"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-slate-800/80 my-8" />

        {/* BOTTOM SECTION: Copyright & Scroll Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#dedcff]/60">
          
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Anubhaw Gupta. Made with <Heart size={14} className="text-rose-500 fill-rose-500" /> in India.
          </p>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[#dedcff]/80 hover:text-[#38bdf8] transition-colors cursor-pointer"
          >
            Back to Top
            <div className="p-2 bg-[#0b0f19]/90 rounded-lg border border-slate-800/80 group-hover:border-[#38bdf8]/60 transition-colors">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}