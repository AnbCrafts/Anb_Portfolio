import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import ResumeDropDown from "./ResumeDropDown";
import { Github, Linkedin, Mail, ArrowRight, Code2, Sparkles, CheckCircle2, Award, Briefcase, BookOpen } from "lucide-react";

// Animation Variants
const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9, rotate: -2 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: "backOut" } },
};

const techPills = [
  "React.js", "Node.js", "Express.js", "MongoDB", "C# / .NET", "SQL", "TypeScript", "Tailwind CSS", "Docker", "Vercel"
];

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative w-full bg-slate-50 dark:bg-slate-950 z-30 pt-28 pb-32 md:pt-36 md:pb-40 min-h-[calc(100vh-70px)] flex flex-col justify-center transition-colors duration-300">
      
      {/* 1. BACKGROUND: Tech Grid Pattern */}
      <div className="absolute inset-0 w-full h-full bg-white dark:bg-slate-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
      
      {/* Gradient Blobs (Clipped inside viewport) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] bg-teal-200/40 dark:bg-teal-500/10 rounded-full blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-[90px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full flex-1 flex items-center">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-16 w-full">

          {/* LEFT: Rich Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative z-30"
          >
            {/* Status Pill & Devlog Announcement */}
            <motion.div variants={textVariant} className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-semibold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Software Developer @ MCC • MERN & C# / .NET
              </div>

              <Link
                to="/blogs"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-300/60 dark:border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-all shadow-sm group"
              >
                <Sparkles size={13} className="text-amber-500 fill-amber-400" />
                <span>Read My Devlog & Articles</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={textVariant} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-5">
              Building Scalable <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 dark:from-teal-400 dark:via-teal-300 dark:to-blue-400">
                Web Applications.
              </span>
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p variants={textVariant} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-6">
              Hi, I’m <span className="font-bold text-slate-900 dark:text-white">Anubhaw Gupta</span>. A Full-Stack Developer specializing in high-performance MERN stack apps, C# / .NET services, and modern UI engineering. Turning complex ideas into sleek digital products.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={textVariant} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToProjects}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 font-semibold rounded-xl shadow-lg shadow-slate-900/20 dark:shadow-teal-500/20 hover:bg-teal-600 dark:hover:bg-teal-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                View My Work <ArrowRight size={18} />
              </motion.button>

              <Link
                to="/blogs"
                className="w-full sm:w-auto px-6 py-3.5 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 font-semibold rounded-xl hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm"
              >
                Read Devlog <BookOpen size={17} />
              </Link>

              <ResumeDropDown />
            </motion.div>

            {/* Tech Stack Pills Bar */}
            <motion.div variants={textVariant} className="w-full pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-center md:justify-start gap-1.5">
                <Code2 size={14} className="text-teal-600 dark:text-teal-400" /> Primary Tech Stack & Skills
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {techPills.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg shadow-sm hover:border-teal-300 dark:hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT: Visual Image & Glassmorphic Proof Badges */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageVariant}
            className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px]">
              
              {/* Abstract Background Shapes */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-200 to-blue-200 dark:from-teal-900/40 dark:to-blue-900/40 rounded-[2.5rem] rotate-6 scale-105 opacity-80" />
              <div className="absolute inset-0 bg-teal-400/20 dark:bg-teal-500/10 rounded-[2.5rem] -rotate-3 scale-100 blur-xl -z-10" />

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl shadow-slate-400/30 dark:shadow-black/50 bg-white dark:bg-slate-900">
                <img
                  src={assets.anbPortfolio}
                  alt="Anubhaw Gupta Portrait"
                  className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Floating Glassmorphic Badge 1 (MCC Developer) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-5 -left-4 sm:-left-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white dark:border-slate-800 flex items-center gap-3 z-20"
              >
                <div className="p-2 bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 rounded-xl shadow-sm">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">Current Role</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">Software Dev @ MCC</p>
                </div>
              </motion.div>

              {/* Floating Glassmorphic Badge 2 (Top-Right Badge) */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -top-4 -right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-white dark:border-slate-800 flex items-center gap-2 z-20"
              >
                <Sparkles size={16} className="text-amber-500 fill-amber-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">3+ Production Apps</span>
              </motion.div>

              {/* Floating Glassmorphic Badge 3 (Bottom-Right Badge) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-6 -right-6 hidden sm:flex bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-white dark:border-slate-800 items-center gap-2 z-20"
              >
                <Code2 size={16} className="text-teal-600 dark:text-teal-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Ex-MERN Stack Intern</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-10 pointer-events-none">
        <svg className="block w-full h-[40px] md:h-[60px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path className="fill-white dark:fill-slate-900 transition-colors duration-300" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,208C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}