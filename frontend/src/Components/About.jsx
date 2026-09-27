import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getDynamicYearsOfExperience } from "../utils/experience";

export default function AboutSection() {
  
  // Scannable highlights to break up the text
  const highlights = [
    "Full-Stack Development (MERN)",
    "Clean, Modern UI/UX Design",
    "Scalable Backend Architecture",
  ];

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="w-full bg-white dark:bg-slate-900 py-16 md:py-20 px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* LEFT – IMAGE COMPOSITION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-start"
        >
          {/* 1. Abstract Background Decoration */}
          <div className="absolute top-4 -left-4 w-3/4 h-3/4 bg-teal-100 dark:bg-teal-950/60 rounded-[2rem] -z-10" />
          <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-slate-200/50 dark:bg-slate-800/50 rounded-[2rem] -z-10" />
          
          {/* 2. Main Image Container */}
          <div className="relative w-full max-w-[400px] h-[480px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300 dark:shadow-black/60 bg-white dark:bg-slate-800">
            <img
              src={assets.anbPortfolio}
              alt="Anubhaw Gupta Portrait"
              className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            
            {/* 3. Overlay Gradient for text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* 4. Floating 'Experience' Badge - Glassmorphism */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-4 right-2 sm:bottom-8 sm:-right-4 md:-right-4 lg:-right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white dark:border-slate-800 flex items-center gap-3 sm:gap-4"
          >
            <div className="bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 p-3 rounded-xl min-w-[50px] text-center">
               <span className="text-2xl font-bold">{getDynamicYearsOfExperience()}</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Years of</p>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">Experience</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT – CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-start"
        >
          {/* Small Tagline */}
          <span className="inline-block py-1 px-3 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 text-sm font-bold tracking-wide border border-teal-100 dark:border-teal-900 mb-6">
            ABOUT ME
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white leading-[1.2] mb-6">
            Transforming ideas into <br />
            <span className="text-teal-600 dark:text-teal-400">functional software.</span>
          </h2>

          {/* Body Text */}
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
            I’m a full-stack developer specializing in building clean, modern web applications. 
            I focus on crafting fast, intuitive digital experiences that feel simple, performant, and purposeful.
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
            My approach combines strong architectural patterns with pixel-perfect design, ensuring that 
            every product I build is scalable and user-friendly.
          </p>

          {/* Key Highlights List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="text-teal-500 dark:text-teal-400 w-5 h-5 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-200 font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 px-8 py-3.5 rounded-xl font-medium shadow-lg shadow-teal-600/20 dark:shadow-teal-500/20 hover:bg-teal-700 dark:hover:bg-teal-400 transition-all cursor-pointer"
            >
              My Projects <ArrowRight size={18} />
            </button>

            <Link 
              to={'/about'} 
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:border-teal-600 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all"
            >
              More About Me
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}