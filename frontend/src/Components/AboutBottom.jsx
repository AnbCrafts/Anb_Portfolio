// AboutBottom.jsx
import {
  CheckCircle2,
  Target,
  Code2,
  Rocket,
  Lightbulb,
  Settings,
  HeartHandshake,
  Activity,
  Cpu,
  Compass,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

export default function AboutBottom() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const codingJourney = [
    {
      year: "2026 – Present",
      title: "Software Developer @ MCC",
      text: "Undergoing intensive software development training in C#, .NET framework, and SQL database management while building scalable business applications.",
    },
    {
      year: "May 2026 – Sept 2026",
      title: "MERN Stack Developer Intern @ Hansraj Ventures",
      text: "Developed scalable MERN stack web applications, RESTful APIs, optimized database schemas, and managed cloud deployments (AWS, GCP, VPS, Docker, Nginx, PM2).",
    },
    {
      year: "2025",
      title: "Full-Stack SaaS & Freelance",
      text: "Engineered production-level MERN platforms including Nirman AI (AI Website Builder), TrackForge (Bug Tracker), and FitForWork (Hiring SaaS).",
    },
    {
      year: "2024",
      title: "Hackathons & Industrial Training",
      text: "Hack-O-Nova Hackathon finalist (built AI study planner in 36h). Completed 3-month industrial MERN training at Ardent Computech & earned NPTEL Java Certification.",
    },
    {
      year: "2022 – 2023",
      title: "CS Fundamentals & Science Stream",
      text: "Built a strong foundation in Logic, Mathematics, and Data Structures with 91.2% aggregate in Higher Secondary (PCM).",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mt-16 space-y-20">

      {/* ============================================
          1. MISSION & VALUES
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-xl">
            <Compass size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">My Mission & Core Values</h2>
        </div>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg max-w-3xl mb-8">
          I aim to build clean, performant, and scalable web applications that solve real problems.
          My focus is on writing maintainable code, designing intuitive user interfaces, and continually improving through discipline and engineering curiosity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Deliver clean, well-documented & maintainable code",
            "Build with users first, technology second",
            "Maintain consistency and continuously upskill",
            "Communicate clearly and collaborate effectively",
          ].map((val, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <CheckCircle2 size={18} className="text-teal-600 dark:text-teal-400 shrink-0" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{val}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ============================================
          2. CURRENTLY WORKING ON
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }} 
        className="bg-slate-900 dark:bg-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-slate-800 text-teal-400 rounded-xl border border-slate-700">
            <Zap size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">What I'm Currently Focused On</h2>
        </div>

        {/* Project Screenshots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 group">
            <img src={assets.fitForWork} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="FitForWork UI" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
              <span className="text-xs font-bold text-teal-400">FitForWork SaaS</span>
              <p className="text-xs text-slate-300">Recruitment & hiring platform</p>
            </div>
          </div>

          <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 group">
            <img src={assets.codeSage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Nirman AI UI" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
              <span className="text-xs font-bold text-teal-400">Nirman AI / CodeSage</span>
              <p className="text-xs text-slate-300">AI website builder & assistant</p>
            </div>
          </div>

          <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 group">
            <img src={assets.trackForge} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="TrackForge UI" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
              <span className="text-xs font-bold text-teal-400">TrackForge</span>
              <p className="text-xs text-slate-300">Real-time bug & issue tracker</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
            <Target size={18} className="text-teal-400 shrink-0" /> C# / .NET framework & SQL backend training @ MCC
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
            <Activity size={18} className="text-teal-400 shrink-0" /> Full-stack MERN & AI app development
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
            <Code2 size={18} className="text-teal-400 shrink-0" /> Advanced RESTful API design & Database modeling
          </div>
          <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
            <Rocket size={18} className="text-teal-400 shrink-0" /> Cloud deployments (AWS, GCP, Docker, Nginx)
          </div>
        </div>
      </motion.section>

      {/* ============================================
          3. HOW I WORK (WORKFLOW DIAGRAM)
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-xl">
            <Settings size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">How I Work</h2>
        </div>

        {/* WORKFLOW DIAGRAM */}
        <div className="w-full noScroll p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl mb-8 overflow-x-auto [scrollbar-width:none]">
          <div className="flex items-center gap-4 min-w-max">
            {[
              { step: "01", title: "Idea & Requirements", desc: "Define core goals & user scope." },
              { step: "02", title: "UI/UX Layout", desc: "Design responsive wireframes." },
              { step: "03", title: "Backend Architecture", desc: "Design DB schemas & APIs." },
              { step: "04", title: "Frontend Build", desc: "Develop UI with React & Tailwind." },
              { step: "05", title: "Testing & Refinement", desc: "Debug & optimize speed." },
              { step: "06", title: "Deployment", desc: "Publish on Cloud/VPS." },
            ].map((st, idx, arr) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-[170px] text-center">
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest block mb-1">Step {st.step}</span>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{st.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{st.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <span className="text-slate-300 dark:text-slate-700 font-bold text-lg">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Component-driven modular architecture",
            "Clean folder structure & maintainable code",
            "API-first backend integration",
            "Reusable UI component systems",
            "Prioritize accessibility & mobile responsiveness",
            "Production-ready deployment setups",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <CheckCircle2 size={14} className="text-teal-600 dark:text-teal-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ============================================
          4. HOBBIES & INTERESTS (WITHOUT FITNESS/DSA OR BLANK IMAGES)
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-xl">
            <HeartHandshake size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Interests & Tech Culture</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "UI/UX Exploration & Product Design",
            "Building AI-Powered Web Applications & SaaS Tools",
            "Reading Engineering Blogs & Architecture Guides",
            "Open-Source Code Exploration & System Design",
            "Tech Community Discussions & Developer Culture",
            "Gaming & Tech Media",
          ].map((hobby, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              {hobby}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ============================================
          5. JOURNEY TIMELINE (WITH 2026 CAREER MILESTONES)
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
        className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 rounded-xl">
            <Activity size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">My Development Journey</h2>
        </div>

        <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
          {codingJourney.map((item, i) => (
            <div key={i} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-teal-600 dark:bg-teal-500 border-4 border-slate-50 dark:border-slate-900 group-hover:scale-125 transition-transform" />
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-1">
                {item.year}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1 max-w-2xl">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
