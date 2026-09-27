import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ExternalLink, Github, PlayCircle, Layers, ArrowRight } from "lucide-react";
import { useState } from "react";
import { assets } from "../assets/assets";

const getFallbackImage = (title, image) => {
  if (!title) return image || assets.anbPortfolio;
  const lower = title.toLowerCase();
  if (lower.includes("trackforge")) return assets.trackForge;
  if (lower.includes("nirman") || lower.includes("website builder")) return assets.nirman;
  if (lower.includes("codesage")) return assets.codeSage;
  return image || assets.anbPortfolio;
};

export default function ProjectCardSmall({ project, expanded, onExpand }) {
  const initialImage = project.thumbnail || project.image;
  const [imgSrc, setImgSrc] = useState(initialImage || getFallbackImage(project.title, initialImage));
  const projectImage = imgSrc;
  const projectDesc = project.description || project.desc;
  const projectKeywords = project.techStack || project.keywords || [];
  const projectVideo = project.demoVideo || project.video;
  const projectPreview = project.liveUrl || project.preview;
  const projectRepo = project.githubUrl || project.repo;

  // Prevent click bubbling when clicking links/buttons
  const handleAction = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, type: "spring", stiffness: 100, damping: 15 } }}
      onClick={onExpand} 
      className={`
        bg-white dark:bg-slate-900 rounded-2xl overflow-hidden cursor-pointer
        ${expanded 
            ? "fixed inset-2 sm:inset-6 z-[999] md:inset-10 shadow-2xl border-2 border-teal-500 overflow-y-auto" 
            : "relative flex flex-col h-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/60 hover:border-teal-300 dark:hover:border-teal-500 hover:-translate-y-1"
        }
        transition-all duration-300
      `}
      style={expanded ? { position: 'fixed', zIndex: 9999 } : {}}
    >
      {/* DARK BACKDROP (Only when expanded) */}
      {expanded && (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 bg-slate-950/80 -z-10 backdrop-blur-sm pointer-events-none" 
        />
      )}

      <AnimatePresence mode="wait">
        {/* ================================
            COLLAPSED VIEW (PREVIEW)
           ================================= */}
        {!expanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full group"
          >
            {/* Image Area (Top) */}
            <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-950">
              <img
                src={projectImage}
                alt={project.title}
                onError={() => setImgSrc(getFallbackImage(project.title, initialImage))}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              {/* Expand Hint Icon */}
              <div className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm transform translate-y-2 group-hover:translate-y-0 duration-300">
                 <Maximize2 size={16} className="text-teal-700 dark:text-teal-400" />
              </div>

              {/* Title Overlay on Image */}
              <div className="absolute bottom-4 left-4 right-4">
                 <h3 className="text-xl font-bold text-white drop-shadow-md leading-tight">{project.title}</h3>
              </div>
            </div>

            {/* Content Area (Bottom) */}
            <div className="p-5 flex flex-col flex-grow bg-white dark:bg-slate-900">
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-3">
                 {projectKeywords.slice(0, 3).map((k, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 px-2 py-1 rounded border border-teal-100 dark:border-teal-900">
                        {k}
                    </span>
                 ))}
                 {(projectKeywords.length > 3) && (
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 py-1">+ {projectKeywords.length - 3}</span>
                 )}
              </div>

              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {projectDesc}
              </p>
              
              {/* CTA Footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                 <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-medium">
                    <Layers size={14} /> Full Detail
                 </div>
                 <button className="text-sm font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Project <ArrowRight size={16} />
                 </button>
              </div>
            </div>
          </motion.div>
        ) : (
        /* ================================
            EXPANDED VIEW (FULL DETAIL)
           ================================= */
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row h-full bg-white dark:bg-slate-950 relative"
          >
            {/* CLOSE BUTTON */}
            <button 
                onClick={(e) => { e.stopPropagation(); onExpand(); }}
                className="absolute top-4 right-4 z-50 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full shadow-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all hover:rotate-90 duration-300"
            >
                <X size={24} />
            </button>

            {/* LEFT: MEDIA SECTION */}
            <div className="w-full lg:w-3/5 bg-slate-900 dark:bg-slate-950 flex items-center justify-center relative overflow-hidden min-h-[40vh] lg:min-h-full">
                {/* Blurred Background */}
                <img src={projectImage} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-2xl scale-110" alt="" />
                
                {/* Video/Image Container */}
                <div className="relative z-10 w-full max-w-4xl p-6 lg:p-12 flex flex-col items-center">
                   <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black aspect-video relative group">
                       {projectVideo ? (
                         <video
                          src={projectVideo}
                          autoPlay
                          loop
                          muted
                          className="w-full h-full object-contain"
                         />
                       ) : (
                         <img
                          src={projectImage}
                          alt={project.title}
                          className="w-full h-full object-contain"
                         />
                       )}
                   </div>
                   
                   <div className="mt-6 flex items-center gap-2 text-white/60 text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                      <PlayCircle size={16} className="text-teal-400" /> 
                      {projectVideo ? "Video Preview" : "Image Preview"}
                   </div>
                </div>
            </div>

            {/* RIGHT: DETAILS SECTION */}
            <div className="w-full lg:w-2/5 p-8 lg:p-12 overflow-y-auto bg-white dark:bg-slate-950">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">{project.title}</h2>
                    <div className="flex items-center gap-3">
                         <div className="w-12 h-1.5 bg-teal-500 rounded-full"></div>
                         <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Project Overview</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-10">
                    {projectDesc}
                </p>

                {/* Tech Stack Grid */}
                <div className="mb-10">
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Layers size={14} /> Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {projectKeywords.map((k, i) => (
                            <span key={i} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-teal-300 dark:hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-400 transition-colors cursor-default">
                                {k}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 mt-auto">
                    {projectPreview && (
                        <a 
                           href={projectPreview} 
                           target="_blank" 
                           onClick={handleAction}
                           className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-950 rounded-xl font-bold hover:bg-teal-600 dark:hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-600/20 transition-all transform hover:-translate-y-1"
                        >
                           <ExternalLink size={20} /> Launch Live Demo
                        </a>
                    )}
                    
                    {projectRepo && (
                        <a 
                           href={projectRepo} 
                           target="_blank" 
                           onClick={handleAction}
                           className="flex items-center justify-center gap-3 w-full py-4 border-2 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:border-slate-800 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                        >
                           <Github size={20} /> View Source Code
                        </a>
                    )}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}