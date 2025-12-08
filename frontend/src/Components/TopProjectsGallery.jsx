import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets"; // Ensure assets are imported
import { ArrowRight, ArrowLeft, Github, ExternalLink, Layers } from "lucide-react";

const topProjects = [
  {
    id: 1,
    video: assets.demo, // Ensure this exists in your assets
    title: "TrackForge",
    subtitle: "Team Bug Tracking Platform",
    desc: "A powerful project management suite built for agile teams. Features include real-time collaboration, role-based access control (RBAC), and interactive analytics dashboards.",
    keywords: ["MERN Stack", "Socket.io", "Recharts", "Tailwind"],
    preview: "https://trackforge.com",
    repo: "https://github.com/yourrepo1",
    color: "bg-blue-500"
  },
  {
    id: 2,
    video: assets.demo,
    title: "FitForWork",
    subtitle: "Job Application Manager",
    desc: "A clean, automated career-management SaaS. It helps users organize job applications, track interview stages, and parse resumes automatically.",
    keywords: ["React", "Node.js", "MongoDB", "Auth0"],
    preview: "", // Empty = Work in Progress
    repo: "https://github.com/yourrepo2",
    color: "bg-emerald-500"
  },
  {
    id: 3,
    video: assets.demo,
    title: "CodeSage",
    subtitle: "AI Coding Assistant",
    desc: "An intelligent coding companion powered by LLMs. It assists developers by generating code snippets, debugging errors, and documenting complex logic in real-time.",
    keywords: ["OpenAI API", "Next.js", "TypeScript", "Prisma"],
    preview: "https://codesage.ai",
    repo: "https://github.com/yourrepo3",
    color: "bg-purple-500"
  }
];

export default function TopProjectsGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const active = topProjects[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % topProjects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + topProjects.length) % topProjects.length);
  };

  // Animation Variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <section className="w-full py-20 bg-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Flagship <span className="text-teal-600">Projects</span>
                </h2>
                <div className="w-20 h-1 bg-teal-600 mt-4 rounded-full" />
            </div>
            
            {/* Desktop Controls (Arrows) */}
            <div className="hidden md:flex gap-3">
                <button onClick={handlePrev} className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 hover:border-teal-400 transition-all">
                    <ArrowLeft size={20} className="text-slate-600" />
                </button>
                <button onClick={handleNext} className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 hover:border-teal-400 transition-all">
                    <ArrowRight size={20} className="text-slate-600" />
                </button>
            </div>
        </div>

        {/* MAIN SLIDER CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
            
            {/* --- LEFT: VIDEO MONITOR --- */}
            <div className="relative w-full aspect-video bg-slate-100 rounded-xl shadow-2xl shadow-slate-300/50 border border-slate-200 overflow-hidden group">
                {/* Browser Toolbar Mockup */}
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1.5 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <div className="ml-4 flex-1 h-4 bg-white border border-slate-200 rounded text-[10px] flex items-center px-2 text-slate-400 font-mono">
                        {active.preview ? active.preview : "localhost:3000"}
                    </div>
                </div>

                {/* Video Content with Animation */}
                <div className="w-full h-full pt-8 bg-slate-50">
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
                            <video
                                src={active.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>


            {/* --- RIGHT: PROJECT DETAILS --- */}
            <div className="flex flex-col justify-center h-full relative">
                
                {/* Large Background Number for style */}
                <span className="absolute -top-10 -right-0 text-[180px] font-bold text-slate-100/80 -z-10 leading-none select-none">
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
                                <span key={i} className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wide rounded-md">
                                    {k}
                                </span>
                            ))}
                        </div>

                        {/* Titles */}
                        <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2 leading-tight">
                            {active.title}
                        </h3>
                        <p className="text-lg font-medium text-teal-600 mb-6">
                            {active.subtitle}
                        </p>

                        {/* Desc */}
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            {active.desc}
                        </p>

                        {/* Buttons */}
                        <div className="flex items-center gap-4">
                            {active.preview ? (
                                <a
                                    href={active.preview}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors shadow-lg shadow-slate-900/20"
                                >
                                    Live Demo <ExternalLink size={18} />
                                </a>
                            ) : (
                                <span className="flex items-center gap-2 bg-slate-100 text-slate-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed">
                                    Coming Soon <Layers size={18} />
                                </span>
                            )}

                            <a
                                href={active.repo}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium hover:border-slate-800 hover:bg-slate-50 transition-colors"
                            >
                                <Github size={18} /> Code
                            </a>
                        </div>

                    </motion.div>
                </AnimatePresence>

                {/* Mobile Controls (Visible only on small screens) */}
                <div className="flex md:hidden gap-4 mt-8 pt-6 border-t border-slate-100">
                    <button onClick={handlePrev} className="flex-1 py-3 rounded-lg bg-slate-50 text-slate-600 font-medium">Previous</button>
                    <button onClick={handleNext} className="flex-1 py-3 rounded-lg bg-slate-900 text-white font-medium">Next</button>
                </div>

            </div>

        </div>
      </div>
    </section>
  );
}