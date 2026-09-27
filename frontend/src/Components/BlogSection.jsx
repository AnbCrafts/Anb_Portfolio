import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight, Sparkles, Eye } from "lucide-react";
import { assets } from "../assets/assets";
import BlogPreviewModal from "./BlogPreviewModal";

const fallbackHomeBlogs = [];

export default function BlogSection() {
  const [blogs, setBlogs] = useState(fallbackHomeBlogs);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data)) {
            setBlogs(data.data.slice(0, 3));
          }
        }
      } catch (err) {
        setBlogs([]);
      }
    };
    fetchLatestBlogs();
  }, []);

  const handleOpenPreview = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  return (
    <section id="blogs" className="w-full bg-slate-50 dark:bg-slate-950 py-24 px-6 lg:px-8 text-slate-900 dark:text-slate-100 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Sparkles size={14} /> Devlog & Articles
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest <span className="text-teal-600 dark:text-teal-400">Engineering Work & Learnings</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mt-2 max-w-2xl">
              Articles and devlogs created from your Admin Control Panel will be displayed here.
            </p>
          </div>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-500/20 transition-all self-start md:self-auto"
          >
            View All Devlogs <ArrowRight size={15} />
          </Link>
        </div>

        {/* CARDS GRID OR EMPTY STATE */}
        {blogs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <Sparkles size={40} className="mx-auto text-teal-500/50 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Articles Published Yet</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
              New articles published from the Admin Panel will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <motion.article
                key={blog.id || blog._id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-teal-900/10 dark:hover:shadow-teal-500/5 hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide bg-teal-500 text-white rounded-lg shadow-md">
                    {blog.category}
                  </span>

                  {/* Read Time */}
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] text-white/90 bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                    <Clock size={12} className="text-teal-400" />
                    {blog.readTime || "3 min read"}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    <Calendar size={13} className="text-teal-500" />
                    <span>{new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {blog.summary}
                  </p>

                  {/* Action Link & Quick Preview Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <button
                      onClick={() => handleOpenPreview(blog)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors uppercase tracking-wider"
                    >
                      <Eye size={14} /> Quick Preview
                    </button>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors uppercase tracking-wider group/link"
                    >
                      Full Post 
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* QUICK PREVIEW POPUP MODAL */}
      <BlogPreviewModal
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
