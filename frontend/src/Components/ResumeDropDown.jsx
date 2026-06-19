import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Eye, Download } from "lucide-react";

const ResumeDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeResume = useSelector((state) => state.portfolio.activeResume);
  const resumeUrl = activeResume?.fileUrl || "/CV.pdf";

  return (
    <div className="relative inline-block text-left z-20">
      {/* MAIN BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-700 font-medium border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
      >
        My CV
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.button>

      {/* CLICK OUTSIDE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-10 bg-transparent" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 sm:left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-30"
          >
            <div className="flex flex-col p-1">
              {/* OPTION 1: VIEW */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors"
              >
                <Eye size={16} /> View
              </a>

              {/* OPTION 2: DOWNLOAD */}
              <a
                href={resumeUrl}
                download={activeResume?.title ? `${activeResume.title}.pdf` : "Anubhaw_Gupta_Resume.pdf"}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors"
              >
                <Download size={16} /> Download
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeDropDown;
