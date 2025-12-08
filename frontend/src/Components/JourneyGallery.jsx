import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MapPin, Calendar, Award } from "lucide-react";
import { assets } from "../assets/assets";

// Default data (kept the same structure)
const journeyItems = [
  {
    image: assets.hero1,
    tag: "Hackathon",
    title: "Hack-O-Nova 2024",
    description: "36-hour hackathon hosted at Adamas University where we designed and built a prototype under pressure. Led the frontend architecture and pitched the final solution to a panel of 5 judges.",
    date: "March 2024",
    location: "Adamas University",
    project: "AI-powered study planner",
    certificateLink: "/cert-hack1.png",
    skills: ["Teamwork", "Rapid Prototyping", "UI Design"],
    storyLink: "/stories/hackonova-2024",
  },
  {
    image: assets.hero2,
    tag: "Certification",
    title: "NPTEL Programming in Java",
    description: "Selected among the top performers (Elite+Silver) for consistently high scores. Mastered Object-Oriented Programming concepts, multithreading, and collection frameworks.",
    date: "Jan 2024",
    location: "JIS University",
    project: null,
    certificateLink: "/cert-nptel.png",
    skills: ["OOP", "Java", "Data Structures"],
    storyLink: "/stories/nptel-java",
  },
  {
    image: assets.hero3,
    tag: "Training",
    title: "Full-Stack MERN Training",
    description: "Intensive 3-month industrial training. Built 4 production-ready projects, learned Docker containerization, and deployed apps using AWS and Vercel.",
    date: "Dec 2023",
    location: "Ardent Computech",
    project: "MERN Dashboard",
    certificateLink: "/cert-ardent.png",
    skills: ["React", "Express", "MongoDB", "AWS"],
    storyLink: "/stories/ardent-training",
  },
];

export default function JourneyGallery({ items = journeyItems }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  // Animation variants
  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <section className="w-full py-12 px-0 lg:px-4">
      
      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
        
        {/* Ambient Background Blur */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
            <motion.div 
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-cover bg-center blur-3xl scale-110"
                style={{ backgroundImage: `url(${active.image})` }}
            />
            <div className="absolute inset-0 bg-white/50" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] min-h-[500px]">
          
          {/* --- LEFT: ACTIVE IMAGE --- */}
          <div className="relative h-[300px] lg:h-auto bg-slate-100 overflow-hidden p-4 lg:p-6">
            <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner">
                <AnimatePresence mode="wait">
                <motion.img
                    key={activeIndex}
                    src={active.image}
                    alt={active.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                </AnimatePresence>
                
                {/* Floating Badge on Image */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                    {active.tag}
                </div>
            </div>
          </div>

          {/* --- RIGHT: CONTENT PANEL --- */}
          <div className="flex flex-col justify-between p-6 lg:p-10 bg-white/60 backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-1"
              >
                {/* Header Info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                    <Calendar size={14} className="text-teal-600" /> {active.date}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                    <MapPin size={14} className="text-teal-600" /> {active.location}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {active.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {active.description}
                </p>

                {/* Skills Tags */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Skills Gained</h4>
                  <div className="flex flex-wrap gap-2">
                    {active.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-sm rounded-full shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project or Links */}
                {active.project && (
                   <div className="mb-6 p-4 bg-teal-50 rounded-xl border border-teal-100">
                      <p className="text-sm text-teal-800 font-medium flex items-center gap-2">
                        <Award size={16} /> 
                        Built Project: <span className="font-bold">{active.project}</span>
                      </p>
                   </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Links Area */}
            <div className="flex items-center gap-5 mt-auto pt-6 border-t border-slate-200/60">
                {active.storyLink && (
                  <a href={active.storyLink} className="flex items-center gap-2 text-slate-800 font-semibold hover:text-teal-600 transition-colors">
                     Read Full Story <ExternalLink size={16} />
                  </a>
                )}
                {active.certificateLink && (
                   <a href={active.certificateLink} target="_blank" rel="noreferrer" className="text-sm text-slate-500 hover:text-slate-800 underline decoration-slate-300 underline-offset-4">
                     View Certificate
                   </a>
                )}
            </div>

          </div>
        </div>

        {/* --- THUMBNAILS STRIP --- */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
           <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {items.map((item, idx) => {
                 const isActive = activeIndex === idx;
                 return (
                    <button
                       key={idx}
                       onClick={() => setActiveIndex(idx)}
                       className={`
                          relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-300
                          ${isActive ? "ring-2 ring-teal-600 ring-offset-2 opacity-100 scale-105" : "opacity-60 hover:opacity-100"}
                       `}
                    >
                       <img src={item.image} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                 )
              })}
           </div>
        </div>

      </div>
    </section>
  );
}