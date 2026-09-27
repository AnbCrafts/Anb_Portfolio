import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { assets } from "../assets/assets";
import { MapPin, Calendar, ArrowRight, BookOpen } from "lucide-react";

// Mock Fallback Data
const storiesFallback = [
  {
    id: 1,
    image: assets.hero1,
    tag: "Hackathon",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    title: "Hack-O-Nova 2024",
    short: "A high-pressure 36-hour hackathon where we conceptualized and built an AI-driven study planner from scratch.",
    year: "Mar 2024",
    location: "Adamas University",
    slug: "hackonova-2024",
  },
  {
    id: 2,
    image: assets.hero3,
    tag: "Certification",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    title: "NPTEL — Java Programming",
    short: "Awarded Elite+Silver for mastering advanced Java concepts, including Multithreading, Collections, and OOP design patterns.",
    year: "Jan 2024",
    location: "JIS University",
    slug: "nptel-java",
  },
  {
    id: 3,
    image: assets.hero5,
    tag: "Training",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    title: "MERN Architecture Training",
    short: "An intensive industrial training program focused on building scalable APIs, managing MongoDB schemas, and deploying to AWS.",
    year: "Dec 2023",
    location: "Ardent Computech",
    slug: "mern-training-ardent",
  },
];

const badgeColors = [
  "bg-amber-100 text-amber-800 border-amber-200",
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-emerald-100 text-emerald-800 border-emerald-200",
  "bg-purple-100 text-purple-800 border-purple-200"
];

export default function Stories() {
  const dbStories = useSelector((state) => state.portfolio.stories);

  // Map database stories
  const mappedDbStories = dbStories
    .filter((s) => s.published !== false)
    .map((story, idx) => ({
      id: story._id || idx,
      image: story.image,
      tag: story.tag,
      color: badgeColors[idx % badgeColors.length],
      title: story.title,
      short: story.description,
      year: story.year,
      location: story.location,
      slug: story.slug,
    }));

  const stories = mappedDbStories.length > 0 ? mappedDbStories : storiesFallback;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 py-24 px-6 lg:px-8 text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* --- HERO HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                <BookOpen size={14} /> My Journey
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Behind the <span className="text-teal-600 dark:text-teal-400">Code</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              Software engineering is more than just typing syntax. It's about the experiences, 
              the pressure of hackathons, and the discipline of continuous learning.
            </p>
          </motion.div>
        </div>

        {/* --- STORIES GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stories.map((story) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/60 hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300"
            >
              {/* IMAGE HEADER */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                
                {/* FLOATING BADGE */}
                <span className={`
                    absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-lg border shadow-sm
                    ${story.color}
                `}>
                  {story.tag}
                </span>
              </div>

              {/* CARD BODY */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta Data */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                   <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-teal-500 dark:text-teal-400" /> {story.year}
                   </div>
                   <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
                   <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-teal-500 dark:text-teal-400" /> {story.location}
                   </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                  {story.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {story.short}
                </p>

                {/* READ MORE LINK */}
                <a
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors mt-auto group/link"
                >
                  Read Full Story 
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}