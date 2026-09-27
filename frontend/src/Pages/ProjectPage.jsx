import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";

import ProjectTabs from "../Components/ProjectTabs";
import TopProjectsGallery from "../Components/TopProjectsGallery";
import ProjectListSection from "../Components/ProjectListSection";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <div className="w-full bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* ================= HEADER SECTION ================= */}
      <section className="relative w-full pt-28 pb-20 px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
         {/* Abstract background blur (Clipped) */}
         <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 dark:bg-teal-950/20 rounded-full blur-[80px] opacity-60 -translate-y-1/2 translate-x-1/3" />
         </div>

         <div className="max-w-7xl mx-auto relative z-10 px-6 lg:px-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-300 dark:hover:border-teal-700 transition-all shadow-sm group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider shadow-sm">
                 <Sparkles size={14} className="text-amber-400 fill-amber-400" />
                 Portfolio Showcase
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                Building digital <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 dark:from-teal-400 dark:via-teal-300 dark:to-blue-400">
                  experiences that matter.
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                A curated collection of my most impactful work, ranging from complex full-stack 
                SaaS platforms to pixel-perfect frontend interfaces.
              </p>
            </motion.div>
         </div>
      </section>

      {/* ================= TOP PROJECTS (SLIDER) ================= */}
      <TopProjectsGallery />

      {/* ================= ARCHIVE SECTION ================= */}
      <section id="archive" className="w-full py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Project Archive</h2>
               <p className="text-slate-500 dark:text-slate-400 mt-2">Explore my complete development history.</p>
            </div>

            {/* Tabs */}
            <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Grid List */}
            <ProjectListSection type={activeTab} />
         </div>
      </section>

    </div>
  );
}