import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";

export default function AboutSection() {
  
  // Scannable highlights to break up the text
  const highlights = [
    "Full-Stack Development (MERN)",
    "Clean, Modern UI/UX Design",
    "Scalable Backend Architecture",
  ];

  return (
    <section id="about" className="w-full bg-slate-50 py-24 px-6 lg:px-8 overflow-hidden">
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
          <div className="absolute top-4 -left-4 w-3/4 h-3/4 bg-teal-100 rounded-[2rem] -z-10" />
          <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-slate-200/50 rounded-[2rem] -z-10" />
          
          {/* 2. Main Image Container */}
          <div className="relative w-full max-w-[400px] h-[480px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300">
            <img
              src={assets.hero8}
              alt="Portrait"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            
            {/* 3. Overlay Gradient for text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* 4. Floating 'Experience' Badge - Glassmorphism */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-8 -right-6 md:-right-12 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white flex items-center gap-4"
          >
            <div className="bg-teal-600 text-white p-3 rounded-xl">
               <span className="text-2xl font-bold">2+</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Years of</p>
              <p className="text-lg font-bold text-slate-800">Experience</p>
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
          <span className="inline-block py-1 px-3 rounded-full bg-teal-50 text-teal-600 text-sm font-bold tracking-wide border border-teal-100 mb-6">
            ABOUT ME
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-[1.2] mb-6">
            Transforming ideas into <br />
            <span className="text-teal-600">functional software.</span>
          </h2>

          {/* Body Text */}
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            I’m a full-stack developer specializing in building clean, minimal SaaS interfaces. 
            I focus on crafting fast, intuitive digital experiences that feel simple, modern, and purposeful.
          </p>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            My approach combines strong architectural patterns with pixel-perfect design, ensuring that 
            every product I build is scalable and user-friendly.
          </p>

          {/* Key Highlights List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="text-teal-500 w-5 h-5 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-3.5 rounded-xl font-medium shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all"
            >
              My Projects <ArrowRight size={18} />
            </motion.a>

            <Link 
              to={'/about'} 
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:border-teal-600 hover:text-teal-600 hover:bg-teal-50 transition-all"
            >
              More About Me
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}