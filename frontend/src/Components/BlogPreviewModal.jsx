import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Calendar, ArrowRight, CheckCircle2, Wrench, Sparkles, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BlogPreviewModal({ blog, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!blog) return null;

  const handleReadFull = () => {
    onClose();
    navigate(`/blog/${blog.slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* MODAL CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 z-10 my-auto max-h-[90vh] flex flex-col"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* COVER IMAGE BANNER */}
            <div className="relative h-56 md:h-64 overflow-hidden bg-slate-900 shrink-0">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wide bg-teal-500 text-white rounded-lg shadow-md">
                  {blog.category || "General"}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/90 bg-slate-950/80 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  <Clock size={12} className="text-teal-400" />
                  {blog.readTime || "3 min read"}
                </span>
              </div>
            </div>

            {/* BODY SCROLL AREA */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  <Calendar size={13} className="text-teal-500" />
                  <span>{new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {blog.title}
                </h2>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {blog.summary}
              </p>

              {/* HIGHLIGHTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blog.learned && blog.learned.length > 0 && (
                  <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-wider">
                      <CheckCircle2 size={15} /> What I Learned
                    </div>
                    <ul className="space-y-1.5">
                      {blog.learned.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {blog.built && blog.built.length > 0 && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wider">
                      <Wrench size={15} /> What I Built
                    </div>
                    <ul className="space-y-1.5">
                      {blog.built.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
              >
                Close Preview
              </button>

              <button
                onClick={handleReadFull}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-teal-500/20 transition-all flex items-center gap-2"
              >
                Read Full Article <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
