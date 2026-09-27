import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Award, Trophy, Code2, Sparkles, CheckCircle2 } from "lucide-react";

// Data with icons instead of images
const journeyItems = [
  {
    id: "hackonova-2024",
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    tag: "Hackathon Finalist",
    title: "Hack-O-Nova 2024",
    description: "A high-pressure 36-hour hackathon hosted at Adamas University. Conceptualized and developed an AI-driven study planner from scratch under strict deadlines. Led frontend architecture, integrated LLM API endpoints, and successfully pitched the working prototype to a panel of 5 industry judges.",
    date: "March 2024",
    location: "Adamas University",
    project: "AI-Powered Study Planner",
    certificateLink: null,
    skills: ["Rapid Prototyping", "Team Leadership", "UI/UX Architecture", "LLM Integration"],
    storyLink: "/stories/hackonova-2024",
  },
  {
    id: "nptel-java",
    icon: <Award className="w-8 h-8 text-blue-500" />,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    tag: "Elite + Silver Certification",
    title: "NPTEL Programming in Java",
    description: "Achieved Elite + Silver medal recognition for scoring in the top percentile nationwide. Mastered advanced Object-Oriented Programming (OOP) principles, multithreading synchronization, collections framework, and algorithmic efficiency in Java.",
    date: "Jan 2024",
    location: "JIS University",
    project: null,
    certificateLink: null,
    skills: ["Core Java", "OOP Design Patterns", "Multithreading", "Data Structures"],
    storyLink: "/stories/nptel-java",
  },
  {
    id: "mern-training-ardent",
    icon: <Code2 className="w-8 h-8 text-emerald-500" />,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    tag: "Industrial Training",
    title: "Full-Stack MERN Architecture Training",
    description: "An intensive 3-month industrial training program focused on building production-grade web applications. Developed RESTful microservices, mastered MongoDB schema modeling, implemented JWT authentication, containerized services with Docker, and configured CI/CD deployments on AWS.",
    date: "Dec 2023",
    location: "Ardent Computech",
    project: "MERN SaaS Portal",
    certificateLink: null,
    skills: ["React.js", "Express.js", "MongoDB", "Node.js", "Docker", "AWS Deployments"],
    storyLink: "/stories/mern-training-ardent",
  },
];

export default function JourneyGallery({ items = journeyItems }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  const fadeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25 } }
  };

  return (
    <section className="w-full py-6 px-0">
      <div className="relative w-full max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
        
        {/* TOP TAB CONTROLS (NO IMAGES) */}
        <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {items.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? "bg-white dark:bg-slate-900 shadow-md border border-teal-200 dark:border-teal-800 ring-2 ring-teal-500/20 translate-y-[-2px]" 
                      : "bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 opacity-80 hover:opacity-100"
                    }
                  `}
                >
                  <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 ${isActive ? "bg-teal-50 dark:bg-teal-950/60" : "bg-slate-100 dark:bg-slate-800"}`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full mb-1 border ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {item.date} • {item.location}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE HIGHLIGHT CONTENT AREA (TEXT, ICONS, ANIMATIONS ONLY) */}
        <div className="p-6 md:p-10 bg-white dark:bg-slate-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {/* Header Badges & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-2xl border border-teal-100 dark:border-teal-900">
                    {active.icon}
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${active.badgeColor} mb-1`}>
                      {active.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                      {active.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-xl border border-slate-200/60 dark:border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-teal-600 dark:text-teal-400" /> {active.date}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-teal-600 dark:text-teal-400" /> {active.location}
                  </span>
                </div>
              </div>

              {/* Detailed Explanation */}
              <div className="bg-slate-50/70 dark:bg-slate-950/70 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-teal-500 dark:text-teal-400" /> Key Highlights & Accomplishments
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                  {active.description}
                </p>
              </div>

              {/* Grid Info: Built Project & Skills Gained */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Built Project Pill */}
                {active.project ? (
                  <div className="p-5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60 flex items-start gap-4">
                    <div className="p-2.5 bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 rounded-xl shadow-sm">
                      <Award size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">Project Delivered</span>
                      <h5 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{active.project}</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Built & deployed as part of this milestone.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-start gap-4">
                    <div className="p-2.5 bg-blue-600 dark:bg-blue-500 text-white dark:text-slate-950 rounded-xl shadow-sm">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Academic Excellence</span>
                      <h5 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Top Percentile Distinction</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Recognized for technical expertise and mastery.</p>
                    </div>
                  </div>
                )}

                {/* Skills Gained Pills */}
                <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-3">
                    Competencies & Technologies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {active.skills.map((skill, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg shadow-sm">
                        <CheckCircle2 size={12} className="text-teal-500 dark:text-teal-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Milestone Counter */}
              <div className="flex items-center justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  Milestone {activeIndex + 1} of {items.length}
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}