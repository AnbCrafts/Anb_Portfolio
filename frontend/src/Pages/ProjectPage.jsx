// ProjectsPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";

import ProjectTabs from "../Components/ProjectTabs";
import TopProjectsGallery from "../Components/TopProjectsGallery";
import ProjectListSection from "../Components/ProjectListSection";
import { Sparkles } from "lucide-react";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <div className="w-full bg-white min-h-screen">
      
      {/* ================= HEADER SECTION ================= */}
      <section className="relative w-full py-24 px-6 lg:px-8 bg-slate-50 border-b border-slate-200 overflow-hidden">
         {/* Abstract background blur */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-[80px] opacity-60 -translate-y-1/2 translate-x-1/3" />

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider shadow-sm">
                 <Sparkles size={14} className="text-amber-400 fill-amber-400" />
                 Portfolio Showcase
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                Building digital <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                  experiences that matter.
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                A curated collection of my most impactful work, ranging from complex full-stack 
                SaaS platforms to pixel-perfect frontend interfaces.
              </p>
            </motion.div>
         </div>
      </section>

      {/* ================= TOP PROJECTS (SLIDER) ================= */}
      {/* No wrapper needed here as TopProjectsGallery has its own section/padding */}
      <TopProjectsGallery />


      {/* ================= ARCHIVE SECTION ================= */}
      <section id="archive" className="w-full py-24 bg-slate-50 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-slate-900">Project Archive</h2>
               <p className="text-slate-500 mt-2">Explore my complete development history.</p>
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