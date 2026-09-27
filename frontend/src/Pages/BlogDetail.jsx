import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, CheckCircle2, Wrench, AlertTriangle, Share2, Sparkles, BookOpen } from "lucide-react";
import { assets } from "../assets/assets";

const fallbackBlogMap = {};

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            setBlog(data.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        setBlog(null);
      }
      setBlog(null);
      setLoading(false);
    };

    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400 font-bold">
          <Sparkles className="animate-spin" size={24} /> Loading article...
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center py-24 px-6 text-center">
        <BookOpen size={48} className="text-slate-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Article Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md">
          This blog post does not exist or has not been published yet.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
        >
          <ArrowLeft size={16} /> Back to All Articles
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full bg-slate-50 dark:bg-slate-950 py-24 px-6 lg:px-8 text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* BACK NAVIGATION */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 pt-4"
        >
          <button
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-300 dark:hover:border-teal-700 shadow-sm transition-all text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={16} /> Back to All Articles
          </button>
        </motion.div>

        {/* HERO HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* META BADGES */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide bg-teal-600 text-white rounded-lg shadow-sm">
              {blog.category || "General"}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
              <Calendar size={14} className="text-teal-500" />
              <span>{new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
              <Clock size={14} className="text-teal-500" />
              <span>{blog.readTime || "3 min read"}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
            {blog.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {blog.summary}
          </p>
        </motion.header>

        {/* COVER IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-900 relative"
        >
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full max-h-[540px] object-cover"
          />
        </motion.div>

        {/* STRUCTURED HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* WHAT I LEARNED TODAY */}
          {blog.learned && blog.learned.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center gap-2.5 mb-4 text-teal-600 dark:text-teal-400 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 size={18} /> What I Learned Today
              </div>
              <ul className="space-y-3">
                {blog.learned.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* WHAT I BUILT / WORKED ON */}
          {blog.built && blog.built.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center gap-2.5 mb-4 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
                <Wrench size={18} /> What I Built / Worked On
              </div>
              <ul className="space-y-3">
                {blog.built.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* CHALLENGES FACED & SOLUTIONS */}
        {blog.challenges && blog.challenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-900 dark:text-slate-100"
          >
            <div className="flex items-center gap-2.5 mb-3 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">
              <AlertTriangle size={18} /> Challenges Faced & Solutions
            </div>
            <ul className="space-y-2">
              {blog.challenges.map((item, idx) => (
                <li key={idx} className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  • {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* MAIN TEXT CONTENT */}
        {blog.content && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-12 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm whitespace-pre-line"
          >
            {blog.content}
          </motion.div>
        )}

        {/* --- READER SUGGESTIONS & FEEDBACK SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400">
              <Share2 size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Reader Suggestions & Feedback
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Have a tip, correction, or code improvement for this C# / MERN topic? Share your thoughts below!
              </p>
            </div>
          </div>

          <BlogFeedbackForm slug={slug} initialSuggestions={blog.suggestions || []} />
        </motion.div>

        {/* FOOTER ACTION */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={16} /> Back to All Devlogs
          </button>
        </div>
      </div>
    </article>
  );
}

// Inner Component for Feedback Form & List
function BlogFeedbackForm({ slug, initialSuggestions }) {
  const [suggestions, setSuggestions] = useState(
    initialSuggestions.length > 0
      ? initialSuggestions
      : [
          {
            name: "Alex Dev",
            rating: "🚀 Very Helpful",
            feedback: "Great post! For Entity Framework Core async methods, configuring AsNoTracking() on read queries also significantly boosts throughput.",
            createdAt: new Date("2026-09-25T14:30:00Z")
          }
        ]
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "🚀 Very Helpful",
    feedback: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.feedback) return;

    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/slug/${slug}/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setSuggestions([data.data || { ...formData, createdAt: new Date() }, ...suggestions]);
        setSubmittedMessage("Thank you for your suggestion!");
      } else {
        // Fallback local update if backend offline
        setSuggestions([{ ...formData, createdAt: new Date() }, ...suggestions]);
        setSubmittedMessage("Thank you for your suggestion!");
      }
    } catch (err) {
      setSuggestions([{ ...formData, createdAt: new Date() }, ...suggestions]);
      setSubmittedMessage("Thank you for your suggestion!");
    } finally {
      setSubmitting(false);
      setFormData({ name: "", email: "", rating: "🚀 Very Helpful", feedback: "" });
      setTimeout(() => setSubmittedMessage(""), 4000);
    }
  };

  const ratings = ["🚀 Very Helpful", "💡 Great Insight", "🎯 Code Suggestion", "⚡ Question"];

  return (
    <div className="mt-6 space-y-8">
      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
        {submittedMessage && (
          <div className="p-3 bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-xs font-bold rounded-lg flex items-center gap-2">
            <CheckCircle2 size={16} /> {submittedMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">Your Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">Email or Handle (Optional)</label>
            <input
              type="text"
              placeholder="e.g. @john_dev or john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Feedback Type</label>
          <div className="flex flex-wrap gap-2">
            {ratings.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setFormData({ ...formData, rating: r })}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  formData.rating === r
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-teal-500"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">Your Suggestion / Feedback *</label>
          <textarea
            rows={3}
            required
            placeholder="Share your thoughts, suggestions, or constructive feedback..."
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-teal-500/20 transition-all flex items-center gap-2"
        >
          {submitting ? "Submitting..." : "Submit Suggestion"} <Sparkles size={14} />
        </button>
      </form>

      {/* SUGGESTIONS LIST */}
      <div className="space-y-4">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span>Community Suggestions ({suggestions.length})</span>
        </h4>

        {suggestions.map((s, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{s.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                  {s.rating}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                {new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{s.feedback}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
