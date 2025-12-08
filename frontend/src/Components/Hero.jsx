// Hero.jsx
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import ResumeDropDown from "./ResumeDropDown";

// Animation Variants for cleaner code
const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9, rotate: -3 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: "backOut" } },
};

export default function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-slate-50">
      
      {/* 1. BACKGROUND: Subtle Grid/Dot Pattern for Tech Feel */}
      <div className="absolute inset-0 w-full h-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>
      
      {/* Gradient Blob for depth */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">

          {/* LEFT: Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10"
          >
            <motion.div variants={textVariant} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Available for Freelance & Full-time
            </motion.div>

            <motion.h1 variants={textVariant} className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-800 leading-[1.1] tracking-tight">
              Building Digital <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                Products & Brands.
              </span>
            </motion.h1>

            <motion.p variants={textVariant} className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
              Hi, I’m <span className="font-semibold text-slate-900">Anubhaw Gupta</span>. 
              A Full-Stack Developer creating pixel-perfect SaaS experiences with React, Tailwind, and Node.js.
            </motion.p>

            <motion.div variants={textVariant} className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-medium rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors text-center"
              >
                View My Work
              </motion.a>

             <ResumeDropDown/>
            </motion.div>
          </motion.div>

          {/* RIGHT: Visuals */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageVariant}
            className="w-full md:w-1/2 flex justify-center md:justify-end relative z-10"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px]">
              
              {/* Abstract Background Shapes */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-blue-100 rounded-[2rem] rotate-6 scale-105 opacity-80" />
              
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl shadow-teal-900/10 bg-white">
                <img
                  src={assets.hero1}
                  alt="Anubhaw Gupta"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Glassmorphic Badge 1 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-12 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 flex items-center gap-3"
              >
                <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Experience</p>
                  <p className="text-sm font-bold text-slate-800">Full-Stack Dev</p>
                </div>
              </motion.div>

               {/* Floating Glassmorphic Badge 2 (Decor) */}
               <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -top-4 -right-4 sm:-right-8 bg-white p-2 rounded-lg shadow-lg"
               >
                 <span className="text-2xl">🚀</span>
               </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Modern Wave Divider - Sleeker Curve */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-20">
        <svg className="block w-full h-[60px] md:h-[100px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#ffffff" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,208C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}