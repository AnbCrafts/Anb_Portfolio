// AboutBottom.jsx
import {
  CheckCircle,
  Target,
  Code,
  Rocket,
  Lightbulb,
  Settings,
  HeartHandshake,
  LayoutGrid,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

export default function AboutBottom() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mt-24 space-y-24">

      {/* ============================================
          1. MISSION & VALUES
      ============================================= */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false }}>
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">My Mission & Values</h2>

        {/* Image Placeholder */}
        <div className="w-full h-64 bg-teal-50 rounded-xl border border-teal-100 mb-6 flex items-center justify-center text-gray-400">
          Mission related image here (abstract, workflow, or building)
        </div>

        <p className="text-gray-600 leading-relaxed max-w-3xl">
          I aim to build beautiful, scalable and intuitive digital products that solve real problems.
          My focus is on writing maintainable code, designing clean interfaces, and continually improving through discipline and curiosity.
        </p>

        <ul className="mt-6 space-y-3 text-gray-700">
          <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-600" /> Deliver clean & maintainable code</li>
          <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-600" /> Build with users first, tech second</li>
          <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-600" /> Stay consistent, improve every day</li>
          <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-600" /> Communicate clearly, collaborate better</li>
        </ul>
      </motion.section>

      {/* ============================================
          2. CURRENTLY WORKING ON
      ============================================= */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false }} className="bg-teal-50 p-5 rounded-lg shadow-2xl shadow-teal-100">
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">What I'm Currently Working On</h2>

        {/* Image Placeholder */}
        <div className="w-full h-60 rounded-xl border border-teal-100 mb-6 flex items-center justify-between gap-4">

  {/* IMAGE 1 — Home Page UI */}
  <div className="relative w-1/3 h-full rounded-lg overflow-hidden">
    <img src={assets.fitForWork} className="w-full h-full object-cover" alt="Home UI" />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
      <p className="text-white text-sm leading-relaxed">
        Clean, modern homepage UI designed for clarity and first-impression impact.  
        Focused on accessibility and visual hierarchy.
      </p>
    </div>
  </div>

  {/* IMAGE 2 — Job Search & Apply */}
  <div className="relative w-1/3 h-full rounded-lg overflow-hidden">
    <img src={assets.codeSage} className="w-full h-full object-cover" alt="Job Search" />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
      <p className="text-white text-sm leading-relaxed">
        Smart job search experience with filters, saved jobs,  
        and a frictionless apply workflow for faster decision making.
      </p>
    </div>
  </div>

  {/* IMAGE 3 — Hiring Workflow */}
  <div className="relative w-1/3 h-full rounded-lg overflow-hidden">
    <img src={assets.ffw2} className="w-full h-full object-cover" alt="Hiring Flow" />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
      <p className="text-white text-sm leading-relaxed">
        Streamlined hiring process for recruiters — posting jobs,  
        tracking applicants, and reviewing profiles seamlessly.
      </p>
    </div>
  </div>

</div>

        <ul className="text-gray-700 space-y-3">
          <li className="flex items-center gap-2"><Target size={18} className="text-teal-600" /> Building <strong>FitForWork</strong> — a job-hunting & job-posting platform.</li>
          <li className="flex items-center gap-2"><Activity size={18} className="text-teal-600" /> Improving UI/UX design & animation systems.</li>
          <li className="flex items-center gap-2"><Code size={18} className="text-teal-600" /> Strengthening MERN architecture and backend patterns.</li>
          <li className="flex items-center gap-2"><Lightbulb size={18} className="text-teal-600" /> Exploring workflow automation & AI integrations.</li>
          <li className="flex items-center gap-2"><Rocket size={18} className="text-teal-600" /> Preparing for GATE while building real products.</li>
        </ul>
      </motion.section>

      {/* ============================================
          3. STRENGTHS GRID
      ============================================= */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false }}>
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">Strengths</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            "Fast Learner & Adaptable",
            "Strong Debugging Ability",
            "Clean & Logical Thinking",
            "UI/UX Driven Mindset",
            "Team Player & Communicative",
            "Persistent & Quality-Focused",
          ].map((s, i) => (
            <motion.div
              key={i}
              className="p-6 bg-teal-50 border border-teal-100 rounded-xl text-gray-700"
              variants={fadeUp}
            >
              {s}
            </motion.div>
          ))}

        </div>
      </motion.section>

      {/* ============================================
          4. HOW I WORK
      ============================================= */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false }}>
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">How I Work</h2>

        {/* Image Placeholder */}
        {/* WORKFLOW DIAGRAM */}
<div className="w-full noScroll max-w-7xl h-60 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center pl-30 mb-3 px-6 overflow-x-auto">

  <div className="flex items-center gap-6">

    {/* Step 1 */}
    <div className="min-w-[180px] p-4 bg-white rounded-xl border border-teal-100 shadow text-center">
      <h3 className="font-semibold text-teal-700">Idea</h3>
      <p className="text-gray-600 text-sm mt-1">Start with a clear idea or problem.</p>
    </div>

    {/* Arrow */}
    <svg width="40" height="40" viewBox="0 0 24 24" className="text-teal-600">
      <path fill="currentColor" d="M8 5v14l11-7z"/>
    </svg>

    {/* Step 2 */}
    <div className="min-w-[180px] p-4 bg-white rounded-xl border border-teal-100 shadow text-center">
      <h3 className="font-semibold text-teal-700">Layout Design</h3>
      <p className="text-gray-600 text-sm mt-1">Create rough wireframes & structure.</p>
    </div>

    {/* Arrow */}
    <svg width="40" height="40" viewBox="0 0 24 24" className="text-teal-600">
      <path fill="currentColor" d="M8 5v14l11-7z"/>
    </svg>

    {/* Step 3 */}
    <div className="min-w-[180px] p-4 bg-white rounded-xl border border-teal-100 shadow text-center">
      <h3 className="font-semibold text-teal-700">Backend Setup</h3>
      <p className="text-gray-600 text-sm mt-1">Plan APIs, DB models, and core architecture.</p>
    </div>

    {/* Arrow */}
    <svg width="40" height="40" viewBox="0 0 24 24" className="text-teal-600">
      <path fill="currentColor" d="M8 5v14l11-7z"/>
    </svg>

    {/* Step 4 */}
    <div className="min-w-[180px] p-4 bg-white rounded-xl border border-teal-100 shadow text-center">
      <h3 className="font-semibold text-teal-700">Fix Issues</h3>
      <p className="text-gray-600 text-sm mt-1">Debug & refine server logic.</p>
    </div>

    {/* Arrow */}
    <svg width="40" height="40" viewBox="0 0 24 24" className="text-teal-600">
      <path fill="currentColor" d="M8 5v14l11-7z"/>
    </svg>

    {/* Step 5 */}
    <div className="min-w-[180px] p-4 bg-white rounded-xl border border-teal-100 shadow text-center">
      <h3 className="font-semibold text-teal-700">Frontend Build</h3>
      <p className="text-gray-600 text-sm mt-1">Develop UI using React & Tailwind.</p>
    </div>

    {/* Arrow */}
    <svg width="40" height="40" viewBox="0 0 24 24" className="text-teal-600">
      <path fill="currentColor" d="M8 5v14l11-7z"/>
    </svg>

    {/* Step 6 */}
    <div className="min-w-[180px] p-4 bg-white rounded-xl border border-teal-100 shadow text-center">
      <h3 className="font-semibold text-teal-700">Performance</h3>
      <p className="text-gray-600 text-sm mt-1">Check speed, UX, and optimize flows.</p>
    </div>

    {/* Arrow */}
    <svg width="40" height="40" viewBox="0 0 24 24" className="text-teal-600">
      <path fill="currentColor" d="M8 5v14l11-7z"/>
    </svg>

    {/* Step 7 */}
    <div className="min-w-[180px] p-4 bg-white rounded-xl border border-teal-100 shadow text-center">
      <h3 className="font-semibold text-teal-700">Done</h3>
      <p className="text-gray-600 text-sm mt-1">Finalize & deploy the project.</p>
    </div>

  </div>
</div>


        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center gap-2"><Settings size={18} className="text-teal-600" /> Component-driven development</li>
          <li className="flex items-center gap-2"><Settings size={18} className="text-teal-600" /> Clean folder structures & scalable architecture</li>
          <li className="flex items-center gap-2"><Settings size={18} className="text-teal-600" /> API-first backend approach</li>
          <li className="flex items-center gap-2"><Settings size={18} className="text-teal-600" /> Reusable UI patterns & systems</li>
          <li className="flex items-center gap-2"><Settings size={18} className="text-teal-600" /> Prioritize accessibility & responsiveness</li>
        </ul>
      </motion.section>

      {/* ============================================
          5. TOOLS GRID
      ============================================= */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false }}>
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">Tools I Use</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            "VS Code",
            "Git & GitHub",
            "Figma",
            "MongoDB Compass",
            "Postman",
            "Notion",
          ].map((tool, i) => (
            <div key={i} className="p-4 bg-teal-50 border border-teal-100 rounded-xl text-center text-gray-700">
              {tool}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ============================================
          6. HOBBIES & INTERESTS
      ============================================= */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false }}>
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">Hobbies & Interests</h2>

        {/* Image Placeholder */}
        <div className="w-full h-56 bg-teal-50 border border-teal-100 rounded-xl mb-6 flex items-center justify-center text-gray-400">
          Lifestyle / creativity image here
        </div>

        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center gap-2"><HeartHandshake size={18} className="text-teal-600" /> UI/UX exploration & design</li>
          <li className="flex items-center gap-2"><HeartHandshake size={18} className="text-teal-600" /> Solving DSA & coding challenges</li>
          <li className="flex items-center gap-2"><HeartHandshake size={18} className="text-teal-600" /> Reading tech blogs & books</li>
          <li className="flex items-center gap-2"><HeartHandshake size={18} className="text-teal-600" /> Fitness & mindfulness</li>
          <li className="flex items-center gap=2"><HeartHandshake size={18} className="text-teal-600" /> Gaming & anime</li>
        </ul>
      </motion.section>

      {/* ============================================
          7. JOURNEY TIMELINE
      ============================================= */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false }}>
        <h2 className="text-3xl font-semibold text-teal-700 mb-8">My Coding Journey</h2>

        <div className="border-l-4 border-teal-500 pl-6 space-y-8 text-gray-700">

          {[ 
            { year: "2020", text: "Started programming & built my first projects." },
            { year: "2021–2022", text: "Learned MERN, Java & UI principles." },
            { year: "2023", text: "Hackathons, NPTEL certification, MERN training." },
            { year: "2024–2025", text: "Built TrackForge, CodeSage, FitForWork, Portfolio V2." },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-teal-700 font-semibold">{item.year}</h3>
              <p>{item.text}</p>
            </div>
          ))}

        </div>
      </motion.section>

      {/* ============================================
          8. WHAT I CAN HELP YOU WITH
      ============================================= */}
      <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false }}>
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">What I Can Help You With</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Frontend UI development with React + Tailwind",
            "Full-stack MERN applications",
            "Dashboard UI & SaaS design systems",
            "Reusable UI component libraries",
            "Authentication & role-based systems",
            "REST API development",
            "Performance optimizations & architecture",
            "Product thinking + UX improvements",
          ].map((item, i) => (
            <div key={i} className="p-5 bg-teal-50 border border-teal-100 rounded-xl text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
