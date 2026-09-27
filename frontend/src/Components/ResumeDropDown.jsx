import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Eye, Download, FileText, Code2, Cpu, Database, Layers } from "lucide-react";

const roleResumes = [
  { name: "MERN Stack Developer (Primary)", url: "/resumes/Anb_Mern_75.pdf", file: "Anubhaw_Gupta_MERN_Resume.pdf", icon: <Layers size={14} className="text-teal-600" /> },
  { name: "Software Engineer (SDE)", url: "/resumes/Anb_SDE_73.pdf", file: "Anubhaw_Gupta_SDE_Resume.pdf", icon: <Code2 size={14} className="text-blue-600" /> },
  { name: "Backend Developer", url: "/resumes/Anb_Backend_74.pdf", file: "Anubhaw_Gupta_Backend_Resume.pdf", icon: <Cpu size={14} className="text-purple-600" /> },
  { name: "React / Frontend Developer", url: "/resumes/Anb_React_65.pdf", file: "Anubhaw_Gupta_React_Resume.pdf", icon: <Code2 size={14} className="text-emerald-600" /> },
  { name: "Database Specialist", url: "/resumes/Anb_DBA_72.pdf", file: "Anubhaw_Gupta_DBA_Resume.pdf", icon: <Database size={14} className="text-amber-600" /> },
];

const ResumeDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeResume = useSelector((state) => state.portfolio.activeResume);
  const primaryUrl = activeResume?.fileUrl || "/resumes/Anb_Mern_75.pdf";

  return (
    <div className="relative inline-block text-left z-[100]">
      {/* MAIN BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        <FileText size={18} className="text-teal-600 dark:text-teal-400" />
        <span>My CV</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.button>

      {/* CLICK OUTSIDE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9990] bg-transparent" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* DROPDOWN MENU - FLOATS ON TOP OF EVERYTHING WITH HIGH STACKING */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 sm:left-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-slate-200/90 dark:border-slate-800 z-[9999] overflow-hidden"
          >
            {/* Header Title */}
            <div className="bg-slate-50/80 dark:bg-slate-800/80 px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={14} className="text-teal-600 dark:text-teal-400" /> Tailored Resumes
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">5 Variants</span>
            </div>

            <div className="flex flex-col p-2 space-y-1 max-h-72 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0">
              
              {/* Master Resume Item */}
              <div className="px-3 pt-1 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Primary Master CV
              </div>
              
              <div className="flex items-center justify-between p-2 bg-teal-50/60 dark:bg-teal-950/40 rounded-xl border border-teal-100/80 dark:border-teal-900/60">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 rounded-lg">
                    <FileText size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">Master Resume (MERN/Full-Stack)</span>
                </div>
                
                <div className="flex items-center gap-1 shrink-0">
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="View Master CV"
                  >
                    <Eye size={14} />
                  </a>
                  <a
                    href={primaryUrl}
                    download={activeResume?.title ? `${activeResume.title}.pdf` : "Anubhaw_Gupta_Resume.pdf"}
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-teal-700 dark:text-teal-300 hover:text-teal-800 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-teal-200 dark:border-teal-800 transition-colors"
                    title="Download Master CV"
                  >
                    <Download size={14} />
                  </a>
                </div>
              </div>

              {/* Role Targeted Resumes */}
              <div className="px-3 pt-3 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Targeted Role Resumes
              </div>

              {roleResumes.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-teal-700 dark:hover:text-teal-400 rounded-xl transition-colors group border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-teal-50 dark:group-hover:bg-teal-950 transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-medium truncate max-w-[170px] text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsOpen(false)}
                      title="View PDF"
                      className="p-1 text-slate-400 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Eye size={14} />
                    </a>
                    <a
                      href={item.url}
                      download={item.file}
                      onClick={() => setIsOpen(false)}
                      title="Download PDF"
                      className="p-1 text-slate-400 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Download size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeDropDown;
