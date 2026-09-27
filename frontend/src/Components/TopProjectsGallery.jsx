import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { ArrowRight, ArrowLeft, Github, ExternalLink, Layers } from "lucide-react";

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
    color: "bg-blue-500"
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
    color: "bg-emerald-500"
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
    color: "bg-purple-500"
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
      x: dir > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 30 : -30,
      opacity: 0
    })
  };

  return (
    <section className="w-full py-20 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decor (Clipped) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 dark:bg-teal-950/20 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    Flagship <span className="text-teal-600 dark:text-teal-400">Projects</span>
                </h2>
                <div className="w-20 h-1 bg-teal-600 dark:bg-teal-400 mt-4 rounded-full" />
            </div>
            
            {/* Desktop Controls (Arrows) */}
            <div className="hidden md:flex gap-3">
                <button onClick={handlePrev} className="p-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500 transition-all">
                    <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
                </button>
                <button onClick={handleNext} className="p-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-500 transition-all">
                    <ArrowRight size={20} className="text-slate-600 dark:text-slate-300" />
                </button>
            </div>
        </div>

        {/* MAIN SLIDER CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
            
            {/* --- LEFT: VIDEO/IMAGE MONITOR --- */}
            <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-950 rounded-xl shadow-2xl shadow-slate-300/50 dark:shadow-black/60 border border-slate-200 dark:border-slate-800 overflow-hidden group">
                {/* Browser Toolbar Mockup */}
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-3 gap-1.5 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <div className="ml-4 flex-1 h-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded text-[10px] flex items-center px-2 text-slate-400 dark:text-slate-500 font-mono">
                        {active.preview ? active.preview : "localhost:3000"}
                    </div>
                </div>

                {/* Video or Image Content with Animation */}
                <div className="w-full h-full pt-8 bg-slate-50 dark:bg-slate-950">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="w-full h-full"
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
                                    className="w-full h-full object-cover object-top"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>


            {/* --- RIGHT: PROJECT DETAILS --- */}
            <div className="flex flex-col justify-center h-full relative">
                
                {/* Large Background Number for style */}
                <span className="absolute -top-10 -right-0 text-[180px] font-bold text-slate-100/80 dark:text-slate-800/40 -z-10 leading-none select-none">
                    0{currentIndex + 1}
                </span>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {active.keywords.map((k, i) => (
                                <span key={i} className="px-3 py-1 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900 text-xs font-bold uppercase tracking-wide rounded-md">
                                    {k}
                                </span>
                            ))}
                        </div>

                        {/* Titles */}
                        <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                            {active.title}
                        </h3>
                        <p className="text-lg font-medium text-teal-600 dark:text-teal-400 mb-6">
                            {active.subtitle}
                        </p>

                        {/* Desc */}
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
                            {active.desc}
                        </p>

                        {/* Buttons */}
                        <div className="flex items-center gap-4">
                            {active.preview ? (
                                <a
                                    href={active.preview}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 px-6 py-3 rounded-lg font-medium hover:bg-teal-600 dark:hover:bg-teal-400 transition-colors shadow-lg shadow-slate-900/20 dark:shadow-teal-500/20"
                                >
                                    Live Demo <ExternalLink size={18} />
                                </a>
                            ) : (
                                <span className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 px-6 py-3 rounded-lg font-medium cursor-not-allowed">
                                    Coming Soon <Layers size={18} />
                                </span>
                            )}

                            <a
                                href={active.repo}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-lg font-medium hover:border-slate-800 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <Github size={18} /> Code
                            </a>
                        </div>

                    </motion.div>
                </AnimatePresence>

                {/* Mobile Controls (Visible only on small screens) */}
                <div className="flex md:hidden gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={handlePrev} className="flex-1 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">Previous</button>
                    <button onClick={handleNext} className="flex-1 py-3 rounded-lg bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 font-medium">Next</button>
                </div>

            </div>

        </div>
      </div>
    </section>
  );
}