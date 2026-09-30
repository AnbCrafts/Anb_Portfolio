import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { ArrowRight, ArrowLeft, Github, ExternalLink, Layers, Sparkles } from "lucide-react";
import Spotlight3DCard from "./Spotlight3DCard";

const getFallbackImage = (title, image) => {
  if (!title) return image || assets.anbPortfolio;
  const lower = title.toLowerCase();
  if (lower.includes("trackforge")) return assets.trackForge;
  if (lower.includes("nirman") || lower.includes("website builder")) return assets.nirman;
  if (lower.includes("codesage")) return assets.codeSage;
  return image || assets.anbPortfolio;
};

const topProjectsFallback = [
  {
    id: 1,
    image: assets.trackForge,
    video: null,
    title: "TrackForge",
    subtitle: "AI Sprint & Bug Management Platform",
    desc: "A powerful project management suite built for agile engineering teams. Features Groq Llama 3.3 AI automated code analysis, multi-role access control (RBAC), real-time team rooms, and sprint analytics.",
    keywords: ["MERN Stack", "Groq Llama 3.3 AI", "Socket.io", "Recharts", "Tailwind CSS"],
    preview: "https://trackforge-client-qpdy.onrender.com/",
    repo: "https://github.com/AnbCrafts/TrackForge.git",
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: 2,
    image: assets.nirman,
    video: null,
    title: "Nirman.AI (Website Builder)",
    subtitle: "Multi-Agent AI Builder & Monaco IDE",
    desc: "Autonomous AI web application generator powered by Google Gemini. Features a 4-stage AI architecture (Plan, Code, Refine, Audit), Monaco Studio IDE, real-time preview staging, and web app compilation.",
    keywords: ["React", "Node.js", "Express", "Google Gemini AI", "Monaco Editor"],
    preview: "https://website-builder-client-r1q9.onrender.com",
    repo: "https://github.com/AnbCrafts/Website-Builder-Client.git",
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: 3,
    image: assets.codeSage,
    video: null,
    title: "CodeSage AI",
    subtitle: "AI Developer Assistant & Code Explainer",
    desc: "An intelligent coding assistant powered by Llama 3 70B models. Explains complex codebases line-by-line, performs Big O complexity analysis, converts syntax between languages, and generates test suites.",
    keywords: ["MERN Stack", "Llama 3 70B", "Groq AI API", "Monaco Editor", "Tailwind CSS"],
    preview: "https://codesage-client.onrender.com/",
    repo: "https://github.com/AnbCrafts/CodeSage.git",
    color: "from-purple-600 to-indigo-600"
  }
];

export default function TopProjectsGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dbProjects = useSelector((state) => state.portfolio.projects);

  const projectsList = dbProjects.length > 0 
    ? dbProjects.slice(0, 5).map((p, idx) => ({
        id: p._id || idx + 1,
        image: getFallbackImage(p.title, p.thumbnail || p.image),
        video: p.demoVideo && p.demoVideo !== assets.demo ? p.demoVideo : null,
        title: p.title,
        subtitle: p.meta || (p.category === "frontend" ? "Frontend & UI Project" : "Full Stack Platform"),
        desc: p.description || p.desc,
        keywords: p.techStack || p.keywords || ["React", "Node.js", "MERN"],
        preview: p.liveUrl || p.previewLink || "",
        repo: p.githubUrl || p.codeLink || "#",
      }))
    : topProjectsFallback;

  const active = projectsList[currentIndex % projectsList.length] || projectsList[0];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectsList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectsList.length) % projectsList.length);
  };

  // Animation Variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.96
    })
  };

  return (
    <section className="w-full py-24 bg-[#050315] text-[#fbfbfe] relative overflow-hidden transition-colors duration-300">
      
      {/* Background Atmosphere Beams & Glows */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Subtle Radial Glows from Realtime Colors */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#433bff]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2f27ce]/10 rounded-full blur-[140px]" />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #dedcff 1px, transparent 0)`, 
            backgroundSize: '32px 32px' 
          }} 
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#38bdf8] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles size={14} className="animate-pulse" /> Flagship Engineering
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#fbfbfe] tracking-tight">
              Featured <span className="bg-gradient-to-r from-[#38bdf8] via-[#433bff] to-[#a78bfa] bg-clip-text text-transparent">Flagship Projects</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#433bff] to-[#38bdf8] mt-4 rounded-full" />
          </div>
          
          {/* Desktop Controls (Interactive Buttons) */}
          <div className="hidden md:flex gap-4">
            <button 
              onClick={handlePrev} 
              className="p-3.5 rounded-xl border border-slate-800 bg-[#0b0f19]/80 backdrop-blur-md hover:bg-[#433bff]/20 hover:border-[#38bdf8] transition-all duration-300 group shadow-lg"
              aria-label="Previous Project"
            >
              <ArrowLeft size={20} className="text-[#dedcff] group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleNext} 
              className="p-3.5 rounded-xl border border-slate-800 bg-[#0b0f19]/80 backdrop-blur-md hover:bg-[#433bff]/20 hover:border-[#38bdf8] transition-all duration-300 group shadow-lg"
              aria-label="Next Project"
            >
              <ArrowRight size={20} className="text-[#dedcff] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* MAIN SLIDER CONTENT WITH 3D SPOTLIGHT CARD */}
        <Spotlight3DCard 
          glowColor="rgba(67, 59, 255, 0.3)" 
          spotlightColor="rgba(56, 189, 248, 0.15)"
          className="p-1 sm:p-2 bg-[#0b0f19]/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl shadow-black/80"
        >
          <div className="p-6 md:p-10 rounded-2xl grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-center">
              
            {/* --- LEFT: VIDEO/IMAGE BROWSER MONITOR WITH 3D TILT --- */}
            <div className="relative w-full aspect-video bg-[#050315] rounded-xl shadow-2xl border border-slate-800/80 overflow-hidden group">
              {/* Browser Header Bar */}
              <div className="absolute top-0 left-0 w-full h-9 bg-[#0b0f19] border-b border-slate-800/80 flex items-center px-4 gap-2 z-10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="ml-4 flex-1 h-5 bg-[#050315] border border-slate-800/80 rounded-md text-[11px] flex items-center px-3 text-[#dedcff]/60 font-mono tracking-wide overflow-hidden whitespace-nowrap">
                  {active.preview ? active.preview : "https://localhost:3000"}
                </div>
              </div>

              {/* Animated Media Display */}
              <div className="w-full h-full pt-9 bg-[#050315]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full relative"
                  >
                    {active.video ? (
                      <video
                        src={active.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={active.image}
                        alt={active.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050315]/40 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* --- RIGHT: PROJECT DETAILS --- */}
            <div className="flex flex-col justify-center h-full relative z-20">
              
              {/* Background Index Counter Watermark */}
              <span className="absolute -top-12 right-0 text-[140px] font-black text-slate-800/20 select-none pointer-events-none leading-none">
                0{currentIndex + 1}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {active.keywords.map((k, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-[#433bff]/15 text-[#38bdf8] border border-[#433bff]/30 text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm"
                      >
                        {k}
                      </span>
                    ))}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#fbfbfe] mb-2 leading-tight">
                    {active.title}
                  </h3>
                  <p className="text-base font-semibold text-[#38bdf8] mb-4">
                    {active.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-[#dedcff]/80 text-base leading-relaxed mb-8">
                    {active.desc}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {active.preview ? (
                      <a
                        href={active.preview}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-[#433bff] to-[#2f27ce] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#38bdf8] hover:to-[#433bff] transition-all duration-300 shadow-lg shadow-[#433bff]/25 hover:shadow-[#38bdf8]/40 hover:scale-[1.02]"
                      >
                        Live Preview <ExternalLink size={18} />
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 bg-slate-800/80 text-slate-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed border border-slate-700/50">
                        Coming Soon <Layers size={18} />
                      </span>
                    )}

                    <a
                      href={active.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 border border-slate-700/80 bg-[#0b0f19]/90 text-[#dedcff] px-6 py-3 rounded-xl font-semibold hover:bg-slate-800/80 hover:border-[#38bdf8] transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Github size={18} /> Source Code
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Mobile Navigation Controls */}
              <div className="flex md:hidden gap-4 mt-8 pt-6 border-t border-slate-800/80">
                <button 
                  onClick={handlePrev} 
                  className="flex-1 py-3 rounded-xl bg-slate-800/80 text-[#dedcff] font-medium hover:bg-slate-700/80"
                >
                  Previous
                </button>
                <button 
                  onClick={handleNext} 
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#433bff] to-[#2f27ce] text-white font-medium"
                >
                  Next
                </button>
              </div>

            </div>

          </div>
        </Spotlight3DCard>
      </div>
    </section>
  );
}