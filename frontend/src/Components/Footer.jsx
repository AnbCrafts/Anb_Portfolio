import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/AnbCrafts", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Mail size={20} />, href: "mailto:yourmail@gmail.com", label: "Email" },
  ];

  return (
    <footer className="w-full bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* TOP SECTION: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          
          {/* COLUMN 1: Brand & Bio */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">Anubhaw.</h3>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Crafting scalable digital experiences with clean code and user-centric design.
            </p>
            <div className="flex items-center gap-2 text-sm text-teal-500 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Open to new opportunities
            </div>
          </div>

          {/* COLUMN 2: Navigation */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#home" className="hover:text-teal-400 transition-colors inline-block">Home</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors inline-block">About</a></li>
              <li><a href="#projects" className="hover:text-teal-400 transition-colors inline-block">Projects</a></li>
              <li><a href="#experience" className="hover:text-teal-400 transition-colors inline-block">Experience</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors inline-block">Contact</a></li>
            </ul>
          </div>

          {/* COLUMN 3: Socials & Action */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Connect</h4>
            <p className="text-slate-400 mb-4">
                Feel free to reach out if you want to collaborate on a project.
            </p>
            
            {/* Horizontal Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  className="p-2.5 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-teal-600 transition-all duration-300 border border-slate-800"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-slate-900 my-8" />

        {/* BOTTOM SECTION: Copyright & Scroll Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Anubhaw Gupta. Made with <Heart size={14} className="text-red-500 fill-red-500" /> in India.
          </p>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors"
          >
            Back to Top
            <div className="p-1.5 bg-slate-900 rounded-md border border-slate-800 group-hover:border-teal-500 transition-colors">
                <ArrowUp size={14} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}