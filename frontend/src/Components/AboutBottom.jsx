import {
  CheckCircle2,
  Target,
  Code2,
  Rocket,
  Settings,
  HeartHandshake,
  Activity,
  Compass,
  Zap,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import Spotlight3DCard from "./Spotlight3DCard";
import GlowBadge from "./GlowBadge";

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
    <div className="w-full max-w-7xl mx-auto px-6 mt-16 space-y-20 bg-[#050315] text-[#fbfbfe]">

      {/* ============================================
          1. MISSION & VALUES
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
      >
        <Spotlight3DCard
          glowColor="rgba(67, 59, 255, 0.25)"
          spotlightColor="rgba(56, 189, 248, 0.15)"
          className="bg-[#0b0f19]/90 backdrop-blur-xl border border-slate-800/80 p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#433bff]/20 text-[#38bdf8] rounded-xl border border-[#433bff]/30">
              <Compass size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#fbfbfe]">My Mission & Core Values</h2>
          </div>

          <p className="text-[#dedcff]/80 leading-relaxed text-base md:text-lg max-w-3xl mb-8">
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
              <div key={i} className="flex items-center gap-3 p-4 bg-[#050315]/80 rounded-xl border border-slate-800/80">
                <CheckCircle2 size={18} className="text-[#38bdf8] shrink-0" />
                <span className="text-sm font-semibold text-[#fbfbfe]">{val}</span>
              </div>
            ))}
          </div>
        </Spotlight3DCard>
      </motion.section>

      {/* ============================================
          2. CURRENTLY WORKING ON
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }} 
      >
        <Spotlight3DCard
          glowColor="rgba(56, 189, 248, 0.25)"
          spotlightColor="rgba(67, 59, 255, 0.15)"
          className="bg-[#0b0f19]/95 backdrop-blur-2xl p-8 md:p-12 border border-slate-800/90 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#433bff]/20 text-amber-400 rounded-xl border border-[#433bff]/30">
              <Zap size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#fbfbfe]">What I'm Currently Focused On</h2>
          </div>

          {/* Project Screenshots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 bg-[#050315] group">
              <img src={assets.fitForWork} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="FitForWork UI" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050315] via-[#050315]/40 to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs font-bold text-[#38bdf8]">FitForWork SaaS</span>
                <p className="text-xs text-[#dedcff]/70">Recruitment & hiring platform</p>
              </div>
            </div>

            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 bg-[#050315] group">
              <img src={assets.codeSage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Nirman AI UI" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050315] via-[#050315]/40 to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs font-bold text-[#38bdf8]">Nirman AI / CodeSage</span>
                <p className="text-xs text-[#dedcff]/70">AI website builder & assistant</p>
              </div>
            </div>

            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 bg-[#050315] group">
              <img src={assets.trackForge} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="TrackForge UI" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050315] via-[#050315]/40 to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs font-bold text-[#38bdf8]">TrackForge</span>
                <p className="text-xs text-[#dedcff]/70">Real-time bug & issue tracker</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-[#dedcff]/80 text-sm font-medium">
              <Target size={18} className="text-[#38bdf8] shrink-0" /> C# / .NET framework & SQL backend training @ MCC
            </div>
            <div className="flex items-center gap-3 text-[#dedcff]/80 text-sm font-medium">
              <Activity size={18} className="text-[#38bdf8] shrink-0" /> Full-stack MERN & AI app development
            </div>
            <div className="flex items-center gap-3 text-[#dedcff]/80 text-sm font-medium">
              <Code2 size={18} className="text-[#38bdf8] shrink-0" /> Advanced RESTful API design & Database modeling
            </div>
            <div className="flex items-center gap-3 text-[#dedcff]/80 text-sm font-medium">
              <Rocket size={18} className="text-[#38bdf8] shrink-0" /> Cloud deployments (AWS, GCP, Docker, Nginx)
            </div>
          </div>
        </Spotlight3DCard>
      </motion.section>

      {/* ============================================
          3. HOW I WORK (WORKFLOW DIAGRAM)
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
      >
        <Spotlight3DCard
          glowColor="rgba(67, 59, 255, 0.25)"
          spotlightColor="rgba(56, 189, 248, 0.15)"
          className="bg-[#0b0f19]/90 backdrop-blur-xl p-8 md:p-12 border border-slate-800/80"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#433bff]/20 text-[#38bdf8] rounded-xl border border-[#433bff]/30">
              <Settings size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#fbfbfe]">How I Work</h2>
          </div>

          {/* WORKFLOW DIAGRAM */}
          <div className="w-full noScroll p-6 bg-[#050315] border border-slate-800/80 rounded-2xl mb-8 overflow-x-auto [scrollbar-width:none]">
            <div className="flex items-center gap-4 min-w-max">
              {[
                { step: "01", title: "Idea & Scope", desc: "Define core goals & user flows." },
                { step: "02", title: "UI/UX Layout", desc: "Design responsive wireframes." },
                { step: "03", title: "Backend Architecture", desc: "Design DB schemas & APIs." },
                { step: "04", title: "Frontend Build", desc: "Develop UI with React & Tailwind." },
                { step: "05", title: "Testing & Polish", desc: "Debug & optimize performance." },
                { step: "06", title: "Deployment", desc: "Publish on Vercel/Cloud." },
              ].map((st, idx, arr) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="p-4 bg-[#0b0f19] rounded-xl border border-slate-800 min-w-[170px] text-center shadow-md">
                    <span className="text-[10px] font-bold text-[#38bdf8] uppercase tracking-widest block mb-1">Step {st.step}</span>
                    <h4 className="text-sm font-bold text-[#fbfbfe]">{st.title}</h4>
                    <p className="text-xs text-[#dedcff]/70 mt-1">{st.desc}</p>
                  </div>
                  {idx < arr.length - 1 && (
                    <span className="text-[#38bdf8] font-bold text-lg">→</span>
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
              <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-[#dedcff] p-3.5 bg-[#050315]/80 rounded-xl border border-slate-800/80">
                <CheckCircle2 size={15} className="text-[#38bdf8] shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </Spotlight3DCard>
      </motion.section>

      {/* ============================================
          4. INTERESTS & TECH CULTURE
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
      >
        <Spotlight3DCard
          glowColor="rgba(56, 189, 248, 0.2)"
          spotlightColor="rgba(67, 59, 255, 0.15)"
          className="bg-[#0b0f19]/90 backdrop-blur-xl p-8 md:p-12 border border-slate-800/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#433bff]/20 text-rose-400 rounded-xl border border-[#433bff]/30">
              <HeartHandshake size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#fbfbfe]">Interests & Tech Culture</h2>
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
              <div key={i} className="flex items-center gap-3 p-4 bg-[#050315]/80 rounded-xl border border-slate-800/80 text-[#dedcff] font-medium text-sm">
                <div className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                {hobby}
              </div>
            ))}
          </div>
        </Spotlight3DCard>
      </motion.section>

      {/* ============================================
          5. JOURNEY TIMELINE
      ============================================= */}
      <motion.section 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
      >
        <Spotlight3DCard
          glowColor="rgba(67, 59, 255, 0.3)"
          spotlightColor="rgba(56, 189, 248, 0.15)"
          className="bg-[#0b0f19]/90 backdrop-blur-xl p-8 md:p-12 border border-slate-800/80"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#433bff]/20 text-[#38bdf8] rounded-xl border border-[#433bff]/30">
              <Activity size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#fbfbfe]">My Development Journey</h2>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-800/80 space-y-8">
            {codingJourney.map((item, i) => (
              <div key={i} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#38bdf8] border-4 border-[#0b0f19] group-hover:scale-125 transition-transform" />
                <span className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider block mb-1">
                  {item.year}
                </span>
                <h3 className="text-base font-bold text-[#fbfbfe]">{item.title}</h3>
                <p className="text-sm text-[#dedcff]/80 leading-relaxed mt-1 max-w-2xl">{item.text}</p>
              </div>
            ))}
          </div>
        </Spotlight3DCard>
      </motion.section>

    </div>
  );
}
