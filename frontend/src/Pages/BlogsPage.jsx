import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Tag, Code, Sparkles, Eye } from "lucide-react";
import { assets } from "../assets/assets";
import BlogPreviewModal from "../Components/BlogPreviewModal";

// Initial mock blogs for rich fallback
const defaultBlogs = [];

const categories = ["All", "C#", "MERN", "Daily Log", "Architecture", "Career"];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(defaultBlogs);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch from backend API
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        if (res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data)) {
            setBlogs(data.data);
          } else {
            setBlogs([]);
          }
        } else {
          setBlogs([]);
        }
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleOpenPreview = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === "All" ||
      blog.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 py-24 px-6 lg:px-8 text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* --- HERO HEADER --- */}
        <div className="text-center mb-10 max-w-3xl mx-auto pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles size={14} /> Technical Devlog & Insights
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight">
              Engineering <span className="text-teal-600 dark:text-teal-400">Devlog & Articles</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              Documenting my active work, daily learnings in <strong className="text-slate-900 dark:text-white font-semibold">C# / .NET</strong> and <strong className="text-slate-900 dark:text-white font-semibold">MERN Stack</strong>, system design patterns, and full-stack challenges solved in real-time.
            </p>
          </motion.div>
        </div>

        {/* --- EXTENDED SEARCH & FILTERS BAR --- */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-full">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-teal-600 text-white shadow-md shadow-teal-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stretched Search Input */}
          <div className="relative w-full md:w-96 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search C#, MERN, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>
        </div>

        {/* --- BLOGS GRID --- */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BookOpen size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No articles found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Try adjusting your search query or category filter.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog) => (
              <motion.article
                key={blog.id || blog._id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-teal-900/10 dark:hover:shadow-teal-500/5 hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide bg-teal-500 text-white rounded-lg shadow-md">
                    {blog.category}
                  </span>

                  {/* Read Time Badge */}
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-white/90 bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
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

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                    {blog.title}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {blog.summary}
                  </p>

                  {/* Highlights preview */}
                  {blog.learned && blog.learned.length > 0 && (
                    <div className="mb-6 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-1">
                        Key Takeaway
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 italic">
                        "{blog.learned[0]}"
                      </p>
                    </div>
                  )}

                  {/* Action Link & Quick Preview */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
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
                      Read Full 
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
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

